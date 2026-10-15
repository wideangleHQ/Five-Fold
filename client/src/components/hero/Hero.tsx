"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import heroBg from "@/assets/Images/Hero Section Bg.png";
import heroBgMobile from "@/assets/Images/Hero Section Bg mobile.png";

const TEXT_SHADOW = "0 1px 14px rgba(23,59,83,0.35)";

export const Hero: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  // Page-load text entrance only. The hero itself is static: no scroll-driven animation.
  useEffect(() => {
    if (!sectionRef.current || !overlayRef.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      const overlay = overlayRef.current!;
      const eyebrow = overlay.querySelector(".hero-eyebrow");
      const heading = overlay.querySelector("h1");
      const paragraph = overlay.querySelector("p");

      if (eyebrow) tl.fromTo(eyebrow, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.7 }, 0.05);
      if (heading) tl.fromTo(heading, { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.8 }, 0.12);
      if (paragraph) tl.fromTo(paragraph, { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.7 }, 0.24);
    }, sectionRef);

    return () => ctx.kill();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[100svh] w-full overflow-hidden bg-[#3d9be9] text-white"
    >
      {/* Mobile Screen Background (< 768px) */}
      <div className="block md:hidden absolute inset-0 z-0">
        <Image
          src={heroBgMobile}
          alt="Solar panels on a green hillside under a clear blue sky"
          fill
          priority
          quality={90}
          sizes="(max-width: 767px) 100vw, 1px"
          className="object-cover object-bottom"
        />
      </div>

      {/* Desktop and Tablet Views Background (>= 768px) */}
      <div className="hidden md:block absolute inset-0 z-0">
        <Image
          src={heroBg}
          alt="Solar panels on a green hillside under a clear blue sky"
          fill
          priority
          quality={90}
          sizes="(min-width: 768px) 100vw, 1px"
          className="object-cover object-[50%_100%] lg:object-center"
        />
      </div>

      <div
        ref={overlayRef}
        className="relative z-10 w-full pt-[calc(4.75rem+env(safe-area-inset-top,0px))] sm:pt-20 md:pt-24 lg:pt-28 xl:pt-32 px-4 sm:px-6 lg:px-8 xl:px-12 text-center"
      >
        <div className="max-w-3xl lg:max-w-4xl mx-auto space-y-2 sm:space-y-3.5">
          <div className="hero-eyebrow">
            <span
              className="font-mono text-[9px] sm:text-xs font-semibold tracking-[0.22em] uppercase text-white/90 block"
              style={{ textShadow: TEXT_SHADOW }}
            >
              ENGINEERING A SUSTAINABLE ODISHA
            </span>
          </div>

          <h1
            className="font-heading text-3xl sm:text-5xl md:text-6xl lg:text-[4rem] font-extrabold tracking-tight leading-[1.08] text-white"
            style={{ textShadow: TEXT_SHADOW }}
          >
            <span className="block whitespace-normal sm:whitespace-nowrap">Invest in Green.</span>{" "}
            <span className="block mt-0.5">Benefit for Life.</span>
          </h1>

          <p
            className="font-sans text-xs sm:text-sm md:text-[0.95rem] text-white/95 font-normal max-w-xs sm:max-w-md md:max-w-xl mx-auto leading-snug sm:leading-relaxed pt-0.5"
            style={{ textShadow: TEXT_SHADOW }}
          >
            Bankable rooftop and megawatt-scale solar engineering, DISCOM net metering, and 25-year performance assurance.
          </p>
        </div>
      </div>
    </section>
  );
};
