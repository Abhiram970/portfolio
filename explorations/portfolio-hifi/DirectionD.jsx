/* Direction D — The Catalog (product-catalog hybrid) */
const Ddata = window.PF_DATA;

function SpecPic({ i }){
  return (
    <svg viewBox="0 0 200 200">
      <circle cx="100" cy="100" r="90" fill="none" stroke="#8a7868" strokeWidth="0.5" strokeDasharray="2 3"/>
      <circle cx="100" cy="100" r="60" fill="none" stroke="#8a7868" strokeWidth="0.5"/>
      {i % 4 === 0 && <>
        <polyline points="30,150 60,120 90,130 120,80 150,90 180,40" fill="none" stroke="#d4622a" strokeWidth="2.5"/>
        {[[30,150],[60,120],[90,130],[120,80],[150,90],[180,40]].map(([x,y],j)=>(<circle key={j} cx={x} cy={y} r="3.5" fill="#2a1f17"/>))}
      </>}
      {i % 4 === 1 && <>
        {[40,70,100,130,160].map((x,j)=>(<rect key={j} x={x-10} y={170-(20+j*22)} width="20" height={20+j*22} fill={j===4?"#d4622a":"#2a1f17"} opacity={j===4?1:0.85}/>))}
      </>}
      {i % 4 === 2 && <>
        <path d="M 100 30 A 70 70 0 1 1 30 100 L 100 100 Z" fill="#d4622a" opacity="0.85"/>
        <path d="M 100 30 A 70 70 0 0 1 170 100 L 100 100 Z" fill="#2a1f17"/>
      </>}
      {i % 4 === 3 && <>
        {Array.from({length:30}).map((_,j)=>{
          const angle = (j/30)*Math.PI*2;
          const r = 30 + Math.random()*50;
          const x = 100+Math.cos(angle)*r, y = 100+Math.sin(angle)*r;
          return <circle key={j} cx={x} cy={y} r={2+Math.random()*4} fill={j%4===0?"#d4622a":"#2a1f17"} opacity={0.6+Math.random()*0.4}/>;
        })}
      </>}
    </svg>
  );
}

function SpecSheet({ p, i, flip }){
  const specs = [
    ["Discipline", p.cat],
    ["Client", p.client],
    ["Year", p.year],
    ["Duration", ["6 wks","8 wks","10 wks","12 wks","8 wks","6 wks","4 wks","ongoing"][i]],
    ["Stack", ["Python · XGBoost · dbt","Python · SQL · Tableau","LangChain · Python","Prophet · dbt · BigQuery","Python · sklearn","Python · stats","Metabase · dbt","Python · Telegram"][i]],
    ["Outcome", p.outcome],
  ];
  return (
    <section className={"D-spec" + (flip ? " flip" : "")}>
      {flip ? null : (
        <div className="pic"><SpecPic i={i}/><span className="gauge">FIG. {p.id}</span></div>
      )}
      <div className="info">
        <span className="pgnum">PG. {String(i*4+12).padStart(3,'0')} · ENTRY {p.id}/08</span>
        <span className="cat">— {p.cat.toUpperCase()}</span>
        <h4>{p.title.includes(",") ? <>{p.title.split(",")[0]},<br/><em>{p.title.split(",")[1]}</em></> : <em>{p.title}</em>}</h4>
        <p className="lead">{p.body}</p>
        <div className="specs">
          {specs.map(([k,v],j)=>(<div className="row2" key={j}><span className="k">{k}</span><span className="v">{v}</span></div>))}
        </div>
        <div className="actions">
          <a className="arrow-link">Read case study</a>
          <span className="mono" style={{fontSize:10, color:'var(--ink-3)', textTransform:'uppercase', letterSpacing:'.08em'}}>· 8 min read</span>
        </div>
      </div>
      {flip ? (<div className="pic"><SpecPic i={i}/><span className="gauge">FIG. {p.id}</span></div>) : null}
    </section>
  );
}

