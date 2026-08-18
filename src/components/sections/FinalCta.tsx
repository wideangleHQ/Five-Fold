"use client";

import React from "react";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { ArrowRight, ShieldCheck, PhoneCall } from "lucide-react";

export const FinalCta: React.FC = () => {
  return (
    <section className="relative py-24 lg:py-28 bg-brand-green-dark text-white overflow-hidden border-t border-brand-green/40">
      {/* Background Accent Lines */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

      <Container className="relative z-10 text-center space-y-8 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="space-y-6"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-brand-amber/40 bg-brand-amber/10 px-4 py-1.5 text-xs sm:text-sm font-bold uppercase tracking-wider text-brand-amber">
            <ShieldCheck className="h-4 w-4" />
            Engineering Consultation Ready
          </div>

          <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white">
            Let&apos;s Build Your Solar Future
          </h2>

          <p className="text-slate-200 text-lg sm:text-xl font-light max-w-2xl mx-auto leading-relaxed">
            Talk to our senior solar engineers for a free 3D shadow analysis, roof load assessment, and bankable DPR financial simulation.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Button href="/contact" variant="amber" size="lg" className="w-full sm:w-auto font-bold">
              <span>Get a Free Consultation</span>
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>

            <a
              href="tel:+917008101078"
              className="inline-flex items-center justify-center px-6 py-3.5 rounded-md border border-white/20 bg-white/5 hover:bg-white/10 text-white font-semibold text-base transition-colors"
            >
              <PhoneCall className="mr-2 h-5 w-5 text-brand-amber" />
              <span>Call +91 70081 01078</span>
            </a>
          </div>
        </motion.div>
      </Container>
    </section>
  );
};
