"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Swords, Zap, Eye, Flame, Skull } from "lucide-react";

const QUOTES = [
  "Presence cannot be faked. Only measured.",
  "The system watches how fast you blink.",
  "No colour. No comfort. Pure psychometrics.",
  "Your hesitation is a data point.",
  "The tier is a verdict, not a label.",
];

const STATS = [
  { icon: <Eye className="w-5 h-5" />, label: "50 QUESTIONS" },
  { icon: <Zap className="w-5 h-5" />, label: "LIE DETECTION" },
  { icon: <Flame className="w-5 h-5" />, label: "5 PRESSURE PHASES" },
  { icon: <Skull className="w-5 h-5" />, label: "5 TIERS" },
];

export function HeroSection({
  onStart,
  onQuickCheck,
}: {
  onStart: () => void;
  onQuickCheck: () => void;
}) {
  const [quoteIndex, setQuoteIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setQuoteIndex((prev) => (prev + 1) % QUOTES.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden paper-grain">
      {/* Monochrome backdrop */}
      <div className="halftone absolute inset-0 opacity-30" />
      <div className="crosshatch-soft absolute inset-0" />

      {/* Hand-drawn rings */}
      <svg
        className="absolute -top-32 -right-32 h-[30rem] w-[30rem] opacity-[0.07]"
        viewBox="0 0 200 200"
        fill="none"
      >
        <circle cx="100" cy="100" r="98" stroke="#14110c" strokeWidth="2" />
        <circle cx="100" cy="100" r="84" stroke="#14110c" strokeWidth="1" strokeDasharray="5 5" />
      </svg>
      <svg
        className="absolute -bottom-40 -left-40 h-[34rem] w-[34rem] opacity-[0.06]"
        viewBox="0 0 200 200"
        fill="none"
      >
        <circle cx="100" cy="100" r="98" stroke="#14110c" strokeWidth="2" />
        <circle cx="100" cy="100" r="88" stroke="#14110c" strokeWidth="1" />
      </svg>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-5xl px-4 text-center">
        {/* Top stamps */}
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="mb-8 flex items-center justify-center gap-4"
        >
          <span className="stamp">EST. MMXXVI</span>
          <span className="stamp stamp-invert hidden sm:inline-block">
            DANGER LEVEL: MEASURED
          </span>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.25, duration: 0.7 }}
          className="mb-6 font-[var(--font-display)] font-black leading-[0.95] tracking-tight"
        >
          <span className="mono-label mb-4 block text-base sm:text-lg">
            THE
          </span>
          <span className="block text-6xl uppercase sm:text-8xl lg:text-9xl">
            GIGA
          </span>
          <span className="sketch-underline block text-6xl uppercase sm:text-8xl lg:text-9xl">
            OP METER
          </span>
          <span className="mono-label mt-4 block text-sm">
            — A CERTIFIED AURA MEASUREMENT DEVICE —
          </span>
        </motion.h1>

        {/* Rotating quote */}
        <div className="mb-6 flex h-14 items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.p
              key={quoteIndex}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              className="font-[var(--font-mono)] text-lg text-[var(--ink-muted)] sm:text-xl"
            >
              <span className="text-[var(--ink)]">&ldquo;</span>
              {QUOTES[quoteIndex]}
              <span className="text-[var(--ink)]">&rdquo;</span>
              <span className="caret text-[var(--ink)]" />
            </motion.p>
          </AnimatePresence>
        </div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mx-auto mb-4 max-w-3xl text-lg leading-relaxed text-[var(--ink-soft)] sm:text-xl"
        >
          Not your average personality quiz. This is a{" "}
          <span className="font-bold text-[var(--ink)]">50-question psychometric examination</span>{" "}
          built to strip away your filter and expose your{" "}
          <span className="sketch-underline font-bold text-[var(--ink)]">TRUE aura</span>.
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="mx-auto mb-10 max-w-2xl font-[var(--font-mono)] text-sm text-[var(--ink-muted)]"
        >
          Response times. Consistency. Hesitation. Instinct velocity. There is{" "}
          <span className="font-bold text-[var(--ink)]">no hiding</span> from the machine.
        </motion.p>

        {/* Stats stickers */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mb-12 flex flex-wrap items-center justify-center gap-4"
        >
          {STATS.map((stat, i) => (
            <div
              key={i}
              className={`sketch-card-thin flex items-center gap-2 px-4 py-2.5 ${i % 2 === 0 ? "tilt-l" : "tilt-r"}`}
            >
              <span className="text-[var(--ink)]">{stat.icon}</span>
              <span className="font-[var(--font-mono)] text-xs font-semibold tracking-wider text-[var(--ink-soft)]">
                {stat.label}
              </span>
            </div>
          ))}
        </motion.div>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.95, duration: 0.5, type: "spring" }}
          className="flex flex-col items-center justify-center gap-6 sm:flex-row"
        >
          <motion.button
            onClick={onStart}
            className="sketch-btn text-lg"
            whileHover={{ rotate: -0.6 }}
            whileTap={{ scale: 0.97 }}
          >
            <Swords className="h-6 w-6" />
            FULL 50-QUESTION EXAM
          </motion.button>

          <motion.button
            onClick={onQuickCheck}
            className="sketch-btn sketch-btn-outline text-lg"
            whileHover={{ rotate: 0.6 }}
            whileTap={{ scale: 0.97 }}
          >
            QUICK 10-QUESTION CHECK
          </motion.button>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mt-10 flex items-center justify-center gap-2 font-[var(--font-mono)] text-xs text-[var(--ink-faint)]"
        >
          WARNING: BOTH EXAMINATIONS USE PSYCHOLOGICAL PRESSURE TECHNIQUES. ENTER AT YOUR OWN RISK.
        </motion.p>
      </div>

      {/* Bottom paper fade */}
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[var(--paper-deep)] to-transparent" />
    </section>
  );
}
