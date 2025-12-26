"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import Image from "next/image";

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const codeBlockRef = useRef<HTMLDivElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);
  const decorRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.2 });

      // Initial state - hide elements
      gsap.set([titleRef.current, subtitleRef.current, buttonsRef.current, codeBlockRef.current, statusRef.current], {
        opacity: 0,
        y: 30
      });
      gsap.set(imageContainerRef.current, { opacity: 0, scale: 0.9, x: 50 });
      gsap.set(decorRef.current, { opacity: 0 });

      // Glow pulse animation
      gsap.to(glowRef.current, {
        opacity: 0.6,
        scale: 1.1,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });

      // Image container reveal with stagger
      tl.to(imageContainerRef.current, {
        opacity: 1,
        scale: 1,
        x: 0,
        duration: 0.8,
        ease: "power3.out"
      });

      // Image inner animation
      tl.fromTo(
        imageRef.current,
        { clipPath: "inset(100% 0 0 0)" },
        { clipPath: "inset(0% 0 0 0)", duration: 0.7, ease: "power3.inOut" },
        "-=0.5"
      );

      // Title animation with text reveal
      tl.to(
        titleRef.current,
        { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
        "-=0.4"
      );

      // Code block animation
      tl.to(
        codeBlockRef.current,
        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
        "-=0.3"
      );

      // Subtitle animation
      tl.to(
        subtitleRef.current,
        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
        "-=0.2"
      );

      // Status badge
      tl.to(
        statusRef.current,
        { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" },
        "-=0.2"
      );

      // Buttons stagger animation
      tl.to(
        buttonsRef.current?.children || [],
        { opacity: 1, y: 0, duration: 0.4, stagger: 0.1, ease: "back.out(1.7)" },
        "-=0.2"
      );

      // Decorative elements
      tl.to(
        decorRef.current,
        { opacity: 1, duration: 0.5 },
        "-=0.3"
      );

      // Floating animation for image
      gsap.to(imageContainerRef.current, {
        y: -10,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 1.5
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center px-6 pt-28 overflow-hidden"
    >
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(139,92,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,246,0.03)_1px,transparent_1px)] bg-size-[60px_60px]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#0a0a0a_70%)]" />
      </div>

      {/* Main Content Container */}
      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">

          {/* Left Side - Text Content */}
          <div className="order-2 lg:order-1 text-center lg:text-left sm:ml-10">

            {/* Title Section */}
            <div ref={titleRef} className="mb-6">
              {/* Terminal-style label */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#141414] border border-[#262626] rounded-lg mb-6">
                <span className="w-2 h-2 bg-[#10b981] rounded-full animate-pulse" />
                <span className="font-mono text-xs text-[#52525b]">~/portfolio</span>
                <span className="font-mono text-xs text-[#10b981]">main</span>
              </div>

              {/* Main Title */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-4">
                <span className="text-[#52525b] font-mono text-lg sm:text-xl block mb-2">
                  {"// Hello, I'm"}
                </span>
                <span className="text-white block">Suthep <span className="gradient-text-purple">Jantawee</span></span>
              </h1>
            </div>

            {/* Code Block Role */}
            <div ref={codeBlockRef} className="mb-6">
              <div className="inline-block bg-[#0d0d0d] border border-[#262626] rounded-lg p-4 font-mono text-sm">
                <div className="flex items-center gap-2 text-[#52525b] mb-2">
                  <span className="text-[#8b5cf6]">const</span>
                  <span className="text-[#ec4899]">role</span>
                  <span className="text-white">=</span>
                </div>
                <div className="pl-4 text-lg sm:text-xl">
                  <span className="text-[#10b981]">&quot;Full Stack Developer&quot;</span>
                  <span className="text-[#52525b]">;</span>
                </div>
              </div>
            </div>

            {/* Subtitle / Bio */}
            <div ref={subtitleRef} className="mb-6">
              <p className="text-[#a1a1aa] text-base sm:text-lg max-w-md mx-auto lg:mx-0 leading-relaxed">
                Leveraging AI to write better code and create impactful digital experiences.
              </p>
            </div>

            {/* Status Badge */}
            {/* <div ref={statusRef} className="mb-8">
              <div className="inline-flex items-center gap-3 px-4 py-2 bg-[#10b981]/10 border border-[#10b981]/30 rounded-full">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10b981] opacity-75" />
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-[#10b981]" />
                </span>
                <span className="text-[#10b981] text-sm font-mono">Available for hire</span>
                <span className="text-[#52525b] text-xs font-mono">• 3+ years exp</span>
              </div>
            </div> */}

            {/* CTA Buttons */}
            <div ref={buttonsRef} className="flex flex-col sm:flex-row items-center lg:items-start justify-center lg:justify-start gap-4">
              <a href="#work" className="btn-primary group relative overflow-hidden text-sm">
                <span className="relative z-10 flex items-center gap-2">
                  <span>View Projects</span>
                  <svg
                    className="w-4 h-4 transition-transform group-hover:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </span>
              </a>
              <a
                href="/Resume Sutep Jantawee.pdf"
                target="_blank"
                download
                className="px-6 py-3 font-mono text-sm text-[#a1a1aa] hover:text-white border border-[#333] hover:border-[#8b5cf6] rounded-lg transition-all duration-300 hover:-translate-y-0.5"
              >
                <span className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Download CV
                </span>
              </a>
            </div>
          </div>

          {/* Right Side - Image */}
          <div className="order-1 lg:order-2 flex justify-center lg:justify-end sm:mr-10">
            <div
              ref={imageContainerRef}
              className="relative"
            >
              {/* Glow Effect */}
              <div
                ref={glowRef}
                className="absolute -inset-4 bg-linear-to-br from-[#8b5cf6]/30 via-[#ec4899]/20 to-[#06b6d4]/30 blur-3xl rounded-full opacity-40"
              />

              {/* Image Frame */}
              <div className="relative">
                {/* Decorative Frame Lines */}
                <div className="absolute -top-4 -left-4 w-20 h-20 border-l-2 border-t-2 border-[#8b5cf6]/50 rounded-tl-xl" />
                <div className="absolute -bottom-4 -right-4 w-20 h-20 border-r-2 border-b-2 border-[#ec4899]/50 rounded-br-xl" />

                {/* Main Image Container */}
                <div
                  ref={imageRef}
                  className="relative w-72 h-80 sm:w-80 sm:h-96 lg:w-96 lg:h-[480px] rounded-2xl overflow-hidden border-2 border-[#262626] bg-[#0d0d0d]"
                >
                  <Image
                    src="/person2.jpg"
                    alt="Suthep Jantawee"
                    fill
                    className="object-cover object-top"
                    priority
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-linear-to-t from-[#0a0a0a] via-transparent to-transparent opacity-60" />

                  {/* Bottom Info Bar */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-linear-to-t from-[#0a0a0a] to-transparent">
                    <div className="flex items-center gap-3">
                      <div className="flex-1">
                        <div className="font-mono text-xs text-[#52525b] mb-1">
                          <span className="text-[#10b981]">$</span> whoami
                        </div>
                        <div className="font-mono text-sm text-white">
                          suthep.dev
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <div className="w-10 h-10 rounded-lg bg-[#141414] border border-[#262626] flex items-center justify-center text-[#8b5cf6] cursor-pointer"
                          onClick={() => {
                            window.open("https://github.com/unikonkon", "_blank");
                          }}
                        >
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                          </svg>
                        </div>
                        <div className="w-10 h-10 rounded-lg bg-[#141414] border border-[#262626] flex items-center justify-center text-[#06b6d4] cursor-pointer"
                          onClick={() => {
                            window.open("https://www.linkedin.com/in/suthep-jantawee/", "_blank");
                          }}
                        >
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating Tech Badges */}
                <div className="absolute -top-3 -right-3 px-3 py-1.5 bg-[#141414] border border-[#8b5cf6]/50 rounded-full font-mono text-xs text-[#8b5cf6] shadow-lg shadow-[#8b5cf6]/20">
                  Next.js
                </div>
                <div className="absolute top-1/4 -left-6 px-3 py-1.5 bg-[#141414] border border-[#06b6d4]/50 rounded-full font-mono text-xs text-[#06b6d4] shadow-lg shadow-[#06b6d4]/20">
                  TypeScript
                </div>
                <div className="absolute bottom-1/3 -right-6 px-3 py-1.5 bg-[#141414] border border-[#10b981]/50 rounded-full font-mono text-xs text-[#10b981] shadow-lg shadow-[#10b981]/20">
                  Node.js
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="flex justify-center mt-12 lg:mt-16">
          <div
            className="flex flex-col items-center gap-2 text-[#52525b] hover:text-[#8b5cf6] transition-colors cursor-pointer group"
            onClick={() => {
              window.scrollTo({
                top: document.getElementById("about")?.offsetTop,
                behavior: "smooth",
              });
            }}
          >
            <span className="text-xs font-mono uppercase tracking-widest">Scroll</span>
            <div className="w-6 h-10 rounded-full border-2 border-current flex justify-center pt-2">
              <div className="w-1 h-2 bg-current rounded-full animate-bounce" />
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div ref={decorRef} className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Code lines decoration - left */}
        <div className="absolute top-1/4 left-4 lg:left-8 font-mono text-[10px] text-[#1a1a1a] hidden md:block">
          {Array.from({ length: 8 }, (_, i) => (
            <div key={i} className="py-0.5">
              {String(i + 1).padStart(2, "0")}
            </div>
          ))}
        </div>

        {/* Code lines decoration - right */}
        <div className="absolute bottom-1/4 right-4 lg:right-8 font-mono text-[10px] text-[#1a1a1a] hidden md:block text-right">
          {Array.from({ length: 8 }, (_, i) => (
            <div key={i} className="py-0.5">
              {String(i + 100).padStart(3, "0")}
            </div>
          ))}
        </div>

        {/* Gradient orbs */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#8b5cf6]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#ec4899]/5 rounded-full blur-3xl" />
      </div>
    </section>
  );
}
