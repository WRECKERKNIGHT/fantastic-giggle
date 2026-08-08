"use client";

import { motion } from "framer-motion";
import { AlertTriangle, Eye, Clock, Shield, Zap } from "lucide-react";

export function DontLieSection() {
  return (
    <section className="relative overflow-hidden py-32 px-4 paper-grain">
      {/* Inverted ink section */}
      <div className="absolute inset-0 bg-[var(--ink)]" />
      <div className="halftone absolute inset-0 opacity-[0.06] [background-image:radial-gradient(#f4f1ee_1px,transparent_1.5px)]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,var(--ink),#2a251d,var(--ink))]" />

      <div className="relative z-10 mx-auto max-w-4xl text-center">
        {/* Warning stamp */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full border-[3px] border-[var(--paper)]">
            <AlertTriangle className="h-12 w-12 text-[var(--paper)]" />
          </div>
        </motion.div>

        {/* Main warning */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-6 font-[var(--font-display)] text-5xl font-black uppercase text-[var(--paper)] sm:text-7xl"
        >
          <span className="sketch-underline" style={{ backgroundImage: "linear-gradient(to right, #f4f1ee 60%, transparent 40%)" }}>
            Don&apos;t lie.
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mx-auto mb-12 max-w-2xl font-[var(--font-display)] text-2xl italic text-[var(--paper-deep)]"
        >
          The system <span className="font-bold not-italic text-[var(--paper)]">knows</span> when you&apos;re faking
          it. Every. Single. Time.
        </motion.p>

        {/* Detection methods */}
        <div className="mb-16 grid grid-cols-1 gap-6 md:grid-cols-2">
          {[
            {
              icon: <Clock className="h-6 w-6" />,
              title: "RESPONSE TIME TRACKING",
              description:
                "Took 4 seconds to pick the 'confident' answer? Flagged. Authentic aura is instant.",
            },
            {
              icon: <Eye className="h-6 w-6" />,
              title: "CONSISTENCY CROSS-REFERENCE",
              description:
                "Said you're fearless in Q7 but froze in Q42? The engine catches the contradiction.",
            },
            {
              icon: <Shield className="h-6 w-6" />,
              title: "HONEYPOT TRAP DETECTION",
              description:
                "Every 'cool' option is bait. The system tracks if you fell for the ego trap.",
            },
            {
              icon: <Zap className="h-6 w-6" />,
              title: "INSTINCT VELOCITY ANALYSIS",
              description:
                "Real confidence is measured in milliseconds. Overthinking = desperation.",
            },
          ].map((method, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`border-2 border-[var(--paper)]/70 p-6 text-left ${index % 2 === 0 ? "tilt-l" : "tilt-r"}`}
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center border-2 border-[var(--paper)]/70 text-[var(--paper)]">
                {method.icon}
              </div>
              <h4 className="mb-2 font-[var(--font-mono)] text-sm font-bold tracking-wide text-[var(--paper)]">
                {method.title}
              </h4>
              <p className="text-sm leading-relaxed text-[var(--paper-deep)]">
                {method.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Bottom warning */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-3 border-2 border-[var(--paper)]/70 px-6 py-3"
        >
          <AlertTriangle className="h-5 w-5 text-[var(--paper)]" />
          <span className="font-[var(--font-mono)] text-sm font-bold text-[var(--paper)]">
            LYING WILL ONLY LOWER YOUR SCORE. BE HONEST. BE YOURSELF. LET THE AURA FLOW.
          </span>
        </motion.div>
      </div>
    </section>
  );
}
