/* Sample 2: Attention Heatmap Morph — anime.js + SVG
   Tokens connect via animated bezier curves whose stroke-width and color
   represent attention weights. Hover a token → recompute attention with morph. */

(function(){
  const root = document.getElementById('scene-2');
  if(!root) return;

  const TOKENS = [
    "Strategy", "is", "compounding", "decisions", ".",
    "Each", "model", "commit", "shapes", "the", "next", "."
  ];

  // Build SVG
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('viewBox', '0 0 1200 600');
  svg.setAttribute('preserveAspectRatio','xMidYMid meet');
  svg.style.width = '100%';
  svg.style.height = '100%';
  svg.style.display = 'block';
  root.appendChild(svg);

  // Layout: two parallel rows of tokens
  const TOP_Y = 140;
  const BOT_Y = 460;
  const N = TOKENS.length;
  const margin = 80;
  const stride = (1200 - margin*2) / (N - 1);

  function tokenX(i){ return margin + i*stride; }

  // Render top + bottom token nodes
  const topGroup = makeGroup(svg);
  const botGroup = makeGroup(svg);
  const linkGroup = makeGroup(svg);

  // Title
  const title = makeText(svg, 600, 60, "self-attention", {
    family:"JetBrains Mono", size:11, fill:"#aab3c0", anchor:"middle", letter:"0.16em", upper:true
  });

  // Decorative axis tick lines
  for(let i=0;i<N;i++){
    const x = tokenX(i);
    const tick = makeLine(svg, x, TOP_Y+24, x, BOT_Y-24, "#2a3140", 1);
    tick.setAttribute('stroke-dasharray','2 6');
    tick.setAttribute('opacity','0.35');
  }

  // Tokens
  const topTokens = TOKENS.map((tok, i)=>{
    const x = tokenX(i);
    const g = makeGroup(topGroup);
    const rect = makeRect(g, x-44, TOP_Y-22, 88, 38, "#161b24", "#3a4255", 1);
    rect.setAttribute('rx','4');
    const txt = makeText(g, x, TOP_Y+5, tok, { family:"Inter", size:14, fill:"#e8ecf2", anchor:"middle" });
    g.dataset.idx = i;
    g.style.cursor = 'pointer';
    return { g, rect, txt, x, i };
  });

  const botTokens = TOKENS.map((tok, i)=>{
    const x = tokenX(i);
    const g = makeGroup(botGroup);
    const rect = makeRect(g, x-44, BOT_Y-16, 88, 38, "#161b24", "#3a4255", 1);
    rect.setAttribute('rx','4');
    const txt = makeText(g, x, BOT_Y+10, tok, { family:"Inter", size:14, fill:"#e8ecf2", anchor:"middle" });
    return { g, rect, txt, x, i };
  });

  // Decorative labels
  makeText(svg, 30, TOP_Y+5, "Q", { family:"Fraunces", size:24, fill:"#ff7a45", italic:true });
  makeText(svg, 30, BOT_Y+10, "K", { family:"Fraunces", size:24, fill:"#5ce0ff", italic:true });

  // Generate attention matrix: weights[from][to] in [0,1], softmax-ish
  function genWeights(focus){
    // Distance-decay + a bias to a "focus" token
    const W = TOKENS.map((_, i)=>{
      const row = TOKENS.map((__, j)=>{
        const d = Math.abs(i - j);
        const noise = Math.random()*0.4;
        const focusBoost = (focus !== undefined && j === focus) ? 1.2 : 0;
        return Math.exp(-d*0.55) + noise + focusBoost;
      });
      const sum = row.reduce((a,b)=>a+b,0);
      return row.map(v => v / sum);
    });
    return W;
  }

  // Create curve elements between every pair (top i → bottom j)
  const curves = [];
  for(let i=0;i<N;i++){
    for(let j=0;j<N;j++){
      const x1 = tokenX(i), y1 = TOP_Y+22;
      const x2 = tokenX(j), y2 = BOT_Y-20;
      const path = document.createElementNS('http://www.w3.org/2000/svg','path');
      path.setAttribute('d', curveD(x1,y1,x2,y2));
      path.setAttribute('stroke', "#ff7a45");
      path.setAttribute('stroke-width', 0);
      path.setAttribute('fill','none');
      path.setAttribute('opacity','0.5');
      path.style.transition = 'opacity .2s';
      linkGroup.appendChild(path);
      curves.push({ path, i, j, x1, y1, x2, y2 });
    }
  }

  function curveD(x1,y1,x2,y2){
    const cy = (y1+y2)/2;
    return `M ${x1} ${y1} C ${x1} ${cy}, ${x2} ${cy}, ${x2} ${y2}`;
  }

  function applyWeights(W, focus){
    curves.forEach(c=>{
      const w = W[c.i][c.j];
      const sw = Math.max(0.4, w * 18);
      // Color: low = magenta, high = orange
      const hue = w < 0.3 ? "#5ce0ff" : (w < 0.6 ? "#ff7a45" : "#ffd75c");
      anime({
        targets: c.path,
        strokeWidth: sw,
        opacity: focus !== undefined && c.i !== focus ? 0.04 : Math.min(0.85, w * 1.6),
        stroke: hue,
        duration: 800 + Math.random()*400,
        delay: (c.i + c.j) * 8,
        easing: 'easeOutQuart'
      });
    });
  }

  let activeFocus = undefined;

  // Initial fire
  setTimeout(()=> applyWeights(genWeights(undefined), undefined), 600);

  // Hover top tokens to focus
  topTokens.forEach(t=>{
    t.g.addEventListener('mouseenter', ()=>{
      activeFocus = t.i;
      // Highlight
      topTokens.forEach(o=>{
        anime({ targets: o.rect, fill: o.i === t.i ? "#ff7a45" : "#161b24", duration: 300, easing:'easeOutQuad' });
        anime({ targets: o.txt, fill: o.i === t.i ? "#0a0d12" : "#e8ecf2", duration: 300 });
      });
      applyWeights(genWeights(t.i), t.i);
    });
  });
  root.addEventListener('mouseleave', ()=>{
    activeFocus = undefined;
    topTokens.forEach(o=>{
      anime({ targets: o.rect, fill: "#161b24", duration: 300 });
      anime({ targets: o.txt, fill: "#e8ecf2", duration: 300 });
    });
    applyWeights(genWeights(undefined), undefined);
  });

  // Periodic remix
  setInterval(()=>{
    if(activeFocus === undefined) applyWeights(genWeights(undefined), undefined);
  }, 3500);

  /* svg helpers */
  function makeGroup(parent){
    const g = document.createElementNS('http://www.w3.org/2000/svg','g');
    parent.appendChild(g);
    return g;
  }
  function makeRect(parent, x, y, w, h, fill, stroke, sw){
    const r = document.createElementNS('http://www.w3.org/2000/svg','rect');
    r.setAttribute('x',x); r.setAttribute('y',y);
    r.setAttribute('width',w); r.setAttribute('height',h);
    r.setAttribute('fill',fill); r.setAttribute('stroke',stroke);
    r.setAttribute('stroke-width',sw||1);
    parent.appendChild(r); return r;
  }
  function makeLine(parent, x1,y1,x2,y2, stroke, sw){
    const l = document.createElementNS('http://www.w3.org/2000/svg','line');
    l.setAttribute('x1',x1); l.setAttribute('y1',y1);
    l.setAttribute('x2',x2); l.setAttribute('y2',y2);
    l.setAttribute('stroke',stroke); l.setAttribute('stroke-width',sw||1);
    parent.appendChild(l); return l;
  }
  function makeText(parent, x, y, content, opts={}){
    const t = document.createElementNS('http://www.w3.org/2000/svg','text');
    t.setAttribute('x',x); t.setAttribute('y',y);
    t.setAttribute('font-family', opts.family || 'Inter');
    t.setAttribute('font-size', opts.size || 14);
    t.setAttribute('fill', opts.fill || '#e8ecf2');
    if(opts.anchor) t.setAttribute('text-anchor', opts.anchor);
    if(opts.italic) t.setAttribute('font-style','italic');
    if(opts.letter) t.setAttribute('letter-spacing', opts.letter);
    if(opts.upper) t.style.textTransform = 'uppercase';
    if(opts.weight) t.setAttribute('font-weight', opts.weight);
    t.textContent = content;
    parent.appendChild(t); return t;
  }
})();
