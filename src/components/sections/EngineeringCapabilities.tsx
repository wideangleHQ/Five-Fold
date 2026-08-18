"use client";

import React from "react";
import { Container } from "@/components/ui/Container";
import { ArrowRight } from "lucide-react";

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
  return (
    <section className="py-16 sm:py-24 bg-white text-[#111615] border-b border-slate-200">
      <Container>
        {/* Section Header */}
        <div className="max-w-3xl mb-12 space-y-3">
          <span className="font-sans text-xs font-bold uppercase tracking-wider text-brand-green">
            Engineering Precision
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#111615] tracking-tight">
            Engineering Capability & Journey
          </h2>
          <p className="font-sans text-slate-600 text-base sm:text-lg leading-relaxed">
            Every solar power plant engineered by Fivefold follows a strict three-tier engineering framework designed for 25–30 year bankability.
          </p>
        </div>

        {/* Engineering Journey Flow */}
        <div className="space-y-8">
          {ENGINEERING_JOURNEY.map((group) => (
            <div
              key={group.phase}
              className="p-6 sm:p-8 rounded-2xl bg-[#F7F8F5] border border-slate-200 space-y-5"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-200">
                <div>
                  <span className="font-sans text-xs font-bold text-brand-green">
                    PHASE {group.phase}
                  </span>
                  <h3 className="font-heading text-xl font-bold text-[#111615]">
                    {group.title}
                  </h3>
                </div>
                <div className="font-sans text-xs font-medium text-slate-500">
                  {group.desc}
                </div>
              </div>

              {/* Step Sequence Flow */}
              <div className="flex flex-wrap items-center gap-3 pt-1">
                {group.steps.map((step, idx) => (
                  <React.Fragment key={step}>
                    <div className="px-4 py-2 rounded-xl bg-white border border-slate-200 font-sans text-xs font-bold text-slate-800 shadow-xs flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-brand-green" />
                      <span>{step}</span>
                    </div>
                    {idx < group.steps.length - 1 && (
                      <ArrowRight className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};
