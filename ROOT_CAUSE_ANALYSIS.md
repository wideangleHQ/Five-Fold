ROOT CAUSE ANALYSIS — Fivefold UI rendering bug
===============================================
Branch: main (task said `preview`; `preview` is 1 commit behind and differs only
by a `Header.tsx` "Check Schemes" button — irrelevant to this bug).

NOTE ON REPRODUCTION
---------------------
No desktop browser and no headless browser (puppeteer/playwright) is available in
this environment, so the bug was NOT reproduced in a browser. Everything below is
established from source + an executable GSAP probe. Claimed vs. verified is
called out explicitly in the final report.

VERIFIED FACTS
--------------
V1. `gsap.fromTo()` renders its "from" state immediately at creation time.
    Probe (client/probe-gsap.cjs, GSAP 3.15.0):
      after fromTo creation ........ opacity=0 y=24
      after kill() (no revert) ..... opacity=0 y=24   <-- frozen hidden
      after revert() ............... opacity=1 y=0
V2. `ScrollTrigger.getAll()` returns the module-level `_triggers` array — every
    trigger in the document, unscoped. (ScrollTrigger.js:2278)
V3. `st.kill()` with no args does NOT revert the associated animation:
    `if (animation) { animation.scrollTrigger = null;
       revert && animation.revert({kill:false});      // revert === undefined -> skipped
       allowAnimation || animation.kill(); }`         (ScrollTrigger.js:1902-1908)
V4. React removes ONLY the topmost host node of each deleted branch, and it does
    so AFTER traversing the subtree to run layout-effect destroy functions.
    (react-dom.development.js:23971 comment "We only need to remove the topmost
    host child in each branch"; :24057 traverse, :24067 removeChild)
V5. The app's ONLY ScrollTrigger pin is `GovernmentScheme` (`pin: true`).
    ScrollTrigger reparents the pinned node into `div.pin-spacer`
    (ScrollTrigger.js:667-670), so React's later `removeChild` on that node is
    called on the wrong parent -> NotFoundError.
V6. The only ScrollTrigger.refresh() in the whole app is
    `setTimeout(() => ScrollTrigger.refresh(), 100)` (useScrollReveal.ts:306).
    No refresh on rAF / fonts.ready / load.
V7. SSR HTML is fully visible: 67 `data-reveal` elements, 0 carrying inline
    `opacity: 0`. globals.css has no `[data-reveal]` rule and no no-JS fallback,
    so visibility depends 100% on the reveal tween completing.
V8. `data-ff-preloader` (opaque `fixed inset-0 z-[9999]` navy overlay) is present
    in the SSR HTML of both `/` and `/about`.

ROOT CAUSE
----------
Two defects combine.

(1) PRIMARY — teardown of the pinned slider runs in a PASSIVE effect.
    `GovernmentScheme.tsx` created and tore down its pinned ScrollTrigger in
    `useEffect`. Passive destroys run in `flushPassiveEffects`, i.e. AFTER the
    commit's mutation phase, so at the moment React calls
    `removeChild(main, <section>)` (V4) the section is still wrapped in
    ScrollTrigger's `div.pin-spacer` (V5). React's `removeChild` is called on the
    wrong parent and throws
    `NotFoundError: Failed to execute 'removeChild' on 'Node'`.
    That error is thrown inside React's commit, which aborts the rest of the
    deletion, leaving the DOM and the fiber tree out of sync — the section then
    "disappears entirely or fails to render correctly". `patchDomRemoval.ts`
    (imported in layout.tsx) was added to swallow exactly this NotFoundError, so
    the failure became invisible instead of absent.

(2) CONTRIBUTING — `useScrollReveal`'s teardown is global and non-reverting.
    `useScrollReveal` is mounted in the ROOT layout, so its cleanup runs on every
    route change and did:
        ScrollTrigger.getAll().forEach((st) => st.kill());
    - Per V2 this destroys ScrollTriggers owned by OTHER components (Hero's scrub
      timeline, GovernmentScheme's pin). Those components' effects do not depend
      on `pathname`, so they never re-create them.
    - Per V3 the kill leaves every element's inline `opacity: 0` in place (V1).
      Any `[data-reveal]` element whose trigger is killed before it fires is
      therefore PERMANENTLY INVISIBLE. That is the "disappears after refresh".
    - The `gsap.context()` created at useScrollReveal.ts:39 is never killed at
      all, so every navigation leaks a context plus ~60 tweens/triggers.
    The comment at lines 312-314 shows this replaced an earlier `ctx.revert()`,
    chosen to avoid the removeChild error from (1). It did not fix (1); it only
    removed the crash and replaced it with silent content loss.

(3) The 100 ms `setTimeout` + global refresh (V6) is a band-aid for stale
    measurements and is a race: on a slow load it fires before `next/font`
    (`display: "swap"`) and `next/image` settle, so trigger `start`/`end` values
    stay wrong and reveals fire late or never.

FIX
---
1. `GovernmentScheme.tsx` — move the ScrollTrigger lifecycle to `useLayoutEffect`
   so the pin-spacer is unwound during React's deletion traversal, i.e. BEFORE
   React calls `removeChild` (V4). Cleanup uses `ctx.revert()` and nulls the
   stale `scrollTriggerInstance` so `goToSlide` can no longer read
   `start`/`end` off a dead trigger.
2. `useScrollReveal.ts` — kill/revert only its own context; delete
   `ScrollTrigger.getAll().forEach(kill)` and the `setTimeout`; refresh on real
   lifecycle events (rAF, `document.fonts.ready`, `load`).
3. New `lib/scrollTriggerRefresh.ts` — the shared, timer-free refresh helper.
4. `patchDomRemoval.ts` deleted and its import removed from `layout.tsx` — the
   only DOM reparenter in the app is now unwound correctly, so the global
   `Node.prototype` monkey-patch is obsolete and was masking real errors.
