"use client";

import { useEffect } from "react";
import { AnimatePresence, LazyMotion, domAnimation, motion } from "motion/react";
import { useQuiz } from "../lib/QuizContext";
import { SCREENS } from "../lib/content-runtime";
import { useHasMounted } from "../lib/useHasMounted";
import type { ScreenConfig, ScreenType } from "../lib/types";
import {
  SegmentationScreen,
  SectorScreen,
  SingleSelectScreen,
  PainEmojiScreen,
  LikertScreen,
  MultiSelectScreen,
  CommitmentScreen,
  BonusModalScreen,
} from "./screens/ChoiceScreens";
import {
  SocialProofScreen,
  AuthorityScreen,
  LoadingScreen,
  ProfileSummaryScreen,
  ProjectionScreen,
} from "./screens/InfoScreens";
import { TextInputScreen } from "./screens/CaptureScreens";
import {
  PlanReadyScreen,
  ScratchCardScreen,
  CelebrationScreen,
} from "./screens/RevealScreens";
import { PaywallScreen } from "./screens/PaywallScreen";

type ScreenRenderer = (props: { screen: ScreenConfig }) => React.JSX.Element;

const RENDERERS: Record<ScreenType, ScreenRenderer> = {
  segmentation: SegmentationScreen,
  sector: SectorScreen,
  social_proof: SocialProofScreen,
  pain_emoji: PainEmojiScreen,
  likert: LikertScreen,
  single_select: SingleSelectScreen,
  multi_select: MultiSelectScreen,
  authority_academic: AuthorityScreen,
  authority_expert: AuthorityScreen,
  authority_community: AuthorityScreen,
  commitment: CommitmentScreen,
  text_input: TextInputScreen,
  profile_summary: ProfileSummaryScreen,
  projection: ProjectionScreen,
  loading: LoadingScreen,
  bonus_modal: BonusModalScreen,
  plan_ready: PlanReadyScreen,
  scratch_card: ScratchCardScreen,
  celebration: CelebrationScreen,
  paywall: PaywallScreen,
};

export function QuizOrchestrator() {
  const { currentIndex } = useQuiz();
  const hasMounted = useHasMounted();
  const screen = SCREENS[currentIndex];

  // Scroll to top on every screen change (fixes mobile staying at bottom)
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [currentIndex]);
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

  // Before hydration completes (SSR + first client render), output a plain
  // div that matches the "animated-in" final state exactly. This prevents the
  // motion.div hydration mismatch bug in Next.js 16 + React 19 + Motion v12
  // where the server sends `opacity:1` but motion's client-side `initial={{opacity:0}}`
  // never runs the enter animation, leaving the element stuck invisible.
  if (!hasMounted) {
    return (
      <div key={screen.id}>
        <Renderer screen={screen} />
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
          <Renderer screen={screen} />
        </motion.div>
      </AnimatePresence>
    </LazyMotion>
  );
}
