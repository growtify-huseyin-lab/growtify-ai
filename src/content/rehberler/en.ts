/**
 * EN lead-magnet guide content — 12 sectoral guides for /en/guide/{english-slug}.
 *
 * Source: Creative deliverable ART-growtify-ai-creative-003
 *   (_handoff/en/guide/*.mdx + _handoff/en/data/en-slug-and-legal-map.json).
 * CEO decision 2026-05-31: English slugs on /en (no Turkish slugs in EN URLs),
 * /en/rehber/{tr} → /en/guide/{en} 301, hreflang remap to new EN path.
 *
 * Keyed by ENGLISH slug. Mirrors the RehberContent shape used by the TR route.
 *
 * GHL tags are EN-funnel specific (gai_en_*) per the separate-EN-funnel decision
 * ("merge yerine ENG özel fieldlar ve taglar üret"). lang_eng is added by the API.
 *
 * pdfUrl is intentionally empty: EN lead-magnet PDFs are NOT yet produced
 * (Creative dependency). Until they land, the EN guide form captures the lead and
 * shows an email-delivery success state instead of an immediate (broken) download.
 */

import type { RehberContent } from "./index";

/** TR slug → EN slug (guide route). Authoritative map from en-slug-and-legal-map.json. */
export const GUIDE_TR_TO_EN: Record<string, string> = {
  saglik: "healthcare",
  hukuk: "legal",
  guzellik: "beauty",
  emlak: "real-estate",
  eticaret: "ecommerce",
  dis: "dental",
  muhasebe: "accounting",
  eczacilik: "pharmacy",
  turizm: "tourism",
  mimarlik: "architecture",
  egitim: "education",
  fitness: "fitness",
};

/** EN slug → TR slug (reverse, for hreflang + PDF/data cross-reference). */
export const GUIDE_EN_TO_TR: Record<string, string> = Object.fromEntries(
  Object.entries(GUIDE_TR_TO_EN).map(([tr, en]) => [en, tr]),
);

