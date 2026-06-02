# AYRO — Premium Streetwear Storefront

React + TypeScript + Vite + Tailwind CSS storefront for the AYRO clothing brand.

**Project phases:** See [`docs/ROADMAP.md`](docs/ROADMAP.md) for Phase 1 (storefront), Phase 2 (Paystack), and Phase 3 (accounts — planned).

## Features

- Shop with category filters, product detail, cart (editable at checkout), and Paystack checkout (ZAR)
- Logo intro splash on first visit
- Custom orders and contact forms (Formspree)
- Light / dark mode
- Sanity CMS for client-managed products and site copy

## Run locally

**Frontend only:**

```bash
npm install
npm run dev
```

Open http://localhost:5173

**Checkout and payments** (includes API routes):

```bash
npm run dev:api
```

Open http://localhost:3056 — requires `.env.local` with `PAYSTACK_SECRET_KEY`. See [`docs/DEPLOY.md`](docs/DEPLOY.md).

Replay the logo intro: `http://localhost:5173/?intro=1` or run `resetAyroIntro()` in the browser console.

## Environment variables

Copy [`.env.example`](.env.example) to `.env.local`:

| Variable | Purpose |
|----------|---------|
| `VITE_SANITY_PROJECT_ID` | Load products/copy from Sanity |
| `VITE_SANITY_DATASET` | Sanity dataset (default: `production`) |
| `VITE_FORMSPREE_CONTACT_ID` | Contact form submissions |
| `VITE_FORMSPREE_CUSTOM_ORDER_ID` | Custom order form submissions |
| `PAYSTACK_SECRET_KEY` | Paystack secret key — server only, never `VITE_` |

Without Sanity/Formspree vars, the site falls back to static data in `src/data/` and forms run in demo mode.

## Sanity CMS (client handoff)

1. Create a project at [sanity.io](https://www.sanity.io)
2. Copy `sanity/.env.example` to `sanity/.env` with your project ID
3. Install and run the studio:

```bash
cd sanity
npm install
npm run dev
```

4. Add products and a **Site Settings** document in the studio
5. Set `VITE_SANITY_PROJECT_ID` in `.env.local` and redeploy

See [`docs/CLIENT.md`](docs/CLIENT.md) for how the client adds products and edits site copy.

## Deploy (Vercel)

1. Import the GitHub repo at [vercel.com](https://vercel.com)
2. Add environment variables from [`.env.example`](.env.example) and [`docs/DEPLOY.md`](docs/DEPLOY.md)
3. Deploy — [`vercel.json`](vercel.json) handles SPA routing and API routes

Full checklist: [`docs/DEPLOY.md`](docs/DEPLOY.md)

## Customize (static fallback)

- **Products** — [`src/data/products.json`](src/data/products.json)
- **Site copy** — [`src/data/site.ts`](src/data/site.ts)
- **Currency** — [`src/lib/currency.ts`](src/lib/currency.ts)
