# Growtify.app CRM — Türkçe katman (bakım seti)

GHL CRM'in (white-label "Growtify.app") arayüz metinleri vue-i18n kataloglarından gelir. Biz İngilizce
katalogların üstüne Türkçeyi anahtar anahtar yazarız; GHL mantığına dokunulmaz (locale yine `en-US`).

Sürüm ve değişiklik kaydı: `docs/ceviri/SURUMLER.md`. Sürüm numarası: `scripts/crm-i18n/VERSION`.

## Yayındaki dosyalar (`public/crm/`, 60 sn önbellek, CORS açık)
- `crm-i18n.js` — yükleyici. GHL Ajans Ayarları → Company → White Label → **Custom JS** içindeki tek satır
  bunu yükler (o satır bir daha değişmez; `fetchPriority="high"` 1.6.7'de eklendi — ağır sayfalarda Chrome düşük
  öncelikli betiği 15–28 sn kuyrukta bekletiyordu):
  ```html
  <script>(function(){if(document.getElementById("__gai_crm_i18n"))return;var s=document.createElement("script");s.id="__gai_crm_i18n";s.src="https://growtify.ai/crm/crm-i18n.js?v=1";s.async=true;s.fetchPriority="high";document.head.appendChild(s);})();</script>
  ```
- `crm-config.json` — varsayılan dil, İngilizce/Türkçe açılacak alt hesap listeleri ve `frames` (iframe ekranları
  için vekil adresler; silinirse o ekranlar GHL'den İngilizce açılır).
- `crm-tr.json` — derlenmiş Türkçe katalog: `{version, built_at, instances: {id: {keys, messages}}, dom, text,
  textRules, textPages}`.
- `frames/<id>.json` — iframe ile gömülen GHL uygulamalarının katalogları (liste: `source/frames.json`; ör. takvim
  `calapp`, E-postalar `email`, e-posta oluşturucu `ebuild`); `workers/crm-frames` bunları çerçevedeki yükleyiciye verir.
  Bir çerçevenin kendi gömdüğü GHL uygulaması (E-postalar içindeki e-posta oluşturucu) `frames.json` `nested` ile açılır.

## Kim Türkçe görür
1. Kişinin seçimi önce gelir: üst çubuktaki TR/EN düğmesi (tarayıcıda `gai_crm_lang` olarak hatırlanır) ya da
   adres çubuğunda `?gai_lang=tr|en`.
2. Seçim yoksa `crm-config.json`: `english` listesindeki alt hesaplar (GHL location ID) İngilizce, `turkish`
   listesindekiler Türkçe, diğerleri `default` (şu an `"tr"`; İngilizce kalanlar: Harrington Housing, Rentser).

Sayfadaki sürüm: `document.documentElement.dataset.gaiCrmTr` (ör. `"1.0.0"`).

## Nasıl çalışır
- Ana kabuk (`#app`) global i18n'ine ve ayrı i18n örneği olan alt uygulamalara (`[data-v-app]` kökleri:
  sohbetler, takvim, ödemeler, pazar yeri, nesneler…) `mergeLocaleMessage` ile Türkçe yazılır.
- Hangi katalog hangi köke: `#app` → `shell`; diğerleri anahtar örtüşmesiyle (≥%80) eşleşir.
- GHL sonradan metin eklerse (`merge/setLocaleMessage` sarmalanır) veya Türkçe ezilirse (örnek
  anahtarlarla kontrol) yeniden uygulanır.
- Sunucudan gelen menü etiketleri (`dom`) ve GHL kodunda sabit yazılı metinler (`text`) için birebir eşleşen
  sayfa sözlükleri; değişen düğümler gözlemciyle izlenir. "5 fırsat" gibi sayı+çoğul düzeltmeleri ayrıca.
