"use client";
import { useReveal } from "@/hooks/useReveal";
import {
  SiHtml5,
  SiCss,
  SiJavascript,
  SiTypescript,
  SiReact,
  SiNextdotjs,
  SiAngular,
  SiBootstrap,
  SiTailwindcss,
  SiPython,
  SiDotnet,
  SiFastapi,
  SiSupabase,
  SiPostgresql,
  SiFirebase,
  SiSqlite,
  SiMysql,
  SiGit,
  SiDocker,
  SiVercel,
  SiHuggingface,
  SiMeta,
} from "react-icons/si";
import { FiSearch } from "react-icons/fi";

const groups = [
  {
    name: "Frontend",
    skills: [
      { name: "HTML5", icon: SiHtml5, color: "text-orange-500" },
      { name: "CSS3", icon: SiCss, color: "text-blue-500" },
      { name: "JavaScript", icon: SiJavascript, color: "text-yellow-400" },
      { name: "TypeScript", icon: SiTypescript, color: "text-blue-400" },
      { name: "React", icon: SiReact, color: "text-cyan-400" },
      { name: "Next.js", icon: SiNextdotjs, color: "text-white" },
      { name: "Angular", icon: SiAngular, color: "text-red-500" },
      { name: "Bootstrap", icon: SiBootstrap, color: "text-violet-500" },
      { name: "Tailwind CSS", icon: SiTailwindcss, color: "text-teal-400" },
    ],
  },
  {
    name: "Backend",
    skills: [
      { name: "Python", icon: SiPython, color: "text-sky-400" },
      { name: "ASP.NET", icon: SiDotnet, color: "text-violet-400" },
      { name: "FastAPI", icon: SiFastapi, color: "text-emerald-400" },
    ],
  },
  {
    name: "Database",
    skills: [
      { name: "Supabase", icon: SiSupabase, color: "text-emerald-400" },
      { name: "PostgreSQL", icon: SiPostgresql, color: "text-sky-400" },
      { name: "Firebase", icon: SiFirebase, color: "text-amber-400" },
      { name: "SQLite", icon: SiSqlite, color: "text-sky-300" },
      { name: "MySQL", icon: SiMysql, color: "text-blue-300" },
    ],
  },
  {
    name: "DevOps",
    skills: [
      { name: "Git", icon: SiGit, color: "text-orange-400" },
      { name: "Docker", icon: SiDocker, color: "text-sky-400" },
      { name: "Vercel", icon: SiVercel, color: "text-white" },
    ],
  },
  {
    name: "AI/ML",
    skills: [
      { name: "CodeBERT", icon: SiHuggingface, color: "text-amber-400" },
      { name: "LLaMA-3 (LoRA)", icon: SiMeta, color: "text-blue-400" },
      { name: "RAG", icon: FiSearch, color: "text-indigo-300" },
    ],
  },
];

export default function Expertise() {
  const ref = useReveal();

  return (
    <section id="expertise" className="py-16 px-5 max-w-6xl mx-auto">
      <div ref={ref} className="reveal">
        <p className="text-indigo-400 font-semibold text-sm uppercase tracking-widest mb-2">What I work with</p>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-10">Expertise</h2>

        <div className="space-y-8">
          {groups.map((group) => (
            <div key={group.name}>
              <h3 className="text-white font-semibold text-lg mb-4">{group.name}</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {group.skills.map(({ name, icon: Icon, color }) => (
                  <div
                    key={name}
                    className="group flex flex-col items-center justify-center gap-3 p-5 rounded-2xl bg-white/3 border border-white/7 hover:border-indigo-500/30 hover:bg-white/6 transition-all duration-200 hover:-translate-y-1"
                  >
                    <Icon className={`w-8 h-8 ${color} group-hover:scale-110 transition-transform duration-200`} />
                    <span className="text-slate-300 text-sm font-medium text-center">{name}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
