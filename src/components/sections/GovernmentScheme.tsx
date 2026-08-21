"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { ArrowRight } from "lucide-react";

// Import approved local image assets
import stock1Img from "@/assets/Images/Five_Fold_stock_1.png";
import stock2Img from "@/assets/Images/Five_fold_stock_2.png";
import skyImg from "@/assets/Images/Five_fold_sky.png";

// Scheme Data preserving exact factual content
const SCHEMES = [
  {
    id: "surya-ghar",
    num: "01",
    category: "Residential Scheme",
    badge: "PM Surya Ghar",
    title: "PM Surya Ghar: Muft Bijli Yojana",
    description:
      "End-to-end guidance for portal application filing, approvals and compliant rooftop installation.",
    image: stock1Img,
    ctaText: "Apply for Guidance",
    ctaHref: "/contact",
  },
  {
    id: "c-and-i",
    num: "02",
    category: "Commercial & Industrial",
    badge: "Tax & Net Metering",
    title: "C&I Tax Benefits & Net Metering Support",
    description:
      "Accelerated depreciation, GST benefits, and DISCOM grid-export approvals.",
    image: stock2Img,
    ctaText: "Discuss Commercial Project",
    ctaHref: "/contact",
  },
  {
    id: "discom-liaison",
    num: "03",
    category: "Grid Interconnection",
    badge: "Odisha DISCOM Liaison",
    title: "Odisha DISCOM Liaison & Utility Approvals",
    description:
      "Statutory approvals, net metering and grid interconnection support.",
    image: skyImg,
    ctaText: "Check DISCOM Eligibility",
    ctaHref: "/government-schemes",
  },
];

export const GovernmentScheme: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isDesktop, setIsDesktop] = useState<boolean>(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number | null>(null);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Scroll-driven sticky progress calculation
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const maxIndex = isDesktop ? 1 : 2;
    if (latest < 0.4) {
      setActiveIndex(0);
    } else if (latest < 0.75) {
      setActiveIndex(1);
    } else {
      setActiveIndex(maxIndex);
    }
  });

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;
    const maxIndex = isDesktop ? 1 : 2;

    if (diff > 40 && activeIndex < maxIndex) {
      setActiveIndex((prev) => prev + 1);
    } else if (diff < -40 && activeIndex > 0) {
      setActiveIndex((prev) => prev - 1);
    }
    touchStartX.current = null;
  };

  return (
    <section
      ref={containerRef}
      className="relative bg-[#0C3046] text-white font-sans border-t border-b border-slate-800/80 md:h-[220vh] select-none"
    >
      {/* Ambient Background Glow */}
      <div className="absolute top-1/4 right-1/4 w-80 h-80 bg-[#20435F] blur-[140px] rounded-full pointer-events-none opacity-25" />

      {/* Sticky Viewport Container — Pinned strictly to 100vh / 100svh */}
      <div className="sticky top-0 h-[100svh] max-h-screen flex flex-col justify-between py-5 sm:py-8 lg:py-10 overflow-hidden">
        <Container className="relative z-10 h-full flex flex-col justify-between max-w-6xl px-4 sm:px-6 lg:px-8">
          {/* 1. EDITORIAL HEADER (Reference Style: Left Heading, Right Minimal Progress) */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 shrink-0 mb-3 sm:mb-6">
            <div className="space-y-1">
              <span className="text-xs font-sans font-semibold uppercase tracking-wider text-[#00A9D6] block">
                Government Scheme Support
              </span>
              <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight">
                PM Surya Ghar &amp; Solar Subsidy Facilitation
              </h2>
            </div>

            {/* Minimal Progress Indicator */}
            <div className="flex items-center gap-3 shrink-0 self-start sm:self-auto">
              <span className="font-mono text-xs text-slate-400 font-bold">
                0{activeIndex + 1} / 0{SCHEMES.length}
              </span>
              <div className="w-16 sm:w-24 h-1 bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#00A9D6] transition-all duration-500 ease-out"
                  style={{
                    width: `${((activeIndex + 1) / SCHEMES.length) * 100}%`,
                  }}
                />
              </div>
            </div>
          </div>

          {/* 2. WIDE CARDS SLIDER (2 Wide Cards Side-by-Side on Desktop Matching Reference) */}
          <div
            className="flex-1 my-auto flex items-center overflow-hidden py-2 sm:py-4"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <div className="w-full overflow-hidden">
              <motion.div
                className="flex gap-5 lg:gap-8"
                animate={{
                  x: isDesktop
                    ? `calc(-${activeIndex * 50}% - ${activeIndex * 16}px)`
                    : `calc(-${activeIndex * 100}% - ${activeIndex * 20}px)`,
                }}
                transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
              >
                {SCHEMES.map((scheme) => (
                  <div
                    key={scheme.id}
                    className="w-full md:w-[calc(50%-10px)] lg:w-[calc(50%-16px)] shrink-0 flex flex-col group cursor-pointer"
                  >
                    {/* Wide Image Area (Matching Reference Aspect Ratio) */}
                    <div className="relative w-full aspect-[16/9.5] rounded-2xl sm:rounded-3xl overflow-hidden bg-slate-900 border border-slate-800 group-hover:border-slate-700 transition-all duration-300">
                      <Image
                        src={scheme.image}
                        alt={scheme.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                      />
                    </div>

                    {/* Minimal Information Panel Beneath Image */}
                    <div className="pt-3 sm:pt-4 space-y-1.5">
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] sm:text-xs font-sans font-semibold text-[#00A9D6] uppercase tracking-wide">
                          {scheme.category}
                        </span>
                      </div>

                      <h3 className="font-heading text-lg sm:text-xl lg:text-2xl font-bold text-white tracking-tight leading-snug group-hover:text-[#00A9D6] transition-colors line-clamp-1">
                        {scheme.title}
                      </h3>

                      <p className="font-sans text-xs sm:text-sm text-slate-300 leading-relaxed line-clamp-2">
                        {scheme.description}
                      </p>

                      <div className="pt-1">
                        <Link
                          href={scheme.ctaHref}
                          className="inline-flex items-center gap-1.5 text-xs font-sans font-semibold text-[#00A9D6] hover:text-sky-300 transition-colors"
                        >
                          <span>{scheme.ctaText}</span>
                          <ArrowRight className="h-3.5 w-3.5" />
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>

          {/* 3. MINIMAL LEGAL DISCLAIMER FOOTER */}
          <div className="pt-3 border-t border-slate-800/80 shrink-0">
            <p className="text-[10px] sm:text-[11px] text-slate-500 font-sans leading-relaxed line-clamp-2">
              * Final scheme eligibility, subsidy disbursal amounts, and DISCOM grid interconnection approvals remain strictly governed by prevailing Central Government (MNRE) and Odisha DISCOM (TPCODL / TPNODL / TPSODL / TPWODL) guidelines.
            </p>
          </div>
        </Container>
      </div>
    </section>
  );
};
