/* Direction B — The Atelier (cream editorial, witty) */
const Bdata = window.PF_DATA;

function DirectionB(){
  return (
    <div className="B-wrap" data-screen-label="B The Atelier">
      <nav className="B-nav">
        <span className="logo">Your Name<span style={{color:'var(--accent)'}}>.</span></span>
        <div className="links">
          <a>Index</a><a>About</a><a>Now</a><a>Writing</a>
        </div>
        <a className="cta">Get in touch ↗</a>
      </nav>

      <section className="B-hero">
        <span className="eyebrow"><span className="num">(01)</span> PORTFOLIO · VOL. VII · 2026</span>
        <h2>I turn<br/><em>messy data</em><br/>into <span className="strike">boring</span> <em>boring</em> profit.</h2>
        <div className="row">
          <p className="lead">
            Data scientist and consultant. Seven years of making spreadsheets behave, dashboards useful,
            and executive meetings <span className="hi">14% shorter</span>. Currently taking on two more clients for Q3.
          </p>
          <div className="meta">
            <div className="row2"><span className="k">Status</span><span>Open to work · Q3 2026</span></div>
            <div className="row2"><span className="k">Based</span><span>Wherever WiFi is</span></div>
            <div className="row2"><span className="k">Stack</span><span>Python · SQL · dbt · Excel</span></div>
            <div className="row2"><span className="k">Reply</span><span>&lt; 24h, usually faster</span></div>
          </div>
        </div>
        <div className="scribble">
          ↑ yes that's a Freudian slip
          <svg width="80" height="30" viewBox="0 0 80 30">
            <path d="M 5 5 Q 40 25, 75 10" fill="none" stroke="currentColor" strokeWidth="1.5"/>
            <path d="M 70 6 L 75 10 L 71 14" fill="none" stroke="currentColor" strokeWidth="1.5"/>
          </svg>
        </div>
      </section>

      <section className="B-features">
        {[
          { n:"01", t:"Decision-grade", d:"Models that survive contact with the leadership team. Defensible, explainable, deployed." },
          { n:"02", t:"Narrative-first", d:"The chart is the start, not the end. Every project ships with a story the C-suite can repeat." },
          { n:"03", t:"System-shaped",   d:"dbt pipelines, version-controlled metrics, documentation a junior analyst can follow." },
          { n:"04", t:"Bounded scope",   d:"Eight-week engagements. Defined deliverables. No retainer creep." },
        ].map((f,i)=>(
          <div className="feat" key={i}>
            <span className="num">/{f.n}</span>
            <h5>{f.t}</h5>
            <p>{f.d}</p>
          </div>
        ))}
      </section>

      <section className="B-work">
        <div className="head">
          <div>
            <span className="eyebrow"><span className="num">(02)</span> SELECTED WORK · 08 PROJECTS</span>
            <h3 style={{marginTop:6}}>Index of <em>recent obsessions.</em></h3>
          </div>
          <a className="arrow-link">View all 42</a>
        </div>

        <div className="index">
          {Bdata.projects.map((p)=>(
            <div className="row" key={p.id}>
              <span className="num">— {p.id}</span>
              <span className="ttl">{p.title}</span>
              <span className="client">{p.client}</span>
              <span className="out">{p.outcome}</span>
              <span className="yr">{p.year}</span>
              <span className="ar">→</span>
            </div>
          ))}
        </div>

        <div className="B-callout">
          A side note from a junior version of myself: <b>"every chart should answer the question 'so what?' in one sentence or it goes in the bin."</b> Still works.
        </div>
      </section>

      <section className="B-strip">
        <div className="row">
          <div className="left">
            <span className="eyebrow"><span className="num">(03)</span> NOW · UPDATED MAY 2026</span>
            <h4>What I'm <em>doing rn</em>.</h4>
            <p>A small, slightly-self-indulgent feed of what's actually on my desk this week. Updated whenever the desk changes, which is more often than I'd like.</p>
            <a className="arrow-link" style={{marginTop:14}}>See full now-page</a>
          </div>
          <div className="now">
            <div className="live"><span className="d"></span><span className="mono" style={{fontSize:11, textTransform:'uppercase', letterSpacing:'.06em', color:'var(--ink-2)'}}>● LIVE · MAY 2026 · WK 18</span></div>
            <ul>
              {Bdata.now.map((n,i)=>(
                <li key={i}><span>{n.t}</span><span className="mono" style={{fontSize:11, color:'var(--ink-3)'}}>{n.c}</span></li>
              ))}
            </ul>
            <span className="updated">↻ refreshed every Sunday evening</span>
          </div>
        </div>
      </section>

      <footer className="B-foot">
        <span className="eyebrow"><span className="num">(04)</span> CONTACT · END OF VOLUME</span>
        <div className="big" style={{marginTop:20}}>Let's make a chart that <em>actually changes a mind.</em><br/><a>you@domain.com</a></div>
        <div className="links">
          <a>LinkedIn</a><a>GitHub</a><a>RSS</a><a>Resume.pdf ↗</a>
          <span style={{marginLeft:'auto'}}>© {Bdata.name} · MMXXVI</span>
        </div>
      </footer>
    </div>
  );
}
window.DirectionB = DirectionB;
