"use client";

import { motion } from "motion/react";
import { useQuiz } from "../lib/QuizContext";

interface ScreenShellProps {
  caption?: string;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  /** Show previous button? Defaults true (except on first screen). */
  showBack?: boolean;
}

/**
 * Standard vertical wrapper used by all screen templates.
 * Header (progress + phase label) + body + footer nav.
 */
export function ScreenShell({
  caption,
  title,
  subtitle,
  children,
  showBack = true,
}: ScreenShellProps) {
  const { currentIndex, progress, totalScreens, prev } = useQuiz();
  const percent = Math.round(progress * 100);

  return (
    <div className="mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-2xl flex-col px-4 py-6">
      {/* Progress bar */}
      <div className="mb-6">
        <div className="flex items-center justify-end text-xs text-gray-500 dark:text-dark-muted">
          <span>
            {currentIndex + 1} / {totalScreens}
          </span>
        </div>
        <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-dark-border">
          <motion.div
            className="h-full rounded-full bg-primary"
            initial={false}
            animate={{ width: `${percent}%` }}
            transition={{ type: "spring", stiffness: 120, damping: 20 }}
          />
        </div>
      </div>

      {/* Body */}
      <div className="flex-1">
        {caption && (
          <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-primary/70">
            {caption}
          </div>
        )}
        <h1 className="text-2xl font-extrabold leading-tight tracking-tight text-dark dark:text-white sm:text-3xl">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-3 text-base text-gray-600 dark:text-dark-muted">
            {subtitle}
          </p>
        )}

        <div className="mt-8">{children}</div>
      </div>

      {/* Footer nav */}
      <div className="mt-8 flex items-center justify-between border-t border-gray-100 pt-4 dark:border-dark-border">
        {showBack && currentIndex > 0 ? (
          <button
            type="button"
            onClick={prev}
            className="text-sm text-gray-500 hover:text-primary dark:text-dark-muted"
          >
            ← Geri
          </button>
        ) : (
          <span />
        )}
        <span />
      </div>
    </div>
  );
}

interface PrimaryButtonProps {
  onClick?: () => void;
  disabled?: boolean;
  children: React.ReactNode;
  type?: "button" | "submit";
}

export function PrimaryButton({
  onClick,
  disabled,
  children,
  type = "button",
}: PrimaryButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className="w-full rounded-xl bg-primary px-6 py-4 text-base font-bold text-white shadow-lg transition-all hover:bg-primary/90 hover:shadow-xl active:scale-[0.98] disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-500 disabled:shadow-none dark:disabled:bg-dark-border"
    >
      {children}
    </button>
  );
}

export function OptionButton({
  selected,
  onClick,
  children,
}: {
  selected?: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full rounded-xl border-2 px-5 py-4 text-left text-base font-medium transition-all active:scale-[0.98] ${
        selected
          ? "border-primary bg-primary/10 text-primary dark:bg-primary/20"
          : "border-gray-200 bg-white text-dark hover:border-primary/50 hover:bg-primary/5 dark:border-dark-border dark:bg-dark-bg dark:text-white dark:hover:border-primary/50"
      }`}
    >
      {children}
    </button>
  );
}
