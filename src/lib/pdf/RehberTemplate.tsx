import React from "react";
import { Document, Page, Text, View, Link } from "@react-pdf/renderer";
import { styles, COLORS } from "./styles";
import type { PdfSectorContent } from "@/content/rehberler/pdf-content";

// ─── Locale-aware chrome labels ───────────────────────────
type Chrome = {
  page: string;
  forWho: string;
  whatInside: string;
  whyAi: string;
  numbers: string;
  withoutAi: string;
  withAi: string;
  scenario: string;
  problem: string;
  stepByStep: string;
  examplePrompt: string;
  before: string;
  after: string;
  tools: string;
  free: string;
  paid: string;
  bestFor: string;
  promptsTitle: string;
  expectedOutput: string;
  checklistTitle: string;
  checklistIntro: string;
  day: string;
  tool: string;
  duration: string;
  growtTitle: string;
  growtClosing: string;
  growtCta: string;
  ctaButton: string;
};

const CHROME: Record<string, Chrome> = {
  tr: {
    page: "Sayfa",
    forWho: "Bu Rehber Kimin İçin?",
    whatInside: "Bu rehberde neler var?",
    whyAi: "Yapay Zeka Neden Önemli?",
    numbers: "Rakamlar",
    withoutAi: "AI Olmadan",
    withAi: "AI İle",
    scenario: "Senaryo",
    problem: "Problem:",
    stepByStep: "Adım Adım Uygulama",
    examplePrompt: "Prompt Örneği",
    before: "Önce",
    after: "Sonra",
    tools: "Önerilen AI Araçları",
    free: "Ücretsiz",
    paid: "Ücretli",
    bestFor: "En iyi:",
    promptsTitle: "Kopyala-Yapıştır Prompt Paketi",
    expectedOutput: "Beklenen çıktı:",
    checklistTitle: "İlk 7 Gün Checklist",
    checklistIntro:
      "Her gün bir adım. 7 gün sonunda ilk sonuçlarını görmüş olacaksın.",
    day: "Gün",
    tool: "Araç:",
    duration: "Süre:",
    growtTitle: "GROWT Method ile Dönüşüm",
    growtClosing:
      "Bu rehber sana bir başlangıç verdi. GROWT Method ile yapılandırılmış bir süreçle 5 seviyede tam dönüşümü tamamla.",
    growtCta: "growtify.ai/test → Kişisel planını oluştur",
    ctaButton: "Kişisel Planını Oluştur →",
  },
  en: {
    page: "Page",
    forWho: "Who Is This Guide For?",
    whatInside: "What's Inside This Guide?",
    whyAi: "Why AI Matters",
    numbers: "The Numbers",
    withoutAi: "Without AI",
    withAi: "With AI",
    scenario: "Scenario",
    problem: "Problem:",
    stepByStep: "Step-by-Step",
    examplePrompt: "Example Prompt",
    before: "Before",
    after: "After",
    tools: "Recommended AI Tools",
    free: "Free",
    paid: "Paid",
    bestFor: "Best for:",
    promptsTitle: "Copy-Paste Prompt Pack",
    expectedOutput: "Expected output:",
    checklistTitle: "Your First 7 Days",
    checklistIntro:
      "One step a day. By the end of the week, you'll have seen your first results.",
    day: "Day",
    tool: "Tool:",
    duration: "Duration:",
    growtTitle: "Transform with the GROWT Method",
    growtClosing:
      "This guide gave you a starting point. With the GROWT Method's structured process, complete the full transformation across 5 levels.",
    growtCta: "growtify.ai/test → Build your plan",
    ctaButton: "Build Your Plan →",
  },
};

// ─── Helper Components ────────────────────────────────────

