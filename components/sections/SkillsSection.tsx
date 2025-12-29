"use client";

import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type SkillLevel = "advanced" | "intermediate" | "familiar";

interface Skill {
  name: string;
  level: SkillLevel;
}

interface SkillCategory {
  name: string;
  path: string;
  icon: string;
  skills: Skill[];
}

const skillCategories: SkillCategory[] = [
  {
    name: "Languages",
    path: "~/languages",
    icon: "{ }",
    skills: [
      { name: "TypeScript", level: "advanced" },
      { name: "JavaScript", level: "advanced" },
      { name: "HTML/CSS", level: "advanced" },
      { name: "SQL", level: "intermediate" },
      { name: "Dart", level: "familiar" },
      { name: "Python", level: "familiar" },
    ],
  },
  {
    name: "Frameworks",
    path: "~/frameworks",
    icon: "< />",
    skills: [
      { name: "React/Next.js", level: "advanced" },
      { name: "NestJS", level: "intermediate" },
      { name: "Express.js", level: "advanced" },
      { name: "Flutter", level: "intermediate" },
      { name: "Electron", level: "familiar" },
    ],
  },
  {
    name: "Databases",
    path: "~/databases",
    icon: "DB",
    skills: [
      { name: "PostgreSQL", level: "advanced" },
      { name: "Firebase", level: "intermediate" },
      { name: "Supabase", level: "intermediate" },
      { name: "Prisma", level: "intermediate" },
      { name: "Kibana", level: "familiar" },
    ],
  },
  {
    name: "DevOps",
    path: "~/devops",
    icon: ">>",
    skills: [
      { name: "Git", level: "advanced" },
      { name: "Vercel", level: "advanced" },
      { name: "Docker", level: "intermediate" },
      { name: "Jenkins", level: "intermediate" },
    ],
  },
  {
    name: "Testing & API & Tools",
    path: "~/testing",
    icon: "QA",
    skills: [
      { name: "Postman", level: "advanced" },
      { name: "Jest", level: "intermediate" },
      { name: "SonarQube", level: "intermediate" },
      { name: "Discord", level: "advanced" },
      { name: "Slack", level: "intermediate" },
      { name: "Lark", level: "intermediate" },
      { name: "Monday", level: "intermediate" },
    ],
  },
  {
    name: "Design & Animation",
    path: "~/design",
    icon: "UI",
    skills: [
      { name: "Figma", level: "advanced" },
      { name: "Draw.io", level: "advanced" },
      { name: "Canva", level: "intermediate" },
      { name: "Stitch", level: "intermediate" },
      { name: "motion.dev", level: "intermediate" },
      { name: "gsap", level: "intermediate" },
      { name: "Three.js", level: "familiar" },
    ],
  },
  {
    name: "AI Tools",
    path: "~/ai-tools",
    icon: "AI",
    skills: [
      { name: "Cursor", level: "advanced" },
      { name: "ChatGPT", level: "advanced" },
      { name: "Claude Code", level: "advanced" },
      { name: "Blackbox.AI", level: "intermediate" },
      { name: "Gemini", level: "intermediate" },
      { name: "v0.dev", level: "intermediate" },
      { name: "lovable.dev", level: "intermediate" },
    ],
  },
];

const levelColors: Record<SkillLevel, { bg: string; text: string; border: string }> = {
  advanced: { bg: "bg-[#10b981]/10", text: "text-[#10b981]", border: "border-[#10b981]/30" },
  intermediate: { bg: "bg-[#06b6d4]/10", text: "text-[#06b6d4]", border: "border-[#06b6d4]/30" },
  familiar: { bg: "bg-[#8b5cf6]/10", text: "text-[#8b5cf6]", border: "border-[#8b5cf6]/30" },
};

