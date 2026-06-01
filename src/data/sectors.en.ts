import { SECTOR_PAGES, type SectorPage } from "./sectors";
import SEKTOR_EN_VALUES from "./sektor-en-values.json";

// Creative-authored EN scenario before/after values (audit fix package — authoritative).
const EN_VALUES = SEKTOR_EN_VALUES as Record<
  string,
  { category_label?: string; tag_label?: string; before_after?: { label: string; before: string; after: string }[] }
>;

// EN translations (translatable fields only); non-translatable fields (slug, icon,
// relatedBlogSlugs) inherited from the TR source by index-merge.
type EnOverride = {
  title: string; fullTitle: string; h1: string; seoTitle: string;
  seoDescription: string; heroSubtitle: string; growtContext: string;
  problems: { title: string; description: string }[];
  scenarios: { title: string; description: string }[];
};

// Translate short Turkish time/label tokens (scenario before/after) to EN.
function tl(s: string): string {
  return s
    .replace(/Haftada\s*(\d+)\s*saat/g, "$1 hrs/week")
    .replace(/G\u00fcnde\s*(\d+)\s*saat/g, "$1 hrs/day")
    .replace(/(\d+)\s*saat/g, "$1 hours")
    .replace(/(\d+)\s*dakika/g, "$1 minutes")
    .replace(/(\d+)\s*dk\b/g, "$1 min")
    .replace(/\/dan\u0131\u015fan/g, "/client")
    .replace(/\/hasta/g, "/patient")
    .replace(/\/dosya/g, "/case")
    .replace(/Otomatik/g, "Automatic")
    .replace(/Ki\u015fisel/g, "Personalized")
    .replace(/An\u0131nda/g, "Instant");
}

