"use client";

import { KurumsalQuizProvider } from "./lib/QuizContext-kurumsal";
import { KurumsalOrchestrator } from "./components/KurumsalOrchestrator";
import { ResumeModal, CompletedModal } from "../components/ResumeModal";

export default function KurumsalQuizPage() {
  return (
    <KurumsalQuizProvider>
      <KurumsalOrchestrator />
      <ResumeModal />
      <CompletedModal />
    </KurumsalQuizProvider>
  );
}
