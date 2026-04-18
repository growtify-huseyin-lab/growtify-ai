# Launch Indexing Brief — Dev Session

**Date:** 2026-04-17
**From:** PM Manager Session
**To:** Dev Session
**Priority:** P0 (launch blocker)

## Context
Domain `growtify.ai` is LIVE on Vercel (A: 216.198.79.1, SSL active, HTTP 200). But site is blocked from search indexing via:
1. `<meta name="robots" content="noindex, nofollow">` in layout.tsx
2. `robots.txt` has `Disallow: /` for all user agents

Both need to be lifted for launch. Also GA4/GTM needs to be added (pending user's GA4 property ID).

## Tasks

### Task 1 — Remove Noindex Meta (P0)
File: `website/src/app/layout.tsx`

Find:
```ts
robots: {
  index: false,
  follow: false,
  googleBot: { index: false, follow: false },
},
```

Replace:
```ts
robots: {
  index: true,
  follow: true,
  googleBot: { index: true, follow: true },
},
```

**DO NOT TOUCH** these (kasıtlı noindex):
- `src/app/test/layout.tsx` (quiz — zaten noindex)
- `src/app/test/kurumsal/layout.tsx` (kurumsal quiz — zaten noindex)
- `src/app/lead/[slug]/page.tsx` (lead magnet — zaten noindex)

### Task 2 — Update robots.txt (P0)
File: `website/public/robots.txt` veya `website/src/app/robots.ts`

Önce kontrol: hangi dosya? Current live robots.txt header says:
```
# NOINDEX — Site henüz public değil. İçerik kontrolü tamamlandığında açılacak.
User-agent: *
Disallow: /
```

Replace with launch-ready version:
```
User-agent: *
Allow: /
Disallow: /test
Disallow: /test/kurumsal
Disallow: /lead/
Disallow: /api/

Sitemap: https://growtify.ai/sitemap.xml
```

### Task 3 — Commit + Deploy
```bash
git add website/src/app/layout.tsx website/public/robots.txt
git commit -m "feat: enable indexing for launch (noindex + robots.txt)"
git push
```
Vercel auto-deploy ~2 dakika.

### Task 4 — Verify (post-deploy)
```bash
curl -s https://growtify.ai | grep -o '<meta name="robots"[^>]*>'
# Should show: content="index, follow"

curl -s https://growtify.ai/robots.txt
# Should show: Allow: /
```

### Task 5 (OPTIONAL — waits on user) — GA4/GTM
User needs to provide GA4 Measurement ID (G-XXXXXXXXXX) and/or GTM Container ID (GTM-XXXXXXX). Add to `layout.tsx` metadata or via Next.js Script component. Skip this if ID not provided yet.

## Done When
- Noindex removed from layout.tsx ✅
- robots.txt allows indexing for public pages ✅
- Git commit + Vercel deploy ✅
- Live curl verify shows `index, follow` + `Allow: /` ✅
- PM Manager notified for registry update ✅

## PM Manager Follow-up
After dev session confirms done, PM Manager will:
1. Run live verify (dig + curl)
2. Update `project_launch_status_0417.md` memory
3. Submit sitemap to Google Search Console (separate task, needs GSC verification)
