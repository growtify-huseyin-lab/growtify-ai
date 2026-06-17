# G1 / DeepGap — AI Olgunluk Profili (engine)

Config-driven web assessment that scores a member's AI maturity across 6
dimensions, entered from a GoHighLevel (GHL) lesson via a signed deep-link, with
results pushed back to the GHL contact.

Tracks: `REQ-creative-development-g1-engine-001`. Status: **foundation built on
branch `feat/g1-deepgap-engine` — NOT deployed to prod.** CTO Class B (new auth
scheme + GHL integration) → review before merge to `main`.

## Flow

```
[GHL lesson] --(?t=signed)--> growtify.ai/g1 --(answers)--> /api/g1/submit
     ^                                                            |
     |________ "Derse Dön" (ret) <----- result + GHL writeback ___|
```

## Identity bridge (Soru 1)

GHL can inject `{{contact.id}}` but can't HMAC at template time, so we mint the
token server-side and store it on the contact:

1. GHL **workflow** (trigger: course/G-level access granted) → **Webhook** action:
   `POST https://growtify.ai/api/g1/mint`
   header `x-g1-mint-secret: <G1_MINT_SECRET>`
   body `{ "contactId":"{{contact.id}}", "email":"{{contact.email}}", "name":"{{contact.first_name}}", "locationId":"{{location.id}}", "returnUrl":"<lesson URL>" }`
2. Response `{ token }` → workflow **Update Contact Field** → custom field `g1_token`.
3. Lesson link: `https://growtify.ai/g1?t={{contact.g1_token}}` (optional `&sector=<slug>`).
4. `/g1` verifies the HMAC + expiry server-side → trusts `contactId`.

Token = `base64url(payload).base64url(HMAC_SHA256(payload, G1_TOKEN_SECRET))`,
payload `{ sub:contactId, email, name, loc, ret, iat, exp }`, default TTL 30d.
Plain `?contact_id=` is NOT used (spoofable → would let anyone write to any contact).

## Identity bridge — PRIMARY: Firebase portal token (in-lesson, no email)

The GHL lesson player does NOT render per-contact merge fields, so the token can't
be baked into the lesson link. Instead we use the portal's own login: the GHL
Client Portal authenticates members with **Firebase Auth** (project
`highlevel-backend`), so every logged-in member's browser holds a **Google-signed
Firebase ID token**. We tap it:

1. The lesson contains a **static** link → `https://growtify.ai/g1` (no token, no merge field).
2. `public/portal/g1-link.js` (loaded by `community-i18n.js`, already injected in the
   portal) finds that link, reads the member's live Firebase ID token from the
   portal session, and rewrites the href to
   `https://growtify.ai/g1?ft=<idToken>&ret=<lesson URL>&name=<first name>`.
3. `/g1` verifies the Firebase token server-side against Google's public keys
   (`src/lib/g1/firebase-verify.ts`, `iss=https://securetoken.google.com/highlevel-backend`,
   `aud=highlevel-backend`) → trusted member id (`sub`) → issues our own short-lived
   HMAC session token for `/api/g1/submit`.

