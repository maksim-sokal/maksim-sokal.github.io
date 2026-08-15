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
npm run clean      # remove dist/
```

## Architecture

- **Layouts**: `src/layouts/BaseLayout.astro` (DeFi) + `SeoLayout.astro` (SEO) — HTML shells, SEO meta, JSON-LD entity graphs
- **Pages**: `src/pages/index.astro` + `src/pages/seo-expert.astro` — each composes its profile's sections
- **Sections**: 20 static `.astro` components under `src/components/sections/` (10 per profile)
- **Static data components** (under `src/components/sections/`): `ContractTable`, `AuditReportTable`, `AuditAccordion` (native `<details>`), `GpgCopyButton` (vanilla script clipboard copy) — no React
- **React islands**: only `src/components/react/LetterGlitch.tsx` (canvas effect, hydrated with `client:visible`)
- **Content**: `src/data.ts` + `src/types.ts` (DeFi) and `src/data-seo.ts` + `src/types-seo.ts` (SEO)
- **CSS**: TailwindCSS v4 via `@import "tailwindcss"` in `src/index.css`

## Deploy

GitHub Actions workflow (`.github/workflows/deploy.yml`) builds with `withastro/action` and deploys to GitHub Pages on push to `main`.