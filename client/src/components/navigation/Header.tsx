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
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-40 font-sans border-b transition-all duration-300",
          isScrolled
            ? "bg-white/95 backdrop-blur-md border-[#E5E7EB] shadow-xs"
            : "bg-transparent border-transparent shadow-none"
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
                className="h-8 sm:h-9 md:h-10 w-auto object-contain transition-all duration-200 group-hover:opacity-90 brightness-0"
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

          {/* Right Action Area: CTA + Mobile Menu Button */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* CTA Button */}
            <Link
              href="/solar-calculator"
              aria-label="Find My Solar Solution"
              className="h-[36px] sm:h-[38px] px-3.5 sm:px-4 bg-[#173B53] hover:bg-[#0f2738] text-white rounded-lg flex items-center justify-center gap-1.5 sm:gap-2 transition-colors duration-200 shadow-xs hover:shadow-sm group focus:outline-none focus:ring-2 focus:ring-[#1684C7] focus:ring-offset-2 select-none"
            >
              <span className="text-xs sm:text-sm font-sans font-semibold whitespace-nowrap text-white">
                <span className="hidden sm:inline">Find My Solar Solution</span>
                <span className="sm:hidden">Find Solution</span>
              </span>
              <ArrowUpRight
                className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-white stroke-white shrink-0 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200"
                strokeWidth={2.2}
              />
            </Link>

            {/* Mobile Menu Button */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-md transition-colors focus:outline-none text-[#173B53] hover:bg-[#DCE2E2]/60 shrink-0"
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





