"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import logoImg from "@/assets/Images/Logos/Five_Fold_White.png";

// 6×8 on portrait, 8×6 on landscape: same 48 nodes, CSS reshapes the grid, so the
// SSR markup already covers every viewport and GSAP's grid:"auto" reads the live layout.
const TILE_COUNT = 48;
const MIN_VISIBLE_S = 0.9;
const LOAD_TIMEOUT_S = 3;
const HARD_FAILSAFE_MS = 8000;

/**
 * Root cause of the "not working" preloader:
 * - It was mounted from app/template.tsx, which remounts on every navigation, so it
 *   replayed on every route change instead of once per page load.
 * - Its effect cleanup called setDone(true). React StrictMode (dev) runs
 *   mount → cleanup → mount, so the overlay was removed on the first cleanup, before
 *   the animation could be seen.
 * Fix: mounted once from the root layout; cleanup only releases listeners/timers and
 * a separate hard failsafe guarantees the overlay can never cover the page forever.
 */
export const FivefoldPreloader: React.FC = () => {
  const rootRef = useRef<HTMLDivElement>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const html = document.documentElement;
    const prevOverflow = html.style.overflow;
    html.style.overflow = "hidden";

    const block = (e: Event) => {
      e.preventDefault();
      e.stopImmediatePropagation();
    };
    window.addEventListener("wheel", block, { capture: true, passive: false });
    window.addEventListener("touchmove", block, { capture: true, passive: false });

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const unlock = () => {
      window.removeEventListener("wheel", block, { capture: true });
      window.removeEventListener("touchmove", block, { capture: true });
      html.style.overflow = prevOverflow;
    };

    let released = false;
    const release = () => {
      if (released) return;
      released = true;
      unlock();
      setDone(true);
    };

    const failsafe = window.setTimeout(release, HARD_FAILSAFE_MS);

    const ctx = gsap.context(() => {
      if (reduced) {
        gsap.to(root, { opacity: 0, duration: 0.3, delay: 0.3, onComplete: release });
        return;
      }

      let pageReady = false;
      const tl = gsap.timeline({ onComplete: release });
      tl.fromTo(
        ".ff-brand",
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" },
        0.05,
      )
        // Hold here until the page underneath is ready (or the load timeout fires).
        .call(() => { if (!pageReady) tl.pause(); }, [], MIN_VISIBLE_S)
        .to(".ff-brand", { opacity: 0, y: -8, duration: 0.3, ease: "power3.inOut" })
        .to(
          ".ff-tile",
          {
            scale: 0,
            duration: 0.45,
            ease: "power3.inOut",
            stagger: { amount: 0.55, from: "start", grid: "auto" },
          },
          "-=0.1",
        );

      const ready = Promise.all([
        document.fonts ? document.fonts.ready : Promise.resolve(),
        document.readyState === "complete"
          ? Promise.resolve()
          : new Promise<void>((r) => window.addEventListener("load", () => r(), { once: true })),
      ]);
      const timeout = new Promise<void>((r) => gsap.delayedCall(LOAD_TIMEOUT_S, r));
      Promise.race([ready, timeout]).then(() => {
        pageReady = true;
        if (tl.paused()) tl.resume();
      });
    }, root);

    return () => {
      window.clearTimeout(failsafe);
      unlock();
      ctx.kill();
    };
  }, []);

  if (done) return null;

  return (
    <div
      ref={rootRef}
      data-ff-preloader
      aria-hidden="true"
      className="fixed inset-0 z-[100] overflow-hidden select-none"
    >
      <div className="absolute inset-0 grid grid-cols-6 grid-rows-8 md:grid-cols-8 md:grid-rows-6">
        {Array.from({ length: TILE_COUNT }, (_, i) => (
          <div
            key={i}
            className="ff-tile bg-brand-navy will-change-transform"
            style={{ boxShadow: "0 0 0 1px #173B53" }}
          />
        ))}
      </div>

      <div className="absolute inset-0 flex items-center justify-center px-6 pointer-events-none">
        <div className="ff-brand will-change-transform" style={{ opacity: 0 }}>
          <Image
            src={logoImg}
            alt="Fivefold Renewable"
            priority
            sizes="(max-width: 640px) 260px, (max-width: 768px) 340px, 420px"
            className="w-auto h-12 sm:h-16 md:h-20 max-w-[260px] sm:max-w-[340px] md:max-w-[420px] object-contain"
          />
        </div>
      </div>

      <noscript>
        <style>{`[data-ff-preloader]{display:none!important}`}</style>
      </noscript>
    </div>
  );
};
