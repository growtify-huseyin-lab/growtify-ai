# Growtify.ai — Blog + Programmatic SEO Brief (Development Session İçin)

> Onay: Hüseyin — 2026-04-08
> Versiyon: 1.0
> Kapsam: Blog altyapısı + sektör sayfaları (pSEO) + ilk içerikler

---

## 1. GENEL MİMARİ

```
growtify.ai/
│
├── /blog                                    → Blog ana sayfa (listing)
│   ├── /blog/[slug]                         → Bireysel blog yazısı
│   └── /blog/kategori/[kategori]            → Kategori filtreleme
│
├── /sektor                                  → Sektör hub sayfası
│   └── /sektor/[sektor]                     → Katman 1: Sektör landing (12 sayfa)
│       └── /sektor/[sektor]/[kullanim]      → Katman 2: Sektör × Kullanım alanı (36-60 sayfa)
│
├── /meslek                                  → Meslek hub sayfası
│   └── /meslek/[meslek]                     → Katman 3: Meslek bazlı landing (20-30 sayfa)
│
├── /rehber                                  → Rehber/soru hub sayfası
│   └── /rehber/[slug]                       → Katman 4: Soru/rehber bazlı (10-20 sayfa)
│
├── /karsilastirma                           → Karşılaştırma hub
│   └── /karsilastirma/[slug]                → Katman 5: AI araç karşılaştırma (5-10 sayfa)
│
├── /sehir                                   → Şehir hub sayfası
│   └── /sehir/[sehir]                       → Şehir landing
│       └── /sehir/[sehir]/[sektor]          → Katman 6: Şehir × Sektör (60-120 sayfa)
│
└── /test                                    → Quiz (mevcut)
```

### Toplam pSEO sayfa kapasitesi

| Katman | URL yapısı | Sayfa sayısı | Örnek |
|--------|-----------|-------------|-------|
| 1 — Sektör | `/sektor/[sektor]` | 12 | /sektor/saglik |
| 2 — Sektör × Kullanım | `/sektor/[sektor]/[kullanim]` | 36-60 | /sektor/saglik/danisan-takibi |
| 3 — Meslek | `/meslek/[meslek]` | 20-30 | /meslek/diyetisyen |
| 4 — Rehber/Soru | `/rehber/[slug]` | 10-20 | /rehber/yapay-zeka-ile-nasil-baslarim |
| 5 — Karşılaştırma | `/karsilastirma/[slug]` | 5-10 | /karsilastirma/chatgpt-vs-claude |
| 6 — Şehir × Sektör | `/sehir/[sehir]/[sektor]` | 60-120 | /sehir/istanbul/saglik |
| Blog | `/blog/[slug]` | ∞ (sürekli büyüyen) | /blog/yapay-zeka-kullanmamak-maliyeti |
| **Toplam pSEO** | | **143-252 sayfa** (blog hariç) |

### Uygulama öncelik sırası

| Faz | Ne | Deploy ile mi? |
|-----|-----|---------------|
| **Deploy** | Katman 1 (12 sektör) + Blog altyapısı + 6 blog yazısı | EVET |
| **Faz 2** | Katman 2 (sektör × kullanım — pilot 3 sektör) + Katman 3 (pilot 10 meslek) | SEO session'da |
| **Faz 3** | Katman 4 (rehberler) + Katman 5 (karşılaştırmalar) | SEO session'da |
| **Faz 4** | Katman 6 (şehir × sektör — pilot 5 şehir × 3 sektör) | SEO session'da |
| **Faz 5** | Kalan tüm katmanlar genişletme | İçerik üretim döngüsünde |

---

## 1B. pSEO KATMAN DETAYLARI (Tüm altyapı — içerikler SEO session'da doldurulacak)

### Katman 1 — Sektör Sayfaları (Deploy ile)

Zaten section 3'te detaylı planlandı. 12 sayfa, tek template, farklı data.

### Katman 2 — Sektör × Kullanım Alanı

**URL:** `/sektor/[sektor]/[kullanim]`
**Amaç:** Long-tail keyword yakalama — "diyetisyen danışan takip yapay zeka"

**Her sektör için 3-5 kullanım alanı sayfası:**

| Sektör | Kullanım alanları (slug) |
|--------|------------------------|
| saglik | danisan-takibi, beslenme-plani-olusturma, icerik-uretimi, randevu-yonetimi, hasta-egitimi |
| hukuk | sozlesme-analizi, ictihat-arastirmasi, muvekkil-yonetimi, dilekce-hazirlama |
| guzellik | instagram-yonetimi, randevu-otomasyonu, musteri-sadakati, kampanya-planlama |
| emlak | ilan-yazimi, musteri-eslestirme, piyasa-analizi, portfolyo-yonetimi |
| e-ticaret | urun-aciklamasi, musteri-hizmeti, reklam-optimizasyonu, stok-yonetimi |
| dis-hekimligi | dental-turizm, hasta-iletisimi, tedavi-plani, itibar-yonetimi |
| muhasebe | belge-isleme, mevzuat-takibi, musteri-raporlama, vergi-planlama |
| eczacilik | stok-tahmini, e-eczane, musteri-sadakati, urun-bilgilendirme |
| turizm | rezervasyon-yonetimi, tur-paketleme, sezon-analizi, cok-dilli-iletisim |
| mimarlik | konsept-render, musteri-sunum, proje-yonetimi |
| egitim | materyal-uretimi, katilimci-takibi, program-tasarimi |
| fitness | program-olusturma, musteri-takibi, icerik-uretimi |

**Toplam:** ~48 sayfa

