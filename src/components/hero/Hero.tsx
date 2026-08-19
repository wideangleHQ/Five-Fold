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

  // GSAP ScrollTrigger Sequence & Overlay Exit Animation
  useEffect(() => {
    if (!sectionRef.current || !imagesLoaded) return;

    const ctx = gsap.context(() => {
      const sequenceObj = currentFrameRef.current;

      // 1. Scroll-driven canvas frame sequence scrub (0 -> 59 across 100% scroll timeline)
      gsap.to(sequenceObj, {
        frame: HERO_FRAME_SOURCES.length - 1,
        snap: "frame",
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.5,
          onUpdate: () => {
            renderFrame(sequenceObj.frame);
          },
        },
      });

      // 2. Fast & smooth overlay content exit between 5% and 15% scroll
      if (overlayRef.current) {
        gsap.to(overlayRef.current, {
          opacity: 0,
          y: -30,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "5% top",
            end: "15% top",
            scrub: 0.2,
          },
        });
      }

      // 3. Oversized FIVEFOLD typography exit between 5% and 15% scroll
      if (brandTextRef.current) {
        gsap.to(brandTextRef.current, {
          opacity: 0,
          y: 20,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "5% top",
            end: "15% top",
            scrub: 0.2,
          },
        });
      }

      // 4. Smooth image opacity transition from 60% (0.6) to 100% (1.0) on scroll (0% -> 15%)
      if (canvasRef.current) {
        gsap.fromTo(
          canvasRef.current,
          { opacity: 0.6 },
          {
            opacity: 1.0,
            ease: "power1.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top top",
              end: "15% top",
              scrub: 0.2,
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [imagesLoaded]);

  return (
    <section
      ref={sectionRef}
      className="relative h-[250vh] bg-[#111615] text-white select-none"
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

        {/* 2. Main Hero Content Container (Fades out between 5-15% scroll) */}
        <Container className="relative z-10 my-auto py-3 sm:py-5 text-center space-y-3 sm:space-y-5 max-h-full">
          <div ref={overlayRef} className="space-y-3 sm:space-y-5">
            {/* Small Editorial Label */}
            <span className="text-[clamp(0.7rem,1vw,0.8rem)] font-sans font-semibold uppercase tracking-wider text-emerald-400 block mx-auto">
              • CINEMATIC SOLAR EPC &amp; DECISION PLATFORM
            </span>

            {/* Editorial Headline */}
            <div className="space-y-2 sm:space-y-3 max-w-4xl mx-auto">
              <h1 className="font-heading text-[clamp(2.25rem,4.5vw+0.75rem,5.25rem)] font-extrabold tracking-tight leading-[1.06] text-center">
                <span className="text-emerald-400 block sm:inline">Powering Odisha with </span>
                <br className="hidden sm:inline" />
                <span className="text-white">Smarter Solar Energy</span>
              </h1>

              {/* Supporting Paragraph */}
              <p className="font-sans text-[clamp(0.85rem,1.1vw+0.4rem,1.1rem)] text-[#F2F2F2] font-normal max-w-lg mx-auto leading-relaxed pt-0.5">
                Engineering-led solar EPC solutions for smarter energy and long-term performance.
              </p>
            </div>

            {/* Primary CTA Button */}
            <div className="pt-1 flex justify-center">
              <Button
                href="/contact"
                variant="primary"
                className="bg-[#1F7A45] hover:bg-[#155E34] text-white px-6 py-2.5 sm:px-7 sm:py-3 text-xs sm:text-sm font-sans font-semibold rounded-lg shadow-md transition-all duration-200"
              >
                Get a Free Consultation
              </Button>
            </div>
          </div>
        </Container>

        {/* 3. OVERSIZED BRAND TYPOGRAPHY (Fades out between 5-15% scroll) */}
        <div
          ref={brandTextRef}
          className="relative z-0 w-full overflow-hidden pointer-events-none select-none shrink-0 flex justify-center items-end opacity-20"
        >
          <div className="font-heading text-[19.5vw] font-extrabold text-center leading-none tracking-tighter text-emerald-500 uppercase whitespace-nowrap w-[110vw] max-w-none transform translate-y-[38%] shrink-0">
            FIVEFOLD
          </div>
        </div>

      </div>
    </section>
  );
};

