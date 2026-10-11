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
    const resend = new Resend(apiKey);
    const { data, error } = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: toEmail,
      replyTo: email,
      subject: `New portfolio message from ${name}`,
      text: message,
    });

    if (error || !data) {
      return jsonError("Your message could not be sent.", 502);
    }

    return Response.json({ success: true });
  } catch {
    return jsonError("Your message could not be sent.", 502);
  }
}
