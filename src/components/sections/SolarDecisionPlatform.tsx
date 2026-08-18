"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Leaf, Sun, Zap, CheckCircle2, ArrowRight, TrendingUp, MoreHorizontal, Info } from "lucide-react";

// Use approved local image asset for Card 2 visual centerpiece
import solarCardImg from "@/assets/Images/hero section background.png";

export const SolarDecisionPlatform: React.FC = () => {
  return (
    <section className="py-16 sm:py-24 bg-white border-b border-slate-200/80 font-sans">
      <Container>
        {/* 1. SECTION HEADER */}
        <div className="max-w-3xl mb-12 space-y-4">
          {/* Section Label */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-[11px] font-sans font-bold uppercase tracking-wider text-[#1F7A45]">
            <span className="flex h-4 w-4 items-center justify-center rounded-full bg-[#1F7A45] text-white text-[9px]">07</span>
            <span>FIND THE RIGHT SOLAR SOLUTION</span>
          </div>

          {/* Main Heading */}
          <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#111615] tracking-tight leading-[1.08]">
            Find the right <br />
            <span className="text-[#1F7A45]">solar solution</span> for you
          </h2>

          {/* Supporting Description */}
          <p className="font-sans text-slate-600 text-sm sm:text-base max-w-xl leading-relaxed">
            Smart insights and precise calculations to help you choose the right solar solution for your home, business or industry.
          </p>
        </div>

        {/* 2. THREE FEATURE DATA CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* CARD 01: YOUR ENERGY REQUIREMENT */}
          <div className="rounded-3xl p-7 bg-[#1F7A45] text-white flex flex-col justify-between relative min-h-[380px] shadow-sm overflow-hidden group">
            {/* Background Graphic Grid/Wave Lines */}
            <div className="absolute inset-0 bg-[radial-gradient(#ffffff15_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

            {/* Top Row */}
            <div className="flex items-center justify-between relative z-10">
              <div className="h-10 w-10 rounded-full bg-white/20 backdrop-blur-xs flex items-center justify-center text-white">
                <Leaf className="h-5 w-5" />
              </div>
              <div className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-xs border border-white/20 text-[10px] font-sans font-bold uppercase tracking-wider text-white">
                • ENERGY REQUIREMENT
              </div>
            </div>

            {/* Middle Content */}
            <div className="my-auto py-6 relative z-10 space-y-2">
              <h3 className="font-heading text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Your Energy Requirement
              </h3>
              <p className="font-sans text-xs sm:text-sm text-emerald-100/90 leading-relaxed pt-1">
                Tell us about your property, electricity usage and available rooftop space.
              </p>
            </div>

            {/* Bottom Row */}
            <div className="relative z-10 pt-4 border-t border-white/15 flex items-center justify-between">
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white text-[#1F7A45] text-[11px] font-sans font-bold shadow-xs">
                <TrendingUp className="h-3.5 w-3.5 text-[#1F7A45]" />
                <span>PROPERTY & USAGE</span>
              </div>
              <div className="text-[10px] font-sans font-medium text-emerald-100/70">
                Location • Load
              </div>
            </div>
          </div>

          {/* CARD 02: YOUR SOLAR REQUIREMENT */}
          <div className="rounded-3xl p-7 bg-slate-900 text-white flex flex-col justify-between relative min-h-[380px] shadow-sm overflow-hidden group">
            {/* Background Solar Photo */}
            <Image
              src={solarCardImg}
              alt="Fivefold Solar Solution Recommendation"
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
            />
            {/* Gradient Overlay for Text Readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-slate-950/40 z-0" />

            {/* Top Row */}
            <div className="flex items-center justify-between relative z-10">
              <div className="h-10 w-10 rounded-full bg-white/90 backdrop-blur-xs flex items-center justify-center text-[#1F7A45] shadow-xs">
                <Sun className="h-5 w-5" />
              </div>
              <div className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-xs text-[10px] font-sans font-bold uppercase tracking-wider text-[#1F7A45] shadow-xs">
                • SYSTEM SIZING
              </div>
            </div>

            {/* Bottom Row Overlay Content */}
            <div className="relative z-10 pt-6 space-y-2">
              <h3 className="font-heading text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Your Solar Requirement
              </h3>
              <p className="font-sans text-xs text-slate-200 leading-relaxed">
                Get an indicative recommendation based on your energy requirements and available rooftop space.
              </p>
              <div className="font-sans text-[11px] font-semibold text-emerald-400 pt-1">
                Capacity • Generation • Solution
              </div>
            </div>
          </div>

          {/* CARD 03: POTENTIAL SAVINGS & SUPPORT */}
          <div className="rounded-3xl p-7 bg-[#F7F8F5] border border-slate-200/90 text-[#111615] flex flex-col justify-between relative min-h-[380px] shadow-sm overflow-hidden">
            {/* Top Row */}
            <div className="flex items-center justify-between relative z-10">
              <div className="h-10 w-10 rounded-full bg-[#1F7A45]/10 flex items-center justify-center text-[#1F7A45]">
                <Zap className="h-5 w-5" />
              </div>
              <div className="text-slate-400">
                <MoreHorizontal className="h-5 w-5" />
              </div>
            </div>

            {/* Middle Content */}
            <div className="my-auto py-4 relative z-10 space-y-2">
              <div className="inline-block px-3 py-1 rounded-full bg-white border border-slate-200 text-[10px] font-sans font-bold uppercase tracking-wider text-[#1F7A45] shadow-2xs">
                SCHEMES & SAVINGS
              </div>
              <h3 className="font-heading text-2xl sm:text-3xl font-extrabold text-[#111615] tracking-tight">
                Potential Savings & Support
              </h3>
              <p className="font-sans text-xs text-slate-600 leading-relaxed">
                Understand your potential savings and discover applicable government scheme assistance.
              </p>
            </div>

            {/* Bottom Row */}
            <div className="relative z-10 pt-4 border-t border-slate-200 flex items-center justify-between text-xs">
              <div>
                <span className="font-sans text-[11px] text-slate-500 block">Government Assistance</span>
                <span className="font-sans font-bold text-[#1F7A45] flex items-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#1F7A45]" />
                  PM Surya Ghar Facilitation
                </span>
              </div>
              <div className="text-right">
                <span className="font-heading text-sm font-extrabold text-[#111615]">
                  Fivefold Support
                </span>
                <span className="font-sans text-[10px] text-slate-500 block">End-to-End Assistance</span>
              </div>
            </div>
          </div>
        </div>

        {/* 3. BOTTOM HORIZONTAL CTA BANNER */}
        <div className="p-4 sm:p-5 rounded-2xl bg-[#F7F8F5] border border-slate-200/90 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xs">
          <div className="flex items-center gap-3 text-center sm:text-left">
            <div className="h-10 w-10 rounded-full bg-[#1F7A45] flex items-center justify-center text-white shrink-0 shadow-xs">
              <CheckCircle2 className="h-5 w-5" />
            </div>
            <div>
              <h4 className="font-heading text-sm sm:text-base font-bold text-[#111615]">
                Precision insights. Smarter decisions. Maximum savings.
              </h4>
              <p className="font-sans text-xs text-slate-500">
                Calculate • Compare • Save with Fivefold Renewable
              </p>
            </div>
          </div>

          <Button
            href="/solar-calculator"
            variant="primary"
            className="bg-[#1F7A45] hover:bg-[#165c33] text-white px-5 py-2.5 text-xs sm:text-sm font-sans font-semibold rounded-full shrink-0 flex items-center gap-2 shadow-xs"
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
