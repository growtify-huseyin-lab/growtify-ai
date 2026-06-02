// EN mirror of kurumsal-constants.ts — same ids/icons/colors/hrefs/values/numbers/letters;
// only human-readable text translated. kurumsal-constants.ts (TR) stays untouched.

export const KURUMSAL_HERO_EN = {
  badge: "Corporate AI Transformation",
  title: "Your Business's AI Transformation Starts Here",
  subtitle:
    "From strategic assessment to full-scale transformation with the GROWT Method™ — your team, your processes, your results.",
  primaryCta: "Book a Strategy Call",
  primaryCtaHref: "https://app.growtify.app/widget/bookings/kurumsal-on-gorusme",
  secondaryCta: "Take the AI Readiness Test",
  secondaryCtaHref: "/test/enterprise",
} as const;

export const KURUMSAL_PROBLEMS_EN = [
  {
    icon: "Target",
    title: "Pilot Projects Don't Scale",
    description:
      "A few people use AI, but there's no organization-wide adoption. Pilot projects stall at the demo stage.",
  },
  {
    icon: "Zap",
    title: "Tool-First Starts Fail",
    description:
      "AI accounts get opened, but there's no strategic direction. Everyone pulls in a different direction and no measurable results come.",
  },
  {
    icon: "Users",
    title: "Training Alone Isn't Enough",
    description:
      "The team got trained, but behavior didn't change. Ownership, operational cadence, and a measurement system are missing.",
  },
] as const;

export const KURUMSAL_SERVICES_EN = [
  // Category 1 — Mentorship
  {
    id: "degerlendirme",
    icon: "ClipboardCheck",
    title: "AI Readiness Assessment",
    category: "Mentorlük",
    description:
      "Find out your corporate AI maturity score in 5 minutes. Discover your priority areas with a free online assessment.",
    highlights: ["5 minutes", "Free", "Instant result"],
    cta: "Start the Assessment",
    ctaHref: "/test/enterprise",
  },
  {
    id: "strateji",
    icon: "FileSearch",
    title: "AI Strategy & Roadmap",
    category: "Mentorlük",
    description:
      "A joint assessment — stakeholder interviews, technology review, and a 90-day implementation roadmap. Together we see where your team is and where it can go.",
    highlights: ["2-3 weeks", "Joint assessment", "90-day roadmap"],
    cta: "See the Details",
    ctaHref: "https://app.growtify.app/widget/bookings/kurumsal-on-gorusme",
  },
  {
    id: "ekip-programi",
    icon: "GraduationCap",
    title: "GROWT Team Program",
    category: "Mentorlük",
    description:
      "12 weeks of live mentorship. Weekly live sessions + monthly company-specific 1:1 strategy calls. Your team gains the AI mindset and ships the first application themselves. Min. 5 people.",
    highlights: ["12 weeks", "Weekly live", "Monthly 1:1", "Min. 5 people"],
    cta: "Plan for Your Team",
    ctaHref: "https://app.growtify.app/widget/bookings/kurumsal-on-gorusme",
  },
  {
    id: "donusum-mentorlugu",
    icon: "Building2",
    title: "GROWT Transformation Mentorship",
    category: "Mentorlük",
    description:
      "6-12 months of live mentorship. Weekly live sessions + monthly company-specific strategy calls. Full GROWT Levels 1-5, multi-department support.",
    highlights: ["6-12 months", "Weekly live mentorship", "Full 5 levels", "Multi-department"],
    cta: "See the Details",
    ctaHref: "https://app.growtify.app/widget/bookings/kurumsal-on-gorusme",
  },
  // Category 2 — Growtify.app
  {
    id: "otomasyon",
    icon: "Cpu",
    title: "AI Automation & Workflows",
    category: "Growtify.app",
    description:
      "Put the approach your team learned into practice — workflow automation, AI agent setup, system integrations. Whether your team builds it or we do.",
    highlights: ["Workflow automation", "AI agent", "System integration"],
    cta: "Explore Opportunities",
    ctaHref: "https://app.growtify.app/widget/bookings/kurumsal-on-gorusme",
  },
  {
    id: "is-altyapisi",
    icon: "LayoutDashboard",
    title: "AI Business Infrastructure",
    category: "Growtify.app",
    description:
      "Digital business infrastructure for your team — CRM, pipeline, automation, funnel, calendar, chatbot, reporting. All on one platform with Growtify.app.",
    highlights: ["CRM + Pipeline", "Automation", "Funnel", "Calendar", "Reporting"],
    cta: "Request a Demo",
    ctaHref: "https://app.growtify.app/widget/bookings/kurumsal-on-gorusme",
  },
] as const;

