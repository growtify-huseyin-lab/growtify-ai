# panel.growtify.ai — GHL Client Portal edge proxy

Canlıdaki adı `gai-portal-proxy`. GHL'in Client Club portalını (`e8zrrmoybs08x5l6qgss.app.clientclub.net`)
`panel.growtify.ai` alan adından sunar.

- Tüm istekler GHL kökenine aktarılır (yöntem, gövde, başlıklar); `Location` başlığı portal alan adına
  çevrilir, `Set-Cookie`'deki `Domain=` kaldırılır, CSP başlıkları atılır.
- HTML'e favicon + favicon koruyucu betik + panel Türkçe çeviri yükleyicisi
  (`growtify.ai/portal/community-i18n.js?v=2`, web sitesi deposunda `public/portal/`) eklenir.

## Kurs teklif (satın alma) sayfaları — `/courses/offers/*`

Quizi bitiren kişinin GROWT modülünü satın aldığı sayfa (GHL Client Club teklif ödemesi). GHL'in bu
uygulaması Türkçe desteklemiyor; teklifin GHL ayarındaki eski çeviri kodu ("TR Localization v8.4")
GHL güncellemesinden sonra çalışmıyor. Bu Worker yalnız bu yollara odeme.growtify.app ile aynı katmanı ekler:

- `src/offer.client.js` (`<head>` başında, satır içi): Stripe `locale: "tr"`; uygulamanın vue-i18n'ine
  Türkçe metinler (GHL'in kendi anahtarları; ödeme penceresi ve teşekkür ekranı dahil); koda gömülü
  İngilizce doğrulama mesajları; telefon varsayılanı Türkiye (alanın kendi ülke seçme işleyicisiyle);
  `TL9999.00` → `9.999,00 TL`; şartlar linki growtify-ai.vercel.app → growtify.ai
- `src/offer.css`: growtify.app koyu tasarım; sol tarafta şimdilik yalnız görsel (başlık + açıklama
  gizli, CEO kararı 2026-10-01); ödeme kartı + "Ödemeye Geç" koyu buton; eski GHL özel CSS'inin işi
  (alan sırası) burada karşılandı
- başlık (logo + "Güvenli Ödeme") ve alt bilgi `#__nuxt` dışında

Sonra yapılacak (GHL'de): teklifin eski özel JS ve CSS'ini temizlemek; şartlar linkini growtify.ai yapmak.
Yerelde (`wrangler dev`) teklif uygulaması açılmaz (yalnız portal alan adında çalışıyor); deneme için
gerçek sayfayı tarayıcıda açıp HTML'e aynı eklemeleri yapan bir test düzeneği kullanıldı.

Kaynak 2026-10-01'de Cloudflare'deki canlı betikten alındı (önceki kopya `/tmp`'deydi ve kayboldu).
Canlıyla eşdeğerlik: `/login` çıktısındaki eklenen blok birebir aynı, başlık davranışı aynı.

## Yayına alma

```bash
cd workers/panel
npx wrangler deploy          # Cloudflare hesabı: Huseyin@growtify.app's Account
```

⚠️ Bu Worker tüm paneli (topluluk, kurslar, giriş, kurs satın alma) taşır. Değişiklikten önce
yerelde `npx wrangler dev --port 8789` ile giriş, topluluk ve teklif sayfalarını dene.
