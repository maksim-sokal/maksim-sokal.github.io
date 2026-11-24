import {
  ASTER_DEX_ID,
  ASTER_OFFICIAL_SAME_AS,
  ASTER_OFFICIAL_URL,
  DEFILLAMA_ID,
  ELYA_PERSON_ID,
  FINIAL_SEO_ID,
  FINIAL_SERVICES,
  INDEPENDENT_OFFERS,
  KIRSTY_ID,
  KIRSTY_IMAGE,
  KIRSTY_NAME,
  KIRSTY_SAME_AS,
  KNOWS_ABOUT,
  PERSON_EMAIL,
  PERSON_ID,
  PERSON_IMAGE,
  PERSON_NAME,
  PERSON_SAME_AS,
  SITE_URL,
  SKILLS,
  WEBSITE_ID,
} from "../entity";
import type { GraphNode, JsonLdGraph } from "../types-schema";
import { DEFI_PAGE_NODES } from "./schema/defi-page";
import { SEO_PAGE_NODES } from "./schema/seo-page";

const ref = (id: string): GraphNode => ({ "@id": id });

const BUILD_DATE = new Date().toISOString().slice(0, 10);

const isProfilePage = (node: GraphNode): boolean => {
  const type = node["@type"];
  return Array.isArray(type) && type.includes("ProfilePage");
};

const withBuildDate = (nodes: GraphNode[]): GraphNode[] =>
  nodes.map((node) => (isProfilePage(node) ? { ...node, dateModified: BUILD_DATE } : node));

const organizationNode = (id: string): GraphNode => ({
  "@type": "Organization",
  "@id": id,
  name: "DefiLlama",
  url: "https://defillama.com/",
  sameAs: ["https://github.com/DefiLlama"],
  description:
    "Open DeFi analytics platform tracking total value locked, yields and protocol health across chains.",
});

const asterDexNode = (): GraphNode => ({
  "@type": "Organization",
  "@id": ASTER_DEX_ID,
  name: "Aster DEX",
  url: ASTER_OFFICIAL_URL,
  sameAs: [...ASTER_OFFICIAL_SAME_AS],
  description:
    "Privacy-focused perpetual DEX built on Aster Chain, with Perpetuals, Shield Mode, 1001x, Spot and Aster Earn products.",
});

const finialSeoNode = (): GraphNode => ({
  "@type": "Organization",
  "@id": FINIAL_SEO_ID,
  name: "Finial SEO",
  url: "https://finialseo.org",
  logo: {
    "@type": "ImageObject",
    url: "https://finialseo.org/logo.webp",
    caption: "Finial SEO logo",
  },
  email: PERSON_EMAIL,
  foundingDate: "2026",
  description:
    "Boutique SEO agency specialising in technical SEO, entity-first topical architecture, E-E-A-T remediation and e-commerce promotion for RU, CIS, EU and US markets.",
  founders: [ref(PERSON_ID), ref(ELYA_PERSON_ID)],
  knowsAbout: [
    "Search engine optimization",
    "Technical SEO",
    "E-E-A-T",
    "Core Web Vitals",
    "Schema.org structured data",
    "Topical maps",
    "E-commerce SEO",
  ],
  contactPoint: [
    {
      "@type": "ContactPoint",
      contactType: "customer service",
      email: PERSON_EMAIL,
      availableLanguage: ["en", "ru"],
    },
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Finial SEO services",
    itemListElement: FINIAL_SERVICES.map((service) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: service.name,
        serviceType: service.serviceType,
        url: service.url,
        provider: ref(FINIAL_SEO_ID),
      },
    })),
  },
});

const elyaNode = (): GraphNode => ({
  "@type": "Person",
  "@id": ELYA_PERSON_ID,
  name: "Elya Sokol",
  jobTitle: "CTO & Head of Technical SEO",
  worksFor: ref(FINIAL_SEO_ID),
  url: "https://elya-sokol.github.io/",
  image: {
    "@type": "ImageObject",
    url: `${SITE_URL}/images/Elya-Sokol.webp`,
    caption: "Elya Sokol, CTO & Head of Technical SEO",
  },
  sameAs: ["https://elya-sokol.github.io/"],
  knowsAbout: ["Technical SEO", "Core Web Vitals", "Astro framework", "Web engineering", "Python NLP"],
});

