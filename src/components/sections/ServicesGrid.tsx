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
    <section className="py-16 sm:py-24 bg-white font-sans border-b border-slate-200/80 relative">
      {/* 98% VIEWPORT CONTAINER (1% Breathing Room Each Side) */}
      <div className="w-[98%] max-w-[98vw] mx-auto px-0">
        <div
          className="relative rounded-3xl bg-[#0C3046] text-white overflow-hidden border border-slate-800 shadow-2xl p-6 sm:p-10 lg:p-12 min-h-[560px] sm:min-h-[620px] flex flex-col justify-between"
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
                  sizes="98vw"
                  className="object-cover object-center opacity-90"
                />
              </motion.div>
            </AnimatePresence>

            {/* Gradient Overlay for Readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0C3046]/95 via-[#0C3046]/50 to-[#0C3046]/20 z-[1]" />
          </div>

          {/* 2. DYNAMIC CONTENT AREA */}
          <div className="relative z-10 my-auto py-6 sm:py-8 max-w-3xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSlide.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="space-y-4 sm:space-y-6"
              >
                {/* Category Pill */}
                <div>
                  <span className="inline-block px-3.5 py-1 rounded-full bg-white/10 text-[#00A9D6] text-xs font-mono font-bold uppercase tracking-wider border border-white/15">
                    {activeSlide.number} — {activeSlide.category}
                  </span>
                </div>

                {/* Heading */}
                <h3 className="font-heading text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.1]">
                  {activeSlide.title}
                </h3>

                {/* Description */}
                <p className="font-sans text-slate-200 text-base sm:text-lg leading-relaxed max-w-2xl">
                  {activeSlide.description}
                </p>

                {/* Contextual CTA */}
                <div className="pt-2">
                  <motion.div
                    whileHover={{ scale: 1.025, y: -1 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    className="inline-block"
                  >
                    <Link
                      href={activeSlide.href}
                      className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-lg bg-[#20435F] hover:bg-[#0C3046] text-white text-xs sm:text-sm font-sans font-semibold transition-all shadow-lg group border border-sky-400/20"
                    >
                      <span>{activeSlide.ctaText}</span>
                      <ArrowRight className="h-4 w-4 text-[#00A9D6] group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </motion.div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* 3. LOWER CATEGORY SELECTION CONTROLS */}
          <div className="relative z-10 pt-6 border-t border-white/15">
            {/* Category Selector Tabs */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pb-5">
              {SOLUTIONS.map((item, idx) => {
                const Icon = item.icon;
                const isActive = idx === activeIndex;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setActiveIndex(idx)}
                    onMouseEnter={() => setActiveIndex(idx)}
                    className={`flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all text-left focus:outline-none border ${
                      isActive
                        ? "bg-[#20435F] border-[#00A9D6] text-white font-bold shadow-lg scale-[1.01]"
                        : "bg-white/5 border-white/10 text-slate-300 hover:bg-white/10 hover:text-white opacity-80 hover:opacity-100"
                    }`}
                  >
                    <Icon className={`h-4 w-4 shrink-0 ${isActive ? "text-[#00A9D6]" : "text-slate-400"}`} />
                    <span className="font-heading text-xs sm:text-sm font-bold tracking-tight">
                      {item.category}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Bottom Progress Line & Arrow Navigation */}
            <div className="flex items-center justify-between border-t border-white/10 pt-4">
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs text-[#00A9D6] font-bold">
                  0{activeIndex + 1}
                </span>
                <div className="w-24 sm:w-48 h-1 bg-white/20 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#00A9D6] transition-all duration-500 ease-out"
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
                  className="h-9 w-9 rounded-full bg-white/10 hover:bg-[#20435F] text-white flex items-center justify-center transition-colors focus:outline-none"
                >
                  <ArrowLeft className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  aria-label="Next Solution"
                  className="h-9 w-9 rounded-full bg-white/10 hover:bg-[#20435F] text-white flex items-center justify-center transition-colors focus:outline-none"
                >
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
