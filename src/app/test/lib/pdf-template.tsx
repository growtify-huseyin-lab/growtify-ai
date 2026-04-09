// Growtify AI — Quiz PDF Report Template
// Server-only: used by submit-email route to generate personalized PDF.
// Uses @react-pdf/renderer which runs in Node.js.

import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from "@react-pdf/renderer";
import type { QuizState, Persona } from "./types";

const PRIMARY = "#5d47f0";
const DARK = "#232323";
const GRAY = "#666666";
const LIGHT_BG = "#F8F8F8";
const GREEN = "#22C55E";

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: "Helvetica",
    fontSize: 11,
    color: DARK,
    backgroundColor: "#FFFFFF",
  },
  // Cover
  coverPage: {
    padding: 40,
    fontFamily: "Helvetica",
    backgroundColor: PRIMARY,
    color: "#FFFFFF",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
  coverTitle: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 8,
  },
  coverSubtitle: {
    fontSize: 14,
    textAlign: "center",
    opacity: 0.85,
    marginBottom: 40,
  },
  coverName: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 6,
  },
  coverDate: {
    fontSize: 11,
    textAlign: "center",
    opacity: 0.7,
  },
  coverBrand: {
    fontSize: 11,
    textAlign: "center",
    opacity: 0.6,
    marginTop: 60,
  },
  // Headings
  h1: {
    fontSize: 20,
    fontWeight: "bold",
    color: PRIMARY,
    marginBottom: 16,
  },
  h2: {
    fontSize: 14,
    fontWeight: "bold",
    color: DARK,
    marginBottom: 8,
    marginTop: 16,
  },
  h3: {
    fontSize: 12,
    fontWeight: "bold",
    color: PRIMARY,
    marginBottom: 6,
    marginTop: 12,
  },
  // Body
  body: {
    fontSize: 11,
    lineHeight: 1.6,
    color: GRAY,
    marginBottom: 8,
  },
  // Score card
  scoreCard: {
    backgroundColor: LIGHT_BG,
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  scoreItem: {
    textAlign: "center",
    flex: 1,
  },
  scoreValue: {
    fontSize: 24,
    fontWeight: "bold",
    color: PRIMARY,
  },
  scoreLabel: {
    fontSize: 9,
    color: GRAY,
    marginTop: 4,
  },
  // Pain bar
  painRow: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  painLabel: {
    width: 120,
    fontSize: 9,
    color: GRAY,
  },
  painBarBg: {
    flex: 1,
    height: 8,
    backgroundColor: "#E5E7EB",
    borderRadius: 4,
  },
  painBarFill: {
    height: 8,
    backgroundColor: PRIMARY,
    borderRadius: 4,
  },
  painValue: {
    width: 30,
    fontSize: 9,
    color: GRAY,
    textAlign: "right",
  },
  // Recommendation box
  recBox: {
    backgroundColor: "#F0FDF4",
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    borderLeft: `3px solid ${GREEN}`,
  },
  // CTA box
  ctaBox: {
    backgroundColor: PRIMARY,
    borderRadius: 8,
    padding: 20,
    marginTop: 20,
    textAlign: "center",
  },
  ctaTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 6,
  },
  ctaBody: {
    fontSize: 11,
    color: "#FFFFFF",
    opacity: 0.9,
    marginBottom: 10,
  },
  ctaPrice: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  ctaUrl: {
    fontSize: 9,
    color: "#FFFFFF",
    opacity: 0.7,
    marginTop: 8,
  },
  // Footer
  footer: {
    position: "absolute",
    bottom: 20,
    left: 40,
    right: 40,
    fontSize: 8,
    color: "#999999",
    textAlign: "center",
  },
});

const PAIN_LABELS: Record<string, string> = {
  q_time: "Zaman yönetimi",
  q_procrastination: "Erteleme",
  q_focus: "Odaklanma",
  q_comparison: "Karşılaştırma",
  q_fomo: "Kaçırma korkusu",
  q_progress: "İlerleme hissi",
  q_uncertainty: "Belirsizlik",
  q_overwhelm: "İş yükü",
  q_decision: "Karar verememe",
  q_fear: "Başarısızlık korkusu",
  q_selfworth: "Öz değer",
  q_social: "Sosyal baskı",
  q_overthink: "Aşırı düşünme",
  q_motivation: "Motivasyon",
};

