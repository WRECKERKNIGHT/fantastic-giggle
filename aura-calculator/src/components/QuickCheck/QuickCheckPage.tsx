"use client";

import { useState, useCallback, useRef, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { QUICK_QUESTIONS, QUICK_CHARACTERS, QuickCharacter } from "@/lib/quickQuestions";
import {
  Flame,
  Zap,
  Skull,
  Eye,
  Brain,
  Clock,
  Trophy,
  Sparkles,
} from "lucide-react";

function calculateQuickResult(answers: { questionId: number; optionId: string }[]) {
  const scores: Record<string, number> = {};
  QUICK_CHARACTERS.forEach((c) => (scores[c.id] = 0));

  answers.forEach((answer) => {
    const question = QUICK_QUESTIONS.find((q) => q.id === answer.questionId);
    if (!question) return;
    const option = question.options.find((o) => o.id === answer.optionId);
    if (!option) return;
    Object.entries(option.scores).forEach(([charId, weight]) => {
      scores[charId] = (scores[charId] || 0) + weight;
    });
  });

  let bestChar = QUICK_CHARACTERS[0];
  let bestScore = -1;
  Object.entries(scores).forEach(([charId, score]) => {
    if (score > bestScore) {
      bestScore = score;
      bestChar = QUICK_CHARACTERS.find((c) => c.id === charId) || bestChar;
    }
  });

  return { character: bestChar, allScores: scores };
}

export function QuickCheckPage() {
  const router = useRouter();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<{ questionId: number; optionId: string }[]>([]);
  const [questionStartTime, setQuestionStartTime] = useState(Date.now());
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showIntro, setShowIntro] = useState(true);
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState<ReturnType<typeof calculateQuickResult> | null>(null);
  const [streak, setStreak] = useState(0);
  const bestStreakRef = useRef(0);
  const [showStreakPopup, setShowStreakPopup] = useState(false);
  const answeringRef = useRef(false);
  const pendingNavigationRef = useRef(false);

  const questions = QUICK_QUESTIONS;
  const currentQ = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  const handleAnswer = useCallback(
    (questionId: number, optionId: string) => {
      if (answeringRef.current || pendingNavigationRef.current) return;
      answeringRef.current = true;

      const responseTimeMs = Date.now() - questionStartTime;
      const newAnswers = [...answers, { questionId, optionId }];
      setAnswers(newAnswers);
      setSelectedOption(null);

      // Update streak (use ref to avoid stale closure)
      if (responseTimeMs < 3000) {
        setStreak((prev) => {
          const newStreak = prev + 1;
          if (newStreak > bestStreakRef.current) {
            bestStreakRef.current = newStreak;
          }
          if (newStreak >= 3 && newStreak % 3 === 0) {
            setShowStreakPopup(true);
            setTimeout(() => setShowStreakPopup(false), 2000);
          }
          return newStreak;
        });
      } else {
        setStreak(0);
      }

      const nextQuestion = currentQuestion + 1;
      if (nextQuestion < questions.length) {
        setTimeout(() => {
          setCurrentQuestion(nextQuestion);
          setQuestionStartTime(Date.now());
          answeringRef.current = false;
        }, 600);
      } else {
        // Quiz complete — prevent double-fire
        pendingNavigationRef.current = true;
        const finalBestStreak = bestStreakRef.current;
        const finalResult = calculateQuickResult(newAnswers);
        setResult(finalResult);
        // Store result immediately, then navigate
        localStorage.setItem(
          "quickAuraResult",
          JSON.stringify({
            character: finalResult.character,
            allScores: finalResult.allScores,
            answers: newAnswers,
            bestStreak: finalBestStreak,
          })
        );
        setTimeout(() => {
          setShowResult(true);
        }, 800);
      }
    },
    [answers, currentQuestion, questionStartTime, questions.length]
  );

  // Show result page
  useEffect(() => {
    if (showResult && result) {
      router.push("/quick-results");
    }
  }, [showResult, result, router]);

  if (showResult && result) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-white/50">Revealing your aura...</p>
        </div>
      </div>
    );
  }

  // Intro screen
  if (showIntro) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-b from-black via-[#0a0015] to-black relative overflow-hidden">
        {/* Floating particles */}
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-purple-400/30 rounded-full"
            initial={{ x: Math.random() * (typeof window !== "undefined" ? window.innerWidth : 1000), y: Math.random() * (typeof window !== "undefined" ? window.innerHeight : 800) }}
            animate={{ x: [Math.random() * 1000, Math.random() * 1000], y: [Math.random() * 800, Math.random() * 800], opacity: [0, 0.5, 0] }}
            transition={{ duration: 5 + Math.random() * 10, repeat: Infinity, delay: Math.random() * 5 }}
          />
        ))}

        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl w-full text-center relative z-10">
          <motion.div animate={{ scale: [1, 1.05, 1] }} transition={{ duration: 3, repeat: Infinity }} className="mb-8">
            <h1 className="text-5xl md:text-7xl font-black mb-4">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-cyan-400">
                QUICK AURA CHECK
              </span>
            </h1>
          </motion.div>
          <p className="text-xl text-white/50 mb-4">10 questions. 10 seconds each. Your true aura revealed.</p>
          <p className="text-sm text-white/30 mb-8">No overthinking. First instinct only.</p>

          <div className="flex justify-center gap-2 mb-8 flex-wrap">
            {QUICK_CHARACTERS.slice(0, 4).map((char) => (
              <motion.span key={char.id} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="px-4 py-2 rounded-xl bg-white/5 text-xs text-white/60 border border-white/10">
                {char.emoji} {char.name}
              </motion.span>
            ))}
            <span className="px-4 py-2 rounded-xl bg-white/5 text-xs text-white/40 border border-white/10">+2 more</span>
          </div>

          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => { setShowIntro(false); setQuestionStartTime(Date.now()); }}
            className="px-12 py-5 rounded-2xl font-bold text-xl text-white bg-gradient-to-r from-purple-500 to-pink-500 shadow-[0_0_40px_rgba(168,85,247,0.4)] hover:shadow-[0_0_60px_rgba(168,85,247,0.6)] transition-shadow">
            <Sparkles className="w-6 h-6 inline mr-2" />START QUICK CHECK
          </motion.button>

          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} className="text-xs text-white/30 mt-6">
            ⚡ Faster than the full 50-question exam. Same accuracy. Zero mercy.
          </motion.p>
        </motion.div>
      </div>
    );
  }

  // Quiz in progress
  return (
    <div className="min-h-screen p-4 md:p-8 bg-gradient-to-b from-black via-[#0a0015] to-black relative">
      {/* Streak popup */}
      <AnimatePresence>
        {showStreakPopup && (
          <motion.div initial={{ opacity: 0, y: -50, scale: 0.8 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -50, scale: 0.8 }}
            className="fixed top-20 left-1/2 -translate-x-1/2 z-50 px-6 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 shadow-[0_0_40px_rgba(168,85,247,0.6)]">
            <div className="flex items-center gap-3">
              <Trophy className="w-6 h-6 text-white" />
              <span className="text-xl font-black text-white">{streak}x STREAK!</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Score estimate */}
      <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
        className="fixed bottom-4 left-4 z-50 px-4 py-2 rounded-xl border border-white/10 bg-black/50 backdrop-blur-sm">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-purple-400" />
          <span className="text-xs text-white/40">QUICK CHECK</span>
          <span className="text-sm font-bold text-purple-400">{currentQuestion + 1}/{questions.length}</span>
        </div>
      </motion.div>

      {/* Streak counter */}
      <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
        className="fixed bottom-4 right-4 z-50 px-4 py-2 rounded-xl border border-white/10 bg-black/50 backdrop-blur-sm">
        <div className="flex items-center gap-2">
          <Zap className="w-4 h-4 text-yellow-400" />
          <span className="text-xs text-white/40">STREAK:</span>
          <span className="text-sm font-bold text-yellow-400">{streak}x</span>
          {bestStreak > 0 && <span className="text-xs text-white/30">({bestStreak} best)</span>}
        </div>
      </motion.div>

      {/* Header */}
      <div className="max-w-2xl mx-auto mb-8">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <motion.span key={currentQuestion} initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
              className="px-3 py-1 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-bold shadow-lg">
              QUICK CHECK
            </motion.span>
            <span className="text-sm text-white/50">Question {currentQuestion + 1} of {questions.length}</span>
          </div>
        </div>
        <div className="h-2 bg-white/10 rounded-full overflow-hidden">
          <motion.div className="h-full rounded-full bg-gradient-to-r from-purple-500 to-pink-500" animate={{ width: `${progress}%` }} transition={{ duration: 0.5 }} />
        </div>
      </div>

      {/* Question */}
      <div className="max-w-2xl mx-auto">
        <AnimatePresence mode="wait">
          <motion.div key={currentQuestion} initial={{ opacity: 0, x: 50, rotateY: -10 }} animate={{ opacity: 1, x: 0, rotateY: 0 }} exit={{ opacity: 0, x: -50, rotateY: 10 }}
            transition={{ duration: 0.4, type: "spring" }}
            className="rounded-2xl p-6 md:p-8 border border-purple-500/20 bg-purple-950/20 shadow-[0_0_20px_rgba(168,85,247,0.1)]">

            <motion.h2 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
              className="text-2xl md:text-3xl font-bold text-white/95 mb-6">
              {currentQ.text}
            </motion.h2>
            {currentQ.subtext && (
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="text-sm text-white/50 italic mb-6">
                {currentQ.subtext}
              </motion.p>
            )}

            {/* Options */}
            <div className="space-y-3">
              {currentQ.options.map((option, displayIndex) => (
                <motion.button key={option.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + displayIndex * 0.08, type: "spring" }}
                  whileHover={{ scale: 1.02, x: 10 }} whileTap={{ scale: 0.98 }}
                  onClick={() => { setSelectedOption(option.id); handleAnswer(currentQ.id, option.id); }}
                  className={`w-full text-left p-4 md:p-5 rounded-xl transition-all duration-300 group focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:ring-offset-2 focus:ring-offset-black ${
                    selectedOption === option.id
                      ? "border-2 border-purple-500 bg-purple-500/10 shadow-[0_0_20px_rgba(168,85,247,0.3)]"
                      : "border border-purple-500/20 hover:border-purple-500/40 hover:bg-white/10 hover:shadow-[0_0_15px_rgba(168,85,247,0.2)]"
                  }`}>
                  <div className="flex items-center gap-4">
                    <motion.span whileHover={{ rotate: [0, -10, 10, 0] }}
                      className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold transition-all ${
                        selectedOption === option.id ? "bg-purple-500 text-white" : "bg-white/5 text-white/50 group-hover:bg-purple-500/20 group-hover:text-purple-400"
                      }`}>
                      {String.fromCharCode(65 + displayIndex)}
                    </motion.span>
                    <span className="text-base md:text-lg text-white/90">{option.text}</span>
                  </div>
                </motion.button>
              ))}
            </div>

            {/* Phase hint */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
              className="mt-6 flex items-center gap-2 text-xs text-purple-400/70">
              <Brain className="w-4 h-4" />
              <span>⚡ Instinct velocity is being tracked. Don&apos;t overthink.</span>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
