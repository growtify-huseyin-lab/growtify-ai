# crm-*.growtify.app — CRM'deki GHL iframe ekranlarının Türkçe katmanı

CRM'deki bazı ekranlar GHL'in ayrı alan adlarındaki uygulamalardan iframe ile gelir; ajans Custom JS'teki
Türkçe yükleyici (`growtify.ai/crm/crm-i18n.js`) oraya ulaşamaz. Bu Worker o uygulamaları Growtify alan
adından sunar ve sayfanın başına aynı yükleyiciyi "çerçeve modunda" ekler:

| Vekil adres | GHL uygulaması | Ekran | Katalog |
|---|---|---|---|
| `crm-takvim.growtify.app` | `calendar-app.leadconnectorhq.com` | Ayarlar > Takvimler (listeler, tercihler, bağlı hesaplar) | `growtify.ai/crm/frames/calapp.json` |
| `crm-ayarlar.growtify.app` | `client-app-crm-settings.leadconnectorhq.com` | Ayarlar > İşletme Profili | `growtify.ai/crm/frames/crmset.json` |
| `crm-eposta.growtify.app` | `ghl-isv-app-prod.leadconnectorhq.com` | Ayarlar > E-posta Hizmetleri | `growtify.ai/crm/frames/isv.json` |

## Nasıl çalışır

1. CRM'deki yükleyici `crm-config.json` içindeki `frames` listesine bakar; listedeki bir GHL adresine giden
   iframe'in adresini buradaki karşılığına çevirir (`?gai_lang=tr|en` ekler). Kullanıcı aynı ekranda kalır.
2. CRM ile uygulama arasındaki köprü (postmate) mesajlarının adresleri yükleyicide çevrilir; uygulamanın
   kimlik bilgisi CRM'den tarayıcı içinde gelir, API çağrıları doğrudan GHL'e gider (Worker'dan geçmez).
3. Worker uygulamanın sayfasını GHL'den alır, `<head>` başına yükleyiciyi ekler; diğer dosyalar aynen geçer.

## Güvenlik

- Yalnız tablodaki üç GHL adresi; açık vekil değil. Yalnız GET/HEAD.
- İstekte çerez/kimlik başlığı iletilmez; yanıttaki `Set-Cookie` atılır.
- GHL bu uygulamalarda şu an CSP / X-Frame-Options göndermiyor (2026-10-03). İleride gönderirse çerçeveleme
  izni CRM adresleriyle sınırlanır (`frame-ancestors`), betik izni yalnız growtify.ai için genişletilir.

## Bozulmazlık

- Sayfa açılırken yükleyici her vekilin `/__gai/health` adresini yoklar; cevap yoksa o vekil hiç kullanılmaz.
- Vekil iframe'i birkaç saniye içinde cevap vermezse yükleyici iframe'i GHL'in kendi adresine geri çevirir —
  ekran İngilizce ama çalışır halde açılır.
- Tümünü kapatmak: `public/crm/crm-config.json` içinden `frames` silinir (Worker'a dokunmadan, ~1 dk içinde).

## Yayına alma

```bash
cd workers/crm-frames
npx wrangler deploy          # Cloudflare hesabı: Huseyin@growtify.app's Account
```

Sonra `https://crm-takvim.growtify.app/__gai/health` `{"ok":true,...}` dönmeli. Sıra: önce Worker, sonra
`frames` içeren `crm-config.json`'ın yayına çıkması (Worker yokken yayına çıkarsa ekranlar GHL'den İngilizce
açılır, bozulmaz).

Yerel deneme: `npx wrangler dev --var DEV_APP:crm-ayarlar.growtify.app --port 8791` (localhost'ta hangi
uygulamanın sunulacağı). CRM sekmesinde yalnız o sekme için: `sessionStorage.gai_frame_proxy =
'{"https://client-app-crm-settings.leadconnectorhq.com":"http://127.0.0.1:8791"}'` + 1.2 yükleyici.

## Bakım

GHL bu uygulamalara yeni metin eklediğinde: uygulamanın kendi adresini ayrı sekmede açıp
`scripts/crm-i18n/tour/frame-extract.js` ile kataloğu indir → farkı çevir → `scripts/crm-i18n/source`'a işle →
`node scripts/crm-i18n/build.mjs` (frames/<id>.json'u da üretir).
