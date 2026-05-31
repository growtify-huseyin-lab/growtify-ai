// Growtify AI — Kurumsal Quiz Types
// Corporate AI maturity assessment: 5 dimensions + 4 pain areas

export type KurumsalPersona =
  | "Baslangic"   // AI Farkındalık (0-17)
  | "Kesif"       // AI Deneyimleme (18-34)
  | "Uygulama"    // AI Operasyonu (35-52)
  | "Lider";      // AI Dönüşümü (53+)

export type PainLevel = "low" | "medium" | "high";

export type CompanySize = "1-10" | "11-50" | "51-200" | "200+";

export interface KurumsalQuizState {
  // Sektör (Ekran 2)
  sector: string | null;

  // 5 Boyut — Likert 1-10 (Ekran 3-7)
  d_strategy: number;     // Strateji & Vizyon
  d_team: number;         // Ekip & Yetkinlik
  d_process: number;      // Süreç & Entegrasyon
  d_data: number;         // Veri & Altyapı
  d_culture: number;      // Kültür & Benimseme (reversed in scoring)

  // 4 Pain — Emoji 1-5 (Ekran 8-11)
  p_pilot: number;        // Pilot ölçekleme
  p_roi: number;          // ROI ölçümü
  p_resistance: number;   // Ekip direnci
  p_resources: number;    // Kaynak yetersizliği

  // Declarations (Ekran 12-13)
  q_goal: string | null;
  q_priority_depts: string[];

  // Personalization (Ekran 14-17)
  companySize: CompanySize | null;
  firstName: string;
  email: string;
  phone: string;

  // Computed (filled after finalize)
  totalScore: number;
  painLevel: PainLevel;
  persona: KurumsalPersona;
}

export const initialKurumsalState: KurumsalQuizState = {
  sector: null,
  d_strategy: 0,
  d_team: 0,
  d_process: 0,
  d_data: 0,
  d_culture: 0,
  p_pilot: 0,
  p_roi: 0,
  p_resistance: 0,
  p_resources: 0,
  q_goal: null,
  q_priority_depts: [],
  companySize: null,
  firstName: "",
  email: "",
  phone: "",
  totalScore: 0,
  painLevel: "low",
  persona: "Baslangic",
};

// Screen types used in kurumsal quiz (subset of bireysel + custom)
export type KurumsalScreenType =
  | "hero"           // Giriş ekranı
  | "sector"
  | "likert"
  | "pain_emoji"
  | "single_select"
  | "multi_select"
  | "text_input"
  | "loading"
  | "result"         // Olgunluk sonucu
  | "paywall";       // Strateji görüşmesi CTA

export interface KurumsalOptionItem {
  value: string | number;
  label: string;
  emoji?: string;
  icon?: string;
}

export interface KurumsalScreenConfig {
  id: number;
  phase: number;
  phaseName: string;
  type: KurumsalScreenType;
  stateKey?: keyof KurumsalQuizState;
  title: string;
  subtitle?: string;
  caption?: string;
  options?: KurumsalOptionItem[];
  likertMin?: string;
  likertMax?: string;
  cta?: string;
  placeholder?: string;
  extra?: Record<string, unknown>;
}
