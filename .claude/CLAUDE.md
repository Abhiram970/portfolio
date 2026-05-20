# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this repo is

A **Claude Design handoff bundle** — HTML/CSS/JS prototypes for a personal portfolio site. The primary design to implement is [project/portfolio-fusion/Portfolio Fusion.html](project/portfolio-fusion/Portfolio%20Fusion.html). Your job is to recreate it pixel-perfectly in production technology (React, Svelte, Next.js, etc.) — match the visual output, not the prototype's internal structure.

There is no build system, bundler, or test suite in the prototypes. Everything runs directly in the browser via CDN imports.

## Primary design: Portfolio Fusion

The main file [Portfolio Fusion.html](project/portfolio-fusion/Portfolio%20Fusion.html) renders **4 side-by-side mockups** of the same portfolio in different visual directions: TELEMETRY, LAB NOTEBOOK, TERMINAL, and EDITORIAL.

### Architecture of the prototype

| File | Role |
|------|------|
| [data.js](project/portfolio-fusion/data.js) | Single source of truth — all content (projects, skills, timeline, writing, contact) lives in `window.PORTFOLIO_DATA` |
| [f1-eras.js](project/portfolio-fusion/f1-eras.js) | 4-era career timeline data in `window.F1_ERAS`; also defines theme swatches in `window.ERA_THEMES` |
| [mini-svgs.js](project/portfolio-fusion/mini-svgs.js) | Map of `kind → function(seed)` that renders inline SVG thumbnails for project cards |
| [build-mockup.js](project/portfolio-fusion/build-mockup.js) | `window.buildMockup(id, num, codename)` — builds one mockup's full DOM from `PORTFOLIO_DATA` |
| [motion.js](project/portfolio-fusion/motion.js) | ES module; exposes `window.initMockup(root, idx)` — drives all animations using **anime.js v4** |
| [theme-editor.js](project/portfolio-fusion/theme-editor.js) | `window.initThemeEditor()` — builds the left-side color dock; applies CSS custom props to all mockups |
| [styles.css](project/portfolio-fusion/styles.css) | All layout and visual styles; mockups are themed via `--bg`, `--fg`, `--accent`, `--accent-2`, `--font-display`, `--font-mono` scoped to `.mockup-N` |

### Theming system

Each mockup's root element (`.mockup-1` through `.mockup-4`) receives CSS custom properties at runtime:
- `--bg`, `--fg`, `--accent`, `--accent-2` — colors
- `--font-display`, `--font-mono` — font stacks

The theme editor's 6 primary palettes and 5 secondary accents are defined in [theme-editor.js](project/portfolio-fusion/theme-editor.js). The default is "BURNT ORANGE / CREAM" (`#15110E` bg, `#F2EDE4` fg, `#FF6B1F` accent).

### Animation system (motion.js)

Uses **anime.js v4** (CDN ESM import). Key entry points:
- `heroEntry(root)` — splits hero name into chars with staggered reveal
- `buildCloud(panel, idx)` — animated SVG point cloud in the hero panel
- `buildScatter(stage)` — draggable skill dots with spring-back on release
- `buildEraScrubber(root)` — F1-era career timeline with draggable handle, rolling digit year display, and keyboard navigation
- `setupReveals(root)` — scroll-triggered fade-up for `[data-reveal]` elements
- `buildRail(railEl)` — SVG timeline rail draws on scroll via `onScroll`

Respects `prefers-reduced-motion`.

### Sections (in DOM order within each mockup)

1. **Nav** — logo + 6 nav links
2. **Hero** — name (split-char animated), tagline, blurb, meta strip, animated point cloud SVG
3. **Projects** — masonry-ish grid of project cards with inline SVG thumbnails; cards span 2 or 3 columns via `span-2`/`span-3` classes
4. **Skills** — draggable scatter plot (x=low→high-level, y=research→production) + grouped list
5. **Timeline** — F1-era card carousel with scrubber track + draggable handle + rolling digit year; collapsible full CV list
6. **Writing** — date, title, excerpt, read-time rows
7. **Contact** — statement, email, social links
8. **Footer** — build stamp, coordinates, mockup ID

## Other design files

- [Animation Lab.html](project/Animation%20Lab.html) — standalone tab-switched canvas lab with 6 animation samples (three.js + anime.js v3). Each sample is its own script in [animation-lab/](project/animation-lab/).
- [project/portfolio-hifi/](project/portfolio-hifi/) — 4 JSX direction files (`DirectionA–D.jsx`) with shared [soul.js](project/portfolio-hifi/soul.js) animation engine and [data.js](project/portfolio-hifi/data.js)
- [project/Portfolio Hi-Fi.html](project/Portfolio%20Hi-Fi.html) and [Portfolio Hi-Fi-print.html](project/Portfolio%20Hi-Fi-print.html) — earlier hi-fi mockups
- [project/Portfolio Wireframes.html](project/Portfolio%20Wireframes.html) — wireframe explorations

## Fonts used

All loaded from Google Fonts:
- `Fraunces` (serif display, optical size aware) — Editorial/Vermillion themes
- `Inter` — Lab Notebook theme
- `JetBrains Mono` — Terminal theme, code labels
- `Space Grotesk` — Telemetry/Lime-mono themes
- `Bricolage Grotesque` — Acid Green theme
- `IBM Plex Mono` — Lab Notebook mono
- `Space Mono` — Editorial/Vermillion mono
