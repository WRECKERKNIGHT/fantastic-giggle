/* eslint-disable react-hooks/purity -- particle effects use Math.random() for visual variety */
"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Flame, Zap, Skull, Eye, Sparkles, Swords } from "lucide-react";

const ANIME_QUOTES = [
  "The power of aura flows through you...",
  "Your spirit has been measured...",
  "The cosmic forces await...",
  "Only the strongest survive...",
  "Your true power shall be revealed...",
];

export function HeroSection({ onStart, onQuickCheck }: { onStart: () => void; onQuickCheck: () => void }) {
  const [windowHeight, setWindowHeight] = useState(1000);
  const [quoteIndex, setQuoteIndex] = useState(0);

  useEffect(() => {
    setWindowHeight(window.innerHeight);
    const interval = setInterval(() => {
      setQuoteIndex((prev) => (prev + 1) % ANIME_QUOTES.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Anime-style animated background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-[#1a0a0a] to-black" />
        
        {/* Radial energy burst */}
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] opacity-20"
          style={{
            background: "conic-gradient(from 0deg, transparent 0%, rgba(255,100,0,0.3) 10%, transparent 20%, rgba(255,50,0,0.2) 30%, transparent 40%)",
            animation: "spin 20s linear infinite",
          }}
        />
        
        {/* Floating energy particles */}
        {Array.from({ length: 50 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              bottom: `-10%`,
              width: `${2 + Math.random() * 4}px`,
              height: `${2 + Math.random() * 4}px`,
              backgroundColor: ["#ff4500", "#ff6b00", "#ffaa00", "#ff0066", "#00ffff"][i % 5],
            }}
            animate={{
              y: [0, -windowHeight * 1.3],
              opacity: [0, 1, 0.8, 0],
              scale: [0.5, 2, 0.5],
            }}
            transition={{
              duration: 2.5 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 4,
              ease: "easeOut",
            }}
          />
        ))}
        
        {/* Anime speed lines */}
        <div className="absolute inset-0 overflow-hidden opacity-10">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={`line-${i}`}
              className="absolute h-px bg-gradient-to-r from-transparent via-orange-500 to-transparent"
              style={{
                top: `${10 + i * 6}%`,
                left: "-20%",
                right: "-20%",
                transform: `rotate(${-2 + Math.random() * 4}deg)`,
              }}
              animate={{
                x: ["-100%", "100%"],
                opacity: [0, 0.8, 0],
              }}
              transition={{
                duration: 1.5 + Math.random(),
                repeat: Infinity,
                delay: Math.random() * 5,
                ease: "linear",
              }}
            />
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        {/* Anime power level badge */}
        <motion.div
          initial={{ opacity: 0, y: -30, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.6, type: "spring" }}
          className="inline-flex items-center gap-3 px-6 py-3 rounded-full border-2 border-orange-500/50 bg-orange-500/10 mb-8"
        >
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          >
            <Swords className="w-5 h-5 text-orange-400" />
          </motion.div>
          <span className="text-sm font-bold text-orange-400 tracking-wider uppercase">
            Danger Level: Extreme
          </span>
          <motion.div
            animate={{ rotate: [360, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          >
            <Swords className="w-5 h-5 text-orange-400" />
          </motion.div>
        </motion.div>

        {/* Main anime title */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.8, type: "spring", stiffness: 100 }}
        >
          <h1 
            className="text-6xl md:text-8xl lg:text-9xl font-black mb-6 leading-none"
            style={{
              fontFamily: "var(--font-display)",
              textShadow: "0 0 60px rgba(255,100,0,0.7), 0 0 120px rgba(255,50,0,0.5), 0 0 180px rgba(255,0,0,0.3)",
            }}
          >
            <motion.span 
              className="block text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-red-500 to-orange-600"
              animate={{ 
                textShadow: [
                  "0 0 20px rgba(255,100,0,0.5)",
                  "0 0 40px rgba(255,100,0,0.8)",
                  "0 0 20px rgba(255,100,0,0.5)",
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              WELCOME TO THE
            </motion.span>
            <motion.span 
              className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-white via-orange-200 to-white"
              animate={{ scale: [1, 1.02, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              ULTIMATE AURA
            </motion.span>
            <motion.span 
              className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500"
              animate={{ 
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
              style={{ backgroundSize: "200% 100%" }}
            >
              CALCULATOR
            </motion.span>
          </h1>
        </motion.div>

        {/* Anime quote rotation */}
        <div className="h-12 mb-6">
          <AnimatePresence mode="wait">
            <motion.p
              key={quoteIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-xl md:text-2xl text-orange-300/80 italic font-medium"
              style={{ fontFamily: "var(--font-display)" }}
            >
              &ldquo;{ANIME_QUOTES[quoteIndex]}&rdquo;
            </motion.p>
          </AnimatePresence>
        </div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="text-xl md:text-2xl text-white/70 max-w-3xl mx-auto mb-4 leading-relaxed"
        >
          This isn&apos;t your average personality quiz. This is a{" "}
          <span className="text-orange-400 font-bold">50-question psychological warfare</span>{" "}
          engine designed to strip away your filter and reveal your{" "}
          <motion.span 
            className="text-red-400 font-bold"
            animate={{ 
              textShadow: [
                "0 0 10px rgba(239,68,68,0.5)",
                "0 0 20px rgba(239,68,68,0.8)",
                "0 0 10px rgba(239,68,68,0.5)",
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            TRUE aura
          </motion.span>.
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="text-lg text-white/50 max-w-2xl mx-auto mb-12"
        >
          The system tracks your every move. Response times. Consistency. Hesitation.{" "}
          <span className="text-red-500 font-bold">Lie detection</span>. There is{" "}
          <span className="text-red-500 font-bold">no hiding</span> from the Aura Calculator.
        </motion.p>

        {/* Stats row with anime style */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {[
            { icon: <Eye className="w-5 h-5" />, label: "50 Questions", color: "#00ffff" },
            { icon: <Zap className="w-5 h-5" />, label: "Real-Time Lie Detection", color: "#fbbf24" },
            { icon: <Flame className="w-5 h-5" />, label: "5 Pressure Phases", color: "#ff4500" },
            { icon: <Skull className="w-5 h-5" />, label: "5 Danger Tiers", color: "#ef4444" },
          ].map((stat, i) => (
            <motion.div 
              key={i} 
              className="flex items-center gap-2 px-5 py-3 rounded-xl border-2 bg-white/5"
              style={{ borderColor: `${stat.color}40` }}
              whileHover={{ 
                scale: 1.05,
                borderColor: stat.color,
                boxShadow: `0 0 20px ${stat.color}40`,
              }}
            >
              <span style={{ color: stat.color }}>{stat.icon}</span>
              <span className="text-sm font-semibold text-white/90">{stat.label}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Buttons with anime style */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.4, duration: 0.5, type: "spring" }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6"
        >
          {/* Full Exam Button */}
          <motion.button
            onClick={onStart}
            className="group relative px-12 py-6 rounded-2xl font-bold text-xl text-white overflow-hidden border-2 border-orange-500/50"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-orange-600 via-red-600 to-orange-700 transition-all duration-300" />
            <div className="absolute inset-0 bg-gradient-to-r from-red-700 via-orange-600 to-red-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <motion.div 
              className="absolute inset-0 bg-gradient-to-r from-orange-500 to-red-500 blur-xl opacity-0 group-hover:opacity-60 transition-opacity duration-300"
              animate={{
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span className="relative z-10 flex items-center gap-3">
              <motion.span
                animate={{ rotate: [0, 15, -15, 0] }}
                transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 2 }}
              >
                <Flame className="w-6 h-6" />
              </motion.span>
              FULL 50-QUESTION EXAM
              <motion.span
                animate={{ rotate: [0, -15, 15, 0] }}
                transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 2 }}
              >
                <Flame className="w-6 h-6" />
              </motion.span>
            </span>
          </motion.button>

          {/* Quick Check Button */}
          <motion.button
            onClick={onQuickCheck}
            className="group relative px-12 py-6 rounded-2xl font-bold text-xl text-white overflow-hidden border-2 border-purple-500/50"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-500 to-purple-700 transition-all duration-300" />
            <div className="absolute inset-0 bg-gradient-to-r from-pink-600 via-purple-500 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <motion.div 
              className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 blur-xl opacity-0 group-hover:opacity-60 transition-opacity duration-300"
              animate={{
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span className="relative z-10 flex items-center gap-3">
              <motion.span
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                <Sparkles className="w-6 h-6" />
              </motion.span>
              QUICK 10-QUESTION CHECK
              <motion.span
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 1, repeat: Infinity, delay: 0.5 }}
              >
                <Sparkles className="w-6 h-6" />
              </motion.span>
            </span>
          </motion.button>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8 }}
          className="text-sm text-white/40 mt-8 flex items-center justify-center gap-2"
        >
          <motion.span
            animate={{ opacity: [1, 0.5, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            ⚠️
          </motion.span>
          Warning: Both quizzes use psychological pressure techniques. Enter at your own risk.
          <motion.span
            animate={{ opacity: [1, 0.5, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            ⚠️
          </motion.span>
        </motion.p>
      </div>

      {/* Bottom gradient fade with anime style */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black via-black/50 to-transparent" />
      
      {/* Side fire effects */}
      <motion.div 
        className="absolute left-0 top-1/3 bottom-1/3 w-20 bg-gradient-to-r from-orange-500/20 to-transparent"
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
      <motion.div 
        className="absolute right-0 top-1/3 bottom-1/3 w-20 bg-gradient-to-l from-orange-500/20 to-transparent"
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 2, repeat: Infinity, delay: 1 }}
      />
    </section>
  );
}
