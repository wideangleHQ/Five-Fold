"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { ArrowRight, Info } from "lucide-react";

// Use approved local image asset for Card 2 visual centerpiece
import solarCardImg from "@/assets/Images/hero section background.png";

export const SolarDecisionPlatform: React.FC = () => {
  return (
    <section className="py-16 sm:py-24 bg-white border-b border-slate-200/80 font-sans">
      <Container>
        {/* 1. ASYMMETRIC EDITORIAL HEADER (Matching Reference) */}
        <div data-reveal="text" className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 items-end mb-12">
          <div className="md:col-span-7 space-y-2">
            <span className="text-xs font-sans font-semibold uppercase tracking-wider text-[#20435F] block">
              • FIND YOUR SOLAR SOLUTION
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#111615] tracking-tight leading-[1.12]">
              Find the right solar solution for you
            </h2>
          </div>

          <div className="md:col-span-5 text-left md:text-right">
            <p className="font-sans text-slate-600 text-sm sm:text-base leading-relaxed max-w-md ml-auto">
              Smart calculations to help you choose the right solar solution.
            </p>
          </div>
        </div>

        {/* 2. THREE FEATURE DATA CARDS */}
        <div data-reveal="cards-container" className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* CARD 01: YOUR ENERGY REQUIREMENT */}
          <div data-reveal="card" className="rounded-2xl p-7 bg-[#20435F] text-white flex flex-col justify-between min-h-[300px] border border-[#20435F]">
            <div className="space-y-3">
              <span className="text-[11px] font-sans font-semibold uppercase tracking-wider text-[#00A9D6] block">
                Energy Requirement
              </span>
              <h3 className="font-heading text-2xl font-extrabold text-white tracking-tight">
                Your Energy Requirement
              </h3>
              <p className="font-sans text-xs sm:text-sm text-slate-100 leading-relaxed pt-1">
                Tell us about your property, usage and available rooftop space.
              </p>
            </div>
          </div>

          {/* CARD 02: YOUR SOLAR REQUIREMENT */}
          <div data-reveal="card" className="rounded-2xl p-7 bg-slate-900 text-white flex flex-col justify-between relative min-h-[300px] overflow-hidden group">
            <div data-reveal="image-container" className="absolute inset-0 z-0 overflow-hidden">
              <Image
                src={solarCardImg}
                alt="Fivefold Solar Solution Recommendation"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-slate-950/30 z-0" />

            <div className="relative z-10 space-y-2">
              <span className="text-[11px] font-sans font-semibold uppercase tracking-wider text-[#00A9D6] block">
                System Sizing
              </span>
            </div>

            <div className="relative z-10 pt-6 space-y-2">
              <h3 className="font-heading text-2xl font-extrabold text-white tracking-tight">
                Your Solar Requirement
              </h3>
              <p className="font-sans text-xs text-slate-200 leading-relaxed">
                Get an indicative recommendation based on your requirements.
              </p>
            </div>
          </div>

          {/* CARD 03: POTENTIAL SAVINGS & SUPPORT */}
          <div data-reveal="card" className="rounded-2xl p-7 bg-[#F7F8F5] border border-slate-200 text-[#111615] flex flex-col justify-between min-h-[300px]">
            <div className="space-y-3">
              <span className="text-[11px] font-sans font-semibold uppercase tracking-wider text-[#20435F] block">
                Schemes &amp; Savings
              </span>
              <h3 className="font-heading text-2xl font-extrabold text-[#111615] tracking-tight">
                Potential Savings &amp; Support
              </h3>
              <p className="font-sans text-xs sm:text-sm text-slate-600 leading-relaxed pt-1">
                Understand potential savings and applicable government schemes.
              </p>
            </div>
          </div>
        </div>

        {/* 3. BOTTOM HORIZONTAL CTA BANNER */}
        <div data-reveal="card" className="p-5 sm:p-6 rounded-2xl bg-[#F7F8F5] border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h4 className="font-heading text-base sm:text-lg font-bold text-[#111615]">
              Precision insights. Smarter decisions. Maximum savings.
            </h4>
            <p className="font-sans text-xs sm:text-sm text-slate-600">
              Calculate your solar ROI with Fivefold Renewable
            </p>
          </div>

          <Button
            href="/solar-calculator"
            variant="primary"
            className="bg-[#20435F] hover:bg-[#0C3046] text-white px-6 py-3 text-xs sm:text-sm font-sans font-semibold rounded-lg shrink-0 flex items-center gap-2 transition-all shadow-md"
          >
            <span>Find My Solar Solution</span>
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>

        {/* 4. DISCLAIMER */}
        <div className="mt-4 text-center">
          <p className="font-sans text-[11px] text-slate-400 inline-flex items-center gap-1.5">
            <Info className="h-3.5 w-3.5 text-slate-400 shrink-0" />
            <span>Indicative estimates only. Final system sizing is subject to professional site assessment and engineering.</span>
          </p>
        </div>
      </Container>
    </section>
  );
};

