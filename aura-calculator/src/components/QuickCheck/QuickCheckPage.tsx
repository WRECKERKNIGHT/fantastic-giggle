"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { QUICK_QUESTIONS, QUICK_CHARACTERS, QuickCharacter } from "@/lib/quickQuestions";
import { Zap, Brain, Trophy, Swords } from "lucide-react";

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
  const [bestStreak, setBestStreak] = useState(0);
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
            setBestStreak(newStreak);
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
      <div className="flex min-h-screen items-center justify-center bg-[var(--paper)]">
        <div className="text-center">
          <div className="mx-auto mb-4 h-16 w-16 animate-spin rounded-full border-4 border-[var(--ink)] border-t-transparent" />
          <p className="font-[var(--font-mono)] text-sm text-[var(--ink-muted)]">REVEALING YOUR AURA...</p>
        </div>
      </div>
    );
  }

  // Intro screen
  if (showIntro) {
    return (
      <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[var(--paper)] p-4 paper-grain">
        <div className="halftone absolute inset-0 opacity-30" />
        <div className="crosshatch-soft absolute inset-0" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 w-full max-w-2xl text-center"
        >
          <motion.div
            animate={{ scale: [1, 1.03, 1] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="mb-8"
          >
            <h1 className="mb-4 font-[var(--font-display)] text-5xl font-black uppercase sm:text-7xl">
              <span className="sketch-underline">Quick aura check</span>
            </h1>
            <div className="flex items-center justify-center gap-4">
              <span className="stamp">10 QUESTIONS</span>
              <span className="stamp stamp-invert">INSTINCT ONLY</span>
            </div>
          </motion.div>

          <p className="mb-2 text-lg text-[var(--ink-soft)]">
            10 questions. 10 seconds each. Your true aura revealed.
          </p>
          <p className="mb-8 font-[var(--font-mono)] text-sm text-[var(--ink-muted)]">
            NO OVERTHINKING. FIRST INSTINCT ONLY.
          </p>

          <div className="mb-8 flex flex-wrap items-center justify-center gap-2">
            {QUICK_CHARACTERS.slice(0, 4).map((char) => (
              <span key={char.id} className="sketch-card-thin px-4 py-2 font-[var(--font-mono)] text-xs text-[var(--ink-soft)]">
                {char.emoji} {char.name}
              </span>
            ))}
            <span className="sketch-card-thin px-4 py-2 font-[var(--font-mono)] text-xs text-[var(--ink-faint)]">
              +2 MORE
            </span>
          </div>

          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => {
              setShowIntro(false);
              setQuestionStartTime(Date.now());
            }}
            className="sketch-btn text-lg"
          >
            <Swords className="h-6 w-6" />
            START QUICK CHECK
          </motion.button>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-6 font-[var(--font-mono)] text-xs text-[var(--ink-faint)]"
          >
            FASTER THAN THE FULL 50-QUESTION EXAM. SAME ACCURACY. ZERO MERCY.
          </motion.p>
        </motion.div>
      </div>
    );
  }

  // Quiz in progress
  return (
    <div className="relative min-h-screen bg-[var(--paper)] p-4 md:p-8 paper-grain">
      <div className="crosshatch-soft absolute inset-0" />

      {/* Streak popup */}
      <AnimatePresence>
        {showStreakPopup && (
          <motion.div
            initial={{ opacity: 0, y: -50, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -50, scale: 0.8 }}
            className="fixed left-1/2 top-20 z-50 -translate-x-1/2 sketch-card px-6 py-3"
          >
            <div className="flex items-center gap-3">
              <Trophy className="h-6 w-6 text-[var(--ink)]" />
              <span className="font-[var(--font-mono)] text-xl font-black text-[var(--ink)]">
                {streak}x STREAK!
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Corner badges */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="sketch-card-thin fixed bottom-4 left-4 z-50 px-4 py-2"
      >
        <div className="flex items-center gap-2 font-[var(--font-mono)]">
          <span className="text-xs text-[var(--ink-muted)]">QUICK CHECK</span>
          <span className="text-sm font-bold text-[var(--ink)]">
            {currentQuestion + 1}/{questions.length}
          </span>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="sketch-card-thin fixed bottom-4 right-4 z-50 px-4 py-2"
      >
        <div className="flex items-center gap-2 font-[var(--font-mono)]">
          <Zap className="h-4 w-4 text-[var(--ink)]" />
          <span className="text-xs text-[var(--ink-muted)]">STREAK:</span>
          <span className="text-sm font-bold text-[var(--ink)]">{streak}x</span>
          {bestStreak > 0 && (
            <span className="text-xs text-[var(--ink-faint)]">({bestStreak} BEST)</span>
          )}
        </div>
      </motion.div>

      {/* Header */}
      <div className="mx-auto mb-8 max-w-2xl">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="stamp">QUICK CHECK</span>
            <span className="font-[var(--font-mono)] text-sm text-[var(--ink-muted)]">
              QUESTION {currentQuestion + 1} OF {questions.length}
            </span>
          </div>
        </div>
        <div className="meter-track w-full">
          <motion.div
            className="meter-fill"
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>

      {/* Question */}
      <div className="mx-auto max-w-2xl">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.4, type: "spring" }}
            className="sketch-card p-6 md:p-8"
          >
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="mb-6 font-[var(--font-display)] text-2xl font-bold text-[var(--ink)] md:text-3xl"
            >
              {currentQ.text}
            </motion.h2>
            {currentQ.subtext && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.25 }}
                className="mb-6 font-[var(--font-mono)] text-xs italic text-[var(--ink-muted)]"
              >
                {currentQ.subtext.toUpperCase()}
              </motion.p>
            )}

            {/* Options */}
            <div className="space-y-3">
              {currentQ.options.map((option, displayIndex) => (
                <motion.button
                  key={option.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + displayIndex * 0.08, type: "spring" }}
                  onClick={() => {
                    setSelectedOption(option.id);
                    handleAnswer(currentQ.id, option.id);
                  }}
                  className={`sketch-option ${selectedOption === option.id ? "sketch-option-selected" : ""}`}
                >
                  <span className="sketch-letter">{String.fromCharCode(65 + displayIndex)}</span>
                  <span
                    className={`flex-1 text-left text-base md:text-lg ${
                      selectedOption === option.id ? "text-[var(--paper)]" : "text-[var(--ink-soft)]"
                    }`}
                  >
                    {option.text}
                  </span>
                </motion.button>
              ))}
            </div>

            {/* Phase hint */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-6 flex items-center gap-2 font-[var(--font-mono)] text-xs text-[var(--ink-muted)]"
            >
              <Brain className="h-4 w-4" />
              <span>INSTINCT VELOCITY IS BEING TRACKED. DON&apos;T OVERTHINK.</span>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
