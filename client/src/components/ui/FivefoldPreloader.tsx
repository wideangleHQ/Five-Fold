"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import logoImg from "@/assets/Images/Logos/Five_Fold_White.png";

const PANEL_COUNT = 10;

export const FivefoldPreloader: React.FC = () => {
  const rootRef = useRef<HTMLDivElement>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      const finish = () => setDone(true);

      if (reduced) {
        gsap.set(".ff-brand-container", { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" });
        gsap.to(rootRef.current, { opacity: 0, duration: 0.3, delay: 0.45, onComplete: finish });
        return;
      }

      gsap.set(".ff-brand-container", { opacity: 0, y: 20, scale: 0.98, filter: "blur(8px)" });
      gsap.set(".ff-progress", { width: "0%" });

      gsap
        .timeline({ onComplete: finish })
        .to(
          ".ff-brand-container",
          { opacity: 1, y: 0, scale: 1, filter: "blur(0px)", duration: 0.5, ease: "power3.out" },
          0.1,
        )
        .to(
          ".ff-progress",
          { width: "100%", duration: 0.7, ease: "power2.inOut" },
          "-=0.1"
        )
        .to(
          ".ff-brand-container",
          { opacity: 0, y: -8, scale: 0.985, filter: "blur(8px)", duration: 0.35, ease: "power3.inOut" },
          "+=0.1",
        )
        .to(
          ".ff-panel",
          { yPercent: -100, duration: 0.55, ease: "power3.inOut", stagger: 0.04 },
          "-=0.05",
        );
    }, rootRef);

    return () => ctx.kill();
  }, []);

  if (done) return null;

  return (
    <div
      ref={rootRef}
      data-ff-preloader
      aria-hidden="true"
      className="fixed inset-0 z-[9999] overflow-hidden pointer-events-none select-none"
    >
      <div className="absolute inset-0 flex">
        {Array.from({ length: PANEL_COUNT }, (_, i) => (
          <div key={i} className="ff-panel flex-1 -mr-px bg-[#173B53] will-change-transform" />
        ))}
      </div>

      <div className="absolute inset-0 flex items-center justify-center px-6">
        <div
          className="ff-brand-container flex flex-col items-center justify-center will-change-transform space-y-6"
          style={{ opacity: 0 }}
        >
          <Image
            src={logoImg}
            alt="Fivefold Renewable"
            priority
            className="w-auto h-12 sm:h-16 md:h-20 max-w-[260px] sm:max-w-[340px] md:max-w-[420px] object-contain drop-shadow-sm"
          />
          {/* Progress Bar Container */}
          <div className="w-48 sm:w-64 h-1 bg-white/20 rounded-full overflow-hidden">
            <div className="ff-progress h-full bg-[#1684C7] w-0" />
          </div>
        </div>
      </div>
    </div>
  );
};
