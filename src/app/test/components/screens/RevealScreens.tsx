"use client";

import { useMemo, useRef, useState, useEffect } from "react";
import { motion } from "motion/react";
import { useQuiz } from "../../lib/QuizContext";
import type { ScreenConfig } from "../../lib/types";
import { ScreenShell, PrimaryButton } from "../ScreenShell";

/* -------------------- Plan Ready (Ekran 34) -------------------- */
export function PlanReadyScreen({ screen }: { screen: ScreenConfig }) {
  const { state, next } = useQuiz();
  const title = useMemo(
    () => screen.title.replace("{firstName}", state.firstName || "sen"),
    [screen.title, state.firstName],
  );

  return (
    <ScreenShell caption={screen.caption} title={title} subtitle={screen.subtitle}>
      <div className="rounded-2xl border-2 border-primary/30 bg-gradient-to-br from-primary/5 to-accent/10 p-6 text-center dark:border-primary/40">
        <div className="text-5xl">🎯</div>
        <div className="mt-3 text-lg font-bold text-dark dark:text-white">
          {state.persona} profili · 4 haftalık dönüşüm planın
        </div>
        <p className="mt-2 text-sm text-gray-600 dark:text-dark-muted">
          Günde {state.commitment ?? 30} dk · Level 1-3 (G + R + O)
        </p>
      </div>
      <div className="mt-8">
        <PrimaryButton onClick={next}>{screen.cta ?? "Devam"}</PrimaryButton>
      </div>
    </ScreenShell>
  );
}

/* -------------------- Scratch Card (Ekran 35) -------------------- */
export function ScratchCardScreen({ screen }: { screen: ScreenConfig }) {
  const { state, next, couponCode } = useQuiz();
  const [revealed, setRevealed] = useState(false);
  const [progress, setProgress] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isScratchingRef = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    // Paint the scratch-off layer
    const grad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    grad.addColorStop(0, "#94a3b8");
    grad.addColorStop(1, "#475569");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.font = "bold 22px sans-serif";
    ctx.fillStyle = "#ffffff";
    ctx.textAlign = "center";
    ctx.fillText("Kazı!", canvas.width / 2, canvas.height / 2);
  }, []);

  const scratch = (x: number, y: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc(x, y, 24, 0, Math.PI * 2);
    ctx.fill();

    // Sample progress
    const { width, height } = canvas;
    const data = ctx.getImageData(0, 0, width, height).data;
    let cleared = 0;
    for (let i = 3; i < data.length; i += 4 * 40) {
      if (data[i] === 0) cleared++;
    }
    const pct = cleared / (data.length / (4 * 40));
    setProgress(pct);
    if (pct > 0.45 && !revealed) setRevealed(true);
  };

  const handlePointer = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isScratchingRef.current) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    scratch(e.clientX - rect.left, e.clientY - rect.top);
  };

  return (
    <ScreenShell caption={screen.caption} title={screen.title} subtitle={screen.subtitle}>
      <div className="relative mx-auto h-56 w-full max-w-sm overflow-hidden rounded-2xl border-2 border-primary/30 bg-gradient-to-br from-amber-100 to-amber-200 dark:from-amber-900 dark:to-amber-950">
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="text-xs font-semibold uppercase tracking-wider text-amber-900 dark:text-amber-200">
            Özel indirimin
          </div>
          <div className="mt-1 text-6xl font-black text-amber-900 dark:text-amber-200">
            %{state.discount}
          </div>
          <div className="mt-1 text-xs font-semibold text-amber-800 dark:text-amber-300">
            GROWT Programı
          </div>
        </div>
        <canvas
          ref={canvasRef}
          width={400}
          height={224}
          className="absolute inset-0 h-full w-full cursor-pointer touch-none"
          onPointerDown={(e) => {
            isScratchingRef.current = true;
            e.currentTarget.setPointerCapture(e.pointerId);
            handlePointer(e);
          }}
          onPointerMove={handlePointer}
          onPointerUp={() => (isScratchingRef.current = false)}
          style={{ opacity: revealed ? 0 : 1, transition: "opacity 0.4s" }}
        />
      </div>
      {revealed && couponCode && (
        <div className="mt-4 rounded-xl border-2 border-dashed border-primary/40 bg-primary/5 p-4 text-center dark:bg-primary/10">
          <div className="text-[10px] font-semibold uppercase tracking-wider text-gray-500 dark:text-dark-muted">
            Kupon kodun
          </div>
          <div className="mt-1 font-mono text-2xl font-black tracking-widest text-primary">
            {couponCode}
          </div>
          <div className="mt-1 text-[10px] text-gray-500 dark:text-dark-muted">
            Tek kullanımlık · Kişiselleştirilmiş teklif · Devredilemez
          </div>
        </div>
      )}
      <div className="mt-4">
        <PrimaryButton onClick={next} disabled={!revealed}>
          {revealed
            ? (screen.cta ?? "Devam")
            : `Kazımaya devam et (${Math.round(progress * 100)}%)`}
        </PrimaryButton>
      </div>
    </ScreenShell>
  );
}

