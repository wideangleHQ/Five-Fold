"use client";

import React from "react";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Compass, LineChart, Shield, Workflow, ChevronRight } from "lucide-react";

const STAGES = [
  { step: "01", name: "Feasibility Analysis", detail: "3D Shadow Mapping & Solar Irradiance Audit" },
  { step: "02", name: "Precision Design", detail: "PVsyst Generation & Yield Loss Simulation" },
  { step: "03", name: "Structural Engineering", detail: "Wind-Load Calculation & Seismic Verification" },
  { step: "04", name: "Procurement QA", detail: "Tier-1 Hardware & Supplier Quality Audits" },
  { step: "05", name: "Turnkey Execution", detail: "Zero-Downtime Civil & Electrical Integration" },
  { step: "06", name: "Performance Assurance", detail: "Thermal Imaging & 25-Year Asset Lifecycle O&M" },
];

export const SignatureEngineering: React.FC = () => {
  return (
    <section className="relative py-24 lg:py-32 bg-[#0C3046] text-white overflow-hidden">
      {/* Blueprint Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:3rem_3rem] pointer-events-none" />

      <Container className="relative z-10">
        {/* Core Statement Banner */}
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 rounded-full border border-[#00A9D6]/40 bg-[#00A9D6]/10 px-4 py-1.5 text-xs sm:text-sm font-bold uppercase tracking-wider text-[#00A9D6]"
          >
            <Compass className="h-4 w-4" />
            Signature Engineering Principle
          </motion.div>

          <h2 className="font-heading text-4xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight text-white uppercase leading-[1.05]">
            Engineering <br />
            <span className="bg-gradient-to-r from-[#00A9D6] via-sky-200 to-white bg-clip-text text-transparent">
              Determines Performance
            </span>
          </h2>

          <p className="text-slate-300 text-lg sm:text-xl lg:text-2xl max-w-3xl mx-auto font-light leading-relaxed">
            Solar plants do not simply underperform because of equipment; engineering decisions before construction directly affect generation, reliability, constructibility and long-term returns.
          </p>

          {/* Bold Core Positioning Quote */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-8 p-6 sm:p-8 rounded-2xl bg-[#20435F]/80 border border-[#20435F] shadow-2xl backdrop-blur-md max-w-3xl mx-auto text-center"
          >
            <p className="font-heading text-xl sm:text-2xl lg:text-3xl font-extrabold text-white">
              &ldquo;We do not sell drawings. <br />
              <span className="text-[#00A9D6]">We engineer bankable solar plants.</span>&rdquo;
            </p>
          </motion.div>
        </div>

        {/* Horizontal Technical Lifecycle Process */}
        <div className="mt-20">
          <div className="text-center mb-10">
            <span className="text-xs uppercase tracking-widest text-slate-400 font-mono">
              ENGINEERING LIFECYCLE PIPELINE
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {STAGES.map((stage, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="p-6 rounded-xl bg-white/5 border border-slate-800 hover:border-[#20435F] hover:bg-white/10 transition-all duration-300 relative group"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-2xl font-bold text-[#00A9D6]">
                    {stage.step}
                  </span>
                  <div className="h-2 w-2 rounded-full bg-[#00A9D6] group-hover:scale-150 transition-transform" />
                </div>
                <h3 className="font-heading text-lg font-bold text-white mb-1">
                  {stage.name}
                </h3>
                <p className="text-xs sm:text-sm text-slate-400">
                  {stage.detail}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};
