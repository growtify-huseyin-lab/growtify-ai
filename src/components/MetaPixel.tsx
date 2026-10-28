"use client";

// Meta Pixel — consent-gated like GoogleAnalytics. Loads only when:
//  - NEXT_PUBLIC_META_PIXEL_ID is set (no ID → renders nothing),
//  - the visitor granted the "marketing" cookie category,
//  - the page is TR (EN privacy/cookie policies don't list Meta yet).
// Later opt-out → fbq('consent', 'revoke') stops sending without a reload.
// Conversion events come from trackEvent() in @/lib/gtag.
import Script from "next/script";
import { usePathname } from "next/navigation";
import { useLocale } from "next-intl";
import { useEffect, useRef, useState } from "react";
import { hasConsent } from "@/lib/cookie-consent";

const PIXEL_ID = (process.env.NEXT_PUBLIC_META_PIXEL_ID ?? "").replace(/\D/g, "");

type Fbq = (...args: unknown[]) => void;

function getFbq(): Fbq | undefined {
  const fbq = (window as unknown as { fbq?: Fbq }).fbq;
  return typeof fbq === "function" ? fbq : undefined;
}

export function MetaPixel() {
  const locale = useLocale();
  const pathname = usePathname();
  const [enabled, setEnabled] = useState(false);
  const lastPath = useRef<string | null>(null);
  const active = Boolean(PIXEL_ID) && locale !== "en";

  useEffect(() => {
    if (!active) return;
    const sync = () => {
      const ok = hasConsent("marketing");
      setEnabled(ok);
      getFbq()?.("consent", ok ? "grant" : "revoke");
    };
    sync();
    window.addEventListener("growtify:consent_changed", sync);
    window.addEventListener("growtify:consent_reset", sync);
    return () => {
      window.removeEventListener("growtify:consent_changed", sync);
      window.removeEventListener("growtify:consent_reset", sync);
    };
  }, [active]);

  // The init snippet tracks the first PageView; client-side navigations are tracked here.
  useEffect(() => {
    if (!enabled) return;
    if (lastPath.current !== null && lastPath.current !== pathname) {
      getFbq()?.("track", "PageView");
    }
    lastPath.current = pathname;
  }, [enabled, pathname]);

  if (!active || !enabled) return null;

  return (
    <Script id="meta-pixel" strategy="afterInteractive">
      {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
document,'script','https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '${PIXEL_ID}');
fbq('track', 'PageView');`}
    </Script>
  );
}
