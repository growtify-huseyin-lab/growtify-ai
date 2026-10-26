# Günlük çeviri kontrolü

CEO kararı (2026-10-26): Türkçe çevirinin güncel kalması her gün elle kontrol edilen bir iş. CEO günde bir kez
oturuma **"çeviri kontrolü"** yazar. Oturum aşağıdaki adımları sırayla yapar ve sonunda tek tablo verir.

## 1. Değişiklik var mı? (giriş gerekmez, ~1 dk)

```bash
node scripts/crm-i18n/watch-ghl.mjs                        # kabuk + 12 gömülü uygulamanın sürüm izi
gh issue list -R growtify-huseyin-lab/growtify-ai --state open --search "çeviri"
```

Değişen yoksa ve açık bekçi kaydı yoksa: **"Bugün yeni metin yok"** — iş biter.

## 2. Değişen uygulamanın yeni metinleri

| Değişen | Nasıl bulunur | Süre |
|---|---|---|
| Gömülü uygulamalar (wf, page, calapp, crmset, email, ebuild, form, isv, conv, aff, vibe) | `node scripts/crm-i18n/frame-diff.mjs out.en.json <id…>` — giriş gerekmez | ~2 dk |
| Üyelikler (memb) | `node scripts/crm-i18n/memb-catalog.mjs out.en.json` → crm-en.flat ile fark | ~1 dk |
| Öğrenci paneli | `scripts/panel-i18n/README.md` → dump → diff | ~2 dk |
| Kabuk (ana CRM) | CEO'nun Chrome'unda admin.growtify.app sekmesi açıkken katalog taraması (uygulama başına 1 sayfa, ~40 dk; ilerleme kayıtlı) — yöntem: hafıza `project_tr_translation_versions` 2026-10-26 notu | ~40 dk |

## 3. Çevir → doğrula → yayınla

`TRANSLATION-GUIDE.md` + `validate.mjs` (0 hata) → kaynaklara + yeni üst anahtarlar `instance-keys.json`'a → `build.mjs` →
sürüm + `SURUMLER.md` → PR → merge → `watch-ghl.mjs --write`.

## 4. CEO'ya rapor (tek tablo)

| Alan | Yeni metin | Durum |
|---|---|---|
| … | … | çevrildi / bekliyor |

## Ekranda görülen İngilizce

CEO bir ekranda İngilizce görürse ekran adını ya da görüntüsünü oturuma verir; o metin aynı gün sözlüğe ya da kataloğa eklenir.
Bilinen açık: kurs sayfasındaki "Finished setting up your course?" afişi GHL kodunda yok (sonradan gelen içerik).
