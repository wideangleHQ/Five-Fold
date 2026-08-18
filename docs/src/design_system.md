# Design system

## Direction

Clean, modern, engineering-flavoured, premium, trustworthy. The brief is
specific about what this is *not*: not a generic green-heavy renewable-energy
template, not stock-photo-heavy, not cartoon solar illustrations, not
excessive gradients or icon soup, not crowded cards, not animation for its own
sake. If a section starts looking like a template default, that's the signal
to simplify rather than decorate further.

## Colour — draft only

```
Primary Green   #1F7A45
Deep Green      #0B3D2E
Charcoal        #111615
Off White       #F7F8F5
Solar Accent    #E9B949
Pure White      #FFFFFF
```

The handwritten notes explicitly request a homepage colour-combination
change. Do not treat the palette above as locked — build 2–3 real visual
directions from it and get client sign-off before it becomes the design
token set. See [Client confirmations](client_confirmations.md).

## Typography

Headings: a geometric sans in the Manrope/Geist/Satoshi family. Body: Inter or
Manrope. Scale:

```
H1  64-88px desktop
H2  44-64px
H3  24-32px
Body 17-19px
```

Mobile sizes should be designed intentionally at each breakpoint, not derived
by uniformly shrinking the desktop scale.

## Imagery

High-quality solar installations, industrial rooftops, engineers on site,
Odisha/Indian context, real project photography wherever Fivefold has it and
has permission to use it — the same publication-permission concern that
governs the project portfolio applies to any photo tied to a named client
site. Avoid anything that reads as generic solar stock photography.

## Motion

See [Features](features.md) for the Framer Motion / GSAP split. The design
principle behind it: motion should support premium, not perform "advanced
website."

## Responsive breakpoints

Not yet fixed — use Tailwind's defaults unless a specific layout needs a
custom breakpoint, and note it here if one gets added.
