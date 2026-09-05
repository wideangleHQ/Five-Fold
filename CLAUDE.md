## Frontend Design System

For all frontend, UI, UX, styling, layout, animation, and responsive-design work:

- Treat `DESIGN.md` as the authoritative visual design system for this project.
- Use all relevant Skills available in `.claude/skills/` and `.agents/skills/`.
- Treat applicable design Skills as mandatory design guidance, not optional suggestions.

### Installed Design Skills

- `design-taste-frontend` — overall frontend design quality, visual taste, anti-AI-slop principles, composition, hierarchy, spacing, and polish.
- `web-design-...` — web design methodology and visual implementation guidance.
- `image-to-code` — image-first website design and implementation workflow.

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