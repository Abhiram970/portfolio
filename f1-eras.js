// 4-era timeline with real F1 photos (Unsplash keyword URLs return real public photos)
// + a default "orange" theme used initially
window.F1_ERAS = [
  {
    year: "2022",
    label: "ROOKIE",
    team: "SAMSUNG",
    role: "R&D Intern",
    note: "Designed Bixby capsule APIs for auto-detection and translation across 200+ languages at 98% accuracy. Integrated NLLB via Docker & Hugging Face. Published on arXiv.",
    img: "redbull.jpg"
  },
  {
    year: "2024",
    label: "MIDFIELD",
    team: "VIVRITI",
    role: "Data Science Intern",
    note: "Automated PDF stock statement analysis with Computer Vision — 80% productivity boost. Built ML-powered KYC solution with OCR-based invoice extraction.",
    img: "ferrari.jpg"
  },
  {
    year: "2025",
    label: "FRONTRUNNER",
    team: "NOVARTIS",
    role: "Associate Data Analyst",
    note: "Supporting ZAIDYN platform launch and US brand rollouts. SQL analytics, CRM administration, and Veeva Vault managing 2,800+ healthcare professionals across France.",
    img: "merc.jpg"
  }
];

// 8 swatches: 4 primary moods, 4 secondaries; "orange/cream" is default
window.ERA_THEMES = {
  primary: [
    { id: "orange",   name: "BURNT ORANGE",  bg: "#15110E", fg: "#F2EDE4", accent: "#FF6B1F", note: "DEFAULT" },
    { id: "acid",     name: "ACID GREEN",    bg: "#0E0E10", fg: "#F4F4F2", accent: "#D2FF00" },
    { id: "blue",     name: "ELECTRIC BLUE", bg: "#F4F4F2", fg: "#111112", accent: "#2D5BFF" },
    { id: "cyan",     name: "CYAN",          bg: "#0A0E1A", fg: "#C8D4E8", accent: "#00E5FF" }
  ],
  secondary: [
    { id: "none",     name: "NONE",          val: "transparent" },
    { id: "magenta",  name: "MAGENTA",       val: "#FF2E63" },
    { id: "lime",     name: "LIME",          val: "#B8FF3D" },
    { id: "violet",   name: "VIOLET",        val: "#9B5BFF" }
  ]
};
