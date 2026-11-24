import type { KnowledgeTopic, ServiceOffer, SkillTerm } from "./types-schema";

/**
 * Canonical entity identifiers.
 *
 * Every page in the site references these exact `@id` values. A person or
 * organization must never be re-declared under a second identifier — that
 * splits accumulated entity signal across duplicate nodes.
 */
export const SITE_URL = "https://maksim-sokal.github.io";
export const PERSON_ID = `${SITE_URL}/#person`;
export const ELYA_PERSON_ID = `${SITE_URL}/#elya-person`;
export const WEBSITE_ID = `${SITE_URL}/#website`;
export const ASTER_DEX_ID = `${SITE_URL}/#aster-dex`;
export const KIRSTY_ID = `${SITE_URL}/kirsty-moreland/#person`;
export const DEFILLAMA_ID = "https://defillama.com/#organization";
export const FINIAL_SEO_ID = "https://finialseo.org/#organization";
export const KEYFORDEX_ID = "https://keyfordex.com/#organization";

export const ASTER_OFFICIAL_URL = "https://www.asterdex.com/";
export const ASTER_OFFICIAL_SAME_AS = [
  "https://x.com/Aster_DEX",
  "https://t.me/AsterDEX",
  "https://discord.gg/invite/asterdefi",
  "https://medium.com/asterdex",
] as const;

export const KIRSTY_NAME = "Kirsty Moreland";
export const KIRSTY_IMAGE = `${SITE_URL}/images/Kirsty-Moreland.webp`;
export const KIRSTY_SAME_AS = [
  "https://dune.com/asterdexhub/analytics",
  "https://linktr.ee/asterdexhub",
] as const;

export const PERSON_NAME = "Maksim Sokal";
export const PERSON_EMAIL = "contact@finialseo.org";
export const PERSON_IMAGE = `${SITE_URL}/images/Maksim-Sokal.webp`;

/** Author registry used by article and guide schemas. */
export const AUTHORS = {
  maksim: {
    id: PERSON_ID,
    name: PERSON_NAME,
    role: "DeFi Risk Analyst",
    path: "/about/",
  },
  kirsty: {
    id: KIRSTY_ID,
    name: KIRSTY_NAME,
    role: "DeFi Writer & Editor",
    path: "/kirsty-moreland/",
  },
} as const;

export type AuthorKey = keyof typeof AUTHORS;

/**
 * Verified, publicly resolvable identity URLs. Every entry must return HTTP 200
 * and describe the same person. `npm run validate:entities -- --online` checks
 * this. Do not add profile URLs that have not been verified.
 */
export const PERSON_SAME_AS = [
  "https://www.linkedin.com/in/maksim-sokal/",
  "https://www.connectively.us/p/maksim-sokal",
  "https://github.com/maksim-sokal",
  "https://finialseo.org/about/Maksim-Sokol",
] as const;

/**
 * Knowledge-graph topics. Each `sameAs` points at a verified concept page:
 * Wikidata IDs were resolved against wbgetentities before being added.
 * Concepts without a reliable external identifier stay as plain `Thing` nodes.
 */
export const KNOWS_ABOUT: KnowledgeTopic[] = [
  {
    name: "Decentralized finance",
    sameAs: "https://www.wikidata.org/wiki/Q4159573",
    description: "Peer-to-peer financial services built on smart contracts and public blockchains.",
  },
  {
    name: "Smart contract",
    sameAs: "https://www.wikidata.org/wiki/Q7544035",
    description: "Self-executing programs deployed to a blockchain.",
  },
  {
    name: "Formal verification",
    sameAs: "https://www.wikidata.org/wiki/Q173326",
    description: "Proving or disproving the correctness of an algorithm against a formal specification.",
  },
  {
    name: "Static program analysis",
    sameAs: "https://www.wikidata.org/wiki/Q1329550",
    description: "Analysis of software performed without executing it.",
  },
  {
    name: "Game theory",
    sameAs: "https://www.wikidata.org/wiki/Q44455",
    description: "Mathematical models of strategic interaction between rational agents.",
  },
  {
    name: "Cryptoeconomics",
    sameAs: "https://www.wikidata.org/wiki/Q105682939",
    description: "Economic incentive design in cryptographic and blockchain systems.",
  },
  {
    name: "Ethereum",
    sameAs: "https://www.wikidata.org/wiki/Q16783523",
    description: "Public blockchain platform with programmable smart contracts.",
  },
  {
    name: "Solidity",
    sameAs: "https://www.wikidata.org/wiki/Q24909565",
    description: "Programming language for writing EVM smart contracts.",
  },
  {
    name: "Decentralized exchange",
    sameAs: "https://www.wikidata.org/wiki/Q59785441",
    description: "Peer-to-peer cryptocurrency exchange without a central intermediary.",
  },
  {
    name: "Automated market maker",
    description: "Decentralized exchange mechanism that prices assets with an algorithm instead of an order book.",
  },
  {
    name: "Concentrated liquidity",
    description: "AMM design that lets liquidity providers allocate capital within custom price ranges.",
  },
  {
    name: "On-chain data analysis",
    sameAs: "https://www.wikidata.org/wiki/Q1988917",
    description: "Querying and modelling blockchain data to measure protocol health and user behaviour.",
  },
  {
    name: "Fact-checking",
    sameAs: "https://www.wikidata.org/wiki/Q59555084",
    description: "Verifying factual claims against primary sources before publication.",
  },
  {
    name: "Peer review",
    sameAs: "https://www.wikidata.org/wiki/Q215028",
    description: "Independent evaluation of technical work by a qualified reviewer.",
  },
  {
    name: "Search engine optimization",
    sameAs: "https://www.wikidata.org/wiki/Q180711",
    description: "Improving a site's visibility in organic search results.",
  },
  {
    name: "E-E-A-T",
    sameAs: "https://developers.google.com/search/docs/fundamentals/creating-helpful-content",
    description: "Experience, Expertise, Authoritativeness and Trustworthiness — Google's quality framework.",
  },
  {
    name: "YMYL",
    sameAs: "https://en.wikipedia.org/wiki/Your_Money_or_Your_Life",
    description: "Topics that can affect health, safety or financial wellbeing, held to the highest quality bar.",
  },
  {
    name: "Core Web Vitals",
    sameAs: "https://www.wikidata.org/wiki/Q104618838",
    description: "Google's field metrics for loading, interactivity and visual stability.",
  },
  {
    name: "hreflang",
    sameAs: "https://en.wikipedia.org/wiki/Hreflang",
    description: "Markup that maps language and regional variants of a page for search engines.",
  },
  {
    name: "Topical authority",
    description: "Depth and coherence of coverage across a topic graph, expressed through entities rather than keywords.",
  },
];

