"use client";

export default function CikisButton() {
  return (
    <button
      onClick={async () => {
        await fetch("/api/dosyam/cikis", { method: "POST" });
        window.location.href = "/dosyam";
      }}
      className="text-sm text-gray-500 underline"
    >
      Çıkış
    </button>
  );
}
