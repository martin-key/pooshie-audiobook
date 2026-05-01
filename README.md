# Pooshie · A Bedtime Audiobook

[![CI](https://github.com/martin-key/pooshie-audiobook/actions/workflows/ci.yml/badge.svg)](https://github.com/martin-key/pooshie-audiobook/actions/workflows/ci.yml)
[![Next.js](https://img.shields.io/badge/Next.js-16-black.svg)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-149eca.svg)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6.svg)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

A conversion-focused single-page marketing site for the **Pooshie** children's audiobook — 13 gentle bedtime chapters about a little pink hedgehog whose spines don't prick. Built for [audiobook.pooshie.net](https://audiobook.pooshie.net).

The site exists to do two things well: let parents **press play on Chapter 1 with no signup**, and **route them to the right audiobook platform** (Audible / Spotify / Apple Books / Google Play) when they're ready to buy.

## What's in here

| Section | Notes |
|---|---|
| Hero | Editorial display type, watercolor portrait stack with a spinning "Free chapter" stamp, ambient drifting clouds |
| Story band | Pull-quote from the book + 3 trust pillars (real human voice, bedtime length, kindness) |
| Listen (the centerpiece) | Real `<audio>` element, scrubbable waveform, Pooshie-portrait playhead that walks the timeline, 13-chapter list, embedded email capture |
| Friends | Four character cards with hover-revealed quotes (CSS-only, server-rendered) |
| Reviews | Three 5-star testimonials |
| Pricing | Three tiers — single ($1.99) / full audiobook ($9.99, featured) / + plush bundle ($34.99) |
| FAQ | 8 visible Q&As, also emitted as `FAQPage` JSON-LD |
| Final CTA | Moonlit dark band that breaks the cream and dramatizes "tonight" |
| Footer | Newsletter form (n8n webhook), brand line, ISBN, links |

## Stack

- **Next.js 16** (App Router, RSC by default, Turbopack)
- **React 19** + **TypeScript 5**
- **Plain CSS** (no Tailwind — the design uses very specific values where utilities add friction)
- **`next/font`** for Cardo (display/body) + Inter (UI), self-hosted at build time
- **`next/image`** for AVIF/WebP optimization on the watercolor JPEGs
- **n8n webhook** for lead capture (no DB required) via `POST /api/lead`
- **Vitest** + Testing Library for unit tests
- **GitHub Actions** for CI on Node 20 + Node 22

## SEO + GEO

The site is engineered for both classic SEO and **Generative Engine Optimization** — i.e. so ChatGPT, Perplexity, Claude, and Google's AI Overviews surface Pooshie when parents ask about gentle bedtime audiobooks.

- **Server-rendered everything** — content is in initial HTML; AI crawlers don't need to execute JS.
- **5 JSON-LD blocks** — `Organization`, `WebSite`, `Audiobook + Book` (with offers, aggregate rating, 3 reviews, 13 chapters, ISBN, duration `PT2H14M`, age range `4-8`), `FAQPage` (8 entries), `BreadcrumbList`.
- **Full Metadata API** — title template, description, canonical, Open Graph (1200×630 image with dimensions + alt + type), Twitter card, robots `max-image-preview: large` + `max-snippet: -1`, manifest, icons.
- **`/sitemap.xml`** — dynamic via `app/sitemap.ts`.
- **`/robots.txt`** — explicit allow rules for major AI crawlers (`GPTBot`, `ClaudeBot`, `PerplexityBot`, `Google-Extended`, `Applebot-Extended`, `OAI-SearchBot`, `Perplexity-User`, `MistralAI-User`, `CCBot`, `Bytespider`, `Amazonbot`, `DuckAssistBot`).
- **`/llms.txt`** — markdown summary at the root following the [llms.txt convention](https://llmstxt.org), including key facts, chapter list, pricing, and FAQs for clean LLM ingestion.
- **A11y as ranking signal** — semantic landmarks, 21+ `aria-label`s, 17 `aria-labelledby`s, visible focus rings, full `prefers-reduced-motion` honoring on every animation.
- **Performance** — fonts via `next/font` (no render-blocking CDN call), priority hero image with `sizes`, explicit `width`/`height` (CLS = 0), only the audio player + lead form ship as client components. The landing page is statically prerendered.

## Project structure

```
app/
├── layout.tsx              # fonts, default metadata, Organization + WebSite JSON-LD
├── page.tsx                # composition; Audiobook + FAQPage + Breadcrumb JSON-LD
├── globals.css             # design tokens, animations, .btn, .container
├── sitemap.ts              # dynamic sitemap
├── robots.ts               # robots.txt with AI bot allowlist
├── not-found.tsx
├── icon.png / apple-icon.png
└── api/lead/route.ts       # POST { email, context } → forwards to N8N_WEBHOOK_URL

components/
├── Header.tsx              # 'use client' — sticky scroll-blur
├── Hero.tsx, HeroPortraitStack.tsx, HeroMiniRibbon.tsx
├── StoryBand.tsx
├── Listen.tsx              # 'use client' — real <audio>, scrubber, chapter list
├── LeadForm.tsx            # 'use client' — email → /api/lead
├── Friends.tsx             # CSS-only hover (server)
├── Reviews.tsx, Pricing.tsx, FaqSection.tsx, FinalCTA.tsx, Footer.tsx
├── Reveal.tsx              # 'use client' — IntersectionObserver wrapper
└── icons/                  # PlayGlyph, SoftCloud, Squiggle, Pill

lib/
├── chapters.ts             # CHAPTERS data, fmt(), parseDur(), ISBN, AUTHOR
├── links.ts                # PURCHASE_LINKS placeholders
├── seo.ts                  # JSON-LD builders + REVIEWS + FAQS data
└── env.ts                  # SITE_URL, N8N_WEBHOOK_URL

public/
├── images/                 # 5 watercolor JPEGs
├── audio/chapter-1.mp3     # placeholder — replace with real audio
├── llms.txt                # GEO-optimized summary
├── og-default.jpg          # 1200×630 OG image
├── icon.png, apple-touch-icon.png, site.webmanifest

tests/
├── setup.ts                # jsdom + IntersectionObserver stubs
├── chapters.test.ts        # data integrity + fmt/parseDur round-trip
├── seo.test.ts             # JSON-LD schemas, offers, ratings
└── lead-route.test.ts      # API: validation, honeypot, rate limit
```

## Getting started

Requires Node 20 or 22.

```bash
git clone https://github.com/martin-key/pooshie-audiobook.git
cd pooshie-audiobook
cp .env.example .env.local       # then fill in N8N_WEBHOOK_URL
npm install
npm run dev                       # http://localhost:3000
```

### Environment variables

| Variable | Required | What it does |
|---|---|---|
| `SITE_URL` | yes | Used for canonical URLs, Open Graph, JSON-LD `@id`s, sitemap. Defaults to `https://audiobook.pooshie.net`. |
| `N8N_WEBHOOK_URL` | optional | Endpoint that `/api/lead` forwards email submissions to. If unset, submissions return `ok: true, forwarded: false` with a server log warning — useful for local dev. |

## Scripts

| Script | What it does |
|---|---|
| `npm run dev` | Start the dev server (Turbopack) |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run lint` | ESLint (flat config, typescript-eslint recommended) |
| `npm run typecheck` | `tsc --noEmit` |
| `npm test` | Run the Vitest suite once |
| `npm run test:watch` | Watch mode |
| `npm run test:coverage` | Coverage report (HTML + lcov) |

## Tests

27 unit tests covering:

- **`tests/chapters.test.ts`** — there are exactly 13 chapters, only chapter 1 is free, every chapter has the required shape, chapter numbers are sequential, ISBN/author/runtime constants are correct, `fmt`/`parseDur` round-trip cleanly.
- **`tests/seo.test.ts`** — every JSON-LD builder produces a valid schema.org shape: Audiobook declares both `Audiobook` and `Book` `@type`s, contains 13 `hasPart` chapters, all 3 offers ($1.99 / $9.99 / $34.99), an `AggregateRating`, one `Review` per source review, ISBN `978-619-91473-0-6`, duration `PT2H14M`, language `en`. FAQ has at least 6 entries, all reviews are 5-star.
- **`tests/lead-route.test.ts`** — `/api/lead` rejects invalid emails (400), silently accepts honeypot fills (200, no forward), rejects malformed JSON (400), accepts valid emails when the webhook is unset (logs warning), and rate-limits at 5 requests per IP per minute (429 on the 6th).

## CI

[`.github/workflows/ci.yml`](.github/workflows/ci.yml) runs on every push to `main` and every PR:

1. **`verify` job** — matrix on Node 20 + 22: install → lint → typecheck → test → build.
2. **`coverage` job** — runs after verify on Node 22, uploads the coverage report as a 14-day artifact.

Concurrency cancels in-progress runs on the same ref. Dependabot is configured for weekly npm and monthly GitHub Actions updates ([`.github/dependabot.yml`](.github/dependabot.yml)).

## Before going live

The design hand-off is fully wired but a few placeholders need real values:

1. **Drop the real `chapter-1.mp3`** into `public/audio/` (replaces a 5-second silent placeholder).
2. **Set `N8N_WEBHOOK_URL`** in production secrets so submissions actually forward.
3. **Replace placeholder URLs** in [`lib/links.ts`](lib/links.ts) — `PURCHASE_LINKS.{single,full,bundle}` currently point at platform homepages. Drop in your real Audible / Spotify / Apple Books / Google Play listings.
4. **(Optional) custom `og-default.jpg`** — currently a center-crop of the portrait. A purpose-designed 1200×630 with the "Free chapter" stamp would lift social CTR.

## Credits

- Design: hand-off bundle from [Claude Design](https://claude.ai/design).
- Watercolor illustrations: bundled assets accompanying the design hand-off.
- Engineering: [Encorp](https://encorp.io) — built with [Claude Code](https://claude.com/claude-code).

## License

[MIT](LICENSE) © Pooshie & Kitty
