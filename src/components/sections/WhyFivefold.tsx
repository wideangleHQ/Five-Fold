"use client";

import React from "react";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { ShieldCheck, Cpu, Layers, Activity, CheckCircle2, Award, Globe2 } from "lucide-react";

const WHY_POINTS = [
  {
    icon: Cpu,
    title: "Engineering-Led EPC",
    description: "We are technical solar engineers, not generic installers. Every project begins with rigorous 3D shadow analysis, structural load calculation, and PVsyst yield simulation.",
  },
  {
    icon: ShieldCheck,
    title: "Tier-1 Components & QA",
    description: "Strict component selection standards. We exclusively source Tier-1 ALMM-listed solar modules and tier-1 string/central inverters with full component traceability.",
  },
  {
    icon: Layers,
    title: "End-to-End Turnkey Execution",
    description: "From DISCOM statutory permits and net metering synchronization to civil foundation construction, electrical grid connection, and final commissioning.",
  },
  {
    icon: Activity,
    title: "Long-Term O&M (SolarCare)",
    description: "We stay with you long after installation. Dedicated preventive maintenance, thermal imaging diagnostics, and continuous generation performance monitoring.",
  },
  {
    icon: Globe2,
    title: "Multi-Regional Track Record",
    description: "Over 800+ MW of cumulative design and engineering consultation experience across 10+ Indian states, bringing national engineering standards to Odisha.",
  },
  {
    icon: Award,
    title: "Bankable Documentation & DPR",
    description: "Our Detailed Project Reports (DPR) and yield models satisfy stringent banking and financial institution criteria for project financing and industrial loans.",
  },
];

export const WhyFivefold: React.FC = () => {
  return (
    <section className="py-16 sm:py-24 bg-white text-[#111615] border-b border-slate-200 font-sans">
      <Container>
        {/* Section Header */}
        <div className="max-w-3xl mb-12 space-y-3">
          <span className="font-sans text-xs font-bold uppercase tracking-wider text-[#1F7A45]">
            Why Choose Fivefold
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#111615] tracking-tight">
            The Difference Between Installing Panels and <span className="text-[#1F7A45]">Engineering Power Plants</span>
          </h2>
          <p className="font-sans text-slate-600 text-base sm:text-lg leading-relaxed">
            Solar generation over 25 years depends on upfront engineering discipline. We build reliable, bankable energy assets tailored to Odisha&apos;s climate.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {WHY_POINTS.map((item, idx) => {
            const Icon = item.icon;
            return (
              <Card key={idx} className="h-full border-slate-200 p-6 sm:p-8 flex flex-col justify-between bg-[#F7F8F5]">
                <div className="space-y-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#1F7A45]/10 text-[#1F7A45]">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-heading text-xl font-bold text-[#111615]">
                    {item.title}
                  </h3>
                  <p className="font-sans text-slate-600 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
                <div className="pt-4 mt-4 border-t border-slate-200/80 flex items-center gap-2 font-sans text-xs font-semibold text-[#1F7A45]">
                  <CheckCircle2 className="h-4 w-4 shrink-0" />
                  <span>Verified Quality Benchmark</span>
                </div>
              </Card>
            );
          })}
        </div>
      </Container>
    </section>
  );
};
