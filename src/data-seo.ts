import type { SeoBioData, SeoExpertiseItem, SeoCaseStudy, SeoPublication, SeoTrustFactor, SeoMethodologyStep, SeoCoFounder, SeoService } from "./types-seo";

export const SEO_BIO: SeoBioData = {
  name: "Maksim Sokal",
  tagline: "SEO Expert & Head of Strategy",
  role: "CEO & Head of Strategy",
  org: "Finial SEO",
  orgUrl: "https://finialseo.org",
  experienceSince: "2007",
  experienceYears: 19,
  location: "Remote (RU / EU / US Markets)",
  email: "contact@finialseo.org",
  linkedin: "https://www.linkedin.com/in/maksim-sokal/",
  website: "https://finialseo.org",
  overview:
    "SEO strategy expert since 2007. CEO and co-founder of Finial SEO. Specializes in comprehensive white-hat promotion, Google E-E-A-T frameworks, and international SEO for EU and US markets.",
};

export const SEO_CO_FOUNDER: SeoCoFounder = {
  name: "Elya Sokol",
  role: "CTO & Head of Technical SEO",
  url: "https://elya-sokal.github.io/",
  image: "https://finialseo.org/img/Elya-Sokol.webp",
  bio: "Co-founded Finial SEO with Maksim in 2026, owning the technical half of the practice: Core Web Vitals engineering, web infrastructure, and NLP-assisted content pipelines. Every engagement ships with Maksim's strategy layer and Elya's engineering layer working as one.",
  focus: ["Technical SEO", "Core Web Vitals", "Astro Framework", "Web Engineering", "Python NLP"],
};

export const SEO_SERVICES: SeoService[] = [
  {
    id: "seo-promotion",
    name: "Full-Cycle SEO Promotion",
    serviceType: "SEO Promotion",
    url: "https://finialseo.org/services/seo-promotion",
  },
  {
    id: "content-plan",
    name: "E-E-A-T Strategies",
    serviceType: "Content Strategy",
    url: "https://finialseo.org/services/content-plan",
  },
  {
    id: "technical-audit",
    name: "Technical SEO Audit",
    serviceType: "Technical Audit",
    url: "https://finialseo.org/services/technical-audit",
  },
  {
    id: "semantic-core",
    name: "Semantic Core & Topical Maps",
    serviceType: "Semantic Architecture",
    url: "https://finialseo.org/services/semantic-core",
  },
  {
    id: "migration",
    name: "Safe Site Migration",
    serviceType: "Migration Engineering",
    url: "https://finialseo.org/services/migration",
  },
  {
    id: "analytics-linkbuilding",
    name: "Analytics & Linkbuilding Support",
    serviceType: "Analytics & Linkbuilding",
    url: "https://finialseo.org/services/analytics-linkbuilding",
  },
];

export const SEO_EXPERTISE: SeoExpertiseItem[] = [
  {
    id: "seo-strategy",
    title: "SEO Strategy",
    description:
      "Developing comprehensive promotion strategies with predictable KPIs. Proven track record across e-commerce, SaaS, FinTech, and EdTech niches.",
    codeSymbol: "$SEO$",
    technicalLabel: "Predictable KPI-Linked Growth Architecture",
  },
  {
    id: "international-seo",
    title: "International SEO",
    description:
      "Promotion in EU and US markets. hreflang, multilingual content architecture, and adaptation of assets to Western E-E-A-T quality standards.",
    codeSymbol: "$I18N$",
    technicalLabel: "Cross-Market hreflang & Entity Mapping",
  },
  {
    id: "eeat-strategies",
    title: "E-E-A-T Strategies",
    description:
      "Building expert content that complies with Google E-E-A-T standards: author authority systems, first-hand experience layers, fact-checking pipelines. Author columns, research, case studies.",
    codeSymbol: "$E3T$",
    technicalLabel: "Experience · Expertise · Authority · Trust",
  },
  {
    id: "analytics-kpi",
    title: "Analytics & KPIs",
    description:
      "Building analytics systems tied to business metrics. Live Looker Studio dashboards, traffic forecasting, and reporting that tracks real organic ROI.",
    codeSymbol: "$KPI$",
    technicalLabel: "End-to-End Organic ROI Tracking",
  },
];

