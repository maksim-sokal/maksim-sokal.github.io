# AGENTS.md - Portfolio Project (Maksim Sokal)

## Quick start
```bash
npm install
npm run dev          # astro dev server (port 4321 default)
npm run build        # astro build → dist/
npm run preview      # astro preview (serve built output)
npm run lint         # tsc --noEmit only (no ESLint/Prettier)
npm run clean        # rm -rf dist
```

## Architecture
- **Pages**: `src/pages/index.astro` (DeFi profile) and `src/pages/seo-expert.astro` (SEO profile) — each composes its own section components
- **Layouts**: `src/layouts/BaseLayout.astro` + `SeoLayout.astro` — HTML shells, SEO meta, large inline JSON-LD `@graph` entity graphs
- **Sections**: 20 `.astro` components in `src/components/sections/` (10 per profile, `Seo*` prefixed for the SEO profile) — rendered as static HTML at build time
- **Static data components** (in `src/components/sections/`): `ContractTable`, `AuditReportTable`, `AuditAccordion` (native `<details>`), `GpgCopyButton` (vanilla `<script>` for clipboard copy) — no React
- **React islands**: only `src/components/react/LetterGlitch.tsx` (canvas effect, hydrated with `client:visible`)
- **Content data**: `src/data.ts` (DeFi) + `src/data-seo.ts` (SEO); types in `src/types.ts` + `src/types-seo.ts`
- **Astro config**: `astro.config.mjs` (React integration + Tailwind v4 via Vite plugin; `site` = GitHub Pages URL)

## Key quirks
- `npm run clean` uses `node -e` (cross-platform, no `rm -rf`)
- `npm run lint` is **type-check only** (`tsc --noEmit`), not a linter — it does NOT type-check `.astro` files
- No test framework configured
- TailwindCSS v4 with `@import "tailwindcss"` (not `tailwind.config.js`)
- React islands use `className` (JSX); `.astro` templates use `class` (HTML)
- **Important**: lucide-react icons imported into `.astro` files must use `className` (React prop), not `class` — `class` is silently dropped and icons render unstyled
- Astro extends `astro/tsconfigs/base` — type-only imports require `import type`
- `.astro/` is gitignored (auto-generated dev artifacts)
- Inline `<script>` in `Header`/`SeoHeader` uses `event.target.contains(...)` — works at runtime, flagged by LSP as a typing nit