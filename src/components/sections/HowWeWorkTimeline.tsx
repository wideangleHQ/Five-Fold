"use client";

import React from "react";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";

const PROCESS_STEPS = [
  { number: "01", title: "Site Assessment", desc: "Detailed structural, shadow & roof radiation audit." },
  { number: "02", title: "Energy Requirement", desc: "12-month electricity load profile analysis." },
  { number: "03", title: "Solar System Design", desc: "PVsyst 3D yield simulation & SLD drawings." },
  { number: "04", title: "Proposal & Docs", desc: "Bankable DPR & technical proposal finalization." },
  { number: "05", title: "Procurement & Erect", desc: "Tier-1 component delivery & civil/electrical installation." },
  { number: "06", title: "Net Metering", desc: "DISCOM inspection & bi-directional meter sync." },
  { number: "07", title: "Testing & Sync", desc: "String testing, thermal scan & final commissioning." },
  { number: "08", title: "After-Sales O&M", desc: "SolarCare lifecycle maintenance & generation tracking." },
];

export const HowWeWorkTimeline: React.FC = () => {
  return (
    <section className="py-20 sm:py-24 bg-brand-off-white text-brand-charcoal overflow-hidden">
      <Container>
        {/* Section Header */}
        <div className="max-w-3xl mb-16 text-center mx-auto">
          <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#20435F]">
            Engineering Execution Process
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-brand-charcoal mt-2 tracking-tight">
            Our 8-Step Turnkey Solar Delivery
          </h2>
          <p className="text-slate-600 text-base sm:text-lg mt-3">
            A standardized, engineering-led execution timeline designed for zero downtime and maximum long-term yield.
          </p>
        </div>

        {/* Timeline Desktop Grid / Mobile Vertical */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {PROCESS_STEPS.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              className="p-6 rounded-xl bg-white border border-slate-200 shadow-sm hover:border-[#20435F] hover:shadow-md transition-all duration-300 relative group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-2xl font-bold text-[#20435F] bg-[#20435F]/10 px-3 py-1 rounded-md">
                    {step.number}
                  </span>
                  <div className="h-2.5 w-2.5 rounded-full bg-slate-300 group-hover:bg-[#00A9D6] transition-colors" />
                </div>
                <h3 className="font-heading text-lg font-bold text-brand-charcoal mb-2">
                  {step.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {step.desc}
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                Phase 0{Math.floor(idx / 2) + 1} Execution
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
};
