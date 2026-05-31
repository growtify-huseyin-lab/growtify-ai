import { LegalDocEN } from "./LegalDocEN";
import { COMPANY } from "@/lib/company-info";

// UK Consumer Contracts (Information, Cancellation and Additional Charges)
// Regulations 2013 — distance selling.
export function RefundPolicyEN() {
  return (
    <LegalDocEN title="Refund & Cancellation Policy" lastUpdated="9 April 2026">
      <p>
        This policy explains your cancellation and refund rights when you purchase services
        from Humax Global Ltd (Growtify.ai), a company registered in England and Wales (company
        number {COMPANY.companyNumber}). It reflects your rights under the Consumer Contracts (Information,
        Cancellation and Additional Charges) Regulations 2013.
      </p>

      <h2>1. 14-day cancellation right</h2>
      <p>
        As our services are sold at a distance, you generally have the right to cancel within
        14 days of entering into the contract (the &quot;cooling-off period&quot;), without
        giving a reason.
      </p>

      <h2>2. Services that begin during the cooling-off period</h2>
      <p>
        If you ask us to begin providing the service during the 14-day period, you acknowledge
        that:
      </p>
      <ul>
        <li>
          you may be charged a proportionate amount for the service provided up to the point
          you cancel; and
        </li>
        <li>
          for digital content or services that are fully performed during the period, your
          right to cancel is lost once performance has begun with your express consent and
          acknowledgement.
        </li>
      </ul>

      <h2>3. How to cancel</h2>
      <p>
        To cancel, contact us at <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a> with
        your name, order details, and a clear statement that you wish to cancel. You may use a
        clear written statement; a model cancellation form is available on request.
      </p>

      <h2>4. Refunds</h2>
      <p>
        Where a refund is due, we will process it without undue delay and no later than 14 days
        after we are informed of your cancellation, using the same payment method you used,
        unless agreed otherwise. We may deduct a proportionate amount for any service already
        provided at your request.
      </p>

      <h2>5. Statutory rights</h2>
      <p>
        This policy does not affect your statutory rights under the Consumer Rights Act 2015 or
        other applicable UK consumer-protection law.
      </p>

      <h2>6. Contact</h2>
      <p>
        For any cancellation or refund query, contact{" "}
        <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a>.
      </p>
    </LegalDocEN>
  );
}