function DirectionD(){
  return (
    <div className="D-wrap" data-screen-label="D The Catalog">
      <nav className="D-nav">
        <span className="logo">Your Name <span style={{color:'var(--accent)'}}>·</span> Catalog</span>
        <span className="vol">Vol. VII / 2026 / 64 pp.</span>
        <div className="links">
          <a>Index</a><a>About</a><a>Now</a><a>Order ↗</a>
        </div>
      </nav>

      <section className="D-cover">
        <div className="meta">
          <span><b>The Annual</b><br/>Catalog of Selected Works</span>
          <span>Issue No. 7 · MMXXVI</span>
          <span>Editor & Operator: <b>Your Name</b></span>
          <span>Languages: en · de · fr</span>
          <span className="stamp">★ Open to Work · Q3</span>
        </div>
        <h2><em>Data</em>, set in print.<span className="small">A field guide to eight projects, three principles, and one slightly-tired tomato plant.</span></h2>
      </section>

      <section className="D-toc">
        <h3>Contents · Table of</h3>
        <div className="row">
          {Ddata.projects.map((p,i)=>(
            <div className="item" key={p.id}>
              <span>{p.id} · {p.title}</span>
              <span className="pg">p.{String(i*4+12).padStart(3,'0')}</span>
            </div>
          ))}
        </div>
      </section>

      <SpecSheet p={Ddata.projects[0]} i={0}/>
      <SpecSheet p={Ddata.projects[1]} i={1} flip/>

      <section className="D-pull">
        <span className="mono" style={{fontSize:11, color:'var(--accent)', letterSpacing:'.08em', textTransform:'uppercase', marginBottom:24, display:'block'}}>(03) — Pull Quote · pg. 028</span>
        <q>Most data consultants give you a <em>deck.</em> They gave us a system, a playbook, and a Slack channel that's still answering questions <em>six months later.</em></q>
        <span className="who"><b style={{color:'var(--ink)', fontWeight:600, fontSize:13}}>— Marcus Holloway</b><br/>COO · Logistics Co. · ★★★★★</span>
      </section>

      <SpecSheet p={Ddata.projects[2]} i={2}/>
      <SpecSheet p={Ddata.projects[3]} i={3} flip/>

      <section className="D-pull" style={{background:'var(--ink)', color:'var(--paper)', padding:'80px 60px', maxWidth:'none', borderTop:'1px solid var(--ink)'}}>
        <span className="mono" style={{fontSize:11, color:'var(--accent)', letterSpacing:'.08em', textTransform:'uppercase', marginBottom:24, display:'block'}}>(04) — Approach · pg. 042</span>
        <div style={{maxWidth:1100, margin:'0 auto', display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:50, textAlign:'left'}}>
          {Ddata.pillars.map((p)=>(
            <div key={p.n}>
              <span className="mono" style={{fontSize:11, color:'var(--accent)', letterSpacing:'.06em'}}>/ {p.n}</span>
              <h4 style={{fontFamily:'var(--serif)', fontSize:36, fontWeight:300, margin:'10px 0 14px', color:'var(--paper)'}}>{p.t}</h4>
              <p style={{fontSize:14, lineHeight:1.6, color:'var(--paper-3)', margin:0}}>{p.d}</p>
            </div>
          ))}
        </div>
      </section>

      <SpecSheet p={Ddata.projects[4]} i={4}/>
      <SpecSheet p={Ddata.projects[5]} i={5} flip/>
      <SpecSheet p={Ddata.projects[6]} i={6}/>
      <SpecSheet p={Ddata.projects[7]} i={7} flip/>

      <section className="D-end">
        <div>
          <span className="mono" style={{fontSize:11, color:'var(--ink-2)', textTransform:'uppercase', letterSpacing:'.08em'}}>(05) — Order Form · pg. 064</span>
          <h4>Place an <em>order</em>.</h4>
          <p>Half-day strategy sessions, eight-week engagements, or "let's just talk for thirty minutes" coffee. Pricing on request, scoped on call, invoiced on delivery.</p>
          <a className="arrow-link">you@domain.com</a>
        </div>
        <div className="order">
          <span className="mono" style={{fontSize:11, textTransform:'uppercase', letterSpacing:'.08em', color:'var(--ink-2)', display:'block', marginBottom:16}}>SAMPLE ORDER · YN/2026/0042</span>
          <div className="li"><span>1× Strategy half-day</span><span className="v">$2,400</span></div>
          <div className="li"><span>1× 8-week engagement</span><span className="v">$ on req.</span></div>
          <div className="li"><span>1× Slack support, 90 days</span><span className="v">incl.</span></div>
          <div className="li"><span>1× Bad pun, every meeting</span><span className="v">free</span></div>
          <div className="total"><span>Total</span><span style={{color:'var(--accent)'}}>let's chat</span></div>
        </div>
      </section>

      <footer className="D-foot">
        <span>© Your Name · Annual Catalog · Vol. VII · MMXXVI</span>
        <span>Set in Fraunces, Inter, JetBrains Mono</span>
        <span>Printed on the internet</span>
      </footer>
    </div>
  );
}
window.DirectionD = DirectionD;
