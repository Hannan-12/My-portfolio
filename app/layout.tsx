import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

const siteUrl = "https://hannanhafeez.vercel.app";
const title = "Muhammad Hannan Hafeez | Full Stack Developer";
const description = "Muhammad Hannan Hafeez is a Software Engineer and Full Stack Developer specializing in React, Next.js, Angular, and ASP.NET. Open to remote work and relocation.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  alternates: { canonical: "/" },
  openGraph: { title, description, url: "/", siteName: "Muhammad Hannan Hafeez", type: "website" },
  twitter: { card: "summary_large_image", title, description },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Muhammad Hannan Hafeez",
  alternateName: "Hannan Hafeez",
  jobTitle: "Full Stack Developer",
  url: "https://hannanhafeez.vercel.app",
  sameAs: ["https://github.com/hannan-12", "https://www.linkedin.com/in/muhammad-hannan-hafeez-/"],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="scroll-smooth dark">
      <body suppressHydrationWarning className={`${inter.className} bg-[#0b0b14] text-slate-100 antialiased`}>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        {children}
      </body>
    </html>
  );
}