**Şablon yapısı (her sayfa için):**
```
1. Hero — "{meslekAdi} için {kullanimAlani} — Yapay Zeka ile"
2. Problem — Bu işi manuel yapmanın 3 sorunu
3. AI Çözüm — Agentic senaryo (FOMO kütüphanesinden)
4. Adım adım — "Nasıl yapılır" kısa özet
5. CTA — Programa Katıl + AI Olgunluk Testi
```

**Data yapısı:**
```typescript
// src/data/sector-usecases.ts
export const SECTOR_USECASES = {
  saglik: {
    "danisan-takibi": {
      title: "Danışan Takibi",
      seoTitle: "Diyetisyen Danışan Takibi İçin Yapay Zeka | Growtify.ai",
      seoDescription: "...",
      heroSubtitle: "...",
      problems: [...],
      scenario: { ... }, // FOMO kütüphanesinden
    },
    "beslenme-plani-olusturma": { ... },
  },
  hukuk: { ... },
};
```

**Teknik:** `src/app/sektor/[sektor]/[kullanim]/page.tsx` — dynamic route, generateStaticParams ile SSG

### Katman 3 — Meslek Sayfaları

**URL:** `/meslek/[meslek]`
**Amaç:** Doğrudan meslek adıyla arama — "diyetisyen yapay zeka", "avukat AI"

**Sektörden farkı:** Sektör = genel alan (sağlık), meslek = spesifik kişi (diyetisyen). Bir sektörde birden fazla meslek olabilir.

| Sektör | Meslekler (slug) |
|--------|-----------------|
| Sağlık | diyetisyen, psikolog, fizyoterapist, yasam-kocu, veteriner |
| Hukuk | avukat, noter, arabulucu |
| Güzellik | kuafor, estetisyen, cilt-bakim-uzmani |
| Emlak | emlak-danismani |
| E-Ticaret | e-ticaret-satici, dropshipper |
| Diş | dis-hekimi |
| Muhasebe | mali-musavir, smmm |
| Eczacılık | eczaci |
| Turizm | seyahat-acente, tur-rehberi, otel-yoneticisi |
| Mimarlık | mimar, ic-mimar |
| Eğitim | ogretmen, egitim-danismani, online-koc |
| Fitness | personal-trainer, pilates-egitmeni, yoga-ogretmeni |
| Diğer | freelance-grafiker, freelance-yazilimci, ajans-sahibi, danismani |

**Toplam:** ~30 sayfa

**Şablon yapısı:**
```
1. Hero — "{meslekAdi} — Yapay Zeka ile İşini Büyüt"
2. "Bu senin günlük hayatın" — mesleğe özel pain noktaları (3 madde)
3. "Yapay zeka ile nasıl değişir?" — 3 agentic senaryo (FOMO kütüphanesinden)
4. "Senin gibi {meslekAdi}'lar ne yapıyor?" — FOMO vaka (varsa gerçek, yoksa senaryo)
5. GROWT Method kısa — "Bu meslek için GROWT nasıl çalışıyor"
6. İlgili blog yazıları
7. CTA — Programa Katıl + AI Olgunluk Testi
```

**Data yapısı:**
```typescript
// src/data/professions.ts
export const PROFESSIONS = {
  diyetisyen: {
    slug: "diyetisyen",
    title: "Diyetisyen",
    sectorRef: "saglik",
    seoTitle: "Diyetisyenler İçin Yapay Zeka | Growtify.ai",
    seoDescription: "Diyetisyen olarak yapay zeka ile danışan kazanımından beslenme planı otomasyonuna — işini büyüt.",
    heroSubtitle: "Beslenme planı yazımından danışan takibine — yapay zeka ile kliniğini büyüt.",
    dailyPains: [...],
    scenarios: [...],
    fomoCase: { ... },
    growtContext: "...",
  },
  avukat: { ... },
  // ... 30 meslek
};
```

**Teknik:** `src/app/meslek/[meslek]/page.tsx` — dynamic route, SSG

### Katman 4 — Rehber/Soru Sayfaları

**URL:** `/rehber/[slug]`
**Amaç:** "Nasıl" ve "Ne" sorularını yakalama — FAQ tipi long-tail

**İlk 15 rehber konusu:**

| slug | Başlık | SEO hedefi |
|------|--------|-----------|
| yapay-zeka-ile-nasil-baslarim | Yapay Zeka ile Nasıl Başlarım? | "yapay zeka nasıl başlanır" |
| yapay-zeka-nedir-basit-anlatim | Yapay Zeka Nedir? Basit Anlatım | "yapay zeka nedir" |
| chatgpt-nedir-nasil-kullanilir | ChatGPT Nedir, Nasıl Kullanılır? | "chatgpt nedir" |
| claude-nedir-nasil-kullanilir | Claude Nedir, Nasıl Kullanılır? | "claude ai nedir" |
| yapay-zeka-kucuk-isletme | Küçük İşletmeler İçin Yapay Zeka | "küçük işletme yapay zeka" |
| yapay-zeka-ucretsiz-araclar | Ücretsiz Yapay Zeka Araçları | "ücretsiz ai araçları" |
| yapay-zeka-icerik-uretimi | Yapay Zeka ile İçerik Üretimi | "ai ile içerik üretme" |
| yapay-zeka-musteri-hizmeti | Yapay Zeka ile Müşteri Hizmeti | "ai müşteri hizmeti" |
| yapay-zeka-otomasyon | Yapay Zeka ile İş Otomasyonu | "ai otomasyon" |
| yapay-zeka-sosyal-medya | Yapay Zeka ile Sosyal Medya Yönetimi | "ai sosyal medya" |
| yapay-zeka-satis | Yapay Zeka ile Satış Artırma | "ai ile satış" |
| yapay-zeka-email-pazarlama | Yapay Zeka ile Email Pazarlama | "ai email marketing" |
| yapay-zeka-randevu-yonetimi | Yapay Zeka ile Randevu Yönetimi | "ai randevu sistemi" |
| yapay-zeka-maliyet-dusurme | Yapay Zeka ile Maliyet Düşürme | "ai maliyet tasarrufu" |
| yapay-zeka-rekabet-avantaji | Yapay Zeka ile Rekabet Avantajı | "ai rekabet avantajı" |

