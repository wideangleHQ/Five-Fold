"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

/** Figures match the About page and project documentation (800+ MW = cumulative design, engineering and consultation). */
export const TRUST_METRICS = [
  { value: "10+", unit: "", label: "Years of Experience" },
  { value: "20+", unit: "MW", label: "Installed Capacity" },
  { value: "30+", unit: "", label: "Projects Delivered" },
  { value: "800+", unit: "MW", label: "Engineering Experience" },
  { value: "10+", unit: "States", label: "Engineering Reach Across India" },
] as const;

// Mobile: 2 columns (5th spans both). lg+: one row of five with vertical dividers.
const CELL_BORDERS = [
  "border-b border-r lg:border-b-0 lg:border-r-0 lg:border-l-0",
  "border-b lg:border-b-0 lg:border-l",
  "border-b border-r lg:border-b-0 lg:border-r-0 lg:border-l",
  "border-b lg:border-b-0 lg:border-l",
  "col-span-2 lg:col-span-1 lg:border-l",
];

/** Counts 0 -> target once when scrolled into view; the server-rendered text is the final value. */
const CountUp: React.FC<{ value: string; delay: number }> = ({ value, delay }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const target = parseInt(value, 10);
  const suffix = value.replace(/^\d+/, "");

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    el.textContent = `0${suffix}`;
    const counter = { n: 0 };
    let tween: gsap.core.Tween | undefined;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        tween = gsap.to(counter, {
          n: target,
          duration: 1.6,
          delay,
          ease: "power2.out",
          onUpdate: () => { el.textContent = `${Math.round(counter.n)}${suffix}`; },
        });
      },
      { rootMargin: "0px 0px -15% 0px" },
    );
    io.observe(el);

    return () => {
      io.disconnect();
      tween?.kill();
    };
  }, [target, suffix, delay]);

  return (
    <span ref={ref} className="inline-block text-left tabular-nums" style={{ minWidth: `${value.length}ch` }}>
      {value}
    </span>
  );
};

export const TrustMetrics: React.FC = () => {
  return (
    <section aria-label="Fivefold in numbers" className="bg-[#F6F3EC] text-[#173B53] font-sans">
      <div className="w-full max-w-7xl lg:max-w-[1780px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <ul
          data-reveal="cards-container"
          className="grid grid-cols-2 lg:grid-cols-5 border-y border-[#DCE2E2] list-none"
        >
          {TRUST_METRICS.map((m, i) => (
            <li
              key={m.label}
              data-reveal="card"
              className={`px-4 py-6 sm:px-6 sm:py-7 lg:px-6 xl:px-8 lg:py-9 border-[#DCE2E2] ${CELL_BORDERS[i]}`}
            >
              <p className="font-heading font-extrabold tracking-tight leading-none text-[#173B53] text-4xl sm:text-5xl xl:text-6xl">
                <CountUp value={m.value} delay={i * 0.08} />
                {m.unit && (
                  <span className="ml-1.5 align-baseline leading-[0] text-base sm:text-lg xl:text-xl font-bold text-[#1684C7] tracking-normal">
                    {m.unit}
                  </span>
                )}
              </p>
              <p className="mt-2.5 text-xs sm:text-sm font-medium text-[#526673] leading-snug">
                {m.label}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
