"use client";

import React from "react";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Compass, ShieldCheck, CheckCircle2, Cpu } from "lucide-react";

export const SignatureEngineering: React.FC = () => {
  return (
    <section className="relative py-20 lg:py-28 bg-[#0C3046] text-white overflow-hidden border-b border-slate-800">
      {/* Blueprint Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:3rem_3rem] pointer-events-none" />

      {/* Ambient Lighting */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#00A9D6]/10 rounded-full blur-3xl pointer-events-none" />

      <Container className="relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 rounded-full border border-[#00A9D6]/40 bg-[#00A9D6]/10 px-4 py-1.5 text-xs font-mono font-bold uppercase tracking-wider text-[#00A9D6]"
          >
            <Compass className="h-4 w-4" />
            <span>• SIGNATURE ENGINEERING PHILOSOPHY</span>
          </motion.div>

          <h2 className="font-heading text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white uppercase leading-[1.05]">
            Engineering <br />
            <span className="bg-gradient-to-r from-[#00A9D6] via-sky-200 to-white bg-clip-text text-transparent">
              Determines Performance
            </span>
          </h2>

          <p className="text-slate-300 text-base sm:text-xl lg:text-2xl max-w-3xl mx-auto font-light leading-relaxed">
            Solar plants underperform when engineering is treated as a formality. Pre-construction analysis, structural design, and component matching dictate 25–30 year bankability.
          </p>

          {/* Bold Core Positioning Quote */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-8 p-6 sm:p-8 rounded-2xl bg-[#20435F]/90 border border-[#00A9D6]/30 shadow-2xl backdrop-blur-md max-w-3xl mx-auto text-center"
          >
            <p className="font-heading text-xl sm:text-2xl lg:text-3xl font-extrabold text-white leading-tight">
              &ldquo;We do not sell drawings. <br />
              <span className="text-[#00A9D6]">We engineer bankable solar plants.</span>&rdquo;
            </p>
          </motion.div>
        </div>
      </Container>
    </section>
  );
};
