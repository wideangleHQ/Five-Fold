import React from "react";
import { Metadata } from "next";
import { Home, ShieldCheck, Zap, ArrowRight, CheckCircle2, FileText, Calculator } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { constructMetadata } from "@/lib/seo";

export const metadata: Metadata = constructMetadata({
  title: "Residential Rooftop Solar Solutions | Fivefold Renewable",
  description: "Bankable rooftop solar systems for homes in Odisha with PM Surya Ghar subsidy assistance, DISCOM net metering, and 25-year performance engineering.",
  canonical: "/residential-solar",
});

const RESIDENTIAL_STEPS = [
  { title: "Site & Roof Assessment", desc: "Detailed shadow analysis and RCC roof structural verification." },
  { title: "System Engineering", desc: "Tier-1 Mono PERC panels & string inverter matching." },
  { title: "PM Surya Ghar Assistance", desc: "Complete portal documentation & subsidy claim filing." },
  { title: "DISCOM Net Metering", desc: "Bi-directional grid meter testing and DISCOM approval." },
  { title: "Turnkey Installation", desc: "Hot-dip galvanized mounting structures & wind-load safety." },
  { title: "Commissioning & Support", desc: "Plant synchronization, mobile monitoring & SolarCare AMC." },
];

export default function ResidentialSolarPage() {
  return (
    <div className="pt-28 pb-16 lg:pt-36 lg:pb-24 bg-white min-h-screen">
      <Container>
        {/* Hero */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-green/10 text-brand-green text-xs font-semibold uppercase tracking-wider">
            <Home className="h-4 w-4" />
            <span>Home Solar Power</span>
          </div>
          <h1 className="font-heading text-3xl sm:text-5xl font-extrabold text-slate-900">
            Residential Solar Solutions
          </h1>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            Eliminate up to 90% of your monthly household electricity bills with bankable rooftop solar engineering, DISCOM net metering, and PM Surya Ghar subsidy guidance.
          </p>
          <div className="pt-2 flex justify-center">
            <Button href="/solar-calculator" variant="primary" size="lg">
              <Calculator className="mr-2 h-5 w-5 text-brand-amber" />
              <span>Calculate My Home Solar Requirement</span>
            </Button>
          </div>
        </div>

        {/* Core Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {RESIDENTIAL_STEPS.map((step, idx) => (
            <div key={step.title} className="p-6 rounded-2xl border border-slate-200 bg-slate-50 space-y-2">
              <div className="text-xs font-mono font-bold text-brand-green uppercase">
                Phase 0{idx + 1}
              </div>
              <h3 className="font-heading text-lg font-bold text-slate-900">
                {step.title}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {step.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Subsidy Highlight Banner */}
        <div className="p-8 rounded-2xl bg-slate-900 text-white flex flex-col md:flex-row items-center justify-between gap-6 border border-slate-800">
          <div className="space-y-2 text-center md:text-left">
            <div className="text-xs font-mono font-bold uppercase text-emerald-400">
              Government Financial Support
            </div>
            <h3 className="font-heading text-2xl font-bold text-white">
              Get Up to ₹78,000 Direct PM Surya Ghar Subsidy
            </h3>
            <p className="text-xs text-slate-300">
              Fivefold handles all portal filings and DISCOM approvals so your subsidy is safely credited.
            </p>
          </div>
          <Button href="/government-schemes" variant="amber" size="md" className="shrink-0">
            <span>Check Scheme Eligibility</span>
          </Button>
        </div>
      </Container>
    </div>
  );
}
