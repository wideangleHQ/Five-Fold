"use client";

import React from "react";
import { Container } from "@/components/ui/Container";
import { Accordion } from "@/components/ui/Accordion";
import { FAQS_DATA } from "@/data/faqs";

export const FaqSection: React.FC = () => {
  return (
    <section id="faq" className="py-16 sm:py-24 bg-[#F7F8F5] text-[#111615] border-b border-slate-200 font-sans">
      <Container>
        <div className="max-w-3xl mx-auto text-center mb-12 space-y-3">
          <span className="text-xs font-sans font-semibold uppercase tracking-wider text-[#1F7A45] block">
            Clear Answers
          </span>

          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#111615] tracking-tight leading-tight">
            Frequently Asked Questions
          </h2>

          <p className="font-sans text-slate-600 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            Clear answers about solar, approvals and maintenance.
          </p>
        </div>

        <div className="max-w-4xl mx-auto bg-white p-6 sm:p-10 rounded-2xl border border-slate-200 shadow-xs">
          <Accordion items={FAQS_DATA} />
        </div>
      </Container>
    </section>
  );
};

