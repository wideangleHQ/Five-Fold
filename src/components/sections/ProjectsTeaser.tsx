"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { getPublishedProjects, ProjectCategory } from "@/data/projects";
import { MapPin, Zap, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const CATEGORIES: (ProjectCategory | "All")[] = [
  "All",
  "Industrial",
  "Commercial",
  "Institutional",
  "Government",
];

export const ProjectsTeaser: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory | "All">("All");

  const publishedProjects = getPublishedProjects(activeCategory);

  return (
    <section className="py-20 sm:py-24 bg-white text-brand-charcoal border-t border-b border-slate-200">
      <Container>
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div className="max-w-2xl">
            <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-brand-green">
              Proven Track Record
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-brand-charcoal mt-2 tracking-tight">
              Featured Solar Plant Portfolio
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-2">
              Demonstrated engineering credentials across industrial rooftops, commercial complexes, and institutions in Eastern India.
            </p>
          </div>

          <Button href="/projects" variant="outline" className="shrink-0 self-start md:self-auto">
            <span>Explore Complete Portfolio</span>
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </div>

        {/* Filter Categories Bar */}
        <div className="flex flex-wrap items-center gap-2 mb-10">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={cn(
                "px-4 py-2 text-xs sm:text-sm font-semibold rounded-full border transition-all duration-200",
                activeCategory === cat
                  ? "bg-brand-green text-white border-brand-green shadow-sm"
                  : "bg-brand-off-white text-slate-700 border-slate-200 hover:border-brand-green/40 hover:bg-white"
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {publishedProjects.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: idx * 0.05 }}
            >
              <Card className="h-full border-slate-200 p-0 overflow-hidden hover:shadow-lg flex flex-col justify-between group">
                <div>
                  {/* Image */}
                  <div className="relative h-52 w-full bg-slate-900 overflow-hidden">
                    <Image
                      src={project.image}
                      alt={project.name}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3">
                      <Badge variant="dark" className="text-[10px]">
                        {project.category}
                      </Badge>
                    </div>

                    <div className="absolute bottom-3 right-3 bg-brand-amber font-heading font-extrabold text-brand-charcoal text-xs px-3 py-1 rounded-md shadow-md">
                      {project.capacity}
                    </div>
                  </div>

                  {/* Info */}
                  <div className="p-6 space-y-3">
                    <h3 className="font-heading text-xl font-bold text-brand-charcoal group-hover:text-brand-green transition-colors">
                      {project.name}
                    </h3>

                    <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500">
                      <MapPin className="h-3.5 w-3.5 text-brand-green shrink-0" />
                      <span>{project.location}</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-3">
                      {project.description}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-brand-green">
                    <span>Verified Installation</span>
                    <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
};
