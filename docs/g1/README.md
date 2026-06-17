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

## Writeback (Soru: sonuç push)

`/api/g1/submit` verifies the token, scores, then `PUT /contacts/{contactId}` with
the G1 custom fields + adds tag `g1_completed` (so a GHL workflow can unlock the
next lesson / send an email). Writeback is best-effort — never blocks the result.

## GHL custom fields to create  → TODO(ghl-specialist)

Create these on the contact, then put the real field ids in
`src/lib/g1/ghl-g1.ts` (`G1_FIELD_IDS`, replace the `REPLACE_*` placeholders).
Until then writeback no-ops gracefully (result still shows).

| field key (in code) | suggested GHL field | type |
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
| `G1_TOKEN_SECRET` | HMAC secret for sign/verify (server-only) |
| `G1_MINT_SECRET` | shared secret guarding `/api/g1/mint` (matches GHL webhook header) |
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

## Open items before go-live

- [ ] **Dimension framework lock** (besuper-mirror vs GROWT-native) — CMO/CSO/Strategy.
- [ ] **Questions/benchmarks/narratives** content lock — Creative/Strategy.
- [ ] **GHL fields created + ids wired** — ghl-specialist.
- [ ] **GHL mint + completion workflows built** — ghl-specialist.
- [ ] **Env secrets set in Vercel** — env-cto.
- [ ] **Confirm GHL lesson renders `{{contact.g1_token}}`** merge field (fallback: opaque-nonce or redirect page).
- [ ] Result UI polish (radar chart, EN locale, retake/idempotency in D1).
- [ ] ADR published to cto-briefs/decisions (Class B sign-off).
