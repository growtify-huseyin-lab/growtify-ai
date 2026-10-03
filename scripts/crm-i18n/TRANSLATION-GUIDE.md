# Growtify.app CRM (GoHighLevel) — Turkish UI translation guide

## Context
Growtify.app is a white-labeled GoHighLevel CRM used by Turkish small-business owners and by the students
of Growtify AI's GROWT program (beginners learning to run their business with a CRM + AI). Areas in this
work: navigation and shared UI, contacts (smart lists, contact detail, custom fields, bulk actions, tasks,
notes), conversations (unified inbox: SMS, e-mail, WhatsApp, social DMs, AI replies), calendars and
appointments, opportunities (sales pipelines and stages), launchpad (getting-started screen),
notifications, media library, basic settings, login. We override the app's English vue-i18n catalogs with
Turkish key by key; every string is shown in the real UI.

You get a JSON file of `"instance::dotted.key": "English text"`. The part before `::` only says which app
bundle the string belongs to (`shell`, `conv-a`, `conv-b`, `cal-a`, `cal-b`) — keep the key exactly as is.
Key names tell you where the string is used (`...placeholder`, `...tooltip`, `...ariaLabel`, `...title`,
`...description`, `...error`, `...success`, `...toast`). Read neighbouring keys for context.

## Voice
- Natural, fluent Turkish product copy — like a well-made Turkish SaaS. Short, clear, professional but warm.
- Address the user informally with "sen" (never "siz"): "Kişiyi kaydet", "Takvimini bağla",
  "Bu işlemi geri alamazsın."
- No slang, no exclamation marks unless the source has one.

## Capitalization & punctuation
- Mirror the source: Title Case labels/buttons/tabs → Turkish Title Case ("Kişi Ekle", "Toplu İşlemler");
  sentence case → sentence case. Turkish capitals: i→İ, ı→I. Keep end punctuation and "..." vs "…" as in
  source.

## Glossary (use consistently)
Navigation: Dashboard → Pano · Launchpad → Başlangıç · Conversations → Sohbetler · Calendars → Takvimler ·
Contacts → Kişiler · Opportunities → Fırsatlar · Payments → Ödemeler · Marketing → Pazarlama ·
Automation → Otomasyon · Sites → Siteler · Memberships → Üyelikler · Media Storage/Library → Medya Kütüphanesi ·
Reputation → İtibar · Reporting → Raporlama · Settings → Ayarlar · App Marketplace → Uygulama Pazarı ·
Ask AI → Yapay Zekaya Sor · AI Agents → Yapay Zeka Ajanları
CRM objects: Contact → Kişi · Company → Şirket · Opportunity → Fırsat · Pipeline → Süreç (Sales pipeline →
Satış süreci) · Stage → Aşama · Lead → Potansiyel müşteri · Customer → Müşteri · Owner / Assigned to →
Sorumlu / Atanan · Follower → Takipçi · Tag → Etiket · Smart List → Akıllı Liste · Custom Field → Özel Alan ·
Custom Value → Özel Değer · Note → Not · Task → Görev · Due date → Son tarih · Bulk Actions → Toplu İşlemler ·
Import → İçe aktar · Export → Dışa aktar · Merge → Birleştir · Duplicate (record) → Yinelenen kayıt ·
Source → Kaynak · Status → Durum · Won/Lost/Open/Abandoned → Kazanıldı/Kaybedildi/Açık/Vazgeçildi ·
Value (opportunity) → Değer · Board view → Pano görünümü · List view → Liste görünümü
Conversations: Inbox → Gelen Kutusu · Unread → Okunmamış · Starred → Yıldızlı · All → Tümü ·
Assigned to me → Bana atanan · Unassigned → Atanmamış · Team inbox → Ekip gelen kutusu · Snooze → Ertele ·
Template → Şablon · Snippet → Hazır metin · Attachment → Ek · Call (phone, action) → Telefonla ara ·
Call (noun) → Arama · Voicemail → Sesli mesaj · DND / Do Not Disturb → Rahatsız Etmeyin ·
Mark as read/unread → Okundu/Okunmadı olarak işaretle · Reply → Yanıtla · Internal comment → Dahili not
Calendars: Appointment → Randevu · Calendar → Takvim · Event → Etkinlik · Booking → Rezervasyon ·
Availability → Müsaitlik · Time slot → Zaman aralığı · Blocked time / Block slot → Kapalı zaman ·
Reschedule → Yeniden planla · No-show → Gelmedi · Confirmed → Onaylandı · Guest → Davetli ·
Recurring → Tekrarlanan · Time zone → Saat dilimi · Today → Bugün · Week → Hafta · Month → Ay · Day → Gün
Automation & marketing: Workflow → İş akışı · Trigger → Tetikleyici · Action → Eylem · Campaign → Kampanya ·
Funnel → Satış hunisi · Website → Web sitesi · Form → Form · Survey → Anket · Trigger link → Tetikleyici bağlantı
Payments: Invoice → Fatura · Product → Ürün · Transaction → İşlem · Subscription → Abonelik · Coupon → Kupon ·
Refund → İade · Paid → Ödendi · Due → Vadesi gelen
General: Settings → Ayarlar · Profile → Profil · User → Kullanıcı · Team / Staff → Ekip / Ekip üyesi ·
Location / sub-account (GHL term) → Alt hesap (never "Konum" when it means the business account; a physical
place stays "Konum") · Agency → Ajans · Integration → Entegrasyon · Connect → Bağla · Disconnect → Bağlantıyı
kes · Search → Ara · Filter → Filtre · Sort → Sırala · Save → Kaydet · Cancel → Vazgeç (dialog) / İptal et
(cancel an appointment/subscription) · Delete → Sil · Remove → Kaldır · Edit → Düzenle · Add → Ekle ·
Create → Oluştur · Close → Kapat · Back → Geri · Next → İleri/Sonraki · Done → Tamam · Apply → Uygula ·
Reset → Sıfırla · Clear → Temizle · Upload → Yükle · Download → İndir · Copy → Kopyala · Copied → Kopyalandı ·
Learn more → Daha fazla bilgi · Something went wrong → Bir şeyler ters gitti · Try again → Tekrar dene ·
Loading... → Yükleniyor... · Email → E-posta · Phone → Telefon · Name → Ad · First/Last name → Ad/Soyad
Keep unchanged: brand and product names (Growtify, Stripe, PayPal, Google,
Facebook, Instagram, WhatsApp, Zoom, Outlook, Gmail, Twilio, Mailgun, Zapier, QuickBooks…), technical tokens
(SMS, MMS, API, URL, ID, CSV, PDF, DNS, SMTP, A2P, 10DLC), keyboard keys (Enter, Esc, Ctrl, ⌘).

