import { Resend } from "resend";

const MAX_REQUESTS = 5;
const RATE_WINDOW_MS = 10 * 60 * 1000;
const MAX_BODY_BYTES = 12_000;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type ContactPayload = {
  name?: unknown;
  email?: unknown;
  message?: unknown;
  website?: unknown;
  turnstileToken?: unknown;
};

type RateLimitEntry = { count: number; resetAt: number };

const rateLimits = new Map<string, RateLimitEntry>();

function jsonError(message: string, status: number, headers?: HeadersInit) {
  return Response.json({ success: false, message }, { status, headers });
}

function clientAddress(request: Request) {
  return (
    request.headers.get("x-real-ip")?.trim() ||
    request.headers.get("x-forwarded-for")?.split(",").at(-1)?.trim() ||
    "unknown"
  );
}

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (character) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
  })[character]!);
}

function emailContent(request: Request, name: string, email: string, message: string, address: string) {
  // Never copy configuration or raw request headers into the email.
  const redact = (value: string) => {
    for (const secret of [process.env.RESEND_API_KEY, process.env.TURNSTILE_SECRET_KEY]) {
      if (secret) value = value.split(secret).join("[redacted]");
    }
    return value.replace(/re_[A-Za-z0-9_-]{8,}/g, "[redacted]").replace(/\u2014/g, "-");
  };
  let page = "Not available";
  const referer = request.headers.get("referer");
  if (referer) {
    try {
      const url = new URL(referer);
      if (["https:", "http:"].includes(url.protocol) && url.origin === new URL(request.url).origin) {
        page = `${url.origin}${url.pathname}`;
      }
    } catch {
      // A missing or malformed referrer does not prevent delivery.
    }
  }
  const time = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Karachi", dateStyle: "full", timeStyle: "long",
  }).format(new Date()) + " (Asia/Karachi)";
  const country = request.headers.get("x-vercel-ip-country") || request.headers.get("cf-ipcountry") || "Not available";
  const details = [
    ["Name", redact(name)], ["Email", redact(email)], ["Time", time],
    ["Page", redact(page)], ["IP address", redact(address === "unknown" ? "Not available" : address)],
    ["Country", redact(country)],
  ];
  const safeMessage = redact(message);
  const mailto = escapeHtml(`mailto:${encodeURIComponent(redact(email))}`);
  const rows = details.map(([label, value]) => `<tr><td style="padding:10px 0;width:90px;color:#64748b;vertical-align:top;">${label}</td><td style="padding:10px 0;overflow-wrap:anywhere;">${label === "Email" ? `<a href="${mailto}" style="color:#2563eb;">${escapeHtml(value)}</a>` : escapeHtml(value)}</td></tr>`).join("");
  return {
    subject: `New portfolio message from ${redact(name)}`,
    text: `New message from your portfolio\n\n${details.map(([label, value]) => `${label}: ${value}`).join("\n")}\n\nMessage:\n${safeMessage}\n\nReply to ${redact(name)}: mailto:${encodeURIComponent(redact(email))}`,
    html: `<!doctype html><html lang="en"><body style="margin:0;padding:24px 12px;background:#f1f5f9;font-family:Arial,Helvetica,sans-serif;color:#0f172a;"><table role="presentation" style="width:100%;max-width:600px;margin:0 auto;border-spacing:0;background:#ffffff;border:1px solid #e2e8f0;border-radius:12px;overflow:hidden;"><tr><td style="padding:28px 24px;background:#0f172a;color:#ffffff;font-size:24px;font-weight:700;">New message from your portfolio</td></tr><tr><td style="padding:24px;"><table role="presentation" style="width:100%;border-spacing:0;font-size:15px;line-height:1.6;">${rows}</table><p style="margin:24px 0 10px;font-size:15px;font-weight:700;">Message</p><div style="padding:20px;border:1px solid #cbd5e1;border-radius:8px;line-height:1.7;font-size:16px;overflow-wrap:anywhere;">${escapeHtml(safeMessage).replace(/\r\n|\r|\n/g, "<br />")}</div><p style="margin:28px 0 8px;"><a href="${mailto}" style="display:block;padding:16px 20px;background:#2563eb;color:#ffffff;text-decoration:none;text-align:center;border-radius:8px;font-size:16px;font-weight:700;overflow-wrap:anywhere;">Reply to ${escapeHtml(redact(name))}</a></p></td></tr></table></body></html>`,
  };
}

