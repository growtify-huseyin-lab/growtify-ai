# Lead Magnet Operasyon Brief — Uçtan Uca

> Hedef kullanıcı: Lead Magnet üretim session'ı (Claude agent)
> Bu brief, TEK SESSION'DA tüm süreci kapsar:
> Fikir → Plan → Üretim → Website entegrasyon → GHL kurulum → Dağıtım → Workflow → Raporlama
> Oluşturulma: 2026-04-14

---

## 1. SİSTEM MİMARİSİ

### Akış (uçtan uca)

```
Instagram Reels → "Yorumlara AI yaz" →
  GHL DM otomasyon → /lead/{slug}?utm_source=instagram&utm_medium=organic linki gönder →
    Lead magnet landing page (tek template, data-driven) →
      Form doldur (ad + email) →
        /api/lead/submit → GHL contact upsert + tag + opportunity →
          Asset teslim (PDF download / video redirect) →
            GHL workflow: nurture email sequence tetiklenir
```

### Dosya Haritası

```
website/
├── src/
│   ├── content/lead-magnets/
│   │   └── index.ts              ← TÜM LEAD MAGNET VERİSİ BURADA
│   ├── app/
│   │   ├── lead/[slug]/
│   │   │   └── page.tsx          ← Sayfa template (dokunma)
│   │   └── api/lead/submit/
│   │       └── route.ts          ← GHL API (dokunma)
│   └── components/forms/
│       └── LeadForm.tsx          ← Form component (dokunma)
├── public/assets/lead/
│   └── {slug}.pdf (veya .png, .mp4) ← Asset dosyaları BURAYA
└── LEAD-MAGNET-OPS-BRIEF.md      ← Bu dosya
```

### Değiştirmen gereken TEK dosya: `src/content/lead-magnets/index.ts`

Template, form ve API hep aynı kalır. Yeni lead magnet = yeni entry ekle + asset dosyasını koy.

---

## 2. YENİ LEAD MAGNET EKLEME (Adım Adım)

### Adım 1 — İçerik üret

Lead magnet asset'ini oluştur. Formatlar:

| Format | Dosya türü | Dizin | Örnek |
|--------|-----------|-------|-------|
| pdf | .pdf | /public/assets/lead/ | ai-baslangic-rehberi.pdf |
| checklist | .pdf | /public/assets/lead/ | musteri-kazanim-checklist.pdf |
| template | .pdf veya .xlsx | /public/assets/lead/ | icerik-plani-sablonu.pdf |
| prompt-pack | .pdf | /public/assets/lead/ | 50-ai-prompt-paketi.pdf |
| video | harici URL | — | YouTube/Vimeo unlisted link |

**PDF üretimi için:**
- HTML template → Puppeteer render → PDF (mevcut quiz PDF sistemiyle aynı yaklaşım)
- Veya Markdown → PDF dönüştürücü
- Veya Canva/Figma → PDF export

### Adım 2 — Data entry ekle

`src/content/lead-magnets/index.ts` dosyasına yeni entry ekle:

```typescript
"yeni-magnet-slug": {
  slug: "yeni-magnet-slug",
  title: "Magnet Başlığı",
  subtitle: "Kısa açıklama — 1 cümle",
  painHook: "Kullanıcının acı noktasına dokunan italik metin",
  format: "pdf",                              // pdf | checklist | template | video | prompt-pack
  formatLabel: "PDF Rehber",                  // Görünen format etiketi
  icon: "🚀",                                 // Emoji
  whatInside: [
    "Birinci madde — en çekici olanı başa koy",
    "İkinci madde",
    "Üçüncü madde",
    "Dördüncü madde",
    "Beşinci madde",
  ],
  targetProfile: "Bu içerik kimin için?",
  assetUrl: "/assets/lead/yeni-magnet-slug.pdf",  // veya harici URL
  assetDelivery: "download",                  // download | redirect
  ghlTag: "gai_lm_yeni_magnet",             // GHL'de oluşturulacak tag
  sectorRef: "saglik",                        // opsiyonel — sektöre bağlıysa
  active: true,                               // true yapınca sayfa aktif
  createdAt: "2026-04-14",                    // YYYY-MM-DD
  seo: {
    title: "Başlık — Ücretsiz İndir | Growtify.ai",    // max 60 karakter
    description: "Meta description — max 155 karakter",
  },
},
```

