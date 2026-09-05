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
    <section className="bg-[#FAF9F5] text-[#141413] font-sans border-b border-slate-200/80 transition-colors duration-500">
      <Container className="py-14 sm:py-16 lg:py-20">

        {/* Primary Editorial Statement */}
        <div data-reveal="group" className="max-w-4xl mb-12 sm:mb-14 lg:mb-16 space-y-4">
          <h2
            data-reveal="heading"
            className="font-heading text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-extrabold tracking-tight leading-[1.08] text-[#141413]"
          >
            The difference between installing panels and engineering power plants.
          </h2>
          <p
            data-reveal="paragraph"
            className="font-sans text-slate-600 text-sm sm:text-base lg:text-lg leading-relaxed max-w-2xl pt-1"
          >
            Engineering discipline built for reliable, long-term solar performance.
          </p>
        </div>

        {/* 6 Engineering Disciplines — Minimalist Editorial Grid with Hairline Dividers */}
        <div
          data-reveal="cards-container"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 lg:gap-x-12 gap-y-8 sm:gap-y-10 border-t border-slate-200/80 pt-8 sm:pt-10"
        >
          {WHY_POINTS.map((item, idx) => (
            <div
              key={idx}
              data-reveal="card"
              className="space-y-2 group"
            >
              <div className="flex items-center gap-2">
                <span className="font-mono text-[11px] font-semibold text-[#20435F] tracking-wider">
                  0{idx + 1}
                </span>
                <div className="h-px flex-1 bg-slate-200/80 max-w-[24px]" />
              </div>
              <h3 className="font-heading text-base sm:text-lg font-bold text-[#141413] tracking-tight leading-snug">
                {item.title}
              </h3>
              <p className="font-sans text-xs sm:text-sm text-slate-600 leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>

      </Container>
    </section>
  );
};
