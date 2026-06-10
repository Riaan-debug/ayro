# AYRO — Developer setup (new machine)

Use this when cloning the repo on another computer. Secrets are **not** in Git — copy them from Vercel, Paystack, or your password manager.

**Repo:** https://github.com/Riaan-debug/ayro  
**Live site:** https://cole-roan.vercel.app  
**Sanity studio:** https://ayro.sanity.studio (project `xilnix6x`)

---

## 1. Clone and install

```bash
git clone https://github.com/Riaan-debug/ayro.git
cd ayro
npm install
cd sanity
npm install
cd ..
```

---

## 2. Environment files

### Root — `.env.local`

Copy from [`.env.example`](../.env.example) and fill in (match Vercel Production):

| Variable | Notes |
|----------|--------|
| `VITE_SANITY_PROJECT_ID` | `xilnix6x` |
| `VITE_SANITY_DATASET` | `production` |
| `VITE_FORMSPREE_CONTACT_ID` | `xbdbvyzq` |
| `VITE_FORMSPREE_CUSTOM_ORDER_ID` | `xjgzqraz` |
| `PAYSTACK_SECRET_KEY` | `sk_test_...` from Paystack (server only, no `VITE_` prefix) |
| `VITE_SUPABASE_URL` | Supabase project URL (optional — enables accounts UI) |
| `VITE_SUPABASE_ANON_KEY` | Supabase anon key |
| `SUPABASE_URL` | Same as project URL (server API routes) |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role — server only, never `VITE_` |

Optional: `SITE_URL` for API callbacks if not using `vercel dev` host headers.

### Sanity — `sanity/.env`

Copy from [`sanity/.env.example`](../sanity/.env.example):

```
SANITY_STUDIO_PROJECT_ID=xilnix6x
SANITY_STUDIO_DATASET=production
```

Run `npx sanity login` once on the new machine before `npm run deploy` in `sanity/`.

---

## 3. Run locally

| Command | URL | Use for |
|---------|-----|---------|
| `npm run dev` | http://localhost:5173 | UI only — **checkout API will 404** |
| `npm run dev:api` | http://localhost:3056 | Full app + Paystack routes |
| `npm run studio` | http://localhost:3333 | Sanity studio (from `sanity/`) |

**Paystack checkout:** always use `npm run dev:api` and open **:3056**, not :5173.

Replay logo intro: `http://localhost:3056/?intro=1` or `resetAyroIntro()` in the browser console.

Build check: `npm run build`

---

## 4. Deploy and services

| Service | Where to manage |
|---------|-----------------|
| Frontend + API | [Vercel](https://vercel.com) — project linked to `Riaan-debug/ayro` |
| CMS | [sanity.io/manage](https://www.sanity.io/manage) → project `xilnix6x` |
| Forms | [formspree.io](https://formspree.io) — forms Contact + Custom orders |
| Payments | [Paystack dashboard](https://dashboard.paystack.com) — test until compliance approved |

Studio deploy (after schema changes): stop dev servers, then `cd sanity && npm run deploy` (hostname **`ayro`**).

Run `supabase/schema.sql` in Supabase SQL editor when enabling accounts.

Full production checklist: [DEPLOY.md](DEPLOY.md)  
Client handoff: [HANDOFF.md](HANDOFF.md)  
Roadmap: [ROADMAP.md](ROADMAP.md)

---

## 5. Project status (waiting on client / Paystack)

**Code complete for launch.** Remaining ops:

1. **Formspree** — Client verifies linked email (`janaejayden86@gmail.com`); then set **Workflow → Email** on both forms to their address. See [CLIENT.md — Formspree](CLIENT.md#contact--custom-order-emails-formspree).
2. **Paystack** — Business activation **PENDING** → then live `sk_live_...` in Vercel ([DEPLOY.md](DEPLOY.md) §1c) + one live payment test.
3. **Optional verify** — Sanity webhook → Vercel rebuild; smoke test checklist in [HANDOFF.md](HANDOFF.md).

**Phase 3** — Auth (login/signup/account) is built; enabled when Supabase env vars are set. Order history / webhooks still future work. See [ROADMAP.md](ROADMAP.md).

---

## 6. Key paths

| Area | Path |
|------|------|
| Pages | `src/pages/` |
| Cart | `src/context/CartContext.tsx` |
| Paystack API | `api/paystack/initialize.ts`, `verify.ts` |
| Local API dev | `scripts/dev-api.mjs` |
| Sanity schemas | `sanity/schemas/` |
| Vercel config | `vercel.json` |

---

## 7. Portfolio / case study

Shot list and write-up: [PORTFOLIO.md](PORTFOLIO.md)
