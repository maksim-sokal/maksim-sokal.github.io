// Page-scoped JSON-LD nodes. The Person and WebSite nodes are built once in src/lib/schema.ts.
import type { GraphNode } from "../../types-schema";

export const SEO_PAGE_NODES: GraphNode[] = [
  {
    "@type": [
      "ProfilePage",
      "AboutPage"
    ],
    "@id": "https://maksim-sokal.github.io/seo-expert/#profilepage",
    "url": "https://maksim-sokal.github.io/seo-expert/",
    "name": "Professional Profile of Maksim Sokal, SEO Expert",
    "mainEntity": {
      "@id": "https://maksim-sokal.github.io/#person"
    },
    "author": {
      "@id": "https://maksim-sokal.github.io/#person"
    },
    "editor": {
      "@id": "https://maksim-sokal.github.io/#elya-person"
    },
    "contributor": {
      "@id": "https://maksim-sokal.github.io/#elya-person"
    },
    "accountablePerson": {
      "@id": "https://maksim-sokal.github.io/#person"
    },
    "description": "Maksim Sokal is an SEO Expert and Head of Strategy at Finial SEO. He specializes in comprehensive white-hat promotion, Google E-E-A-T frameworks, and international SEO for EU and US markets since 2007.",
    "mentions": [
      {
        "@type": "Organization",
        "name": "Finial SEO",
        "sameAs": "https://finialseo.org",
        "description": "Boutique SEO agency — technical SEO, E-E-A-T optimization, Topical Maps, and e-commerce promotion."
      },
      {
        "@type": "Thing",
        "name": "Search Engine Optimization",
        "sameAs": "https://www.wikidata.org/wiki/Q180711"
      },
      {
        "@type": "Thing",
        "name": "E-E-A-T",
        "sameAs": "https://en.wikipedia.org/wiki/E-A-T",
        "description": "Experience, Expertise, Authoritativeness, Trustworthiness — Google's quality evaluation framework."
      },
      {
        "@type": "Thing",
        "name": "Core Web Vitals",
        "sameAs": "https://www.wikidata.org/wiki/Q104618838",
        "description": "Google's set of metrics measuring real-world user experience (INP, LCP, CLS)."
      },
      {
        "@type": "Thing",
        "name": "Google Knowledge Graph",
        "sameAs": "https://en.wikipedia.org/wiki/Google_Knowledge_Graph"
      },
      {
        "@type": "Thing",
        "name": "Google Search Console",
        "sameAs": "https://en.wikipedia.org/wiki/Google_Search_Console"
      },
      {
        "@type": "Thing",
        "name": "Looker Studio",
        "sameAs": "https://en.wikipedia.org/wiki/Google_Looker_Studio",
        "description": "Data visualization platform for live organic ROI dashboards."
      },
      {
        "@type": "Service",
        "name": "Full-Cycle SEO Promotion",
        "sameAs": "https://finialseo.org/services/seo-promotion"
      }
    ],
    "workExample": [
      {
        "@type": "CreativeWork",
        "name": "Apex Online Pharmacy — SEO Case Study",
        "url": "https://apexonlinepharmacy.com/",
        "author": {
          "@id": "https://maksim-sokal.github.io/#person"
        },
        "description": "Organic traffic +214% from the post-update minimum (14K → 44K weekly sessions), reaching top-3 for key YMYL queries in the pharmaceutical niche."
      },
      {
        "@type": "CreativeWork",
        "name": "DeFi Content Hub — SEO Case Study",
        "author": {
          "@id": "https://maksim-sokal.github.io/#person"
        },
        "description": "Top-3 rankings, organic traffic +1,240%."
      },
      {
        "@type": "CreativeWork",
        "name": "Finial SEO — Expert Profile of Maksim Sokol",
        "url": "https://finialseo.org/about/Maksim-Sokol",
        "author": {
          "@id": "https://finialseo.org/#organization"
        },
        "description": "CEO & Head of Strategy profile at Finial SEO — strategic direction, methodology development, and quality control across all projects."
      }
    ],
    "isPartOf": {
      "@id": "https://maksim-sokal.github.io/#website"
    },
    "inLanguage": "en"
  },
  {
    "@type": "ReviewAction",
    "@id": "https://maksim-sokal.github.io/seo-expert/#case-action-01",
    "agent": {
      "@id": "https://maksim-sokal.github.io/#person"
    },
    "object": {
      "@type": "WebSite",
      "@id": "https://maksim-sokal.github.io/seo-expert/#case-site-01",
      "name": "Apex Online Pharmacy",
      "url": "https://apexonlinepharmacy.com/",
      "description": "International online pharmacy — YMYL pharmaceutical niche"
    },
    "subjectOf": {
      "@id": "https://maksim-sokal.github.io/seo-expert/#profilepage"
    }
  },
  {
    "@type": "EndorseAction",
    "@id": "https://maksim-sokal.github.io/seo-expert/#endorse-action-01",
    "agent": {
      "@id": "https://maksim-sokal.github.io/#person"
    },
    "subjectOf": {
      "@id": "https://maksim-sokal.github.io/seo-expert/#profilepage"
    },
    "object": {
      "@id": "https://maksim-sokal.github.io/seo-expert/#case-site-01"
    },
    "description": "Rankings verified — top-3 for key YMYL queries in the pharmaceutical niche"
  },
  {
    "@type": "ReviewAction",
    "@id": "https://maksim-sokal.github.io/seo-expert/#case-action-02",
    "agent": {
      "@id": "https://maksim-sokal.github.io/#person"
    },
    "object": {
      "@type": "WebSite",
      "@id": "https://maksim-sokal.github.io/seo-expert/#case-site-02",
      "name": "DeFi Content Hub",
      "description": "DeFi exchange ecosystem — entity-based topical architecture"
    },
    "subjectOf": {
      "@id": "https://maksim-sokal.github.io/seo-expert/#profilepage"
    }
  },
  {
    "@type": "EndorseAction",
    "@id": "https://maksim-sokal.github.io/seo-expert/#endorse-action-02",
    "agent": {
      "@id": "https://maksim-sokal.github.io/#person"
    },
    "subjectOf": {
      "@id": "https://maksim-sokal.github.io/seo-expert/#profilepage"
    },
    "object": {
      "@id": "https://maksim-sokal.github.io/seo-expert/#case-site-02"
    },
    "description": "Rankings verified — top-3 for core protocol queries"
  },
  {
    "@type": "ReviewAction",
    "@id": "https://maksim-sokal.github.io/seo-expert/#case-action-03",
    "agent": {
      "@id": "https://maksim-sokal.github.io/#person"
    },
    "object": {
      "@type": "WebSite",
      "@id": "https://maksim-sokal.github.io/seo-expert/#case-site-03",
      "name": "Commercial Exploitation",
      "url": "https://www.commercialexploitation.org/",
      "description": "B2B legal niche — authority content and silo interlinking"
    },
    "subjectOf": {
      "@id": "https://maksim-sokal.github.io/seo-expert/#profilepage"
    }
  },
  {
    "@type": "ReviewAction",
    "@id": "https://maksim-sokal.github.io/seo-expert/#case-action-04",
    "agent": {
      "@id": "https://maksim-sokal.github.io/#person"
    },
    "object": {
      "@type": "WebSite",
      "@id": "https://maksim-sokal.github.io/seo-expert/#case-site-04",
      "name": "CS-Pharmacy",
      "url": "https://cs-pharmacy.net/",
      "description": "Pharmacy e-commerce — technical and E-E-A-T restructuring"
    },
    "subjectOf": {
      "@id": "https://maksim-sokal.github.io/seo-expert/#profilepage"
    }
  },
  {
    "@type": "ReviewAction",
    "@id": "https://maksim-sokal.github.io/seo-expert/#case-action-05",
    "agent": {
      "@id": "https://maksim-sokal.github.io/#person"
    },
    "object": {
      "@type": "WebSite",
      "@id": "https://maksim-sokal.github.io/seo-expert/#case-site-05",
      "name": "Keyfordex",
      "url": "https://keyfordex.com/",
      "description": "DEX security partner — semantic core architecture"
    },
    "subjectOf": {
      "@id": "https://maksim-sokal.github.io/seo-expert/#profilepage"
    }
  },
  {
    "@type": "ReviewAction",
    "@id": "https://maksim-sokal.github.io/seo-expert/#case-action-06",
    "agent": {
      "@id": "https://maksim-sokal.github.io/#person"
    },
    "object": {
      "@type": "WebSite",
      "@id": "https://maksim-sokal.github.io/seo-expert/#case-site-06",
      "name": "Order CS Help",
      "url": "https://order-cs.help/",
      "description": "E-commerce services — conversion-focused intent mapping"
    },
    "subjectOf": {
      "@id": "https://maksim-sokal.github.io/seo-expert/#profilepage"
    }
  },
  {
    "@type": "ReviewAction",
    "@id": "https://maksim-sokal.github.io/seo-expert/#case-action-07",
    "agent": {
      "@id": "https://maksim-sokal.github.io/#person"
    },
    "object": {
      "@type": "WebSite",
      "@id": "https://maksim-sokal.github.io/seo-expert/#case-site-07",
      "name": "Sonus Pharma",
      "url": "https://www.sonuspharma.com/",
      "description": "Pharma / health niche — trust-layer reinforcement"
    },
    "subjectOf": {
      "@id": "https://maksim-sokal.github.io/seo-expert/#profilepage"
    }
  },
  {
    "@type": "BreadcrumbList",
    "@id": "https://maksim-sokal.github.io/seo-expert/#breadcrumbs",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://maksim-sokal.github.io/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "SEO Expert Profile",
        "item": "https://maksim-sokal.github.io/seo-expert/"
      }
    ]
  }
];