export function buildKirstyNode(): GraphNode {
  return {
    "@type": "Person",
    "@id": KIRSTY_ID,
    name: KIRSTY_NAME,
    jobTitle: "DeFi Writer & Editor",
    url: `${SITE_URL}/kirsty-moreland/`,
    image: {
      "@type": "ImageObject",
      url: KIRSTY_IMAGE,
      caption: "Kirsty Moreland, DeFi writer and editor",
    },
    description:
      "Kirsty Moreland is a DeFi writer and editor covering DEX mechanics, tokenomics and on-chain analysis. She founded Aster DEX Hub in 2017 and now writes the Aster DEX guides on this site.",
    sameAs: [...KIRSTY_SAME_AS],
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "University College London (UCL)",
      sameAs: ["https://www.ucl.ac.uk/engineering/institute-finance-technology"],
    },
    knowsAbout: [
      "Decentralized finance",
      "Decentralized exchange",
      "Perpetual futures",
      "Tokenomics",
      "On-chain data analysis",
      "Content editing",
    ],
  };
}

export function buildPersonNode(): GraphNode {
  return {
    "@type": "Person",
    "@id": PERSON_ID,
    name: PERSON_NAME,
    givenName: "Maksim",
    familyName: "Sokal",
    alternateName: ["Maksim Sokol", "Максим Сокол"],
    url: `${SITE_URL}/`,
    email: PERSON_EMAIL,
    description:
      "Maksim Sokal is an independent DeFi risk analyst and SEO strategist. He audits economic invariants and smart contract architecture in DeFi protocols, serves as external technical reviewer for Aster DEX, and is CEO of Finial SEO.",
    disambiguatingDescription:
      "DeFi risk analyst and SEO strategist; external technical reviewer for Aster DEX and CEO of Finial SEO.",
    jobTitle: ["DeFi Risk Analyst", "Independent Technical Reviewer", "SEO Strategist"],
    image: {
      "@type": "ImageObject",
      url: PERSON_IMAGE,
      caption: "Maksim Sokal, DeFi risk analyst and SEO strategist",
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Minsk",
      addressCountry: "BY",
    },
    knowsLanguage: ["en", "ru"],
    sameAs: [...PERSON_SAME_AS],
    affiliation: ref(DEFILLAMA_ID),
    worksFor: {
      "@type": "EmployeeRole",
      roleName: "Chief Executive Officer & Head of Strategy",
      startDate: "2026",
      worksFor: ref(FINIAL_SEO_ID),
    },
    memberOf: {
      "@type": "OrganizationRole",
      memberOf: ref(ASTER_DEX_ID),
      roleName: "External Technical and DeFi Content Reviewer",
      startDate: "2024-11-11",
      description:
        "Final technical verification layer for Aster DEX protocol reviews: smart contract registry checks and peer review of the published content library.",
    },
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "Moscow Institute of Physics and Technology (MIPT)",
      sameAs: [
        "https://www.wikidata.org/wiki/Q1367256",
        "https://eng.mipt.ru/",
        "https://blockchain.mipt.ru/",
        "https://en.wikipedia.org/wiki/Moscow_Institute_of_Physics_and_Technology",
      ],
    },
    hasCredential: {
      "@type": "EducationalOccupationalCredential",
      credentialCategory: "degree",
      name: "Master of Science (MSc) in Blockchain and DeFi Lab",
      dateCreated: "2024",
      recognizedBy: {
        "@type": "CollegeOrUniversity",
        name: "Moscow Institute of Physics and Technology (MIPT)",
      },
    },
    hasOccupation: [
      {
        "@type": "Occupation",
        name: "DeFi Risk Analyst",
        description: "Independent protocol audit and technical review practice since 2024.",
        occupationLocation: { "@type": "City", name: "Minsk, Belarus" },
        skills:
          "Formal specification, EVM bytecode forensics, game-theoretic incentive modelling, AMM mathematics, on-chain data analysis",
        responsibilities:
          "Auditing economic invariants of DeFi protocols, verifying smart contract registries, modelling systemic risk in automated market makers and lending markets",
        experienceRequirements: "MSc in Blockchain and DeFi Lab",
      },
      {
        "@type": "Occupation",
        name: "SEO Strategist",
        description:
          "SEO strategy and consulting since 2007; CEO and co-founder of Finial SEO since 2026.",
        occupationLocation: { "@type": "Place", name: "Remote (EU / US markets)" },
        skills:
          "Entity SEO, topical mapping, E-E-A-T systems, technical SEO, international SEO, analytics",
        responsibilities:
          "Set strategy and methodology, own quality control across engagements, and lead E-E-A-T remediation for YMYL properties",
        experienceRequirements: "Practising since 2007",
      },
    ],
    knowsAbout: KNOWS_ABOUT.map((topic) => ({
      "@type": "Thing",
      name: topic.name,
      ...(topic.sameAs ? { sameAs: topic.sameAs } : {}),
      ...(topic.description ? { description: topic.description } : {}),
    })),
    skills: SKILLS.map((skill) => ({
      "@type": ["DefinedTerm", "Thing"],
      name: skill.name,
      ...(skill.sameAs ? { sameAs: skill.sameAs } : {}),
      description: skill.description,
    })),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Independent analytical and editorial services",
      itemListElement: INDEPENDENT_OFFERS.map((offer) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: offer.name,
          serviceType: offer.serviceType,
          url: offer.url,
          category: offer.category,
          description: offer.description,
          provider: ref(offer.providerId),
        },
      })),
    },
  };
}

