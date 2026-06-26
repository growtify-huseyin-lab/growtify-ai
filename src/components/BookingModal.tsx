"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { BookingCalendar } from "./BookingCalendar";

// Wraps a card (children) as a trigger that opens the GHL booking calendar in a
// centered popup — just the calendar, no navigation, no new tab. Closes on
// Esc / backdrop click / X.
export function BookingModal({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="group block h-full w-full text-left"
      >
        {children}
      </button>

      {open && (
        <div
          className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto bg-black/60 p-4 backdrop-blur-sm sm:items-center"
          onClick={() => setOpen(false)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="relative my-auto w-full max-w-2xl rounded-2xl bg-white p-2 shadow-2xl dark:bg-dark-card sm:p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Kapat"
              className="absolute right-3 top-3 z-10 rounded-full bg-white/90 p-2 text-gray-600 shadow transition hover:text-dark dark:bg-dark-bg/90 dark:text-dark-muted dark:hover:text-white"
            >
              <X size={18} />
            </button>
            <BookingCalendar />
          </div>
        </div>
      )}
    </>
  );
}
