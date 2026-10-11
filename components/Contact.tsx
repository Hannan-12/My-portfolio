"use client";
import { useReveal } from "@/hooks/useReveal";
import { useState } from "react";
import { FiMail, FiLinkedin, FiSend } from "react-icons/fi";

export default function Contact() {
  const ref = useReveal();
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [form, setForm] = useState({ name: "", email: "", message: "", website: "" });
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    setErrorMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const result = (await response.json().catch(() => null)) as
        | { success?: boolean; message?: string }
        | null;

      if (!response.ok || !result?.success) {
        setErrorMessage(result?.message || "Your message could not be sent.");
        setStatus("error");
        return;
      }

      setStatus("success");
      setForm({ name: "", email: "", message: "", website: "" });
    } catch {
      setErrorMessage("Your message could not be sent. Please email me directly.");
      setStatus("error");
    }
  };

  const mailtoFallback = `mailto:mhannanhafeez@icloud.com?subject=${encodeURIComponent(
    `Portfolio contact from ${form.name || "website visitor"}`
  )}&body=${encodeURIComponent(`${form.message}\n\nFrom: ${form.name}\n${form.email}`)}`;

  const info = [
    { icon: FiMail, label: "Email", value: "mhannanhafeez@icloud.com", href: "mailto:mhannanhafeez@icloud.com" },
    { icon: FiLinkedin, label: "LinkedIn", value: "Muhammad Hannan Hafeez", href: "https://www.linkedin.com/in/muhammad-hannan-hafeez-/" },
  ];

  return (
    <section id="contact" className="py-16 px-5 max-w-6xl mx-auto">
      <div ref={ref} className="reveal">
        <p className="text-indigo-400 font-semibold text-sm uppercase tracking-widest mb-2">Get in touch</p>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-10">Contact Me</h2>

        <div className="grid md:grid-cols-5 gap-8 items-start">
          <div className="md:col-span-2 space-y-4">
            {info.map(({ icon: Icon, label, value, href }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 rounded-2xl bg-white/3 border border-white/7 hover:border-indigo-500/30 hover:bg-white/5 transition-all group"
              >
                <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center shrink-0">
                  <Icon className="w-4 h-4 text-indigo-400" />
                </div>
                <div>
                  <p className="text-slate-500 text-xs mb-0.5">{label}</p>
                  <p className="text-slate-200 text-sm font-medium group-hover:text-white transition-colors">{value}</p>
                </div>
              </a>
            ))}
          </div>

          <form
            onSubmit={handleSubmit}
            className="md:col-span-3 bg-white/3 border border-white/7 rounded-2xl p-6 space-y-5"
          >
            <div aria-hidden="true" className="absolute left-[-10000px] h-px w-px overflow-hidden">
              <label htmlFor="contact-website">Leave this field blank</label>
              <input
                id="contact-website"
                name="website"
                type="text"
                tabIndex={-1}
                autoComplete="off"
                value={form.website}
                onChange={(e) => setForm({ ...form, website: e.target.value })}
              />
            </div>
            <div className="grid sm:grid-cols-2 gap-5">
              <div className="flex flex-col gap-1.5">
                <label htmlFor="contact-name" className="text-slate-400 text-sm">Your Name</label>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  required
                  maxLength={100}
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="John Doe"
                  className="bg-white/4 border border-white/8 rounded-xl px-4 py-3 text-white text-sm placeholder:text-slate-600 outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/30 transition"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="contact-email" className="text-slate-400 text-sm">Your Email</label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  required
                  maxLength={254}
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="john@example.com"
                  className="bg-white/4 border border-white/8 rounded-xl px-4 py-3 text-white text-sm placeholder:text-slate-600 outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/30 transition"
                />
              </div>
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="contact-message" className="text-slate-400 text-sm">Message</label>
              <textarea
                id="contact-message"
                name="message"
                required
                minLength={10}
                maxLength={5000}
                rows={5}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                placeholder="Tell me about your project..."
                className="bg-white/4 border border-white/8 rounded-xl px-4 py-3 text-white text-sm placeholder:text-slate-600 outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/30 transition resize-none"
              />
            </div>
            <button
              type="submit"
              disabled={status === "sending"}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-60 text-white font-semibold transition-all duration-200 hover:-translate-y-0.5"
            >
              {status === "sending" ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Sending…
                </>
              ) : (
                <>
                  <FiSend className="w-4 h-4" /> Send Message
                </>
              )}
            </button>
            {status === "success" && (
              <p role="status" className="text-center text-emerald-400 text-sm">Message sent successfully!</p>
            )}
            {status === "error" && (
              <p role="alert" className="text-center text-red-400 text-sm">
                {errorMessage || "Something went wrong."} {" "}
                <a href={mailtoFallback} className="underline underline-offset-2 hover:text-red-300">
                  Email me instead
                </a>
                .
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
