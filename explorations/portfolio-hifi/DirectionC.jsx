/* Direction C — The Workshop (most wireframe DNA) */
const Cdata = window.PF_DATA;

function Blueprint(){
  return (
    <div className="C-blueprint">
      <div className="grid-bg"></div>
      <span className="corner c-tl">FIG. 01</span>
      <span className="corner c-tr">SCALE 1:1</span>
      <span className="corner c-bl">YN_ENG</span>
      <span className="corner c-br">REV. 042</span>
      <svg viewBox="0 0 400 400" preserveAspectRatio="xMidYMid meet">
        {/* axes */}
        <line x1="60" y1="60" x2="60" y2="340" stroke="#2a1f17" strokeWidth="1.5"/>
        <line x1="60" y1="340" x2="340" y2="340" stroke="#2a1f17" strokeWidth="1.5"/>
        {/* curve */}
        <path d="M 60 320 Q 140 280, 200 220 T 340 80" fill="none" stroke="#d4622a" strokeWidth="2.5"/>
        {/* dashed projection */}
        <path d="M 60 280 Q 140 240, 200 180 T 340 60" fill="none" stroke="#2a1f17" strokeWidth="1.2" strokeDasharray="4 3"/>
        {/* points */}
        {[[100,300],[160,250],[200,220],[260,160],[300,120],[340,80]].map(([x,y],i)=>(
          <g key={i}>
            <circle cx={x} cy={y} r="6" fill="#f5efe6" stroke="#2a1f17" strokeWidth="1.5"/>
            <circle cx={x} cy={y} r="2" fill="#d4622a"/>
          </g>
        ))}
        {/* labels */}
        <text x="50" y="50" fontFamily="JetBrains Mono" fontSize="9" fill="#5a4a3d" textAnchor="end" transform="rotate(-90 50 50)">IMPACT (USD)</text>
        <text x="200" y="370" fontFamily="JetBrains Mono" fontSize="9" fill="#5a4a3d" textAnchor="middle">PROJECT INDEX (CHRONOLOGICAL)</text>
      </svg>
      <span className="annot" style={{top:'18%', right:'10%'}}>↘ latest</span>
      <span className="annot" style={{bottom:'24%', left:'14%', transform:'rotate(-2deg)'}}>● = a project</span>
    </div>
  );
}

function CCardSVG({ i }){
  return (
    <svg viewBox="0 0 200 120" preserveAspectRatio="none">
      {i % 5 === 0 && <polyline points="10,100 40,80 70,90 100,40 130,60 170,20" strokeWidth="2.5" fill="none"/>}
      {i % 5 === 1 && <>{[20,55,90,125,160].map((x,j)=>(<rect key={j} x={x-10} y={110-(15+j*16)} width="20" height={15+j*16} fill="currentColor" opacity={0.85}/>))}</>}
      {i % 5 === 2 && <>
        <circle cx="60" cy="60" r="35" fill="none" strokeWidth="2"/>
        <circle cx="120" cy="60" r="35" fill="none" strokeWidth="2"/>
        <path d="M 80 60 A 35 35 0 0 1 100 60 Z" strokeWidth="2"/>
      </>}
      {i % 5 === 3 && <>
        <path d="M 10 60 Q 50 20, 90 60 T 170 60" strokeWidth="2.5" fill="none"/>
        <path d="M 10 80 Q 50 40, 90 80 T 170 80" strokeWidth="1.5" fill="none" strokeDasharray="3 2"/>
      </>}
      {i % 5 === 4 && <>
        {Array.from({length:9}).map((_,k)=>{
          const r=Math.floor(k/3), c=k%3;
          return <rect key={k} x={30+c*50} y={20+r*30} width="40" height="22" fill={k===4?"currentColor":"none"} stroke="currentColor" strokeWidth="1.5" opacity={k===4?1:0.6}/>;
        })}
      </>}
    </svg>
  );
}

