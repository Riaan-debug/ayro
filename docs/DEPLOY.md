# AYRO — Production deploy checklist

## 1. Vercel environment variables

In your Vercel project → **Settings → Environment Variables**, add:

| Variable | Value |
|----------|-------|
| `VITE_FORMSPREE_CONTACT_ID` | `xbdbvyzq` |
| `VITE_FORMSPREE_CUSTOM_ORDER_ID` | `xjgzqraz` |
| `VITE_SANITY_PROJECT_ID` | `xilnix6x` |
| `VITE_SANITY_DATASET` | `production` |

Redeploy after saving.

## 2. Sanity CORS origins

[sanity.io/manage](https://www.sanity.io/manage) → project **xilnix6x** → **API** → **CORS origins**

Add:

- `http://localhost:5173` (allow credentials: off)
- `https://your-production-domain.vercel.app` (your actual Vercel URL)

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
- [ ] Product detail → add to bag → checkout (demo)
- [ ] Contact form email arrives (Formspree)
- [ ] Custom order form email arrives
- [ ] Change a price in Sanity → publish → live site updates

## 6. Client handoff

Share [`CLIENT.md`](CLIENT.md) (in this folder) and invite the client as **Editor** in Sanity → Project → Members.
