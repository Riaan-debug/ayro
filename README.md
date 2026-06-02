# AYRO — Premium Streetwear Storefront

React + TypeScript + Vite + Tailwind CSS storefront for the AYRO clothing brand.

## Features

- Shop with category filters, product detail, cart, and demo checkout
- Logo intro splash on first visit
- Custom orders and contact forms (Formspree-ready)
- Light / dark mode
- Optional Sanity CMS for client-managed products and site copy

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:5173

**Tip:** Restart the dev server after adding new files to `public/`.

Replay the logo intro: `http://localhost:5173/?intro=1` or run `resetAyroIntro()` in the browser console.

## Environment variables

Copy [`.env.example`](.env.example) to `.env.local`:

| Variable | Purpose |
|----------|---------|
| `VITE_SANITY_PROJECT_ID` | Load products/copy from Sanity (optional) |
| `VITE_SANITY_DATASET` | Sanity dataset (default: `production`) |
| `VITE_FORMSPREE_CONTACT_ID` | Contact form submissions |
| `VITE_FORMSPREE_CUSTOM_ORDER_ID` | Custom order form submissions |

Without these, the site uses static data in `src/data/` and forms run in demo mode.

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

### Auto-rebuild on publish

See [`docs/DEPLOY.md`](docs/DEPLOY.md) for Vercel env vars, CORS, webhooks, and seed script.

In Sanity → API → Webhooks, add a webhook pointing to your Vercel deploy hook URL. The live site rebuilds when the client publishes content.

### Client guide

See [`docs/CLIENT.md`](docs/CLIENT.md) for how the client adds products and edits site copy.

## Deploy (Vercel)

1. Import the GitHub repo at [vercel.com](https://vercel.com)
2. Add environment variables from `.env.example`
3. Deploy — [`vercel.json`](vercel.json) preserves static images under `/images/`

## Customize (static mode)

- **Products** — [`src/data/products.json`](src/data/products.json)
- **Site copy** — [`src/data/site.ts`](src/data/site.ts)
- **Currency** — [`src/lib/currency.ts`](src/lib/currency.ts)

## Phase 2: Paystack payments

Checkout uses Paystack (ZAR). Cart line items are sent to `/api/paystack/initialize`; success is verified at `/checkout/success`.

Local dev with payments: `npm run dev:api` (runs Vercel dev so API routes work).

Test card: use Paystack test mode — see [`docs/DEPLOY.md`](docs/DEPLOY.md).
