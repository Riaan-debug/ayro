# AYRO — Client handoff checklist

Use this when handing the store to the client. Live shop: **https://cole-roan.vercel.app**

## Share with the client

| What | URL |
|------|-----|
| Live shop | https://cole-roan.vercel.app |
| Content studio | https://ayro.sanity.studio |
| How-to guide | [CLIENT.md](CLIENT.md) |

**Client email:** janaejayden86@gmail.com — invite as **Editor** in [Sanity → Members](https://www.sanity.io/manage/project/xilnix6x/members).

---

## Completed (developer)

- [x] Production pages load (home, shop, checkout, privacy, returns)
- [x] Paystack checkout works in **test mode** (no real money yet)
- [x] Legal pages live (`/privacy`, `/returns`) — editable in Sanity → Site Settings → Legal pages
- [x] Hosted Sanity studio deployed → https://ayro.sanity.studio
- [x] Vercel deploy hook created (`sanity-publish` on `main`)

---

## You still need to do (5–10 min)

### 1. Connect Sanity → Vercel auto-rebuild

The Vercel deploy hook exists. Wire it in Sanity:

1. Run `npx vercel deploy-hooks list` in the project root and copy the **url** for `sanity-publish`
2. Open [Sanity → API → Webhooks → Create](https://www.sanity.io/manage/project/xilnix6x/api/webhooks/new)
3. **Name:** Vercel rebuild  
   **URL:** paste the deploy hook URL  
   **Dataset:** production  
   **Trigger on:** Create, Update, Delete  
   **Filter:** `_type in ["product", "siteSettings"]`  
   **HTTP method:** POST
4. Test: change a product price in the studio → **Publish** → confirm the live site updates within a few minutes

### 2. Invite the client in Sanity

[sanity.io/manage](https://www.sanity.io/manage) → project **xilnix6x** → **Members** → Invite **janaejayden86@gmail.com** as **Editor**

### 3. Handoff call (~30 min)

Walk through [CLIENT.md](CLIENT.md):

1. Log into studio → edit a product → **Publish** → show live site update
2. Edit Site Settings (hero, promo, legal pages)
3. Demo test checkout (explain: test mode — real payments after Paystack compliance)
4. Show contact and custom order forms

---

## Set expectations

- **Today:** Store is handoff-ready with **test payments**
- **Real money:** Client completes Paystack Owner + Account compliance → you swap to `sk_live_...` in Vercel ([DEPLOY.md](DEPLOY.md) §1c)
- **Phase 3 (later):** Login, order history, wishlist — see [ROADMAP.md](ROADMAP.md)

---

## Production smoke test

Run through [DEPLOY.md](DEPLOY.md) §5 before the client call:

- [ ] Homepage + shop + product detail
- [ ] Add to bag → Paystack test checkout → order confirmed
- [ ] `/privacy` and `/returns` from footer
- [ ] Contact + custom order forms (Formspree inbox)
- [ ] Sanity publish → live site updates (after webhook in step 1)
