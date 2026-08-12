"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { RotateCcw, Share2, ArrowLeft, Sparkles, Zap, Image as ImageIcon, Trophy, Timer, Gauge, History } from "lucide-react";
import { QuickCharacter, QUICK_CHARACTERS, QUICK_QUESTIONS } from "@/lib/quickQuestions";
import { CHARACTER_AVATARS } from "@/components/QuickCheck/CharacterAvatars";
import { smoothScrollTo } from "@/lib/scroll";
import { HallOfFame } from "./HallOfFame";
import { saveAuraEntry } from "@/lib/auraHallOfFame";
import { downloadAuraShareCard } from "@/lib/auraShareCard";
import { QuickResponsePattern, QuickAnswer } from "@/components/QuickCheck/QuickCheckPage";

type StoredResult = {
  character: QuickCharacter;
  runnerUp: QuickCharacter | null;
  margin: number;
  allScores: Record<string, number>;
  avgTime: number;
  fastest: number;
  responsePattern: QuickResponsePattern;
  answers: QuickAnswer[];
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
    smoothScrollTo(0);
  }, [router]);

  // Save this result to the Hall of Fame once the character is known
  useEffect(() => {
    if (!result) return;
    saveAuraEntry({
      mode: "quick",
      tier: result.character.id,
      emoji: result.character.emoji,
      label: result.character.name,
      score: result.bestStreak * 1000,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [result?.character.id]);

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

  const review = (result.answers ?? []).map((a) => {
    const q = QUICK_QUESTIONS.find((question) => question.id === a.questionId);
    const option = q?.options.find((o) => o.id === a.optionId);
    return { text: q?.text ?? "UNKNOWN QUESTION", choice: option?.text ?? "—", time: a.responseTimeMs };
  });

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

        {/* Shadow self */}
        {result.runnerUp && (
          <motion.div variants={item} className="sketch-card p-8 text-center">
            <div className="ink-divider mb-6">
              <span className="font-[var(--font-mono)] text-sm font-bold tracking-widest">YOUR SHADOW SELF</span>
            </div>
            <div className="flex flex-col items-center justify-center gap-6 sm:flex-row">
              <CharacterAvatar character={result.runnerUp} size="small" />
              <div className="text-center sm:text-left">
                <p className="font-[var(--font-display)] text-3xl font-black uppercase text-[var(--ink)]">
                  {result.runnerUp.name}
                </p>
                <p className="font-[var(--font-mono)] text-sm font-bold tracking-widest text-[var(--ink-soft)]">
                  {result.runnerUp.title.toUpperCase()}
                </p>
                <p className="mt-1 font-[var(--font-mono)] text-xs text-[var(--ink-muted)]">
                  {result.margin > 0
                    ? `ONLY ${result.margin} POINT${result.margin === 1 ? "" : "S"} BEHIND — A HINGE MOMENT FROM WRAPPING YOU`
                    : "DEADLOCKED — THE SCANNER FLIPPED A COIN"}
                </p>
                <p className="mt-2 text-sm italic text-[var(--ink-muted)]">&ldquo;{result.runnerUp.tagline}&rdquo;</p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Instinct velocity */}
        {result.responsePattern && (
          <motion.div variants={item}>
            <div className="ink-divider mb-4">
              <span className="font-[var(--font-mono)] text-sm font-bold tracking-widest">INSTINCT VELOCITY</span>
            </div>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              <div className="sketch-card-thin p-5 text-center">
                <Timer className="mx-auto mb-2 h-5 w-5 text-[var(--ink)]" />
                <p className="font-[var(--font-mono)] text-2xl font-black text-[var(--ink)]">
                  {(result.avgTime / 1000).toFixed(1)}s
                </p>
                <p className="mt-1 font-[var(--font-mono)] text-[10px] tracking-widest text-[var(--ink-muted)]">AVG REPLY</p>
              </div>
              <div className="sketch-card-thin p-5 text-center">
                <Gauge className="mx-auto mb-2 h-5 w-5 text-[var(--ink)]" />
                <p className="font-[var(--font-mono)] text-2xl font-black text-[var(--ink)]">
                  {(result.fastest / 1000).toFixed(1)}s
                </p>
                <p className="mt-1 font-[var(--font-mono)] text-[10px] tracking-widest text-[var(--ink-muted)]">FASTEST</p>
              </div>
              <div className="sketch-card-thin col-span-2 p-5 text-center">
                <span className="text-2xl">{result.responsePattern.icon}</span>
                <p className="mt-1 font-[var(--font-mono)] text-sm font-bold text-[var(--ink)]">
                  {result.responsePattern.description}
                </p>
                <p className="mt-1 font-[var(--font-mono)] text-[10px] tracking-widest text-[var(--ink-muted)]">
                  RESPONSE PATTERN
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Answer review */}
        {review.length > 0 && (
          <motion.div variants={item}>
            <div className="ink-divider mb-4">
              <span className="flex items-center gap-2 font-[var(--font-mono)] text-sm font-bold tracking-widest">
                <History className="h-4 w-4" />
                RUN PLAYBACK
              </span>
            </div>
            <div className="sketch-card p-6">
              <ul className="space-y-3">
                {review.map((r, i) => (
                  <li key={i} className="border-b border-[var(--ink-line-faint)] pb-3 last:border-0 last:pb-0">
                    <div className="mb-1 flex items-baseline justify-between gap-4">
                      <span className="font-[var(--font-mono)] text-[10px] font-bold tracking-widest text-[var(--ink-muted)]">
                        Q{String(i + 1).padStart(2, "0")} · {(r.time / 1000).toFixed(1)}s
                      </span>
                      <span className="font-[var(--font-mono)] text-[10px] text-[var(--ink-faint)]">
                        {r.time < 3000 ? "⚡ INSTINCT" : r.time < 4500 ? "◆ WEIGHED" : "◇ OVERTHOUGHT"}
                      </span>
                    </div>
                    <p className="text-sm font-semibold text-[var(--ink)]">{r.text}</p>
                    <p className="text-sm italic text-[var(--ink-muted)]">&rarr; {r.choice}</p>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}

        {/* Hall of Fame */}
        <motion.div variants={item}>
          <div className="ink-divider mb-4">
            <span className="flex items-center gap-2 font-[var(--font-mono)] text-sm font-bold tracking-widest">
              <Trophy className="h-4 w-4" />
              HALL OF FAME
            </span>
          </div>
          <HallOfFame />
        </motion.div>

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

          <motion.button onClick={async () => {
              try {
                await downloadAuraShareCard({
                  score: result.bestStreak * 1000,
                  tierName: character.name,
                  emoji: character.emoji,
                  color: character.accentColor,
                  mode: "quick",
                  label: character.title,
                });
              } catch {}
            }}
            className="sketch-btn sketch-btn-outline"
            whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
            aria-label="Save your quick aura share card image">
            <ImageIcon className="h-5 w-5" />
            SAVE IMAGE
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  );
}
