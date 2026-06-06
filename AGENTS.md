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
- **Entrypoint**: `src/pages/index.astro` → composed of section components
- **Layout**: `src/layouts/BaseLayout.astro` (HTML shell, SEO, JSON-LD)
- **Sections**: 10 `.astro` components in `src/components/sections/` — rendered as static HTML at build time
- **React islands**: `src/components/react/AuditAccordion.tsx` + `GpgCopyButton.tsx` — only components that ship client JS
- **Content data**: `src/data.ts` (audit logs, bio, expertise items)
- **Astro config**: `astro.config.mjs` (React integration + Tailwind v4 via Vite plugin)

## Key quirks
- `npm run clean` uses `node -e` (cross-platform, no `rm -rf`)
- `npm run lint` is **type-check only** (`tsc --noEmit`), not a linter
- No test framework configured
- TailwindCSS v4 with `@import "tailwindcss"` (not `tailwind.config.js`)
- React islands use `className` (JSX); `.astro` templates use `class` (HTML)
- Astro extends `astro/tsconfigs/base` — type-only imports require `import type`