**Şablon yapısı:**
```
1. Hero — "{Soru/Başlık}"
2. Kısa cevap (2-3 paragraf — hemen değer ver)
3. Detaylı açıklama (3-5 bölüm)
4. Pratik örnekler (sektörel, FOMO kütüphanesinden)
5. "Daha fazla öğren" — ilgili rehberler
6. CTA — Programa Katıl + AI Olgunluk Testi
```

**Data yapısı:**
```typescript
// src/data/guides.ts veya /content/rehber/ dizininde MDX
```

**Teknik:** MDX tabanlı (blog ile aynı altyapı) veya data-driven (daha hızlı üretim). Önerim: MDX — çünkü her rehber farklı derinlikte olabilir.

`src/app/rehber/[slug]/page.tsx` — dynamic route

### Katman 5 — Karşılaştırma Sayfaları

**URL:** `/karsilastirma/[slug]`
**Amaç:** "X vs Y" aramalarını yakalama

**İlk 8 karşılaştırma:**

| slug | Başlık | SEO hedefi |
|------|--------|-----------|
| chatgpt-vs-claude | ChatGPT vs Claude — Hangisi Senin İşin İçin? | "chatgpt vs claude" |
| chatgpt-vs-gemini | ChatGPT vs Gemini — Karşılaştırma | "chatgpt vs gemini" |
| yapay-zeka-vs-ajans | Yapay Zeka vs Dijital Ajans — Hangisi Daha İyi? | "ajans mı yapay zeka mı" |
| yapay-zeka-vs-youtube | Yapay Zeka Programı vs YouTube'dan Öğrenmek | "ai kursu mu youtube mu" |
| canva-ai-vs-midjourney | Canva AI vs Midjourney — Görsel Üretim | "canva ai vs midjourney" |
| ucretsiz-vs-ucretli-ai | Ücretsiz vs Ücretli AI Araçları | "ücretsiz ai yeterli mi" |
| kendin-yap-vs-danismanlik | Kendin Yap vs AI Danışmanlık Programı | "ai danışmanlık mı" |
| turkce-ai-araclari | Türkçe Çalışan En İyi AI Araçları | "türkçe yapay zeka araçları" |

**Şablon yapısı:**
```
1. Hero — "{A} vs {B} — Hangisi Senin İçin?"
2. Hızlı özet tablosu (karşılaştırma matrisi)
3. Detaylı karşılaştırma (5-7 kriter)
4. "Ne zaman hangisini seç?" karar rehberi
5. Bizim önerimiz (doğal GROWT bağlantısı)
6. CTA
```

**Data yapısı:** MDX — her karşılaştırma farklı yapıda olabilir.

`src/app/karsilastirma/[slug]/page.tsx` — dynamic route

---

## 1C. TEKNİK ALTYAPI ÖZETİ (Development session'a)

### Oluşturulacak route'lar

