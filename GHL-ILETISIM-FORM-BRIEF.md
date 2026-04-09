# GHL İletişim Formu Entegrasyon Brief

> Hazırlayan: Development Session — 2026-04-09
> Durum: GHL session'da implement edilecek
> Bağımlılık: İletişim formu UI tamamlandı (`/iletisim`)

---

## Özet

Website `/iletisim` sayfasındaki form submit edildiğinde:
1. Website API route'u GHL webhook'a POST yapar
2. GHL contact oluşturur/günceller
3. Tag'ler ekler (source + interest + sector)
4. GAI - Satış pipeline'ına "New Lead" olarak atar
5. Otomatik yanıt email'i gönderir
6. Admin'e bildirim gönderir

---

## 1. Website Tarafı (Next.js)

### API Route oluşturulacak

**Dosya:** `src/app/iletisim/api/submit/route.ts`

**Gelen payload:**
```json
{
  "name": "Ayşe Yılmaz",
  "email": "ayse@example.com",
  "phone": "+905551234567",
  "sector": "saglik",
  "interest": "bireysel",
  "message": "Programa katılmak istiyorum"
}
```

**İşlem:**
1. Validasyon (name, email, phone zorunlu)
2. GHL webhook'a POST
3. Başarılı → `{ success: true }` döndür
4. Hata → `{ success: false, error: "..." }` döndür

### Form component güncelleme

**Dosya:** `src/app/iletisim/page.tsx`

Form'u client component'a çevir veya ayrı `ContactForm.tsx` component oluştur:
- `onSubmit` handler ekle
- Loading state (submit sırasında buton disable + spinner)
- Success state ("Mesajın gönderildi!" toast/banner)
- Error state ("Bir hata oluştu, lütfen tekrar dene")

---

## 2. GHL Tarafı

### Webhook URL

