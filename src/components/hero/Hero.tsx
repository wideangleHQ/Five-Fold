"use client";

import React from "react";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

// Import local optimized hero background image
import heroBg from "@/assets/Images/hero section background.png";

export const Hero: React.FC = () => {
  return (
    <section className="relative h-screen h-[100svh] max-h-screen flex flex-col justify-between pt-20 sm:pt-24 pb-0 bg-[#111615] text-white overflow-hidden select-none">
      {/* 1. Cinematic Local Solar Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={heroBg}
          alt="Fivefold Renewable Solar Energy Installation"
          fill
          priority
          placeholder="blur"
          sizes="100vw"
          className="object-cover object-center"
        />
        {/* Subtle Dark Overlay for Crisp Text Readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#111615]/75 via-[#111615]/50 to-[#111615]/90" />
      </div>

      {/* 2. Main Hero Content Container */}
      <Container className="relative z-10 my-auto py-3 sm:py-5 text-center space-y-3 sm:space-y-5 max-h-full">
        {/* Small Editorial Label */}
        <span className="text-[clamp(0.7rem,1vw,0.8rem)] font-sans font-semibold uppercase tracking-wider text-emerald-400 block mx-auto">
          • SOLAR EPC &amp; DECISION PLATFORM
        </span>

        {/* Editorial Headline (Fluid ~10–15% smaller with clamp) */}
        <div className="space-y-2 sm:space-y-3 max-w-4xl mx-auto">
          <h1 className="font-heading text-[clamp(2.25rem,4.5vw+0.75rem,5.25rem)] font-extrabold tracking-tight leading-[1.06] text-center">
            <span className="text-emerald-400 block sm:inline">Powering Odisha with </span>
            <br className="hidden sm:inline" />
            <span className="text-white">Smarter Solar Energy</span>
          </h1>

          {/* Supporting Paragraph (Fluid ~10–15% smaller) */}
          <p className="font-sans text-[clamp(0.85rem,1.1vw+0.4rem,1.1rem)] text-[#F2F2F2] font-normal max-w-lg mx-auto leading-relaxed pt-0.5">
            Engineering-led solar EPC solutions for smarter energy and long-term performance.
          </p>
        </div>

        {/* SINGLE Primary CTA Button */}
        <div className="pt-1 flex justify-center">
          <Button
            href="/contact"
            variant="primary"
            className="bg-[#1F7A45] hover:bg-[#155E34] text-white px-6 py-2.5 sm:px-7 sm:py-3 text-xs sm:text-sm font-sans font-semibold rounded-lg shadow-md transition-all duration-200"
          >
            Get a Free Consultation
          </Button>
        </div>
      </Container>

      {/* 3. OVERSIZED BRAND TYPOGRAPHY ("FIVEFOLD" — 110% VIEWPORT WIDTH, 60% VISIBLE HEIGHT) */}
      <div className="relative z-0 w-full overflow-hidden pointer-events-none select-none shrink-0 flex justify-center items-end">
        <div className="font-heading text-[19.5vw] font-extrabold text-center leading-none tracking-tighter text-emerald-500/20 uppercase whitespace-nowrap w-[110vw] max-w-none transform translate-y-[38%] shrink-0">
          FIVEFOLD
        </div>
      </div>
    </section>
  );
};