export const REHBERLER_EN: Record<string, RehberContent> = {
  healthcare: {
    slug: "healthcare",
    name: "Healthcare",
    icon: "🩺",
    hero: {
      title: "The AI Starter Guide for Dietitians & Health Professionals",
      subtitle: "A practical guide that cuts 15 hours of repetitive weekly work down to 2.",
      painHook:
        "Client intake forms, session notes, Instagram content, appointment reminders — is most of your time going to these? AI takes the repetitive load off your plate, so you can focus on your clients.",
    },
    whatInside: [
      "5 AI tools — hand-picked for a health practice (Claude, ChatGPT, Calendly, Whisper, Canva AI)",
      "3 practical scenarios — client onboarding, weekly content, post-appointment follow-up",
      "10 copy-paste prompts — from nutrition plans to Instagram posts, ready to use",
      "A step-by-step checklist for your first 7 days",
      "A tool comparison — which to use when, and what's free vs. paid",
    ],
    targetProfile: "Dietitians, psychologists, physiotherapists, and health coaches",
    pdfUrl: "",
    ghlSectorTag: "gai_en_sector_healthcare",
    ghlLeadMagnetTag: "gai_en_lm_healthcare",
    seo: {
      title: "AI Starter Guide for Health Professionals",
      description:
        "A practical guide that cuts 15 hours of repetitive weekly work down to 2 — 5 AI tools, 3 scenarios, 10 copy-paste prompts for your health practice.",
    },
  },

  legal: {
    slug: "legal",
    name: "Legal",
    icon: "⚖️",
    hero: {
      title: "AI for Lawyers: 5 Things You Can Do in 10 Minutes",
      subtitle: "Case-law research, petition drafting, client communication — done with AI, with a hands-on demo.",
      painHook:
        "A case search that used to eat 3 hours now takes 20 minutes. A petition draft that used to take 2 hours is ready in a fraction of the time. AI takes the repetitive load off your plate, so you can spend more time with clients and less on office overhead — we teach you how, you put it to work.",
    },
    whatInside: [
      "Case-law research with AI — from 3 hours down to 20 minutes, with a step-by-step demo",
      "Petition templates on demand — ready drafts generated with Claude and ChatGPT prompts",
      "Client communication templates — consistent, professional, and time-saving",
      "15 copy-paste prompts — a prompt pack written specifically for legal practice",
      "5 AI tools compared — which one to reach for, and when, in legal work",
    ],
    targetProfile: "Independent lawyers, legal consultants, mediators, and law-firm managers",
    pdfUrl: "",
    ghlSectorTag: "gai_en_sector_legal",
    ghlLeadMagnetTag: "gai_en_lm_legal",
    seo: {
      title: "AI for Lawyers: 5 Things in 10 Minutes",
      description:
        "Case-law research, petition drafts, client communication — done with AI. A practical guide for legal professionals, with a step-by-step demo and 15 ready prompts.",
    },
  },

  beauty: {
    slug: "beauty",
    name: "Beauty & Aesthetics",
    icon: "💄",
    hero: {
      title: "The AI Content Creation Guide for Salons & Clinics",
      subtitle: "A 30-day Instagram plan + Canva prompts + a hashtag strategy.",
      painHook:
        "How many hours a week go into Instagram content? The hard part usually isn't the quality — it's keeping it consistent. AI helps you plan a whole month at once, so you can systematize your content instead of scrambling for it. We teach you how, you put it to work.",
    },
    whatInside: [
      "A 30-post Instagram content plan — with ready-to-use captions",
      "50+ Canva prompts — written for salon and clinic visuals across every format",
      "A hashtag strategy — backed by industry research and segmented by audience",
      "5 Reels script templates — from storytelling to before-and-after formats",
      "A client loyalty message series — from post-appointment follow-ups to birthday automation",
    ],
    targetProfile: "Salon owners, aestheticians, clinic managers, and hairdressers",
    pdfUrl: "",
    ghlSectorTag: "gai_en_sector_beauty",
    ghlLeadMagnetTag: "gai_en_lm_beauty",
    seo: {
      title: "AI Content Guide for Salons & Clinics",
      description:
        "A 30-day Instagram plan, Canva prompts, and a hashtag strategy. The practical AI content guide for beauty and aesthetics professionals.",
    },
  },

  "real-estate": {
    slug: "real-estate",
    name: "Real Estate",
    icon: "🏠",
    hero: {
      title: "The AI Guide for Real Estate Professionals",
      subtitle: "From writing listings to matching buyers — get back 10 hours a week.",
      painHook:
        "Nearly 40% of a real estate agent's time goes to content and admin work instead of selling. AI takes the repetitive tasks off your plate, so you can focus on closing deals and looking after your clients. We teach you how, you put it to work.",
    },
    whatInside: [
      "3 practical scenarios — a listing production line, buyer matching, and market reports",
      "5 AI tools compared — which one to reach for, and when, in a real estate practice",
      "15 copy-paste prompts — from residential, commercial, and land listings to neighborhood analysis",
      "A first-7-days checklist — a step-by-step way to set up the whole system from scratch",
      "A then vs. now comparison — with concrete time-savings figures",
    ],
    targetProfile: "Real estate agents, property consultants, and land specialists",
    pdfUrl: "",
    ghlSectorTag: "gai_en_sector_real_estate",
    ghlLeadMagnetTag: "gai_en_lm_real_estate",
    seo: {
      title: "The AI Guide for Real Estate Professionals",
      description:
        "From writing listings to matching buyers — get back 10 hours a week with AI. Three scenarios, 15 ready prompts, and a 7-day setup checklist.",
    },
  },

  ecommerce: {
    slug: "ecommerce",
    name: "E-Commerce",
    icon: "🛒",
    hero: {
      title: "The AI Content & Growth Guide for E-Commerce Sellers",
      subtitle: "Hundreds of product descriptions, customer service, and ads — manage it all with AI.",
      painHook:
        "Writing product descriptions, answering customer questions, running ads — across countless products and formats, the work never stops. AI takes the repetitive load off your plate, so you can focus on growth and sales. We teach you how, you put it to work.",
    },
    whatInside: [
      "3 practical scenarios — a product content factory, a customer service assistant, and ad optimization",
      "5 AI tools — hand-picked for e-commerce operations",
      "12 copy-paste prompts — spanning every product category",
      "A first-7-days checklist — a step-by-step way to bring AI into your operation",
      "A before vs. after comparison — showing gains in both time and conversion",
    ],
    targetProfile: "E-commerce sellers, brand owners, dropshippers, and boutique businesses",
    pdfUrl: "",
    ghlSectorTag: "gai_en_sector_ecommerce",
    ghlLeadMagnetTag: "gai_en_lm_ecommerce",
    seo: {
      title: "AI Content & Growth Guide for E-Commerce",
      description:
        "Hundreds of product descriptions, customer service, and ads — manage it all with AI. Three scenarios, 5 tools, 12 prompts, and a 7-day checklist.",
    },
  },

  dental: {
    slug: "dental",
    name: "Dental",
    icon: "🦷",
    hero: {
      title: "The AI Communication & Marketing Guide for Dental Clinics",
      subtitle: "Multilingual patient communication, clinic reputation, and treatment education — made systematic with AI.",
      painHook:
        "Dental tourism is a huge opportunity, but a language barrier and a thin online presence keep slowing it down — while patients are left without clear answers about their treatment. AI tackles both problems at once: it takes the repetitive communication load off your plate so you can focus on the chair.",
    },
    whatInside: [
      "3 practical scenarios — a multilingual patient communication system, treatment education, and reputation management",
      "5 AI tools — hand-picked for a dental clinic, chosen for the way a dental practice actually runs",
      "12 copy-paste prompts — from English/German patient correspondence to Google review replies",
      "Your first 7-day checklist — step by step, to get the whole system up and running",
      "A presentation template built for dental tourism — ready to put to work",
    ],
    targetProfile: "Dentists, orthodontists, and dental clinic managers",
    pdfUrl: "",
    ghlSectorTag: "gai_en_sector_dental",
    ghlLeadMagnetTag: "gai_en_lm_dental",
    seo: {
      title: "AI Communication & Marketing for Dental Clinics",
      description:
        "Multilingual patient communication, treatment education, and reputation management for dental clinics — made systematic with AI. Free for dentists.",
    },
  },

  accounting: {
    slug: "accounting",
    name: "Accounting",
    icon: "📊",
    hero: {
      title: "The AI Automation Guide for Accountants",
      subtitle: "From month-end close to keeping up with regulation — hand the repetitive work over to AI.",
      painHook:
        "It's month-end again: documents piling up, deadlines closing in, and not enough hours in the day. AI lightens that document load — it takes the repetitive work off your plate so you can focus on advising your clients.",
    },
    whatInside: [
      "3 practical scenarios — document-processing automation, keeping up with regulation, and the monthly client report",
      "5 AI tools — hand-picked for an accounting practice",
      "12 copy-paste prompts — from document classification to tax-planning notes",
      "Your first 7-day checklist — step by step, to weave the system into your office",
      "A before → after comparison — the concrete time you save on month-end close",
    ],
    targetProfile: "Tax advisors, accountants, accounting-firm owners, and financial consultants",
    pdfUrl: "",
    ghlSectorTag: "gai_en_sector_accounting",
    ghlLeadMagnetTag: "gai_en_lm_accounting",
    seo: {
      title: "The AI Automation Guide for Accountants",
      description:
        "From month-end close to keeping up with regulations — hand the repetitive work to AI. A free, practical guide for accountants and tax advisors.",
    },
  },

  pharmacy: {
    slug: "pharmacy",
    name: "Pharmacy",
    icon: "💊",
    hero: {
      title: "The AI Inventory, Customer & Content Guide for Pharmacists",
      subtitle: "Demand forecasting, chronic-patient follow-up, and e-pharmacy content — systematize them all.",
      painHook:
        "The seasons turn, but you can never quite tell which products to stock up on, or by how much. There's no time to send regular reminders to chronic patients. And e-pharmacy content is a job all its own. AI solves all three at once — it takes the repetitive work off your plate so you can focus on your customers.",
    },
    whatInside: [
      "3 practical scenarios — inventory and demand forecasting, e-pharmacy content production, and a customer loyalty system",
      "5 AI tools — hand-picked for pharmacy operations",
      "10 copy-paste prompts — from product descriptions to chronic-patient follow-up",
      "Your first 7-day checklist — step by step, to weave the system into your pharmacy",
      "Mandatory-warning templates — automate the required disclaimers on medication content",
    ],
    targetProfile: "Independent pharmacists, pharmacy owners, and pharmacy-chain managers",
    pdfUrl: "",
    ghlSectorTag: "gai_en_sector_pharmacy",
    ghlLeadMagnetTag: "gai_en_lm_pharmacy",
    seo: {
      title: "AI Inventory, Customer & Content Guide for Pharmacists",
      description:
        "Demand forecasting, chronic-patient follow-up, and e-pharmacy content — systematize all three with AI. A free, practical guide for pharmacists.",
    },
  },

  tourism: {
    slug: "tourism",
    name: "Tourism",
    icon: "✈️",
    hero: {
      title: "The AI Guide for Tourism Professionals",
      subtitle: "Multilingual 24/7 service, personalized tour plans, and booking automation — all in one guide.",
      painHook:
        "A Russian customer just messaged you. A German guest wants a custom tour. An English question is sitting in your DMs. Everyone wants an answer right now — but you're one person. AI takes that multilingual communication on, around the clock, so the repetitive replies leave your plate and you focus on the guests in front of you.",
    },
    whatInside: [
      "5 AI tools — hand-picked for tourism operations (Claude, ChatGPT, ManyChat, Calendly, and Canva AI)",
      "3 practical scenarios — a multilingual chatbot, personalized tour planning, and review management",
      "10 copy-paste prompts — from booking confirmations to full itineraries, everything's ready to go",
      "Your first 7-day checklist — step by step, to stand up a multilingual system from scratch",
      "Templates in 5 languages — ready-made messages for TR, EN, AR, DE, and RU",
    ],
    targetProfile: "Tour operators, guides, boutique hotel owners, and travel agencies",
    pdfUrl: "",
    ghlSectorTag: "gai_en_sector_tourism",
    ghlLeadMagnetTag: "gai_en_lm_tourism",
    seo: {
      title: "The AI Guide for Tourism Professionals",
      description:
        "Multilingual 24/7 service, personalized tour planning, and booking automation — all in one guide. Free for tour operators, guides, and hoteliers.",
    },
  },

  architecture: {
    slug: "architecture",
    name: "Architecture",
    icon: "📐",
    hero: {
      title: "The AI Render & Presentation Guide for Architects",
      subtitle: "AI tools that turn a two-day render wait into two minutes — concept, presentation, project management.",
      painHook:
        "When a client says “I'm picturing something like this,” do they really have to wait a week for three different concepts? In that week, they walk over to your competitor. AI render tools cut the process down to minutes.",
    },
    whatInside: [
      "5 AI tools — hand-picked for architecture (Midjourney, Leonardo AI, Claude, Canva, Stable Diffusion)",
      "3 practical scenarios — AI render generation, client presentations, and project-flow automation",
      "A 10-prompt library — for interior, façade, landscape, and detail renders",
      "First-7-days checklist — a step-by-step plan to set up your own AI render system",
      "A client pitch deck template — from concept all the way to delivery plan",
    ],
    targetProfile: "Architects, interior designers, landscape architects, and design studios",
    pdfUrl: "",
    ghlSectorTag: "gai_en_sector_architecture",
    ghlLeadMagnetTag: "gai_en_lm_architecture",
    seo: {
      title: "The AI Render & Presentation Guide for Architects",
      description:
        "A practical guide that turns a two-day render wait into two minutes with AI — concept, presentation, and project workflow tools for architects.",
    },
  },

  education: {
    slug: "education",
    name: "Education",
    icon: "🎓",
    hero: {
      title: "The AI Material-Creation Guide for Educators",
      subtitle: "Question banks, presentations, personalized feedback — 10 hours of material prep done in 90 minutes.",
      painHook:
        "Sunday night, and the pile in front of you: a lesson presentation, questions for three classes, 20 assignments to grade. By the time it's all done, you've got nothing left for the actual teaching. AI cuts that pile down to a fifth of its size.",
    },
    whatInside: [
      "5 AI tools — hand-picked for education (Claude, ChatGPT, Canva, Kahoot, Notion AI)",
      "3 practical scenarios — question banks, presentation creation, and a personalized feedback system",
      "10 copy-paste prompts — for material at every subject and difficulty level",
      "First-7-days checklist — to redesign your material workflow with AI",
      "A personalized feedback template — individual comments for 30 students in 30 minutes",
    ],
    targetProfile: "Educators, academics, private tutors, and online course creators",
    pdfUrl: "",
    ghlSectorTag: "gai_en_sector_education",
    ghlLeadMagnetTag: "gai_en_lm_education",
    seo: {
      title: "The AI Material-Creation Guide for Educators",
      description:
        "A practical guide that turns 10 hours of material prep into 90 minutes with AI — question banks, presentations, and personalized feedback for educators.",
    },
  },

  fitness: {
    slug: "fitness",
    name: "Fitness",
    icon: "💪",
    hero: {
      title: "The AI Program Guide for Fitness Professionals",
      subtitle: "Custom training + nutrition + follow-up for every client — in minutes, and built to scale.",
      painHook:
        "You've got 15 clients, and writing a custom program for each one runs 10 hours a week. The motivation messages, the check-ins, the nutrition tweaks pile up — and then the client leaves anyway. AI takes that load off your plate.",
    },
    whatInside: [
      "5 AI tools — hand-picked for a fitness practice (Claude, ChatGPT, Trainerize, Canva AI, WhatsApp Business)",
      "3 practical scenarios — training program generation, nutrition planning, and motivation tracking",
      "10 copy-paste prompts — ready-made programs across a level × goal × equipment matrix",
      "First-7-days checklist — to rebuild your client systems with AI",
      "A motivation message template pack — ready to go for every day of the week",
    ],
    targetProfile: "Personal trainers, fitness studio owners, and nutrition coaches",
    pdfUrl: "",
    ghlSectorTag: "gai_en_sector_fitness",
    ghlLeadMagnetTag: "gai_en_lm_fitness",
    seo: {
      title: "The AI Program Guide for Fitness Professionals",
      description:
        "A practical guide for coaches: custom training, nutrition, and follow-up for every client — in minutes, and built to scale — with AI handling the load.",
    },
  },
};

/** Ordered EN guide slugs (mirrors TR REHBER_SLUGS order). */
export const GUIDE_SLUGS: string[] = [
  "healthcare",
  "legal",
  "beauty",
  "real-estate",
  "ecommerce",
  "dental",
  "accounting",
  "pharmacy",
  "tourism",
  "architecture",
  "education",
  "fitness",
];

/** Resolve an EN guide by its English slug. */
export function getGuideEn(enSlug: string): RehberContent | undefined {
  return REHBERLER_EN[enSlug];
}
