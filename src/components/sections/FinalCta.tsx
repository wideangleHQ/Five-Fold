"use client";

import React from "react";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { PhoneCall } from "lucide-react";
import heroBg from "@/assets/Images/hero section background.png";

export const FinalCta: React.FC = () => {
  return (
    <section className="bg-white py-3 sm:py-4 font-sans relative z-10">
      <div className="w-full max-w-[1840px] mx-auto px-1 sm:px-2">
        <div className="relative rounded-[2.5rem] sm:rounded-[3.5rem] bg-[#0C3046] text-white overflow-hidden shadow-2xl border border-sky-900/60 py-20 sm:py-28 lg:py-32">

          {/* Background image */}
          <div className="absolute inset-0 z-0">
            <Image
              src={heroBg}
              alt="Solar installation"
              fill
              sizes="100vw"
              className="object-cover object-center opacity-20"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#0C3046]/40 to-[#0C3046]/90" />
          </div>

          <Container className="relative z-10 text-center max-w-3xl mx-auto space-y-8">
            <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.05]">
              Let&apos;s build your solar future.
            </h2>

            <p className="font-sans text-slate-300 text-sm sm:text-base lg:text-lg max-w-xl mx-auto leading-relaxed">
              Talk to our solar engineers about your project.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              <Button
                href="/contact"
                variant="primary"
                className="w-full sm:w-auto bg-white hover:bg-slate-100 text-[#0C3046] px-8 py-4 text-sm font-sans font-semibold rounded-lg shadow-md transition-all"
              >
                <span>Get a Free Consultation</span>
              </Button>

              <a
                href="tel:+917008101078"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg border border-white/30 hover:border-white/60 text-white font-sans text-sm font-semibold transition-all"
              >
                <PhoneCall className="h-4 w-4 text-[#00A9D6]" />
                <span>+91 70081 01078</span>
              </a>
            </div>
          </Container>

        </div>
      </div>
    </section>
  );
};
