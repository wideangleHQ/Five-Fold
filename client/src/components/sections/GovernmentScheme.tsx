"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
import Image, { type StaticImageData } from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useReducedMotion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SchemeModal } from "@/components/schemes/SchemeModal";

import pmSuryaGharImg from "@/assets/Images/Goverment Schemes/PM Surya Ghar Yojna.png";
import pmKusumImg from "@/assets/Images/Goverment Schemes/PM Kusum Yojna.png";
import odishaPolicyImg from "@/assets/Images/Goverment Schemes/Odisha Renewable Energy Policy 2022.png";

gsap.registerPlugin(ScrollTrigger);

interface SchemeData {
  id: string;
  num: string;
  name: string;
  category: string;
  descriptor: string;
  ctaHref: string;
  image: StaticImageData;
}

const SCHEMES: SchemeData[] = [
  {
    id: "surya-ghar",
    num: "01",
    name: "PM Surya Ghar: Muft Bijli Yojana",
    category: "Residential Rooftop Scheme",
    descriptor:
      "Direct central DBT subsidy up to ₹78,000 for homes (₹30,000/kW for 1–2 kW, ₹78,000 for ≥3 kW).\nGenerates up to 300 units of free electricity monthly to slash household power bills by up to 90%.\nIncludes collateral-free loans (~7%) with national portal integration and DISCOM net metering.\nFivefold delivers turnkey site feasibility, structural engineering, and fast-track subsidy processing.",
    ctaHref: "/government-schemes",
    image: pmSuryaGharImg,
  },
  {
    id: "pm-kusum",
    num: "02",
    name: "PM-KUSUM Yojana",
    category: "Agricultural & Rural Solar",
    descriptor:
      "Substantial 60% combined government subsidy (30% Central + 30% State) for solar irrigation pumps.\nEmpowers farmers and rural cooperatives to de-dieselize water pumping and eliminate fuel costs.\nEnables steady supplemental income by exporting surplus solar power back to the DISCOM grid.\nSupports 0.5 MW to 2 MW decentralized ground-mount solar plants on fallow agricultural land.",
    ctaHref: "/government-schemes",
    image: pmKusumImg,
  },
  {
    id: "orep-2022",
    num: "03",
    name: "Odisha Renewable Energy Policy 2022",
    category: "Commercial, Industrial & Utility",
    descriptor:
      "State clean energy framework providing 50 paise/unit electricity duty exemption for up to 20 years.\nOffers 50% concession on cross-subsidy and transmission charges for captive & open-access users.\nFeatures 100% land conversion charge reimbursement and single-window clearance via OREDA & GRIDCO.\nFivefold provides end-to-end EPC, CEIG safety approvals, and DISCOM synchronization across Odisha.",
    ctaHref: "/government-schemes",
    image: odishaPolicyImg,
  },
];

