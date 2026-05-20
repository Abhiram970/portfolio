/* Direction A — The Roastery (faithful coffee-tech homage) */
const D = window.PF_DATA;

function ProductSVG({ kind = "scatter" }){
  // Render a stylized "product photo" — a data viz on a moody background
  if (kind === "scatter") {
    return (
      <svg viewBox="0 0 400 400" preserveAspectRatio="xMidYMid meet">
        <defs>
          <radialGradient id="glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#d4622a" stopOpacity="0.5"/>
            <stop offset="60%" stopColor="#d4622a" stopOpacity="0.05"/>
            <stop offset="100%" stopColor="#d4622a" stopOpacity="0"/>
          </radialGradient>
        </defs>
        <circle cx="200" cy="200" r="160" fill="url(#glow)"/>
        <line x1="60" y1="340" x2="360" y2="340" stroke="#5a4a3d" strokeWidth="1"/>
        <line x1="60" y1="60" x2="60" y2="340" stroke="#5a4a3d" strokeWidth="1"/>
        {[
          [90, 290, 8], [130, 240, 10], [170, 260, 6], [200, 200, 14],
          [230, 220, 9], [270, 150, 16], [300, 180, 11], [330, 110, 22],
          [120, 200, 7], [250, 110, 12]
        ].map(([x,y,r], i) => (
          <circle key={i} cx={x} cy={y} r={r} fill={i%3===0?"#d4622a":"#ebe2d4"} stroke="#1a1209" strokeWidth="1.5" opacity={0.85}/>
        ))}
        <text x="60" y="370" fontFamily="JetBrains Mono" fontSize="9" fill="#8a7868">EFFORT →</text>
        <text x="36" y="60" fontFamily="JetBrains Mono" fontSize="9" fill="#8a7868" transform="rotate(-90 36 60)">IMPACT →</text>
      </svg>
    );
  }
  return null;
}

function MarqueeBar(){
  const items = ["XGBoost", "dbt", "Python", "Bayesian Methods", "Causal Inference", "Retrieval Eval", "Forecasting", "Pricing Models", "Causal Lift", "Cohort Analysis"];
  const all = [...items, ...items];
  return (
    <div className="A-marquee">
      <div className="track">
        {all.map((s,i)=> <span key={i}>{s}</span>)}
      </div>
    </div>
  );
}

