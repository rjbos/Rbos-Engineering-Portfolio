# AGENTS.md

Architecture reference for AI agents working on this codebase.

## Project Overview

Luminary is a marketing/e-commerce site built with **TanStack Start** (SSR-capable React framework with file-based routing). It showcases a product catalog with a home page grid and individual product detail pages.

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | TanStack Start |
| Frontend | React 19, TanStack Router v1 |
| Build | Vite 7 |
| Styling | Tailwind CSS 4 |
| Language | TypeScript 5.7 (strict mode) |
| Deployment | Netlify |

## Directory Map

```
src/
├── data/
│   └── products.ts           # Single source of truth for all product data
├── routes/
│   ├── __root.tsx            # Root layout: <html>, Header, Footer, global imports
│   ├── index.tsx             # "/" — Hero section, ProductGrid, ValueProps
│   └── products/
│       └── $productId.tsx    # "/products/:id" — product detail + related products
├── router.tsx                # TanStack Router setup (scroll restoration)
└── styles.css                # Tailwind v4 import + base styles
public/
├── favicon.ico
└── placeholder.png
```

## Routing Conventions (TanStack Router)

- Routes live under `src/routes/` — filename = URL path segment
- `__root.tsx` wraps ALL pages with shared layout (Header, Footer, `<html>` shell)
- `$productId.tsx` — `$` prefix means dynamic segment; accessed via `params.productId`
- API routes follow `api.*.ts` naming (none currently)
- Loaders (`loader:`) run server-side (or at build) — keep data fetching here

## Data Layer

`src/data/products.ts` exports a typed `Product[]` array. There is no database — all data is static. To add products: edit this file. Product IDs must be unique positive integers (they appear in URLs).

## Component Patterns

- Page-level components are co-located with their route file (no separate components/ dir)
- Shared layout components (Header, Footer) live inline in `__root.tsx`
- Tailwind utility classes only — no CSS modules or styled-components
- `lucide-react` is available for icons

## Key Constraints

- TypeScript strict mode — no `any`, use proper types
- Image URLs: external Unsplash URLs are fine; static assets go in `public/`
- The `@/` path alias resolves to `src/` (configured in `tsconfig.json`)

## Adding a New Page

1. Create `src/routes/my-page.tsx`
2. Export `Route = createFileRoute('/my-page')({ component: MyPage })`
3. TanStack Router auto-generates the route tree on dev/build

## Styling Notes

- Tailwind CSS v4 — uses `@import "tailwindcss"` (not `@tailwind base/components/utilities`)
- Color palette: gray-900 (primary text/buttons), indigo-600 (accents), gray-50/100 (backgrounds)
- Rounded corners: `rounded-2xl` for cards, `rounded-full` for buttons/pills
- Hover states: always include `transition-*` for smooth interactions

## Development Commands

```bash
npm run dev      # Start dev server on http://localhost:3000
npm run build    # Production build
netlify dev      # Full Netlify platform emulation on http://localhost:8888
```
