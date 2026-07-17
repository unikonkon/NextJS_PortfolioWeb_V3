"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import Image from "next/image";
import gsap from "gsap";
import type { Project } from "@/data/personalProjects";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ExternalLink, Github, Images, X } from "lucide-react";
import { featuredProjects } from "@/data/personalProjects";

gsap.registerPlugin(ScrollTrigger);

// Extract unique types from projects
const projectTypes = ["ALL", ...Array.from(new Set(featuredProjects.map(p => p.type)))] as const;
type ProjectType = typeof projectTypes[number];

// Type color mapping for filter buttons and card type labels
const typeColors: Record<string, { active: string; text: string; border: string; glow: string; hex: string; rgba: string }> = {
  "ALL": { active: "bg-[#ec4899]", text: "text-[#ec4899]", border: "border-[#ec4899]/30", glow: "rgba(236,72,153,0.4)", hex: "#ec4899", rgba: "rgba(236,72,153,0.5)" },
  "WEB APP": { active: "bg-[#3b82f6]", text: "text-[#3b82f6]", border: "border-[#3b82f6]/30", glow: "rgba(59,130,246,0.4)", hex: "#3b82f6", rgba: "rgba(59,130,246,0.5)" },
  "MOBILE APP": { active: "bg-[#10b981]", text: "text-[#10b981]", border: "border-[#10b981]/30", glow: "rgba(16,185,129,0.4)", hex: "#10b981", rgba: "rgba(16,185,129,0.5)" },
  "DESIGN": { active: "bg-[#f97316]", text: "text-[#f97316]", border: "border-[#f97316]/30", glow: "rgba(249,115,22,0.4)", hex: "#f97316", rgba: "rgba(249,115,22,0.5)" },
  "FULL STACK": { active: "bg-[#8b5cf6]", text: "text-[#8b5cf6]", border: "border-[#8b5cf6]/30", glow: "rgba(139,92,246,0.4)", hex: "#8b5cf6", rgba: "rgba(139,92,246,0.5)" },
  "AI APP": { active: "bg-[#06b6d4]", text: "text-[#06b6d4]", border: "border-[#06b6d4]/30", glow: "rgba(6,182,212,0.4)", hex: "#06b6d4", rgba: "rgba(6,182,212,0.5)" },
  "TOOL": { active: "bg-[#eab308]", text: "text-[#eab308]", border: "border-[#eab308]/30", glow: "rgba(234,179,8,0.4)", hex: "#eab308", rgba: "rgba(234,179,8,0.5)" },
  "PORTFOLIO": { active: "bg-[#6366f1]", text: "text-[#6366f1]", border: "border-[#6366f1]/30", glow: "rgba(99,102,241,0.4)", hex: "#6366f1", rgba: "rgba(99,102,241,0.5)" },
  "API": { active: "bg-[#ef4444]", text: "text-[#ef4444]", border: "border-[#ef4444]/30", glow: "rgba(239,68,68,0.4)", hex: "#ef4444", rgba: "rgba(239,68,68,0.5)" },
  "AI APP & FULL STACK": { active: "bg-[#8b5cf6]", text: "text-[#8b5cf6]", border: "border-[#8b5cf6]/30", glow: "rgba(139,92,246,0.4)", hex: "#8b5cf6", rgba: "rgba(139,92,246,0.5)" },
  "Landing Page": { active: "bg-[#f59e0b]", text: "text-[#f59e0b]", border: "border-[#f59e0b]/30", glow: "rgba(245,158,11,0.4)", hex: "#f59e0b", rgba: "rgba(245,158,11,0.5)" },
};

const getTypeColor = (projectType: string) => typeColors[projectType] || typeColors["ALL"];

// First N of the filtered list render as large featured cards, the rest as tiles
const FEATURED_COUNT = 3;

// Some backend-only projects use a placeholder key instead of a real image path
const hasRealImage = (project: Project) => project.image.startsWith("/");

