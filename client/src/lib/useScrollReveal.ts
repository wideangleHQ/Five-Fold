"use client";

import { useLayoutEffect } from "react";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { scheduleScrollTriggerRefresh } from "@/lib/scrollTriggerRefresh";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Progressive reveal for every `[data-reveal]` element on the current route.
 *
 * LIFECYCLE CONTRACT (this is the part that used to be broken)
 * ----------------------------------------------------------
 * `gsap.fromTo()` renders its "from" state immediately when it is created, so
 * every matched element is pushed to `opacity: 0` the moment this hook runs and
 * is only made visible again when its ScrollTrigger fires. That makes teardown
 * safety-critical, not cosmetic:
 *
 *   - `tween.kill()` leaves the element frozen at `opacity: 0` forever.
 *   - `ctx.revert()` restores the element's pre-animation inline styles and kills
 *     ONLY the animations/ScrollTriggers this context created.
 *
 * This hook is mounted once in the root layout, so it must therefore never reach
 * outside its own context — the previous `ScrollTrigger.getAll().forEach(st =>
 * st.kill())` destroyed other components' triggers and, because it did not
 * revert, stranded their hidden elements permanently.
 */
export function useScrollReveal() {
  const pathname = usePathname();

  // useLayoutEffect (not useEffect) so the "from" state is applied before the
  // browser paints — otherwise every reveal element flashes visible-then-hidden.
  useLayoutEffect(() => {
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

    // Re-measure now, then again at the points where the layout is actually
    // known to be stable (webfont swap, sub-resource load). See the helper for
    // why this replaces the previous fixed 100 ms timer.
    const stopLayoutRefresh = scheduleScrollTriggerRefresh();

    return () => {
      stopLayoutRefresh();
      // `revert`, never `kill`: it restores the inline styles this context wrote
      // (so nothing is stranded at `opacity: 0`) and it disposes of exactly the
      // animations and ScrollTriggers created above — nothing else in the app.
      ctx.revert();
    };
  }, [pathname]);
}
