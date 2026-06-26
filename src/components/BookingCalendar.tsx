"use client";

import Script from "next/script";

// GHL booking widget (Görüşme Planla / mentörlük). form_embed.js auto-resizes
// the iframe to its content height (scrolling="no"). Rendered at most once per
// page (modal on /hakkimizda OR inline on /mentorluk — never both on one page).
export function BookingCalendar({ className = "" }: { className?: string }) {
  return (
    <div className={className}>
      <iframe
        src="https://app.growtify.app/widget/booking/tJJd6BNjFu05nZFJBXjS"
        title="Görüşme Planla"
        scrolling="no"
        id="tJJd6BNjFu05nZFJBXjS_1782476077899"
        style={{
          width: "100%",
          border: "none",
          overflow: "hidden",
          minHeight: "640px",
        }}
      />
      <Script
        src="https://app.growtify.app/js/form_embed.js"
        strategy="afterInteractive"
      />
    </div>
  );
}
