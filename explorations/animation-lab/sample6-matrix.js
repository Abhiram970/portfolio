/* Sample 6: 2x2 Strategy Matrix with draggable initiative cards (anime.js spring)
   Cards drag freely, snap with spring physics, and the position determines a live verdict.
   Quadrants: High Impact/Low Effort, etc. */

(function(){
  const root = document.getElementById('scene-6');
  if(!root) return;

  root.innerHTML = `
    <div class="s6-wrap">
      <div class="s6-grid" id="s6-grid">
        <div class="s6-axis-x"></div>
        <div class="s6-axis-y"></div>
        <div class="s6-quad q1"><span>QUICK WIN</span><em>do this week</em></div>
        <div class="s6-quad q2"><span>BIG BET</span><em>plan / staff up</em></div>
        <div class="s6-quad q3"><span>FILL-IN</span><em>delegate / batch</em></div>
        <div class="s6-quad q4"><span>RECONSIDER</span><em>kill or scope down</em></div>
        <div class="s6-label tx">Effort →</div>
        <div class="s6-label ty">Impact →</div>
        <div class="s6-cards" id="s6-cards"></div>
      </div>
      <div class="s6-side">
        <div class="s6-eyebrow">Live verdict</div>
        <div class="s6-verdict" id="s6-verdict">Drag a card to evaluate.</div>
        <div class="s6-list" id="s6-list"></div>
      </div>
    </div>
  `;

  const cards = [
    { id:'a', t:"RAG over docs",        sub:"~4d",   x:0.20, y:0.78 },
    { id:'b', t:"Fine-tune model",      sub:"~3w",   x:0.78, y:0.62 },
    { id:'c', t:"Eval harness",         sub:"~6d",   x:0.30, y:0.65 },
    { id:'d', t:"Realtime inference",   sub:"~5w",   x:0.85, y:0.40 },
    { id:'e', t:"Customer dashboard",   sub:"~2w",   x:0.50, y:0.55 },
    { id:'f', t:"On-call rotation",     sub:"~1w",   x:0.18, y:0.28 },
  ];

  const grid = root.querySelector('#s6-grid');
  const cardsEl = root.querySelector('#s6-cards');
  const verdictEl = root.querySelector('#s6-verdict');
  const listEl = root.querySelector('#s6-list');

  function quadrantOf(x, y){
    // x: 0(low effort) → 1(high effort), y: 0(bottom/low impact) → 1(top/high impact)
    if(y >= 0.5 && x < 0.5) return { name:"Quick Win",   verdict:"Ship it. This week.",        cls:'g' };
    if(y >= 0.5 && x >= 0.5)return { name:"Big Bet",     verdict:"Worth it. Staff it up.",     cls:'o' };
    if(y < 0.5 && x < 0.5)  return { name:"Fill-in",     verdict:"Delegate or batch with #3.", cls:'c' };
    return                       { name:"Reconsider",  verdict:"Kill or radically scope down.",cls:'m' };
  }

  function renderList(){
    listEl.innerHTML = '';
    [...cards].sort((a,b)=> b.y - a.y).forEach(c=>{
      const q = quadrantOf(c.x, c.y);
      const row = document.createElement('div');
      row.className = 's6-row ' + q.cls;
      row.innerHTML = `
        <span class="dot"></span>
        <span class="t">${c.t}</span>
        <span class="q">${q.name}</span>
      `;
      listEl.appendChild(row);
    });
  }

  function placeCard(c){
    const r = grid.getBoundingClientRect();
    c.el.style.left = (c.x * r.width) + 'px';
    c.el.style.top  = ((1 - c.y) * r.height) + 'px';
  }

  cards.forEach(c=>{
    const el = document.createElement('div');
    el.className = 's6-card';
    el.innerHTML = `
      <span class="grip"></span>
      <span class="t">${c.t}</span>
      <span class="sub">${c.sub}</span>
    `;
    cardsEl.appendChild(el);
    c.el = el;

    let dragging = false, sx=0, sy=0, startX=0, startY=0;
    el.addEventListener('pointerdown', e=>{
      dragging = true;
      el.classList.add('drag');
      el.setPointerCapture(e.pointerId);
      const r = grid.getBoundingClientRect();
      sx = e.clientX; sy = e.clientY;
      startX = c.x; startY = c.y;
      e.preventDefault();
    });
    el.addEventListener('pointermove', e=>{
      if(!dragging) return;
      const r = grid.getBoundingClientRect();
      const dx = (e.clientX - sx) / r.width;
      const dy = (e.clientY - sy) / r.height;
      c.x = Math.max(0.05, Math.min(0.95, startX + dx));
      c.y = Math.max(0.05, Math.min(0.95, startY - dy));
      placeCard(c);

      const q = quadrantOf(c.x, c.y);
      verdictEl.innerHTML = `<strong>${c.t}</strong> → <em>${q.name}</em><br/><span class="verdict ${q.cls}">${q.verdict}</span>`;
      renderList();
    });
    function up(e){
      if(!dragging) return;
      dragging = false;
      el.classList.remove('drag');
      try { el.releasePointerCapture(e.pointerId); } catch(_){}
      // Spring settle wobble
      anime({
        targets: el,
        scale: [1.05, 0.95, 1.02, 1],
        duration: 600,
        easing: 'easeOutElastic(1, .5)'
      });
    }
    el.addEventListener('pointerup', up);
    el.addEventListener('pointercancel', up);

    el.addEventListener('mouseenter', ()=>{
      const q = quadrantOf(c.x, c.y);
      verdictEl.innerHTML = `<strong>${c.t}</strong> → <em>${q.name}</em><br/><span class="verdict ${q.cls}">${q.verdict}</span>`;
    });
  });

  function placeAll(){ cards.forEach(placeCard); }
  setTimeout(()=>{
    placeAll();
    renderList();
    // Entry animation
    anime({
      targets: '.s6-card',
      scale: [0, 1],
      opacity: [0, 1],
      delay: anime.stagger(80),
      duration: 700,
      easing: 'easeOutElastic(1, .6)'
    });
  }, 100);
  window.addEventListener('resize', placeAll);
  new ResizeObserver(placeAll).observe(grid);
})();