### Adım 3 — Asset dosyasını koy

```bash
# PDF/Checklist/Template:
cp output.pdf public/assets/lead/yeni-magnet-slug.pdf

# Video ise: assetUrl'e YouTube/Vimeo unlisted linki yaz, assetDelivery: "redirect"
```

### Adım 4 — `active: true` yap

Entry'deki `active` alanını `true` yap. Sayfa sadece `active: true` olanlarda render olur.

### Adım 5 — GHL Tag oluştur

GHL'de `gai_lm_yeni_magnet` tag'ini oluştur (API submit otomatik ekler ama tag'in GHL'de tanımlı olması gerekir).

### Adım 6 — GHL Workflow oluştur (opsiyonel)

`gai_lm_yeni_magnet` tag'i tetikleyen nurture email workflow'u:
- D0: "Rehberin hazır! İşte indirme linkin + ilk ipucu"
- D1: İlgili blog yazısı CTA
- D3: GROWT Method kısa tanıtım + /test CTA
- D5: Son email — "Başlamaya hazır mısın?" + /test CTA

### Adım 7 — Build & Deploy

```bash
npm run build   # Yeni sayfa SSG olarak oluşur
git add -A
git commit -m "feat(lead): add {magnet-title} lead magnet"
git push         # Vercel auto-deploy
```

### Adım 8 — Instagram CTA linki

GHL DM otomasyon'da gönderilecek link:
```
https://growtify.ai/lead/yeni-magnet-slug?utm_source=instagram&utm_medium=organic&utm_campaign=reels_2026_04_14
```

UTM parametreleri GHL contact'ta kaydedilir → hangi kampanyadan geldiği takip edilir.

---

## 3. GHL ENTEGRASYON DETAYI

### Contact Upsert

Form submit → `/api/lead/submit` → GHL Contact:

| Alan | Değer |
|------|-------|
| firstName | Formdan |
| email | Formdan |
| source | "Lead magnet: {magnet title}" |
| assignedTo | Hüseyin (A63MyodDNnjwGmZIW4zd) |
| country | TR |
| tags | gai_lifecycle_lead + gai_lm_{slug} + gai_src_{source_tag} + (varsa) gai_sector_{sector} |

### Custom Fields

| Field | GHL ID | Değer |
|-------|--------|-------|
| Landing Page | 5fLsVVQnHcFqenrkWltF | /lead/{slug} |
| First Contact Date | odWIx5KCfWrrwCDf2W8U | ISO timestamp |
| Entry Point | aRKxT2Dcz4bUFQVhfNBo | "lead_magnet" |
| First UTM Source | GGDUtGyBC9k4FDQU5AYg | utm_source param |
| First UTM Campaign | RmJaQvw2C7ewgDF6ufR1 | utm_campaign param |

### Pipeline

Opportunity oluşturulur:
- Pipeline: GAI - Satış (DJYPH8mpgBh5tZkelIQP)
- Stage: Yeni Lead (bd48baed-afa1-479b-a398-9c0ee7167df9)
- Name: "{firstName} - {formatLabel} ({title})"

### UTM → Source Tag Mapping

| Kaynak | Organic Tag | Paid Tag |
|--------|------------|----------|
| linkedin | gai_src_organic_linkedin | gai_src_paid_linkedin |
| instagram | gai_src_organic_instagram | gai_src_paid_meta |
| youtube | gai_src_organic_youtube | — |
| facebook | gai_src_organic_facebook | gai_src_paid_meta |
| google | — | gai_src_paid_google |
| (boş) | gai_src_direct | gai_src_direct |

Paid algılama: `utm_medium ∈ {cpc, ads, paid, ppc, cpm}`

---

## 4. DAĞITIM: PLATFORM-SPECİFİC OTOMASYONLAr

### Genel Akış (tüm platformlar için aynı)

