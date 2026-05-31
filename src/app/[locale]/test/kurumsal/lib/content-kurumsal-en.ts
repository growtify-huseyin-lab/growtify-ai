// Growtify AI — Kurumsal Quiz — English Copy Layer
// Overrides structural skeleton with final EN copy.

import type { KurumsalScreenConfig, KurumsalOptionItem } from "./types-kurumsal";

type PartialScreen = Partial<Omit<KurumsalScreenConfig, "id" | "phase" | "phaseName" | "type" | "stateKey">>;

export const KURUMSAL_COPY: Record<number, PartialScreen> = {
  1: {
    title: "Corporate AI Maturity Assessment",
    subtitle: "Discover your company's AI readiness level in 3 minutes. Industry benchmark included.",
    caption: "20 questions · Free · Instant result",
    cta: "Start the Assessment",
  },
  2: {
    title: "Which industry does your company operate in?",
    subtitle: "So we can give you an industry-specific benchmark.",
    options: [
      { value: "saas", label: "SaaS & Technology", icon: "Cpu" },
      { value: "eticaret", label: "E-Commerce & Retail", icon: "ShoppingCart" },
      { value: "finans", label: "Finance & Banking", icon: "Landmark" },
      { value: "saglik", label: "Healthcare & Pharma", icon: "Heart" },
      { value: "hukuk", label: "Legal & Consulting", icon: "Scale" },
      { value: "uretim", label: "Manufacturing & Logistics", icon: "Factory" },
      { value: "egitim", label: "Education", icon: "GraduationCap" },
      { value: "medya", label: "Media & Advertising", icon: "Megaphone" },
      { value: "insaat", label: "Construction & Real Estate", icon: "Building2" },
      { value: "turizm", label: "Travel & Hospitality", icon: "Plane" },
      { value: "otomotiv", label: "Automotive", icon: "Car" },
      { value: "enerji", label: "Energy & Infrastructure", icon: "Zap" },
      { value: "diger", label: "Other", icon: "MoreHorizontal" },
    ] as KurumsalOptionItem[],
  },
  3: {
    title: "Does your company have a clear strategy for using AI?",
    subtitle: "Leadership's AI vision and roadmap.",
    caption: "Dimension 1/5 · Strategy & Vision",
    likertMin: "None at all",
    likertMax: "Fully mature",
  },
  4: {
    title: "Can your team use AI tools in their daily workflows?",
    subtitle: "Technical capability and usage habits.",
    caption: "Dimension 2/5 · Team & Capability",
    likertMin: "Not used at all",
    likertMax: "Everyone uses them",
  },
  5: {
    title: "Are AI solutions integrated into your current business processes?",
    subtitle: "Automation, workflow, and system integrations.",
    caption: "Dimension 3/5 · Process & Integration",
    likertMin: "Not integrated at all",
    likertMax: "Fully integrated",
  },
  6: {
    title: "Is your data in a format that AI models can use?",
    subtitle: "Data quality, access, and infrastructure readiness.",
    caption: "Dimension 4/5 · Data & Infrastructure",
    likertMin: "Not ready at all",
    likertMax: "Fully ready",
  },
  7: {
    title: "How much resistance to AI is there in your organization?",
    subtitle: "Change management, acceptance, and adoption status.",
    caption: "Dimension 5/5 · Culture & Adoption",
    likertMin: "No resistance at all",
    likertMax: "Very high resistance",
  },
  8: {
    title: "Pilot projects can't make it to production",
    subtitle: "They stall at the demo stage, with no organization-wide adoption.",
    caption: "Challenge 1/4",
    options: [
      { value: 1, label: "Never experience this", emoji: "😌" },
      { value: 2, label: "Rarely", emoji: "🙂" },
      { value: 3, label: "Sometimes", emoji: "😐" },
      { value: 4, label: "Often", emoji: "😟" },
      { value: 5, label: "Constantly", emoji: "😩" },
    ] as KurumsalOptionItem[],
  },
  9: {
    title: "We can't measure the return on our AI investments",
    subtitle: "It's unclear how much savings, revenue, or efficiency gain it delivered.",
    caption: "Challenge 2/4",
    options: [
      { value: 1, label: "Never experience this", emoji: "😌" },
      { value: 2, label: "Rarely", emoji: "🙂" },
      { value: 3, label: "Sometimes", emoji: "😐" },
      { value: 4, label: "Often", emoji: "😟" },
      { value: 5, label: "Constantly", emoji: "😩" },
    ] as KurumsalOptionItem[],
  },
  10: {
    title: "The team struggles to adapt to new tools",
    subtitle: "Training was given, but behavior didn't change and ownership is lacking.",
    caption: "Challenge 3/4",
    options: [
      { value: 1, label: "Never experience this", emoji: "😌" },
      { value: 2, label: "Rarely", emoji: "🙂" },
      { value: 3, label: "Sometimes", emoji: "😐" },
      { value: 4, label: "Often", emoji: "😟" },
      { value: 5, label: "Constantly", emoji: "😩" },
    ] as KurumsalOptionItem[],
  },
  11: {
    title: "There isn't enough budget or expertise for AI transformation",
    subtitle: "A lack of technical resources, budget, or the right partner.",
    caption: "Challenge 4/4",
    options: [
      { value: 1, label: "Never experience this", emoji: "😌" },
      { value: 2, label: "Rarely", emoji: "🙂" },
      { value: 3, label: "Sometimes", emoji: "😐" },
      { value: 4, label: "Often", emoji: "😟" },
      { value: 5, label: "Constantly", emoji: "😩" },
    ] as KurumsalOptionItem[],
  },
  12: {
    title: "What do you most want to achieve with AI this year?",
    subtitle: "Select your primary goal.",
    caption: "Goals",
    options: [
      { value: "verimlilik", label: "Operational efficiency", emoji: "⚙️" },
      { value: "gelir", label: "Revenue growth", emoji: "📈" },
      { value: "maliyet", label: "Cost reduction", emoji: "💰" },
      { value: "deneyim", label: "Customer experience", emoji: "⭐" },
      { value: "rekabet", label: "Competitive advantage", emoji: "🎯" },
    ] as KurumsalOptionItem[],
  },
  13: {
    title: "Which departments are the priority for AI transformation?",
    subtitle: "You can select more than one.",
    caption: "Priorities",
    options: [
      { value: "pazarlama", label: "Marketing" },
      { value: "satis", label: "Sales" },
      { value: "musteri_hizmetleri", label: "Customer Service" },
      { value: "finans", label: "Finance" },
      { value: "operasyon", label: "Operations" },
      { value: "ik", label: "Human Resources" },
      { value: "it", label: "IT" },
      { value: "arge", label: "R&D" },
    ] as KurumsalOptionItem[],
  },
  14: {
    title: "How large is your team?",
    subtitle: "Tell us your overall employee count.",
    caption: "Company Profile",
    options: [
      { value: "1-10", label: "1-10 people", emoji: "👤" },
      { value: "11-50", label: "11-50 people", emoji: "👥" },
      { value: "51-200", label: "51-200 people", emoji: "🏢" },
      { value: "200+", label: "200+ people", emoji: "🏭" },
    ] as KurumsalOptionItem[],
  },
  15: {
    title: "Your first and last name?",
    subtitle: "Used in your report and your consultation invitation.",
    placeholder: "Full Name",
    cta: "Continue",
  },
  16: {
    title: "Your work email address?",
    subtitle: "We'll send your detailed report by email.",
    placeholder: "name@company.com",
    cta: "Continue",
  },
  17: {
    title: "Your phone number?",
    subtitle: "We'll reach out to you for a strategy consultation.",
    placeholder: "+90 5XX XXX XX XX",
    cta: "Create My Report",
  },
  18: {
    title: "Your Corporate AI Maturity Report is being prepared...",
    extra: {
      steps: [
        "Analyzing the assessment across 5 dimensions...",
        "Running the industry benchmark...",
        "Building your personalized report...",
      ],
      durationMs: 5500,
    },
  },
  19: {
    title: "Your Corporate AI Maturity Result",
    cta: "Free Strategy Consultation",
  },
  20: {
    title: "Next Step: Strategy Consultation",
    subtitle: "Let's start with a free 30-minute discovery call. Once we understand your team, your goals, and your current situation, we'll determine the best-fit program together.",
    cta: "Schedule a Call",
  },
  21: {
    title: "Corporate Transformation with the GROWT Method",
    subtitle: "Let's determine the best-fit program for your company together.",
    cta: "Explore the Details",
  },
};

