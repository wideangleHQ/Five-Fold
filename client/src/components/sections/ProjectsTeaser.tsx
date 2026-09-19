"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { getPublishedProjects, ProjectCategory } from "@/data/projects";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

import commercialImg from "@/assets/Images/Projectts/Commercial · Bhubaneswar, Odisha.png";
import governmentImg from "@/assets/Images/Projectts/Government · Bhadrak, Odisha.png";
import industrialImg from "@/assets/Images/Projectts/Industrial · Kalinganagar, Odisha.png";
import institutionalImg from "@/assets/Images/Projectts/Institutional · Cuttack, Odisha.png";

const CATEGORY_IMAGE_MAP: Record<ProjectCategory, typeof commercialImg> = {
  Industrial: industrialImg,
  Commercial: commercialImg,
  Institutional: institutionalImg,
  Government: governmentImg,
};

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
    <section id="projects" className="py-12 sm:py-16 lg:py-6 lg:min-h-[100svh] flex flex-col justify-center bg-white text-[#173B53] font-sans">
      <div className="w-full max-w-7xl lg:max-w-[1780px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-6 sm:py-8">

        {/* Header */}
        <div data-reveal="group" className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6 sm:mb-8">
          <div className="space-y-1.5">
            <span
              data-reveal="eyebrow"
              className="text-xs font-mono font-bold uppercase tracking-wider text-[#1684C7] block"
            >
              • PORTFOLIO
            </span>
            <h2
              data-reveal="heading"
              className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#173B53] tracking-tight leading-[1.1]"
            >
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

        {/* Project cards with smooth bottom black gradient & overlaid text */}
        <div
          ref={sliderRef}
          data-reveal="cards-container"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          className="flex gap-5 sm:gap-6 overflow-x-auto pb-4 scrollbar-none snap-x snap-mandatory"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {publishedProjects.map((project) => {
            const projectImg = CATEGORY_IMAGE_MAP[project.category] || industrialImg;

            return (
              <div
                key={project.id}
                data-reveal="card"
                className="w-[82%] sm:w-[46%] lg:w-[31%] xl:w-[24%] flex-shrink-0 snap-start group"
              >
                <div className="relative w-full aspect-[3/4] max-h-[50vh] xl:max-h-[54vh] rounded-2xl overflow-hidden bg-slate-900 border border-[#DCE2E2] shadow-sm flex flex-col justify-end">
                  {/* Full background image */}
                  <Image
                    src={projectImg}
                    alt={`${project.name} - ${project.location}`}
                    fill
                    sizes="(max-width: 640px) 85vw, (max-width: 1024px) 46vw, 25vw"
                    className="object-cover object-center group-hover:scale-[1.03] transition-transform duration-700"
                  />

                  {/* Smooth, subtle black gradient at the bottom only */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 via-35% to-transparent pointer-events-none" />

                  {/* Text content overlaid directly at bottom of card */}
                  <div className="relative z-10 p-5 sm:p-6 space-y-1 text-left">
                    <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#00A9D6] block">
                      {project.category} · {project.location}
                    </span>
                    <h3 className="font-heading text-lg sm:text-xl font-extrabold text-white tracking-tight leading-snug">
                      {project.name}
                    </h3>
                    <div className="pt-0.5">
                      <span className="font-mono text-xs sm:text-sm font-bold text-white/90">
                        {project.capacity}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
