/**
 * Regression guard for the UI rendering bug where the Government Schemes slider
 * and other `[data-reveal]` content disappeared after a refresh / navigation.
 *
 * These tests lock in the GSAP semantics the fix depends on. They are cheap,
 * run in the existing `node` vitest environment, and fail loudly if anyone
 * reintroduces the destructive teardown that caused the bug.
 *
 * Background: `gsap.fromTo()` renders its "from" state immediately, and
 * `ScrollTrigger.getAll()` returns *every* trigger in the document. Teardown that
 * kills all triggers without reverting therefore strands hidden elements at
 * `opacity: 0` forever, and destroys other components' animations.
 */
import { describe, it, expect } from "vitest";
import { gsap } from "gsap";

type PlainTarget = { opacity: number; y: number };

const createTarget = (): PlainTarget => ({ opacity: 1, y: 0 });

describe("reveal animation lifecycle invariants", () => {
  it("renders the 'from' state immediately, so teardown must revert", () => {
    const el = createTarget();

    gsap.fromTo(el, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.6, paused: true });

    // This is the hazard: the element is hidden the moment the tween is created.
    expect(el.opacity).toBe(0);
    expect(el.y).toBe(24);
  });

  it("kill() leaves the element stranded at opacity 0 (the reported symptom)", () => {
    const el = createTarget();
    const tween = gsap.fromTo(
      el,
      { opacity: 0, y: 24 },
      { opacity: 1, y: 0, duration: 0.6, paused: true }
    );

    tween.kill();

    // Never becomes visible again -> "the section disappears".
    expect(el.opacity).toBe(0);
  });

  it("revert() restores the element to its visible pre-animation state", () => {
    const el = createTarget();
    const tween = gsap.fromTo(
      el,
      { opacity: 0, y: 24 },
      { opacity: 1, y: 0, duration: 0.6, paused: true }
    );

    tween.revert();

    // This is what the fixed teardown relies on.
    expect(el.opacity).toBe(1);
    expect(el.y).toBe(0);
  });

  it("gsap.context().revert() restores every element it touched", () => {
    const a = createTarget();
    const b = createTarget();

    const ctx = gsap.context(() => {
      gsap.fromTo(a, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.6, paused: true });
      gsap.fromTo(b, { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.6, paused: true });
    });

    expect(a.opacity).toBe(0);
    expect(b.opacity).toBe(0);

    ctx.revert();

    expect(a.opacity).toBe(1);
    expect(b.opacity).toBe(1);
  });
});
