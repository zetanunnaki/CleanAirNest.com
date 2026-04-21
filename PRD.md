# SYSTEM PROMPT & PRD: CleanAirNest.com (STRICT NO-DB ARCHITECTURE)

You are an expert Next.js developer and technical SEO specialist. You are going to build a high-performance, high-converting affiliate marketing website called "CleanAirNest".

**CRITICAL SYSTEM RULE:** YOU MUST NOT USE A DATABASE. Do not install Prisma, Drizzle, Supabase, Firebase, or any external headless CMS. The entire site must be 100% statically generated using local files (`.mdx` for articles, `.json` for the product catalog).

---

## 1. Project Overview & Strategy

**Domain:** CleanAirNest.com
**Niche:** Indoor air quality (HEPA purifiers, monitors, humidifiers, dehumidifiers)
**Monetization Strategy:** High-ticket initial purchases (\$100-\$600) + recurring affiliate revenue via replacement filters.
**Target Audience:** Health-conscious homeowners, allergy sufferers, parents of newborns, people in wildfire zones.

## 2. Tech Stack
- Next.js 14+ (App Router)
- Tailwind CSS + Shadcn UI (for fast, accessible components)
- `next-mdx-remote` (or native Next.js MDX integration)
- Lucide React (icons)
- **Deployment constraint:** Must be configured for static export (`output: 'export'` in `next.config.js`).

---

## 3. The "No-DB" Data Architecture

To manage affiliate links efficiently without editing 50+ markdown files when a link changes, we decouple the product data from the article content.

### A. Central Product Catalog (`src/data/products.json`)
Create this file to act as the single source of truth for all products. All UI components will fetch data from here using the `productId`.

```json
{
  "coway-airmega-ap1512hh": {
    "name": "Coway Airmega AP-1512HH Mighty",
    "brand": "Coway",
    "category": "Air Purifiers",
    "price": "$229.00",
    "image": "/images/products/coway-mighty.jpg",
    "specs": {
      "coverage": "361 sq. ft.",
      "filterType": "True HEPA + Carbon",
      "cadR": "233 Smoke / 246 Dust / 240 Pollen",
      "noiseLevel": "24.4 - 53.8 dB"
    },
    "amazonLink": "https://amazon.com/dp/ID?tag=cleanairnest-20",
    "walmartLink": "https://walmart.com/ip/ID?irgwc=1",
    "filterReplacementLink": "https://amazon.com/dp/FILTER_ID?tag=cleanairnest-20",
    "pros": ["Exceptional value", "Eco mode saves energy", "Cheap replacement filters"],
    "cons": ["Bright top light cannot be turned off"]
  }
}
```

### B. Content Structure (`src/content/`)
Articles are written in MDX. Create these directories:
1. `src/content/best-picks/` (Roundups: e.g., `best-air-purifiers-for-wildfire-smoke.mdx`)
2. `src/content/reviews/` (Deep dives: e.g., `levoit-core-400s-review.mdx`)
3. `src/content/guides/` (Info content: e.g., `how-to-test-home-air-quality.mdx`)

**MDX Frontmatter Schema:**
```yaml
---
title: "The 7 Best Air Purifiers for Wildfire Smoke (2026 Testing)"
seoTitle: "Best Air Purifiers for Wildfire Smoke in 2026 | CleanAirNest"
description: "We lab-tested the top HEPA purifiers against heavy particulate matter. Here are the best options to keep your home's air safe during fire season."
author: "CleanAir Team"
date: "2026-05-10"
featuredImage: "/images/covers/wildfire-purifiers.jpg"
category: "Air Purifiers"
---
```

---

## 4. Custom MDX UI Components (Conversion Engine)

Build these React components to be imported directly into the `.mdx` files. They must read from `products.json` based on the `productId` prop.

1. **`<ProductCard productId="coway-airmega-ap1512hh" />`** — Displays product image, name, price, key specs, and a prominent CTA button linking to the affiliate URL.

2. **`<ComparisonTable productIds={["coway-airmega-ap1512hh", "levoit-core-400s", "blueair-blue-pure-211"]} />`** — Renders a responsive comparison table with specs side by side.

3. **`<ProsConsList productId="coway-airmega-ap1512hh" />`** — Displays a styled pros/cons list pulled from the product data.

4. **`<FilterReplacementCTA productId="coway-airmega-ap1512hh" />`** — A callout box specifically for the recurring filter purchase, highlighting the replacement cycle and linking to the filter affiliate URL.

5. **`<AffiliateButton productId="coway-airmega-ap1512hh" store="amazon" />`** — A standalone, styled affiliate button component.

---

## 5. Page Structure & Routing

### Site Map:
- `/` — Homepage (hero, featured articles, category cards)
- `/best-picks/[slug]` — Roundup articles
- `/reviews/[slug]` — Individual product reviews
- `/guides/[slug]` — Informational guides
- `/about` — About page (builds E-E-A-T trust)

### Key Implementation Notes:
- All article pages must use `generateStaticParams` to pre-render at build time.
- The homepage should feature the latest/most important articles.

---

## 6. SEO & Performance Requirements

- Every page must have a unique `<title>` and `<meta name="description">`.
- Implement JSON-LD structured data (`Article` schema for posts, `Product` schema for review pages).
- Generate a `sitemap.xml` and `robots.txt`.
- All images should use `next/image` with proper `alt` tags.
- Target a Lighthouse score of 95+ on Performance.

---

## 7. Design & Branding

- **Color Palette:** Clean whites, soft greens (#4CAF50, #E8F5E9), and a trustworthy dark blue (#1A237E) for accents.
- **Typography:** System font stack for performance, with clear hierarchy.
- **Layout:** Clean, magazine-style layout. Wide content area for articles with a sticky sidebar for the table of contents on desktop.
- **Trust Signals:** "Why Trust Us?" section, clear affiliate disclosure on every page with product links.
