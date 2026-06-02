# AYRO — Client guide

How to update the AYRO store without touching code.

## Log in to the content studio

**Option A — Local (developer machine)**

```bash
cd sanity
npm run dev
```

Open http://localhost:3333 and sign in with your Sanity account.

**Option B — Hosted studio (recommended for client)**

From the `sanity` folder, run once:

```bash
npm run deploy
```

Sanity hosts the studio at a URL like `https://ayro.sanity.studio`. Bookmark it and share login with your team.

---

## Add or edit a product

1. Open **Product** in the studio sidebar.
2. Click **Create** or open an existing product.
3. Fill in:
   - **Name** — product title
   - **Slug** — URL-friendly name (click Generate from name)
   - **Description** — short product copy
   - **Price (ZAR)** — number only, e.g. `599`
   - **Category** — Essentials, Graphics, or Limited
   - **Featured on home** — toggle for homepage carousel
   - **Sizes** — type each size and press Enter (S, M, L, XL, etc.)
   - **Main image** — drag and drop product photo
   - **Gallery images** — optional extra angles
4. Click **Publish**.

The live site updates after the next deploy (automatic if webhooks are configured).

---

## Edit site-wide content

Open the **Site Settings** document (only one exists).

You can change:

- Brand name, logo, contact email
- Hero banner (headline, subcopy, image) — use `|` in headline to split lines, e.g. `Wear your|ambition.`
- Promo bar text (top of homepage)
- Story section (About page content)
- Shop page title and subtitle
- Social links (Instagram, TikTok, etc.)
- Category tile images on the homepage

Click **Publish** when done.

---

## What you cannot edit in Sanity (yet)

- Checkout and payments (demo mode until Stripe is connected)
- Trust badges text on homepage
- Theme (light/dark) — visitors choose in the navbar

---

## Need help?

Contact your developer if products don’t appear on the live site after publishing — CORS or deploy webhook may need checking.