/* -------------------------------------------------------------------------- */
/*  Persona summaries (4 corporate maturity levels)                           */
/* -------------------------------------------------------------------------- */

export const KURUMSAL_PERSONA_SUMMARIES: Record<string, {
  emoji: string;
  title: string;
  subtitle: string;
  summary: string;
  recommendations: string[];
}> = {
  Baslangic: {
    emoji: "🌱",
    title: "Beginner",
    subtitle: "AI Awareness Stage",
    summary: "Your organization is at the start of its AI journey. Strategy, team capability, and data infrastructure are still being built. With the right foundations in place, the potential for rapid progress is high.",
    recommendations: [
      "Create an AI strategy and vision document",
      "Identify the best-fit department for a pilot project",
      "Map out your team's capabilities",
    ],
  },
  Kesif: {
    emoji: "🔍",
    title: "Exploration",
    subtitle: "AI Experimentation Stage",
    summary: "You're trying out AI tools, but there isn't a systematic approach yet. There are individual wins, but scaling across the organization is missing. With the right roadmap, you can accelerate.",
    recommendations: [
      "Evaluate your current pilot projects and build a scaling plan",
      "Set up an ROI measurement framework",
      "Launch a change management program",
    ],
  },
  Uygulama: {
    emoji: "⚙️",
    title: "Implementation",
    subtitle: "AI Operations Stage",
    summary: "You're actively using AI solutions, and integration into your business processes has begun. Now is the time to focus on scaling, governance, and sustainability.",
    recommendations: [
      "Establish an AI governance framework and policies",
      "Plan for multi-department integration",
      "Set up a measurable ROI reporting system",
    ],
  },
  Lider: {
    emoji: "🚀",
    title: "Leader",
    subtitle: "AI Transformation Stage",
    summary: "Your organization uses AI as a strategic competitive advantage. Processes are integrated, the team is capable, and results are measurable. Now is the time to explore new opportunities and lead your industry.",
    recommendations: [
      "Explore new AI use cases",
      "Publish case studies to lead the industry",
      "Set up an AI innovation lab",
    ],
  },
};

