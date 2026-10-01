"use client";
import { useReveal } from "@/hooks/useReveal";

export default function About() {
  const ref = useReveal();

  return (
    <section id="about" className="py-24 px-5 max-w-6xl mx-auto">
      <div ref={ref} className="reveal">
        <p className="text-indigo-400 font-semibold text-sm uppercase tracking-widest mb-2">Get to know me</p>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-10">About Me</h2>

        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <p className="text-slate-300 text-base leading-relaxed mb-5">
              I&apos;m <span className="text-white font-semibold">Muhammad Hannan Hafeez</span>, a software engineer
              and full-stack developer based in Lahore, Pakistan. I work with React, Next.js, Angular, ASP.NET, and
              Python to build web applications, from implementing designs to connecting them with backend services.
            </p>
            <p className="text-slate-400 text-base leading-relaxed">
              My experience includes two internships and projects ranging from restaurant ordering and booking systems
              to dashboards and mobile apps. I enjoy working through practical problems, learning new tools, and
              improving the details that make an application useful.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {[
              { label: "GitHub Repos", value: "30+" },
              { label: "Projects Built", value: "10+" },
              { label: "Internships", value: "2" },
              { label: "Technologies", value: "10+" },
            ].map(({ label, value }) => (
              <div
                key={label}
                className="bg-white/3 border border-white/7 rounded-2xl p-5 text-center hover:border-indigo-500/30 transition-colors"
              >
                <p className="text-3xl font-extrabold gradient-text mb-1">{value}</p>
                <p className="text-slate-400 text-sm">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
