"use client";

import React, { useState } from "react";
import {
  Search,
  SunMedium,
  Layers,
  BarChart3,
  FileText,
  TrendingUp,
  AlertTriangle,
  Cpu,
  PackageCheck,
  Wrench,
  Gauge,
  CheckCircle2,
  ShieldCheck,
  ClipboardCheck,
  Binary,
  GitBranch,
  ArrowRight,
  ChevronRight,
} from "lucide-react";

interface Stage {
  id: "pre-construction" | "execution" | "quality";
  number: string;
  title: string;
  subtitle: string;
  stepCount: string;
  description: string;
}

const STAGES: Stage[] = [
  {
    id: "pre-construction",
    number: "01",
    title: "PRE-CONSTRUCTION",
    subtitle: "Understand Before We Build",
    stepCount: "7 Engineering Steps",
    description:
      "Site evaluation, 3D shading simulations, PVsyst yield modeling, and risk reviews before any physical work begins.",
  },
  {
    id: "execution",
    number: "02",
    title: "EXECUTION",
    subtitle: "Engineering Becomes Execution",
    stepCount: "5 Disciplined Steps",
    description:
      "Translating the engineered design into coordinated procurement, high-standard installation, and rigorous commissioning.",
  },
  {
    id: "quality",
    number: "03",
    title: "QUALITY",
    subtitle: "Quality Is Part of the Engineering",
    stepCount: "5 Verification Pillars",
    description:
      "Tier-1 component assurance, staged QA inspections, field testing, and end-to-end documentation traceability.",
  },
];

import {
  PRE_CONSTRUCTION_STEPS,
  EXECUTION_STEPS,
  QUALITY_STEPS,
} from "@/data/engineering";

export const EngineeringJourneyInteractive: React.FC = () => {
  const [activeStage, setActiveStage] = useState<"pre-construction" | "execution" | "quality">("pre-construction");

  const scrollToStage = (stageId: string) => {
    const el = document.getElementById(stageId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="space-y-12">
      {/* Interactive Phase Selector Pills */}
      <div
        data-reveal="group"
        className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6"
      >
        {STAGES.map((stage) => {
          const isSelected = activeStage === stage.id;
          return (
            <button
              key={stage.id}
              onClick={() => {
                setActiveStage(stage.id);
                scrollToStage(stage.id);
              }}
              className={`text-left p-6 sm:p-7 rounded-2xl border transition-all duration-300 relative group flex flex-col justify-between ${
                isSelected
                  ? "bg-white border-[#1684C7] shadow-lg shadow-[#1684C7]/10 ring-1 ring-[#1684C7]"
                  : "bg-white/70 hover:bg-white border-[#DCE2E2] hover:border-[#173B53]/30 shadow-sm"
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span
                    className={`font-mono text-xs font-bold tracking-wider px-2.5 py-1 rounded-full ${
                      isSelected
                        ? "bg-[#1684C7] text-white"
                        : "bg-[#F6F3EC] text-[#526673] group-hover:text-[#173B53]"
                    }`}
                  >
                    PHASE {stage.number}
                  </span>
                  <span className="font-mono text-xs text-[#8A9EA7]">
                    {stage.stepCount}
                  </span>
                </div>
                <h3 className="font-heading text-xl sm:text-2xl font-extrabold text-[#173B53] tracking-tight mb-2">
                  {stage.title}
                </h3>
                <p className="font-sans text-xs sm:text-sm text-[#526673] leading-relaxed">
                  {stage.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-[#DCE2E2]/60 flex items-center justify-between text-xs font-semibold text-[#1684C7] group-hover:translate-x-0.5 transition-transform">
                <span>View Phase Details</span>
                <ChevronRight className="h-4 w-4" />
              </div>
            </button>
          );
        })}
      </div>

      {/* Visual Connection Bar */}
      <div className="hidden lg:flex items-center justify-between px-8 py-4 bg-[#173B53] text-white rounded-xl text-xs font-mono">
        <div className="flex items-center gap-3">
          <span className="h-2 w-2 rounded-full bg-[#1684C7] animate-pulse" />
          <span className="text-[#8A9EA7]">ENGINEERING SEQUENCE:</span>
          <span className="font-semibold text-white">Understand</span>
          <ArrowRight className="h-3.5 w-3.5 text-[#1684C7]" />
          <span className="font-semibold text-white">Engineer</span>
          <ArrowRight className="h-3.5 w-3.5 text-[#1684C7]" />
          <span className="font-semibold text-white">Execute</span>
          <ArrowRight className="h-3.5 w-3.5 text-[#1684C7]" />
          <span className="font-semibold text-white">Validate</span>
          <ArrowRight className="h-3.5 w-3.5 text-[#1684C7]" />
          <span className="font-semibold text-white">Support</span>
        </div>
        <div className="text-[#8A9EA7] font-sans">
          Zero Assumptions · 100% Traceable
        </div>
      </div>
    </div>
  );
};

