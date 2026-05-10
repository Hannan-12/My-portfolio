import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Muhammad Hannan Hafeez — Full Stack Developer",
  description:
    "Software Engineer & Full Stack Developer specializing in React, Next.js, Angular, and ASP.NET. Based in Lahore, Pakistan.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="scroll-smooth dark">
      <body suppressHydrationWarning className={`${inter.className} bg-[#0b0b14] text-slate-100 antialiased`}>
        {children}
      </body>
    </html>
  );
}