/* -------------------------------------------------------------------------- */
/*  Paywall / CTA copy                                                        */
/* -------------------------------------------------------------------------- */

export const KURUMSAL_PAYWALL_COPY = {
  hero: {
    title: "{firstName}, your company's AI transformation roadmap is ready",
    subtitle: "From strategic assessment to full-scale transformation with the GROWT Method.",
  },
  services: [
    {
      title: "AI Strategy & Roadmap",
      description: "Stakeholder interviews, technology review, and a 90-day implementation plan.",
      duration: "2-3 weeks",
    },
    {
      title: "GROWT Team Program",
      description: "12 weeks of live mentorship. Weekly live sessions + monthly 1:1 strategy.",
      duration: "12 weeks",
    },
    {
      title: "GROWT Transformation Mentorship",
      description: "6-12 months of mentorship. All 5 levels, with multi-department support.",
      duration: "6-12 months",
    },
  ],
  cta: {
    primary: "Schedule a Free Strategy Consultation",
    secondary: "Get More Information",
    bookingUrl: "https://app.growtify.app/widget/bookings/kurumsal-on-gorusme",
    detailUrl: "https://growtify.ai/kurumsal",
  },
  faq: [
    {
      q: "How long does the program take?",
      a: "It depends on the scope. The Team Program runs 12 weeks; Transformation Mentorship runs 6-12 months.",
    },
    {
      q: "What size should the team be?",
      a: "A minimum of 5 people is recommended. Transformation Mentorship includes multi-department support.",
    },
    {
      q: "How is ROI measured?",
      a: "Each program includes ROI checkpoints. Impact on time, efficiency, cost, and revenue is measured quantitatively.",
    },
    {
      q: "How do we get started?",
      a: "With a free 30-minute strategy consultation. Once we understand your team and your goals, we determine the program together.",
    },
  ],
};

export const KURUMSAL_LEGAL = {
  disclaimer: "This assessment is an automated AI maturity analysis provided by Growtify.ai. It does not constitute professional, legal, or financial advice. Results are based on the answers given. Your personal data is processed under the Turkish Personal Data Protection Law No. 6698 (KVKK).",
};