export const GovernmentScheme: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const scrollTriggerInstance = useRef<ScrollTrigger | null>(null);
  const mobileSliderRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  // Scroll to slide on desktop via ScrollTrigger
  const goToSlide = useCallback((index: number) => {
    const clampedIndex = Math.max(0, Math.min(SCHEMES.length - 1, index));
    const st = scrollTriggerInstance.current;
    if (st) {
      const totalScroll = st.end - st.start;
      const targetScroll = st.start + (clampedIndex / (SCHEMES.length - 1)) * totalScroll;
      window.scrollTo({
        top: targetScroll,
        behavior: "smooth",
      });
    } else if (mobileSliderRef.current) {
      const container = mobileSliderRef.current;
      const slideWidth = container.clientWidth * 0.85;
      container.scrollTo({
        left: clampedIndex * slideWidth,
        behavior: "smooth",
      });
    }
    setActiveIndex(clampedIndex);
  }, []);

  const handlePrev = () => {
    goToSlide(activeIndex - 1);
  };

  const handleNext = () => {
    goToSlide(activeIndex + 1);
  };

  useEffect(() => {
    if (prefersReducedMotion) return;

    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      const section = sectionRef.current;
      const track = trackRef.current;
      if (!section || !track) return;

      const ctx = gsap.context(() => {
        // Calculate exact horizontal travel distance between first slide centered and last slide centered
        const getDistance = () => {
          const slides = track.querySelectorAll<HTMLElement>(".scheme-slide");
          if (slides.length < 2) return 0;
          const firstSlide = slides[0];
          const lastSlide = slides[slides.length - 1];
          const firstCenter = firstSlide.offsetLeft + firstSlide.offsetWidth / 2;
          const lastCenter = lastSlide.offsetLeft + lastSlide.offsetWidth / 2;
          return lastCenter - firstCenter;
        };

        const totalTravel = getDistance();
        const scrollDistance = Math.max(totalTravel * 1.4, window.innerHeight * 2.2);

        const tween = gsap.to(track, {
          x: () => -getDistance(),
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => `+=${scrollDistance}`,
            pin: true,
            scrub: 1,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              const progress = self.progress;
              const newIndex = Math.min(
                SCHEMES.length - 1,
                Math.round(progress * (SCHEMES.length - 1))
              );
              setActiveIndex(newIndex);
            },
          },
        });

        if (tween.scrollTrigger) {
          scrollTriggerInstance.current = tween.scrollTrigger;
        }
      }, section);

      return () => {
        if (scrollTriggerInstance.current) {
          scrollTriggerInstance.current.kill(true, false);
        }
        ctx.kill();
      };
    });

    return () => {
      mm.revert();
    };
  }, [prefersReducedMotion]);

  return (
    <section
      ref={sectionRef}
      className="bg-white font-sans relative overflow-hidden text-[#173B53]"
    >
      {/* ========================================================================= */}
      {/* DESKTOP & TABLET: PINNED HORIZONTAL EDITORIAL SLIDER (>= 768px)          */}
      {/* ========================================================================= */}
      <div className="hidden md:flex flex-col justify-center gap-5 sm:gap-6 lg:gap-8 h-[100svh] min-h-[660px] max-h-[1080px] py-10 sm:py-12 lg:py-14">
        
        {/* Header: Title on Left, Navigation Arrows on Right */}
        <div className="w-full max-w-7xl lg:max-w-[1780px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 shrink-0">
          <div className="flex items-center justify-between gap-6 pb-2">
            <div className="space-y-1">
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#1684C7] block">
                • FINANCIAL SCHEMES &amp; INCENTIVES
              </span>
              <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#173B53] tracking-tight uppercase leading-[1.08]">
                Which scheme applies to your project?
              </h2>
            </div>

            {/* Navigation Arrows */}
            <div className="flex items-center gap-3 shrink-0">
              <button
                type="button"
                onClick={handlePrev}
                disabled={activeIndex === 0}
                aria-label="Previous scheme"
                className={`w-11 h-11 lg:w-12 lg:h-12 rounded-full border border-[#DCE2E2] bg-white text-[#173B53] flex items-center justify-center transition-all shadow-sm focus:outline-none focus:ring-2 focus:ring-[#1684C7] ${
                  activeIndex === 0
                    ? "opacity-40 cursor-not-allowed"
                    : "hover:bg-[#F6F3EC] hover:border-[#173B53]/40 active:scale-95"
                }`}
              >
                <ArrowLeft className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={handleNext}
                disabled={activeIndex === SCHEMES.length - 1}
                aria-label="Next scheme"
                className={`w-11 h-11 lg:w-12 lg:h-12 rounded-full border border-[#DCE2E2] bg-white text-[#173B53] flex items-center justify-center transition-all shadow-sm focus:outline-none focus:ring-2 focus:ring-[#1684C7] ${
                  activeIndex === SCHEMES.length - 1
                    ? "opacity-40 cursor-not-allowed"
                    : "hover:bg-[#F6F3EC] hover:border-[#173B53]/40 active:scale-95"
                }`}
              >
                <ArrowRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Continuous Horizontal Track with Partial Previous / Next Visibility */}
        <div className="w-full shrink-0 overflow-hidden">
          <div
            ref={trackRef}
            className="flex gap-6 lg:gap-8 will-change-transform items-center"
            style={{
              paddingLeft: "calc((100vw - min(76vw, 1360px)) / 2)",
              paddingRight: "calc((100vw - min(76vw, 1360px)) / 2)",
              width: "max-content",
            }}
          >
            {SCHEMES.map((scheme, idx) => {
              const isActive = activeIndex === idx;
              return (
                <div
                  key={scheme.id}
                  className="scheme-slide w-[78vw] lg:w-[76vw] max-w-[1360px] shrink-0 grid grid-cols-12 gap-4 sm:gap-5 lg:gap-6 h-[52vh] sm:h-[55vh] min-h-[420px] max-h-[560px] transition-opacity duration-300"
                  style={{
                    opacity: isActive ? 1 : 0.85,
                  }}
                >
                  {/* Left: Text Card (Dark Solid Color #173B53) */}
                  <div className="col-span-5 bg-[#173B53] text-white rounded-2xl lg:rounded-3xl p-6 sm:p-7 lg:p-8 flex flex-col justify-between shadow-sm relative overflow-hidden text-left border border-[#173B53]">
                    <div className="space-y-2 sm:space-y-2.5">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-[#1684C7] tracking-[0.2em] uppercase">
                          {scheme.num}
                        </span>
                        <span className="text-[11px] font-mono font-medium text-white/60 uppercase tracking-wider">
                          • {scheme.category}
                        </span>
                      </div>
                      <h3 className="font-heading text-2xl sm:text-3xl lg:text-[2rem] font-extrabold text-white tracking-tight leading-[1.12]">
                        {scheme.name}
                      </h3>
                      <p className="font-sans text-xs sm:text-sm text-white/85 leading-relaxed pt-1 whitespace-pre-line">
                        {scheme.descriptor}
                      </p>
                    </div>

                    {/* Bottom: Minimal Progress Indicator */}
                    <div className="pt-3 space-y-2">
                      <div className="w-full h-1 bg-white/20 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-white rounded-full transition-all duration-500"
                          style={{
                            width: `${((idx + 1) / SCHEMES.length) * 100}%`,
                          }}
                        />
                      </div>
                      <div className="flex items-center justify-between text-[11px] font-mono text-white/60">
                        <span>{scheme.num}</span>
                        <span>0{SCHEMES.length}</span>
                      </div>
                    </div>
                  </div>

                  {/* Right: Large Image Card */}
                  <div className="col-span-7 relative rounded-2xl lg:rounded-3xl overflow-hidden bg-slate-100 shadow-sm border border-[#DCE2E2]/70">
                    <Image
                      src={scheme.image}
                      alt={scheme.name}
                      fill
                      priority
                      sizes="(max-width: 1024px) 60vw, 50vw"
                      className="object-cover object-center"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer Sub-Note & Check Eligibility Action */}
        <div className="w-full max-w-7xl lg:max-w-[1780px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 shrink-0 flex items-center justify-between text-xs font-mono text-[#526673]">
          <div className="tracking-wider text-[#526673]/70">
            SCROLL VERTICALLY OR USE ARROWS TO NAVIGATE SCHEMES
          </div>
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="text-xs font-sans font-semibold text-[#173B53] hover:text-[#1684C7] transition-colors underline underline-offset-4"
          >
            Check eligibility for your rooftop →
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* MOBILE: INTUITIVE TOUCH-FRIENDLY PAIRED SLIDER (< 768px)                   */}
      {/* ========================================================================= */}
      <div className="md:hidden py-14 sm:py-16 px-4 sm:px-6 space-y-4 text-left">
        {/* Mobile Header with Arrows */}
        <div className="flex items-end justify-between gap-4 pb-1">
          <div className="space-y-1">
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#1684C7] block">
              • FINANCIAL SCHEMES
            </span>
            <h2 className="font-heading text-2xl font-extrabold text-[#173B53] tracking-tight uppercase leading-tight">
              Which scheme applies to your project?
            </h2>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous scheme"
              className="w-9 h-9 rounded-full border border-[#DCE2E2] bg-white text-[#173B53] flex items-center justify-center active:bg-slate-100"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              aria-label="Next scheme"
              className="w-9 h-9 rounded-full border border-[#DCE2E2] bg-white text-[#173B53] flex items-center justify-center active:bg-slate-100"
            >
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Mobile Native Snap Track */}
        <div
          ref={mobileSliderRef}
          className="flex gap-4 overflow-x-auto pb-3 pt-1 snap-x snap-mandatory scrollbar-none"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {SCHEMES.map((scheme, idx) => (
            <div
              key={scheme.id}
              className="w-[85vw] shrink-0 snap-center space-y-2.5"
            >
              {/* Text Card */}
              <div className="bg-[#173B53] text-white rounded-2xl p-5 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] font-bold text-[#1684C7] tracking-widest uppercase block">
                    {scheme.num} / 03
                  </span>
                  <span className="text-[10px] font-mono text-white/60 uppercase">
                    {scheme.category}
                  </span>
                </div>
                <h3 className="font-heading text-xl font-bold text-white tracking-tight">
                  {scheme.name}
                </h3>
                <p className="font-sans text-xs text-white/85 leading-relaxed whitespace-pre-line">
                  {scheme.descriptor}
                </p>

                {/* Progress bar */}
                <div className="pt-1.5">
                  <div className="w-full h-1 bg-white/20 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-white rounded-full"
                      style={{
                        width: `${((idx + 1) / SCHEMES.length) * 100}%`,
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Image Card */}
              <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden bg-slate-100 border border-[#DCE2E2]">
                <Image
                  src={scheme.image}
                  alt={scheme.name}
                  fill
                  sizes="85vw"
                  className="object-cover object-center"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Modal Trigger */}
        <div className="pt-1">
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="w-full py-3 bg-[#173B53] text-white text-xs font-sans font-semibold rounded-xl text-center shadow-sm"
          >
            Check Scheme Eligibility
          </button>
        </div>
      </div>

      <SchemeModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </section>
  );
};