const PERSONA_TR: Record<Persona, string> = {
  "Meraklı Gözlemci": "Henüz somut bir adım atmadın ama ilgi var. GROWT Programı'nın G seviyesi (Gap Analysis) tam sana göre — neredesin, ne kaçırıyorsun sorusunu birlikte cevaplayacağız.",
  "Aktif Deneyici": "Birkaç şey denedin ama sistematik bir yapı kuramadın. GROWT Programı'nın R seviyesi (Roadmap) sana net bir yol haritası verecek.",
  Uygulamacı: "AI kullanıyorsun ama dağınık. GROWT Programı'nın O seviyesi (Operationalize) dağınık uygulamaları sisteme dönüştürüyor.",
  "AI Lideri": "İleri düzeydesin ama ölçekleyemiyorsun. GROWT Programı mevcut kazanımlarını sistematik hale getirip ölçülebilir sonuçlara bağlayacak.",
};

const PAIN_LEVEL_TR: Record<string, string> = {
  low: "Düşük",
  medium: "Orta",
  high: "Yüksek",
};

function getPainScores(state: QuizState): Array<{ key: string; label: string; value: number; max: number }> {
  return [
    { key: "q_time", label: PAIN_LABELS.q_time, value: state.q_time, max: 5 },
    { key: "q_procrastination", label: PAIN_LABELS.q_procrastination, value: state.q_procrastination, max: 5 },
    { key: "q_focus", label: PAIN_LABELS.q_focus, value: state.q_focus, max: 5 },
    { key: "q_comparison", label: PAIN_LABELS.q_comparison, value: state.q_comparison, max: 5 },
    { key: "q_fomo", label: PAIN_LABELS.q_fomo, value: state.q_fomo, max: 5 },
    { key: "q_progress", label: PAIN_LABELS.q_progress, value: state.q_progress, max: 10 },
    { key: "q_uncertainty", label: PAIN_LABELS.q_uncertainty, value: state.q_uncertainty, max: 10 },
    { key: "q_overwhelm", label: PAIN_LABELS.q_overwhelm, value: state.q_overwhelm, max: 10 },
    { key: "q_decision", label: PAIN_LABELS.q_decision, value: state.q_decision, max: 10 },
    { key: "q_fear", label: PAIN_LABELS.q_fear, value: state.q_fear, max: 10 },
    { key: "q_selfworth", label: PAIN_LABELS.q_selfworth, value: state.q_selfworth, max: 10 },
    { key: "q_social", label: PAIN_LABELS.q_social, value: state.q_social, max: 10 },
    { key: "q_overthink", label: PAIN_LABELS.q_overthink, value: state.q_overthink, max: 10 },
    { key: "q_motivation", label: PAIN_LABELS.q_motivation, value: state.q_motivation, max: 10 },
  ];
}

