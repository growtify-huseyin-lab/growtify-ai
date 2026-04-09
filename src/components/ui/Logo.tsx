import Link from "next/link";

/**
 * Growtify.ai Logo
 * Light mode: orijinal (koyu gri text)
 * Dark mode: CSS invert ile beyaz text
 */
export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link href="/" className={`inline-block ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/growtify-light.png"
        alt="Growtify.ai"
        className="h-14 w-auto dark:brightness-0 dark:invert"
      />
    </Link>
  );
}

/**
 * Footer logo — koyu arka plan, her zaman beyaz (invert)
 */
export function LogoLarge({ className = "" }: { className?: string }) {
  return (
    <Link href="/" className={`inline-block ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/growtify-light.png"
        alt="Growtify.ai"
        className="h-12 w-auto brightness-0 invert"
      />
    </Link>
  );
}
