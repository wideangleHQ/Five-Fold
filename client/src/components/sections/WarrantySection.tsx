"use client";

import React from "react";
import { Container } from "@/components/ui/Container";
import { ShieldCheck, Award, Wrench, FileCheck, Headphones, CheckCircle2 } from "lucide-react";

const WARRANTY_ITEMS = [
  { icon: ShieldCheck, title: "25-30 Year Module Performance Warranty", desc: "Tier-1 ALMM panel linear power degradation warranty backed by manufacturers." },
  { icon: Award, title: "10-12 Year Module Product Warranty", desc: "Workmanship and physical integrity protection on Tier-1 photovoltaic modules." },
  { icon: Wrench, title: "5-10 Year Inverter Warranty", desc: "Manufacturer warranty support for string and central solar inverters." },
  { icon: FileCheck, title: "BOS & Structural Guarantee", desc: "High-wind mounting structure and balance of system component warranties." },
  { icon: Headphones, title: "Turnkey Claim Assistance", desc: "Fivefold handles end-to-end OEM warranty claims, RMA logistics, and panel replacements." },
];

export const WarrantySection: React.FC = () => {
  return (
    <section className="py-20 sm:py-24 bg-white text-brand-charcoal border-t border-b border-slate-200">
      <Container>
        <div className="max-w-3xl mb-12">
          <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#20435F]">
            Built for Long-Term Performance
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-brand-charcoal mt-2 tracking-tight">
            Comprehensive Warranty & Component Protection
          </h2>
          <p className="text-slate-600 text-base sm:text-lg mt-3">
            We partner exclusively with certified Tier-1 component manufacturers to ensure your solar installation is fully backed by long-term warranties.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {WARRANTY_ITEMS.map((w, idx) => {
            const Icon = w.icon;
            return (
              <div key={idx} className="p-6 rounded-xl bg-brand-off-white border border-slate-200 space-y-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#20435F]/10 text-[#20435F]">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="font-heading text-lg font-bold text-brand-charcoal">{w.title}</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{w.desc}</p>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
};
