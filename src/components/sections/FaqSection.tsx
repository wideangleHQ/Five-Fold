"use client";

import React from "react";
import { Container } from "@/components/ui/Container";
import { Accordion } from "@/components/ui/Accordion";
import { FAQS_DATA } from "@/data/faqs";

export const FaqSection: React.FC = () => {
  return (
    <section id="faq" className="py-16 sm:py-24 bg-[#F7F8F5] text-[#111615] border-b border-slate-200 font-sans">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* LEFT COLUMN: Reference Heading & Contact Note (~40% width) */}
          <div className="lg:col-span-5 space-y-4">
            <span className="text-xs font-sans font-semibold uppercase tracking-wider text-[#1F7A45] block">
              • FAQ
            </span>

            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#111615] tracking-tight leading-[1.12]">
              Frequently Asked Questions
            </h2>

            <p className="font-sans text-slate-600 text-sm sm:text-base leading-relaxed pt-1">
              Clear answers about solar, approvals and maintenance.
            </p>

            <div className="pt-4 space-y-2">
              <span className="text-xs font-sans font-semibold text-[#111615] block">Still have a question?</span>
              <a
                href="/contact"
                className="inline-block px-5 py-2.5 rounded-lg bg-[#111615] hover:bg-[#0B3D2E] text-white text-xs font-sans font-semibold transition-all"
              >
                Contact Us
              </a>
            </div>
          </div>

          {/* RIGHT COLUMN: Clean Numbered Accordion List (~60% width) */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs">
            <Accordion items={FAQS_DATA} />
          </div>
        </div>
      </Container>
    </section>
  );
};

