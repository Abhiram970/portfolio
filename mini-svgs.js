// Mini SVG generators for project cards (deterministic, line-art style)
window.MINI_SVGS = {
  // tiny loss curve
  loss(seed) {
    const w = 200, h = 96;
    const pts = [];
    let v = 0.95;
    for (let i = 0; i <= 40; i++) {
      const x = (i / 40) * w;
      v = v * 0.94 + (Math.sin(i * 0.7 + seed) * 0.04 + 0.06) * (1 - i / 60);
      const y = h - 8 - v * (h - 16);
      pts.push([x, y]);
    }
    const d = pts.map((p, i) => (i ? "L" : "M") + p[0].toFixed(1) + "," + p[1].toFixed(1)).join(" ");
    const guides = [];
    for (let i = 1; i < 4; i++) {
      const y = (i * h) / 4;
      guides.push(`<line x1="0" y1="${y}" x2="${w}" y2="${y}" stroke-dasharray="2 4" opacity="0.35"/>`);
    }
    return `<svg class="proj-svg" viewBox="0 0 ${w} ${h}" preserveAspectRatio="none">${guides.join("")}<path d="${d}"/></svg>`;
  },

  // training curve with two series
  curve(seed) {
    const w = 200, h = 96;
    const pts1 = [], pts2 = [];
    for (let i = 0; i <= 40; i++) {
      const x = (i / 40) * w;
      const y1 = h - 10 - Math.min(1, Math.log(1 + i) / 3.6) * (h - 22) + Math.sin(i * 0.9 + seed) * 2;
      const y2 = h - 10 - Math.min(1, Math.log(1 + i) / 4.2) * (h - 22) + Math.cos(i * 0.7 + seed) * 2;
      pts1.push([x, y1]);
      pts2.push([x, y2]);
    }
    const d1 = pts1.map((p, i) => (i ? "L" : "M") + p[0].toFixed(1) + "," + p[1].toFixed(1)).join(" ");
    const d2 = pts2.map((p, i) => (i ? "L" : "M") + p[0].toFixed(1) + "," + p[1].toFixed(1)).join(" ");
    return `<svg class="proj-svg" viewBox="0 0 ${w} ${h}" preserveAspectRatio="none"><path d="${d1}" opacity="0.4"/><path d="${d2}" class="fill" stroke="currentColor" fill="none"/></svg>`;
  },

  // confusion matrix
  matrix() {
    const w = 200, h = 96, n = 6;
    const cell = h / n;
    const ox = (w - cell * n) / 2;
    let cells = "";
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        const diag = i === j ? 0.85 : Math.max(0, 0.35 - Math.abs(i - j) * 0.08 + Math.sin(i * 3 + j) * 0.05);
        if (diag > 0.05) {
          const op = (diag * 0.95).toFixed(2);
          cells += `<rect class="fill" x="${ox + j * cell}" y="${i * cell}" width="${cell - 1}" height="${cell - 1}" opacity="${op}"/>`;
        } else {
          cells += `<rect x="${ox + j * cell}" y="${i * cell}" width="${cell - 1}" height="${cell - 1}" opacity="0.3"/>`;
        }
      }
    }
    return `<svg class="proj-svg" viewBox="0 0 ${w} ${h}" preserveAspectRatio="xMidYMid meet">${cells}</svg>`;
  },

  // attention pattern
  attention() {
    const w = 200, h = 96, n = 16;
    const cw = w / n, ch = h / n;
    let out = "";
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        if (j > i) continue; // causal
        let v = Math.exp(-((i - j) * (i - j)) / 12) * 0.7
              + (j === 0 ? 0.3 : 0)
              + Math.sin(i * 0.7 + j * 0.4) * 0.08;
        v = Math.max(0, Math.min(1, v));
        if (v > 0.06) {
          out += `<rect class="fill" x="${j * cw}" y="${i * ch}" width="${cw}" height="${ch}" opacity="${v.toFixed(2)}"/>`;
        }
      }
    }
    return `<svg class="proj-svg" viewBox="0 0 ${w} ${h}" preserveAspectRatio="none">${out}</svg>`;
  },

  // tsne scatter
  tsne(seed) {
    const w = 200, h = 96;
    let out = "";
    const blobs = [
      { cx: 40,  cy: 50, r: 18, n: 22 },
      { cx: 100, cy: 30, r: 14, n: 14 },
      { cx: 160, cy: 60, r: 20, n: 24 },
      { cx: 130, cy: 78, r: 10, n: 10 },
    ];
    blobs.forEach((b, bi) => {
      for (let i = 0; i < b.n; i++) {
        const a = Math.sin(i * 12.9898 + bi * 78.233 + seed) * 43758.5453;
        const r1 = (a - Math.floor(a));
        const a2 = Math.sin(i * 39.346 + bi * 11.135 + seed * 2) * 43758.5453;
        const r2 = (a2 - Math.floor(a2));
        const ang = r1 * Math.PI * 2;
        const dist = Math.sqrt(r2) * b.r;
        const x = b.cx + Math.cos(ang) * dist;
        const y = b.cy + Math.sin(ang) * dist;
        const cls = bi === 1 ? 'class="fill"' : "";
        out += `<circle ${cls} cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="1.4" opacity="${(0.5 + r1 * 0.5).toFixed(2)}"/>`;
      }
    });
    return `<svg class="proj-svg" viewBox="0 0 ${w} ${h}" preserveAspectRatio="none">${out}</svg>`;
  },

  // vector field flow
  field() {
    const w = 200, h = 96;
    let out = "";
    for (let y = 8; y < h; y += 12) {
      for (let x = 8; x < w; x += 12) {
        const a = Math.sin(x * 0.04 + y * 0.06) * 0.6 + Math.cos(y * 0.05) * 0.5;
        const dx = Math.cos(a) * 4;
        const dy = Math.sin(a) * 4;
        out += `<line x1="${x - dx}" y1="${y - dy}" x2="${x + dx}" y2="${y + dy}" opacity="0.7"/>`;
      }
    }
    return `<svg class="proj-svg" viewBox="0 0 ${w} ${h}" preserveAspectRatio="none">${out}</svg>`;
  },

  // spectrogram-ish bars
  spectrum(seed) {
    const w = 200, h = 96, n = 60;
    const cw = w / n;
    let out = "";
    for (let i = 0; i < n; i++) {
      const v = (Math.sin(i * 0.5 + seed) * 0.4 + Math.sin(i * 1.7 + seed * 2) * 0.3 + 0.5);
      const bh = (Math.max(0.05, v)) * (h - 8);
      const cls = i % 7 === 0 ? 'class="fill"' : "";
      out += `<rect ${cls} x="${i * cw + 1}" y="${h - bh}" width="${cw - 2}" height="${bh}" opacity="${(0.4 + v * 0.5).toFixed(2)}"/>`;
    }
    return `<svg class="proj-svg" viewBox="0 0 ${w} ${h}" preserveAspectRatio="none">${out}</svg>`;
  }
};
