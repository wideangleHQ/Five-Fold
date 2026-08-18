import React from "react";
import { Metadata } from "next";
import { ShieldCheck, CheckCircle2, Wrench, FileCheck, PhoneCall, Zap } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { constructMetadata } from "@/lib/seo";

export const metadata: Metadata = constructMetadata({
  title: "Warranty & Support | Fivefold Renewable",
  description: "Comprehensive 25-year panel linear performance warranty, inverter warranties, workmanship guarantees, and claim assistance in Odisha.",
  canonical: "/warranty",
});

const WARRANTY_ITEMS = [
  { title: "Solar Panel Linear Performance", duration: "25 Years", desc: "Tier-1 PV module linear power degradation guarantee (≥ 80% output at Year 25)." },
  { title: "Inverter OEM Warranty", duration: "5 - 10 Years", desc: "On-grid solar string inverters covered under OEM repair/replacement contracts." },
  { title: "Installation Workmanship", duration: "5 Years", desc: "Fivefold structural mounting, waterproofing, and cable management guarantee." },
  { title: "BOS Components Warranty", duration: "3 - 5 Years", desc: "Balance of System (AC/DC distribution boxes, protection relays, cables)." },
  { title: "Warranty Claim Assistance", duration: "Dedicated Service", desc: "Fivefold handles all RMA filing and manufacturer factory testing paperwork." },
  { title: "Technical Helpline Support", duration: "Mon - Sat", desc: "Dedicated telephone & on-site engineering team for fault diagnosis." },
];

export default function WarrantyPage() {
  return (
    <div className="pt-28 pb-16 lg:pt-36 lg:pb-24 bg-white min-h-screen">
      <Container>
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold uppercase tracking-wider">
            <ShieldCheck className="h-4 w-4 text-emerald-700" />
            <span>Asset Protection & Peace of Mind</span>
          </div>
          <h1 className="font-heading text-3xl sm:text-5xl font-extrabold text-slate-900">
            Warranty & Support Framework
          </h1>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            Every solar power plant engineered by Fivefold is backed by Tier-1 OEM component warranties and Fivefold workmanship assurance.
          </p>
        </div>

        {/* Warranty Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-16">
          {WARRANTY_ITEMS.map((item) => (
            <div key={item.title} className="p-6 rounded-2xl border border-slate-200 bg-slate-50 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold uppercase text-brand-green">
                  {item.duration}
                </span>
                <CheckCircle2 className="h-4 w-4 text-brand-green" />
              </div>
              <h3 className="font-heading text-lg font-bold text-slate-900">
                {item.title}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Claim Support Banner */}
        <div className="p-8 rounded-2xl bg-slate-900 text-white flex flex-col md:flex-row items-center justify-between gap-6 border border-slate-800">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="font-heading text-xl sm:text-2xl font-bold text-white">
              Need Warranty Assistance or On-Site Diagnostics?
            </h3>
            <p className="text-xs text-slate-300">
              Our engineering support desk assists existing solar system owners with diagnostics and component claims.
            </p>
          </div>
          <Button href="/contact" variant="primary" size="md" className="shrink-0">
            <PhoneCall className="mr-2 h-4 w-4" />
            <span>Contact Support Desk</span>
          </Button>
        </div>
      </Container>
    </div>
  );
}
