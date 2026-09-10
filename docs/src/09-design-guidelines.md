# 09 — Design Guidelines
## Clean · Minimal · Editorial · Engineering-Led

This document is the primary visual authority for the Fivefold website.

When visual implementation decisions conflict with assumptions from other documents, follow this document.

The website must feel intentionally designed by a senior product/UI designer — not generated from a collection of UI components.

---

# 01 — CORE VISUAL DIRECTION

Fivefold should feel like:

**Premium Engineering**
×
**Renewable Energy**
×
**Editorial Digital Design**

Desired qualities:

- Clean
- Minimal
- Calm
- Precise
- Confident
- Premium
- Architectural
- Engineering-led
- Trustworthy

The design should communicate quality through restraint.

---

# 02 — THE MOST IMPORTANT RULE

> IF AN ELEMENT DOES NOT IMPROVE UNDERSTANDING, HIERARCHY, STORYTELLING OR CONVERSION, REMOVE IT.

When choosing between two approaches:

**Choose the simpler one.**

When an area feels empty:

**Do not automatically fill it.**

Whitespace is intentional.

---

# 03 — ANTI-SLOP RULES

The website must NOT look AI-generated or visually over-engineered.

Strictly avoid:

- Neon effects
- Electric blue/green glows
- Lightning effects
- Glowing borders
- Futuristic HUD interfaces
- Cyberpunk styling
- Artificial energy particles
- Decorative circuitry
- Random technical grids
- Excessive glassmorphism
- Excessive blur
- Excessive gradients
- Glowing icons
- Floating decorative objects
- Decorative 3D objects without purpose
- Excessive badges
- Excessive pills
- Excessive rounded cards
- Icon grids
- Decorative technical diagrams
- Constant floating animation
- Excessive parallax
- Visual noise

Do not add futuristic effects simply because the subject is solar or technology.

Fivefold should look modern through typography, composition, imagery and motion — not effects.

---

# 04 — LESS WORDS

Visible copy must be concise.

Prioritize:

**One strong headline**

over:

A long explanation.

Use:

Headline
+
short supporting statement
+
one clear action.

Do not display all available information simultaneously.

Use progressive disclosure for technical or detailed information.

Detailed content can appear through:

- interaction
- expansion
- scroll progression
- secondary views
- dedicated pages

Do not remove required factual information. Simply avoid presenting everything at once.

---

# 05 — TYPOGRAPHY

Typography is one of the primary design tools.

Use:

- large editorial headlines
- strong hierarchy
- short statements
- readable body text
- restrained labels

Do not use typography as decoration.

Avoid excessive font sizes across every element.

The page should have clear hierarchy:

1. Primary message
2. Supporting information
3. Action
4. Secondary detail

---

# 06 — WHITESPACE

Use generous whitespace.

Do not interpret empty space as a problem.

Whitespace should:

- separate ideas
- emphasize important numbers
- create visual calm
- establish hierarchy
- make imagery feel premium

Do not compress sections simply to show more content.

---

# 07 — IMAGERY

Real imagery should be preferred over decorative graphics.

Prioritize:

- real solar installations
- industrial rooftops
- engineering environments
- infrastructure
- real project imagery
- people where appropriate

When a strong image can communicate an idea, prefer it over several decorative UI elements.

Use large, intentional imagery.

Avoid collections of small decorative images.

---

# 08 — LAYOUT

Do NOT assume every section needs cards.

Cards are allowed when they genuinely improve comparison or interaction.

But the default layout should be:

**Typography + Image + Space + Interaction**

Possible compositions:

- editorial split
- full-width image
- large project feature
- typography-led section
- immersive visual
- minimal list
- horizontal gallery
- progressive reveal

Avoid repeating:

Heading
Paragraph
4 Cards
CTA

across the entire website.

---

# 09 — CARDS

Cards are NOT the default design language.

Use cards only when the content genuinely benefits from containment or comparison.

Avoid:

