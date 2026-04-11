/**
 * Legal company information — used across all legal pages
 * (gizlilik, kvkk, kullanım koşulları, iade, çerez).
 *
 * Growtify.ai ve Growtify.app marka adlarıdır; yasal kurum farklıdır.
 * Tüm yasal metinlerde şirket: Humax Global LTD
 */
export const COMPANY = {
  legalName: "Humax Global LTD",
  brand: "Growtify",
  country: "Birleşik Krallık (UK)",
  address: "71-75 Shelton Street, Covent Garden, London, UK",
  email: "info@growtify.app",
  phoneUK: "+44 7447 850874",
  phoneUS: "+1 825-906-9996",
  website: "growtify.ai",
  websiteUrl: "https://growtify.ai",
  // Companies House registration number — sonradan eklenecek
  companyNumber: null as string | null,
  // VAT / Tax number — sonradan eklenecek
  vatNumber: null as string | null,
} as const;
