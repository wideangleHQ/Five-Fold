"use client";

import React from "react";
import { Container } from "@/components/ui/Container";
import { ShieldCheck, Cpu, Layers, Activity, Globe2, Award } from "lucide-react";

const WHY_POINTS = [
  {
    icon: Cpu,
    title: "Engineering-Led EPC",
    description: "We are technical solar engineers designing PV systems for maximum lifetime yield.",
  },
  {
    icon: ShieldCheck,
    title: "Tier-1 Components & QA",
    description: "We exclusively source Tier-1 ALMM-listed solar modules and string inverters.",
  },
  {
    icon: Layers,
    title: "End-to-End Turnkey Execution",
    description: "Complete execution from statutory DISCOM permits to grid commissioning.",
  },
  {
    icon: Activity,
    title: "Long-Term O&M",
    description: "Dedicated preventive maintenance, thermal diagnostics and generation monitoring.",
  },
  {
    icon: Globe2,
    title: "Multi-Regional Track Record",
    description: "Over 800+ MW of cumulative design and consultation experience across India.",
  },
  {
    icon: Award,
    title: "Bankable Documentation & DPR",
    description: "Bankable project reports satisfying financial institution criteria for loans.",
  },
];

export const WhyFivefold: React.FC = () => {
  return (
    <section className="py-16 sm:py-24 bg-white text-[#111615] border-b border-slate-200 font-sans">
      <Container>
        {/* Section Header */}
        <div data-reveal="text" className="max-w-3xl mb-12 space-y-3">
          <span className="font-sans text-xs font-semibold uppercase tracking-wider text-[#20435F] block">
            Why Choose Fivefold
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#111615] tracking-tight leading-tight">
            The difference between installing panels and engineering power plants
          </h2>
          <p className="font-sans text-slate-600 text-sm sm:text-base leading-relaxed">
            Engineering discipline built for reliable, long-term solar performance.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div data-reveal="cards-container" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {WHY_POINTS.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                data-reveal="card"
                className="rounded-2xl border border-slate-200 p-6 sm:p-8 bg-[#F7F8F5] flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white border border-slate-200 text-[#20435F]">
                    <Icon className="h-5.5 w-5.5" />
                  </div>
                  <h3 className="font-heading text-xl font-bold text-[#111615]">
                    {item.title}
                  </h3>
                  <p className="font-sans text-slate-600 text-xs sm:text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
};

