# PV Abhiram — Portfolio

Personal portfolio for **PV Abhiram** — Data Analyst at Novartis Healthcare and Machine Learning Engineer.

**Live**: [www.pv-abhiram.in](https://www.pv-abhiram.in)
**CV / Resume**: [Download PDF](https://www.pv-abhiram.in/PV_Abhiram%20Resume.pdf) · [View in repo](./PV_Abhiram%20Resume.pdf)

## About me

I work on Generative AI, NLP, and Computer Vision. Currently building CRM and Generative AI workflows at Novartis. Previously at Vivriti Capital (Data Science) and Samsung R&D (Bixby capsule, NLLB translation — [arXiv:2403.05982](https://arxiv.org/abs/2403.05982)). VIT Chennai, BTech CSE with AI & ML, 2024.

- Portfolio: https://www.pv-abhiram.in
- Email: abhiramp428@gmail.com
- GitHub: [@Abhiram970](https://github.com/Abhiram970)

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
og-image.png           1200x630 social-share card
sitemap.xml            SEO sitemap
robots.txt             Crawler directives
manifest.webmanifest   PWA manifest
*.jpg                  Era card photography
explorations/          Earlier design directions, wireframes, animation experiments
.claude/CLAUDE.md      Working notes for the AI assistant used during development
```

## Deployment

Auto-deploys from `main` via Vercel. The previous Next.js portfolio lives on the [`old-midnight-editorial`](https://github.com/Abhiram970/portfolio/tree/old-midnight-editorial) branch.

## SEO

- Sitemap: https://www.pv-abhiram.in/sitemap.xml
- robots.txt: https://www.pv-abhiram.in/robots.txt
- OG image: https://www.pv-abhiram.in/og-image.png
- JSON-LD Person + WebSite schema in `<head>` of `index.html`
