# AGENTS.md - Portfolio Project (Maksim Sokal)

## Quick start
```bash
npm install
npm run dev          # astro dev server (port 4321 default)
npm run build        # astro build → dist/
npm run preview      # astro preview (serve built output)
npm run lint         # tsc --noEmit only (no ESLint/Prettier)
npm run check        # astro check (TypeScript + .astro templates)
npm run validate:entities  # JSON-LD graph checks against dist/ (run after build)
npm run validate:entities -- --online  # also fetches every Person sameAs URL
npm run clean        # rm -rf dist
```

## Architecture
- **Pages**: `src/pages/index.astro` (DeFi profile), `src/pages/seo-expert.astro` (SEO profile), `src/pages/about.astro` (canonical entity record + press kit), `src/pages/research/*` (research index, practice hubs, article route), `src/pages/sitemap.astro` (HTML sitemap), `src/pages/404.astro`
- **Research content**: Markdown in `src/content/research/*.md`, schema in `src/content.config.ts` (Content Layer API, `glob` loader). Article route is `src/pages/research/[slug].astro`; cards use `ResearchCard.astro`; helpers in `src/lib/research.ts`
- **Layouts**: `src/layouts/BaseLayout.astro` + `SeoLayout.astro` (profile pages) and `PageLayout.astro` (research, about-style pages) — JSON-LD is built in `src/lib/schema.ts`, not written inline
- **Entity graph**: `src/entity.ts` holds canonical IDs, `sameAs`, `knowsAbout`, skills and service offers; `src/lib/schema.ts` composes the `@graph` (Person, organizations, WebSite, ProfilePage); `src/lib/schema/defi-page.ts` + `seo-page.ts` hold page-scoped nodes (audits, case studies, breadcrumbs)
- **Sections**: 23 `.astro` components in `src/components/sections/` (shared chrome + per-profile sections, `Seo*` prefixed for the SEO profile) — rendered as static HTML at build time
- **Shared chrome**: one parameterized `Header.astro` and `Footer.astro` (variant prop); `Breadcrumbs`, `BackgroundDecor`, `LetterGlitch`
- **Static data components** (in `src/components/sections/`): `ContractTable`, `AuditReportTable`, `AuditAccordion` (native `<details>`), `GpgCopyButton` (vanilla `<script>` for clipboard copy) — no hydration
- **Canvas effect**: `LetterGlitch.astro` — vanilla `<script>` canvas, reduced-motion aware, paused when offscreen
- **React**: `@astrojs/react` is used only to render `lucide-react` icons to static HTML at build time; there are no hydrated React islands
- **Content data**: `src/data.ts` (DeFi) + `src/data-seo.ts` (SEO); types in `src/types.ts` + `src/types-seo.ts`
- **Astro config**: `astro.config.mjs` (React SSR for icons + `@astrojs/sitemap` integration + Tailwind v4 via Vite plugin; `site` = GitHub Pages URL, `trailingSlash: "always"`)

## Key quirks
- `npm run clean` uses `node -e` (cross-platform, no `rm -rf`)
- `npm run lint` is **type-check only** (`tsc --noEmit`), not a linter — it does NOT type-check `.astro` files; use `npm run check` for template/prop checking
- No test framework configured; CI (`.github/workflows/ci.yml`) gates on `astro check` + build + `validate:entities`
- **Entity graph rules**: there is exactly one Person node, `https://maksim-sokal.github.io/#person`, built by `buildPersonNode()` and rendered identically on every page. Never re-declare the person under a page-scoped `@id`; add new facts to `src/entity.ts` instead
- Only add a URL to `PERSON_SAME_AS` after it resolves and describes the same person — run `npm run validate:entities -- --online`
- Every internal `{ "@id": ... }` reference must resolve to a node somewhere in the build; `validate:entities` fails on dangling references
- `src/entity.ts` Wikidata `sameAs` values are verified against `wbgetentities`; do not guess QIDs
- `public/llms.txt` is the machine-readable entity summary for AI crawlers; update it when roles or canonical pages change
- **Research authoring**: every paper needs `sources` (verified URLs only), `topics` (entity names, `sameAs` when a canonical page exists), `related` slugs and a `practice` of `defi` or `seo`. Articles render `TechArticle` with `author → #person` and `isPartOf` the practice hub. Add new papers to `public/llms.txt` and the HTML sitemap
- Do not cite a URL that has not been fetched successfully; run `npm run build` + `npm run validate:entities` after adding a paper
- **Schema alignment**: `npm run audit:schema` compares JSON-LD claims against rendered text, images and links. Every FAQ answer, HowTo step, Review body, Product, DefinedTerm and Article headline must be visible on the page. Prefer adding visible supporting content over deleting schema. Run it after every content or schema change
- Article `headline` must match the visible H1; use `alternativeHeadline` for a longer descriptive phrase. Keep `dateModified` visible as a dated line
- **Aster DEX cluster**: `/aster-dex/*` pages are authored by Kirsty Moreland (`/#kirsty-moreland` person node) and technically reviewed by Maksim. Every address, fee, leverage limit and jurisdiction comes from `src/data/aster.ts`; never hardcode an Aster fact in a page. Re-verify against `docs.asterdex.com` before changing a value and update `ASTER_LAST_VERIFIED`
- Aster pages use `AsterLayout.astro` and `buildAsterPageGraph()`; legal pages use `LegalLayout.astro`. `/disclosure/`, `/privacy/` and `/terms/` are linked from the footer
- The Aster contract registry must stay in sync with the official `overview/smart-contracts` page (currently 5 bridge chains plus Earn and USDF contracts)
- TailwindCSS v4 with `@import "tailwindcss"` (not `tailwind.config.js`)
- React islands use `className` (JSX); `.astro` templates use `class` (HTML)
- **Important**: lucide-react icons imported into `.astro` files must use `className` (React prop), not `class` — `class` is silently dropped and icons render unstyled
- Astro extends `astro/tsconfigs/base` — type-only imports require `import type`
- `.astro/` is gitignored (auto-generated dev artifacts)
- Inline `<script>` in `Header` guards `event.target instanceof Node` before calling `contains(...)`