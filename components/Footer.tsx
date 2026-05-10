import { FiGithub, FiLinkedin, FiMail } from "react-icons/fi";

export default function Footer() {
  return (
    <footer className="border-t border-white/6 py-8 px-5">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-slate-500 text-sm">
          © {new Date().getFullYear()} Muhammad Hannan Hafeez. All rights reserved.
        </p>
        <div className="flex gap-4">
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
              className="text-slate-500 hover:text-indigo-400 transition-colors"
            >
              <Icon className="w-4 h-4" />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
