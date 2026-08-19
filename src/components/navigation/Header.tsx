"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { MobileMenu } from "./MobileMenu";
import { SchemeModal } from "@/components/schemes/SchemeModal";

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
  { name: "Projects", href: "/projects" },
  { name: "SolarCare", href: "/solarcare" },
  { name: "Schemes", href: "/government-schemes" },
];

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSolutionsOpen, setIsSolutionsOpen] = useState(false);
  const [isSchemeModalOpen, setIsSchemeModalOpen] = useState(false);
  const pathname = usePathname();
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Scrolled styling state
      if (currentScrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Always show at the very top of page or if mobile menu is open
      if (currentScrollY <= 20 || isMobileMenuOpen) {
        setIsHeaderVisible(true);
        lastScrollY.current = currentScrollY;
        return;
      }

      // Threshold to prevent micro-jitter (8px)
      const diff = currentScrollY - lastScrollY.current;

      if (diff > 8) {
        // Scrolling DOWN -> Hide header
        setIsHeaderVisible(false);
        lastScrollY.current = currentScrollY;
      } else if (diff < -8) {
        // Scrolling UP -> Reveal header
        setIsHeaderVisible(true);
        lastScrollY.current = currentScrollY;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMobileMenuOpen]);

  const isLightBackground = isScrolled || pathname !== "/";

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-40 transition-transform duration-300 ease-in-out font-sans motion-reduce:transition-none",
          isHeaderVisible ? "translate-y-0" : "-translate-y-full",
          isLightBackground
            ? "bg-[#F7F8F5]/95 backdrop-blur-md shadow-xs border-b border-slate-200/80 py-3 text-[#111615]"
            : "bg-transparent py-5 text-white"
        )}
      >
        <Container className="flex items-center justify-between">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#1F7A45] font-heading text-lg font-bold text-white shadow-xs group-hover:bg-[#155E34] transition-colors">
              F
            </div>
            <div className="flex flex-col">
              <span
                className={cn(
                  "font-heading text-base sm:text-lg font-extrabold tracking-tight leading-none",
                  isLightBackground ? "text-[#111615]" : "text-white"
                )}
              >
                FIVEFOLD
              </span>
              <span
                className={cn(
                  "font-sans text-[9px] tracking-widest uppercase font-semibold mt-0.5",
                  isLightBackground ? "text-[#1F7A45]" : "text-emerald-400"
                )}
              >
                RENEWABLE
              </span>
            </div>
          </Link>

          {/* Desktop Navigation (Inter Font, Colour-Only Active & Hover) */}
          <nav className="hidden lg:flex items-center gap-2 xl:gap-3">
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
                        "px-2 py-1 text-xs xl:text-sm font-medium transition-colors inline-flex items-center gap-1 font-sans",
                        isSubActive
                          ? "text-[#1F7A45] font-semibold"
                          : isLightBackground
                          ? "text-[#111615] hover:text-[#1F7A45]"
                          : "text-white hover:text-emerald-400"
                      )}
                    >
                      <span>{item.name}</span>
                      <ChevronDown className="h-3.5 w-3.5 opacity-70" />
                    </Link>

                    {/* Submenu Dropdown */}
                    {isSolutionsOpen && (
                      <div className="absolute top-full left-0 mt-1 w-52 bg-white rounded-xl shadow-lg border border-slate-200 py-2 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                        {item.submenu.map((sub) => (
                          <Link
                            key={sub.href}
                            href={sub.href}
                            className={cn(
                              "block px-4 py-2 text-xs xl:text-sm font-medium transition-colors font-sans",
                              pathname === sub.href
                                ? "text-[#1F7A45] font-semibold bg-slate-50"
                                : "text-slate-700 hover:text-[#1F7A45] hover:bg-slate-50"
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
                    "px-2 py-1 text-xs xl:text-sm font-medium transition-colors font-sans",
                    isActive
                      ? "text-[#1F7A45] font-semibold"
                      : isLightBackground
                      ? "text-[#111615] hover:text-[#1F7A45]"
                      : "text-white hover:text-emerald-400"
                  )}
                >
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Right CTA Action Area */}
          <div className="hidden lg:flex items-center gap-3">
            <button
              onClick={() => setIsSchemeModalOpen(true)}
              className={cn(
                "px-3 py-1.5 text-xs font-semibold rounded-lg border transition-all duration-200 font-sans",
                isLightBackground
                  ? "border-slate-300 bg-white text-[#111615] hover:bg-[#1F7A45] hover:border-[#1F7A45] hover:text-white"
                  : "border-white/40 bg-white/5 text-white hover:bg-[#1F7A45] hover:border-[#1F7A45] hover:text-white"
              )}
            >
              Check Schemes
            </button>
            <Button
              href="/contact"
              variant="primary"
              size="sm"
              className="bg-[#1F7A45] hover:bg-[#155E34] text-white py-2 px-4 text-xs font-semibold rounded-lg transition-all duration-200 ease-in-out border-0"
            >
              Get a Free Consultation
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={cn(
              "lg:hidden p-2 rounded-md transition-colors focus:outline-none",
              isLightBackground
                ? "text-[#111615] hover:bg-slate-100"
                : "text-white hover:bg-white/10"
            )}
            aria-label="Toggle Navigation Menu"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </Container>
      </header>

      {/* Mobile Menu Overlay */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        navItems={NAV_ITEMS}
        currentPath={pathname || "/"}
      />

      {/* Government Scheme Discovery Modal */}
      <SchemeModal
        isOpen={isSchemeModalOpen}
        onClose={() => setIsSchemeModalOpen(false)}
      />
    </>
  );
};

