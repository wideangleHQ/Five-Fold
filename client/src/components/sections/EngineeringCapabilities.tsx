"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Plus, Minus } from "lucide-react";

// Approved Fourth Section panoramic engineering image asset
import bannerImg from "@/assets/Images/Fourth_Section/Banner_2.png";

const STAGES = [
  {
    id: "pre-construction",
    num: "01",
    title: "PRE-CONSTRUCTION",
    subtitle: "Assess the site, model the system and prepare the project for execution.",
    capabilities: [
      "Feasibility Reports & Shadow Analysis",
      "3D Layout & Capacity Estimations",
      "PVsyst Yield Simulations",
      "Bankable DPR Preparation",
      "Financial Modelling",
      "Constructibility & Risk Review",
    ],
  },
  {
    id: "execution",
    num: "02",
    title: "EXECUTION",
    subtitle: "Turn approved engineering into a controlled, precise and compliant installation.",
    capabilities: [
      "Detailed Execution Planning",
      "Structural Engineering",
      "Detailed Engineering & Drawings",
      "Permit & Approval Support",
      "Procurement",
      "Installation & Commissioning",
      "Net Metering Support",
      "Performance Assurance",
    ],
  },
  {
    id: "quality",
    num: "03",
    title: "QUALITY & TRACEABILITY",
    subtitle: "Quality-controlled components, testing and documentation from procurement to commissioning.",
    capabilities: [
      "Tier-1 Components",
      "Strong Procurement Networks with Direct Manufacturers & Suppliers",
      "Pre-Defined Execution SOPs",
      "Third-Party Quality Assurance",
      "Compliance & Testing Processes",
      "Documentation & Traceability",
    ],
  },
];

export const EngineeringCapabilities: React.FC = () => {
  // Item 02 (EXECUTION) active by default
  const [openIndex, setOpenIndex] = useState<number | null>(1);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="mt-10 sm:mt-12 lg:mt-14 text-[#173B53] font-sans">
      <div className="space-y-3.5 sm:space-y-5 text-left">

          {/* Subsection Header */}
          <div
            data-reveal="group"
            className="space-y-1 sm:space-y-1.5 text-left"
          >
            <span className="text-[11px] sm:text-xs font-mono font-bold uppercase tracking-wider text-[#1684C7] block">
              • ENGINEERING PRECISION
            </span>
            <h3
              data-reveal="heading"
              className="font-heading text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-extrabold text-[#173B53] tracking-tight leading-[1.08]"
            >
              Engineering That Drives Performance.
            </h3>
            <p
              data-reveal="paragraph"
              className="font-sans text-[#526673] text-xs sm:text-sm lg:text-base leading-relaxed max-w-2xl pt-0.5"
            >
              We engineer every solar project around generation, reliability, constructibility and long-term performance.
            </p>
          </div>

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
                        <h4 className="font-heading text-xs sm:text-base lg:text-lg font-extrabold text-[#173B53] tracking-tight group-hover:text-[#1684C7] transition-colors">
                          {stg.title}
                        </h4>
                        <p className="font-sans text-xs sm:text-sm text-[#526673] font-normal leading-relaxed">
                          {stg.subtitle}
                        </p>
                      </div>
                    </div>

                    {/* Minimal Toggle Icon */}
                    <div
                      className={`h-5 w-5 sm:h-7 sm:w-7 rounded-full flex items-center justify-center shrink-0 transition-colors ${isOpen
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
                  <div
                    style={{
                      display: "grid",
                      gridTemplateRows: isOpen ? "1fr" : "0fr",
                      transition: "grid-template-rows 280ms ease-in-out",
                    }}
                  >
                    <div style={{ overflow: "hidden" }}>
                      <div className="pt-2 pb-1 pl-6 sm:pl-9 max-w-2xl">
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1.5 text-xs sm:text-sm text-[#173B53] font-medium">
                          {stg.capabilities.map((cap, cIdx) => (
                            <li key={cIdx} className="flex items-center gap-2">
                              <span className="h-1.5 w-1.5 rounded-full bg-[#1684C7] shrink-0" />
                              <span>{cap}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

      </div>

      {/* Banner visual — in normal flow, aligned to the section's container */}
      <div
        data-reveal="image-container"
        className="w-full relative mt-6 sm:mt-8 lg:mt-10 rounded-[20px] overflow-hidden pointer-events-none select-none"
      >
        {/* Mobile / tablet: cropped, right-aligned visual */}
        <div className="relative w-full h-[320px] sm:h-[420px] md:h-[520px] lg:hidden">
          <Image
            src={bannerImg}
            alt="Fivefold Engineering Precision - Rooftop Solar EPC Installation"
            fill
            sizes="100vw"
            className="object-cover object-right-bottom"
          />
        </div>

        {/* Desktop: uncropped panoramic visual */}
        <div className="hidden lg:block w-full">
          <Image
            src={bannerImg}
            alt="Fivefold Engineering Precision - Rooftop Solar EPC Installation"
            sizes="(min-width: 1780px) 1780px, 100vw"
            className="w-full h-auto max-h-[60vh] object-cover object-bottom block"
          />
        </div>
      </div>
    </div>
  );
};
