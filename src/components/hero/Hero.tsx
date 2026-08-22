"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { HERO_FRAME_SOURCES } from "@/data/heroFrames";

// Fallback initial static hero background image
import heroBg from "@/assets/Images/hero section background.png";

export const Hero: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const brandTextRef = useRef<HTMLDivElement>(null);
  const credentialsRef = useRef<HTMLDivElement>(null);

  const [imagesLoaded, setImagesLoaded] = useState<boolean>(false);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef<{ frame: number }>({ frame: 0 });

  // Register GSAP ScrollTrigger on client
  useEffect(() => {
    if (typeof window !== "undefined") {
      gsap.registerPlugin(ScrollTrigger);
    }
  }, []);

  // Preload sequence frames
  useEffect(() => {
    let loadedCount = 0;
    const loadedImages: HTMLImageElement[] = [];

    HERO_FRAME_SOURCES.forEach((src, idx) => {
      const img = new window.Image();
      img.src = src;
      img.onload = () => {
        loadedCount++;
        if (loadedCount === HERO_FRAME_SOURCES.length) {
          setImagesLoaded(true);
        }
      };
      img.onerror = () => {
        loadedCount++;
        if (loadedCount === HERO_FRAME_SOURCES.length) {
          setImagesLoaded(true);
        }
      };
      loadedImages[idx] = img;
    });

    imagesRef.current = loadedImages;
  }, []);

  // Helper to draw image cover on canvas at 100% full opacity
  const renderFrame = (frameIndex: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = imagesRef.current[frameIndex];
    if (!img || !img.complete || img.naturalWidth === 0) return;

    const width = canvas.width;
    const height = canvas.height;

    const imgAspect = img.naturalWidth / img.naturalHeight;
    const canvasAspect = width / height;
    let renderWidth = width;
    let renderHeight = height;
    let offsetX = 0;
    let offsetY = 0;

    if (canvasAspect > imgAspect) {
      renderHeight = width / imgAspect;
      offsetY = (height - renderHeight) / 2;
    } else {
      renderWidth = height * imgAspect;
      offsetX = (width - renderWidth) / 2;
    }

    ctx.clearRect(0, 0, width, height);
    ctx.globalAlpha = 1.0; // Always 100% pure image opacity
    ctx.drawImage(img, offsetX, offsetY, renderWidth, renderHeight);
  };

  // Resize canvas handler
  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      renderFrame(currentFrameRef.current.frame);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [imagesLoaded]);

  // Initial draw when images load
  useEffect(() => {
    if (imagesLoaded) {
      renderFrame(0);
    }
  }, [imagesLoaded]);

  // Hero Page-Load Entrance Animation Timeline (FIVEFOLD typography & text composition)
  useEffect(() => {
    if (!sectionRef.current) return;

    const isReducedMotion = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isReducedMotion) return;

    const ctx = gsap.context(() => {
      const loadTl = gsap.timeline({
        defaults: { ease: "power3.out" },
      });

      // 1. FIVEFOLD oversized typography slides upward from below
      if (brandTextRef.current) {
        loadTl.fromTo(
          brandTextRef.current,
          { opacity: 0, y: 80 },
          { opacity: 0.2, y: 0, duration: 1.0 },
          0.1
        );
      }

      // 2. Hero content sequence: Heading -> Paragraph -> CTA Button
      if (overlayRef.current) {
        const heading = overlayRef.current.querySelector("h1");
        const paragraph = overlayRef.current.querySelector("p");
        const button = overlayRef.current.querySelector("a, button");

        if (heading) {
          loadTl.fromTo(
            heading,
            { opacity: 0, y: 28 },
            { opacity: 1, y: 0, duration: 0.9 },
            0.2
          );
        }

        if (paragraph) {
          loadTl.fromTo(
            paragraph,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.8 },
            0.35
          );
        }

        if (button) {
          loadTl.fromTo(
            button,
            { opacity: 0, y: 18 },
            { opacity: 1, y: 0, duration: 0.75 },
            0.5
          );
        }
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // GSAP ScrollTrigger Sequence & Credentials Exit/Entrance Animation
  useEffect(() => {
    if (!sectionRef.current || !imagesLoaded) return;

    const isReducedMotion = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const targetY = typeof window !== "undefined" && window.innerWidth < 768 ? -35 : -60;

    const ctx = gsap.context(() => {
      const sequenceObj = currentFrameRef.current;

      if (isReducedMotion) {
        if (credentialsRef.current) {
          gsap.set(credentialsRef.current, { opacity: 1, y: targetY });
        }
        return;
      }

      // Master Timeline for Hero scroll scrub across pinned section
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.5,
        },
      });

      // 1. Frame sequence scrub 0 -> 59 across entire timeline (0 -> 1)
      tl.to(
        sequenceObj,
        {
          frame: HERO_FRAME_SOURCES.length - 1,
          snap: "frame",
          ease: "none",
          duration: 1,
          onUpdate: () => {
            renderFrame(sequenceObj.frame);
          },
        },
        0
      );

      // 2. Canvas opacity: 0.6 -> 1.0 (0% -> 20% scroll)
      if (canvasRef.current) {
        tl.fromTo(
          canvasRef.current,
          { opacity: 0.6 },
          { opacity: 1.0, ease: "power1.out", duration: 0.2 },
          0
        );
      }

      // 3. Hero content (Title, Paragraph, CTA) exits (20% -> 40% scroll)
      if (overlayRef.current) {
        tl.to(
          overlayRef.current,
          {
            opacity: 0,
            y: -30,
            ease: "power2.out",
            duration: 0.2,
          },
          0.2
        );
      }

      // 4. FIVEFOLD background typography exits (20% -> 40% scroll)
      if (brandTextRef.current) {
        tl.to(
          brandTextRef.current,
          {
            opacity: 0,
            y: 30,
            ease: "power2.out",
            duration: 0.2,
          },
          0.2
        );
      }

      // 5. Credentials move UPWARD from current position (30% -> 65% scroll) and hold in place
      if (credentialsRef.current) {
        tl.fromTo(
          credentialsRef.current,
          {
            opacity: 0,
            y: 0,
          },
          {
            opacity: 1,
            y: targetY,
            ease: "power2.out",
            duration: 0.35,
          },
          0.3
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [imagesLoaded]);

  return (
    <section
      ref={sectionRef}
      className="relative h-[320vh] bg-[#0C3046] text-white"
    >
      {/* STICKY FULL-VIEWPORT STAGE (100vh) */}
      <div className="sticky top-0 h-screen h-[100svh] w-full overflow-hidden flex flex-col justify-between pt-20 sm:pt-24 pb-0">
        
        {/* 1. Canvas Layer / Starts at 60% Opacity and transitions to 100% on scroll */}
        <div className="absolute inset-0 z-0">
          {!imagesLoaded && (
            <Image
              src={heroBg}
              alt="Fivefold Renewable Solar Energy Installation"
              fill
              priority
              placeholder="blur"
              sizes="100vw"
              className="object-cover object-center opacity-60"
            />
          )}

          <canvas
            ref={canvasRef}
            className="w-full h-full object-cover block relative z-0 opacity-60"
          />
        </div>

        {/* 2. Main Hero Content Container (Fades out between 20-40% scroll) */}
        <Container className="relative z-10 my-auto py-3 sm:py-5 text-left md:text-center space-y-3 sm:space-y-5 max-h-full">
          <div ref={overlayRef} className="space-y-4 sm:space-y-5">
            {/* Editorial Headline & Paragraph Container */}
            <div className="relative w-[75vw] max-w-[75vw] md:max-w-4xl md:w-auto mr-auto md:mx-auto p-0 md:p-6 md:rounded-3xl md:bg-[radial-gradient(ellipse_at_center,rgba(12,48,70,0.55)_0%,rgba(12,48,70,0.2)_50%,transparent_75%)] space-y-3 sm:space-y-4">
              <h1 className="font-heading text-[clamp(1.75rem,5vw+0.25rem,5.25rem)] font-extrabold tracking-tight leading-[1.08] text-left md:text-center text-white">
                <span className="block whitespace-normal sm:whitespace-nowrap">
                  Powering Odisha&nbsp;with
                </span>
                <span className="block">
                  Smarter Solar Energy
                </span>
              </h1>

              {/* Supporting Paragraph */}
              <p className="font-sans text-[clamp(0.85rem,1.1vw+0.3rem,1.1rem)] text-white font-normal max-w-[75vw] md:max-w-lg text-left md:text-center md:mx-auto leading-relaxed">
                Engineering-led solar EPC solutions for smarter energy and long-term performance.
              </p>
            </div>

            {/* Primary CTA Button */}
            <div className="pt-1 flex justify-start md:justify-center">
              <Button
                href="/contact"
                variant="primary"
                className="bg-[#20435F] hover:bg-[#0C3046] text-white px-6 py-2.5 sm:px-7 sm:py-3 text-xs sm:text-sm font-sans font-semibold rounded-lg shadow-md transition-all duration-200"
              >
                Get a Free Consultation
              </Button>
            </div>
          </div>
        </Container>

        {/* 3. OVERSIZED BRAND TYPOGRAPHY (Fades out between 20-40% scroll) */}
        <div
          ref={brandTextRef}
          className="relative z-0 w-full overflow-hidden pointer-events-none select-none shrink-0 flex justify-center items-end opacity-20"
        >
          <div className="font-heading text-[19.5vw] font-extrabold text-center leading-none tracking-tighter text-[#00A9D6] uppercase whitespace-nowrap w-[110vw] max-w-none transform translate-y-[38%] shrink-0">
            FIVEFOLD
          </div>
        </div>

        {/* 4. REDESIGNED BOLD MAXIMALIST NUMBERS LAYOUT (Positions across bottom of viewport) */}
        <div
          ref={credentialsRef}
          className="absolute inset-x-0 bottom-6 sm:bottom-10 lg:bottom-12 z-20 flex flex-col justify-end items-center pointer-events-none px-5 sm:px-6 lg:px-8 opacity-0"
        >
          <div className="w-full max-w-7xl mx-auto pointer-events-auto space-y-6 sm:space-y-8">
            {/* Desktop: 4 Columns across bottom width | Mobile/Tablet: 2 Columns */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-6 gap-x-3 sm:gap-x-8 text-center items-start">
              {/* Stat 1 */}
              <div className="space-y-1 sm:space-y-1.5 flex flex-col items-center">
                <div className="font-heading text-2.5xl sm:text-4xl lg:text-4xl xl:text-5xl font-extrabold text-white tracking-tight leading-none whitespace-nowrap">
                  10+ Years
                </div>
                <div className="font-sans text-xs sm:text-sm font-medium text-white/70 tracking-wide text-center">
                  Renewable Energy
                </div>
              </div>

              {/* Stat 2 */}
              <div className="space-y-1 sm:space-y-1.5 flex flex-col items-center">
                <div className="font-heading text-2.5xl sm:text-4xl lg:text-4xl xl:text-5xl font-extrabold text-white tracking-tight leading-none whitespace-nowrap">
                  20+ MW
                </div>
                <div className="font-sans text-xs sm:text-sm font-medium text-white/70 tracking-wide text-center">
                  Installed
                </div>
              </div>

              {/* Stat 3 */}
              <div className="space-y-1 sm:space-y-1.5 flex flex-col items-center">
                <div className="font-heading text-2.5xl sm:text-4xl lg:text-4xl xl:text-5xl font-extrabold text-white tracking-tight leading-none whitespace-nowrap">
                  30+ Projects
                </div>
                <div className="font-sans text-xs sm:text-sm font-medium text-white/70 tracking-wide text-center">
                  Delivered
                </div>
              </div>

              {/* Stat 4 */}
              <div className="space-y-1 sm:space-y-1.5 flex flex-col items-center">
                <div className="font-heading text-2.5xl sm:text-4xl lg:text-4xl xl:text-5xl font-extrabold text-white tracking-tight leading-none whitespace-nowrap">
                  800+ MW
                </div>
                <div className="font-sans text-xs sm:text-sm font-medium text-white/70 tracking-wide text-center">
                  Engineering Experience
                </div>
              </div>
            </div>

            {/* Bottom Row / 5th Stat: 10+ States Center Anchor (60% Larger Font) */}
            <div className="text-center pt-3 sm:pt-5 space-y-1 sm:space-y-2 flex flex-col items-center border-t border-white/10 max-w-md sm:max-w-xl mx-auto">
              <div className="font-heading text-5xl sm:text-7xl lg:text-8xl xl:text-9xl font-extrabold text-white tracking-tight leading-none whitespace-nowrap">
                10+ States
              </div>
              <div className="font-sans text-xs sm:text-base font-semibold text-white/70 tracking-wider uppercase text-center">
                Engineering Reach
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

