"use client";

import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/Button";
import { ArrowRight } from "lucide-react";
import skyBg from "@/assets/Images/Five_fold_sky.png";
import { HERO_FRAME_SOURCES, HERO_FIRST_FRAME } from "@/data/heroFrames";

export const Hero: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const frameWrapperRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const vignetteRef = useRef<HTMLDivElement>(null);
  const credentialsRef = useRef<HTMLDivElement>(null);

  const [imagesLoaded, setImagesLoaded] = useState<boolean>(false);
  const [frameVisible, setFrameVisible] = useState<boolean>(false);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef<{ frame: number }>({ frame: 0 });

  // Register GSAP ScrollTrigger on client
  useEffect(() => {
    if (typeof window !== "undefined") {
      gsap.registerPlugin(ScrollTrigger);
    }
  }, []);

  // Preload sequence frames with frame 0 prioritized
  useEffect(() => {
    let loadedCount = 0;
    const loadedImages: HTMLImageElement[] = [];

    // Priority load first frame
    const firstImg = new window.Image();
    firstImg.src = HERO_FRAME_SOURCES[0];
    firstImg.onload = () => {
      loadedCount++;
      if (canvasRef.current && currentFrameRef.current.frame === 0) {
        renderFrame(0);
      }
      if (loadedCount === HERO_FRAME_SOURCES.length) {
        setImagesLoaded(true);
      }
    };
    firstImg.onerror = () => {
      loadedCount++;
      if (loadedCount === HERO_FRAME_SOURCES.length) {
        setImagesLoaded(true);
      }
    };
    loadedImages[0] = firstImg;

    // Load remaining frames
    for (let idx = 1; idx < HERO_FRAME_SOURCES.length; idx++) {
      const img = new window.Image();
      img.src = HERO_FRAME_SOURCES[idx];
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
    }

    imagesRef.current = loadedImages;
  }, []);

  // Helper to draw image cover on canvas
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
    ctx.globalAlpha = 1.0;
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
  }, []);

  // Draw frame 0 on canvas as soon as canvas is mounted or images load
  useEffect(() => {
    if (canvasRef.current) {
      canvasRef.current.width = window.innerWidth;
      canvasRef.current.height = window.innerHeight;
      renderFrame(0);
    }
  }, [imagesLoaded]);

  // Set initial frame position before paint — positioned safely below the CTA button with zero overlap
  useLayoutEffect(() => {
    const updateFramePosition = () => {
      if (!frameRef.current) return;
      const ctaEl = overlayRef.current?.querySelector(".hero-ctas");
      let safeY = window.innerHeight * 0.58;
      if (ctaEl) {
        const ctaBottom = ctaEl.getBoundingClientRect().bottom;
        // Ensure at least 24px-32px clear breathing space below the CTA button
        safeY = Math.max(ctaBottom + 28, window.innerHeight * 0.52);
      }
      gsap.set(frameRef.current, {
        xPercent: -50,
        y: safeY,
      });
    };

    updateFramePosition();
    window.addEventListener("resize", updateFramePosition);
    return () => window.removeEventListener("resize", updateFramePosition);
  }, []);

  // Frame fade-in — set visible immediately; 300ms delay lives in CSS transition-delay.
  useEffect(() => { setFrameVisible(true); }, []);

  // Hero Page-Load Entrance Animation Timeline (text elements only)
  useEffect(() => {
    if (!sectionRef.current || !overlayRef.current) return;

    const isReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isReducedMotion) return;

    const ctx = gsap.context(() => {
      const loadTl = gsap.timeline({
        defaults: { ease: "power3.out" },
      });

      const eyebrow = overlayRef.current!.querySelector(".hero-eyebrow");
      const heading = overlayRef.current!.querySelector("h1");
      const paragraph = overlayRef.current!.querySelector("p");
      const buttons = overlayRef.current!.querySelector(".hero-ctas");

      if (eyebrow) {
        loadTl.fromTo(
          eyebrow,
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.7 },
          0.05
        );
      }

      if (heading) {
        loadTl.fromTo(
          heading,
          { opacity: 0, y: 18 },
          { opacity: 1, y: 0, duration: 0.8 },
          0.12
        );
      }

      if (paragraph) {
        loadTl.fromTo(
          paragraph,
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: 0.7 },
          0.24
        );
      }

      if (buttons) {
        loadTl.fromTo(
          buttons,
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.65 },
          0.36
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // GSAP ScrollTrigger Sequence: Text Exits -> Framed Image Expands -> Fullscreen Climax
  // No gsap.context() here — ctx.revert() clears _gsap on frameRef, overriding the
  // useLayoutEffect initial positioning. tl.kill() stops without reverting element state.
  useEffect(() => {
    if (!sectionRef.current) return;

    const isReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (isReducedMotion) {
      if (frameRef.current) gsap.set(frameRef.current, { y: 0 });
      if (credentialsRef.current) gsap.set(credentialsRef.current, { opacity: 1 });
      return;
    }

    const sequenceObj = currentFrameRef.current;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.5,
      },
    });

    // 1. Text Exits smoothly upward independently
    if (overlayRef.current) {
      tl.to(
        overlayRef.current,
        { y: -100, opacity: 0, ease: "power2.inOut", duration: 0.28 },
        0
      );
    }

    // 2. Frame rises from bottom-peek and expands to fullscreen
    // fromTo with immediateRender:true (GSAP default) applies the "from" state at tween creation,
    // making initial positioning independent of whether useLayoutEffect's gsap.set has run yet.
    if (frameRef.current) {
      const ctaEl = overlayRef.current?.querySelector(".hero-ctas");
      let safeY = window.innerHeight * 0.58;
      if (ctaEl) {
        const ctaBottom = ctaEl.getBoundingClientRect().bottom;
        safeY = Math.max(ctaBottom + 28, window.innerHeight * 0.52);
      }
      tl.fromTo(
        frameRef.current,
        {
          y: safeY,
          xPercent: -50,
          width: "70vw",
          borderRadius: "1.5rem",
          border: "1px solid #DCE2E2",
          boxShadow: "0 20px 50px -15px rgba(23,59,83,0.14)",
        },
        {
          y: 0,
          xPercent: -50,
          width: "100vw",
          borderRadius: "0px",
          borderWidth: "0px",
          boxShadow: "none",
          ease: "power2.inOut",
          duration: 0.58,
        },
        0.04
      );
    }

    // 3. Image sequence scrubs through solar frames
    tl.to(
      sequenceObj,
      {
        frame: HERO_FRAME_SOURCES.length - 1,
        snap: "frame",
        ease: "none",
        duration: 0.88,
        onUpdate: () => { renderFrame(sequenceObj.frame); },
      },
      0.04
    );

    // 4. Vignette darkens for credentials contrast
    if (vignetteRef.current) {
      tl.fromTo(
        vignetteRef.current,
        { opacity: 0 },
        { opacity: 1, ease: "power2.out", duration: 0.22 },
        0.52
      );
    }

    // 5. Climax credentials fade in, then out
    if (credentialsRef.current) {
      tl.fromTo(
        credentialsRef.current,
        { opacity: 0, y: 28 },
        { opacity: 1, y: 0, ease: "power2.out", duration: 0.24 },
        0.6
      );
      tl.to(
        credentialsRef.current,
        { opacity: 0, y: -16, ease: "power1.in", duration: 0.08 },
        0.92
      );
    }

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-[280vh] bg-white text-[#173B53]"
    >
      {/* STICKY FULL-VIEWPORT STAGE */}
      <div
        ref={stickyRef}
        className="sticky top-0 h-screen h-[100svh] w-full overflow-hidden bg-white flex flex-col justify-start"
      >
        {/* ATMOSPHERIC CLOUD BACKGROUND LAYER (Opacity 20%) */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <Image
            src={skyBg}
            alt="Fivefold Atmosphere Sky Background"
            fill
            priority
            sizes="100vw"
            className="object-cover object-top opacity-20"
          />
        </div>

        {/* 1. EDITORIAL HERO COPY CONTAINER (Controlled Max-Width & Generous Breathing Space) */}
        <div
          ref={overlayRef}
          className="relative z-20 w-full pt-20 sm:pt-24 md:pt-28 lg:pt-32 pb-2 sm:pb-3 px-4 sm:px-6 lg:px-8 xl:px-12 text-center shrink-0 pointer-events-auto"
        >
          <div className="max-w-3xl lg:max-w-4xl mx-auto space-y-2.5 sm:space-y-3.5">
            
            {/* Understated Eyebrow */}
            <div className="hero-eyebrow">
              <span className="font-mono text-[10px] sm:text-xs font-semibold tracking-[0.22em] uppercase text-[#526673] block">
                ENGINEERING A SUSTAINABLE ODISHA
              </span>
            </div>

            {/* Main Hero Headline with deliberate line breaks */}
            <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] font-extrabold tracking-tight leading-[1.08] text-[#173B53]">
              <span className="block whitespace-normal sm:whitespace-nowrap">
                Powering Odisha with
              </span>
              <span className="block text-[#1684C7] mt-0.5">
                Smarter Solar Energy
              </span>
            </h1>

            {/* Supporting Copy */}
            <p className="font-sans text-xs sm:text-sm md:text-[0.95rem] text-[#526673] font-normal max-w-md md:max-w-xl mx-auto leading-relaxed pt-0.5">
              Bankable rooftop and megawatt-scale solar engineering, DISCOM net metering, and 25-year performance assurance.
            </p>

            {/* Primary CTA */}
            <div className="hero-ctas pt-2 sm:pt-2.5 flex items-center justify-center">
              <Button
                href="/smart-solar-calculator"
                variant="primary"
                className="bg-[#173B53] hover:bg-[#0f2738] text-white px-7 sm:px-8 py-3 sm:py-3.5 text-xs sm:text-sm font-sans font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200 inline-flex items-center justify-center gap-2 group border-0"
              >
                <span>Find My Solar Solution</span>
                <ArrowRight className="h-4 w-4 text-[#1684C7] group-hover:translate-x-0.5 transition-transform" />
              </Button>
            </div>
          </div>
        </div>

        {/* 2. FRAMED SOLAR VISUAL STAGE (Rises from bottom, expands to fullscreen on scroll) */}
        <div
          ref={frameWrapperRef}
          className="absolute inset-0 z-10 overflow-hidden pointer-events-none"
        >
          <div
            ref={frameRef}
            className="absolute bottom-0 left-1/2 h-[100svh] w-[88vw] sm:w-[82vw] lg:w-[72vw] xl:w-[70vw] overflow-hidden bg-[#173B53] pointer-events-auto"
            style={{
              borderRadius: "1.5rem",
              border: "1px solid #DCE2E2",
              boxShadow: "0 20px 50px -15px rgba(23,59,83,0.14)",
              opacity: frameVisible ? 1 : 0,
              transition: "opacity 850ms ease-out",
              transitionDelay: frameVisible ? "300ms" : "0ms",
            }}
          >
            {/* Deterministic Static First Frame - Always rendered synchronously with zero flash */}
            <div className="absolute inset-0 w-full h-full bg-[#173B53]">
              <Image
                src={HERO_FIRST_FRAME}
                alt="Fivefold Renewable Solar Energy Installation"
                fill
                priority
                sizes="100vw"
                className="object-cover object-center"
              />

              <canvas
                ref={canvasRef}
                className="w-full h-full object-cover block relative z-0"
              />
            </div>

            {/* Subtle Vignette Gradient for Fullscreen Climax Readability */}
            <div
              ref={vignetteRef}
              className="absolute inset-0 bg-gradient-to-t from-[#173B53]/90 via-[#173B53]/25 to-transparent pointer-events-none opacity-0"
            />

            {/* 3. CLIMAX CREDENTIALS (EDITORIAL NUMBERS) */}
            <div
              ref={credentialsRef}
              className="absolute inset-x-0 bottom-6 sm:bottom-10 lg:bottom-12 z-20 flex flex-col justify-end items-center pointer-events-none px-4 sm:px-6 lg:px-8 xl:px-12 opacity-0"
            >
              <div className="w-full max-w-7xl mx-auto pointer-events-auto space-y-5 sm:space-y-7">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-5 gap-x-3 sm:gap-x-8 text-center items-start">
                  {/* Stat 1 */}
                  <div className="space-y-1 flex flex-col items-center">
                    <div className="font-heading text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-extrabold text-white tracking-tight leading-none whitespace-nowrap">
                      10+ Years
                    </div>
                    <div className="font-sans text-xs sm:text-sm font-medium text-white/80 tracking-wide text-center">
                      Engineering Experience
                    </div>
                  </div>

                  {/* Stat 2 */}
                  <div className="space-y-1 flex flex-col items-center">
                    <div className="font-heading text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-extrabold text-white tracking-tight leading-none whitespace-nowrap">
                      20+ MW
                    </div>
                    <div className="font-sans text-xs sm:text-sm font-medium text-white/80 tracking-wide text-center">
                      Installed Capacity
                    </div>
                  </div>

                  {/* Stat 3 */}
                  <div className="space-y-1 flex flex-col items-center">
                    <div className="font-heading text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-extrabold text-white tracking-tight leading-none whitespace-nowrap">
                      30+ Projects
                    </div>
                    <div className="font-sans text-xs sm:text-sm font-medium text-white/80 tracking-wide text-center">
                      Projects Delivered
                    </div>
                  </div>

                  {/* Stat 4 */}
                  <div className="space-y-1 flex flex-col items-center">
                    <div className="font-heading text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-extrabold text-white tracking-tight leading-none whitespace-nowrap">
                      800+ MW
                    </div>
                    <div className="font-sans text-xs sm:text-sm font-medium text-white/80 tracking-wide text-center">
                      Design &amp; Consultation
                    </div>
                  </div>
                </div>

                {/* Bottom Row: 10+ States Center Anchor */}
                <div className="text-center pt-3 sm:pt-4 space-y-1 flex flex-col items-center border-t border-white/15 max-w-md sm:max-w-lg mx-auto">
                  <div className="font-heading text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-none whitespace-nowrap">
                    10+ States
                  </div>
                  <div className="font-sans text-xs sm:text-sm font-semibold text-white/80 tracking-wider uppercase text-center">
                    Regional Engineering Footprint
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