## Syntax rules — CRITICAL (the validator enforces these)
1. Placeholders: keep every `{name}`, `{count}`, `{date}`… exactly (same names, same number). You may
   move them within the sentence.
2. `{'@'}` renders an "@" — keep it exactly. NEVER type a raw `@`, `{`, `}`, `|` or `$` that is not in the
   source. (Email example: "you{'@'}example.com" → "sen{'@'}ornek.com".)
3. Plurals: a `|` separates plural variants. Keep exactly the same number of variants in the same order:
   "No posts | 1 post | {count} posts" → "Gönderi yok | 1 gönderi | {count} gönderi"
   (Turkish nouns stay singular after numbers).
4. English plural endings: placeholders like `{s}` or `{plural}` glued to a word ("result{s}",
   "day{plural}") add an English "s" — DROP them in Turkish: "{count} result{s}" → "{count} sonuç".
5. Leading/trailing spaces: preserve them exactly — these are fragments concatenated in code
   (' / month' → ' / ay', ' + tax' → ' + vergi').
6. Fragments: some sentences are built from parts around a dynamic value (e.g. `descriptionStart` +
   SUBSCRIPTION NAME + `descriptionEnd`, or prefix + NAME). Look at the sibling keys, imagine the full
   concatenated sentence, and make the Turkish read naturally — restructure if needed, e.g.
   start "Are you sure you want to cancel " + NAME + " subscription?" →
   start "Şu aboneliği iptal etmek istediğine emin misin: " + NAME + end "?"
7. Do not attach Turkish case suffixes directly to a placeholder ("{name}'in", "{group}'a",
   "{count}'den") — vowel harmony can't be known in advance. Rephrase instead:
   "{name}'s profile" → "{name} profili" or "Profil: {name}"; "Welcome to {group}" → "{group} topluluğuna
   hoş geldin" is fine (suffix is on "topluluk", not on the placeholder).
8. HTML: some strings contain HTML tags (`<a href=…>`, `<span class=…>`, `<br />`, `<img src="{src}" …>`).
   Keep every tag and attribute exactly; translate only the text between tags.
9. Single words that are English UI labels must be translated even if short ("All" → "Tümü",
   "New" → "Yeni", "Status" → "Durum", "Role" → "Rol").
10. Screen-reader labels (`aria…`): natural descriptive Turkish ("Profil menüsünü aç").