- Türkçe dil bilgisi düzeltmeleri: GHL'in "kelime başlarını büyüt" işlevi Türkçe harfi kelime sınırı sanar
  ("KişIler", "AçıKlama") → küçük Türkçe harften sonraki tek büyük ASCII harf geri küçültülür. Sayıdan sonra
  çoğul eki atılır ("584 Kişiler" → "584 Kişi", "7/103 sütunlar" → "7/103 sütun"; isim listesiyle), kodda
  birleştirilen "Ekle Kişi" → "Kişi Ekle". Tarihler: kısa/uzun ay adları ve aralıklar ("19 Eyl 2026 – 3 Eki 2026",
  "28 Eylül 2026", "24 Ağustos"); ay adı tam listeyle eşleşir ("Marketing 2" tarih sanılmaz).
- Saatler 24 saat biçiminde ("03:12 PM" → "15:12"); "30 min" → "30 dk", "5 minutes ago" → "5 dakika önce".
- Sunucudan gelen uzun açıklamalar (ör. Laboratuvar) kalın yazı/bağlantıyla parçalara bölünür; bunların
  çevirisi yalnız o sayfada geçerli sözlükte durur (`textPages`, kaynak `dom-pages.json`), "From" gibi kısa
  parçalar başka ekranları bozmaz. Sayfa sözlüğünde 160 karakter sınırı yoktur.
- **iframe ekranları (1.2):** GHL'in ayrı alan adında çalışan uygulamalarına ajans Custom JS yüklenmez. Takvim
  ayarları, İşletme Profili ve E-posta Hizmetleri için yükleyici iframe adresini `crm-config.json` `frames`
  listesindeki Growtify vekil adresine çevirir (`workers/crm-frames`, crm-*.growtify.app); vekil uygulamayı
  GHL'den alıp aynı yükleyiciyi "çerçeve modunda" ekler. CRM ↔ uygulama köprüsünün (postmate) mesaj adresleri
  yükleyicide çevrilir — Postmate iframe'i adres vermeden önce eklediği için boş iframe'lerin penceresi de
  sarılır, `MessageEvent.source` aynı sarmalı döndürür. **Güvenlik ağı:** sayfa açılırken vekil
  `/__gai/health` ile yoklanır; iframe birkaç saniyede cevap vermezse GHL'in kendi adresine döner (ekran
  İngilizce ama çalışır). Hâlâ İngilizce: otomasyon kurucusu, Yapay Zeka Stüdyosu, Sohbet Sağlayıcıları.

## Kaynaklar (`scripts/crm-i18n/source/`)
- `crm-tr.flat.json` — `"örnek::anahtar.yolu": "Türkçe"`; çevirinin tek kaynağı (düzeltmeler burada).
- `crm-en.flat.json` — aynı anahtarların İngilizcesi; GHL metin değiştirdiğinde farkı bulmak için.
- `instance-keys.json` — her katalog örneğinin İngilizce üst düzey anahtarları (yükleyici eşleştirmesi).
- `dom-nav.json` — menüde sunucudan gelen etiketler; `dom-text.json` — GHL kodunda sabit yazılı metinler
  (ikisi de yalnız metnin tamamı birebir eşleşince uygulanır, kişi/mesaj verisine dokunulmaz).
- `dom-rules.json` — sayı/ad içeren kalıplar (`[düzenli ifade, karşılık]`); `dom-pages.json` — yalnız bir sayfada
  geçerli metinler (`{"/settings/labs": {...}}`).
- `frames.json` — iframe uygulamaları (`id → GHL adresi, vekil adres, ekran`); bu örnekler ana katalogda değil
  `public/crm/frames/<id>.json`'da derlenir. Katalog: uygulamanın adresini ayrı sekmede açıp
  `tour/frame-extract.js` (çerçeve uygulamaları kompozisyon modunda; i18n örneği `provides` içinde).

