# Maksim Sokal — DeFi Risk Analyst & Protocol Auditor

Personal portfolio site built with [Astro](https://astro.build) + React islands + TailwindCSS v4.

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

- **Layout**: `src/layouts/BaseLayout.astro` — HTML shell, SEO meta, JSON-LD structured data
- **Pages**: `src/pages/index.astro` — imports all 10 sections
- **Sections**: 10 static `.astro` components under `src/components/sections/`
- **React islands**: `AuditAccordion` + `GpgCopyButton` — the only components that ship client JS
- **Content**: `src/data.ts` + `src/types.ts`
- **CSS**: TailwindCSS v4 via `@import "tailwindcss"` in `src/index.css`
