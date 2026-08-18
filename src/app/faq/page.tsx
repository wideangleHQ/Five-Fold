import React from "react";
import { Metadata } from "next";
import { HelpCircle, ShieldCheck } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Accordion } from "@/components/ui/Accordion";
import { FAQS_DATA } from "@/data/faqs";
import { constructMetadata } from "@/lib/seo";

export const metadata: Metadata = constructMetadata({
  title: "Frequently Asked Questions | Fivefold Renewable",
  description: "Get answers about solar installation timelines, PM Surya Ghar subsidy, net metering, cloudy weather generation, and SolarCare maintenance.",
  canonical: "/faq",
});

export default function FaqPage() {
  return (
    <div className="pt-28 pb-16 lg:pt-36 lg:pb-24 bg-white min-h-screen">
      <Container>
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-800 text-xs font-semibold uppercase tracking-wider">
            <HelpCircle className="h-4 w-4 text-brand-green" />
            <span>Knowledge Base & Support</span>
          </div>
          <h1 className="font-heading text-3xl sm:text-5xl font-extrabold text-slate-900">
            Frequently Asked Questions
          </h1>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            Everything you need to know about rooftop solar sizing, subsidies, DISCOM approvals, weather impact, and long-term maintenance.
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="max-w-3xl mx-auto bg-slate-50 p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs">
          <Accordion items={FAQS_DATA} allowMultiple />
        </div>
      </Container>
    </div>
  );
}