- card inside card
- multiple nested cards
- icon + title + paragraph + badge + CTA in every card
- identical card grids across multiple sections

If a card is unnecessary:

Remove it.

---

# 10 — ICONS

Icons should be functional, not decorative.

Do not add icons simply because a card contains a feature.

If typography or layout communicates the information clearly:

No icon is needed.

Use one consistent icon family when icons are genuinely required.

Never mix decorative icon styles.

---

# 11 — COLOUR SYSTEM

Use the established Fivefold brand palette:

### New Fivefold Palette

- **PRIMARY DARK**: `#173B53` (primary typography, navigation, primary buttons, important UI, dark sections, footer, strong brand moments)
- **ACCENT BLUE**: `#1684C7` (controlled emphasis, subtle interactive highlights)
- **SECONDARY TEXT**: `#526673` (supporting copy, captions, subtitles, body text)
- **LIGHT BACKGROUND**: `#F6F3EC` (primary page canvas, dominates overall visual field)
- **SURFACE WHITE**: `#FFFFFF` (clean cards, framed visual containers, modals)
- **BORDER / SUBTLE NEUTRAL**: `#DCE2E2` (crisp structural borders, subtle framing)

### Colour Principle

Use approximately:
**70% light surfaces (`#F6F3EC` / `#FFFFFF`) + 30% dark brand presence (`#173B53`)**

The dark navy remains Fivefold's primary brand colour.
The light palette dominates the overall page canvas.
The accent blue must remain controlled and used sparingly.
DO NOT use multiple competing blues.
DO NOT introduce unrelated colours, neon, glow, or decorative gradients.

---

# 11B — HERO SCROLL CHOREOGRAPHY

The Hero operates on a **TEXT → FRAMED IMAGE → FULLSCREEN IMAGE** scroll interaction:

1. **Initial State (Outside)**:
   - Light canvas (`#F6F3EC`) with clean navigation and dark typography (`#173B53`).
   - Main Hero Copy ("Powering Odisha with Smarter Solar Energy").
   - Supporting copy and primary CTA ("Find My Solar Solution →").
   - Large framed solar visual below copy with restrained borders (`#DCE2E2`) and generous margins.
2. **Scroll Phase 1 (Text Exits)**:
   - Headline, supporting copy, and CTA smoothly move upward and leave the primary field.
3. **Scroll Phase 2 (Image Expands)**:
   - Framed solar visual smoothly expands: Small/Framed → Large → Edge-to-Edge.
   - Frame and rounded corners smoothly dissolve.
4. **Scroll Phase 3 (Fullscreen Visual Climax)**:
   - Solar installation occupies the full viewport as the camera approaches/enters the scene.
5. **Seamless Next-Section Flow**:
   - The full-screen state flows directly into the next homepage section without jarring cuts or flashes.

---

# 12 — CTA SYSTEM

One primary CTA should dominate a screen.

Primary conversion direction:

**Find My Solar Solution**

Secondary:

**Talk to an Engineer**

Contextual CTAs may exist where required:

- Calculate My Home Solar
- Plan My Business Solar
- Discuss My Industrial Project
- Check Eligibility
- Find My AMC Plan

All CTAs must share a consistent visual language.

Do not create multiple competing primary buttons.

---

# 13 — MOTION

Motion should be subtle, natural and purposeful.

Use motion for:

- hierarchy
- transition
- progress
- storytelling
- feedback

Good examples:

- gentle reveal
- image movement
- number counting
- section transition
- progressive engineering stages
- calculator step transition

Avoid:

- bouncing interfaces
- constant floating
- glowing animations
- excessive parallax
- flashing
- elastic UI
- animation on every element

The user should notice the quality of the experience, not the presence of animation.

---

# 14 — SMOOTH SCROLL

Use one global smooth-scroll system.

The existing implementation should remain lightweight and compatible with scroll-linked animations.

Requirements:

- natural-feeling scrolling
- no scroll-jacking
- no excessive inertia
- no input lag
- anchor links remain functional
- mobile scrolling remains natural
- animations remain synchronized
- respect `prefers-reduced-motion`

