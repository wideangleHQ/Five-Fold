"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

import energyReqImg from "@/assets/Images/Second Section/Energy_Requirement.png";
import systemSizingImg from "@/assets/Images/Second Section/System_Sizing.png";
import schemesSavingsImg from "@/assets/Images/Second Section/Schemes_and_Savings.png";

export const SolarDecisionPlatform: React.FC = () => {
  return (
    <section className="py-12 sm:py-16 lg:py-4 lg:min-h-[100svh] flex flex-col justify-center bg-white font-sans">
      {/* MATCHING SIDE PADDING & EXPANDED CONTENT WIDTH (px-4 sm:px-6 on mobile, 98% max-1780px on desktop) */}
      <div className="w-full max-w-7xl lg:max-w-[1780px] lg:w-[98%] mx-auto px-4 sm:px-6 lg:px-0 py-6 sm:py-8 lg:py-8">
        
        {/* Section Header */}
        <div data-reveal="text" className="max-w-3xl mb-8 sm:mb-10 space-y-2.5">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#1684C7] block">
            • SOLAR SOLUTION PLATFORM
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#173B53] tracking-tight leading-[1.1]">
            Find the right solar solution for your needs.
          </h2>
          <p className="font-sans text-[#526673] text-sm sm:text-base leading-relaxed">
            Smart calculations to help you choose correctly.
          </p>
        </div>

        {/* 3-Card Asymmetric Editorial Grid with Equal Spacing */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-stretch">

          {/* CARD 01: Large Dominant Vertical Card (Left Column) */}
          <Link
            href="/solar-calculator"
            data-reveal="card"
            className="lg:col-span-5 relative rounded-3xl overflow-hidden bg-[#173B53] border border-[#DCE2E2] shadow-[0_10px_30px_-10px_rgba(23,59,83,0.08)] hover:shadow-[0_20px_40px_-12px_rgba(23,59,83,0.16)] transition-all duration-500 group flex flex-col justify-end p-6 sm:p-8 lg:p-10 min-h-[460px] sm:min-h-[520px] lg:min-h-[580px]"
          >
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
              <Image
                src={energyReqImg}
                alt="Energy Requirement - Fivefold Solar Assessment"
                fill
                sizes="(max-width: 1024px) 100vw, 42vw"
                className="object-cover object-center group-hover:scale-[1.025] transition-transform duration-700 ease-out"
              />
              {/* Subtle natural gradient for text legibility */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
            </div>

            {/* Bottom Content: Heading + Short Paragraph only */}
            <div className="relative z-10 space-y-1.5">
              <h3 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight">
                Energy Requirement
              </h3>
              <p className="font-sans text-xs sm:text-sm text-slate-200 leading-relaxed max-w-md pt-1">
                Tell us about your property, monthly usage and available rooftop space for precision solar engineering.
              </p>
            </div>
          </Link>

          {/* RIGHT COLUMN: Card 02 (Top Wide) + Card 03 (Bottom Card) with Equal Spacing */}
          <div className="lg:col-span-7 flex flex-col gap-5 sm:gap-6 justify-between">

            {/* CARD 02: Wide Horizontal Landscape Card */}
            <Link
              href="/solar-calculator"
              data-reveal="card"
              className="flex-1 relative rounded-3xl overflow-hidden bg-[#173B53] border border-[#DCE2E2] shadow-[0_10px_30px_-10px_rgba(23,59,83,0.08)] hover:shadow-[0_20px_40px_-12px_rgba(23,59,83,0.16)] transition-all duration-500 group flex flex-col justify-end p-6 sm:p-8 min-h-[230px] sm:min-h-[260px] lg:min-h-[275px]"
            >
              {/* Background Image */}
              <div className="absolute inset-0 z-0">
                <Image
                  src={systemSizingImg}
                  alt="System Sizing - Sustainable Living with Solar"
                  fill
                  sizes="(max-width: 1024px) 100vw, 58vw"
                  className="object-cover object-center group-hover:scale-[1.025] transition-transform duration-700 ease-out"
                />
                {/* Subtle natural gradient for text legibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              </div>

              {/* Bottom Content: Heading + Short Paragraph only */}
              <div className="relative z-10 space-y-1.5">
                <h3 className="font-heading text-xl sm:text-2xl lg:text-3xl font-extrabold text-white tracking-tight leading-tight">
                  System Sizing
                </h3>
                <p className="font-sans text-xs sm:text-sm text-slate-200 leading-relaxed max-w-lg pt-1">
                  Get an indicative recommendation and 25-year bankable yield simulation based on your requirements.
                </p>
              </div>
            </Link>

            {/* CARD 03: Schemes & Savings Card with Image */}
            <Link
              href="/solar-calculator"
              data-reveal="card"
              className="flex-1 relative rounded-3xl overflow-hidden bg-[#173B53] border border-[#DCE2E2] shadow-[0_10px_30px_-10px_rgba(23,59,83,0.08)] hover:shadow-[0_20px_40px_-12px_rgba(23,59,83,0.16)] transition-all duration-500 group flex flex-col justify-end p-6 sm:p-8 min-h-[230px] sm:min-h-[260px] lg:min-h-[275px]"
            >
              {/* Background Image */}
              <div className="absolute inset-0 z-0">
                <Image
                  src={schemesSavingsImg}
                  alt="Schemes & Savings - Fivefold Solar"
                  fill
                  sizes="(max-width: 1024px) 100vw, 58vw"
                  className="object-cover object-center group-hover:scale-[1.025] transition-transform duration-700 ease-out"
                />
                {/* Subtle natural gradient for text legibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              </div>

              {/* Bottom Content: Heading + Short Paragraph only */}
              <div className="relative z-10 space-y-1.5">
                <h3 className="font-heading text-xl sm:text-2xl lg:text-3xl font-extrabold text-white tracking-tight leading-tight">
                  Schemes &amp; Savings
                </h3>
                <p className="font-sans text-xs sm:text-sm text-slate-200 leading-relaxed max-w-lg pt-1">
                  Understand applicable government subsidies (PM Surya Ghar up to ₹78,000), commercial tax benefits, and DISCOM net metering.
                </p>
              </div>
            </Link>

          </div>

        </div>

      </div>
    </section>
  );
};
