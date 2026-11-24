# AGENTS.md - Portfolio Project (Maksim Sokal)

## Quick start
```bash
npm install
npm run dev          # astro dev server (port 4321 default)
npm run build        # astro build → dist/
npm run preview      # astro preview (serve built output)
npm run lint         # tsc --noEmit only (no ESLint/Prettier)
npm run check        # astro check (TypeScript + .astro templates)
npm run clean        # rm -rf dist
```

## Architecture
- **Pages**: `src/pages/index.astro` (DeFi profile), `src/pages/seo-expert.astro` (SEO profile), `src/pages/sitemap.astro` (HTML sitemap), `src/pages/404.astro`
- **Layouts**: `src/layouts/BaseLayout.astro` + `SeoLayout.astro` — HTML shells, SEO meta, large inline JSON-LD `@graph` entity graphs
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
- No test framework configured; CI (`.github/workflows/ci.yml`) gates on `astro check` + build
- TailwindCSS v4 with `@import "tailwindcss"` (not `tailwind.config.js`)
- React islands use `className` (JSX); `.astro` templates use `class` (HTML)
- **Important**: lucide-react icons imported into `.astro` files must use `className` (React prop), not `class` — `class` is silently dropped and icons render unstyled
- Astro extends `astro/tsconfigs/base` — type-only imports require `import type`
- `.astro/` is gitignored (auto-generated dev artifacts)
- Inline `<script>` in `Header` guards `event.target instanceof Node` before calling `contains(...)`