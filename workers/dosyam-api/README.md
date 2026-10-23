# gai-dosyam-api — Çalışma Dosyam veri katmanı

Öğrencinin ders çıktılarını (bölüm teslimleri, sürümleri, Büyüme Döngüm haftaları) ve giriş/oturum
kayıtlarını tutan Cloudflare Worker + D1. Yalnız growtify.ai sunucusu çağırır.

- Karar: `growtify-env/docs/cto-briefs/decisions/ADR-20261023-gai-dosyam-ayri-d1.md`
- Mimari: `Projects/Growtify-ai/_handoff/calisma-dosyam/MIMARI-TASLAK-v0.1.md`

## Kurallar

- **Ayrı hesap.** Cloudflare hesabı **"Growtify Ai"** yalnız bu sisteme özeldir (CEO kuralı). Başka proje,
  araç ya da deneme bu hesaba açılmaz; ops hesabının token'ı buraya erişmez. Token:
  `~/.growtify/cloudflare-gai-dosyam.json` — transcript'e, repoya, `.env`'e yazılmaz.
- **Yalnız veri katmanı.** Claude ve GHL anahtarları burada YOK; GHL'e yazmayı growtify.ai yapar (kuyruktan).
- **İmzalı istek.** Her istek `x-dosyam-ts`, `x-dosyam-nonce`, `x-dosyam-student`, `x-dosyam-sig` taşır.
  İmza = HMAC-SHA256(anahtar, yöntem · yol · zaman · nonce · öğrenci · gövde hash'i), ±300 sn; nonce tekrar
  kullanılamaz. Rotasyon için `DOSYAM_HMAC_KEY_PREV` da kabul edilir. Kod: `src/sig.ts` (growtify.ai aynı dosyayı kullanır).
- **Kiracı izolasyonu.** Öğrenci kimliği yalnız imzalı `x-dosyam-student` başlığından gelir; öğrenciye ait
  her sorgu `StudentScope` üzerinden ve `student_id` ile süzülür (`src/db.ts`).
- **Erişim modu tarihten hesaplanır.** Temel 28 gün, Tam 112 gün (28 gün + 3 ay) aktif; sonra salt okunur.
  `kapali` yalnız silme talebinde.
- **Log.** Yalnız yöntem, yol kalıbı ve durum kodu; gövde ve öğrenci içeriği asla loglanmaz.

## Test

```bash
npm run test:dosyam      # tip kontrolü + testler (Node'un yerleşik SQLite'ı, gerçek migrasyonlarla)
```

CI: `.github/workflows/dosyam-api.yml` — yeşil olmadan deploy yok (ADR K13).

## İlk kurulum (bir kez)

```bash
cd workers/dosyam-api
export CLOUDFLARE_API_TOKEN=…   # ~/.growtify/cloudflare-gai-dosyam.json
npx wrangler d1 create gai-dosyam --jurisdiction eu     # çıkan database_id → wrangler.toml
npx wrangler d1 migrations apply gai-dosyam --remote
openssl rand -hex 32 | npx wrangler secret put DOSYAM_HMAC_KEY   # aynı değer Vercel'e DOSYAM_HMAC_KEY
npx wrangler deploy
```

## Yayına alma

```bash
npx wrangler d1 migrations apply gai-dosyam --remote   # yeni migrasyon varsa
npx wrangler deploy
```
