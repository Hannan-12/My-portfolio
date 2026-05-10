"use client";
import { useReveal } from "@/hooks/useReveal";
import { HiAcademicCap } from "react-icons/hi2";

const education = [
  {
    degree: "BS Software Engineering",
    institution: "PAF-IAST (Pak-Austria Fachhochschule)",
    period: "2022 – 2026",
    desc: "Currently pursuing a Bachelor of Science in Software Engineering. This comprehensive program provides a rigorous technical framework in core computing disciplines, including Algorithms, Database Systems, and Software Architecture.",
  },
  {
    degree: "FSc Pre-Engineering",
    institution: "Punjab College, Mandi Bahauddin",
    period: "2020 – 2022",
    desc: "Successfully completed my Higher Secondary School Certificate in Pre-Engineering, providing a strong foundation in mathematics and physics that underpins my analytical approach to software development.",
  },
];

export default function Education() {
  const ref = useReveal();

  return (
    <section id="education" className="py-24 px-5 max-w-6xl mx-auto">
      <div ref={ref} className="reveal">
        <p className="text-indigo-400 font-semibold text-sm uppercase tracking-widest mb-2">Academic background</p>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-10">Education</h2>

        <div className="relative pl-6 border-l-2 border-indigo-500/20 space-y-10">
          {education.map((edu, i) => (
            <div key={i} className="relative">
              <div className="absolute -left-7.25 w-4 h-4 rounded-full bg-indigo-500 border-4 border-[#0b0b14] timeline-dot" />
              <div className="bg-white/3 border border-white/7 rounded-2xl p-6 hover:border-indigo-500/30 transition-colors">
                <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-2">
                    <HiAcademicCap className="w-5 h-5 text-indigo-400 shrink-0" />
                    <h3 className="text-white font-bold text-lg">{edu.degree}</h3>
                  </div>
                  <span className="text-xs font-semibold px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                    {edu.period}
                  </span>
                </div>
                <p className="text-indigo-300 font-medium text-sm mb-3">{edu.institution}</p>
                <p className="text-slate-400 text-sm leading-relaxed">{edu.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