```
Sosyal medya içeriği (Reels/Story/Post/Video) →
  CTA: "Yorumlara [keyword] yaz" veya "Bio'daki linke tıkla" veya "Story'yi yukarı kaydır" →
    Otomasyon (GHL veya ManyChat) → DM/mesaj ile website link gönder →
      /lead/{slug}?utm_source={platform}&utm_medium={medium}&utm_campaign={campaign_id} →
        Form doldur → Asset al → GHL contact + nurture başlar
```

**Website tarafı platform-agnostik** — UTM parametreleri kaynak ayrımını yapar. Otomasyon tarafı ise platform-specific.

### Platform Bazlı Otomasyon Kapasitesi

| Platform | Yorum → DM Otomasyon | DM Otomasyon | Araç | Kurulum Notu |
|----------|---------------------|--------------|------|-------------|
| **Instagram** | Yorum keyword trigger → otomatik DM | DM'den gelen mesaja yanıt | **GHL** (Instagram Integration) veya **ManyChat** | GHL: temel seviye çalışır. ManyChat: daha güçlü (carousel DM, conditional flow, comment trigger). **Öneri: GHL ile başla**, yetmezse ManyChat ekle. |
| **Facebook** | Yorum trigger → Messenger DM | Messenger bot | **GHL** (native) | GHL'de Facebook Messenger entegrasyonu var. Comment trigger + auto-reply çalışır. |
| **WhatsApp** | — | Mesaja otomatik yanıt | **GHL** (native, güçlü) | GHL'nin en güçlü olduğu kanal. WhatsApp Business API ile tam otomasyon. Keyword trigger + template mesaj + link gönderimi. |
| **TikTok** | Yorum trigger → DM | DM yanıt | **ManyChat** (TikTok desteği var) | GHL'de TikTok DM otomasyonu YOK. ManyChat gerekir. Alternatif: bio link + UTM ile website'ye yönlendir (otomasyon olmadan). |
| **LinkedIn** | — | — | **Manuel** veya **Expandi/Dripify** | GHL'de LinkedIn entegrasyonu YOK. DM otomasyonu için 3rd party araç gerekir. Organik CTA: post'ta link paylaş veya bio'da link. |
| **YouTube** | — | — | **Manuel** | Otomasyon yok. Video açıklama + pinned comment'te link paylaş. UTM ile takip edilir. |
| **Twitter/X** | — | — | **Manuel** | Tweet'te link paylaş. Auto-DM araçları var ama riskli (ban). |

### Platform Bazlı CTA Senaryoları

**Instagram Reels:**
```
CTA: "Yorumlara 'AI' yaz, sana linki göndereyim"
GHL Trigger: Instagram comment → keyword "AI" algıla
GHL Action: DM gönder →
  "Merhaba! İşte sana özel rehber: https://growtify.ai/lead/{slug}?utm_source=instagram&utm_medium=organic&utm_campaign=reels_{date}"
```

**Instagram Story:**
```
CTA: "Yukarı kaydır" veya "Link'e tıkla" (link sticker)
Link: https://growtify.ai/lead/{slug}?utm_source=instagram&utm_medium=story&utm_campaign=story_{date}
Otomasyon: gerekmiyor — direkt link
```

**WhatsApp Broadcast:**
```
GHL WhatsApp template mesaj:
"Merhaba {firstName}! Yeni rehberimiz hazır: [rehber adı]. İndirmek için: https://growtify.ai/lead/{slug}?utm_source=whatsapp&utm_medium=broadcast&utm_campaign={campaign_id}"
```

**LinkedIn Post:**
```
Post içinde CTA: "Rehberi indirmek için: [link]"
Link: https://growtify.ai/lead/{slug}?utm_source=linkedin&utm_medium=organic&utm_campaign=post_{date}
Otomasyon: yok — organik dağıtım
```

**TikTok:**
```
Video CTA: "Bio'daki linke tıkla"
Bio link: https://growtify.ai/lead/{slug}?utm_source=tiktok&utm_medium=organic&utm_campaign=tiktok_{date}
Veya ManyChat: yorum trigger → DM ile link
```

