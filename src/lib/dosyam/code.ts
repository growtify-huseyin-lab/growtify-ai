// Giriş kodu: üret, Worker'a hash'ini yaz, kişinin e-postasına gönder. E-posta ve panel ipucu yolları ortak.
import crypto from "node:crypto";
import { dosyamApi } from "./api";
import { type GhlContact, sendCodeEmail } from "./ghl";
import { emailHash, hashHex } from "./session";

// ch = e-postanın biberli hash'i: istemci kodu doğrularken bunu taşır (e-postanın kendisi değil).
export async function issueCode(contact: GhlContact): Promise<string | null> {
  if (!contact.email) return null;
  const ch = emailHash(contact.email);
  const code = String(crypto.randomInt(0, 1_000_000)).padStart(6, "0");
  const saved = await dosyamApi("POST", "/v1/auth/code", { body: { email_hash: ch, code_hash: hashHex(`${ch}:${code}`), contact_id: contact.id } });
  if (!saved.body.ok) return null;
  return (await sendCodeEmail(contact.id, contact.firstName ?? "", code).catch(() => false)) ? ch : null;
}

// "huseyin@growtify.app" → "h***@growtify.app"
export function maskEmail(email: string): string {
  const [u, d] = email.split("@");
  return `${u.slice(0, 1)}***@${d ?? ""}`;
}
