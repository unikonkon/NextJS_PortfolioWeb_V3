"use client";

import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { workProjects, type WorkProject, type ColorScheme } from "@/data/workProject";

gsap.registerPlugin(ScrollTrigger);

// Color scheme mapping for project accents
const colorSchemeMap: Record<ColorScheme, { bg: string; text: string; border: string; glow: string }> = {
  pink: { bg: "bg-[#ec4899]/10", text: "text-[#ec4899]", border: "border-[#ec4899]/30", glow: "rgba(236,72,153,0.5)" },
  purple: { bg: "bg-[#8b5cf6]/10", text: "text-[#8b5cf6]", border: "border-[#8b5cf6]/30", glow: "rgba(139,92,246,0.5)" },
  cyan: { bg: "bg-[#06b6d4]/10", text: "text-[#06b6d4]", border: "border-[#06b6d4]/30", glow: "rgba(6,182,212,0.5)" },
  green: { bg: "bg-[#10b981]/10", text: "text-[#10b981]", border: "border-[#10b981]/30", glow: "rgba(16,185,129,0.5)" },
  orange: { bg: "bg-[#f97316]/10", text: "text-[#f97316]", border: "border-[#f97316]/30", glow: "rgba(249,115,22,0.5)" },
  orangeLight: { bg: "bg-[#fb923c]/10", text: "text-[#fb923c]", border: "border-[#fb923c]/30", glow: "rgba(251,146,60,0.5)" },
  blue: { bg: "bg-[#3b82f6]/10", text: "text-[#3b82f6]", border: "border-[#3b82f6]/30", glow: "rgba(59,130,246,0.5)" },
  yellow: { bg: "bg-[#eab308]/10", text: "text-[#eab308]", border: "border-[#eab308]/30", glow: "rgba(234,179,8,0.5)" },
  red: { bg: "bg-[#ef4444]/10", text: "text-[#ef4444]", border: "border-[#ef4444]/30", glow: "rgba(239,68,68,0.5)" },
  indigo: { bg: "bg-[#6366f1]/10", text: "text-[#6366f1]", border: "border-[#6366f1]/30", glow: "rgba(99,102,241,0.5)" },
};

interface Company {
  id: string;
  name: string;
  role: string;
  period: string;
  status: "current" | "completed";
  commitHash: string;
  projects: WorkProject[];
}

// Organize projects by company
const companies: Company[] = [
  {
    id: "iapp",
    name: "iApp Technology",
    role: "Full Stack Developer",
    period: "Feb 2023 - Present",
    status: "current",
    commitHash: "a1b2c3d",
    projects: workProjects,
  },
  {
    id: "vertobase",
    name: "Vertobase Co., Ltd.",
    role: "Front-end Developer",
    period: "Mar 2022 - Dec 2022",
    status: "completed",
    commitHash: "e4f5g6h",
    projects: [
      {
        title: "Zignway App",
        role: "Front-end Developer",
        description: "Built front-end using React and Next.js with Flutter mobile integration.",
        technologies: ["React", "Next.js", "Flutter", "TypeScript"],
        features: [
          "Built front-end using React and Next.js",
          "Developed Flutter code for mobile PIN login",
        ],
        icon: "📱",
        colorScheme: "cyan" as ColorScheme,
      },
    ],
  },
];

