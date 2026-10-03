# crm-*.growtify.app — CRM'deki GHL iframe ekranlarının Türkçe katmanı

CRM'deki bazı ekranlar GHL'in ayrı alan adlarındaki uygulamalardan iframe ile gelir; ajans Custom JS'teki
Türkçe yükleyici (`growtify.ai/crm/crm-i18n.js`) oraya ulaşamaz. Bu Worker o uygulamaları Growtify alan
adından sunar ve sayfanın başına aynı yükleyiciyi "çerçeve modunda" ekler:

| Vekil adres | GHL uygulaması | Ekran | Katalog |
|---|---|---|---|
| `crm-takvim.growtify.app` | `calendar-app.leadconnectorhq.com` | Ayarlar > Takvimler (listeler, tercihler, bağlı hesaplar) | `growtify.ai/crm/frames/calapp.json` |
| `crm-ayarlar.growtify.app` | `client-app-crm-settings.leadconnectorhq.com` | Ayarlar > İşletme Profili | `growtify.ai/crm/frames/crmset.json` |
| `crm-eposta.growtify.app` | `ghl-isv-app-prod.leadconnectorhq.com` | Ayarlar > E-posta Hizmetleri | `growtify.ai/crm/frames/isv.json` |
| `crm-otomasyon.growtify.app` | `client-app-automation-workflows.leadconnectorhq.com` | Otomasyon > İş Akışları | `growtify.ai/crm/frames/wf.json` |
| `crm-epostalar.growtify.app` | `email-home-prod.leadconnectorhq.com` | Pazarlama > E-postalar | `growtify.ai/crm/frames/email.json` |
| `crm-sohbet.growtify.app` | `client-app-crm-conversations.leadconnectorhq.com` | Ayarlar > Sohbet Sağlayıcıları (katalog 10 metin + sağlayıcı türleri) | `growtify.ai/crm/frames/conv.json` |
| `crm-ortaklik.growtify.app` | `client-app-affiliate-manager.leadconnectorhq.com` | Pazarlama > Satış Ortaklığı | `growtify.ai/crm/frames/aff.json` |
| `crm-studyo.growtify.app` | `leadgen-vibe-ai-builder.leadconnectorhq.com` | Yapay Zeka Stüdyosu (tam ekran) | `growtify.ai/crm/frames/vibe.json` |
| `crm-formlar.growtify.app` | `leadgen-apps-form-survey-builder.leadconnectorhq.com` | Form / anket / test oluşturucu (`noDom`) | `growtify.ai/crm/frames/form.json` |
| `crm-sayfa.growtify.app` | `page-builder.leadconnectorhq.com` | Satış hunisi / web sitesi sayfa oluşturucu (`noDom`) | `growtify.ai/crm/frames/page.json` |
| `crm-eposta-tasarim.growtify.app` | `email-builder-prod.leadconnectorhq.com` | E-posta oluşturucu — E-postalar çerçevesinin içinde (iç içe, `noDom`) | `growtify.ai/crm/frames/ebuild.json` |

Bir adres kullanıcıya ancak `crm-config.json` `frames` listesine eklenince açılır; listede olmayan adres yalnız
bakım/deneme içindir (çeviri hazır olmadan kullanıcıya gösterilmez).

## Nasıl çalışır

1. CRM'deki yükleyici `crm-config.json` içindeki `frames` listesine bakar; listedeki bir GHL adresine giden
   iframe'in adresini buradaki karşılığına çevirir (`?gai_frame=tr|en` ekler; CRM'in kendi `gai_lang`'ından ayrı, çünkü bazı uygulamalar adreslerini CRM'in adres çubuğuna yansıtıyor). Kullanıcı aynı ekranda kalır.
2. CRM ile uygulama arasındaki köprü (postmate) mesajlarının adresleri yükleyicide çevrilir; uygulamanın
   kimlik bilgisi CRM'den tarayıcı içinde gelir, API çağrıları doğrudan GHL'e gider (Worker'dan geçmez).
3. Worker uygulamanın sayfasını GHL'den alır, `<head>` başına küçük bir başlangıç betiği (dil işaretini okur, adresten
   siler) ve yükleyiciyi `async` ekler — uygulama yükleyiciyi beklemez; diğer dosyalar aynen geçer.

## İç içe çerçeve (`nested`)

