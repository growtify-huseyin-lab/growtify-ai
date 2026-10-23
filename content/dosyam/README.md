# Çalışma Dosyam — bölüm tanımları

`sections/*.yaml` öğrencinin dosyasındaki 51 bölümü tanımlar. **Course yazar** (kaynak: ders scriptlerinin
teslim tabloları), Development okur. Şema ve açık noktalar: `_handoff/calisma-dosyam/icerik/sections/README.md`.

YAML değişince uygulamanın okuduğu JSON yeniden üretilmeli (CI güncel değilse kırmızı verir):

```bash
node scripts/dosyam/build-sections.mjs
```

Dosyada şimdilik R, O, OV, W, Büyüme Döngüm ve T modülleri gösterilir. FREE/BB/G'nin dahil olup olmayacağı
CEO kararı bekliyor (`src/lib/dosyam/sections.ts` → `FILES`).