/**
 * Skill terms are `DefinedTerm` nodes, not free-text keywords. Do not attach an
 * ISO/IEC standard to a skill unless the standard actually governs that practice.
 */
export const SKILLS: SkillTerm[] = [
  {
    name: "Formal Specification & Logic Auditing",
    description: "Specifying protocol invariants and proving that reachable post-states satisfy them.",
  },
  {
    name: "EVM Bytecode Forensics",
    description: "Tracing execution to detect reentrancy, state-machine manipulation and gas-limit griefing.",
  },
  {
    name: "Game Theory for Protocol Economics",
    sameAs: "https://www.wikidata.org/wiki/Q44455",
    description: "Modelling agent incentives to test protocol liveness and insolvency resistance under stress.",
  },
  {
    name: "AMM Mathematical Engineering",
    description: "Analysing constant-product, StableSwap and concentrated-liquidity curves for slippage and capital efficiency.",
  },
  {
    name: "On-Chain Data Science & Heuristics",
    sameAs: "https://www.wikidata.org/wiki/Q1988917",
    description: "Building SQL and Python heuristics that separate real adoption from sybil-inflated TVL.",
  },
  {
    name: "Entity SEO & Topical Mapping",
    description: "Designing content architectures around named entities, identifiers and their relationships.",
  },
  {
    name: "E-E-A-T Systems & Author Authority",
    description: "Building author entities, review pipelines and evidence layers for YMYL topics.",
  },
  {
    name: "International SEO Architecture",
    description: "hreflang, locale routing and cross-market entity consistency.",
  },
];

/** Services delivered independently of any employer. */
export const INDEPENDENT_OFFERS: ServiceOffer[] = [
  {
    name: "Technical Editorial Review & Fact-Checking",
    serviceType: "Independent Expert Oversight",
    url: `${SITE_URL}/#experience`,
    category: "Quality Assurance",
    description:
      "Verification of smart contract registries, security report claims and protocol mathematics before publication.",
    providerId: PERSON_ID,
  },
  {
    name: "Independent SEO Strategy & Consulting",
    serviceType: "SEO Strategy",
    url: `${SITE_URL}/seo-expert/`,
    category: "Search Engine Optimization",
    description:
      "Entity-first SEO strategy, topical mapping and E-E-A-T remediation for YMYL and international sites.",
    providerId: PERSON_ID,
  },
];

export interface FinialService {
  name: string;
  serviceType: string;
  url: string;
}

export const FINIAL_SERVICES: FinialService[] = [
  { name: "Full-Cycle SEO Promotion", serviceType: "SEO Promotion", url: "https://finialseo.org/services/seo-promotion" },
  { name: "E-E-A-T Strategies", serviceType: "Content Strategy", url: "https://finialseo.org/services/content-plan" },
  { name: "Technical SEO Audit", serviceType: "Technical Audit", url: "https://finialseo.org/services/technical-audit" },
  { name: "Semantic Core & Topical Maps", serviceType: "Semantic Architecture", url: "https://finialseo.org/services/semantic-core" },
  { name: "Safe Site Migration", serviceType: "Migration Engineering", url: "https://finialseo.org/services/migration" },
  {
    name: "Analytics & Linkbuilding Support",
    serviceType: "Analytics & Linkbuilding",
    url: "https://finialseo.org/services/analytics-linkbuilding",
  },
];
