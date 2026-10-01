"use client";
import { useReveal } from "@/hooks/useReveal";
import Image from "next/image";
import { useState } from "react";
import { FiExternalLink, FiGithub, FiChevronDown, FiChevronUp } from "react-icons/fi";

const projects = [
  {
    name: "RideOnClick",
    desc: "A chauffeur booking platform for Dubai, Abu Dhabi, and Sharjah, with airport transfers, hourly city tours, booking updates, and driver confirmation through WhatsApp.",
    image: "/rideonclick.png",
    imgPos: "object-top",
    link: "https://rideonclick.com",
    github: null,
    tech: ["Next.js", "Chauffeur Booking", "Live Tracking"],
  },
  {
    name: "Nookbite",
    desc: "A restaurant platform with online ordering and checkout, plus a staff dashboard for attendance, inventory, vendor accounts, and sales.",
    image: "/nookbite.png",
    imgPos: "object-top",
    link: "https://thenookbite.com",
    github: null,
    tech: ["Next.js", "Supabase", "POS", "Redis", "TypeScript"],
  },
  {
    name: "DevSkill Tracker",
    desc: "A skill tracker that uses AI to assess developers’ technical skills and show progress on a leaderboard.",
    image: "/devskill.png",
    imgPos: "object-top",
    link: "https://fyp-ten-gray.vercel.app",
    github: "https://github.com/Hannan-12/FYP",
    tech: ["Next.js", "AI", "Firebase", "Leaderboard"],
  },
  {
    name: "GoHighReview",
    desc: "A platform for businesses to collect and display customer reviews.",
    image: "/Gohighreview.png",
    imgPos: "object-top",
    link: "https://www.gohighreview.de/",
    github: "https://github.com/Hannan-12/reviewflow",
    tech: ["Next.js", "Supabase", "TypeScript"],
  },
  {
    name: "Zaraiverse",
    desc: "A mobile app for farmers, agricultural experts, and sellers in Pakistan, with a marketplace, expert consultations, and English and Urdu support.",
    image: "/Zaraiverse.png",
    imgPos: "object-[center_15%]",
    link: "https://github.com/Hannan-12/Zaraiverse",
    github: "https://github.com/Hannan-12/Zaraiverse",
    tech: ["React Native", "Expo", "Axios", "i18n", "Agri-Tech"],
  },
  {
    name: "Apayments Network",
    desc: "A cryptocurrency platform that connects two APIs to support buying and selling.",
    image: "/Apayments.png",
    imgPos: "object-top",
    link: "https://www.apaymentsnetwork.com/",
    github: null,
    tech: ["React", "API Integration", "Crypto"],
  },
  {
    name: "Blog Website",
    desc: "A blog built with Next.js and Tailwind CSS, with pages generated from dynamic routes.",
    image: "/blog.png",
    imgPos: "object-top",
    link: "https://blog-website-one-taupe.vercel.app",
    github: null,
    tech: ["Next.js", "Tailwind CSS", "Vercel"],
  },
  {
    name: "Personal Portfolio (Client)",
    desc: "A React portfolio site for a client, featuring project galleries and animated page elements.",
    image: "/portfolio.png",
    imgPos: "object-top",
    link: "https://moiz-protfolio.vercel.app/",
    github: null,
    tech: ["React", "CSS Animations", "Vercel"],
  },
  {
    name: "Megaohm",
    desc: "An online store for electrical tools with an AI chatbot.",
    image: "/megaohm.png",
    imgPos: "object-top",
    link: "https://megaohm.ae",
    github: null,
    tech: ["E-commerce", "AI Chatbot", "Responsive"],
  },
  {
    name: "Book Website",
    desc: "A book showcase site with a theme toggle and responsive layout.",
    image: "/book.png",
    imgPos: "object-top",
    link: "https://book-website-git-main-hannan-12s-projects.vercel.app/",
    github: null,
    tech: ["HTML", "CSS", "JavaScript"],
  },
];

export default function Projects() {
  const ref = useReveal();
  const [showAll, setShowAll] = useState(false);

  const visible = showAll ? projects : projects.slice(0, 3);

  return (
    <section id="projects" className="py-24 px-5 max-w-6xl mx-auto">
      <div ref={ref} className="reveal">
        <p className="text-indigo-400 font-semibold text-sm uppercase tracking-widest mb-2">What I&apos;ve built</p>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-10">Featured Projects</h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {visible.map((p) => (
            <div
              key={p.name}
              className="group flex flex-col bg-white/3 border border-white/7 rounded-2xl overflow-hidden hover:border-indigo-500/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-indigo-500/5"
            >
              <div className="relative h-44 overflow-hidden bg-slate-900">
                <Image
                  src={p.image}
                  alt={p.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className={`object-cover ${p.imgPos} group-hover:scale-105 transition-transform duration-500`}
                />
                <div className="absolute inset-0 bg-linear-to-t from-[#0b0b14] via-transparent to-transparent opacity-60" />
              </div>

              <div className="flex flex-col flex-1 p-5">
                <h3 className="text-white font-bold text-base mb-2">{p.name}</h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-4 flex-1">{p.desc}</p>

                <div className="flex flex-wrap gap-1.5 mb-4">
                  {p.tech.map((t) => (
                    <span key={t} className="text-xs px-2 py-0.5 rounded-md bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                      {t}
                    </span>
                  ))}
                </div>

                <div className="flex gap-3 pt-3 border-t border-white/6">
                  <a
                    href={p.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-sm text-indigo-400 hover:text-indigo-300 font-medium transition-colors"
                  >
                    <FiExternalLink className="w-3.5 h-3.5" /> Live Site
                  </a>
                  {p.github && (
                    <a
                      href={p.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-sm text-slate-400 hover:text-white font-medium transition-colors"
                    >
                      <FiGithub className="w-3.5 h-3.5" /> Source
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-10">
          <button
            onClick={() => setShowAll(!showAll)}
            className="flex items-center gap-2 px-6 py-3 rounded-xl border border-white/10 text-slate-300 hover:text-white hover:border-indigo-500/40 hover:bg-indigo-500/10 font-semibold transition-all duration-200"
          >
            {showAll ? (
              <><FiChevronUp className="w-4 h-4" /> Show Less</>
            ) : (
              <><FiChevronDown className="w-4 h-4" /> Show More ({projects.length - 3} more)</>
            )}
          </button>
        </div>
      </div>
    </section>
  );
}
