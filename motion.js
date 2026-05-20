// Motion + interactions, anime.js v4
import { animate, stagger, createTimeline, createDraggable, onScroll, svg as animeSvg, utils } from "https://cdn.jsdelivr.net/npm/animejs@4.0.2/+esm";

const REDUCED = matchMedia("(prefers-reduced-motion: reduce)").matches;

// ---------- split text helper ----------
function splitChars(el) {
  const text = el.textContent;
  el.textContent = "";
  const frag = document.createDocumentFragment();
  for (const ch of text) {
    const span = document.createElement("span");
    span.className = "char";
    span.textContent = ch === " " ? "\u00A0" : ch;
    frag.appendChild(span);
  }
  el.appendChild(frag);
  return el.querySelectorAll(".char");
}

// ---------- vector-field point cloud ----------
function buildCloud(panel, idx) {
  const svgEl = panel.querySelector("svg");
  const W = 400, H = 400;
  const N = 130;
  const pts = [];
  const rng = (n => () => {
    let x = Math.sin(n++) * 43758.5453;
    return x - Math.floor(x);
  })(idx * 1000 + 7);

  // pre-define a "highlighted cluster" — 22 points that share a center
  const clusterCenter = { x: 220 + rng() * 60, y: 130 + rng() * 60 };
  for (let i = 0; i < N; i++) {
    const inCluster = i < 22;
    const baseX = inCluster
      ? clusterCenter.x + (rng() - 0.5) * 80
      : rng() * W;
    const baseY = inCluster
      ? clusterCenter.y + (rng() - 0.5) * 80
      : rng() * H;
    pts.push({ x: baseX, y: baseY, r: inCluster ? 2.6 : 1.6, hi: inCluster, phase: rng() * Math.PI * 2 });
  }

  // background hairlines (axes-ish)
  const ns = "http://www.w3.org/2000/svg";
  const grid = document.createElementNS(ns, "g");
  grid.setAttribute("stroke", "currentColor");
  grid.setAttribute("opacity", "0.08");
  for (let i = 1; i < 4; i++) {
    const lx = document.createElementNS(ns, "line");
    lx.setAttribute("x1", (i * W) / 4); lx.setAttribute("x2", (i * W) / 4);
    lx.setAttribute("y1", 0); lx.setAttribute("y2", H);
    grid.appendChild(lx);
    const ly = document.createElementNS(ns, "line");
    ly.setAttribute("y1", (i * H) / 4); ly.setAttribute("y2", (i * H) / 4);
    ly.setAttribute("x1", 0); ly.setAttribute("x2", W);
    grid.appendChild(ly);
  }
  svgEl.appendChild(grid);

  // optional convex-hull-ish polyline around cluster
  const hull = document.createElementNS(ns, "path");
  const hullPts = pts.filter(p => p.hi);
  // sort by angle from center
  const cx = clusterCenter.x, cy = clusterCenter.y;
  hullPts.sort((a, b) => Math.atan2(a.y - cy, a.x - cx) - Math.atan2(b.y - cy, b.x - cx));
  const hullD = hullPts.map((p, i) => (i ? "L" : "M") + p.x + "," + p.y).join(" ") + " Z";
  hull.setAttribute("d", hullD);
  hull.setAttribute("fill", "var(--accent)");
  hull.setAttribute("opacity", "0.08");
  hull.setAttribute("stroke", "var(--accent)");
  hull.setAttribute("stroke-width", "0.6");
  hull.setAttribute("stroke-dasharray", "3 3");
  svgEl.appendChild(hull);

  // dots
  const dots = pts.map(p => {
    const c = document.createElementNS(ns, "circle");
    c.setAttribute("cx", p.x);
    c.setAttribute("cy", p.y);
    c.setAttribute("r", p.r);
    c.setAttribute("fill", p.hi ? "var(--accent)" : "currentColor");
    c.setAttribute("opacity", p.hi ? 0.95 : 0.45);
    svgEl.appendChild(c);
    return { node: c, base: p };
  });

  // gentle drift
  if (!REDUCED) {
    dots.forEach((d, i) => {
      animate(d.node, {
        cx: [d.base.x, d.base.x + Math.cos(d.base.phase) * 12, d.base.x],
        cy: [d.base.y, d.base.y + Math.sin(d.base.phase) * 12, d.base.y],
        duration: 6000 + (i % 7) * 400,
        ease: "inOutSine",
        loop: true
      });
    });
  }

  // entry: stagger fade-up
  animate(dots.map(d => d.node), {
    opacity: [{ from: 0 }],
    r: [{ from: 0 }],
    duration: 900,
    delay: stagger(8),
    ease: "outQuint"
  });
}

// ---------- timeline rail draw ----------
function buildRail(railEl) {
  // rail line draws via dashoffset based on entry visibility
  // We'll use onScroll to drive it from 1 -> 0
  if (REDUCED) {
    railEl.style.strokeDashoffset = 0;
    return;
  }
  animate(railEl, {
    strokeDashoffset: [1, 0],
    ease: "linear",
    autoplay: onScroll({
      target: railEl.closest(".timeline"),
      enter: "bottom top+=20%",
      leave: "top bottom",
      sync: 0.4
    })
  });
}

