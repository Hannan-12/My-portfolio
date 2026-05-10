"use client";
import { useReveal } from "@/hooks/useReveal";
import {
  SiHtml5, SiCss, SiJavascript, SiPython, SiDotnet,
  SiReact, SiNextdotjs, SiAngular, SiBootstrap, SiTailwindcss,
  SiTypescript, SiGit,
} from "react-icons/si";

const skills = [
  { name: "HTML5", icon: SiHtml5, color: "text-orange-500" },
  { name: "CSS3", icon: SiCss, color: "text-blue-500" },
  { name: "JavaScript", icon: SiJavascript, color: "text-yellow-400" },
  { name: "TypeScript", icon: SiTypescript, color: "text-blue-400" },
  { name: "Python", icon: SiPython, color: "text-sky-400" },
  { name: "ASP.NET", icon: SiDotnet, color: "text-purple-500" },
  { name: "React", icon: SiReact, color: "text-cyan-400" },
  { name: "Next.js", icon: SiNextdotjs, color: "text-white" },
  { name: "Angular", icon: SiAngular, color: "text-red-500" },
  { name: "Bootstrap", icon: SiBootstrap, color: "text-violet-500" },
  { name: "Tailwind", icon: SiTailwindcss, color: "text-teal-400" },
  { name: "Git", icon: SiGit, color: "text-orange-400" },
];

export default function Expertise() {
  const ref = useReveal();

  return (
    <section id="expertise" className="py-24 px-5 max-w-6xl mx-auto">
      <div ref={ref} className="reveal">
        <p className="text-indigo-400 font-semibold text-sm uppercase tracking-widest mb-2">What I work with</p>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-10">Expertise</h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {skills.map(({ name, icon: Icon, color }) => (
            <div
              key={name}
              className="group flex flex-col items-center gap-3 p-5 rounded-2xl bg-white/3 border border-white/7 hover:border-indigo-500/30 hover:bg-white/6 transition-all duration-200 hover:-translate-y-1"
            >
              <Icon className={`w-8 h-8 ${color} group-hover:scale-110 transition-transform duration-200`} />
              <span className="text-slate-300 text-sm font-medium">{name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