function Footer({ pageNum, c }: { pageNum?: number; c: Chrome }) {
  return (
    <View style={styles.footer} fixed>
      <Text style={styles.footerBrand}>growtify.ai</Text>
      {pageNum && (
        <Text style={styles.footerPage}>
          {c.page} {pageNum}
        </Text>
      )}
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

function NumberedStep({ num, text }: { num: number; text: string }) {
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

function IntroPage({ data, c }: { data: PdfSectorContent; c: Chrome }) {
  return (
    <Page size="A4" style={styles.page}>
      <Text style={styles.sectionTitle}>{c.forWho}</Text>
      <Text style={styles.paragraph}>{data.intro.forWho}</Text>

      <Divider />

      <Text style={styles.sectionSubtitle}>{c.whatInside}</Text>
      <BulletList items={data.intro.whatYouGet} />

      <Divider />

      <View style={styles.highlightBox}>
        <Text style={styles.italic}>{data.intro.painHook}</Text>
      </View>

      <Footer pageNum={2} c={c} />
    </Page>
  );
}

function ContextPage({ data, c }: { data: PdfSectorContent; c: Chrome }) {
  return (
    <Page size="A4" style={styles.page}>
      <Text style={styles.sectionTitle}>{c.whyAi}</Text>
      {data.sectorContext.whyAiMatters.split("\n\n").map((p, i) => (
        <Text key={i} style={styles.paragraph}>
          {p}
        </Text>
      ))}

      <Divider />

      <Text style={styles.sectionSubtitle}>{c.numbers}</Text>
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
          <Text style={styles.beforeLabel}>{c.withoutAi}</Text>
          {data.sectorContext.comparison.without.map((item, i) => (
            <Text key={i} style={[styles.cardText, { marginBottom: 4 }]}>
              • {item}
            </Text>
          ))}
        </View>
        <View style={styles.afterBox}>
          <Text style={styles.afterLabel}>{c.withAi}</Text>
          {data.sectorContext.comparison.with.map((item, i) => (
            <Text key={i} style={[styles.cardText, { marginBottom: 4 }]}>
              • {item}
            </Text>
          ))}
        </View>
      </View>

      <Footer pageNum={3} c={c} />
    </Page>
  );
}

function ScenarioPage({
  scenario,
  index,
  pageNum,
  c,
}: {
  scenario: PdfSectorContent["scenarios"][0];
  index: number;
  pageNum: number;
  c: Chrome;
}) {
  return (
    <Page size="A4" style={styles.page}>
      <Text style={styles.sectionTitle}>
        {c.scenario} {index + 1}: {scenario.title}
      </Text>

      <Text style={styles.paragraphBold}>{c.problem}</Text>
      <Text style={styles.paragraph}>{scenario.problem}</Text>

      <Text style={styles.sectionSubtitle}>{c.stepByStep}</Text>
      {scenario.steps.map((step, i) => (
        <NumberedStep key={i} num={i + 1} text={step} />
      ))}

      <View style={styles.promptBox}>
        <Text style={styles.promptLabel}>{c.examplePrompt}</Text>
        <Text style={styles.promptText}>{scenario.promptExample}</Text>
      </View>

      <View style={styles.beforeAfterRow}>
        <View style={styles.beforeBox}>
          <Text style={styles.beforeLabel}>{c.before}</Text>
          <Text style={styles.timeText}>{scenario.before}</Text>
        </View>
        <View style={styles.afterBox}>
          <Text style={styles.afterLabel}>{c.after}</Text>
          <Text style={styles.timeText}>{scenario.after}</Text>
        </View>
      </View>

      <Footer pageNum={pageNum} c={c} />
    </Page>
  );
}

function ToolsPage({
  tools,
  pageNum,
  c,
}: {
  tools: PdfSectorContent["tools"];
  pageNum: number;
  c: Chrome;
}) {
  return (
    <Page size="A4" style={styles.page}>
      <Text style={styles.sectionTitle}>{c.tools}</Text>

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
              {tool.free ? c.free : c.paid}
            </Text>
          </View>
          <Text style={styles.cardText}>{tool.description}</Text>
          <Text
            style={[
              styles.cardText,
              { fontSize: 9, color: COLORS.primary, marginTop: 4 },
            ]}
          >
            {c.bestFor} {tool.bestFor}
          </Text>
        </View>
      ))}

      <Footer pageNum={pageNum} c={c} />
    </Page>
  );
}

function PromptsPage({
  prompts,
  pageNum,
  c,
}: {
  prompts: PdfSectorContent["prompts"];
  pageNum: number;
  c: Chrome;
}) {
  return (
    <Page size="A4" style={styles.page}>
      <Text style={styles.sectionTitle}>{c.promptsTitle}</Text>

      {prompts.map((p, i) => (
        <View key={i} style={{ marginBottom: 12 }}>
          <Text style={styles.sectionSubtitle}>
            {i + 1}. {p.title}
          </Text>
          <View style={styles.promptBox}>
            <Text style={styles.promptText}>{p.prompt}</Text>
          </View>
          <Text style={[styles.italic, { fontSize: 9 }]}>
            {c.expectedOutput} {p.expectedOutput}
          </Text>
        </View>
      ))}

      <Footer pageNum={pageNum} c={c} />
    </Page>
  );
}

