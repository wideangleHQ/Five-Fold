"use client";

import React from "react";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { ArrowRight, Info } from "lucide-react";

// Import real high-resolution Fivefold solar installation photography for middle card
import solarHeroImg from "@/assets/Images/hero section background.png";

export const SolarDecisionPlatform: React.FC = () => {
  return (
    <section className="py-16 sm:py-24 bg-white text-[#111615] font-sans border-b border-slate-200/80">
      <Container>
        {/* 1. ASYMMETRIC EDITORIAL HEADER */}
        <div data-reveal="text" className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 items-end mb-12 sm:mb-14">
          <div className="md:col-span-7 space-y-3">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#20435F] block">
              • FIND YOUR SOLAR SOLUTION
            </span>
            <h2 className="font-heading text-3xl sm:text-5xl lg:text-6xl font-extrabold text-[#111615] tracking-tight leading-[1.1]">
              Find the right solar solution for you
            </h2>
          </div>

          <div className="md:col-span-5 text-left md:text-right">
            <p className="font-sans text-slate-600 text-sm sm:text-base leading-relaxed max-w-xs ml-auto">
              Smart calculations to help you choose the right solar solution.
            </p>
          </div>
        </div>

        {/* 2. THREE FEATURE DATA CARDS */}
        <div data-reveal="cards-container" className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* CARD 01: YOUR ENERGY REQUIREMENT */}
          <div
            data-reveal="card"
            className="rounded-2xl p-7 sm:p-8 bg-[#20435F] text-white flex flex-col justify-start space-y-6 min-h-[340px] shadow-sm border border-[#20435F]"
          >
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#00A9D6] block">
              ENERGY REQUIREMENT
            </span>
            <div className="space-y-3">
              <h3 className="font-heading text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-snug">
                Your Energy Requirement
              </h3>
              <p className="font-sans text-xs sm:text-sm text-slate-200 leading-relaxed">
                Tell us about your property, usage and available rooftop space.
              </p>
            </div>
          </div>

          {/* CARD 02: YOUR SOLAR REQUIREMENT (IMAGE CARD) */}
          <div
            data-reveal="card"
            className="rounded-2xl p-7 sm:p-8 bg-slate-900 text-white flex flex-col justify-between relative min-h-[340px] overflow-hidden group shadow-sm border border-slate-800"
          >
            {/* Background Image Layer */}
            <div className="absolute inset-0 z-0 overflow-hidden">
              <Image
                src={solarHeroImg}
                alt="Fivefold Solar Solution Recommendation"
                fill
                priority
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover object-center group-hover:scale-105 transition-transform duration-700 opacity-90"
              />
            </div>
            {/* Gradient Dark Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-slate-950/40 z-0" />

            {/* Top Tag */}
            <div className="relative z-10">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#00A9D6] block">
                SYSTEM SIZING
              </span>
            </div>

            {/* Bottom Content */}
            <div className="relative z-10 space-y-2 pt-12">
              <h3 className="font-heading text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-snug">
                Your Solar Requirement
              </h3>
              <p className="font-sans text-xs sm:text-sm text-slate-200 leading-relaxed">
                Get an indicative recommendation based on your requirements.
              </p>
            </div>
          </div>

          {/* CARD 03: POTENTIAL SAVINGS & SUPPORT */}
          <div
            data-reveal="card"
            className="rounded-2xl p-7 sm:p-8 bg-[#F7F8F5] border border-slate-200/90 text-[#111615] flex flex-col justify-start space-y-6 min-h-[340px] shadow-sm"
          >
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#20435F] block">
              SCHEMES &amp; SAVINGS
            </span>
            <div className="space-y-3">
              <h3 className="font-heading text-2xl sm:text-3xl font-extrabold text-[#111615] tracking-tight leading-snug">
                Potential Savings &amp; Support
              </h3>
              <p className="font-sans text-xs sm:text-sm text-slate-600 leading-relaxed">
                Understand potential savings and applicable government schemes.
              </p>
            </div>
          </div>
        </div>

        {/* 3. BOTTOM HORIZONTAL CTA BANNER */}
        <div
          data-reveal="card"
          className="p-6 sm:p-7 rounded-2xl bg-[#F7F8F5] border border-slate-200/90 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 shadow-sm"
        >
          <div className="space-y-1">
            <h4 className="font-heading text-lg sm:text-xl font-bold text-[#111615]">
              Precision insights. Smarter decisions. Maximum savings.
            </h4>
            <p className="font-sans text-xs sm:text-sm text-slate-600">
              Calculate your solar ROI with Fivefold Renewable
            </p>
          </div>

          <Button
            href="/smart-solar-calculator"
            variant="primary"
            className="w-full sm:w-auto bg-[#20435F] hover:bg-[#0C3046] text-white px-6 py-3.5 text-xs sm:text-sm font-sans font-semibold rounded-xl shrink-0 flex items-center justify-center gap-2 transition-all shadow-md group"
          >
            <span>Find My Solar Solution</span>
            <ArrowRight className="h-4 w-4 text-[#00A9D6] group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>

        {/* 4. DISCLAIMER */}
        <div className="mt-5 text-center">
          <p className="font-sans text-[11px] text-slate-400 inline-flex items-center gap-1.5 justify-center">
            <Info className="h-3.5 w-3.5 text-slate-400 shrink-0" />
            <span>Indicative estimates only. Final system sizing is subject to professional site assessment and engineering.</span>
          </p>
        </div>
      </Container>
    </section>
  );
};

