"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { FiGithub, FiLinkedin, FiMail, FiDownload } from "react-icons/fi";

const roles = ["Full Stack Developer", "Software Engineer", "React & Next.js Dev"];

export default function Hero() {
  const [displayed, setDisplayed] = useState("");
  const [roleIndex, setRoleIndex] = useState(0);
  const [typing, setTyping] = useState(true);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    const current = roles[roleIndex];
    if (typing) {
      if (displayed.length < current.length) {
        timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 110);
      } else {
        timeout = setTimeout(() => setTyping(false), 1800);
      }
    } else {
      if (displayed.length > 0) {
        timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 55);
      } else {
        setRoleIndex((i) => (i + 1) % roles.length);
        setTyping(true);
      }
    }
    return () => clearTimeout(timeout);
  }, [displayed, typing, roleIndex]);

  return (
    <section className="relative min-h-screen flex items-center mesh-bg overflow-hidden pt-16">
      <div
        className="absolute inset-0 opacity-4"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.5) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.5) 1px,transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-5 py-24 flex flex-col-reverse md:flex-row items-center justify-between gap-16 w-full">
        <div className="flex-1 text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-sm font-medium mb-6">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            Available for opportunities
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-4">
            Hi, I&apos;m{" "}
            <span className="gradient-text">Muhammad Hannan</span>
          </h1>

          <h2 className="text-xl sm:text-2xl font-semibold text-slate-300 mb-6 h-8">
            <span className="typing-cursor">{displayed}</span>
          </h2>

          <p className="text-slate-400 text-base sm:text-lg leading-relaxed max-w-lg mb-8">
            Full Stack Developer specializing in creating modern, responsive, and
            user-friendly web applications — from front-end to back-end.
          </p>

          <div className="flex flex-wrap gap-3 justify-center md:justify-start mb-10">
            <a
              href="#projects"
              className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold transition-all duration-200 hover:-translate-y-0.5 shadow-lg shadow-indigo-600/25"
            >
              View Projects
            </a>
            <a
              href="#contact"
              className="px-6 py-3 rounded-xl border border-white/10 text-slate-300 hover:text-white hover:border-white/20 hover:bg-white/5 font-semibold transition-all duration-200 hover:-translate-y-0.5"
            >
              Contact Me
            </a>
            <a
              href="/hannan-cv.pdf"
              target="_blank"
              className="px-6 py-3 rounded-xl border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10 font-semibold flex items-center gap-2 transition-all duration-200 hover:-translate-y-0.5"
            >
              <FiDownload className="w-4 h-4" /> Resume
            </a>
          </div>

          <div className="flex gap-4 justify-center md:justify-start">
            {[
              { icon: FiGithub, href: "https://github.com/hannan-12", label: "GitHub" },
              { icon: FiLinkedin, href: "https://www.linkedin.com/in/muhammad-hannan-hafeez-/", label: "LinkedIn" },
              { icon: FiMail, href: "mailto:mhannanhafeez@icloud.com", label: "Email" },
            ].map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-indigo-500/20 hover:border-indigo-500/30 transition-all duration-200"
              >
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>

        <div className="shrink-0">
          <div className="relative float-anim">
            <div className="absolute inset-0 rounded-full bg-linear-to-br from-indigo-600 to-violet-600 blur-2xl opacity-25 scale-110" />
            <div className="relative w-56 h-56 sm:w-72 sm:h-72 rounded-full border-2 border-white/10 overflow-hidden ring-4 ring-indigo-500/20">
              <Image src="/hannan.jpg" alt="Muhammad Hannan Hafeez" fill className="object-cover object-top" priority />
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-slate-500 text-xs">
        <span>Scroll</span>
        <div className="w-px h-8 bg-linear-to-b from-slate-500 to-transparent" />
      </div>
    </section>
  );
}
