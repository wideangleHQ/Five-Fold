"use client";

import React, { useState } from "react";
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
  CheckCircle2,
  ChevronRight,
  ShieldCheck,
} from "lucide-react";

// Use approved local image asset for background
import sectionBgImg from "@/assets/Images/hero section background.png";

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
    points: [
      "Rooftop Solar",
      "Site Assessment",
      "System Design",
      "Government Scheme Assistance",
      "Net Metering",
      "Commissioning",
      "Long-Term Technical Support",
    ],
    ctaText: "Calculate My Home Solar Requirement",
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
    points: [
      "Offices",
      "Retail Outlets",
      "Hotels",
      "Hospitals",
      "Educational Institutions",
      "Commercial Buildings",
    ],
    flow: [
      "Energy Requirement",
      "Available Space",
      "System Design",
      "Investment",
      "Generation",
      "Long-Term Returns",
    ],
    ctaText: "Plan Solar for My Business",
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
    points: [
      "Factories",
      "Manufacturing Facilities",
      "Warehouses",
      "Large Industrial Facilities",
    ],
    techFocus: [
      "System Optimisation",
      "Generation Performance",
      "Structural Requirements",
      "Electrical Engineering",
      "Reliability",
      "Long-Term Performance",
    ],
    ctaText: "Discuss My Industrial Project",
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
    points: [
      "Schools",
      "Hospitals",
      "Educational Institutions",
      "Public Infrastructure",
    ],
    techFocus: [
      "Engineering",
      "Reliability",
      "Performance",
      "Long-Term Support",
    ],
    ctaText: "Explore Institutional Solar",
  },
];

