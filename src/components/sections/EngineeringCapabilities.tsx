"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Plus, Minus, Shield, CheckCircle2 } from "lucide-react";

// Use approved local image asset for right visual panel
import engineeringImg from "@/assets/Images/hero section background.png";

const STAGES = [
  {
    id: "pre-construction",
    num: "(01)",
    title: "PRE-CONSTRUCTION",
    subtitle: "Feasibility, design and bankable project preparation.",
    tags: [
      "Feasibility Analysis",
      "3D Shadow Path Modelling",
      "PVsyst Yield Simulation",
      "Bankable DPR",
    ],
  },
  {
    id: "execution",
    num: "(02)",
    title: "EXECUTION",
    subtitle: "Precision procurement, installation and grid synchronisation.",
    tags: [
      "Engineering",
      "Procurement",
      "Installation",
      "Grid Synchronization",
    ],
  },
  {
    id: "quality",
    num: "(03)",
    title: "QUALITY & TRACEABILITY",
    subtitle: "Tier-1 equipment selection, testing and QA protocols.",
    tags: [
      "Tier-1 Component Selection",
      "Factory Flash Data Audit",
      "Thermal Imaging",
      "25-Year Support Continuum",
    ],
  },
];

export const EngineeringCapabilities: React.FC = () => {
  // Item 02 (EXECUTION) active by default as shown in reference design
  const [openIndex, setOpenIndex] = useState<number | null>(1);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-16 sm:py-24 bg-white text-[#111615] font-sans border-b border-slate-200/80">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          
          {/* LEFT COLUMN: Header & Interactive Accordion (~50% width) */}
          <div className="lg:col-span-6 space-y-8">
            
            {/* Section Header */}
            <div data-reveal="text" className="space-y-3">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#20435F] block">
                • ENGINEERING PRECISION
              </span>
              <h2 className="font-heading text-3xl sm:text-5xl font-extrabold text-[#111615] tracking-tight leading-[1.1]">
                Engineering Capability &amp; Journey
              </h2>
              <p className="font-sans text-slate-600 text-sm sm:text-base leading-relaxed pt-1 max-w-xl">
                Every solar power plant engineered by Fivefold follows a strict three-tier engineering framework designed for 25–30 year bankability.
              </p>
            </div>

            {/* Accordion Stage List */}
            <div className="divide-y divide-slate-200 border-t border-b border-slate-200">
              {STAGES.map((stg, idx) => {
                const isOpen = openIndex === idx;
                return (
                  <div key={stg.id} className="py-5 sm:py-6 transition-colors">
                    
                    {/* Clickable Header Row */}
                    <button
                      type="button"
                      onClick={() => toggleAccordion(idx)}
                      className="w-full flex items-start justify-between gap-4 text-left group focus:outline-none"
                    >
                      <div className="flex items-start gap-3 sm:gap-4">
                        <span className="font-mono text-xs sm:text-sm font-bold text-slate-400 pt-0.5 shrink-0">
                          {stg.num}
                        </span>
                        <div className="space-y-1">
                          <h3 className="font-heading text-base sm:text-lg font-extrabold text-[#111615] tracking-tight group-hover:text-[#20435F] transition-colors">
                            {stg.title}
                          </h3>
                          <p className="font-sans text-xs sm:text-sm text-slate-500 font-normal leading-relaxed">
                            {stg.subtitle}
                          </p>
                        </div>
                      </div>

                      {/* Plus/Minus Toggle Circle */}
                      <div
                        className={`h-7 w-7 rounded-full flex items-center justify-center shrink-0 transition-colors mt-0.5 ${
                          isOpen
                            ? "bg-[#20435F] text-white"
                            : "bg-slate-100 text-slate-600 group-hover:bg-slate-200"
                        }`}
                      >
                        {isOpen ? (
                          <Minus className="h-4 w-4" />
                        ) : (
                          <Plus className="h-4 w-4" />
                        )}
                      </div>
                    </button>

                    {/* Expandable Sub-Pills Container */}
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                          className="overflow-hidden"
                        >
                          <div className="pt-4 pl-7 sm:pl-9 flex flex-wrap gap-2">
                            {stg.tags.map((tag) => (
                              <span
                                key={tag}
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#F7F8F5] border border-slate-200/80 text-xs font-sans font-medium text-slate-700"
                              >
                                <span className="h-1.5 w-1.5 rounded-full bg-[#20435F]" />
                                {tag}
                              </span>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                  </div>
                );
              })}
            </div>

            {/* Bottom Framework Badge */}
            <div className="pt-2 flex items-center gap-3">
              <div className="h-9 w-9 rounded-xl bg-[#F7F8F5] border border-slate-200/80 flex items-center justify-center shrink-0">
                <Shield className="h-4 w-4 text-[#20435F]" />
              </div>
              <span className="font-sans text-xs sm:text-sm font-semibold text-slate-700">
                25–30 Year Bankable Engineering Framework
              </span>
            </div>

          </div>

          {/* RIGHT COLUMN: Solar Roof Visual Card (~50% width) */}
          <div data-reveal="image-container" className="lg:col-span-6 flex">
            <div className="relative rounded-3xl overflow-hidden shadow-xl border border-slate-200/80 w-full min-h-[460px] lg:min-h-[540px] flex flex-col justify-end p-5 sm:p-7 bg-slate-900 group">
              <Image
                src={engineeringImg}
                alt="Fivefold Tier-1 Equipment & Traceable EPC Execution"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-center group-hover:scale-[1.02] transition-transform duration-700 opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent pointer-events-none" />

              {/* Bottom Dark Overlay Card Badge */}
              <div
                data-reveal="card"
                className="relative z-10 p-6 rounded-2xl bg-[#0C3046]/95 backdrop-blur-md border border-sky-900/50 text-white space-y-2 shadow-2xl"
              >
                <div className="flex items-center gap-2 text-[#00A9D6] font-sans text-xs font-bold uppercase tracking-wider">
                  <CheckCircle2 className="h-4 w-4 text-[#00A9D6] shrink-0" />
                  <span>QUALITY ASSURANCE STANDARD</span>
                </div>
                <h3 className="font-heading text-lg sm:text-xl font-extrabold text-white tracking-tight">
                  Tier-1 Equipment &amp; Traceable EPC Execution
                </h3>
                <p className="font-sans text-xs sm:text-sm text-slate-300 leading-relaxed pt-0.5">
                  Shadow analysis, 3D modelling, PVsyst yield simulations and DISCOM grid compliance.
                </p>
              </div>

            </div>
          </div>

        </div>
      </Container>
    </section>
  );
};

