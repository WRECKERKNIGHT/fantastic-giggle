"use client";

import { motion } from "framer-motion";
import { Brain, Timer, Target, Flame, Sparkles, AlertCircle } from "lucide-react";

export function WhatYoullDoSection() {
  return (
    <section className="relative py-32 px-4 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-[#0a0a15] to-black" />

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1 rounded-full border border-orange-500/30 bg-orange-500/10 text-orange-400 text-sm font-bold mb-6">
            THE CHALLENGE
          </span>
          <h2 className="text-5xl md:text-7xl font-black mb-6">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-500">
              WHAT YOU&apos;LL HAVE TO DO
            </span>
          </h2>
        </motion.div>

        {/* Steps */}
        <div className="space-y-8">
          {[
            {
              step: "01",
              title: "Face 50 Questions",
              description: "Each question is designed to break down your filter. Some are easy. Some are traps. All are watching.",
              icon: <Brain className="w-6 h-6" />,
              color: "from-blue-500 to-cyan-500",
            },
            {
              step: "02",
              title: "Survive 5 Phases",
              description: "The UI morphs as you progress. Pressure increases. Timers get shorter. The stakes get higher.",
              icon: <Flame className="w-6 h-6" />,
              color: "from-orange-500 to-red-500",
            },
            {
              step: "03",
              title: "Beat the Lie Detection",
              description: "The system tracks your response times and cross-references your answers. You can't fake aura.",
              icon: <Target className="w-6 h-6" />,
              color: "from-purple-500 to-pink-500",
            },
            {
              step: "04",
              title: "Unlock Your Tier",
              description: "After 50 questions, your true aura is revealed. Ultimate Beast, Giga Chad, or... something worse.",
              icon: <Sparkles className="w-6 h-6" />,
              color: "from-yellow-500 to-orange-500",
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className="flex items-center gap-6 p-8 rounded-2xl border border-white/10 bg-white/5"
            >
              {/* Step number */}
              <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center shrink-0`}>
                <span className="text-white font-black text-xl">{item.step}</span>
              </div>

              {/* Content */}
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-white/70">{item.icon}</span>
                  <h3 className="text-2xl font-bold text-white/90">{item.title}</h3>
                </div>
                <p className="text-white/50">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Warning */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-xl border border-yellow-500/30 bg-yellow-500/10">
            <AlertCircle className="w-5 h-5 text-yellow-400" />
            <span className="text-yellow-400 font-semibold">
              Average completion time: 8-12 minutes. No pausing allowed.
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
