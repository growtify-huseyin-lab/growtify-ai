// Growtify AI — Quiz English Content Layer
// =============================================================================
// This file contains ONLY copy. No logic. No imports (except types).
// EN mirror of content-tr.ts — identical structure, translated copy.
//
// SLT Reference: SLT-v1 (brand-config.json v3.0, messaging-library.json v3.0)
// Production date: 2026-04-05
// Unit: Creative Dept — Asset Production Unit
// =============================================================================
//
// PRIVACY NOTE: Screen 26 subtitle contains a short data-privacy notice.
// LEGAL NOTE: Guarantee copy is written under the UK Consumer Rights Act
// (digital content exception) — LEGAL REVIEW REQUIRED; legal sign-off must be
// obtained before going live. See PAYWALL_COPY.guarantee.
// =============================================================================

import type { ScreenConfig } from "./types";

/* -------------------------------------------------------------------------- */
/*  1. SCREEN COPY — 37 screens                                               */
/* -------------------------------------------------------------------------- */

export const QUIZ_COPY: Record<number, Partial<ScreenConfig>> = {

  // ========== PHASE 1 — ENGAGE (Screen 1-3) ==========

  1: {
    caption: "37 questions · 100% personalized report",
    title: "AI Digital Maturity Test",
    subtitle: "In 2 minutes, find out how far behind AI you are and what you need to change.",
    cta: "Start",
    options: [
      { value: "bireysel", label: "Individual Professional", emoji: "👤" },
      { value: "isletme", label: "Business Owner", emoji: "🏢" },
    ],
  },

  2: {
    title: "What industry do you work in?",
    subtitle: "To personalize your results and recommendations.",
    options: [
      { value: "saglik", label: "Healthcare", icon: "Heart" },
      { value: "hukuk", label: "Law", icon: "Scale" },
      { value: "guzellik", label: "Beauty & Aesthetics", icon: "Sparkles" },
      { value: "emlak", label: "Real Estate", icon: "Home" },
      { value: "e_ticaret", label: "E-Commerce", icon: "ShoppingCart" },
      { value: "dis", label: "Dentistry", icon: "Smile" },
      { value: "muhasebe", label: "Accounting & Financial Advisory", icon: "Calculator" },
      { value: "eczacilik", label: "Pharmacy", icon: "Pill" },
      { value: "turizm", label: "Tourism & Travel", icon: "Plane" },
      { value: "mimarlik", label: "Architecture & Design", icon: "Ruler" },
      { value: "egitim", label: "Education & Coaching", icon: "GraduationCap" },
      { value: "fitness", label: "Fitness & Sports", icon: "Dumbbell" },
      { value: "sigorta", label: "Insurance", icon: "Shield" },
      { value: "restoran", label: "Restaurant & Café", icon: "UtensilsCrossed" },
      { value: "veteriner", label: "Veterinary", icon: "PawPrint" },
      { value: "diger", label: "Other / Prefer not to say", icon: "MoreHorizontal" },
    ],
  },

  3: {
    caption: "",
    // NOTE: Numbers use soft wording for the beta phase.
    // To be replaced with real figures once first-cohort data arrives.
    title: "Thousands of professionals have completed this test",
    subtitle: "Join the professionals taking part from all across the country.",
    cta: "Continue",
    extra: {
      metrics: [
        { label: "Completed the test", value: "Thousands of professionals" },
        { label: "Average time", value: "~2 minutes" },
        { label: "Personalized report", value: "100%" },
      ],
    },
  },

  // ========== PHASE 2 — EMPATHIZE (Screen 4-17) ==========

  4: {
    caption: "Question 1 / 14",
    title: "How much does not knowing what AI can do in your profession bother you?",
    subtitle: "It's not just ChatGPT — there are dozens of tools and methods specific to your industry.",
    options: [
      { value: 1, label: "Not at all", emoji: "😌" },
      { value: 2, label: "A little", emoji: "🙂" },
      { value: 3, label: "Moderately", emoji: "😐" },
      { value: 4, label: "A lot", emoji: "😟" },
      { value: 5, label: "Extremely", emoji: "😩" },
    ],
  },

  5: {
    caption: "Question 2 / 14",
    title: "How much does not being able to use AI tools in your work hold you back?",
    subtitle: "People who use AI for work at least once a week already see the difference.",
    options: [
      { value: 1, label: "Not at all", emoji: "😌" },
      { value: 2, label: "A little", emoji: "🙂" },
      { value: 3, label: "Moderately", emoji: "😐" },
      { value: 4, label: "A lot", emoji: "😟" },
      { value: 5, label: "Extremely", emoji: "😩" },
    ],
  },

  6: {
    caption: "Question 3 / 14",
    title: "How anxious does getting started with learning AI make you?",
    subtitle: "You might be thinking 'I'm not technical' — but most tools take 5 minutes to learn.",
    options: [
      { value: 1, label: "Not at all", emoji: "😌" },
      { value: 2, label: "A little", emoji: "🙂" },
      { value: 3, label: "Moderately", emoji: "😐" },
      { value: 4, label: "A lot", emoji: "😟" },
      { value: 5, label: "Extremely", emoji: "😩" },
    ],
  },

  7: {
    caption: "Question 4 / 14",
    title: "How much does feeling like you're missing opportunities by not using AI bother you?",
    subtitle: "Your peers may be doing the same work in half the time — while you're still doing it manually.",
    options: [
      { value: 1, label: "Not at all", emoji: "😌" },
      { value: 2, label: "A little", emoji: "🙂" },
      { value: 3, label: "Moderately", emoji: "😐" },
      { value: 4, label: "A lot", emoji: "😟" },
      { value: 5, label: "Extremely", emoji: "😩" },
    ],
  },

  8: {
    caption: "Question 5 / 14",
    title: "How disappointed were you when you tried AI but didn't get the result you wanted?",
    subtitle: "If you've tried it — did the output meet your expectations, or fall short?",
    options: [
      { value: 1, label: "Not at all", emoji: "😌" },
      { value: 2, label: "A little", emoji: "🙂" },
      { value: 3, label: "Moderately", emoji: "😐" },
      { value: 4, label: "A lot", emoji: "😟" },
      { value: 5, label: "Extremely", emoji: "😩" },
    ],
  },

  9: {
    caption: "Question 6 / 14",
    title: "How well do you know the AI tools and use cases specific to your profession?",
    subtitle: "Not general knowledge — do you know the solutions that fit your work directly?",
    options: [
      { value: 2, label: "Not at all", emoji: "😞" },
      { value: 4, label: "A little", emoji: "😕" },
      { value: 6, label: "Moderately", emoji: "🙂" },
      { value: 8, label: "Well", emoji: "😃" },
      { value: 10, label: "Very well", emoji: "🚀" },
    ],
  },

  10: {
    caption: "Question 7 / 14",
    title: "With so many AI tools out there, how hard is it to decide which one to start with?",
    subtitle: "Too many options, no guide — do you feel lost?",
    likertMin: "I decide easily",
    likertMax: "I'm completely lost",
  },

  11: {
    caption: "Question 8 / 14",
    title: "How strong is your fear of wasting time by using AI the wrong way?",
    subtitle: "You want to try, but you hesitate, wondering 'will this be a waste?'",
    likertMin: "I'm not afraid at all",
    likertMax: "I'm very afraid",
  },

  12: {
    caption: "Question 9 / 14",
    title: "How much does still doing manually the tasks AI could easily handle wear you out?",
    subtitle: "Content, reporting, customer follow-up, scheduling — most of these can be automated.",
    likertMin: "Doesn't wear me out at all",
    likertMax: "Wears me out a lot",
  },

  13: {
    caption: "Question 10 / 14",
    title: "Do you feel like you don't have time to learn AI?",
    subtitle: "Maybe, with the right approach, 15 minutes a day is enough.",
    likertMin: "I have the time",
    likertMax: "I have no time at all",
  },

  14: {
    caption: "Question 11 / 14",
    title: "How confident are you that you can integrate AI into your daily workflow?",
    subtitle: "Even if you learn it, can you actually put it into practice?",
    likertMin: "Not confident at all",
    likertMax: "Completely confident",
  },

  15: {
    caption: "Question 12 / 14",
    title: "How far behind do you think you are compared to peers who use AI?",
    subtitle: "You feel the gap — but is it growing wider every day?",
    likertMin: "I'm not behind",
    likertMax: "I'm far behind",
  },

  16: {
    caption: "Question 13 / 14",
    title: "How much does not knowing where to start with AI stop you?",
    subtitle: "Plenty of information, plenty of content — but no clear roadmap.",
    likertMin: "Doesn't stop me at all",
    likertMax: "It's completely stopped me",
  },

  17: {
    caption: "Question 14 / 14 ⭐",
    title: "How strong is your determination to transform your work with AI?",
    subtitle: "Curiosity, need, or urgency — which one brought you here?",
    likertMin: "Just curiosity",
    likertMax: "Urgent need",
  },

  // ========== PHASE 3 — DECLARE (Screen 18-20) ==========

  18: {
    title: "What do you most want to achieve with AI in the next 90 days?",
    subtitle: "Pick one — the most important.",
    options: [
      { value: "yeni_gelir", label: "Open up a new revenue stream" },
      { value: "zaman", label: "Win back 10+ hours a week" },
      { value: "musteri", label: "Attract more customers / clients" },
      { value: "otomasyon", label: "Automate repetitive work" },
      { value: "bilgi", label: "Truly master AI" },
    ],
  },

  19: {
    title: "In which areas do you want help from AI?",
    subtitle: "You can choose more than one — we want to see them all.",
    options: [
      {
        value: "pazarlama",
        label: "Marketing Processes",
        description: "ad management · content creation · SEO · social media",
      },
      {
        value: "satis",
        label: "Sales Processes",
        description: "lead tracking · proposal prep · customer onboarding",
      },
      {
        value: "musteri",
        label: "Customer Communication",
        description: "CRM · automation · follow-up messages · WhatsApp/email",
      },
      {
        value: "operasyon",
        label: "Operational Automation",
        description: "repetitive tasks · process management · workflow",
      },
      {
        value: "finans",
        label: "Finance and Accounting",
        description: "invoicing · reporting · expense tracking · budgeting",
      },
      {
        value: "strateji",
        label: "Strategy and Analysis",
        description: "data analysis · reporting · decision support · trend spotting",
      },
      {
        value: "personel",
        label: "Staff and Employee Management",
        description: "performance · shifts · training · internal comms",
      },
      {
        value: "egitim",
        label: "Training & Client Materials",
        description: "presentations · guides · briefings · custom programs",
      },
    ],
  },

  20: {
    title: "What holds you back most on your AI journey?",
    subtitle: "Be honest — these will be part of your plan.",
    options: [
      { value: "son_dakika", label: "I don't know where to start" },
      { value: "telefon", label: "I don't have time" },
      { value: "multitasking", label: "My technical knowledge isn't enough" },
      { value: "mukemmeliyetcilik", label: "Fear of choosing the wrong tool" },
      { value: "oz_sabotaj", label: "The feeling that I can't do it on my own" },
      { value: "mentor_yok", label: "No mentor or guide" },
    ],
  },

  // ========== PHASE 4 — AUTHORITY (Screen 21-23) ==========

  21: {
    caption: "",
    title: "This test was built on the findings of international AI research",
    subtitle: "Grounded in leading digital transformation reports and industry productivity studies.",
    cta: "Continue",
    extra: {
      sources: [
        "Leading AI research centers",
        "International digital transformation reports",
        "Industry productivity studies",
      ],
    },
  },

  22: {
    caption: "",
    title: "Reviewed by AI transformation experts",
    subtitle: "Every question and every recommendation was shaped by real-world hands-on experience.",
    cta: "Continue",
  },

  23: {
    caption: "",
    title: "Professionals from everywhere have started this journey",
    subtitle: "Dietitians, lawyers, real estate agents, e-commerce sellers — they all started from the same point.",
    cta: "Continue",
  },

  // ========== PHASE 5 — PERSONALIZE (Screen 24-26) ==========

  24: {
    title: "How much time can you set aside each day?",
    subtitle: "Be honest — your plan will be shaped around it.",
    options: [
      { value: 15, label: "15 minutes / day", emoji: "⏱️" },
      { value: 30, label: "30 minutes / day", emoji: "⏰" },
      { value: 45, label: "45 minutes / day", emoji: "🎯" },
      { value: 60, label: "1 hour / day", emoji: "🔥" },
    ],
  },

  25: {
    title: "Enter your first and last name",
    subtitle: "To personalize your report and recommendations.",
    placeholder: "Your Full Name",
    cta: "Continue",
  },

  26: {
    title: "Final step — let's get your report to you",
    subtitle: "Your email and phone are safe. We'll send your report and recommendations using this info.",
    placeholder: "example@mail.com",
    cta: "Prepare My Plan",
  },

  // ========== PHASE 6 — PRE-REVEAL (Screen 27-28) ==========

  27: {
    caption: "",
    title: "{firstName}, we've put together an early profile of you",
    subtitle: "Before your full result is ready — here are the first impressions.",
    cta: "See My Projection",
  },

  28: {
    caption: "",
    title: "We saw where you could get to in 90 days",
    subtitle: "The path from where you are now to the best place you can be.",
    cta: "Generate My Plan",
  },

  // ========== PHASE 7 — DRAMATIZE (Screen 29-33) ==========

  29: {
    caption: "",
    title: "Analyzing your answers...",
  },

  30: {
    caption: "",
    title: "One more thing — so we can help you better",
    subtitle: "Have you tried any AI tool in your work so far?",
    options: [
      { value: "true", label: "Yes, I've tried a few things" },
      { value: "false", label: "No, I haven't started yet" },
    ],
  },

  31: {
    caption: "",
    title: "Building your personalized curriculum...",
  },

  32: {
    caption: "",
    title: "One last question — let's set up the plan right",
    subtitle: "Over the next 4 weeks, how many days a week can you set aside time?",
    options: [
      { value: "true", label: "3 days or more" },
      { value: "false", label: "1-2 days" },
    ],
  },

  33: {
    caption: "",
    title: "Adding the finishing touches...",
  },

  // ========== PHASE 8 — DELIVER (Screen 34) ==========

  34: {
    caption: "",
    title: "{firstName}, your plan is ready!",
    subtitle: "Here's the path you'll follow over the next 4 weeks.",
    // The skeleton's "Claim My Reward" → gamification language — replaced with the below
    cta: "See My Result",
  },

  // ========== PHASE 9 — GAMIFY (Screen 35-36) ==========

  35: {
    caption: "",
    title: "A special discount is ready for you — let's open it",
    subtitle: "Not everyone who completes this test gets this discount. Limited time only.",
    cta: "See My Discount",
  },

  36: {
    caption: "",
    title: "Congratulations {firstName}!",
    subtitle: "The discount has been added to your account. Valid for 60 minutes — your plan is waiting for you.",
    cta: "Explore the Program",
  },

  // ========== PHASE 10 — CLOSE (Screen 37) ==========

  37: {
    caption: "",
    title: "GROWT Program — Your personal AI transformation plan",
    subtitle: "28 days · 5 stages · lessons that unlock step by step",
    cta: "Join the Program",
  },
};