function WorkSectionAnimation(){
  // Animated background that lives behind the "Selected work" grid.
  // Drifting project-constellation + a slow scrolling impact-curve.
  const ref = React.useRef(null);
  const dotsRef = React.useRef([]);
  const mouseRef = React.useRef({x: 0.5, y: 0.5, active: false});
  const rafRef = React.useRef(0);

  React.useEffect(()=>{
    const cvs = ref.current;
    if(!cvs) return;
    const ctx = cvs.getContext('2d');
    let W = 0, H = 0, dpr = Math.min(window.devicePixelRatio||1, 2);

    function resize(){
      const r = cvs.getBoundingClientRect();
      W = r.width; H = r.height;
      cvs.width = W * dpr; cvs.height = H * dpr;
      ctx.setTransform(dpr,0,0,dpr,0,0);
    }
    resize();
    const ro = new ResizeObserver(resize); ro.observe(cvs);

    // seed dots — a slow-moving constellation
    const N = 38;
    dotsRef.current = Array.from({length:N}).map((_,i)=>({
      x: Math.random(),
      y: Math.random(),
      vx: (Math.random()-0.5)*0.00012,
      vy: (Math.random()-0.5)*0.00012,
      r: 1.2 + Math.random()*3.2,
      glow: Math.random()<0.18,
      phase: Math.random()*Math.PI*2,
      speed: 0.4 + Math.random()*0.7,
    }));

    function onMove(e){
      const r = cvs.getBoundingClientRect();
      mouseRef.current.x = (e.clientX - r.left) / r.width;
      mouseRef.current.y = (e.clientY - r.top)  / r.height;
      mouseRef.current.active = true;
    }
    function onLeave(){ mouseRef.current.active = false; }
    cvs.parentElement.addEventListener('mousemove', onMove);
    cvs.parentElement.addEventListener('mouseleave', onLeave);

    let t0 = performance.now();
    function tick(now){
      const t = (now - t0)/1000;
      ctx.clearRect(0,0,W,H);

      // base sine waves, parallax — very subtle, paper-tone
      ctx.save();
      ctx.globalAlpha = 0.18;
      for(let layer=0; layer<3; layer++){
        ctx.beginPath();
        const amp = 18 + layer*10;
        const phase = t * (0.3 + layer*0.12);
        const yBase = H*0.5 + (layer-1)*40;
        for(let x=0; x<=W; x+=10){
          const y = yBase
            + Math.sin(x*0.006 + phase) * amp
            + Math.cos(x*0.014 - phase*0.7) * (amp*0.3);
          if(x===0) ctx.moveTo(x,y); else ctx.lineTo(x,y);
        }
        ctx.strokeStyle = layer===1 ? 'rgba(212,98,42,0.55)' : 'rgba(90,74,61,0.45)';
        ctx.lineWidth = layer===1 ? 1.0 : 0.7;
        ctx.stroke();
      }
      ctx.restore();

      // dots — drifting; mouse pulls them gently
      const dots = dotsRef.current;
      const m = mouseRef.current;
      for(const d of dots){
        d.x += d.vx; d.y += d.vy;
        if(d.x<0||d.x>1) d.vx *= -1;
        if(d.y<0||d.y>1) d.vy *= -1;
        // gentle pull toward cursor
        if(m.active){
          const dx = m.x - d.x, dy = m.y - d.y;
          const dist = Math.hypot(dx,dy);
          if(dist < 0.25){
            d.x += dx * 0.0018;
            d.y += dy * 0.0018;
          }
        }
      }
      // connecting lines between near dots
      ctx.save();
      for(let i=0;i<dots.length;i++){
        for(let j=i+1;j<dots.length;j++){
          const a = dots[i], b = dots[j];
          const dx = (a.x-b.x)*W, dy = (a.y-b.y)*H;
          const d = Math.hypot(dx,dy);
          if(d < 140){
            const alpha = (1 - d/140) * 0.18;
            ctx.beginPath();
            ctx.moveTo(a.x*W, a.y*H);
            ctx.lineTo(b.x*W, b.y*H);
            ctx.strokeStyle = `rgba(90,74,61,${alpha})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }
      ctx.restore();
      // dot bodies
      for(const d of dots){
        const px = d.x*W, py = d.y*H;
        const breathe = 0.7 + 0.3*Math.sin(t*d.speed + d.phase);
        if(d.glow){
          const g = ctx.createRadialGradient(px,py,0, px,py, 26);
          g.addColorStop(0, `rgba(212,98,42,${0.35*breathe})`);
          g.addColorStop(1, 'rgba(212,98,42,0)');
          ctx.fillStyle = g;
          ctx.beginPath(); ctx.arc(px,py,26,0,Math.PI*2); ctx.fill();
          ctx.fillStyle = `rgba(212,98,42,${0.85})`;
        } else {
          ctx.fillStyle = `rgba(90,74,61,${0.55*breathe})`;
        }
        ctx.beginPath(); ctx.arc(px,py,d.r*breathe,0,Math.PI*2); ctx.fill();
      }

      // a slow-moving impact curve sweeping right, with a glowing leading dot
      ctx.save();
      const sweep = (t*0.04) % 1.4 - 0.2;  // -0.2 .. 1.2
      ctx.beginPath();
      let leadX=0, leadY=0;
      for(let p=0; p<=1; p+=0.02){
        const x = p*W;
        const yNorm = 0.85 - Math.pow(Math.max(0,p-0.05), 1.7) * 0.7
          + Math.sin(p*7 + t*0.4) * 0.02;
        const y = yNorm * H;
        if(p===0) ctx.moveTo(x,y); else ctx.lineTo(x,y);
        if(Math.abs(p-sweep) < 0.01){ leadX=x; leadY=y; }
      }
      ctx.strokeStyle = 'rgba(212,98,42,0.32)';
      ctx.lineWidth = 1.2;
      ctx.setLineDash([4,5]);
      ctx.stroke();
      ctx.setLineDash([]);
      if(sweep>0 && sweep<1){
        const g = ctx.createRadialGradient(leadX,leadY,0, leadX,leadY,40);
        g.addColorStop(0,'rgba(212,98,42,0.5)');
        g.addColorStop(1,'rgba(212,98,42,0)');
        ctx.fillStyle = g;
        ctx.beginPath(); ctx.arc(leadX,leadY,40,0,Math.PI*2); ctx.fill();
        ctx.fillStyle = 'rgba(212,98,42,1)';
        ctx.beginPath(); ctx.arc(leadX,leadY,3.5,0,Math.PI*2); ctx.fill();
      }
      ctx.restore();

      rafRef.current = requestAnimationFrame(tick);
    }
    rafRef.current = requestAnimationFrame(tick);
    return ()=>{
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
      cvs.parentElement.removeEventListener('mousemove', onMove);
      cvs.parentElement.removeEventListener('mouseleave', onLeave);
    };
  },[]);

  return (
    <canvas
      ref={ref}
      style={{
        position:'absolute', inset:0, width:'100%', height:'100%',
        pointerEvents:'none', zIndex:0
      }}
    />
  );
}

function ProductCard({ p, i }){
  return (
    <div className="card">
      <div className="num">({String(i+1).padStart(2,'0')})</div>
      <div className="pic">
        <svg viewBox="0 0 200 200" width="70%" height="70%">
          {i % 4 === 0 && <>
            <polyline points="20,160 50,120 80,140 110,80 140,100 180,40" fill="none" stroke="#d4622a" strokeWidth="3"/>
            <circle cx="180" cy="40" r="6" fill="#d4622a"/>
          </>}
          {i % 4 === 1 && <>
            {[40,80,120,160].map((x,j)=>(<rect key={j} x={x-12} y={180 - (30+j*28)} width="24" height={30+j*28} fill={j===3?"#d4622a":"#5a4a3d"}/>))}
          </>}
          {i % 4 === 2 && <>
            <circle cx="100" cy="100" r="70" fill="none" stroke="#5a4a3d" strokeWidth="2"/>
            <path d="M 100 30 A 70 70 0 0 1 165 130 L 100 100 Z" fill="#d4622a"/>
          </>}
          {i % 4 === 3 && <>
            <path d="M 20 150 Q 60 60, 100 100 T 180 60" fill="none" stroke="#d4622a" strokeWidth="3"/>
            <path d="M 20 170 Q 70 110, 110 130 T 180 100" fill="none" stroke="#5a4a3d" strokeWidth="2" strokeDasharray="4 3"/>
          </>}
        </svg>
      </div>
      <div className="meta">{p.cat} · {p.year}</div>
      <h4>{p.title}</h4>
      <div className="stat">{p.outcome}</div>
    </div>
  );
}

function Testimonials(){
  const [i, setI] = React.useState(0);
  const t = D.testimonials[i];
  return (
    <div className="A-testi">
      <div className="frame">
        <div className="quotemark">“</div>
        <q>{t.q}</q>
        <div className="who"><b>{t.who}</b>{t.role}</div>
        <div className="count">{String(i+1).padStart(2,'0')} / {String(D.testimonials.length).padStart(2,'0')}</div>
        <div className="nav">
          <button onClick={()=>setI((i-1+D.testimonials.length)%D.testimonials.length)}>←</button>
          <button onClick={()=>setI((i+1)%D.testimonials.length)}>→</button>
        </div>
      </div>
    </div>
  );
}

function DirectionA(){
  return (
    <div className="A-wrap" data-screen-label="A The Roastery">
      <nav className="A-nav">
        <div className="logo">YN<span className="dot">.</span></div>
        <div className="links">
          <a>About</a><a>Work</a><a>Approach</a><a>Writing</a>
        </div>
        <div className="cta">
          <a className="btn">Now</a>
          <a className="btn primary">Contact</a>
        </div>
      </nav>

      <section className="A-hero">
        <div className="lead">
          <span className="eyebrow"><span className="num">(01)</span> ESTABLISHED 2018 · INDEPENDENT SINCE '23</span>
          <h2>Data Science,<br/><em>reinvented</em><br/>for decisions.</h2>
          <p>Reinventing how messy data turns into clear decisions for over seven years — premium analytics for teams who value rigor, narrative, and remarkable taste.</p>
          <a className="arrow-link">Explore selected work</a>
        </div>
        <div>
          <div className="A-product">
            <ProductSVG kind="scatter"/>
            <div className="tag"><span className="accent">●</span> MODEL_03 · CHURN_PREDICTOR</div>
          </div>
          <div className="scribble">↑ each dot = a project</div>
        </div>
      </section>

      <MarqueeBar/>

      <section className="A-section" style={{position:'relative', overflow:'hidden'}}>
        <WorkSectionAnimation/>
        <div style={{position:'relative', zIndex:1}}>
        <div className="head">
          <div className="left">
            <span className="eyebrow">Beyond your expectations</span>
            <h3>Selected <em>work</em>, eight at a time.</h3>
          </div>
          <a className="arrow-link">See all 42 →</a>
        </div>
        <div className="A-products">
          {D.projects.slice(0,4).map((p,i)=> <ProductCard key={p.id} p={p} i={i}/>)}
        </div>
        <div className="A-products" style={{borderTop:'none'}}>
          {D.projects.slice(4,8).map((p,i)=> <ProductCard key={p.id} p={p} i={i+4}/>)}
        </div>
        </div>
      </section>

      <section className="A-specialty">
        <div style={{maxWidth:1280, margin:'0 auto', marginBottom:30}}>
          <span className="eyebrow" style={{color:'#e0d4c0'}}>Our Specialty</span>
          <h3 style={{fontFamily:'var(--serif)', fontSize:'48px', fontWeight:300, margin:'8px 0 0'}}>What I work on.</h3>
        </div>
        <div className="row">
          {[
            { t:"Machine Learning", d:"Models that ship. Churn prediction, recommendation systems, retrieval evaluation. Deployed, monitored, and explained."},
            { t:"Analytics", d:"Forecasts, A/B frameworks, executive dashboards. Numbers that survive a board meeting and inform the next quarter's plan."},
            { t:"Strategy", d:"Pricing studies, LTV segmentation, market sizing. The work where the deck matters as much as the regression."},
          ].map((s,i)=>(
            <div className="item" key={i}>
              <h5>{s.t} <span className="ar">→</span></h5>
              <div className="pic">
                <svg viewBox="0 0 200 150" width="100%" height="100%" style={{position:'absolute', inset:0}}>
                  <circle cx="100" cy="75" r="50" fill="none" stroke="#d4622a" strokeWidth="1" opacity="0.3"/>
                  <circle cx="100" cy="75" r="30" fill="none" stroke="#d4622a" strokeWidth="1" opacity="0.5"/>
                  {i===0 && <polyline points="40,110 70,80 100,90 130,50 160,60" fill="none" stroke="#d4622a" strokeWidth="2"/>}
                  {i===1 && <>{[55,80,105,130,155].map((x,j)=>(<rect key={j} x={x-7} y={130-(20+j*15)} width="14" height={20+j*15} fill="#d4622a"/>))}</>}
                  {i===2 && <path d="M 50 100 Q 100 30, 150 90" fill="none" stroke="#d4622a" strokeWidth="2"/>}
                </svg>
              </div>
              <p>{s.d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="A-pillars">
        <div style={{marginBottom:40}}>
          <span className="eyebrow">Our Approach</span>
          <h3 style={{fontFamily:'var(--serif)', fontSize:'48px', fontWeight:300, margin:'8px 0 0', letterSpacing:'-.02em'}}>Three <em style={{color:'#d4622a'}}>principles</em>.</h3>
        </div>
        <div className="grid">
          {D.pillars.map((p,i)=>(
            <div className="pillar" key={i}>
              <div className="pic">
                <svg viewBox="0 0 200 150" width="100%" height="100%">
                  <rect x="20" y="30" width="160" height="90" fill="none" stroke="#5a4a3d" strokeWidth="1"/>
                  {i===0 && <path d="M 20 100 Q 60 40, 100 80 T 180 60" fill="none" stroke="#d4622a" strokeWidth="2"/>}
                  {i===1 && <>
                    <circle cx="60" cy="75" r="14" fill="#d4622a"/>
                    <circle cx="100" cy="75" r="14" fill="#d4622a" opacity="0.6"/>
                    <circle cx="140" cy="75" r="14" fill="#d4622a" opacity="0.3"/>
                    <line x1="74" y1="75" x2="86" y2="75" stroke="#5a4a3d" strokeWidth="1"/>
                    <line x1="114" y1="75" x2="126" y2="75" stroke="#5a4a3d" strokeWidth="1"/>
                  </>}
                  {i===2 && <>
                    <text x="100" y="85" fontFamily="Fraunces" fontSize="32" fill="#d4622a" textAnchor="middle" fontStyle="italic">↗</text>
                  </>}
                </svg>
              </div>
              <h6>{p.t} <span className="ar">→</span></h6>
              <p>{p.d}</p>
            </div>
          ))}
        </div>
      </section>

      <footer className="A-footer">
        <div className="row">
          <div>
            <span className="eyebrow" style={{color:'#e0d4c0'}}>Get in touch</span>
            <div className="big" style={{marginTop:14}}>Interested in working <em>together?</em></div>
            <a className="arrow-link" style={{marginTop:24, color:'#f5efe6', borderColor:'#f5efe6'}}>you@domain.com</a>
          </div>
          <div>
            <h6>Sitemap</h6>
            <ul><li><a>Home</a></li><li><a>About</a></li><li><a>Work</a></li><li><a>Writing</a></li><li><a>Now</a></li></ul>
          </div>
          <div>
            <h6>Work</h6>
            <ul><li><a>Machine Learning</a></li><li><a>Analytics</a></li><li><a>Strategy</a></li><li><a>Side Quests</a></li></ul>
          </div>
          <div>
            <h6>Socials</h6>
            <ul><li><a>LinkedIn</a></li><li><a>GitHub</a></li><li><a>Twitter / X</a></li><li><a>RSS</a></li></ul>
          </div>
        </div>
        <div className="copy">
          <span>© {D.name} · 2026</span>
          <span>Crafted with rigor and the occasional joke.</span>
        </div>
      </footer>
    </div>
  );
}

window.DirectionA = DirectionA;
