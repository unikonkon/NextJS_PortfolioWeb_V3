"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const socialLinks = [
  {
    name: "GitHub",
    href: "https://github.com/bananafaraday",
    username: "bananafaraday",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
      </svg>
    ),
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com/in/suthep-jantawee",
    username: "suthep-jantawee",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    name: "Email",
    href: "mailto:bananammm0001@gmail.com",
    username: "bananammm0001@gmail.com",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
];

const quickLinks = [
  { name: "Home", href: "#home" },
  { name: "Projects", href: "#work" },
  { name: "Skills", href: "#skills" },
  { name: "Experience", href: "#experience" },
  { name: "About", href: "#about" },
];

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!footerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power3.out",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top bottom-=100",
            toggleActions: "play none none none",
          },
        }
      );
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer
      id="contact"
      ref={footerRef}
      className="relative border-t border-[#262626] bg-[#0a0a0a]"
    >
      {/* Contact Section */}
      <div ref={contentRef} className="max-w-6xl mx-auto px-6 py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-4 mb-4">
            <span className="h-px w-12 bg-gradient-to-r from-transparent to-[#10b981]" />
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-[#10b981]">
              CONTACT
            </span>
            <span className="h-px w-12 bg-gradient-to-l from-transparent to-[#10b981]" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            <span className="font-mono text-[#ec4899]">POST</span>{" "}
            <span className="text-[#52525b]">/api/</span>
            <span className="gradient-text-cyan">contact</span>
          </h2>
          <p className="text-[#a1a1aa] max-w-lg mx-auto">
            I&apos;m currently open to new opportunities as a Front-End, Back-End, or Full Stack Developer.
          </p>
        </div>

        {/* Availability Badge */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-[#10b981]/10 border border-[#10b981]/30 rounded-full">
            <span className="w-3 h-3 bg-[#10b981] rounded-full animate-pulse" />
            <span className="font-mono text-sm text-[#10b981]">Available for opportunities</span>
          </div>
        </div>

        {/* Contact Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* Email Card */}
          <a
            href="mailto:bananammm0001@gmail.com"
            className="group p-6 rounded-xl bg-[#141414] border border-[#262626] hover:border-[#ec4899]/30 transition-all duration-300 hover:-translate-y-1"
          >
            <div className="flex items-center gap-4 mb-3">
              <div className="w-12 h-12 rounded-lg bg-[#ec4899]/10 flex items-center justify-center text-[#ec4899] group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <span className="block font-mono text-xs text-[#52525b]">email</span>
                <span className="text-white group-hover:text-[#ec4899] transition-colors">bananammm0001@gmail.com</span>
              </div>
            </div>
          </a>

          {/* Phone Card */}
          <a
            href="tel:0901834036"
            className="group p-6 rounded-xl bg-[#141414] border border-[#262626] hover:border-[#8b5cf6]/30 transition-all duration-300 hover:-translate-y-1"
          >
            <div className="flex items-center gap-4 mb-3">
              <div className="w-12 h-12 rounded-lg bg-[#8b5cf6]/10 flex items-center justify-center text-[#8b5cf6] group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <div>
                <span className="block font-mono text-xs text-[#52525b]">phone</span>
                <span className="text-white group-hover:text-[#8b5cf6] transition-colors">090-183-4036</span>
              </div>
            </div>
          </a>

          {/* Location Card */}
          <div className="group p-6 rounded-xl bg-[#141414] border border-[#262626] hover:border-[#06b6d4]/30 transition-all duration-300 hover:-translate-y-1 cursor-default">
            <div className="flex items-center gap-4 mb-3">
              <div className="w-12 h-12 rounded-lg bg-[#06b6d4]/10 flex items-center justify-center text-[#06b6d4] group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <span className="block font-mono text-xs text-[#52525b]">location</span>
                <span className="text-white group-hover:text-[#06b6d4] transition-colors">Bangkok, Thailand</span>
              </div>
            </div>
          </div>
        </div>

        {/* Social Links */}
        <div className="flex justify-center gap-4 mb-12">
          {socialLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group p-4 rounded-xl bg-[#141414] border border-[#262626] hover:border-[#8b5cf6]/30 transition-all duration-300 hover:-translate-y-1"
              aria-label={link.name}
            >
              <div className="text-[#52525b] group-hover:text-[#8b5cf6] transition-colors">
                {link.icon}
              </div>
            </a>
          ))}
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-[#262626] to-transparent mb-8" />

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Copyright */}
          <div className="font-mono text-sm text-[#52525b]">
            <span className="text-[#10b981]">{"// "}</span>
            &copy; 2025 Suthep Jantawee
          </div>

          {/* Quick Links */}
          <div className="flex flex-wrap justify-center gap-4">
            {quickLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="font-mono text-xs text-[#52525b] hover:text-white transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Code Style Message */}
          <div className="font-mono text-xs text-[#52525b] hidden lg:block">
            <span className="text-[#8b5cf6]">const</span>{" "}
            <span className="text-[#ec4899]">status</span>{" "}
            <span className="text-white">=</span>{" "}
            <span className="text-[#10b981]">&quot;Available&quot;</span>
            <span className="text-white">;</span>
          </div>
        </div>

        {/* Built With */}
        <div className="mt-8 pt-6 border-t border-[#1a1a1a] flex justify-center">
          <div className="font-mono text-xs text-[#333] flex items-center gap-2">
            <span>Built with</span>
            <span className="text-[#ec4899]">{"<"}</span>
            <span className="text-[#52525b]">Next.js</span>
            <span className="text-[#ec4899]">{"/>"}</span>
            <span>+</span>
            <span className="text-[#52525b]">TailwindCSS</span>
            <span>+</span>
            <span className="text-[#52525b]">GSAP</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