| Route | Tip | Sayfa sayısı | Deploy ile mi? |
|-------|-----|-------------|---------------|
| `/blog` | Listing | 1 | EVET |
| `/blog/[slug]` | Dynamic (MDX) | 6 başlangıç | EVET |
| `/blog/kategori/[kategori]` | Dynamic | 4 | EVET |
| `/sektor/[sektor]` | Dynamic (data) | 12 | EVET |
| `/sektor/[sektor]/[kullanim]` | Dynamic (data) | 48 (template hazır, data SEO session'da) | ALTYAPI EVET, data sonra |
| `/meslek/[meslek]` | Dynamic (data) | 30 (template hazır, data SEO session'da) | ALTYAPI EVET, data sonra |
| `/rehber/[slug]` | Dynamic (MDX) | 15 (template hazır, içerik SEO session'da) | ALTYAPI EVET, içerik sonra |
| `/karsilastirma/[slug]` | Dynamic (MDX) | 8 (template hazır, içerik SEO session'da) | ALTYAPI EVET, içerik sonra |

### Oluşturulacak data dosyaları

```
src/data/
├── sectors.ts              → 12 sektör verisi (Deploy ile doldurulacak)
├── sector-usecases.ts      → Sektör × kullanım alanı verisi (şema hazır, data SEO session'da)
├── professions.ts          → 30 meslek verisi (şema hazır, data SEO session'da)
```

### Oluşturulacak içerik dizinleri

```
content/
├── blog/                   → MDX blog yazıları (6 başlangıç deploy ile)
├── rehber/                 → MDX rehber yazıları (şema hazır, içerik SEO session'da)
└── karsilastirma/          → MDX karşılaştırma yazıları (şema hazır, içerik SEO session'da)
```

### Oluşturulacak template component'lar

```
src/components/
├── blog/
│   ├── BlogCard.tsx
│   ├── BlogSidebar.tsx
│   ├── BlogCTA.tsx
│   ├── CategoryTabs.tsx
│   └── RelatedPosts.tsx
├── sectors/
│   ├── SectorHero.tsx
│   ├── SectorProblems.tsx
│   ├── SectorScenarios.tsx
│   ├── SectorGROWT.tsx
│   ├── SectorBlogPosts.tsx
│   └── SectorCTA.tsx
├── professions/
│   ├── ProfessionHero.tsx
│   ├── ProfessionPains.tsx
│   ├── ProfessionScenarios.tsx
│   ├── ProfessionFOMO.tsx
│   └── ProfessionCTA.tsx
├── guides/
│   ├── GuideLayout.tsx
│   └── GuideCTA.tsx
└── comparisons/
    ├── ComparisonLayout.tsx
    ├── ComparisonTable.tsx
    └── ComparisonCTA.tsx
```

### Development session'a özet talimat

**Deploy ile yapılacak:**
1. Blog altyapısı (MDX + routing + listing + kategori) + 6 yazı
2. Sektör sayfası template + routing + 12 sektör data'sı
3. Sektör × kullanım template + routing (data boş — şema hazır)
4. Meslek template + routing (data boş — şema hazır)
5. Rehber template + routing (içerik boş — şema hazır)
6. Karşılaştırma template + routing (içerik boş — şema hazır)
7. SEO altyapısı (sitemap, robots, schema, OG)

**SEO session'da doldurulacak:**
- 48 sektör × kullanım sayfası data'sı
- 30 meslek sayfası data'sı
- 15 rehber içeriği
- 8 karşılaştırma içeriği
- Devam eden blog yazıları

### Katman 6 — Şehir × Sektör Sayfaları

**URL:** `/sehir/[sehir]/[sektor]`
**Amaç:** Lokal SEO — "istanbul diyetisyen yapay zeka", "ankara avukat ai"

**Şehirler (ilk 10):**

| slug | Şehir |
|------|-------|
| istanbul | İstanbul |
| ankara | Ankara |
| izmir | İzmir |
| bursa | Bursa |
| antalya | Antalya |
| adana | Adana |
| konya | Konya |
| gaziantep | Gaziantep |
| kayseri | Kayseri |
| mersin | Mersin |

**Her şehir × 12 sektör = 120 sayfa (tam kapasite)**
**Pilot: 5 şehir × 3 sektör = 15 sayfa**

**Şablon yapısı:**
```
1. Hero — "{sehirAdi}'da {sektorAdi} — Yapay Zeka ile İşini Büyüt"
2. Şehir + sektör bağlamı — "{sehirAdi}'daki {meslekAdi}'lar için yapay zeka fırsatları"
3. 3 agentic senaryo (FOMO kütüphanesinden — sektör bazlı, şehre uyarlanmış)
4. Lokal istatistik (varsa — şehirdeki işletme sayısı, dijitalleşme oranı)
5. CTA — Programa Katıl + AI Olgunluk Testi
```

**Data yapısı:**
```typescript
// src/data/cities.ts
export const CITIES = {
  istanbul: {
    slug: "istanbul",
    name: "İstanbul",
    seoPrefix: "İstanbul'da",
    population: "16M+",
    businessContext: "Türkiye'nin iş merkezi — rekabet en yoğun şehir.",
  },
  ankara: { ... },
  // ... 10 şehir
};
```

Sayfa data'sı şehir + sektör kombinasyonundan otomatik üretilir — ayrı data dosyası gerekmez. Template şehir ve sektör data'sını birleştirip render eder.

**Teknik:** `src/app/sehir/[sehir]/[sektor]/page.tsx` — dynamic route, generateStaticParams ile SSG

**Ek component'lar:**
```
src/components/cities/
├── CityHero.tsx
├── CitySectorContext.tsx
├── CityScenarios.tsx
└── CityCTA.tsx
```

**Hub sayfası:** `/sehir/[sehir]` — o şehirdeki tüm sektörleri listeler
**Üst hub:** `/sehir` — tüm şehirleri listeler

---

### Güncellenmiş route tablosu (Development session'a)

| Route | Tip | Sayfa sayısı | Deploy ile mi? |
|-------|-----|-------------|---------------|
| `/blog` | Listing | 1 | EVET |
| `/blog/[slug]` | Dynamic (MDX) | 6 başlangıç | EVET |
| `/blog/kategori/[kategori]` | Dynamic | 4 | EVET |
| `/sektor/[sektor]` | Dynamic (data) | 12 | EVET |
| `/sektor/[sektor]/[kullanim]` | Dynamic (data) | 48 | ALTYAPI EVET, data sonra |
| `/meslek/[meslek]` | Dynamic (data) | 30 | ALTYAPI EVET, data sonra |
| `/rehber/[slug]` | Dynamic (MDX) | 15 | ALTYAPI EVET, içerik sonra |
| `/karsilastirma/[slug]` | Dynamic (MDX) | 8 | ALTYAPI EVET, içerik sonra |
| `/sehir/[sehir]` | Dynamic (data) | 10 | ALTYAPI EVET, data sonra |
| `/sehir/[sehir]/[sektor]` | Dynamic (data) | 120 | ALTYAPI EVET, data sonra |
| **Toplam** | | **~254 sayfa** | |

### Güncellenmiş dosya yapısı ekleri

```
src/
├── app/
│   └── sehir/
│       ├── page.tsx                         (şehir hub)
│       └── [sehir]/
│           ├── page.tsx                     (şehir landing)
│           └── [sektor]/
│               └── page.tsx                 (şehir × sektör)
│
├── components/
│   └── cities/
│       ├── CityHero.tsx
│       ├── CitySectorContext.tsx
│       ├── CityScenarios.tsx
│       └── CityCTA.tsx
│
└── data/
    └── cities.ts                            (10 şehir verisi)
```

---

## 2. BLOG ALTYAPISI

### 2.1 Teknik yapı

**İçerik yönetimi:** MDX dosyaları — `/content/blog/` dizininde
- Her yazı bir `.mdx` dosyası
- Frontmatter: title, slug, excerpt, category, author, date, readTime, seoTitle, seoDescription, tags, featured, sectorRef
- Next.js dynamic route: `src/app/blog/[slug]/page.tsx`
- Statik generation (SSG) — build time'da oluşturulur

**Frontmatter şeması:**
```yaml
---
title: "Yapay Zeka Kullanmamak İşine Ne Kadara Mal Oluyor?"
slug: "yapay-zeka-kullanmamak-isine-ne-kadara-mal-oluyor"
excerpt: "Türkiye'deki işletmelerin %92.5'i yapay zeka kullanmıyor. Peki bu beklemenin bedeli ne?"
category: "ai-donusum"
author: "Growtify AI"
date: "2026-04-15"
readTime: "5 dk"
seoTitle: "Yapay Zeka Kullanmamak İşine Ne Kadara Mal Oluyor? | Growtify.ai"
seoDescription: "İşletmelerin %92.5'i AI kullanmıyor. Her ay kaybedilen zaman, para ve müşteri — rakamlarla analiz."
tags: ["yapay-zeka", "maliyet-analizi", "profesyonel"]
featured: true
sectorRef: null
---
```

### 2.2 Blog ana sayfa (/blog)

**Mevcut:** 6 placeholder yazı, "yakın zamanda" notu
**Yeni:**

| Alan | İçerik |
|------|--------|
| H1 | "Blog" |
| Alt metin | "Yapay zeka ile iş büyütme rehberleri, sektöre özel içerikler ve GROWT Method." |
| Layout | Üstte 1 featured post (büyük kart) + altında grid (2-3 sütun) |
| Filtreleme | Kategori tabları: Tümü / AI Dönüşüm / Sektörel / GROWT Method / Başarı Hikayeleri |
| Pagination | Sayfa başına 9 yazı |

### 2.3 Blog yazı sayfası (/blog/[slug])

| Alan | İçerik |
|------|--------|
| Layout | Sol: makale (max-w-prose), Sağ: sidebar (sticky) |
| Sidebar | CTA kartı ("Programa Katıl" veya "AI Olgunluk Testi") + ilgili yazılar (3) |
| Makale altı | Yazar bilgisi + CTA banner + ilgili yazılar grid |
| SEO | Otomatik structured data (Article schema) + OG image + canonical |
| Paylaşım | LinkedIn + Twitter + WhatsApp paylaş butonları |

### 2.4 Kategoriler

| Kategori slug | Başlık | Açıklama |
|--------------|--------|----------|
| ai-donusum | AI Dönüşüm | Genel yapay zeka ile iş büyütme içerikleri |
| sektorel | Sektörel | Mesleğe özel yapay zeka kullanım rehberleri |
| growt-method | GROWT Method | Programın yapısı, fazları, yaklaşımı hakkında |
| basari-hikayeleri | Başarı Hikayeleri | Gerçek veya senaryo bazlı vaka çalışmaları |

---

## 3. PROGRAMMATIC SEO — SEKTÖR SAYFALARI

### 3.1 Strateji

Her sektör için tek bir kapsamlı landing page. Amaç:
- "[meslek] için yapay zeka" aramasını yakalamak
- Sektöre özel değer vaadini göstermek
- Quiz'e veya programa yönlendirmek
- Blog yazılarıyla cross-link oluşturmak

**Hedef keyword'ler (her sektör için):**
- "[meslek] yapay zeka" (ana)
- "[meslek] için AI" 
- "[meslek] dijital dönüşüm"
- "[meslek] AI araçları"
- "[meslek] işini büyütmek"

### 3.2 Sektör sayfası şablonu (/sektor/[slug])

Her sektör sayfası **aynı yapı**, farklı içerikle doldurulur:

```
1. Hero (sektöre özel)
2. Problem Section (sektörün 3 büyük problemi)
3. AI Kullanım Senaryoları (3 agentic örnek — FOMO kütüphanesinden)
4. GROWT Method (kısa — "bu sektörde nasıl çalışıyor")
5. Rakamlar (sektöre özel veya genel)
6. İlgili Blog Yazıları (bu sektöre ait)
7. CTA (Programa Katıl + AI Olgunluk Testi)
```

### 3.3 Sektör sayfası şablon detayı

**Section 1 — Hero:**

| Alan | Şablon |
|------|--------|
| Badge | "{sektorAdi} İçin Yapay Zeka" |
| H1 | "{sektorAdi} — Yapay Zeka ile İşini Büyüt" |
| Alt metin | "{sektoreOzelAltMetin}" |
| CTA 1 | "Programa Katıl" → ödeme linki |
| CTA 2 | "Ücretsiz AI Olgunluk Testi" → /test |

**Örnek (Sağlık):**
- Badge: "Sağlık Profesyonelleri İçin Yapay Zeka"
- H1: "Sağlık — Yapay Zeka ile İşini Büyüt"
- Alt metin: "Danışan kazanımından takibe, içerik üretiminden otomasyon kurmaya — yapay zeka ile kliniğini büyüt."

**Section 2 — Problem (sektöre özel 3 problem):**

Şablon:
```
problem1: { title, description, icon }
problem2: { title, description, icon }
problem3: { title, description, icon }
```

**Örnek (Sağlık):**
1. "Hasta planları saatler alıyor" — "Her danışana özel beslenme/tedavi planı hazırlamak günde 3-4 saatini yiyor. Bu zaman yeni danışan almaktan çalınıyor."
2. "İçerik üretmeye vakit yok" — "Instagram'a düzenli paylaşım yapman gerektiğini biliyorsun ama vakit bulamıyorsun. Profil ölü, yeni danışanlar gelmiyor."
3. "Takip sistemi yok" — "Danışan geldi gitti — takip maili yok, hatırlatma yok, memnuniyet sorulmadı. Sadakatsiz müşteri döngüsü."

**Section 3 — AI Kullanım Senaryoları (3 agentic örnek):**

Bu içerik **FOMO kütüphanesinden** geliyor — Modül 1.1'deki 30 senaryo burada sektör bazlı gösteriliyor.

Şablon:
```
scenario1: { title, description, beforeTime, afterTime }
scenario2: { ... }
scenario3: { ... }
```

**Örnek (Sağlık):**
1. "Danışan Onboarding Sistemi" — "Danışanın formu dolduruyor → Claude plan + alışveriş listesi + takip mesajları + randevu çıkarıyor. Sen onaylıyorsun." (Eskiden 2-3 saat → Şimdi 15 dk)
2. "Haftalık İçerik Sistemi" — "Claude her hafta 5 Instagram postu + 2 story + 1 blog taslağı + danışanlara bilgilendirme mesajları hazırlıyor." (Eskiden haftada 6 saat → Şimdi 30 dk)
3. "Randevu Sonrası Otomatik Takip" — "Seans bittikten sonra Claude not özeti + takip mesajı + sonraki seans hazırlığı + motivasyon mesajı." (Eskiden 30 dk/danışan → Şimdi otomatik)

**Section 4 — GROWT Method (kısa):**

5 adım kartı (ana sayfadakiyle aynı component) + "Bu sektörde GROWT nasıl çalışıyor?" açıklaması (1-2 paragraf, sektöre özel)

**Section 5 — Rakamlar:**

Ana sayfadaki 3 stat'ın aynısı veya sektöre özel ek statler.

**Section 6 — İlgili Blog Yazıları:**

Bu sektöre ait blog yazılarını otomatik listeler (frontmatter'da `sectorRef` field'ına göre).

**Section 7 — CTA:**

| Alan | İçerik |
|------|--------|
| H2 | "Yapay zeka ile {sektorAdi} işini büyütmeye hazır mısın?" |
| CTA 1 | "Programa Katıl" → ödeme linki |
| CTA 2 | "Ücretsiz AI Olgunluk Testine Başla" → /test |

### 3.4 Sektör data yapısı

Tüm sektör verileri tek bir data dosyasında: `/content/sectors/` veya `/src/data/sectors.ts`

```typescript
export const SECTOR_PAGES = {
  saglik: {
    slug: "saglik",
    title: "Sağlık",
    fullTitle: "Sağlık Profesyonelleri",
    seoTitle: "Sağlık Profesyonelleri İçin Yapay Zeka | Growtify.ai",
    seoDescription: "Diyetisyen, psikolog, fizyoterapist — yapay zeka ile kliniğini büyüt. Danışan kazanımından takibe, GROWT Method ile 5 seviyede dönüşüm.",
    heroSubtitle: "Danışan kazanımından takibe, içerik üretiminden otomasyon kurmaya — yapay zeka ile kliniğini büyüt.",
    problems: [ ... ],
    scenarios: [ ... ],
    growtContext: "...",
    relatedBlogSlugs: [ ... ],
  },
  hukuk: { ... },
  guzellik: { ... },
  // ... 12 sektör
};
```

---

## 4. İLK İÇERİKLER (Lansman seti)

### 4.1 İlk 6 blog yazısı (deploy ile birlikte yayınlanacak)

| # | Başlık | Kategori | Sektör ref | Funnel aşaması |
|---|--------|----------|-----------|---------------|
| 1 | "Yapay Zeka Kullanmamak İşine Ne Kadara Mal Oluyor?" | ai-donusum | null (genel) | TOFU |
| 2 | "Sağlık Profesyonelleri İçin Yapay Zeka: Nereden Başlamalı?" | sektorel | saglik | TOFU |
| 3 | "GROWT Method Nedir? 5 Seviyede İş Büyütme" | growt-method | null (genel) | MOFU |
| 4 | "Avukatlar İçin Yapay Zeka: Araştırmadan Müvekkil Kazanımına" | sektorel | hukuk | TOFU |
| 5 | "YouTube'dan Yapay Zeka Öğrenmek vs Yapılandırılmış Program" | ai-donusum | null (genel) | MOFU |
| 6 | "Güzellik Sektöründe Yapay Zeka: Salonunu Nasıl Büyütürsün?" | sektorel | guzellik | TOFU |

### 4.2 Yazı şablonu (her yazıda ortak yapı)

```
1. Hook paragraf (ilk 2 cümle — dikkat çek)
2. Problem tanımı (okuyucu kendini görsün)
3. Ana içerik (3-5 bölüm, alt başlıklar ile)
4. Agentic örnekler (FOMO kütüphanesinden, varsa)
5. GROWT Method bağlantısı (doğal, zorlamadan)
6. CTA (yazı sonu — "Programa Katıl" veya "AI Olgunluk Testi")
```

**Uzunluk:** 1.500-2.500 kelime
**Ton:** Sen hitap, somut, pratik, FOMO serpiştirilmiş
**SEO:** Her yazıda hedef keyword, meta description, alt tags, internal linkler

### 4.3 Yazı 1 — İçerik taslağı (örnek)

**Başlık:** "Yapay Zeka Kullanmamak İşine Ne Kadara Mal Oluyor?"

**Hedef keyword:** "yapay zeka kullanmamak maliyet" / "AI kullanmayan işletme"

**Taslak:**
```
## Hook
İşletmelerin %92.5'i yapay zeka kullanmıyor. Ve her ay bunun bedelini ödüyor — 
farkında olmadan.

## Rakamlar ne diyor?
- TÜİK 2025 verileri
- McKinsey/Accenture global karşılaştırma
- 3.7x getiri farkı

## Bir diyetisyenin hesabı
- Haftada 15 saat tekrarlayan iş × saatlik kazanç = aylık kayıp
- AI ile aynı iş → kaç saat kurtarılır → kaç yeni danışan alınır

## Bir avukatın hesabı
- Aynı mantık, farklı meslek

## "Ama ben zaten yoğunum"
- Tam da bu yüzden — zaman kazandırmak AI'ın ilk işi

## Peki ne yapmalısın?
- GROWT Method — 5 seviyede iş büyütme (doğal bağlantı)
- İlk adım: AI Olgunluk Testi → /test

## CTA
"4 haftada ilk adımını at. Programa Katıl."
```

---

## 5. SEO TEKNİK ALTYAPI

### 5.1 Metadata

Her sayfa için otomatik:
- `<title>` — seoTitle veya fallback
- `<meta description>` — seoDescription
- Open Graph tags (title, description, image)
- Twitter Card tags
- Canonical URL
- Hreflang (ileride global açılım için hazırlık)

### 5.2 Structured Data

**Blog yazıları:**
```json
{
  "@type": "Article",
  "headline": "...",
  "author": { "@type": "Organization", "name": "Growtify AI" },
  "datePublished": "...",
  "description": "..."
}
```

**Sektör sayfaları:**
```json
{
  "@type": "Service",
  "name": "Yapay Zeka ile Sağlık Profesyonelleri İçin İş Büyütme",
  "provider": { "@type": "Organization", "name": "Growtify AI" },
  "description": "..."
}
```

### 5.3 Sitemap

Otomatik sitemap generation:
- `/sitemap.xml` — tüm sayfalar
- Blog yazıları: her yeni yazı eklendiğinde otomatik güncelleme
- Sektör sayfaları: 12 statik sayfa
- Priority: Ana sayfa (1.0) > Sektör sayfaları (0.8) > Blog (0.7) > Diğer (0.5)

### 5.4 Internal linking stratejisi

| Kaynak | Hedef | Bağlantı tipi |
|--------|-------|--------------|
| Blog yazısı | İlgili sektör sayfası | "Sektörüne özel detaylar için: /sektor/saglik" |
| Blog yazısı | Diğer blog yazıları | "İlgili: [yazı başlığı]" sidebar + yazı altı |
| Blog yazısı | GROWT Method sayfası | İçerikte doğal referans |
| Blog yazısı | Quiz (/test) | CTA olarak |
| Sektör sayfası | İlgili blog yazıları | "Bu sektörde daha fazla:" section |
| Sektör sayfası | Programa Katıl | CTA |
| Sektör sayfası | Quiz (/test) | CTA |
| Ana sayfa sektör kartları | /sektor/[slug] | Her kart link |

### 5.5 robots.txt

```
User-agent: *
Allow: /
Sitemap: https://growtify.ai/sitemap.xml
```

---

## 6. FOMO KÜTÜPHANESI ENTEGRASYONU

Blog + sektör sayfaları FOMO kütüphanesiyle besleniyor:

```
FOMO Kütüphanesi (30+ agentic senaryo)
  ↓
  ├── Sektör sayfalarında "AI Kullanım Senaryoları" section'ı
  ├── Blog yazılarında inline örnekler
  ├── Quiz sektör varyantlarında referans
  └── Her hafta yeni senaryo → yeni blog + sektör sayfası güncelleme
```

**Operasyonel döngü:**
1. Haftalık 1 yeni senaryo yazılır (Claude ile)
2. Senaryo → sektör sayfasına eklenir
3. Aynı senaryo → blog yazısına dönüştürülür (1.500-2.500 kelime)
4. Aynı senaryo → sosyal medya formatlarına türetilir

---

## 7. TEKNİK İMPLEMENTASYON PLANI

### 7.1 Development session'da yapılacaklar

**Adım 1 — Blog altyapısı:**
- `/content/blog/` dizini oluştur
- MDX desteği kur (next-mdx-remote veya @next/mdx)
- `src/app/blog/[slug]/page.tsx` dynamic route
- `src/app/blog/page.tsx` listing sayfası (kategori filtreli)
- Blog yazı layout (sidebar + CTA + ilgili yazılar)

**Adım 2 — Sektör sayfaları:**
- `/src/data/sectors.ts` data dosyası (12 sektör verisi)
- `src/app/sektor/[slug]/page.tsx` dynamic route
- Sektör sayfası template component (7 section)
- Ana sayfadaki sektör kartlarından `/sektor/[slug]` linklemesi

**Adım 3 — İlk içerikler:**
- 6 blog yazısı MDX dosyaları (`/content/blog/`)
- 12 sektör sayfası data'sı (`sectors.ts`'te)

**Adım 4 — SEO:**
- Sitemap.xml otomatik generation
- robots.txt
- Structured data (Article + Service schema)
- OG image generation (opsiyonel — basit template)

**Adım 5 — Bağlantılar:**
- Internal linking implementasyonu
- Blog → sektör cross-reference
- Sektör → blog cross-reference
- Sidebar CTA component

### 7.2 Dosya yapısı

```
website/
├── content/
│   └── blog/
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
│   │   │   ├── page.tsx                    (listing)
│   │   │   └── [slug]/
│   │   │       └── page.tsx                (yazı detay)
│   │   └── sektor/
│   │       └── [slug]/
│   │           └── page.tsx                (sektör landing)
│   │
│   ├── components/
│   │   ├── blog/
│   │   │   ├── BlogCard.tsx
│   │   │   ├── BlogSidebar.tsx
│   │   │   ├── BlogCTA.tsx
│   │   │   ├── CategoryTabs.tsx
│   │   │   └── RelatedPosts.tsx
│   │   └── sectors/
│   │       ├── SectorHero.tsx
│   │       ├── SectorProblems.tsx
│   │       ├── SectorScenarios.tsx
│   │       ├── SectorGROWT.tsx
│   │       ├── SectorBlogPosts.tsx
│   │       └── SectorCTA.tsx
│   │
│   ├── data/
│   │   └── sectors.ts                      (12 sektör verisi)
│   │
│   └── lib/
│       ├── blog.ts                         (MDX okuma, frontmatter parse)
│       └── sectors.ts                      (sektör helper'ları)
│
├── public/
│   ├── robots.txt
│   └── og/                                 (OG images)
│
└── BLOG-PSEO-CONTENT-BRIEF.md              (bu dosya)
```

---

## 8. 12 SEKTÖR DATA ÖZETİ

Her sektör için doldurulacak alanlar:

| Sektör | slug | SEO keyword | Hero alt metin | 3 Problem | 3 Senaryo |
|--------|------|-------------|---------------|-----------|-----------|
| Sağlık | saglik | "sağlık profesyonelleri yapay zeka" | Danışan kazanımından takibe... | ✓ Yazılacak | ✓ FOMO kütüphanesinden |
| Hukuk | hukuk | "avukatlar için yapay zeka" | Araştırmadan müvekkil kazanımına... | ✓ Yazılacak | ✓ FOMO kütüphanesinden |
| Güzellik | guzellik | "güzellik salonu yapay zeka" | Randevudan sadakate... | ✓ Yazılacak | ✓ FOMO kütüphanesinden |
| Emlak | emlak | "emlakçılar için yapay zeka" | İlan yazmaktan müşteri eşleştirmeye... | ✓ Yazılacak | ✓ FOMO kütüphanesinden |
| E-Ticaret | e-ticaret | "e-ticaret yapay zeka" | Ürün sayfasından satış otomasyonuna... | ✓ Yazılacak | ✓ FOMO kütüphanesinden |
| Diş Hekimliği | dis-hekimligi | "diş hekimliği yapay zeka" | Hasta iletişiminden dental turizme... | ✓ Yazılacak | ✓ FOMO kütüphanesinden |
| Muhasebe | muhasebe | "mali müşavir yapay zeka" | Belge işlemeden danışmanlığa... | ✓ Yazılacak | ✓ FOMO kütüphanesinden |
| Eczacılık | eczacilik | "eczane yapay zeka" | Stok yönetiminden sadakate... | ✓ Yazılacak | ✓ FOMO kütüphanesinden |
| Turizm | turizm | "turizm sektörü yapay zeka" | Rezervasyondan deneyime... | ✓ Yazılacak | ✓ FOMO kütüphanesinden |
| Mimarlık | mimarlik | "mimar yapay zeka" | Konseptten sunuma... | ✓ Yazılacak | ✓ FOMO kütüphanesinden |
| Eğitim | egitim | "eğitimci yapay zeka" | Materyal üretiminden takibe... | ✓ Yazılacak | ✓ FOMO kütüphanesinden |
| Fitness | fitness | "fitness koçu yapay zeka" | Program yazımından takibe... | ✓ Yazılacak | ✓ FOMO kütüphanesinden |

**Not:** 3 senaryo her sektör için bu session'da daha önce yazılmıştı (Modül 1.1 FOMO kütüphanesi — 30 senaryo). Sektör sayfaları bu senaryoları doğrudan kullanır.

---

## 9. ÖNCELİK SIRASI

| Adım | Ne | Neden önce |
|------|-----|-----------|
| 1 | Blog teknik altyapı (MDX + routing) | Her şeyin temeli |
| 2 | Sektör sayfası template + routing | pSEO altyapısı |
| 3 | 3 pilot sektör sayfası data'sı (sağlık, güzellik, hukuk) | İlk SEO trafiği |
| 4 | 6 blog yazısı içeriği | İlk organic content |
| 5 | Kalan 9 sektör sayfası data'sı | Tam kapsam |
| 6 | SEO (sitemap, schema, robots) | Crawling + indexing |
| 7 | Internal linking | SEO juice dağıtımı |

---

## 10. İÇERİK ÜRETİM SÜRECİ (lansman sonrası)

**Haftalık döngü (~2 saat Hüseyin zamanı):**

```
Pazartesi: Konu seçimi (Hüseyin) → "Bu hafta hangi sektör, hangi problem?"
Salı: Claude ile yazı üretimi → 1 blog yazısı + 1 sektör sayfası güncelleme
Çarşamba: Hüseyin review + onay (15 dk)
Perşembe: Yayın → blog + sosyal medya formatları
```

**Aylık hedefler:**
- 4 blog yazısı / ay
- 2-3 sektör sayfası güncelleme / ay
- Kümülatif: 6 ayda 24+ yazı, 12 tam sektör sayfası, 50+ agentic senaryo

---

## 11. KURALLAR (tüm içeriklerde geçerli)

- "Sen" hitap (blog ve sektör sayfalarında)
- AI/yapay zeka karışık (UX'e göre)
- Gamification dili yok
- Sertifika referansı yok
- "Kurs/ders/ödev" yok
- Sorumluluk mesajı doğal serpiştirilmiş
- Her yazıda en az 1 CTA (Programa Katıl veya AI Olgunluk Testi)
- Placeholder testimonial kullanılabilir (disclaimer ile)
- Kaynaklı istatistikler (TÜİK, McKinsey, Accenture)
