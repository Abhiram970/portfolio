// Build one mockup's DOM
window.buildMockup = function buildMockup(id, num, codename) {
  const D = window.PORTFOLIO_DATA;
  const M = window.MINI_SVGS;

  const root = document.createElement("section");
  root.className = "mockup mockup-" + id;
  root.id = "mockup-" + id;
  root.setAttribute("data-screen-label", `0${id} ${codename}`);

  // ---------- nav ----------
  const nav = document.createElement("nav");
  nav.className = "mk-nav";
  nav.innerHTML = `
    <div class="nav-left">
      <span class="status-dot"></span>
      <span>${D.initials} / ${codename} <span style="opacity:.45">·</span> v0.${id}</span>
    </div>
    <div class="nav-links">
      <a href="#sec-work-${id}"><b>/01</b>Work</a>
      <a href="#sec-about-${id}"><b>/02</b>About</a>
      <a href="#sec-skills-${id}"><b>/03</b>Skills</a>
      <a href="#sec-cv-${id}"><b>/04</b>CV</a>
      <a href="#sec-contact-${id}"><b>/05</b>Contact</a>
    </div>
  `;
  root.appendChild(nav);

  // ---------- hero ----------
  const hero = document.createElement("section");
  hero.className = "mk-section hero";
  hero.id = `sec-about-${id}`;
  hero.innerHTML = `
    <div class="eyebrow"><span class="idx">/ 00</span> HERO + ABOUT</div>
    <div class="hero-grid">
      <div>
        <h1 class="hero-name">
          <span class="name-l1" data-split>${D.name.split(' ')[0]}</span>
          <span class="name-l2" data-split>${D.name.split(' ').slice(1).join(' ')}</span>
        </h1>
        <div class="hero-tag">> <span class="accent">${D.tagline}</span></div>
        <p class="hero-blurb">${D.blurb}</p>
        <div class="meta-strip">
          <span><b>LOC</b>${D.meta.location}</span>
          <span><b>ROLE</b>${D.meta.role}</span>
          <span><span class="live-dot"></span>${D.meta.availability}</span>
          <span><b>TZ</b>${D.meta.timezone}</span>
        </div>
      </div>
      <div class="cloud-panel" data-cloud>
        <div class="corner tl">EMBEDDING SPACE</div>
        <div class="corner tr">N=140</div>
        <div class="corner bl">UMAP · k=12</div>
        <div class="corner br">∇ FIELD</div>
        <svg viewBox="0 0 400 400" preserveAspectRatio="xMidYMid meet"></svg>
      </div>
    </div>
  `;
  root.appendChild(hero);

  // ---------- projects ----------
  const proj = document.createElement("section");
  proj.className = "mk-section projects";
  proj.id = `sec-work-${id}`;
  proj.innerHTML = `
    <div class="eyebrow"><span class="idx">/ 01</span> WORK · SELECTED</div>
    <div class="projects-grid">
      ${D.projects.map((p, i) => `
        <article class="proj-card ${p.span}" data-reveal>
          <div class="proj-head">
            <span class="proj-num">${p.num}</span>
            <span class="proj-num proj-cs-status">CASE STUDY · UNDER CONSTRUCTION</span>
          </div>
          <h3 class="proj-title">${p.title}</h3>
          <p class="proj-desc">${p.desc}</p>
          ${M[p.kind] ? M[p.kind](i + id) : ""}
          <div class="proj-tags">${p.tags.map(t => `<span class="tag${t === 'WIP' ? ' wip-tag' : ''}">${t}</span>`).join("")}</div>
          <div class="proj-cta proj-cta-disabled">CASE STUDY UNDER CONSTRUCTION — NO CASE STUDIES YET</div>
        </article>
      `).join("")}
    </div>
  `;
  root.appendChild(proj);

  // ---------- skills ----------
  const skills = document.createElement("section");
  skills.className = "mk-section skills";
  skills.id = `sec-skills-${id}`;
  skills.innerHTML = `
    <div class="eyebrow"><span class="idx">/ 02</span> SKILLS · DRAG TO REARRANGE</div>
    <div class="skills-wrap">
      <div class="scatter-stage" data-scatter>
        <span class="axis-label x-low">← LOW-LEVEL</span>
        <span class="axis-label x-high">HIGH-LEVEL →</span>
        <span class="axis-label y-low">↓ RESEARCH</span>
        <span class="axis-label y-high">↑ PRODUCTION</span>
        ${D.skills.map((s, i) => {
          const sizePx = 14 + s.p * 36;
          const sizeMobile = 10 + s.p * 18;
          return `<div class="skill-dot" data-secondary="${s.secondary}"
                       data-x="${s.x}" data-y="${s.y}" data-i="${i}"
                       style="left:${s.x*100}%;top:${(1-s.y)*100}%;--dot-d:${sizePx}px;--dot-m:${sizeMobile}px;">
                    <span class="label">${s.name}</span>
                  </div>`;
        }).join("")}
      </div>
      <div class="skills-list">
        ${D.skillGroups.map((g, gi) => `
          <div class="skill-group">
            <h4><b>/ 0${gi+1}</b>${g.title}</h4>
            <ul>${g.items.map(it => `<li>${it}</li>`).join("")}</ul>
          </div>
        `).join("")}
      </div>
    </div>
  `;
  root.appendChild(skills);

  // ---------- timeline (F1 era scrubber, photo + rolling year) ----------
  const ERAS = window.F1_ERAS;
  const yearDigits = (y) => y.split("").map(d => `<span class="d-col"><span class="d-strip">${"0123456789".split("").map(n=>`<span>${n}</span>`).join("")}</span></span>`).join("");

  const eraCardsHTML = ERAS.map((e, i) => `
    <article class="era-card ${i===0?'is-active':''}" data-era="${i}">
      <div class="era-photo">
        <img src="${e.img}" alt="${e.label} era visual — ${e.role} at ${e.team}, ${e.year}" loading="lazy" referrerpolicy="no-referrer">
        <div class="era-photo-grade"></div>
      </div>
      <div class="era-body">
        <div class="era-meta">
          <span class="era-label"><b>/ 0${i+1}</b>${e.label} ERA</span>
          <span class="era-team">TEAM ${e.team}</span>
        </div>
        <h4 class="era-role">${e.role}</h4>
        <p class="era-note">${e.note}</p>
      </div>
    </article>
  `).join("");

  // rolling-digit year display (4 digit columns)
  const rollingYearHTML = `
    <div class="era-year-roll" data-year-roll aria-hidden="true">
      ${[0,1,2,3].map(()=>`<span class="d-col"><span class="d-strip">${"0123456789".split("").map(n=>`<span>${n}</span>`).join("")}</span></span>`).join("")}
    </div>
  `;

  const tlEntriesHTML = D.timeline.map(t => {
    if (t.era) {
      return `<div class="era-marker" data-reveal><span class="era-year">${t.label}</span></div>`;
    }
    const body = t.points && t.points.length
      ? `<ul class="tl-points">${t.points.map(p => `<li>${p}</li>`).join("")}</ul>`
      : (t.summary ? `<p class="tl-summary">${t.summary}</p>` : "");
    return `
      <article class="tl-entry" data-reveal>
        <span class="dot"></span>
        <header class="tl-head">
          <span class="tl-year">${t.year}</span>
          <span class="tl-co">${t.company}</span>
        </header>
        <h4 class="tl-role">${t.role}</h4>
        ${body}
      </article>
    `;
  }).join("");

  const timeline = document.createElement("section");
  timeline.className = "mk-section timeline-section";
  timeline.id = `sec-cv-${id}`;
  timeline.innerHTML = `
    <div class="eyebrow"><span class="idx">/ 03</span> EXPERIENCE · ERA TIMELINE</div>

    <div class="era-stage" data-era-stage>
      ${rollingYearHTML}
      <button class="era-arrow prev" data-era-prev aria-label="Previous era">←</button>
      <button class="era-arrow next" data-era-next aria-label="Next era">→</button>
      <div class="era-cards" data-era-cards>${eraCardsHTML}</div>
    </div>

    <div class="era-scrub" data-era-scrub>
      <div class="era-track">
        <div class="era-fill" data-era-fill></div>
        ${ERAS.map((e,i)=>`<button class="era-tick" data-era-go="${i}"><span>${e.year}</span><span class="tick-label">${e.label}</span></button>`).join("")}
        <div class="era-handle" data-era-handle><span class="handle-grip"></span></div>
      </div>
    </div>

    <div class="cv-download-row">
      <a class="cv-dl-btn" href="PV_Abhiram%20Resume.pdf" download="PV_Abhiram_Resume.pdf">
        <span class="cv-dl-icon">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M9 2v10M5 8l4 4 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M2 14h14" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
          </svg>
        </span>
        <span class="cv-dl-text">
          <span class="cv-dl-title">DOWNLOAD CV</span>
          <span class="cv-dl-meta">PDF · 1 PAGE · UPDATED MAY 2026</span>
        </span>
        <span class="cv-dl-arrow">→</span>
      </a>
    </div>

    <details class="tl-detail-list">
      <summary>FULL CV · ROLES & EDUCATION</summary>
      <div class="timeline">
        <div class="timeline-rail">
          <svg preserveAspectRatio="none" viewBox="0 0 4 1000">
            <line class="rail-line" x1="2" y1="0" x2="2" y2="1000" pathLength="1" stroke-dasharray="1" stroke-dashoffset="1" data-rail></line>
          </svg>
        </div>
        <div class="timeline-entries">${tlEntriesHTML}</div>
      </div>
    </details>
  `;
  root.appendChild(timeline);

  // ---------- writing ----------
  const writing = document.createElement("section");
  writing.className = "mk-section writing";
  writing.innerHTML = `
    <div class="eyebrow"><span class="idx">/ 04</span> WRITING · RECENT</div>
    <div class="writing-list">
      ${D.writing.map(w => `
        <div class="write-row" data-reveal>
          <span class="write-date">${w.date}</span>
          <div>
            <div class="write-title">${w.title}</div>
            <div class="write-excerpt">${w.excerpt}</div>
          </div>
          <span class="write-read">${w.read}</span>
        </div>
      `).join("")}
    </div>
  `;
  if (D.writing.length > 0) root.appendChild(writing);

  // ---------- contact ----------
  const contact = document.createElement("section");
  contact.className = "mk-section contact";
  contact.id = `sec-contact-${id}`;
  contact.innerHTML = `
    <div class="eyebrow"><span class="idx">/ 05</span> CONTACT</div>
    <h2 class="contact-statement">${D.contact.statement}</h2>
    <a class="contact-email" href="mailto:${D.contact.email}">${D.contact.email}</a>
    <div class="socials">
      ${D.contact.socials.map(s => `<a href="${s.url}">${s.label}</a>`).join("")}
    </div>
  `;
  root.appendChild(contact);

  // ---------- footer ----------
  const footer = document.createElement("footer");
  footer.className = "mk-footer";
  const stamp = "BUILD " + new Date().toISOString().replace("T", " ").slice(0, 16) + "Z";
  footer.innerHTML = `
    <span>${stamp}</span>
    <span>${D.meta.location} · 17.385°N <span class="accent-bit">●</span> 78.487°E</span>
    <span class="flourish">
      <svg width="60" height="12" viewBox="0 0 60 12">
        <line x1="0" y1="6" x2="40" y2="6" stroke="currentColor" stroke-width="1" opacity="0.5"/>
        <circle cx="46" cy="6" r="2" fill="currentColor"/>
        <line x1="52" y1="6" x2="60" y2="6" stroke="currentColor" stroke-width="1" opacity="0.5"/>
      </svg>
    </span>
    <span>0${id} / ${codename} · OK</span>
  `;
  root.appendChild(footer);

  return root;
};
