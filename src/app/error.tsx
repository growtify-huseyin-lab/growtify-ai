"use client";

import { useEffect } from "react";
import { Container } from "@/components/ui/Container";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[ErrorBoundary]", error);
  }, [error]);

  return (
    <section className="min-h-[60vh] flex items-center justify-center bg-white dark:bg-dark-bg transition-colors">
      <Container>
        <div className="mx-auto max-w-lg text-center">
          <div className="text-6xl mb-6">⚠️</div>
          <h1 className="text-2xl font-bold text-dark dark:text-white mb-4">
            Bir şeyler ters gitti
          </h1>
          <p className="text-gray-600 dark:text-dark-muted mb-8">
            Sayfayı yüklerken beklenmeyen bir hata oluştu. Lütfen tekrar
            deneyin.
          </p>
          <button
            onClick={reset}
            className="rounded-xl bg-primary px-8 py-3 text-white font-semibold hover:bg-primary/90 transition-colors"
          >
            Tekrar Dene
          </button>
        </div>
      </Container>
    </section>
  );
}
