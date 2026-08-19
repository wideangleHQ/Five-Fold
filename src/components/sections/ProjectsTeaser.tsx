"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { getPublishedProjects, ProjectCategory } from "@/data/projects";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

// Import approved local image assets
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
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: -340, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: 340, behavior: "smooth" });
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;
    if (diff > 50) {
      scrollRight();
    } else if (diff < -50) {
      scrollLeft();
    }
    touchStartX.current = null;
  };

  return (
    <section className="py-16 sm:py-24 bg-white text-[#111615] font-sans select-none border-t border-b border-slate-200 font-sans">
      <Container>
        {/* 1. EDITORIAL SECTION HEADER (Light Theme) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-end mb-10 sm:mb-12">
          {/* Header Left */}
          <div className="lg:col-span-7 space-y-2">
            <span className="text-xs font-sans font-semibold uppercase tracking-wider text-[#1F7A45] block">
              Our Work
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#111615] tracking-tight leading-[1.15]">
              Real Projects. Measurable Impact.
            </h2>
          </div>

          {/* Header Right */}
          <div className="lg:col-span-5 space-y-4">
            <p className="font-sans text-slate-600 text-sm sm:text-base leading-relaxed">
              Explore how we&apos;ve helped businesses across Odisha reduce energy costs and transition to clean, reliable solar power.
            </p>
          </div>
        </div>

        {/* Filter Categories Bar */}
        <div className="flex items-center justify-between gap-4 mb-8">
          <div className="flex flex-wrap items-center gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  "px-3.5 py-1.5 text-xs font-sans font-semibold rounded-full border transition-all duration-200 focus:outline-none",
                  activeCategory === cat
                    ? "bg-[#1F7A45] text-white border-[#1F7A45] shadow-xs"
                    : "bg-[#F7F8F5] text-slate-700 border-slate-200 hover:border-slate-300 hover:text-slate-900"
                )}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Subtle Slider Navigation Controls */}
          <div className="hidden sm:flex items-center gap-2">
            <button
              type="button"
              onClick={scrollLeft}
              aria-label="Previous Projects"
              className="w-9 h-9 rounded-full border border-slate-200 bg-white text-slate-700 hover:bg-[#1F7A45] hover:border-[#1F7A45] hover:text-white flex items-center justify-center transition-all focus:outline-none shadow-xs"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={scrollRight}
              aria-label="Next Projects"
              className="w-9 h-9 rounded-full border border-slate-200 bg-white text-slate-700 hover:bg-[#1F7A45] hover:border-[#1F7A45] hover:text-white flex items-center justify-center transition-all focus:outline-none shadow-xs"
            >
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* 2. HORIZONTAL PROPORTIONAL CARD SLIDER (Light Theme) */}
        <div
          ref={sliderRef}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          className="flex gap-4 sm:gap-6 overflow-x-auto pb-6 scrollbar-none snap-x snap-mandatory cursor-grab active:cursor-grabbing select-none"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {publishedProjects.map((project, idx) => {
            const projectImg = LOCAL_IMAGES[idx % LOCAL_IMAGES.length];

            return (
              <div
                key={project.id}
                className="w-[84%] sm:w-[46%] lg:w-[31%] xl:w-[24%] flex-shrink-0 snap-start flex flex-col rounded-2xl sm:rounded-3xl overflow-hidden bg-white border border-slate-200 hover:border-slate-300 hover:shadow-lg transition-all duration-300 group"
                style={{ aspectRatio: "3 / 4.15" }}
              >
                {/* Tall Image Area (~68% height) */}
                <div className="relative w-full h-[68%] bg-slate-100 overflow-hidden">
                  <Image
                    src={projectImg}
                    alt={project.name}
                    fill
                    sizes="(max-width: 640px) 85vw, (max-width: 1024px) 46vw, 25vw"
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  />
                </div>

                {/* Solid Bottom Information Panel (Light) */}
                <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between bg-white text-[#111615]">
                  <div className="space-y-2">
                    <div>
                      <span className="inline-block px-3 py-1 rounded-full text-[11px] font-sans font-semibold bg-emerald-50 text-[#1F7A45] border border-emerald-200/80">
                        {project.category}
                      </span>
                    </div>

                    <h3 className="font-heading text-lg sm:text-xl font-bold text-[#111615] tracking-tight leading-snug line-clamp-1">
                      {project.name}
                    </h3>

                    <p className="font-sans text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-2">
                      {project.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* 3. MINIMAL CTA BUTTON */}
        <div className="pt-8 text-center">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl bg-[#1F7A45] hover:bg-[#165c33] text-white text-xs sm:text-sm font-sans font-semibold transition-all shadow-md"
          >
            <span>View All Projects</span>
          </Link>
        </div>
      </Container>
    </section>
  );
};


