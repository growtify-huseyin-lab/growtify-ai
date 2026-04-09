import Link from "next/link";

/**
 * Growtify.ai Logo — Light/Dark ayrı orijinal PNG
 */
export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link href="/" className={`inline-block ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/growtify-light.png"
        alt="Growtify.ai"
        className="h-20 w-auto dark:hidden"
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/growtify-dark.png"
        alt="Growtify.ai"
        className="h-20 w-auto hidden dark:block"
      />
    </Link>
  );
}

/**
 * Footer logo — koyu arka plan, her zaman dark (beyaz text) logo
 */
export function LogoLarge({ className = "" }: { className?: string }) {
  return (
    <Link href="/" className={`inline-block ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/growtify-dark.png"
        alt="Growtify.ai"
        className="h-12 w-auto"
      />
    </Link>
  );
}
