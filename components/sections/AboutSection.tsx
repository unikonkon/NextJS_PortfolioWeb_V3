"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function AboutSection() {
  const aboutRef = useRef<HTMLElement>(null);
  const aboutContentRef = useRef<HTMLDivElement>(null);

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
    }, aboutRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={aboutRef} className="relative py-16 md:py-32 px-6">
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
            {/* JSON Object Display */}
            <div className="font-mono text-sm leading-relaxed mb-6">
              <div className="text-[#52525b]">{"{"}</div>
              <div className="pl-4 md:pl-6">
                <div className="py-1">
                  <span className="text-[#ec4899]">&quot;name&quot;</span>
                  <span className="text-white">: </span>
                  <span className="text-[#10b981]">&quot;Suthep Jantawee&quot;</span>
                  <span className="text-[#52525b]">,</span>
                </div>
                <div className="py-1">
                  <span className="text-[#ec4899]">&quot;role&quot;</span>
                  <span className="text-white">: </span>
                  <span className="text-[#10b981]">&quot;Full Stack Developer&quot;</span>
                  <span className="text-[#52525b]">,</span>
                </div>
                <div className="py-1">
                  <span className="text-[#ec4899]">&quot;experience&quot;</span>
                  <span className="text-white">: </span>
                  <span className="text-[#10b981]">&quot;3+ years&quot;</span>
                  <span className="text-[#52525b]">,</span>
                </div>
                <div className="py-1">
                  <span className="text-[#ec4899]">&quot;focus&quot;</span>
                  <span className="text-white">: </span>
                  <span className="text-[#06b6d4]">[</span>
                  <span className="text-[#10b981]">&quot;Frontend&quot;</span>
                  <span className="text-[#52525b]">, </span>
                  <span className="text-[#10b981]">&quot;Backend&quot;</span>
                  <span className="text-[#52525b]">, </span>
                  <span className="text-[#10b981]">&quot;Full Stack&quot;</span>
                  <span className="text-[#06b6d4]">]</span>
                  <span className="text-[#52525b]">,</span>
                </div>
                <div className="py-1">
                  <span className="text-[#ec4899]">&quot;Used Technologies&quot;</span>
                  <span className="text-white">: </span>
                  <span className="text-[#06b6d4]">[</span>
                  <span className="text-[#10b981]">&quot;Nextjs&quot;</span>
                  <span className="text-[#52525b]">, </span>
                  <span className="text-[#10b981]">&quot;Nestjs&quot;</span>
                  <span className="text-[#52525b]">, </span>
                  <span className="text-[#10b981]">&quot;PostgressSql&quot;</span>
                  <span className="text-[#06b6d4]">]</span>
                  <span className="text-[#52525b]">,</span>
                </div>
              </div>
              <div className="text-[#52525b]">{"}"}</div>
            </div>

            {/* Divider */}
            <div className="h-px bg-[#262626] my-6" />

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
