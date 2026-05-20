# pvabhiram.in

Personal portfolio for **PV Abhiram** — data analyst at Novartis Healthcare and ML researcher.

Live at [pv-abhiram.in](https://pv-abhiram.in) (and [pvabhiram.vercel.app](https://pvabhiram.vercel.app)).

## Stack

Static site. No build step.

- `index.html` + vanilla CSS + ES modules
- [anime.js v4](https://animejs.com/) for motion (loaded from CDN)
- Fonts from Google Fonts (Fraunces, Inter, JetBrains Mono, Space Grotesk, Bricolage Grotesque, IBM Plex Mono, Space Mono)

## Local dev

Open `index.html` in a browser. That's it — no install, no bundler, no dev server required. (A simple HTTP server like `python -m http.server` is recommended if you want module imports to behave the same as production.)

## Structure

```
index.html             Entry point
styles.css             All styles + per-theme overrides
data.js                Content (projects, skills, timeline, contact)
f1-eras.js             Career-era data + theme swatches
mini-svgs.js           Inline SVG thumbnails for project cards
build-mockup.js        Builds the page DOM from data
motion.js              All animations (anime.js v4 ES module)
theme-editor.js        Left-side color/font dock
PV_Abhiram Resume.pdf  Linked from the contact section
*.jpg                  Era card photography
explorations/          Earlier design directions, wireframes, animation experiments
.claude/CLAUDE.md      Working notes for the AI assistant used during development
```

## Deployment

Auto-deploys from `main` via Vercel. The previous Next.js portfolio lives on the [`old-midnight-editorial`](https://github.com/Abhiram970/portfolio/tree/old-midnight-editorial) branch.
