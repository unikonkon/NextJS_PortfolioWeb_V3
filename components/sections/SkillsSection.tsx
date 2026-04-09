"use client";

import { useRef, useEffect, useState, type ReactNode, type RefObject } from "react";
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
    name: "Libraries",
    path: "~/libraries",
    icon: "Lib",
    skills: [
      { name: "Zustand", level: "intermediate" },
      { name: "Tailwindcss", level: "advanced" },
      { name: "Ant Design", level: "intermediate" },
      { name: "DaisyUI", level: "intermediate" },
      { name: "shadcn/ui", level: "intermediate" },
      { name: "HeroUI", level: "familiar" },
      { name: "gsap", level: "intermediate" },
      { name: "motion.dev", level: "intermediate" },
      { name: "Three.js", level: "familiar" },

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
      { name: "playwright", level: "intermediate" },
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
      { name: "Antigravity", level: "intermediate" },
      { name: "Stitch AI", level: "intermediate" },
      { name: "Blackbox.AI", level: "intermediate" },
      { name: "Gemini", level: "intermediate" },
      { name: "v0.dev", level: "intermediate" },
      { name: "lovable.dev", level: "intermediate" },
    ],
  },
];

// One color per skill category — used by both the npm-tree listing inside the
// terminal and the skill fragments that burst out of the crack, so the user
// can visually link the two. Order MUST match `skillCategories`.
const categoryColors: string[] = [
  "#06b6d4", // Languages
  "#f97316", // Frameworks
  "#10b981", // Databases
  "#8b5cf6", // DevOps
  "#f472b6", // Testing & API
  "#14b8a6", // Tools
  "#fbbf24", // Design & Animation
  "#ef4444", // AI Tools
];

