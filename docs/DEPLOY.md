# AYRO — Production deploy checklist

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

**Test payment:** use Paystack test card `4084084084084081`, expiry any future date, CVV `408`, PIN `0000` (if prompted).

## 2. Sanity CORS origins

[sanity.io/manage](https://www.sanity.io/manage) → project **xilnix6x** → **API** → **CORS origins**

Add:

- `http://localhost:5173` (allow credentials: off)
- `https://cole-roan.vercel.app` (production — update if custom domain added)

## 3. Seed CMS content (one time)

Create a write token: **API → Tokens → Add API token** (Editor).

```powershell
cd e:\cole
$env:SANITY_TOKEN="your_token_here"
node sanity/scripts/seed.mjs
```

This uploads all product images and creates Site Settings.

## 4. Auto-rebuild on publish (optional)

**Vercel:** Project → Settings → Git → Deploy Hooks → Create hook → copy URL.

**Sanity:** API → Webhooks → Create webhook:

- URL: Vercel deploy hook URL
- Dataset: production
- Trigger on: Create, Update, Delete
- Filter: `_type in ["product", "siteSettings"]`

When the client publishes in the studio, the live site rebuilds automatically.

## 5. Smoke test

- [ ] Homepage hero and products load
- [ ] Shop filters work
- [ ] Product detail → add to bag → Paystack checkout (test mode)
- [ ] Contact form email arrives (Formspree)
- [ ] Custom order form email arrives
- [ ] Change a price in Sanity → publish → live site updates

## 6. Client handoff

Share [`CLIENT.md`](CLIENT.md) (in this folder) and invite the client as **Editor** in Sanity → Project → Members.