// ---------- skills draggable ----------
function buildScatter(stage) {
  const dots = stage.querySelectorAll(".skill-dot");
  dots.forEach(dot => {
    const draggable = createDraggable(dot, {
      container: stage,
      releaseEase: "outQuint"
    });
    draggable.onGrab = () => dot.classList.add("dragging");
    draggable.onRelease = () => dot.classList.remove("dragging");
  });

  // entry pop-in
  animate(dots, {
    scale: [{ from: 0 }],
    opacity: [{ from: 0 }],
    duration: 700,
    delay: stagger(20, { from: "center" }),
    ease: "outBack",
    autoplay: onScroll({ target: stage, enter: "bottom-=10% top", once: true })
  });
}

// ---------- generic reveals ----------
function setupReveals(root) {
  const els = root.querySelectorAll("[data-reveal]");
  els.forEach(el => {
    el.style.opacity = "0";
    el.style.transform = "translateY(28px)";
  });

  const revealObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      revealObs.unobserve(entry.target);
      animate(entry.target, {
        opacity: [0, 1],
        translateY: [28, 0],
        duration: 750,
        ease: "outQuint"
      });
    });
  }, { threshold: 0.08, rootMargin: "0px 0px -4% 0px" });

  els.forEach(el => revealObs.observe(el));

  // milestone dot pulse
  const dotObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-active");
      dotObs.unobserve(entry.target);
    });
  }, { threshold: 0.2 });

  root.querySelectorAll(".tl-entry").forEach(entry => dotObs.observe(entry));
}

// ---------- hero name split + entry ----------
function heroEntry(root) {
  const nameEls = [...root.querySelectorAll("[data-split]")];
  if (!nameEls.length) return;
  let startDelay = 0;
  nameEls.forEach(nameEl => {
    const chars = splitChars(nameEl);
    utils.set(chars, { opacity: 0, translateY: "0.6em", rotate: 6 });
    animate(chars, {
      opacity: [0, 1],
      translateY: ["0.6em", "0em"],
      rotate: [6, 0],
      duration: 1100,
      delay: stagger(45, { start: startDelay }),
      ease: "inOutQuint"
    });
    startDelay += chars.length * 45 + 80;
  });

  const tag = root.querySelector(".hero-tag");
  const blurb = root.querySelector(".hero-blurb");
  const meta = root.querySelectorAll(".meta-strip > span");
  utils.set([tag, blurb, ...meta], { opacity: 0, translateY: 14 });
  animate([tag, blurb, ...meta], {
    opacity: [0, 1],
    translateY: [14, 0],
    duration: 700,
    delay: stagger(60, { start: 600 }),
    ease: "outQuint"
  });
}

// ---------- 1. text scramble on tagline ----------
const GLYPHS = "アイウエオカキクケコABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#∇∑∏∂λ≈≡";

function scrambleEl(el, delay = 0) {
  if (REDUCED || !el) return;
  const original = el.textContent;
  const N = original.length;
  let frame = 0;

  setTimeout(() => {
    const id = setInterval(() => {
      el.textContent = [...original].map((ch, i) => {
        if (" —.,'".includes(ch)) return ch;
        if (i < frame) return original[i];
        return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
      }).join("");
      if (++frame > N) { clearInterval(id); el.textContent = original; }
    }, 38);
  }, delay);
}

// ---------- 2. mouse aurora spotlight ----------
function buildAurora(heroSection) {
  if (REDUCED) return;
  const glow = document.createElement("div");
  glow.className = "hero-aurora";
  heroSection.insertBefore(glow, heroSection.firstChild);

  let cx = -1000, cy = -1000, raf = null;

  function paint() {
    raf = null;
    glow.style.background =
      `radial-gradient(520px circle at ${cx}px ${cy}px,` +
      ` color-mix(in srgb, var(--accent) 13%, transparent), transparent 58%)`;
  }

  heroSection.addEventListener("mousemove", e => {
    const r = heroSection.getBoundingClientRect();
    cx = e.clientX - r.left;
    cy = e.clientY - r.top;
    if (!raf) raf = requestAnimationFrame(paint);
  });
  heroSection.addEventListener("mouseleave", () => {
    cx = -1000; cy = -1000;
    if (!raf) raf = requestAnimationFrame(paint);
  });
}

