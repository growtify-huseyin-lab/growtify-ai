"use client";

import { AnimatePresence, LazyMotion, domAnimation, motion } from "motion/react";
import { useQuiz } from "../lib/QuizContext-kurumsal";
import { SCREENS } from "../lib/content-kurumsal-runtime";
import { useHasMounted } from "../../lib/useHasMounted";
import type { KurumsalScreenConfig, KurumsalScreenType } from "../lib/types-kurumsal";

// Reuse bireysel screen components (they use shared QuizCtx)
import {
  SectorScreen,
  SingleSelectScreen,
  PainEmojiScreen,
  LikertScreen,
  MultiSelectScreen,
} from "../../components/screens/ChoiceScreens";
import { TextInputScreen } from "../../components/screens/CaptureScreens";
import { LoadingScreen } from "../../components/screens/InfoScreens";

// Kurumsal-specific screens
import { HeroScreen } from "./screens/HeroScreen";
import { ResultScreen } from "./screens/ResultScreen";
import { KurumsalPaywallScreen } from "./screens/KurumsalPaywallScreen";

type ScreenRenderer = (props: { screen: any }) => React.JSX.Element;

const RENDERERS: Record<KurumsalScreenType, ScreenRenderer> = {
  hero: HeroScreen,
  sector: SectorScreen,
  likert: LikertScreen,
  pain_emoji: PainEmojiScreen,
  single_select: SingleSelectScreen,
  multi_select: MultiSelectScreen,
  text_input: TextInputScreen,
  loading: LoadingScreen,
  result: ResultScreen,
  paywall: KurumsalPaywallScreen,
};

export function KurumsalOrchestrator() {
  const { currentIndex } = useQuiz();
  const hasMounted = useHasMounted();
  const screen = SCREENS[currentIndex];

  if (!screen) {
    return (
      <div className="p-10 text-center text-sm text-gray-500">
        Ekran bulunamadı (index {currentIndex}).
      </div>
    );
  }

  const Renderer = RENDERERS[screen.type];
  if (!Renderer) {
    return (
      <div className="p-10 text-center text-sm text-red-500">
        Renderer eksik: {screen.type}
      </div>
    );
  }

  if (!hasMounted) {
    return (
      <div key={screen.id}>
        <Renderer screen={screen as any} />
      </div>
    );
  }

  return (
    <LazyMotion features={domAnimation}>
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={screen.id}
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -24 }}
          transition={{ duration: 0.28, ease: [0.2, 0.65, 0.3, 0.9] }}
        >
          <Renderer screen={screen as any} />
        </motion.div>
      </AnimatePresence>
    </LazyMotion>
  );
}
