"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown, ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/utils";
import { MobileMenu } from "./MobileMenu";
import logoImg from "@/assets/Images/Logos/Five_Fold_White.png";

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

  // Monitor top-of-page scroll threshold for header styling
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  const isHero = pathname === "/" && !isScrolled;

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-40 font-sans border-b transition-all duration-300",
          isScrolled
            ? "bg-white/95 backdrop-blur-md border-[#E5E7EB] shadow-xs"
            : (pathname === "/"
                ? "bg-transparent border-transparent shadow-none"
                : "bg-white/95 backdrop-blur-md border-[#E5E7EB] shadow-xs")
        )}
      >
        <Container className="flex items-center justify-between py-3 sm:py-3.5 lg:py-4">
          {/* Logo (Left) */}
          <div className="flex items-center shrink-0">
            <Link href="/" className="flex items-center group">
              <Image
                src={logoImg}
                alt="Fivefold Renewable Logo"
                priority
                className={cn(
                  "h-8 sm:h-9 md:h-10 w-auto object-contain transition-all duration-200 group-hover:opacity-90",
                  isHero ? "drop-shadow-[0_1px_4px_rgba(0,0,0,0.25)]" : "brightness-0"
                )}
              />
            </Link>
          </div>

          {/* Centered Desktop Nav Links */}
          <nav
            className="hidden lg:flex items-center justify-center gap-1.5 xl:gap-3 absolute left-1/2 -translate-x-1/2"
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
                        "px-2.5 py-1 text-xs xl:text-sm font-medium transition-all duration-200 inline-flex items-center gap-1 font-sans rounded-md",
                        isHero
                          ? (isSubActive
                              ? "text-white font-semibold bg-white/15"
                              : "text-white/90 hover:text-white hover:bg-white/15 backdrop-blur-xs")
                          : (isSubActive
                              ? "text-[#173B53] font-semibold"
                              : "text-[#173B53]/90 hover:text-[#1684C7] hover:bg-black/5")
                      )}
                      style={isHero ? { textShadow: "0 1px 8px rgba(23,59,83,0.35)" } : undefined}
                    >
                      <span>{item.name}</span>
                      <ChevronDown
                        className={cn(
                          "h-3.5 w-3.5 transition-transform duration-200",
                          isSolutionsOpen && "rotate-180",
                          isHero ? "text-white/80" : "opacity-70"
                        )}
                      />
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
                    "px-2.5 py-1 text-xs xl:text-sm font-medium transition-all duration-200 font-sans rounded-md",
                    isHero
                      ? (isActive
                          ? "text-white font-semibold bg-white/15"
                          : "text-white/90 hover:text-white hover:bg-white/15 backdrop-blur-xs")
                      : (isActive
                          ? "text-[#173B53] font-semibold"
                          : "text-[#173B53]/90 hover:text-[#1684C7] hover:bg-black/5")
                  )}
                  style={isHero ? { textShadow: "0 1px 8px rgba(23,59,83,0.35)" } : undefined}
                >
                  {item.name}
                </Link>
              );
            })}
            <Link
              href="/contact"
              className={cn(
                "hidden lg:inline-flex min-[1440px]:hidden whitespace-nowrap px-2.5 py-1 text-xs xl:text-sm font-semibold transition-all duration-200 font-sans rounded-md",
                isHero
                  ? (pathname === "/contact"
                      ? "text-white bg-white/15"
                      : "text-white/90 hover:text-white hover:bg-white/15 backdrop-blur-xs")
                  : (pathname === "/contact"
                      ? "text-[#1684C7]"
                      : "text-[#173B53] hover:text-[#1684C7] hover:bg-black/5")
              )}
              style={isHero ? { textShadow: "0 1px 8px rgba(23,59,83,0.35)" } : undefined}
            >
              Contact Us
            </Link>
          </nav>

          {/* Right Action Area: CTA + Mobile Menu Button */}
          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              href="/contact"
              className={cn(
                "hidden sm:inline-flex lg:hidden min-[1440px]:inline-flex h-[36px] sm:h-[38px] px-3.5 sm:px-4 items-center justify-center rounded-lg text-xs sm:text-sm font-sans font-semibold whitespace-nowrap transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2",
                isHero
                  ? "border border-white/80 text-white hover:bg-white hover:text-[#173B53] hover:border-white shadow-xs backdrop-blur-xs focus:ring-white/50"
                  : "border border-[#173B53] text-[#173B53] hover:bg-[#173B53] hover:text-white focus:ring-[#1684C7]"
              )}
            >
              Contact Us
            </Link>

            {/* CTA Button */}
            <Link
              href="/solar-calculator"
              aria-label="Find My Solar Solution"
              className={cn(
                "h-[36px] sm:h-[38px] px-3.5 sm:px-4 rounded-lg flex items-center justify-center gap-1.5 sm:gap-2 transition-all duration-200 select-none group focus:outline-none focus:ring-2 focus:ring-offset-2",
                isHero
                  ? "bg-white hover:bg-white/90 text-[#173B53] shadow-md hover:shadow-lg focus:ring-white"
                  : "bg-[#173B53] hover:bg-[#0f2738] text-white shadow-xs hover:shadow-sm focus:ring-[#1684C7]"
              )}
            >
              <span
                className={cn(
                  "text-xs sm:text-sm font-sans font-semibold whitespace-nowrap transition-colors",
                  isHero ? "text-[#173B53]" : "text-white"
                )}
              >
                <span className="hidden sm:inline lg:hidden xl:inline">Find My Solar Solution</span>
                <span className="sm:hidden lg:inline xl:hidden">Find Solution</span>
              </span>
              <ArrowUpRight
                className={cn(
                  "h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200",
                  isHero ? "text-[#173B53] stroke-[#173B53]" : "text-white stroke-white"
                )}
                strokeWidth={2.2}
              />
            </Link>

            {/* Mobile Menu Button */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={cn(
                "lg:hidden p-2 rounded-md transition-colors focus:outline-none shrink-0",
                isHero
                  ? "text-white hover:bg-white/15"
                  : "text-[#173B53] hover:bg-[#DCE2E2]/60"
              )}
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





