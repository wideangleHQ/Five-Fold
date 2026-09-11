"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

// Approved Fourth Section panoramic engineering image asset
import bannerImg from "@/assets/Images/Fourth_Section/Banner_2.png";

const STAGES = [
  {
    id: "pre-construction",
    num: "01",
    title: "PRE-CONSTRUCTION",
    subtitle: "Feasibility, design and bankable project preparation.",
    details:
      "Site structural feasibility, 3D shadow path analysis, PVsyst yield simulations, and bankable Detailed Project Report (DPR).",
  },
  {
    id: "execution",
    num: "02",
    title: "EXECUTION",
    subtitle: "Precision procurement, installation and grid synchronisation.",
    details:
      "Tier-1 component procurement, precision civil installation, DISCOM net-metering compliance, and synchronized grid commissioning.",
  },
  {
    id: "quality",
    num: "03",
    title: "QUALITY & TRACEABILITY",
    subtitle: "Tier-1 equipment selection, testing and QA protocols.",
    details:
      "Factory flash data audits, thermal imaging EL testing, SCADA remote monitoring, and a 25-year performance warranty continuum.",
  },
];

export const EngineeringCapabilities: React.FC = () => {
  // Item 02 (EXECUTION) active by default
  const [openIndex, setOpenIndex] = useState<number | null>(1);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="min-h-[90svh] lg:h-[90svh] py-8 sm:py-10 lg:py-8 flex flex-col justify-between lg:justify-start bg-white text-[#173B53] font-sans relative overflow-hidden">
      
      {/* 1. OVERLAY TEXT & ACCORDION CONTAINER (Left Aligned, Covering 70% Width with Generous Top Padding) */}
      <div className="w-full max-w-7xl lg:max-w-[1780px] mx-auto px-3.5 sm:px-6 lg:px-8 xl:px-12 pt-2 sm:pt-4 lg:pt-8 relative z-10">
        <div className="w-full lg:w-[70%] max-w-5xl space-y-3.5 sm:space-y-5 text-left">
          
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="space-y-1 sm:space-y-1.5 text-left"
          >
            <span className="text-[11px] sm:text-xs font-mono font-bold uppercase tracking-wider text-[#1684C7] block">
              • ENGINEERING PRECISION
            </span>
            <h2 className="font-heading text-xl sm:text-3xl lg:text-4xl xl:text-5xl font-extrabold text-[#173B53] tracking-tight leading-[1.08]">
              Engineering Capability &amp; Journey
            </h2>
            <p className="font-sans text-[#526673] text-xs sm:text-sm lg:text-base leading-relaxed max-w-2xl pt-0.5">
              Every solar power plant engineered by Fivefold follows a strict three-tier engineering framework designed for 25–30 year bankability.
            </p>
          </motion.div>

          {/* Clean Accordion Stages Covering 70% Width */}
          <div className="divide-y divide-[#DCE2E2] border-t border-b border-[#DCE2E2]">
            {STAGES.map((stg, idx) => {
              const isOpen = openIndex === idx;
              return (
                <div key={stg.id} className="py-2 sm:py-3 transition-colors text-left">
                  {/* Accordion Header Row */}
                  <button
                    type="button"
                    onClick={() => toggleAccordion(idx)}
                    className="w-full flex items-center justify-between gap-3 sm:gap-4 text-left group focus:outline-none"
                    aria-expanded={isOpen}
                  >
                    <div className="flex items-center gap-2.5 sm:gap-4">
                      <span className="font-mono text-xs sm:text-sm font-bold text-[#1684C7]">
                        {stg.num}
                      </span>
                      <div className="space-y-0.5">
                        <h3 className="font-heading text-xs sm:text-base lg:text-lg font-extrabold text-[#173B53] tracking-tight group-hover:text-[#1684C7] transition-colors">
                          {stg.title}
                        </h3>
                        <p className="font-sans text-xs sm:text-sm text-[#526673] font-normal leading-relaxed hidden sm:block">
                          {stg.subtitle}
                        </p>
                      </div>
                    </div>

                    {/* Minimal Toggle Icon */}
                    <div
                      className={`h-5 w-5 sm:h-7 sm:w-7 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                        isOpen
                          ? "bg-[#173B53] text-white"
                          : "bg-[#F6F3EC] text-[#526673] group-hover:bg-[#DCE2E2]"
                      }`}
                    >
                      {isOpen ? (
                        <Minus className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                      ) : (
                        <Plus className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                      )}
                    </div>
                  </button>

                  {/* Expandable Detail */}
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.28, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="pt-1.5 pl-6 sm:pl-9 max-w-2xl">
                          <p className="font-sans text-xs sm:text-sm text-[#173B53] font-medium leading-relaxed">
                            {stg.details}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

        </div>
      </div>

      {/* 2. BASE VISUAL: Extra-large size and right-aligned for Mobile / Flip / Tablet */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
        className="w-full relative mt-4 sm:mt-6 md:mt-8 lg:mt-0 h-[400px] xs:h-[450px] sm:h-[540px] md:h-[640px] lg:h-auto lg:absolute lg:inset-x-0 lg:bottom-0 lg:flex lg:items-end lg:justify-center pointer-events-none select-none z-0 overflow-hidden"
      >
        {/* Mobile / Flip Phone / Tablet View: Extra-large right-aligned visual featuring engineer & solar installation */}
        <div className="relative w-full h-full lg:hidden flex justify-end items-end">
          <Image
            src={bannerImg}
            alt="Fivefold Engineering Precision - Rooftop Solar EPC Installation"
            fill
            priority
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 100vw"
            className="object-cover object-right-bottom scale-[1.12] sm:scale-100 origin-bottom-right select-none pointer-events-none"
          />
        </div>

        {/* Desktop & Laptop View: Uncropped 100% full-width panoramic visual */}
        <div className="hidden lg:block w-full">
          <Image
            src={bannerImg}
            alt="Fivefold Engineering Precision - Rooftop Solar EPC Installation"
            priority
            sizes="100vw"
            className="w-full h-auto max-h-[60vh] object-contain object-bottom block select-none pointer-events-none"
          />
        </div>
      </motion.div>

    </section>
  );
};
