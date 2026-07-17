"use client";

import { motion } from "framer-motion";
import { Clock, MessageSquare, AlertTriangle, Users, Zap, Shield, Eye, Target } from "lucide-react";

const PHASES = [
  {
    phase: "PHASE 1",
    title: "Spatial Deviation",
    questions: "Q1 - Q10",
    icon: <Eye className="w-6 h-6" />,
    color: "from-blue-500 to-cyan-500",
    borderColor: "border-blue-500/30",
    description: "Tracks your physical coordination, spatial awareness, and involuntary actions. How do you move through the world?",
    mechanic: "Default Dark Mode",
  },
  {
    phase: "PHASE 2",
    title: "Verbal Banter",
    questions: "Q11 - Q20",
    icon: <MessageSquare className="w-6 h-6" />,
    color: "from-green-500 to-emerald-500",
    borderColor: "border-green-500/30",
    description: "Tests your wit, social boundaries, and panic speech patterns. Can you hold your own under verbal fire?",
    mechanic: "Chat Box UI",
  },
  {
    phase: "PHASE 3",
    title: "Ego Trap",
    questions: "Q21 - Q30",
    icon: <AlertTriangle className="w-6 h-6" />,
    color: "from-red-500 to-orange-500",
    borderColor: "border-red-500/30",
    description: "The system hunts for try-hard behavior. Every &quot;cool&quot; option is a trap. Only vulnerability scores high.",
    mechanic: "Glitch Crimson UI",
  },
  {
    phase: "PHASE 4",
    title: "Audience Pressure",
    questions: "Q31 - Q40",
    icon: <Users className="w-6 h-6" />,
    color: "from-purple-500 to-pink-500",
    borderColor: "border-purple-500/30",
    description: "A live spectator counter watches your every move. How do you perform when everyone's looking?",
    mechanic: "Spectator Ticker",
  },
  {
    phase: "PHASE 5",
    title: "Neural Speed Run",
    questions: "Q41 - Q50",
    icon: <Zap className="w-6 h-6" />,
    color: "from-yellow-500 to-red-500",
    borderColor: "border-yellow-500/30",
    description: "2-second timers. Shuffling options. No time to think. Pure instinct only. Your filter is stripped away.",
    mechanic: "2s Timer / Kinetic Inputs",
  },
];

const MARKING_POINTS = [
  {
    icon: <Clock className="w-5 h-5" />,
    title: "Instinct Velocity",
    description: "Every millisecond is tracked. Fast, confident answers score higher. Slow hesitation gets penalized.",
  },
  {
    icon: <Shield className="w-5 h-5" />,
    title: "Consistency Check",
    description: "Your answers are cross-referenced. Contradict yourself and the engine catches the lie.",
  },
  {
    icon: <Target className="w-5 h-5" />,
    title: "Honeypot Detection",
    description: "Cool-sounding answers are traps. The system flags performative behavior and ego-driven choices.",
  },
];

export function HowItWorksSection() {
  return (
    <section className="relative py-32 px-4 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-[#050510] to-black" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <span className="inline-block px-4 py-1 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 text-sm font-bold mb-6">
            THE MARKING SCHEME
          </span>
          <h2 className="text-5xl md:text-7xl font-black mb-6">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
              HOW THE SYSTEM WORKS
            </span>
          </h2>
          <p className="text-xl text-white/50 max-w-2xl mx-auto">
            We won&apos;t reveal the exact engine. But here&apos;s enough to know you can&apos;t cheat.
          </p>
        </motion.div>

        {/* 5 Phases */}
        <div className="mb-20">
          <h3 className="text-2xl font-bold text-white/80 mb-8 text-center">The 5 Pressure Phases</h3>
          <div className="space-y-4">
            {PHASES.map((phase, index) => (
              <motion.div
                key={phase.phase}
                initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`flex items-center gap-6 p-6 rounded-2xl border ${phase.borderColor} bg-white/5 backdrop-blur-sm`}
              >
                {/* Phase number */}
                <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${phase.color} flex items-center justify-center shrink-0`}>
                  <span className="text-white font-black text-lg">{phase.phase.replace("PHASE ", "")}</span>
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-white/90">{phase.icon}</span>
                    <h4 className="text-xl font-bold text-white/90">{phase.title}</h4>
                    <span className="text-sm text-white/40 font-mono">{phase.questions}</span>
                  </div>
                  <p className="text-white/50 text-sm">{phase.description}</p>
                </div>

                {/* Mechanic badge */}
                <div className="hidden md:flex px-3 py-1 rounded-lg bg-white/5 text-xs text-white/40 font-mono shrink-0">
                  {phase.mechanic}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Marking Scheme */}
        <div>
          <h3 className="text-2xl font-bold text-white/80 mb-8 text-center">What We Track</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {MARKING_POINTS.map((point, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className="p-6 rounded-2xl border border-white/10 bg-white/5 text-center"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center mx-auto mb-4 text-cyan-400">
                  {point.icon}
                </div>
                <h4 className="text-lg font-bold text-white/90 mb-2">{point.title}</h4>
                <p className="text-sm text-white/50">{point.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
