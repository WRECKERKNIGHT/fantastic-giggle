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
        {/* Outer glow ring for large */}
        {isLarge && (
          <motion.div
            className="absolute inset-[-8px] rounded-full border-2 opacity-30"
            style={{ borderColor: character.accentColor }}
            animate={{ scale: [1, 1.05, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        )}
      </div>
    );
  }

  // Fallback: gradient circle with emoji
  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 200, damping: 15 }}
      className={`${isLarge ? "w-48 h-48 md:w-64 md:h-64" : "w-20 h-20"} rounded-full ${character.avatarBg} flex items-center justify-center relative overflow-hidden`}
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
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-white/50">Reading your aura...</p>
        </div>
      </div>
    );
  }

  const { character } = result;
  const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.3 } } };
  const item = { hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { duration: 0.6 } } };

  return (
    <div className="min-h-screen p-4 md:p-8 bg-gradient-to-b from-black via-[#0a0015] to-black">
      {/* Back button */}
      <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="mb-8 max-w-3xl mx-auto">
        <button onClick={handleRestart}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl glass text-white/60 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500/50"
          aria-label="Back to home">
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </button>
      </motion.div>

      <motion.div variants={container} initial="hidden" animate="show" className="space-y-8 max-w-3xl mx-auto">
        {/* Character reveal */}
        <motion.div variants={item} className="text-center">
          <motion.div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-purple-500/30 bg-purple-500/10 mb-8"
            animate={{ scale: [1, 1.02, 1] }} transition={{ duration: 3, repeat: Infinity }}>
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span className="text-sm font-bold text-purple-400 tracking-wider">QUICK AURA CHECK COMPLETE</span>
          </motion.div>

          {/* Avatar */}
          <div className="flex justify-center mb-8">
            <CharacterAvatar character={character} size="large" />
          </div>

          {/* Name & Title */}
          <motion.h1 className="text-4xl md:text-6xl font-black mb-2"
            style={{ color: character.accentColor, textShadow: `0 0 40px ${character.accentColor}60` }}>
            {character.name}
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
            className="text-xl text-white/60 font-bold mb-4">
            {character.title}
          </motion.p>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}
            className="text-lg italic" style={{ color: `${character.accentColor}cc` }}>
            &ldquo;{character.tagline}&rdquo;
          </motion.p>
        </motion.div>

        {/* Description */}
        <motion.div variants={item} className="glass-strong rounded-2xl p-8 text-center">
          <p className="text-white/70 leading-relaxed text-lg">{character.description}</p>
        </motion.div>

        {/* Personality traits */}
        <motion.div variants={item}>
          <h3 className="text-xl font-bold text-center mb-4 text-white/80">Your Core Traits</h3>
          <div className="flex flex-wrap justify-center gap-3">
            {character.personality.map((trait, i) => (
              <motion.span key={i} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1 + i * 0.1 }}
                className="px-4 py-2 rounded-xl border text-sm font-semibold"
                style={{ borderColor: `${character.accentColor}40`, backgroundColor: `${character.accentColor}15`, color: character.accentColor }}>
                {trait}
              </motion.span>
            ))}
          </div>
        </motion.div>

        {/* Stats */}
        {result.bestStreak > 0 && (
          <motion.div variants={item} className="glass rounded-2xl p-6 text-center">
            <div className="flex items-center justify-center gap-3 mb-2">
              <Zap className="w-5 h-5 text-yellow-400" />
              <span className="text-lg font-bold text-white/90">Best Streak: {result.bestStreak}x</span>
            </div>
            <p className="text-sm text-white/50">You answered {result.bestStreak} questions in under 3 seconds straight!</p>
          </motion.div>
        )}

        {/* Action Buttons */}
        <motion.div variants={item} className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 pb-8">
          <motion.button onClick={handleRestart}
            className="px-8 py-4 rounded-xl font-bold text-white bg-gradient-to-r from-purple-500 to-pink-500 inline-flex items-center gap-2"
            whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
            aria-label="Retake the quick aura check">
            <RotateCcw className="w-5 h-5" />
            Retake Check
          </motion.button>

          <motion.button onClick={async () => {
              const shareData = { title: `I'm ${character.name}!`, text: `I'm ${character.emoji} ${character.name} — ${character.title}! ${character.tagline}`, url: window.location.href };
              try { if (navigator.share) await navigator.share(shareData); else { await navigator.clipboard.writeText(`${shareData.text}\n${shareData.url}`); alert("Copied to clipboard!"); } }
              catch { try { await navigator.clipboard.writeText(window.location.href); alert("Link copied!"); } catch {} }
            }}
            className="glass px-6 py-4 rounded-xl font-semibold text-white/70 hover:text-white inline-flex items-center gap-2 transition-colors"
            whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
            aria-label="Share your quick aura result">
            <Share2 className="w-5 h-5" />
            Share
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  );
}
