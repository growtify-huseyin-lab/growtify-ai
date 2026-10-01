# panel.growtify.ai — GHL Client Portal edge proxy

Canlıdaki adı `gai-portal-proxy`. GHL'in Client Club portalını (`e8zrrmoybs08x5l6qgss.app.clientclub.net`)
`panel.growtify.ai` alan adından sunar.

- Tüm istekler GHL kökenine aktarılır (yöntem, gövde, başlıklar); `Location` başlığı portal alan adına
  çevrilir, `Set-Cookie`'deki `Domain=` kaldırılır, CSP başlıkları atılır.
- HTML'e favicon + favicon koruyucu betik + panel Türkçe çeviri yükleyicisi
  (`growtify.ai/portal/community-i18n.js?v=2`, web sitesi deposunda `public/portal/`) eklenir.

Kaynak 2026-10-01'de Cloudflare'deki canlı betikten alındı (önceki kopya `/tmp`'deydi ve kayboldu).
Canlıyla eşdeğerlik: `/login` çıktısındaki eklenen blok birebir aynı, başlık davranışı aynı.

## Yayına alma

```bash
cd workers/panel
npx wrangler deploy          # Cloudflare hesabı: Huseyin@growtify.app's Account
```

⚠️ Bu Worker tüm paneli (topluluk, kurslar, giriş, kurs satın alma) taşır. Değişiklikten önce
yerelde `npx wrangler dev --port 8789` ile giriş, topluluk ve teklif sayfalarını dene.