function isRateLimited(address: string) {
  const now = Date.now();

  for (const [key, entry] of rateLimits) {
    if (entry.resetAt <= now) rateLimits.delete(key);
  }

  if (rateLimits.size >= 5_000 && !rateLimits.has(address)) {
    const oldestKeys = rateLimits.keys();
    while (rateLimits.size >= 4_000) {
      const oldest = oldestKeys.next();
      if (oldest.done) break;
      rateLimits.delete(oldest.value);
    }
  }

  const current = rateLimits.get(address);
  if (!current || current.resetAt <= now) {
    rateLimits.set(address, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return { limited: false, retryAfter: 0 };
  }

  if (current.count >= MAX_REQUESTS) {
    return {
      limited: true,
      retryAfter: Math.max(1, Math.ceil((current.resetAt - now) / 1000)),
    };
  }

  current.count += 1;
  return { limited: false, retryAfter: 0 };
}

async function verifyTurnstile(token: unknown, address: string) {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return true;
  if (typeof token !== "string" || !token) return false;

  const body = new URLSearchParams({ secret, response: token, remoteip: address });

  try {
    const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body,
      signal: AbortSignal.timeout(5_000),
    });
    if (!response.ok) return false;
    const result = (await response.json()) as { success?: boolean };
    return result.success === true;
  } catch {
    return false;
  }
}

export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  if (origin) {
    try {
      if (new URL(origin).origin !== new URL(request.url).origin) {
        return jsonError("Invalid request origin.", 403);
      }
    } catch {
      return jsonError("Invalid request origin.", 403);
    }
  }

  const contentLength = Number(request.headers.get("content-length") || 0);
  if (contentLength > MAX_BODY_BYTES) return jsonError("Request is too large.", 413);
  if (!request.headers.get("content-type")?.includes("application/json")) {
    return jsonError("Expected a JSON request.", 415);
  }

  let payload: ContactPayload;
  try {
    const body: unknown = await request.json();
    if (!body || typeof body !== "object" || Array.isArray(body)) {
      return jsonError("Invalid request body.", 400);
    }
    payload = body as ContactPayload;
  } catch {
    return jsonError("Invalid request body.", 400);
  }

  // Silently accept filled honeypot submissions without forwarding them.
  if (typeof payload.website === "string" && payload.website.trim()) {
    return Response.json({ success: true });
  }

  const address = clientAddress(request);
  const limit = isRateLimited(address);
  if (limit.limited) {
    return jsonError("Too many messages. Please try again later.", 429, {
      "Retry-After": String(limit.retryAfter),
    });
  }

  const name = typeof payload.name === "string" ? payload.name.trim() : "";
  const email = typeof payload.email === "string" ? payload.email.trim() : "";
  const message = typeof payload.message === "string" ? payload.message.trim() : "";

  if (!name || name.length > 100) return jsonError("Enter a name of 1 to 100 characters.", 400);
  if (email.length > 254 || !EMAIL_PATTERN.test(email)) {
    return jsonError("Enter a valid email address.", 400);
  }
  if (message.length < 10 || message.length > 5_000) {
    return jsonError("Your message must be between 10 and 5,000 characters.", 400);
  }

  if (!(await verifyTurnstile(payload.turnstileToken, address))) {
    return jsonError("Spam verification failed. Please try again.", 400);
  }

  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.CONTACT_TO_EMAIL;
  if (!apiKey || !toEmail) {
    console.error("Contact form configuration error: RESEND_API_KEY and CONTACT_TO_EMAIL must both be set.");
    return jsonError("Your message could not be sent.", 503);
  }

  try {
    const content = emailContent(request, name, email, message, address);
    const resend = new Resend(apiKey);
    const { data, error } = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: toEmail,
      replyTo: email,
      ...content,
    });

    if (error || !data) {
      return jsonError("Your message could not be sent.", 502);
    }

    return Response.json({ success: true });
  } catch {
    return jsonError("Your message could not be sent.", 502);
  }
}
