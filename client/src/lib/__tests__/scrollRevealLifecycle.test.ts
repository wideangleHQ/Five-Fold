/**
 * Static guards against reintroducing the two patterns that caused the
 * "content disappears after refresh" bug on the About Us / Engineering /
 * Government Schemes pages.
 *
 * These are source-level assertions rather than runtime tests because the bug is
 * a lifecycle/teardown defect that only manifests in a real browser; no headless
 * browser is available in this environment. The behavioural half of the guard
 * lives in `scrollAnimationLifecycle.test.ts`.
 */
import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";

const read = (relativePath: string) =>
  readFileSync(join(__dirname, "..", "..", relativePath), "utf8");

/** Strip comments so a doc-comment explaining a pattern is not read as using it. */
const readCode = (relativePath: string) =>
  read(relativePath)
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/^[ \t]*\/\/.*$/gm, "");

describe("scroll animation teardown is scoped and does not use timer workarounds", () => {
  const useScrollReveal = readCode("lib/useScrollReveal.ts");
  const governmentScheme = readCode("components/sections/GovernmentScheme.tsx");

  it("useScrollReveal does not tear down ScrollTriggers it does not own", () => {
    // ScrollTrigger.getAll() returns every trigger in the document, including
    // the pinned slider's. Killing them from this hook destroyed other
    // components' animations on every route change.
    expect(useScrollReveal).not.toMatch(/ScrollTrigger\.getAll\(\)/);
  });

  it("useScrollReveal does not refresh via an arbitrary timeout", () => {
    // The old `setTimeout(() => ScrollTrigger.refresh(), 100)` was a race against
    // font/image loading; refresh now happens on real layout-settled events.
    expect(useScrollReveal).not.toMatch(/setTimeout\(/);
  });

  it("useScrollReveal reverts its context so hidden elements are restored", () => {
    expect(useScrollReveal).toMatch(/ctx\.revert\(\)/);
  });

  it("useScrollReveal applies reveals in a layout effect (no visible-then-hidden flash)", () => {
    expect(useScrollReveal).toMatch(/useLayoutEffect\(/);
  });

  it("the pinned slider uses a layout effect so the pin unwinds before removeChild", () => {
    // A passive effect tore the pin down after React had already called
    // removeChild on a reparented node -> NotFoundError mid-commit.
    expect(governmentScheme).toMatch(/useLayoutEffect\(/);
  });

  it("the pinned slider reverts its context and clears the stale trigger ref", () => {
    expect(governmentScheme).toMatch(/ctx\.revert\(\)/);
    expect(governmentScheme).toMatch(/scrollTriggerInstance\.current = null/);
  });

  it("the pinned slider still declares pin: true and the design is intact", () => {
    expect(governmentScheme).toMatch(/pin: true/);
    expect(governmentScheme).toMatch(/SCHEMES\.length/);
  });

  it("the global removeChild monkey-patch is gone from the app", () => {
    // It masked the NotFoundError instead of fixing it, and permanently
    // overrode Node.prototype for the whole app.
    expect(() => read("lib/patchDomRemoval.ts")).toThrow();
    expect(readCode("app/layout.tsx")).not.toMatch(/patchDomRemoval/);
  });

  it("the preloader guarantees it cannot permanently cover the page", () => {
    const preloader = readCode("components/ui/FivefoldPreloader.tsx");
    // The overlay is `fixed inset-0 z-[9999]`; if onComplete never fires the
    // whole site stays hidden, so teardown must release it.
    expect(preloader).toMatch(/ctx\.kill\(\);\s*\n\s*setDone\(true\);/);
  });
});