Secure (token is Google-signed, can't be forged), in-lesson (single click), no email.
The HMAC `?t=` deep-link (mint workflow) remains as a fallback / non-portal channel.

> ⚠️ **To confirm with a real member account:** the Firebase token `sub` for a course
> member must equal their GHL **contactId** (for the admin account it was a GHL user id).
> If members' `sub` ≠ contactId, derive the contactId via email lookup in `/g1` before
> minting the session token. Verify during the first real-member test.

## Writeback (Soru: sonuç push)

`/api/g1/submit` verifies the token, scores, then `PUT /contacts/{contactId}` with
the G1 custom fields + adds tag `g1_completed` (so a GHL workflow can unlock the
next lesson / send an email). Writeback is best-effort — never blocks the result.

## GHL custom fields — CREATED + wired (2026-06-17)

ghl-specialist created these in location `e8ZRRmOybS08x5L6qgsS`; real ids are wired
into `src/lib/g1/ghl-g1.ts` (`G1_FIELD_IDS`). Writeback is active once the env
secrets are set. (Note: GHL doubles underscores in merge keys → `{{contact.g1__overall_score}}`.)

| field key (in code) | GHL field | type |
|---|---|---|
| `overall` | `g1_overall` | number |
| `deployment` | `g1_deployment` | number |
| `systems` | `g1_systems` | number |
| `data` | `g1_data` | number |
| `outcomes` | `g1_outcomes` | number |
| `people` | `g1_people` | number |
| `governance` | `g1_governance` | number |
| `archetype` | `g1_archetype` | text |
| `gapSummary` | `g1_gap_summary` | text/multiline |
| `completedAt` | `g1_completed_at` | date/text |

Plus the entry field: `g1_token` (text) — holds the minted token.

## Env vars (Vercel)

| var | purpose |
|---|---|
| `G1_TOKEN_SECRET` | HMAC secret for our own session token sign/verify (server-only) |
| `G1_MINT_SECRET` | shared secret guarding `/api/g1/mint` (HMAC fallback path only) |
| `GHL_FIREBASE_PROJECT` | optional — Firebase project for portal token verify (default `highlevel-backend`) |
| `GHL_API_TOKEN`, `GHL_LOCATION_ID` | already set — reused for writeback |

## Endpoints

- `POST /api/g1/mint` — mint token (GHL workflow only; header-guarded).
- `GET /g1?t=...&sector=...` — assessment page (token verified server-side).
- `POST /api/g1/submit` — `{ token, answers, sector?, locale? }` → score + writeback.

## Config (sector-driven)

`src/data/g1/default.json` is the seed (6 dims × 3 Q, **v1-draft** — Creative/Strategy
to refine questions/benchmarks/narratives). Per-sector overrides merge over default
(`src/lib/g1/config.ts`). Adding a sector today = drop `{sector}.json` + one import
line; fully zero-dev runtime loading from `public/g1/{sector}.json` is the planned
follow-up.

## GHL setup status (ghl-specialist, 2026-06-17)

- ✅ **12 custom fields created** in location e8ZRRmOybS08x5L6qgsS; real ids wired into `ghl-g1.ts`. (Note: GHL doubles underscores in merge keys → `{{contact.g1__token}}`.)
- ⏳ **Workflows specced + WMR-registered** (`WG1-Mint`, `WG1-Complete`) — GHL has no workflow-create API, so they're built in the UI from the spec.
- 🔴 **Merge-field render = FAIL.** The GHL lesson player does NOT render contact custom field merge tags, so `?t={{contact.g1__token}}` placed in lesson content renders literally. **Secure launch path = deliver the link by email** (the GHL email builder DOES render the tag; the token stays HMAC-signed). A redirect-by-raw-`{{contact.id}}` endpoint was considered but is **spoofable for writeback** → rejected. Lesson shows static "e-postanı kontrol et" text.
- Locked decisions (CEO 2026-06-17): `returnUrl` = the G-lesson URL; **retake = yes** (G-start + T-end before/after → needs D1 attempt history + delta UI); **TR+EN** bilingual; future `/test` kurumsal integration.

## Open items before go-live

- [ ] **Content lock** (questions/benchmarks/narratives, TR+EN) — Creative.
- [x] GHL fields created + ids wired — ghl-specialist + dev.
- [ ] **GHL mint + completion workflows built in UI** (from spec) — ghl-specialist.
- [ ] **Email-delivery link element** added to WG1-Mint (secure path) + lesson "check email" copy — ghl-specialist + CEO copy.
- [ ] **Env secrets** — env-cto: Vercel `G1_TOKEN_SECRET` + `G1_MINT_SECRET`, and a matching GHL Custom Value `g1_mint_secret`.
- [ ] **CEO inputs**: G-lesson `returnUrl`, confirm G = GROWT L1, approve email delivery + TR copy, WG1-Complete opp stage.
- [ ] **Retake before/after**: D1 attempt history + G→T delta on result UI — dev.
- [ ] **EN locale** config + loader wiring (when Creative delivers `default.en.json`) — dev.
- [ ] Result UI polish (radar chart) — dev.
- [ ] ADR published to cto-briefs/decisions (Class B sign-off) — dev/CTO.
