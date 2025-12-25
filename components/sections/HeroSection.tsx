"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.3 });

      // Terminal window animation
      tl.fromTo(
        terminalRef.current,
        { opacity: 0, scale: 0.95, y: 20 },
        { opacity: 1, scale: 1, y: 0, duration: 0.5, ease: "power3.out" }
      );

      // Title animation with text reveal
      tl.fromTo(
        titleRef.current,
        { opacity: 0, y: 40, clipPath: "inset(100% 0 0 0)" },
        { opacity: 1, y: 0, clipPath: "inset(0% 0 0 0)", duration: 0.7, ease: "power3.out" },
        "-=0.2"
      );

      // Subtitle animation
      tl.fromTo(
        subtitleRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
        "-=0.3"
      );

      // Buttons stagger animation
      tl.fromTo(
        buttonsRef.current?.children || [],
        { opacity: 0, y: 20, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, duration: 0.4, stagger: 0.1, ease: "back.out(1.7)" },
        "-=0.2"
      );

      // Blinking cursor animation
      gsap.to(cursorRef.current, {
        opacity: 0,
        duration: 0.5,
        repeat: -1,
        yoyo: true,
        ease: "steps(1)",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center px-6 pt-20 overflow-hidden"
    >
      {/* Animated background lines */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="absolute h-px bg-gradient-to-r from-transparent via-[#8b5cf6]/20 to-transparent"
            style={{
              top: `${20 + i * 15}%`,
              left: 0,
              right: 0,
              animation: `pulse-glow ${3 + i * 0.5}s ease-in-out infinite`,
              animationDelay: `${i * 0.3}s`,
            }}
          />
        ))}
      </div>

      <div className="max-w-5xl mx-auto text-center relative z-10">
        {/* Terminal-style header */}
        <div
          ref={terminalRef}
          className="inline-block mb-8 opacity-0"
        >
          <div className="flex items-center gap-3 px-4 py-2 bg-[#1a1a1a] rounded-t-lg border border-b-0 border-[#333]">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
              <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
              <div className="w-3 h-3 rounded-full bg-[#28c840]" />
            </div>
            <span className="font-mono text-xs text-[#666] ml-2">suthep@portfolio ~ </span>
          </div>
          <div className="px-5 py-4 bg-[#0d0d0d] rounded-b-lg border border-t-0 border-[#333] font-mono text-sm">
            <div className="flex items-center gap-2 text-[#52525b]">
              <span className="text-[#10b981]">➜</span>
              <span className="text-[#06b6d4]">~</span>
              <span className="text-white">cat</span>
              <span className="text-[#f472b6]">greeting.txt</span>
            </div>
            <div className="mt-2 text-[#a1a1aa]">
              <span className="text-[#10b981]">{"//"}</span>{" "}
              <span className="typing-text">Hi, I&apos;m Suthep Jantawee</span>
              <span ref={cursorRef} className="inline-block w-2 h-4 bg-[#8b5cf6] ml-1 align-middle" />
            </div>
          </div>
        </div>

        {/* Main Title */}
        <h1
          ref={titleRef}
          className="text-hero mb-6 opacity-0"
        >
          <span className="block text-white mb-2">
            <span className="text-[#8b5cf6]">{"<"}</span>
            Creative
            <span className="text-[#8b5cf6]">{">"}</span>
          </span>
          <span className="block relative">
            <span className="gradient-text-purple">Full Stack Developer</span>
            <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-[#ec4899] via-[#8b5cf6] to-[#06b6d4] rounded-full" />
          </span>
        </h1>

        {/* Subtitle with experience badge */}
        <p
          ref={subtitleRef}
          className="text-lg md:text-xl text-[#a1a1aa] max-w-2xl mx-auto mb-10 opacity-0"
        >
          <span className="inline-flex items-center gap-2 px-3 py-1 bg-[#10b981]/10 border border-[#10b981]/30 rounded-full text-[#10b981] text-sm font-mono mb-4">
            <span className="w-2 h-2 bg-[#10b981] rounded-full animate-pulse" />
            3+ years experience
          </span>
          <br />
        </p>

        {/* CTA Buttons */}
        <div ref={buttonsRef} className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a href="#work" className="btn-primary group relative overflow-hidden">
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
            <div className="absolute inset-0 bg-gradient-to-r from-[#ec4899] to-[#8b5cf6] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </a>
          <a href="#contact" className="btn-secondary group">
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span>Contact Me</span>
            </span>
          </a>
          <a
            href="/resume.pdf"
            target="_blank"
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

        {/* Scroll indicator */}
        <div className="flex justify-center mt-14">
          <div className="flex flex-col items-center gap-2 text-[#8b949e] animate-bounce cursor-pointer"
            onClick={() => {
              window.scrollTo({
                top: document.getElementById('about')?.offsetTop,
                behavior: 'smooth'
              })
            }}
          >
            <span className="text-xs font-mono">Scroll</span>
            <svg
              width="30"
              height="30"
              viewBox="0 0 20 20"
              fill="none"
              className="text-[#00ff9f]"
            >
              <path
                d="M10 4V16M10 16L4 10M10 16L16 10"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Decorative Code Blocks */}
      <div className="absolute top-1/4 left-8 font-mono text-[11px] text-[#262626] hidden xl:block transform -rotate-6">
        <div className="p-3 bg-[#0d0d0d]/50 rounded-lg border border-[#1a1a1a]">
          <div><span className="text-[#8b5cf6]">const</span> <span className="text-[#ec4899]">developer</span> = {"{"}</div>
          <div className="pl-4"><span className="text-[#a1a1aa]">name:</span> <span className="text-[#10b981]">&quot;Suthep&quot;</span>,</div>
          <div className="pl-4"><span className="text-[#a1a1aa]">role:</span> <span className="text-[#10b981]">&quot;Full Stack&quot;</span>,</div>
          <div className="pl-4"><span className="text-[#a1a1aa]">available:</span> <span className="text-[#06b6d4]">true</span></div>
          <div>{"}"};</div>
        </div>
      </div>

      <div className="absolute bottom-1/4 right-8 font-mono text-[11px] text-[#262626] hidden xl:block transform rotate-3">
        <div className="p-3 bg-[#0d0d0d]/50 rounded-lg border border-[#1a1a1a]">
          <div><span className="text-[#ec4899]">async function</span> <span className="text-[#06b6d4]">buildAmazingThings</span>() {"{"}</div>
          <div className="pl-4"><span className="text-[#8b5cf6]">await</span> learn(<span className="text-[#10b981]">&quot;new tech&quot;</span>);</div>
          <div className="pl-4"><span className="text-[#8b5cf6]">return</span> <span className="text-[#10b981]">&quot;excellence&quot;</span>;</div>
          <div>{"}"}</div>
        </div>
      </div>

      {/* Floating tech icons */}
      <div className="absolute top-20 right-20 w-12 h-12 rounded-xl bg-[#141414] border border-[#262626] flex items-center justify-center text-[#06b6d4] animate-float hidden lg:flex">
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
          <path d="M14.23 12.004a2.236 2.236 0 0 1-2.235 2.236 2.236 2.236 0 0 1-2.236-2.236 2.236 2.236 0 0 1 2.235-2.236 2.236 2.236 0 0 1 2.236 2.236zm2.648-10.69c-1.346 0-3.107.96-4.888 2.622-1.78-1.653-3.542-2.602-4.887-2.602-.41 0-.783.093-1.106.278-1.375.793-1.683 3.264-.973 6.365C1.98 8.917 0 10.42 0 12.004c0 1.59 1.99 3.097 5.043 4.03-.704 3.113-.39 5.588.988 6.38.32.187.69.275 1.102.275 1.345 0 3.107-.96 4.888-2.624 1.78 1.654 3.542 2.603 4.887 2.603.41 0 .783-.09 1.106-.275 1.374-.792 1.683-3.263.973-6.365C22.02 15.096 24 13.59 24 12.004c0-1.59-1.99-3.097-5.043-4.032.704-3.11.39-5.587-.988-6.38-.318-.184-.688-.277-1.092-.278zm-.005 1.09v.006c.225 0 .406.044.558.127.666.382.955 1.835.73 3.704-.054.46-.142.945-.25 1.44-.96-.236-2.006-.417-3.107-.534-.66-.905-1.345-1.727-2.035-2.447 1.592-1.48 3.087-2.292 4.105-2.295zm-9.77.02c1.012 0 2.514.808 4.11 2.28-.686.72-1.37 1.537-2.02 2.442-1.107.117-2.154.298-3.113.538-.112-.49-.195-.964-.254-1.42-.23-1.868.054-3.32.714-3.707.19-.09.4-.127.563-.132zm4.882 3.05c.455.468.91.992 1.36 1.564-.44-.02-.89-.034-1.345-.034-.46 0-.915.01-1.36.034.44-.572.895-1.096 1.345-1.565zM12 8.1c.74 0 1.477.034 2.202.093.406.582.802 1.203 1.183 1.86.372.64.71 1.29 1.018 1.946-.308.655-.646 1.31-1.013 1.95-.38.66-.773 1.288-1.18 1.87-.728.063-1.466.098-2.21.098-.74 0-1.477-.035-2.202-.093-.406-.582-.802-1.204-1.183-1.86-.372-.64-.71-1.29-1.018-1.946.303-.657.646-1.313 1.013-1.954.38-.66.773-1.286 1.18-1.868.728-.064 1.466-.098 2.21-.098zm-3.635.254c-.24.377-.48.763-.704 1.16-.225.39-.435.782-.635 1.174-.265-.656-.49-1.31-.676-1.947.64-.15 1.315-.283 2.015-.386zm7.26 0c.695.103 1.365.23 2.006.387-.18.632-.405 1.282-.66 1.933-.2-.39-.41-.783-.64-1.174-.225-.392-.465-.774-.705-1.146zm3.063.675c.484.15.944.317 1.375.498 1.732.74 2.852 1.708 2.852 2.476-.005.768-1.125 1.74-2.857 2.475-.42.18-.88.342-1.355.493-.28-.958-.646-1.956-1.1-2.98.45-1.017.81-2.01 1.085-2.964zm-13.395.004c.278.96.645 1.957 1.1 2.98-.45 1.017-.812 2.01-1.086 2.964-.484-.15-.944-.318-1.37-.5-1.732-.737-2.852-1.706-2.852-2.474 0-.768 1.12-1.742 2.852-2.476.42-.18.88-.342 1.356-.494zm11.678 4.28c.265.657.49 1.312.676 1.948-.64.157-1.316.29-2.016.39.24-.375.48-.762.705-1.158.225-.39.435-.788.636-1.18zm-9.945.02c.2.392.41.783.64 1.175.23.39.465.772.705 1.143-.695-.102-1.365-.23-2.006-.386.18-.63.406-1.282.66-1.933zM17.92 16.32c.112.493.2.968.254 1.423.23 1.868-.054 3.32-.714 3.708-.147.09-.338.128-.563.128-1.012 0-2.514-.807-4.11-2.28.686-.72 1.37-1.536 2.02-2.44 1.107-.118 2.154-.3 3.113-.54zm-11.83.01c.96.234 2.006.415 3.107.532.66.905 1.345 1.727 2.035 2.446-1.595 1.483-3.092 2.295-4.11 2.295-.22-.005-.406-.05-.553-.132-.666-.38-.955-1.834-.73-3.703.054-.46.142-.944.25-1.438zm4.56.64c.44.02.89.034 1.345.034.46 0 .915-.01 1.36-.034-.44.572-.895 1.095-1.345 1.565-.455-.47-.91-.993-1.36-1.565z" />
        </svg>
      </div>
    </section>
  );
}