Do not introduce competing scroll systems.

---

# 15 — SECTION TRANSITIONS

Sections should feel connected.

Use subtle:

- background changes
- tonal transitions
- image continuity
- whitespace
- typography movement
- controlled reveals

Do not use:

- flashy transitions
- lightning
- glow wipes
- artificial energy effects

A good transition can be almost invisible.

---

# 16 — CONTENT HIERARCHY

Every viewport should have one dominant idea.

Ask:

**What should the visitor understand here?**

Then design around that answer.

Do not place multiple competing messages in one viewport.

---

# 17 — PROGRESSIVE DISCLOSURE

Technical content should be layered.

FIRST:
Simple idea.

SECOND:
Useful detail.

THIRD:
Technical depth if requested.

This is especially important for:

- Solar Calculator
- Government Schemes
- Engineering
- SolarCare
- Warranty

The website should remain approachable for non-technical visitors while preserving technical depth.

---

# 18 — RESPONSIVE DESIGN

Design intentionally for:

- Desktop
- Laptop
- Tablet
- Mobile

Do not simply scale desktop layouts down.

Mobile should prioritize:

- headline
- image
- primary action
- essential information
- whitespace

Remove unnecessary decorative elements on smaller screens.

No horizontal overflow.

---

# 19 — ACCESSIBILITY

Maintain:

- semantic HTML
- proper heading hierarchy
- keyboard navigation
- visible focus states
- accessible controls
- sufficient contrast
- reduced-motion support
- readable text sizes

Premium visual design must remain usable.

---

# 20 — PERFORMANCE

Prioritize excellent performance.

Avoid:

- unnecessary third-party libraries
- oversized media
- expensive filters
- excessive blur
- unnecessary DOM elements
- repeated scroll listeners
- animation memory leaks
- unnecessary React re-renders

Prefer:

- optimized assets
- GPU-friendly transforms
- lazy loading
- efficient animation systems
- clean component lifecycle management

---

# 21 — BRAND TONE

Fivefold should sound:

Engineering-led
Confident
Clear
Professional
Trustworthy

Avoid:

- exaggerated marketing claims
- generic "green revolution" language
- excessive sales language
- filler copy
- buzzwords without meaning

Use the project documentation as the source of truth.

---

# 22 — DESIGN DECISION TEST

Before adding an element, ask:

### Does it improve:
- Understanding?
- Hierarchy?
- Storytelling?
- Conversion?

If not:

**Do not add it.**

Before adding an animation:

Does it improve the user's understanding or sense of progression?

If not:

**Do not animate it.**

Before adding an icon:

Can typography/layout communicate the same thing?

If yes:

**Do not use the icon.**

---

# 23 — FINAL VISUAL STANDARD

The website should feel:

**Quiet**
**Confident**
**Precise**
**Premium**
**Engineered**

The goal is not to impress users with the number of effects.

The goal is to make them feel:

**"This company knows what it is doing."**

Visual quality should come from:

**Typography**
+
**Whitespace**
+
**Imagery**
+
**Composition**
+
**Motion**

Not:

**Effects**
+
**Icons**
+
**Glows**
+
**Decorations**

---

# 24 — REFERENCE WEBSITE PRINCIPLE

The SolarShift website may be used as a reference for:

- restraint
- whitespace
- visual hierarchy
- editorial composition
- section rhythm
- premium presentation

Do NOT copy:

- branding
- exact layouts
- content
- colours
- imagery
- interactions

Fivefold must retain its own identity.

---

# 25 — FINAL RULE

When the design feels too busy:

**Remove something.**

When the section feels too empty:

**First ask whether the whitespace is intentional.**

When there are too many words:

**Keep the strongest message and progressively reveal the rest.**

When there are too many cards:

**Replace them with one stronger composition.**

When there are too many effects:

**Remove them.**

When in doubt:

**Choose restraint.**
