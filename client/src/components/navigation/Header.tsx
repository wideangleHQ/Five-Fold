"use client";

import React, { useState, useEffect, useLayoutEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown, ArrowUpRight } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/utils";
import { MobileMenu } from "./MobileMenu";
import logoImg from "@/assets/Images/Logos/Five_Fold_White.png";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const NAV_ITEMS = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Engineering", href: "/engineering" },
  {
    name: "Services",
    href: "/services",
    submenu: [
      { name: "Residential Solar", href: "/residential-solar" },
      { name: "Commercial Solar", href: "/commercial-solar" },
      { name: "Industrial Solar", href: "/industrial-solar" },
    ],
  },
  { name: "Projects", href: "/#projects" },
  { name: "SolarCare", href: "/solarcare" },
  { name: "Schemes", href: "/government-schemes" },
];

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSolutionsOpen, setIsSolutionsOpen] = useState(false);
  const pathname = usePathname();

  const headerBgRef = useRef<HTMLDivElement>(null);
  const headerLogoRef = useRef<HTMLDivElement>(null);
  const headerNavRef = useRef<HTMLDivElement>(null);
  const hamburgerRef = useRef<HTMLButtonElement>(null);
  const ctaButtonRef = useRef<HTMLAnchorElement>(null);
  const ctaTextRef = useRef<HTMLSpanElement>(null);
  const ctaIconRef = useRef<HTMLSpanElement>(null);

  // Monitor top-of-page scroll threshold for header styling
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Synchronized Header + CTA Direction-Aware Motion System:
  // - Scroll Down: Header smoothly collapses, CTA morphs into floating top-right circle (white arrow).
  // - Scroll Up: Header immediately reveals with solid white (#FFFFFF) background, circular CTA smoothly travels back and expands to full rectangle.
  // - Reversible, seamless, no duplicate DOM elements, zero jumps, pure GPU-accelerated motion.
  useLayoutEffect(() => {
    if (typeof window === "undefined") return;

    const isReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const btn = ctaButtonRef.current;
    const txt = ctaTextRef.current;
    const icon = ctaIconRef.current;
    const logo = headerLogoRef.current;
    const nav = headerNavRef.current;
    const bg = headerBgRef.current;
    const burger = hamburgerRef.current;
    if (!btn || !txt || !icon || !bg) return;

    if (isReducedMotion) return;

    const mm = gsap.matchMedia();

    // Desktop View (>= 1024px)
    mm.add("(min-width: 1024px)", () => {
      const ctx = gsap.context(() => {
        // Set initial background opacity
        if (window.scrollY > 20) {
          gsap.set(bg, { opacity: 1 });
        } else {
          gsap.set(bg, { opacity: 0 });
        }

        const collapseTl = gsap.timeline({
          paused: true,
          defaults: { ease: "power2.inOut", duration: 0.35 },
        });

        // 1. Header background, logo & navigation slide up & fade out on scroll down
        collapseTl.to(bg, { yPercent: -100, opacity: 0, duration: 0.3 }, 0);
        if (logo) collapseTl.to(logo, { y: -16, opacity: 0, duration: 0.25 }, 0);
        if (nav) collapseTl.to(nav, { y: -16, opacity: 0, duration: 0.25 }, 0);

        // 2. CTA text fades out and collapses width
        collapseTl.to(
          txt,
          {
            opacity: 0,
            width: 0,
            paddingRight: 0,
            marginRight: 0,
            scale: 0.85,
            duration: 0.25,
          },
          0
        );

        // 3. CTA button morphs from rectangle to 38px circle with shadow
        collapseTl.to(
          btn,
          {
            width: 38,
            borderRadius: 19,
            paddingLeft: 0,
            paddingRight: 0,
            boxShadow: "0 10px 25px -4px rgba(23, 59, 83, 0.4)",
            duration: 0.35,
          },
          0
        );

        // 4. Arrow stays centered and solid white
        collapseTl.to(icon, { scale: 1.05, duration: 0.35 }, 0);

        // Scroll direction trigger with debounce threshold
        let lastY = window.scrollY;
        let isAtTop = window.scrollY <= 20;

        ScrollTrigger.create({
          start: "top top",
          end: "max",
          onUpdate: (self) => {
            const currentY = self.scroll();
            const diff = currentY - lastY;

            if (currentY <= 20) {
              // At hero top: restore header & fade background to transparent
              collapseTl.reverse();
              if (!isAtTop) {
                gsap.to(bg, { opacity: 0, duration: 0.25, overwrite: "auto" });
                isAtTop = true;
              }
            } else {
              // Scrolled down page: ensure solid white background
              if (isAtTop) {
                gsap.to(bg, { opacity: 1, duration: 0.25, overwrite: "auto" });
                isAtTop = false;
              }

              if (diff > 6 && self.direction === 1) {
                // Scrolling DOWN: collapse header, CTA morphs into floating circle
                collapseTl.play();
              } else if (diff < -6 && self.direction === -1) {
                // Scrolling UP: reveal solid white (#FFFFFF) header, CTA expands back to rectangle
                collapseTl.reverse();
              }
            }
            lastY = currentY;
          },
        });
      });

      return () => ctx.revert();
    });

    // Mobile & Tablet View (< 1024px)
    mm.add("(max-width: 1023px)", () => {
      const ctx = gsap.context(() => {
        if (window.scrollY > 20) {
          gsap.set(bg, { opacity: 1 });
        } else {
          gsap.set(bg, { opacity: 0 });
        }

        const collapseTl = gsap.timeline({
          paused: true,
          defaults: { ease: "power2.inOut", duration: 0.35 },
        });

        // 1. Header background, logo & navigation fade/slide up
        collapseTl.to(bg, { yPercent: -100, opacity: 0, duration: 0.3 }, 0);
        if (logo) collapseTl.to(logo, { y: -16, opacity: 0, duration: 0.25 }, 0);
        if (nav) collapseTl.to(nav, { y: -16, opacity: 0, duration: 0.25 }, 0);
        if (burger) {
          collapseTl.to(burger, { y: -16, opacity: 0, duration: 0.25 }, 0);
        }

        // 2. CTA text fades out and collapses width
        collapseTl.to(
          txt,
          {
            opacity: 0,
            width: 0,
            paddingRight: 0,
            marginRight: 0,
            scale: 0.85,
            duration: 0.25,
          },
          0
        );

        // 3. CTA button morphs from rectangle to 36px circle and shifts into corner
        collapseTl.to(
          btn,
          {
            width: 36,
            borderRadius: 18,
            paddingLeft: 0,
            paddingRight: 0,
            x: burger ? 44 : 0, // Shifts into top-right corner as hamburger slides up
            boxShadow: "0 10px 25px -4px rgba(23, 59, 83, 0.4)",
            duration: 0.35,
          },
          0
        );

        // 4. Arrow stays centered and solid white
        collapseTl.to(icon, { scale: 1.05, duration: 0.35 }, 0);

        let lastY = window.scrollY;
        let isAtTop = window.scrollY <= 20;

        ScrollTrigger.create({
          start: "top top",
          end: "max",
          onUpdate: (self) => {
            const currentY = self.scroll();
            const diff = currentY - lastY;

            if (currentY <= 20) {
              collapseTl.reverse();
              if (!isAtTop) {
                gsap.to(bg, { opacity: 0, duration: 0.25, overwrite: "auto" });
                isAtTop = true;
              }
            } else {
              if (isAtTop) {
                gsap.to(bg, { opacity: 1, duration: 0.25, overwrite: "auto" });
                isAtTop = false;
              }

              if (diff > 6 && self.direction === 1) {
                collapseTl.play();
              } else if (diff < -6 && self.direction === -1) {
                collapseTl.reverse();
              }
            }
            lastY = currentY;
          },
        });
      });

      return () => ctx.revert();
    });

    return () => mm.revert();
  }, []);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-40 font-sans pointer-events-none"
        )}
      >
        {/* Background Layer with Solid White (#FFFFFF) Backdrop */}
        <div
          ref={headerBgRef}
          className="absolute inset-0 pointer-events-auto bg-[#FFFFFF] shadow-xs border-b border-[#E5E7EB]"
          style={{ willChange: "transform, opacity" }}
        />

        <Container className="relative z-10 flex items-center justify-between py-3 sm:py-3.5 lg:py-4">
          {/* Logo (Left) */}
          <div ref={headerLogoRef} className="flex items-center shrink-0 pointer-events-auto">
            <Link href="/" className="flex items-center group">
              <Image
                src={logoImg}
                alt="Fivefold Renewable Logo"
                priority
                className="h-8 sm:h-9 md:h-10 w-auto object-contain transition-all duration-200 group-hover:opacity-90 brightness-0"
              />
            </Link>
          </div>

          {/* Centered Desktop Nav Links */}
          <nav
            ref={headerNavRef}
            className="hidden lg:flex items-center justify-center gap-1.5 xl:gap-3 absolute left-1/2 -translate-x-1/2 pointer-events-auto"
          >
            {NAV_ITEMS.map((item) => {
              if (item.submenu) {
                const isSubActive = item.submenu.some((sub) => pathname === sub.href);
                return (
                  <div
                    key={item.name}
                    className="relative"
                    onMouseEnter={() => setIsSolutionsOpen(true)}
                    onMouseLeave={() => setIsSolutionsOpen(false)}
                  >
                    <Link
                      href={item.href}
                      className={cn(
                        "px-2.5 py-1 text-xs xl:text-sm font-medium transition-colors inline-flex items-center gap-1 font-sans rounded-md",
                        isSubActive
                          ? "text-[#173B53] font-semibold"
                          : "text-[#173B53]/90 hover:text-[#1684C7] hover:bg-black/5"
                      )}
                    >
                      <span>{item.name}</span>
                      <ChevronDown className="h-3.5 w-3.5 opacity-70" />
                    </Link>

                    {isSolutionsOpen && (
                      <div className="absolute top-full left-0 mt-1 w-52 bg-white rounded-xl shadow-lg border border-[#E5E7EB] py-2 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                        {item.submenu.map((sub) => (
                          <Link
                            key={sub.href}
                            href={sub.href}
                            className={cn(
                              "block px-4 py-2 text-xs xl:text-sm font-medium transition-colors font-sans",
                              pathname === sub.href
                                ? "text-[#173B53] font-semibold bg-[#F6F3EC]"
                                : "text-[#526673] hover:text-[#1684C7] hover:bg-slate-50"
                            )}
                          >
                            {sub.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }

              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "px-2.5 py-1 text-xs xl:text-sm font-medium transition-colors font-sans rounded-md",
                    isActive
                      ? "text-[#173B53] font-semibold"
                      : "text-[#173B53]/90 hover:text-[#1684C7] hover:bg-black/5"
                  )}
                >
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Area: Morphing CTA + Mobile Menu Button */}
          <div className="flex items-center gap-2 sm:gap-3 pointer-events-auto">
            {/* Morphing CTA Slot */}
            <div className="flex items-center justify-end w-[130px] sm:w-[175px] lg:w-[198px] h-[36px] sm:h-[38px] shrink-0">
              <Link
                ref={ctaButtonRef}
                href="/solar-calculator"
                aria-label="Find My Solar Solution"
                className="h-[36px] sm:h-[38px] bg-[#173B53] hover:bg-[#0f2738] text-white flex items-center justify-center overflow-hidden transition-colors duration-200 shadow-sm hover:shadow-md group focus:outline-none focus:ring-2 focus:ring-[#1684C7] focus:ring-offset-2 select-none pointer-events-auto"
                style={{
                  width: "100%",
                  borderRadius: "8px",
                  paddingLeft: "14px",
                  paddingRight: "12px",
                }}
              >
                <span
                  ref={ctaTextRef}
                  className="text-xs font-sans font-semibold whitespace-nowrap overflow-hidden pr-1 select-none text-white"
                  style={{ display: "inline-block", willChange: "transform, opacity, width" }}
                >
                  <span className="hidden sm:inline">Find My Solar Solution</span>
                  <span className="sm:hidden">Find Solution</span>
                </span>
                <span
                  ref={ctaIconRef}
                  className="flex items-center justify-center shrink-0 text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200"
                  style={{ willChange: "transform" }}
                >
                  <ArrowUpRight className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-white stroke-white" strokeWidth={2.2} />
                </span>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              ref={hamburgerRef}
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-md transition-colors focus:outline-none text-[#173B53] hover:bg-[#DCE2E2]/60 shrink-0 pointer-events-auto"
              aria-label="Toggle Navigation Menu"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </Container>
      </header>

      {/* Mobile Menu Overlay */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        navItems={NAV_ITEMS}
        currentPath={pathname || "/"}
      />
    </>
  );
};