## Output — work in as few steps as possible
1. Read this guide once and the whole input file once.
2. Write ONE flat JSON object with every input key (same keys, same order) → Turkish, with a single Write.
3. Validate: `node ../cat/validate.mjs batches/cNN.en.json batches/cNN.tr.json` (run from the `crm` folder).
4. Fix every ERROR (rewrite the file once if needed) and fix WARNINGs that are real problems
   (untranslated text, English words left over, suffix on a placeholder). Leave intentional ones (brand names,
   technical tokens). Do not re-read files you already have; keep tool calls to a minimum.

## Decisions already made in earlier batches (follow them)
- Product names stay in English: Conversation AI, Voice AI, Calendar AI, LC Phone, LC Email, Content AI,
  Agent Studio, Workflow AI. Snapshot → "Hesap Şablonu".
- "widget" stays "widget" (widget'ı, widget'lar). Social Planner → "Sosyal Planlayıcı".
  Attribution → "İlişkilendirme". Round robin → "Dönüşümlü Atama". Campaign steps ("events" inside a
  campaign: SMS, wait, call) → "Adım". Activity → "Aktivite" (Etkinlik = calendar Event).
  Prompt (AI) → "İstem". Review (reputation) → "Değerlendirme". Comment (social) → "Yorum".
- DND labels: "Rahatsız Etmeyin: SMS" / "Rahatsız Etmeyin: E-posta".
- "Discard changes" → "Değişiklikleri at". Dialog Cancel → "Vazgeç"; cancelling a thing → "İptal et".
- Words the user must type literally (confirm, CONFIRM, REMOVE, DELETE), SMS keywords (STOP, START…),
  raw codes/identifiers (`page-visit`, `appointment_v3`, `audit-location`), date-format tokens
  (`DD-MMM-YYYY`, `hh:mm A`), API field names and paths: keep exactly as in English.
- Country and US-state names: keep in English (dropdowns may store the label as data).
- Sentence pieces joined around a value: "of" → "/", "to" (ranges) → "-", "Gösterilen 1 - 10 / 50".
- vue-i18n drops a "%" written directly before "{": write "Yüzde {percent}" or "{percent}%", never "%{x}".
- A raw "@" breaks compilation: e-mail examples use {'@'} or are reworded ("E-posta adresini gir").
- Placeholders holding object labels ({contact}, {opportunities}, {objectLabel}…) are lowercase nouns:
  never start a sentence with them and never attach a suffix to them ("Yeni {opportunity} ekle",
  "Tüm {opportunities} içinde ara").
- More terms fixed by later batches: App Marketplace (nav) → "Uygulama Pazarı", any other Marketplace →
  "Pazar Yeri". Promo → "Kampanya" (promo names such as "Summer of AI" stay English). Intent (AI) → "Niyet".
  Knowledge Base → "Bilgi Bankası", FAQ → "SSS", Web crawler → "Web Tarama". Transcript → "Transkript",
  transcription (speech→text) → "Metne dönüştürme", Recording → "Ses kaydı". Disclaimer/disclosure →
  "Bilgilendirme metni" (AI disclaimer → "Yapay zeka bilgilendirmesi"; "Bildirim" = Notification). Follow-up → "Takip". Legacy → "Eski Sürüm".
  Affiliate → "Satış Ortağı", Referral → "Referans". Human handover/escalation → "devretme"; call transfer →
  "aktarma". Phone call → "arama"; LLM/API call → "çağrı". Appointment Booking → "Randevu Oluşturma";
  booking page/link → "rezervasyon sayfası/bağlantısı"; slot → "zaman aralığı". Prompt Optimizer →
  "İstem Optimizasyonu". Testimonial → "Müşteri görüşü" ("Referans" = referral). Clone/Duplicate (make a copy of
  an item) → "Çoğalt" (Çoğaltıldı, çoğaltılıyor; the copy's name "{name} - Kopya"); "Kopyala" is ONLY copy to
  clipboard ("Kopyalandı"; never "Panoya kopyalandı" — Pano = Dashboard); voice cloning → "klonlama". Seconds unit "s" → "sn". "Explore X" buttons → "X ile Tanış".
- Text that a bot/agent says to the business's own customers (sample greetings, scripts) uses polite "siz";
  all UI text addressed to the user keeps "sen".
- White-label product: users see "Growtify.app", never the vendor. In running text do not name HighLevel,
  GHL or LeadConnector — say "platform" or reword ("destek ekibiyle iletişime geç"). Keep vendor names only
  inside URLs, code/identifiers, fixed product names (LC Phone, LC Email), or where the user must find
  that exact name elsewhere (e.g. the "LeadConnector" mobile app in the app stores).
