import React from "react";
import { Metadata } from "next";
import { Building2, TrendingUp, ShieldCheck, ArrowRight, Calculator, CheckCircle2 } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { constructMetadata } from "@/lib/seo";

export const metadata: Metadata = constructMetadata({
  title: "Commercial Solar Solutions | Fivefold Renewable",
  description: "Bankable rooftop solar solutions for offices, hotels, hospitals, and retail hubs in Odisha. 40% Accelerated Depreciation & low OPEX.",
  canonical: "/commercial-solar",
});

const COMMERCIAL_NARRATIVE = [
  { step: "01", title: "Energy Requirement", desc: "Analysis of monthly daytime load profile and tariff slabs." },
  { step: "02", title: "Available Space", desc: "3D shade modeling & roof structural load verification." },
  { step: "03", title: "System Design", desc: "PVsyst yield simulation and zero-export controller integration." },
  { step: "04", title: "Investment & Returns", desc: "Financial modeling with 40% Accelerated Depreciation tax benefits." },
  { step: "05", title: "Generation Performance", desc: "Guaranteed annual generation & SCADA remote monitoring." },
  { step: "06", title: "Long-Term Value", desc: "3-5 year payback period with 25+ years of clean power." },
];

export default function CommercialSolarPage() {
  return (
    <div className="pt-28 pb-16 lg:pt-36 lg:pb-24 bg-white min-h-screen">
      <Container>
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 text-white text-xs font-semibold uppercase tracking-wider">
            <Building2 className="h-4 w-4 text-emerald-400" />
            <span>Commercial Energy Optimization</span>
          </div>
          <h1 className="font-heading text-3xl sm:text-5xl font-extrabold text-slate-900">
            Commercial Solar Solutions
          </h1>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            Turn unused roof space on offices, hotels, hospitals, retail centers, and educational campuses into high-yield energy generating assets.
          </p>
          <div className="pt-2 flex justify-center">
            <Button href="/contact" variant="primary" size="lg">
              <span>Plan Solar for My Business</span>
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Commercial Decision Flow */}
        <div className="mb-16 space-y-6">
          <h2 className="font-heading text-2xl font-bold text-slate-900 text-center">
            Commercial Implementation Journey
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {COMMERCIAL_NARRATIVE.map((item) => (
              <div key={item.step} className="p-6 rounded-2xl border border-slate-200 bg-slate-50 space-y-2">
                <div className="text-xs font-mono font-bold text-slate-400">
                  STEP {item.step}
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
        </div>

        {/* Commercial Segments */}
        <div className="p-8 rounded-2xl bg-slate-900 text-white border border-slate-800 space-y-6">
          <h3 className="font-heading text-xl font-bold text-white text-center">
            Target Commercial Sectors Serviced
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-center text-xs">
            {["Corporate Offices", "Retail Malls", "Hotels & Resorts", "Hospitals & Clinics", "Educational Institutions", "Commercial Buildings"].map((sec) => (
              <div key={sec} className="p-4 rounded-xl bg-slate-800 border border-slate-700 font-bold text-slate-200">
                {sec}
              </div>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
}
