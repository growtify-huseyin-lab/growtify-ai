# Panel Türkçe kataloğu (panel.growtify.ai)

Panel (GHL Client Portal) arayüzünün metinleri, panelin **kendi metin kataloğundan** (vue-i18n)
anahtar bazında Türkçeleşir:

- `public/portal/panel-tr.json` — GHL anahtarı → Türkçe (tek kaynak).
- `public/portal/community-i18n.js` bu dosyayı yükleyip panelin `en` kataloğunun üstüne yazar
  (dil kodu `en` kalır, GHL'in dil mantığı değişmez). EN grupta (`en-growtify-ai`) orijinal
  İngilizceyi geri koyar.
- Kataloğun dışında kalan sabit metinler ve tarihler için aynı dosyadaki DOM sözlüğü yedek olarak
  çalışmaya devam eder.

GHL bir güncellemeyle yeni metin eklerse o metinler çevrilene kadar İngilizce görünür; mevcut
çeviriler bozulmaz.

## GHL güncellemesinden sonra yenileme

```bash
npm i --no-save puppeteer-core @intlify/message-compiler
node scripts/panel-i18n/dump-en-catalog.mjs /tmp/panel-en.new.json
node scripts/panel-i18n/diff-catalog.mjs /tmp/panel-en.new.json /tmp/panel-todo.en.json
# /tmp/panel-todo.en.json → TRANSLATION-GUIDE.md'ye göre çevir → /tmp/panel-todo.tr.json
node scripts/panel-i18n/validate.mjs /tmp/panel-todo.en.json /tmp/panel-todo.tr.json
node scripts/panel-i18n/build-tr.mjs --en /tmp/panel-en.new.json /tmp/panel-todo.tr.json
```

Sonra PR → merge; Vercel'e çıktıktan ~60 sn sonra panelde canlıdır (`panel-tr.json` 60 sn önbellek).

`panel-en.snapshot.json`, çevirinin dayandığı İngilizce kataloğun kopyasıdır; `diff-catalog.mjs`
yeni ve İngilizcesi değişen anahtarları buna göre bulur.