const EN: Record<string, EnOverride> = {
  "saglik": {
    "title": "Healthcare",
    "fullTitle": "Healthcare Professionals",
    "h1": "AI for Healthcare Professionals: Dietitians, Psychologists, Physiotherapists",
    "seoTitle": "AI for Healthcare Professionals",
    "seoDescription": "Dietitian, psychologist, physiotherapist — grow your practice with AI. From client acquisition to follow-up, transform across 5 levels with the GROWT Method.",
    "heroSubtitle": "From client acquisition to follow-up, from content creation to setting up automations — grow your practice with AI.",
    "growtContext": "For healthcare professionals, the GROWT Method covers the entire journey — from client acquisition to practice automation. In Gap Analysis, we explore your practice's AI opportunities together; in Transform, we guide you to build full automation step by step, so you're the one running it.",
    "problems": [
      {
        "title": "Client plans take hours",
        "description": "Preparing a tailored nutrition or treatment plan for each client eats up 3-4 hours of your day. That's time stolen from taking on new clients."
      },
      {
        "title": "No time to create content",
        "description": "You know you should post regularly on Instagram, but you can never find the time. Your profile sits dead and new clients aren't coming in."
      },
      {
        "title": "No follow-up system",
        "description": "Clients come and go — no follow-up email, no reminders, no satisfaction check. A cycle of clients who never stay loyal."
      }
    ],
    "scenarios": [
      {
        "title": "Client Onboarding System",
        "description": "Your client fills out a form → AI drafts a plan, a shopping list, follow-up messages, and a scheduled appointment. You review and approve. We show you how to build it yourself."
      },
      {
        "title": "Weekly Content System",
        "description": "Every week, AI drafts 5 Instagram posts, 2 stories, 1 blog outline, and informational messages for your clients. We teach you to run it yourself."
      },
      {
        "title": "Automated Post-Appointment Follow-Up",
        "description": "After a session ends, AI summarizes your notes, sends a follow-up message, preps the next session, and shares a motivational note. We guide you to set up the workflow."
      }
    ]
  },
  "hukuk": {
    "title": "Law",
    "fullTitle": "Legal Professionals",
    "h1": "AI for Lawyers: From Case-Law Research to Practice Automation",
    "seoTitle": "AI Tools and Guide for Lawyers",
    "seoDescription": "Lawyers, notaries, mediators — multiply your practice capacity with AI. From case-law research to client acquisition.",
    "heroSubtitle": "From case-law research to client acquisition, from drafting pleadings to client management — multiply your practice capacity with AI.",
    "growtContext": "For legal professionals, the GROWT Method covers the entire journey from research efficiency to client acquisition.",
    "problems": [
      {
        "title": "Research takes hours",
        "description": "Case-law research, legislation review, precedent decisions — you spend hours on every matter."
      },
      {
        "title": "Client communication is scattered",
        "description": "Email, phone, messages — client follow-up has no system. Lost information and delayed replies erode trust."
      },
      {
        "title": "Finding new clients is hard",
        "description": "Your digital presence is weak, and new clients only come through referrals. Competitors are getting ahead of you online."
      }
    ],
    "scenarios": [
      {
        "title": "Case-Law Research Assistant",
        "description": "You enter the matter details → AI surfaces relevant rulings, legislation, and precedents. You do the filtering."
      },
      {
        "title": "Pleading Draft System",
        "description": "You enter the case summary → AI prepares a pleading draft, a list of supporting documents, and key defense points."
      },
      {
        "title": "Client Communication Automation",
        "description": "Hearing reminders, case updates, document requests — AI automates your client communication."
      }
    ]
  },
  "guzellik": {
    "title": "Beauty",
    "fullTitle": "Beauty Professionals",
    "h1": "AI for Hair Salons and Beauty Studios",
    "seoTitle": "AI for Hair Salons and Beauty Studios",
    "seoDescription": "Hairstylists, estheticians, beauty specialists — grow your salon with AI. From bookings to loyalty, from Instagram to revenue.",
    "heroSubtitle": "From bookings to loyalty, from Instagram content to client follow-ups — grow your salon with AI.",
    "growtContext": "For the beauty industry, the GROWT Method covers the entire client journey — from Instagram to bookings, and from bookings to loyalty.",
    "problems": [
      {
        "title": "Managing Instagram eats your time",
        "description": "Creating posts every day, sharing stories, replying to comments — hours disappear, and none of it is systematic."
      },
      {
        "title": "Booking tracking is a mess",
        "description": "Phone, DMs, WhatsApp — your bookings are scattered. Cancellations, no-shows, and double-bookings keep happening."
      },
      {
        "title": "Clients don't come back",
        "description": "You get the first appointment, but there's no follow-up. Reminders, promotions, loyalty programs — none of it is systematic."
      }
    ],
    "scenarios": [
      {
        "title": "30-Day Content Plan",
        "description": "AI maps out a 30-day Instagram plan — image direction, captions, hashtags, and story ideas. You learn to make the final call."
      },
      {
        "title": "Booking Automation",
        "description": "A client books online → AI handles the confirmation, reminder, and post-visit follow-up. You stay focused on your work."
      },
      {
        "title": "Client Loyalty System",
        "description": "AI sends birthday messages, promotion announcements, and win-back messages. Your clients keep coming back."
      }
    ]
  },
  "emlak": {
    "title": "Real Estate",
    "fullTitle": "Real Estate Professionals",
    "h1": "AI for Real Estate Agents: From Listing Copy to Client Follow-Up",
    "seoTitle": "AI Tools and Guide for Real Estate Agents",
    "seoDescription": "Real estate agent — learn to grow your portfolio with AI. From writing listings to matching clients.",
    "heroSubtitle": "From writing listings to matching clients, from market analysis to portfolio management — learn how to grow your portfolio with AI.",
    "growtContext": "For the real estate sector, the GROWT Method covers the entire journey — from listing efficiency to growing your portfolio.",
    "problems": [
      {
        "title": "Writing listings eats up your time",
        "description": "Preparing a professional listing for every property takes hours. Managing 50 listings becomes impossible."
      },
      {
        "title": "Finding the right buyer is hard",
        "description": "Matching properties to clients is manual and inefficient. Wrong showings waste your time."
      },
      {
        "title": "Your follow-up system falls short",
        "description": "Potential buyers slip away, no one circles back, and opportunities are missed."
      }
    ],
    "scenarios": [
      {
        "title": "Automated Listing Copy",
        "description": "You enter the property details → you learn to use AI to produce SEO-friendly, professional listing copy plus headline alternatives."
      },
      {
        "title": "Client–Property Matching",
        "description": "We show you how to use AI to analyze client preferences and surface the best-fit properties, so your showings convert better."
      },
      {
        "title": "Lead Follow-Up Automation",
        "description": "Learn to set up automatic follow-up messages, new-listing alerts, and appointment reminders for potential buyers."
      }
    ]
  },
  "e-ticaret": {
    "title": "E-Commerce",
    "fullTitle": "E-Commerce Sellers",
    "h1": "AI for E-Commerce: From Product Descriptions to Sales Automation",
    "seoTitle": "AI Tools and Automation for E-Commerce",
    "seoDescription": "E-commerce seller — grow your store with AI. From product descriptions to sales automation.",
    "heroSubtitle": "From product pages to sales automation, from customer service to ad optimization — learn how to grow your store with AI.",
    "growtContext": "For e-commerce, the GROWT Method covers the entire journey — from product page optimization all the way to sales automation.",
    "problems": [
      {
        "title": "Product descriptions eat up your time",
        "description": "Writing SEO-friendly descriptions for hundreds of products takes weeks."
      },
      {
        "title": "Customer service falls short",
        "description": "The same questions come in over and over. Response times drag on and customers walk away."
      },
      {
        "title": "Ad budget is inefficient",
        "description": "Ad spend is high but conversions stay low. Optimization is manual and never enough."
      }
    ],
    "scenarios": [
      {
        "title": "Bulk Product Descriptions",
        "description": "You provide the product list → AI generates SEO-friendly descriptions, titles, and keywords."
      },
      {
        "title": "Automated Customer Replies",
        "description": "AI answers frequently asked questions automatically and routes complex issues to you."
      },
      {
        "title": "Ad Copy Optimization",
        "description": "AI produces A/B test copy, audience suggestions, and performance analysis."
      }
    ]
  },
  "dis-hekimligi": {
    "title": "Dentistry",
    "fullTitle": "Dentists",
    "h1": "AI for Dentists: From the Clinic to Dental Tourism",
    "seoTitle": "AI and Digital Marketing for Dentists",
    "seoDescription": "Dentist — grow your clinic with AI. From patient communication to dental tourism.",
    "heroSubtitle": "From patient communication to dental tourism, from treatment planning to reputation management — grow your clinic with AI.",
    "growtContext": "For dentistry, the GROWT Method covers the entire journey — from winning patients to dental tourism.",
    "problems": [
      {
        "title": "Winning new patients is hard",
        "description": "You don't show up on Google and your social media is empty. New patients only come through referrals."
      },
      {
        "title": "The dental tourism opportunity is slipping away",
        "description": "International patients are searching, but you have no multilingual website and your communication is weak."
      },
      {
        "title": "Patient communication is scattered",
        "description": "Appointment reminders, treatment updates, follow-up calls — none of it is systematic."
      }
    ],
    "scenarios": [
      {
        "title": "Multilingual Website + SEO",
        "description": "Use AI to create website content in 5 languages for your clinic and optimize your Google profile."
      },
      {
        "title": "Patient Communication Automation",
        "description": "Pre-appointment reminders, post-treatment follow-ups, recall calls — all handled automatically."
      },
      {
        "title": "Treatment Plan Assistant",
        "description": "Use AI to draft a treatment plan from patient details, calculate costs, and prepare a visual presentation."
      }
    ]
  },
  "muhasebe": {
    "title": "Accounting",
    "fullTitle": "Accountants & Tax Advisors",
    "h1": "AI for Accountants: From Paperwork to Advisory",
    "seoTitle": "AI for Accountants & Tax Advisors",
    "seoDescription": "Accountant or tax advisor? Learn how AI grows your firm's value — from document processing to high-value advisory.",
    "heroSubtitle": "From document processing to client advisory, from regulatory tracking to reporting — learn how AI grows your firm's value.",
    "growtContext": "For the accounting profession, the GROWT Method covers the shift from document automation to strategic advisory.",
    "problems": [
      {
        "title": "Month-end close is a nightmare",
        "description": "Collecting documents, matching, reviewing — three days of overtime every month-end."
      },
      {
        "title": "Regulations are hard to track",
        "description": "Keeping up with constantly changing rules is impossible. You can't get clients the information they need on time."
      },
      {
        "title": "No time left for advisory",
        "description": "Repetitive work eats up your time. You can't offer clients the strategic advice they need."
      }
    ],
    "scenarios": [
      {
        "title": "Document Processing Automation",
        "description": "Snap a photo of an invoice or receipt — AI recognizes, classifies, and matches it automatically."
      },
      {
        "title": "Regulatory Tracking Assistant",
        "description": "AI scans daily regulatory changes and prepares tailored alerts for each of your clients."
      },
      {
        "title": "Client Reporting System",
        "description": "AI drafts the monthly financial report, analysis, and recommendations. You review and approve."
      }
    ]
  },
  "eczacilik": {
    "title": "Pharmacy",
    "fullTitle": "Pharmacists",
    "h1": "AI for Pharmacists: From Inventory Management to the Digital Pharmacy",
    "seoTitle": "AI and Digital Transformation for Pharmacists",
    "seoDescription": "Pharmacist — grow your pharmacy with AI. From inventory management to customer loyalty.",
    "heroSubtitle": "From inventory management to customer loyalty, from e-pharmacy operations to local marketing — grow your pharmacy with AI.",
    "growtContext": "For pharmacy, the GROWT Method covers the transformation from inventory optimization to a digital customer experience.",
    "problems": [
      {
        "title": "Inventory forecasts keep missing",
        "description": "You can't reliably forecast demand for over-the-counter products. It's either excess stock or lost sales."
      },
      {
        "title": "E-pharmacy operations are hard",
        "description": "Online sales are growing, but managing the operation single-handedly is impossible."
      },
      {
        "title": "Customer loyalty is low",
        "description": "Customers decide based on price. There's no differentiation and no loyalty program."
      }
    ],
    "scenarios": [
      {
        "title": "Demand Forecasting System",
        "description": "We show you how to use AI to forecast demand from past sales data and surface order recommendations."
      },
      {
        "title": "Customer Health Updates",
        "description": "Drug interactions, seasonal health tips — we teach you to use AI to send personalized updates to your customers."
      },
      {
        "title": "Campaign Planning",
        "description": "We walk you through using AI to generate seasonal campaign ideas, choose target audiences, and draft your messaging."
      }
    ]
  },
  "turizm": {
    "title": "Tourism",
    "fullTitle": "Tourism Professionals",
    "h1": "AI for the Tourism Industry: From Agency to Digital Experience",
    "seoTitle": "AI for Tourism and Travel Agencies",
    "seoDescription": "Travel agent, tour guide — grow your agency with AI. From bookings to personalized experiences.",
    "heroSubtitle": "From bookings to personalized tour experiences, from multilingual communication to customer management — learn how to grow your agency with AI.",
    "growtContext": "For the tourism industry, the GROWT Method spans the transformation from digital customer experience to operational efficiency.",
    "problems": [
      {
        "title": "You can't offer 24/7 service",
        "description": "Tourists reach out from different time zones. You lose business outside business hours."
      },
      {
        "title": "The language barrier",
        "description": "Communicating with foreign tourists is hard. You can't offer multilingual service."
      },
      {
        "title": "Personalization falls short",
        "description": "You offer everyone the same tour package. You can't make personal recommendations."
      }
    ],
    "scenarios": [
      {
        "title": "Multilingual Chatbot",
        "description": "AI responds to tourists 24/7 in 5+ languages — FAQs, tour details, bookings. We show you how to set it up."
      },
      {
        "title": "Personalized Tour Recommendations",
        "description": "Based on a tourist's preferences, AI suggests a personalized tour plan plus restaurant and activity picks. We teach you how."
      },
      {
        "title": "Season Analysis + Pricing",
        "description": "We guide you to use AI for season forecasting based on past data, plus dynamic pricing recommendations."
      }
    ]
  },
  "mimarlik": {
    "title": "Architecture",
    "fullTitle": "Architecture Professionals",
    "h1": "AI for Architects: From Rendering to Project Management",
    "seoTitle": "AI Tools and Guide for Architects",
    "seoDescription": "Architect, interior designer — grow your firm with AI. From concept to client presentation.",
    "heroSubtitle": "From concept to client presentation, from rendering to project management — grow your firm with AI.",
    "growtContext": "For the architecture sector, the GROWT Method covers the shift from design efficiency to client management.",
    "problems": [
      {
        "title": "Long render wait times",
        "description": "You wait 2 days for a single concept render. You can't present quickly to clients."
      },
      {
        "title": "Client expectations are hard to manage",
        "description": "The client can't articulate what they have in mind, and you misread it. Then comes the revision cycle."
      },
      {
        "title": "Project management is chaotic",
        "description": "Multiple projects, different clients — and no tracking system in place."
      }
    ],
    "scenarios": [
      {
        "title": "Fast Concept Rendering",
        "description": "You enter the brief and AI produces 3 different concept renders in 2 minutes. You show them to the client in the very first meeting."
      },
      {
        "title": "Client Brief Assistant",
        "description": "AI runs a structured brief conversation with your client. The result is a clear, measurable brief."
      },
      {
        "title": "Project Tracking System",
        "description": "AI helps you manage project status, deadlines, and client communication — all from one place."
      }
    ]
  },
  "egitim": {
    "title": "Education",
    "fullTitle": "Education Professionals",
    "h1": "An AI Guide for Educators and Online Coaches",
    "seoTitle": "AI for Educators and Online Coaches",
    "seoDescription": "Teacher, learning consultant, online coach — grow your program with AI.",
    "heroSubtitle": "From creating materials to tracking participants, from program design to assessment — grow your program with AI.",
    "growtContext": "For the education sector, the GROWT Method covers the transformation from content creation to program scaling.",
    "problems": [
      {
        "title": "Preparing materials takes too long",
        "description": "Building tailored materials for every participant takes days."
      },
      {
        "title": "Participant tracking falls short",
        "description": "Who has progressed how far, who is struggling — there's no tracking system."
      },
      {
        "title": "Your program doesn't scale",
        "description": "You work one-on-one, so you can't take on more participants."
      }
    ],
    "scenarios": [
      {
        "title": "Personalized Materials",
        "description": "Based on each participant's profile, AI helps you produce customized materials, exercises, and quizzes."
      },
      {
        "title": "Automated Progress Tracking",
        "description": "AI analyzes participant performance and reports back to you. Those who struggle get support automatically."
      },
      {
        "title": "Program Replication",
        "description": "AI helps you adapt your program to different levels and industries. One program becomes five variants."
      }
    ]
  },
  "fitness": {
    "title": "Fitness",
    "fullTitle": "Fitness Professionals",
    "h1": "AI for Personal Trainers: From Programming to Online Coaching",
    "seoTitle": "AI for Personal Trainers and Fitness Coaches",
    "seoDescription": "Personal trainer or pilates instructor? Learn how to grow your studio with AI — from program design to client tracking.",
    "heroSubtitle": "From program design to client tracking, from content creation to online coaching — we show you how to grow your studio with AI.",
    "growtContext": "For the fitness sector, the GROWT Method covers the shift from program efficiency to scaling online coaching.",
    "problems": [
      {
        "title": "Writing programs eats your time",
        "description": "Building a custom program for every client takes hours. You can't take on more clients."
      },
      {
        "title": "Client motivation fades",
        "description": "There's no follow-up between sessions, so clients drop off."
      },
      {
        "title": "You can't launch online coaching",
        "description": "You want to expand online, but you have no system in place and no time to build one."
      }
    ],
    "scenarios": [
      {
        "title": "Personal Program Assistant",
        "description": "You enter your client's details, and AI produces a personalized program plus nutrition recommendations."
      },
      {
        "title": "Automated Follow-Up System",
        "description": "AI sends workout reminders, progress congratulations, and motivation messages."
      },
      {
        "title": "Online Coaching Platform",
        "description": "AI helps you prepare training content in your own style, a video plan, and client communication."
      }
    ]
  }
};

