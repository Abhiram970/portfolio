/* Soul module — interactive moving objects woven into the page (no cursor follower) */

(function(){

  /* ============================================================
     1. INTERACTIVE CONSTELLATION — replaces static A-hero product
        Each dot = a project. Hover/move pulls dots toward cursor,
        nearest-neighbor lines appear, click triggers a ripple.
     ============================================================ */
  function attachConstellation(){
    const product = document.querySelector('.A-product');
    if(!product || product.dataset.constellation) return;
    product.dataset.constellation = '1';

    // Wipe any existing svg + tag
    const oldSvg = product.querySelector('svg');
    if(oldSvg) oldSvg.remove();

    // Create canvas for the constellation
    const canvas = document.createElement('canvas');
    canvas.className = 'soul-constellation';
    product.appendChild(canvas);

    // Re-add the floating tag if missing
    let tag = product.querySelector('.tag');
    if(!tag){
      tag = document.createElement('div');
      tag.className = 'tag';
      tag.innerHTML = '<span class="accent">●</span> MODEL_03 · CHURN_PREDICTOR';
      product.appendChild(tag);
    }

    const ctx = canvas.getContext('2d');
    let W=0, H=0, dpr = Math.min(window.devicePixelRatio || 1, 2);

    // 24 "project" dots placed roughly like a scatter (impact × effort)
    const dots = Array.from({length: 24}).map((_, i) => {
      const seed = i * 9.13;
      const x = 0.12 + (Math.sin(seed) * 0.5 + 0.5) * 0.78;
      const y = 0.12 + (Math.cos(seed * 1.3) * 0.5 + 0.5) * 0.76;
      return {
        bx: x, by: y,           // base normalized
        x: x, y: y,             // current normalized
        vx: 0, vy: 0,
        r: 3 + (Math.sin(seed*2) * 0.5 + 0.5) * 7,
        hue: i % 4 === 0 ? 'accent' : (i % 7 === 0 ? 'cream' : 'ink'),
        phase: Math.random() * Math.PI * 2,
        ripple: 0,              // 0..1 when active
      };
    });

    function resize(){
      const rect = product.getBoundingClientRect();
      W = rect.width; H = rect.height;
      canvas.width  = W * dpr;
      canvas.height = H * dpr;
      canvas.style.width  = W + 'px';
      canvas.style.height = H + 'px';
      ctx.setTransform(dpr,0,0,dpr,0,0);
    }
    resize();
    window.addEventListener('resize', resize);

    // Cursor in normalized coords
    let cx = 0.5, cy = 0.5, hover = false;
    product.addEventListener('mousemove', e=>{
      const r = product.getBoundingClientRect();
      cx = (e.clientX - r.left) / r.width;
      cy = (e.clientY - r.top)  / r.height;
      hover = true;
    });
    product.addEventListener('mouseleave', ()=>{ hover = false; });
    product.addEventListener('click', e=>{
      const r = product.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width;
      const py = (e.clientY - r.top)  / r.height;
      // Find nearest dot, ripple it
      let best = -1, bd = 999;
      dots.forEach((d,i)=>{
        const dx = d.x - px, dy = d.y - py;
        const dist = dx*dx + dy*dy;
        if(dist < bd){ bd = dist; best = i; }
      });
      if(best >= 0) dots[best].ripple = 1;
    });

    // Read CSS variables
    function readColors(){
      const cs = getComputedStyle(document.documentElement);
      return {
        accent: cs.getPropertyValue('--accent').trim() || '#d4622a',
        ink:    cs.getPropertyValue('--ink').trim()    || '#2a1f17',
        paper3: cs.getPropertyValue('--paper-3').trim()|| '#e0d4c0',
      };
    }
    let cols = readColors();
    setInterval(()=>{ cols = readColors(); }, 2000); // pick up tweak changes

    let t0 = performance.now();
    function frame(now){
      const t = (now - t0) / 1000;
      ctx.clearRect(0,0,W,H);

      // Subtle radial vignette
      const g = ctx.createRadialGradient(W*0.5, H*0.55, 0, W*0.5, H*0.55, Math.max(W,H)*0.6);
      g.addColorStop(0, 'rgba(212,98,42,0.18)');
      g.addColorStop(0.5, 'rgba(212,98,42,0.04)');
      g.addColorStop(1, 'rgba(212,98,42,0)');
      ctx.fillStyle = g;
      ctx.fillRect(0,0,W,H);

      // Update dots
      dots.forEach(d=>{
        // Gentle idle drift
        const drift = 0.0015;
        const dx = Math.sin(t*0.6 + d.phase) * drift;
        const dy = Math.cos(t*0.5 + d.phase*1.3) * drift;
        let tx = d.bx + dx, ty = d.by + dy;

        // Cursor attraction
        if(hover){
          const ex = cx - d.x, ey = cy - d.y;
          const dist = Math.sqrt(ex*ex + ey*ey);
          if(dist < 0.28){
            const pull = (0.28 - dist) * 0.25;
            tx += ex * pull;
            ty += ey * pull;
          }
        }
        d.vx += (tx - d.x) * 0.08;
        d.vy += (ty - d.y) * 0.08;
        d.vx *= 0.78; d.vy *= 0.78;
        d.x += d.vx; d.y += d.vy;
        if(d.ripple > 0) d.ripple -= 0.012;
      });

      // Connecting lines (nearest neighbors)
      ctx.lineWidth = 1;
      for(let i=0;i<dots.length;i++){
        for(let j=i+1;j<dots.length;j++){
          const a = dots[i], b = dots[j];
          const dx = (a.x - b.x) * W, dy = (a.y - b.y) * H;
          const dist = Math.sqrt(dx*dx + dy*dy);
          const max = 110;
          if(dist < max){
            const alpha = (1 - dist/max) * (hover ? 0.55 : 0.22);
            ctx.strokeStyle = `rgba(212,98,42,${alpha.toFixed(3)})`;
            ctx.beginPath();
            ctx.moveTo(a.x*W, a.y*H);
            ctx.lineTo(b.x*W, b.y*H);
            ctx.stroke();
          }
        }
      }

      // Cursor → nearest dot beams
      if(hover){
        dots.forEach(d=>{
          const dx = (cx - d.x) * W, dy = (cy - d.y) * H;
          const dist = Math.sqrt(dx*dx + dy*dy);
          if(dist < 90){
            const a = (1 - dist/90) * 0.6;
            ctx.strokeStyle = `rgba(235,226,212,${a.toFixed(3)})`;
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(cx*W, cy*H);
            ctx.lineTo(d.x*W, d.y*H);
            ctx.stroke();
          }
        });
      }

      // Dots themselves
      dots.forEach(d=>{
        const x = d.x * W, y = d.y * H;
        // Ripple ring
        if(d.ripple > 0){
          ctx.strokeStyle = `rgba(212,98,42,${d.ripple.toFixed(3)})`;
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.arc(x, y, d.r + (1 - d.ripple) * 30, 0, Math.PI*2);
          ctx.stroke();
        }
        // Glow halo
        const halo = ctx.createRadialGradient(x, y, 0, x, y, d.r * 4);
        halo.addColorStop(0, 'rgba(212,98,42,0.35)');
        halo.addColorStop(1, 'rgba(212,98,42,0)');
        ctx.fillStyle = halo;
        ctx.beginPath(); ctx.arc(x,y,d.r*4,0,Math.PI*2); ctx.fill();
        // Body
        const fill = d.hue === 'accent' ? cols.accent : (d.hue === 'cream' ? cols.paper3 : '#3a2a1d');
        ctx.fillStyle = fill;
        ctx.strokeStyle = '#0d0805';
        ctx.lineWidth = 1.5;
        ctx.beginPath(); ctx.arc(x, y, d.r, 0, Math.PI*2); ctx.fill(); ctx.stroke();
      });

      requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }

  /* ============================================================
     2. MESMERIZING WAVE BACKGROUND for "What I work on" (.A-specialty)
        Subtle parallaxed sine-waves, drawn in canvas, ambient.
     ============================================================ */
  function attachWaves(){
    const sec = document.querySelector('.A-specialty');
    if(!sec || sec.dataset.waves) return;
    sec.dataset.waves = '1';
    sec.classList.add('soul-waves-host');

    const canvas = document.createElement('canvas');
    canvas.className = 'soul-waves';
    sec.insertBefore(canvas, sec.firstChild);

    const ctx = canvas.getContext('2d');
    let W=0, H=0, dpr = Math.min(window.devicePixelRatio || 1, 2);

    function resize(){
      const r = sec.getBoundingClientRect();
      W = r.width; H = r.height;
      canvas.width  = W * dpr; canvas.height = H * dpr;
      canvas.style.width = W+'px'; canvas.style.height = H+'px';
      ctx.setTransform(dpr,0,0,dpr,0,0);
    }
    resize();
    window.addEventListener('resize', resize);
    // Watch for height changes (responsive)
    const ro = new ResizeObserver(resize);
    ro.observe(sec);

    // Hover offset for subtle parallax
    let mx = 0.5, my = 0.5;
    sec.addEventListener('mousemove', e=>{
      const r = sec.getBoundingClientRect();
      mx = (e.clientX - r.left) / r.width;
      my = (e.clientY - r.top)  / r.height;
    });

    const lines = [
      { amp: 36, freq: 0.005, speed: 0.18, offset: 0.30, alpha: 0.18, w: 1.2 },
      { amp: 48, freq: 0.0036, speed: 0.12, offset: 0.50, alpha: 0.13, w: 1.0 },
      { amp: 60, freq: 0.0028, speed: 0.08, offset: 0.70, alpha: 0.10, w: 0.9 },
      { amp: 24, freq: 0.0070, speed: 0.24, offset: 0.85, alpha: 0.20, w: 1.4 },
    ];

    let t0 = performance.now();
    function frame(now){
      const t = (now - t0) / 1000;
      ctx.clearRect(0,0,W,H);

      lines.forEach((L, i)=>{
        const yBase = H * L.offset + (my - 0.5) * 18 * (i+1) * 0.4;
        ctx.beginPath();
        for(let x=0;x<=W;x+=4){
          const phase = (mx - 0.5) * 0.6 + i * 0.7;
          const y = yBase
            + Math.sin(x * L.freq + t * L.speed * 2 + phase) * L.amp
            + Math.sin(x * L.freq * 2.3 + t * L.speed * 1.4 + phase * 0.5) * (L.amp * 0.35);
          if(x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.strokeStyle = `rgba(212,98,42,${L.alpha})`;
        ctx.lineWidth = L.w;
        ctx.stroke();
      });

      // A few drifting particles
      const pcount = 18;
      for(let i=0;i<pcount;i++){
        const px = ((i * 137 + t * 30) % (W + 80)) - 40;
        const py = (Math.sin(t*0.4 + i) * 0.5 + 0.5) * H;
        const r = 1.2 + (i % 3);
        ctx.fillStyle = `rgba(235,226,212,${0.18 + (i%4)*0.05})`;
        ctx.beginPath(); ctx.arc(px, py, r, 0, Math.PI*2); ctx.fill();
      }

      requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }

  /* ============================================================
     3. Coffee-rings on B (kept) — draggable
     ============================================================ */
  function attachCoffeeRings(){
    const hero = document.querySelector('.B-hero');
    if(!hero || hero.dataset.soul) return;
    hero.dataset.soul = '1';
    [
      { x:'8%',  y:'8%',  size:90, rot:-8 },
      { x:'78%', y:'62%', size:60, rot:12 },
    ].forEach((cfg)=>{
      const ring = document.createElement('div');
      ring.className = 'soul-ring';
      ring.style.cssText = `left:${cfg.x};top:${cfg.y};width:${cfg.size}px;height:${cfg.size}px;transform:rotate(${cfg.rot}deg)`;
      ring.innerHTML = `
        <svg viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="38" fill="none" stroke="var(--accent)" stroke-width="3" opacity="0.5" stroke-dasharray="4 6 8 3 5 7"/>
          <circle cx="50" cy="50" r="32" fill="none" stroke="var(--accent)" stroke-width="2" opacity="0.3" stroke-dasharray="2 8"/>
        </svg>
      `;
      hero.appendChild(ring);
      makeDraggable(ring);
    });
  }

  function attachPostit(){
    const work = document.querySelector('.B-work');
    if(!work || work.dataset.soul) return;
    work.dataset.soul = '1';
    const note = document.createElement('div');
    note.className = 'soul-postit';
    note.innerHTML = `
      <span class="pin"></span>
      <span class="txt">drag me<br/>↓<br/>my favorite is #03</span>
    `;
    note.style.cssText = 'left:75%;top:30px;transform:rotate(4deg)';
    work.appendChild(note);
    makeDraggable(note);
  }

  function attachBlueprintNote(){
    const bp = document.querySelector('.C-blueprint');
    if(!bp || bp.dataset.soul) return;
    bp.dataset.soul = '1';
    const note = document.createElement('div');
    note.className = 'soul-bp-note';
    note.innerHTML = `
      <svg width="60" height="40" viewBox="0 0 60 40">
        <path d="M 5 35 Q 25 20, 50 8" fill="none" stroke="var(--accent)" stroke-width="1.5"/>
        <path d="M 46 6 L 50 8 L 49 12" fill="none" stroke="var(--accent)" stroke-width="1.5"/>
      </svg>
      <span>drag me</span>
    `;
    note.style.cssText = 'left:8%;top:14%';
    bp.appendChild(note);
    makeDraggable(note);
  }

  function attachTilt(){
    const cover = document.querySelector('.D-cover');
    if(!cover || cover.dataset.soul) return;
    cover.dataset.soul = '1';
    const h = cover.querySelector('h2');
    if(!h) return;
    h.style.transition = 'transform 0.2s ease-out';
    cover.addEventListener('mousemove', e=>{
      const r = cover.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      h.style.transform = `perspective(1000px) rotateY(${x*4}deg) rotateX(${-y*3}deg) translateZ(20px)`;
    });
    cover.addEventListener('mouseleave', ()=>{ h.style.transform = ''; });
  }

  function attachCornerPeel(){
    const wrap = document.querySelector('.D-wrap');
    if(!wrap || wrap.dataset.soul) return;
    wrap.dataset.soul = '1';
    const peel = document.createElement('div');
    peel.className = 'soul-peel';
    peel.innerHTML = `<span class="hint">pg.064 / 064</span>`;
    wrap.appendChild(peel);
  }

  /* ============== Drag helper ============== */
  function makeDraggable(el){
    el.classList.add('soul-drag');
    let dragging = false, sx=0, sy=0, ox=0, oy=0;
    el.addEventListener('pointerdown', e=>{
      dragging = true;
      el.classList.add('grab');
      el.setPointerCapture(e.pointerId);
      const r = el.getBoundingClientRect();
      const pr = el.parentElement.getBoundingClientRect();
      el.style.left = (r.left - pr.left) + 'px';
      el.style.top  = (r.top  - pr.top)  + 'px';
      sx = e.clientX; sy = e.clientY;
      ox = r.left - pr.left; oy = r.top - pr.top;
      e.preventDefault();
    });
    el.addEventListener('pointermove', e=>{
      if(!dragging) return;
      el.style.left = (ox + e.clientX - sx) + 'px';
      el.style.top  = (oy + e.clientY - sy) + 'px';
    });
    const up = e=>{
      if(!dragging) return;
      dragging = false;
      el.classList.remove('grab');
      try { el.releasePointerCapture(e.pointerId); } catch(_){}
    };
    el.addEventListener('pointerup', up);
    el.addEventListener('pointercancel', up);
  }

  function attachAll(){
    attachConstellation();
    attachWaves();
    attachCoffeeRings();
    attachPostit();
    attachBlueprintNote();
    attachTilt();
    attachCornerPeel();
  }
  const root = document.getElementById('root');
  if(root){
    const mo = new MutationObserver(()=>{ setTimeout(attachAll, 50); });
    mo.observe(root, { childList:true, subtree:true });
  }
  setTimeout(attachAll, 200);
  setTimeout(attachAll, 800);
  setTimeout(attachAll, 1800);

  /* Confetti on tab change (kept) */
  document.addEventListener('click', e=>{
    const tab = e.target.closest('.tab');
    if(!tab) return;
    burst(e.clientX, e.clientY);
  });
  function burst(x, y){
    for(let i=0;i<14;i++){
      const dot = document.createElement('span');
      dot.className = 'soul-confetti';
      const angle = (Math.PI * 2 * i)/14;
      const dist = 40 + Math.random()*60;
      dot.style.left = x + 'px';
      dot.style.top  = y + 'px';
      dot.style.setProperty('--dx', Math.cos(angle)*dist + 'px');
      dot.style.setProperty('--dy', Math.sin(angle)*dist + 'px');
      dot.style.background = ['var(--accent)', 'var(--ink)', 'var(--paper-3)', '#3d6e57'][i%4];
      document.body.appendChild(dot);
      setTimeout(()=>dot.remove(), 900);
    }
  }
})();
