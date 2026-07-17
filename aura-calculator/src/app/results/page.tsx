"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { ArrowLeft, AlertTriangle } from "lucide-react";
import { TIERS, AuraTier } from "@/lib/questions-new";

// Dynamic import for heavy 3D results
const AuraResultsDashboard = dynamic(
  () =>
    import("@/components/Results/AuraResultsDashboard").then((mod) => ({
      default: mod.AuraResultsDashboard,
    })),
  {
    ssr: false,
    loading: () => (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-white/50">Loading your aura results...</p>
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
  { ssr: false, loading: () => <div className="fixed inset-0 -z-10 bg-black" /> }
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
  const router = useRouter();
  const searchParams = useSearchParams();
  const [results, setResults] = useState<StoredResults | null>(null);
  const [loading, setLoading] = useState(true);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
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
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-white/50">Loading your aura results...</p>
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
          className="mb-6 md:mb-8 max-w-5xl mx-auto"
        >
          <button
            onClick={handleRestart}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl glass text-white/60 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500/50"
            aria-label="Back to home"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </button>
        </motion.div>

        {/* Shared link notice */}
        {isSharedLink && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-5xl mx-auto mb-6">
            <div className="flex items-center gap-3 px-5 py-3 rounded-xl border border-cyan-500/30 bg-cyan-500/10">
              <AlertTriangle className="w-5 h-5 text-cyan-400 shrink-0" />
              <p className="text-sm text-cyan-300">
                You&apos;re viewing a <strong>shared result</strong>. Take the test yourself to get your own aura score!
              </p>
              <button
                onClick={handleRestart}
                className="ml-auto px-4 py-2 rounded-lg bg-cyan-500/20 text-cyan-300 text-sm font-bold hover:bg-cyan-500/30 transition-colors shrink-0"
              >
                Take Test
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
        />
      </div>
    </>
  );
}
