"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Calculator } from "lucide-react";

export const StickyMobileCTA: React.FC = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-30 lg:hidden bg-slate-900/95 backdrop-blur-md border-t border-slate-800 p-3 shadow-lg">
      <Link
        href="/solar-calculator"
        className="flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl bg-[#20435F] text-white font-heading font-bold text-sm shadow-sm hover:bg-[#0C3046] transition-colors active:scale-[0.98]"
      >
        <Calculator className="h-4 w-4 text-[#00A9D6]" />
        <span>Find My Solar Solution</span>
        <ArrowRight className="h-4 w-4 ml-1" />
      </Link>
    </div>
  );
};