GHL → Settings → Webhooks → Yeni webhook oluştur:
- **Ad:** İletişim Formu Webhook
- **URL:** `https://services.leadconnectorhq.com/hooks/...` (GHL'den alınacak)

### Contact Field Mapping

| Form alanı | GHL field | Tip |
|-----------|-----------|-----|
| name | `contact.name` (veya `firstName` + `lastName` split) | Built-in |
| email | `contact.email` | Built-in |
| phone | `contact.phone` | Built-in |
| sector | Custom Field: `sektor` | Text |
| message | Custom Field: `iletisim_mesaj` | Text |

**Custom Fields oluşturulacak (GHL → Settings → Custom Fields):**
- `sektor` — Text
- `iletisim_mesaj` — Text

### Tag Mapping

| Tag | Koşul | Amaç |
|-----|-------|------|
| `source-iletisim-formu` | Her form submit | Kaynak takibi |
| `interest-bireysel` | interest = "bireysel" | Segment |
| `interest-kurumsal` | interest = "kurumsal" | Segment |
| `interest-genel` | interest = "genel" | Segment |
| `interest-ortaklik` | interest = "ortaklik" | Segment |
| `sector-saglik` | sector = "saglik" | Sektör segment |
| `sector-hukuk` | sector = "hukuk" | Sektör segment |
| `sector-guzellik` | sector = "guzellik" | Sektör segment |
| `sector-emlak` | sector = "emlak" | Sektör segment |
| `sector-e-ticaret` | sector = "e-ticaret" | Sektör segment |
| `sector-dis` | sector = "dis" | Sektör segment |
| `sector-muhasebe` | sector = "muhasebe" | Sektör segment |
| `sector-egitim` | sector = "egitim" | Sektör segment |
| `sector-turizm` | sector = "turizm" | Sektör segment |
| `sector-fitness` | sector = "fitness" | Sektör segment |
| `sector-diger` | sector = "diger" | Sektör segment |

### Pipeline

**Pipeline:** GAI - Satış (mevcut — yeni pipeline oluşturulmayacak)
**Stage:** "New Lead"

---

## 3. GHL Workflow'lar

### Workflow 1 — İlk Yanıt (Anlık)

**Trigger:** Tag eklendi → `source-iletisim-formu`
**Aksiyon:**
1. Email gönder (otomatik yanıt)
2. Admin'e internal notification

**Otomatik yanıt email şablonu:**
```
Konu: Mesajın bize ulaştı — Growtify AI

Merhaba {{contact.firstName}},

Mesajın bize ulaştı. En kısa sürede sana döneceğiz.

Bu arada AI Olgunluk Testini çözerek başlayabilirsin:
→ growtify.ai/test

Teşekkürler,
Growtify AI Ekibi
```

### Workflow 2 — 48 Saat Takip (Admin hatırlatma)

**Trigger:** Tag `source-iletisim-formu` + 48 saat geçti + pipeline stage hâlâ "New Lead"
**Aksiyon:** Admin'e hatırlatma email/SMS

### Workflow 3 — Bireysel İlgi (3 gün sonra quiz daveti)

**Trigger:** Tag `interest-bireysel` + 3 gün geçti
**Aksiyon:** Quiz davet email'i

**Email şablonu:**
```
Konu: Yapay zeka ile işini büyütmeye hazır mısın?

Merhaba {{contact.firstName}},

Birkaç gün önce bizimle iletişime geçtin. Sana en uygun planı 
oluşturmak için AI Olgunluk Testini çöz:
→ growtify.ai/test

2 dakikada tamamla, kişisel raporunu al.

— Growtify AI Ekibi
```

### Workflow 4 — Kurumsal İlgi (24 saat sonra strateji görüşmesi)

**Trigger:** Tag `interest-kurumsal` + 24 saat geçti
**Aksiyon:** Strateji görüşmesi teklif email'i

**Email şablonu:**
```
Konu: İşletmeniz için AI dönüşüm fırsatı

Merhaba {{contact.firstName}},

İşletme çözümlerimiz hakkında bilgi almak istediğinizi gördük.
30 dakikalık ücretsiz strateji görüşmesi ile başlayalım:
→ go.growtify.ai/kurumsal-gorusme

— Growtify AI Ekibi
```

---

## 4. Teknik Implementasyon Adımları

### GHL Session'da yapılacak sıra:

1. **GHL Custom Fields oluştur** — `sektor`, `iletisim_mesaj`
2. **GHL Tag'leri oluştur** — source + interest + sector (16 tag)
3. **GHL Webhook oluştur** — İletişim Formu Webhook
4. **Next.js API route yaz** — `src/app/iletisim/api/submit/route.ts`
5. **ContactForm client component yaz** — loading/success/error state
6. **GHL Workflow 1 oluştur** — otomatik yanıt + admin bildirim
7. **GHL Workflow 2 oluştur** — 48 saat hatırlatma
8. **GHL Workflow 3 oluştur** — bireysel quiz daveti (3 gün)
9. **GHL Workflow 4 oluştur** — kurumsal strateji görüşmesi (24 saat)
10. **Test** — form submit → GHL contact kontrol → email kontrol

### Environment Variables gerekli:

```env
GHL_API_KEY=...
GHL_LOCATION_ID=...
GHL_ILETISIM_WEBHOOK_URL=...
```

---

## 5. Mevcut Form Alanları (Referans)

```
İsim (zorunlu)     → contact.name
E-posta (zorunlu)  → contact.email  
Telefon (zorunlu)  → contact.phone
Sektörün           → custom: sektor + tag: sector-{value}
Ne hakkında?       → tag: interest-{value}
  - bireysel       → interest-bireysel
  - kurumsal       → interest-kurumsal
  - genel          → interest-genel
  - ortaklik       → interest-ortaklik
Mesajın            → custom: iletisim_mesaj
```

---

## Bağımlılıklar

- [x] İletişim sayfası UI tamamlandı
- [x] Form alanları brief'e uygun (isim, email, telefon, sektör, ilgi alanı, mesaj)
- [ ] GHL Custom Fields oluşturulacak
- [ ] GHL Webhook oluşturulacak
- [ ] API route yazılacak
- [ ] Client form component yazılacak
- [ ] Workflow'lar oluşturulacak
- [ ] E2E test yapılacak
