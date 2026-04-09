# SEO Session Referans Dosyası

> Bu dosya, development session'da yapılan Blog + pSEO altyapısının özetidir.
> SEO session'da bu dosyaya bakarak devam edilecek.
> Oluşturulma: 2026-04-08

---

## TAMAMLANAN (Deploy-ready)

### Blog Altyapısı
- **MDX desteği:** `next-mdx-remote` + `gray-matter` + `reading-time`
- **Lib:** `src/lib/blog.ts` (getAllPosts, getPostBySlug, getPostsByCategory, getPostsBySector)
- **Kategoriler:** `src/lib/blog-categories.ts` (ai-donusum, sektorel, growt-method, basari-hikayeleri)
- **Componentler:** `src/components/blog/` (BlogCard, BlogCTA, CategoryTabs, RelatedPosts)
- **Sayfalar:**
  - `/blog` — listing (featured + grid + kategori tabları)
  - `/blog/[slug]` — yazı detay (sidebar CTA + ilgili yazılar)
  - `/blog/kategori/[kategori]` — kategori filtreleme (4 kategori)

### 6 Blog Yazısı (content/blog/)
1. `yapay-zeka-kullanmamak-isine-ne-kadara-mal-oluyor.mdx` — ai-donusum, FEATURED
2. `saglik-profesyonelleri-icin-yapay-zeka.mdx` — sektorel, sectorRef: saglik
3. `growt-method-nedir.mdx` — growt-method
4. `avukatlar-icin-yapay-zeka.mdx` — sektorel, sectorRef: hukuk
5. `youtube-yapay-zeka-vs-yapilandirilmis-program.mdx` — ai-donusum
6. `guzellik-sektorunde-yapay-zeka.mdx` — sektorel, sectorRef: guzellik

### 12 Sektör Sayfası
- **Data:** `src/data/sectors.ts` — 12 sektör (saglik, hukuk, guzellik, emlak, e-ticaret, dis-hekimligi, muhasebe, eczacilik, turizm, mimarlik, egitim, fitness)
- **Her sektörde:** Hero + 3 Problem + 3 AI Senaryo (before/after) + GROWT kısa + İlgili blog + CTA
- **Sayfa:** `src/app/sektor/[slug]/page.tsx` — SSG ile 12 statik sayfa

### SEO Altyapı
- **Sitemap:** `src/app/sitemap.ts` — otomatik (statik + blog + sektör)
- **robots.txt:** `public/robots.txt`
- **Metadata:** Her sayfada seoTitle + seoDescription + OG tags

---

## SEO SESSION'DA YAPILACAKLAR

### Faz 2 — Katman 2: Sektör × Kullanım (48 sayfa)
- **Route:** `/sektor/[sektor]/[kullanim]`
- **Template hazır DEĞİL** — oluşturulacak
- **Data şeması:** `src/data/sector-usecases.ts` — oluşturulacak
- **Referans:** BLOG-PSEO-CONTENT-BRIEF.md Section 1B, Katman 2

### Faz 2 — Katman 3: Meslek Sayfaları (30 sayfa)
- **Route:** `/meslek/[meslek]`
- **Template hazır DEĞİL**
- **Data şeması:** `src/data/professions.ts` — oluşturulacak
- **Referans:** BLOG-PSEO-CONTENT-BRIEF.md Section 1B, Katman 3

### Faz 3 — Katman 4: Rehber/Soru (15 sayfa)
- **Route:** `/rehber/[slug]`
- **Template hazır DEĞİL**
- **İçerik:** MDX tabanlı — `/content/rehber/`
- **Referans:** BLOG-PSEO-CONTENT-BRIEF.md Section 1B, Katman 4

### Faz 3 — Katman 5: Karşılaştırma (8 sayfa)
- **Route:** `/karsilastirma/[slug]`
- **Template hazır DEĞİL**
- **İçerik:** MDX tabanlı — `/content/karsilastirma/`
- **Referans:** BLOG-PSEO-CONTENT-BRIEF.md Section 1B, Katman 5

### Faz 4 — Katman 6: Şehir × Sektör (120 sayfa)
- **Route:** `/sehir/[sehir]/[sektor]`
- **Template hazır DEĞİL**
- **Data:** `src/data/cities.ts` — oluşturulacak
- **Referans:** BLOG-PSEO-CONTENT-BRIEF.md Section 1B, Katman 6

### Devam Eden İçerik Üretimi
- Haftalık 1 blog yazısı (FOMO kütüphanesinden)
- Sektör sayfası güncellemeleri (yeni senaryolar)
- Schema markup (Article, Service, FAQ, BreadcrumbList)
- OG image generation
- Internal linking optimizasyonu

---

## DOSYA HARİTASI

```
website/
├── content/
│   └── blog/                   ← 6 MDX yazı (MEVCUT)
│       ├── yapay-zeka-kullanmamak-isine-ne-kadara-mal-oluyor.mdx
│       ├── saglik-profesyonelleri-icin-yapay-zeka.mdx
│       ├── growt-method-nedir.mdx
│       ├── avukatlar-icin-yapay-zeka.mdx
│       ├── youtube-yapay-zeka-vs-yapilandirilmis-program.mdx
│       └── guzellik-sektorunde-yapay-zeka.mdx
│
├── src/
│   ├── app/
│   │   ├── blog/
│   │   │   ├── page.tsx                    ← Blog listing (MEVCUT)
│   │   │   ├── [slug]/page.tsx             ← Yazı detay (MEVCUT)
│   │   │   └── kategori/[kategori]/page.tsx ← Kategori (MEVCUT)
│   │   ├── sektor/
│   │   │   └── [slug]/page.tsx             ← 12 sektör (MEVCUT)
│   │   └── sitemap.ts                      ← Otomatik sitemap (MEVCUT)
│   │
│   ├── components/blog/
│   │   ├── BlogCard.tsx                    ← MEVCUT
│   │   ├── BlogCTA.tsx                     ← MEVCUT
│   │   ├── CategoryTabs.tsx                ← MEVCUT
│   │   └── RelatedPosts.tsx                ← MEVCUT
│   │
│   ├── data/
│   │   └── sectors.ts                      ← 12 sektör verisi (MEVCUT)
│   │
│   └── lib/
│       ├── blog.ts                         ← Server-side blog utils (MEVCUT)
│       └── blog-categories.ts              ← Client-safe categories (MEVCUT)
│
├── public/
│   └── robots.txt                          ← MEVCUT
│
├── BLOG-PSEO-CONTENT-BRIEF.md             ← Tam brief (MEVCUT)
└── SEO-SESSION-REFERENCE.md               ← Bu dosya
```

---

## TOPLAM SAYFA SAYISI

| Katman | Durum | Sayfa |
|--------|-------|-------|
| Blog yazıları | MEVCUT | 6 |
| Blog kategorileri | MEVCUT | 4 |
| Sektör sayfaları | MEVCUT | 12 |
| Sektör × Kullanım | SEO session | 48 |
| Meslek | SEO session | 30 |
| Rehber | SEO session | 15 |
| Karşılaştırma | SEO session | 8 |
| Şehir × Sektör | SEO session | 120 |
| **Toplam** | | **~243** |
| **Deploy ile hazır** | | **22 + sitemap** |
