-- Growtify Asistanı (Aşama 3): sohbetler, mesajlar, kullanım (kota + maliyet).
-- Saklama (CEO 2026-10-23): Temel'de son mesajdan itibaren en az 30 gün; Tam'da program süresince + 30 gün.
-- Silme gece zamanlanmış görevle (src/index.ts scheduled → purgeChats); öğrenci kendi sohbetini istediği an silebilir.

CREATE TABLE chat_sessions (
  id               TEXT PRIMARY KEY,
  student_id       TEXT NOT NULL REFERENCES students(id),
  section_id       TEXT NOT NULL,
  created_at       TEXT NOT NULL,
  last_message_at  TEXT NOT NULL
);
CREATE INDEX chat_sessions_student ON chat_sessions (student_id, section_id, created_at);

-- content_json: Claude içerik blokları aynen (düşünme blokları dahil — sonraki turda değiştirmeden geri gönderilir).
CREATE TABLE chat_messages (
  id            TEXT PRIMARY KEY,
  session_id    TEXT NOT NULL REFERENCES chat_sessions(id),
  student_id    TEXT NOT NULL REFERENCES students(id),
  seq           INTEGER NOT NULL,
  role          TEXT NOT NULL,           -- user | assistant
  content_json  TEXT NOT NULL,
  created_at    TEXT NOT NULL,
  UNIQUE (session_id, seq)
);

CREATE TABLE usage_daily (
  student_id     TEXT NOT NULL,
  day            TEXT NOT NULL,           -- YYYY-MM-DD (UTC)
  messages       INTEGER NOT NULL DEFAULT 0,
  input_tokens   INTEGER NOT NULL DEFAULT 0,
  output_tokens  INTEGER NOT NULL DEFAULT 0,
  cost_micro     INTEGER NOT NULL DEFAULT 0, -- ABD doları × 1e6
  PRIMARY KEY (student_id, day)
);
CREATE INDEX usage_daily_day ON usage_daily (day);