function ChecklistPage({
  checklist,
  pageNum,
  c,
}: {
  checklist: PdfSectorContent["checklist"];
  pageNum: number;
  c: Chrome;
}) {
  return (
    <Page size="A4" style={styles.page}>
      <Text style={styles.sectionTitle}>{c.checklistTitle}</Text>
      <Text style={styles.paragraph}>{c.checklistIntro}</Text>

      {checklist.map((item, i) => (
        <View key={i} style={styles.checkItem}>
          <View style={styles.checkBox} />
          <View style={{ flex: 1 }}>
            <Text style={[styles.checkText, { fontWeight: 700 }]}>
              {c.day} {item.day}: {item.task}
            </Text>
            <Text
              style={[styles.checkText, { fontSize: 9, color: COLORS.gray }]}
            >
              {c.tool} {item.tool} · {c.duration} {item.duration}
            </Text>
          </View>
        </View>
      ))}

      <Footer pageNum={pageNum} c={c} />
    </Page>
  );
}

function GROWTPage({
  growtTeaser,
  pageNum,
  c,
}: {
  growtTeaser: string;
  pageNum: number;
  c: Chrome;
}) {
  return (
    <Page size="A4" style={styles.page}>
      <Text style={styles.sectionTitle}>{c.growtTitle}</Text>
      <Text style={styles.paragraph}>{growtTeaser}</Text>

      <Divider />

      {[
        "G — Gap Analysis",
        "R — Roadmap",
        "O — Operationalize",
        "W — Win",
        "T — Transform",
      ].map((phase, i) => (
        <View
          key={i}
          style={[styles.listItem, { alignItems: "center", marginBottom: 10 }]}
        >
          <Text style={styles.numberCircle}>{phase[0]}</Text>
          <Text style={[styles.listText, { fontWeight: 600 }]}>{phase}</Text>
        </View>
      ))}

      <View style={[styles.highlightBox, { marginTop: 16 }]}>
        <Text style={styles.paragraph}>{c.growtClosing}</Text>
        <Text style={[styles.paragraphBold, { color: COLORS.primary }]}>
          {c.growtCta}
        </Text>
      </View>

      <Footer pageNum={pageNum} c={c} />
    </Page>
  );
}

function CTAPage({ data, c }: { data: PdfSectorContent; c: Chrome }) {
  return (
    <Page size="A4" style={styles.ctaPage}>
      <Text style={styles.ctaTitle}>{data.ctaHeadline}</Text>
      <Text style={styles.ctaText}>{data.ctaBody}</Text>
      <Link src="https://growtify.ai/test">
        <Text style={styles.ctaButton}>{c.ctaButton}</Text>
      </Link>
      <Text style={styles.ctaUrl}>growtify.ai/test</Text>
    </Page>
  );
}

// ─── Main Document ────────────────────────────────────────

export function RehberDocument({
  data,
  locale = "tr",
}: {
  data: PdfSectorContent;
  locale?: string;
}) {
  const c = CHROME[locale] ?? CHROME.tr;
  let pageNum = 4; // cover=1, intro=2, context=3, scenarios start at 4

  return (
    <Document
      title={data.coverTitle}
      author="Growtify AI"
      subject={`${data.sectorIcon} ${data.coverTitle}`}
      creator="growtify.ai"
    >
      <CoverPage data={data} />
      <IntroPage data={data} c={c} />
      <ContextPage data={data} c={c} />

      {data.scenarios.map((scenario, i) => (
        <ScenarioPage
          key={i}
          scenario={scenario}
          index={i}
          pageNum={pageNum++}
          c={c}
        />
      ))}

      <ToolsPage tools={data.tools} pageNum={pageNum++} c={c} />
      <PromptsPage prompts={data.prompts} pageNum={pageNum++} c={c} />
      <ChecklistPage checklist={data.checklist} pageNum={pageNum++} c={c} />
      <GROWTPage growtTeaser={data.growtTeaser} pageNum={pageNum++} c={c} />
      <CTAPage data={data} c={c} />
    </Document>
  );
}
