# Portfolio — Backend / AI Engineer

A brutalist-tech personal site with scroll-driven GSAP motion and a live
linear-algebra canvas. Built from scratch — no template, no page builder.

```
Next.js 15 (App Router) · React 19 · TypeScript
GSAP 3.15  (ScrollTrigger · SplitText · ScrambleText)  +  @gsap/react
Lenis  (smooth scroll, synced to ScrollTrigger)
Tailwind CSS v4  (design tokens via @theme)
Space Grotesk (display) + JetBrains Mono (labels)  via next/font
```

## Run

```bash
npm install      # already done
npm run dev      # http://localhost:3000
npm run build    # production build
npm start        # serve the production build
```

## Where to edit

| What | File |
|------|------|
| **Site content** (bio, projects, hackathons, experience, education, socials) | `content/site.ts` |
| **Notes** — one Markdown file per article (frontmatter + MDX body) | `content/notes/*.mdx` |
| **Project detail bodies** | `content/details.ts` |
| Design tokens — dark + light palettes | `app/globals.css` → `@theme` + `:root[data-theme="light"]` |
| Theme read/toggle logic | `lib/theme.ts` |
| Section order / marquee placement | `app/page.tsx` |
| Nav links | `components/layout/Nav.tsx` → `SECTIONS` |
| The transforms the hero canvas morphs through | `lib/math.ts` → `TRANSFORMS` |
| SVG glyph assets used in animations | `public/svg/*.svg` |

`content/site.ts` is the single source of truth — swap the placeholder values
for your real details and every section updates. It's all typed, so you'll get
autocomplete and errors if a field is missing.

## The animations

| Effect | Where |
|--------|-------|
| Live 2×2 linear-transformation canvas (grid + point-cloud + î/ĵ basis vectors + live matrix readout) | `components/anim/MatrixField.tsx` |
| Scramble / decode-on-scroll headings | `components/anim/ScrambleHeading.tsx` |
| Masked line-by-line text reveals | `components/anim/SplitReveal.tsx` |
| Divider band — latency oscilloscope (canvas, scroll-reactive) | `components/anim/WaveBand.tsx` |
| Divider band — data-packet flow field (canvas) | `components/anim/PacketStream.tsx` |
| Divider band — throughput spectrum / equalizer (canvas) | `components/anim/EqualizerBars.tsx` |
| Divider band — live network graph (canvas) | `components/anim/GraphBand.tsx` |
| Divider band — orbital systems with comet trails (canvas) | `components/anim/OrbitalBand.tsx` |
| Divider band — phase-portrait (Lissajous) panel (canvas) | `components/anim/LissajousBand.tsx` |
| Count-up metrics | `components/anim/Counter.tsx` |
| Magnetic buttons | `components/anim/MagneticButton.tsx` |
| Animated RAG pipeline SVG (edges draw on, token flows) | `components/svg/NodeGraph.tsx` |
| Continuous Galton board (balls → normal distribution) | `components/anim/GaltonBoard.tsx` |
| Crosshair cursor with live coordinates | `components/layout/Cursor.tsx` |
| Scroll-filled timeline rail | `components/sections/Experience.tsx` |

## Pages & routing

- `/` — the single-scroll home (hero, about, work, hackathons, experience, education, notes, contact)
- `/work` and `/notes` — full index pages (linked via "ALL WORK / ALL NOTES")
- `/work/[slug]` — a reading-optimized detail page per project (SSG)
- `/notes/[slug]` — a reading-optimized article per note, **rendered from MDX** (SSG)

Project cards and note rows link through; nav links from any page route home and
smooth-scroll to the section. Detail pages use a constrained measure (~68ch),
larger type, and higher-contrast body text for comfortable reading.

### Writing notes (MDX)

Drop a new `content/notes/<slug>.mdx` file with frontmatter and Markdown — it
shows up automatically on the home Notes section, the `/notes` index (newest
first), and at `/notes/<slug>`:

```mdx
---
id: N-05
title: "Your note title"
date: "2026.06"
readingTime: "7 min"
tags: [systems, rust]
excerpt: "One-line summary used in the lists."
---

Body in **Markdown / MDX**. `## Headings`, lists, > quotes, and ```code``` fences
all pick up the brutalist prose styling automatically.
```

`lib/notes.ts` reads the folder (via `gray-matter`); the detail page renders the
body with `next-mdx-remote`.

## Divider bands

Six word-free animated bands sit between sections, each its own canvas/GSAP
scene (scroll-velocity reactive, on-screen-only, static under reduced motion):
latency oscilloscope · packet stream · throughput spectrum · network graph ·
orbital systems · phase-portrait panel.

## Light / dark mode

Toggle in the nav (sun/moon). The theme is stored in `localStorage`, defaults to
the OS `prefers-color-scheme`, and is applied before first paint via a tiny inline
script (no flash). Every colour is a CSS variable; the light palette overrides them
under `:root[data-theme="light"]`, so utilities, arbitrary `var()` styles, the prose,
and the SVG diagrams all re-theme for free. The `<canvas>` pieces read their palette
from those variables and re-read on a `themechange` event. The loud yellow is kept
for hover-fills; a readable `--color-accent-ink` is used for accent text/strokes.

## Accessibility

Everything respects `prefers-reduced-motion`: smooth scroll, the canvas morph,
scramble, marquee, and all reveals disable and the content renders statically.
Focus rings are visible and on-brand; the custom cursor only activates on fine
pointers. All decorative SVGs are `aria-hidden`; diagram SVGs have roles/labels.

## Deploy

It's a static-friendly Next app. `npm run build` → deploy the repo to Vercel
(zero config) or any Node host. Update `metadataBase` in `app/layout.tsx` to
your real domain for correct Open Graph URLs.
