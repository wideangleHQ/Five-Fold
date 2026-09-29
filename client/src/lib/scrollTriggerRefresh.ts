"use client";

import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Refresh ScrollTrigger once the page layout has actually settled.
 *
 * WHY THIS EXISTS
 * ---------------
 * ScrollTrigger resolves every `start` / `end` from live DOM measurements. On
 * the first paint that DOM is still moving: `next/font` swaps its fallback face
 * for the real webfont (`display: "swap"`) and `next/image` fills reserved boxes
 * as it loads. Both shift layout *after* ScrollTrigger has measured, so the
 * stored positions are wrong and reveals fire at the wrong scroll offset — or
 * not at all.
 *
 * The previous code compensated with `setTimeout(() => ScrollTrigger.refresh(), 100)`.
 * That is a race: on a slow connection the timer fires while the fonts and images
 * are still in flight, so the refresh measures the same unstable layout and
 * nothing is fixed. The three events below are the actual points at which the
 * layout is known-good, so they are used instead of a guessed duration:
 *
 *   1. the next animation frame  — after our own writes have been laid out once
 *   2. `document.fonts.ready`    — after the webfont swap has settled metrics
 *   3. `window.load`             — after sub-resources (images, fonts) have landed
 *
 * `ScrollTrigger.refresh()` is idempotent and recomputes the full set, so calling
 * it from more than one component is safe.
 *
 * @returns an idempotent teardown that detaches every listener and prevents any
 *          pending refresh from running after the component has gone away.
 */
export function scheduleScrollTriggerRefresh(): () => void {
  let cancelled = false;

  const refresh = () => {
    if (cancelled) return;
    ScrollTrigger.refresh();
  };

  // 1. Next frame — layout is stable with respect to everything we just wrote.
  const frameId = window.requestAnimationFrame(refresh);

  // 2. Webfont swap settled.
  const fonts = typeof document !== "undefined" ? document.fonts : undefined;
  if (fonts && fonts.ready && typeof fonts.ready.then === "function") {
    // A promise cannot be un-scheduled, so `cancelled` is what makes this a no-op
    // if the component unmounts first.
    fonts.ready.then(refresh, () => {});
  }

  // 3. All sub-resources loaded.
  window.addEventListener("load", refresh, { once: true });

  return () => {
    cancelled = true;
    window.cancelAnimationFrame(frameId);
    window.removeEventListener("load", refresh);
  };
}