/* -------------------- Celebration (Ekran 36) -------------------- */
export function CelebrationScreen({ screen }: { screen: ScreenConfig }) {
  const { state, next, couponCode } = useQuiz();
  const title = useMemo(
    () => screen.title.replace("{firstName}", state.firstName || "dostum"),
    [screen.title, state.firstName],
  );

  return (
    <ScreenShell caption={screen.caption} title={title} subtitle={screen.subtitle}>
      <Confetti />
      <motion.div
        initial={{ scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 180, damping: 14 }}
        className="rounded-2xl border-2 border-green-300 bg-gradient-to-br from-green-50 to-emerald-50 p-8 text-center dark:border-green-800 dark:from-green-950 dark:to-emerald-950"
      >
        <motion.div
          className="text-6xl"
          animate={{ rotate: [0, -10, 10, -10, 0] }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          🎉
        </motion.div>
        <div className="mt-4 text-3xl font-black text-green-700 dark:text-green-300">
          %{state.discount} İNDİRİM
        </div>
        {couponCode && (
          <div className="mt-3 rounded-lg bg-white/50 px-4 py-2 dark:bg-dark-bg/50">
            <div className="font-mono text-lg font-black tracking-widest text-green-800 dark:text-green-200">
              {couponCode}
            </div>
          </div>
        )}
        <p className="mt-2 text-sm text-green-800 dark:text-green-400">
          Kupon kodun aktif. Ödeme sayfasında uygulayabilirsin.
        </p>
      </motion.div>
      <div className="mt-8">
        <PrimaryButton onClick={next}>{screen.cta ?? "Devam"}</PrimaryButton>
      </div>
    </ScreenShell>
  );
}

/* -------------------- Confetti (pure motion, no deps) -------------------- */
function Confetti() {
  // 40 particles launched from center, expired after 2s.
  const particles = useMemo(
    () =>
      Array.from({ length: 40 }, (_, i) => {
        const angle = Math.random() * Math.PI * 2;
        const distance = 120 + Math.random() * 180;
        return {
          id: i,
          x: Math.cos(angle) * distance,
          y: Math.sin(angle) * distance,
          rotate: Math.random() * 720 - 360,
          color: ["#2563EB", "#22C55E", "#F59E0B", "#EF4444", "#A855F7"][i % 5],
          size: 6 + Math.random() * 8,
          delay: Math.random() * 0.15,
        };
      }),
    [],
  );

  return (
    <div className="pointer-events-none relative h-0">
      <div className="absolute left-1/2 top-0 h-0 w-0">
        {particles.map((p) => (
          <motion.div
            key={p.id}
            initial={{ x: 0, y: 0, opacity: 1, rotate: 0 }}
            animate={{
              x: p.x,
              y: p.y,
              opacity: 0,
              rotate: p.rotate,
            }}
            transition={{
              duration: 1.6,
              delay: p.delay,
              ease: "easeOut",
            }}
            className="absolute rounded-sm"
            style={{
              width: p.size,
              height: p.size,
              backgroundColor: p.color,
            }}
          />
        ))}
      </div>
    </div>
  );
}
