"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, Moon, Sun } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/ui/Logo";
import { NAV_LINKS } from "@/lib/constants";
import { useTheme } from "@/components/ThemeProvider";

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-50 border-b border-gray-100 dark:border-dark-border bg-white/95 dark:bg-dark-bg/95 backdrop-blur-sm transition-colors">
      <Container>
        <nav className="flex h-16 items-center justify-between">
          <Logo />

          {/* Desktop nav */}
          <div className="hidden items-center gap-1 lg:flex">
            {NAV_LINKS.filter((l) => l.href !== "/").map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-lg px-3 py-2 text-sm font-medium text-text dark:text-dark-text transition-colors hover:bg-primary/5 hover:text-primary"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-3">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-text dark:text-dark-text hover:bg-primary/5 transition-colors"
              aria-label="Tema değiştir"
            >
              {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <Button href="https://app.growtify.app/payment-link/69d20484c6a0e600f4d07a46" variant="primary" size="sm" external>
              Hemen Başla
            </Button>
          </div>

          {/* Mobile toggle */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={toggleTheme}
              className="p-2 text-text dark:text-dark-text"
              aria-label="Tema değiştir"
            >
              {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button
              className="p-2 text-text dark:text-dark-text"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Menu"
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </nav>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="border-t border-gray-100 dark:border-dark-border py-4 lg:hidden">
            <div className="flex flex-col gap-1">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="rounded-lg px-4 py-3 text-base font-medium text-text dark:text-dark-text transition-colors hover:bg-primary/5"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <div className="mt-3 px-4">
                <Button href="https://app.growtify.app/payment-link/69d20484c6a0e600f4d07a46" variant="primary" size="md" external className="w-full">
                  Hemen Başla
                </Button>
              </div>
            </div>
          </div>
        )}
      </Container>
    </header>
  );
}
