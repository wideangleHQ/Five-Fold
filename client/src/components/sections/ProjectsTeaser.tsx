"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { getPublishedProjects, ProjectCategory } from "@/data/projects";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

import stock1Img from "@/assets/Images/Five_Fold_stock_1.png";
import stock2Img from "@/assets/Images/Five_fold_stock_2.png";
import heroBgImg from "@/assets/Images/hero section background.png";
import skyImg from "@/assets/Images/Five_fold_sky.png";

const LOCAL_IMAGES = [heroBgImg, stock2Img, stock1Img, skyImg];

const CATEGORIES: (ProjectCategory | "All")[] = [
  "All",
  "Industrial",
  "Commercial",
  "Institutional",
  "Government",
];

export const ProjectsTeaser: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory | "All">("All");
  const sliderRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number | null>(null);

  const publishedProjects = getPublishedProjects(activeCategory);

  const scrollLeft = () => {
    sliderRef.current?.scrollBy({ left: -380, behavior: "smooth" });
  };

  const scrollRight = () => {
    sliderRef.current?.scrollBy({ left: 380, behavior: "smooth" });
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (diff > 50) scrollRight();
    else if (diff < -50) scrollLeft();
    touchStartX.current = null;
  };

  return (
    <section className="py-12 sm:py-16 lg:py-6 lg:min-h-[100svh] flex flex-col justify-center bg-white text-[#173B53] font-sans">
      <div className="w-full max-w-7xl lg:max-w-[1780px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-6 sm:py-8">

        {/* Header */}
        <div data-reveal="text" className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6 sm:mb-8">
          <div className="space-y-1.5">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#1684C7] block">
              • PORTFOLIO
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#173B53] tracking-tight leading-[1.1]">
              Real Projects. Measurable Impact.
            </h2>
          </div>
          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={scrollLeft}
              aria-label="Previous"
              className="w-9 h-9 rounded-full border border-[#DCE2E2] bg-white text-[#526673] hover:bg-[#173B53] hover:border-[#173B53] hover:text-white flex items-center justify-center transition-all shadow-sm"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={scrollRight}
              aria-label="Next"
              className="w-9 h-9 rounded-full border border-[#DCE2E2] bg-white text-[#526673] hover:bg-[#173B53] hover:border-[#173B53] hover:text-white flex items-center justify-center transition-all shadow-sm"
            >
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Category filter */}
        <div className="flex flex-wrap items-center gap-2 mb-6">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className={cn(
                "px-3.5 py-1.5 text-xs font-sans font-semibold rounded-full border transition-all focus:outline-none",
                activeCategory === cat
                  ? "bg-[#173B53] text-white border-[#173B53] shadow-sm"
                  : "bg-white text-[#526673] border-[#DCE2E2] hover:border-[#173B53]/40"
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Image-dominant card slider */}
        <div
          ref={sliderRef}
          data-reveal="cards-container"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          className="flex gap-4 sm:gap-5 overflow-x-auto pb-4 scrollbar-none snap-x snap-mandatory"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {publishedProjects.map((project, idx) => {
            const projectImg = LOCAL_IMAGES[idx % LOCAL_IMAGES.length];
            return (
              <div
                key={project.id}
                data-reveal="card"
                className="w-[78%] sm:w-[42%] lg:w-[29%] xl:w-[23%] flex-shrink-0 snap-start group"
              >
                {/* Large image - 80% of visual weight */}
                <div className="relative w-full aspect-[3/4] max-h-[46vh] xl:max-h-[50vh] rounded-xl overflow-hidden bg-[#173B53] border border-[#DCE2E2]">
                  <Image
                    src={projectImg}
                    alt={project.name}
                    fill
                    sizes="(max-width: 640px) 80vw, (max-width: 1024px) 44vw, 28vw"
                    className="object-cover object-center group-hover:scale-[1.03] transition-transform duration-700 opacity-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#173B53]/90 via-[#173B53]/20 to-transparent" />

                  {/* Info overlay at image bottom */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 space-y-1">
                    <p className="font-sans text-[10px] font-semibold uppercase tracking-wider text-white/70">
                      {project.category} &bull; {project.location}
                    </p>
                    <h3 className="font-heading text-base sm:text-lg font-bold text-white tracking-tight leading-snug">
                      {project.name}
                    </h3>
                    <p className="font-mono text-sm font-bold text-[#1684C7]">
                      {project.capacity}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="pt-5 flex justify-center sm:justify-start">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#173B53] hover:text-[#1684C7] transition-colors group"
          >
            <span>View all projects</span>
            <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

      </div>
    </section>
  );
};
