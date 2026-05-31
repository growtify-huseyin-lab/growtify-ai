"use client";

/**
 * Root-level error boundary — catches errors in layout.tsx itself.
 * Must render its own <html>/<body> since the root layout may have crashed.
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="tr">
      <body
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0f0f13",
          color: "#e0e0e8",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div style={{ textAlign: "center", maxWidth: 480, padding: 40 }}>
          <div style={{ fontSize: 64, marginBottom: 24 }}>⚠️</div>
          <h1 style={{ fontSize: 24, fontWeight: 700, marginBottom: 16 }}>
            Bir şeyler ters gitti
          </h1>
          <p style={{ color: "#9090a0", marginBottom: 32 }}>
            Sayfa yüklenirken kritik bir hata oluştu.
          </p>
          <button
            onClick={reset}
            style={{
              padding: "12px 32px",
              borderRadius: 12,
              border: "none",
              backgroundColor: "#5d47f0",
              color: "#fff",
              fontWeight: 600,
              fontSize: 16,
              cursor: "pointer",
            }}
          >
            Tekrar Dene
          </button>
        </div>
      </body>
    </html>
  );
}