export default function ExperienceSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const timelineLineRef = useRef<HTMLDivElement>(null);
  const dotsRef = useRef<(HTMLDivElement | null)[]>([]);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [expandedProject, setExpandedProject] = useState<string | null>(null);

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

      // Timeline line draw animation
      if (timelineLineRef.current) {
        gsap.fromTo(
          timelineLineRef.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              trigger: timelineRef.current,
              start: "top center",
              end: "bottom center",
              scrub: 1,
            },
          }
        );
      }

      // Dots animation with pulse
      // dotsRef.current.forEach((dot) => {
      //   if (!dot) return;

      //   gsap.set(dot, { scale: 0, opacity: 0 });

      //   gsap.to(dot, {
      //     scale: 1,
      //     opacity: 1,
      //     duration: 0.5,
      //     ease: "back.out(2)",
      //     scrollTrigger: {
      //       trigger: dot,
      //       start: "top center+=150",
      //       toggleActions: "play none none reverse",
      //     },
      //   });

      //   // Pulse animation
      //   const pulseRing = dot.querySelector(".pulse-ring");
      //   if (pulseRing) {
      //     gsap.to(pulseRing, {
      //       scale: 2,
      //       opacity: 0,
      //       duration: 1.5,
      //       repeat: -1,
      //       ease: "power2.out",
      //     });
      //   }
      // });

      // Cards stagger animation
      cardsRef.current.forEach((card, index) => {
        if (!card) return;

        gsap.fromTo(
          card,
          { opacity: 0, x: index % 2 === 0 ? -50 : 50, y: 30 },
          {
            opacity: 1,
            x: 0,
            y: 0,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top bottom-=80",
              toggleActions: "play none none none",
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  let globalCardIndex = 0;

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative py-16 md:py-32 px-6 overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-64 h-64 bg-[#ec4899]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-32 w-64 h-64 bg-[#8b5cf6]/5 rounded-full blur-3xl" />
      </div>

      {/* Section Header */}
      <div ref={headerRef} className="max-w-6xl mx-auto mb-16 text-center relative z-10">
        {/* Label */}
        <div className="flex items-center justify-center gap-4 mb-6">
          <span className="h-px w-12 bg-linear-to-r from-transparent to-[#ec4899]" />
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-[#ec4899]">
            WORK EXPERIENCE
          </span>
          <span className="h-px w-12 bg-linear-to-l from-transparent to-[#ec4899]" />
        </div>

        {/* Title */}
        <h2 className="text-section mb-4">
          <span className="text-white">git log </span>
          <span className="gradient-text-pink italic">--graph --all</span>
        </h2>

        {/* Terminal Command */}
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#0d0d0d] rounded-lg border border-[#262626] font-mono text-xs sm:text-sm">
          <span className="text-[#10b981]">➜</span>
          <span className="text-[#06b6d4]">~/career</span>
          <span className="text-white">git log --graph --oneline --decorate</span>
        </div>

        {/* Stats */}
        <div className="flex justify-center gap-6 mt-6 font-mono text-xs">
          <span className="text-[#52525b]">
            <span className="text-[#10b981]">{workProjects.length + 1}</span> projects
          </span>
          <span className="text-[#52525b]">
            <span className="text-[#06b6d4]">{companies.length}</span> companies
          </span>
          <span className="text-[#52525b]">
            <span className="text-[#ec4899]">3+</span> years
          </span>
        </div>
      </div>

      {/* Git Timeline */}
      <div ref={timelineRef} className="max-w-5xl mx-auto relative">
        {/* Main Timeline Line */}
        <div className="absolute left-6 sm:left-8 md:left-12 top-0 bottom-0 w-0.5 bg-[#1a1a1a]">
          <div
            ref={timelineLineRef}
            className="w-full h-full origin-top bg-linear-to-b from-[#ec4899] via-[#8b5cf6] to-[#06b6d4]"
          />
        </div>

        {/* Companies */}
        <div className="space-y-12">
          {companies.map((company, companyIndex) => (
            <div key={company.id} className="relative">
              {/* Company Header */}
              <div
                ref={(el) => { dotsRef.current[companyIndex] = el; }}
                className="relative pl-14 sm:pl-20 md:pl-28 mb-6"
              >
                {/* Main Commit Dot */}
                <div
                  className={`absolute left-4 sm:left-6 md:left-10 w-5 h-5 rounded-full border-4 border-[#0a0a0a] z-20 flex items-center justify-center ${
                    company.status === "current"
                      ? "bg-[#10b981]"
                      : "bg-[#8b5cf6]"
                  }`}
                  style={{
                    boxShadow: company.status === "current"
                      ? "0 0 20px rgba(16,185,129,0.6)"
                      : "0 0 15px rgba(139,92,246,0.4)",
                  }}
                >
                  {/* Pulse Ring */}
                  <div
                    className="pulse-ring absolute inset-0 rounded-full"
                    style={{
                      backgroundColor: company.status === "current"
                        ? "rgba(16,185,129,0.3)"
                        : "rgba(139,92,246,0.2)",
                    }}
                  />
                </div>

                {/* Company Card */}
                <div className="p-4 sm:p-5 rounded-xl bg-linear-to-br from-[#141414] to-[#0d0d0d] border border-[#262626] hover:border-[#333] transition-all duration-300">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      {/* Commit Hash & Status */}
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <span className="px-2 py-0.5 font-mono text-[10px] bg-[#1a1a1a] border border-[#333] rounded text-[#f97316]">
                          {company.commitHash}
                        </span>
                        {company.status === "current" && (
                          <span className="px-2 py-0.5 font-mono text-[10px] bg-[#10b981]/10 border border-[#10b981]/30 rounded text-[#10b981] flex items-center gap-1">
                            <span className="w-1.5 h-1.5 bg-[#10b981] rounded-full animate-pulse" />
                            HEAD
                          </span>
                        )}
                        <span className="px-2 py-0.5 font-mono text-[10px] bg-[#8b5cf6]/10 border border-[#8b5cf6]/30 rounded text-[#8b5cf6]">
                          {company.projects.length} commits
                        </span>
                      </div>

                      {/* Company Name */}
                      <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white">
                        {company.name}
                      </h3>
                      <p className="font-mono text-sm text-[#ec4899]">{company.role}</p>
                    </div>

                    {/* Period Badge */}
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-[#0a0a0a] rounded-lg border border-[#262626] font-mono text-xs shrink-0">
                      <svg className="w-3.5 h-3.5 text-[#52525b]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span className="text-[#a1a1aa]">{company.period}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Branch Line for Projects */}
              <div className="absolute left-[30px] sm:left-[38px] md:left-[54px] top-20 bottom-4 w-px bg-[#262626]" />

              {/* Projects */}
              <div className="space-y-4 pl-14 sm:pl-20 md:pl-28">
                {company.projects.map((project, projectIndex) => {
                  const colors = colorSchemeMap[project.colorScheme];
                  const isExpanded = expandedProject === `${company.id}-${projectIndex}`;
                  const cardIndex = globalCardIndex++;

                  return (
                    <div
                      key={`${company.id}-${projectIndex}`}
                      ref={(el) => { cardsRef.current[cardIndex] = el; }}
                      className="relative"
                    >
                      {/* Project Dot */}
                      <div
                        className="absolute -left-[22px] sm:-left-[26px] md:-left-[22px] top-4 w-2.5 h-2.5 rounded-full border-2 border-[#0a0a0a] z-10"
                        style={{ backgroundColor: colors.glow.replace("0.5", "1").replace("rgba", "rgb").replace(",0.5)", ")") }}
                      />

                      {/* Project Card */}
                      <div
                        className={`p-4 rounded-xl bg-[#141414] border transition-all duration-300 cursor-pointer group ${
                          isExpanded ? "border-[#333]" : "border-[#1f1f1f] hover:border-[#333]"
                        }`}
                        onClick={() => setExpandedProject(isExpanded ? null : `${company.id}-${projectIndex}`)}
                      >
                        {/* Project Header */}
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex items-start gap-3 flex-1 min-w-0">
                            {/* Icon */}
                            <span className="text-2xl shrink-0">{project.icon}</span>

                            <div className="flex-1 min-w-0">
                              {/* Title & Role */}
                              <div className="flex flex-wrap items-center gap-2 mb-1">
                                <h4 className="font-semibold text-white group-hover:text-[#ec4899] transition-colors truncate">
                                  {project.title}
                                </h4>
                                <span className={`px-2 py-0.5 font-mono text-[10px] rounded ${colors.bg} ${colors.text} border ${colors.border}`}>
                                  {project.role}
                                </span>
                              </div>

                              {/* Description */}
                              <p className="text-xs text-[#a1a1aa] line-clamp-2">{project.description}</p>
                            </div>
                          </div>

                          {/* Expand Icon */}
                          <svg
                            className={`w-5 h-5 text-[#52525b] shrink-0 transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>

                        {/* Expanded Content */}
                        <div
                          className={`overflow-hidden transition-all duration-300 ${
                            isExpanded ? "max-h-[500px] opacity-100 mt-4" : "max-h-0 opacity-0"
                          }`}
                        >
                          {/* Features */}
                          <div className="mb-4">
                            <div className="font-mono text-[10px] text-[#52525b] uppercase tracking-wider mb-2">
                              // Features
                            </div>
                            <ul className="space-y-1.5">
                              {project.features.map((feature, featureIndex) => (
                                <li
                                  key={featureIndex}
                                  className="flex items-start gap-2 text-xs text-[#a1a1aa]"
                                >
                                  <span className="text-[#10b981] shrink-0 mt-0.5">+</span>
                                  <span>{feature}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Technologies */}
                          <div className="mb-4">
                            <div className="font-mono text-[10px] text-[#52525b] uppercase tracking-wider mb-2">
                              // Tech Stack
                            </div>
                            <div className="flex flex-wrap gap-1.5">
                              {project.technologies.map((tech) => (
                                <span
                                  key={tech}
                                  className="px-2 py-1 font-mono text-[10px] bg-[#1a1a1a] border border-[#262626] rounded text-[#a1a1aa] hover:border-[#333] hover:text-white transition-colors"
                                >
                                  {tech}
                                </span>
                              ))}
                            </div>
                          </div>

                          {/* Demo Link */}
                          {project.demoUrl && (
                            <a
                              href={project.demoUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="inline-flex items-center gap-2 px-3 py-1.5 font-mono text-xs bg-[#ec4899]/10 border border-[#ec4899]/30 rounded-lg text-[#ec4899] hover:bg-[#ec4899]/20 transition-colors"
                            >
                              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                              </svg>
                              View Live
                            </a>
                          )}
                        </div>

                        {/* Collapsed Tech Preview */}
                        {!isExpanded && (
                          <div className="flex flex-wrap gap-1 mt-3">
                            {project.technologies.slice(0, 4).map((tech) => (
                              <span
                                key={tech}
                                className="px-1.5 py-0.5 font-mono text-[9px] bg-[#1a1a1a] rounded text-[#52525b]"
                              >
                                {tech}
                              </span>
                            ))}
                            {project.technologies.length > 4 && (
                              <span className="px-1.5 py-0.5 font-mono text-[9px] text-[#52525b]">
                                +{project.technologies.length - 4}
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Company Stats */}
              <div className="pl-14 sm:pl-20 md:pl-28 mt-4">
                <div className="flex flex-wrap gap-4 font-mono text-[10px] text-[#52525b]">
                  <span>
                    <span className="text-[#10b981]">+{company.projects.reduce((acc, p) => acc + p.features.length, 0)}</span> contributions
                  </span>
                  <span>
                    <span className="text-[#06b6d4]">{company.projects.length}</span> projects
                  </span>
                  <span>
                    <span className="text-[#f97316]">{company.projects.reduce((acc, p) => acc + p.technologies.length, 0)}</span> technologies
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Git Log End */}
        <div className="relative pl-14 sm:pl-20 md:pl-28 mt-12">
          <div className="absolute left-4 sm:left-6 md:left-10 w-5 h-5 rounded-full bg-[#262626] border-4 border-[#0a0a0a] flex items-center justify-center">
            <div className="w-1.5 h-1.5 rounded-full bg-[#52525b]" />
          </div>
          <div className="font-mono text-xs text-[#52525b] flex items-center gap-2 py-2">
            <span className="text-[#333]">...</span>
            <span className="text-[#262626]">initial commit - started coding journey</span>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="hidden xl:block absolute left-8 top-1/3 font-mono text-[10px] text-[#1a1a1a] space-y-2">
        {Array.from({ length: 20 }, (_, i) => (
          <div key={i}>{String(i + 300).padStart(3, "0")}</div>
        ))}
      </div>

      <div className="hidden xl:block absolute right-8 bottom-1/4 font-mono text-[10px] text-[#1a1a1a] text-right space-y-2">
        {Array.from({ length: 10 }, (_, i) => (
          <div key={i}>
            <span className="text-[#262626]">//</span> line {350 + i}
          </div>
        ))}
      </div>
    </section>
  );
}
