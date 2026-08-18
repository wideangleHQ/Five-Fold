import React from "react";
import { Metadata } from "next";
import { ShieldCheck, CheckCircle2, FileText, Landmark, ArrowRight, HelpCircle } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { constructMetadata } from "@/lib/seo";

export const metadata: Metadata = constructMetadata({
  title: "Government Solar Schemes & Subsidies | Fivefold Renewable",
  description: "Discover PM Surya Ghar Muft Bijli Yojana, RTS Phase II, and DISCOM Net Metering assistance for residential and commercial solar in Odisha.",
  canonical: "/government-schemes",
});

export default function GovernmentSchemesPage() {
  return (
    <div className="pt-28 pb-16 lg:pt-36 lg:pb-24 bg-white min-h-screen">
      <Container>
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold uppercase tracking-wider">
            <ShieldCheck className="h-4 w-4 text-emerald-700" />
            <span>Government Assistance & Subsidies</span>
          </div>
          <h1 className="font-heading text-3xl sm:text-5xl font-extrabold text-slate-900">
            Government Scheme Discovery
          </h1>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            Fivefold assists customers with complete documentation, DISCOM net metering applications, and subsidy disbursal tracking under central and state renewable schemes.
          </p>
        </div>

        {/* Featured Schemes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {/* PM Surya Ghar */}
          <div className="p-8 rounded-2xl border border-slate-200 bg-slate-50 space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold uppercase text-brand-green px-2.5 py-1 rounded-md bg-brand-green/10">
                  Residential Scheme
                </span>
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                  PM Surya Ghar
                </span>
              </div>
              <h2 className="font-heading text-2xl font-bold text-slate-900">
                PM Surya Ghar: Muft Bijli Yojana
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                Central government flagship rooftop solar scheme providing financial assistance to residential households across Odisha.
              </p>
              <div className="space-y-2 pt-2 border-t border-slate-200">
                <div className="text-xs font-bold text-slate-900">Subsidy Slab Structure:</div>
                <ul className="text-xs text-slate-600 space-y-1 list-disc list-inside">
                  <li><strong>Up to 2 kW:</strong> ₹30,000 per kW (Up to ₹60,000)</li>
                  <li><strong>3 kW & Above:</strong> Fixed ₹78,000 maximum direct subsidy</li>
                  <li><strong>Housing Societies / RWA:</strong> ₹18,000 per kW (Up to 500 kW)</li>
                </ul>
              </div>
            </div>
            <Button href="/contact" variant="primary" size="md">
              <span>Apply with Fivefold Assistance</span>
            </Button>
          </div>

          {/* C&I Schemes */}
          <div className="p-8 rounded-2xl border border-slate-200 bg-slate-50 space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold uppercase text-slate-700 px-2.5 py-1 rounded-md bg-slate-200">
                  Commercial & Industrial
                </span>
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-slate-200 text-slate-800">
                  Tax & Open Access
                </span>
              </div>
              <h2 className="font-heading text-2xl font-bold text-slate-900">
                C&I Tax Benefits & Net Metering
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                Industrial and commercial enterprises benefit from accelerated depreciation and DISCOM grid-export approvals.
              </p>
              <div className="space-y-2 pt-2 border-t border-slate-200">
                <div className="text-xs font-bold text-slate-900">Core Benefits:</div>
                <ul className="text-xs text-slate-600 space-y-1 list-disc list-inside">
                  <li><strong>40% Accelerated Depreciation:</strong> Significant income tax relief</li>
                  <li><strong>GST Input Tax Credit:</strong> Standard GST offset for commercial assets</li>
                  <li><strong>DISCOM Net Metering:</strong> Banking surplus solar energy into the grid</li>
                </ul>
              </div>
            </div>
            <Button href="/contact" variant="secondary" size="md">
              <span>Discuss Commercial Project</span>
            </Button>
          </div>
        </div>

        {/* Fivefold Assistance Process */}
        <div className="p-8 rounded-2xl bg-slate-900 text-white border border-slate-800 space-y-6">
          <div className="max-w-2xl space-y-2">
            <div className="text-xs font-mono font-bold uppercase text-emerald-400">
              End-to-End Execution
            </div>
            <h3 className="font-heading text-2xl font-bold text-white">
              How Fivefold Handles Government Scheme Process
            </h3>
            <p className="text-xs text-slate-300">
              We handle the entire administrative and technical lifecycle so you don&apos;t have to deal with DISCOM paperwork.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs pt-4 border-t border-slate-800">
            <div className="space-y-1">
              <div className="font-bold text-emerald-400">1. Feasibility</div>
              <div className="text-slate-300">Technical roof verification & transformer load check.</div>
            </div>
            <div className="space-y-1">
              <div className="font-bold text-emerald-400">2. Application</div>
              <div className="text-slate-300">Portal submission & DISCOM registration.</div>
            </div>
            <div className="space-y-1">
              <div className="font-bold text-emerald-400">3. Net Metering</div>
              <div className="text-slate-300">Bidirectional meter installation & testing.</div>
            </div>
            <div className="space-y-1">
              <div className="font-bold text-emerald-400">4. Subsidy Claim</div>
              <div className="text-slate-300">PCR submission for direct bank disbursal.</div>
            </div>
          </div>
        </div>

        {/* Mandatory Disclaimer */}
        <div className="mt-8 p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs space-y-1">
          <div className="font-bold text-amber-950">Important Notice</div>
          <p className="text-amber-800 leading-relaxed">
            Final eligibility, subsidy disbursal amounts, and scheme guidelines remain subject to prevailing government policies, ministry notifications, and DISCOM technical approvals.
          </p>
        </div>
      </Container>
    </div>
  );
}
