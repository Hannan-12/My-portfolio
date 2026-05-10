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
              Hi! I&apos;m <span className="text-white font-semibold">Muhammad Hannan Hafeez</span>, a Full-Stack
              Developer & Software Engineer passionate about building modern, responsive, and user-friendly web
              applications. I specialize in React, Next.js, Angular, ASP.NET, Python, HTML, CSS, and JavaScript,
              transforming UI/UX designs into fully functional, scalable applications.
            </p>
            <p className="text-slate-400 text-base leading-relaxed">
              I&apos;ve gained hands-on experience through internships and projects, developing e-commerce platforms,
              dynamic dashboards, and content-rich websites that combine performance, clean design, and seamless
              functionality. I thrive on solving problems with code and continuously learning cutting-edge technologies
              to deliver exceptional digital experiences — from front-end to back-end.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {[
              { label: "Years Learning", value: "3+" },
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
