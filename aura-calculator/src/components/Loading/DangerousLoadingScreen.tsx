/* eslint-disable react-hooks/purity -- particle effects use Math.random() for visual variety */
"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Skull, AlertTriangle, Flame, Zap, Shield } from "lucide-react";

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

const LOADING_ICONS = [
  <Shield key="shield" className="w-6 h-6" />,
  <Flame key="flame" className="w-6 h-6" />,
  <Zap key="zap" className="w-6 h-6" />,
  <Skull key="skull" className="w-6 h-6" />,
];

export function DangerousLoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [messageIndex, setMessageIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [windowHeight, setWindowHeight] = useState(1000);

  useEffect(() => {
    setWindowHeight(window.innerHeight);
  }, []);

  const glitchIntensity = progress / 100;

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
          exit={{ opacity: 0, scale: 1.1 }}
          className="fixed inset-0 z-[100] bg-black flex items-center justify-center overflow-hidden"
        >
          {/* Animated background */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-b from-black via-[#1a0000] to-black" />

            {/* Floating flame particles */}
            {Array.from({ length: 80 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  bottom: `-10%`,
                  width: `${2 + Math.random() * 4}px`,
                  height: `${2 + Math.random() * 4}px`,
                  backgroundColor: Math.random() > 0.5 ? "#ff4500" : "#ff6b00",
                }}
                animate={{
                  y: [0, -windowHeight * 1.5],
                  opacity: [0, 1, 0.8, 0],
                  scale: [0.3, 2, 0.5],
                }}
                transition={{
                  duration: 2 + Math.random() * 4,
                  repeat: Infinity,
                  delay: Math.random() * 3,
                  ease: "easeOut",
                }}
              />
            ))}

            {/* Glitch lines */}
            {Array.from({ length: 12 }).map((_, i) => (
              <motion.div
                key={`glitch-${i}`}
                className="absolute h-px"
                style={{
                  top: `${8 + i * 8}%`,
                  left: 0,
                  right: 0,
                  backgroundColor: `rgba(255, ${50 + i * 10}, 0, ${0.1 + glitchIntensity * 0.3})`,
                }}
                animate={{
                  x: [-100, 100, -100],
                  opacity: [0, 0.5 * (1 + glitchIntensity), 0],
                }}
                transition={{
                  duration: 0.3 + Math.random() * 0.4,
                  repeat: Infinity,
                  delay: Math.random() * 1.5,
                }}
              />
            ))}

            {/* Screen shake effect */}
            {glitchIntensity > 0.5 && (
              <motion.div
                className="absolute inset-0 bg-red-500/5"
                animate={{
                  opacity: [0, 0.1 * glitchIntensity, 0],
                  x: [-2, 2, -1, 1, 0],
                }}
                transition={{ duration: 0.1, repeat: Infinity }}
              />
            )}
          </div>

          {/* Main content */}
          <div className="relative z-10 text-center px-4 max-w-4xl">
            {/* Icon with pulse ring */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
              className="mb-8 relative"
            >
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-orange-500/50"
                animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-red-500/50"
                animate={{ scale: [1, 2], opacity: [0.5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
              />

              <div className="w-36 h-36 mx-auto rounded-full bg-gradient-to-br from-orange-500 via-red-600 to-orange-700 flex items-center justify-center shadow-[0_0_100px_rgba(255,100,0,0.6)]">
                <motion.div
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 0.5, repeat: Infinity }}
                >
                  <Skull className="text-white" style={{ width: "4.5rem", height: "4.5rem" }} />
                </motion.div>
              </div>
            </motion.div>

            {/* Title with glitch effect */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mb-8"
            >
              <motion.h1
                className="text-6xl md:text-8xl font-black mb-2"
                style={{
                  fontFamily: "var(--font-display)",
                  textShadow: "0 0 40px rgba(255,80,0,0.6), 0 0 80px rgba(255,40,0,0.4)",
                }}
                animate={glitchIntensity > 0.7 ? {
                  x: [-2, 2, -1, 1, 0],
                  textShadow: [
                    "0 0 40px rgba(255,80,0,0.6)",
                    "2px 0 #ff0000, -2px 0 #00ffff",
                    "0 0 40px rgba(255,80,0,0.6)",
                  ],
                } : {}}
                transition={{ duration: 0.1, repeat: glitchIntensity > 0.7 ? Infinity : 0 }}
              >
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-red-500 to-orange-600">
                  GET READY TO
                </span>
              </motion.h1>
              <motion.h1
                className="text-6xl md:text-8xl font-black"
                style={{
                  fontFamily: "var(--font-display)",
                  textShadow: "0 0 40px rgba(255,100,0,0.6), 0 0 80px rgba(255,60,0,0.4)",
                }}
                animate={glitchIntensity > 0.7 ? { x: [2, -2, 1, -1, 0] } : {}}
                transition={{ duration: 0.1, repeat: glitchIntensity > 0.7 ? Infinity : 0 }}
              >
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-orange-400 to-yellow-500">
                  GET EXPLORED
                </span>
              </motion.h1>
            </motion.div>

            {/* Loading message with icon */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mb-8"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={messageIndex}
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  className="flex items-center justify-center gap-3"
                >
                  <span className="text-orange-400">{LOADING_ICONS[messageIndex % LOADING_ICONS.length]}</span>
                  <span className="text-lg font-mono text-orange-400 tracking-wider">{LOADING_MESSAGES[messageIndex]}</span>
                </motion.div>
              </AnimatePresence>
            </motion.div>

            {/* Progress bar */}
            <motion.div initial={{ opacity: 0, scaleX: 0 }} animate={{ opacity: 1, scaleX: 1 }} transition={{ delay: 0.7 }} className="max-w-lg mx-auto mb-8">
              <div className="h-3 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-orange-500 via-red-500 to-orange-600"
                  style={{ width: `${progress}%` }}
                  animate={{ boxShadow: ["0 0 20px rgba(255,100,0,0.5)", "0 0 40px rgba(255,100,0,0.8)", "0 0 20px rgba(255,100,0,0.5)"] }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                />
              </div>
              <div className="flex justify-between mt-3">
                <span className="text-xs text-white/30 font-mono">SYSTEM LOADING</span>
                <motion.span className="text-sm text-orange-400 font-mono font-bold" animate={{ opacity: [1, 0.5, 1] }} transition={{ duration: 1, repeat: Infinity }}>
                  {progress}%
                </motion.span>
              </div>
            </motion.div>

            {/* Warning badges */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} className="flex flex-wrap justify-center gap-3">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-red-500/30 bg-red-500/10">
                <AlertTriangle className="w-4 h-4 text-red-400" />
                <span className="text-xs text-red-400 font-semibold">PSYCHOLOGICAL PRESSURE INCOMING</span>
              </div>
              {progress > 50 && (
                <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-orange-500/30 bg-orange-500/10">
                  <Flame className="w-4 h-4 text-orange-400" />
                  <span className="text-xs text-orange-400 font-semibold">ESCAPE ROUTES LOCKED</span>
                </motion.div>
              )}
              {progress > 80 && (
                <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-yellow-500/30 bg-yellow-500/10">
                  <Zap className="w-4 h-4 text-yellow-400" />
                  <span className="text-xs text-yellow-400 font-semibold">NEURAL SPEED RUN READY</span>
                </motion.div>
              )}
            </motion.div>
          </div>

          {/* Corner flames */}
          <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-orange-500/30 via-red-500/15 to-transparent" />
          <div className="absolute top-0 left-0 right-0 h-48 bg-gradient-to-b from-orange-500/15 via-red-500/8 to-transparent" />
          <motion.div className="absolute left-0 top-1/4 bottom-1/4 w-32 bg-gradient-to-r from-orange-500/20 to-transparent" animate={{ opacity: [0.3, 0.6, 0.3] }} transition={{ duration: 2, repeat: Infinity }} />
          <motion.div className="absolute right-0 top-1/4 bottom-1/4 w-32 bg-gradient-to-l from-orange-500/20 to-transparent" animate={{ opacity: [0.3, 0.6, 0.3] }} transition={{ duration: 2, repeat: Infinity, delay: 1 }} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
