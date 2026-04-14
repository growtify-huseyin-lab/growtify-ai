import React from "react";
import { Document, Page, Text, View, Link } from "@react-pdf/renderer";
import { styles, COLORS } from "./styles";
import type { PdfSectorContent } from "@/content/rehberler/pdf-content";

// ─── Helper Components ────────────────────────────────────

function Footer({ pageNum }: { pageNum?: number }) {
  return (
    <View style={styles.footer} fixed>
      <Text style={styles.footerBrand}>growtify.ai</Text>
      {pageNum && <Text style={styles.footerPage}>Sayfa {pageNum}</Text>}
    </View>
  );
}

function Divider() {
  return <View style={styles.divider} />;
}

function BulletList({ items }: { items: string[] }) {
  return (
    <View>
      {items.map((item, i) => (
        <View key={i} style={styles.listItem}>
          <Text style={styles.bullet}>•</Text>
          <Text style={styles.listText}>{item}</Text>
        </View>
      ))}
    </View>
  );
}

function NumberedStep({
  num,
  text,
}: {
  num: number;
  text: string;
}) {
  return (
    <View style={[styles.listItem, { alignItems: "center", marginBottom: 8 }]}>
      <Text style={styles.numberCircle}>{num}</Text>
      <Text style={styles.listText}>{text}</Text>
    </View>
  );
}

// ─── Page Components ──────────────────────────────────────

function CoverPage({ data }: { data: PdfSectorContent }) {
  return (
    <Page size="A4" style={styles.coverPage}>
      <Text style={styles.coverIcon}>{data.sectorIcon}</Text>
      <View style={styles.coverAccent} />
      <Text style={styles.coverTitle}>{data.coverTitle}</Text>
      <Text style={styles.coverSubtitle}>{data.coverSubtitle}</Text>
      <Text style={styles.coverBrand}>growtify.ai — GROWT Method</Text>
    </Page>
  );
}

function IntroPage({ data }: { data: PdfSectorContent }) {
  return (
    <Page size="A4" style={styles.page}>
      <Text style={styles.sectionTitle}>Bu Rehber Kimin İçin?</Text>
      <Text style={styles.paragraph}>{data.intro.forWho}</Text>

      <Divider />

      <Text style={styles.sectionSubtitle}>Bu rehberde neler var?</Text>
      <BulletList items={data.intro.whatYouGet} />

      <Divider />

      <View style={styles.highlightBox}>
        <Text style={styles.italic}>{data.intro.painHook}</Text>
      </View>

      <Footer pageNum={2} />
    </Page>
  );
}

function ContextPage({ data }: { data: PdfSectorContent }) {
  return (
    <Page size="A4" style={styles.page}>
      <Text style={styles.sectionTitle}>
        Yapay Zeka Neden Önemli?
      </Text>
      {data.sectorContext.whyAiMatters.split("\n\n").map((p, i) => (
        <Text key={i} style={styles.paragraph}>
          {p}
        </Text>
      ))}

      <Divider />

      <Text style={styles.sectionSubtitle}>Rakamlar</Text>
      {data.sectorContext.stats.map((stat, i) => (
        <View key={i} style={styles.card}>
          <Text style={[styles.cardTitle, { color: COLORS.primary }]}>
            {stat.value}
          </Text>
          <Text style={styles.cardText}>{stat.label}</Text>
          <Text style={[styles.cardText, { fontSize: 8, color: COLORS.gray }]}>
            {stat.source}
          </Text>
        </View>
      ))}

      <Divider />

      <View style={styles.beforeAfterRow}>
        <View style={styles.beforeBox}>
          <Text style={styles.beforeLabel}>AI Olmadan</Text>
          {data.sectorContext.comparison.without.map((item, i) => (
            <Text key={i} style={[styles.cardText, { marginBottom: 4 }]}>
              • {item}
            </Text>
          ))}
        </View>
        <View style={styles.afterBox}>
          <Text style={styles.afterLabel}>AI İle</Text>
          {data.sectorContext.comparison.with.map((item, i) => (
            <Text key={i} style={[styles.cardText, { marginBottom: 4 }]}>
              • {item}
            </Text>
          ))}
        </View>
      </View>

      <Footer pageNum={3} />
    </Page>
  );
}

function ScenarioPage({
  scenario,
  index,
  pageNum,
}: {
  scenario: PdfSectorContent["scenarios"][0];
  index: number;
  pageNum: number;
}) {
  return (
    <Page size="A4" style={styles.page}>
      <Text style={styles.sectionTitle}>
        Senaryo {index + 1}: {scenario.title}
      </Text>

      <Text style={styles.paragraphBold}>Problem:</Text>
      <Text style={styles.paragraph}>{scenario.problem}</Text>

      <Text style={styles.sectionSubtitle}>Adım Adım Uygulama</Text>
      {scenario.steps.map((step, i) => (
        <NumberedStep key={i} num={i + 1} text={step} />
      ))}

      <View style={styles.promptBox}>
        <Text style={styles.promptLabel}>Prompt Örneği</Text>
        <Text style={styles.promptText}>{scenario.promptExample}</Text>
      </View>

      <View style={styles.beforeAfterRow}>
        <View style={styles.beforeBox}>
          <Text style={styles.beforeLabel}>Önce</Text>
          <Text style={styles.timeText}>{scenario.before}</Text>
        </View>
        <View style={styles.afterBox}>
          <Text style={styles.afterLabel}>Sonra</Text>
          <Text style={styles.timeText}>{scenario.after}</Text>
        </View>
      </View>

      <Footer pageNum={pageNum} />
    </Page>
  );
}