**YouTube:**
```
Video açıklama: "Rehberi indir: [link]"
Pinned comment: "[link]"
Link: https://growtify.ai/lead/{slug}?utm_source=youtube&utm_medium=organic&utm_campaign=video_{video_id}
```

**Facebook Post/Grup:**
```
Post CTA: "Yorumlara 'istiyorum' yaz"
GHL Trigger: Facebook comment → keyword algıla
GHL Action: Messenger'dan link gönder
```

### UTM Şablonu (tüm platformlar için)

```
https://growtify.ai/lead/{slug}?utm_source={platform}&utm_medium={medium}&utm_campaign={campaign_id}
```

| Parametre | Açıklama | Örnekler |
|-----------|----------|----------|
| utm_source | Platform adı | instagram, linkedin, youtube, tiktok, whatsapp, facebook |
| utm_medium | Dağıtım tipi | organic, story, broadcast, paid, cpc, dm |
| utm_campaign | Kampanya ID | reels_2026_04_14, prompt_paketi_launch, haftalik_cta_w16 |

### GHL DM Otomasyon Kurulumu (Instagram)

```
GHL → Automation → New Workflow:
  Trigger: Instagram Comment Reply
    - Filter: Comment contains "AI" (veya belirlenen keyword)
  Action 1: Wait 30 seconds (doğal görünsün)
  Action 2: Send Instagram DM
    - Message: "Merhaba! 🚀 İşte sana özel [magnet adı]: {link}
      
      İndirmek için linke tıkla, email adresini yaz — anında sana ulaşsın.
      
      Soruların olursa yaz, buradayım!"
```

### Haftalık Lead Magnet + Dağıtım Takvimi (Örnek)

| Gün | Platform | CTA Tipi | Lead Magnet | Slug | UTM Campaign |
|-----|----------|----------|-------------|------|-------------|
| Pzt | Instagram Reels | Yorum → DM | PDF Rehber | ai-baslangic-rehberi | reels_w16_pzt |
| Sal | LinkedIn Post | Bio link | Prompt Paketi | 50-ai-prompt-paketi | linkedin_w16_sal |
| Çar | Instagram Story | Link sticker | İçerik Planı | haftalik-ai-icerik-plani | story_w16_car |
| Per | WhatsApp Broadcast | Template mesaj | PDF Rehber | ai-baslangic-rehberi | whatsapp_w16_per |
| Cum | TikTok Video | Bio link | Prompt Paketi | 50-ai-prompt-paketi | tiktok_w16_cum |

---

## 5. FORMAT KONFIGÜRASYONU

Her format için otomatik CTA metni ve badge:

| Format | Badge | Form CTA | Success CTA |
|--------|-------|----------|-------------|
| pdf | PDF | Rehberi İndir | Rehberi İndir (download) |
| checklist | Checklist | Checklist'i Al | Checklist'i Al (download) |
| template | Şablon | Şablonları İndir | Şablonları İndir (download) |
| video | Video | Videoyu İzle | Videoyu İzle (redirect) |
| prompt-pack | Prompt | Prompt'ları Al | Prompt'ları Al (download) |

`FORMAT_CONFIG` objesi `content/lead-magnets/index.ts`'te tanımlı — yeni format eklemek isterseniz oraya ekleyin.

---

## 6. TEKNİK NOTLAR

### Active/Inactive Mekanizması

`active: false` olan lead magnet'lar:
- `generateStaticParams()`'da build ediliyor (URL var)
- Ama `page.tsx`'te `if (!magnet.active) notFound()` ile 404 dönüyor
- Asset üretilmeden entry eklenebilir (`active: false`) — sonra `active: true` yapılır

### SEO

- Lead magnet sayfaları `robots: { index: false, follow: true }` — Google'dan gelmemeli, sadece DM/link ile erişilmeli
- Canonical URL: `/lead/{slug}`

### Video Format

Video lead magnet'lar için:
- `assetUrl`: YouTube/Vimeo unlisted link
- `assetDelivery`: "redirect" (yeni sekmede açılır, download değil)
- Form submit sonrası "Videoyu İzle" butonu çıkar

