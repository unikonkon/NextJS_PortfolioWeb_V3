"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface Project {
  name: string;
  role: string;
  description: string[];
}

interface Experience {
  id: string;
  commitHash: string;
  company: string;
  role: string;
  period: string;
  status: "current" | "completed";
  projects: Project[];
}

const experiences: Experience[] = [
  {
    id: "exp-1",
    commitHash: "a1b2c3d",
    company: "iApp Technology",
    role: "Full Stack Developer",
    period: "Feb 2023 - Present",
    status: "current",
    projects: [
      {
        name: "NBCT - Drone Data Transmission",
        role: "Backend Developer",
        description: [
          "Developed API for transmitting drone data to mobile and web platforms",
          "Presented API functionality to clients",
        ],
      },
      {
        name: "ACT Phase 1",
        role: "Full Stack Developer",
        description: [
          "Updated API for fetching data from web and Kibana database",
          "Updated front-end to display data from MA and integrated database sources",
          "Wrote Python logic for project risk assessment",
          "Created Excel export functionality for project and company data",
          "Redesigned data fetching flow for EGP, DBD, and GOV pages",
        ],
      },
      {
        name: "ACT Phase 2",
        role: "Full Stack Developer",
        description: [
          "Designed workflow for fetching project and company data",
          "Developed API to fetch and store project data in database",
          "Set up Jenkins process for automating data fetching commands",
          "Developed front-end web view for Phase 2",
        ],
      },
      {
        name: "iApp Speech Flow for Web",
        role: "Full Stack Developer",
        description: [
          "Converted mobile codebase to Next.js web application",
          "Built Electron app for macOS and Windows",
        ],
      },
      {
        name: "iisi huboftalent",
        role: "Front-end Developer",
        description: [
          "Connected role data API from signup process to display and edit in view",
          "Connected API flow for liking profiles and viewing data in system",
        ],
      },
      {
        name: "digitaltouchpoint-wellness-chatbot",
        role: "Full Stack Developer",
        description: [
          "Built API for CRUD operations and package pricing",
          "Implemented JWT authentication flow",
          "Created dashboard bot view",
        ],
      },
    ],
  },
  {
    id: "exp-2",
    commitHash: "e4f5g6h",
    company: "Vertobase Co., Ltd.",
    role: "Front-end Developer",
    period: "Mar 2022 - Dec 2022",
    status: "completed",
    projects: [
      {
        name: "Zignway App",
        role: "Front-end Developer",
        description: [
          "Built front-end using React and Next.js",
          "Developed Flutter code for mobile PIN login",
        ],
      },
    ],
  },
];

