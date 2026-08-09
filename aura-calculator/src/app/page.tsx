"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { HeroSection } from "@/components/Homepage/HeroSection";
import { RolesSection } from "@/components/Homepage/RolesSection";
import { WhatYoullDoSection } from "@/components/Homepage/WhatYoullDoSection";
import { DontLieSection } from "@/components/Homepage/DontLieSection";
import { HowItWorksSection } from "@/components/Homepage/HowItWorksSection";
import { AuraIntelligenceSection } from "@/components/Homepage/AuraIntelligenceSection";
import { Footer } from "@/components/Homepage/Footer";
import { DangerousLoadingScreen } from "@/components/Loading/DangerousLoadingScreen";
import { QuizPage } from "@/components/Quiz/QuizPage";
import { CosmicScene } from "@/components3d/CosmicScene";
import { smoothScrollTo } from "@/lib/scroll";

type AppPhase = "home" | "loading" | "quiz";

export default function Home() {
  const router = useRouter();
  const [phase, setPhase] = useState<AppPhase>("home");

  const handleStartQuiz = useCallback(() => {
    setPhase("loading");
    smoothScrollTo(0);
  }, []);

  const handleQuickCheck = useCallback(() => {
    router.push("/quick-check");
  }, []);

  const handleLoadingComplete = useCallback(() => {
    setPhase("quiz");
    smoothScrollTo(0);
  }, []);

  // Scroll to top on phase changes (skip initial mount)
  const isFirstRender = useRef(true);
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    smoothScrollTo(0);
  }, [phase]);

  return (
    <>
      <ErrorBoundary>
        <CosmicScene />
      </ErrorBoundary>

      {phase === "home" && (
        <main>
          <HeroSection onStart={handleStartQuiz} onQuickCheck={handleQuickCheck} />
          <RolesSection />
          <WhatYoullDoSection />
          <DontLieSection />
          <AuraIntelligenceSection />
          <HowItWorksSection />
          <Footer />
        </main>
      )}

      {phase === "loading" && (
        <DangerousLoadingScreen onComplete={handleLoadingComplete} />
      )}

      {phase === "quiz" && (
        <div className="min-h-screen">
          <QuizPage />
        </div>
      )}
    </>
  );
}
