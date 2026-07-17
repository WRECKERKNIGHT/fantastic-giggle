/* eslint-disable react-hooks/purity -- particle effects use Math.random() for visual variety */
"use client";

import { useState, useEffect, useCallback, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { ALL_QUESTIONS, PHASES, QuizQuestion, Phase, CURVEBALL_QUESTIONS } from "@/lib/questions-new";
import { Phase2Chat } from "./Phase2Chat";
import { calculateAuraScore, analyzeResponsePattern, trackAuraVelocity, getCurrentPhase } from "@/lib/truthMatrix";
import { Eye, Zap, AlertTriangle, Flame, Skull, Brain, Clock, Trophy, Target, Sparkles, Activity } from "lucide-react";

// ===== PRESSURE EVENT SYSTEM =====
type PressureEvent = {
  id: string;
  type: "glitch" | "flash" | "shake" | "distraction" | "speedUp" | "reverseText";
  duration: number;
  message: string;
  icon: string;
};

const PRESSURE_EVENTS: PressureEvent[] = [
  { id: "glitch1", type: "glitch", duration: 800, message: "SYSTEM MALFUNCTION", icon: "⚡" },
  { id: "glitch2", type: "flash", duration: 300, message: "BRIGHTNESS OVERLOAD", icon: "💥" },
  { id: "shake1", type: "shake", duration: 600, message: "EARTHQUAKE DETECTED", icon: "🌍" },
  { id: "distraction1", type: "distraction", duration: 1500, message: "FOCUS DISRUPTED", icon: "🎯" },
  { id: "speedUp1", type: "speedUp", duration: 2000, message: "TIME ACCELERATED", icon: "⏱️" },
  { id: "reverseText1", type: "reverseText", duration: 1500, message: "REVERSE MODE", icon: "🔄" },
  { id: "glitch3", type: "glitch", duration: 500, message: "DATA CORRUPTION", icon: "💾" },
  { id: "shake2", type: "shake", duration: 400, message: "VIBRATION PULSE", icon: "📳" },
];




// ===== FISHER-YATES SHUFFLE =====
function shuffleArray<T>(arr: T[]): T[] {
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// ===== DYNAMIC DIFFICULTY CALCULATOR =====
function getDynamicDifficulty(answers: { responseTimeMs: number; questionId: number }[], currentPhase: Phase): {
  timerReduction: number;
  distractionChance: number;
  curveballChance: number;
  pressureEventChance: number;
} {
  if (answers.length < 3) {
    return { timerReduction: 0, distractionChance: 0, curveballChance: 0, pressureEventChance: 0 };
  }

  const recentAnswers = answers.slice(-5);
  const avgTime = recentAnswers.reduce((sum, a) => sum + a.responseTimeMs, 0) / recentAnswers.length;
  const fastResponses = recentAnswers.filter(a => a.responseTimeMs < 2000).length;

  // Higher difficulty for faster responders
  const speedBonus = fastResponses / recentAnswers.length;

  return {
    timerReduction: currentPhase === 5 ? Math.floor(speedBonus * 500) : 0,
    distractionChance: 0.1 + speedBonus * 0.2,
    curveballChance: 0.05 + speedBonus * 0.15,
    pressureEventChance: 0.1 + speedBonus * 0.3,
  };
}

export function QuizPage() {
  const router = useRouter();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<
    { questionId: number; optionId: string; responseTimeMs: number }[]
  >([]);
  const [showDisclaimer, setShowDisclaimer] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);
  const [questionStartTime, setQuestionStartTime] = useState(Date.now());
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [spectatorCount, setSpectatorCount] = useState(0);
  const [shufflingOptions, setShufflingOptions] = useState(false);
  const [shuffledOptions, setShuffledOptions] = useState<number[]>([]);
  const [showPhaseTransition, setShowPhaseTransition] = useState(false);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [showStreakPopup, setShowStreakPopup] = useState(false);
  const [currentPressureEvent, setCurrentPressureEvent] = useState<PressureEvent | null>(null);
  const [showCurveball, setShowCurveball] = useState(false);
  const [curveballQuestion, setCurveballQuestion] = useState<QuizQuestion | null>(null);
  const [screenShake, setScreenShake] = useState(false);
  const [glitchIntensity, setGlitchIntensity] = useState(0);
  const [scoreEstimate, setScoreEstimate] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const answeringRef = useRef(false);
  const pressureEventTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const answersRef = useRef(answers);
  answersRef.current = answers;
  const currentQuestionRef = useRef(currentQuestion);
  currentQuestionRef.current = currentQuestion;
  const questionStartTimeRef = useRef(questionStartTime);
  questionStartTimeRef.current = questionStartTime;

  const questions = ALL_QUESTIONS;
  const currentQ = useMemo(() => {
    if (showCurveball && curveballQuestion) return curveballQuestion;
    return questions[currentQuestion];
  }, [currentQuestion, showCurveball, curveballQuestion, questions]);
  const phase = getCurrentPhase(currentQuestion);
  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const phaseInfo = PHASES[phase];

  // Dynamic difficulty
  const difficulty = useMemo(() => getDynamicDifficulty(answers, phase), [answers, phase]);

  // Score estimate (debounced to avoid recalculation on every render)
  useEffect(() => {
    if (answers.length > 0) {
      const timeout = setTimeout(() => {
        const result = calculateAuraScore(answers);
        setScoreEstimate(result.score);
      }, 300);
      return () => clearTimeout(timeout);
    }
  }, [answers]);

  const handleAnswer = useCallback((questionId: number, optionId: string) => {
    if (answeringRef.current) return;
    answeringRef.current = true;

    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    const responseTimeMs = Date.now() - questionStartTimeRef.current;
    const newAnswers = [...answersRef.current, { questionId, optionId, responseTimeMs }];
    setAnswers(newAnswers);
    setSelectedOption(null);

    // Update streak
    const isGoodAnswer = responseTimeMs < 3000;
    if (isGoodAnswer) {
      setStreak(prev => {
        const newStreak = prev + 1;
        if (newStreak > bestStreak) setBestStreak(newStreak);
        if (newStreak >= 3 && newStreak % 3 === 0) {
          setShowStreakPopup(true);
          setTimeout(() => setShowStreakPopup(false), 2000);
        }
        return newStreak;
      });
    } else {
      setStreak(0);
    }

    // Clear pressure event and shake
    if (pressureEventTimeoutRef.current) {
      clearTimeout(pressureEventTimeoutRef.current);
      pressureEventTimeoutRef.current = null;
      setCurrentPressureEvent(null);
      setScreenShake(false);
      setGlitchIntensity(0);
    }

    // Clear curveball
    if (showCurveball) {
      setShowCurveball(false);
      setCurveballQuestion(null);
    }

    const nextQuestion = currentQuestionRef.current + 1;
    if (nextQuestion < questions.length) {
      const nextPhase = getCurrentPhase(nextQuestion);
      const currentPhase = getCurrentPhase(currentQuestionRef.current);
      if (nextPhase !== currentPhase && !showPhaseTransition) {
        setShowPhaseTransition(true);
        setTimeout(() => {
          setShowPhaseTransition(false);
          setCurrentQuestion(nextQuestion);
          setQuestionStartTime(Date.now());
          answeringRef.current = false;
        }, 2000);
      } else {
        setCurrentQuestion(nextQuestion);
        setQuestionStartTime(Date.now());
        answeringRef.current = false;
      }
    } else {
      const result = calculateAuraScore(newAnswers);
      const velocity = trackAuraVelocity(newAnswers);
      const pattern = analyzeResponsePattern(newAnswers);
      localStorage.setItem("auraResults", JSON.stringify({
        ...result,
        auraVelocity: velocity,
        responsePattern: pattern,
        bestStreak,
        totalCurveballs: newAnswers.filter(a => a.questionId >= 100).length,
      }));
      router.push("/results");
    }
  }, [questions.length, router, showPhaseTransition, showCurveball, bestStreak]);

  const handleAnswerRef = useRef(handleAnswer);
  handleAnswerRef.current = handleAnswer;

  // Timer for Phase 5 (and curveball questions with timeLimitMs)
  useEffect(() => {
    if (quizStarted && currentQ?.timeLimitMs) {
      const timerReduction = difficulty.timerReduction;
      const adjustedTime = Math.max(800, currentQ.timeLimitMs - timerReduction);
      const timeSeconds = adjustedTime / 1000;
      setTimeLeft(timeSeconds);
      answeringRef.current = false;

      timerRef.current = setInterval(() => {
        if (!timerRef.current) return;
        setTimeLeft((prev) => {
          if (prev === null || prev <= 0.1) {
            if (answeringRef.current) return null;
            answeringRef.current = true;
            clearInterval(timerRef.current!);
            timerRef.current = null;
            const q = questions[currentQuestionRef.current];
            if (q) {
              handleAnswerRef.current(q.id, q.options[0].id);
            }
            return null;
          }
          return Math.max(0, prev - 0.1);
        });
      }, 100);
    } else {
      setTimeLeft(null);
    }
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      answeringRef.current = false;
    };
  }, [currentQuestion, quizStarted, currentQ?.timeLimitMs, difficulty.timerReduction]);

  // Spectator count for Phase 4
  useEffect(() => {
    if (phase === 4 && currentQ?.spectatorCount) {
      const target = currentQ.spectatorCount;
      setSpectatorCount(0);
      const increment = Math.ceil(target / 30);
      let current = 0;
      const interval = setInterval(() => {
        current = Math.min(current + increment, target);
        setSpectatorCount(current);
        if (current >= target) clearInterval(interval);
      }, 50);
      return () => clearInterval(interval);
    } else {
      setSpectatorCount(0);
    }
  }, [currentQuestion, phase, currentQ?.spectatorCount]);

  // Shuffle for Phase 5
  useEffect(() => {
    if (phase === 5 && quizStarted && currentQ) {
      const initialOrder = currentQ.options.map((_, i) => i);
      setShuffledOptions(shuffleArray(initialOrder));
      setShufflingOptions(true);
      const timeout = setTimeout(() => setShufflingOptions(false), 500);
      return () => clearTimeout(timeout);
    } else if (quizStarted && currentQ) {
      setShuffledOptions(currentQ.options.map((_, i) => i));
    }
  }, [currentQuestion, phase, quizStarted, currentQ]);

  // ===== PRESSURE EVENT SYSTEM =====
  useEffect(() => {
    if (!quizStarted || showPhaseTransition) return;

    // Random pressure events
    if (Math.random() < difficulty.pressureEventChance) {
      const randomEvent = PRESSURE_EVENTS[Math.floor(Math.random() * PRESSURE_EVENTS.length)];
      setCurrentPressureEvent(randomEvent);

      if (randomEvent.type === "shake") {
        setScreenShake(true);
        setTimeout(() => setScreenShake(false), randomEvent.duration);
      }

      if (randomEvent.type === "glitch") {
        setGlitchIntensity(0.5);
        setTimeout(() => setGlitchIntensity(0), randomEvent.duration);
      }

      pressureEventTimeoutRef.current = setTimeout(() => {
        setCurrentPressureEvent(null);
      }, randomEvent.duration);
    }

    // Random curveball questions
    if (Math.random() < difficulty.curveballChance && currentQuestion > 5) {
      const availableCurveballs = CURVEBALL_QUESTIONS.filter(q => q.phase === phase);
      if (availableCurveballs.length > 0) {
        const randomCurveball = availableCurveballs[Math.floor(Math.random() * availableCurveballs.length)];
        setCurveballQuestion(randomCurveball);
        setShowCurveball(true);
      }
    }

    // Cleanup on question change (not unmount — pressure events should persist)
    return () => {
      if (pressureEventTimeoutRef.current) {
        clearTimeout(pressureEventTimeoutRef.current);
        pressureEventTimeoutRef.current = null;
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentQuestion, quizStarted]);

  const handleStartQuiz = () => setShowDisclaimer(true);
  const handleAcceptDisclaimer = () => {
    setShowDisclaimer(false);
    setQuizStarted(true);
    setQuestionStartTime(Date.now());
    // Scroll to top when quiz starts
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const phaseStyles = (() => {
    switch (phase) {
      case 1: return { bg: "from-black via-[#0a0a15] to-black", accent: "from-blue-500 to-cyan-500", accentColor: "#06b6d4" };
      case 2: return { bg: "from-black via-[#0a150a] to-black", accent: "from-green-500 to-emerald-500", accentColor: "#10b981" };
      case 3: return { bg: "from-black via-[#1a0000] to-black", accent: "from-red-500 to-orange-500", accentColor: "#ef4444", glitch: true };
      case 4: return { bg: "from-black via-[#15001a] to-black", accent: "from-purple-500 to-pink-500", accentColor: "#a855f7" };
      case 5: return { bg: "from-black via-[#1a1000] to-black", accent: "from-yellow-500 to-red-500", accentColor: "#f59e0b", kinetic: true };
      default: return { bg: "from-black via-[#0a0a15] to-black", accent: "from-blue-500 to-cyan-500", accentColor: "#06b6d4" };
    }
  })();

  // Phase Transition Screen
  if (showPhaseTransition) {
    const nextPhase = getCurrentPhase(currentQuestion + 1);
    const nextPhaseInfo = PHASES[nextPhase];
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.2 }}
          className="text-center"
        >
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 1, ease: "easeInOut" }}
            className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center shadow-[0_0_60px_rgba(249,115,22,0.5)]"
          >
            <Skull className="w-12 h-12 text-white" />
          </motion.div>
          <motion.h2
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-4xl md:text-6xl font-black text-white mb-4"
          >
            PHASE {nextPhase} INCOMING
          </motion.h2>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-xl text-orange-400 font-bold"
          >
            {nextPhaseInfo.name}
          </motion.p>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="text-sm text-white/40 mt-2"
          >
            {nextPhaseInfo.description}
          </motion.p>
        </motion.div>
      </div>
    );
  }

  // Disclaimer Modal
  if (showDisclaimer) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-black">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
          className="max-w-lg w-full rounded-2xl p-8 text-center border border-red-500/30 bg-gradient-to-br from-red-900/20 to-black shadow-[0_0_100px_rgba(239,68,68,0.2)]">
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-16 h-16 rounded-full bg-red-500/20 flex items-center justify-center mx-auto mb-6"
          >
            <AlertTriangle className="w-8 h-8 text-red-400" />
          </motion.div>
          <h2 className="text-2xl font-bold mb-4 text-white">⚠️ DISCLAIMER</h2>
          <p className="text-white/60 mb-6 leading-relaxed">
            This quiz uses <span className="text-red-400 font-bold">psychological pressure techniques</span> including
            response-time tracking, consistency cross-references, and ego trap detection.
            There is <span className="text-red-400 font-bold">no way to cheat</span>.
          </p>
          <div className="flex gap-4">
            <button onClick={() => setShowDisclaimer(false)}
              className="flex-1 px-6 py-3 rounded-xl border border-white/10 text-white/60 hover:text-white transition-colors">Go Back</button>
            <button onClick={handleAcceptDisclaimer}
              className="flex-1 px-6 py-3 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold hover:shadow-[0_0_30px_rgba(249,115,22,0.5)] transition-shadow">I Accept the Risk 🔥</button>
          </div>
        </motion.div>
      </div>
    );
  }

  // Pre-quiz state
  if (!quizStarted) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-black relative overflow-hidden">
        {/* Animated background particles */}
        {Array.from({ length: 30 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-orange-500/30 rounded-full"
            initial={{
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
              y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800),
            }}
            animate={{
              x: [Math.random() * 1000, Math.random() * 1000],
              y: [Math.random() * 800, Math.random() * 800],
              opacity: [0, 0.5, 0],
            }}
            transition={{
              duration: 5 + Math.random() * 10,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
          />
        ))}

        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl w-full text-center relative z-10">
          <motion.div
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="mb-8"
          >
            <h1 className="text-5xl md:text-7xl font-black mb-6">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-red-500 to-pink-500">READY TO BEGIN?</span>
            </h1>
          </motion.div>
          <p className="text-xl text-white/50 mb-4">50 questions. 5 phases. Zero mercy.</p>
          <div className="flex justify-center gap-2 mb-8 flex-wrap">
            {Object.values(PHASES).map((p) => (
              <motion.span
                key={p.phase}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: p.phase * 0.1 }}
                className="px-4 py-2 rounded-xl bg-white/5 text-xs text-white/60 border border-white/10 hover:border-orange-500/30 transition-colors"
              >
                {p.name.split(" ").slice(0, 2).join(" ")}
              </motion.span>
            ))}
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleStartQuiz}
            className="px-12 py-5 rounded-2xl font-bold text-xl text-white bg-gradient-to-r from-orange-500 to-red-500 shadow-[0_0_40px_rgba(249,115,22,0.4)] hover:shadow-[0_0_60px_rgba(249,115,22,0.6)] transition-shadow"
          >
            <Flame className="w-6 h-6 inline mr-2" />TAKE THE TEST
          </motion.button>
        </motion.div>
      </div>
    );
  }

  // Quiz in progress - Phase-specific rendering
  return (
    <div className={`min-h-screen p-4 md:p-8 bg-gradient-to-b ${phaseStyles.bg} ${screenShake ? "animate-shake" : ""}`}>
      {/* ===== PHASE 3 GLITCH EFFECT ===== */}
      {(phaseStyles.glitch || glitchIntensity > 0) && (
        <div className="fixed inset-0 pointer-events-none z-40">
          <div className="absolute inset-0 bg-red-500/5" />
          {Array.from({ length: 8 }).map((_, i) => (
            <motion.div key={i} className="absolute h-px bg-red-500/40"
              style={{ top: `${10 + i * 12}%`, left: 0, right: 0 }}
              animate={{ x: [-100, 100, -100], opacity: [0, 0.5, 0] }}
              transition={{ duration: 0.2 + Math.random() * 0.3, repeat: Infinity, delay: i * 0.08 }} />
          ))}
        </div>
      )}

      {/* ===== PRESSURE EVENT OVERLAY ===== */}
      <AnimatePresence>
        {currentPressureEvent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`fixed inset-0 pointer-events-none z-50 flex items-center justify-center ${
              currentPressureEvent.type === "flash" ? "bg-white" : "bg-black/50"
            }`}
          >
            <motion.div
              animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }}
              transition={{ duration: 0.5, repeat: Infinity }}
              className="text-center"
            >
              <span className="text-6xl">{currentPressureEvent.icon}</span>
              <p className="text-2xl font-black text-white mt-4">{currentPressureEvent.message}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ===== STREAK POPUP ===== */}
      <AnimatePresence>
        {showStreakPopup && (
          <motion.div
            initial={{ opacity: 0, y: -50, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -50, scale: 0.8 }}
            className="fixed top-20 left-1/2 -translate-x-1/2 z-50 px-6 py-3 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 shadow-[0_0_40px_rgba(249,115,22,0.6)]"
          >
            <div className="flex items-center gap-3">
              <Trophy className="w-6 h-6 text-white" />
              <span className="text-xl font-black text-white">{streak}x STREAK!</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ===== PHASE 4 SPECTATOR TICKER ===== */}
      {phase === 4 && currentQ?.spectatorCount && (
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
          className="fixed top-4 right-4 z-50 px-4 py-3 rounded-xl border border-purple-500/30 bg-purple-900/30 backdrop-blur-sm shadow-[0_0_30px_rgba(168,85,247,0.3)]">
          <div className="flex items-center gap-2">
            <Eye className="w-5 h-5 text-purple-400 animate-pulse" />
            <span className="text-sm font-bold text-purple-300">{spectatorCount} people are watching you</span>
          </div>
          <div className="mt-1 flex gap-1">
            {Array.from({ length: Math.min(Math.floor(spectatorCount / 20), 10) }).map((_, i) => (
              <div key={i} className="w-2 h-2 rounded-full bg-purple-400/60 animate-pulse" style={{ animationDelay: `${i * 0.1}s` }} />
            ))}
          </div>
        </motion.div>
      )}

      {/* ===== TIMER (Phase 5 + Curveballs with time limit) ===== */}
      {(phase === 5 || (showCurveball && currentQ?.timeLimitMs)) && timeLeft !== null && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50">
          <motion.div animate={{ scale: timeLeft < 1 ? [1, 1.05, 1] : 1 }}
            transition={{ duration: 0.3, repeat: timeLeft < 1 ? Infinity : 0 }}
            className="px-6 py-3 rounded-xl border border-yellow-500/50 bg-yellow-900/30 backdrop-blur-sm shadow-[0_0_30px_rgba(245,158,11,0.3)]">
            <div className="flex items-center gap-3">
              <Zap className="w-5 h-5 text-yellow-400" />
              <span className="text-2xl font-black text-yellow-400 font-mono">{timeLeft.toFixed(1)}s</span>
            </div>
            <div className="w-40 h-2 bg-white/10 rounded-full mt-2 overflow-hidden">
              <div className={`h-full rounded-full transition-all duration-100 ${timeLeft < 1 ? 'bg-gradient-to-r from-red-600 to-red-500' : 'bg-gradient-to-r from-yellow-500 to-red-500'}`}
                style={{ width: `${(timeLeft / 2) * 100}%` }} />
            </div>
          </motion.div>
        </div>
      )}



      {/* ===== SCORE ESTIMATE ===== */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="fixed bottom-4 left-4 z-50 px-4 py-2 rounded-xl border border-white/10 bg-black/50 backdrop-blur-sm"
      >
        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4 text-white/40" />
          <span className="text-xs text-white/40">SCORE:</span>
          <span className={`text-sm font-bold ${scoreEstimate >= 0 ? "text-green-400" : "text-red-400"}`}>
            {scoreEstimate.toLocaleString()}
          </span>
        </div>
      </motion.div>

      {/* ===== STREAK COUNTER ===== */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="fixed bottom-4 right-4 z-50 px-4 py-2 rounded-xl border border-white/10 bg-black/50 backdrop-blur-sm"
      >
        <div className="flex items-center gap-2">
          <Target className="w-4 h-4 text-orange-400" />
          <span className="text-xs text-white/40">STREAK:</span>
          <span className="text-sm font-bold text-orange-400">{streak}x</span>
          {bestStreak > 0 && (
            <span className="text-xs text-white/30">({bestStreak} best)</span>
          )}
        </div>
      </motion.div>

      {/* ===== HEADER ===== */}
      {phase !== 2 && <div className="max-w-2xl mx-auto mb-8">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <motion.span
              key={phase}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className={`px-3 py-1 rounded-lg bg-gradient-to-r ${phaseStyles.accent} text-white text-xs font-bold shadow-lg`}
            >
              PHASE {phase}
            </motion.span>
            <span className="text-sm text-white/50">Question {currentQuestion + 1} of {questions.length}</span>
          </div>
          <span className="text-xs text-white/30 hidden md:block">{phaseInfo.name}</span>
        </div>
        <div className="h-2 bg-white/10 rounded-full overflow-hidden">
          <motion.div
            className={`h-full rounded-full bg-gradient-to-r ${phaseStyles.accent}`}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>}

      {/* ===== QUESTION AREA ===== */}
      {phase === 2 ? (
        <div className="max-w-2xl mx-auto h-[calc(100vh-100px)]">
          <Phase2Chat
            question={currentQ}
            onAnswer={handleAnswer}
            questionNumber={currentQuestion + 1}
            totalQuestions={questions.length}
          />
        </div>
      ) : (
      <div className="max-w-2xl mx-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion}
            initial={{ opacity: 0, x: 50, rotateY: -10 }}
            animate={{ opacity: 1, x: 0, rotateY: 0 }}
            exit={{ opacity: 0, x: -50, rotateY: 10 }}
            transition={{ duration: 0.4, type: "spring" }}
            className={`rounded-2xl p-6 md:p-8 ${
              phase === 3 ? "border-2 border-red-500/40 bg-red-950/30 shadow-[0_0_30px_rgba(239,68,68,0.15)]" :
              phase === 4 ? "border border-purple-500/30 bg-purple-950/20 shadow-[0_0_20px_rgba(168,85,247,0.1)]" :
              phase === 5 ? "border-2 border-yellow-500/40 bg-yellow-950/20 shadow-[0_0_20px_rgba(245,158,11,0.15)]" :
              "border border-white/10 bg-white/5 shadow-[0_0_20px_rgba(255,255,255,0.05)]"
            }`}
          >
            {/* ===== CURVEBALL BADGE ===== */}
            {showCurveball && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mb-4 flex items-center gap-2 px-3 py-1 rounded-lg bg-gradient-to-r from-orange-500 to-red-500 w-fit"
              >
                <Sparkles className="w-4 h-4 text-white" />
                <span className="text-xs font-bold text-white">⚡ CURVEBALL</span>
              </motion.div>
            )}



            {/* ===== PHASE 1: BRAIN ICON ===== */}
            {phase === 1 && (
              <div className="mb-4 flex items-center gap-2">
                <Brain className="w-5 h-5 text-cyan-400" />
                <span className="text-xs text-cyan-400 font-bold">SPATIAL ANALYSIS</span>
              </div>
            )}

            {/* ===== PHASE 3: WARNING ===== */}
            {phase === 3 && (
              <div className="mb-4 flex items-center gap-2">
                <Skull className="w-5 h-5 text-red-400" />
                <span className="text-xs text-red-400 font-bold">EGO TRAP ZONE</span>
              </div>
            )}

            {/* ===== PHASE 5: SPEED MODE ===== */}
            {phase === 5 && (
              <div className="mb-4 flex items-center gap-2">
                <Zap className="w-5 h-5 text-yellow-400" />
                <span className="text-xs text-yellow-400 font-bold">NEURAL SPEED RUN</span>
                {difficulty.timerReduction > 0 && (
                  <span className="text-xs text-red-400 animate-pulse">⚡ HARDER</span>
                )}
              </div>
            )}

            {/* ===== PHASE 4: SPECTATOR MODE ===== */}
            {phase === 4 && (
              <div className="mb-4 flex items-center gap-2">
                <Eye className="w-5 h-5 text-purple-400" />
                <span className="text-xs text-purple-400 font-bold">PUBLIC SCRUTINY</span>
              </div>
            )}

            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-2xl md:text-3xl font-bold text-white/95 mb-6"
            >
              {currentQ.text}
            </motion.h2>
            {currentQ.subtext && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-sm text-white/50 italic mb-6"
              >
                {currentQ.subtext}
              </motion.p>
            )}

            {/* ===== OPTIONS ===== */}
            <div className={`space-y-3 ${shufflingOptions ? "animate-pulse" : ""}`}>
              {(shuffledOptions.length > 0 ? shuffledOptions : currentQ.options.map((_, i) => i)).map((optionIndex, displayIndex) => {
                const option = currentQ.options[optionIndex];
                return (
                  <motion.button
                    key={option.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + displayIndex * 0.08, type: "spring" }}
                    whileHover={{ scale: 1.02, x: 10 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      setSelectedOption(option.id);
                      handleAnswer(currentQ.id, option.id);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        setSelectedOption(option.id);
                        handleAnswer(currentQ.id, option.id);
                      }
                    }}
                    tabIndex={0}
                    aria-label={`Option ${String.fromCharCode(65 + displayIndex)}: ${option.text}`}
                    className={`w-full text-left p-4 md:p-5 rounded-xl transition-all duration-300 group focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:ring-offset-2 focus:ring-offset-black ${
                      selectedOption === option.id
                        ? "border-2 border-orange-500 bg-orange-500/10 shadow-[0_0_20px_rgba(249,115,22,0.3)]"
                        : `border hover:bg-white/10 ${
                            phase === 3 ? "border-red-500/20 hover:border-red-500/40 hover:shadow-[0_0_15px_rgba(239,68,68,0.2)]" :
                            phase === 5 ? "border-yellow-500/20 hover:border-yellow-500/40 hover:shadow-[0_0_15px_rgba(245,158,11,0.2)]" :
                            phase === 4 ? "border-purple-500/20 hover:border-purple-500/40 hover:shadow-[0_0_15px_rgba(168,85,247,0.2)]" :
                            "border-white/10 hover:border-white/20 hover:shadow-[0_0_15px_rgba(255,255,255,0.1)]"
                          }`
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <motion.span
                        whileHover={{ rotate: [0, -10, 10, 0] }}
                        className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold transition-all ${
                          selectedOption === option.id ? "bg-orange-500 text-white" : "bg-white/5 text-white/50 group-hover:bg-orange-500/20 group-hover:text-orange-400"
                        }`}
                      >
                        {String.fromCharCode(65 + displayIndex)}
                      </motion.span>
                      <span className="text-base md:text-lg text-white/90">{option.text}</span>
                    </div>
                  </motion.button>
                );
              })}
            </div>

            {/* ===== PHASE-SPECIFIC WARNINGS ===== */}
            {phase === 3 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-6 flex items-center gap-2 text-xs text-red-400/70"
              >
                <Skull className="w-4 h-4" />
                <span>⚠️ Some options are traps. The system is watching your ego.</span>
              </motion.div>
            )}
            {phase === 5 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-6 flex items-center gap-2 text-xs text-yellow-400/70"
              >
                <Clock className="w-4 h-4" />
                <span>⚡ No time to think. Trust your instincts.</span>
              </motion.div>
            )}
            {phase === 4 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-6 flex items-center gap-2 text-xs text-purple-400/70"
              >
                <Eye className="w-4 h-4" />
                <span>👁️ The audience is judging your every move.</span>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
      )}
    </div>
  );
}
