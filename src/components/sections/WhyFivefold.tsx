"use client";

import React from "react";
import { Container } from "@/components/ui/Container";

const WHY_POINTS = [
  {
    title: "Engineering-Led EPC",
    description: "Technical solar engineers designing PV systems for maximum lifetime yield, not just panel installers.",
  },
  {
    title: "Tier-1 Components & QA",
    description: "Exclusively ALMM-listed Tier-1 modules and string inverters with full factory flash data audits.",
  },
  {
    title: "End-to-End Turnkey Execution",
    description: "Complete execution from statutory DISCOM permits to grid commissioning and system handover.",
  },
  {
    title: "Long-Term O&M",
    description: "Dedicated preventive maintenance, thermal diagnostics, and generation monitoring for 25+ years.",
  },
  {
    title: "Multi-Regional Track Record",
    description: "800+ MW of cumulative design and consultation experience across 10+ states in India.",
  },
  {
    title: "Bankable Documentation",
    description: "Project reports satisfying financial institution criteria for project financing and loan sanctions.",
  },
];

export const WhyFivefold: React.FC = () => {
  return (
    <section className="py-16 sm:py-20 lg:py-0 lg:min-h-[100svh] flex flex-col justify-center bg-white text-[#173B53] font-sans transition-colors duration-500">
      <Container>

        {/* Primary Editorial Statement */}
        <div data-reveal="group" className="max-w-4xl mb-8 sm:mb-10 lg:mb-12 space-y-3">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#1684C7] block">
            • WHY FIVEFOLD
          </span>
          <h2
            data-reveal="heading"
            className="font-heading text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-extrabold tracking-tight leading-[1.08] text-[#173B53]"
          >
            The difference between installing panels and engineering power plants.
          </h2>
          <p
            data-reveal="paragraph"
            className="font-sans text-[#526673] text-sm sm:text-base lg:text-lg leading-relaxed max-w-2xl pt-0.5"
          >
            Engineering discipline built for reliable, long-term solar performance.
          </p>
        </div>

        {/* 6 Engineering Disciplines — Minimalist Editorial Grid with Hairline Dividers */}
        <div
          data-reveal="cards-container"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 lg:gap-x-12 gap-y-6 sm:gap-y-8 border-t border-[#DCE2E2] pt-6 sm:pt-8"
        >
          {WHY_POINTS.map((item, idx) => (
            <div
              key={idx}
              data-reveal="card"
              className="space-y-1.5 group"
            >
              <div className="flex items-center gap-2">
                <span className="font-mono text-[11px] font-bold text-[#1684C7] tracking-wider">
                  0{idx + 1}
                </span>
                <div className="h-px flex-1 bg-[#DCE2E2] max-w-[24px]" />
              </div>
              <h3 className="font-heading text-base sm:text-lg font-bold text-[#173B53] tracking-tight leading-snug">
                {item.title}
              </h3>
              <p className="font-sans text-xs sm:text-sm text-[#526673] leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>

      </Container>
    </section>
  );
};
