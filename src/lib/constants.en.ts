// EN mirror of constants.ts — same keys/ids/icons/colors/hrefs/values/numbers;
// only human-readable text translated. constants.ts (TR) stays untouched.
export const SITE_EN = {
  name: "Growtify.ai",
  tagline: "The platform for professionals growing their business with AI",
  domain: "growtify.ai",
  platformDomain: "go.growtify.ai",
  description:
    "We help individual professionals and SMEs transform with AI through the GROWT Method. Not a course but mentorship, not theory but practice.",
} as const;

export const NAV_LINKS_EN = [
  { label: "Home", href: "/" },
  { label: "GROWT Method", href: "/growt-method" },
  { label: "Sectors", href: "/sektor" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/iletisim" },
] as const;

export const GROWT_PHASES_EN = [
  {
    letter: "G",
    name: "Gap Analysis",
    level: 1,
    moduleCount: 4,
    badge: { color: "#EF4444" },
    motto: "Where are you, and what are you losing?",
    description:
      "Discover the AI opportunities in your business and see what you miss every month without AI.",
    elements: [
      "Agentic Demos",
      "Sector Library",
      "Status Assessment",
      "Loss Calculation",
    ],
    color: "bg-red-500",
  },
  {
    letter: "R",
    name: "Roadmap",
    level: 2,
    moduleCount: 4,
    badge: { color: "#F97316" },
    motto: "What should you do, and in what order?",
    description:
      "Not tools but mindset. Focus on the areas where your business will grow the most.",
    elements: [
      "AI Mindset",
      "Priority Selection",
      "Expectation Management",
      "Personal Plan",
    ],
    color: "bg-orange-500",
  },
  {
    letter: "O",
    name: "Operationalize",
    level: 3,
    moduleCount: 6,
    badge: { color: "#EAB308" },
    motto: "Take your first step",
    description:
      "Solve your first business problem with AI and integrate it into your daily operations.",
    elements: [
      "First Application",
      "Systematic Thinking",
      "Problem Solving",
      "Routine Integration",
      "Turning It Into Growth",
    ],
    color: "bg-yellow-500",
  },
  {
    letter: "W",
    name: "Win",
    level: 4,
    moduleCount: 4,
    badge: { color: "#22C55E" },
    motto: "Grow your business",
    description:
      "Find, win, and manage customers — a complete business-growth strategy with AI.",
    elements: [
      "Finding Prospects",
      "Customer Acquisition",
      "Customer Experience",
      "Measurement & Optimization",
    ],
    color: "bg-green-500",
  },
  {
    letter: "T",
    name: "Transform",
    level: 5,
    moduleCount: 4,
    badge: { color: "#5d47f0" },
    motto: "Work with AI teams",
    description:
      "You're on your own, but not alone. AI is an army working for you.",
    elements: [
      "Ceiling Analysis",
      "AI Team Setup",
      "Delegation",
      "Independence",
    ],
    color: "bg-primary",
  },
] as const;

export const SECTORS_EN = [
  { id: "saglik", label: "Healthcare", icon: "Heart", hook: "From client acquisition to follow-up — grow your practice with AI" },
  { id: "hukuk", label: "Law", icon: "Scale", hook: "From research to client acquisition — multiply your practice capacity" },
  { id: "guzellik", label: "Beauty", icon: "Sparkles", hook: "From bookings to loyalty — grow your salon with AI" },
  { id: "emlak", label: "Real Estate", icon: "Home", hook: "From writing listings to matching clients — grow your portfolio" },
  { id: "e_ticaret", label: "E-Commerce", icon: "ShoppingCart", hook: "From product pages to sales automation — grow your store" },
  { id: "dis", label: "Dentistry", icon: "Smile", hook: "From patient communication to dental tourism — grow your clinic" },
  { id: "muhasebe", label: "Accounting", icon: "Calculator", hook: "From document processing to client advisory — raise your firm's value" },
  { id: "eczacilik", label: "Pharmacy", icon: "Pill", hook: "From stock management to customer loyalty — grow your pharmacy" },
  { id: "turizm", label: "Tourism", icon: "Plane", hook: "From bookings to personalised tour experiences — grow your agency" },
  { id: "mimarlik", label: "Architecture", icon: "Ruler", hook: "From concept to client presentation — grow your studio" },
  { id: "egitim", label: "Education", icon: "GraduationCap", hook: "From material creation to learner tracking — grow your programme" },
  { id: "fitness", label: "Fitness", icon: "Dumbbell", hook: "From programme writing to client tracking — grow your studio" },
] as const;

export const STATS_EN = [
  { value: "92.5%", label: "92.5% of businesses in Türkiye don't use AI — early adopters win", source: "TÜİK 2025" },
  { value: "3.7x", label: "AI users achieve 3.7x more returns than their competitors", source: "Accenture/McKinsey 2026" },
  { value: "74.2%", label: "Why don't they start? 74% say the same thing: \"I don't know how\"", source: "TÜİK 2025" },
] as const;

export const PRODUCT_EN = {
  id: "growt",
  name: "GROWT Program",
  subtitle: "A sector-specific AI transformation program — at your own pace, process-supported",
  pricingModel: "personalized",
  pricingNote: "Find out your personal price",
  paymentType: "One-time payment",
  duration: "4 weeks of access",
  moduleUnlock: "Mentor-approved progression",
  features: [
    "Full access to all 5 GROWT levels",
    "Comprehensive content — modules, tasks, assessments",
    "Progress tracking and stage completion",
    "Mentor-approved progression system",
    "AI tool library + templates",
    "Community access — networking, Q&A",
    "WhatsApp support line",
    "4 weeks of full access",
  ],
  cta: "Create Your Personal Plan",
  ctaHref: "/test",
} as const;
