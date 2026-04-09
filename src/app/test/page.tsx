"use client";

import { QuizProvider } from "./lib/QuizContext";
import { QuizOrchestrator } from "./components/QuizOrchestrator";
import { ResumeModal, CompletedModal } from "./components/ResumeModal";

export default function TestPage() {
  return (
    <QuizProvider>
      <QuizOrchestrator />
      <ResumeModal />
      <CompletedModal />
    </QuizProvider>
  );
}
