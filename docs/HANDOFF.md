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

## You still need to do

### 1. Connect Sanity → Vercel auto-rebuild (if not done yet)

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

- [x] **janaejayden86@gmail.com** invited as **Editor** — client can use https://ayro.sanity.studio

### 3. Handoff call (~30 min) — optional if client already comfortable

Walk through [CLIENT.md](CLIENT.md):

1. Log into studio → edit a product → **Publish** → show live site update
2. Edit Site Settings (hero, promo, legal pages)
3. Demo test checkout (explain: test mode — real payments after Paystack compliance)
4. Show contact and custom order forms

### 4. Formspree notifications (developer)

See [CLIENT.md — Formspree](CLIENT.md#contact--custom-order-emails-formspree) for what to tell the client.

1. **Account** → add client email as linked email → client must **verify** (PENDING → VERIFIED).
2. For **Contact** and **Custom orders**: open **Workflow** (not Settings) → **Email** action → set target to the client’s verified address.
3. Test submit on production; client confirms email received.

You can keep the Formspree account and only route emails to the client (no Vercel changes). Full account transfer requires new form IDs in env vars — only if the client must own the dashboard.

---

## Set expectations

- **Today:** Store is handoff-ready with **test payments**
- **Real money:** Client completes Paystack Owner + Account compliance → you swap to `sk_live_...` in Vercel ([DEPLOY.md](DEPLOY.md) §1c)
- **Phase 3:** Customer accounts (login/signup) — live when Supabase env vars are set; order history still planned — see [ROADMAP.md](ROADMAP.md)

---

## Production smoke test

Run through [DEPLOY.md](DEPLOY.md) §5:

- [x] Homepage + shop + product detail
- [x] Add to bag → Paystack test checkout → order confirmed
- [x] `/privacy` and `/returns` from footer
- [x] Contact + custom order forms (Formspree inbox)
- [ ] Sanity publish → live site updates (confirm webhook in step 1)

## Blocked on client / Paystack

- [ ] Formspree: client verifies email → developer sets Workflow → Email on both forms
- [ ] Paystack: compliance approved → live key in Vercel ([DEPLOY.md](DEPLOY.md) §1c)
