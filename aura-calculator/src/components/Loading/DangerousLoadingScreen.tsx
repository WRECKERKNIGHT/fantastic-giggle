/* eslint-disable react-hooks/purity -- particle effects use Math.random() for visual variety */
"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, AlertTriangle, Zap } from "lucide-react";

type LoadingScreenProps = {
  onComplete: () => void;
};

const LOADING_MESSAGES = [
  "INITIALIZING AURA SCANNER...",
  "LOADING PSYCHOLOGICAL PROFILE...",
  "CALIBRATING LIE DETECTION...",
  "ACTIVATING PHASE PRESSURE...",
  "PREPARING NEURAL SPEED RUN...",
  "SCANNING FOR DESPERATION...",
  "LOCKING ESCAPE ROUTES...",
  "GET READY TO GET EXPLORED",
];

export function DangerousLoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [messageIndex, setMessageIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsComplete(true);
            setTimeout(onComplete, 1000);
          }, 500);
          return 100;
        }
        return prev + 1.5;
      });
    }, 50);

    return () => clearInterval(interval);
  }, [onComplete]);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % LOADING_MESSAGES.length);
    }, 700);

    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {!isComplete && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-[var(--paper)] paper-grain"
        >
          {/* Monochrome backdrop */}
          <div className="halftone absolute inset-0 opacity-30" />
          <div className="crosshatch-soft absolute inset-0" />

          {/* Scanning line */}
          <motion.div
            className="absolute inset-x-0 h-24 border-y-2 border-[var(--ink-line-faint)]"
            animate={{ top: ["-10%", "110%"] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "linear" }}
          >
            <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent,rgba(20,17,12,0.06),transparent)]" />
          </motion.div>

          {/* Main content */}
          <div className="relative z-10 max-w-4xl px-4 text-center">
            {/* Scanner eye */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
              className="relative mx-auto mb-10 flex h-40 w-40 items-center justify-center"
            >
              {/* Expanding rings */}
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-[var(--ink-line)]"
                animate={{ scale: [1, 1.5], opacity: [0.6, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-[var(--ink-line)]"
                animate={{ scale: [1, 2], opacity: [0.5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
              />
              {/* Eye */}
              <div className="flex h-36 w-36 items-center justify-center rounded-full border-2 border-[var(--ink)] bg-[var(--paper-card)]">
                <motion.div
                  animate={{ scale: [1, 1.08, 1] }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                  className="text-[var(--ink)]"
                >
                  <Eye style={{ width: "4.5rem", height: "4.5rem" }} strokeWidth={1.5} />
                </motion.div>
              </div>
            </motion.div>

            {/* Title */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mb-8"
            >
              <h1 className="font-[var(--font-display)] text-5xl font-black uppercase sm:text-7xl">
                <span className="block">Get ready to</span>
                <span className="sketch-underline block">get measured</span>
              </h1>
            </motion.div>

            {/* Loading message */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mb-10 flex h-8 items-center justify-center"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={messageIndex}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="font-[var(--font-mono)] text-sm font-semibold tracking-widest text-[var(--ink-soft)]"
                >
                  <span className="text-[var(--ink)]">{">"}</span>{" "}
                  {LOADING_MESSAGES[messageIndex]}
                  <span className="caret text-[var(--ink)]" />
                </motion.div>
              </AnimatePresence>
            </motion.div>

            {/* Meter */}
            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ delay: 0.7 }}
              className="mx-auto mb-8 max-w-lg"
            >
              <div className="meter-track w-full">
                <div className="meter-fill" style={{ width: `${progress}%` }} />
              </div>
              <div className="mt-3 flex justify-between font-[var(--font-mono)] text-xs">
                <span className="text-[var(--ink-muted)]">SYSTEM LOADING</span>
                <motion.span
                  className="font-bold text-[var(--ink)]"
                  animate={{ opacity: [1, 0.4, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  {Math.round(progress)}%
                </motion.span>
              </div>
            </motion.div>

            {/* Warning stamps */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="flex flex-wrap items-center justify-center gap-3"
            >
              <span className="stamp">PSYCHOLOGICAL PRESSURE INCOMING</span>
              {progress > 50 && (
                <motion.span
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="stamp stamp-invert"
                >
                  <span className="flex items-center gap-2">
                    <AlertTriangle className="h-3 w-3" /> ESCAPE ROUTES LOCKED
                  </span>
                </motion.span>
              )}
              {progress > 80 && (
                <motion.span
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="stamp"
                >
                  <span className="flex items-center gap-2">
                    <Zap className="h-3 w-3" /> NEURAL SPEED RUN READY
                  </span>
                </motion.span>
              )}
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
