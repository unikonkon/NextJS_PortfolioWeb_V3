"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function AboutSection() {
  const aboutRef = useRef<HTMLElement>(null);
  const aboutContentRef = useRef<HTMLDivElement>(null);
  const leftCodeRef = useRef<HTMLDivElement>(null);
  const rightCodeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!aboutRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        aboutContentRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: {
            trigger: aboutRef.current,
            start: "top bottom-=100",
            toggleActions: "play none none none",
          },
        }
      );

      // Animate decorative code blocks
      gsap.fromTo(
        leftCodeRef.current,
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: aboutRef.current,
            start: "top bottom-=50",
            toggleActions: "play none none none",
          },
        }
      );

      gsap.fromTo(
        rightCodeRef.current,
        { opacity: 0, x: 30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: aboutRef.current,
            start: "top bottom-=50",
            toggleActions: "play none none none",
          },
        }
      );
    }, aboutRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={aboutRef} className="relative py-16 md:py-32 px-6">

      {/* Decorative Code Block - Left (Developer Info JSON) */}
      <div
        ref={leftCodeRef}
        className="absolute top-1/4 left-4 lg:left-8 font-mono text-[10px] lg:text-[11px] hidden lg:block transform -rotate-6 opacity-0"
      >
        <div className="p-4 bg-[#0d0d0d]/80 rounded-lg border border-[#262626] backdrop-blur-sm shadow-xl">
          {/* Header */}
          <div className="flex items-center gap-2 mb-3 pb-2 border-b border-[#1a1a1a]">
            <div className="flex gap-1">
              <div className="w-2 h-2 rounded-full bg-[#ff5f57]" />
              <div className="w-2 h-2 rounded-full bg-[#febc2e]" />
              <div className="w-2 h-2 rounded-full bg-[#28c840]" />
            </div>
            <span className="text-[#52525b] text-[9px]">about.json</span>
          </div>
          {/* JSON Content */}
          <div className="text-[#52525b]">{"{"}</div>
          <div className="pl-3">
            <div className="py-0.5">
              <span className="text-[#ec4899]">&quot;name&quot;</span>
              <span className="text-white">: </span>
              <span className="text-[#10b981]">&quot;Suthep Jantawee&quot;</span>
              <span className="text-[#52525b]">,</span>
            </div>
            <div className="py-0.5">
              <span className="text-[#ec4899]">&quot;role&quot;</span>
              <span className="text-white">: </span>
              <span className="text-[#10b981]">&quot;Full Stack Developer&quot;</span>
              <span className="text-[#52525b]">,</span>
            </div>
            <div className="py-0.5">
              <span className="text-[#ec4899]">&quot;experience&quot;</span>
              <span className="text-white">: </span>
              <span className="text-[#10b981]">&quot;3+ years&quot;</span>
              <span className="text-[#52525b]">,</span>
            </div>
            <div className="py-0.5">
              <span className="text-[#ec4899]">&quot;focus&quot;</span>
              <span className="text-white">: </span>
              <span className="text-[#06b6d4]">[</span>
            </div>
            <div className="pl-3">
              <span className="text-[#10b981]">&quot;Frontend&quot;</span>
              <span className="text-[#52525b]">, </span>
              <span className="text-[#10b981]">&quot;Backend&quot;</span>
              <span className="text-[#52525b]">,</span>
            </div>
            <div className="pl-3">
              <span className="text-[#10b981]">&quot;Full Stack&quot;</span>
            </div>
            <div className="py-0.5">
              <span className="text-[#06b6d4]">]</span>
            </div>
          </div>
          <div className="text-[#52525b]">{"}"}</div>
        </div>
      </div>

      {/* Decorative Code Block - Right (Technologies) */}
      <div
        ref={rightCodeRef}
        className="absolute bottom-1/4 right-4 lg:right-8 font-mono text-[10px] lg:text-[11px] hidden lg:block transform rotate-7 opacity-0"
      >
        <div className="p-4 bg-[#0d0d0d]/80 rounded-lg border border-[#262626] backdrop-blur-sm shadow-xl">
          {/* Header */}
          <div className="flex items-center gap-2 mb-3 pb-2 border-b border-[#1a1a1a]">
            <div className="flex gap-1">
              <div className="w-2 h-2 rounded-full bg-[#ff5f57]" />
              <div className="w-2 h-2 rounded-full bg-[#febc2e]" />
              <div className="w-2 h-2 rounded-full bg-[#28c840]" />
            </div>
            <span className="text-[#52525b] text-[9px]">stack.ts</span>
          </div>
          {/* Code Content */}
          <div>
            <span className="text-[#8b5cf6]">const</span>
            <span className="text-white"> </span>
            <span className="text-[#ec4899]">technologies</span>
            <span className="text-white"> = </span>
            <span className="text-[#06b6d4]">[</span>
          </div>
          <div className="pl-3 py-0.5">
            <span className="text-[#10b981]">&quot;Next.js&quot;</span>
            <span className="text-[#52525b]">,</span>
          </div>
          <div className="pl-3 py-0.5">
            <span className="text-[#10b981]">&quot;NestJS&quot;</span>
            <span className="text-[#52525b]">,</span>
          </div>
          <div className="pl-3 py-0.5">
            <span className="text-[#10b981]">&quot;TypeScript&quot;</span>
            <span className="text-[#52525b]">,</span>
          </div>
          <div className="pl-3 py-0.5">
            <span className="text-[#10b981]">&quot;PostgreSQL&quot;</span>
          </div>
          <div>
            <span className="text-[#06b6d4]">]</span>
            <span className="text-[#52525b]">;</span>
          </div>
          <div className="mt-2 pt-2 border-t border-[#1a1a1a]">
            <span className="text-[#52525b]">{"//"} </span>
            <span className="text-[#a1a1aa]">Available: </span>
            <span className="text-[#10b981]">true</span>
          </div>
        </div>
      </div>

      <div ref={aboutContentRef} className="max-w-4xl mx-auto">

        {/* Label */}
        <div className="flex items-center justify-center gap-4 mb-6">
          <span className="h-px w-12 bg-linear-to-r from-transparent to-[#f97316]" />
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-[#f97316]">
            ABOUT
          </span>
          <span className="h-px w-12 bg-linear-to-l from-transparent to-[#f97316]" />
        </div>

        {/* Title */}
        <h2 className="text-section text-center mb-8">
          <span className="text-white">cat </span>
          <span className="gradient-text-pink italic">about.json</span>
        </h2>

        {/* Terminal Window */}
        <div className="rounded-xl overflow-hidden border border-[#333] bg-[#0d0d0d] shadow-2xl">
          {/* Terminal Header */}
          <div className="flex items-center gap-2 px-4 py-3 bg-[#1a1a1a] border-b border-[#333]">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
              <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
              <div className="w-3 h-3 rounded-full bg-[#28c840]" />
            </div>
            <span className="font-mono text-xs text-[#666] ml-2">suthep@portfolio ~ cat about.json</span>
            <span className="ml-auto px-2 py-0.5 text-[10px] font-mono bg-[#262626] rounded text-[#666]">
              JSON
            </span>
          </div>


          {/* Terminal Content */}
          <div className="p-6 md:p-8">
            {/* Bio Description - Comment Style */}
            <div className="space-y-3 mb-6">
              <div className="flex items-start gap-3">
                <span className="font-mono text-[#10b981] text-sm shrink-0">{"//"}</span>
                <p className="text-[#a1a1aa] text-sm leading-relaxed">
                  I&apos;m a Full Stack Developer with 3+ years of experience in web development.
                  I have a passion for designing intuitive user interfaces, building with modern
                  frameworks, and leveraging AI to supercharge developer workflows.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="font-mono text-[#10b981] text-sm shrink-0">{"//"}</span>
                <p className="text-[#a1a1aa] text-sm leading-relaxed">
                  I&apos;m currently looking for roles as a Front-End Developer, Back-End Developer,
                  or Full Stack Developer.
                </p>
              </div>
            </div>

            {/* Divider */}
            <div className="h-px bg-[#262626] my-6" />

            {/* Stats Row - Inside Terminal */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { label: "years", value: "3+", color: "#ec4899", key: "experience" },
                { label: "projects", value: "15+", color: "#8b5cf6", key: "completed" },
                { label: "technologies", value: "30+", color: "#06b6d4", key: "mastered" },
                { label: "companies", value: "2", color: "#10b981", key: "worked" },
              ].map((stat) => (
                <div
                  key={stat.key}
                  className="p-3 rounded-lg bg-[#141414] border border-[#262626] hover:border-[#333] transition-colors text-center group"
                >
                  <div
                    className="text-xl md:text-2xl font-bold font-mono"
                    style={{ color: stat.color }}
                  >
                    {stat.value}
                  </div>
                  <div className="text-[10px] text-[#52525b] font-mono uppercase tracking-wider mt-1">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Terminal Footer */}
            <div className="mt-6 pt-4 border-t border-[#262626] flex items-center gap-2 font-mono text-xs text-[#52525b]">
              <span className="text-[#10b981]">➜</span>
              <span className="text-[#06b6d4]">~</span>
              <span className="text-white">_</span>
              <span className="w-2 h-4 bg-[#8b5cf6] animate-pulse" />
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Line Numbers */}
      <div className="hidden xl:block absolute right-8 top-1/2 -translate-y-1/2 font-mono text-[10px] text-[#1a1a1a] space-y-2">
        {Array.from({ length: 15 }, (_, i) => (
          <div key={i} className="text-right">
            {String(i + 400).padStart(3, "0")}
          </div>
        ))}
      </div>
    </section>
  );
}
