"use client";

import React from "react";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Activity, ShieldCheck, Cpu, RefreshCw, Sparkles, CheckCircle2 } from "lucide-react";

const LIFECYCLE_SERVICES = [
  "O&M Comprehensive Framework",
  "24/7 Remote Telemetry Monitoring",
  "Scheduled Preventive Maintenance",
  "Thermal Imaging Hotspot Diagnostics",
  "Monthly Generation Yield Analysis",
  "De-ionized Panel Washing Protocols",
  "Inverter Health & Efficiency Audits",
  "Grounding & Earthing Resistance Checks",
  "Lightning Protection Grid Inspection",
  "Structural Torque & Corrosion Inspection",
  "DC/AC Cable & Connector Audits",
  "Remote Technical Helpline Support",
  "OEM Module & Inverter Warranty Assistance",
  "25-30 Year Asset Lifespan Optimization",
];

export const LongTermPerformance: React.FC = () => {
  return (
    <section className="py-20 sm:py-24 bg-brand-charcoal text-white relative overflow-hidden">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column Text */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-brand-green/40 bg-brand-green/10 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-brand-green">
              <Activity className="h-4 w-4" />
              25-Year Asset Protection
            </div>

            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
              We Stay With You <br />
              <span className="text-brand-amber">After Installation</span>
            </h2>

            <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
              Commissioning is only Day 1 of a 25-30 year energy asset. Fivefold maintains an active post-installation engineering presence to ensure generation yield stays projected over decades.
            </p>

            <div className="p-4 rounded-xl bg-white/5 border border-slate-800 space-y-2">
              <div className="font-mono text-xs text-brand-amber uppercase tracking-wider font-bold">
                LIFECYCLE CONTINUUM
              </div>
              <p className="text-sm text-slate-200 font-medium">
                DESIGN → INSTALL → COMMISSION → MONITOR → MAINTAIN → OPTIMIZE
              </p>
            </div>
          </div>

          {/* Right Column Services Grid */}
          <div className="lg:col-span-6 p-6 sm:p-8 rounded-2xl bg-brand-green-dark border border-brand-green/30 shadow-xl space-y-6">
            <h3 className="font-heading text-xl font-bold text-white pb-3 border-b border-brand-green/40">
              14-Point O&M & Lifespan Checklist
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm text-slate-200">
              {LIFECYCLE_SERVICES.map((srv, idx) => (
                <div key={idx} className="flex items-center gap-2.5 p-2 rounded-md bg-white/5 border border-white/5">
                  <CheckCircle2 className="h-4 w-4 text-brand-amber shrink-0" />
                  <span>{srv}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};