export default function SkillsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);
  const leftHalfRef = useRef<HTMLDivElement>(null);
  const rightHalfRef = useRef<HTMLDivElement>(null);
  const crackGlowRef = useRef<HTMLDivElement>(null);
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

      // Desktop tree lines — stagger in as the terminal enters the viewport
      [leftHalfRef.current, rightHalfRef.current].forEach((container) => {
        if (!container) return;
        const lines = gsap.utils.toArray<HTMLElement>(".tree-line", container);
        if (!lines.length) return;
        gsap.set(lines, { opacity: 0, x: -10 });
        gsap.to(lines, {
          opacity: 1,
          x: 0,
          stagger: 0.04,
          duration: 0.3,
          ease: "power2.out",
          scrollTrigger: {
            trigger: terminalRef.current,
            start: "top bottom-=30",
            toggleActions: "play none none none",
          },
        });
      });

      // Terminal cursor blink
      gsap.utils
        .toArray<HTMLElement>(".terminal-cursor", terminalRef.current)
        .forEach((el) => {
          gsap.to(el, {
            opacity: 0,
            repeat: -1,
            yoyo: true,
            duration: 0.53,
            ease: "steps(1)",
          });
        });

      // Scanline slow drift
      gsap.utils
        .toArray<HTMLElement>(".terminal-scanline", terminalRef.current)
        .forEach((el) => {
          gsap.to(el, {
            backgroundPositionY: "200px",
            repeat: -1,
            duration: 10,
            ease: "none",
          });
        });

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

      // Terminal split animation — cracks open as the timeline line passes through
      if (leftHalfRef.current && rightHalfRef.current && crackGlowRef.current) {
        gsap.set(crackGlowRef.current, { scaleY: 0.6, opacity: 0 });
        const splitTl = gsap.timeline({
          scrollTrigger: {
            trigger: terminalRef.current,
            start: "top center+=180",
            end: "center center-=40",
            scrub: 1,
          },
        });
        splitTl
          .to(leftHalfRef.current, { x: -32, ease: "power2.out" }, 0)
          .to(rightHalfRef.current, { x: 32, ease: "power2.out" }, 0)
          .to(crackGlowRef.current, { opacity: 1, scaleY: 1, ease: "none" }, 0);

        // Category cards burst out of the crack — each card flies to its
        // assigned side. Cards keep `xPercent: -50` to remain self-centered
        // on their own anchor while `x` translates them outward.
        const cards = gsap.utils.toArray<HTMLElement>(
          ".category-burst",
          terminalRef.current
        );
        cards.forEach((el, i) => {
          const side = el.getAttribute("data-side");
          const dir = side === "left" ? -1 : 1;
          const distance = 220 + (i % 3) * 28; // 220–276px outward
          gsap.set(el, {
            xPercent: -50,
            x: 0,
            y: 0,
            opacity: 0,
            scale: 0.4,
            rotate: dir * 4,
          });
          splitTl.to(
            el,
            {
              x: dir * distance,
              opacity: 1,
              scale: 1,
              rotate: 0,
              ease: "power3.out",
            },
            0.05 + i * 0.06
          );
        });

        // Spark particles burst out from the crack
        const sparks = gsap.utils.toArray<HTMLElement>(
          ".crack-spark",
          terminalRef.current
        );
        sparks.forEach((el, i) => {
          const dir = i % 2 === 0 ? -1 : 1;
          const distance = 70 + (i % 5) * 20;
          const drift = ((i % 4) - 2) * 18;
          gsap.set(el, { x: 0, y: 0, opacity: 0, scale: 0 });
          splitTl.to(
            el,
            {
              x: dir * distance,
              y: drift,
              opacity: 1,
              scale: 1,
              ease: "power2.out",
            },
            0.02 + i * 0.018
          );
        });
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

      {/* Terminal Window — splits open along the timeline line */}
      <TerminalShell
        terminalRef={terminalRef}
        leftHalfRef={leftHalfRef}
        rightHalfRef={rightHalfRef}
        crackGlowRef={crackGlowRef}
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

        {/* Terminal Content — npm-tree listing instead of a grid; the actual
            skill chips burst out of the crack to the left & right.            */}
        <div className="p-6 lg:p-8 lg:min-h-[540px] flex flex-col">
          {/* Mobile / tablet only: keep one intact terminal with full skill data */}
          <div className="lg:hidden space-y-3">
            <div className="font-mono text-[11px] leading-relaxed text-[#a1a1aa] border border-[#262626] rounded-lg bg-[#0a0a0a] p-3">
              <p>
                <span className="text-[#10b981]">$</span> npm install @suthep/skills
              </p>
              <p className="text-[#52525b]">added {totalPackages} packages in 2.3s</p>
            </div>

            {skillCategories.map((cat, catIndex) => {
              const color = categoryColors[catIndex % categoryColors.length];
              return (
                <div
                  key={`mobile-${cat.name}`}
                  className="rounded-lg border backdrop-blur-md p-3"
                  style={{
                    borderColor: `${color}66`,
                    background: `linear-gradient(135deg, ${color}1f, #0d0d0dcc 68%)`,
                    boxShadow: `0 0 18px ${color}2b, inset 0 0 10px ${color}0f`,
                  }}
                >
                  <div
                    className="flex items-center justify-between gap-2 pb-2 mb-2 border-b"
                    style={{ borderColor: `${color}33` }}
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <span
                        className="w-7 h-6 flex items-center justify-center rounded font-mono text-[10px] shrink-0"
                        style={{
                          color,
                          background: `${color}22`,
                          border: `1px solid ${color}66`,
                        }}
                      >
                        {cat.icon}
                      </span>
                      <div className="min-w-0 leading-tight">
                        <p
                          className="font-mono text-[12px] font-semibold truncate"
                          style={{ color }}
                        >
                          {cat.name}
                        </p>
                        <p className="font-mono text-[9px] text-[#71717a] truncate">
                          {cat.path}
                        </p>
                      </div>
                    </div>
                    <span className="font-mono text-[9px] text-[#a1a1aa] shrink-0">
                      {cat.skills.length} pkgs
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    {cat.skills.map((skill) => (
                      <span
                        key={`${cat.name}-${skill.name}`}
                        className="font-mono text-[10px] px-1.5 py-0.5 rounded whitespace-nowrap text-[#d4d4d8]"
                        style={{
                          background: "#0a0a0acc",
                          border: `1px solid ${color}3a`,
                        }}
                      >
                        {skill.name}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Desktop only: animated npm dependency tree */}
          <div className="hidden lg:flex flex-col flex-1 relative overflow-hidden">
            {/* Scan lines overlay */}
            <div
              className="terminal-scanline absolute inset-0 pointer-events-none z-10"
              style={{
                background:
                  "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(6,182,212,0.015) 3px, rgba(6,182,212,0.015) 4px)",
              }}
            />

            {/* Center glow hint — foreshadows the crack */}
            <div
              className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-px pointer-events-none z-10"
              style={{
                background:
                  "linear-gradient(to bottom, transparent 5%, rgba(249,115,22,0.06) 30%, rgba(6,182,212,0.08) 70%, transparent 95%)",
              }}
            />

            {/* Bottom fade — clips long tree output gracefully */}
            <div className="absolute bottom-0 left-0 right-0 h-20 bg-linear-to-t from-[#0d0d0d] to-transparent pointer-events-none z-20" />

          </div>
        </div>
      </TerminalShell>

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

interface TerminalShellProps {
  children: ReactNode;
  terminalRef: RefObject<HTMLDivElement | null>;
  leftHalfRef: RefObject<HTMLDivElement | null>;
  rightHalfRef: RefObject<HTMLDivElement | null>;
  crackGlowRef: RefObject<HTMLDivElement | null>;
}

// Each skill category bursts out of the crack as its own grouped card.
// Cards alternate left/right sides and are distributed vertically along the
// terminal so the user can scan the whole stack at a glance.
const categoryBursts: {
  catIndex: number;
  side: "left" | "right";
  top: string;
}[] = skillCategories.map((_, i) => ({
  catIndex: i,
  // Even index → left side, odd → right side, alternating cleanly
  side: i % 2 === 0 ? "left" : "right",
  top: `${2 + (i / Math.max(skillCategories.length - 1, 1)) * 80}%`,
}));

const crackSparks: { top: string; size: number; color: string }[] = Array.from(
  { length: 18 },
  (_, i) => ({
    top: `${3 + (i / 17) * 94}%`,
    size: 3 + (i % 3),
    color: categoryColors[i % categoryColors.length],
  })
);

function TerminalShell({
  children,
  terminalRef,
  leftHalfRef,
  rightHalfRef,
  crackGlowRef,
}: TerminalShellProps) {
  return (
    <div ref={terminalRef} className="relative max-w-6xl mx-auto">
      {/* Crack glow line — appears between the two halves as they split */}
      <div
        ref={crackGlowRef}
        className="hidden lg:block absolute inset-y-0 opacity-0 pointer-events-none z-20"
        style={{ left: "calc(50% - 1px)", transformOrigin: "center" }}
      >
        <div
          className="w-full h-full"
          style={{
            background:
              "linear-gradient(to bottom, #f97316 0%, #fbbf24 50%, #06b6d4 100%)",
            boxShadow:
              "0 0 24px 4px rgba(251,191,36,0.55), 0 0 60px 14px rgba(6,182,212,0.35)",
          }}
        />
        {/* Top spark */}
        {/* <div
          className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full"
          style={{
            background: "#fbbf24",
            boxShadow:
              "0 0 12px 3px rgba(251,191,36,0.9), 0 0 24px 6px rgba(249,115,22,0.4)",
          }}
        /> */}
        {/* Bottom spark */}
        {/* <div
          className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full"
          style={{
            background: "#06b6d4",
            boxShadow:
              "0 0 12px 3px rgba(6,182,212,0.9), 0 0 24px 6px rgba(6,182,212,0.4)",
          }}
        /> */}
      </div>

      {/* Skill fragments + sparks bursting out of the crack (desktop only) */}
      <div className="hidden lg:block absolute inset-0 pointer-events-none z-30">
        {/* Ambient sparks */}
        {crackSparks.map((s, i) => (
          <div
            key={`spark-${i}`}
            className="crack-spark absolute left-1/2 -translate-x-1/2 rounded-full"
            style={{
              top: s.top,
              width: `${s.size}px`,
              height: `${s.size}px`,
              background: s.color,
              boxShadow: `0 0 10px 2px ${s.color}, 0 0 20px 4px ${s.color}66`,
              willChange: "transform, opacity",
            }}
          />
        ))}

        {/* One grouped card per skill category */}
        {categoryBursts.map(({ catIndex, side, top }) => {
          const cat = skillCategories[catIndex];
          const color = categoryColors[catIndex];
          return (
            <div
              key={`cat-${cat.name}`}
              data-side={side}
              className="category-burst absolute left-1/2 will-change-transform"
              style={{ top }}
            >
              <div
                className="rounded-lg border backdrop-blur-md p-2.5 max-w-[350px] shadow-2xl"
                style={{
                  borderColor: `${color}66`,
                  background: `linear-gradient(135deg, ${color}1f, #0d0d0dcc 70%)`,
                  boxShadow: `0 0 24px ${color}33, 0 0 1px ${color}88, inset 0 0 16px ${color}11`,
                }}
              >
                {/* Card header — icon + category name */}
                <div
                  className="flex items-center gap-2 pb-1.5 mb-2 border-b"
                  style={{ borderColor: `${color}33` }}
                >
                  <span
                    className="w-7 h-6 flex items-center justify-center rounded font-mono text-[10px] shrink-0"
                    style={{
                      color,
                      background: `${color}22`,
                      border: `1px solid ${color}66`,
                    }}
                  >
                    {cat.icon}
                  </span>
                  <div className="flex flex-col leading-tight min-w-0">
                    <span
                      className="font-mono text-[12px] font-semibold truncate"
                      style={{ color }}
                    >
                      {cat.name}
                    </span>
                    <span className="font-mono text-[8px] text-[#52525b] truncate">
                      {cat.path} · {cat.skills.length} pkgs
                    </span>
                  </div>
                </div>

                {/* Skill chips inside the card */}
                <div className="flex flex-wrap gap-1">
                  {cat.skills.map((s) => (
                    <span
                      key={s.name}
                      className="font-mono text-[9px] px-1.5 py-0.5 rounded whitespace-nowrap text-[#d4d4d8]"
                      style={{
                        background: "#0a0a0acc",
                        border: `1px solid ${color}3a`,
                      }}
                    >
                      {s.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Mobile / tablet: single intact terminal */}
      <div className="lg:hidden rounded-xl overflow-hidden border border-[#262626] bg-[#0d0d0d] shadow-2xl">
        {children}
      </div>

      {/* Desktop: cracked terminal — two clipped layers that slide apart */}
      <div className="hidden lg:block relative">
        {/* Left half */}
        <div
          ref={leftHalfRef}
          className="rounded-xl overflow-hidden border border-[#262626] bg-[#0d0d0d] shadow-2xl will-change-transform"
          style={{ clipPath: "inset(0 50% 0 0 round 12px 0 0 12px)" }}
        >
          {children}
        </div>
        {/* Right half overlay */}
        <div
          ref={rightHalfRef}
          className="absolute inset-0 rounded-xl overflow-hidden border border-[#262626] bg-[#0d0d0d] shadow-2xl will-change-transform pointer-events-none"
          style={{ clipPath: "inset(0 0 0 50% round 0 12px 12px 0)" }}
          aria-hidden="true"
        >
          {children}
        </div>
      </div>
    </div>
  );
}
