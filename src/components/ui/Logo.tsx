import Link from "next/link";
import Image from "next/image";

/**
 * Growtify.ai Logo — Light/Dark mode ayrı orijinal PNG
 * Light: koyu gri text, Dark: beyaz text
 */
export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link href="/" className={`inline-block ${className}`}>
      <Image
        src="/images/GROWTIFY-ai-.png"
        alt="Growtify.ai"
        width={280}
        height={80}
        className="h-16 w-auto dark:hidden"
        priority
      />
      <Image
        src="/images/growtify-dark.png"
        alt="Growtify.ai"
        width={280}
        height={80}
        className="h-16 w-auto hidden dark:block"
        priority
      />
    </Link>
  );
}

/**
 * Logo büyük versiyon — Footer (koyu arka plan, her zaman dark logo)
 */
export function LogoLarge({ className = "" }: { className?: string }) {
  return (
    <Link href="/" className={`inline-block ${className}`}>
      <Image
        src="/images/growtify-dark.png"
        alt="Growtify.ai"
        width={280}
        height={80}
        className="h-12 w-auto"
      />
    </Link>
  );
}
