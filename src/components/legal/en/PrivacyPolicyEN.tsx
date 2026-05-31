import { LegalDocEN } from "./LegalDocEN";
import { COMPANY } from "@/lib/company-info";

// UK GDPR / Data Protection Act 2018 compliant privacy policy.
// Entity facts sourced from @/lib/company-info (single source of truth).
export function PrivacyPolicyEN() {
  return (
    <LegalDocEN title="Privacy Policy" lastUpdated="9 April 2026">
      <p>
        This Privacy Policy explains how Humax Global Ltd (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;),
        the operator of Growtify.ai, collects, uses, and protects your personal data in
        accordance with the UK General Data Protection Regulation (UK GDPR) and the Data
        Protection Act 2018.
      </p>

      <h2>1. Who we are (Data Controller)</h2>
      <p>
        Humax Global Ltd is a company registered in England and Wales (company number {COMPANY.companyNumber}), with its registered office at {COMPANY.address}. We are the data controller responsible
        for your personal data. We are registered with the UK Information Commissioner's Office (ICO). You can contact us at{" "}
        <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a> for any data protection query.
      </p>

      <h2>2. What data we collect</h2>
      <ul>
        <li>
          <strong>Contact &amp; enquiry data:</strong> name, email address, phone number, and
          the content of messages you submit through our contact, lead-magnet, or quiz forms.
        </li>
        <li>
          <strong>Programme data:</strong> information you provide when expressing interest in
          or enrolling on the GROWT Programme.
        </li>
        <li>
          <strong>Usage &amp; technical data:</strong> IP address, browser/device type, and
          interaction data collected via cookies and analytics (see our Cookie Policy).
        </li>
      </ul>

      <h2>3. Lawful bases for processing</h2>
      <p>We rely on the following lawful bases under Article 6 UK GDPR:</p>
      <ul>
        <li>
          <strong>Consent</strong> — for marketing communications and non-essential cookies.
          You may withdraw consent at any time.
        </li>
        <li>
          <strong>Legitimate interests</strong> — to operate, secure, and improve our website
          and services, where these interests are not overridden by your rights.
        </li>
        <li>
          <strong>Performance of a contract</strong> — to deliver the programmes and services
          you request.
        </li>
      </ul>

      <h2>4. How we use your data</h2>
      <p>
        We use your data to respond to enquiries, deliver our educational and mentorship
        services, send communications you have consented to, and analyse and improve our
        website. We do not make decisions producing legal effects based solely on automated
        processing.
      </p>

      <h2>5. Sharing &amp; processors</h2>
      <p>
        We share data with trusted service providers (processors) who act on our instructions,
        including our CRM/automation provider, transactional email provider, analytics
        provider, and hosting provider. Where data is transferred outside the UK, we ensure an
        adequate level of protection through UK adequacy regulations or appropriate safeguards
        such as the International Data Transfer Agreement (IDTA) or Standard Contractual
        Clauses. A current list of processors is available on request.
      </p>

      <h2>6. Data retention</h2>
      <p>
        We retain personal data only as long as necessary for the purposes set out above, or
        as required by law. Enquiry data is retained only as long as necessary for the purposes described; programme data for the duration
        of the relationship plus any statutory retention period.
      </p>

      <h2>7. Your rights</h2>
      <p>Under the UK GDPR you have the right to:</p>
      <ul>
        <li>access a copy of your personal data;</li>
        <li>rectification of inaccurate data;</li>
        <li>erasure (&quot;right to be forgotten&quot;), where applicable;</li>
        <li>restriction of processing;</li>
        <li>data portability;</li>
        <li>object to processing based on legitimate interests or direct marketing;</li>
        <li>withdraw consent at any time.</li>
      </ul>
      <p>
        To exercise any right, contact <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a>.
        You also have the right to lodge a complaint with the Information Commissioner&apos;s
        Office (ICO) at <a href="https://ico.org.uk">ico.org.uk</a>.
      </p>

      <h2>8. Cookies</h2>
      <p>
        We use cookies and similar technologies as described in our Cookie Policy, in line with
        the Privacy and Electronic Communications Regulations (PECR).
      </p>

      <h2>9. Security</h2>
      <p>
        We implement appropriate technical and organisational measures to protect your personal
        data against unauthorised access, loss, or disclosure.
      </p>

      <h2>10. Changes &amp; contact</h2>
      <p>
        We may update this policy from time to time; the &quot;last updated&quot; date reflects
        the latest version. For any question about this policy or your data, contact{" "}
        <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a>.
      </p>
    </LegalDocEN>
  );
}