/* -------------------------------------------------------------------------- */
/*  2. PERSONA SUMMARIES — 4 personas                                         */
/* -------------------------------------------------------------------------- */

export const PERSONA_SUMMARIES = {
  "Meraklı Gözlemci": {
    scoreRange: [0, 27],
    summary:
      "{firstName}, you're not feeling much pressure or resistance around AI right now. Maybe you're already trying a few things, or maybe it's not on your radar yet. Either way, you're in the right place — because awareness is the first step of the journey.",
    painIdentification: [
      "AI isn't an urgent matter for me right now.",
      "It interests me, but I don't know where to start.",
      "Maybe I just haven't realized I need it yet.",
    ],
    projection:
      "When you finish the first stage, you'll clearly see what AI can take on in your work and have chosen your first step.",
    recommendedLevel: "",
  },

  "Aktif Deneyici": {
    scoreRange: [30, 59],
    summary:
      "{firstName}, you feel some unease around AI — the worry of falling behind, not knowing where to start, and time pressure. A few obstacles are slowing you down, but you also have the drive to take action. With the right guidance, you can clear these obstacles.",
    painIdentification: [
      "I know I need to move to AI, but I'm struggling.",
      "The options confuse me.",
      "I can't find the time, but the feeling of falling behind keeps growing.",
    ],
    projection:
      "When you finish G and R, you'll have named your obstacles, picked your priority and planned your first AI routine.",
    recommendedLevel: "",
  },

  Uygulamacı: {
    scoreRange: [60, 92],
    summary:
      "{firstName}, you have serious awareness around AI and you clearly see the obstacles. Lack of time, not being able to pick the right tool, the feeling of falling behind — these both motivate and stall you. With a roadmap tailored to you, you'll clear these obstacles one by one.",
    painIdentification: [
      "The obstacles are clear — but I can't find the solution.",
      "I have the motivation, but the right direction is missing.",
      "I don't want to waste time trying it all on my own.",
    ],
    projection:
      "In the O stage you'll learn to plug AI into a real workflow — and measure the time it saves from your own calendar.",
    recommendedLevel: "",
  },

  "Dönüşüm Adayı": {
    scoreRange: [93, 999],
    summary:
      "{firstName}, you're at the highest level of awareness and urgency around AI. You see the obstacles clearly, you feel that you're falling behind, you're aware that you're missing opportunities, and you're fully ready for change. Now the only thing you need is the right structure and guidance.",
    painIdentification: [
      "Every day that passes, I fall further behind.",
      "I know what to do but I can't do it — guidance is essential.",
      "I'm out of time to keep putting it off.",
    ],
    projection:
      "By the end you'll have your own plan that puts AI at the center of your workflow, and a Field Sheet tracking your own numbers.",
    recommendedLevel: "",
  },
};