### Mevcut `/rehber/[sektor]` ile İlişki

`/rehber/[sektor]` = sektöre özel PDF rehber landing (12 sayfa, GHL tag: gai_lm_{sektor})
`/lead/[slug]` = genel lead magnet (sınırsız, karışık format, GHL tag: gai_lm_{slug})

İki sistem bağımsız çalışır. Aynı GHL pipeline'ına düşer ama farklı tag'lerle segmente olur.

---

## 7. MEVCUT LEAD MAGNET'LAR (3 adet — hepsi inactive)

| Slug | Başlık | Format | Active |
|------|--------|--------|--------|
| ai-baslangic-rehberi | Yapay Zeka ile İşini Büyütme: Başlangıç Rehberi | PDF | ❌ |
| 50-ai-prompt-paketi | 50 AI Prompt Paketi: Mesleğine Özel | Prompt Pack | ❌ |
| haftalik-ai-icerik-plani | AI ile 30 Günlük İçerik Planı Şablonu | Template | ❌ |

**Hepsi `active: false`** — asset dosyaları üretilince `true` yapılacak.

---

## 8. LEAD MAGNET SESSION MASTER CHECKLIST (Uçtan Uca)

Bu session tek seferde tüm süreci kapsayacak. Aşağıdaki fazları sırayla takip et.

### FAZ A — STRATEJİ & PLANLAMA
- [ ] Haftalık/günlük CTA takvimini belirle (hangi gün hangi platform hangi magnet)
- [ ] Her magnet için: konu, hedef kitle, format, acı noktası, vaat
- [ ] Magnet slug'larını belirle (URL-friendly)
- [ ] İlk batch kaç magnet? (önerilen: 3-5 ile başla)

### FAZ B — İÇERİK ÜRETİMİ
- [ ] Her magnet için metin içeriği üret (Claude ile)
- [ ] PDF tasarım template'i oluştur (marka renkler, logo, layout)
- [ ] PDF/asset'leri render et (HTML→Puppeteer→PDF veya Canva export)
- [ ] Video varsa: kaydet/düzenle, YouTube/Vimeo'ya unlisted yükle
- [ ] Kalite kontrol: yazım, format, marka tutarlılığı

### FAZ C — WEBSİTE ENTEGRASYONU
- [ ] `src/content/lead-magnets/index.ts`'e her magnet için entry ekle
- [ ] Asset dosyalarını `/public/assets/lead/` dizinine koy
- [ ] `active: true` yap
- [ ] `npm run build` — hata olmadığını doğrula
- [ ] `git commit` + `git push` — Vercel deploy
- [ ] Canlıda test: `/lead/{slug}` açılıyor mu? Form çalışıyor mu? Download çalışıyor mu?

### FAZ D — GHL KURULUMU
- [ ] Her magnet için GHL tag oluştur (`gai_lm_{slug}`)
- [ ] GHL'de nurture email workflow oluştur (tag trigger → D0/D1/D3/D5 email sequence)
- [ ] Email copy'lerini yaz ve workflow'a yerleştir
- [ ] Workflow'u test et (test contact oluştur, tag ekle, email geldi mi?)
- [ ] Instagram comment trigger workflow oluştur (varsa)
- [ ] WhatsApp template mesaj oluştur (varsa)
- [ ] Facebook Messenger auto-reply oluştur (varsa)

### FAZ E — DAĞITIM & OTOMASYON
- [ ] Her platform için UTM'li link hazırla
- [ ] GHL DM otomasyon ayarla (Instagram comment → DM)
- [ ] ManyChat kurulumu (TikTok için gerekiyorsa)
- [ ] WhatsApp broadcast listesi hazırla
- [ ] LinkedIn/YouTube/Twitter için organik dağıtım planı
- [ ] Bio link'leri güncelle (Linktree/GHL link-in-bio)

