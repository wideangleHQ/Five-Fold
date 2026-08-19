"use client";

import React from "react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { PhoneCall } from "lucide-react";

export const FinalCta: React.FC = () => {
  return (
    <section className="py-20 lg:py-24 bg-[#0B3D2E] text-white border-t border-emerald-900/60 font-sans">
      <Container className="text-center space-y-6 max-w-4xl mx-auto">
        <span className="text-xs font-sans font-semibold uppercase tracking-wider text-emerald-300 block">
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
            className="w-full sm:w-auto bg-[#1F7A45] hover:bg-[#155E34] text-white px-7 py-3.5 text-xs sm:text-sm font-sans font-semibold rounded-lg shadow-md transition-all"
          >
            <span>Get a Free Consultation</span>
          </Button>

          <a
            href="tel:+917008101078"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-lg border border-white/30 bg-white/5 hover:bg-white/10 text-white font-sans text-xs sm:text-sm font-semibold transition-all"
          >
            <PhoneCall className="h-4 w-4 text-emerald-300" />
            <span>Call +91 70081 01078</span>
          </a>
        </div>
      </Container>
    </section>
  );
};