function ToolsPage({
  tools,
  pageNum,
}: {
  tools: PdfSectorContent["tools"];
  pageNum: number;
}) {
  return (
    <Page size="A4" style={styles.page}>
      <Text style={styles.sectionTitle}>Önerilen AI Araçları</Text>

      {tools.map((tool, i) => (
        <View key={i} style={styles.card}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginBottom: 4,
            }}
          >
            <Text style={styles.cardTitle}>{tool.name}</Text>
            <Text
              style={{
                fontSize: 8,
                color: tool.free ? "#16A34A" : COLORS.gray,
                fontWeight: 600,
              }}
            >
              {tool.free ? "Ücretsiz" : "Ücretli"}
            </Text>
          </View>
          <Text style={styles.cardText}>{tool.description}</Text>
          <Text
            style={[
              styles.cardText,
              { fontSize: 9, color: COLORS.primary, marginTop: 4 },
            ]}
          >
            En iyi: {tool.bestFor}
          </Text>
        </View>
      ))}

      <Footer pageNum={pageNum} />
    </Page>
  );
}

function PromptsPage({
  prompts,
  pageNum,
}: {
  prompts: PdfSectorContent["prompts"];
  pageNum: number;
}) {
  return (
    <Page size="A4" style={styles.page}>
      <Text style={styles.sectionTitle}>Kopyala-Yapıştır Prompt Paketi</Text>

      {prompts.map((p, i) => (
        <View key={i} style={{ marginBottom: 12 }}>
          <Text style={styles.sectionSubtitle}>
            {i + 1}. {p.title}
          </Text>
          <View style={styles.promptBox}>
            <Text style={styles.promptText}>{p.prompt}</Text>
          </View>
          <Text style={[styles.italic, { fontSize: 9 }]}>
            Beklenen çıktı: {p.expectedOutput}
          </Text>
        </View>
      ))}

      <Footer pageNum={pageNum} />
    </Page>
  );
}

function ChecklistPage({
  checklist,
  pageNum,
}: {
  checklist: PdfSectorContent["checklist"];
  pageNum: number;
}) {
  return (
    <Page size="A4" style={styles.page}>
      <Text style={styles.sectionTitle}>İlk 7 Gün Checklist</Text>
      <Text style={styles.paragraph}>
        Her gün bir adım. 7 gün sonunda ilk sonuçlarını görmüş olacaksın.
      </Text>

      {checklist.map((item, i) => (
        <View key={i} style={styles.checkItem}>
          <View style={styles.checkBox} />
          <View style={{ flex: 1 }}>
            <Text style={[styles.checkText, { fontWeight: 700 }]}>
              Gün {item.day}: {item.task}
            </Text>
            <Text
              style={[styles.checkText, { fontSize: 9, color: COLORS.gray }]}
            >
              Araç: {item.tool} · Süre: {item.duration}
            </Text>
          </View>
        </View>
      ))}

      <Footer pageNum={pageNum} />
    </Page>
  );
}

function GROWTPage({
  growtTeaser,
  pageNum,
}: {
  growtTeaser: string;
  pageNum: number;
}) {
  return (
    <Page size="A4" style={styles.page}>
      <Text style={styles.sectionTitle}>GROWT Method ile Dönüşüm</Text>
      <Text style={styles.paragraph}>{growtTeaser}</Text>

      <Divider />

      {["G — Gap Analysis", "R — Roadmap", "O — Operationalize", "W — Win", "T — Transform"].map(
        (phase, i) => (
          <View
            key={i}
            style={[
              styles.listItem,
              { alignItems: "center", marginBottom: 10 },
            ]}
          >
            <Text style={styles.numberCircle}>{phase[0]}</Text>
            <Text style={[styles.listText, { fontWeight: 600 }]}>{phase}</Text>
          </View>
        )
      )}

      <View style={[styles.highlightBox, { marginTop: 16 }]}>
        <Text style={styles.paragraph}>
          Bu rehber sana bir başlangıç verdi. GROWT Method ile yapılandırılmış
          bir süreçle 5 seviyede tam dönüşümü tamamla.
        </Text>
        <Text style={[styles.paragraphBold, { color: COLORS.primary }]}>
          growtify.ai/test → Kişisel planını oluştur
        </Text>
      </View>

      <Footer pageNum={pageNum} />
    </Page>
  );
}

function CTAPage({ data }: { data: PdfSectorContent }) {
  return (
    <Page size="A4" style={styles.ctaPage}>
      <Text style={styles.ctaTitle}>{data.ctaHeadline}</Text>
      <Text style={styles.ctaText}>{data.ctaBody}</Text>
      <Link src="https://growtify.ai/test">
        <Text style={styles.ctaButton}>Kişisel Planını Oluştur →</Text>
      </Link>
      <Text style={styles.ctaUrl}>growtify.ai/test</Text>
    </Page>
  );
}

// ─── Main Document ────────────────────────────────────────

export function RehberDocument({ data }: { data: PdfSectorContent }) {
  let pageNum = 4; // cover=1, intro=2, context=3, scenarios start at 4

  return (
    <Document
      title={data.coverTitle}
      author="Growtify AI"
      subject={`${data.sectorIcon} ${data.coverTitle}`}
      creator="growtify.ai"
    >
      <CoverPage data={data} />
      <IntroPage data={data} />
      <ContextPage data={data} />

      {data.scenarios.map((scenario, i) => (
        <ScenarioPage
          key={i}
          scenario={scenario}
          index={i}
          pageNum={pageNum++}
        />
      ))}

      <ToolsPage tools={data.tools} pageNum={pageNum++} />
      <PromptsPage prompts={data.prompts} pageNum={pageNum++} />
      <ChecklistPage checklist={data.checklist} pageNum={pageNum++} />
      <GROWTPage growtTeaser={data.growtTeaser} pageNum={pageNum++} />
      <CTAPage data={data} />
    </Document>
  );
}
