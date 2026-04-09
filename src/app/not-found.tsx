import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { ArrowLeft, Search } from "lucide-react";

export default function NotFound() {
  return (
    <section className="py-32 bg-white dark:bg-dark-bg transition-colors">
      <Container>
        <div className="mx-auto max-w-lg text-center">
          <div className="flex justify-center mb-8">
            <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-primary/10 dark:bg-primary/20">
              <Search size={36} className="text-primary" />
            </div>
          </div>
          <h1 className="text-4xl font-extrabold text-dark dark:text-white">
            Sayfa Bulunamadı
          </h1>
          <p className="mt-4 text-gray-600 dark:text-dark-muted leading-relaxed">
            Aradığın sayfa taşınmış, silinmiş veya hiç var olmamış olabilir.
          </p>
          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Button href="/" variant="primary" size="lg">
              <ArrowLeft size={18} className="mr-2" />
              Ana Sayfaya Dön
            </Button>
            <Button href="/blog" variant="ghost" size="lg" className="border border-gray-200 dark:border-dark-border">
              Blog Yazılarına Göz At
            </Button>
          </div>
          <div className="mt-12 text-sm text-gray-500 dark:text-dark-muted">
            <p>Popüler sayfalar:</p>
            <div className="mt-3 flex flex-wrap justify-center gap-3">
              <Link href="/growt-method" className="text-primary hover:underline">GROWT Method</Link>
              <Link href="/sektor" className="text-primary hover:underline">Sektörler</Link>
              <Link href="/test" className="text-primary hover:underline">AI Olgunluk Testi</Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