Derleme: `npm i --no-save @intlify/message-compiler && node scripts/crm-i18n/build.mjs` → `public/crm/crm-tr.json`
(sürüm `VERSION`'dan; İngilizcesiyle aynı ve derlenmeyen metinler atlanır).

## Güncelleme akışı (GHL metin eklediğinde / değiştirdiğinde)
1. **Katalog topla** — CRM'e giriş yapılmış sekmede `collect-catalog.js` (konsol): güvenli sayfaları dolaşır,
   tüm i18n örneklerini IndexedDB'ye yazar, `__crmDownload()` ile JSON indirir. Kayıt oluşturabilecek
   sayfalar (new/create/import/delete/checkout…) ve tam sayfa yenileyen yollar atlanır.
2. **Fark çıkar** — yeni İngilizce katalogla `source/crm-en.flat.json` karşılaştırılır; yeni/değişen anahtarlar
   ~16 bin karakterlik parçalara bölünür.
3. **Çevir** — `TRANSLATION-GUIDE.md` (terimler + sözdizimi kuralları + önceki kararlar) ile; her parça
   `validate.mjs` ile 0 HATA olmalı (yer tutucular, çoğul `|` sayısı, baş/son boşluk, HTML etiketleri,
   çıplak `@ { } |`, @intlify derlemesi). Sonuç `source/crm-tr.flat.json`'a, İngilizcesi `crm-en.flat.json`'a.
4. **Sabit metinler** — Türkçe açıkken sayfaları gezip İngilizce kalan metinleri topla; katalogda karşılığı
   olanları aynı Türkçeyle, olmayanları çevirerek `source/dom-text.json`'a ekle. Araçlar (`tour/`):
   - `tour.js` — **tıklamalı tur**: her sayfada sekmeleri, filtre/sütun/sıralama düğmelerini, açılır menü ve
     seçim kutularını AÇAR (seçeneğe tıklamaz, Escape ile kapatır; sil/gönder/yayınla/oluştur/ekle yasak;
     sohbet gelen kutusu ve otomasyon dışarıda). İngilizceyi katalogdan kurulan kelime dağarcığıyla tanır,
     Türkçe büyük harf hatalarını ("KişIler") ve eşleşmeyen i18n kataloglarını ayrıca toplar. Sayfalar
     `window.__gaiTourRange` ile birkaç sekmeye bölünür; sonuç tek dosya indirilir. → `tour-process.mjs`
   - `cat-tour.js` — **katalog farkı turu**: GHL bazı kabuk bölümlerini (reklam yöneticisi, müşteri portalı,
     hizmetler/kiralamalar, Yext…) yalnız o sayfa açılınca yükler; ilk katalog toplamada görünmezler. Her
     sayfayı açıp canlı i18n mesajlarını toplar → `delta-process.mjs` bizde olmayan anahtarları çıkarır.
   - **Tuzak:** CEO başka pencerede çalışırken sekme arka planda kalır ve tarayıcı `setTimeout`'u
     yavaşlatır (5 dk sonra dakikada bir). Turların beklemesi bu yüzden bir Worker sayacıyla yapılır.
5. **Derle ve test et** — `build.mjs`, sonra CRM sekmesinde dosya yükleme yöntemiyle (gizli `<input type=file>`
   → katalog + yükleyici) modül modül gez; konsol temiz, metinler Türkçe, TR/EN düğmesi çalışıyor.
6. **Sürüm** — `VERSION` artır + `docs/ceviri/SURUMLER.md` satırı + (ARA/ANA) D1 revizyon kaydı → PR → onay → merge.

## GHL güncelleme takibi

`watch-ghl.mjs` CRM kabuğunun (`app.js` ETag) ve gömülü uygulamaların (`frames.json` adreslerindeki ana betik adı)
sürüm izlerini `source/ghl-versions.json` ile karşılaştırır. GitHub Actions bunu her gün çalıştırır (`crm-i18n-watch.workflow.yml`; devreye alma notu dosyanın başında —
`workflow` izni gerekiyor); bir uygulama değiştiyse "CRM çeviri: GHL güncellemesi algılandı" issue'su açar. Yapılacak: o uygulamanın
kataloğunu topla → farkı çevir → yayınla → `node scripts/crm-i18n/watch-ghl.mjs --write` ile izleri güncelle (aynı PR'da).
Not: kabuğun alt uygulamaları (kişiler, fırsatlar…) ayrı yüklenir; onların değişimini en iyi çeviri avı (`?gai_hunt=1`) gösterir.