/* -------------------------------------------------------------------------- */
/*  3. INDUSTRY PAIN VARIANTS — REMOVED                                       */
/*  Decision: 2026-04-08 — universal-questions approach adopted.             */
/*  Industry selection is kept for GHL segmentation; quiz questions universal.*/
/* -------------------------------------------------------------------------- */


/* -------------------------------------------------------------------------- */
/*  4. LOADING STEPS — 3 screens × 3 steps                                    */
/* -------------------------------------------------------------------------- */

export const LOADING_STEPS: Record<number, string[]> = {
  // Screen 29 — First analysis: processing the 14 pain questions
  29: [
    "Analyzing your 14 answers in depth...",
    "Preparing benchmarks...",
    "Building your persona profile...",
  ],

  // Screen 31 — Curriculum generation: turning it into a personal plan
  31: [
    "Identifying the AI tools that fit you...",
    "Optimizing your 4-week personal plan...",
    "Preparing recommendations tailored to you...",
  ],

  // Screen 33 — Final: report and offer preparation
  33: [
    "Compiling your personal report...",
    "Building your 30-day roadmap...",
    "Preparing your special offer...",
  ],
};

/* -------------------------------------------------------------------------- */
/*  5. PAYWALL COPY — 10 blocks                                               */
/* -------------------------------------------------------------------------- */

