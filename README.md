# Personal Portfolio — Revolut design brief

A personal portfolio built with **Next.js (App Router)**, **TypeScript** and **Tailwind CSS v4**, featuring **projects**, **hackathons**, **experience** and an **MDX blog**.

The visual language follows the [Revolut design brief](https://github.com/voltagent/awesome-design-md): a high-contrast two-mode system (stark black storytelling / white cataloguing), full-bleed alternating bands, cobalt-violet (`#494fdf`) reserved as a deliberate accent, pill buttons, and Aeonik-style display type (Schibsted Grotesk) over Inter body text.

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
```

Other scripts:

```bash
npm run build    # production build
npm run start    # serve the production build
```

## Making it yours

| What | Where |
| --- | --- |
| Name, bio, socials, stats | `lib/data.ts` → `profile`, `stats` |
| Projects | `lib/data.ts` → `projects[]` (set `featured: true` for the cobalt hero card) |
| Hackathons | `lib/data.ts` → `hackathons[]` (`isWin: true` highlights the result) |
| Experience / education | `lib/data.ts` → `experiences[]` |
| Articles | add an `.mdx` file to `content/articles/` |
| Colours, fonts, radii | `app/globals.css` (design tokens at the top) |
| Résumé | drop `resume.pdf` into `public/` |

### Adding an article

Create `content/articles/my-post.mdx` with frontmatter:

```mdx
---
title: "My post title"
excerpt: "One-line summary shown on cards."
date: "2026-01-20"
tags: ["Engineering", "Craft"]
accent: "violet"   # violet | teal | light-blue | pink | green | orange | yellow
---

Write your post in **Markdown / MDX** here.
```

Reading time, sorting and routing (`/articles/my-post`) are handled automatically.

## Design notes

- **Bands** — `<Section tone="invert">` flips a section to the opposite of the active theme, creating the magazine-spread rhythm in both light and dark modes.
- **Accent palette** — teal/pink/green/etc. are confined to "product mockup" surfaces (`<Mockup>`) and award chips, never to button backgrounds, per the brief.
- **Theme** — light-first with a working light/dark toggle (`next-themes`).

## Stack

Next.js · React 19 · TypeScript · Tailwind CSS v4 · next-mdx-remote · next-themes · lucide-react
