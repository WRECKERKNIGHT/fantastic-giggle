"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { RotateCcw, Share2, ArrowLeft, Sparkles, Zap } from "lucide-react";
import { QuickCharacter, QUICK_CHARACTERS } from "@/lib/quickQuestions";
import { CHARACTER_AVATARS } from "@/components/QuickCheck/CharacterAvatars";

type StoredResult = {
  character: QuickCharacter;
  allScores: Record<string, number>;
  answers: { questionId: number; optionId: string }[];
  bestStreak: number;
};

// ===== SVG CHARACTER AVATAR =====
function CharacterAvatar({ character, size = "large" }: { character: QuickCharacter; size?: "large" | "small" }) {
  const isLarge = size === "large";
  const svgSize = isLarge ? 256 : 80;
  const AvatarComponent = CHARACTER_AVATARS[character.id];

  if (AvatarComponent) {
    return (
      <div key={character.id} className="relative">
        <AvatarComponent size={svgSize} />
        {/* Outer ink ring for large */}
        {isLarge && (
          <motion.div
            className="absolute inset-[-10px] rounded-full border-2 border-[var(--ink)]"
            animate={{ scale: [1, 1.04, 1], opacity: [0.35, 0.6, 0.35] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        )}
      </div>
    );
  }

  // Fallback: ink circle with emoji
  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 200, damping: 15 }}
      className={`${isLarge ? "w-48 h-48 md:w-64 md:h-64" : "w-20 h-20"} sketch-card rounded-full flex items-center justify-center relative overflow-hidden`}
    >
      <span className={`${isLarge ? "text-6xl md:text-8xl" : "text-3xl"}`}>{character.emoji}</span>
    </motion.div>
  );
}

// ===== MAIN RESULTS COMPONENT =====
export function QuickCheckResults() {
  const router = useRouter();
  const [result, setResult] = useState<StoredResult | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("quickAuraResult");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        // Find the full character data
        const character = QUICK_CHARACTERS.find((c) => c.id === parsed.character.id) || parsed.character;
        setResult({ ...parsed, character });
      } catch {
        router.push("/");
      }
    } else {
      router.push("/");
    }
    setLoading(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [router]);

  const handleRestart = () => {
    localStorage.removeItem("quickAuraResult");
    router.push("/");
  };

  if (loading || !result) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[var(--paper)] paper-grain">
        <div className="text-center">
          <div className="mx-auto mb-4 h-16 w-16 animate-spin rounded-full border-4 border-[var(--ink)] border-t-transparent" />
          <p className="font-[var(--font-mono)] text-sm text-[var(--ink-muted)]">READING YOUR AURA...</p>
        </div>
      </div>
    );
  }

  const { character } = result;
  const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.3 } } };
  const item = { hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { duration: 0.6 } } };

  return (
    <div className="relative min-h-screen bg-[var(--paper)] p-4 md:p-8 paper-grain">
      <div className="halftone absolute inset-0 opacity-30" />
      <div className="crosshatch-soft absolute inset-0" />

      {/* Back button */}
      <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="mb-8 max-w-3xl mx-auto relative z-10">
        <button onClick={handleRestart}
          className="sketch-btn sketch-btn-outline text-sm"
          aria-label="Back to home">
          <ArrowLeft className="h-4 w-4" />
          BACK TO HOME
        </button>
      </motion.div>

      <motion.div variants={container} initial="hidden" animate="show" className="relative z-10 space-y-8 max-w-3xl mx-auto">
        {/* Character reveal */}
        <motion.div variants={item} className="text-center">
          <motion.div
            className="stamp mx-auto mb-8"
            animate={{ rotate: [-1.2, -0.8, -1.2] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <span className="flex items-center gap-2">
              <Sparkles className="h-4 w-4" />
              QUICK AURA CHECK COMPLETE
            </span>
          </motion.div>

          {/* Avatar */}
          <div className="flex justify-center mb-8">
            <CharacterAvatar character={character} size="large" />
          </div>

          {/* Name & Title */}
          <motion.h1 className="font-[var(--font-display)] text-5xl md:text-7xl font-black mb-2 uppercase text-[var(--ink)]">
            <span className="sketch-underline">{character.name}</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
            className="font-[var(--font-mono)] text-xl font-bold text-[var(--ink-soft)] mb-4 tracking-widest">
            {character.title.toUpperCase()}
          </motion.p>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}
            className="text-lg italic font-[var(--font-display)] text-[var(--ink-muted)]">
            &ldquo;{character.tagline}&rdquo;
          </motion.p>
        </motion.div>

        {/* Description */}
        <motion.div variants={item} className="sketch-card rounded-none p-8 text-center">
          <p className="leading-relaxed text-lg text-[var(--ink-soft)]">{character.description}</p>
        </motion.div>

        {/* Personality traits */}
        <motion.div variants={item}>
          <div className="ink-divider mb-4">
            <span className="font-[var(--font-mono)] text-sm font-bold tracking-widest">YOUR CORE TRAITS</span>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {character.personality.map((trait, i) => (
              <motion.span key={i} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1 + i * 0.1 }}
                className="sketch-card-thin px-4 py-2 font-[var(--font-mono)] text-sm font-semibold text-[var(--ink)]">
                {trait}
              </motion.span>
            ))}
          </div>
        </motion.div>

        {/* Stats */}
        {result.bestStreak > 0 && (
          <motion.div variants={item} className="sketch-card-thin rounded-none p-6 text-center">
            <div className="flex items-center justify-center gap-3 mb-2">
              <Zap className="h-5 w-5 text-[var(--ink)]" />
              <span className="font-[var(--font-mono)] text-lg font-bold text-[var(--ink)]">
                BEST STREAK: {result.bestStreak}x
              </span>
            </div>
            <p className="font-[var(--font-mono)] text-sm text-[var(--ink-muted)]">
              You answered {result.bestStreak} questions in under 3 seconds straight!
            </p>
          </motion.div>
        )}

        {/* Action Buttons */}
        <motion.div variants={item} className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 pb-8">
          <motion.button onClick={handleRestart}
            className="sketch-btn"
            whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
            aria-label="Retake the quick aura check">
            <RotateCcw className="h-5 w-5" />
            RETAKE CHECK
          </motion.button>

          <motion.button onClick={async () => {
              const shareData = { title: `I'm ${character.name}!`, text: `I'm ${character.emoji} ${character.name} — ${character.title}! ${character.tagline}`, url: window.location.href };
              try { if (navigator.share) await navigator.share(shareData); else { await navigator.clipboard.writeText(`${shareData.text}\n${shareData.url}`); alert("Copied to clipboard!"); } }
              catch { try { await navigator.clipboard.writeText(window.location.href); alert("Link copied!"); } catch {} }
            }}
            className="sketch-btn sketch-btn-outline"
            whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
            aria-label="Share your quick aura result">
            <Share2 className="h-5 w-5" />
            SHARE
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  );
}
