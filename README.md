# Cole — T-Shirt Brand Storefront

A modern, Nike-inspired e-commerce storefront for a clothing brand. Built with React, TypeScript, Vite, and Tailwind CSS.

## Features

- **Shop** — Product catalog with category filtering (essentials, graphics, limited)
- **Product pages** — Size selection, quantity, image gallery
- **Cart** — Slide-out bag with localStorage persistence
- **Checkout** — Demo order flow with confirmation (Stripe-ready for Phase 2)
- **Custom orders** — Design consultation / bulk order request form
- **About & Contact** — Brand story and contact form
- **Social links** — Footer links to Instagram, TikTok, X
- **Light / dark mode** — Toggle in the navbar; preference saved in localStorage (respects system theme on first visit)

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:5173

## Build for production

```bash
npm run build
npm run preview
```

Static files output to `dist/` — deploy to Netlify, Vercel, GitHub Pages, etc.

## Customize

- **Products** — Edit [`src/data/products.json`](src/data/products.json) (prices in ZAR)
- **Currency** — [`src/lib/currency.ts`](src/lib/currency.ts) (locale, shipping thresholds)
- **Brand name** — Search/replace "Cole" in components and pages
- **Social links** — Update [`src/components/Footer.tsx`](src/components/Footer.tsx) and [`src/pages/Contact.tsx`](src/pages/Contact.tsx)
- **Images** — Replace Unsplash URLs with your own product photos

## Phase 2: Stripe payments

The cart already produces Stripe-ready line items via `getLineItems()` in `CartContext`. To go live:

1. Create a [Stripe](https://stripe.com) account
2. Add a small backend endpoint (e.g. Express) that creates a Checkout Session
3. Point the checkout button to that endpoint instead of the demo confirmation
4. Store `STRIPE_SECRET_KEY` in `.env` (never commit it)

## Client brief (from intake form)

- Sells t-shirts; growing a clothing brand
- Primary actions: purchase + contact
- Feel: trustworthy; reference: nike.com
- Features: online store, custom orders, social + payments (payments deferred)