function DirectionC(){
  const [filter, setFilter] = React.useState("All");
  const cats = ["All","ML","Analytics","Strategy","Fun"];
  const filtered = filter==="All" ? Cdata.projects : Cdata.projects.filter(p=>p.cat===filter);

  return (
    <div className="C-wrap" data-screen-label="C The Workshop">
      <nav className="C-nav">
        <div className="logo"><span className="b">YN</span>workshop</div>
        <div className="links">
          <a className="active">work</a><a>about</a><a>now</a><a>writing</a><a>contact</a>
        </div>
      </nav>

      <section className="C-hero">
        <div className="lead">
          <span className="eyebrow">
            <svg width="22" height="22" viewBox="0 0 22 22"><circle cx="11" cy="11" r="4" fill="#d4622a"/><circle cx="11" cy="11" r="9" fill="none" stroke="#2a1f17" strokeWidth="1"/></svg>
            <span><span className="num">(01)</span> WORKBOOK · DRAFT 042 · MAY 2026</span>
          </span>
          <h2>A <em>workshop</em><br/>for <span className="underline">data, decisions,</span><br/>and the occasional joke.</h2>
          <p>I'm a data scientist who consults — or a consultant who codes, depending on the room. Seven years of building models that ship and dashboards that get opened on Tuesdays.</p>
          <div className="ctas">
            <a className="btn primary">See the work →</a>
            <a className="btn">Book 30 min</a>
          </div>
        </div>
        <Blueprint/>
      </section>

      <div className="C-strip">
        <div className="track">
          <span>● rigorous ● readable ● shipped ● maintained ● defensible ● rigorous ● readable ● shipped ● maintained ● defensible</span>
          <span>● rigorous ● readable ● shipped ● maintained ● defensible ● rigorous ● readable ● shipped ● maintained ● defensible</span>
        </div>
      </div>

      <section className="C-work">
        <div className="head">
          <h3>The catalog.<span className="scrap">eight pieces, on display.</span></h3>
          <div className="filter">
            {cats.map(c=>(
              <button key={c} className={filter===c?"on":""} onClick={()=>setFilter(c)}>{c}</button>
            ))}
          </div>
        </div>

        <div className="C-grid">
          {filtered.map((p,i)=>(
            <div className="card" key={p.id}>
              <span className="num">/{p.id} · {p.cat.toUpperCase()}</span>
              <div className="pic"><CCardSVG i={i}/></div>
              <h4>{p.title}</h4>
              <div className="meta"><span>{p.client}</span><span>{p.year}</span></div>
              <p>{p.body}</p>
              <span className="out">→ {p.outcome}</span>
            </div>
          ))}
        </div>

        <div style={{marginTop:60, display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:30}}>
          {Cdata.pillars.map((p)=>(
            <div key={p.n} style={{borderTop:'2px solid var(--ink)', paddingTop:20}}>
              <span className="eyebrow" style={{display:'block', marginBottom:8}}>/{p.n} · principle</span>
              <h4 style={{fontFamily:'var(--serif)', fontSize:32, fontWeight:400, margin:'0 0 10px', letterSpacing:'-.01em'}}>{p.t}</h4>
              <p style={{fontSize:14, lineHeight:1.55, color:'var(--ink-2)', margin:0}}>{p.d}</p>
            </div>
          ))}
        </div>
      </section>

      <footer style={{padding:'60px 50px', background:'var(--ink)', color:'var(--paper)', borderTop:'2px solid var(--ink)'}}>
        <div style={{maxWidth:1280, margin:'0 auto', display:'grid', gridTemplateColumns:'2fr 1fr', gap:40, alignItems:'end'}}>
          <div>
            <span className="eyebrow" style={{color:'var(--paper-3)'}}>(end of catalog)</span>
            <div style={{fontFamily:'var(--serif)', fontSize:64, fontWeight:300, lineHeight:1, marginTop:14, letterSpacing:'-.02em'}}>
              Let's <em style={{color:'var(--accent)', fontStyle:'italic'}}>build a thing</em>.
            </div>
            <div style={{fontFamily:'var(--hand)', fontSize:24, color:'var(--accent)', marginTop:14}}>↳ you@domain.com · usually replies same day</div>
          </div>
          <div style={{fontFamily:'var(--mono)', fontSize:11, color:'var(--paper-3)', textTransform:'uppercase', letterSpacing:'.06em', display:'flex', flexDirection:'column', gap:8}}>
            <a style={{color:'var(--paper)'}}>linkedin ↗</a>
            <a style={{color:'var(--paper)'}}>github ↗</a>
            <a style={{color:'var(--paper)'}}>rss ↗</a>
            <span style={{marginTop:14, color:'var(--paper-3)'}}>© Your Name · workshop · 2026</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
window.DirectionC = DirectionC;
