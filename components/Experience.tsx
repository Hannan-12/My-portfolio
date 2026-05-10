"use client";
import { useReveal } from "@/hooks/useReveal";
import { HiBriefcase } from "react-icons/hi2";

const experience = [
  {
    role: "Front-End Developer Intern",
    company: "Dextrologix Pvt Ltd",
    location: "Lahore",
    period: "July 2023 – September 2023",
    bullets: [
      "Built and designed responsive web pages using HTML, CSS, and JavaScript.",
      "Translated UI/UX designs into functional websites with smooth user experience.",
      "Ensured cross-browser and cross-device compatibility.",
      "Used Git for version control and team collaboration.",
    ],
    tech: ["HTML", "CSS", "JavaScript", "Git"],
  },
  {
    role: "Web Developer Intern",
    company: "E-stamping Office, Arfa Karim Tower",
    location: "Lahore",
    period: "July 2024 – August 2024",
    bullets: [
      "Built web pages using HTML, CSS, and JavaScript.",
      "Added interactive features with JavaScript.",
      "Worked with ASP.NET for web application development.",
      "Made websites responsive and user-friendly.",
    ],
    tech: ["HTML", "CSS", "JavaScript", "ASP.NET"],
  },
  {
    role: "Content Writer",
    company: "Techno Bazz",
    location: "",
    period: "October 2023 – August 2024",
    bullets: [
      "Created engaging and SEO-friendly articles, blogs, and product descriptions.",
      "Researched tech-related topics to produce accurate, informative content.",
      "Collaborated with the web development team to align content with site design and user flow.",
    ],
    tech: ["SEO", "Content Strategy", "Technical Writing"],
  },
];

export default function Experience() {
  const ref = useReveal();

  return (
    <section id="experience" className="py-24 px-5 max-w-6xl mx-auto">
      <div ref={ref} className="reveal">
        <p className="text-indigo-400 font-semibold text-sm uppercase tracking-widest mb-2">Where I&apos;ve worked</p>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-10">Work Experience</h2>

        <div className="relative pl-6 border-l-2 border-indigo-500/20 space-y-10">
          {experience.map((exp, i) => (
            <div key={i} className="relative">
              <div className="absolute -left-7.25 w-4 h-4 rounded-full bg-violet-500 border-4 border-[#0b0b14] timeline-dot" />
              <div className="bg-white/3 border border-white/7 rounded-2xl p-6 hover:border-violet-500/30 transition-colors">
                <div className="flex flex-wrap items-start justify-between gap-3 mb-1">
                  <div className="flex items-center gap-2">
                    <HiBriefcase className="w-5 h-5 text-violet-400 shrink-0" />
                    <h3 className="text-white font-bold text-lg">{exp.role}</h3>
                  </div>
                  <span className="text-xs font-semibold px-3 py-1 rounded-full bg-violet-500/10 text-violet-400 border border-violet-500/20 whitespace-nowrap">
                    {exp.period}
                  </span>
                </div>
                <p className="text-violet-300 font-medium text-sm mb-4">
                  {exp.company}{exp.location ? `, ${exp.location}` : ""}
                </p>
                <ul className="space-y-1.5 mb-5">
                  {exp.bullets.map((b, j) => (
                    <li key={j} className="flex gap-2 text-slate-400 text-sm">
                      <span className="text-violet-500 mt-0.5 shrink-0">▸</span>
                      {b}
                    </li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-2">
                  {exp.tech.map((t) => (
                    <span key={t} className="text-xs px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-slate-300">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
