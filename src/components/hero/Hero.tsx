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

      {/* 2. Main Hero Content Container (Fitted within 100vh for Laptops & Desktop) */}
      <Container className="relative z-10 my-auto py-2 sm:py-4 text-center space-y-3 sm:space-y-4 max-h-full">
        {/* Informational Pill Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#111615]/60 backdrop-blur-md border border-white/20 text-xs sm:text-sm font-sans font-medium text-slate-200 shadow-xs mx-auto">
          <span className="h-2 w-2 rounded-full bg-[#1F7A45] shrink-0" />
          <span>Engineering-led solar EPC since 2016</span>
        </div>

        {/* Proportional Editorial Headline (Manrope 800) */}
        <div className="space-y-2 sm:space-y-3 max-w-5xl mx-auto">
          <h1 className="font-heading text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-7.5xl font-extrabold tracking-tight leading-[1.08] text-center">
            <span className="text-emerald-400 block sm:inline">Powering Odisha with </span>
            <br className="hidden sm:inline" />
            <span className="text-white">Smarter Solar Energy</span>
          </h1>

          {/* Supporting Paragraph (Inter 400) */}
          <p className="font-sans text-sm sm:text-base md:text-lg lg:text-xl text-slate-200/95 font-normal max-w-xl mx-auto leading-relaxed pt-0.5">
            Engineering-Led Solar EPC Solutions Since 2016
          </p>
        </div>

        {/* SINGLE Refined CTA Button (Inter 600) */}
        <div className="pt-1 flex justify-center">
          <Button
            href="/contact"
            variant="primary"
            className="bg-[#1F7A45] hover:bg-[#165c33] text-white px-6 py-2.5 text-xs sm:text-sm font-sans font-semibold rounded-lg shadow-md transition-all duration-200"
          >
            Get a Free Consultation
          </Button>
        </div>
      </Container>

      {/* 3. Oversized Cropped Bottom Brand Typography ("FIVEFOLD") (Visually Intact & Visible within 100vh) */}
      <div className="relative z-0 w-full overflow-hidden pointer-events-none select-none shrink-0">
        <div className="font-heading text-[15vw] sm:text-[17vw] lg:text-[16vw] font-extrabold text-center leading-none tracking-tighter text-emerald-500/20 transform translate-y-[20%] uppercase">
          FIVEFOLD
        </div>
      </div>
    </section>
  );
};
