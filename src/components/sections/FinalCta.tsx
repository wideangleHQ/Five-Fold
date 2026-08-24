"use client";

import React from "react";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { PhoneCall } from "lucide-react";

export const FinalCta: React.FC = () => {
  return (
    <section className="bg-white py-3 sm:py-4 font-sans relative z-10">
      {/* 1. MATCHING FOOTER CONTAINER WIDTH & SIDE SPACING */}
      <div className="w-full max-w-[1840px] mx-auto px-1 sm:px-2">
        {/* 2. MATCHING FOOTER CORNER RADIUS & CONTAINER STYLING */}
        <div className="relative rounded-[2.5rem] sm:rounded-[3.5rem] bg-[#0C3046] text-white overflow-hidden shadow-2xl border border-sky-900/60 py-16 sm:py-20 lg:py-24">
          <Container data-reveal="card" className="text-center space-y-6 max-w-4xl mx-auto">
            <span className="text-xs font-sans font-semibold uppercase tracking-wider text-[#00A9D6] block">
              Engineering Consultation Ready
            </span>

            <h2 className="font-heading text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
              Let&apos;s Build Your Solar Future
            </h2>

            <p className="font-sans text-slate-200 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto leading-relaxed">
              Talk to our solar engineers about your project.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Button
                href="/contact"
                variant="primary"
                className="w-full sm:w-auto bg-[#20435F] hover:bg-[#0C3046] text-white px-7 py-3.5 text-xs sm:text-sm font-sans font-semibold rounded-lg shadow-md transition-all"
              >
                <span>Get a Free Consultation</span>
              </Button>

              <motion.a
                href="tel:+917008101078"
                whileHover={{ scale: 1.025, y: -1 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-lg border border-white/30 bg-white/5 hover:bg-white/10 text-white font-sans text-xs sm:text-sm font-semibold transition-all"
              >
                <PhoneCall className="h-4 w-4 text-[#00A9D6]" />
                <span>Call +91 70081 01078</span>
              </motion.a>
            </div>
          </Container>
        </div>
      </div>
    </section>
  );
};