export default function ExperienceSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

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

      // Experience cards stagger animation
      const cards = timelineRef.current?.querySelectorAll(".experience-card");
      if (cards) {
        gsap.fromTo(
          cards,
          { opacity: 0, x: -30 },
          {
            opacity: 1,
            x: 0,
            duration: 0.6,
            stagger: 0.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: timelineRef.current,
              start: "top bottom-=50",
              toggleActions: "play none none none",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative py-16 md:py-32 px-6"
    >
      {/* Section Header */}
      <div ref={headerRef} className="max-w-5xl mx-auto mb-16 text-center">
        {/* Label */}
        <div className="flex items-center justify-center gap-4 mb-6">
          <span className="h-px w-12 bg-gradient-to-r from-transparent to-[#ec4899]" />
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-[#ec4899]">
            CAREER
          </span>
          <span className="h-px w-12 bg-gradient-to-l from-transparent to-[#ec4899]" />
        </div>

        {/* Title */}
        <h2 className="text-section mb-4">
          <span className="text-white">git log </span>
          <span className="gradient-text-pink italic">--oneline experience</span>
        </h2>

        {/* Terminal Command */}
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#0d0d0d] rounded-lg border border-[#262626] font-mono text-sm">
          <span className="text-[#10b981]">➜</span>
          <span className="text-[#06b6d4]">~/career</span>
          <span className="text-white">git log --oneline --graph</span>
        </div>
      </div>

      {/* Git Timeline */}
      <div ref={timelineRef} className="max-w-4xl mx-auto relative">
        {/* Git Branch Line */}
        <div className="absolute left-8 md:left-12 top-0 bottom-0 w-px bg-gradient-to-b from-[#ec4899] via-[#8b5cf6] to-[#262626]" />

        {/* Experience Cards */}
        <div className="space-y-8">
          {experiences.map((exp, expIndex) => (
            <div
              key={exp.id}
              className="experience-card relative pl-20 md:pl-28"
            >
              {/* Git Commit Dot */}
              <div
                className={`absolute left-6 md:left-10 w-4 h-4 rounded-full border-4 border-[#0a0a0a] z-10 ${
                  exp.status === "current"
                    ? "bg-[#10b981] shadow-[0_0_20px_rgba(16,185,129,0.5)]"
                    : "bg-[#8b5cf6]"
                }`}
              />

              {/* Git Branch Fork Lines */}
              {exp.projects.length > 1 && (
                <div className="absolute left-[34px] md:left-[50px] top-8 bottom-8 w-px bg-[#333] opacity-50" />
              )}

              {/* Company Card */}
              <div className="p-6 rounded-xl bg-[#141414] border border-[#262626] hover:border-[#333] transition-all duration-300 group">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
                  <div>
                    {/* Commit Hash */}
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-2 py-0.5 font-mono text-[10px] bg-[#1a1a1a] border border-[#333] rounded text-[#f97316]">
                        {exp.commitHash}
                      </span>
                      {exp.status === "current" && (
                        <span className="px-2 py-0.5 font-mono text-[10px] bg-[#10b981]/10 border border-[#10b981]/30 rounded text-[#10b981] flex items-center gap-1">
                          <span className="w-1.5 h-1.5 bg-[#10b981] rounded-full animate-pulse" />
                          HEAD
                        </span>
                      )}
                    </div>

                    {/* Company Name */}
                    <h3 className="text-xl md:text-2xl font-semibold text-white group-hover:gradient-text-pink transition-all duration-300">
                      {exp.company}
                    </h3>
                    <p className="font-mono text-sm text-[#8b5cf6]">{exp.role}</p>
                  </div>

                  {/* Period Badge */}
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-[#0d0d0d] rounded-lg border border-[#262626] font-mono text-xs">
                    <svg className="w-3.5 h-3.5 text-[#52525b]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span className="text-[#a1a1aa]">{exp.period}</span>
                  </div>
                </div>

                {/* Projects */}
                <div className="space-y-4">
                  {exp.projects.map((project, projIndex) => (
                    <div
                      key={project.name}
                      className="relative pl-4 border-l-2 border-[#262626] hover:border-[#8b5cf6]/50 transition-colors"
                    >
                      {/* Project Dot */}
                      <div className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-[#333]" />

                      {/* Project Header */}
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <span className="font-mono text-sm text-white">
                          {project.name}
                        </span>
                        <span className="px-2 py-0.5 font-mono text-[10px] bg-[#8b5cf6]/10 border border-[#8b5cf6]/30 rounded text-[#8b5cf6]">
                          {project.role}
                        </span>
                      </div>

                      {/* Project Description */}
                      <ul className="space-y-1">
                        {project.description.map((desc, descIndex) => (
                          <li
                            key={descIndex}
                            className="flex items-start gap-2 text-xs text-[#a1a1aa]"
                          >
                            <span className="text-[#10b981] mt-0.5">+</span>
                            <span>{desc}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                {/* Git Stats Footer */}
                <div className="mt-4 pt-4 border-t border-[#262626] flex flex-wrap gap-4 font-mono text-[10px] text-[#52525b]">
                  <span>
                    <span className="text-[#10b981]">+{exp.projects.reduce((acc, p) => acc + p.description.length, 0)}</span> contributions
                  </span>
                  <span>
                    <span className="text-[#06b6d4]">{exp.projects.length}</span> projects
                  </span>
                  <span className="text-[#ec4899]">
                    #{expIndex + 1}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Git Log End */}
        <div className="relative pl-20 md:pl-28 mt-8">
          <div className="absolute left-6 md:left-10 w-4 h-4 rounded-full bg-[#262626] border-4 border-[#0a0a0a]" />
          <div className="font-mono text-xs text-[#52525b] flex items-center gap-2">
            <span>...</span>
            <span className="text-[#333]">initial commit - started coding journey</span>
          </div>
        </div>
      </div>

      {/* Decorative Line Numbers */}
      <div className="hidden xl:block absolute left-8 top-1/3 font-mono text-[10px] text-[#1a1a1a] space-y-2">
        {Array.from({ length: 20 }, (_, i) => (
          <div key={i}>{String(i + 300).padStart(3, "0")}</div>
        ))}
      </div>
    </section>
  );
}
