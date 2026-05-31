# GHL EN Funnel Spec — Quiz (Bireysel + Kurumsal)

**Status:** app-side implemented 2026-05-31 (commit pending). GHL-side pending (REQ-development-email_marketing-en-001).
**Decision (CEO 2026-05-31):** EN funnel = **completely separate** GHL pipelines + workflows + custom fields + tags. **No merge** with TR fields. **Report email stays app-side** (Next.js `conversations/messages` API, same mechanism as TR — NOT migrated to GHL workflow). GHL only owns the **nurture/follow-up** sequence for EN.

---

## 1. What the APP already emits (live in code)

### EN tags (replace the old `lang:eng` colon tag — fully separate from TR triggers)

**Bireysel quiz** — `buildGhlTagsEn` (ghl-mapping.ts):
```
gai_en_lifecycle_lead
gai_en_quiz
gai_en_sector_{sectorKey}        # saglik|hukuk|guzellik|emlak|eticaret|dis|other
gai_en_persona_{personaKey}      # bilmiyorum|dijitale_gecis|optimize
lang_eng
```

**Kurumsal quiz** — `buildGhlTagsEn` (ghl-mapping-kurumsal.ts):
```
gai_en_lifecycle_lead
gai_en_lm_quiz_kurumsal
gai_en_segment_kurumsal
gai_en_sector_{sectorKey}
gai_en_persona_kurumsal_{personaKey}   # baslangic|kesif|uygulama|lider
gai_en_company_size_{sizeKey}          # micro|small|medium|enterprise|unknown
lang_eng
```

**Lead magnet + Rehber submit** — append `lang_eng` (was `lang:eng`).

> TR leads keep the existing `gai_*` / `gai_lm_quiz` tags. EN leads get ONLY `gai_en_*` → they never enter TR workflows.

### Language-agnostic custom fields (EN reuses TR ids, EN-appropriate values) — already sent
| Field | TR id (reused) | EN value |
|---|---|---|
| leadSource | cYwB0lIMu7CBNWNeQurP | `quiz_organic` |
| landingPage | 5fLsVVQnHcFqenrkWltF | `https://growtify.ai/en/test` |
| dailyCommitmentMinutes | tsMaS1TlJoTziy2AcjYe | number |
| quizCompletedAt | CJsTTHm6xcVi7PBzRz17 | ISO date |

Coupon code + expiry + pdf_url are saved separately (language-agnostic, unchanged).

---

## 2. What GHL agent must CREATE (then give IDs back to dev)

### EN-specific custom fields (bireysel) — fill `GHL_FIELD_IDS_EN` in ghl-mapping.ts
App writes EN values into these the moment the id is non-null (until then it SKIPS them — no invalid-id upsert breakage).

| GHL_FIELD_IDS_EN key | Suggested GHL field name | Type | EN values |
|---|---|---|---|
| `professionEn` | GAI - Profession (EN) | TEXT | Individual Professional / Business Owner |
| `sectorEn` | GAI - Sector (EN) | SINGLE_OPTION or TEXT | Healthcare, Law, Beauty & Aesthetics, Real Estate, E-Commerce, Dentistry, Accounting, Pharmacy, Tourism, Architecture, Education, Fitness, Insurance, Restaurant, Veterinary, Other |
| `quizPersonaEn` | GAI - Quiz Persona (EN) | SINGLE_OPTION or TEXT | Curious Observer, Active Experimenter, Practitioner, Transformation Candidate |
| `quizPainLevelEn` | GAI - Pain Level (EN) | SINGLE_OPTION or TEXT | Low, Medium, High |
| `quizGoalEn` | GAI - Goal (EN) | SINGLE_OPTION or TEXT | Open a new revenue stream / Save 10+ hours a week / Attract more clients / Automate repetitive work / Master AI |
| `quizPainAreasEn` | GAI - Pain Areas (EN) | MULTIPLE_OPTIONS | Marketing Processes, Sales Processes, Customer Communication, Operational Automation, Finance & Accounting, Strategy & Analysis, Staff & Employee Tracking, Training & Client Materials |
| `quizHabitsToQuitEn` | GAI - Habits (EN) | MULTIPLE_OPTIONS | I don't know where to start / I don't have time / My technical knowledge is insufficient / Fear of choosing the wrong tool / The feeling I can't do it alone / No mentor or guide |

> Kurumsal EN fields: same pattern (kurumsal persona EN = Beginner (AI Awareness) / Exploring (AI Experimentation) / Applying (AI Operations) / Leader (AI Transformation)). Dev adds a kurumsal `GHL_FIELD_IDS_EN` map when GHL provisions them.

### EN pipelines + workflows
- New EN pipeline(s) parallel to TR (GAI - Sales / GAI - Kurumsal Satış → EN variants).
- EN nurture/follow-up workflow(s) triggered by `gai_en_quiz` (+ `lang_eng`), using EN merge tags from the EN fields above + the language-agnostic `pdf_url` / coupon fields.
- Register EN workflow codes in WMR (ghl-workflow-governance).

### Report email (NOT GHL's job)
The immediate report email (PDF link + coupon) is sent by the **app** via `conversations/messages` (EN subject + EN HTML + EN persona), gated behind PDF generation + GHL upload success — identical to the working TR flow. GHL does NOT send the report email.

---

## 3. Diagnostic note — "EN mail gelmiyor"
TR report email delivers fine (same conversations channel). EN HTML template builds without throw (verified). Definitive check = Vercel function log after an EN test lead: `[quiz/bg] email=true/false id=...`. If `email=false` → GHL conversations rejected (check EN-lead specifics); if the `[quiz/bg]` lines are absent → PDF/upload chain broke before email.

---

## References
- App code: `src/app/[locale]/test/lib/ghl-mapping.ts` (buildGhlTagsEn, buildGhlCustomFieldsEn, GHL_FIELD_IDS_EN), `ghl-mapping-kurumsal.ts`, `ghl-client.ts` (upsertQuizContact locale branch)
- REQ: REQ-development-email_marketing-en-001
- Decision: CEO 2026-05-31 — separate EN fields/tags, report stays app-side
