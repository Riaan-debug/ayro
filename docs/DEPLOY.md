# AYRO — Production deploy checklist

**Project phases:** See [`ROADMAP.md`](ROADMAP.md) for Phase 1 (storefront), Phase 2 (Paystack), and Phase 3 (accounts — planned).

| Phase | Status |
|-------|--------|
| Phase 1 — Storefront + CMS | ~complete |
| Phase 2 — Paystack checkout | Legal pages live; test mode OK — live keys + Paystack compliance remain |
| Phase 3 — Customer accounts | Not started |

---

## 1. Vercel environment variables

In your Vercel project → **Settings → Environment Variables**, add:

| Variable | Value |
|----------|-------|
| `VITE_FORMSPREE_CONTACT_ID` | `xbdbvyzq` |
| `VITE_FORMSPREE_CUSTOM_ORDER_ID` | `xjgzqraz` |
| `VITE_SANITY_PROJECT_ID` | `xilnix6x` |
| `VITE_SANITY_DATASET` | `production` |
| `PAYSTACK_SECRET_KEY` | Paystack **test** secret key (`sk_test_...`) — server only, never `VITE_` |

Redeploy after saving.

## 1b. Paystack (test mode)

- Dashboard: [dashboard.paystack.com](https://dashboard.paystack.com) → **Settings → API Keys** (Test mode on)
- Copy **Test Secret Key** into Vercel as `PAYSTACK_SECRET_KEY`
- Optional: set **Test Callback URL** to `https://cole-roan.vercel.app/checkout/success`
- Complete compliance (Owner + Account) before switching to **live** keys
- Ensure `/privacy` and `/returns` are linked from the footer and checkout (required for Paystack go-live)

**Test payment:** use Paystack test card `4084084084084081`, expiry any future date, CVV `408`, PIN `0000` (if prompted).

## 1c. Go live (after compliance)

1. Paystack dashboard → switch to **Live** mode → copy **Live Secret Key**
2. Vercel → replace `PAYSTACK_SECRET_KEY` with `sk_live_...` → redeploy
3. Paystack → set live callback URL to `https://cole-roan.vercel.app/checkout/success`
4. Run one small real payment smoke test, then refund if needed

## 2. Sanity CORS origins

[sanity.io/manage](https://www.sanity.io/manage) → project **xilnix6x** → **API** → **CORS origins**

Add:

- `http://localhost:5173` (frontend-only dev — allow credentials: off)
- `http://localhost:3056` (`npm run dev:api` — checkout + API routes)
- `https://cole-roan.vercel.app` (production — update if custom domain added)

## 3. Seed CMS content (one time)

Create a write token: **API → Tokens → Add API token** (Editor).

```powershell
cd e:\cole
$env:SANITY_TOKEN="your_token_here"
node sanity/scripts/seed.mjs
```

This uploads all product images and creates Site Settings.

## 4. Auto-rebuild on publish

A Vercel deploy hook named **`sanity-publish`** is already configured for the `main` branch.

List or copy the hook URL:

```powershell
cd e:\cole
npx vercel deploy-hooks list
```

**Sanity:** [Create webhook](https://www.sanity.io/manage/project/xilnix6x/api/webhooks/new) → paste the deploy hook URL:

- Dataset: `production`
- Trigger on: Create, Update, Delete
- Filter: `_type in ["product", "siteSettings"]`
- HTTP method: POST

Step-by-step: [HANDOFF.md](HANDOFF.md) §1

When the client publishes in the studio, the live site rebuilds automatically.

## 5. Smoke test

- [ ] Homepage hero and products load
- [ ] Shop filters work
- [ ] Product detail → add to bag → Paystack checkout (test mode)
- [ ] `/privacy` and `/returns` load from footer and checkout links
- [ ] Contact form email arrives (Formspree)
- [ ] Custom order form email arrives
- [ ] Change a price in Sanity → publish → live site updates

## 6. Client handoff

See **[HANDOFF.md](HANDOFF.md)** for the full checklist, share URLs, and handoff call agenda.

Share [`CLIENT.md`](CLIENT.md) and invite the client as **Editor** in Sanity → Project → Members.
