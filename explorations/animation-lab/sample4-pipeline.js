/* Sample 4: ETL Flow Pipeline — anime.js motion path
   Data droplets travel along an SVG pipeline, branch at junctions,
   and converge into "insight" tokens with stagger. */

(function(){
  const root = document.getElementById('scene-4');
  if(!root) return;

  const NS = 'http://www.w3.org/2000/svg';
  const svg = document.createElementNS(NS, 'svg');
  svg.setAttribute('viewBox','0 0 1200 600');
  svg.setAttribute('preserveAspectRatio','xMidYMid meet');
  svg.style.width='100%'; svg.style.height='100%'; svg.style.display='block';
  root.appendChild(svg);

  // Build paths
  const paths = [
    // raw → preprocess → branch up
    "M 60 300 L 240 300 L 280 220 L 460 220",
    // raw → preprocess → branch down
    "M 60 300 L 240 300 L 280 380 L 460 380",
    // up branch → model
    "M 460 220 L 580 220 L 620 300 L 760 300",
    // down branch → model
    "M 460 380 L 580 380 L 620 300 L 760 300",
    // model → eval
    "M 760 300 L 920 300",
    // eval → insight
    "M 920 300 L 1140 300"
  ];

  const pathEls = paths.map((d, i)=>{
    const p = document.createElementNS(NS,'path');
    p.setAttribute('d', d);
    p.setAttribute('fill','none');
    p.setAttribute('stroke','#3a4255');
    p.setAttribute('stroke-width','1.5');
    p.setAttribute('stroke-dasharray','4 6');
    svg.appendChild(p);
    return p;
  });

  // Stations
  const stations = [
    { x:60,   y:300, label:"RAW",         sub:"S3 / Postgres",       kind:"src"  },
    { x:240,  y:300, label:"PREPROCESS",  sub:"dbt · Pandas",        kind:"proc" },
    { x:460,  y:220, label:"FEATURIZE",   sub:"sklearn",             kind:"proc" },
    { x:460,  y:380, label:"EMBED",       sub:"text-embedding-3",    kind:"proc" },
    { x:760,  y:300, label:"MODEL",       sub:"GPT-4o · XGBoost",    kind:"model"},
    { x:920,  y:300, label:"EVAL",        sub:"AUC · F1 · Lift",     kind:"eval" },
    { x:1140, y:300, label:"INSIGHT",     sub:"deck → board",        kind:"out"  },
  ];

  stations.forEach(s=>{
    const g = document.createElementNS(NS,'g');
    const r = document.createElementNS(NS,'rect');
    r.setAttribute('x', s.x-46); r.setAttribute('y', s.y-26);
    r.setAttribute('width', 92); r.setAttribute('height', 52);
    r.setAttribute('rx', 6);
    r.setAttribute('fill','#161b24');
    r.setAttribute('stroke', s.kind==='out' ? '#ff7a45' : '#3a4255');
    r.setAttribute('stroke-width', s.kind==='out' ? 2 : 1);
    g.appendChild(r);

    const t1 = document.createElementNS(NS,'text');
    t1.setAttribute('x', s.x); t1.setAttribute('y', s.y-4);
    t1.setAttribute('text-anchor','middle');
    t1.setAttribute('font-family','JetBrains Mono');
    t1.setAttribute('font-size','11');
    t1.setAttribute('letter-spacing','0.08em');
    t1.setAttribute('fill', s.kind==='out' ? '#ff7a45' : '#e8ecf2');
    t1.textContent = s.label;
    g.appendChild(t1);

    const t2 = document.createElementNS(NS,'text');
    t2.setAttribute('x', s.x); t2.setAttribute('y', s.y+14);
    t2.setAttribute('text-anchor','middle');
    t2.setAttribute('font-family','Inter');
    t2.setAttribute('font-size','10');
    t2.setAttribute('fill','#aab3c0');
    t2.textContent = s.sub;
    g.appendChild(t2);

    svg.appendChild(g);
  });

  // Draw the pipeline lines once on load
  pathEls.forEach((p, i)=>{
    const len = p.getTotalLength();
    p.style.strokeDasharray = len;
    p.style.strokeDashoffset = len;
    anime({
      targets: p,
      strokeDashoffset: 0,
      duration: 1100,
      delay: i*150,
      easing: 'easeInOutQuad',
      complete: ()=>{
        p.style.strokeDasharray = '4 6';
        p.style.strokeDashoffset = 0;
      }
    });
  });

  // Drop a particle along a path
  function drop(pathIdx, color, delay){
    const p = pathEls[pathIdx];
    const len = p.getTotalLength();
    const dot = document.createElementNS(NS,'circle');
    dot.setAttribute('r','4.5');
    dot.setAttribute('fill', color);
    dot.setAttribute('filter','url(#glow)');
    svg.appendChild(dot);

    return anime({
      targets: { t:0 },
      t: 1,
      duration: 1400,
      delay: delay,
      easing: 'easeInOutCubic',
      update(anim){
        const v = anim.animatables[0].target.t;
        const pt = p.getPointAtLength(v*len);
        dot.setAttribute('cx', pt.x);
        dot.setAttribute('cy', pt.y);
      },
      complete(){ dot.remove(); }
    });
  }

  // glow filter
  const defs = document.createElementNS(NS,'defs');
  defs.innerHTML = `
    <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur stdDeviation="2.5" result="b"/>
      <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
  `;
  svg.appendChild(defs);

  // Run forever
  function runFlow(){
    // 6 droplets fan out from raw
    for(let k=0;k<6;k++){
      const branch = k % 2 === 0 ? 0 : 1;
      const followIdx = branch === 0 ? 2 : 3;
      const color = k%3===0 ? '#5ce0ff' : (k%3===1 ? '#ff7a45' : '#c66dff');
      drop(branch, color, k*120);
      drop(followIdx, color, k*120 + 1100);
      drop(4, color, k*120 + 2100);
      drop(5, color, k*120 + 2700);
    }
  }
  setTimeout(runFlow, 1500);
  setInterval(runFlow, 4500);
})();
