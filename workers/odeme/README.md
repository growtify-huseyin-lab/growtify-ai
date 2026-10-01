# odeme.growtify.app — Türkçe, Growtify markalı ödeme sayfası

GHL'in ödeme linki sayfası (`app.growtify.app/payment-link/{id}`) Türkçe dilini desteklemiyor
(yalnız 13 dil var, Türkçe yok). Bu Cloudflare Worker aynı sayfayı kendi alan adımızdan sunar:

```
https://odeme.growtify.app/payment-link/{id}   ← GHL'deki linkin alan adını değiştirmek yeterli
https://odeme.growtify.app/{id}                ← kısa link, yukarıdakine yönlendirir
```

Ödeme yine GHL + Stripe üzerinden yürür. Worker kart verisi görmez (kart alanları Stripe iframe'inde).

## Nasıl çalışır

- `src/worker.js` — yalnız `GET/HEAD /payment-link/{24 hex}` isteğini `app.growtify.app`'ten alır
  (açık proxy değil), HTML'e şunları ekler:
  - `<head>` başına `src/client.client.js` (satır içi, diğer betiklerden önce) + `src/brand.css`
  - `<body>` başına marka başlığı, sonuna alt bilgi — GHL'in Vue uygulamasının (`#__nuxt`) **dışında**
  - başlık, favicon, `lang="tr"`; GHL'in `__cf_bm` çerezini ve kendi `/cdn-cgi` betiğini atar
- `src/client.client.js`
  - Stripe'ı `locale: "tr"` ile açar (`window.Stripe` kancası)
  - GHL'in vue-i18n `en_US` mesajlarının üzerine Türkçeyi yazar (anahtarlar GHL'in kendi anahtarları)
  - `TL40,000.00` → `40.000,00 TL`
  - Türkçe oturunca `html.gai-ready` ekler; o zamana kadar uygulama şeffaf (CSS 3,5 sn'de her koşulda açar)
- `src/brand.css` — growtify.app görünümü (koyu zemin, mor ışıltı, Outfit/Urbanist). GHL'in sabit
  kimliklerini hedefler (`#payment-link-modal`, `#left_section`, `#paybutton` …); GHL değiştirirse stil
  sessizce düşer, sayfa çalışmaya devam eder.

## Bilinen sınırlar / dersler

- **Stripe'a `appearance` veya `fonts` VERME**: kart alanları boş çiziliyor (2026-10-01 denendi).
  Yalnız `locale` değişiyor.
- **Uygulamayı `visibility:hidden` ile gizleme**: Stripe çerçevesi çizilmiyor. `opacity` kullanılıyor.
- Apple Pay / Google Pay bu alan adında görünmeyebilir (Stripe'ta alan adı kaydı GHL hesabında).
- GHL'in kendisinin gönderdiği linkler (fatura e-postaları vb.) `app.growtify.app` kalır, İngilizce görünür.

## Yayına alma

```bash
cd workers/odeme
npx wrangler deploy          # Cloudflare hesabı: Huseyin@growtify.app's Account
```

Rota: `odeme.growtify.app/*` (zone `growtify.app`). `*.growtify.app/*` rotasından daha özel olduğu için
bu alan adında öncelik bu Worker'da; diğer alt alan adları etkilenmez.

## Yerelde deneme

```bash
npx wrangler dev --port 8788
# http://localhost:8788/payment-link/{id}  — Stripe canlı anahtarı HTTP'de yalnız localhost'ta kart alanı açar
```