export default function SkillsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);
  const timelineLineRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const [isInstalling, setIsInstalling] = useState(false);
  const [installedCount, setInstalledCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);

  const totalPackages = skillCategories.reduce((acc, cat) => acc + cat.skills.length, 0);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top bottom-=100",
            toggleActions: "play none none none",
          },
        }
      );

      // Terminal animation
      gsap.fromTo(
        terminalRef.current,
        { opacity: 0, y: 30, scale: 0.98 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: {
            trigger: terminalRef.current,
            start: "top bottom-=50",
            toggleActions: "play none none none",
            onEnter: () => {
              if (!hasStarted) {
                setHasStarted(true);
                startInstallAnimation();
              }
            },
          },
        }
      );

      // Timeline line draw animation
      if (timelineLineRef.current) {
        gsap.fromTo(
          timelineLineRef.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top center",
              end: "bottom center",
              scrub: 1,
            },
          }
        );
      }

      // Dot animation
      if (dotRef.current) {
        gsap.set(dotRef.current, { scale: 0, opacity: 0 });

        gsap.to(dotRef.current, {
          scale: 1,
          opacity: 1,
          duration: 0.4,
          ease: "back.out(2)",
          scrollTrigger: {
            trigger: dotRef.current,
            start: "top center+=100",
            end: "top center",
            scrub: 0.3,
          },
        });

        // Pulse animation
        const pulseElement = dotRef.current.querySelector(".dot-pulse");
        if (pulseElement) {
          gsap.to(pulseElement, {
            scale: 2,
            opacity: 0,
            duration: 1.5,
            repeat: -1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: dotRef.current,
              start: "top center+=50",
              toggleActions: "play pause resume pause",
            },
          });
        }
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [hasStarted]);

  const startInstallAnimation = () => {
    setIsInstalling(true);
    let count = 0;
    const interval = setInterval(() => {
      count++;
      setInstalledCount(count);
      if (count >= totalPackages) {
        clearInterval(interval);
        setTimeout(() => setIsInstalling(false), 300);
      }
    }, 50);
  };

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative py-16 md:py-28 px-6"
    >
      {/* Center Timeline Line (Desktop only) */}
      <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 pointer-events-none z-0">
        {/* Background line (gray) */}
        <div className="w-full h-full bg-[#1a1a1a]" />
        {/* Animated gradient line */}
        <div
          ref={timelineLineRef}
          className="absolute inset-0 w-full h-full origin-top"
          style={{
            background: "linear-gradient(to bottom, #f97316, #06b6d4)",
          }}
        />
      </div>

      {/* Timeline Dot */}
      <div
        ref={dotRef}
        className="hidden lg:flex absolute left-1/2 top-8 -translate-x-1/2 z-10 items-center justify-center"
      >
        {/* Pulse ring */}
        <div className="dot-pulse absolute w-4 h-4 rounded-full bg-[#06b6d4]/50" />
        {/* Main dot */}
        <div
          className="relative w-4 h-4 rounded-full border-4 border-[#0a0a0a] bg-[#06b6d4]"
          style={{ boxShadow: "0 0 20px rgba(6,182,212,0.5)" }}
        />
        {/* Label */}
        <div className="absolute right-full mr-4 whitespace-nowrap px-2 py-0.5 rounded text-[9px] font-mono bg-[#06b6d4]/10 text-[#06b6d4] border border-[#06b6d4]/30">
          SKILLS
        </div>
      </div>

      {/* Section Header */}
      <div ref={headerRef} className="max-w-6xl mx-auto mb-12 text-center">
        {/* Label */}
        <div className="flex items-center justify-center gap-4 mb-6">
          <span className="h-px w-12 bg-linear-to-r from-transparent to-[#06b6d4]" />
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-[#06b6d4] ml-3 ">
            TECH STACK
          </span>
          <span className="h-px w-12 bg-linear-to-l from-transparent to-[#06b6d4]" />
        </div>

        {/* Title */}
        <h2 className="text-section mb-4">
          <span className="text-white">npm install </span>
          <span className="gradient-text-cyan italic">@suthep/skills</span>
        </h2>

        {/* Subtitle */}
        <p className="text-[#a1a1aa] max-w-xl mx-auto font-mono text-sm">
          <span className="text-[#10b981]">$</span> Installing dependencies...
          {isInstalling && (
            <span className="ml-2 text-[#52525b]">
              [{installedCount}/{totalPackages}]
            </span>
          )}
          {!isInstalling && hasStarted && (
            <span className="ml-2 text-[#10b981]">
              added {totalPackages} packages
            </span>
          )}
        </p>
      </div>

      {/* Terminal Window */}
      <div
        ref={terminalRef}
        className="max-w-6xl mx-auto rounded-xl overflow-hidden border border-[#262626] bg-[#0d0d0d] shadow-2xl"
      >
        {/* Terminal Header */}
        <div className="flex items-center justify-between px-4 py-3 bg-[#1a1a1a] border-b border-[#262626]">
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
              <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
              <div className="w-3 h-3 rounded-full bg-[#28c840]" />
            </div>
            <span className="font-mono text-xs text-[#666] ml-3">
              npm install @suthep/skills
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 text-[10px] font-mono bg-[#262626] rounded text-[#666]">
              bash
            </span>
          </div>
        </div>

        {/* Terminal Content */}
        <div className="p-6 overflow-x-auto">
          {/* Command line */}
          {/* <div className="flex items-center gap-2 mb-6 font-mono text-sm">
            <span className="text-[#10b981]">➜</span>
            <span className="text-[#06b6d4]">~</span>
            <span className="text-white">npm install</span>
            <span className="text-[#f472b6]">@suthep/skills</span>
          </div> */}

          {/* Skills Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {skillCategories.map((category, catIndex) => (
              <div
                key={category.name}
                className="p-4 rounded-lg bg-[#141414] border border-[#262626] hover:border-[#333] transition-colors group"
                style={{
                  animationDelay: `${catIndex * 0.1}s`,
                }}
              >
                {/* Category Header */}
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-8 h-8 flex items-center justify-center rounded-md bg-[#1a1a1a] border border-[#333] font-mono text-xs text-[#8b5cf6] group-hover:border-[#8b5cf6]/50 transition-colors">
                    {category.icon}
                  </span>
                  <div>
                    <span className="font-mono text-[10px] text-[#52525b] block">{category.path}</span>
                    <span className="font-mono text-sm text-white">{category.name}</span>
                  </div>
                </div>

                {/* Skills List */}
                <div className="space-y-1.5">
                  {category.skills.map((skill, skillIndex) => {
                    const colors = levelColors[skill.level];
                    const globalIndex = skillCategories
                      .slice(0, catIndex)
                      .reduce((acc, cat) => acc + cat.skills.length, 0) + skillIndex;
                    const isInstalled = globalIndex < installedCount;

                    return (
                      <div
                        key={skill.name}
                        className={`flex items-center justify-between py-1.5 px-2 rounded transition-all duration-300 ${
                          isInstalled
                            ? "opacity-100 translate-x-0"
                            : "opacity-30 translate-x-2"
                        }`}
                      >
                        <span className="font-mono text-xs text-[#a1a1aa]">
                          {isInstalled && <span className="text-[#10b981] mr-1.5">+</span>}
                          {skill.name}
                        </span>
                        <span
                          className={`px-1.5 py-0.5 text-[9px] font-mono rounded border ${colors.bg} ${colors.text} ${colors.border}`}
                        >
                          {skill.level}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Installation Summary */}
          <div className="mt-6 pt-4 border-t border-[#262626] font-mono text-xs">
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-[#52525b]">
              <span>
                <span className="text-[#10b981]">+</span> {totalPackages} packages added
              </span>
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#10b981]" />
                <span className="text-[#10b981]">advanced</span>
              </span>
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#06b6d4]" />
                <span className="text-[#06b6d4]">intermediate</span>
              </span>
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#8b5cf6]" />
                <span className="text-[#8b5cf6]">familiar</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Soft Skills Badge Row */}
      <div className="max-w-4xl mx-auto mt-12">
        <div className="flex items-center justify-center gap-3 mb-4">
          <span className="h-px flex-1 max-w-16 bg-linear-to-r from-transparent to-[#333]" />
          <span className="font-mono text-xs text-[#52525b] mr-2">{"// Soft Skills"}</span>
          <span className="h-px flex-1 max-w-16 bg-linear-to-l from-transparent to-[#333]" />
        </div>
        <div className="flex flex-wrap justify-center gap-3 ml-2">
          {[
            "Teamwork",
            "Critical Thinking",
            "Communication",
            "Creativity",
            "Problem Solving",
            "Responsibility",
          ].map((skill) => (
            <span
              key={skill}
              className="px-4 py-2 font-mono text-xs text-[#a1a1aa] bg-[#141414] border border-[#262626] rounded-full hover:border-[#ec4899]/30 hover:text-[#ec4899] transition-all duration-300 cursor-default"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="hidden xl:block absolute right-8 top-1/2 -translate-y-1/2 font-mono text-[10px] text-[#1a1a1a] space-y-2">
        {Array.from({ length: 15 }, (_, i) => (
          <div key={i} className="text-right">
            {String(i + 200).padStart(3, "0")}
          </div>
        ))}
      </div>
    </section>
  );
}