export const ServicesGrid: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeSlide = SLIDES[activeIndex];

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % SLIDES.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
  };

  return (
    <section className="py-8 sm:py-12 bg-white font-sans">
      {/* STRETCHED SECTION CONTAINER WITH INTENTIONAL WHITE GUTTERS */}
      <div className="max-w-[1536px] mx-auto px-3 sm:px-6 lg:px-8 xl:px-12">
        <div className="relative rounded-2xl sm:rounded-[2.5rem] lg:rounded-[3rem] bg-[#0B3D2E] text-white overflow-hidden shadow-xl border border-emerald-900/60 p-6 sm:p-10 lg:p-14 min-h-[620px] flex flex-col justify-between">
          
          {/* Background Image Overlay */}
          <div className="absolute inset-0 z-0">
            <Image
              src={sectionBgImg}
              alt="Fivefold Renewable Solar Energy Installation"
              fill
              sizes="(max-width: 1536px) 100vw, 1536px"
              className="object-cover object-center transition-all duration-700 opacity-30"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B3D2E] via-[#0B3D2E]/85 to-[#0B3D2E]/90 z-0" />
          </div>

          {/* 1. FIXED & CONSTANT HEADER (NEVER ANIMATES OR MOVES) */}
          <div className="relative z-10">
            <div className="flex items-center justify-between font-sans text-xs font-semibold uppercase tracking-wider mb-6 sm:mb-8 text-slate-300">
              <div className="flex items-center gap-2 text-emerald-400">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>OUR OFFERINGS</span>
              </div>
              <div className="hidden sm:block text-slate-300">
                / SOLAR OFFERINGS BY PROPERTY CATEGORY
              </div>
            </div>
          </div>

          {/* 2. DYNAMIC SLIDE CONTENT (TRANSITIONS TOGETHER AS ONE SLIDE) */}
          <div className="relative z-10 my-auto py-2 sm:py-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSlide.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.45, ease: "easeInOut" }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center"
              >
                {/* Left Column: Heading, Subtitle & Single CTA */}
                <div className="lg:col-span-7 space-y-4 sm:space-y-6">
                  <div className="space-y-3">
                    <span className="inline-block px-3 py-1 rounded-full bg-white/10 text-emerald-400 text-xs font-sans font-bold uppercase tracking-wider border border-white/15">
                      SLIDE {activeSlide.number} — {activeSlide.category}
                    </span>
                    <h2 className="font-heading text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.08]">
                      {activeSlide.title}
                    </h2>
                    <p className="font-sans text-slate-200 text-sm sm:text-base md:text-lg max-w-2xl leading-relaxed pt-1">
                      {activeSlide.description}
                    </p>
                  </div>

                  {/* Single CTA Button */}
                  <div className="pt-2">
                    <Link
                      href={activeSlide.href}
                      className="inline-flex items-center gap-3 px-6 py-3 rounded-lg bg-[#1F7A45] hover:bg-[#165c33] text-white text-xs sm:text-sm font-sans font-semibold transition-all shadow-md group"
                    >
                      <span>{activeSlide.ctaText}</span>
                      <ArrowRight className="h-4 w-4 text-emerald-300 group-hover:translate-x-0.5 transition-transform" />
                    </Link>
                  </div>
                </div>

                {/* Right Column: Category Specific Details & Highlights */}
                <div className="lg:col-span-5 space-y-4">
                  {/* Commercial Visual Solution Flow */}
                  {activeSlide.flow && (
                    <div className="p-5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 space-y-3">
                      <span className="font-heading text-xs font-bold uppercase tracking-wider text-emerald-400 block">
                        Commercial Solution Flow
                      </span>
                      <div className="flex flex-wrap items-center gap-2 text-xs font-sans text-slate-200">
                        {activeSlide.flow.map((step, idx) => (
                          <React.Fragment key={step}>
                            <span className="px-2.5 py-1 rounded-md bg-white/10 font-medium">
                              {step}
                            </span>
                            {idx < activeSlide.flow!.length - 1 && (
                              <ChevronRight className="h-3 w-3 text-emerald-400 shrink-0" />
                            )}
                          </React.Fragment>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Supporting Points / Categories */}
                  <div className="p-5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 space-y-3">
                    <span className="font-heading text-xs font-bold uppercase tracking-wider text-emerald-400 block">
                      Key Highlights & Scope
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-sans text-slate-200">
                      {activeSlide.points.map((point) => (
                        <div key={point} className="flex items-center gap-2">
                          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                          <span>{point}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Technical Focus (If Applicable) */}
                  {activeSlide.techFocus && (
                    <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between text-xs text-slate-300">
                      <span className="font-medium text-emerald-400">Engineering Focus:</span>
                      <span>{activeSlide.techFocus.slice(0, 3).join(" • ")}</span>
                    </div>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* 3. LOWER CATEGORY SLIDE NAVIGATION & CONTROLS */}
          <div className="relative z-10 pt-6 sm:pt-8 border-t border-white/15">
            {/* Category Tab Row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pb-6">
              {SLIDES.map((slide, idx) => {
                const Icon = slide.icon;
                const isActive = idx === activeIndex;
                return (
                  <button
                    key={slide.id}
                    type="button"
                    onClick={() => setActiveIndex(idx)}
                    className={`flex items-center gap-3 p-3 rounded-xl transition-all text-left focus:outline-none ${
                      isActive
                        ? "bg-[#1F7A45] text-white shadow-sm"
                        : "bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    <Icon className={`h-4 w-4 shrink-0 ${isActive ? "text-white" : "text-emerald-400"}`} />
                    <span className="font-heading text-xs sm:text-sm font-bold">
                      {slide.category}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Bottom Progress Bar & Arrows */}
            <div className="flex items-center justify-between border-t border-white/10 pt-4">
              {/* Slide Number Indicators */}
              <div className="flex items-center gap-4">
                {SLIDES.map((slide, idx) => (
                  <button
                    key={slide.id}
                    type="button"
                    onClick={() => setActiveIndex(idx)}
                    className="flex items-center gap-2 font-sans text-xs font-bold transition-colors focus:outline-none"
                  >
                    <span className={idx === activeIndex ? "text-emerald-400 font-bold" : "text-slate-400"}>
                      {slide.number}
                    </span>
                    <div
                      className={`h-1 rounded-full transition-all duration-300 ${
                        idx === activeIndex
                          ? "w-8 sm:w-12 bg-emerald-400"
                          : "w-3 sm:w-6 bg-white/20 hover:bg-white/40"
                      }`}
                    />
                  </button>
                ))}
              </div>

              {/* Prev / Next Arrows */}
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
