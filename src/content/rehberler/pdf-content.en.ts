/**
 * EN lead-magnet guide PDF content — keyed by ENGLISH slug.
 *
 * EN-native localization of pdf-content.ts (NOT a literal translation):
 * - Prompts rewritten as natural English prompts (users paste them into ChatGPT/Claude in English).
 * - Turkey-specific references (TÜİK, Lexpera/Kazancı, Yargıtay, "Türkiye") adapted to a
 *   global / UK-US English audience (international tools, jurisdiction-neutral wording).
 * - International stat sources (McKinsey, HubSpot, Thomson Reuters, etc.) kept.
 * - "Not legal/medical advice" style disclaimers preserved.
 *
 * Rendered via scripts/generate-pdfs-en.ts → public/rehberler/en/growtify-{en-slug}-guide.pdf
 */
import type { PdfSectorContent } from "./pdf-content";

export const PDF_CONTENT_EN: Record<string, PdfSectorContent> = {
  legal: {
    slug: "legal",
    coverTitle: "AI for Lawyers: 5 Things You Can Do in 10 Minutes",
    coverSubtitle:
      "Case-law research, drafting, and client communication — with AI, demo included",
    sectorIcon: "⚖️",

    intro: {
      forWho:
        "This guide is for solo lawyers, legal consultants, mediators, and small-firm practitioners who spend hours on case-law research, draft every document almost from scratch, and struggle to keep client communication consistent. If you want the efficiency of a large firm without its resources, you're in the right place.",
      whatYouGet: [
        "Case-law research with AI — 3 hours down to 20 minutes (step-by-step demo)",
        "On-demand draft generation — ready document drafts with Claude and ChatGPT prompts",
        "Client communication templates — consistent, professional, time-saving",
        "A 15-prompt copy-paste pack — written specifically for legal practice",
        "5 AI tools compared — which one to reach for, and when, in legal work",
      ],
      painHook:
        "Three hours a day on case-law research, two on drafting — you can win most of that time back. AI doesn't make the legal call; you do. But it compresses a 3-hour task into 20 minutes. More time for clients, less time on overhead.",
    },

    sectorContext: {
      whyAiMatters:
        "For legal practices, AI is a step-change in research efficiency. Scanning precedents, reviewing statutes, assessing contract risk — all of it gets dramatically faster with AI-assisted tools. Large international firms accelerated this shift in 2023; for independent lawyers and small firms, the window of opportunity is still wide open.\n\nAI does not make legal decisions — you do. AI gives you the raw research material, draft text, and a framing to work from. Used within ethical bounds, it lets you spend more time with clients, handle more matters, and grow your practice capacity.",
      stats: [
        {
          value: "23%",
          label:
            "Share of a legal team's total time spent on research and document prep — most of which AI can shorten.",
          source: "Thomson Reuters Legal Technology Survey, 2024",
        },
        {
          value: "4 hrs",
          label:
            "Average time per week lawyers using AI tools save across research and drafting.",
          source: "Clio Legal Trends Report, 2024",
        },
        {
          value: "82%",
          label:
            "Legal clients who expect faster communication from their lawyer — AI templates close that gap.",
          source: "LexisNexis Future Ready Lawyer, 2023",
        },
      ],
      comparison: {
        without: [
          "Hours of manual searching in legal databases for relevant precedents",
          "Finding and re-adapting similar matters from scratch for every draft",
          "Client update emails rewritten from zero every single time",
          "Deadlines, document lists, and matter summaries tracked by hand",
        ],
        with: [
          "You enter the matter and the parties; AI surfaces relevant precedent summaries",
          "You paste the matter brief; AI produces a draft + argument points",
          "Client communication templates come back personalized by AI",
          "Matter summary, deadline calendar, and document list structured in minutes",
        ],
      },
    },

    scenarios: [
      {
        title: "Case-Law Research Assistant",
        problem:
          "A new matter lands. You need to analyze the issue, scan relevant precedents, appellate decisions, and current statutes. That's normally a 2-4 hour job requiring deep focus. When several matters stack up, that time becomes critical.",
        steps: [
          "Paste the matter brief into Claude (parties, issue, core claims)",
          "Use the research prompt below",
          "Take AI's list of precedents and statutes to investigate",
          "Verify the key authorities in your jurisdiction's legal database (Westlaw, LexisNexis, etc.)",
          "Have AI summarize and rank those authorities against your case strategy",
          "Drop the research summary into your matter notes — work from that draft going forward",
        ],
        promptExample: `You are an experienced legal research assistant. Based on the matter below, map out the precedents and statutes to research.

Matter details:
- Area of law: [e.g. employment / commercial / family law, etc.]
- Parties: [claimant and respondent positions]
- Core dispute: [explain]
- Relief sought: [damages / annulment / declaratory / other]
- Special circumstances: [add if any]

Please list:
1. Relevant statutory provisions to research (at least 5)
2. Themes of appellate/supreme-court decisions to look up (by topic, 5-7 themes)
3. Argument framework for the claimant (3 core arguments)
4. Likely defenses for the respondent (3 core defenses)
5. Procedural risks to watch for

Note: this research draft will be verified by the lawyer. Not legal advice — a research guide.`,
        before: "Case-law research: 2-3 hrs, statute review: 1 hr — 3-4 hrs/matter total",
        after: "Research map: 20 minutes, verifying the key authorities: 30-40 minutes",
      },
      {
        title: "Contract Risk Analysis & Redlining",
        problem:
          "A client brings a new contract — the risks need analyzing before signing. Reading clause by clause takes time. Spotting risky clauses, proposing alternative wording, explaining it to the client in plain language — each is its own task.",
        steps: [
          "Paste the contract into Claude (or upload the PDF — Claude Pro supports it)",
          "Use the risk-analysis prompt",
          "Review the risky clauses AI flags",
          "Ask AI for alternative wording for each risk",
          "Have it prepare a plain-language summary for the client",
          "Do your final review, send for signature",
        ],
        promptExample: `Review the contract below from a legal risk-analysis perspective. Client: the buyer / tenant / service-recipient party.

Contract text:
[Paste the contract text here]

Please:
1. List clauses that could work against the client (clause number and a short note)
2. Propose a balanced, alternative wording for each risky clause
3. Flag any important protective clauses you think are missing
4. Assess the contract's overall risk profile (Low / Medium / High)
5. Write a 5-point plain-language summary for the client (no jargon)

Note: this analysis will be reviewed by the lawyer. Not legal advice — a preliminary draft.`,
        before: "Manual reading and analysis: 2-3 hrs, client summary: 30-45 minutes",
        after: "AI pre-analysis: 15-20 minutes, lawyer review and redline: 30-40 minutes",
      },
      {
        title: "Client Communication Automation",
        problem:
          "A hearing date is set and the client needs to know. You want to send a status update. You need to prepare a document checklist. Writing each from scratch eats time and produces inconsistent results — the same information explained differently to different clients.",
        steps: [
          "Gather the client and matter details",
          "Use the communication prompt below",
          "Copy AI's output, personalize it",
          "Paste into your email client, send",
          "Save the templates you use often — next time will be faster",
        ],
        promptExample: `Prepare a client-update package from the details below.

Client name: [Full name]
Matter: [short description]
Latest development: [what happened?]
Hearing/meeting date: [date/time/place]
What the client needs to bring: [document list]
Estimated remaining timeline: [info]

Please produce:
1. An update email (professional, warm, clear — minimal jargon)
2. A hearing-prep checklist (for the client, step by step)
3. A WhatsApp reminder message (for 2 days before the hearing, short)
4. A document list (itemized, with a short note on why each is needed)

All text in English, professional but accessible.`,
        before: "15-20 minutes per client message, inconsistency across matters",
        after: "Template generation: 5-10 minutes, personalization: 5 minutes — standard and fast",
      },
    ],

    tools: [
      {
        name: "Claude (claude.ai)",
        description:
          "The most capable AI assistant for long-document analysis, contract review, and professional correspondence — with PDF upload support.",
        free: true,
        link: "https://claude.ai",
        bestFor: "Contract analysis, document drafts, client letters",
      },
      {
        name: "ChatGPT (chatgpt.com)",
        description:
          "A strong complement for research mapping, argument framing, and alternative legal approaches.",
        free: true,
        link: "https://chatgpt.com",
        bestFor: "Research mapping, argument development, FAQ prep",
      },
      {
        name: "Notion AI (notion.so)",
        description:
          "AI-assisted note-taking and knowledge management for matter notes, hearing prep, and document organization.",
        free: false,
        link: "https://www.notion.so",
        bestFor: "Matter tracking, research notes, client portfolio management",
      },
      {
        name: "Calendly (calendly.com)",
        description:
          "Online scheduling that automates client consultation bookings and sends reminder emails.",
        free: true,
        link: "https://calendly.com",
        bestFor: "Client booking automation, first-consultation coordination",
      },
      {
        name: "Westlaw / LexisNexis",
        description:
          "Your jurisdiction's case-law and statute databases — verify every AI research output against these primary sources.",
        free: false,
        link: "https://www.lexisnexis.com",
        bestFor: "Precedent verification, statute tracking, current decision research",
      },
    ],

    prompts: [
      {
        title: "Case-Law Research Map",
        prompt: `Map out the precedents and statutes to research for this matter. Area of law: [area]. Core dispute: [issue]. I want: statutory provisions to research (at least 5), appellate decision themes (5-7 topics), an argument framework for both sides. Note: a preliminary draft to be verified by the lawyer.`,
        expectedOutput: "A structured research map, statute list, and theme list",
      },
      {
        title: "Document Draft",
        prompt: `Draft a [document type] from the details below. Claimant: [info]. Respondent: [info]. Relief sought: [relief]. Core arguments: [arguments]. Evidence to attach: [list]. Use formal language appropriate to my jurisdiction. Final review is the lawyer's.`,
        expectedOutput: "A draft in standard document format",
      },
      {
        title: "Contract Risk Analysis",
        prompt: `Review this contract for risks against my client: [text]. List risky clauses, propose alternative wording for each, give an overall risk profile (Low/Medium/High), and write a 5-point plain-language summary for the client.`,
        expectedOutput: "Risky-clause list, alternative wordings, client summary",
      },
      {
        title: "Client Update Email",
        prompt: `Write a client update email to [Name] about their matter. Matter: [subject]. Latest development: [development]. Next step: [step]. Date: [date]. Tone: professional, clear, warm. Minimal jargon. In English.`,
        expectedOutput: "A ready-to-send client update email",
      },
      {
        title: "Hearing Prep Notes",
        prompt: `Prepare a hearing-prep summary for a [matter type]. Matter summary: [summary]. Strategy: [strategy]. Expected counter-arguments: [list]. Please give: core arguments (itemized), ready answers to likely questions, the order to present evidence, and a timing suggestion.`,
        expectedOutput: "A structured hearing-prep note",
      },
      {
        title: "Statute Summary",
        prompt: `Write a short, clear summary of [statute name / section number]. Include: the gist (2-3 sentences), who it affects, what it means in practice, and any recent updates or changes (if you know them). Plain language a client could read.`,
        expectedOutput: "A client-readable statute summary",
      },
      {
        title: "Legal Risk Report",
        prompt: `Write a short legal risk report for [client name] on [subject]. Include: current-situation assessment, legal risks (high/medium/low), recommended measures, and time-sensitive items. One page, itemized.`,
        expectedOutput: "A one-page legal risk summary report",
      },
      {
        title: "Client FAQ Document",
        prompt: `Prepare the 10 most common client questions and answers about [matter type]. Tone: clear, calm, reassuring. Explain any technical terms in parentheses. I'll put this on my website or send it to clients.`,
        expectedOutput: "A 10-question client FAQ, ready for website or email",
      },
      {
        title: "Matter Summary Note",
        prompt: `Build a structured matter-summary note from these raw details: [details]. The summary should include: parties and their relationship, the core dispute, what's been done so far, pending steps, and critical dates/deadlines. Short and clear.`,
        expectedOutput: "A structured matter-summary note, ready for the file",
      },
      {
        title: "Engagement Scope Letter",
        prompt: `Write a formal engagement / scope letter to [Name] about [subject]. The letter should include: a summary of the matter, its legal posture, the proposed action plan, the client's responsibilities, and my contact details. Formal format, in English, starting with "Dear [Name]".`,
        expectedOutput: "A formal client engagement letter",
      },
      {
        title: "Hearing Reminder",
        prompt: `Write a hearing reminder for client [Name]. Date: [date]. Time: [time]. Court/place: [place]. What to bring: [list]. For WhatsApp: short, clear, friendly but professional. Max 100 words.`,
        expectedOutput: "A WhatsApp-ready hearing reminder",
      },
      {
        title: "Authority / Mandate Scope Check",
        prompt: `Review the engagement / authority text below and assess: is the scope sufficient?, are any powers missing?, are there limits for special situations?, are additional authority clauses needed? [Authority text: text]`,
        expectedOutput: "A scope assessment and missing-authority list",
      },
      {
        title: "Deadline Tracker Summary",
        prompt: `List the critical limitation periods and deadlines for a [matter type]. For each: how long it runs, how the start date is calculated, and any exceptions. Practical reminder: these must be verified against the statute by the lawyer.`,
        expectedOutput: "A critical-deadline list with a calculation guide",
      },
      {
        title: "Demand Letter Draft",
        prompt: `Draft a demand letter for this situation. Sender: [info]. Recipient: [info]. Subject of demand: [subject]. What's demanded: [demand]. Deadline: [days]. Use formal legal language in English. A draft for lawyer approval.`,
        expectedOutput: "A formal demand-letter draft",
      },
      {
        title: "Settlement Prep Summary",
        prompt: `Prepare a summary for a settlement negotiation. Matter: [info]. Client position: [position]. Likely counter-offer: [estimate]. Please give: acceptable minimum terms, a negotiation framework, the upsides and risks of settling, and next steps if rejected.`,
        expectedOutput: "A settlement-negotiation strategy summary",
      },
      {
        title: "Client Information Letter",
        prompt: `Write a formal information letter to [Name] about [subject]. Include: a summary of the issue, its legal status, the recommended action plan, the client's responsibilities, and my contact information. Formal format, starting with "Dear [Name]".`,
        expectedOutput: "A formal client information letter",
      },
    ],

    checklist: [
      {
        day: 1,
        task: "Sign up for Claude.ai. Test the research-map prompt (Prompt 1) on an active matter. Verify the output in your legal database.",
        tool: "Claude.ai + Westlaw/LexisNexis",
        duration: "60 minutes",
      },
      {
        day: 2,
        task: "Generate a draft for one of your common document types with Prompt 2. Compare it to your own draft — which parts are usable?",
        tool: "Claude.ai",
        duration: "45 minutes",
      },
      {
        day: 3,
        task: "Build a client-communication template library: use Prompt 4 and Prompt 10 to produce 5 templates. Save them in Notion or Word.",
        tool: "Claude.ai + Notion",
        duration: "45 minutes",
      },
      {
        day: 4,
        task: "Open a Calendly account, create a client first-consultation page. Set up the auto-confirmation and reminder email.",
        tool: "Calendly",
        duration: "30 minutes",
      },
      {
        day: 5,
        task: "Test Prompt 3 on an existing contract or document. Compare AI's analysis with your own assessment.",
        tool: "Claude.ai",
        duration: "60 minutes",
      },
      {
        day: 6,
        task: "If you don't have one, generate content for an FAQ page with Prompt 7. Add it to your client waiting area or emails.",
        tool: "Claude.ai",
        duration: "30 minutes",
      },
      {
        day: 7,
        task: "Review the week's results: which prompts saved you the most time? Build and save your own prompt library.",
        tool: "Notion or Word",
        duration: "30 minutes",
      },
    ],

    growtTeaser:
      "Applying what you've seen in this guide is the G stage of the GROWT Method — recognizing your current processes and seeing where AI can make a difference. In the next stage (Roadmap), we plan the AI setup specific to your practice: which processes return the most when automated first, and how to strengthen your digital presence to win new clients. Take the quiz to see your personal plan.",

    ctaHeadline: "Next step: Get the AI Roadmap for Your Practice",
    ctaBody:
      "Every legal practice has different priorities. Where's the fastest win for yours? Which tools should you set up first? To find out, take the free AI Digital Maturity Test at growtify.ai/test. The 5-minute quiz produces a personal roadmap for your firm and your practice.",
  },

  "healthcare": {
    slug: "healthcare",
    coverTitle: "The AI Starter Guide for Dietitians & Health Professionals",
    coverSubtitle: "A practical guide that cuts 15 hours of repetitive weekly work down to 2",
    sectorIcon: "🩺",

    intro: {
      forWho:
        "This guide is for dietitians, psychologists, physiotherapists, and health coaches who lose hours writing client plans, keeping session notes, producing Instagram content, and chasing appointments. If most of your billable energy is going to repetitive admin instead of your clients, you're in the right place.",
      whatYouGet: [
        "5 AI tools — hand-picked for a health practice (Claude, ChatGPT, Calendly, Whisper, Canva AI)",
        "3 practical scenarios — client onboarding, weekly content, and post-appointment follow-up",
        "10 copy-paste prompts — from nutrition plans to Instagram posts, ready to use",
        "A step-by-step checklist for your first 7 days — to start from scratch and see a real result",
        "A tool comparison — which to use when, and what's free vs. paid",
      ],
      painHook:
        "Client intake forms, session notes, Instagram content, appointment reminders — is most of your time going to these? You do the same tasks over and over, every time from scratch. AI takes that repetitive load off your plate, so you can focus on your clients.",
    },

    sectorContext: {
      whyAiMatters:
        "AI adoption among health professionals picked up real momentum in 2024. Building nutrition plans, gathering pre-session information, managing client follow-up — all of it can now be done in minutes with AI. The practitioners who get ahead of this are serving more clients and growing their income at the same time.\n\nFor a health practice, the biggest opportunity is making the client experience both personalized and systematic. AI does that faster and more consistently than doing it by hand. The 15 hours a week you currently lose to repetitive work can go toward winning new clients or raising the quality of the care you already deliver.",
      stats: [
        {
          value: "63%",
          label:
            "Share of a health professional's time spent on administrative work — bureaucracy, not clinical care.",
          source: "McKinsey Global Institute, 2023",
        },
        {
          value: "10 hrs",
          label:
            "Average time saved per week by dietitians and health coaches who actively use AI tools.",
          source: "Growtify AI User Survey, 2024",
        },
        {
          value: "3x",
          label:
            "Instagram engagement lift for health practices using AI — driven by systematic content production.",
          source: "HubSpot Social Media Trends, 2024",
        },
      ],
      comparison: {
        without: [
          "Writing every client's plan from scratch — 1 to 2 hours each",
          "Instagram content thrown together in one panicked weekend session",
          "Appointment reminders sent by hand, and often forgotten",
          "Session notes that add another half hour after the practice is already closed",
        ],
        with: [
          "You enter the client's details; AI drafts the plan in 10 minutes — you approve it",
          "A full month's content calendar ready in one session, with Canva AI generating the visuals",
          "A Calendly + AI message setup that sends reminders automatically",
          "A session-note template that AI summarizes instantly — you just add the critical details",
        ],
      },
    },

    scenarios: [
      {
        title: "Scenario 1: A Client Onboarding System",
        problem:
          "A new client signs on, fills out a form, gets measured — and then you're staring down hours of plan-writing. Every client is different: allergies, activity level, goals all vary. That personalization matters, but it eats your time.",
        steps: [
          "Build a standard intake form for clients to fill out (Google Form or PDF)",
          "Copy the form responses and paste them into Claude",
          "Use your prompt template (there's an example below)",
          "Review the nutrition-plan draft AI produces, then tailor it to how you practice",
          "Save the shopping list and weekly meal table as a PDF",
          "Prepare the first-week check-in message template in the same session",
        ],
        promptExample: `You are an experienced clinical dietitian. Based on the client details below, build a 7-day nutrition plan.

Client details:
- Name: [Full name]
- Age: [Age]
- Sex: [Sex]
- Height/Weight: [Height] / [Weight]
- Goal: [Weight loss / Weight gain / Healthy eating]
- Activity level: [Sedentary / Lightly active / Active / Very active]
- Allergies/Intolerances: [List]
- Foods they dislike: [List]
- Budget: [Low / Medium / High]
- Special notes: [Add if any]

Please build a plan that includes:
1. A daily calorie target and macro split (protein/carbs/fat)
2. A 7-day meal plan (breakfast, snack, lunch, snack, dinner)
3. A weekly shopping list (organized by category)
4. 3 key nutrition rules for the first week
5. Water-intake and sleep recommendations

Use a warm, motivating tone. Note: this is a draft to be reviewed by the dietitian — not medical advice.`,
        before: "Plan-writing: 1.5-2 hrs, shopping list: 30 min — ~2.5 hrs/client total",
        after: "Data entry + review: 15-20 minutes — per client",
      },
      {
        title: "Scenario 2: A Weekly Instagram Content System",
        problem:
          "You know you should post on Instagram consistently. But your weekdays are packed with clients, and there's no time left to create content. So on Sunday you scramble to put together 3 or 4 posts — and they rarely get past the usual motivational quote.",
        steps: [
          "At the start of the month, build a 30-day content calendar with Claude (use the prompt below)",
          "Once the calendar is approved, generate each week's visuals with Canva AI",
          "Upload the visuals to Buffer or Meta Business Suite and schedule them",
          "Spend 30 minutes a week preparing and scheduling that week's 5 posts",
          "For Stories, use a talk-to-camera format — no technical setup required",
        ],
        promptExample: `You are a social media specialist who creates content in the health space. Build a 30-day Instagram content calendar for [specialty: dietitian/psychologist/physiotherapist] for the month of October.

Target audience: [target client profile — e.g. women aged 30-45 looking to lose weight healthily]
Tone: warm, informative, motivating — sounds like a real person, not a clinic
Post mix: 40% educational posts, 30% motivation/story, 20% question/engagement, 10% promotion

For each day, give me:
- Day number and theme
- Post title (max 10 words)
- Caption copy (max 150 words)
- 10 suggested hashtags
- Visual direction (what kind of image to use)

Pick stronger-performing topics for Mondays and Fridays.`,
        before: "6 hours a week — content ideas, writing, visuals, uploading",
        after: "30 minutes a week — calendar ready, just approve and upload",
      },
      {
        title: "Scenario 3: Automated Post-Appointment Follow-Up",
        problem:
          "The session ends, the client leaves. Until the next appointment, you have no idea how they're doing. You'd like to send a follow-up email, but there's no time. You'd like to send a motivation message, but personalizing it takes too long. The result: clients slip through the cracks and don't come back.",
        steps: [
          "Right after the session, record a voice note of your session notes with Whisper (5 minutes)",
          "Transcribe the recording (Whisper does it automatically)",
          "Feed the transcript to Claude and use the prompt below to produce a follow-up package",
          "Review the messages AI generates and add your personal notes",
          "Connect it to your scheduling tool (Calendly) or send it manually via WhatsApp/email",
        ],
        promptExample: `Below are my notes from a session I just ran. Based on them, prepare a follow-up package for the client.

Session notes: [Paste the session summary here]
Client name: [Name]
Session date: [Date]
Next appointment: [Date]

Please produce:
1. A session-summary message (for WhatsApp, warm, 3-4 sentences)
2. 3 practical tips for this week (specific to the client's situation)
3. A next-appointment reminder message (to schedule for 2 days before)
4. A motivation message (to send 3-4 days later — personal and original)
5. 2 prep questions for the next session

Write all messages in a warm, supportive, second-person tone.`,
        before: "20-30 minutes per client — note-taking + email + setting reminders",
        after: "5 min voice note + 10 min AI review — 15 minutes total, partly automated",
      },
    ],

    tools: [
      {
        name: "Claude (claude.ai)",
        description:
          "The most capable AI assistant for long-form writing, client plans, professional correspondence, and summarizing session notes.",
        free: true,
        link: "https://claude.ai",
        bestFor: "Nutrition plans, session summaries, patient communication copy",
      },
      {
        name: "ChatGPT (chatgpt.com)",
        description:
          "A general-purpose AI assistant — use it as an alternative or complement to Claude.",
        free: true,
        link: "https://chatgpt.com",
        bestFor: "Content ideas, blog drafts, alternative approaches",
      },
      {
        name: "Canva AI (canva.com)",
        description:
          "AI-assisted design for Instagram visuals, brochures, and infographics.",
        free: true,
        link: "https://canva.com",
        bestFor: "Instagram posts, practice promo visuals, infographics",
      },
      {
        name: "Calendly (calendly.com)",
        description:
          "Online scheduling — clients book their own appointments and reminders go out automatically.",
        free: true,
        link: "https://calendly.com",
        bestFor: "Appointment automation, reminder messages, calendar sync",
      },
      {
        name: "Whisper (OpenAI)",
        description:
          "AI transcription that turns speech into text instantly — ideal for session notes.",
        free: true,
        link: "https://openai.com/research/whisper",
        bestFor: "Session-note transcripts, quick note-taking, voice-to-content",
      },
    ],

    prompts: [
      {
        title: "1. Personalized Nutrition Plan",
        prompt: `You are an expert clinical dietitian. Build a detailed 7-day nutrition plan from the details below:
- Age/sex: [info]
- Height/weight: [info]
- Goal: [goal]
- Activity: [level]
- Allergies/intolerances: [list]
- Budget: [low/medium/high]

Output: daily calories + macros, a 7-day meal plan, a weekly shopping list, 3 core rules. Warm tone. A draft to be reviewed by the dietitian — not medical advice.`,
        expectedOutput:
          "A daily calorie table, a 7-day meal plan, and a shopping list organized by category",
      },
      {
        title: "2. Patient Intake Form Design",
        prompt: `Build a thorough but concise client intake form for [your specialty]. It should cover: personal details, health history, lifestyle questions, and goals and expectations. Max 15 questions, a mix of multiple-choice and short-answer. Format it for Google Forms.`,
        expectedOutput: "A structured 15-question client form, ready to import into Google Forms",
      },
      {
        title: "3. Post-Session Follow-Up Message",
        prompt: `I had a session today with [Name]. Topic: [topic]. Recommendations: [recommendations]. Based on this, write a warm, supportive WhatsApp follow-up message. 4-5 sentences, personal and friendly. Appointment info: [date/time].`,
        expectedOutput: "A personal follow-up message, ready for WhatsApp",
      },
      {
        title: "4. Instagram Post Copy",
        prompt: `Write an Instagram post about [topic]. Target audience: [target audience]. Tone: informative but warm, made for social media. Caption: a scroll-stopping opening line + 3-4 bullet points of info + a CTA + 10 hashtags. Max 150-word caption.`,
        expectedOutput: "A ready Instagram caption and hashtag list",
      },
      {
        title: "5. Blog Intro / Hook",
        prompt: `Write a 200-word intro paragraph for a blog post about [topic]. Reader profile: [profile]. Goal of the post: to inform and draw clients to my practice. Open with a question, spark curiosity, and hint that a solution exists without giving it away.`,
        expectedOutput: "An SEO-friendly blog intro with a hook that keeps the reader scrolling",
      },
      {
        title: "6. Session Note Summary",
        prompt: `Turn the raw session note below into a professional session-summary format. Note: [raw notes]. The output should include: the main topics discussed, the issues the client raised, the recommendations given, and goals for the next session. Short and structured.`,
        expectedOutput: "A structured session note, in a format suitable for clinical records",
      },
      {
        title: "7. Client Appointment Reminder Email",
        prompt: `Write an appointment-reminder email for [Name] for tomorrow at [time]. My practice: [practice name]. Address/location: [address]. Online/in-person: [info]. Tone: professional but warm. Add one prep tip (this session's topic: [topic]).`,
        expectedOutput: "A ready-to-send appointment reminder email",
      },
      {
        title: "8. Weekly Progress Report",
        prompt: `Prepare a weekly progress report for client [Name]. This week's goals: [goals]. What actually happened: [results]. Variables: [note any]. Keep it short (1 page), balanced between positive and realistic, and written to keep motivation high.`,
        expectedOutput: "A weekly progress summary you can share with the client",
      },
      {
        title: "9. Social Media Bio",
        prompt: `Write my Instagram bio as a [specialty]. Who I am: [info]. Who I help: [target audience]. What I do: [services]. There's a booking link. Max 150 characters, strong and specific to the field, emojis allowed.`,
        expectedOutput: "An attention-grabbing bio you can paste straight into your Instagram profile",
      },
      {
        title: "10. Motivation Message Series",
        prompt: `My client [Name] is working on [goal]. What they're struggling with this week: [issue]. Write 3 separate motivation messages to send this week (Tuesday/Thursday/Saturday). Each 2-3 sentences, warm, personal, and specific. Not a generic quote — make it actually speak to their situation.`,
        expectedOutput: "3 separate motivation messages, timed for different days",
      },
    ],

    checklist: [
      {
        day: 1,
        task: "Sign up for Claude.ai (free). Build your first client intake form with AI — use Prompt 2 above.",
        tool: "Claude.ai",
        duration: "45 minutes",
      },
      {
        day: 2,
        task: "Using details from your last 3 clients, generate nutrition-plan drafts with Prompt 1. Compare the outputs and add your own touches.",
        tool: "Claude.ai",
        duration: "60 minutes",
      },
      {
        day: 3,
        task: "Open a Calendly account and create your booking page. Set up the auto-confirmation and reminder emails.",
        tool: "Calendly",
        duration: "45 minutes",
      },
      {
        day: 4,
        task: "Sign up for Canva. Review your Instagram profile, define 5 post concepts. Generate 2 visuals for this week with Canva AI.",
        tool: "Canva AI",
        duration: "60 minutes",
      },
      {
        day: 5,
        task: "Use Prompt 4 to write 3 Instagram post captions. Pair them with visuals. Upload to Buffer or Meta Business Suite and schedule.",
        tool: "Claude.ai + Canva AI",
        duration: "45 minutes",
      },
      {
        day: 6,
        task: "After a session today, use Prompt 3 and Prompt 8. Send the follow-up message to the client. Note how long it took.",
        tool: "Claude.ai",
        duration: "20 minutes",
      },
      {
        day: 7,
        task: "Review your AI use this week: Which tasks got faster? Which prompts helped most? Plan next week's 30-day content calendar with Claude.",
        tool: "Claude.ai",
        duration: "30 minutes",
      },
    ],

    growtTeaser:
      "This guide is the first step of the GROWT Method — the G stage (Gözlem / Observe). You spot your current processes and see where AI will make the fastest difference. With the GROWT Method, the next steps get far more systematic: building the AI infrastructure specific to your field (Roadmap), learning the right tools (Learn), implementing full automation (Apply), and tracking results to optimize (Track). What you've seen here is just the beginning — build your personal plan for the full transformation.",

    ctaHeadline: "Next step: Build Your Personal AI Plan",
    ctaBody:
      "You've seen how much time the 3 scenarios in this guide can save you. But where's the single biggest AI opportunity for your practice? Which tools should you set up, and in what order? To find out, take the free AI Digital Maturity Test at growtify.ai/test. The 5-minute quiz produces a roadmap tailored to your field and your current situation.",
  },

  "beauty": {
    slug: "beauty",
    coverTitle: "The AI Content Creation Guide for Salons & Clinics",
    coverSubtitle: "A 30-day Instagram plan + Canva prompts + a hashtag strategy",
    sectorIcon: "💄",

    intro: {
      forWho:
        "This guide is for hairdressers, aestheticians, salon owners, and clinic managers who want to post on Instagram consistently but never seem to have the time — who want a more systematic way to handle bookings, and a real system for keeping clients coming back. You already know how much social media matters. The trouble is that producing a post every single day feels impossible.",
      whatYouGet: [
        "A 30-day Instagram content plan — 30 posts, each with the caption already written",
        "50+ Canva AI prompts — built for salon and clinic visuals, across different formats",
        "A hashtag strategy — chosen through industry research and segmented by audience",
        "5 Reels script templates — from storytelling to the before-and-after format",
        "A client loyalty message series — automated from post-appointment to birthday",
      ],
      painHook:
        "Spending five hours a week on Instagram content, then feeling deflated because 'nobody sees it'? The problem isn't the quality of your content — it's that there's no system behind it. With AI, you sit down once and map out the entire month.",
    },

    sectorContext: {
      whyAiMatters:
        "The beauty and aesthetics industry runs on Instagram. Before they book, prospective clients check your profile, scroll your before-and-afters, and read the comments. Salons and clinics that can't post consistently and professionally quietly lose clients to competitors — and it's consistency, not raw content quality, that decides the winner.\n\nAI delivers both speed and consistency. Canva AI generates the visuals, Claude writes the copy, and Buffer or Meta Business Suite schedules it all. A five-hour-a-week content job drops to 30 minutes, and you end up with a consistent profile that follows a monthly plan. On the loyalty side, AI brings people back with personalized follow-up messages.",
      stats: [
        {
          value: "73%",
          label:
            "Share of beauty-service consumers who discover a new salon or clinic through Instagram.",
          source: "Meta Business Insights, 2024",
        },
        {
          value: "3.2x",
          label:
            "Follower-growth rate for salons that post consistently (4+ times a week), versus inconsistent profiles.",
          source: "Later Social Media Report, 2024",
        },
        {
          value: "68%",
          label:
            "The number-one reason beauty clients don't rebook: nobody reminded them.",
          source: "Fresha Booking Trends, 2023",
        },
      ],
      comparison: {
        without: [
          "Instagram content thrown together in a panic, last minute, inconsistent",
          "No post-appointment follow-up — you have no idea whether clients ever come back",
          "Hashtags picked at random, reach stays capped",
          "Before-and-after content is sporadic, no portfolio ever builds up",
        ],
        with: [
          "A whole month's content calendar ready in one sitting, scheduled",
          "An automatic thank-you and follow-up after each appointment — clients return",
          "An industry-specific hashtag set ready to go; you pick the right one for each post",
          "A before-and-after template ready, so every treatment becomes a post in 5 minutes and goes live",
        ],
      },
    },

    scenarios: [
      {
        title: "Scenario 1: A 30-Day Instagram Content Calendar",
        problem:
          "You never know what to post each day. Sometimes you go quiet for days; other times you fire off three posts at once. The profile looks inconsistent and you're not gaining new followers. Instagram's algorithm rewards accounts that post consistently — but carving out time for it every single day just isn't realistic.",
        steps: [
          "Give Claude the content-calendar prompt below",
          "Review the output and tweak any days that don't fit you",
          "For each week, generate that week's visuals in Canva AI (Canva prompts are below)",
          "Upload the visuals and captions to Buffer or Meta Business Suite",
          "Set the schedule — best times: Tuesday-Friday, 11:00-12:00 and 19:00-20:00",
          "Check in once a week to add Stories (spontaneous, more natural)",
        ],
        promptExample: `You are an expert social media manager in the beauty and aesthetics industry. Build a 30-day Instagram content calendar for [salon type: hair salon / aesthetician / clinic] for the month of October.

Salon details:
- Salon name: [name]
- Specialty: [e.g. hair coloring, skincare, permanent makeup]
- Target client: [age group and profile]
- Style/tone: [Luxury / Friendly / Youthful / Professional]
- Content types I want to share: before-and-afters, client reviews, tips, promotions

For each day, prepare:
- Day and date
- Content type (before-and-after / tip / client story / question / promotion / BTS)
- A headline (under 10 words, attention-grabbing)
- Caption text (80-120 words, last line a CTA)
- 10-15 hashtags (a mix: big + mid-size + niche)
- Visual direction (what kind of image to use)

Include at least 2 before-and-afters, 1 client review, and 2 tip posts per week. Add a promotion/special-offer post on Saturday or Sunday.`,
        before: "5-6 hours every week — finding ideas, writing, building visuals, uploading, scheduling",
        after: "One 2-hour session a month — calendar's ready, then 20-30 minutes of updates each week",
      },
      {
        title: "Scenario 2: A Before-and-After Post System",
        problem:
          "Before-and-after posts get the most engagement of any content type — but writing the copy every time eats up your day. How does the caption open, what do you say, which hashtags do you use? Instead of thinking it through from scratch each time, set up a template system.",
        steps: [
          "Take a before-and-after photo after each treatment (with the client's permission)",
          "Give Claude the treatment details and generate the caption with the prompt below",
          "Build a before-and-after template in Canva (you do it once, then reuse it forever)",
          "Combine the caption and visual in Canva, or just add it to a plain Instagram post",
          "Paste in your ready-made hashtag set, schedule it or post it right away",
        ],
        promptExample: `Write an Instagram before-and-after post caption for the treatment below.

Treatment details:
- Treatment type: [e.g. Balayage / Facial / Lash lift / Brow shaping]
- Client profile: [brief, anonymous — e.g. 32 years old, brown hair]
- Product/technique used: [note it if relevant]
- Result: [the client's reaction or the change you observed]
- Salon name: [name]

Caption template:
- First line: an attention-grabbing "before → after" style opener
- 2-3 sentences: the treatment details, the client's transformation, why it's special
- CTA: DM or link to book
- Use emojis, but don't overdo it

Then suggest two hashtag sets:
1. 15 hashtags tailored to this specific post
2. A general 20-hashtag set for the salon (for this treatment type)`,
        before: "15-20 minutes per before-and-after post — thinking up the copy, writing it, hunting for hashtags",
        after: "3-5 minutes once the photo's taken — use the prompt, caption's ready, post it",
      },
      {
        title: "Scenario 3: A Client Loyalty Message Series",
        problem:
          "The client came in, got the service, left. You never saw them again. The data says 68% of clients don't come back because nobody followed up — not because they switched salons, just because they forgot. Set up a systematic follow-up series so clients remember you.",
        steps: [
          "Use the booking close in your scheduling platform (Calendly or GHL) as the trigger",
          "After the appointment: a thank-you message (same day)",
          "3 days later: an aftercare tips message",
          "10 days later: a 'how's it going?' message",
          "21 days later: a rebooking reminder / special offer",
          "Birthday: a surprise discount message (add their birthday to your CRM)",
        ],
        promptExample: `Build a client loyalty message series for [salon name]. The client just had: [service type].

Message 1 — Evening of the appointment (Thank-you):
[A warm, short thank-you — use the client's name, add a note specific to the service]

Message 2 — 3 days later (Aftercare tip):
[3 practical aftercare tips specific to that service — informative, positioning you as the expert]

Message 3 — 10 days later (Check-in):
[A short "how's it going?" message — warm, no selling, just asking how happy they are]

Message 4 — 21 days later (Rebooking):
[A gentle reminder + a special offer or a "first pick" invitation]

Message 5 — Birthday (Special offer):
[A personal, warm birthday message + a [X]% discount or a small gift]

All messages for WhatsApp: short, warm, with emojis — 50-80 words. Use a friendly, direct tone.`,
        before: "There was no client follow-up, or it was done manually and usually skipped",
        after: "The template set is ready — set up the post-appointment series once, and it runs for every client",
      },
    ],

    tools: [
      {
        name: "Claude (claude.ai)",
        description:
          "The most capable AI writing assistant for Instagram captions, client messages, and content-calendar generation.",
        free: true,
        link: "https://claude.ai",
        bestFor: "Content calendars, caption writing, client messages, promo copy",
      },
      {
        name: "Canva AI (canva.com)",
        description:
          "An AI-powered design tool for Instagram visuals, Reels covers, and before-and-after templates.",
        free: true,
        link: "https://canva.com",
        bestFor: "Before-and-after visuals, promo designs, Instagram templates",
      },
      {
        name: "Buffer (buffer.com)",
        description:
          "A social media management tool that schedules posts to Instagram, Facebook, and other platforms.",
        free: true,
        link: "https://buffer.com",
        bestFor: "Content scheduling, multi-platform management, analytics tracking",
      },
      {
        name: "Meta Business Suite (business.facebook.com)",
        description:
          "Manage Instagram and Facebook from a single dashboard — scheduling, messaging, and analytics included.",
        free: true,
        link: "https://business.facebook.com",
        bestFor: "Running Instagram and Facebook together, DM tracking, ad management",
      },
      {
        name: "Fresha or GHL (fresha.com)",
        description:
          "Appointment management, client tracking, and automated reminders for salons and clinics.",
        free: true,
        link: "https://www.fresha.com",
        bestFor: "Online booking, client tracking, reminder automation",
      },
    ],

    prompts: [
      {
        title: "1. 30-Day Content Calendar",
        prompt: `Build a 30-day Instagram content calendar for a [salon type] for the month of [month]. For each day: content type, headline (10 words), caption (80-120 words + CTA), 12 hashtags, visual direction. Per week: 2 before-and-afters, 1 client review, 2 tips, 1-2 promotions. Tone: [luxury/friendly/youthful]. Target audience: [profile].`,
        expectedOutput: "A 30-day content calendar with a ready caption and hashtags for each day",
      },
      {
        title: "2. Before-and-After Caption",
        prompt: `Write a before-and-after caption for a [treatment type]. Treatment details: [details]. Result: [result]. Make the first line punchy, 2-3 sentences of detail, and a booking CTA as the last line. Then suggest 15 hashtags (a mix of big/mid-size/niche).`,
        expectedOutput: "A ready before-and-after caption and hashtag set",
      },
      {
        title: "3. Client Thank-You Message",
        prompt: `My client [name] had a [service] today. Write a warm thank-you message to send them. Short (3-4 sentences), personal, friendly. Add a detail specific to the service and a small aftercare tip. Use emojis, for WhatsApp.`,
        expectedOutput: "A personal thank-you message, ready for WhatsApp",
      },
      {
        title: "4. Promotion Announcement",
        prompt: `Write an Instagram announcement post for [campaign name]. Promotion: [details]. Duration: [dates]. Target: [audience]. Caption: an attention-grabbing headline + the promo details + a sense of urgency/scarcity + a CTA (DM or link). Add 15 hashtags.`,
        expectedOutput: "A ready post for a promotion announcement",
      },
      {
        title: "5. Client Testimonial Post",
        prompt: `My client left this review: "[review text]". Use this review for an Instagram post. Caption: a quote from the review (in quotation marks) + my short comment (2-3 sentences) + a booking CTA. Add a hashtag set. Use a polite, respectful tone toward the client.`,
        expectedOutput: "An Instagram post that spotlights a client testimonial",
      },
      {
        title: "6. Reels Script",
        prompt: `Write a script for a 30-60 second Reel about [topic: e.g. the keratin treatment process / hair coloring techniques]. Format: an attention-grabbing hook (3 seconds), the main content (a list or step-by-step), a closing (CTA). Conversational, clear, and energetic.`,
        expectedOutput: "A speaking script for a 30-60 second Reel",
      },
      {
        title: "7. Story Question Series",
        prompt: `To boost engagement with followers, create 5 Instagram Story questions about [topic]. Each question: short (10-15 words), curiosity-sparking, easy to answer. Suited to a Story poll, question box, or emoji slider format.`,
        expectedOutput: "5 engagement questions for different Story formats",
      },
      {
        title: "8. Appointment Reminder Message",
        prompt: `[Name] has an appointment tomorrow at [time]. Write a reminder message. The message: short (2-3 sentences), the appointment info, a prep tip (if any), an address/location reminder. A warm tone, for WhatsApp.`,
        expectedOutput: "A WhatsApp appointment reminder message",
      },
      {
        title: "9. Client Follow-Up Message (Day 10)",
        prompt: `[Name] had a [service] 10 days ago. Write a check-in message. The goal: ask how it's going, not to sell. 2-3 sentences, warm, showing genuine interest. For WhatsApp.`,
        expectedOutput: "A natural, warm day-10 follow-up message",
      },
      {
        title: "10. Birthday Message",
        prompt: `It's [name]'s birthday today. Send a birthday message and special offer from my salon. The message: a personal and warm birthday note, a surprise offer ([X]% off or a small gift), an invitation to book. Use emojis, 3-4 sentences.`,
        expectedOutput: "A personal birthday wish and offer message",
      },
    ],

    checklist: [
      {
        day: 1,
        task: "Sign up for Claude.ai. Gather your salon details (name, specialty, target client, tone). Run the 30-day content-calendar prompt.",
        tool: "Claude.ai",
        duration: "60 minutes",
      },
      {
        day: 2,
        task: "Review the calendar and tweak any days that don't fit. Sign up for Canva and create an Instagram template set for the salon (colors, font, logo placement).",
        tool: "Canva AI",
        duration: "60 minutes",
      },
      {
        day: 3,
        task: "Generate this week's 5 post visuals in Canva AI. Build and save your before-and-after template — you'll use it again and again.",
        tool: "Canva AI",
        duration: "60 minutes",
      },
      {
        day: 4,
        task: "Sign up for Buffer or Meta Business Suite. Upload and schedule this week's 5 posts (visual + caption).",
        tool: "Buffer / Meta Business Suite",
        duration: "45 minutes",
      },
      {
        day: 5,
        task: "Build the client loyalty message series (Prompts 3, 9, 10). Save the 5 templates. Set up the first reminder in your booking platform.",
        tool: "Claude.ai + Fresha/GHL",
        duration: "45 minutes",
      },
      {
        day: 6,
        task: "Take this week's before-and-after photos (with client permission). Generate the captions with Prompt 2 and post them right away.",
        tool: "Claude.ai + Instagram",
        duration: "30 minutes",
      },
      {
        day: 7,
        task: "Review the week's results: which posts got the most engagement? Use that data to refine next week's content.",
        tool: "Meta Business Suite / Buffer Analytics",
        duration: "20 minutes",
      },
    ],

    growtTeaser:
      "In this guide you've laid the groundwork for Instagram content automation — that's the first step of the GROWT Method. But content creation alone isn't enough: how do clients discover you, how do they book, how do they come back, and how do they recommend you to others? To build that whole loop, you need a plan of your own. Get your salon's personal AI transformation roadmap at growtify.ai/test.",

    ctaHeadline: "Next step: Build the AI Plan for Your Salon",
    ctaBody:
      "Once you've set up the system in this guide, you'll start winning back time from Instagram. But how do clients find you, how do they book, how do they pay, and why do they come back? To automate that entire flow with AI, take the free AI Digital Maturity Test at growtify.ai/test. You'll get a personal roadmap built around your salon and where you are right now — 5 minutes.",
  },

  "real-estate": {
    slug: "real-estate",
    coverTitle: "The AI Guide for Real Estate Professionals",
    coverSubtitle: "From writing listings to matching buyers — get back 10 hours a week.",
    sectorIcon: "🏠",

    intro: {
      forWho:
        "This guide is for real estate agents, property consultants, and brokerage owners who spend hours on every listing, match buyers to properties on gut instinct, and run market analysis by hand. If your admin workload grows every time your portfolio does, AI changes that equation.",
      whatYouGet: [
        "3 practical scenarios — a listing production line, buyer matching, and market reports",
        "5 AI tools compared — which one to reach for, and when, in a real estate practice",
        "15 copy-paste prompts — from residential, commercial, and land listings to neighborhood analysis",
        "A first-7-days checklist — a step-by-step way to set up the whole system from scratch",
        "A then vs. now comparison — with concrete time-savings figures",
      ],
      painHook:
        "Nearly 40% of a real estate agent's time goes to content and admin work — not to selling. Every listing is written from scratch, every client meeting needs its own report, and market analysis runs on feel. AI takes the repetitive load off your plate, so you can focus on the buyers and sellers in front of you.",
    },

    sectorContext: {
      whyAiMatters:
        "Real estate is digitizing fast. With listing portals like Zillow, Rightmove, and Realtor.com only getting more competitive, both content quality and speed are what set you apart. AI cuts listing copy from hours to minutes, turns buyer matching into a systematic process by analyzing client profiles, and automates neighborhood-level market reports.\n\nThe data backs the trend: platform giants like Zillow and Redfin have put AI at the center of their operations. For independent agents and small brokerages, that's exactly where the opportunity sits — reaching the same content quality without needing a big platform's resources.",
      stats: [
        {
          value: "40%",
          label: "Share of an agent's time spent on admin and content work — not selling.",
          source: "National Association of Realtors, Productivity Study 2023",
        },
        {
          value: "3x",
          label: "Increase in listing views for agents using AI-assisted copy — same property, better presentation.",
          source: "Zillow Agent Insights Report, 2024",
        },
        {
          value: "8 hrs",
          label: "Average time saved per week on listing writing, client communication, and report prep by agents using AI.",
          source: "NAR Technology Survey, 2024",
        },
      ],
      comparison: {
        without: [
          "Every listing written from scratch — the same work over and over for the same property type",
          "Buyer-to-property matching that relies on memory and gut feel",
          "Hours of manual research for every market analysis",
          "Follow-up emails and referral requests forgotten or sent late",
        ],
        with: [
          "You enter the property details; AI returns a professional listing and SEO title in 5 minutes",
          "You drop the buyer's criteria into a prompt; AI recommends the best 3 properties from your portfolio, with reasons",
          "You feed in the neighborhood data; AI drafts the market report — you approve it",
          "Follow-up, referral-request, and open-house invitation templates ready in a minute with AI",
        ],
      },
    },

    scenarios: [
      {
        title: "Scenario 1: The Professional Listing Production Line",
        problem:
          "Every time a new property hits your portfolio, you need a separate, SEO-friendly, eye-catching listing for each platform. Short for one portal, detailed for another, image-led for Instagram — every format is different. It takes hours, and it repeats with every property.",
        steps: [
          "Drop the property basics into a form: location, type, size, bedrooms, features, price",
          "Give Claude the listing prompt below and fill in the property details",
          "Review the copy AI produces and add any personal notes",
          "Adapt the format for different platforms (short / long / Instagram caption)",
          "Generate the SEO title in the same session — no separate prompt needed",
          "Save all the variants in one folder and turn them into a template for the rest of your portfolio",
        ],
        promptExample: `You are an experienced real estate copywriter. Using the property details below, write a professional listing.

Property details:
- Type: [Apartment / House / Retail unit / Land / Office]
- Location: [city, neighborhood, street]
- Size: [gross / net sq ft or sq m]
- Bedrooms: [info]
- Floor: [info] / Total floors: [info]
- Features: [elevator, parking, balcony, garden, etc.]
- Heating/cooling: [central / individual boiler / A/C]
- Year built: [info]
- Price: [amount and currency]
- For sale or for rent: [info]
- Standout advantage: [strongest feature]

Please produce:
1. A platform listing (300-400 words, persuasive, with emotional triggers)
2. An SEO title (60-70 characters, keyword-rich)
3. An Instagram caption (150 words, 10 hashtags)
4. A short WhatsApp teaser message (3-4 sentences, intrigue-building)

Professional but warm tone in English. No second-person "you" — a neutral voice describing the property.`,
        before: "45-90 minutes per listing — different copy for each platform",
        after: "Enter the property details + review: 10-15 minutes — all platform variants ready",
      },
      {
        title: "Scenario 2: The Buyer-Property Matching Assistant",
        problem:
          "A buyer walks in: they have a budget, they have criteria, but you have dozens of properties in your portfolio. Which do you recommend? Most of the time that decision lives in your memory and your instinct. The wrong match means wasted time and an unhappy client.",
        steps: [
          "During the client meeting, fill out a standard criteria form (budget, location, type, priorities)",
          "Prepare a short list of the matching properties in your portfolio, with their features",
          "Give both to Claude using the matching prompt below",
          "AI ranks the best 3 properties with its reasoning — and hands them to you for approval",
          "Generate the pitch copy for the approved properties in the same session",
        ],
        promptExample: `Below are a buyer's criteria and the property list from my portfolio. Identify the best 3 properties and explain why you'd recommend each one.

Buyer criteria:
- Budget: [range]
- Location preference: [list of neighborhoods/areas]
- Property type: [apartment / house / commercial]
- Minimum size: [sq ft or sq m]
- Bedrooms: [minimum]
- Priorities: [near schools / public transit / garden / quiet area / investment purpose, etc.]
- Dealbreakers: [things they absolutely don't want]

Portfolio list:
[For each property: ID, location, type, size, price, standout feature — one per line]

Output:
1. The best 3 properties (by ID), with the reasoning for each
2. A 2-3 sentence pitch note for the client for each property
3. Any potential objections to anticipate, with responses`,
        before: "Scanning the portfolio in your head + prepping the pitch: 30-60 minutes",
        after: "Criteria form + AI output + review: 10-15 minutes",
      },
      {
        title: "Scenario 3: The Neighborhood Market Analysis Report",
        problem:
          "Your seller asks: 'Where are prices in this area?' Your buyer asks: 'Is this price realistic?' Your market knowledge runs on feel, while competitors show up with professional reports. Building an analysis report takes hours.",
        steps: [
          "Pull neighborhood data from your local listing portal or a market-data tool (price ranges, average price per sq ft)",
          "Organize the data into a short list",
          "Give it to Claude and use the report prompt below",
          "AI drafts the report — you add your own observations",
          "Save it as a PDF and use it as a presentation piece for the client",
        ],
        promptExample: `Using the data below, prepare a professional real estate market analysis report for [Neighborhood Name].

Area: [city / neighborhood]
Property type: [Residential / Commercial / Land]
Analysis period: [Last 6 months / 1 year]

Raw data:
- Average sale price: [price per sq ft or sq m]
- Price range: [min - max]
- Average rental price: [if available]
- Estimated transactions in the last 6 months: [info]
- Standout features of the area: [transit, schools, malls, development projects, etc.]
- Price comparison with competing areas: [if available]

The report should include:
1. An executive summary (3-4 sentences)
2. Price analysis and per-square-foot comparison
3. The area's strengths and weaknesses (from an investor's perspective)
4. A short-term trend outlook (data-driven, not speculative)
5. Summary advice for buyers and sellers

Keep the report professional, objective, and in English. Avoid speculative claims.`,
        before: "Manual research + writing the report: 2-3 hours",
        after: "Data gathering + AI report + editing: 30-45 minutes",
      },
    ],

    tools: [
      {
        name: "Claude (claude.ai)",
        description: "The most capable AI assistant for long listing copy, market reports, client correspondence, and matching analysis.",
        free: true,
        link: "https://claude.ai",
        bestFor: "Listing copy, market reports, buyer matching, pitch copy",
      },
      {
        name: "ChatGPT (chatgpt.com)",
        description: "A strong complement for alternative listing versions, creative headlines, and quick content ideas.",
        free: true,
        link: "https://chatgpt.com",
        bestFor: "Headline alternatives, social media content, campaign ideas",
      },
      {
        name: "Canva AI (canva.com)",
        description: "AI-assisted design for property marketing visuals, brochures, Instagram posts, and presentation slides.",
        free: true,
        link: "https://canva.com",
        bestFor: "Listing visuals, brochures, Instagram posts, client presentation slides",
      },
      {
        name: "Zillow / Redfin (zillow.com)",
        description: "Major listing and market-data platforms — pull neighborhood prices, trend data, and comparable sales to verify your analysis.",
        free: false,
        link: "https://www.zillow.com",
        bestFor: "Neighborhood analysis, price trends, investment-decision support",
      },
      {
        name: "Notion AI (notion.so)",
        description: "An AI-assisted productivity tool for portfolio tracking, client notes, and project management.",
        free: false,
        link: "https://www.notion.so",
        bestFor: "Portfolio management, client CRM, task tracking",
      },
    ],

    prompts: [
      {
        title: "1. Residential Listing Copy",
        prompt: `You are a professional real estate copywriter. Using these details, write persuasive listing copy for a [for sale / for rent] [bedrooms]-bed, [bathrooms]-bath apartment of [size] in [city, neighborhood]. Features: [list]. Price: [price]. Standout advantage: [feature]. 350 words, an opening that builds an emotional connection, technical details in the middle, and a strong close.`,
        expectedOutput: "Platform listing, SEO title, and Instagram caption versions",
      },
      {
        title: "2. Commercial Property Listing Copy",
        prompt: `Write an investor- and tenant-focused commercial property listing for a [size] [retail unit / office / warehouse] at [location]. Rental yield: [info]. Title/ownership status: [info]. Standout features: [list]. Emphasize the investment value and potential uses. 300 words, objective and in investor-appropriate language.`,
        expectedOutput: "Commercial listing, investment summary, and WhatsApp teaser message",
      },
      {
        title: "3. Land Listing Copy",
        prompt: `Write a listing for a [size] [zoned / unzoned / agricultural] plot of land in [area]. Zoning/density ratios: [if available]. Zoning status: [info]. Location-specific advantages: [list]. Lead with the investment potential. 250 words.`,
        expectedOutput: "Land listing, zoning summary, and notes on potential uses",
      },
      {
        title: "4. SEO Title Generation",
        prompt: `Generate 5 different SEO titles for this property: [property type + location + standout feature]. Each title max 65 characters, keyword-rich, and high click-through. Platforms: your local listing portals and Google Ads.`,
        expectedOutput: "5 different SEO titles, with platform recommendations",
      },
      {
        title: "5. Buyer-Property Matching",
        prompt: `Buyer profile: budget [amount], preference: [list of areas], type: [apartment / house], priorities: [list], dealbreakers: [things they don't want]. My portfolio: [property list — ID, location, price, features]. Pick the best 3 properties, with 2 sentences of reasoning and a likely-objection response for each.`,
        expectedOutput: "A prioritized list of 3 property recommendations, reasoning, and objection responses",
      },
      {
        title: "6. Neighborhood Price Analysis",
        prompt: `Run a real estate price analysis for [neighborhood]. The data I have: average sale price [price per sq ft], rental price [price], recent transaction volume [estimate]. Write a one-page report covering the area's strengths and weaknesses, a short-term trend, and advice for buyers and sellers.`,
        expectedOutput: "A one-page neighborhood analysis report, ready to present to a client",
      },
      {
        title: "7. Client Follow-Up Email",
        prompt: `I had a [property showing / phone call] with [Name] yesterday. The property they're interested in: [info]. Next step: [info]. Write a professional, warm follow-up email. 4-5 sentences, add one value-adding detail (about the area or property), and a clear pointer to the next step.`,
        expectedOutput: "A ready-to-send follow-up email",
      },
      {
        title: "8. Market Report (Monthly)",
        prompt: `For a [month] real estate market report on [area], use this data: [sale price trend, rental trend, top-selling property type, notable developments]. Write a one-page newsletter in English to send to investors and property owners.`,
        expectedOutput: "A monthly market newsletter, in a format ready for your email list",
      },
      {
        title: "9. Portfolio Summary Pitch",
        prompt: `Write a short portfolio summary to present to an investor for my [X]-property portfolio: [Property list: location, type, size, price, potential return]. Highlight the total portfolio value, its diversity, and its strengths. 300 words, from an investment perspective.`,
        expectedOutput: "A portfolio summary, ready for an investor presentation",
      },
      {
        title: "10. Open House Invitation",
        prompt: `Prepare an open house invitation for [property summary] at [address] on [date, time]. A WhatsApp version (3 sentences) + an email version (short, curiosity-building) + an Instagram story line (one sentence + emoji). Include a clear CTA to attend.`,
        expectedOutput: "Ready open house invitation content for 3 channels",
      },
      {
        title: "11. Referral Request Message",
        prompt: `I just successfully closed a [transaction type: purchase / sale / rental] with my client [Name]. Write a warm, no-pressure WhatsApp message asking them to share the experience with their circle and refer me to potential clients. 3-4 sentences.`,
        expectedOutput: "A natural, effective referral-request message",
      },
      {
        title: "12. Valuation Summary",
        prompt: `Write an estimated market value analysis for [property: location, type, size, age, features]. Comparable sales in the area: [info]. Strengths: [list]. Factors that lower value: [list]. Conclusion: an estimated price range and the reasoning. 200 words, objective and honest.`,
        expectedOutput: "An estimated valuation summary you can share with a client",
      },
      {
        title: "13. Campaign Announcement Copy",
        prompt: `Write a real estate campaign announcement for [campaign name / promotion details]. Target: [buyer / seller / investor]. Campaign window: [date range]. Three separate versions for email, WhatsApp, and Instagram — short, attention-grabbing, with a clear CTA.`,
        expectedOutput: "Campaign copy for 3 channels, with a sense of urgency",
      },
      {
        title: "14. Listing Refresh Copy",
        prompt: `This property hasn't sold in [X weeks/months]: [property summary + current listing copy]. The price hasn't changed. Buyer feedback: [if any]. Rewrite the listing with a fresh angle — lead with a different feature and speak to a different buyer audience.`,
        expectedOutput: "Updated listing copy with a fresh presentation angle",
      },
      {
        title: "15. Buyer Profile Summary",
        prompt: `From the meeting notes below, build a buyer profile: [notes]. The output should include: clear budget, firm location preferences, property type priority, time pressure (urgent or not), decision-makers (spouse, family), and potential objections. Short, structured, and usable.`,
        expectedOutput: "A structured buyer profile summary, ready for the next meeting",
      },
    ],

    checklist: [
      {
        day: 1,
        task: "Sign up for Claude.ai. Use Prompt 1 on the latest property in your portfolio — generate the listing copy, SEO title, and Instagram caption.",
        tool: "Claude.ai",
        duration: "45 minutes",
      },
      {
        day: 2,
        task: "Build a standard buyer-criteria form template (location, budget, type, priorities). Run portfolio matching with Prompt 5 for your 3 active buyers.",
        tool: "Claude.ai",
        duration: "60 minutes",
      },
      {
        day: 3,
        task: "Sign up for Canva. Create a brochure template for your latest 2 properties. Generate the visuals with Canva AI.",
        tool: "Canva AI",
        duration: "60 minutes",
      },
      {
        day: 4,
        task: "Generate a market analysis report with Prompt 6 for the area you work most. Use it in your next client meeting.",
        tool: "Claude.ai",
        duration: "45 minutes",
      },
      {
        day: 5,
        task: "Send a follow-up email to your last 5 clients with Prompt 7. Send a referral request with Prompt 11 to anyone who hasn't referred you yet.",
        tool: "Claude.ai",
        duration: "30 minutes",
      },
      {
        day: 6,
        task: "Pick the listings that haven't sold in 3 months, generate a fresh presentation angle with Prompt 14, and update the listings.",
        tool: "Claude.ai",
        duration: "60 minutes",
      },
      {
        day: 7,
        task: "Review the week's AI use. Which prompt helped most? Set up your monthly market newsletter template for next month.",
        tool: "Claude.ai",
        duration: "30 minutes",
      },
    ],

    growtTeaser:
      "In this guide you've laid the foundation for automating listing production, buyer matching, and market reporting. But real growth in real estate comes from building a client-acquisition system — social media, an email list, a referral network, and digital reputation. With the GROWT Method, you build these steps in order and see yourself progressing with concrete metrics at every stage. To build your personal plan, head to growtify.ai/test.",

    ctaHeadline: "Next step: Build the AI Plan for Your Real Estate Practice",
    ctaBody:
      "The hours you win back from writing listings are just the start. How do clients find you, how does your portfolio grow, how does your referral system run on autopilot? To set up the whole flow, take the free AI Digital Maturity Test at growtify.ai/test — a sector-specific roadmap in 5 minutes.",
  },

  "ecommerce": {
    slug: "ecommerce",
    coverTitle: "The AI Content & Growth Guide for E-Commerce Sellers",
    coverSubtitle:
      "Hundreds of product descriptions, customer service, and ads — manage it all with AI",
    sectorIcon: "🛒",

    intro: {
      forWho:
        "This guide is for online store owners and dropshippers selling on Shopify, Amazon, Etsy, or their own e-commerce site — anyone who struggles to produce content for hundreds of products, can't keep up with customer questions, and isn't getting an efficient return on ad spend. If you want the operational speed of a large retailer without the headcount, you're in the right place.",
      whatYouGet: [
        "3 practical scenarios — a product content factory, a customer service assistant, and ad optimization",
        "5 AI tools — hand-picked for e-commerce operations",
        "12 copy-paste prompts — spanning every category, from apparel to electronics, cosmetics to food",
        "A first-7-days checklist — a step-by-step way to bring AI into your store",
        "A before → after comparison — time per product and conversion rate",
      ],
      painHook:
        "A 100-product store means 100 different descriptions — each one SEO-friendly, persuasive, and tailored to the platform. So you either burn weeks on it or get by with low-quality copy. Meanwhile you can't keep up with customer questions and competitors pull ahead. AI solves all three problems at once.",
    },

    sectorContext: {
      whyAiMatters:
        "Global e-commerce crossed $6 trillion in 2024 — and it's become one of the most competitive markets there is. Millions of product searches happen on Amazon every single day. To stand out in that environment, the quality of your product content, your customer experience, and your ad efficiency are all critical. AI hands small and mid-sized sellers the operational speed that used to belong only to the biggest retailers.\n\nThe world's leading e-commerce platforms baked AI into their operations long ago — more than 40% of Amazon product descriptions are now AI-assisted. For independent sellers, these same tools are available either free or at a very low cost.",
      stats: [
        {
          value: "34%",
          label:
            "Lift in conversion rate from high-quality product descriptions — same price, better content.",
          source: "Baymard Institute E-Commerce UX Research, 2024",
        },
        {
          value: "$6.3 trillion",
          label:
            "Global e-commerce market size (2024) — growing year over year, and so is the competition.",
          source: "Statista Global E-Commerce Report, 2024",
        },
        {
          value: "68%",
          label:
            "Shoppers who abandon a purchase because of a poor product description.",
          source: "Salsify Product Experience Report, 2023",
        },
      ],
      comparison: {
        without: [
          "Every product description written from scratch — 100 products = 100 hours of work",
          "Customer questions answered hours later, after a competitor has already replied",
          "Ad copy written on gut feel, with no idea which angle actually works",
          "Seasonal campaign prep always left to the last minute",
        ],
        with: [
          "You enter the product details; AI produces an SEO-friendly description in 3 minutes",
          "Ready-made reply templates for FAQs — customer service runs 3x faster",
          "You test different ad angles with AI, then scale the winning copy",
          "Seasonal campaigns planned in one session — content, copy, and discount math",
        ],
      },
    },

    scenarios: [
      {
        title: "Scenario 1: The Product Content Factory",
        problem:
          "Fifty new products just landed. Every one needs a listing, a product description, a title, and keywords. That's either a full week of work or a rushed job that drops the quality. Either way, competitors with better content pull ahead.",
        steps: [
          "Build a standard info template for your products (category, features, target audience, price)",
          "Fill in that template for each product — a 5-minute job",
          "Hand it to Claude and use the prompt below to generate the full content pack",
          "Review the output and fill in anything that's missing",
          "Format for each platform (Amazon character limits, Shopify conventions)",
          "Reuse the same template for bulk products — it gets faster once the system is set up",
        ],
        promptExample: `You are an e-commerce content expert. Using the product details below, write the platform listing, product description, and SEO content.

Product details:
- Category: [Apparel / Electronics / Cosmetics / Home / Food / Sports / Other]
- Product name: [name]
- Brand: [brand / unbranded]
- Key features: [bullet list]
- Target customer: [who uses it, and for what]
- Price: [amount]
- Advantage over competing products: [strongest differentiator]
- Certifications / warranty, if any: [info]

Please produce:
1. A product title (max 75 characters, keyword-rich)
2. A product description (300-400 words, benefits first, technical detail second)
3. A 5-point feature list (bullet format, persuasive)
4. 8-10 keywords (for marketplace search optimization)
5. An Instagram product caption (150 words, with a CTA)

Use language that persuades the buyer and answers their questions before they ask.`,
        before: "30-45 minutes per product — title, description, keywords, image notes",
        after: "Data entry + AI generation + review: 5-8 minutes per product",
      },
      {
        title: "Scenario 2: The Customer Service Assistant",
        problem:
          "Customers ask the same things over and over: shipping time, return policy, sizing, whether the product is genuine. Answering each one from scratch eats hours. And unanswered questions in the reviews section quietly kill sales.",
        steps: [
          "List the 20 most common questions your store gets",
          "Use Claude to generate a ready reply template for each one",
          "Save the replies in a Google Doc or Notion page",
          "When new questions come in, copy the template, personalize it, and send",
          "Automate the core replies for your platform's chatbot integration",
        ],
        promptExample: `Generate ready reply templates tailored to my store for the customer questions below.

Store details:
- Category: [product category]
- Return policy: [X days, conditions]
- Shipping time: [X business days]
- Free shipping threshold: [amount]
- Contact channels: [WhatsApp / email / phone]

For these questions, write professional, warm replies that keep the customer satisfied:
1. "Is this product genuine?"
2. "When will it ship?"
3. "Can I return it?"
4. "Is there a size chart?"
5. "Is there a bulk-order discount?"
6. [add a category-specific question here]

Each reply: direct, honest, and written to keep the customer with the store. Max 100 words.`,
        before: "3-5 minutes per question, from scratch — 20 questions a day = 1 hour+",
        after: "Template library ready; 30 seconds to personalize each reply",
      },
      {
        title: "Scenario 3: Ad Copy Optimization",
        problem:
          "You're running Meta or Google Ads, but you don't know which headline or which angle works better. You go in with a single ad — it either lands or it doesn't. Your budget burns inefficiently.",
        steps: [
          "Pick 3 angles for the product: benefit-led, urgency-led, and social-proof-led",
          "Use Claude to generate 3 different headlines and body copy for each angle",
          "That's 9 variants total — put them into an A/B test",
          "In the first 3-5 days, pick the top performer and shift budget toward it",
          "Save the winning format as a template for your next campaign",
        ],
        promptExample: `Generate Meta Ads (Facebook/Instagram) copy variants for the product below.

Product: [name + short description]
Target audience: [age, gender, interests]
Budget level: [low / medium / high]
Campaign objective: [sales / traffic / awareness]
Standout feature: [strongest differentiator]
Price and discount: [info]

Write ad copy for 3 different angles:

Angle 1 — Benefit-led:
- Headline (30 characters):
- Primary text (125 characters):
- Description (30 characters):

Angle 2 — Urgency-led (scarcity / time limit):
- Headline: Text: Description:

Angle 3 — Social-proof-led (reviews / user count):
- Headline: Text: Description:

For each angle, also suggest 1 CTA.`,
        before: "A single ad, low ROAS, wasted budget",
        after: "9 variants, a systematic A/B test, scaling with the winning format",
      },
    ],

    tools: [
      {
        name: "Claude (claude.ai)",
        description:
          "The most capable AI assistant for product descriptions, customer replies, campaign copy, and bulk content generation.",
        free: true,
        link: "https://claude.ai",
        bestFor: "Product descriptions, customer service templates, ad copy",
      },
      {
        name: "ChatGPT (chatgpt.com)",
        description:
          "A strong complement for alternative product-description variants and creative campaign ideas.",
        free: true,
        link: "https://chatgpt.com",
        bestFor: "Content alternatives, seasonal campaign ideas",
      },
      {
        name: "Canva AI (canva.com)",
        description:
          "An AI-assisted tool for product images, campaign banners, Instagram posts, and story designs.",
        free: true,
        link: "https://canva.com",
        bestFor: "Product imagery, campaign banners, social media content",
      },
      {
        name: "Meta Ads Manager (business.facebook.com)",
        description:
          "Facebook and Instagram ad management — A/B testing, audience targeting, and budget optimization.",
        free: true,
        link: "https://business.facebook.com",
        bestFor: "Ad campaign management, A/B testing, conversion tracking",
      },
      {
        name: "Shopify",
        description:
          "An all-in-one storefront platform — product uploads, inventory tracking, order management, and campaigns.",
        free: false,
        link: "https://www.shopify.com",
        bestFor: "Product listing, store management, order fulfillment",
      },
    ],

    prompts: [
      {
        title: "1. Apparel Product Description",
        prompt: `Write an e-commerce product description for [product name]. Category: apparel. Material: [info]. Size range: [info]. Use case: [everyday / sport / special occasion]. Standout feature: [info]. 300 words, benefits first and technical detail second, and include guidance on choosing the right size.`,
        expectedOutput: "An SEO-friendly product description, bullet feature list, and title",
      },
      {
        title: "2. Electronics Product Description",
        prompt: `Write a technical-but-accessible e-commerce description for [product name]. Category: electronics. Technical specs: [list]. Target user: [profile]. Advantage over competitors: [differentiator]. 350 words, simplify the technical jargon, and add a practical use-case scenario.`,
        expectedOutput: "A technical, persuasive electronics product description",
      },
      {
        title: "3. Cosmetics Product Description",
        prompt: `Write a description for the cosmetic product [product name]. Ingredients: [key ingredients]. Skin type: [suitable skin types]. How to use: [application]. Certifications: [if any]. 300 words, sensory language, results-focused, and include safety information.`,
        expectedOutput: "An intuitive, trust-building cosmetics product description",
      },
      {
        title: "4. Food Product Description",
        prompt: `Write a description for the food product [product name]. Ingredients: [list]. Allergen warning: [if any]. Nutrition summary: [info]. Serving suggestion: [recipe / how to enjoy]. 250 words, appetizing language, health benefits, and storage instructions.`,
        expectedOutput: "An appetizing, informative food product description",
      },
      {
        title: "5. SEO Title Optimization",
        prompt: `Generate 5 different marketplace titles for this product: [product name + category + standout feature]. Each title max 75 characters, with a high-search-volume keyword, and built for a high click-through rate. Rank the titles by estimated search volume.`,
        expectedOutput: "5 different SEO titles, ranked and justified",
      },
      {
        title: "6. Customer Question Reply — Returns",
        prompt: `A customer asks: "Can I return this product?" My store's return policy: [X days, conditions, return process]. Write a clear, honest reply that keeps the customer with the store. 2-3 sentences, warm, no unnecessary formality.`,
        expectedOutput: "A return reply that keeps the customer satisfied",
      },
      {
        title: "7. Campaign Copy — Discount",
        prompt: `Write copy for a [discount rate or amount] discount campaign on [product or category]. Platform: [marketplace / Instagram / email]. Campaign window: [date range]. Give 3 different headlines (scarcity, benefit, curiosity) + short body copy + a CTA. Create a sense of urgency without overdoing it.`,
        expectedOutput: "3 different campaign headlines and body copy",
      },
      {
        title: "8. Product Comparison Table Copy",
        prompt: `Write copy for a comparison between [Product A] and [Product B] to add to a product page. [Product A] is mine. Features: [list for both]. Price: [both]. Who each is better for: [audience difference]. A balanced but [Product A]-favoring 200 words.`,
        expectedOutput: "Conversion-boosting product comparison copy",
      },
      {
        title: "9. Low-Stock Alert Copy",
        prompt: `Write low-stock alert copy for [product name]. Stock remaining: [X units]. Platform: [Instagram story / email / SMS]. 2 versions: aggressive scarcity (urgent) and a soft reminder (don't miss out). Each 2-3 sentences.`,
        expectedOutput: "Scarcity-driven stock alert copy",
      },
      {
        title: "10. Review Request",
        prompt: `Write a review-request message for a customer whose order has been delivered. Product: [product name]. Platform: [marketplace / email / WhatsApp]. Warm, no pressure, and easy for the customer to share their experience — 3 sentences. Briefly explain how to leave the review.`,
        expectedOutput: "A friendly review request that lifts your review rate",
      },
      {
        title: "11. Seasonal Campaign Plan",
        prompt: `Write a [X]-day content and promotion plan for a [New Year / Valentine's Day / Black Friday / Back-to-School / Summer] campaign. Store category: [info]. For each day: 1 social media post, 1 promotion idea. Build momentum from the start date to the end — the strongest CTA on the peak day.`,
        expectedOutput: "A daily campaign calendar with content and promotion plan",
      },
      {
        title: "12. Cart Recovery Message",
        prompt: `Write a reminder message for a customer who added a product to their cart but didn't buy. Product: [product name + price]. Channel: [email / SMS]. Version 1: a benefit reminder. Version 2: a limited-time special discount offer. Each max 3 sentences, with a CTA.`,
        expectedOutput: "An abandoned-cart recovery message, in 2 versions",
      },
    ],

    checklist: [
      {
        day: 1,
        task: "Sign up for Claude.ai. Regenerate the descriptions for your 5 best-selling products with Prompt 1, 2, or 3. Compare them to your current marketplace listings.",
        tool: "Claude.ai",
        duration: "60 minutes",
      },
      {
        day: 2,
        task: "List the 15 most common questions your store gets. Generate a ready reply template for each one using the Prompt 6 format. Save them in a Google Doc.",
        tool: "Claude.ai",
        duration: "60 minutes",
      },
      {
        day: 3,
        task: "Sign up for Canva. Create a product image and Instagram post template for your 3 best products.",
        tool: "Canva AI",
        duration: "60 minutes",
      },
      {
        day: 4,
        task: "Generate 3 different ad copy variants for one product with Prompt 7. Launch a small-budget A/B test in Meta Ads Manager.",
        tool: "Claude.ai + Meta Ads",
        duration: "45 minutes",
      },
      {
        day: 5,
        task: "For an upcoming season or special day, build a campaign plan with Prompt 11. Save the content as a scheduling calendar.",
        tool: "Claude.ai",
        duration: "45 minutes",
      },
      {
        day: 6,
        task: "Send review requests with Prompt 10 to products with the fewest reviews. If your cart abandonment rate is high, set up a recovery message with Prompt 12.",
        tool: "Claude.ai",
        duration: "30 minutes",
      },
      {
        day: 7,
        task: "Review this week's A/B test results. Which ad copy won? Archive the successful prompts as templates.",
        tool: "Meta Ads Manager",
        duration: "30 minutes",
      },
    ],

    growtTeaser:
      "You've systematized your product content and customer communication — that's the start. The real growth comes from lowering your customer acquisition cost, raising your repeat-purchase rate, and opening new channels. With the GROWT Method, you build every component of your e-commerce growth engine, step by step. Take the quiz at growtify.ai/test for your personal plan.",

    ctaHeadline: "Next step: An AI Growth Plan Built for Your E-Commerce Store",
    ctaBody:
      "You've sped up content production. Next comes lowering your customer acquisition cost, shortening the repeat-purchase cycle, and building an operation that scales. Take the free AI Digital Maturity Test at growtify.ai/test — a personal roadmap based on your store and where it stands today.",
  },

  "dental": {
    slug: "dental",
    coverTitle: "The AI Communication & Marketing Guide for Dental Clinics",
    coverSubtitle:
      "Multilingual patient communication, clinic reputation, and treatment education — made systematic with AI",
    sectorIcon: "🦷",

    intro: {
      forWho:
        "This guide is for dentists, orthodontists, and dental clinic owners who struggle to reach international patients, explain the same treatment from scratch every time, and have no active grip on their online reputation. If you want to win patients across borders without a bigger front desk, you're in the right place.",
      whatYouGet: [
        "3 practical scenarios — a multilingual patient communication system, treatment education, and reputation management",
        "5 AI tools — hand-picked for a dental clinic",
        "12 copy-paste prompts — from English/German patient correspondence to Google review replies",
        "A first-7-days checklist — step by step, to get the whole system up and running",
        "A presentation template built for dental tourism",
      ],
      painHook:
        "Dental tourism is a huge opportunity — but clinics keep missing it because of the language barrier and a thin online presence. At the same time, local patients arrive without a clear picture of their treatment, and expectations collide. AI solves both problems at once.",
    },

    sectorContext: {
      whyAiMatters:
        "The global dental tourism market is worth billions and growing fast, with patients crossing borders for the combination of price and quality that clinics abroad can offer. But to win in this market, you need multilingual communication, a strong online reputation, and a systematic patient experience. AI strengthens all three at the same time.\n\nThe picture is shifting locally too: most patients now read Google reviews before they ever pick a clinic. A single unanswered negative review can quietly cost you dozens of would-be patients. With AI, review management and patient communication become a system instead of a scramble.",
      stats: [
        {
          value: "$5.8 billion",
          label:
            "Global dental tourism market size (2023) — one of the fastest-growing segments of medical travel.",
          source: "Statista Dental Tourism Market Report, 2024",
        },
        {
          value: "72%",
          label:
            "Share of patients who read online reviews before choosing a clinic — making reputation management critical.",
          source: "BrightLocal Local Consumer Review Survey, 2024",
        },
        {
          value: "4 languages",
          label:
            "The languages dental tourism patients most often communicate in: English, German, Arabic, and Russian.",
          source: "Patients Beyond Borders Industry Report, 2023",
        },
      ],
      comparison: {
        without: [
          "Hiring a translator to answer foreign patient questions — or muddling through in shaky English",
          "Walking every new patient through the treatment process from scratch — a drain on time and energy",
          "Negative Google reviews left unanswered while new patients quietly walk away",
          "Hours spent putting together a dental tourism package",
        ],
        with: [
          "A foreign patient question comes in, and AI drafts a reply in English, German, or Arabic within a minute",
          "Treatment-education templates are ready — separate ones for implants, veneers, and orthodontics",
          "Google review replies drafted instantly with AI — warm thanks for praise, a professional response to complaints",
          "A dental tourism package presentation, ready in one session, in five languages",
        ],
      },
    },

    scenarios: [
      {
        title: "Scenario 1: A Multilingual Patient Communication System",
        problem:
          "An English message lands in your WhatsApp: asking about price, about the treatment, about how to get there. You couldn't reply — or your reply fell short. The patient booked with another clinic.",
        steps: [
          "List the foreign-patient question types your clinic gets most often (price, treatment, travel, accommodation)",
          "Use Claude to generate ready replies for each question type in English, German, and Arabic",
          "Save the replies with a short code system (e.g. PRICE-EN = the English pricing reply)",
          "When a new question comes in, copy the matching template, add the clinic name and date, and send",
          "For more involved inquiries, feed the question straight to Claude, give it context, and get a tailored reply",
        ],
        promptExample: `You are the international patient coordinator for a dental clinic. Write a professional reply to the patient question below, on the clinic's behalf.

Clinic details:
- Clinic name: [Clinic Name]
- City: [city, country]
- Specialties: [implants, veneers, orthodontics, etc.]
- Price range: [general note — use "competitive pricing," don't give exact figures]
- Package services: [transfer / accommodation / interpreter, etc.]

Patient question: [Paste the question here]
Reply language: [English / German / Arabic / Russian]

The reply should include:
1. A warm, professional greeting
2. A clear answer to the question (for anything uncertain, steer toward "let's go over the details together")
3. A clear next-step CTA (WhatsApp, booking, consultation)
4. A signature (Dr. [Name], clinic name, contact details)

Medically accurate, empathetic, conversion-focused tone.`,
        before: "Answering a foreign patient: 30 minutes plus a translator — or a lost patient",
        after: "Pick a template, personalize it, send: 3-5 minutes, no language barrier",
      },
      {
        title: "Scenario 2: Treatment Plans + Patient Education Automation",
        problem:
          "You explain the same things to every implant patient: how many sessions, the healing time, what to eat, what to avoid. It eats time, it varies from patient to patient — and sometimes details get left out.",
        steps: [
          "Build an education template for the 5 treatments you perform most",
          "Use Claude to generate a patient information document for each treatment, in English and one other language",
          "Turn the documents into a PDF, or send them as a WhatsApp message",
          "Set up a 3-stage message sequence: before treatment, on treatment day, and after",
          "Reuse the same templates for the FAQ section of your website",
        ],
        promptExample: `Prepare a comprehensive patient information document for the dental treatment below.

Treatment: [Implant / Porcelain Veneer / Orthodontics (Clear Aligners) / Teeth Whitening / Root Canal]
Target patient profile: [Local patient / International patient]
Language: [English / German]

The document should include:
1. A treatment summary (2-3 sentences, no technical jargon)
2. Pre-treatment preparation (what the patient should do)
3. What happens on treatment day (step by step, in reassuring language)
4. The healing process and an estimated timeline
5. Diet and activity restrictions
6. When to call us (warning signs that need attention)
7. Long-term care and maintenance advice

Note: keep it medically accurate, clear, and reassuring. Add a "follow your treating dentist's guidance" reminder.`,
        before: "Verbal briefing for every patient: 10-15 minutes, inconsistent, with details forgotten",
        after: "A ready PDF document + message sequence: 2 minutes to send, nothing left out",
      },
      {
        title: "Scenario 3: Clinic Reputation Management",
        problem:
          "There are reviews about your clinic on Google — both glowing and harsh. The positive ones sit unanswered, with no thank-you. The negative ones get a defensive or off-key reply. All of it shapes whether the next patient picks you.",
        steps: [
          "Open your Google Business Profile and pull up the reviews",
          "Use AI to generate a reply template for each review type (positive / neutral / negative)",
          "Spend 15 minutes a week answering that week's reviews — personalizing the templates",
          "Prepare a message template that actively asks happy patients for a review",
          "Produce patient-experience content for social media (with consent)",
        ],
        promptExample: `Write a professional reply to a Google review for my dental clinic.

Clinic name: [Clinic Name]
Dentist: Dr. [Full Name]

Review: [Paste the review here]
Review rating: [1-5 stars]
Review language: [English / Other]

Reply rules:
- Positive review (4-5 stars): genuine thanks, acknowledge any personal detail, invite them back
- Neutral review (3 stars): thanks + an offer to learn what we could improve + an invitation to reach out directly
- Negative review (1-2 stars): say you're sorry for the experience, don't be defensive, invite them to a private conversation to fix it, NEVER share patient information

HIPAA/GDPR compliance: do not use the patient's name or any medical detail in the reply.
Reply: max 150 words, professional but warm.`,
        before: "Reviews left unanswered or answered badly — potential patients lost",
        after: "Fifteen minutes a week, every review answered, reputation actively managed",
      },
    ],

    tools: [
      {
        name: "Claude (claude.ai)",
        description:
          "For multilingual patient correspondence, treatment education documents, and Google review replies.",
        free: true,
        link: "https://claude.ai",
        bestFor: "Patient communication, treatment documents, multilingual replies",
      },
      {
        name: "Google Business Profile (business.google.com)",
        description:
          "Manage your clinic's Google profile — reply to reviews, add photos, keep hours and info up to date.",
        free: true,
        link: "https://business.google.com",
        bestFor: "Review management, local SEO, clinic visibility",
      },
      {
        name: "Canva AI (canva.com)",
        description:
          "Patient education brochures, social media graphics, and clinic promotional materials.",
        free: true,
        link: "https://canva.com",
        bestFor: "Patient brochures, social media, promo graphics",
      },
      {
        name: "Calendly (calendly.com)",
        description:
          "An online booking system — international patients can book in their own time zone.",
        free: true,
        link: "https://calendly.com",
        bestFor: "Online booking, international patient coordination",
      },
      {
        name: "WhatsApp Business (business.whatsapp.com)",
        description:
          "For quick messaging, saved quick-reply templates, and international patient communication.",
        free: true,
        link: "https://business.whatsapp.com",
        bestFor: "Patient communication, quick replies, message templates",
      },
    ],

    prompts: [
      {
        title: "1. International Patient First-Inquiry Reply (English)",
        prompt: `Write a professional response in English to a patient inquiry about dental treatment at our clinic. Clinic: [Name], Location: [City, Country]. Treatment asked about: [implant/veneers/orthodontics]. The response should: welcome warmly, confirm we offer this treatment, mention our general price advantage vs. EU/US (without specific numbers), invite them to a free online consultation, include WhatsApp contact. Max 150 words.`,
        expectedOutput: "A professional English dental inquiry reply, conversion-focused",
      },
      {
        title: "2. Price Quote Correspondence",
        prompt: `Write a price quote message to a patient named [Name] for [treatment type]. Language: [English / German]. Quote: [price + what it covers]. Payment options: [info]. Emphasize why the package delivers value, without making comparisons. 200 words, in a transparent, trust-building tone.`,
        expectedOutput: "A price quote message that's clear and trust-building",
      },
      {
        title: "3. Treatment Plan Explanation — Implant",
        prompt: `Write a patient information note in plain English for [Name], who is scheduled for implant treatment. Cover: how many sessions, the healing time, the temporary tooth, and what to expect from the result. No technical terms — reassuring, confidence-building language. 300 words. End with: "For any questions, get in touch with Dr. [Name]."`,
        expectedOutput: "A reassuring implant treatment information note",
      },
      {
        title: "4. Post-Care Instructions",
        prompt: `Write post-care instructions for a patient after [treatment type: tooth extraction / implant placement / veneer / root canal]. Two versions: English and German. Separate advice for the first 24 hours, the first week, and the first month. Cover diet restrictions, pain management, and when to call. Short, bulleted, simple language.`,
        expectedOutput: "Post-treatment care instructions, in two languages",
      },
      {
        title: "5. Google Review Reply — Positive",
        prompt: `Write a professional thank-you reply to this 5-star review for my clinic: [paste the review]. Clinic name: [name]. Warm but brief, acknowledge any personal detail (if there is one), invite them back. Max 80 words. Do not use the patient's name or any medical detail.`,
        expectedOutput: "A warm, professional positive-review reply",
      },
      {
        title: "6. Google Review Reply — Negative",
        prompt: `Write a reply to this 2-star negative review of my clinic: [paste the review]. Don't be defensive, show empathy, close with an invitation to a private conversation. Clinic name: [name]. Contact: [phone / email]. Max 100 words. Compliance: do not use the patient's name or any medical detail.`,
        expectedOutput: "A professional, empathetic negative-review reply",
      },
      {
        title: "7. Dental Tourism Package Pitch",
        prompt: `Write a package pitch for international patients for [treatment package: e.g. full-mouth restoration]. Language: English. Package contents: [treatments, transfer, accommodation, interpreter support]. Price advantage vs. Europe: [general phrasing, no numbers]. CTA: free consultation. 250 words, trust-focused, with a premium feel.`,
        expectedOutput: "A dental tourism package pitch, in English",
      },
      {
        title: "8. Appointment Reminder Message",
        prompt: `Write a reminder message for a patient named [Name] about tomorrow's [time] appointment. Clinic: [Clinic Name], Address: [address]. Any prep instructions, if relevant: [info — e.g. come on an empty stomach, bring your X-rays]. WhatsApp message format. 3-4 sentences, warm and reminding. Two versions: English and German.`,
        expectedOutput: "An appointment reminder message, in two languages",
      },
      {
        title: "9. Check-Up Appointment Invitation",
        prompt: `It's been [X months] since [last treatment] — write a check-up reminder message for a patient named [Name]. WhatsApp format. Remind them of the treatment, stress why the check-up matters, and make it easy to book with a one-tap prompt. 3-4 sentences, warm tone.`,
        expectedOutput: "A check-up appointment invitation message",
      },
      {
        title: "10. Social Media — Treatment Info Post",
        prompt: `Write an educational Instagram post caption about [dental implants / laminate veneers / Invisalign / teeth whitening]. Goal: inform + build trust in the clinic. Caption: open with a curiosity-sparking question, 3-4 info points, a CTA (book). 150 words, 10 hashtags. No medical claims — information only.`,
        expectedOutput: "An educational dental social media post, hashtags included",
      },
      {
        title: "11. Patient Review Request",
        prompt: `Write a WhatsApp message asking a patient named [Name], whose treatment finished successfully, to leave a Google review. No pressure, genuine, 3-4 sentences. Make the review step easy with a clear prompt. Two versions: English and German.`,
        expectedOutput: "A gentle review request message that lifts review rates",
      },
      {
        title: "12. Clinic Introduction Email",
        prompt: `Write an introduction email to a prospective international patient researching our clinic. Language: English. Clinic: [name, location]. Specialties: [list]. What sets us apart: [experience, equipment, language support]. Dental tourism advantage: [cost savings — without numbers]. CTA: free online consultation. 200 words, professional and trust-building.`,
        expectedOutput: "An introduction email built to attract international patients",
      },
    ],

    checklist: [
      {
        day: 1,
        task: "Sign up for Claude.ai. List the 10 foreign-patient questions your clinic gets most. Use the Prompt 1 format to generate ready English reply templates.",
        tool: "Claude.ai",
        duration: "60 minutes",
      },
      {
        day: 2,
        task: "Update your Google Business Profile (photos, hours, services). Answer this week's reviews with Prompts 5 and 6.",
        tool: "Google Business Profile + Claude.ai",
        duration: "45 minutes",
      },
      {
        day: 3,
        task: "Use Prompts 3 and 4 to generate English/German patient information documents for the 3 treatments you perform most. Save them as PDFs.",
        tool: "Claude.ai",
        duration: "60 minutes",
      },
      {
        day: 4,
        task: "Switch to WhatsApp Business. Save your templates as quick replies. Set up your Calendly booking page.",
        tool: "WhatsApp Business + Calendly",
        duration: "45 minutes",
      },
      {
        day: 5,
        task: "If you're targeting dental tourism, use Prompt 7 to prepare your English package pitch. Add it to your clinic website or Instagram.",
        tool: "Claude.ai + Canva AI",
        duration: "60 minutes",
      },
      {
        day: 6,
        task: "Send a review request with Prompt 11 to your last 10 patients whose treatment is complete.",
        tool: "Claude.ai + WhatsApp Business",
        duration: "30 minutes",
      },
      {
        day: 7,
        task: "Check and answer this week's new reviews. Send a reminder with Prompt 9 to patients due for a 6-month check-up.",
        tool: "Google Business Profile + Claude.ai",
        duration: "30 minutes",
      },
    ],

    growtTeaser:
      "You've systematized patient communication and reputation management. The real growth comes from automating new patient acquisition and building a loyalty system — across social media, SEO, referral networks, and dental tourism channels. The GROWT Method helps you build the whole growth engine, step by step. For your personal plan, head to growtify.ai/test.",

    ctaHeadline: "Next step: An AI Growth Plan Built for Your Clinic",
    ctaBody:
      "You've set up your communication and reputation system. Next comes automating your new-patient flow, opening a dental tourism channel, and lifting your return-visit rate. Take the free AI Digital Maturity Test at growtify.ai/test — a roadmap built for your clinic, in 5 minutes.",
  },

  "accounting": {
    slug: "accounting",
    coverTitle: "The AI Automation Guide for Accountants",
    coverSubtitle:
      "From month-end close to keeping up with regulation — hand the repetitive work over to AI",
    sectorIcon: "📊",

    intro: {
      forWho:
        "This guide is for accountants, bookkeepers, tax advisors, and accounting-firm owners who live through the month-end close chaos, struggle to keep up with regulatory and tax-filing changes, and never quite find the time for the advisory work that actually grows their practice.",
      whatYouGet: [
        "3 practical scenarios — document-processing automation, keeping up with regulation, and the monthly client report",
        "5 AI tools — hand-picked for an accounting practice",
        "12 copy-paste prompts — from document classification to a tax-planning note",
        "Your first 7-day checklist — step by step, to weave the system into your office",
        "A before → after comparison — the concrete time you save on month-end close",
      ],
      painHook:
        "Month-end is coming: hundreds of documents, last-minute filings, clients calling. Everything at once — and no hours left for actual advisory work. AI lightens that document load, so you can focus on the value-added work only you can do.",
    },

    sectorContext: {
      whyAiMatters:
        "Accounting and tax advisory are consistently named among the professions that stand to gain the most from AI — and that's an opportunity, not a threat. Processing repetitive documents, data entry, and standard reporting can all be automated with AI, freeing you up for advisory work, strategy, and client relationships. Tax and reporting rules change often, and keeping up with them — then explaining them to clients in plain language — is a job all on its own.\n\nThe Big 4 firms (Deloitte, PwC, EY, KPMG) already lean heavily on AI for document analysis and reporting. For small and mid-sized practices, the same tools are now available for free or at very low cost.",
      stats: [
        {
          value: "40%",
          label:
            "Share of an accounting professional's time spent on data entry and document processing — AI can shrink that dramatically.",
          source: "Accenture Finance Report, 2025",
        },
        {
          value: "4x",
          label:
            "How much faster accounting firms using AI tools produce reports — same quality, a fraction of the time.",
          source: "AICPA Digital CPA Survey, 2024",
        },
        {
          value: "78%",
          label:
            "Small-business clients who expect more proactive advice from their accountant — AI frees up that time.",
          source: "Sage SME Accounting Report, 2023",
        },
      ],
      comparison: {
        without: [
          "Hundreds of invoices and documents classified and matched by hand",
          "Separate hours spent tracking regulatory changes — and sometimes missing them",
          "Every monthly client report built from scratch, every single time",
          "No time left to advise clients — just the filings get done",
        ],
        with: [
          "You hand the document list to AI; classification and a summary are ready in minutes",
          "You summarize regulatory updates with AI and send clients a ready-to-go briefing",
          "The monthly client report template comes back in 20 minutes; personalizing it takes 10",
          "The repetitive work goes to AI — you focus on advisory work and growth opportunities",
        ],
      },
    },

    scenarios: [
      {
        title: "Scenario 1: Document Processing & Classification Automation",
        problem:
          "A client sends over hundreds of invoices, receipts, and bank slips — every one a different format, some barely legible. Classifying them and matching them to ledger accounts takes hours. This isn't work that speeds up on its own — but AI can take a meaningful chunk of the process off your hands.",
        steps: [
          "Pull the text out of the documents with an OCR tool (Google Lens, Adobe Scan, or similar)",
          "Paste the extracted text into Claude and use the classification prompt below",
          "AI classifies each document with a type, amount, date, and suggested account code",
          "Review the classification, fix anything off, and import it into your accounting software",
          "Have it draft a template message to flag missing or incorrect documents back to the client",
        ],
        promptExample: `You are an experienced accounting professional. Classify the document list below and suggest a ledger entry for each one.

Client type: [Small business / Sole trader / Limited company / Corporation]
Period: [Month/Year]
Industry: [Sector]

Document list (one document per line):
[Document 1: OCR text or manual entry]
[Document 2: ...]
[...]

For each document, give:
1. Document type (invoice / receipt / bank slip / bank statement / contract / other)
2. Date
3. Amount (showing net and gross / tax-inclusive separately)
4. Counterparty name
5. Suggested account code (per your standard chart of accounts)
6. A note if needed (missing information, anything to watch for)

Return the output as a table. Mark anything you're unsure about as "needs review".`,
        before: "Classifying 100 documents: 3-4 hours of manual work",
        after: "OCR + AI classification + review: 45-60 minutes",
      },
      {
        title: "Scenario 2: Keeping Up With Regulation & Client Briefings",
        problem:
          "A tax rule changed, a new filing requirement was published, an e-invoicing threshold dropped. Just tracking those changes is a job — and then explaining them to clients in plain language is a second job. More often than not it's either late or under-explained.",
        steps: [
          "Follow your tax authority's bulletins and the major professional bodies' updates",
          "Give the new regulation text or a summary of it to Claude",
          "AI produces a clear client briefing you can send out",
          "Polish it in your firm's voice and tailor it to the client type",
          "Use your email list to send it to all clients at once",
        ],
        promptExample: `Turn the tax/regulatory change below into a clear client briefing.

Regulation/notice summary: [Paste the text or summarize it briefly]
Effective date: [Date]
Client types affected: [Which businesses are impacted]

Prepare a client briefing:
- Headline: attention-grabbing but not technical
- What changed: 3-4 bullet points, plain language, no jargon
- What our client needs to do: concrete steps, with dates
- Deadline warning: clear and emphasized
- A "happy to help with this" closing line

Format: email body, max 300 words, professional but accessible.
Note: add a reminder to "speak with your accountant for detailed advice specific to your situation". This is general information, not tax advice.`,
        before: "Reading the regulation + writing the client letter: 2-3 hours (for all clients)",
        after: "Regulation summary + AI letter + editing: 30-45 minutes, sent in bulk",
      },
      {
        title: "Scenario 3: The Monthly Client Financial Report",
        problem:
          "You want to send every client a monthly financial report — but there's never time to prepare one. So it either doesn't go out at all, or it goes out far too late. The client has no idea what's been done or where things stand.",
        steps: [
          "Pull the client's basic monthly figures: revenue, expenses, tax, key line items",
          "Give those figures to Claude and use the report prompt below",
          "AI produces a report draft — an executive summary, data for charts, recommendations",
          "Add your own observations and any warnings",
          "Save it as a PDF and send it to the client — once a month, 20 minutes per client",
        ],
        promptExample: `Using the data below, prepare a client financial report summary for [Month/Year].

Client: [Company name]
Industry: [Sector]
Period: [Month/Year]

Financial data:
- Total revenue: [amount]
- Total expenses: [amount]
- Net profit/loss: [amount]
- Tax liability: [amount]
- Top 3 expense items: [list]
- Top 3 revenue items: [list]
- Change vs. last month: [+/- %]
- Bank balance (period end): [amount]
- Overdue receivables: [amount]
- Upcoming payment obligations: [date + amount]

The report should include:
1. Executive summary (3-4 sentences, non-technical language)
2. Period performance (compared with last month)
3. 2-3 financial points worth watching
4. 2 recommendations for the next period
5. Upcoming key dates (filings, tax payments, etc.)

In plain language the client will understand, with minimal accounting jargon.`,
        before: "Preparing a monthly report: 1-2 hours/client (often skipped)",
        after: "Data entry + AI draft + review: 20-25 minutes/client",
      },
    ],

    tools: [
      {
        name: "Claude (claude.ai)",
        description:
          "The most capable AI assistant for document analysis, summarizing regulation, client letters, and reporting.",
        free: true,
        link: "https://claude.ai",
        bestFor: "Document classification, regulation summaries, client reports, advisory notes",
      },
      {
        name: "ChatGPT (chatgpt.com)",
        description:
          "A solid alternative for drafting text and getting help with spreadsheet formulas.",
        free: true,
        link: "https://chatgpt.com",
        bestFor: "Spreadsheet formulas, alternative report text, quick Q&A",
      },
      {
        name: "Adobe Scan / Google Lens",
        description:
          "Free tools that turn paper documents into digital text with OCR — the first step before AI processing.",
        free: true,
        link: "https://www.adobe.com/acrobat/mobile/scanner-app.html",
        bestFor: "Scanning invoices and receipts, extracting text with OCR",
      },
      {
        name: "Notion AI (notion.so)",
        description:
          "An AI-assisted tool for client files, task tracking, and managing your firm's internal processes.",
        free: false,
        link: "https://www.notion.so",
        bestFor: "Client CRM, task tracking, internal process documentation",
      },
      {
        name: "Microsoft Copilot (Excel AI)",
        description:
          "AI-assisted analysis inside Excel — formula generation, automatic charts, and summary reporting.",
        free: false,
        link: "https://www.microsoft.com/microsoft-365/copilot",
        bestFor: "Financial statement analysis, automatic charts, pivot table help",
      },
    ],

    prompts: [
      {
        title: "1. Document Classification",
        prompt: `Classify the document list below using standard accounting practice. For each document, give: document type, date, amount, counterparty, suggested account code, and a note. Return it as a table. [Paste the document list here]`,
        expectedOutput: "A structured document-classification table with suggested account codes",
      },
      {
        title: "2. Invoice Summary Report",
        prompt: `Produce a summary report for this period's invoices: [invoice list]. Give net and gross totals, grouping by supplier, and the 5 largest spend items. Table plus a short comment.`,
        expectedOutput: "An invoice summary table and spend analysis",
      },
      {
        title: "3. Regulation Summary — Client Letter",
        prompt: `Turn this regulatory change into a client briefing letter: [regulation text or summary]. Effective: [date]. 300 words, no technical jargon, with the client's required actions stated clearly. Add a "speak with your accountant for advice specific to your situation" reminder. General information, not tax advice.`,
        expectedOutput: "A ready-to-send regulatory briefing letter for clients",
      },
      {
        title: "4. Client Briefing — New Requirement",
        prompt: `The e-invoicing threshold has been updated to [amount]. [Scope, date, exemption details]. Write a short email explaining this change to a small-business client. What they need to do now, the deadline, and what our firm will handle — clear, simple, 200 words.`,
        expectedOutput: "A client email explaining the new requirement",
      },
      {
        title: "5. Monthly Financial Report",
        prompt: `Prepare a financial report for [Company name] for [Month/Year]. Revenue: [amount], Expenses: [amount], Net: [amount], Key changes: [list]. Executive summary (3 sentences), period review, 2 recommendations, upcoming key dates. Minimal technical jargon.`,
        expectedOutput: "A ready-to-send monthly financial report for the client",
      },
      {
        title: "6. Tax-Planning Note",
        prompt: `Prepare a [Year] tax-planning note for a [client type and industry]. Current tax position: [summary]. Available reliefs and deductions: [if any]. Give 3 concrete action recommendations — short-term (this month), mid-term (3 months), long-term (year-end). Technical but readable. Note: general guidance, to be confirmed against the client's circumstances.`,
        expectedOutput: "Client-specific tax-planning action notes",
      },
      {
        title: "7. Client Advisory Recommendation",
        prompt: `Based on this financial picture, prepare a proactive advisory recommendation for [client]: [summary financial position]. Three points: a growth opportunity, a risk warning, and an area that could be optimized. Format it for an advisory meeting — short and compelling.`,
        expectedOutput: "Proactive advisory notes, ready for a client meeting",
      },
      {
        title: "8. Filing Checklist",
        prompt: `Prepare a period checklist for a [VAT / payroll / corporation tax / income tax] filing. Which documents are needed, which accounts to check, which reliefs and deductions to consider, and the deadline. For internal use, itemized, in a checkbox format.`,
        expectedOutput: "A filing-prep checklist, ready for internal use",
      },
      {
        title: "9. Receivables Reminder",
        prompt: `On behalf of [client], write a reminder for an overdue receivable of [amount] from [debtor company], due [date]. First reminder: polite and professional. Second reminder: firmer, with a hint of escalation. Give both versions.`,
        expectedOutput: "A two-stage overdue-receivables reminder letter",
      },
      {
        title: "10. Period Close Report",
        prompt: `Prepare a [period: month/quarter/year] close report. Data: [summary]. Close-checklist status: [done/outstanding]. Filing status: [info]. A close summary letter for the client: 200 words — what was done, the outcome, and what's next.`,
        expectedOutput: "A period close summary report and client letter",
      },
      {
        title: "11. Payroll / Statutory Rate Update",
        prompt: `Notice of a change to minimum wage / statutory payroll rates: [change detail, effective date]. Write a briefing letter to send to clients who employ staff. What the employer needs to do, the impact, and the deadline — 200 words, clear and actionable.`,
        expectedOutput: "A payroll-rate update briefing for employer clients",
      },
      {
        title: "12. Annual Review Summary",
        prompt: `Prepare a [Year] year-in-review summary for [client]. Data: [annual revenue, expenses, profit, tax, key developments]. The year in review, lessons learned, and 3 priority recommendations for next year. Formatted for an annual meeting presentation, 1 page.`,
        expectedOutput: "An annual review summary, ready for a client meeting",
      },
    ],

    checklist: [
      {
        day: 1,
        task: "Sign up for Claude.ai. Take last month's client document list and run a classification test with Prompt 1. Compare the result with your current system.",
        tool: "Claude.ai",
        duration: "60 minutes",
      },
      {
        day: 2,
        task: "Turn the latest tax/regulatory change into a client letter with Prompt 3. Send it to one client as a test and gather feedback.",
        tool: "Claude.ai",
        duration: "45 minutes",
      },
      {
        day: 3,
        task: "Generate a monthly financial report draft for your 3 largest clients with Prompt 5. Add your own assessment and review the result.",
        tool: "Claude.ai",
        duration: "60 minutes",
      },
      {
        day: 4,
        task: "Set up Adobe Scan or Google Lens. Test the paper-document workflow — OCR → Claude → classification.",
        tool: "Adobe Scan + Claude.ai",
        duration: "45 minutes",
      },
      {
        day: 5,
        task: "Prepare a checklist for the upcoming filing period with Prompt 8. Fold it into your firm's standard process.",
        tool: "Claude.ai",
        duration: "30 minutes",
      },
      {
        day: 6,
        task: "Prepare and send reminder letters with Prompt 9 for clients with overdue receivables.",
        tool: "Claude.ai",
        duration: "30 minutes",
      },
      {
        day: 7,
        task: "Review the week's AI experiments. Which processes sped up the most? Pick the 3 prompts to add permanently to your firm's workflow.",
        tool: "Claude.ai",
        duration: "30 minutes",
      },
    ],

    growtTeaser:
      "You've handed the bulk of the repetitive work to AI and systematized your client reporting. The real opportunity now is to deepen your advisory work and grow your firm's capacity. The GROWT Method helps you manage that shift step by step — from technical processes to strategic advisory. Take the quiz at growtify.ai/test for your personal plan.",

    ctaHeadline: "Next step: An AI Transformation Plan Built for Your Firm",
    ctaBody:
      "You've sped up document processing and reporting. Next comes growing your client portfolio, increasing advisory revenue, and scaling your firm's operations. Take the free AI Digital Maturity Test at growtify.ai/test — a roadmap built for your firm, in 5 minutes.",
  },

  "pharmacy": {
    slug: "pharmacy",
    coverTitle: "The AI Inventory, Customer & Content Guide for Pharmacists",
    coverSubtitle: "Demand forecasting, chronic-patient follow-up, and e-pharmacy content — systematize them all.",
    sectorIcon: "💊",

    intro: {
      forWho:
        "This guide is for independent pharmacists, pharmacy owners, and pharmacy-chain managers who leave inventory decisions to gut feel, track chronic patients by hand, and keep missing the e-pharmacy and online-content opportunity. If you want a systematic way to run those three jobs without adding hours to your week, you're in the right place.",
      whatYouGet: [
        "3 practical scenarios — inventory and demand forecasting, e-pharmacy content production, and a customer loyalty system",
        "5 AI tools — hand-picked for pharmacy operations",
        "10 copy-paste prompts — from product descriptions to chronic-patient follow-up",
        "Your first 7-day checklist — step by step, to weave the system into your pharmacy",
        "Mandatory-warning templates — automate the required disclaimers on medication content",
      ],
      painHook:
        "The seasons turn, but you can never quite tell which products to stock up on, or by how much. You want to send chronic patients regular refill reminders, but there's no time. And e-pharmacy content is a job all its own. AI solves all three at once.",
    },

    sectorContext: {
      whyAiMatters:
        "Pharmacy is at a critical crossroads in its digital shift. E-pharmacy is growing, customers research online before they ever walk in, and chronic-patient management matters more every year. AI sits right in the middle of that change, putting serious tools in the hands of independent pharmacists.\n\nLarge chains like CVS and Walgreens report 20-30% cost reductions from AI-driven inventory optimization. For independent pharmacists, those same tools are now within reach — and they create a real competitive edge.",
      stats: [
        {
          value: "23%",
          label: "Share of medication inventory wasted in pharmacies — accurate forecasting can cut this dramatically.",
          source: "WHO Pharmaceutical Management Report, 2023",
        },
        {
          value: "$30B+",
          label: "Projected global online pharmacy market by the mid-2020s — growth in the digital channel is accelerating.",
          source: "Statista Digital Health Market Outlook, 2024",
        },
        {
          value: "67%",
          label: "Effectiveness gain in chronic-patient medication adherence from reminder systems — regular contact makes the difference.",
          source: "Journal of Medical Internet Research, 2023",
        },
      ],
      comparison: {
        without: [
          "Inventory decisions rest on last year's numbers and gut feel — either overstock or stockouts",
          "Chronic patients only remember once they've run out — adherence drops and patients drift away",
          "Producing e-pharmacy or Instagram content is a separate time sink",
          "Required disclaimers and usage information get written from scratch for every product",
        ],
        with: [
          "Feed in past sales data plus seasonal factors and AI produces a demand forecast",
          "Chronic-patient reminder messages are AI-ready and run on an automatic loop",
          "E-pharmacy product descriptions and Instagram content get produced quickly with AI",
          "Medication-info templates and required disclaimers are built once and reused",
        ],
      },
    },

    scenarios: [
      {
        title: "Scenario 1: Inventory & Demand Forecasting",
        problem:
          "Cold-and-flu season is coming, but how much vitamin C and how many antihistamines do you order? Last year you over-bought and it expired. Order light this year and you'll run out. Leaving that call to gut feel costs you money and customer satisfaction both.",
        steps: [
          "Pull last year's sales data for the same period (at least 3 months, by product)",
          "Add seasonal factors and your local demographic profile",
          "Give Claude the data and run the demand-forecast prompt",
          "AI produces a prioritized list and estimated order quantities",
          "Sanity-check the result against your own observations and adjust — but make the call from data",
        ],
        promptExample: `You are an experienced pharmacy inventory-management specialist. Analyze the data below and prepare a stock recommendation for the upcoming period.

Pharmacy profile:
- Location type: [City center / Suburban / Rural]
- Patient profile: [Mostly older / Young families / Mixed]
- Nearby: [Hospital / Clinic / School / Industrial site, etc.]

Last year's sales data for the same period:
[Product name — Monthly units sold — Average price]
[Product 2 — ...]
[...]

Special factors this period:
- Season: [Spring / Summer / Fall / Winter]
- Known outbreak/illness: [note if any]
- Local development: [School opening / New employer in the area, etc.]

Please produce:
1. Estimated order quantity for the 10 most critical products (with reasoning)
2. Products at risk of overstock (suggest reducing)
3. Products at risk of stockout (suggest increasing)
4. 3 seasonal opportunity products for this period

Note: forecasts are based on historical data — the final decision rests with the pharmacist.`,
        before: "Inventory call: gut feel plus trying to remember last year — guesswork that misses",
        after: "Data + AI analysis + pharmacist sign-off: systematic, data-driven inventory decisions",
      },
      {
        title: "Scenario 2: E-Pharmacy Content Production",
        problem:
          "You've opened an e-pharmacy channel, or you're thinking about it. Hundreds of products need descriptions, usage information, and required disclaimers. Writing them one by one takes weeks.",
        steps: [
          "Start by identifying your 20 best-selling OTC products",
          "For each, pull the key facts from the product information (package insert / summary of product characteristics)",
          "Give Claude that information and use the content-production prompt below",
          "AI produces a product description with the required disclaimers — you review it and publish",
          "Save the approved ones as templates and adapt them quickly for similar categories",
        ],
        promptExample: `Prepare e-pharmacy product-page content for the OTC medication / health product below.

Product details:
- Product name: [Product name]
- Category: [Pain relief / Vitamin / Skincare / Cold & flu / Digestive, etc.]
- Active ingredient: [if any]
- Formulation: [Tablet / Capsule / Syrup / Cream / etc.]
- Indication: [what it's used for]
- Dosage: [general usage dose]
- Contraindications: [who should not use it]
- Side effects: [the important ones]
- Storage conditions: [info]

The content should include:
1. Product title (SEO-friendly, max 60 characters)
2. Short description (2-3 sentences, consumer-friendly)
3. Detailed product description (300 words, benefit-focused but careful language)
4. Usage information (itemized, easy to understand)
5. Warnings and legal disclaimer (mandatory)

MANDATORY DISCLAIMER — append to the end of every piece of content:
"This information is provided for general educational purposes only. Consult your pharmacist or physician about medication use. Even if a product is available without a prescription, it may not be suitable for everyone."`,
        before: "Each product's content: 30-45 minutes — including the compliance check",
        after: "Template + AI production + pharmacist review: 10-15 minutes per product",
      },
      {
        title: "Scenario 3: Chronic-Patient Follow-Up & Loyalty",
        problem:
          "You have diabetes, hypertension, and thyroid patients. You want to remind them before they run out, but manual tracking just doesn't happen. Some patients aren't loyal to any one pharmacy — and there's no loyalty because there's no communication.",
        steps: [
          "Build your chronic-patient list (name, medication, course length, last refill date)",
          "Estimate the approximate run-out date for each patient",
          "Use Claude to produce personalized reminder-message templates",
          "Save them as quick replies in WhatsApp Business",
          "Spend 15 minutes a week: message the patients running out that week",
        ],
        promptExample: `Prepare a WhatsApp reminder-message template for my patient on long-term medication.

Patient details:
- Name: [Name — for the template only; you'll fill it in for the real message]
- Medication category: [Hypertension / Diabetes / Thyroid / Cholesterol / Other]
- Course length: [Monthly / 3-month]
- Last refill date: [Date]
- Estimated run-out: [Date]

Please prepare these message types:
1. A reminder 1 week before they run out (gentle, informative)
2. An urgent reminder 2 days before they run out (more direct)
3. A win-back message after they've run out (3-5 days later)
4. A seasonal health tip (medication-related — e.g. diabetes + fasting periods)

Each message: max 3 sentences, warm, and include the pharmacy name and contact details.
NOTE: Add the disclaimer "Consult your doctor before changing any medication" in the appropriate places.`,
        before: "Chronic-patient follow-up: manual, inconsistent, mostly not happening",
        after: "Template + 15 minutes a week = systematic reminders and rising loyalty",
      },
    ],

    tools: [
      {
        name: "Claude (claude.ai)",
        description: "For e-pharmacy content, patient-communication templates, inventory analysis, and summarizing regulatory guidance.",
        free: true,
        link: "https://claude.ai",
        bestFor: "Product descriptions, patient messages, inventory analysis, disclaimer text",
      },
      {
        name: "WhatsApp Business (business.whatsapp.com)",
        description: "For chronic-patient reminders, campaign announcements, and quick-reply templates.",
        free: true,
        link: "https://business.whatsapp.com",
        bestFor: "Patient reminders, quick replies, broadcast messages",
      },
      {
        name: "Google Maps / Business Profile",
        description: "Manage your pharmacy's Google profile — respond to reviews and keep your hours up to date.",
        free: true,
        link: "https://business.google.com",
        bestFor: "Local visibility, review management, keeping pharmacy details current",
      },
      {
        name: "Canva AI (canva.com)",
        description: "Health content for Instagram, campaign graphics, and patient-information leaflets.",
        free: true,
        link: "https://canva.com",
        bestFor: "Social media graphics, campaign posters, patient-information leaflets",
      },
      {
        name: "Notion (notion.so)",
        description: "For your chronic-patient list, inventory tracking, and pharmacy workflow management.",
        free: true,
        link: "https://notion.so",
        bestFor: "Patient lists, inventory tracking, process management",
      },
    ],

    prompts: [
      {
        title: "1. OTC Product Description",
        prompt: `Write an e-pharmacy / Instagram description for the OTC product [product name]. Category: [info]. What it's for: [indication]. Who can use it: [target]. Who shouldn't: [contraindication summary]. 200 words, consumer-friendly language, with the mandatory disclaimer at the end: "Consult your pharmacist before use."`,
        expectedOutput: "An OTC product description with the required disclaimer",
      },
      {
        title: "2. Drug-Interaction Warning Note",
        prompt: `Prepare an interaction warning for a patient taking [Drug A] and [Drug B]. Known interaction: [info]. Keep it short, clear, and worded to be taken seriously without causing panic. End with the prompt: "Let your doctor or pharmacist know about this." WARNING: this text must not be used without a pharmacist's review.`,
        expectedOutput: "A drug-interaction warning note for the patient",
      },
      {
        title: "3. Chronic-Patient Refill Reminder",
        prompt: `Write a WhatsApp reminder for my patient [Name], who is on medication for [diabetes/hypertension/thyroid], letting them know they're about to run out. [X days] left until they run out. 2-3 sentences, warm, including the pharmacy name and phone number. Add the note: "Contact your doctor about any medication change or side effect."`,
        expectedOutput: "A personalized medication-refill reminder message",
      },
      {
        title: "4. Seasonal Campaign Copy",
        prompt: `Write pharmacy campaign copy for [cold-and-flu season / a holiday period / summer / back-to-school]. Featured product or category: [info]. Platform: [Instagram / WhatsApp / in-store poster]. 3 versions: short (30 words), medium (80 words), long (150 words). A health-advice tone — informative, not a hard sell.`,
        expectedOutput: "Seasonal health-campaign content in 3 formats",
      },
      {
        title: "5. Google Profile Description",
        prompt: `Write a Google Business Profile description for our pharmacy. Pharmacy name: [name]. Area: [neighborhood/district]. Features: [24-hour / automation system / consultation service / e-prescription / Other]. 150 words, including local SEO keywords, trustworthy and warm.`,
        expectedOutput: "A Google Business Profile description",
      },
      {
        title: "6. Out-of-Stock Message",
        prompt: `Our [product name] is almost out / temporarily out of stock. Write a WhatsApp message for a customer who asks about it or buys it regularly. 2 versions: 1) suggest an alternative product, 2) offer a "we'll let you know when it's back in" option. Warm, solution-oriented rather than apologetic.`,
        expectedOutput: "An out-of-stock customer communication message",
      },
      {
        title: "7. Loyalty Program Message",
        prompt: `Write an invitation message for our pharmacy's loyalty program. Program perks: [points system / member discounts / priority stock / chronic-patient reminders]. WhatsApp message: 3-4 sentences, benefit-focused. Instagram post version: 100 words + 8 hashtags.`,
        expectedOutput: "A loyalty-program announcement message for two channels",
      },
      {
        title: "8. Medication Usage Information",
        prompt: `Prepare a usage-information note to hand to a patient for [medication/product name]. Dose: [info]. When to take it: [before/after meals, etc.]. For how long: [info]. Storage: [info]. Important warnings: [if any]. Short, itemized, plain language, in a format that fits on an A5 sheet. End with: "For any questions, ask your pharmacist."`,
        expectedOutput: "A patient-facing medication usage-information note",
      },
      {
        title: "9. Prescription Renewal Reminder",
        prompt: `Write a prescription-renewal reminder for patient [Name], who regularly fills a prescription medication. [X weeks] left until the prescription expires. Remind them to see their doctor, and note that once it's renewed they can pick it up at the pharmacy. WhatsApp: 2-3 sentences, helpful tone.`,
        expectedOutput: "A prescription-renewal reminder message",
      },
      {
        title: "10. Instagram Health-Tip Post",
        prompt: `Write an Instagram health-tip post about [topic: flu prevention / diabetes management / storing medication in summer heat / medication use during fasting]. Educational, reassuring, showcasing your pharmacy expertise. Caption: 150 words, 10 hashtags. WARNING: this is informational, not medical advice — include that note in the content.`,
        expectedOutput: "An educational health Instagram post, disclaimer included",
      },
    ],

    checklist: [
      {
        day: 1,
        task: "Sign up for Claude.ai. Generate product descriptions for your 10 best-selling OTC products with Prompt 1. Update your Google Business Profile with Prompt 5.",
        tool: "Claude.ai + Google Business Profile",
        duration: "60 minutes",
      },
      {
        day: 2,
        task: "Move to WhatsApp Business. Generate chronic-patient reminder templates with Prompt 3 and save them as quick replies.",
        tool: "Claude.ai + WhatsApp Business",
        duration: "45 minutes",
      },
      {
        day: 3,
        task: "Save your chronic-patient list in Notion. Identify the patients running out this month and send reminders with Prompt 3.",
        tool: "Notion + WhatsApp Business",
        duration: "45 minutes",
      },
      {
        day: 4,
        task: "Sign up for Canva. Generate campaign copy for the upcoming season with Prompt 4. Create the graphics with Canva AI.",
        tool: "Claude.ai + Canva AI",
        duration: "60 minutes",
      },
      {
        day: 5,
        task: "Pull last year's sales data for the same period. Run the AI analysis with the 'Inventory & Demand Forecasting' prompt.",
        tool: "Claude.ai",
        duration: "60 minutes",
      },
      {
        day: 6,
        task: "Write 3 health-tip posts for your Instagram account with Prompt 10. Create the graphics with Canva AI and schedule them.",
        tool: "Claude.ai + Canva AI",
        duration: "45 minutes",
      },
      {
        day: 7,
        task: "Review the week's results. Which messages got responses? Prepare a loyalty-program announcement with Prompt 7.",
        tool: "Claude.ai",
        duration: "30 minutes",
      },
    ],

    growtTeaser:
      "You've made inventory management data-driven, systematized chronic-patient communication, and started producing e-pharmacy content. The real growth opportunity is connecting your digital channels (Instagram, Google, e-pharmacy) into one fully integrated system and increasing customer lifetime value. Plan those steps with the GROWT Method. For your personal plan, take the quiz at growtify.ai/test.",

    ctaHeadline: "Next step: An AI Growth Plan Built for Your Pharmacy",
    ctaBody:
      "You've sped up inventory, patient communication, and content production. Next comes integrating your digital channels, accelerating e-pharmacy growth, and scaling customer loyalty. Complete the free AI Digital Maturity Test at growtify.ai/test — your pharmacy's tailored roadmap, in 5 minutes.",
  },

  "tourism": {
    slug: "tourism",
    coverTitle: "The AI Guide for Tourism Professionals",
    coverSubtitle:
      "Multilingual 24/7 service, personalized tour plans, and booking automation — all in one guide",
    sectorIcon: "✈️",

    intro: {
      forWho:
        "This guide is for tour operators, boutique hotel owners, and travel agencies who are still answering a foreign guest's WhatsApp message at 2 a.m., planning every itinerary by hand, and falling behind on TripAdvisor and Google reviews. If you want to deliver multilingual, around-the-clock service without a big team, you're in the right place.",
      whatYouGet: [
        "5 AI tools — hand-picked for tourism operations (Claude, ChatGPT, ManyChat, Calendly, and Canva AI)",
        "3 practical scenarios — a multilingual chatbot, personalized tour planning, and review management",
        "10 copy-paste prompts — from booking confirmations to full itineraries, everything's ready to go",
        "Your first 7-day checklist — step by step, to stand up a multilingual system from scratch",
        "Templates in 5 languages — ready-made messages in English, Spanish, German, French, and Arabic",
      ],
      painHook:
        "A Spanish guest just messaged you. A German traveler wants a custom tour. An English question is sitting in your Instagram DMs. Everyone wants an answer right now — but you're one person. AI takes that multilingual communication on, around the clock, so you can focus on designing the experience.",
    },

    sectorContext: {
      whyAiMatters:
        "International tourism has rebounded past 1.4 billion arrivals a year, and the vast majority of those travelers research online before they ever book. The competition is no longer won on price alone — it's won on response speed and a personalized experience. Multilingual, instant, consistent communication is nearly impossible to deliver by hand; with AI, even a one-person operation can compete with the big agencies.\n\nBooking.com, Airbnb, and the major tour operators have used AI chatbots to lift booking conversion by as much as 30%. The same tools are now within reach of independent operators, boutique hotels, and guides. The difference is simply the competitive edge between those who set this up systematically and those who don't.",
      stats: [
        {
          value: "74%",
          label:
            "Travelers who expect a response from a business in under an hour — wait too long and the booking goes to your competitor.",
          source: "Google Travel Study, 2024",
        },
        {
          value: "5 languages",
          label:
            "Roughly the number of languages needed to cover the bulk of international inbound travelers: English, Spanish, German, French, and Arabic.",
          source: "UNWTO World Tourism Barometer, 2024",
        },
        {
          value: "3.2x",
          label:
            "The repeat-booking rate of operators who offer a personalized tour experience — many times higher than for a generic, off-the-shelf tour.",
          source: "Skift Travel Trends Report, 2023",
        },
      ],
      comparison: {
        without: [
          "Half your incoming messages get a late reply — or none at all — and bookings slip away",
          "Every itinerary is written from scratch for each customer, burning hours",
          "Multilingual communication runs on translation apps and guesswork",
          "TripAdvisor and Google reviews get answered erratically, with some left untouched",
        ],
        with: [
          "A chatbot answers in 5 languages around the clock, and only the complex questions reach you",
          "A personalized itinerary tailored to the customer's profile is ready in 10 minutes with AI",
          "Every message and piece of content is translated into 5 languages at native quality",
          "Every review gets a professional, personal reply within 24 hours",
        ],
      },
    },

    scenarios: [
      {
        title: "Scenario 1: A 5-Language AI WhatsApp/Instagram Chatbot",
        problem:
          "Questions pour in all day across WhatsApp, Instagram DMs, and email: 'What's included in this tour?', 'How much?', 'How do I book?', 'Can kids come along?'. Every one in a different language, every one the same question. By the time you reply, 40% of those customers have moved on to a competitor.",
        steps: [
          "List your 20 most-asked questions (an FAQ) and write the answer to each one in a single language",
          "Give that FAQ to Claude and have it translated into 5 languages (EN, ES, DE, FR, AR)",
          "Set up a chatbot with ManyChat or the WhatsApp Business API — load the ready answers for each question",
          "Add a 'live support' handoff for complex questions, so only the ones that genuinely need you reach you",
          "Once a week, review the questions the bot couldn't answer and add them to the FAQ — keep the system improving",
        ],
        promptExample: `Build chatbot reply templates for my tour business by translating the FAQ below into 5 languages.

Business profile:
- Type: [Day tours / Multi-day tours / Boutique hotel / Guiding]
- Location: [City/region]
- Tone: [Warm / Professional / Mixed]

FAQ (in English):
1. [Question 1] — [Answer]
2. [Question 2] — [Answer]
[...]

For each FAQ entry, produce:
- EN: Warm, clear answer (max 3 sentences), traveler-focused
- ES: Natural Spanish, friendly tone
- DE: Clear German, detail-oriented
- FR: Polished French, welcoming
- AR: Standard Arabic, respectful tone

End every answer with a handoff line: "For more details or to book: [contact]".
Note: leave variables like price, date, and party size as [placeholders].`,
        before: "Replies: once an hour during the day, nothing overnight — bookings lost",
        after: "24/7 instant replies in 5 languages + only the decision-level questions reach you",
      },
      {
        title: "Scenario 2: Generating Personalized Itineraries",
        problem:
          "A customer reaches out: '3 days in the Highlands, 2 kids, 1 senior, walking is tough for us' — or '1 week in Rome, heavy on history and food'. Building a custom plan for each one takes hours. And when you fall back on the standard package instead, your sales drop.",
        steps: [
          "Add 5-6 questions to your booking form: length of stay, group type, interests, physical constraints, budget",
          "Feed that information to Claude and use the itinerary prompt below",
          "AI produces a detailed day-by-day plan — places, restaurants, transport, timing",
          "Refine the plan with your own local knowledge and price it",
          "Send it to the customer as a PDF or shareable link — booking close rates can jump 2-3x",
        ],
        promptExample: `Build a personalized [X-day] [destination] itinerary based on the customer profile below.

Customer profile:
- Group: [Party size, age mix, any children/seniors]
- Interests: [History / Food / Nature / Adventure / Shopping / Culture]
- Budget level: [Economy / Mid-range / Luxury]
- Physical constraints: [Walking difficulty / accessibility / other]
- Special requests: [if any]
- Dates: [travel window]

The plan should include:
1. A day-by-day overview (morning / afternoon / evening blocks)
2. 3-4 activities/stops per day (with a short note on why each was chosen)
3. Recommended restaurants (suited to the group profile)
4. Transport suggestions (private car / public / on foot)
5. Smart tips (best times to go, whether to pre-book tickets, when it gets crowded)
6. An estimated daily budget
7. A backup plan (alternatives for bad weather or closures)

Format: ready to present to the customer — warm but information-rich, with local insider tips woven in.`,
        before: "A custom itinerary: 2-3 hrs/customer (often skipped, with the standard package sent instead)",
        after: "Form + AI + local polish: 15-20 minutes/customer, booking conversion up 2-3x",
      },
      {
        title: "Scenario 3: Review Management & Reputation",
        problem:
          "There's a new review on TripAdvisor, 4 waiting on Google, and 2 bad ones on Booking. Writing a personal, professional reply to each takes time — but leaving them unanswered hurts your reputation and your SEO. One bad review left without a response sends the next prospective customer to a competitor.",
        steps: [
          "Each week, gather your TripAdvisor + Google + Booking reviews (screenshots or copy-paste)",
          "Give Claude the reviews and your brand tone, then run the reply prompt",
          "AI drafts a personal (name + a concrete reference), professional reply in your brand voice for each review",
          "For negative reviews especially: empathy + a concrete fix + an invitation to continue offline",
          "Paste the replies onto the platform(s) and publish — 30 minutes a week",
        ],
        promptExample: `Write a reply to the [TripAdvisor / Google / Booking] review below on behalf of my business.

Business: [Name]
Type: [Tour operator / Hotel / Guide]
Tone: [Warm / Professional / Welcoming]
Reviewer's name: [Name or handle]
Review language: [EN / ES / Other]
Rating: [out of 5]

Review text:
[Paste the review here]

The reply should:
1. Greet the customer by name (if available)
2. Reference a concrete detail from the review (no generic responses)
3. If positive: a heartfelt thank-you + a small detail unique to the business
4. If negative: empathy + a concrete corrective action + an invitation to talk offline (never defensive)
5. Reply in the language of the review (English review → English, Spanish → Spanish)
6. Maximum 4 sentences
7. A warm closing + the business signature

Important: don't be defensive, don't sound templated, and let the business's values (hospitality, quality) come through indirectly.`,
        before: "Review replies: once a month, only the good ones + most left unanswered",
        after: "30 minutes weekly + AI replies + publish: every review answered within 7 days",
      },
    ],

    tools: [
      {
        name: "Claude (claude.ai)",
        description: "The most capable AI assistant for multilingual content, itinerary building, and review replies.",
        free: true,
        link: "https://claude.ai",
        bestFor: "Personalized itineraries, multilingual translation, review replies, blog content",
      },
      {
        name: "ManyChat (manychat.com)",
        description: "Automated reply system for Instagram and WhatsApp — FAQs, booking handoffs, and language detection.",
        free: false,
        link: "https://manychat.com",
        bestFor: "Instagram DM automation, WhatsApp chatbot, campaign messaging",
      },
      {
        name: "Calendly (calendly.com)",
        description: "A simple but powerful tool for managing bookings and tour schedules — with multilingual support.",
        free: true,
        link: "https://calendly.com",
        bestFor: "Tour bookings, consultation scheduling, automatic reminders",
      },
      {
        name: "Canva AI (canva.com)",
        description: "An AI-assisted design tool for tour posters, Instagram Reel covers, brochures, and menus.",
        free: true,
        link: "https://canva.com",
        bestFor: "Social media graphics, tour brochures, Reel covers",
      },
      {
        name: "Google Translate (translate.google.com)",
        description: "Handy for quick translations and a second-pass check — but for quality-critical content, reach for Claude.",
        free: true,
        link: "https://translate.google.com",
        bestFor: "Quick short translations, menus, signage, urgent messages",
      },
    ],

    prompts: [
      {
        title: "1. Booking Confirmation Message (5 Languages)",
        prompt: `Write a booking confirmation message for a [tour/service name] on [date]. Customer name: [name]. Party size: [number]. Meeting point: [place] at [time]. What to bring: [list]. Produce it in 5 languages (EN, ES, DE, FR, AR), each 3-4 sentences, in a warm but professional tone. End with WhatsApp contact details.`,
        expectedOutput: "A 5-language booking confirmation message set",
      },
      {
        title: "2. Personalized Itinerary",
        prompt: `Build a personalized [X-day] [destination] itinerary. Group: [size/ages]. Interests: [areas]. Budget: [level]. Physical constraints: [if any]. Lay it out day by day in morning/afternoon/evening blocks with 3-4 activities, restaurants, transport, an estimated budget, and a backup plan. Weave in local insider tips for the destination.`,
        expectedOutput: "A detailed personalized itinerary, ready to present to the customer",
      },
      {
        title: "3. Negative Review Reply",
        prompt: `Write a reply to a negative [Platform: TripAdvisor/Google/Booking] review on behalf of [business]. Review: [text]. Rating: [X/5]. The reply should be: empathy + a concrete corrective action + an invitation to talk offline, never defensive. Reply in the language of the review, max 4 sentences, warm.`,
        expectedOutput: "A professional negative-review reply",
      },
      {
        title: "4. Positive Review Reply",
        prompt: `Write a reply to a positive [Platform] review. Customer: [name]. Review: [text]. The reply should: greet them by name, reference a specific detail from the review, give a heartfelt thank-you, add a small touch about the business's values, and invite them back. Max 3 sentences, warm, in the review's language.`,
        expectedOutput: "A personal positive-review reply",
      },
      {
        title: "5. Instagram Reel Script",
        prompt: `Write a 30-second Instagram Reel script for a [tour/destination]. Hook (3 sec) + 3 scenes + CTA. Goal: bookings. Style: [exciting / serene / playful]. English voiceover with Spanish subtitles. Caption: 100 words + 10 hashtags.`,
        expectedOutput: "A Reel script + caption",
      },
      {
        title: "6. Weather-Change Notification",
        prompt: `Notify customers booked on the [date] tour of an itinerary change due to weather. What changed: [info]. New plan: [summary]. Produce it in 5 languages, in a reassuring tone, making the alternative sound exciting and emphasizing rescheduling over cancellation.`,
        expectedOutput: "A multilingual tour-change notification",
      },
      {
        title: "7. Early-Booking Campaign",
        prompt: `Write an early-booking campaign for the [season: summer/winter/holiday]. Discount: [X%]. Deadline: [date]. Target: [group type]. Produce an Instagram post (100 words), a WhatsApp broadcast (60 words), and an email (200 words). Provide EN + ES versions.`,
        expectedOutput: "Campaign copy in 3 formats and 2 languages",
      },
      {
        title: "8. Post-Tour Follow-Up Message",
        prompt: `Write a follow-up message for a customer who just finished a tour. Goal: request a review + invite them back + ask for referrals. Personal detail: [a memory or moment from the tour]. A WhatsApp message, 3 sentences, warm, with a review link + a reminder about upcoming tours. In 5 languages.`,
        expectedOutput: "A personal post-tour follow-up message",
      },
      {
        title: "9. Google Business Profile Description",
        prompt: `Write a Google Business Profile description for [business name]. Type: [tour operator / hotel / guide]. Location: [region]. Highlights: [3 features]. 150 words in English + 150 words in Spanish, with local SEO keywords, trust-building and warm.`,
        expectedOutput: "A bilingual Google Business Profile description",
      },
      {
        title: "10. Blog: Destination Guide",
        prompt: `Write a blog post titled '3 Days in [place] — Experiences You Can't Miss' for [destination]. 800 words in English. Goal: SEO + bookings. Include local tips, food recommendations, the best times to visit, and a natural pointer to your own tour package (no hard sell). Include the title, meta description, and H2s.`,
        expectedOutput: "A complete, SEO-optimized blog post",
      },
    ],

    checklist: [
      {
        day: 1,
        task: "Sign up for Claude.ai. List your 20 most-asked questions and, using the logic of Prompt 1, translate them into 5 languages. Save the first 10 as ready answers in WhatsApp Business.",
        tool: "Claude.ai + WhatsApp Business",
        duration: "90 minutes",
      },
      {
        day: 2,
        task: "Open a Calendly account and set up your booking calendar. Define your tour types, durations, and meeting points. Use Prompt 1 to prepare an automatic confirmation message in 5 languages.",
        tool: "Calendly + Claude.ai",
        duration: "60 minutes",
      },
      {
        day: 3,
        task: "Pull 5 customer profiles from last month and run Prompt 2 to draft a personalized itinerary for each. Compare them — how much time did it save you?",
        tool: "Claude.ai",
        duration: "60 minutes",
      },
      {
        day: 4,
        task: "Gather your last 10 reviews from TripAdvisor + Google + Booking. Draft replies with Prompts 3 and 4 and publish them. Leave no review unanswered.",
        tool: "Claude.ai",
        duration: "45 minutes",
      },
      {
        day: 5,
        task: "Open a ManyChat account. Set up the basic flow for Instagram DM automation — greeting, language selection, FAQ routing, and a live-support exit.",
        tool: "ManyChat",
        duration: "75 minutes",
      },
      {
        day: 6,
        task: "Create 3 Instagram Reel covers with Canva AI. Write their scripts with Prompt 5 and schedule them for the coming week.",
        tool: "Canva AI + Claude.ai",
        duration: "60 minutes",
      },
      {
        day: 7,
        task: "Review this week's results. How did your response speed change? Booking conversion? Prepare an early-booking campaign for the next season with Prompt 7.",
        tool: "Claude.ai",
        duration: "45 minutes",
      },
    ],

    growtTeaser:
      "You've stood up multilingual 24/7 communication, lifted booking conversion with personalized itineraries, and systematized your review management. The real growth opportunity lies in turning this system into a scalable brand experience — not seasonal spikes, but sustainable year-round growth. Plan that transition with the GROWT Method. Take the quiz for your personal plan at growtify.ai/test.",

    ctaHeadline: "Next step: An AI Tourism Growth Plan Built for Your Business",
    ctaBody:
      "Multilingual service, personalized experiences, and review management are running faster now. Next comes growing off-season demand, raising average customer value, and building a sustainable repeat-booking system. Take the free AI Digital Maturity Test at growtify.ai/test — your business's tailored roadmap in 5 minutes.",
  },

  "architecture": {
    slug: "architecture",
    coverTitle: "The AI Render & Presentation Guide for Architects",
    coverSubtitle:
      "AI tools that turn a two-day render wait into two minutes — concept, presentation, and project management",
    sectorIcon: "📐",

    intro: {
      forWho:
        "This guide is for architects, interior designers, landscape architects, and design studios who are forced to say \"give me a week\" when a client asks for three concepts, lose projects at the concept stage to faster competitors, and burn hours assembling presentations. If you want to move at the speed clients now expect, you're in the right place.",
      whatYouGet: [
        "5 AI tools — hand-picked for architecture (Midjourney, Leonardo AI, Claude, Canva, Stable Diffusion)",
        "3 practical scenarios — AI render generation, client presentations, and project-flow automation",
        "A 10-prompt library — for interior, façade, landscape, and detail renders",
        "First-7-days checklist — a step-by-step plan to set up your own AI render system",
        "A client pitch deck template — from concept all the way to delivery plan",
      ],
      painHook:
        "When a client says \"I'm picturing something like this,\" do they really have to wait a week to see three different concepts? In that week, they walk over to your competitor. AI render tools cut that process down to hours — sometimes minutes. Decisions speed up, and the project chooses you.",
    },

    sectorContext: {
      whyAiMatters:
        "Architecture is one of the fastest adopters of the AI visual-generation revolution. In 2024, tools like Midjourney and Leonardo AI turned the concept stage from a matter of months into a matter of minutes. Globally, practices like Zaha Hadid Architects and Foster+Partners use AI renders for early concept work — saving the classic render pipeline for the final stage.\n\nFor independent architects and mid-size studios, the opportunity is clear: once clients start measuring decision speed in hours, practices without AI fall out of the race. The architect who can present three different directions at the concept stage — and revise within hours after client feedback — is the one who wins the project.",
      stats: [
        {
          value: "70%",
          label:
            "Concept-stage time saved by architecture practices using AI render tools — weeks down to days.",
          source: "AIA Architectural AI Adoption Report, 2024",
        },
        {
          value: "3-5x",
          label:
            "Increase in the number of alternatives presented at the concept stage — 1 without AI, 3-5 with it.",
          source: "ArchDaily AI in Practice Survey, 2024",
        },
        {
          value: "40%",
          label:
            "Total project time saved when concepts are approved early — revisions get resolved at the concept stage.",
          source: "McKinsey Construction Insights, 2023",
        },
      ],
      comparison: {
        without: [
          "Concept render: 2-5 days, a single style, back to square one if the client dislikes it",
          "Presentations assembled by hand in PowerPoint, hours of work",
          "Revisions mean manual edits in the 3D model — more hours",
          "3-4 rounds back and forth before the client is happy — the project never starts",
        ],
        with: [
          "3 concepts in 30 minutes with AI; you move forward with the one the client loves",
          "Presentation template + AI render + Claude copy = a professional pitch in an hour",
          "Change the revision prompt, get a new render in 2-3 minutes",
          "Enough options to win approval in the first meeting → the project starts fast",
        ],
      },
    },

    scenarios: [
      {
        title: "Scenario 1: AI Renders at the Concept Stage",
        problem:
          "The client says, \"I want a modern loft-style office, natural light, wood textures.\" Normally you spend two days in SketchUp to present one alternative. The next revision takes another day. Three alternatives? A week. Meanwhile a faster studio turns it around and lands the job.",
        steps: [
          "Hand the client brief to Claude and have it build AI render prompts (style, materials, light, camera angle)",
          "Paste the prompt into Midjourney or Leonardo AI and generate 3-4 variations",
          "Pick the best 3, then have Claude write presentation copy explaining each one",
          "Present 3 concepts to the client — once they choose, move into detailing (classic 3D modeling)",
          "Return to your usual workflow on the approved direction: SketchUp/Revit/Rhino — but now with a clear brief",
        ],
        promptExample: `You are an experienced architectural render prompt engineer. From the client brief below, produce render prompts ready to use in Midjourney / Leonardo AI.

Client brief:
- Project type: [Residential / Office / Cafe / Villa / Landscape]
- Location/climate: [e.g. coastal, humid, dense urban]
- Area: [m² / sq ft]
- Style direction: [Modern / Minimalist / Industrial / Biophilic / Classic / Mixed]
- Core requirements: [Natural light / Open plan / Family-focused / Ergonomic office, etc.]
- Material preferences: [Wood / Stone / Metal / Glass / Living wall]
- Things to avoid: [What the client dislikes]

Produce render prompts for 3 different style directions:
1. Literal interpretation (a direct application of the client's requests)
2. One step further (a bolder take — similar, but a distinct style)
3. Unexpected alternative (a direction the client hasn't considered but may love)

Each prompt should include:
- Space type + camera angle (eye-level, aerial, axonometric, etc.)
- Lighting (golden hour, cloudy, bright daylight)
- Materials and textures
- Atmosphere (warm, serene, dynamic)
- Technical tags: "photorealistic, architectural photography, 8k, professional"
- Negative prompt (what to exclude)

Format: write each prompt in English (for the AI tools), then add a one-line plain-English note on the intent.`,
        before: "3 concepts: 5-7 business days of manual 3D modeling",
        after: "AI prompt + 3 renders: 30-60 minutes, the client sees 3 alternatives instantly",
      },
      {
        title: "Scenario 2: The Client Presentation Pitch Deck",
        problem:
          "The concept is ready — now you have to present it. Laying out slides by hand in PowerPoint, writing the copy, placing the renders: 3-4 hours. More often than not, you walk into the meeting with an unfinished deck, or you spend the night before getting it ready.",
        steps: [
          "Give Claude the project details (concept, client profile, the core idea)",
          "AI generates the presentation structure and the copy for each slide — concept, solution, materials, timeline, investment",
          "Drop your renders into a Canva presentation template and add the AI-generated copy",
          "Enrich each slide with your own take (a 1-2 sentence tweak is enough)",
          "Send it to the client as a PDF or live deck — it primes them before the meeting",
        ],
        promptExample: `Prepare the content for a client presentation on [Project name].

Project details:
- Type: [Residential / Office / Commercial / Landscape]
- Location: [region]
- Area: [m² / sq ft]
- Client profile: [Family / Corporate / Investor / etc.]
- Core idea: [the concept in one sentence]
- Material palette: [list]
- Special emphasis: [Sustainability / Lighting / Smart home / etc.]
- Estimated budget range: [if any]
- Estimated timeline: [weeks/months]

Produce content for an 8-slide deck:
1. Cover: project name + a short tagline + date
2. Brief and client need (3 points)
3. The concept idea (2 sentences + 3 keywords)
4. Spatial interpretation (render description, 3 features)
5. Materials and textures (3 main points, why each was chosen)
6. Timeline (5 phases, by week)
7. Investment range and scope (transparent, detailed)
8. Next steps + contact (a clear call to action)

For each slide: a title (max 6 words) + body copy (max 40 words) + a speaker note (what to say while presenting). Tone: professional, reassuring, visionary but concrete.`,
        before: "Deck prep: 3-4 hours (often incomplete, or done overnight)",
        after: "AI content + Canva template + a personal touch: 45-60 minutes, professional result",
      },
      {
        title: "Scenario 3: Project Management & the Revision Flow",
        problem:
          "The client emails: \"Could we make the kitchen a bit bigger, and use laminate instead of solid wood?\" For that change you'd open the model in Revit, edit it, render it, and write a new description — 3-4 hours. Get two rounds of client feedback a day and your week is gone.",
        steps: [
          "Paste the client's email/WhatsApp feedback into Claude",
          "AI turns the feedback into a prioritized to-do list — clear, ranked changes",
          "Separate which changes can be tested fast with an AI render and which need Revit/Rhino",
          "Run the AI test (update the prompt, get a new render) and send the client a quick preview",
          "If approved, apply it permanently in Revit/Rhino — otherwise keep iterating in AI, no time wasted",
        ],
        promptExample: `Turn the client feedback below into a project action list.

Project: [Name]
Stage: [Concept / Preliminary design / Construction docs]

Client message (email/WhatsApp):
[Paste the message here]

Produce:
1. A to-do list (changes, ranked by priority)
2. For each change:
   - Description (clear, minimal jargon)
   - Impact (visual only, or does it change the material schedule / cost?)
   - Path forward: [Quick AI render test / Permanent change in Revit / Need more info from client]
   - Estimated time
3. A draft reply to the client:
   - Confirm receipt
   - Summarize each change briefly
   - State the next step clearly (when the render will be ready, how many changes there are)
   - Flag anything to watch (e.g. budget impact) — polite but direct
4. If a request is problematic on budget, structural, or code grounds, add a warning and an alternative suggestion

Tone: professional, solution-focused, never rushed.`,
        before: "Each round of feedback: 3-4 hours of Revit + render + reply",
        after: "AI triage + fast AI test + selective Revit: 1-1.5 hours",
      },
    ],

    tools: [
      {
        name: "Midjourney (midjourney.com)",
        description: "The most capable photorealistic AI render tool — the industry standard for architectural concept visuals.",
        free: false,
        link: "https://midjourney.com",
        bestFor: "Façades, interior concepts, atmosphere renders, style variations",
      },
      {
        name: "Leonardo AI (leonardo.ai)",
        description: "Architecture-focused presets and control options — with ControlNet it can generate renders from a 3D wireframe.",
        free: true,
        link: "https://leonardo.ai",
        bestFor: "Renders from a floor plan, material variations, detail zooms",
      },
      {
        name: "Claude (claude.ai)",
        description: "For prompt engineering, presentation content, client replies, and project documentation.",
        free: true,
        link: "https://claude.ai",
        bestFor: "Writing render prompts, deck copy, project descriptions, client communication",
      },
      {
        name: "Canva (canva.com)",
        description: "A fast tool for architecture presentation templates, portfolio design, and social media visuals.",
        free: true,
        link: "https://canva.com",
        bestFor: "Pitch decks, portfolios, Instagram reels, business cards",
      },
      {
        name: "Stable Diffusion + ControlNet",
        description: "Open-source and fully customizable — an advanced tool that can turn your 3D model into a render.",
        free: true,
        link: "https://stability.ai",
        bestFor: "Wireframe → render, training a model on your own style, high control",
      },
    ],

    prompts: [
      {
        title: "1. Interior Render (Living Room)",
        prompt: `Modern minimalist living room, large floor-to-ceiling windows with golden hour light, natural oak flooring, neutral beige linen sofa, matte black steel accents, indoor plants, Scandinavian aesthetic, warm atmosphere, photorealistic architectural photography, wide-angle eye-level view, 8k, professional interior magazine quality, shallow depth of field. --ar 16:9 --v 6`,
        expectedOutput: "A photorealistic interior render image",
      },
      {
        title: "2. Façade Render (Villa)",
        prompt: `Contemporary Mediterranean villa exterior, white stucco walls with natural stone accents, large glass openings, terracotta flat roof with solar panels, olive trees and cypress landscape, swimming pool in foreground reflecting architecture, golden hour lighting, cinematic architectural photography, dramatic sky, photorealistic, 8k --ar 16:9 --v 6`,
        expectedOutput: "A villa façade concept render",
      },
      {
        title: "3. Landscape / Garden Render",
        prompt: `Modern urban residential garden, biophilic design with native drought-resistant plants, corten steel planters, wooden deck seating area with pergola, ambient lighting, stone pathway with gravel, soft evening light, photorealistic landscape architecture photograph, aerial 45-degree view, natural and inviting atmosphere --ar 16:9 --v 6`,
        expectedOutput: "A contemporary landscape concept visual",
      },
      {
        title: "4. Office Interior (Concept)",
        prompt: `Creative co-working office interior, exposed concrete ceiling with industrial lighting, warm wooden collaborative tables, acoustic felt panels in mustard and teal, biophilic green walls, natural daylight from large windows, mixed seating zones, modern workplace photography, vibrant yet professional, eye-level wide angle, 8k photorealistic --ar 16:9 --v 6`,
        expectedOutput: "A creative office interior render",
      },
      {
        title: "5. Restaurant/Cafe Concept",
        prompt: `Intimate boutique cafe interior, exposed brick wall with vintage pendant lights, walnut bar counter with brass fixtures, mix of leather banquettes and bistro chairs, evening warm lighting, greenery accents, rustic modern atmosphere, cozy ambiance, photorealistic hospitality photography, eye-level perspective, 8k --ar 16:9 --v 6`,
        expectedOutput: "A boutique cafe concept visual",
      },
      {
        title: "6. Floor Plan Description",
        prompt: `Write the description that accompanies the floor plan for [Project]. Spaces: [list + m²/sq ft]. Main circulation: [describe]. Lighting strategy: [orientation]. Special solutions: [if any]. 200 words, written to be presented to the client — technical but accessible.`,
        expectedOutput: "Description copy for the floor plan presentation",
      },
      {
        title: "7. Material Palette Description",
        prompt: `Write the material palette description for [Project]. Main materials: [list]. For each: why it was chosen, where it's used, the feeling it creates, and care notes. 250 words for a client presentation — sensory language (warm, cool, tactile) while keeping technical credibility.`,
        expectedOutput: "Material palette presentation copy",
      },
      {
        title: "8. Client Feedback Reply",
        prompt: `The client gave the following feedback: [text]. Project: [name]. Write a professional reply that: 1) confirms receipt, 2) summarizes each change with its technical impact, 3) gives a proposed timeline and next step, 4) gently flags any budget/structural concern. 250 words, solution-focused, never rushed.`,
        expectedOutput: "A professional reply to client feedback",
      },
      {
        title: "9. Portfolio Project Description",
        prompt: `Write a portfolio/website description for the completed [project]. Project: [type, m²/sq ft, location]. Core challenge: [problem]. Solution: [approach]. Outcome: [impact]. 200 words, visionary but concrete and SEO-friendly — plus an 80-word Instagram caption version.`,
        expectedOutput: "A portfolio and social-media project description",
      },
      {
        title: "10. Concept Style Definition",
        prompt: `The client said \"[client phrase, e.g. 'warm but modern, livable for a family']\". Turn that vague request into 3 clear architectural style interpretations. For each: a one-sentence philosophy, 5 keywords, 3 materials, and one reference icon (an architect or project name). These 3 concept briefs will feed render prompt generation.`,
        expectedOutput: "3 clear style interpretations from the client's own words",
      },
    ],

    checklist: [
      {
        day: 1,
        task: "Sign up for Midjourney or Leonardo AI. Take a past project's concept stage and generate 3 different renders with Prompts 1-3. Compare them to the renders you actually produced.",
        tool: "Midjourney / Leonardo AI",
        duration: "90 minutes",
      },
      {
        day: 2,
        task: "Sign up for Claude.ai. Take one of your active client briefs and have it produce a style interpretation with Prompt 10 plus render prompts in the spirit of Prompts 1-3. Test the renders.",
        tool: "Claude.ai + Midjourney",
        duration: "75 minutes",
      },
      {
        day: 3,
        task: "Prepare the presentation for an active project with Prompts 6-7. Pick an 8-slide template in Canva and drop the content in. Add your own 1-2 sentence touch.",
        tool: "Claude.ai + Canva",
        duration: "90 minutes",
      },
      {
        day: 4,
        task: "Take the latest client feedback email. Use Prompt 8 to prepare the triage and a draft reply. Send it after your own review.",
        tool: "Claude.ai",
        duration: "45 minutes",
      },
      {
        day: 5,
        task: "Update the portfolio descriptions for your 3 best completed projects with Prompt 9. Generate the Instagram captions too and post them.",
        tool: "Claude.ai + Canva",
        duration: "60 minutes",
      },
      {
        day: 6,
        task: "ControlNet experiment: try generating a render from an existing 2D plan or 3D wireframe with Stable Diffusion (or upload to Leonardo AI).",
        tool: "Leonardo AI / Stable Diffusion",
        duration: "90 minutes",
      },
      {
        day: 7,
        task: "Review this week's AI experiments: which prompts worked, which needed iteration? Save your best 5 prompts to your own library — make it your studio's standard process.",
        tool: "Claude.ai",
        duration: "45 minutes",
      },
    ],

    growtTeaser:
      "You've sped up the concept stage with AI, professionalized your presentations, and systematized client communication. The real growth opportunity is turning that speed into studio capacity — 2x the project throughput with the same team. Build your growth plan with the GROWT Method. For your personal plan, take the quiz at growtify.ai/test.",

    ctaHeadline: "Next step: an AI Transformation Plan built for your studio",
    ctaBody:
      "You've accelerated concept work, presentations, and client communication. Next comes growing your studio's capacity, focusing on high-value projects, and building recurring revenue channels. Take the free AI Digital Maturity Test at growtify.ai/test — a roadmap built for your studio in 5 minutes.",
  },

  "education": {
    slug: "education",
    coverTitle: "The AI Material-Creation Guide for Educators",
    coverSubtitle:
      "Question banks, presentations, personalized feedback — 10 hours of material prep done in 90 minutes",
    sectorIcon: "🎓",

    intro: {
      forWho:
        "This guide is for educators, academics, private tutors, and online course creators who lose 10 hours a week to material prep, can't make personalized feedback for every student feasible, and have wanted to launch an online course for years without ever starting. If you want to scale your teaching without burning out, you're in the right place.",
      whatYouGet: [
        "5 AI tools — hand-picked for education (Claude, ChatGPT, Canva, Kahoot, Notion AI)",
        "3 practical scenarios — question banks, presentation creation, and a personalized feedback system",
        "10 copy-paste prompts — for material at every subject and difficulty level",
        "A first-7-days checklist — to redesign your material workflow with AI",
        "A personalized feedback template — individual comments for 30 students in 30 minutes",
      ],
      painHook:
        "Sunday night, and the pile in front of you: a lesson presentation for the week, questions for three classes, 20 assignments to grade. By the time it's all done, you've got nothing left for the actual teaching — or for building that course. AI cuts that pile down to a fifth of its size, and hands you back the part you got into this for: teaching.",
    },

    sectorContext: {
      whyAiMatters:
        "Education is one of AI's strongest use cases. Different learning speeds, different difficulty levels, personalized feedback — all of it drains teacher time, and all of it is exactly what AI makes scalable. AI-assisted material creation is already standard at leading universities, and platforms like Coursera now use AI teaching assistants in their courses.\n\nThe online learning market is growing fast worldwide, and the educators who win in that growth are the ones using AI to deliver personalized experiences at scale. A private tutor can give 30 students individual feedback. An academic can compress hours of question-writing into minutes. A solo creator can build an entire course collection on their own.",
      stats: [
        {
          value: "10 hrs → 90 min",
          label:
            "Average weekly material-prep time saved by teachers who use AI tools.",
          source: "EdTech Magazine AI in Education Survey, 2024",
        },
        {
          value: "42%",
          label:
            "Gain in academic performance among students who receive personalized feedback.",
          source: "Journal of Educational Psychology, 2023",
        },
        {
          value: "68%",
          label:
            "Educators who say they 'feel able to focus more on actual teaching' after adopting AI material tools.",
          source: "Common Sense Media Teacher AI Report, 2024",
        },
      ],
      comparison: {
        without: [
          "10+ hours a week on presentations, questions, and grading — no time left to teach",
          "The same generic feedback for every student — or no feedback at all",
          "An online course idea that keeps stalling on the 'I don't have time' wall, year after year",
          "Students at different levels all handed the same material the same way",
        ],
        with: [
          "Material prep in 90 minutes, with the rest of the time going to students and to yourself",
          "Personalized feedback for every student — 30 students in 30 minutes",
          "An online course curriculum + first 3 lessons ready in a week, so you can launch",
          "Three levels of material produced in parallel — beginner, intermediate, advanced",
        ],
      },
    },

    scenarios: [
      {
        title: "Scenario 1: Question-Bank Automation",
        problem:
          "It's the weekend and you need 20 questions each for three classes at three different levels. Multiple choice, open-ended, applied — all different. Reuse last year's and the students already have them. Write from scratch and it's 4-5 hours. So the quality usually slips.",
        steps: [
          "List your topics and learning objectives (Bloom's taxonomy: knowledge, comprehension, application, analysis)",
          "Give Claude that information and use the question-bank prompt below",
          "AI generates questions at every difficulty level and type — with distractors and an answer key",
          "Skim the questions, revise one or two, cut one or two — you approve and publish",
          "Save the question bank into categories in Notion or Excel — you can reuse it in future terms",
        ],
        promptExample: `You are an experienced instructional designer. Build a multi-format question bank for the topic below.

Lesson details:
- Topic: [e.g. "Cell biology — mitosis"]
- Grade/age: [e.g. age 15-16]
- Learning objectives: [bullet points]
- Curriculum context: [your curriculum / IB / AP / other]
- Purpose: [for an exam / quiz / assignment]

Generate:
1. Multiple-choice questions (10 total, across 3 difficulty levels)
   - Each question: 4 options, 1 correct answer, 3 realistic distractors (reflecting common misconceptions)
   - Answer key + an explanation of why each option is right or wrong
2. Open-ended questions (5 total, at the application + analysis level)
   - Each question: 3 key points the expected answer should cover, plus a scoring rubric (0-3)
3. Applied/scenario questions (3 total)
   - Each: a real-world scenario, guiding questions for the response, and assessment criteria

Tone: appropriate for the age group, clear question wording, culturally neutral.
Important: every difficulty level should challenge the target group without discouraging them. Tag each question with its Bloom level (Knowledge/Comprehension/Application/Analysis/Evaluation).`,
        before: "3 classes × 20 questions: 4-5 hours, from scratch",
        after: "3 prompts × 15 minutes + review: 1-1.5 hours, high variety",
      },
      {
        title: "Scenario 2: Presentation & Lesson-Note Creation",
        problem:
          "You teach Monday: 'The Economic Causes of the French Revolution.' In front of you, an empty slide deck. You know the material cold, but designing the slides, getting the order right, building a story structure that holds students' attention — that's a separate job. It's midnight and you're still on slide three.",
        steps: [
          "Give Claude the topic and grade level — use the presentation prompt below",
          "AI proposes an 8-12 slide structure: an opening hook, main sections, activities, summary",
          "For each slide: title + key ideas + speaker note + suggested visual",
          "Drop it into a Canva template (copy-paste the AI-generated text)",
          "Enrich one or two slides with your own anecdote or example — your touch goes here",
        ],
        promptExample: `Build an interactive lesson presentation on [topic], running [X minutes], for [age group] students.

Lesson details:
- Topic: [detail]
- Duration: [minutes]
- Class: [age/grade]
- Curriculum link: [if any]
- Learning objectives: [2-3 clear objectives]
- Class dynamic: [quiet / active / mixed]
- Prior knowledge: [what they already know]

Produce a 10-slide structure:
1. Hook slide: an attention-grabbing question, visual, or paradox
2. Learning objectives (stated clearly)
3. Context / prior-knowledge bridge
4-7. Core content (one idea per slide, no information jumps)
8. Interaction activity (discussion question, pair work, quick quiz)
9. Critical-thinking question (one that stretches the class)
10. Summary + a bridge to the next lesson

For each slide, give:
- Title (max 6 words)
- On-slide text (3-4 bullets, each max 8 words)
- Speaker note (what the teacher says, 3-4 sentences)
- Suggested visual (what to search for or create)
- Estimated time (minutes)

Tone: appropriate for the age group, curiosity-driven, focused on understanding rather than memorization. Weave in current examples wherever you can.`,
        before: "A 10-slide lesson presentation: 3-4 hours",
        after: "AI structure + Canva template + personal touch: 45-60 minutes",
      },
      {
        title: "Scenario 3: Personalized Feedback System",
        problem:
          "30 student assignments just came in. You want to give each one personal, constructive feedback — but 5 minutes/student × 30 = 2.5 hours. So it usually collapses into flat comments like 'nice' or 'work a bit harder.' The student doesn't improve, because there's nothing specific to act on.",
        steps: [
          "Digitize the student assignments (photo/PDF)",
          "For each assignment, feed Claude 3-5 key observations and the score components",
          "AI produces personal, constructive, specific feedback for each student — a strength + a growth area + a concrete next step",
          "Quickly review the generated feedback and add your own touch (if you know the student)",
          "Send to students via WhatsApp/email/your class platform — shareable with parents",
        ],
        promptExample: `Write [assignment type] feedback for [student name].

Student info:
- Name: [name]
- Class: [grade/age]
- General strength: [if any — e.g. creativity, analytical thinking]
- General growth area: [if any — e.g. consistent practice, writing]

Assignment details:
- Assignment type: [written / project / problem-solving / presentation]
- Topic: [detail]
- Score/grade: [X/Y]

Observations:
- Strengths: [what was done well in this assignment, concrete]
- Growth areas: [what fell short in this assignment, concrete]
- Standout detail: [a creative idea, a different approach, etc.]

Write the feedback:
1. Specific opening: start with a concrete detail you appreciated in the work (not a generic "nice")
2. 1 strength — explain why it's good, and what skill it shows
3. 1-2 growth areas — concrete, non-accusatory, in a "next time, try this" voice
4. 1 concrete next step — what they can do, which resource they can use (2 sentences)
5. Motivational close — personal, showing you know the student

Total: max 180 words. Tone: warm, professional, constructive. Build the student's confidence while charting a clear path forward.
NOTE: if the grade is low, use "not there yet" rather than "failed." If it's high, suggest "the next challenge."`,
        before: "Personal feedback for 30 students: 2.5-3 hours (often skipped entirely)",
        after: "Quick observation notes + AI feedback + review: 30-40 minutes",
      },
    ],

    tools: [
      {
        name: "Claude (claude.ai)",
        description:
          "The most capable AI assistant for question banks, lesson presentations, personalized feedback, and curriculum planning.",
        free: true,
        link: "https://claude.ai",
        bestFor: "Question generation, lesson decks, personalized feedback, curriculum",
      },
      {
        name: "ChatGPT (chatgpt.com)",
        description:
          "A second voice for alternative question and activity ideas, and quick answers.",
        free: true,
        link: "https://chatgpt.com",
        bestFor: "Alternative questions, quick activity ideas, answering student questions",
      },
      {
        name: "Canva AI (canva.com)",
        description:
          "For lesson-presentation design, student worksheets, and education infographics.",
        free: true,
        link: "https://canva.com",
        bestFor: "Presentations, worksheets, infographics, education visuals",
      },
      {
        name: "Kahoot (kahoot.com)",
        description:
          "In-class quizzes and interactive games — you can drop AI-generated questions straight in.",
        free: true,
        link: "https://kahoot.com",
        bestFor: "In-class quizzes, engagement, formative assessment",
      },
      {
        name: "Notion AI (notion.so)",
        description:
          "An AI-assisted space for curriculum planning, student tracking, and lesson-plan management.",
        free: false,
        link: "https://notion.so",
        bestFor: "Curriculum, lesson plans, student notes, advanced planning",
      },
    ],

    prompts: [
      {
        title: "1. Multiple-Choice Questions",
        prompt: `Write 10 multiple-choice questions on [topic] for the [grade/age] level. Each question: 4 options, 1 correct, 3 realistic distractors (reflecting common misconceptions). Difficulty spread: 4 easy, 4 medium, 2 hard. Answer key + a short explanation for each option. Tag the Bloom level.`,
        expectedOutput: "10 multiple-choice questions + answer key + explanations",
      },
      {
        title: "2. Open-Ended Questions + Rubric",
        prompt: `Write 5 open-ended questions on [topic] for the [grade] level, at the application and analysis level. For each question: 3 key points the answer should cover, a 4-point scoring rubric (0-1-2-3), and 1 sample full answer. Clear and concise.`,
        expectedOutput: "5 open-ended questions + rubric + sample answer",
      },
      {
        title: "3. Lesson Presentation Structure",
        prompt: `An [X-minute] lesson on [topic] for [age group]. 10 slides: hook → objectives → prior knowledge → core content (4 slides) → activity → critical question → summary. Each slide: title, content bullets, speaker note, suggested visual, timing.`,
        expectedOutput: "A complete 10-slide lesson presentation structure",
      },
      {
        title: "4. Personalized Student Feedback",
        prompt: `Feedback on [assignment type] for [student name, grade]. Observations: strength: [A], growth area: [B]. 180 words: specific opening, 1 strength + why it's good, 1-2 growth areas + a concrete suggestion, a next step, a motivational close. Constructive, non-accusatory language.`,
        expectedOutput: "Personalized, constructive student feedback",
      },
      {
        title: "5. Activity/Game Idea",
        prompt: `Suggest a 20-minute in-class activity on [topic] for the [grade] level. Minimal materials. 3 alternatives: 1) Individual, 2) Pair, 3) Group. For each: objective, steps, materials, assessment criteria.`,
        expectedOutput: "3 activity alternatives",
      },
      {
        title: "6. Parent Update Letter",
        prompt: `Write an update letter to [student]'s parent about [topic: overall performance / an exam / a specific situation]. Tone: warm and professional, respectful of the student, bringing the parent in as a partner toward a shared goal. 250 words, with a clear next step.`,
        expectedOutput: "A professional parent letter",
      },
      {
        title: "7. Online Course Curriculum",
        prompt: `An online course curriculum on [topic]. Target audience: [who]. Length: [weekly / X hours]. 8-10 modules, each with: a learning objective, sub-topics, a suggested video length, an assignment, and an assessment. End-of-course outcome: [what they'll gain].`,
        expectedOutput: "A complete online course curriculum skeleton",
      },
      {
        title: "8. Lesson Summary / Study Note",
        prompt: `A student study note for the [topic] lesson. Class: [level]. Length: 2 pages. Structure: clear key concepts, 3 real-world examples, a suggested visual/table, and 5 self-test questions with answers.`,
        expectedOutput: "A student study note",
      },
      {
        title: "9. Student Motivation Message",
        prompt: `[Student] is in this situation: [e.g. failed a recent exam, low motivation / sustaining high performance]. Write a personal motivation message, 100 words, sincere, in a growth-mindset voice, including one concrete next step.`,
        expectedOutput: "A personal motivation message",
      },
      {
        title: "10. Assessment & Evaluation Plan",
        prompt: `An assessment plan for [term/unit]. [Topics]. 4 types of assessment: formative (weekly), midterm, project, end-of-term. For each: objective, content, duration, weighting. Mind the student workload and provide variety.`,
        expectedOutput: "A term-long assessment and evaluation plan",
      },
    ],

    checklist: [
      {
        day: 1,
        task: "Sign up for Claude.ai. Generate a question bank for an upcoming lesson topic with Prompt 1. Revise 3-4 yourself and get them ready to publish.",
        tool: "Claude.ai",
        duration: "60 minutes",
      },
      {
        day: 2,
        task: "Get a presentation structure for an upcoming lesson with Prompt 3. Pick an education template in Canva and drop in the AI-generated content. Add 1-2 personal anecdotes or examples.",
        tool: "Claude.ai + Canva",
        duration: "75 minutes",
      },
      {
        day: 3,
        task: "Generate personalized feedback for last week's assignment pile (or your most recent 10 students) with Prompt 4. Send it and watch the student response.",
        tool: "Claude.ai",
        duration: "45 minutes",
      },
      {
        day: 4,
        task: "Get an activity for in-class engagement with Prompt 5, and build a quiz version in Kahoot. Try it in your next lesson.",
        tool: "Claude.ai + Kahoot",
        duration: "45 minutes",
      },
      {
        day: 5,
        task: "Draw up the curriculum with Prompt 7 for that online course idea you've been sitting on. Start the first module's content with Prompt 3 + Prompt 8.",
        tool: "Claude.ai",
        duration: "90 minutes",
      },
      {
        day: 6,
        task: "Write and send term update letters to 3 students' parents with Prompt 6. Note the responses.",
        tool: "Claude.ai",
        duration: "45 minutes",
      },
      {
        day: 7,
        task: "Log this week's material-prep times and compare them with last week. Save your 3 most productive prompts into your own 'library.'",
        tool: "Claude.ai + Notion",
        duration: "30 minutes",
      },
    ],

    growtTeaser:
      "You've cut your material-creation load to a fifth, built a personalized feedback system, and drafted an online course skeleton. The real growth opportunity is turning a one-person teaching operation into a scalable education business. Use the GROWT Method to plan that transition. For your personal plan, take the quiz at growtify.ai/test.",

    ctaHeadline: "Next step: An AI Growth Plan Built for Your Teaching Career",
    ctaBody:
      "You've sped up your material creation and feedback. Next comes launching your online course, scaling your student count, and building passive income channels. Take the free AI Digital Maturity Test at growtify.ai/test — a roadmap tailored to your teaching career, in 5 minutes.",
  },

  "fitness": {
    slug: "fitness",
    coverTitle: "The AI Program Guide for Fitness Professionals",
    coverSubtitle: "Custom training + nutrition + follow-up for every client — in minutes, and built to scale",
    sectorIcon: "💪",

    intro: {
      forWho:
        "This guide is for personal trainers, fitness studio owners, and nutrition coaches who burn hours writing a custom program for every client, lose people because they can't keep up with check-ins, and feel pulled in two directions between group classes and one-on-one coaching.",
      whatYouGet: [
        "5 AI tools — hand-picked for a fitness practice (Claude, ChatGPT, Trainerize, Canva AI, WhatsApp Business)",
        "3 practical scenarios — training program generation, nutrition planning, and motivation tracking",
        "10 copy-paste prompts — ready-made programs across a level × goal × equipment matrix",
        "First-7-days checklist — to rebuild your client systems with AI",
        "A motivation message template pack — ready to go for every day of the week",
      ],
      painHook:
        "You've got 15 clients, and writing a custom program for each one runs 10 hours a week. The motivation messages, the check-ins, the nutrition tweaks pile up — and then 'I don't have time' turns into a client walking out the door. AI takes that load off your plate, so you can focus on coaching and results.",
    },

    sectorContext: {
      whyAiMatters:
        "The fitness industry is being reshaped around personalization. Clients no longer settle for generic programs — a 'made for you' experience has become the baseline expectation. But personalization means time, and what used to be the exclusive luxury of top-tier trainers is now within reach of every coach through AI. Global brands like Nike Training Club, Future, and Freeletics already deliver a 'personal' experience to millions through AI-assisted programming.\n\nThe opportunity for independent PTs and small studios is real: use the same tools, then pair them with local, personal service to compete with the big brands. A trainer who can deliver a personal program + follow-up + motivation to 50 clients at once spends the same hours as a trainer maxed out at 10 — but produces 5x the revenue.",
      stats: [
        {
          value: "89%",
          label:
            "Share of fitness clients who prefer services offering a 'personal program' over generic, off-the-shelf plans.",
          source: "ACSM Health & Fitness Journal, 2024",
        },
        {
          value: "3x",
          label:
            "How much more likely clients are to still be active after 6 months when they get regular check-ins and motivation — vs. no follow-up at all.",
          source: "IHRSA Global Fitness Report, 2023",
        },
        {
          value: "62%",
          label:
            "Lift in client satisfaction and repeat purchases for trainers who pair their training with a nutrition plan.",
          source: "NSCA Personal Trainer Journal, 2024",
        },
      ],
      comparison: {
        without: [
          "Every custom program: 45-60 minutes to write and update",
          "Motivation messages done by hand — and mostly never sent, so clients drift away",
          "Nutrition planning treated as a separate specialty you can't offer",
          "Client progress tracked subjectively, with no objective data behind it",
        ],
        with: [
          "Level + goal + equipment in → AI returns a 4-week program in 10 minutes",
          "Ready-made motivation templates for every day of the week, sent in 2 minutes",
          "A calorie- and macro-based nutrition plan ready with AI — a new revenue stream",
          "Photo + measurement analysis turned into an objective progress report with AI",
        ],
      },
    },

    scenarios: [
      {
        title: "Scenario 1: Generating a Custom Training Program",
        problem:
          "A new client comes in: 32 years old, 6 months postpartum, 3 days a week at 45 minutes, training at home with dumbbells, goal 'recovery + fat loss'. Writing a 4-week program tailored to that profile normally takes an hour. With 10 clients, that's 10 hours a week.",
        steps: [
          "Standardize your client intake form (age, health history, goal, experience, equipment, time)",
          "Feed that information to Claude and use the program prompt below",
          "AI generates a 4-week progressive program — sets/reps/rest plus form cues",
          "Apply your own expertise to revise 2-3 exercises (for the client's specific situation)",
          "Export to PDF or Trainerize/your app and deliver it to the client — ready in 10 minutes",
        ],
        promptExample: `You are an experienced fitness program designer. Build a 4-week custom training program based on the profile below.

Client profile:
- Age: [X] | Sex: [F/M]
- Height/Weight: [X cm / Y kg]
- Fitness experience level: [Beginner / Intermediate / Advanced]
- Health status: [Add any special notes: knee pain, postpartum, hypertension, etc.]
- Goal: [Lose fat / Build muscle / Cardiovascular conditioning / Recovery / Performance]
- Current activity: [Sedentary / Active X days a week]
- Time: [X] days a week, [Y] minutes per session
- Equipment: [Home / Studio / Full gym + list]
- Special request: [If any — e.g. lunch-break at the office, early morning]

Build a 4-week progressive program:
- Week 1: Adaptation — light load, form-focused
- Week 2: Volume increase
- Week 3: Intensity/load increase
- Week 4: Peak + deload (last 3 days light)

For each training day:
1. Warm-up (5 minutes, dynamic movements)
2. Main block: exercises + sets × reps + rest (e.g. 3 × 12, 60 sec rest)
3. Finisher (optional — HIIT, run, foam roll)
4. Cool-down + stretching (5 minutes)

For each exercise:
- Exercise name
- Sets × reps (+ tempo, if any)
- Rest
- One key form cue (1 sentence)
- An alternative movement (if equipment is missing or there's pain)

WARNING: If there's postpartum recovery, chronic pain, or cardiovascular risk, open the program with: "This program is a general guide. If you experience pain or discomfort, consult a health professional."

Tone: motivating but safe, professional, easy to follow.`,
        before: "4-week custom program: 45-60 minutes per client",
        after: "Form + AI program + personal revision: 10-15 minutes per client",
      },
      {
        title: "Scenario 2: Nutrition Plan and Calorie Calculation",
        problem:
          "The client asks: 'What should I be eating?' That's a dietitian's job — but when you can't even offer a general roadmap, your perceived value drops. Building a nutrition plan yourself eats hours, and the calorie math is a whole separate task.",
        steps: [
          "Collect the client profile (for the TDEE calculation: age, weight, height, activity, goal)",
          "Feed it to Claude and use the nutrition plan prompt",
          "AI produces TDEE + macro targets + a 7-day sample menu (with everyday, accessible foods)",
          "Add the standard disclaimer: 'General guide — see a dietitian if there's a chronic condition'",
          "Deliver it to the client as a PDF — bundle it into the package as an optional add-on service",
        ],
        promptExample: `Build a personalized nutrition guide for [client name].

Profile:
- Age/Sex: [X / F or M]
- Height/Weight: [cm / kg]
- Activity level: [Sedentary / Light / Moderate / Intense / Very intense]
- Goal: [Lose fat / Build muscle / Maintain / Performance]
- Target rate: [e.g. 0.5 kg change per week]
- Allergies/dislikes: [List if any]
- Budget level: [Economical / Moderate / Flexible]
- Preferences: [Whole-food focus — note any dietary restrictions, e.g. vegetarian, halal, gluten-free]

Produce:
1. TDEE calculation (Mifflin-St Jeor formula, step by step)
2. Daily target calories and macros (protein/carbs/fat)
3. A 7-day sample menu (breakfast, lunch, dinner, 2 snacks)
   - Each meal: dish name + portion + estimated calories + macros
   - Whole, accessible foods (legumes, lentils, chicken, fish, yogurt, vegetables, whole grains)
   - Budget-friendly choices
4. A practical weekly shopping list
5. Meal-prep tips
6. Hydration and supplement guidance (general)

WARNING — mandatory, at the very top of the plan:
"This plan is a general guide. If you have diabetes, a thyroid condition, are pregnant, have kidney disease, an eating disorder, or any chronic health condition, please consult a registered dietitian. No supplement should be used without approval from a doctor or pharmacist."

Tone: practical, encouraging, not overly restrictive (favor 'this week, lean into X' over 'forbidden' language).`,
        before: "Nutrition plan: either refer it out to a specialist (lost revenue) or burn 2 hours",
        after: "AI nutrition guide + disclaimer + personal touch: 20-25 minutes, plus added revenue",
      },
      {
        title: "Scenario 3: Motivation and Follow-Up System",
        problem:
          "Monday, after the session, the client says 'I feel amazing.' Tuesday, silence. Wednesday, no workout. Thursday, 'I couldn't get motivated — cancel.' Sending a motivation message once a week keeps a client happy for 3 months — but 20 clients × 3 messages a week = 60 messages by hand, every week.",
        steps: [
          "Define your client segments (just starting, plateau, near goal, long-term performance)",
          "Have Claude generate a motivation message template for each segment × each day",
          "Save those templates as 'quick replies' in WhatsApp Business — 30 templates",
          "10 minutes a day: personalize and send the right template to clients scheduled to train that day",
          "Every 2 weeks, request a progress photo + measurements — build the progress report with Claude",
        ],
        promptExample: `Build motivation message templates for my fitness clients, covering every day of the week.

Client segments:
1. Just starting (0-4 weeks) — motivated but anxious
2. Plateau phase (8-12 weeks) — progress has slowed, demotivated
3. Near goal (final 4 weeks) — last push, may feel pressure
4. Long-term (6+ months) — sustainability, lifestyle

For each segment, across all 7 days of the week (21 messages total):

Monday: Start of the week, set the intention
Tuesday: Keep them motivated, nudge them to move
Wednesday: Midweek, a mental reset
Thursday: The energy-dip day, support
Friday: Closing out the week, a recap
Saturday: Active rest, a balanced approach
Sunday: Prep for the week ahead

Each message:
- Max 3 sentences
- WhatsApp tone (warm, 1-2 emojis maximum)
- 'You' language, personal
- An invitation, not an instruction (not "do it!" but "want to start a little mental challenge today to see how much you can move?")
- Fitted to the segment (for the beginner: confidence; plateau: trust the process; near goal: resilience; long-term: meaning in the lifestyle)

WARNING: No judgmental language about body shape. Put the process and how they feel up front; results and appearance stay in the background.`,
        before: "20 clients × 3 motivation messages/week: 60 messages written by hand, most forgotten",
        after: "21 templates × personalization: 15 minutes a week, every client gets a touchpoint",
      },
    ],

    tools: [
      {
        name: "Claude (claude.ai)",
        description: "The most capable AI assistant for training programs, nutrition plans, motivation content, and client reports.",
        free: true,
        link: "https://claude.ai",
        bestFor: "Program design, nutrition planning, motivation, progress reports",
      },
      {
        name: "Trainerize / FitSW (trainerize.com)",
        description: "A client management, program delivery, and progress-tracking platform built for personal trainers.",
        free: false,
        link: "https://trainerize.com",
        bestFor: "Client tracking, program delivery, progress photos, follow-up",
      },
      {
        name: "WhatsApp Business (business.whatsapp.com)",
        description: "Motivation messages, quick Q&A, and broadcast announcements with ready-made quick replies.",
        free: true,
        link: "https://business.whatsapp.com",
        bestFor: "Motivation messages, reminders, fast replies",
      },
      {
        name: "Canva AI (canva.com)",
        description: "For Instagram fitness content, PDF program templates, and exercise cards.",
        free: true,
        link: "https://canva.com",
        bestFor: "Instagram reels, program PDFs, exercise cards, before/after collages",
      },
      {
        name: "MyFitnessPal / Yazio",
        description: "Calorie and macro tracking for clients — you can plug your AI nutrition plan straight into it.",
        free: true,
        link: "https://myfitnesspal.com",
        bestFor: "Client calorie tracking, macros, food diary",
      },
    ],

    prompts: [
      {
        title: "1. 4-Week Training Program",
        prompt: `Build a 4-week progressive training program for [client profile: age/sex/weight/height/goal/experience/equipment/days × minutes per week]. Week 1 adaptation, 2 volume, 3 intensity, 4 peak+deload. Each day: warm-up + main block (exercise × sets × reps × rest × form cue) + cool-down. Health disclaimer at the top.`,
        expectedOutput: "A full 4-week program with daily detail",
      },
      {
        title: "2. Nutrition Plan (TDEE + Menu)",
        prompt: `Build a personal nutrition guide for [profile: age/weight/height/activity/goal]. TDEE via Mifflin-St Jeor, target calories + macros, a 7-day whole-food menu (budget-friendly), shopping list, meal-prep tip, hydration. Mandatory health disclaimer at the very top.`,
        expectedOutput: "TDEE + 7-day menu + shopping list",
      },
      {
        title: "3. Motivation Message Set",
        prompt: `Build a 7-day motivation message template set for my [segment: new/plateau/near goal/long-term] client. Each message max 3 sentences, warm WhatsApp tone, 'you' language, an invitation not an instruction, no body judgment, process-focused. 7 separate messages.`,
        expectedOutput: "A 7-day motivation template set",
      },
      {
        title: "4. Progress Report",
        prompt: `Write a 4-week progress report for [client]. Data: weight [X→Y], waist measurement [A→B], training adherence rate [Z%], subjective note [X]. Report: warm opening of recognition, the concrete numbers, one strength, one area to improve + a concrete action, and the focus for the next 4 weeks. 200 words.`,
        expectedOutput: "A client-ready progress report",
      },
      {
        title: "5. Instagram Reel Script",
        prompt: `Write a 30-second Instagram reel script on [topic: e.g. '5-minute core at home', 'exercises for back pain at home']. Hook (3 sec) + 3 movements (each with a camera angle + text overlay) + CTA. Caption 100 words + 10 hashtags.`,
        expectedOutput: "A reel script + caption",
      },
      {
        title: "6. Client Assessment Questions",
        prompt: `Build an assessment-form question set for new client onboarding. 5 headings: health history, training history, goals, obstacles, preferences. Under each heading, 4-6 open questions + any ready-made options. To be sent as a WhatsApp message or Google Form.`,
        expectedOutput: "A client onboarding form set",
      },
      {
        title: "7. Group Class Plan",
        prompt: `Build a [X-minute] group class plan for [class type: HIIT/Pilates/Bootcamp]. Level: [mixed/beginner/advanced]. Warm-up + main block (circuit/set structure) + cool-down. For each movement: timing, level modifications (easier/harder), instructor checkpoint. Music tempo suggestion.`,
        expectedOutput: "A complete group class plan template",
      },
      {
        title: "8. Injury/Pain Modification",
        prompt: `A client reported pain in their [area: knee/lower back/shoulder]. Their current program includes [exercise list]. Suggest safe alternatives (2 alternatives per exercise), which movements to avoid, and when to refer them to a health professional. Disclaimer: 'For acute pain, only after a medical check.'`,
        expectedOutput: "A safe modification guide",
      },
      {
        title: "9. Pricing/Package Explainer Message",
        prompt: `Write a price-value explainer for a prospect about [package: 1-1 PT / group / online]. Package contents: [list]. Value emphasis: what they get. Payment terms: [detail]. A 250-word WhatsApp version + a 100-word Instagram DM version. Warm but professional.`,
        expectedOutput: "A sales message for two channels",
      },
      {
        title: "10. Educational Blog/Instagram Post",
        prompt: `Write an Instagram educational post on [topic: e.g. 'how much weight a woman should lift when starting out', 'how to train with back pain']. 250-word caption, 3 main points, a myth/fact contrast, 10 hashtags. Speak to the FAQ language your audience is actually searching for.`,
        expectedOutput: "An educational Instagram post",
      },
    ],

    checklist: [
      {
        day: 1,
        task: "Sign up for Claude.ai. Generate a 4-week training program with Prompt 1 for 2 clients (new or existing). Finish with your own revision, then send.",
        tool: "Claude.ai",
        duration: "60 minutes",
      },
      {
        day: 2,
        task: "Build nutrition guides for your 3 most active clients with Prompt 2. Check the disclaimer, then send as a PDF.",
        tool: "Claude.ai",
        duration: "75 minutes",
      },
      {
        day: 3,
        task: "Move into WhatsApp Business. Generate a 3 segments × 7 days motivation template set with Prompt 3. Save them as quick replies.",
        tool: "Claude.ai + WhatsApp Business",
        duration: "75 minutes",
      },
      {
        day: 4,
        task: "Build an assessment form for onboarding with Prompt 6. Set it up as a Google Form and add it to your new-client flow.",
        tool: "Claude.ai + Google Forms",
        duration: "45 minutes",
      },
      {
        day: 5,
        task: "Build a progress report for your longest-standing client with Prompt 4. Add before/after photos + measurements, then present it to the client.",
        tool: "Claude.ai + Canva",
        duration: "45 minutes",
      },
      {
        day: 6,
        task: "Generate 3 Instagram reel scripts with Prompt 5 in Canva AI, shoot them, and schedule them for the week.",
        tool: "Claude.ai + Canva AI",
        duration: "90 minutes",
      },
      {
        day: 7,
        task: "Measure this week's client engagement time. Write and publish an educational post with Prompt 10. Map out the plan for next week.",
        tool: "Claude.ai + Canva",
        duration: "45 minutes",
      },
    ],

    growtTeaser:
      "You've systematized program generation, nutrition planning, and motivation follow-up. The real growth opportunity is turning that system into capacity growth and online service — from 10 clients to 50, from the studio to online. Plan that transition with the GROWT Method. For your personal plan, head to growtify.ai/test.",

    ctaHeadline: "Next step: Get the AI Growth Plan for Your PT Practice / Studio",
    ctaBody:
      "You've sped up your programming, nutrition, and follow-up processes. Next comes growing your capacity, building an online revenue stream, and growing as a brand. Take the free AI Digital Maturity Test at growtify.ai/test — your business-specific roadmap in 5 minutes.",
  },
};
