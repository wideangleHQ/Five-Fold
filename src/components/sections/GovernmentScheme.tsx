"use client";

import React from "react";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { ShieldAlert, CheckCircle2, Award, Building2, ArrowRight } from "lucide-react";

const SCHEME_STEPS = [
  { title: "Eligibility Audit", desc: "Roof ownership verification & DISCOM consumer load compliance check." },
  { title: "Portal Documentation", desc: "Complete assistance with National Rooftop Solar portal filing." },
  { title: "Technical Sizing", desc: "Engineering system design adhering to government technical specifications." },
  { title: "Turnkey Installation", desc: "Execution using empaneled Tier-1 ALMM modules & certified inverters." },
  { title: "DISCOM Net Metering", desc: "Joint inspection, bi-directional meter installation & commissioning." },
];

export const GovernmentScheme: React.FC = () => {
  return (
    <section className="py-16 sm:py-24 bg-white text-[#111615] border-t border-b border-slate-200 font-sans">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column Copy */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-100 border border-emerald-300 px-3.5 py-1.5 text-xs font-sans font-bold uppercase tracking-wider text-emerald-900">
              <Award className="h-4 w-4" />
              Government Scheme Support
            </div>

            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#111615] tracking-tight">
              PM Surya Ghar: Muft Bijli Yojana Facilitation
            </h2>

            <p className="font-sans text-slate-600 text-base sm:text-lg leading-relaxed">
              Fivefold provides complete end-to-end guidance, portal application filing, statutory DISCOM approvals, and compliant rooftop installation under the PM Surya Ghar initiative across Odisha.
            </p>

            {/* Step Highlights */}
            <div className="space-y-3 pt-2">
              {SCHEME_STEPS.map((step, idx) => (
                <div key={idx} className="flex items-start gap-3 p-3 rounded-lg bg-[#F7F8F5] border border-slate-200/80">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#1F7A45] text-white font-sans text-xs font-bold">
                    {idx + 1}
                  </div>
                  <div>
                    <h4 className="font-heading text-sm font-bold text-[#111615]">{step.title}</h4>
                    <p className="font-sans text-xs text-slate-600">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* MANDATORY SUBSIDY DISCLAIMER */}
            <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-start gap-3 font-sans">
              <ShieldAlert className="h-5 w-5 text-amber-700 shrink-0 mt-0.5" />
              <div>
                <strong>Government Guidelines & Subsidy Disclaimer:</strong>
                <p className="mt-1 text-amber-800 leading-relaxed">
                  Subsidy availability, eligible capacity caps, sanction approvals, and disbursement timelines are strictly governed by prevailing Central Government (MNRE) and DISCOM (TPCODL / TPNODL / TPSODL / TPWODL) guidelines. Fivefold facilitates statutory documentation and compliance but does not guarantee third-party government subsidy disbursements.
                </p>
              </div>
            </div>

            <div className="pt-2">
              <Button href="/government-schemes" variant="primary" size="md" className="bg-[#1F7A45] hover:bg-[#165c33]">
                <span>View Full Scheme & Eligibility Guide</span>
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </div>

          {/* Right Column Visual Card */}
          <div className="lg:col-span-5">
            <Card className="p-8 border-emerald-900/40 bg-[#0B3D2E] text-white space-y-6 shadow-xl">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#E9B949] text-[#111615]">
                  <Building2 className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-heading text-xl font-bold text-white">
                    Odisha DISCOM Liaison
                  </h3>
                  <p className="font-sans text-xs text-slate-300">Net Metering & Grid Interconnection</p>
                </div>
              </div>

              <div className="space-y-3 font-sans text-xs text-slate-200">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[#E9B949]" />
                  <span>TPCODL (Central Odisha) Approval Support</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[#E9B949]" />
                  <span>TPNODL (North Odisha) Approval Support</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[#E9B949]" />
                  <span>TPSODL (South Odisha) Approval Support</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[#E9B949]" />
                  <span>TPWODL (Western Odisha) Approval Support</span>
                </div>
              </div>

              <div className="pt-4 border-t border-emerald-800/80 text-center">
                <Button href="/contact" variant="amber" className="w-full bg-[#E9B949] hover:bg-[#d4a234] text-[#111615]">
                  Apply for PM Surya Ghar Guidance
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </Container>
    </section>
  );
};
