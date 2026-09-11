## Repository Structure

This is a **client/server monorepo**:

- `client/` — Next.js 14 frontend (React website). All frontend source is under `client/src/`.
- `server/` — NestJS 10 backend (Lead API). Entry: `server/src/main.ts`. Port 3001.
- `docs/` — mdBook project handbook.
- Root `package.json` — convenience scripts only (`npm run dev:client`, `npm run dev:server`, etc.).

**Development:**
```bash
npm run dev:client   # http://localhost:3000
npm run dev:server   # http://localhost:3001/api/health
```

**Never** place `SUPABASE_SERVICE_ROLE_KEY`, `WHATSAPP_ACCESS_TOKEN`, or `WHATSAPP_VERIFY_TOKEN` in `client/` or any `NEXT_PUBLIC_` variable.

---

## Frontend Design System

For all frontend, UI, UX, styling, layout, animation, and responsive-design work:

- Treat `DESIGN.md` as the authoritative visual design system for this project.
- Use all relevant Skills available in `.claude/skills/` and `.agents/skills/`.
- Treat applicable design Skills as mandatory design guidance, not optional suggestions.

### Installed Design Skills

- `design-taste-frontend` — overall frontend design quality, visual taste, anti-AI-slop principles, composition, hierarchy, spacing, and polish.
- `web-design-...` — web design methodology and visual implementation guidance.
- `image-to-code` — image-first website design and implementation workflow.

### Fivefold Color Palette
- **Primary Dark**: `#173B53` (primary typography, navigation, primary buttons, dark sections, footer)
- **Accent Blue**: `#1684C7` (controlled emphasis, subtle highlights, active states)
- **Secondary Text**: `#526673` (supporting copy, captions, body text)
- **Light Background**: `#F6F3EC` (primary page canvas, ~70% light surface dominance)
- **Surface White**: `#FFFFFF` (clean cards, framed containers, modals)
- **Border / Subtle Neutral**: `#DCE2E2` (crisp structural borders, subtle framing)

### Hero Scroll Architecture
- **Text → Framed Image → Fullscreen Image**:
  - Initial: Light `#F6F3EC` canvas, editorial copy & CTA, large framed solar visual below copy.
  - Phase 1: Copy moves smoothly upward out of primary view.
  - Phase 2: Solar image container progressively expands from framed to edge-to-edge.
  - Phase 3: Fullscreen solar installation climax, seamlessly transitioning to subsequent sections.

### Image-to-Code Workflow

For visually important website/design tasks where image generation is available:

1. Generate the visual reference image(s) first.
2. Deeply analyze the generated image(s).
3. Extract the visual system, including typography, spacing, colors, layout, components, imagery, buttons, and visual hierarchy.
4. Only then implement the frontend.
5. Keep the implementation visually faithful to the reference.
6. Generate additional section/detail images when the reference is not clear enough.
7. Do not blindly approximate the design from memory.
8. Do not replace the generated design with a generic UI implementation.

For multiple website sections, prefer clear, section-specific visual references rather than one compressed, unreadable design board.

Do not crop old generated images when a fresh section-specific image would provide better design clarity.

### Design Quality

Always avoid:
- Generic AI-looking layouts
- Excessive cards
- Cards inside cards inside cards
- Giant rounded containers around everything
- Excessive pills and badges
- Fake technical labels
- Weak typography hierarchy
- Excessive visual clutter
- Generic gradients and unnecessary effects
- Overly dense first-screen layouts

Keep interfaces:
- Premium
- Art-directed
- Readable
- Responsive
- Accessible
- Consistent
- Implementation-friendly
- Visually distinctive

Before significant frontend work, inspect the existing implementation and preserve established components, tokens, patterns, and visual language.

Do not modify `DESIGN.md` or Skill files unless explicitly instructed.