export const SECTOR_PAGES_EN: Record<string, SectorPage> = Object.fromEntries(
  Object.entries(SECTOR_PAGES).map(([slug, p]) => {
    const o = EN[slug];
    if (!o) return [slug, p];
    return [
      slug,
      {
        ...p,
        title: o.title,
        fullTitle: o.fullTitle,
        h1: o.h1,
        seoTitle: o.seoTitle,
        seoDescription: o.seoDescription,
        heroSubtitle: o.heroSubtitle,
        growtContext: o.growtContext,
        problems: p.problems.map((pr, i) => ({
          ...pr,
          title: o.problems[i]?.title ?? pr.title,
          description: o.problems[i]?.description ?? pr.description,
        })),
        scenarios: p.scenarios.map((sc, i) => {
          const cv = EN_VALUES[slug]?.before_after?.[i];
          return {
            ...sc,
            title: cv?.label ?? o.scenarios[i]?.title ?? sc.title,
            description: o.scenarios[i]?.description ?? sc.description,
            beforeTime: cv?.before ?? tl(sc.beforeTime),
            afterTime: cv?.after ?? tl(sc.afterTime),
          };
        }),
      } as SectorPage,
    ];
  })
);

// ── EN sector-slug taxonomy (CEO 2026-06-01: /en/sektor/{tr} → /en/sectors/{en}) ──
// Sector slugs differ from the guide map (e-ticaret/dis-hekimligi, not eticaret/dis).
export const SECTOR_TR_TO_EN: Record<string, string> = {
  saglik: "healthcare",
  hukuk: "legal",
  guzellik: "beauty",
  emlak: "real-estate",
  "e-ticaret": "ecommerce",
  "dis-hekimligi": "dental",
  muhasebe: "accounting",
  eczacilik: "pharmacy",
  turizm: "tourism",
  mimarlik: "architecture",
  egitim: "education",
  fitness: "fitness",
};
export const SECTOR_EN_TO_TR: Record<string, string> = Object.fromEntries(
  Object.entries(SECTOR_TR_TO_EN).map(([tr, en]) => [en, tr]),
);