export function QuizReportDocument({ state }: { state: QuizState }) {
  const painScores = getPainScores(state);
  const now = new Date().toLocaleDateString("tr-TR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const personaDesc = PERSONA_TR[state.persona] ?? "";
  const discounted = Math.floor(9999 * (1 - state.discount / 100));

  return (
    <Document
      title={`AI Dijital Olgunluk Raporu — ${state.firstName}`}
      author="Growtify.ai"
      subject="Kişisel AI Olgunluk Değerlendirmesi"
    >
      {/* PAGE 1 — Cover */}
      <Page size="A4" style={styles.coverPage}>
        <Text style={styles.coverTitle}>AI Dijital Olgunluk Raporu</Text>
        <Text style={styles.coverSubtitle}>Kişisel değerlendirme sonuçların</Text>
        <Text style={styles.coverName}>{state.firstName || "Profesyonel"}</Text>
        <Text style={styles.coverDate}>{now}</Text>
        <Text style={styles.coverBrand}>Growtify.ai — GROWT Method ile AI dönüşümü</Text>
      </Page>

      {/* PAGE 2 — Score Summary */}
      <Page size="A4" style={styles.page}>
        <Text style={styles.h1}>Skor Özeti</Text>

        <View style={styles.scoreCard}>
          <View style={styles.scoreItem}>
            <Text style={styles.scoreValue}>{state.totalScore}</Text>
            <Text style={styles.scoreLabel}>Toplam Skor</Text>
          </View>
          <View style={styles.scoreItem}>
            <Text style={styles.scoreValue}>
              {PAIN_LEVEL_TR[state.painLevel] ?? state.painLevel}
            </Text>
            <Text style={styles.scoreLabel}>Seviye</Text>
          </View>
          <View style={styles.scoreItem}>
            <Text style={[styles.scoreValue, { fontSize: 16 }]}>
              {state.persona}
            </Text>
            <Text style={styles.scoreLabel}>Profil</Text>
          </View>
        </View>

        <Text style={styles.h2}>Senin Profilin: {state.persona}</Text>
        <Text style={styles.body}>{personaDesc}</Text>

        <Text style={styles.h2}>Detaylar</Text>
        <Text style={styles.body}>Sektör: {state.sector ?? "Belirtilmedi"}</Text>
        <Text style={styles.body}>Hedef: {state.q_goal ?? "Belirtilmedi"}</Text>
        <Text style={styles.body}>
          Günlük taahhüt: {state.commitment ?? 30} dakika
        </Text>
        <Text style={styles.body}>
          İlgi alanları:{" "}
          {state.q_areas?.length ? state.q_areas.join(", ") : "Belirtilmedi"}
        </Text>

        <Text style={styles.footer}>
          Growtify.ai — AI Dijital Olgunluk Raporu — {now}
        </Text>
      </Page>

      {/* PAGE 3 — Pain Breakdown */}
      <Page size="A4" style={styles.page}>
        <Text style={styles.h1}>Detaylı Analiz</Text>
        <Text style={styles.body}>
          14 farklı alanda verdiğin cevapların analizi. Yüksek değerler daha
          fazla zorluk yaşadığın alanları gösteriyor.
        </Text>

        {painScores.map((item) => {
          const pct = Math.min(100, (item.value / item.max) * 100);
          return (
            <View key={item.key} style={styles.painRow}>
              <Text style={styles.painLabel}>{item.label}</Text>
              <View style={styles.painBarBg}>
                <View
                  style={[styles.painBarFill, { width: `${pct}%` }]}
                />
              </View>
              <Text style={styles.painValue}>
                {item.value}/{item.max}
              </Text>
            </View>
          );
        })}

        <Text style={styles.h3}>En yüksek zorluk alanların</Text>
        <Text style={styles.body}>
          {painScores
            .sort((a, b) => b.value / b.max - a.value / a.max)
            .slice(0, 3)
            .map((p) => p.label)
            .join(", ")}
        </Text>

        <Text style={styles.footer}>
          Growtify.ai — AI Dijital Olgunluk Raporu — {now}
        </Text>
      </Page>

      {/* PAGE 4 — Recommendations + CTA */}
      <Page size="A4" style={styles.page}>
        <Text style={styles.h1}>Öneriler</Text>

        <View style={styles.recBox}>
          <Text style={styles.h3}>Sana özel başlangıç noktası</Text>
          <Text style={styles.body}>{personaDesc}</Text>
        </View>

        <View style={styles.recBox}>
          <Text style={styles.h3}>İlk 4 haftada odaklan</Text>
          <Text style={styles.body}>
            Günde {state.commitment ?? 30} dakika ayırarak, GROWT Method ile
            yapılandırılmış bir şekilde ilerleyebilirsin. İlk adım: mevcut
            durumunu anlamak ve hangi AI araçlarının sana en çok fayda
            sağlayacağını belirlemek.
          </Text>
        </View>

        <View style={styles.recBox}>
          <Text style={styles.h3}>Kaçınılması gerekenler</Text>
          <Text style={styles.body}>
            {state.q_habits?.length
              ? `Kendi belirlediğin alışkanlıklar: ${state.q_habits.join(", ")}. Bu alışkanlıkların farkında olmak ilerlemenin ilk adımı.`
              : "Erteleme ve aşırı düşünme en yaygın engellerdir. Mükemmel planı beklemek yerine küçük adımlarla başla."}
          </Text>
        </View>

        <View style={styles.ctaBox}>
          <Text style={styles.ctaTitle}>GROWT Programı</Text>
          <Text style={styles.ctaBody}>
            5 seviye · 26 modül · 4 hafta erişim
          </Text>
          <Text style={styles.ctaPrice}>
            {discounted.toLocaleString("tr-TR")} TL
          </Text>
          <Text style={styles.ctaUrl}>growtify.ai/test</Text>
        </View>

        <Text style={styles.footer}>
          Growtify.ai — AI Dijital Olgunluk Raporu — {now} — Bu rapor
          kişiselleştirilmiş değerlendirme sonuçlarınızı içermektedir.
        </Text>
      </Page>
    </Document>
  );
}