// ---------- 3. floating data particles ----------
function buildParticles(heroSection) {
  if (REDUCED) return;
  const stage = document.createElement("div");
  stage.className = "hero-particles";
  heroSection.insertBefore(stage, heroSection.firstChild);

  const N = 24;
  for (let i = 0; i < N; i++) {
    const p = document.createElement("span");
    p.className = "hero-particle";
    const size = 1.5 + Math.random() * 3;
    const dur  = 9 + Math.random() * 10;
    const drift = ((Math.random() - 0.5) * 90).toFixed(1);
    p.style.cssText =
      `width:${size}px;height:${size}px;` +
      `left:${(Math.random() * 100).toFixed(1)}%;` +
      `--drift:${drift}px;` +
      `animation-duration:${dur.toFixed(1)}s;` +
      `animation-delay:-${(Math.random() * dur).toFixed(1)}s;` +
      `opacity:${(0.2 + Math.random() * 0.35).toFixed(2)};`;
    stage.appendChild(p);
  }
}

// ---------- public init ----------
window.initMockup = function initMockup(root, idx) {
  heroEntry(root);

  const heroSection = root.querySelector(".hero");
  if (heroSection) {
    buildAurora(heroSection);
    buildParticles(heroSection);
  }
  // scramble starts after tagline fades in (~1.3 s)
  const tagAccent = root.querySelector(".hero-tag .accent");
  if (tagAccent) scrambleEl(tagAccent, 1450);

  const cloud = root.querySelector("[data-cloud]");
  if (cloud) buildCloud(cloud, idx);
  setupReveals(root);
  const rail = root.querySelector("[data-rail]");
  if (rail) buildRail(rail);
  const scatter = root.querySelector("[data-scatter]");
  if (scatter) buildScatter(scatter);
  const eraStage = root.querySelector("[data-era-stage]");
  if (eraStage) buildEraScrubber(root);
};

// ---------- F1 era scrubber ----------
function buildEraScrubber(root) {
  const stage = root.querySelector("[data-era-stage]");
  const cards = [...root.querySelectorAll(".era-card")];
  const ticks = [...root.querySelectorAll(".era-tick")];
  const fill = root.querySelector("[data-era-fill]");
  const handle = root.querySelector("[data-era-handle]");
  const prev = root.querySelector("[data-era-prev]");
  const next = root.querySelector("[data-era-next]");
  const track = root.querySelector(".era-track");
  if (!stage || !cards.length) return;

  const N = cards.length;
  let active = 0;

  // rolling year setup
  const yearRoll = root.querySelector("[data-year-roll]");
  const yearStrips = yearRoll ? yearRoll.querySelectorAll(".d-strip") : [];
  function rollYear(year) {
    const digits = String(year).padStart(4, "0").split("");
    yearStrips.forEach((strip, i) => {
      const d = parseInt(digits[i], 10);
      strip.style.transform = `translateY(-${d * 10}%)`;
    });
  }

  function setActive(i, animate2 = true) {
    i = Math.max(0, Math.min(N - 1, i));
    active = i;
    cards.forEach((c, j) => c.classList.toggle("is-active", j === i));
    ticks.forEach((t, j) => t.classList.toggle("is-active", j === i));
    // fill: from 0 to tick i center, as fraction of track
    const tickRect = ticks[i].getBoundingClientRect();
    const trackRect = track.getBoundingClientRect();
    const xCenter = (tickRect.left + tickRect.width / 2) - trackRect.left;
    const pct = (xCenter / trackRect.width) * 100;
    fill.style.width = pct + "%";
    handle.style.left = pct + "%";
    // year roll
    const era = window.F1_ERAS && window.F1_ERAS[i];
    if (era) rollYear(era.year);
  }

  ticks.forEach((t, i) => t.addEventListener("click", () => setActive(i)));
  prev?.addEventListener("click", () => setActive(active - 1));
  next?.addEventListener("click", () => setActive(active + 1));

  // drag handle
  let dragging = false;
  function pointerXToIndex(clientX) {
    const r = track.getBoundingClientRect();
    const ratio = Math.max(0, Math.min(1, (clientX - r.left) / r.width));
    return Math.round(ratio * (N - 1));
  }
  handle.addEventListener("pointerdown", (e) => {
    dragging = true;
    handle.setPointerCapture(e.pointerId);
    e.preventDefault();
  });
  handle.addEventListener("pointermove", (e) => {
    if (!dragging) return;
    const r = track.getBoundingClientRect();
    const pct = Math.max(0, Math.min(100, ((e.clientX - r.left) / r.width) * 100));
    handle.style.left = pct + "%";
    fill.style.width = pct + "%";
  });
  handle.addEventListener("pointerup", (e) => {
    if (!dragging) return;
    dragging = false;
    setActive(pointerXToIndex(e.clientX));
  });

  // also clicking on the track jumps
  track.addEventListener("click", (e) => {
    if (e.target === track || e.target === fill) {
      setActive(pointerXToIndex(e.clientX));
    }
  });

  // keyboard on stage
  stage.tabIndex = 0;
  stage.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") setActive(active - 1);
    if (e.key === "ArrowRight") setActive(active + 1);
  });

  // initial paint after layout settles
  requestAnimationFrame(() => requestAnimationFrame(() => setActive(0, false)));
  // also recompute on resize
  window.addEventListener("resize", () => setActive(active, false));
}
