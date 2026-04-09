# Growtify.ai — İletişim Sayfa Content Brief (Development Session İçin)

> Onay: Hüseyin — 2026-04-09
> Versiyon: 1.0

---

## Genel Kurallar

- Hitap: "sen" (bireysel kısımda), "siz" (kurumsal kartta uygun)
- Form backend: GHL webhook'a bağlanacak + pipeline oluşturulacak
- Lokasyon: UK ofis adresi

---

## Sayfa Sırası

```
1. Hero
2. Routing Kartları (Bireysel + Kurumsal)
3. İletişim Formu + İletişim Bilgileri
```

---

## 1. HERO

| Alan | Mevcut | Yeni |
|------|--------|------|
| H1 | "İletişime geçin" | "Bize Ulaş" |
| Alt metin | "Sorularınız mı var? Ücretsiz tanışma görüşmesi planlamak mı istiyorsunuz? Bize ulaşın." | "Soruların mı var? Sana en uygun yolu birlikte bulalım." |

---

## 2. ROUTING KARTLARI

| Alan | Mevcut | Yeni |
|------|--------|------|
| Section başlığı | "Size en uygun yolu seçin" | "Sana en uygun yolu seç" |
| Alt metin | "Bireysel profesyonel misiniz, yoksa işletmeniz için mi arıyorsunuz?" | "Bireysel profesyonel misin, yoksa ekibin için mi arıyorsun?" |

### Bireysel Kart

| Alan | Mevcut | Yeni |
|------|--------|------|
| Başlık | "Bireysel misiniz?" | "Bireysel misin?" |
| Alt başlık | "GROWT Programı" | "GROWT Programı" (aynı) |
| Açıklama | "Kendi hızında AI dönüşümü. 5 seviye, 22 modül, mentor desteği. Sektörüne özel uygulamalar." | "Yapay zeka ile işini büyüt. 5 seviye, kendi hızında, sektörüne özel." |
| CTA | "Programa Katıl" → ödeme linki | "Kişisel Planını Oluştur" → /test |

### Kurumsal Kart

| Alan | Mevcut | Yeni |
|------|--------|------|
| Başlık | "İşletmeniz için mi?" | Aynı (kurumsal "siz" uygun) |
| Alt başlık | "İşletme Çözümleri" | Aynı |
| Açıklama | "Ekip eğitimi, kurumsal danışmanlık ve AI otomasyon. GROWT Method'un ekipler için uyarlaması." | "Ekip mentorlüğü, dönüşüm danışmanlığı ve Growtify.app ile iş altyapısı. GROWT Method'un ekipler için uyarlaması." |
| CTA | "Strateji Görüşmesi Planla" → /kurumsal | Aynı |

---

## 3. İLETİŞİM FORMU + BİLGİLERİ

### Form (sol taraf)

**Başlık:** "Mesaj Gönder" (aynı)
**Alt metin:** "En kısa sürede sana döneceğiz."

**Form alanları:**

| Alan | Label | Placeholder | Zorunlu | GHL mapping |
|------|-------|------------|---------|-------------|
| İsim | "Adın" | "Adın Soyadın" | Evet | contact.name |
| E-posta | "E-posta" | "ornek@email.com" | **Evet** | contact.email |
| Telefon | "Telefon" | "+90 5XX XXX XX XX" | **Evet** | contact.phone |
| Sektör | "Sektörün" | Seçiniz (dropdown) | Hayır | custom field: sektor |
| İlgi Alanı | "Ne hakkında?" | Seçiniz (dropdown) | Hayır | tag (aşağıya bak) |
| Mesaj | "Mesajın" | "Sana nasıl yardımcı olabiliriz?" | Hayır | custom field: iletisim_mesaj |
| Gönder | — | "Gönder" butonu | — | — |

**İlgi Alanı dropdown seçenekleri:**
- Bireysel program hakkında bilgi
- Kurumsal çözümler hakkında bilgi
- Genel soru / öneri
- Ortaklık / iş birliği

**Form backend — GHL entegrasyonu:**

Form submit → GHL webhook POST → Marketing Pipeline'a düşüyor (tag'lerle ayrışıyor)

**GHL Contact mapping:**

| Form alanı | GHL field |
|-----------|-----------|
| İsim | contact.name |
| E-posta | contact.email |
| Telefon | contact.phone |
| Sektör | custom field: sektor |
| Mesaj | custom field: iletisim_mesaj |

**GHL Tag'ler (otomatik):**

| Tag | Koşul |
|-----|-------|
| `source-iletisim-formu` | Her form submit |
| `interest-bireysel` | İlgi alanı = "Bireysel program" |
| `interest-kurumsal` | İlgi alanı = "Kurumsal çözümler" |
| `interest-genel` | İlgi alanı = "Genel soru" |
| `interest-ortaklik` | İlgi alanı = "Ortaklık" |
| `sector-saglik` vb. | Sektör seçimine göre |

**Pipeline:** GAI - Satış (mevcut) — "New Lead" stage'ine düşüyor

**Otomatik workflow'lar (GHL):**
1. Form geldi → contact oluştur + tag ekle + GAI - Satış pipeline "New Lead" stage'ine at
2. Otomatik yanıt email'i gönder (hemen)
3. Admin'e bildirim
4. 48 saat yanıt verilmezse → admin'e hatırlatma
5. interest-bireysel → 3 gün sonra quiz daveti email'i
6. interest-kurumsal → 24 saat içinde strateji görüşmesi teklif email'i

### İletişim Bilgileri (sağ taraf)

**Başlık:** "İletişim Bilgileri"
**Alt metin:** "Soruların için bize aşağıdaki kanallardan ulaşabilirsin."

| İkon | Etiket | Bilgi |
|------|--------|-------|
| Mail | E-posta | info@growtify.ai |
| Phone | UK Ofis | +44 7447 850874 |
| Phone | US Ofis | +1 825-906-9996 |
| MapPin | Adres | 71-75 Shelton Street, Covent Garden, London, UK |
| MessageCircle | Sosyal Medya | @growtify.ai |

**Not:** "İstanbul, Türkiye (Remote-first)" kaldırıldı → UK ofis adresi + telefon numaraları eklendi.

---

## GHL Entegrasyon Detayı (GHL session'da kurulacak)

**Pipeline:** GAI - Satış (mevcut) — "New Lead" stage'ine düşüyor. Ayrı pipeline oluşturulmayacak, tag'lerle segmentasyon.

**Webhook akışı:**
```
Form submit (website)
  → GHL webhook POST (isim, email, telefon, sektör, ilgi_alani, mesaj)
    → GHL contact oluştur/güncelle
      → Tag'ler ekle (source + interest + sector)
        → GAI - Satış pipeline → "New Lead" stage
          → Otomatik yanıt email'i tetikle
            → Admin'e bildirim
```

**Otomatik yanıt email şablonu:**
> "Merhaba {firstName},
> Mesajın bize ulaştı. En kısa sürede sana döneceğiz.
> Bu arada AI Olgunluk Testini çözerek başlayabilirsin: growtify.ai/test
> — Growtify AI Ekibi"

---

## Development Session Talimatları

1. Hero + routing kartları içerik güncelleme (yukarıdaki tablolara göre)
2. Form alanları hitap düzeltmesi
3. İletişim bilgileri güncelleme (UK ofis + telefon numaraları)
4. Form submit → GHL webhook bağlantısı
5. "İstanbul, Türkiye" → kaldır, UK adresi ekle
6. Telefon numaraları için yeni Card component'ları ekle (Phone ikonu)