export const SEO_CASE_STUDIES: SeoCaseStudy[] = [
  {
    id: "case-01",
    client: "Apex Online Pharmacy",
    url: "https://apexonlinepharmacy.com/",
    growth: "+950%",
    position: "Top-3",
    niche: "YMYL / Pharma",
    description:
      "Organic traffic growth of +950%, reaching top-3 for key YMYL queries in the pharmaceutical niche after a full E-E-A-T recovery program.",
  },
  {
    id: "case-02",
    client: "AsterDex Hub",
    url: "https://asterdexhub.com/",
    growth: "+1,240%",
    position: "Top-3",
    niche: "DeFi / Exchange",
    description:
      "Top-3 rankings for core protocol queries with organic traffic growth of +1,240% through entity-based topical architecture.",
  },
  {
    id: "case-03",
    client: "Commercial Exploitation",
    url: "https://www.commercialexploitation.org/",
    growth: "+800%",
    position: "Top-5",
    niche: "B2B / Legal",
    description:
      "Top-5 rankings for high-intent B2B queries and organic traffic growth of +800% via silo interlinking and authority content.",
  },
  {
    id: "case-04",
    client: "CS-Pharmacy",
    url: "https://cs-pharmacy.net/",
    growth: "+780%",
    position: "Top-4",
    niche: "Pharma / E-commerce",
    description:
      "Top-4 rankings across commercial pharmacy queries with organic traffic growth of +780% after technical and E-E-A-T restructuring.",
  },
  {
    id: "case-05",
    client: "Keyfordex",
    url: "https://keyfordex.com/",
    growth: "+670%",
    position: "Top-1",
    niche: "DeFi / Exchange",
    description:
      "Key queries reached top-1 with organic traffic growth of +670% through semantic core architecture and information-gain content.",
  },
  {
    id: "case-06",
    client: "Order CS Help",
    url: "https://order-cs.help/",
    growth: "+890%",
    position: "Top-1",
    niche: "E-commerce / Services",
    description:
      "Key queries reached top-1 with organic traffic growth of +890% through conversion-focused intent mapping and CWV engineering.",
  },
  {
    id: "case-07",
    client: "Sonus Pharma",
    url: "https://www.sonuspharma.com/",
    growth: "+720%",
    position: "Top-3",
    niche: "Pharma / Health",
    description:
      "Top-3 rankings for health-related commercial queries with organic traffic growth of +720% via trust-layer reinforcement.",
  },
];

export const SEO_PUBLICATIONS: SeoPublication[] = [
  {
    id: "pub-01",
    title: "GEO / AEO: How to Work with AI Search",
    url: "https://finialseo.org/en/blog/geo-aeo-guide",
    kind: "Guide",
    description:
      "A full guide to optimizing for generative search and AI answer blocks — SGE, GPT Search, and Perplexity.",
  },
  {
    id: "pub-02",
    title: "E-E-A-T: A Guide for Webmasters",
    url: "https://finialseo.org/en/blog/eeat-guide",
    kind: "Guide",
    description:
      "A practical guide to expertise, authoritativeness, and trustworthiness with markup examples and a real YMYL recovery case.",
  },
];

export const SEO_TRUST_FACTORS: SeoTrustFactor[] = [
  {
    id: "trust-01",
    title: "Sites in Top-10",
    metric: "94%",
    description:
      "Share of client projects holding top-10 positions in Google for their core commercial query clusters.",
  },
  {
    id: "trust-02",
    title: "Avg Traffic Growth",
    metric: "+487%",
    description:
      "Average organic traffic growth across client portfolio within the first six months of the engagement.",
  },
  {
    id: "trust-03",
    title: "Client Revenue from SEO",
    metric: "₽2.4B",
    description:
      "Aggregate business revenue directly attributed to organic search across active and completed projects.",
  },
  {
    id: "trust-04",
    title: "Avg Client Rating",
    metric: "4.9/5",
    description:
      "Average client satisfaction score across strategy reviews, reporting quality, and communication.",
  },
  {
    id: "trust-05",
    title: "White-Hat Compliance",
    metric: "100%",
    description:
      "Strictly white-hat methods across every engagement — zero PBN networks, zero behavioral factor manipulation, zero penalty risk.",
  },
];

