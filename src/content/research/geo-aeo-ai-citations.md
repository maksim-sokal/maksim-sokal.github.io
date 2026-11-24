---
title: "How AI answer engines choose sources"
description: "What generative search actually does with a page: query fan-out, passage retrieval, claim verification and citation selection — and the page structures that survive it."
dek: "Generative search does not return ten links. It retrieves passages, checks whether they support a claim, and cites the source it can verify."
practice: seo
published: 2026-11-24
updated: 2026-11-24
topics:
  - name: "Generative engine optimization"
  - name: "Search engine optimization"
    sameAs: "https://www.wikidata.org/wiki/Q180711"
  - name: "E-E-A-T"
    sameAs: "https://developers.google.com/search/docs/fundamentals/creating-helpful-content"
sources:
  - name: "AI features and your website"
    url: "https://developers.google.com/search/docs/appearance/ai-features"
    publisher: "Google Search Central"
  - name: "Creating helpful, reliable, people-first content"
    url: "https://developers.google.com/search/docs/fundamentals/creating-helpful-content"
    publisher: "Google Search Central"
  - name: "Bing Webmaster Guidelines"
    url: "https://www.bing.com/webmasters/help/webmaster-guidelines-30fba23a"
    publisher: "Bing Webmaster Tools"
  - name: "llms.txt"
    url: "https://llmstxt.org/"
    publisher: "llmstxt.org"
related:
  - "entity-seo-topical-map"
---

Ranking and citation are different problems. A page can rank in the top three and never be quoted, because the retrieval system did not find a sentence it could verify.

The mental model that helps: generative search does not read your page the way a human does. It splits a query into sub-questions, retrieves passages, checks whether each passage supports a claim, and cites the source it trusts.

## From ranking to citation

1. **Query fan-out.** One prompt becomes several related searches.
2. **Passage retrieval.** The system pulls candidate passages, not whole documents.
3. **Synthesis.** A model composes an answer from the passages.
4. **Citation selection.** Sources are attached to claims that survive verification.

Being indexed is necessary and not sufficient. Being retrievable at passage level is the new unit of competition.

## What makes a passage citable

| Weak | Strong |
| --- | --- |
| "Many protocols are risky." | "Three of the four findings were arithmetic errors in rate accumulation." |
| No date, no author | Dated, attributed, linked to the source |
| A claim with no primary reference | A claim next to the document that supports it |
| A wall of context | A heading, a direct answer, then evidence |

The pattern is consistent: a named entity, a specific claim, a date, and a verifiable source.

## Three layers you control

**1. Crawlable, server-rendered HTML.** If the content only exists after client-side rendering, retrieval is a coin flip. Static HTML removes the variable.

**2. Entity clarity.** A canonical name, one `@id`, consistent `sameAs`, and the same facts on every page. If two pages disagree about a role or a date, neither is a reliable citation.

**3. Claim-level evidence.** Numbers with sources, methodology notes, and a limitations section. The limitations section is not a weakness; it is what distinguishes a measurement from marketing.

## About `llms.txt`

`llms.txt` is a proposed convention for giving language models a curated summary of a site. It is not a standard recognised by Google or Bing, and it should not be treated as a ranking factor.

It costs little to publish and it forces the site to state its canonical facts in one place. That is the real benefit: the file is a consistency check. This site publishes one at [/llms.txt](/llms.txt).

## A page template that survives retrieval

1. **H1 as the question** the page answers.
2. **A 40–60 word direct answer** immediately below it.
3. **A table or numbered steps** for the procedural part.
4. **An evidence section** with dates and primary sources.
5. **A limitations section** stating what the method does not cover.
6. **A source list** with links.

This is also a good human page. That is not a coincidence.

## What does not work

- **AI filler.** Long, fluent, empty text has no extractable claims.
- **Schema spam.** Markup cannot make a page authoritative.
- **Contradictory facts across pages.** Retrieval systems compare; inconsistency loses.
- **FAQ blocks without answers.** A question heading with three lines of preamble is not an answer.

## Measurement

Rank tracking does not capture this. Use a fixed prompt set — twenty questions you care about — and check monthly:

- citation share across assistants and AI overviews;
- which URL is cited for each claim;
- referral traffic from assistant domains;
- branded search volume after citations appear.

Record the date and the exact prompt. Generative answers drift, and a measurement without a baseline is an anecdote.
