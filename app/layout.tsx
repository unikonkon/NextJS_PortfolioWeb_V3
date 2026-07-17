import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Suthep Jantawee | Full Stack Developer",
  description: "Full Stack Developer with 4 years of experience building web and desktop applications with React, Next.js, and NestJS. Specializing in end-to-end features, from API design and database integration to production front-ends.",
  keywords: [
    "Suthep Jantawee",
    "Full Stack Developer",
    "Front-End Developer",
    "Back-End Developer",
    "Next.js",
    "React",
    "TypeScript",
    "Node.js",
    "NestJS",
    "Portfolio",
    "Web Developer Thailand",
    "Bangkok Developer",
  ],
  authors: [{ name: "Suthep Jantawee" }],
  creator: "Suthep Jantawee",
  openGraph: {
    title: "Suthep Jantawee | Full Stack Developer",
    description: "Full Stack Developer with 4 years of experience. Specializing in Next.js, React, TypeScript, and AI integrations.",
    type: "website",
    locale: "en_US",
    url: "https://bananafaraday.vercel.app",
    siteName: "Suthep Jantawee Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Suthep Jantawee | Full Stack Developer",
    description: "Full Stack Developer with 4 years of experience. Specializing in Next.js, React, TypeScript, and AI integrations.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="theme-color" content="#0a0a0a" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#0a0a0a] text-[#fafafa]`}
      >
        {children}
      </body>
    </html>
  );
}
