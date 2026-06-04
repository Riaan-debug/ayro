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

From the `sanity` folder, run once (use `npx` — `sanity` is not installed globally):

```bash
npx sanity login
npm run deploy
```

When prompted for hostname, choose **`ayro`** (the existing one — do not create a new hostname).

Sanity hosts the studio at **https://ayro.sanity.studio**. Bookmark it and share login with your team.

After deploy, hard-refresh the studio (Ctrl+Shift+R) so new fields appear.

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
   - **Sizes in stock** — tap each size that applies (XXS through XXXXL). No typing needed — works well on phone.
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
- **Privacy Policy** and **Returns & Refunds** (see below)

Click **Publish** when done.

---

## Edit Privacy Policy or Returns & Refunds

**Important:** If you use the hosted studio (`npm run deploy` URL), your developer must run `npm run deploy` from the `sanity/` folder after schema updates — otherwise new fields will not appear. For local studio, restart with `npm run dev` in `sanity/`.

In the studio sidebar, open **Site Settings**, then click the **Legal pages** tab at the top of the form.

You will see:

- **Privacy Policy — intro / sections / last updated**
- **Returns & Refunds — intro / sections / last updated**

Each section has a title, one or more paragraphs, and optional bullet points.

**Special placeholders** (leave these as-is unless your developer explains otherwise):

| Placeholder | Becomes |
|-------------|---------|
| `{{brandName}}` | Your brand name from Site Settings |
| `{{contactEmail}}` | Your contact email (clickable mailto link) |
| `{{contactPage}}` | Link to the Contact page |
| `{{privacyPage}}` | Link to the Privacy Policy |

**External links:** use `[Paystack](https://paystack.com)` format in a paragraph.

Update **Last updated** when you change policy wording (e.g. `June 2026`).

The live site updates after the next deploy (automatic if webhooks are configured).

**Note:** If you change your return window (e.g. 30 days), ask your developer to update the homepage trust badge text so it stays consistent.

---

## Contact & custom order emails (Formspree)

When someone uses **Contact** or **Custom orders** on the live shop, you receive an email notification (you do not need to log into Formspree for that).

### If your developer added your email

1. Check your inbox for a message from **Formspree** asking you to **verify** your address (`janaejayden86@gmail.com` or whichever email they used).
2. Click the link in that email. Until it shows **VERIFIED**, notifications may still go only to your developer.
3. After verification, ask your developer to confirm both forms (**Contact** and **Custom orders**) send to your address. They do this in Formspree under each form’s **Workflow** → **Email** action (not under Settings).
4. Submit a test message on the live site and check **Inbox** and **Spam**.

### What you will receive

- **Contact** — name, email, message from visitors.
- **Custom orders** — order details (style, sizes, timeline, etc.) from the custom order form.

Submissions are also stored in your developer’s Formspree dashboard for about 30 days on the free plan. If you later want your own login to view all submissions, ask your developer to transfer the account or add you on a team plan.

### You do not need Formspree to run the shop

The website is already connected. Verifying your email is only so **you** get the notification emails directly.

---

## What you cannot edit in Sanity (yet)

- Checkout and payments — handled by Paystack (test mode now; live when your developer switches keys after compliance)
- Trust badges text on homepage
- Theme (light/dark) — visitors choose in the navbar
- Customer accounts, order history, and wishlist — planned for Phase 3 (developer-only for now)

---

## Project timeline

See [`ROADMAP.md`](ROADMAP.md) for the full Phase 1–3 breakdown and what is done vs planned.

---

## Need help?

Contact your developer if products don’t appear on the live site after publishing — CORS or deploy webhook may need checking.
