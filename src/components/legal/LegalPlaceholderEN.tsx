import Link from "next/link";
import { Container } from "@/components/ui/Container";

type DocType = "privacy" | "terms" | "refund" | "cookie";

const DOCS: Record<DocType, { title: string; body: string; trHref: string }> = {
  "privacy": {
    "title": "Privacy Policy (Coming Soon)",
    "body": "This Privacy Policy is currently being prepared under UK law (including the UK GDPR) for Humax Global Ltd. It will also incorporate our KVKK data-protection commitments for users in Turkey. In the meantime, please contact us at info@growtify.ai with any privacy questions, or view the Turkish version of this page.",
    "trHref": "/gizlilik-politikasi"
  },
  "terms": {
    "title": "Terms of Service (Coming Soon)",
    "body": "These Terms of Service are currently being drafted under UK law for Humax Global Ltd. This page is a temporary placeholder and does not yet constitute binding terms. For any questions in the meantime, please contact us at info@growtify.ai or view the Turkish version of this page.",
    "trHref": "/kullanim-kosullari"
  },
  "refund": {
    "title": "Refund & Cancellation Policy (Coming Soon)",
    "body": "Our Refund & Cancellation Policy is currently being prepared under UK law for Humax Global Ltd. This page is a temporary placeholder and does not yet reflect final terms. For any refund or cancellation questions in the meantime, please contact us at info@growtify.ai or view the Turkish version of this page.",
    "trHref": "/iade-politikasi"
  },
  "cookie": {
    "title": "Cookie Policy (Coming Soon)",
    "body": "This Cookie Policy is currently being prepared under UK law (including the UK GDPR and PECR) for Humax Global Ltd. This page is a temporary placeholder while the full policy is finalised. For any questions about how we use cookies in the meantime, please contact us at info@growtify.ai or view the Turkish version of this page.",
    "trHref": "/cerez-politikasi"
  }
};

// Interim EN legal placeholder. Real UK-law docs (UK GDPR / English ToS / Consumer
// Contracts / PECR) are authored separately by the Privacy Officer + counsel
// (REQ-development-env-cto-uklegal-001). Not fabricated binding legal text.
export function LegalPlaceholderEN({ docType }: { docType: DocType }) {
  const d = DOCS[docType];
  return (
    <section className="py-24">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-3xl font-extrabold tracking-tight text-dark dark:text-white sm:text-4xl">
            {d.title}
          </h1>
          <p className="mt-6 text-lg text-gray-600 dark:text-dark-muted leading-relaxed">
            {d.body}
          </p>
          <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
            Operated by Humax Global Ltd (United Kingdom). For questions, contact{" "}
            <a href="mailto:info@growtify.ai" className="text-primary hover:underline">
              info@growtify.ai
            </a>
            .
          </p>
          <div className="mt-8">
            <Link href={d.trHref} className="text-primary hover:underline text-sm">
              View the current Turkish version →
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
