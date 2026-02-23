"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";
import type { Project, ColorScheme } from "@/data/personalProjects";

gsap.registerPlugin(ScrollTrigger);

const colorSchemeClasses: Record<ColorScheme, { gradient: string; glow: string; border: string }> = {
  pink: {
    gradient: "card-gradient-pink",
    glow: "hover:shadow-[0_0_40px_-10px_rgba(236,72,153,0.4)]",
    border: "hover:border-[#ec4899]/30",
  },
  purple: {
    gradient: "card-gradient-purple",
    glow: "hover:shadow-[0_0_40px_-10px_rgba(139,92,246,0.4)]",
    border: "hover:border-[#8b5cf6]/30",
  },
  cyan: {
    gradient: "card-gradient-cyan",
    glow: "hover:shadow-[0_0_40px_-10px_rgba(6,182,212,0.4)]",
    border: "hover:border-[#06b6d4]/30",
  },
  orange: {
    gradient: "card-gradient-orange",
    glow: "hover:shadow-[0_0_40px_-10px_rgba(249,115,22,0.4)]",
    border: "hover:border-[#f97316]/30",
  },
  orangeLight: {
    gradient: "card-gradient-orange",
    glow: "hover:shadow-[0_0_40px_-10px_rgba(251,146,60,0.4)]",
    border: "hover:border-[#fb923c]/30",
  },
  green: {
    gradient: "card-gradient-green",
    glow: "hover:shadow-[0_0_40px_-10px_rgba(16,185,129,0.4)]",
    border: "hover:border-[#10b981]/30",
  },
  indigo: {
    gradient: "card-gradient-indigo",
    glow: "hover:shadow-[0_0_40px_-10px_rgba(99,102,241,0.4)]",
    border: "hover:border-[#6366f1]/30",
  },
  blue: {
    gradient: "card-gradient-cyan",
    glow: "hover:shadow-[0_0_40px_-10px_rgba(59,130,246,0.4)]",
    border: "hover:border-[#3b82f6]/30",
  },
  yellow: {
    gradient: "card-gradient-orange",
    glow: "hover:shadow-[0_0_40px_-10px_rgba(234,179,8,0.4)]",
    border: "hover:border-[#eab308]/30",
  },
  red: {
    gradient: "card-gradient-pink",
    glow: "hover:shadow-[0_0_40px_-10px_rgba(239,68,68,0.4)]",
    border: "hover:border-[#ef4444]/30",
  },
};

interface ProjectCardProps {
  project: Project;
  index: number;
  onOpenGallery?: () => void;
}