export const PAYWALL_COPY = {

  // Block 1 — Countdown
  // NOTE: durationMinutes: 60 — matches the GHL coupon expiry window.
  countdown: {
    headline: "Your special discount is about to expire",
    sublabel: "This discount is a personalized offer and is valid only for this session.",
    durationMinutes: 60,
  },

  // Block 2 — Hero Promise
  // {firstName} and {persona} are replaced at runtime
  heroPromise: {
    text: "your results place you in the {persona} profile. Follow this plan for 4 weeks and you'll see your repetitive work clearly, pick your priority and start building your first AI workflow in your own business. Not a course you just watch: every stage leaves you with something from your own work.",
  },

  // Block 3 — Before / After
  beforeAfter: {
    beforeTitle: "RIGHT NOW",
    before: [
      "You do the same work manually, over and over",
      "You don't know which AI tool to use",
      "You feel like you're falling behind your competitors",
      "Your time goes to keeping up with time, not to the work itself",
      "There's no system — you start from scratch every day",
    ],
    afterTitle: "WHAT YOU'LL HAVE AFTER 4 WEEKS",
    after: [
      "Your AI Maturity Profile and Opportunity Map — you know where to start",
      "Your Roadmap File — identity, offer, customer journey and pricing, in writing",
      "A brain file that makes AI work like you",
      "Your Field Sheet — one page tracking your own numbers",
      "A clear order — you know where you're going each day",
    ],
  },

  // Block 4 — Stats
  // NOTE: These figures are from the beta launch phase. They'll be replaced with
  // real data once the first cohort is complete. Soft language used for now.
  stats: [
    {
      label: "Structured program",
      value: "5 stages · G-R-O-W-T",
    },
    {
      label: "Daily investment",
      value: "15-45 minutes",
    },
    {
      label: "Program duration",
      value: "4 weeks of access",
    },
  ],

  // Block 5 — Media Features
  // NOTE: Coming-soon strategy until real media placements arrive.
  mediaFeatures: {
    note: "This section will be updated as we appear in the media. For now we're telling the story of the program ourselves — industry media coming soon.",
    comingSoon: true,
  },

  // Block 6 — Pricing
  pricing: {
    headline: "Special discounted price",
    base: 9999,
    features: [
      "Access to all 5 GROWT stages (G + R + O + W + T), unlocking as you progress",
      "Starter module + Start Here + hands-on lessons in every stage",
      "Ready-to-adapt prompts and working files for your profession",
      "Community: Q&A with people on the same path",
      // {SUPPORT} awaiting CEO decision. A = this list. B = add "WhatsApp support line (for 28 days)" here.
      "28 days of access to the full program",
    ],
  },

  // Block 7 — Testimonials
  // NOTE: coming_soon strategy until the first real customer feedback is collected.
  testimonials: {
    strategy: "coming_soon" as const,
    comingSoonText:
      "The program is just starting. We'll share our first participants' experiences here, with their permission.",
  },

  // Block 8 — FAQ
  faq: [
    {
      q: "How long does the program last?",
      a: "You have 28 days of access. With 15-45 minutes a day you'll complete all five stages: week one the starter module, Start Here and G; week two R; week three O; week four W and T. Stages unlock as you progress.",
    },
    {
      q: "How much time do I need to set aside per day?",
      a: "15-45 minutes is enough. We kept this in mind while designing the program — it's optimized for busy professionals. Even 15 minutes makes progress if you're consistent.",
    },
    {
      q: "What format is the content — video or text?",
      a: "Mostly video walkthroughs, supported by hands-on tasks and guide documents. Suitable for people who learn by watching as well as by reading.",
    },
    {
      q: "Will it be specific to my industry?",
      a: "The GROWT Method applies to all industries. Within the program, examples and ready-made prompts are provided based on your profession — not general theory, but practical steps you'll apply to your own work.",
    },
    {
      q: "I don't have technical knowledge, can I do this?",
      a: "Yes. No technical background needed — not a single line of code. The test in the G stage shows you where to start. All you need is the will to begin.",
    },
    {
      // LEGAL NOTE: This answer is written with the UK Consumer Rights Act's
      // digital content exception in mind. LEGAL REVIEW IS MANDATORY before going live.
      // UK CRA 2015 Section 42 — for digital content, refund rights are limited once
      // the consumer has been granted access. This text is based on the condition that
      // "access has not yet begun." Vague or broad refund promises have been avoided.
      q: "What is the refund policy?",
      a: "If you can't access the platform after joining the program, or if a technical issue means you can't reach the content at all, get in touch with us within 14 days — we'll review your situation. For digital content products, our general refund policy is determined within the framework of UK consumer protection law. See our refund policy page for details.",
    },
    {
      q: "What happens when the 4 weeks are over?",
      // {COMMUNITY-AFTER} awaiting CEO decision; added after the first sentence: A "Your access to the community ends too." · B "You can keep taking part in the community."
      a: "Your access to the lessons ends. The working files you created (Opportunity Map, Roadmap File, brain file, Field Sheet) stay with you. If you want to keep going, you can move to the Full Package: 3 more months in the program, your own growtify.app account, and our support while you build your system.",
    },
  ],

  // Block 9 — Guarantee
  // LEGAL NOTE: This text is prepared under the UK Consumer Rights Act 2015 digital
  // content exception. It contains no "blanket refund" promise.
  // LEGAL REVIEW IS MANDATORY before going live.
  guarantee: {
    headline: "You're covered",
    // {SUPPORT} awaiting CEO decision. A = this text. B = last sentence becomes "When you get stuck, message us on the WhatsApp support line."
    text: "Once your payment goes through, your access opens: 28 days of lessons, working files and the community. When you get stuck, ask in the community and we'll work it out together.",
    legalNote:
      "// LEGAL REVIEW REQUIRED — UK Consumer Rights Act 2015 Section 42. Sign-off must be obtained before going live.",
  },

  // Discount disclaimer — shown in the paywall footer
  discountDisclaimer:
    "This discount is a personalized offer based on your AI Digital Maturity Test results. The discount rate offered may vary from one user to another. It is valid via a single-use coupon code, is non-transferable, and cannot be combined with other promotions. Growtify reserves the right to change discount rates without prior notice.",

  // Block 10 — Final CTA
  finalCta: {
    label: "Join the Program",
    // The price is calculated at runtime with the discount applied
  },
};