// Shared placeholder for backend projects without screenshots
function BackendPlaceholder({ title }: { title: string }) {
  return (
    <div className="absolute inset-0 bg-linear-to-br from-[#0a0a0a] via-[#1a1a1a] to-[#0d0d0d] flex flex-col items-center justify-center gap-3">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(239,68,68,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(239,68,68,0.03)_1px,transparent_1px)] bg-size-[20px_20px]" />
      <div className="relative w-12 h-12 rounded-xl bg-[#e0234e]/10 border border-[#e0234e]/30 flex items-center justify-center">
        <Image src="/project/nestjs-svgrepo-com.svg" alt={title} width={24} height={24} />
      </div>
      <span className="relative font-mono text-[10px] tracking-[0.2em] text-[#52525b]">
        BACKEND API
      </span>
    </div>
  );
}

export default function ProjectSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const filterRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const [activeFilter, setActiveFilter] = useState<ProjectType>("ALL");
  const [filteredProjects, setFilteredProjects] = useState(featuredProjects);
  const [detailModal, setDetailModal] = useState<{ isOpen: boolean; project: Project | null }>({
    isOpen: false,
    project: null
  });
  const modalRef = useRef<HTMLDivElement>(null);
  const modalContentRef = useRef<HTMLDivElement>(null);

  const featured = filteredProjects.slice(0, FEATURED_COUNT);
  const rest = filteredProjects.slice(FEATURED_COUNT);

  // Filter projects — the grid animates in via the effect below
  const handleFilterChange = useCallback((type: ProjectType) => {
    setActiveFilter(type);
    setFilteredProjects(
      type === "ALL" ? featuredProjects : featuredProjects.filter(p => p.type === type)
    );
  }, []);

  // Open detail modal
  const openDetailModal = useCallback((project: Project) => {
    setDetailModal({ isOpen: true, project });
    document.body.style.overflow = 'hidden';

    requestAnimationFrame(() => {
      if (modalRef.current && modalContentRef.current) {
        gsap.fromTo(modalRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.3, ease: "power2.out" }
        );
        gsap.fromTo(modalContentRef.current,
          { opacity: 0, y: 50, scale: 0.95 },
          { opacity: 1, y: 0, scale: 1, duration: 0.4, ease: "power2.out", delay: 0.1 }
        );
      }
    });
  }, []);

  // Close detail modal
  const closeDetailModal = useCallback(() => {
    if (modalRef.current && modalContentRef.current) {
      gsap.to(modalContentRef.current, {
        opacity: 0,
        y: 30,
        scale: 0.95,
        duration: 0.2,
        ease: "power2.in"
      });
      gsap.to(modalRef.current, {
        opacity: 0,
        duration: 0.3,
        ease: "power2.in",
        delay: 0.1,
        onComplete: () => {
          setDetailModal({ isOpen: false, project: null });
          document.body.style.overflow = '';
        }
      });
    } else {
      setDetailModal({ isOpen: false, project: null });
      document.body.style.overflow = '';
    }
  }, []);

  // Handle escape key to close modal
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && detailModal.isOpen) {
        closeDetailModal();
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [detailModal.isOpen, closeDetailModal]);

  // Header and filter entrance animations
  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
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

      if (filterRef.current) {
        gsap.fromTo(
          filterRef.current,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: "power2.out",
            scrollTrigger: {
              trigger: filterRef.current,
              start: "top bottom-=50",
              toggleActions: "play none none none",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Cards fade-up (play once) — reruns whenever the filter changes the list
  useEffect(() => {
    if (!gridRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".proj-item",
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.45,
          stagger: 0.05,
          ease: "power2.out",
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top bottom-=50",
            toggleActions: "play none none none",
          },
        }
      );
    }, gridRef);

    return () => ctx.revert();
  }, [filteredProjects]);

  return (
    <section
      id="work"
      ref={sectionRef}
      className="relative py-16 md:py-32 px-6"
    >
      {/* Section Header */}
      <div ref={headerRef} className="max-w-7xl mx-auto mb-16 text-center">
        {/* Label */}
        <div className="flex items-center justify-center gap-4 mb-6">
          <span
            className="h-px w-12 transition-colors duration-500"
            style={{
              background: `linear-gradient(to right, transparent, ${typeColors[activeFilter]?.hex || "#8b5cf6"})`,
            }}
          />
          <span
            className="font-mono text-xs uppercase tracking-[0.3em] transition-colors duration-500"
            style={{ color: typeColors[activeFilter]?.hex || "#5ce2f6" }}
          >
            PERSONAL PROJECT
          </span>
          <span
            className="h-px w-12 transition-colors duration-500"
            style={{
              background: `linear-gradient(to left, transparent, ${typeColors[activeFilter]?.hex || "#8b5cf6"})`,
            }}
          />
        </div>

        {/* Title */}
        <h2 className="text-section">
          <span className="text-white">git status </span>
          <span className="gradient-text-pink italic">--short personal-project</span>
        </h2>

        {/* Subtitle */}
        <p className="mt-4 text-[#a1a1aa] max-w-xl mx-auto">
          <span className="font-mono text-[#52525b]">{"// "}</span>
          A selection of projects that showcase my skills and passion for building digital products
        </p>

        {/* Filter Buttons */}
        <div
          ref={filterRef}
          className="mt-8 flex flex-wrap justify-center gap-2"
        >
          {/* Terminal command prefix */}
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-[#0d0d0d] rounded-lg border border-[#1a1a1a] font-mono text-xs">
            <span className="text-[#10b981]">$</span>
            <span className="text-[#52525b]">filter --type</span>
          </div>

          {/* Filter buttons */}
          {projectTypes.map((type) => {
            const colors = typeColors[type] || typeColors["ALL"];
            const isActive = activeFilter === type;
            const count = type === "ALL"
              ? featuredProjects.length
              : featuredProjects.filter(p => p.type === type).length;

            return (
              <button
                key={type}
                onClick={() => handleFilterChange(type)}
                className={`
                  relative px-3 py-1.5 font-mono text-xs rounded-lg border transition-all duration-300 cursor-pointer
                  ${isActive
                    ? `${colors.active} text-white border-transparent`
                    : `bg-[#0d0d0d] ${colors.text} ${colors.border} hover:bg-[#141414]`
                  }
                  group
                `}
                style={{
                  boxShadow: isActive ? `0 0 20px ${colors.glow}` : "none",
                }}
              >
                <span className="flex items-center gap-1.5">
                  {type === "ALL" && <span>*</span>}
                  {type}
                  <span className={`
                    px-1 py-0.5 text-[9px] rounded
                    ${isActive ? "bg-white/20" : "bg-[#1a1a1a]"}
                  `}>
                    {count}
                  </span>
                </span>

                {/* Active indicator line */}
                {isActive && (
                  <span className="absolute -bottom-px left-1/2 -translate-x-1/2 w-8 h-0.5 bg-white/50 rounded-full" />
                )}
              </button>
            );
          })}
        </div>

        {/* Filter result text */}
        <div className="mt-4 font-mono text-xs text-[#52525b] flex items-center justify-center gap-2">
          <span className="text-[#10b981]">→</span>
          <span>
            Showing <span className={typeColors[activeFilter]?.text || "text-[#ec4899]"}>{filteredProjects.length}</span> projects
            {activeFilter !== "ALL" && (
              <span> matching <span className="text-[#a1a1aa]">&quot;{activeFilter}&quot;</span></span>
            )}
          </span>
        </div>
      </div>

      {/* Projects Grid — featured large cards + image tiles */}
      <div ref={gridRef} className="max-w-6xl mx-auto">
        {/* Featured Projects — large cards with full details */}
        {featured.length > 0 && (
          <div className="flex flex-col gap-4 mb-4">
            {featured.map((project) => {
              const typeColor = getTypeColor(project.type);

              return (
                <div
                  key={project.id}
                  onClick={() => openDetailModal(project)}
                  className="proj-item group grid md:grid-cols-[1.2fr_1fr] rounded-xl overflow-hidden bg-[#141414] border border-[#1f1f1f] hover:border-[#333] transition-colors duration-300 cursor-pointer"
                >
                  {/* Image */}
                  <div className="relative aspect-video md:aspect-auto md:min-h-[240px] bg-[#0a0a0a] overflow-hidden">
                    {hasRealImage(project) ? (
                      <>
                        <Image
                          src={project.image}
                          alt={project.title}
                          fill
                          className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
                          sizes="(max-width: 768px) 100vw, 60vw"
                        />
                        <div className="absolute inset-0 bg-linear-to-t from-[#141414]/40 to-transparent md:bg-linear-to-r" />
                      </>
                    ) : (
                      <BackendPlaceholder title={project.title} />
                    )}
                  </div>

                  {/* Details */}
                  <div className="p-5 md:p-6 flex flex-col gap-2.5">
                    <div className="flex items-center gap-3 font-mono text-[10px]">
                      <span className="text-[#fbbf24] tracking-[0.15em]">★ FEATURED</span>
                      <span
                        className="uppercase tracking-wider"
                        style={{ color: typeColor.hex }}
                      >
                        {project.type}
                      </span>
                    </div>

                    <h3 className="text-lg md:text-xl font-semibold text-white group-hover:text-[#ec4899] transition-colors">
                      {project.title}
                    </h3>

                    <p className="text-sm text-[#a1a1aa] leading-relaxed line-clamp-3">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-1.5 mt-1">
                      {project.technologies.slice(0, 6).map((tech) => (
                        <span
                          key={tech}
                          className="font-mono text-[10px] px-2 py-0.5 rounded bg-[#0a0a0a] border border-[#1f1f1f] text-[#a1a1aa]"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 6 && (
                        <span className="font-mono text-[10px] px-1 py-0.5 text-[#52525b]">
                          +{project.technologies.length - 6}
                        </span>
                      )}
                    </div>

                    <div className="mt-auto pt-3 flex flex-wrap items-center gap-2 font-mono text-xs">
                      {project.demoUrl && (
                        <a
                          href={project.demoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[#ec4899] bg-[#ec4899]/10 border border-[#ec4899]/30 hover:bg-[#ec4899]/20 hover:shadow-[0_0_16px_rgba(236,72,153,0.25)] transition-all duration-300"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          Live Demo
                        </a>
                      )}
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[#a1a1aa] bg-[#0a0a0a] border border-[#262626] hover:text-white hover:border-[#3a3a3a] hover:bg-[#1a1a1a] transition-all duration-300"
                        >
                          <Github className="w-3.5 h-3.5" />
                          GitHub
                        </a>
                      )}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          openDetailModal(project);
                        }}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-mono text-xs text-[#8b5cf6] bg-[#8b5cf6]/10 border border-[#8b5cf6]/30 hover:bg-[#8b5cf6]/20 hover:shadow-[0_0_16px_rgba(139,92,246,0.25)] transition-all duration-300 cursor-pointer"
                      >
                        <Images className="w-3.5 h-3.5" />
                        Details
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Remaining Projects — image-first tiles */}
        {rest.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {rest.map((project) => {
              const typeColor = getTypeColor(project.type);

              return (
                <div
                  key={project.id}
                  onClick={() => openDetailModal(project)}
                  className="proj-item group relative aspect-[16/10] rounded-xl overflow-hidden border border-[#1f1f1f] hover:border-[#333] transition-colors duration-300 cursor-pointer bg-[#0a0a0a]"
                >
                  {/* Image */}
                  {hasRealImage(project) ? (
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  ) : (
                    <BackendPlaceholder title={project.title} />
                  )}

                  {/* Bottom gradient shade */}
                  <div className="absolute inset-0 bg-linear-to-t from-[#050507]/95 via-[#050507]/25 to-transparent group-hover:via-[#050507]/55 transition-colors duration-300" />

                  {/* Hover actions */}
                  <div className="absolute left-4 bottom-14 flex gap-2 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                    {project.demoUrl && (
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 font-mono text-[10px] text-white bg-white/10 border border-white/20 rounded-md backdrop-blur-sm hover:bg-white/20 transition-colors"
                      >
                        <ExternalLink className="w-3 h-3" />
                        Demo
                      </a>
                    )}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 font-mono text-[10px] text-white bg-white/10 border border-white/20 rounded-md backdrop-blur-sm hover:bg-white/20 transition-colors"
                      >
                        <Github className="w-3 h-3" />
                        Code
                      </a>
                    )}
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 font-mono text-[10px] text-white bg-white/10 border border-white/20 rounded-md backdrop-blur-sm">
                      <Images className="w-3 h-3" />
                      Details
                    </span>
                  </div>

                  {/* Caption */}
                  <div className="absolute left-4 right-4 bottom-3.5">
                    <h3 className="text-white text-sm font-semibold truncate">
                      {project.title}
                    </h3>
                    <p
                      className="font-mono text-[9.5px] uppercase tracking-[0.08em]"
                      style={{ color: typeColor.hex }}
                    >
                      {project.type}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-16">
            <div className="font-mono text-sm text-[#52525b]">
              <span className="text-[#ef4444]">ERROR:</span> No projects found matching filter
            </div>
            <button
              onClick={() => handleFilterChange("ALL")}
              className="mt-4 px-4 py-2 font-mono text-xs text-[#ec4899] border border-[#ec4899]/30 rounded-lg hover:bg-[#ec4899]/10 transition-colors"
            >
              Reset filter
            </button>
          </div>
        )}

        {/* View All Link */}
        <div className="mt-16 text-center">
          <a
            href="https://github.com/unikonkon"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-mono text-sm text-[#a1a1aa] hover:text-white transition-colors group"
          >
            <span>View all projects on GitHub</span>
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
          </a>
        </div>
      </div>

      {/* Decorative Line Numbers */}
      <div className="hidden xl:block absolute left-8 top-1/2 -translate-y-1/2 font-mono text-[10px] text-[#262626] space-y-4">
        {Array.from({ length: 20 }, (_, i) => (
          <div key={i}>{String(i + 100).padStart(3, "0")}</div>
        ))}
      </div>

      {/* Detail Modal — full project details + gallery */}
      {detailModal.isOpen && detailModal.project && (
        <div
          ref={modalRef}
          className="fixed inset-0 z-50 flex items-start justify-center p-4 sm:p-6 md:p-8 "
          onClick={closeDetailModal}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" />

          {/* Modal Content */}
          <div
            ref={modalContentRef}
            className="relative w-full max-w-4xl my-8 bg-[#0d0d0d] border border-[#1a1a1a] rounded-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="sticky top-0 z-10 flex items-center justify-between py-2 px-4 bg-[#0d0d0d]/95 backdrop-blur-sm border-b border-[#1a1a1a]">
              <div className="flex items-center gap-3 min-w-0">
                <span className="font-mono text-xs sm:text-sm text-white truncate">
                  {detailModal.project.title}
                </span>
                <span
                  className="px-2 py-0.5 text-[10px] font-mono rounded border shrink-0"
                  style={{
                    color: getTypeColor(detailModal.project.type).hex,
                    backgroundColor: `${getTypeColor(detailModal.project.type).hex}1a`,
                    borderColor: `${getTypeColor(detailModal.project.type).hex}4d`,
                  }}
                >
                  {detailModal.project.type}
                </span>
              </div>

              {/* Close Button */}
              <button
                onClick={closeDetailModal}
                className="flex items-center justify-center w-8 h-8 text-[#52525b] hover:text-white hover:bg-[#1a1a1a] rounded-lg transition-colors cursor-pointer shrink-0"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-4 md:p-6 space-y-5 overflow-y-auto max-h-[82vh]">
              {/* Role & Description */}
              <div>
                <p className="font-mono text-xs text-[#52525b] mb-2">{detailModal.project.role}</p>
                <p className="text-sm text-[#a1a1aa] leading-relaxed">
                  {detailModal.project.description}
                </p>
              </div>

              {/* Tech Stack */}
              <div>
                <div className="font-mono text-[10px] text-[#52525b] uppercase tracking-wider mb-2">
                  {"// Tech Stack"}
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {detailModal.project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="font-mono text-[10px] px-2 py-1 rounded bg-[#141414] border border-[#262626] text-[#a1a1aa]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Links */}
              <div className="flex flex-wrap gap-2">
                {detailModal.project.demoUrl && (
                  <a
                    href={detailModal.project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 font-mono text-xs text-[#ec4899] bg-[#ec4899]/10 border border-[#ec4899]/30 rounded-lg hover:bg-[#ec4899]/20 transition-colors"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    Live Demo
                  </a>
                )}
                {detailModal.project.githubUrl && (
                  <a
                    href={detailModal.project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 font-mono text-xs text-[#a1a1aa] bg-[#141414] border border-[#262626] rounded-lg hover:text-white hover:border-[#333] transition-colors"
                  >
                    <Github className="w-3.5 h-3.5" />
                    GitHub
                  </a>
                )}
                {detailModal.project.githubUrlFrontend && (
                  <a
                    href={detailModal.project.githubUrlFrontend}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 font-mono text-xs text-[#06b6d4] bg-[#06b6d4]/10 border border-[#06b6d4]/30 rounded-lg hover:bg-[#06b6d4]/20 transition-colors"
                  >
                    <Github className="w-3.5 h-3.5" />
                    Frontend
                  </a>
                )}
                {detailModal.project.githubUrlBackend && (
                  <a
                    href={detailModal.project.githubUrlBackend}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 font-mono text-xs text-[#10b981] bg-[#10b981]/10 border border-[#10b981]/30 rounded-lg hover:bg-[#10b981]/20 transition-colors"
                  >
                    <Github className="w-3.5 h-3.5" />
                    Backend
                  </a>
                )}
                {detailModal.project.githubUrlNodePullData && (
                  <a
                    href={detailModal.project.githubUrlNodePullData}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 font-mono text-xs text-[#f59e0b] bg-[#f59e0b]/10 border border-[#f59e0b]/30 rounded-lg hover:bg-[#f59e0b]/20 transition-colors"
                  >
                    <Github className="w-3.5 h-3.5" />
                    Scraper
                  </a>
                )}
              </div>

              {/* Gallery Images */}
              {(() => {
                const images = detailModal.project.slideImages?.length
                  ? detailModal.project.slideImages
                  : hasRealImage(detailModal.project)
                    ? [detailModal.project.image]
                    : [];
                if (!images.length) return null;

                return (
                  <div>
                    <div className="font-mono text-[10px] text-[#52525b] uppercase tracking-wider mb-2">
                      {"// Screenshots"} ({images.length})
                    </div>
                    <div className="space-y-4">
                      {images.map((img, imgIndex) => (
                        <div
                          key={imgIndex}
                          className="relative w-full rounded-lg overflow-hidden bg-[#0a0a0a] border border-[#1a1a1a] group/img"
                        >
                          <div className="relative w-full aspect-video">
                            <Image
                              src={img}
                              alt={`${detailModal.project!.title} - Screenshot ${imgIndex + 1}`}
                              fill
                              className="object-contain object-top transition-transform duration-500 group-hover/img:scale-[1.02]"
                            />
                            {/* Overlay with image number */}
                            <div className="absolute top-3 left-3 px-2 py-1 bg-black/60 backdrop-blur-sm rounded-lg font-mono text-xs text-white/80">
                              {String(imgIndex + 1).padStart(2, '0')} / {String(images.length).padStart(2, '0')}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })()}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
