-- Çalışma Dosyam — ilk şema (ADR-20261023-gai-dosyam-ayri-d1, MIMARI-TASLAK §2).
-- Kural: öğrenciye ait her tabloda student_id var ve her sorgu onunla süzülür (src/db.ts).
-- E-posta düz metin tutulmaz; yalnız biberli hash (oran sınırı ve giriş kodu eşlemesi için).

CREATE TABLE students (
  id              TEXT PRIMARY KEY,               -- uuid
  ghl_contact_id  TEXT NOT NULL UNIQUE,           -- GHL kişi kimliği (hak ve yansıma)
  package         TEXT NOT NULL,                  -- temel | tam
  temel_baslangic TEXT NOT NULL,                  -- ISO tarih; Temel 28 gün buradan sayılır
  tam_bitis       TEXT,                           -- Tam: temel_baslangic + 112 gün
  mode            TEXT NOT NULL DEFAULT 'aktif',  -- aktif | salt_okunur | kapali
  first_name      TEXT,                           -- selamlama için
  created_at      TEXT NOT NULL,
  updated_at      TEXT NOT NULL
);

-- Giriş kodu (6 hane, 10 dk, 5 deneme). Kodun kendisi değil hash'i tutulur.
CREATE TABLE auth_codes (
  id          TEXT PRIMARY KEY,
  email_hash  TEXT NOT NULL,
  code_hash   TEXT NOT NULL,
  contact_id  TEXT NOT NULL,
  expires_at  TEXT NOT NULL,
  attempts    INTEGER NOT NULL DEFAULT 0,
  used_at     TEXT,
  created_at  TEXT NOT NULL
);
CREATE INDEX auth_codes_email ON auth_codes (email_hash, created_at);

-- Oturum: çerezdeki rastgele değerin yalnız hash'i tutulur.
CREATE TABLE sessions (
  id_hash     TEXT PRIMARY KEY,
  student_id  TEXT NOT NULL REFERENCES students(id),
  created_at  TEXT NOT NULL,
  expires_at  TEXT NOT NULL,
  last_seen   TEXT NOT NULL
);
CREATE INDEX sessions_student ON sessions (student_id);

-- Sabit pencereli oran sınırı (anahtar örn. "code:<email_hash>", "ip:<ip_hash>").
CREATE TABLE rate_limits (
  key           TEXT PRIMARY KEY,
  window_start  INTEGER NOT NULL,   -- unix saniye
  count         INTEGER NOT NULL
);

-- İmzalı isteklerin tekrar oynatılmasını engeller (±300 sn penceresi kadar tutulur).
CREATE TABLE nonces (
  nonce       TEXT PRIMARY KEY,
  expires_at  INTEGER NOT NULL
);

-- Bölüm teslimleri: her kayıt bir sürüm; yalnız en son taslak değiştirilebilir, onay yeni sürüm açar.
CREATE TABLE submissions (
  id           TEXT PRIMARY KEY,
  student_id   TEXT NOT NULL REFERENCES students(id),
  section_id   TEXT NOT NULL,               -- icerik/sections/*.yaml içindeki kimlik (örn. R2, OV3)
  version      INTEGER NOT NULL,
  status       TEXT NOT NULL,               -- taslak | onayli
  data_json    TEXT NOT NULL,
  created_at   TEXT NOT NULL,
  updated_at   TEXT NOT NULL,
  approved_at  TEXT,
  UNIQUE (student_id, section_id, version)
);
CREATE INDEX submissions_student ON submissions (student_id, section_id, version);

-- Büyüme Döngüm: her kayıt bir hafta (15 sayı + not, Course listesi BUYUME_DONGUM.yaml).
CREATE TABLE buyume_weeks (
  id             TEXT PRIMARY KEY,
  student_id     TEXT NOT NULL REFERENCES students(id),
  week_start     TEXT NOT NULL,            -- ISO tarih (haftanın pazartesi günü)
  data_json      TEXT NOT NULL,
  note           TEXT,
  ghl_record_id  TEXT,
  created_at     TEXT NOT NULL,
  updated_at     TEXT NOT NULL,
  UNIQUE (student_id, week_start)
);

-- GHL'e yazılacaklar kuyruğu (K5): tek tüketici, tekrar denemeli, idempotent.
CREATE TABLE ghl_outbox (
  id               TEXT PRIMARY KEY,
  student_id       TEXT NOT NULL REFERENCES students(id),
  kind             TEXT NOT NULL,          -- fields | tag | buyume_week
  payload_json     TEXT NOT NULL,
  idempotency_key  TEXT NOT NULL UNIQUE,
  status           TEXT NOT NULL,          -- bekliyor | isleniyor | tamam | olu
  attempts         INTEGER NOT NULL DEFAULT 0,
  next_attempt_at  TEXT NOT NULL,
  last_error       TEXT,
  created_at       TEXT NOT NULL,
  updated_at       TEXT NOT NULL
);
CREATE INDEX ghl_outbox_due ON ghl_outbox (status, next_attempt_at);

-- Yazma isteklerinin idempotency kaydı (aynı anahtarla gelen ikinci istek ilk cevabı alır).
CREATE TABLE idempotency (
  key            TEXT PRIMARY KEY,
  response_json  TEXT NOT NULL,
  created_at     TEXT NOT NULL
);

-- Denetim günlüğü: yönetici erişimi, silme, mod değişimi.
CREATE TABLE audit_log (
  id          TEXT PRIMARY KEY,
  actor       TEXT NOT NULL,
  action      TEXT NOT NULL,
  student_id  TEXT,
  detail      TEXT,
  created_at  TEXT NOT NULL
);
