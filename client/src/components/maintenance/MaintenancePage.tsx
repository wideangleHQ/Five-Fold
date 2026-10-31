"use client";

import React from "react";
import Image from "next/image";
import logoImg from "@/assets/Images/Logos/Five_Fold_White.png";

/**
 * Minimal, distraction-free maintenance landing page.
 * Keeps it clean, focused, and true to the Fivefold brand palette.
 */
export function MaintenancePage() {
  const currentYear = new Date().getFullYear();

  return (
    <div
      data-lenis-prevent="true"
      className="fixed inset-0 z-[45] min-h-screen w-full bg-[#F6F3EC] text-[#173B53] flex flex-col justify-between items-center px-6 py-10 sm:py-14 selection:bg-[#1684C7]/20 selection:text-[#173B53]"
    >
      {/* Top Logo */}
      <div className="w-full max-w-5xl flex justify-center sm:justify-start">
        <Image
          src={logoImg}
          alt="Fivefold Renewable Logo"
          priority
          className="h-9 sm:h-11 w-auto object-contain brightness-0"
        />
      </div>

      {/* Centered Minimal Content */}
      <main className="w-full max-w-xl text-center space-y-5 my-auto py-12">
        {/* Subtle Status Indicator */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#DCE2E2] text-xs font-medium text-[#173B53] shadow-xs">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#1684C7] opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#1684C7]" />
          </span>
          <span>Scheduled Maintenance</span>
        </div>

        {/* Primary Heading */}
        <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#173B53] leading-tight">
          We Are Under Maintenance
        </h1>

        {/* Supporting Line */}
        <p className="font-sans text-base sm:text-lg text-[#526673] leading-relaxed max-w-md mx-auto">
          Our website is currently undergoing scheduled maintenance. We&apos;ll be back online shortly.
        </p>
      </main>

      {/* Simple Footer */}
      <footer className="w-full max-w-5xl text-center text-xs text-[#526673]">
        © {currentYear} Fivefold Renewable Pvt. Ltd. All rights reserved.
      </footer>
    </div>
  );
}
