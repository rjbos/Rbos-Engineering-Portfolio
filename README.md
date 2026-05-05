# Luminary — Premium Products Marketing Site

A clean, responsive marketing website showcasing a curated product catalog. Built with TanStack Start and deployed on Netlify.

## Tech Stack

- **Framework**: TanStack Start (SSR-capable React meta-framework)
- **Routing**: TanStack Router v1 (file-based)
- **Styling**: Tailwind CSS v4
- **Language**: TypeScript (strict mode)
- **Build**: Vite 7
- **Deployment**: Netlify

## Key Features

- Hero landing section with call-to-action
- Responsive 4-column product grid with hover effects
- Individual product detail pages with related products
- Sticky navigation header and branded footer
- Tag/badge support per product (e.g. "Bestseller", "New")

## Project Structure

```
src/
├── data/products.ts          # Product catalog — edit here to add/remove products
├── routes/
│   ├── __root.tsx            # Root layout: Header, Footer, <html> shell
│   ├── index.tsx             # Home page: Hero, ProductGrid, ValueProps
│   └── products/$productId.tsx  # Product detail page
└── styles.css                # Tailwind + global base styles
```

## Running Locally

```bash
npm install
npm run dev       # starts dev server on http://localhost:3000
```

Or with Netlify CLI for full platform emulation (recommended):

```bash
netlify dev       # starts on http://localhost:8888
```

## Adding Products

Edit `src/data/products.ts`. Each product has:

| Field | Type | Description |
|-------|------|-------------|
| `id` | number | Unique identifier (used in URL) |
| `name` | string | Display name |
| `image` | string | URL or `/public/` path |
| `shortDescription` | string | Card subtitle (keep under 100 chars) |
| `description` | string | Full detail page copy |
| `price` | number | Price in USD (no currency symbol) |
| `tag` | string? | Optional badge (e.g. "New", "Bestseller") |