export function buildWebsiteNode(): GraphNode {
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: `${SITE_URL}/`,
    name: "Maksim Sokal — Professional Portfolio",
    inLanguage: "en",
    publisher: ref(PERSON_ID),
    author: ref(PERSON_ID),
  };
}

export function buildSharedOrganizationNodes(): GraphNode[] {
  return [asterDexNode(), organizationNode(DEFILLAMA_ID), finialSeoNode(), elyaNode()];
}

export function serializeGraph(graph: JsonLdGraph): string {
  // Escape "<" so an embedded "</script>" can never terminate the block.
  return JSON.stringify(graph).replace(/</g, "\\u003c");
}

export function buildDefiGraph(): JsonLdGraph {
  return {
    "@context": "https://schema.org",
    "@graph": [
      ...withBuildDate(DEFI_PAGE_NODES),
      buildPersonNode(),
      ...buildSharedOrganizationNodes(),
      buildWebsiteNode(),
    ],
  };
}

export function buildSeoGraph(): JsonLdGraph {
  return {
    "@context": "https://schema.org",
    "@graph": [
      ...withBuildDate(SEO_PAGE_NODES),
      buildPersonNode(),
      ...buildSharedOrganizationNodes(),
      buildWebsiteNode(),
    ],
  };
}

export function buildAboutGraph(profilePage: GraphNode, breadcrumbs: GraphNode): JsonLdGraph {
  return {
    "@context": "https://schema.org",
    "@graph": [
      profilePage,
      breadcrumbs,
      buildPersonNode(),
      ...buildSharedOrganizationNodes(),
      buildWebsiteNode(),
    ],
  };
}

export interface Crumb {
  name: string;
  url: string;
}

export function buildBreadcrumbs(id: string, trail: Crumb[]): GraphNode {
  return {
    "@type": "BreadcrumbList",
    "@id": id,
    itemListElement: trail.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: crumb.url,
    })),
  };
}

/**
 * Composes a research page graph. The first node is the page itself; the
 * canonical Person and WebSite nodes are appended so every article validates
 * standalone and stays identical to the rest of the site.
 */
export function buildContentGraph(nodes: GraphNode[]): JsonLdGraph {
  return {
    "@context": "https://schema.org",
    "@graph": [...nodes, buildPersonNode(), buildWebsiteNode()],
  };
}

/**
 * Graph for the Aster DEX cluster. Includes the author entity, the reviewer
 * entity and the Aster organization node in every page so the cluster is
 * self-contained and validates standalone.
 */
export function buildAsterPageGraph(nodes: GraphNode[]): JsonLdGraph {
  return {
    "@context": "https://schema.org",
    "@graph": [...nodes, buildPersonNode(), buildKirstyNode(), asterDexNode(), buildWebsiteNode()],
  };
}

export function buildAuthorNode(key: "maksim" | "kirsty"): GraphNode {
  return key === "kirsty" ? buildKirstyNode() : buildPersonNode();
}