/* -------------------------------------------------------------------------- */
/*  6. PRIVACY & LEGAL                                                        */
/* -------------------------------------------------------------------------- */

export const LEGAL_TEXTS = {
  // Short data-privacy notice shown under Screen 26 (email capture)
  // Short text shown within Screen 26 — informal "you" address for UI consistency.
  // The full privacy text (kvkkLong) uses a formal tone in a modal/separate page.
  kvkkShort:
    "Your personal data is processed by Growtify AI under applicable data protection law and is not shared with third parties. See our privacy policy for details.",

  // WhatsApp opt-in (SEPARATE + OPTIONAL — marketing consent can't be a service condition)
  whatsappOptin:
    "I'd like to receive my personalized recommendations and a free community invite via WhatsApp. (You can opt out anytime.)",

  // Data privacy notice — full version (for a modal or separate page)
  kvkkLong:
    "At Growtify AI (Growtify Ltd, United Kingdom), the name and email information we collect during the test is processed under applicable data protection law for the purposes of delivering your personalized report and recommendations, program-related communications, and improving service quality. Your data may be transferred abroad (it is hosted on UK servers). You can submit requests to withdraw your consent, access, correct, or delete your data to info@growtify.app. For full information about our data processing activities, please review our privacy policy.",

  termsLink: "/hukuki/kullanim-kosullari",
  privacyLink: "/hukuki/gizlilik",
  refundLink: "/hukuki/iade-politikasi",
};
