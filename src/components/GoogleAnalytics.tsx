"use client";

// Google Analytics 4 — consent-gated. GA only loads after the visitor grants the
// "analytics" cookie category (CookieBanner / cookie-consent lib, which is designed
// for exactly this). Respects GPC auto-reject. Reacts to later opt-in/opt-out.
import Script from "next/script";
import { useEffect, useState } from "react";
import { hasConsent } from "@/lib/cookie-consent";

const GA_ID = "G-03ZXSXXKL9";

export function GoogleAnalytics() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const sync = () => setEnabled(hasConsent("analytics"));
    sync();
    window.addEventListener("growtify:consent_changed", sync);
    window.addEventListener("growtify:consent_reset", sync);
    return () => {
      window.removeEventListener("growtify:consent_changed", sync);
      window.removeEventListener("growtify:consent_reset", sync);
    };
  }, []);

  if (!enabled) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA_ID}');`}
      </Script>
    </>
  );
}
