# Growtify.app CRM — Türkçe katman (bakım seti)

GHL CRM'in (white-label "Growtify.app") arayüz metinleri vue-i18n kataloglarından gelir. Biz İngilizce
katalogların üstüne Türkçeyi anahtar anahtar yazarız; GHL mantığına dokunulmaz (locale yine `en-US`).

Sürüm ve değişiklik kaydı: `docs/ceviri/SURUMLER.md`. Sürüm numarası: `scripts/crm-i18n/VERSION`.

## Yayındaki dosyalar (`public/crm/`, 60 sn önbellek, CORS açık)
- `crm-i18n.js` — yükleyici. GHL Ajans Ayarları → Company → White Label → **Custom JS** içindeki tek satır
  bunu yükler (o satır bir daha değişmez):
  ```html
  <script>(function(){if(document.getElementById("__gai_crm_i18n"))return;var s=document.createElement("script");s.id="__gai_crm_i18n";s.src="https://growtify.ai/crm/crm-i18n.js?v=1";s.async=true;document.head.appendChild(s);})();</script>
  ```
- `crm-config.json` — Türkçe açılacak alt hesaplar (GHL location ID listesi, `locations`).
- `crm-tr.json` — derlenmiş Türkçe katalog: `{version, built_at, instances: {id: {keys, messages}}, dom}`.

## Kim Türkçe görür
1. Kişinin seçimi önce gelir: sağ üstteki TR/EN düğmesi (tarayıcıda `gai_crm_lang` olarak hatırlanır) ya da
   adres çubuğunda `?gai_lang=tr|en`.
2. Seçim yoksa: alt hesap `crm-config.json` listesindeyse Türkçe, değilse İngilizce.

Sayfadaki sürüm: `document.documentElement.dataset.gaiCrmTr` (ör. `"1.0.0"`).

## Nasıl çalışır
- Ana kabuk (`#app`) global i18n'ine ve ayrı i18n örneği olan alt uygulamalara (`[data-v-app]` kökleri:
  sohbetler, takvim, ödemeler, pazar yeri, nesneler…) `mergeLocaleMessage` ile Türkçe yazılır.
- Hangi katalog hangi köke: `#app` → `shell`; diğerleri anahtar örtüşmesiyle (≥%80) eşleşir.
- GHL sonradan metin eklerse (`merge/setLocaleMessage` sarmalanır) veya Türkçe ezilirse (örnek
  anahtarlarla kontrol) yeniden uygulanır.
- Sunucudan gelen menü etiketleri (`dom`) ve GHL kodunda sabit yazılı metinler (`text`) için birebir eşleşen
  sayfa sözlükleri; değişen düğümler gözlemciyle izlenir. "5 fırsat" gibi sayı+çoğul düzeltmeleri ayrıca.
- Çevrilemeyenler (bugün): GHL'in ayrı alan adında iframe içinde çalışan uygulamalar — otomasyon kurucusu,
  takvim ayarları, Ayarlar sayfalarının içeriği (`client-app-crm-settings`), Yapay Zeka Stüdyosu. Ajans
  Custom JS oralara yüklenmez (bkz. SURUMLER.md, iş kaydı dev-028).

## Kaynaklar (`scripts/crm-i18n/source/`)
- `crm-tr.flat.json` — `"örnek::anahtar.yolu": "Türkçe"`; çevirinin tek kaynağı (düzeltmeler burada).
- `crm-en.flat.json` — aynı anahtarların İngilizcesi; GHL metin değiştirdiğinde farkı bulmak için.
- `instance-keys.json` — her katalog örneğinin İngilizce üst düzey anahtarları (yükleyici eşleştirmesi).
- `dom-nav.json` — menüde sunucudan gelen etiketler; `dom-text.json` — GHL kodunda sabit yazılı metinler
  (ikisi de yalnız metnin tamamı birebir eşleşince uygulanır, kişi/mesaj verisine dokunulmaz).

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
   olanları aynı Türkçeyle, olmayanları çevirerek `source/dom-text.json`'a ekle.
5. **Derle ve test et** — `build.mjs`, sonra CRM sekmesinde dosya yükleme yöntemiyle (gizli `<input type=file>`
   → katalog + yükleyici) modül modül gez; konsol temiz, metinler Türkçe, TR/EN düğmesi çalışıyor.
6. **Sürüm** — `VERSION` artır + `docs/ceviri/SURUMLER.md` satırı + (ARA/ANA) D1 revizyon kaydı → PR → onay → merge.
