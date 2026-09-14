"use client";

import React from "react";
import { Plus, Equal, ArrowRight, ShieldCheck, Zap, Activity } from "lucide-react";

interface FormulaItem {
  id: string;
  label: string;
  description: string;
  metric: string;
}

const FORMULA_ITEMS: FormulaItem[] = [
  {
    id: "site",
    label: "SITE CONDITIONS",
    description: "Physical azimuth, tilt, structural load & shading profile",
    metric: "3D Spatial Survey",
  },
  {
    id: "energy",
    label: "ENERGY REQUIREMENT",
    description: "Load curves, diurnal consumption & peak grid demand",
    metric: "15-Min Intervals",
  },
  {
    id: "design",
    label: "SYSTEM DESIGN",
    description: "String sizing, inverter clipping ratio & DC:AC balance",
    metric: "Optimised Architecture",
  },
  {
    id: "modelling",
    label: "GENERATION MODELLING",
    description: "PVsyst yield simulation & meteorological loss factors",
    metric: "P50 / P90 Yields",
  },
  {
    id: "execution",
    label: "QUALITY EXECUTION",
    description: "Tier-1 BoM, torque-calibrated mounting & DISCOM sync",
    metric: "Turnkey EPC Rigor",
  },
];

export const PerformanceFormula: React.FC = () => {
  return (
    <div className="space-y-8">
      {/* Desktop / Tablet Formula Flow */}
      <div className="hidden lg:grid grid-cols-11 gap-3 items-center">
        {FORMULA_ITEMS.map((item, idx) => (
          <React.Fragment key={item.id}>
            {/* Variable Node */}
            <div className="col-span-2 bg-[#1A425D] border border-white/15 rounded-xl p-5 text-left flex flex-col justify-between h-[150px] transition-all duration-300 hover:border-[#1684C7] hover:bg-[#1f4e6d]">
              <div>
                <span className="font-mono text-[10px] text-[#8A9EA7] uppercase tracking-wider block mb-1">
                  0{idx + 1} // VARIABLE
                </span>
                <h4 className="font-heading text-xs font-bold text-white tracking-wide">
                  {item.label}
                </h4>
              </div>
              <div>
                <p className="text-[11px] text-slate-300 line-clamp-2 leading-relaxed">
                  {item.description}
                </p>
                <div className="mt-2 pt-2 border-t border-white/10 flex items-center justify-between text-[10px] font-mono text-[#1684C7]">
                  <span>{item.metric}</span>
                </div>
              </div>
            </div>

            {/* Operator Node */}
            {idx < FORMULA_ITEMS.length - 1 ? (
              <div className="col-span-0 flex justify-center text-[#1684C7]">
                <Plus className="h-5 w-5 opacity-70" />
              </div>
            ) : null}
          </React.Fragment>
        ))}
      </div>

      {/* Result Card: RELIABLE SOLAR PERFORMANCE */}
      <div className="relative rounded-2xl bg-gradient-to-r from-[#0E2738] via-[#173B53] to-[#0E2738] border border-[#1684C7]/50 p-6 sm:p-8 lg:p-10 shadow-2xl overflow-hidden">
        {/* Glow effect */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#1684C7]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1684C7]/20 border border-[#1684C7]/40 text-xs font-mono text-cyan-300">
              <Zap className="h-3.5 w-3.5 text-cyan-400" />
              ENGINEERED OUTCOME
            </div>
            <h3 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
              = RELIABLE SOLAR PERFORMANCE
            </h3>
            <p className="font-sans text-slate-300 text-sm sm:text-base max-w-2xl leading-relaxed">
              Fivefold brings site understanding, engineering design, execution and quality together so that performance is considered throughout the project — not only after installation.
            </p>
          </div>

          <div className="flex-shrink-0 grid grid-cols-2 gap-3 w-full sm:w-auto">
            <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
              <span className="font-mono text-xs text-[#8A9EA7] block">Design Intent</span>
              <span className="font-heading text-base font-bold text-white">100% Aligned</span>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
              <span className="font-mono text-xs text-[#8A9EA7] block">Operation</span>
              <span className="font-heading text-base font-bold text-white">Bankable Rigor</span>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Vertical Formula Sequence */}
      <div className="grid lg:hidden grid-cols-1 gap-3">
        {FORMULA_ITEMS.map((item, idx) => (
          <div
            key={item.id}
            className="bg-[#1A425D] border border-white/10 rounded-xl p-4 text-left space-y-2"
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] text-[#8A9EA7] uppercase">
                STEP 0{idx + 1}
              </span>
              <span className="font-mono text-[11px] text-[#1684C7]">{item.metric}</span>
            </div>
            <h4 className="font-heading text-sm font-bold text-white">{item.label}</h4>
            <p className="text-xs text-slate-300 leading-relaxed">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
