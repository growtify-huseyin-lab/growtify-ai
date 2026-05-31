import { LegalDocEN } from "./LegalDocEN";
import { COMPANY } from "@/lib/company-info";

// English-law Terms of Service.
export function TermsOfServiceEN() {
  return (
    <LegalDocEN title="Terms of Service" lastUpdated="9 April 2026">
      <p>
        These Terms of Service (&quot;Terms&quot;) govern your use of the Growtify.ai website
        and services operated by Humax Global Ltd, a company registered in England and Wales
        (company number {COMPANY.companyNumber}) (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;). By accessing
        the website or enrolling on our programmes, you agree to these Terms.
      </p>

      <h2>1. The service</h2>
      <p>
        Growtify.ai provides educational and mentorship services centred on the GROWT Method,
        a structured framework that teaches professionals and small businesses how to grow
        their business with artificial intelligence. Our services are educational and advisory
        in nature; we teach and guide, and you implement.
      </p>

      <h2>2. Eligibility &amp; accounts</h2>
      <p>
        You must be at least 18 years old and able to enter into a binding contract. You are
        responsible for the accuracy of information you provide and for maintaining the
        confidentiality of any account credentials.
      </p>

      <h2>3. Acceptable use</h2>
      <p>
        You agree not to misuse the website or services, including by attempting unauthorised
        access, disrupting the service, infringing intellectual property, or using the content
        unlawfully.
      </p>

      <h2>4. Intellectual property</h2>
      <p>
        All content, materials, and the GROWT Method framework are owned by or licensed to
        Humax Global Ltd and are protected by intellectual property laws. You receive a limited,
        non-transferable licence to use programme materials for your own business purposes only.
      </p>

      <h2>5. Fees &amp; payment</h2>
      <p>
        Where programmes are paid, fees, billing terms, and any applicable taxes are presented
        before purchase. Cancellation and refund rights are set out in our Refund &amp;
        Cancellation Policy.
      </p>

      <h2>6. No guaranteed results</h2>
      <p>
        Our services are educational. While we provide structured guidance, we do not guarantee
        specific business, revenue, or performance outcomes, as results depend on factors
        outside our control, including your own implementation.
      </p>

      <h2>7. Limitation of liability</h2>
      <p>
        Nothing in these Terms excludes liability that cannot be excluded under English law.
        Subject to that, we are not liable for indirect or consequential losses, and our total
        liability is limited to the amount you paid for the relevant service.
      </p>

      <h2>8. Termination</h2>
      <p>
        We may suspend or terminate access where these Terms are breached. You may stop using
        the services at any time, subject to the Refund &amp; Cancellation Policy.
      </p>

      <h2>9. Governing law</h2>
      <p>
        These Terms are governed by the laws of England and Wales, and the courts of England
        and Wales have exclusive jurisdiction, save where mandatory consumer-protection law
        provides otherwise.
      </p>

      <h2>10. Changes &amp; contact</h2>
      <p>
        We may update these Terms; continued use after changes constitutes acceptance. Contact{" "}
        <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a> with any question.
      </p>
    </LegalDocEN>
  );
}
