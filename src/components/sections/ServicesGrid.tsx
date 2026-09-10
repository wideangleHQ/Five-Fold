"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  ArrowLeft,
  Home,
  Building2,
  Factory,
  Landmark,
} from "lucide-react";

// Import approved local image assets
import stock1Img from "@/assets/Images/Five_Fold_stock_1.png";
import stock2Img from "@/assets/Images/Five_fold_stock_2.png";
import heroBgImg from "@/assets/Images/hero section background.png";
import skyImg from "@/assets/Images/Five_fold_sky.png";

const SOLUTIONS = [
  {
    id: "residential",
    number: "01",
    category: "RESIDENTIAL",
    icon: Home,
    href: "/smart-solar-calculator",
    title: "Smart solar solutions for homes.",
    description:
      "Engineered rooftop solar systems designed for residential energy needs, savings, PM Surya Ghar subsidies, and 25-year bankable performance.",
    image: stock1Img,
    ctaText: "Calculate My Home Solar",
  },
  {
    id: "commercial",
    number: "02",
    category: "COMMERCIAL",
    icon: Building2,
    href: "/contact",
    title: "Efficient solar for smarter businesses.",
    description:
      "Turn unused commercial rooftops into high-yield energy generating assets with 40% Accelerated Depreciation tax benefits and low OPEX.",
    image: stock2Img,
    ctaText: "Plan My Business Solar",
  },
  {
    id: "industrial",
    number: "03",
    category: "INDUSTRIAL",
    icon: Factory,
    href: "/contact",
    title: "Engineered solar for high-demand industry.",
    description:
      "Megawatt-scale industrial solar plants engineered for factories, manufacturing facilities, and warehouses with SCADA monitoring.",
    image: heroBgImg,
    ctaText: "Discuss My Industrial Project",
  },
  {
    id: "institutional",
    number: "04",
    category: "INSTITUTIONAL",
    icon: Landmark,
    href: "/contact",
    title: "Reliable solar for essential infrastructure.",
    description:
      "Purpose-built solar systems for schools, hospitals, universities, and government campuses seeking dependable long-term clean power.",
    image: skyImg,
    ctaText: "Discuss My Requirement",
  },
];

export const ServicesGrid: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const activeSlide = SOLUTIONS[activeIndex];

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % SOLUTIONS.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + SOLUTIONS.length) % SOLUTIONS.length);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;
    if (diff > 50) {
      handleNext();
    } else if (diff < -50) {
      handlePrev();
    }
    touchStartX.current = null;
  };

  return (
    <section className="min-h-[100svh] py-4 sm:py-6 lg:py-4 lg:min-h-[100svh] flex flex-col justify-center bg-white font-sans relative">
      {/* EQUAL SIDE PADDING ON MOBILE (px-4 sm:px-6 matching above sections) & 98% ON DESKTOP/LAPTOP */}
      <div className="w-full max-w-7xl lg:max-w-[1780px] lg:w-[98%] mx-auto px-4 sm:px-6 lg:px-0 h-full flex flex-col justify-center flex-1">
        <div
          className="relative rounded-3xl bg-[#173B53] text-white overflow-hidden border border-[#173B53]/80 p-5 sm:p-8 lg:p-10 xl:p-12 min-h-[calc(100svh-2rem)] sm:min-h-[calc(100svh-3rem)] lg:min-h-[calc(100svh-3.5rem)] lg:max-h-[90vh] flex flex-col justify-between flex-1 shadow-none"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Background Image Layer */}
          <div className="absolute inset-0 z-0 overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSlide.id}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 0.9, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                className="absolute inset-0"
              >
                <Image
                  src={activeSlide.image}
                  alt={activeSlide.title}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 98vw"
                  className="object-cover object-center opacity-90"
                />
              </motion.div>
            </AnimatePresence>

            {/* Gradient Overlay for Readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#173B53]/95 via-[#173B53]/60 to-[#173B53]/30 z-[1]" />
          </div>

          {/* 2. DYNAMIC CONTENT AREA (LEFT ALIGNED WITH PROMINENT TYPOGRAPHY) */}
          <div className="relative z-10 my-auto py-3 sm:py-6 max-w-3xl text-left">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSlide.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="space-y-3.5 sm:space-y-5 text-left"
              >
                {/* Category label */}
                <div className="text-left">
                  <span className="font-mono text-xs sm:text-sm font-bold uppercase tracking-wider text-[#1684C7] inline-block">
                    {activeSlide.number} / {activeSlide.category}
                  </span>
                </div>

                {/* Heading (Increased size, left-aligned) */}
                <h3 className="font-heading text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-extrabold text-white tracking-tight leading-[1.08] text-left">
                  {activeSlide.title}
                </h3>

                {/* Description (Increased size, left-aligned) */}
                <p className="font-sans text-slate-200 text-sm sm:text-base lg:text-lg xl:text-xl leading-relaxed max-w-2xl text-left">
                  {activeSlide.description}
                </p>

                {/* Contextual CTA (Left-aligned) */}
                <div className="pt-2 sm:pt-3 text-left">
                  <motion.div
                    whileHover={{ scale: 1.025, y: -1 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    className="inline-block"
                  >
                    <Link
                      href={activeSlide.href}
                      className="inline-flex items-center gap-2.5 px-6 sm:px-7 py-3 sm:py-3.5 rounded-lg bg-white/10 hover:bg-white/20 backdrop-blur-md text-white text-xs sm:text-sm md:text-base font-sans font-semibold transition-all group border border-white/20"
                    >
                      <span>{activeSlide.ctaText}</span>
                      <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 text-[#1684C7] group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </motion.div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* 3. LOWER CATEGORY SELECTION CONTROLS */}
          <div className="relative z-10 pt-3 sm:pt-6 border-t border-white/15">
            {/* Category Selector Tabs */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 pb-3 sm:pb-5">
              {SOLUTIONS.map((item, idx) => {
                const Icon = item.icon;
                const isActive = idx === activeIndex;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setActiveIndex(idx)}
                    onMouseEnter={() => setActiveIndex(idx)}
                    className={`flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 sm:py-3 rounded-xl transition-all text-left focus:outline-none border ${
                      isActive
                        ? "bg-white/15 border-[#1684C7] text-white font-bold scale-[1.01]"
                        : "bg-white/5 border-white/10 text-slate-300 hover:bg-white/10 hover:text-white opacity-80 hover:opacity-100"
                    }`}
                  >
                    <Icon className={`h-4 w-4 shrink-0 ${isActive ? "text-[#1684C7]" : "text-slate-400"}`} />
                    <span className="font-heading text-xs sm:text-sm font-bold tracking-tight">
                      {item.category}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Bottom Progress Line & Arrow Navigation */}
            <div className="flex items-center justify-between border-t border-white/10 pt-2.5 sm:pt-4">
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs text-[#1684C7] font-bold">
                  0{activeIndex + 1}
                </span>
                <div className="w-20 sm:w-48 h-1 bg-white/20 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#1684C7] transition-all duration-500 ease-out"
                    style={{
                      width: `${((activeIndex + 1) / SOLUTIONS.length) * 100}%`,
                    }}
                  />
                </div>
                <span className="font-mono text-xs text-slate-400">
                  0{SOLUTIONS.length}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handlePrev}
                  aria-label="Previous Solution"
                  className="h-7 w-7 sm:h-9 sm:w-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors focus:outline-none border border-white/10"
                >
                  <ArrowLeft className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  aria-label="Next Solution"
                  className="h-7 w-7 sm:h-9 sm:w-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors focus:outline-none border border-white/10"
                >
                  <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
