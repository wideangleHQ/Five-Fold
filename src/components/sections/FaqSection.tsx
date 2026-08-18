"use client";

import React from "react";
import { Container } from "@/components/ui/Container";
import { Accordion } from "@/components/ui/Accordion";
import { FAQS_DATA } from "@/data/faqs";
import { HelpCircle } from "lucide-react";

export const FaqSection: React.FC = () => {
  return (
    <section id="faq" className="py-20 sm:py-24 bg-brand-off-white text-brand-charcoal">
      <Container>
        <div className="max-w-3xl mx-auto text-center mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full bg-brand-green/10 border border-brand-green/20 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-brand-green">
            <HelpCircle className="h-4 w-4" />
            Clear Answers
          </div>

          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-brand-charcoal tracking-tight">
            Frequently Asked Questions
          </h2>

          <p className="text-slate-600 text-base sm:text-lg">
            Everything you need to know about rooftop solar engineering, DISCOM net metering, government schemes, and long-term maintenance.
          </p>
        </div>

        <div className="max-w-4xl mx-auto bg-white p-6 sm:p-10 rounded-2xl border border-slate-200 shadow-sm">
          <Accordion items={FAQS_DATA} />
        </div>
      </Container>
    </section>
  );
};
