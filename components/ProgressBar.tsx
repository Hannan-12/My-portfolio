"use client";
import { useEffect } from "react";

export default function ProgressBar() {
  useEffect(() => {
    const bar = document.getElementById("progress-bar");
    const onScroll = () => {
      const scrolled = window.scrollY;
      const total = document.body.scrollHeight - window.innerHeight;
      if (bar) bar.style.width = `${(scrolled / total) * 100}%`;
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return <div id="progress-bar" />;
}
