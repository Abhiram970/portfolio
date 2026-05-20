// Shared content data for all mockups
window.PORTFOLIO_DATA = {
  name: "PV Abhiram",
  initials: "PVA",
  tagline: "From research to production — I build ML systems that work in the real world.",
  blurb:
    "Data analyst at Novartis Healthcare and ML researcher. I work across the full stack — from CUDA kernels and transformer architectures to CRM platforms and business analytics. BTech CSE (AI & ML), VIT Chennai, CGPA 8.78.",
  meta: {
    location: "HYDERABAD, IN",
    role: "DATA ANALYST & ML RESEARCHER",
    availability: "OPEN TO ROLES",
    timezone: "UTC+5:30"
  },

  projects: [
    {
      num: "/ 01",
      span: "span-3",
      title: "CLIP-to-EdgeNeXt Distillation",
      desc: "Distilled CLIP ViT-B/16 into EdgeNeXt-XX-Small (~66× compression) for on-device crop disease detection across 38 disease classes. 3-stage curriculum with a text-prototype-anchored distillation loss. Targets real-world inference on resource-constrained agricultural hardware.",
      tags: ["CLIP", "PyTorch", "Edge AI", "Distillation"],
      kind: "tsne"
    },
    {
      num: "/ 02",
      span: "span-3",
      title: "Neurosymbolic AI: Beyond LLM-to-Solver Pipelines",
      desc: "Co-authored position paper arguing translation — not symbolic inference — is the bottleneck in LLM+solver systems. Evidence from an 85-paper review, multi-scale probing of GPT-2 and DistilBERT, and Phi-2 / Qwen2.5-3B benchmarks on FOLIO with the Z3 SMT solver.",
      tags: ["Position Paper", "GPT-2", "Phi-2", "FOLIO", "Z3"],
      kind: "attention"
    },
    {
      num: "/ 03",
      span: "span-2",
      title: "Adaptive Depth Transformer",
      desc: "Decoder-only transformer that allocates compute per-token via representational convergence gating — simple tokens early-exit, complex ones run full depth. 29% FLOPs reduction with matched perplexity on WikiText-103 across 13 architectural patches.",
      tags: ["PyTorch", "Transformers", "NLP"],
      kind: "curve"
    },
    {
      num: "/ 04",
      span: "span-2",
      title: "Multilingual Bixby Capsule",
      desc: "Led design and integration of Meta's NLLB model into a Bixby capsule for auto-detection and translation across 200+ languages at 98% accuracy. Hosted via Docker + Hugging Face during Samsung R&D internship; first author on findings published on arXiv.",
      tags: ["NLLB", "Docker", "Hugging Face", "Samsung R&D"],
      kind: "spectrum"
    },
    {
      num: "/ 05",
      span: "span-2",
      title: "LLM BI Assistant",
      desc: "Natural-language analytics agent over business databases. Ask a question in plain English, get SQL, a chart, and a narrative summary — in one shot. RAG retrieval over schema docs keeps hallucinations near zero. Stack: LangChain · GPT-4o · Plotly · FastAPI.",
      tags: ["LangChain", "RAG", "FastAPI", "LLM", "WIP"],
      kind: "field"
    },
    {
      num: "/ 06",
      span: "span-3",
      title: "Clinical Doc Processor",
      desc: "Multi-agent LLM pipeline for pharma document intelligence — adverse-event extraction, compliance checks, and structured CRUD summaries from unstructured visit notes and Vault documents. Built around real pain points from the Novartis CRM workflow.",
      tags: ["LLM Agents", "Python", "Pharma", "NLP", "WIP"],
      kind: "matrix"
    },
    {
      num: "/ 07",
      span: "span-3",
      title: "Time-Series Forecast API",
      desc: "Production forecasting service using PatchTST for demand and KPI prediction. Exposes a REST endpoint: upload a CSV, get back forecasts with confidence bands and anomaly flags. Packaged with MLflow tracking and a Docker-compose deployment.",
      tags: ["PatchTST", "MLflow", "FastAPI", "Docker", "WIP"],
      kind: "loss"
    }
  ],

  skills: [
    { name: "Python",        x: 0.72, y: 0.85, p: 0.95, secondary: false },
    { name: "PyTorch",       x: 0.50, y: 0.45, p: 0.90, secondary: false },
    { name: "TensorFlow",    x: 0.55, y: 0.62, p: 0.72, secondary: false },
    { name: "Deep Learning", x: 0.52, y: 0.25, p: 0.88, secondary: false },
    { name: "Comp. Vision",  x: 0.58, y: 0.30, p: 0.85, secondary: false },
    { name: "NLP",           x: 0.62, y: 0.28, p: 0.80, secondary: false },
    { name: "Scikit-learn",  x: 0.70, y: 0.68, p: 0.82, secondary: false },
    { name: "C++",           x: 0.12, y: 0.65, p: 0.65, secondary: false },
    { name: "CUDA",          x: 0.15, y: 0.42, p: 0.68, secondary: false },
    { name: "SQL",           x: 0.80, y: 0.88, p: 0.85, secondary: false },
    { name: "JavaScript",    x: 0.85, y: 0.88, p: 0.75, secondary: false },
    { name: "Snowflake",     x: 0.78, y: 0.90, p: 0.70, secondary: true  },
    { name: "PowerBI",       x: 0.88, y: 0.92, p: 0.72, secondary: true  },
    { name: "Salesforce",    x: 0.90, y: 0.96, p: 0.65, secondary: true  },
    { name: "Alteryx",       x: 0.82, y: 0.80, p: 0.62, secondary: true  },
    { name: "Statistics",    x: 0.68, y: 0.22, p: 0.75, secondary: false }
  ],

  skillGroups: [
    { title: "ML & Research",    items: ["PyTorch", "TensorFlow", "Keras", "Scikit-learn", "Hugging Face Transformers", "Deep Learning", "NLP", "Computer Vision"] },
    { title: "Systems",          items: ["Python", "C++", "Docker", "PySpark"] },
    { title: "Data & Analytics", items: ["SQL", "MySQL", "PostgreSQL", "Snowflake", "FAISS", "DataIKU DSS", "Alteryx", "PowerBI"] },
    { title: "Engineering",      items: ["JavaScript", "Data Structures & Algorithms", "OOP", "Statistical Modeling"] },
    { title: "Business & Strategy", items: ["Stakeholder Management", "Business Requirement Structuring", "Solution Design", "KPI-driven Decision Making", "Salesforce"] }
  ],

  timeline: [
    {
      year: "2024 — NOW",
      role: "Associate Data Analyst",
      company: "Novartis Healthcare",
      points: [
        "Driving analytics for the Pelacarsen launch — defining the target HCO/HCP universe, optimising field force structure and cost, and analysing patient and market dynamics to inform go-to-market and commercial planning.",
        "Designed a multi-source data validation framework (CRM + external APIs + NLP-based classification) that classified 90% of previously-unknown pediatric HCP addresses, improved targeting coverage by 75%, mitigated $10M in regulatory risk and saved $100K in vendor costs.",
        "Partnered on the ZAIDYN Field Deployment rollout with ZS Associates — owned KPI design, BRD translation, system integration, testing and validation; delivered $300K in annual savings via an in-house TechOps transition."
      ]
    },
    { era: true, label: "2024", blocks: "░░░" },
    {
      year: "JAN — JUL 2024",
      role: "Data Science Intern",
      company: "Vivriti Capital Pvt. Ltd.",
      points: [
        "Built an end-to-end pipeline to extract and analyse 10,000+ credit reports from CRISIL, ICRA, CARE Ratings and India Ratings — NLP to lift P&L items, credit ratings and key financial metrics into standardised summaries for investment-lead screening at previously-infeasible scale.",
        "Developed an ML-powered KYC solution combining biometric matching between live customer photos and government IDs with OCR-based cross-validation of portal-entered data against PAN card information."
      ]
    },
    { era: true, label: "2022", blocks: "░░" },
    {
      year: "DEC 2022 — JUL 2023",
      role: "R&D Intern",
      company: "Samsung R&D Institute India",
      points: [
        "Designed API systems for a Bixby capsule with auto-detection and translation across 200+ languages at 98% accuracy.",
        "Integrated the NLLB model via Docker & Hugging Face; first author on findings published on arXiv."
      ]
    },
    { era: true, label: "2020", blocks: "░" },
    {
      year: "2020 — 2024",
      role: "BTech CSE with AI & ML",
      company: "Vellore Institute of Technology, Chennai",
      points: [
        "CGPA 8.78.",
        "Specialisation in Artificial Intelligence and Machine Learning."
      ]
    }
  ],

  writing: [],

  contact: {
    statement: "Building something at the intersection of ML and production? Let's talk.",
    email: "abhiramp428@gmail.com",
    socials: [
      { label: "LINKEDIN", url: "https://www.linkedin.com/in/pvabhiram/" },
      { label: "GITHUB",   url: "https://github.com/Abhiram970" },
      { label: "CV",       url: "./PV_Abhiram%20Resume.pdf" }
    ]
  }
};