### FAZ F — TEST & DOĞRULAMA
- [ ] Her magnet sayfasını ziyaret et, form doldur
- [ ] GHL'de contact oluştuğunu doğrula (tag'ler, custom fields, pipeline)
- [ ] Asset download/redirect çalışıyor mu?
- [ ] Nurture email'i tetiklendi mi? (D0 email geldi mi?)
- [ ] UTM parametreleri GHL'de doğru kaydediliyor mu?
- [ ] DM otomasyonu test et (Instagram'da keyword yaz, DM geldi mi?)
- [ ] Mobile responsive test (form mobilde düzgün çalışıyor mu?)

### FAZ G — RAPORLAMA & İZLEME
- [ ] GHL dashboard'da tag bazlı lead sayıları görünüyor mu?
- [ ] Hangi magnet en çok lead getiriyor? (tag count karşılaştırma)
- [ ] Hangi platform en çok lead getiriyor? (gai_src_* tag breakdown)
- [ ] Nurture email açılma oranları nasıl?
- [ ] Quiz dönüşümü: lead magnet lead → /test tamamlama oranı
- [ ] Haftalık rapor template'i oluştur

### FAZ H — İTERASYON & ÖĞRENİM
- [ ] İlk haftanın datası: hangi magnet/platform kombinasyonu en iyi?
- [ ] Düşük performanslı magnet'ları revize et veya kaldır
- [ ] Yüksek performanslı magnet'ları farklı platformlarda da dağıt
- [ ] Yeni magnet fikirleri belirle (datadan insight)
- [ ] A/B test planla (farklı painHook/title varyantları)

---

## 9. SKOR KARTI (Lead Magnet Performans Ölçümü)

GHL'de şu metrikleri takip et:

| Metrik | Nasıl ölçülür | Hedef |
|--------|-------------|-------|
| Lead sayısı / magnet | `gai_lm_{slug}` tag count | Haftalık 50+ |
| Kaynak dağılımı | `gai_src_*` tag breakdown | Instagram %60+ |
| Quiz dönüşümü | Lead magnet lead → /test tamamlama | %15-20 |
| Ödeme dönüşümü | Quiz tamamlama → ödeme | %25-35 |
| Nurture email açılma | GHL email stats | %40+ |

---

## 10. GHL NURTURE WORKFLOW DETAYI

### Standart Nurture Sequence (her lead magnet için uyarlanır)

```
Tag Trigger: gai_lm_{slug} eklendi
  ↓
D0 (hemen): Welcome email — "Rehberin/paketин hazır + indirme linki"
  ↓
D1 (1 gün sonra): Value email — ilgili blog yazısı + ek ipucu
  ↓
D3 (3 gün sonra): GROWT tanıtım — "5 seviyede dönüşüm" kısa özet + /test CTA
  ↓
D5 (5 gün sonra): Son CTA — "Başlamaya hazır mısın?" + /test linki
  ↓
D7 (7 gün sonra): Soft close — "Soruların varsa buradayız" + WhatsApp link
```

### Email Copy Template (D0 — Welcome)

```
Konu: {magnetTitle} — İndirme linkin hazır!

Merhaba {firstName},

{magnetTitle} hazır. İşte indirme linkin:
→ {assetUrl}

Bu {formatLabel}'da şunları bulacaksın:
• {whatInside[0]}
• {whatInside[1]}
• {whatInside[2]}

Hemen indir ve bugün uygulamaya başla.

Önümüzdeki birkaç gün sana ek ipuçları göndereceğim.
Soruların olursa bu maile yanıt yaz veya WhatsApp'tan ulaş.

— Hüseyin, Growtify AI
```

### Email Copy Template (D5 — Son CTA)

```
Konu: {firstName}, yapay zeka ile dönüşüme hazır mısın?

Merhaba {firstName},

Birkaç gün önce {magnetTitle}'ı indirdin. 
Umarım faydalı olmuştur.

Eğer yapay zeka ile işini büyütmeye hazırsan, 
sana özel planını oluşturmak 2 dakika sürüyor:

→ growtify.ai/test

Bu test sonucunda:
• Sektörüne özel AI fırsat analizi
• Kişisel dönüşüm yol haritası
• Sana özel program fiyatı

Biz süreci veriyoruz — sonucu belirleyen senin uygulamaların.

— Hüseyin, Growtify AI
```

### GHL Workflow Oluşturma Adımları

```
GHL → Automation → Create Workflow:

1. Trigger: Contact Tag Added → "gai_lm_{slug}"
2. Action: Wait 0 minutes
3. Action: Send Email → D0 template (asset link dahil)
4. Action: Wait 1 day
5. Action: Send Email → D1 template (blog CTA)
6. Action: Wait 2 days
7. Action: Send Email → D3 template (GROWT tanıtım)
8. Action: Wait 2 days
9. Action: Send Email → D5 template (son CTA → /test)
10. Action: Wait 2 days
11. Action: Send Email → D7 template (soft close)
12. Action: Remove Tag → "gai_lm_{slug}" (sequence bitti)
13. Action: Add Tag → "gai_lm_completed_{slug}" (tamamlandı)
```

### Workflow İsimlendirme Standardı

```
GAI - Nurture - LM - {Slug}
Örn: GAI - Nurture - LM - ai-baslangic-rehberi
```

---

## 11. RAPORLAMA VE PERFORMANS İZLEME

### Haftalık Rapor Template'i

```
LEAD MAGNET HAFTALIK RAPOR — Hafta {W#}

1. TOPLAM LEAD'LER
   Bu hafta: {n} yeni lead
   Kümülatif: {total} lead

2. MAGNET BAZLI DAĞILIM
   | Magnet | Lead | Dönüşüm (→test) |
   |--------|------|-----------------|
   | {slug1} | {n} | {%} |
   | {slug2} | {n} | {%} |

3. PLATFORM BAZLI DAĞILIM
   | Platform | Lead | % |
   |----------|------|---|
   | Instagram | {n} | {%} |
   | LinkedIn | {n} | {%} |
   | WhatsApp | {n} | {%} |
   | Direct | {n} | {%} |

4. NURTurE EMAIL PERFORMANSI
   | Email | Gönderim | Açılma | Tıklama |
   |-------|----------|--------|---------|
   | D0 | {n} | {%} | {%} |
   | D5 | {n} | {%} | {%} |

5. FUNNEL METRİKLERİ
   Lead magnet → Quiz başlama: {%}
   Quiz başlama → Quiz tamamlama: {%}
   Quiz tamamlama → Ödeme: {%}
   End-to-end: {%}

6. ÖNERİLER
   - En iyi performans: {magnet} x {platform}
   - İyileştirme önerisi: ...
```

### GHL'de Rapor Çekme

```
GHL → Contacts → Filter by Tag:
  - gai_lm_{slug} → bu magnet'ın toplam lead'leri
  - gai_src_organic_instagram → Instagram organik lead'ler
  - gai_src_paid_meta → Meta paid lead'ler

GHL → Reporting → Email Stats:
  - Workflow: "GAI - Nurture - LM - {slug}"
  - Açılma, tıklama, unsubscribe oranları

GHL → Opportunities → Pipeline: GAI - Satış:
  - Source contains "Lead magnet" → tüm LM lead'leri
  - Stage: Yeni Lead → Qualified → Won (funnel analizi)
```

---

## 12. İLERİDE EKLENEBİLECEK ÖZELLİKLER

- **A/B test**: Aynı magnet için farklı painHook/title varyantları
- **Expiry**: Belirli tarihten sonra otomatik deaktif (`expiresAt` field)
- **Analytics dashboard**: Lead magnet bazlı conversion funnel
- **ISR (Incremental Static Regeneration)**: Deploy gerektirmeden yeni magnet ekleme
- **Otomatik PDF üretimi**: Template + data → build-time PDF generation
- **ManyChat entegrasyonu**: TikTok DM otomasyon (GHL'de yoksa)
- **Link-in-bio sayfası**: Tüm aktif lead magnet'ları listeleyen hub sayfa (/lead)
- **Referral program**: "Arkadaşına gönder, bonus içerik aç"
- **Progressive profiling**: İlk magnet'ta sadece email, sonraki magnet'ta telefon/sektör sor