export const SEO_METHODOLOGY_STEPS: SeoMethodologyStep[] = [
  {
    id: "step-01",
    num: "01",
    title: "Deep Audit & Crawl Baseline",
    codeSymbol: "$A$",
    technicalLabel: "Technical Diagnostic & Topical Mapping",
    description:
      "Engineers capture a precise snapshot of the resource: 100+ parameter diagnostics via Screaming Frog and JetOctopus, server log analysis, commercial factors, and backlink gap assessment via Ahrefs.",
    gate: "NODES = 100+ PARAMS",
  },
  {
    id: "step-02",
    num: "02",
    title: "Strategy & ICE Prioritization",
    codeSymbol: "$I$",
    technicalLabel: "Impact × Confidence × Ease Scoring",
    description:
      "Every hypothesis is scored on the ICE matrix (Impact, Confidence, Ease) to build a sprint roadmap that delivers the highest organic ROI first, with traffic, CR, and LTV forecasts.",
    gate: "ICE = I × C × E",
  },
  {
    id: "step-03",
    num: "03",
    title: "Technical Engineering & CWV",
    codeSymbol: "$V$",
    technicalLabel: "Core Web Vitals Response Engineering",
    description:
      "Critical indexing blockers are eliminated, Core Web Vitals (INP, LCP, CLS) are optimized, Schema.org markup is deployed, and crawl budget is economized across the architecture.",
    gate: "INP < 200ms · LCP < 2.5s",
  },
  {
    id: "step-04",
    num: "04",
    title: "E-E-A-T Content & Linkbuilding",
    codeSymbol: "$T$",
    technicalLabel: "Expertise, Authority & Trust Layer",
    description:
      "Expert materials are produced with subject-matter authors, SurferSEO scoring, and Information Gain enrichment — paired with safe white outreach (DR > 40) and AI Overviews optimization.",
    gate: "DR > 40 · AI OVERVIEWS",
  },
  {
    id: "step-05",
    num: "05",
    title: "BI Monitoring & End-to-End ROI",
    codeSymbol: "$R$",
    technicalLabel: "24/7 Looker Studio Dashboarding",
    description:
      "Rankings and conversions are tracked in real time via Google Looker Studio with anomaly alerts, organic ROI calculations, and weekly progress overviews tied to actual business revenue.",
    gate: "ROI = REVENUE / SEO_COST",
  },
];

export const SEO_APEX_CASE = {
  client: "Apex Online Pharmacy",
  url: "https://apexonlinepharmacy.com/",
  baseline: "800K visits / month",
  drop: "-65% after Core Update",
  result: "+950% in 5 months",
  position: "Top-3 for YMYL queries",
  context:
    "A global online pharmacy generating ~800K monthly visits. After a Google Core Update, traffic collapsed by 65% due to anonymous authorship, missing pharmaceutical expertise proofs, minimal structured data, and no trust layer.",
  actions: [
    "Author restructuring — anonymous 'Editorial' replaced with certified pharmacists and personal author hub pages linking each article to its expert profile.",
    "First-hand Experience layer — 'How we tested this medication' blocks with real photos, batch numbers, production dates, and dosage case studies.",
    "Fact-Checking & Peer Review — every article carries a two-stage verification plate: Author: Pharmacist | Reviewed: Finial SEO team, with links to official registration certificates.",
    "Schema.org graph — authors linked to external LinkedIn profiles; Drug, MedicalWebPage, and Organization markup; full Person → Organization → MedicalWebPage entity graph.",
    "Trust layer — licenses and certificates, transparent return and privacy policies, physical address and contact data.",
  ],
  timeline: [
    { phase: "Month 1", label: "Baseline", value: "38K" },
    { phase: "Month 1.5", label: "Core Update Drop", value: "14K", drop: true },
    { phase: "Month 2-3", label: "Audit & Rebuild", value: "14K", drop: true },
    { phase: "Month 4", label: "Reindex", value: "28K" },
    { phase: "Month 5", label: "Recovery Peak", value: "44K", peak: true },
  ],
};
