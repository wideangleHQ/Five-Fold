"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function useScrollReveal() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const isReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Handle Reduced Motion
    if (isReducedMotion) {
      const allRevealEls = document.querySelectorAll("[data-reveal]");
      allRevealEls.forEach((el) => {
        gsap.set(el, { opacity: 1, y: 0, scale: 1 });
      });
      return;
    }

    const isMobile = window.innerWidth < 768;

    const ctx = gsap.context(() => {
      // 1. MAJOR SECTION HEADINGS
      const headings = document.querySelectorAll("[data-reveal='heading']");
      headings.forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: isMobile ? 18 : 28 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      });

      // 2. SUPPORTING PARAGRAPHS
      const paragraphs = document.querySelectorAll("[data-reveal='paragraph']");
      paragraphs.forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: isMobile ? 14 : 18 },
          {
            opacity: 1,
            y: 0,
            duration: 0.75,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      });

      // 3. GENERAL TEXT GROUPS / BLOCKS (Fallback for data-reveal='text')
      const textElements = document.querySelectorAll("[data-reveal='text']");
      textElements.forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: isMobile ? 16 : 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      });

      // 4. CARD GROUPS (Container with staggered cards)
      const cardContainers = document.querySelectorAll("[data-reveal='cards-container']");
      cardContainers.forEach((container) => {
        const cards = container.querySelectorAll("[data-reveal='card']");
        if (cards.length > 0) {
          gsap.fromTo(
            cards,
            { opacity: 0, y: isMobile ? 16 : 24, scale: isMobile ? 0.99 : 0.985 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.8,
              stagger: 0.08,
              ease: "power3.out",
              scrollTrigger: {
                trigger: container,
                start: "top 85%",
                toggleActions: "play none none none",
              },
            }
          );
        }
      });

      // Standalone cards
      const standaloneCards = document.querySelectorAll(
        "[data-reveal='card']:not([data-reveal='cards-container'] [data-reveal='card'])"
      );
      standaloneCards.forEach((card) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: isMobile ? 16 : 24, scale: isMobile ? 0.99 : 0.985 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      });

      // 5. EDITORIAL IMAGES
      const imageContainers = document.querySelectorAll("[data-reveal='image-container']");
      imageContainers.forEach((container) => {
        const img = container.querySelector("img") || container.querySelector("[data-reveal='image']");
        if (img) {
          gsap.fromTo(
            container,
            { opacity: 0, y: isMobile ? 16 : 24 },
            {
              opacity: 1,
              y: 0,
              duration: 0.85,
              ease: "power3.out",
              scrollTrigger: {
                trigger: container,
                start: "top 85%",
                toggleActions: "play none none none",
              },
            }
          );
          gsap.fromTo(
            img,
            { scale: isMobile ? 1.01 : 1.02 },
            {
              scale: 1,
              duration: 0.85,
              ease: "power3.out",
              scrollTrigger: {
                trigger: container,
                start: "top 85%",
                toggleActions: "play none none none",
              },
            }
          );
        }
      });

      // 6. SMALL SUPPORTING CONTENT
      const smallContent = document.querySelectorAll("[data-reveal='small']");
      smallContent.forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: isMobile ? 10 : 14 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      });
    });

    return () => ctx.revert();
  }, []);
}
