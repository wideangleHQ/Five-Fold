"use client";

import React, { useRef, useEffect, useState } from "react";
import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useReducedMotion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { SchemeModal } from "@/components/schemes/SchemeModal";

import stock1Img from "@/assets/Images/Five_Fold_stock_1.png";
import stock2Img from "@/assets/Images/Five_fold_stock_2.png";
import heroBgImg from "@/assets/Images/hero section background.png";

gsap.registerPlugin(ScrollTrigger);

interface SchemeData {
  id: string;
  num: string;
  name: string;
  descriptor: string;
  ctaHref: string;
  image: StaticImageData;
}

const SCHEMES: SchemeData[] = [
  {
    id: "surya-ghar",
    num: "01",
    name: "PM Surya Ghar",
    descriptor: "Residential subsidy up to Rs 78,000 direct credit",
    ctaHref: "/government-schemes",
    image: stock1Img,
  },
  {
    id: "ci-tax",
    num: "02",
    name: "C&I Tax Benefits",
    descriptor: "40% Accelerated Depreciation for commercial projects",
    ctaHref: "/contact",
    image: stock2Img,
  },
  {
    id: "discom",
    num: "03",
    name: "DISCOM Liaison",
    descriptor: "End-to-end Odisha grid approvals and net metering",
    ctaHref: "/government-schemes",
    image: heroBgImg,
  },
];

function DesktopCard({ scheme }: { scheme: SchemeData }) {
  return (
    <div className="relative rounded-2xl overflow-hidden bg-[#0C3046] w-[80vw] h-[85dvh] shrink-0 group flex flex-col justify-end">
      <Image
        src={scheme.image}
        alt={scheme.name}
        fill
        priority
        sizes="80vw"
        className="object-cover object-center group-hover:scale-[1.03] transition-transform duration-700"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0C3046]/75 via-[#0C3046]/10 to-transparent pointer-events-none" />

      <div className="relative z-10 p-10 xl:p-12 space-y-3">
        <span className="font-mono text-[11px] text-white/40 font-medium tracking-[0.2em] uppercase block">
          {scheme.num}
        </span>
        <h3 className="font-heading text-4xl lg:text-5xl xl:text-6xl font-extrabold text-white tracking-tight leading-[1.05]">
          {scheme.name}
        </h3>
        <p className="font-sans text-sm sm:text-base text-white/65 leading-relaxed max-w-sm">
          {scheme.descriptor}
        </p>
        <div className="pt-3">
          <Link
            href={scheme.ctaHref}
            className="inline-flex items-center gap-2 text-sm font-sans font-semibold text-white/80 hover:text-white transition-colors group/link"
          >
            <span>Explore scheme</span>
            <ArrowRight className="h-4 w-4 group-hover/link:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
}

function MobileCard({ scheme }: { scheme: SchemeData }) {
  return (
    <div className="relative rounded-xl overflow-hidden bg-[#0C3046] w-full aspect-[3/4] flex flex-col justify-end">
      <Image
        src={scheme.image}
        alt={scheme.name}
        fill
        sizes="85vw"
        className="object-cover object-center"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0C3046]/80 via-[#0C3046]/10 to-transparent pointer-events-none" />
      <div className="relative z-10 p-6 space-y-2">
        <span className="font-mono text-[10px] text-white/40 font-medium tracking-[0.2em] uppercase block">
          {scheme.num}
        </span>
        <h3 className="font-heading text-2xl font-extrabold text-white tracking-tight leading-snug">
          {scheme.name}
        </h3>
        <p className="font-sans text-xs text-white/65 leading-relaxed">
          {scheme.descriptor}
        </p>
        <div className="pt-1">
          <Link
            href={scheme.ctaHref}
            className="inline-flex items-center gap-1.5 text-xs font-sans font-semibold text-white/80 hover:text-white transition-colors"
          >
            <span>Explore scheme</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export const GovernmentScheme: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;

    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      const wrap = wrapRef.current;
      const track = trackRef.current;
      if (!wrap || !track) return;

      const ctx = gsap.context(() => {
        const getDistance = () => track.scrollWidth - window.innerWidth;

        gsap.to(track, {
          x: () => -getDistance(),
          ease: "none",
          scrollTrigger: {
            trigger: wrap,
            start: "top top",
            end: () => `+=${getDistance()}`,
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });
      }, wrap);

      return () => ctx.revert();
    });

    return () => mm.revert();
  }, [prefersReducedMotion]);

  return (
    <section className="bg-[#F7F8F5] font-sans border-b border-slate-200/80">

      {/* Section header - normal scroll, above the pin */}
      <Container className="pt-20 sm:pt-28 lg:pt-32 pb-14 sm:pb-16 lg:pb-20">
        <div data-reveal="text" className="space-y-6 max-w-2xl">
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-extrabold text-[#111615] tracking-tight leading-[1.05]">
            Which scheme applies to your project?
          </h2>
          <p className="font-sans text-slate-500 text-sm sm:text-base leading-relaxed max-w-lg">
            Government support and financial incentives designed to make solar accessible.
          </p>
          <Button
            onClick={() => setIsModalOpen(true)}
            variant="primary"
            className="bg-[#20435F] hover:bg-[#0C3046] text-white px-6 py-3 text-sm font-sans font-semibold rounded-lg inline-flex items-center gap-2 transition-all group"
          >
            <span>Check Eligibility</span>
            <ArrowRight className="h-4 w-4 text-[#00A9D6] group-hover:translate-x-0.5 transition-transform" />
          </Button>
        </div>
      </Container>

      {/* Desktop: GSAP horizontal pan */}
      <div
        ref={wrapRef}
        className="relative hidden md:block bg-[#0C3046] overflow-hidden"
      >
        <div
          ref={trackRef}
          className="flex items-center h-[100dvh] pl-[4vw] gap-5"
          style={{ width: "max-content" }}
        >
          {SCHEMES.map((scheme) => (
            <DesktopCard key={scheme.id} scheme={scheme} />
          ))}
          {/* Exit breathing room */}
          <div className="w-[8vw] shrink-0" aria-hidden="true" />
        </div>
      </div>

      {/* Mobile: native horizontal scroll snap */}
      <div className="md:hidden pb-16">
        <div
          className="flex gap-4 overflow-x-auto px-4 sm:px-6 pb-6 snap-x snap-mandatory"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {SCHEMES.map((scheme) => (
            <div key={scheme.id} className="w-[85vw] shrink-0 snap-center">
              <MobileCard scheme={scheme} />
            </div>
          ))}
        </div>
      </div>

      <SchemeModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </section>
  );
};
