---
title: "Entity SEO: building a topical map from a knowledge graph"
description: "A practical method for turning an entity inventory into a topical map: stable identifiers, relationship edges, page assignments and an internal link contract."
dek: "A keyword list describes queries. A topical map describes the things your site is qualified to talk about, and how those things connect."
practice: seo
published: 2026-11-20
updated: 2026-11-20
topics:
  - name: "Search engine optimization"
    sameAs: "https://www.wikidata.org/wiki/Q180711"
  - name: "Topical authority"
  - name: "E-E-A-T"
    sameAs: "https://developers.google.com/search/docs/fundamentals/creating-helpful-content"
sources:
  - name: "Introduction to structured data"
    url: "https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data"
    publisher: "Google Search Central"
  - name: "Person schema"
    url: "https://schema.org/Person"
    publisher: "Schema.org"
  - name: "Wikidata:Introduction"
    url: "https://www.wikidata.org/wiki/Wikidata:Introduction"
    publisher: "Wikidata"
  - name: "Creating helpful, reliable, people-first content"
    url: "https://developers.google.com/search/docs/fundamentals/creating-helpful-content"
    publisher: "Google Search Central"
related:
  - "geo-aeo-ai-citations"
---

Search engines resolve queries to entities. "Uniswap v4 hooks" is not a string to match; it is a protocol version, a mechanism and a set of risks. Pages that define the entity and its relationships give a retrieval system more to work with than pages that repeat the phrase.

That is the difference between a keyword map and a topical map. The first lists queries. The second lists the things your site is qualified to be trusted about.

## Three layers

1. **Entity inventory** — every named thing the site should own or cover.
2. **Relationship graph** — which entities contain, depend on, or co-occur with each other.
3. **Page map** — one primary entity per URL, with hubs and spokes.

Most content plans skip layer two. That is why they produce twenty articles that never link to each other in a meaningful way.

## Identifiers are the hard part

An entity is only useful to a knowledge graph if it has a stable identifier.

- Choose one `@id` per entity and never fork it.
- Point `sameAs` at authoritative profiles that resolve.
- Keep the facts identical wherever the entity appears.
- Prefer external canonical identifiers (Wikidata, official documentation) for concepts and organizations.

A first-hand example: this site used to declare the DeFi profile and the SEO profile as two separate `Person` nodes, with different `@id` values. Same person, two nodes, half the signal attached to each. The fix was one canonical `@id` with occupation facets. The record now lives at [/about/](/about/).

That mistake is common because templates are copied per page. The check is simple: search the built HTML for `"@type": "Person"` and count the distinct `@id` values.

## Building the map

**Step 1 — seed the inventory.** Sales calls, Search Console queries, competitor coverage, Wikipedia and Wikidata categories, conference agendas. Write down the entities, not the keywords.

**Step 2 — expand through relationships.** For each seed, look at the entities that co-occur in the top results. Keep the ones your expertise actually covers. A map you cannot write is a wish list.

**Step 3 — classify coverage.** For each entity: owned (a page defines it), partial (mentioned but not defined), or missing. This produces the roadmap without a separate brainstorming session.

**Step 4 — assign one primary entity per URL.** If a page covers two entities equally, split it or demote one to `mentions`. Pages that try to own everything own nothing.

**Step 5 — connect.** Hub, spokes, siblings, and a small number of cross-practice bridges where the entities genuinely overlap.

| Entity | Type | Coverage | Target URL | Intent |
| --- | --- | --- | --- | --- |
| Economic invariant | Concept | Partial | `/research/economic-invariant-audits/` | Informational |
| Read-only reentrancy | Mechanism | Missing | `/research/read-only-reentrancy-concentrated-liquidity/` | Informational |
| Sybil-adjusted TVL | Metric | Missing | `/research/sybil-adjusted-tvl/` | Analytical |
| Topical authority | Concept | Owned | `/research/entity-seo-topical-map/` | Commercial investigation |

## The internal link contract

Internal links are how a map becomes a structure a crawler can read.

- Every spoke links up to its hub, in the breadcrumb and in the body.
- Every hub links to every spoke.
- Every spoke links to two siblings.
- Anchor text is the entity name, not "read more".
- No orphans. Every page is at most two clicks from the home page.

The contract is worth enforcing mechanically. A broken link is invisible in a CMS and obvious in a crawl.

## Measurement

Rankings are a lagging indicator of entity clarity. Track the inputs as well:

- **Entity coverage** — the share of mapped entities with a defining page.
- **Share of voice** — presence across the query set attached to each entity.
- **Brand SERP composition** — what appears when someone searches the person or company name.
- **AI citation share** — how often the entity is cited in generated answers.
- **Internal link depth** — distribution of clicks from the root.

## What this is not

It is not a reason to add schema markup to pages that say nothing. Structured data describes a page; it does not improve one. The map comes first, the markup second, and the evidence layer third.
