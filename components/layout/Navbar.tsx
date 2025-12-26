"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { cn } from "@/lib/utils";
import { Terminal, Github, Linkedin, Mail, Phone, Menu, X, Home, User, Code2, Briefcase, FolderOpen, Send } from "lucide-react";

const navItems = [
  { id: "home", label: "Home", icon: Home },
  { id: "about", label: "About", icon: User },
  { id: "skills", label: "Skills", icon: Code2 },
  { id: "experience", label: "Experience", icon: Briefcase },
  { id: "work", label: "Projects", icon: FolderOpen },
  { id: "contact", label: "Contact", icon: Send },
];

const personalInfo = {
  github: "https://github.com/unikonkon",
  linkedin: "https://www.linkedin.com/in/suthep-jantawee-76a8612a4/",
  email: "sutthep.j1@gmail.com",
  phone: "+66 92 469 4196",
};

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const lastScrollY = useRef(0);
  const [isVisible, setIsVisible] = useState(true);
  const [activeSection, setActiveSection] = useState("home");

  // GSAP animation for mobile menu
  const animateMobileMenu = useCallback((open: boolean) => {
    if (!mobileMenuRef.current) return;

    if (open) {
      gsap.fromTo(
        mobileMenuRef.current,
        {
          opacity: 0,
          y: -20,
          clipPath: "inset(0 0 100% 0)"
        },
        {
          opacity: 1,
          y: 0,
          clipPath: "inset(0 0 0% 0)",
          duration: 0.4,
          ease: "power3.out"
        }
      );
      // Stagger animate menu items
      gsap.fromTo(
        mobileMenuRef.current.querySelectorAll(".menu-item"),
        { opacity: 0, x: -20 },
        {
          opacity: 1,
          x: 0,
          duration: 0.3,
          stagger: 0.05,
          ease: "power2.out",
          delay: 0.1
        }
      );
    } else {
      gsap.to(mobileMenuRef.current, {
        opacity: 0,
        y: -10,
        clipPath: "inset(0 0 100% 0)",
        duration: 0.25,
        ease: "power2.in"
      });
    }
  }, []);

  // Click outside handler
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isMobileMenuOpen &&
        mobileMenuRef.current &&
        menuButtonRef.current &&
        !mobileMenuRef.current.contains(event.target as Node) &&
        !menuButtonRef.current.contains(event.target as Node)
      ) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMobileMenuOpen]);

  // Animate menu when state changes
  useEffect(() => {
    animateMobileMenu(isMobileMenuOpen);
  }, [isMobileMenuOpen, animateMobileMenu]);

  useEffect(() => {

    // Scroll handler
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      setIsScrolled(currentScrollY > 50);

      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        setIsVisible(false);
        if (isMobileMenuOpen) setIsMobileMenuOpen(false);
      } else {
        setIsVisible(true);
      }

      lastScrollY.current = currentScrollY;

      // Update active section based on scroll position
      const sections = navItems.map(item => item.id);
      for (const section of [...sections].reverse()) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMobileMenuOpen]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav
      ref={navRef}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled ? "glass py-2" : "py-1 sm:py-5",
        // isVisible ? "translate-y-0" : "-translate-y-full"
      )}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <a href="#home" className="flex items-center gap-3 group">
          <div className="relative flex items-center gap-2">
            <span className="font-mono text-lg font-bold">
              <span className="text-[#8b5cf6]">{"<"}</span>
              <span className="text-white group-hover:text-[#ec4899] transition-colors">SJ</span>
              <span className="text-[#8b5cf6]">{" />"}</span>
            </span>
          </div>
        </a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-1">
          {navItems.map((item, index) => {
            const isActive = activeSection === item.id;
            const IconComponent = item.icon;

            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={cn(
                  "relative px-4 py-2 text-sm font-medium transition-colors group flex items-center gap-2",
                  isActive ? "text-white" : "text-[#a1a1aa] hover:text-white"
                )}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <IconComponent className={cn(
                  "w-4 h-4 transition-colors",
                  isActive ? "text-[#ec4899]" : "text-[#52525b] group-hover:text-[#8b5cf6]"
                )} />
                <span className="relative z-10">{item.label}</span>
                <span
                  className={cn(
                    "absolute inset-0 rounded-lg bg-white/5 transition-opacity",
                    isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                  )}
                />
                <span
                  className={cn(
                    "absolute bottom-1 left-4 right-4 h-px bg-linear-to-r from-[#ec4899] to-[#8b5cf6] transition-transform origin-left",
                    isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                  )}
                />
              </a>
            );
          })}
        </div>

        {/* Desktop Social Links + Window Controls */}
        <div className="hidden md:flex items-center gap-4">
          {/* Social Links */}
          <div className="flex items-center gap-2 pr-4">
            <a
              href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-[#52525b] hover:text-white hover:bg-white/5 rounded-lg transition-all"
              aria-label="GitHub"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-[#52525b] hover:text-[#0077b5] hover:bg-[#0077b5]/10 rounded-lg transition-all"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          ref={menuButtonRef}
          onClick={toggleMobileMenu}
          className="md:hidden p-2 text-[#a1a1aa] hover:text-white transition-colors relative"
          aria-label="Toggle menu"
        >
          <div className="relative w-6 h-6">
            <Menu
              className={cn(
                "w-6 h-6 absolute inset-0 transition-all duration-300",
                isMobileMenuOpen ? "opacity-0 rotate-90 scale-0" : "opacity-100 rotate-0 scale-100"
              )}
            />
            <X
              className={cn(
                "w-6 h-6 absolute inset-0 transition-all duration-300",
                isMobileMenuOpen ? "opacity-100 rotate-0 scale-100" : "opacity-0 -rotate-90 scale-0"
              )}
            />
          </div>
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        ref={mobileMenuRef}
        className={cn(
          "md:hidden absolute top-full left-0 right-0 glass border-t border-[#262626] overflow-hidden",
          isMobileMenuOpen ? "pointer-events-auto" : "pointer-events-none opacity-0"
        )}
      >
        <div className="px-6 py-4 flex flex-col gap-2">
          {/* Navigation Links */}
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            const IconComponent = item.icon;

            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={() => setIsMobileMenuOpen(false)}
                className={cn(
                  "menu-item px-4 py-3 rounded-lg transition-colors flex items-center gap-3",
                  isActive
                    ? "text-white bg-white/5"
                    : "text-[#a1a1aa] hover:text-white hover:bg-white/5"
                )}
              >
                <IconComponent className={cn(
                  "w-5 h-5",
                  isActive ? "text-[#ec4899]" : "text-[#52525b]"
                )} />
                {item.label}
              </a>
            );
          })}

          {/* Divider */}
          <div className="menu-item my-2 h-px bg-[#262626]" />

          {/* Contact Info */}
          <div className="menu-item px-4 py-2 flex flex-col gap-3">
            <span className="text-xs font-mono text-[#52525b] uppercase tracking-wider">Contact</span>
            <a
              href={`mailto:${personalInfo.email}`}
              className="flex items-center gap-3 text-[#a1a1aa] hover:text-[#ec4899] transition-colors"
            >
              <Mail className="w-4 h-4" />
              <span className="text-sm font-mono">{personalInfo.email}</span>
            </a>
            <a
              href={`tel:${personalInfo.phone.replace(/\s/g, "")}`}
              className="flex items-center gap-3 text-[#a1a1aa] hover:text-[#10b981] transition-colors"
            >
              <Phone className="w-4 h-4" />
              <span className="text-sm font-mono">{personalInfo.phone}</span>
            </a>
          </div>

          {/* Social Links */}
          <div className="menu-item px-4 py-2 flex items-center gap-3">
            <a
              href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg bg-[#141414] border border-[#262626] text-[#a1a1aa] hover:text-white hover:border-[#333] transition-all"
            >
              <Github className="w-5 h-5" />
              <span className="text-sm font-mono">GitHub</span>
            </a>
            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg bg-[#141414] border border-[#262626] text-[#a1a1aa] hover:text-[#0077b5] hover:border-[#0077b5]/50 transition-all"
            >
              <Linkedin className="w-5 h-5" />
              <span className="text-sm font-mono">LinkedIn</span>
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
