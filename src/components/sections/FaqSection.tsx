"use client";

import React from "react";
import { Container } from "@/components/ui/Container";
import { Accordion } from "@/components/ui/Accordion";
import { FAQS_DATA } from "@/data/faqs";

export const FaqSection: React.FC = () => {
  return (
    <section id="faq" className="py-20 sm:py-28 lg:py-32 bg-white text-[#111615] border-b border-slate-200 font-sans">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">

          {/* Left: heading + contact */}
          <div data-reveal="text" className="lg:col-span-4 space-y-6">
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#111615] tracking-tight leading-[1.1]">
              Frequently Asked Questions
            </h2>
            <p className="font-sans text-slate-500 text-sm sm:text-base leading-relaxed">
              Clear answers about solar, approvals and maintenance.
            </p>
            <div className="space-y-2 pt-2">
              <p className="font-sans text-xs font-semibold text-[#111615]">Still have a question?</p>
              <a
                href="/contact"
                className="inline-block px-5 py-2.5 rounded-lg bg-[#111615] hover:bg-[#20435F] text-white text-xs font-sans font-semibold transition-all"
              >
                Contact Us
              </a>
            </div>
          </div>

          {/* Right: clean accordion, no card wrapper */}
          <div data-reveal="card" className="lg:col-span-8">
            <Accordion items={FAQS_DATA} />
          </div>

        </div>
      </Container>
    </section>
  );
};
