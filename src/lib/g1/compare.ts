// G1 / DeepGap — transformation narrative. Turns the numeric before/after of a
// retake into an interpreted comparison ("you leveled up", "biggest move was X",
// "Y is now your next focus"). Every retake is read against the previous reading,
// so each subsequent test is itself a transformation snapshot — no separate module.
// Pure + rule-based (consistent with synthesis.ts tone); Creative can refine copy.
import type { G1BeforeAfter, G1Comparison } from "./types";

function fmtDelta(delta: number): string {
  return `${delta > 0 ? "+" : ""}${delta}`;
}

export function buildG1Comparison(
  ba: G1BeforeAfter,
  currentLevel: string,
  priorLevel: string,
): G1Comparison {
  const direction: G1Comparison["direction"] =
    ba.delta > 0 ? "up" : ba.delta < 0 ? "down" : "flat";
  const levelChanged = Boolean(priorLevel && currentLevel && priorLevel !== currentLevel);

  // Most-improved (highest +Δ) and the laggard (lowest Δ, only if ≤ 0).
  const byDelta = [...ba.dims].sort((a, b) => b.delta - a.delta);
  const best = byDelta[0];
  const worst = byDelta[byDelta.length - 1];
  const topGain = best && best.delta > 0 ? { label: best.label, delta: best.delta } : null;
  const lagging = worst && worst.delta <= 0 ? { label: worst.label, delta: worst.delta } : null;

  // 1) Opening — frame the overall movement honestly.
  let headline: string;
  let opening: string;
  if (direction === "up" && levelChanged) {
    headline = `${priorLevel} → ${currentLevel}`;
    opening = `İlk ölçümünden bu yana net bir sıçrama var: artık ${currentLevel} seviyesindesin (genel skor ${ba.before} → ${ba.after}, ${fmtDelta(ba.delta)}).`;
  } else if (direction === "up") {
    headline = `${currentLevel} · ${fmtDelta(ba.delta)} ilerleme`;
    opening = `Hâlâ ${currentLevel} seviyesindesin ama içeride gerçek bir ilerleme var — genel skorun yükseldi: ${ba.before} → ${ba.after} (${fmtDelta(ba.delta)}).`;
  } else if (direction === "flat") {
    headline = `Genel skor sabit · dağılım değişti`;
    opening = `Genel skorun ${ba.after}'da sabit görünüyor — ama bu durağanlık değil; bazı boyutlarda ilerlerken bazıları seni bekliyor.`;
  } else {
    headline = `${ba.before} → ${ba.after}`;
    opening = `Genel skorun düşmüş görünüyor (${ba.before} → ${ba.after}). Bu çoğu zaman geri gidiş değil, “artık daha net görüyorum” demektir — öğrendikçe kendine daha gerçekçi puan verirsin. Asıl bakılacak yer: hangi boyutta gerçekten ilerledin.`;
  }

  // 2) Biggest move. (No locative suffix on the dynamic label — avoids
  //    "Derinlik'de" vs "Derinlik'te" Turkish suffix-harmony bugs.)
  const gainSentence = topGain
    ? `En büyük ilerleme: ${topGain.label} (${fmtDelta(topGain.delta)}).`
    : "";

  // 3) Laggard → next focus.
  let lagSentence = "";
  if (lagging) {
    lagSentence =
      lagging.delta < 0
        ? `Buna karşılık ${lagging.label} geriledi (${fmtDelta(lagging.delta)}) — sıradaki odağın burası.`
        : `${lagging.label} ise yerinde saydı — bir sonraki hamleni buraya ayır.`;
  }

  // 4) Forward — this is a snapshot in an ongoing transformation.
  const focus = lagging?.label || (topGain ? topGain.label : "");
  const forward = `Bu, dönüşümünün ${ba.attempt}. fotoğrafı.${focus ? ` Sonraki ölçüme kadar ${focus} üzerine giderek farkı büyütebilirsin.` : ""}`;

  const paragraph = [opening, gainSentence, lagSentence, forward]
    .filter(Boolean)
    .join(" ");

  return { attempt: ba.attempt, direction, levelChanged, headline, paragraph, topGain, lagging };
}