Bazı uygulamalar başka bir GHL uygulamasını kendi içinde iframe ile açar: E-postalar (`crm-epostalar`) bir kampanyayı ya
da şablonu düzenlerken e-posta oluşturucuyu (`email-builder-prod`) postmate köprüsüyle gömer. CRM'deki yükleyici o
iframe'e ulaşamaz; çevirme işini E-postalar çerçevesindeki yükleyici yapar. Liste `frames.json`'da çerçevenin `nested`
alanındadır (`{GHL adresi: vekil adres}`), derlemede çerçeve kataloğuna kopyalanır. Yalnız GHL adresi → `crm-*.growtify.app`
eşlemeleri kabul edilir. Kapatmak: `nested` silinir (ya da `crm-config.json` `frames` ile hepsi — dış çerçeve vekilden
açılmazsa iç içe olan da açılmaz).

Deneme (kullanıcıya açmadan, yalnız bir sekmede): CRM sekmesinde E-postalar açıkken
`document.querySelector('iframe').contentWindow.postMessage({gaiNested: {"https://email-builder-prod.leadconnectorhq.com": "https://crm-eposta-tasarim.growtify.app"}}, "*")`
— o sekmede çerçevenin sessionStorage'ına yazılır, oluşturucu açılınca vekilden gelir. Kaldırmak: `{gaiNested: null}`.

## Oluşturucular (`noDom`)

Form, sayfa ve e-posta oluşturucularında tuvaldeki önizleme kişinin kendi içeriğidir. `frames.json`'da `noDom: true` olan çerçevede
yükleyici sayfa sözlüğünü (birebir metin, kalıplar, tarih kuralları) hiç uygulamaz; yalnız uygulamanın kendi metin kataloğu
çevrilir. Böylece önizleme ile kaydedilen içerik aynı kalır. `domOnly` (seçici) verilirse sözlük yalnız o arayüz alanlarında
uygulanır (ör. form oluşturucunun öğe paleti); o alanların sözlüğü uygulamanın kataloğundan üretilir.

## Uygulama dosyasında metin değişikliği (`JS_TEXT`)

Bazı metinler ekrana değil işleme gider (ör. Yapay Zeka Stüdyosu şablonuna tıklanınca istem kutusuna yazılan hazır istem;
yapay zekâ siteyi bu dilde kurar). Bunlar `src/worker.js` `JS_TEXT` haritasıyla uygulamanın `/assets/*.js` dosyasında
birebir değiştirilir. Vekil yalnız Türkçe arayüzde kullanıldığı için güvenli; GHL metni değiştirirse eşleşme olmaz, dosya
olduğu gibi geçer. Haritayı değiştirince `JS_TEXT_VERSION`'ı artır (kenar önbelleği anahtarı).

## Yazı içeren çizimler (`ASSET_TR`)

Yazıları harf şekline çevrilmiş SVG çizimler metin olarak çevrilemez. Türkçe kopyası `public/crm/frames/assets/` altında
durur; vekil, `src/worker.js` `ASSET_TR` haritasındaki dosya adı istendiğinde Türkçe kopyayı sunar. GHL çizimi değiştirirse
dosya adı değişir ve İngilizcesi gelir (bozulmaz); yeni çizimin Türkçe kopyası hazırlanıp harita güncellenir. Şu an: Satış
Ortaklığı tanıtım çizimi (`Frame1.7d8ea9f0.svg` → `aff-hero.tr.svg`).

## Güvenlik

- Yalnız tablodaki GHL adresleri; açık vekil değil. Yalnız GET/HEAD.
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

GHL bu uygulamalara yeni metin eklediğinde kataloğu iki yoldan biriyle al:
- Uygulama kendi adresinde açılıyorsa (takvim, ayarlar, e-posta hizmetleri, otomasyon): adresi ayrı sekmede aç,
  `scripts/crm-i18n/tour/frame-extract.js` → `gai-crm-<ad>-katalog.json`.
- Yalnız CRM içinde açılıyorsa (E-postalar, Sohbet Sağlayıcıları): CRM sekmesinde `sessionStorage.gai_frame_proxy`
  (GHL adresi → vekil) ve `sessionStorage.gai_frame_lang = "en"` ile ekranı aç; iframe'e `{gaiCollect: 1}` gönder,
  yükleyici `{gaiFrameCatalog: {frame, path, instances: [{top, flat}]}}` ile cevap verir.
Sonra farkı çevir → `scripts/crm-i18n/source`'a işle → `node scripts/crm-i18n/build.mjs` (frames/<id>.json'u da üretir).
