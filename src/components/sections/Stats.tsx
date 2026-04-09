"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { Container } from "@/components/ui/Container";
import { STATS } from "@/lib/constants";

function parseStatValue(value: string): { prefix: string; number: number; suffix: string } {
  const match = value.match(/^([%]?)([0-9]+(?:\.[0-9]+)?)(.*)$/);
  if (!match) return { prefix: "", number: 0, suffix: "" };
  return { prefix: match[1], number: parseFloat(match[2]), suffix: match[3] };
}

function AnimatedStat({ value, label, source }: { value: string; label: string; source: string }) {
  const [displayed, setDisplayed] = useState("0");
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const { prefix, number, suffix } = parseStatValue(value);
  const hasDecimal = value.includes(".");

  const animate = useCallback(() => {
    if (hasAnimated) return;
    setHasAnimated(true);
    const duration = 1800;
    const startTime = performance.now();

    function step(currentTime: number) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = eased * number;

      if (hasDecimal) {
        setDisplayed(current.toFixed(1));
      } else {
        setDisplayed(Math.round(current).toString());
      }

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    }
    requestAnimationFrame(step);
  }, [hasAnimated, number, hasDecimal]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          animate();
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [animate]);

  return (
    <div ref={ref} className="text-center px-4">
      <p className="text-5xl lg:text-6xl font-extrabold text-accent tracking-tight">
        {prefix}{displayed}{suffix}
      </p>
      <p className="mt-3 text-sm text-white/80 leading-relaxed max-w-xs mx-auto">{label}</p>
      <p className="mt-2 text-xs text-white/40">{source}</p>
    </div>
  );
}

export function Stats() {
  return (
    <section className="relative py-20 overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-dark via-primary/90 to-dark" />
      {/* Subtle grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage: "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />
      <Container className="relative">
        <div className="grid gap-10 sm:grid-cols-3">
          {STATS.map((stat) => (
            <AnimatedStat
              key={stat.label}
              value={stat.value}
              label={stat.label}
              source={stat.source}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
