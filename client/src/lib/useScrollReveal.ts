"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function useScrollReveal() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === "undefined") return;

    const isReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Handle Reduced Motion: Instantly display all elements in their final static state
    if (isReducedMotion) {
      const allRevealEls = document.querySelectorAll(
        "[data-reveal], [data-reveal-group], [data-reveal-card], [data-reveal-text], [data-reveal-heading], [data-reveal-paragraph], [data-reveal-button], [data-reveal-image]"
      );
      allRevealEls.forEach((el) => {
        gsap.set(el, { opacity: 1, y: 0, scale: 1, filter: "none", clearProps: "all" });
      });
      return;
    }

    const isMobile = window.innerWidth < 768;

    // Motion parameters (Engineering-precise, subtle, and responsive)
    const textY = isMobile ? 16 : 24;
    const cardY = isMobile ? 20 : 30;
    const imgY = isMobile ? 12 : 18;
    const btnY = isMobile ? 10 : 14;

    const ctx = gsap.context(() => {
      // -----------------------------------------------------------------------
      // 1. HIERARCHICAL GROUPED SECTIONS
      // Eyebrow/Heading -> Paragraph/Description -> Cards -> CTA Button
      // -----------------------------------------------------------------------
      const groups = document.querySelectorAll<HTMLElement>("[data-reveal='group']");
      groups.forEach((group) => {
        const headings = group.querySelectorAll(
          "[data-reveal='heading'], [data-reveal='eyebrow'], [data-reveal='text']"
        );
        const paragraphs = group.querySelectorAll("[data-reveal='paragraph']");
        const cards = group.querySelectorAll("[data-reveal='card']");
        const buttons = group.querySelectorAll("[data-reveal='button'], [data-reveal='cta']");
        const images = group.querySelectorAll("[data-reveal='image']");

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: group,
            start: "top 83%",
            once: true,
          },
        });

        if (headings.length > 0) {
          tl.fromTo(
            headings,
            { opacity: 0, y: textY, filter: "blur(6px)" },
            {
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
              duration: 0.6,
              stagger: 0.06,
              ease: "power3.out",
              clearProps: "filter",
            },
            0
          );
        }

        if (paragraphs.length > 0) {
          tl.fromTo(
            paragraphs,
            { opacity: 0, y: textY * 0.8, filter: "blur(4px)" },
            {
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
              duration: 0.6,
              stagger: 0.06,
              ease: "power3.out",
              clearProps: "filter",
            },
            0.08
          );
        }

        if (cards.length > 0) {
          tl.fromTo(
            cards,
            { opacity: 0, y: cardY },
            {
              opacity: 1,
              y: 0,
              duration: 0.65,
              stagger: 0.07,
              ease: "power3.out",
              clearProps: "transform",
            },
            0.15
          );
        }

        if (images.length > 0) {
          tl.fromTo(
            images,
            { opacity: 0, y: imgY, scale: 1.015 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.7,
              stagger: 0.08,
              ease: "power3.out",
              clearProps: "transform",
            },
            0.12
          );
        }

        if (buttons.length > 0) {
          tl.fromTo(
            buttons,
            { opacity: 0, y: btnY },
            {
              opacity: 1,
              y: 0,
              duration: 0.5,
              stagger: 0.06,
              ease: "power3.out",
              clearProps: "transform",
            },
            0.22
          );
        }
      });

      // -----------------------------------------------------------------------
      // 2. STANDALONE HEADINGS & TEXT BLOCKS (Outside groups)
      // Bottom-up subtle blur reveal
      // -----------------------------------------------------------------------
      const standaloneHeadings = document.querySelectorAll<HTMLElement>(
        "[data-reveal='heading']:not([data-reveal='group'] [data-reveal='heading']), [data-reveal='text']:not([data-reveal='group'] [data-reveal='text'])"
      );
      standaloneHeadings.forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: textY, filter: "blur(6px)" },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 0.62,
            ease: "power3.out",
            clearProps: "filter",
            scrollTrigger: {
              trigger: el,
              start: "top 83%",
              once: true,
            },
          }
        );
      });

      // -----------------------------------------------------------------------
      // 3. STANDALONE PARAGRAPHS (Outside groups)
      // -----------------------------------------------------------------------
      const standaloneParagraphs = document.querySelectorAll<HTMLElement>(
        "[data-reveal='paragraph']:not([data-reveal='group'] [data-reveal='paragraph'])"
      );
      standaloneParagraphs.forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: textY * 0.8, filter: "blur(4px)" },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 0.6,
            ease: "power3.out",
            clearProps: "filter",
            scrollTrigger: {
              trigger: el,
              start: "top 83%",
              once: true,
            },
          }
        );
      });

      // -----------------------------------------------------------------------
      // 4. CARD CONTAINERS & GRIDS (Staggered upward entrance)
      // -----------------------------------------------------------------------
      const cardContainers = document.querySelectorAll<HTMLElement>(
        "[data-reveal='cards-container']:not([data-reveal='group'] [data-reveal='cards-container'])"
      );
      cardContainers.forEach((container) => {
        const cards = container.querySelectorAll<HTMLElement>("[data-reveal='card']");
        if (cards.length > 0) {
          gsap.fromTo(
            cards,
            { opacity: 0, y: cardY },
            {
              opacity: 1,
              y: 0,
              duration: 0.65,
              stagger: 0.07,
              ease: "power3.out",
              clearProps: "transform",
              scrollTrigger: {
                trigger: container,
                start: "top 83%",
                once: true,
              },
            }
          );
        }
      });

      // Standalone cards (not in a container or group)
      const standaloneCards = document.querySelectorAll<HTMLElement>(
        "[data-reveal='card']:not([data-reveal='cards-container'] [data-reveal='card']):not([data-reveal='group'] [data-reveal='card'])"
      );
      standaloneCards.forEach((card) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: cardY },
          {
            opacity: 1,
            y: 0,
            duration: 0.65,
            ease: "power3.out",
            clearProps: "transform",
            scrollTrigger: {
              trigger: card,
              start: "top 83%",
              once: true,
            },
          }
        );
      });

      // -----------------------------------------------------------------------
      // 5. STANDALONE IMAGES & IMAGE CONTAINERS
      // Subtle slide and optional micro scale
      // -----------------------------------------------------------------------
      const standaloneImages = document.querySelectorAll<HTMLElement>(
        "[data-reveal='image']:not([data-reveal='group'] [data-reveal='image']), [data-reveal='image-container']:not([data-reveal='group'] [data-reveal='image-container'])"
      );
      standaloneImages.forEach((imgEl) => {
        gsap.fromTo(
          imgEl,
          { opacity: 0, y: imgY, scale: 1.015 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.7,
            ease: "power3.out",
            clearProps: "transform",
            scrollTrigger: {
              trigger: imgEl,
              start: "top 83%",
              once: true,
            },
          }
        );
      });

      // -----------------------------------------------------------------------
      // 6. STANDALONE BUTTONS / CTAs
      // Fast, minimal entrance
      // -----------------------------------------------------------------------
      const standaloneButtons = document.querySelectorAll<HTMLElement>(
        "[data-reveal='button']:not([data-reveal='group'] [data-reveal='button']), [data-reveal='cta']:not([data-reveal='group'] [data-reveal='cta'])"
      );
      standaloneButtons.forEach((btn) => {
        gsap.fromTo(
          btn,
          { opacity: 0, y: btnY },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: "power3.out",
            clearProps: "transform",
            scrollTrigger: {
              trigger: btn,
              start: "top 85%",
              once: true,
            },
          }
        );
      });
    });

    // Refresh ScrollTrigger after next tick to accommodate DOM measurements
    const timeoutId = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);

    return () => {
      clearTimeout(timeoutId);
      // Kill ScrollTriggers without reverting inline styles.
      // ctx.revert() writes initial CSS back to DOM nodes React is simultaneously
      // reconciling on navigation, causing removeChild errors in OuterLayoutRouter.
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, [pathname]);
}
