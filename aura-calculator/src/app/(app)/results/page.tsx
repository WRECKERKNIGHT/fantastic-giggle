"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { ArrowLeft, AlertTriangle } from "lucide-react";
import { TIERS, AuraTier } from "@/lib/questions-new";
import { smoothScrollTo } from "@/lib/scroll";

// Dynamic import for heavy 3D results
const AuraResultsDashboard = dynamic(
  () =>
    import("@/components/Results/AuraResultsDashboard").then((mod) => ({
      default: mod.AuraResultsDashboard,
    })),
  {
    ssr: false,
    loading: () => (
      <div className="flex min-h-screen items-center justify-center bg-[var(--paper)] paper-grain">
        <div className="text-center">
          <div className="mx-auto mb-4 h-16 w-16 animate-spin rounded-full border-4 border-[var(--ink)] border-t-transparent" />
          <p className="font-[var(--font-mono)] text-sm text-[var(--ink-muted)]">
            LOADING YOUR AURA RESULTS...
          </p>
        </div>
      </div>
    ),
  }
);

// Dynamic import for 3D scene
const CosmicScene = dynamic(
  () =>
    import("@/components3d/CosmicScene").then((mod) => ({
      default: mod.CosmicScene,
    })),
  { ssr: false, loading: () => <div className="fixed inset-0 -z-10 bg-[var(--paper)]" /> }
);

type StoredResults = {
  score: number;
  tier: string;
  axes: Record<string, number>;
  breakdown: any;
  truthMatrix: any[];
  auraVelocity: number[];
  responsePattern: {
    pattern: string;
    description: string;
    icon: string;
  };
};

export default function ResultsPage() {
  return (
    <Suspense>
      <ResultsPageInner />
    </Suspense>
  );
}

function ResultsPageInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [results, setResults] = useState<StoredResults | null>(null);
  const [loading, setLoading] = useState(true);

  // Scroll to top on mount
  useEffect(() => {
    smoothScrollTo(0);
  }, []);

  useEffect(() => {
    // Try loading from query params first (shared link)
    const scoreParam = searchParams.get("s");
    const tierParam = searchParams.get("t");

    if (scoreParam && tierParam) {
      const score = parseInt(scoreParam, 10);
      const tier = tierParam as AuraTier;
      if (!isNaN(score) && TIERS[tier]) {
        // Construct minimal results from URL params
        const tierInfo = TIERS[tier];
        const axes = {
          presence: score * 0.3,
          composure: score * 0.25,
          fluidity: score * 0.2,
          desperation: score * -0.15,
          fumble: score * -0.1,
        };
        setResults({
          score,
          tier,
          axes,
          breakdown: {
            baseScore: 0,
            presenceBonus: axes.presence,
            composureBonus: axes.composure,
            fluidityBonus: axes.fluidity,
            desperationPenalty: axes.desperation,
            fumblePenalty: axes.fumble,
            streakMultiplier: 1,
            inauthenticityTax: 0,
            finalScore: score,
          },
          truthMatrix: [],
          auraVelocity: [score],
          responsePattern: {
            pattern: "shared",
            description: "This is a shared result link.",
            icon: "🔗",
          },
        });
        setLoading(false);
        return;
      }
    }

    // Fallback to localStorage
    const stored = localStorage.getItem("auraResults");
    if (stored) {
      try {
        setResults(JSON.parse(stored));
      } catch {
        router.push("/");
      }
    } else {
      router.push("/");
    }
    setLoading(false);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleRestart = () => {
    localStorage.removeItem("auraResults");
    router.push("/");
  };

  if (loading || !results) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[var(--paper)] paper-grain">
        <div className="text-center">
          <div className="mx-auto mb-4 h-16 w-16 animate-spin rounded-full border-4 border-[var(--ink)] border-t-transparent" />
          <p className="font-[var(--font-mono)] text-sm text-[var(--ink-muted)]">
            LOADING YOUR AURA RESULTS...
          </p>
        </div>
      </div>
    );
  }

  const isSharedLink = searchParams.has("s");

  return (
    <>
      <CosmicScene />
      <div className="min-h-screen p-4 md:p-6 lg:p-8">
        {/* Back button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-6 md:mb-8 max-w-5xl mx-auto relative z-10"
        >
          <button
            onClick={handleRestart}
            className="sketch-btn sketch-btn-outline text-sm"
            aria-label="Back to home"
          >
            <ArrowLeft className="h-4 w-4" />
            BACK TO HOME
          </button>
        </motion.div>

        {/* Shared link notice */}
        {isSharedLink && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-5xl mx-auto mb-6 relative z-10">
            <div className="sketch-card-thin flex items-center gap-3 px-5 py-3">
              <AlertTriangle className="h-5 w-5 text-[var(--ink)] shrink-0" />
              <p className="text-sm text-[var(--ink-soft)]">
                You&apos;re viewing a <strong>shared result</strong>. Take the test yourself to get your own aura score!
              </p>
              <button
                onClick={handleRestart}
                className="sketch-btn ml-auto px-4 py-2 text-sm shrink-0"
              >
                TAKE TEST
              </button>
            </div>
          </motion.div>
        )}

        {/* Results */}
        <AuraResultsDashboard
          score={results.score}
          tier={results.tier as AuraTier}
          axes={results.axes as any}
          breakdown={results.breakdown}
          truthMatrix={results.truthMatrix}
          responsePattern={results.responsePattern}
          auraVelocity={results.auraVelocity}
          onRestart={handleRestart}
          saveEntry={!isSharedLink}
        />
      </div>
    </>
  );
}
