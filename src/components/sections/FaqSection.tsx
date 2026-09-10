"use client";

import React from "react";
import { Container } from "@/components/ui/Container";
import { Accordion } from "@/components/ui/Accordion";
import { FAQS_DATA } from "@/data/faqs";

export const FaqSection: React.FC = () => {
  return (
    <section id="faq" className="py-16 sm:py-20 lg:py-0 lg:min-h-[100svh] flex flex-col justify-center bg-white text-[#173B53] font-sans">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">

          {/* Left: heading + contact */}
          <div data-reveal="text" className="lg:col-span-4 space-y-4">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#1684C7] block">
              • FAQ
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#173B53] tracking-tight leading-[1.1]">
              Frequently Asked Questions
            </h2>
            <p className="font-sans text-[#526673] text-sm sm:text-base leading-relaxed">
              Clear answers about solar, approvals and maintenance.
            </p>
            <div className="space-y-2 pt-2">
              <p className="font-sans text-xs font-semibold text-[#173B53]">Still have a question?</p>
              <a
                href="/contact"
                className="inline-block px-5 py-2.5 rounded-lg bg-[#173B53] hover:bg-[#0f2738] text-white text-xs font-sans font-semibold transition-all shadow-sm"
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
