"use client";

import React from "react";
import Image from "next/image";
import { GOOGLE_REVIEWS } from "@/data/reviews";

const CARD_HEIGHT = "h-[260px] sm:h-[320px] lg:h-[380px]";

function ReviewTrack({ hidden }: { hidden?: boolean }) {
  return (
    <ul className="flex gap-4 sm:gap-6 pr-4 sm:pr-6 shrink-0" aria-hidden={hidden || undefined}>
      {GOOGLE_REVIEWS.map((r) => (
        <li key={r.id} className={`${CARD_HEIGHT} shrink-0 rounded-2xl overflow-hidden bg-[#25262a]`}>
          <Image
            src={r.image}
            alt={hidden ? "" : r.alt}
            draggable={false}
            sizes="(min-width: 1024px) 640px, 420px"
            className="h-full w-auto max-w-none pointer-events-none select-none"
          />
        </li>
      ))}
    </ul>
  );
}

export const TestimonialsSection: React.FC = () => {
  return (
    <section id="reviews" className="py-12 sm:py-16 lg:py-16 bg-[#F6F3EC] text-[#173B53] font-sans overflow-hidden">
      <div className="w-full max-w-7xl lg:max-w-[1780px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <div data-reveal="group" className="max-w-3xl space-y-3 mb-8 sm:mb-10">
          <span data-reveal="eyebrow" className="text-xs font-mono font-bold uppercase tracking-wider text-[#1684C7] block">
            • CUSTOMER REVIEWS
          </span>
          <h2 data-reveal="heading" className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#173B53] tracking-tight leading-[1.1]">
            What Our Customers Say
          </h2>
          <p data-reveal="paragraph" className="font-sans text-[#526673] text-sm sm:text-base leading-relaxed">
            Feedback from customers who installed solar with Fivefold, as posted on Google.
          </p>
        </div>
      </div>

      <div
        data-reveal="card"
        role="region"
        aria-label="Customer reviews"
        onContextMenu={(e) => e.preventDefault()}
        onDragStart={(e) => e.preventDefault()}
        className="review-marquee-wrap select-none overflow-hidden"
        style={{
          maskImage: "linear-gradient(to right, transparent, black 5%, black 95%, transparent)",
          WebkitMaskImage: "linear-gradient(to right, transparent, black 5%, black 95%, transparent)",
        }}
      >
        <div className="review-marquee flex w-max">
          <ReviewTrack />
          <ReviewTrack hidden />
        </div>
      </div>
    </section>
  );
};
