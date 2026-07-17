"use client";

import { motion } from "framer-motion";
import { AlertTriangle, Eye, Clock, Shield, Zap } from "lucide-react";

export function DontLieSection() {
  return (
    <section className="relative py-32 px-4 overflow-hidden">
      {/* Red warning background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-[#1a0000] to-black" />
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0djItSDI0di0yaDEyem0wLTRWMjhIMjR2Mmgxem0tNC0ydi0yaC0ydjJoMnptMi00VjI0aC0ydjJoMnptNC00VjIwaC0ydjJoNHoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-50" />

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        {/* Warning icon */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <div className="w-24 h-24 rounded-full bg-red-500/20 border-2 border-red-500/50 flex items-center justify-center mx-auto">
            <AlertTriangle className="w-12 h-12 text-red-500" />
          </div>
        </motion.div>

        {/* Main warning */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-5xl md:text-7xl font-black mb-6"
        >
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">
            DON&apos;T LIE.
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-2xl text-white/60 mb-12 max-w-2xl mx-auto"
        >
          The system <span className="text-red-400 font-bold">knows</span> when you&apos;re faking it. Every. Single. Time.
        </motion.p>

        {/* Detection methods */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {[
            {
              icon: <Clock className="w-6 h-6" />,
              title: "Response Time Tracking",
              description: "Took 4 seconds to pick the 'confident' answer? Flagged. Authentic aura is instant.",
              color: "text-yellow-400",
              bg: "bg-yellow-500/10",
              border: "border-yellow-500/30",
            },
            {
              icon: <Eye className="w-6 h-6" />,
              title: "Consistency Cross-Reference",
              description: "Said you're fearless in Q7 but froze in Q42? The engine catches the contradiction.",
              color: "text-purple-400",
              bg: "bg-purple-500/10",
              border: "border-purple-500/30",
            },
            {
              icon: <Shield className="w-6 h-6" />,
              title: "Honeypot Trap Detection",
              description: "Every 'cool' option is bait. The system tracks if you fell for the ego trap.",
              color: "text-orange-400",
              bg: "bg-orange-500/10",
              border: "border-orange-500/30",
            },
            {
              icon: <Zap className="w-6 h-6" />,
              title: "Instinct Velocity Analysis",
              description: "Real confidence is measured in milliseconds. Overthinking = desperation.",
              color: "text-cyan-400",
              bg: "bg-cyan-500/10",
              border: "border-cyan-500/30",
            },
          ].map((method, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`p-6 rounded-2xl border ${method.border} ${method.bg} text-left`}
            >
              <div className={`w-12 h-12 rounded-xl ${method.bg} flex items-center justify-center mb-4 ${method.color}`}>
                {method.icon}
              </div>
              <h4 className="text-lg font-bold text-white/90 mb-2">{method.title}</h4>
              <p className="text-sm text-white/50">{method.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Bottom warning */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-3 px-6 py-3 rounded-xl border border-red-500/30 bg-red-500/10"
        >
          <AlertTriangle className="w-5 h-5 text-red-400" />
          <span className="text-red-400 font-bold">
            Lying will only lower your score. Be honest. Be yourself. Let the aura flow.
          </span>
        </motion.div>
      </div>
    </section>
  );
}
