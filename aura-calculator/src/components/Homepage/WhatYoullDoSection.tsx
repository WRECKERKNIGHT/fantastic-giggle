"use client";

import { motion } from "framer-motion";
import { Brain, Timer, Target, Flame, AlertCircle } from "lucide-react";

export function WhatYoullDoSection() {
  return (
    <section className="relative overflow-hidden py-32 px-4 paper-grain">
      <div className="crosshatch-soft absolute inset-0" />
      <div className="halftone absolute inset-0 opacity-20" />

      <div className="relative z-10 mx-auto max-w-5xl">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <span className="stamp mb-6">THE CHALLENGE</span>
          <h2 className="mt-6 font-[var(--font-display)] text-5xl font-black uppercase sm:text-6xl">
            <span className="sketch-underline">What you&apos;ll have to do</span>
          </h2>
        </motion.div>

        {/* Steps */}
        <div className="space-y-8">
          {[
            {
              step: "01",
              title: "Face 50 Questions",
              description:
                "Each question is designed to break down your filter. Some are easy. Some are traps. All are watching.",
              icon: <Brain className="h-6 w-6" />,
            },
            {
              step: "02",
              title: "Survive 5 Phases",
              description:
                "The UI morphs as you progress. Pressure increases. Timers get shorter. The stakes get higher.",
              icon: <Flame className="h-6 w-6" />,
            },
            {
              step: "03",
              title: "Beat the Lie Detection",
              description:
                "The system tracks your response times and cross-references your answers. You can't fake aura.",
              icon: <Target className="h-6 w-6" />,
            },
            {
              step: "04",
              title: "Unlock Your Tier",
              description:
                "After 50 questions, your true aura is revealed. Ultimate Beast, Giga Chad, or... something worse.",
              icon: <Timer className="h-6 w-6" />,
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className={`sketch-card-thin flex items-center gap-6 p-8 ${index % 2 === 0 ? "tilt-l" : "tilt-r"}`}
            >
              {/* Step number plate */}
              <div className="flex h-16 w-16 shrink-0 items-center justify-center bg-[var(--ink)]">
                <span className="font-[var(--font-mono)] text-xl font-black text-[var(--paper)]">
                  {item.step}
                </span>
              </div>

              {/* Content */}
              <div className="flex-1">
                <div className="mb-2 flex items-center gap-3">
                  <span className="text-[var(--ink)]">{item.icon}</span>
                  <h3 className="text-xl font-bold text-[var(--ink)] sm:text-2xl">
                    {item.title}
                  </h3>
                </div>
                <p className="text-sm leading-relaxed text-[var(--ink-muted)]">
                  {item.description}
                </p>
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
          <div className="inline-flex items-center gap-3 border-2 border-[var(--ink-line)] bg-[var(--paper-card)] px-6 py-3 shadow-[3px_3px_0_rgba(20,17,12,0.7)]">
            <AlertCircle className="h-5 w-5 text-[var(--ink)]" />
            <span className="font-[var(--font-mono)] text-sm font-semibold text-[var(--ink)]">
              AVERAGE COMPLETION TIME: 8-12 MINUTES. NO PAUSING ALLOWED.
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
