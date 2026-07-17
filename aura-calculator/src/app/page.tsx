"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { HeroSection } from "@/components/Homepage/HeroSection";
import { RolesSection } from "@/components/Homepage/RolesSection";
import { WhatYoullDoSection } from "@/components/Homepage/WhatYoullDoSection";
import { DontLieSection } from "@/components/Homepage/DontLieSection";
import { HowItWorksSection } from "@/components/Homepage/HowItWorksSection";
import { Footer } from "@/components/Homepage/Footer";
import { DangerousLoadingScreen } from "@/components/Loading/DangerousLoadingScreen";

const CosmicScene = dynamic(
  () =>
    import("@/components3d/CosmicScene").then((mod) => ({
      default: mod.CosmicScene,
    })),
  { ssr: false, loading: () => <div className="fixed inset-0 -z-10 bg-black" /> }
);

const QuizPage = dynamic(
  () =>
    import("@/components/Quiz/QuizPage").then((mod) => ({
      default: mod.QuizPage,
    })),
  {
    ssr: false,
    loading: () => (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin" />
      </div>
    ),
  }
);

type AppPhase = "home" | "loading" | "quiz";

export default function Home() {
  const router = useRouter();
  const [phase, setPhase] = useState<AppPhase>("home");

  const handleStartQuiz = useCallback(() => {
    setPhase("loading");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleQuickCheck = useCallback(() => {
    router.push("/quick-check");
  }, []);

  const handleLoadingComplete = useCallback(() => {
    setPhase("quiz");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  // Scroll to top on phase changes (skip initial mount)
  const isFirstRender = useRef(true);
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
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
