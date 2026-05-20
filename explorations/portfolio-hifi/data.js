/* Shared content for the portfolio directions */
window.PF_DATA = {
  name: "Your Name",
  tag: "Data Scientist · Business Consultant",
  taglineParts: {
    big: ["I turn", "messy data", "into", "boring profit."],
  },
  bio: "Seven years turning chaos into charts into cash. Ex-McKinsey, independent since '23. Python, SQL, dbt, and an unhealthy amount of Excel. Currently taking on two more clients for Q3.",
  stats: [
    { v: "42",   k: "projects shipped" },
    { v: "$3.1M", k: "measured impact" },
    { v: "07",   k: "years in the game" },
    { v: "1,204", k: "espresso units" },
  ],
  projects: [
    { id:"01", title:"Churn, Predicted",     client:"Fintech A",      cat:"ML",        outcome:"−18% monthly attrition", year:"'25", body:"XGBoost on 3 years of behavioral signals + a retention playbook the CS team actually reads." },
    { id:"02", title:"The Pricing Sim",      client:"DTC Brand",      cat:"Analytics", outcome:"+$2.1M revenue",         year:"'25", body:"Elasticity model + executive workshop. Result: a price ladder that survives contact with the marketing team." },
    { id:"03", title:"RAG That Works",       client:"Legal Tech",     cat:"ML",        outcome:"90% answer accuracy",    year:"'24", body:"Retrieval eval harness. 300-doc gold set. Stopped the demo from lying." },
    { id:"04", title:"Ops Forecast Engine",  client:"Logistics Co.",  cat:"Analytics", outcome:"2 hrs → 8 min cycle",    year:"'24", body:"Prophet + dbt. Monday morning planning meetings now end on time." },
    { id:"05", title:"LTV, Segmented",       client:"Stealth",        cat:"Strategy",  outcome:"3 actionable cohorts",   year:"'24", body:"K-means with a narrative. Cohorts the CMO could explain to her board in two slides." },
    { id:"06", title:"A/B Framework",        client:"Marketplace",    cat:"Strategy",  outcome:"vibes → rigor",          year:"'23", body:"Stats 101 doc + a calculator that nobody can argue with. Five product PMs converted." },
    { id:"07", title:"The Exec Dashboard",   client:"SaaS, Series B", cat:"Analytics", outcome:"actually opened",        year:"'23", body:"Metabase rebuild. Rare achievement: opened on a Tuesday morning by a non-data executive." },
    { id:"08", title:"Weatherbot",           client:"Self",           cat:"Fun",       outcome:"5k MAU, $0 ARR ✌︎",       year:"'23", body:"Telegram bot that judges your outfit choice. A side quest with no monetization plan, by design." },
  ],
  testimonials: [
    { q:"They turned a year of half-broken dashboards into one report the CEO opens every Monday. I've never seen the leadership team agree on a number this fast.", who:"Priya Reddy", role:"Head of Strategy · Series-B SaaS" },
    { q:"Most data consultants give you a deck. They gave us a system, a playbook, and a Slack channel that's still answering questions six months later.", who:"Marcus Holloway", role:"COO · Logistics co." },
    { q:"The pricing model paid for itself in the first quarter. The exec workshop was the most useful three hours we ran all year.", who:"Léa Bertrand", role:"CFO · DTC Brand" },
    { q:"We hired them to fix one churn problem and ended up rewriting our retention strategy. Best ROI on any consulting engagement we've done.", who:"Daniel Park", role:"VP Growth · Fintech" },
  ],
  pillars: [
    { t:"Methodology", d:"Bayesian where it matters, frequentist where the audience matters more. Models you can defend in a board meeting.", n:"01" },
    { t:"Systems",     d:"Pipelines that survive the consultant leaving. dbt, version-controlled metrics, and documentation people actually read.", n:"02" },
    { t:"Translation", d:"Charts → narrative → decision. The job isn't done until someone changes their mind based on it.", n:"03" },
  ],
  now: [
    { t:"Building retrieval eval harness", c:"fintech client" },
    { t:"Reading: Statistical Rethinking", c:"chapter 5" },
    { t:"Garden: 3 tomato varieties",      c:"1 sad basil"  },
    { t:"Writing: \"Why your A/B test lies\"", c:"draft 3" },
  ],
};
