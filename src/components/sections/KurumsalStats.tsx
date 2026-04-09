"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { Container } from "@/components/ui/Container";
import { KURUMSAL_STATS } from "@/lib/kurumsal-constants";

function parseStatValue(value: string): { prefix: string; number: number; suffix: string } {
  const match = value.match(/^([%]?)([0-9]+(?:\.[0-9]+)?)(.*)$/);
  if (!match) return { prefix: "", number: 0, suffix: value };
  return { prefix: match[1], number: parseFloat(match[2]), suffix: match[3] };
}

function AnimatedStat({ value, label }: { value: string; label: string }) {
  const [displayed, setDisplayed] = useState("0");
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const { prefix, number, suffix } = parseStatValue(value);
  const hasDecimal = value.includes(".");

  const animate = useCallback(() => {
    if (hasAnimated) return;
    setHasAnimated(true);
    const duration = 1500;
    const startTime = performance.now();

    function step(currentTime: number) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = eased * number;

      if (hasDecimal) {
        setDisplayed(current.toFixed(1));
      } else {
        setDisplayed(Math.round(current).toLocaleString("tr-TR"));
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
    <div ref={ref} className="text-center">
      <p className="text-5xl font-extrabold text-accent">
        {prefix}
        {displayed}
        {suffix}
      </p>
      <p className="mt-2 text-base text-white/90 font-medium">{label}</p>
    </div>
  );
}

export function KurumsalStats() {
  return (
    <section className="py-16 bg-gradient-to-br from-primary via-primary-light to-primary">
      <Container>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {KURUMSAL_STATS.map((stat) => (
            <AnimatedStat
              key={stat.label}
              value={stat.value}
              label={stat.label}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
