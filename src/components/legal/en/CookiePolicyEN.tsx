import { LegalDocEN } from "./LegalDocEN";
import { COMPANY } from "@/lib/company-info";

// PECR-aligned cookie policy.
export function CookiePolicyEN() {
  return (
    <LegalDocEN title="Cookie Policy" lastUpdated="9 April 2026">
      <p>
        This Cookie Policy explains how Humax Global Ltd (Growtify.ai) uses cookies and similar
        technologies, in line with the Privacy and Electronic Communications Regulations (PECR)
        and the UK GDPR.
      </p>

      <h2>1. What are cookies?</h2>
      <p>
        Cookies are small text files stored on your device when you visit a website. They help
        the site function, remember your preferences, and provide analytics.
      </p>

      <h2>2. Categories of cookies we use</h2>
      <ul>
        <li>
          <strong>Strictly necessary</strong> — required for the website to function (e.g.
          security, load balancing, remembering your theme preference). These do not require
          consent.
        </li>
        <li>
          <strong>Analytics / performance</strong> — help us understand how visitors use the
          site so we can improve it. Set only with your consent.
        </li>
        <li>
          <strong>Functional</strong> — remember choices you make to personalise your
          experience. Set only with your consent.
        </li>
        <li>
          <strong>Marketing</strong> — used to measure and improve campaigns. Set only with
          your consent.
        </li>
      </ul>

      <h2>3. Consent</h2>
      <p>
        Non-essential cookies are only set after you give consent via our cookie banner. You can
        change or withdraw your consent at any time through the cookie settings.
      </p>

      <h2>4. Managing cookies</h2>
      <p>
        You can control or delete cookies through your browser settings. Blocking some cookies
        may affect how the website works.
      </p>

      <h2>5. Specific cookies</h2>
      <p>
        A current list of the specific cookies we set, their purpose, and duration is available on request.
      </p>

      <h2>6. Changes &amp; contact</h2>
      <p>
        We may update this policy from time to time. For any question, contact{" "}
        <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a>.
      </p>
    </LegalDocEN>
  );
}
