# Maksim Sokal — Personal Portfolio

Personal portfolio site built with [Astro](https://astro.build) + React islands + TailwindCSS v4.
Contains two profiles:

- **`/`** — DeFi Risk Analyst & Protocol Auditor
- **`/seo-expert`** — SEO Expert & Head of Strategy at Finial SEO

## Quick start

```bash
npm install
npm run dev        # astro dev server on :4321
npm run build      # astro build → dist/
npm run preview    # astro preview (serve built output)
npm run lint       # tsc --noEmit
npm run check      # astro check (TypeScript + .astro templates)
npm run clean      # remove dist/
```

## Architecture

- **Layouts**: `src/layouts/BaseLayout.astro` (DeFi) + `SeoLayout.astro` (SEO) — HTML shells, SEO meta, JSON-LD entity graphs
- **Pages**: `src/pages/index.astro` + `src/pages/seo-expert.astro` — each composes its profile's sections; `sitemap.astro` (HTML sitemap) and `404.astro` complete the route set
- **Sections**: 23 `.astro` components under `src/components/sections/` — shared chrome (header, footer, breadcrumbs, background, glitch canvas), profile sections, and data tables
- **Static data components**: `ContractTable`, `AuditReportTable`, `AuditAccordion` (native `<details>`), `GpgCopyButton` (vanilla clipboard copy) — no hydration
- **Canvas effect**: `LetterGlitch.astro` is a dependency-free vanilla canvas script (reduced-motion aware, paused when offscreen)
- **React**: `@astrojs/react` renders `lucide-react` icons to static HTML at build time only — no hydrated islands ship client JS
- **Content**: `src/data.ts` + `src/types.ts` (DeFi) and `src/data-seo.ts` + `src/types-seo.ts` (SEO)
- **CSS**: TailwindCSS v4 via `@import "tailwindcss"` in `src/index.css`; fonts are loaded with preconnect links in the layouts
- **SEO**: canonical/Open Graph/Twitter metadata, `@astrojs/sitemap` XML sitemap, JSON-LD entity graphs

## Deploy

- `.github/workflows/ci.yml` runs `npm ci`, `npm run check`, and `npm run build` on pushes and pull requests.
- `.github/workflows/deploy.yml` builds with `withastro/action` and deploys to GitHub Pages on push to `main`.