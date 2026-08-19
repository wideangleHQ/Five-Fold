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

const SLIDES = [
  {
    id: "residential",
    number: "01",
    category: "Residential",
    icon: Home,
    href: "/solar-calculator",
    title: "Smart solar solutions for homes.",
    description:
      "Engineered rooftop solar systems designed for residential energy needs, savings and long-term performance.",
    image: stock1Img,
    ctaText: "Calculate Home Solar Requirement",
  },
  {
    id: "commercial",
    number: "02",
    category: "Commercial",
    icon: Building2,
    href: "/commercial-solar",
    title: "Efficient solar for smarter businesses.",
    description:
      "Solar systems designed around your energy requirement, available space, investment and long-term returns.",
    image: stock2Img,
    ctaText: "Plan Solar for Business",
  },
  {
    id: "industrial",
    number: "03",
    category: "Industrial",
    icon: Factory,
    href: "/industrial-solar",
    title: "Engineered solar for high-demand industry.",
    description:
      "Engineering-first solar solutions focused on system optimisation, reliability and long-term performance.",
    image: heroBgImg,
    ctaText: "Discuss Industrial Project",
  },
  {
    id: "institutional",
    number: "04",
    category: "Institutional",
    icon: Landmark,
    href: "/services",
    title: "Reliable solar for essential infrastructure.",
    description:
      "Purpose-built solar solutions for institutions seeking dependable energy performance and long-term value.",
    image: skyImg,
    ctaText: "Explore Institutional Solar",
  },
];

export const ServicesGrid: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const activeSlide = SLIDES[activeIndex];

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % SLIDES.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
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
    <section className="py-8 sm:py-12 bg-white font-sans select-none">
      {/* 98% VIEWPORT WIDTH CONTAINER (1% Breathing Room Each Side) */}
      <div className="w-[98%] max-w-[98vw] mx-auto px-0">
        <div
          className="relative rounded-2xl sm:rounded-3xl bg-[#111615] text-white overflow-hidden border border-slate-800 shadow-xl p-6 sm:p-10 lg:p-12 min-h-[540px] sm:min-h-[600px] flex flex-col justify-between"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Background Image Layer (~90% Visually Exposed) */}
          <div className="absolute inset-0 z-0 overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSlide.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.9 }}
                exit={{ opacity: 0 }}
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

            {/* Subtle Gradient Overlay for Text Readability (~90% Photo Visibility) */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#111615]/95 via-[#111615]/40 to-[#111615]/10 z-[1]" />
          </div>

          {/* 1. FIXED & CONSTANT HEADER */}
          <div className="relative z-10">
            <div className="flex items-center justify-between font-sans text-xs font-semibold uppercase tracking-wider text-slate-400">
              <div className="flex items-center gap-2 text-[#1F7A45]">
                <span className="h-2 w-2 rounded-full bg-[#1F7A45]" />
                <span>OUR OFFERINGS</span>
              </div>
              <div className="hidden sm:block text-slate-400">
                / SOLAR OFFERINGS BY PROPERTY CATEGORY
              </div>
            </div>
          </div>

          {/* 2. MINIMAL DYNAMIC SLIDE CONTENT */}
          <div className="relative z-10 my-auto py-6 sm:py-8 max-w-3xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSlide.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35, ease: "easeInOut" }}
                className="space-y-4 sm:space-y-6"
              >
                {/* Category Pill Tag */}
                <div>
                  <span className="inline-block px-3 py-1 rounded-full bg-white/10 text-emerald-400 text-xs font-sans font-medium uppercase tracking-wider border border-white/10">
                    SLIDE {activeSlide.number} — {activeSlide.category}
                  </span>
                </div>

                {/* Main Heading */}
                <h2 className="font-heading text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.1]">
                  {activeSlide.title}
                </h2>

                {/* Short Supporting Description */}
                <p className="font-sans text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl">
                  {activeSlide.description}
                </p>

                {/* Minimal Single CTA Button */}
                <div className="pt-2">
                  <Link
                    href={activeSlide.href}
                    className="inline-flex items-center gap-2.5 px-6 py-3 rounded-lg bg-[#1F7A45] hover:bg-[#155E34] text-white text-xs sm:text-sm font-sans font-semibold transition-all shadow-md group"
                  >
                    <span>{activeSlide.ctaText}</span>
                    <ArrowRight className="h-4 w-4 text-emerald-200 group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* 3. LOWER SLIDE NAVIGATION CONTROLS */}
          <div className="relative z-10 pt-6 border-t border-white/15">
            {/* Category Tab Buttons */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pb-5">
              {SLIDES.map((slide, idx) => {
                const Icon = slide.icon;
                const isActive = idx === activeIndex;
                return (
                  <button
                    key={slide.id}
                    type="button"
                    onClick={() => setActiveIndex(idx)}
                    className={`flex items-center gap-2.5 px-4 py-3 rounded-lg transition-all text-left focus:outline-none ${
                      isActive
                        ? "bg-[#1F7A45] text-white font-semibold shadow-md"
                        : "bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    <Icon className={`h-4 w-4 shrink-0 ${isActive ? "text-white" : "text-slate-400"}`} />
                    <span className="font-heading text-xs sm:text-sm font-bold">
                      {slide.category}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Bottom Progress Line & Arrow Navigation */}
            <div className="flex items-center justify-between border-t border-white/10 pt-4">
              {/* Progress Line */}
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs text-[#1F7A45] font-bold">
                  0{activeIndex + 1}
                </span>
                <div className="w-24 sm:w-48 h-1 bg-white/20 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#1F7A45] transition-all duration-500 ease-out"
                    style={{
                      width: `${((activeIndex + 1) / SLIDES.length) * 100}%`,
                    }}
                  />
                </div>
                <span className="font-mono text-xs text-slate-500">
                  0{SLIDES.length}
                </span>
              </div>

              {/* Prev / Next Buttons */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handlePrev}
                  aria-label="Previous Slide"
                  className="h-9 w-9 rounded-full bg-white/10 hover:bg-[#1F7A45] text-white flex items-center justify-center transition-colors focus:outline-none"
                >
                  <ArrowLeft className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  aria-label="Next Slide"
                  className="h-9 w-9 rounded-full bg-white/10 hover:bg-[#1F7A45] text-white flex items-center justify-center transition-colors focus:outline-none"
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

