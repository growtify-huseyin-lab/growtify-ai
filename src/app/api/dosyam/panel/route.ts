// GET /api/dosyam/panel?ft=<firebase id token>&bolum=R2 — panelden tek tık giriş.
// Panel betiği üyenin canlı Firebase kimliğini iletir; Google anahtarlarıyla doğrulanır (G1 köprüsü).
// Firebase sub = GHL kişi kimliği (G1'de doğrulandı).
import { NextResponse } from "next/server";
import { verifyFirebaseIdToken } from "@/lib/g1/firebase-verify";
import { contactFromFirebase } from "@/lib/dosyam/ghl";
import { loginContact } from "@/lib/dosyam/login";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const ft = url.searchParams.get("ft") ?? "";
  const bolum = url.searchParams.get("bolum") ?? "";
  const dest = new URL(/^[A-Z_]{1,16}[0-9]{0,2}[A-Z]?$/.test(bolum) ? `/dosyam/${bolum}` : "/dosyam", url.origin);
  const fb = await verifyFirebaseIdToken(ft);
  if (fb.ok && fb.uid) {
    const contact = await contactFromFirebase(fb.uid, fb.emailVerified ? fb.email : undefined, fb.role);
    if (contact) {
      const login = await loginContact(contact);
      if (login.ok) return NextResponse.redirect(dest, 303);
    }
  }
  return NextResponse.redirect(new URL("/dosyam?giris=panel", url.origin), 303);
}