export const KURUMSAL_GROWT_PHASES_EN = [
  {
    letter: "G",
    name: "Gap Analysis",
    subtitle: "Strategic Assessment",
    description: "Assess your organization's AI maturity across 5 dimensions. Stakeholder interviews, technology review, competitive analysis.",
    deliverables: ["AI Readiness Report (20-30 pages)", "Use-Case Matrix", "Executive Presentation"],
    color: "#EF4444",
  },
  {
    letter: "R",
    name: "Roadmap",
    subtitle: "Roadmap Creation",
    description: "A 90-day implementation plan, resource requirements, decision points, and success metrics.",
    deliverables: ["90-Day Roadmap", "Resource Plan", "ROI Projection"],
    color: "#F97316",
  },
  {
    letter: "O",
    name: "Operationalize",
    subtitle: "Implementation & Integration",
    description: "Build, test, and ship the strategically defined AI solutions into production.",
    deliverables: ["3-5 Live AI Solutions", "Integration Documentation", "SOPs"],
    color: "#EAB308",
  },
  {
    letter: "W",
    name: "Win",
    subtitle: "Measurement & Reporting",
    description: "Measure, document, and report concrete results to the board.",
    deliverables: ["ROI Report", "Board Presentation", "Internal Case Studies"],
    color: "#22C55E",
  },
  {
    letter: "T",
    name: "Transform",
    subtitle: "Scaling & Governance",
    description: "Roll out successful solutions across the organization. Establish an AI governance framework.",
    deliverables: ["AI Usage Policy", "Scaling Playbook", "Sustainability Plan"],
    color: "#5d47f0",
  },
] as const;

export const KURUMSAL_PROCESS_EN = [
  {
    step: 1,
    title: "Strategy Call",
    description: "A 30-minute discovery call. We get to know your team, your goals, and your current AI usage.",
    icon: "MessageSquare",
  },
  {
    step: 2,
    title: "Assessment",
    description: "A 5-dimension AI maturity analysis with the GROWT Method. Stakeholder interviews and technology review.",
    icon: "FileSearch",
  },
  {
    step: 3,
    title: "Program Selection",
    description: "Based on the assessment results, we determine the most suitable program and scope together.",
    icon: "CheckCircle2",
  },
  {
    step: 4,
    title: "Implementation & Measurement",
    description: "Implementation through the GROWT phases, regular ROI checkpoints, and executive reporting.",
    icon: "TrendingUp",
  },
] as const;

export const KURUMSAL_STATS_EN = [
  { value: "3.5x", label: "Average return on every $1 invested in AI", icon: "TrendingUp", source: "IBM 2026" },
  { value: "68%", label: "Businesses reaching expected productivity within the first 12 months", icon: "Clock", source: "McKinsey 2026" },
  { value: "62%", label: "Organizations saying their employees aren't ready for AI", icon: "BarChart3", source: "Accenture 2026" },
  { value: "3.6x", label: "AI leaders' transformation-speed gap over competitors", icon: "Zap", source: "McKinsey 2026" },
] as const;

export const KURUMSAL_FAQ_EN = [
  {
    q: "How long does the program take?",
    a: "It depends on scope. The GROWT Team Program is 12 weeks; Transformation Mentorship is 6-12 months. We determine it together in the strategy call.",
  },
  {
    q: "What should the team size be?",
    a: "A minimum of 5 people is recommended. Transformation Mentorship includes multi-department support — it can be applied organization-wide.",
  },
  {
    q: "How is ROI measured?",
    a: "Every program includes ROI checkpoints. Time savings, productivity gains, cost savings, and revenue impact are measured and reported quantitatively.",
  },
  {
    q: "Will it fit our existing technology stack?",
    a: "Yes. The GROWT Method is technology-agnostic. It works with your existing tools. Growtify.app can be integrated optionally.",
  },
  {
    q: "Is it tailored to our industry or a generic program?",
    a: "It's tailored to your industry. The pre-assessment analyzes sector-specific needs and the program content is customized accordingly.",
  },
  {
    q: "How does it work — live or recorded?",
    a: "Weekly live sessions (all corporate clients together) + monthly company-specific 1:1 strategy calls + a WhatsApp company group. Your team learns through live interaction.",
  },
  {
    q: "What does it take to get started?",
    a: "We start with a free 30-minute strategy call. After understanding your team, your goals, and your current state, we determine the most suitable program together.",
  },
] as const;

export const KURUMSAL_SECTORS_EN = [
  "SaaS & Technology",
  "E-Commerce & Retail",
  "Finance & Banking",
  "Healthcare & Pharma",
  "Legal & Consulting",
  "Manufacturing & Logistics",
] as const;
