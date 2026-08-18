"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Plus, Minus, CheckCircle2, ShieldCheck } from "lucide-react";

// Use approved local image asset for right visual panel
import engineeringImg from "@/assets/Images/hero section background.png";

const ENGINEERING_JOURNEY = [
  {
    phase: "01",
    title: "PRE-CONSTRUCTION",
    desc: "Feasibility & Bankable Design Preparation",
    steps: ["Feasibility", "Shadow Analysis", "3D Layout", "PVsyst", "DPR", "Financial Modelling", "Risk Review"],
  },
  {
    phase: "02",
    title: "EXECUTION",
    desc: "Precision Procurement & Grid Synchronisation",
    steps: ["Engineering", "Procurement", "Installation", "Commissioning", "Performance Assurance"],
  },
  {
    phase: "03",
    title: "QUALITY & TRACEABILITY",
    desc: "Tier-1 Equipment & Quality Assurance Protocols",
    steps: ["Tier-1 Components", "QA & Inspection", "Testing & Flash Data", "Documentation Pack", "Traceability"],
  },
];

export const EngineeringCapabilities: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-16 sm:py-24 bg-white text-[#111615] border-b border-slate-200/80 font-sans">
      <Container>
        {/* TWO-COLUMN EDITORIAL LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-stretch">
          
          {/* LEFT COLUMN: Section Header & Editorial Process Accordion (~50% width) */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-8">
            {/* Section Header */}
            <div className="space-y-3">
              <span className="font-sans text-xs font-bold uppercase tracking-wider text-[#1F7A45]">
                Engineering Precision
              </span>
              <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#111615] tracking-tight leading-[1.1]">
                Engineering Capability & Journey
              </h2>
              <p className="font-sans text-slate-600 text-sm sm:text-base leading-relaxed pt-1">
                Every solar power plant engineered by Fivefold follows a strict three-tier engineering framework designed for 25–30 year bankability.
              </p>
            </div>

            {/* Editorial Accordion Timeline */}
            <div className="divide-y divide-slate-200 border-t border-b border-slate-200">
              {ENGINEERING_JOURNEY.map((group, idx) => {
                const isOpen = openIndex === idx;
                return (
                  <div key={group.phase} className="py-4 sm:py-5">
                    <button
                      type="button"
                      onClick={() => toggleAccordion(idx)}
                      className="w-full flex items-center justify-between text-left focus:outline-none group"
                      aria-expanded={isOpen}
                    >
                      <div className="flex items-center gap-4">
                        <span
                          className={`font-mono text-sm font-bold transition-colors ${
                            isOpen ? "text-[#1F7A45]" : "text-slate-400 group-hover:text-slate-700"
                          }`}
                        >
                          ({group.phase})
                        </span>
                        <div>
                          <h3
                            className={`font-heading text-base sm:text-lg font-bold transition-colors ${
                              isOpen ? "text-[#1F7A45]" : "text-[#111615] group-hover:text-[#1F7A45]"
                            }`}
                          >
                            {group.title}
                          </h3>
                          <p className="font-sans text-xs text-slate-500 font-normal">
                            {group.desc}
                          </p>
                        </div>
                      </div>

                      {/* Minimal +/- Toggle Control */}
                      <div
                        className={`h-7 w-7 rounded-full flex items-center justify-center transition-colors shrink-0 ${
                          isOpen ? "bg-[#1F7A45] text-white" : "bg-slate-100 text-slate-500 group-hover:bg-slate-200"
                        }`}
                      >
                        {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                      </div>
                    </button>

                    {/* Smooth Expanded Details */}
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.35, ease: "easeInOut" }}
                          className="overflow-hidden"
                        >
                          <div className="pt-4 pb-2 pl-9 sm:pl-10 space-y-3">
                            <div className="flex flex-wrap items-center gap-2">
                              {group.steps.map((step) => (
                                <span
                                  key={step}
                                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#F7F8F5] border border-slate-200 text-xs font-sans font-medium text-slate-700"
                                >
                                  <span className="h-1.5 w-1.5 rounded-full bg-[#1F7A45]" />
                                  {step}
                                </span>
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>

            {/* Quality & Bankability Trust Callout */}
            <div className="pt-2 flex items-center gap-3 text-xs font-sans font-semibold text-slate-700">
              <div className="h-8 w-8 rounded-lg bg-[#1F7A45]/10 flex items-center justify-center text-[#1F7A45]">
                <ShieldCheck className="h-4 w-4" />
              </div>
              <span>25–30 Year Bankable Engineering Framework</span>
            </div>
          </div>

          {/* RIGHT COLUMN: Large Visual Image Panel (~50% width) */}
          <div className="lg:col-span-6 flex">
            <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg border border-slate-200 w-full min-h-[420px] lg:min-h-[540px] flex flex-col justify-end p-6 bg-slate-900 group">
              <Image
                src={engineeringImg}
                alt="Fivefold Engineering Precision Solar Installation"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
              />
              {/* Subtle Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />

              {/* Minimal On-Image Metadata Overlay */}
              <div className="relative z-10 p-5 rounded-2xl bg-[#0B3D2E]/90 backdrop-blur-md border border-emerald-800/80 text-white space-y-1">
                <div className="flex items-center gap-2 text-emerald-400 font-sans text-xs font-bold uppercase tracking-wider">
                  <CheckCircle2 className="h-4 w-4" />
                  <span>Quality Assurance Standard</span>
                </div>
                <h4 className="font-heading text-lg font-bold text-white">
                  Tier-1 Equipment & Traceable EPC Execution
                </h4>
                <p className="font-sans text-xs text-slate-200">
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
