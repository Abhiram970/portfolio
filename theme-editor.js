// Color dock — left sidebar
// Single primary palette pick + optional secondary accent, applied to ALL mockups.
// Default: Editorial (orange/cream).
//
// Each "primary" swatch carries a full theme (bg + fg + accent + display + mono fonts).
// Each "secondary" swatch is just an accent color used sparingly.

const PRIMARIES = [
  // Telemetry (default)
  { id: "acid", name: "ACID GREEN / BLACK", default: true,
    bg:"#0E0E10", fg:"#F4F4F2", accent:"#D2FF00",
    display:"'Bricolage Grotesque', 'Space Grotesk', system-ui, sans-serif",
    mono:"'JetBrains Mono', ui-monospace, monospace",
    num:"'Bricolage Grotesque', 'Space Grotesk', system-ui, sans-serif" },
  // Editorial
  { id: "orange", name: "BURNT ORANGE / CREAM",
    bg:"#15110E", fg:"#F2EDE4", accent:"#FF6B1F",
    display:"'Fraunces', Georgia, serif",
    mono:"'Space Mono', ui-monospace, monospace",
    num:"'Space Grotesk', system-ui, sans-serif" },
  // Lab Notebook
  { id: "blue", name: "ELECTRIC BLUE / OFF-WHITE",
    bg:"#F4F4F2", fg:"#111112", accent:"#2D5BFF",
    display:"'Inter', system-ui, sans-serif",
    mono:"'IBM Plex Mono', ui-monospace, monospace",
    num:"'IBM Plex Mono', ui-monospace, monospace" },
  // Terminal
  { id: "cyan", name: "CYAN / NAVY",
    bg:"#0A0E1A", fg:"#C8D4E8", accent:"#00E5FF",
    display:"'JetBrains Mono', ui-monospace, monospace",
    mono:"'JetBrains Mono', ui-monospace, monospace",
    num:"'Space Grotesk', system-ui, sans-serif" },
  // Two extras
  { id: "vermillion", name: "VERMILLION / SAND",
    bg:"#16110D", fg:"#EFE7DA", accent:"#FF3B1F",
    display:"'Fraunces', Georgia, serif",
    mono:"'Space Mono', ui-monospace, monospace",
    num:"'Space Grotesk', system-ui, sans-serif" },
  { id: "lime-mono", name: "LIME / INK",
    bg:"#0B0C0A", fg:"#EAEEDF", accent:"#B8FF3D",
    display:"'Space Grotesk', system-ui, sans-serif",
    mono:"'JetBrains Mono', ui-monospace, monospace",
    num:"'JetBrains Mono', ui-monospace, monospace" }
];

const SECONDARIES = [
  { id: "none",     name: "NONE",     val: null },
  { id: "magenta",  name: "MAGENTA",  val: "#FF2E63" },
  { id: "lime",     name: "LIME",     val: "#B8FF3D" },
  { id: "violet",   name: "VIOLET",   val: "#9B5BFF" },
  { id: "amber",    name: "AMBER",    val: "#FFB800" }
];

const NUM_MOCKUPS = 1;

let STATE = {
  primary: PRIMARIES.find(p => p.default).id,
  secondary: "none",
  open: false
};

function applyToAll() {
  const p = PRIMARIES.find(x => x.id === STATE.primary);
  const s = SECONDARIES.find(x => x.id === STATE.secondary);
  for (let i = 1; i <= NUM_MOCKUPS; i++) {
    const root = document.querySelector(".mockup-" + i);
    if (!root) continue;
    root.style.setProperty("--bg", p.bg);
    root.style.setProperty("--fg", p.fg);
    root.style.setProperty("--accent", p.accent);
    root.style.setProperty("--accent-2", s.val || p.accent);
    root.style.setProperty("--font-display", p.display);
    root.style.setProperty("--font-mono", p.mono);
    root.style.setProperty("--font-num", p.num || p.display);
  }
  // sync hero canvases (re-paint accent)
  if (window.repaintAllPointClouds) window.repaintAllPointClouds();
}

function buildDock() {
  // remove old theme-editor if it exists
  const old = document.querySelector(".theme-editor");
  if (old) old.remove();

  const dock = document.createElement("aside");
  dock.className = "color-dock";
  dock.innerHTML = `
    <button class="dock-toggle" data-dock-toggle aria-label="Toggle color dock">
      <span class="ico"></span>
    </button>

    <div class="dock-section">
      <div class="dock-label">PRIMARY</div>
      ${PRIMARIES.map(p => `
        <button class="swatch" data-prim="${p.id}">
          <span class="chip" style="background:${p.accent}"></span>
          <span class="name">${p.name}</span>
          ${p.default ? '<span class="badge">DEFAULT</span>' : ''}
        </button>
      `).join("")}

      <div class="dock-label" style="margin-top:10px">SECONDARY</div>
      ${SECONDARIES.map(s => `
        <button class="swatch" data-sec="${s.id}">
          <span class="chip" style="background:${s.val || 'transparent'};${s.val?'':'background-image:linear-gradient(45deg, transparent 47%, #6a707a 47%, #6a707a 53%, transparent 53%);'}"></span>
          <span class="name">${s.name}</span>
        </button>
      `).join("")}
    </div>
  `;
  document.body.appendChild(dock);

  const toggleBtn = dock.querySelector("[data-dock-toggle]");
  toggleBtn.addEventListener("click", () => {
    STATE.open = !STATE.open;
    dock.classList.toggle("is-open", STATE.open);
  });

  dock.querySelectorAll("[data-prim]").forEach(btn => {
    btn.addEventListener("click", () => {
      STATE.primary = btn.dataset.prim;
      paintActive();
      applyToAll();
    });
  });
  dock.querySelectorAll("[data-sec]").forEach(btn => {
    btn.addEventListener("click", () => {
      STATE.secondary = btn.dataset.sec;
      paintActive();
      applyToAll();
    });
  });

  function paintActive() {
    dock.querySelectorAll("[data-prim]").forEach(b => b.classList.toggle("is-active", b.dataset.prim === STATE.primary));
    dock.querySelectorAll("[data-sec]").forEach(b => b.classList.toggle("is-active", b.dataset.sec === STATE.secondary));
  }

  paintActive();
  applyToAll();
}

window.initThemeEditor = buildDock;