export default function ProjectCard({ project, index, onOpenGallery }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  const colorClasses = colorSchemeClasses[project.colorScheme] || colorSchemeClasses.purple;

  useEffect(() => {
    if (!cardRef.current) return;

    const ctx = gsap.context(() => {
      // Card fade in animation
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.3,
          ease: "power3.out",
          scrollTrigger: {
            trigger: cardRef.current,
            start: "top bottom-=100",
            toggleActions: "play none none none",
          },
          delay: index * 0.05,
        }
      );

      // Parallax effect on image
      if (imageRef.current) {
        gsap.to(imageRef.current, {
          y: -20,
          ease: "none",
          scrollTrigger: {
            trigger: cardRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        });
      }
    }, cardRef);

    return () => ctx.revert();
  }, [index]);

  return (
    <div
      ref={cardRef}
      className={cn(
        "group relative rounded-2xl bg-[#141414] border border-[#262626] overflow-hidden transition-all duration-500",
        colorClasses.glow,
        colorClasses.border,
        "hover:-translate-y-2"
      )}
    >
      {/* Header */}
      <div className="p-6 pb-0 flex items-start justify-between gap-4">
        <div className="flex items-center gap-4">
          {/* Index Number */}
          <span className="line-number text-2xl font-bold text-[#333]">
            {project.index}
          </span>
          {/* Type Badge */}
          <span className="terminal-badge text-xs uppercase tracking-wider">
            {project.type}
          </span>
        </div>
        {/* Date Badge */}
        {/* <span className="px-3 py-1 text-xs font-mono text-[#52525b] border border-[#262626] rounded-full">
          {project.date}
        </span> */}
      </div>

      {/* Title */}
      <div className="px-6 pt-1">
        <h3 className="text-xl md:text-2xl font-semibold text-white group-hover:gradient-text-purple transition-all duration-300">
          {project.title}
        </h3>
        <p className="text-sm text-[#52525b] font-mono mt-1">{project.role}</p>
      </div>

      {/* Description Card */}
      <div className={cn("mx-6 mt-4 p-2 rounded-xl", colorClasses.gradient)}>
        <p className="text-sm text-[#a1a1aa] leading-relaxed line-clamp-6">
          {project.description}
        </p>
      </div>

      {/* Image Preview */}
      <div ref={imageRef} className="relative h-48 mt-4 mx-6 rounded-lg overflow-hidden bg-[#0a0a0a]">
        {project.image === "notfoundBackend" ? (
          /* NestJS Backend Placeholder */
          <div className="absolute inset-0 bg-linear-to-br from-[#0a0a0a] via-[#1a1a1a] to-[#0d0d0d] flex flex-col items-center justify-center p-4">
            {/* Grid Background */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(239,68,68,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(239,68,68,0.03)_1px,transparent_1px)] bg-size-[20px_20px]" />

            {/* NestJS Logo */}
            <div className="relative z-10 mb-3">
              <div className="w-12 h-12 rounded-xl bg-[#e0234e]/10 border border-[#e0234e]/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Image src="/project/nestjs-svgrepo-com.svg" alt="NestJS" width={24} height={24} />
              </div>
            </div>

            {/* Code Snippet */}
            <div className="relative z-10 w-full max-w-[200px] bg-[#0d0d0d] border border-[#262626] rounded-lg p-3 font-mono text-[10px]">
              <div className="flex items-center gap-1.5 mb-2 pb-1.5 border-b border-[#1a1a1a]">
                <div className="w-1.5 h-1.5 rounded-full bg-[#ff5f57]" />
                <div className="w-1.5 h-1.5 rounded-full bg-[#febc2e]" />
                <div className="w-1.5 h-1.5 rounded-full bg-[#28c840]" />
                <span className="text-[#52525b] text-[8px] ml-1">auth.controller.ts</span>
              </div>
              <div className="space-y-0.5">
                <div><span className="text-[#c586c0]">@Post</span><span className="text-[#dcdcaa]">(</span><span className="text-[#ce9178]">&apos;login&apos;</span><span className="text-[#dcdcaa]">)</span></div>
                <div><span className="text-[#569cd6]">async</span> <span className="text-[#dcdcaa]">login</span><span className="text-[#ffd700]">()</span> <span className="text-[#d4d4d4]">{"{"}</span></div>
                <div className="pl-2"><span className="text-[#c586c0]">return</span> <span className="text-[#9cdcfe]">jwt</span><span className="text-[#d4d4d4]">.</span><span className="text-[#dcdcaa]">sign</span><span className="text-[#d4d4d4]">();</span></div>
                <div><span className="text-[#d4d4d4]">{"}"}</span></div>
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2 py-1 bg-[#e0234e]/10 border border-[#e0234e]/30 rounded-full">
              <div className="w-1.5 h-1.5 bg-[#e0234e] rounded-full animate-pulse" />
              <span className="text-[8px] font-mono text-[#e0234e]">JWT</span>
            </div>
            <div className="absolute bottom-3 left-3 flex items-center gap-1.5 px-2 py-1 bg-[#10b981]/10 border border-[#10b981]/30 rounded-full">
              <span className="text-[8px] font-mono text-[#10b981]">REST API</span>
            </div>
            <div className="absolute bottom-3 right-3 flex items-center gap-1.5 px-2 py-1 bg-[#8b5cf6]/10 border border-[#8b5cf6]/30 rounded-full">
              <span className="text-[8px] font-mono text-[#8b5cf6]">TypeScript</span>
            </div>
          </div>
        ) : project.image === "cryptoSentimentBackend" ? (
          /* Crypto Sentiment Analysis Backend Placeholder */
          <div className="absolute inset-0 bg-linear-to-br from-[#0a0a0a] via-[#1a1a1a] to-[#0d0d0d] flex flex-col items-center justify-center p-4 overflow-hidden">
            {/* Animated Grid Background */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(249,115,22,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(249,115,22,0.03)_1px,transparent_1px)] bg-size-[20px_20px]" />

            {/* Floating Bitcoin/Crypto Icons */}
            <div className="absolute top-2 right-6 text-[#f7931a] opacity-20 text-2xl animate-pulse">₿</div>
            <div className="absolute bottom-8 left-4 text-[#627eea] opacity-20 text-xl" style={{ animationDelay: '0.5s' }}>Ξ</div>

            {/* NestJS + AI Logo Container */}
            <div className="relative z-10 mb-3 flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-[#e0234e]/10 border border-[#e0234e]/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Image src="/project/nestjs-svgrepo-com.svg" alt="NestJS" width={20} height={20} />
              </div>
              <div className="text-[#52525b] text-lg">+</div>
              <div className="w-10 h-10 rounded-xl bg-[#f97316]/10 border border-[#f97316]/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <svg className="w-5 h-5 text-[#f97316]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
                </svg>
              </div>
            </div>

            {/* API Code Snippet */}
            <div className="relative z-10 w-full max-w-[220px] bg-[#0d0d0d] border border-[#262626] rounded-lg p-2.5 font-mono text-[9px]">
              <div className="flex items-center gap-1.5 mb-2 pb-1.5 border-b border-[#1a1a1a]">
                <div className="w-1.5 h-1.5 rounded-full bg-[#ff5f57]" />
                <div className="w-1.5 h-1.5 rounded-full bg-[#febc2e]" />
                <div className="w-1.5 h-1.5 rounded-full bg-[#28c840]" />
                <span className="text-[#52525b] text-[7px] ml-1">ai-analysis.controller.ts</span>
              </div>
              <div className="space-y-0.5">
                <div><span className="text-[#c586c0]">@Post</span><span className="text-[#dcdcaa]">(</span><span className="text-[#ce9178]">&apos;sentiment/:id&apos;</span><span className="text-[#dcdcaa]">)</span></div>
                <div><span className="text-[#569cd6]">async</span> <span className="text-[#dcdcaa]">analyze</span><span className="text-[#ffd700]">()</span> <span className="text-[#d4d4d4]">{"{"}</span></div>
                <div className="pl-2"><span className="text-[#c586c0]">return</span> <span className="text-[#9cdcfe]">gemini</span></div>
                <div className="pl-4"><span className="text-[#d4d4d4]">.</span><span className="text-[#dcdcaa]">sentiment</span><span className="text-[#d4d4d4]">();</span></div>
                <div><span className="text-[#d4d4d4]">{"}"}</span></div>
              </div>
            </div>

            {/* Sentiment Score Visual */}
            <div className="absolute top-3 left-3 flex flex-col gap-1">
              <div className="flex items-center gap-1.5 px-2 py-1 bg-[#10b981]/10 border border-[#10b981]/30 rounded-full">
                <div className="w-1.5 h-1.5 bg-[#10b981] rounded-full animate-pulse" />
                <span className="text-[8px] font-mono text-[#10b981]">BULLISH 85%</span>
              </div>
            </div>

            {/* Trading Signal Badge */}
            <div className="absolute top-3 right-3 flex items-center gap-1.5 px-2 py-1 bg-[#f97316]/10 border border-[#f97316]/30 rounded-full">
              <svg className="w-2.5 h-2.5 text-[#f97316]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
              </svg>
              <span className="text-[8px] font-mono text-[#f97316]">BUY SIGNAL</span>
            </div>

            {/* Bottom Badges */}
            <div className="absolute bottom-3 left-3 flex items-center gap-1.5 px-2 py-1 bg-[#8b5cf6]/10 border border-[#8b5cf6]/30 rounded-full">
              <span className="text-[8px] font-mono text-[#8b5cf6]">Gemini AI</span>
            </div>
            <div className="absolute bottom-3 right-3 flex items-center gap-1.5 px-2 py-1 bg-[#06b6d4]/10 border border-[#06b6d4]/30 rounded-full">
              <span className="text-[8px] font-mono text-[#06b6d4]">RSS Feed</span>
            </div>
          </div>
        ) : (
          <>
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-linear-to-t from-[#141414] via-transparent to-transparent opacity-60" />

            {/* View Gallery Button - only show if slideImages exists */}
            {project.slideImages && project.slideImages.length > 0 && onOpenGallery && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onOpenGallery();
                }}
                className="absolute bottom-3 right-3 z-10 flex items-center gap-2 px-3 py-1.5 text-xs font-mono text-white bg-black/70 backdrop-blur-sm border border-white/20 rounded-lg hover:bg-black/90 hover:border-white/40 transition-all duration-300 cursor-pointer group/btn"
              >
                <svg
                  className="w-4 h-4 transition-transform group-hover/btn:scale-110"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>Gallery</span>
                <span className="px-1.5 py-0.5 text-[10px] bg-white/20 rounded">
                  {project.slideImages.length}
                </span>
              </button>
            )}
          </>
        )}
      </div>

      {/* Tech Stack */}
      <div className="p-6 pt-4">
        <div className="flex flex-wrap gap-2">
          {project.technologies.map((tech) => (
            <span key={tech} className="terminal-badge">
              <span className="text-[#8b5cf6]">{">"}</span>
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Action Links */}
      <div className="px-6 pb-6 space-y-3">
        {/* Primary Actions Row */}
        <div className="flex gap-3">
          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 btn-primary text-sm py-2 px-0 flex justify-center items-center min-w-[120px] h-10"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              Live Demo
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 btn-secondary text-sm py-2 px-0 flex justify-center items-center min-w-[120px] h-10"
            >
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
              </svg>
              GitHub
            </a>
          )}
        </div>

        {/* Multiple GitHub Repos Row */}
        {(project.githubUrlFrontend || project.githubUrlBackend || project.githubUrlNodePullData) && (
          <div className="flex flex-wrap gap-2">
            {project.githubUrlFrontend && (
              <a
                href={project.githubUrlFrontend}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 min-w-[90px] flex justify-center items-center gap-1.5 px-3 py-1.5 text-xs font-mono text-[#06b6d4] bg-[#06b6d4]/10 border border-[#06b6d4]/30 rounded-lg hover:bg-[#06b6d4]/20 transition-colors h-8"
                style={{ maxWidth: "200px" }}
              >
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                </svg>
                Frontend
              </a>
            )}
            {project.githubUrlBackend && (
              <a
                href={project.githubUrlBackend}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 min-w-[90px] flex justify-center items-center gap-1.5 px-3 py-1.5 text-xs font-mono text-[#10b981] bg-[#10b981]/10 border border-[#10b981]/30 rounded-lg hover:bg-[#10b981]/20 transition-colors h-8"
                style={{ maxWidth: "200px" }}
              >
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                </svg>
                Backend
              </a>
            )}
            {project.githubUrlNodePullData && (
              <a
                href={project.githubUrlNodePullData}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 min-w-[90px] flex justify-center items-center gap-1.5 px-3 py-1.5 text-xs font-mono text-[#f59e0b] bg-[#f59e0b]/10 border border-[#f59e0b]/30 rounded-lg hover:bg-[#f59e0b]/20 transition-colors h-8"
                style={{ maxWidth: "200px" }}
              >
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                </svg>
                Scraper
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
