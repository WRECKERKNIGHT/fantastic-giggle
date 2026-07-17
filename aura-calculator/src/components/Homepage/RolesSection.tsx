"use client";

import { motion } from "framer-motion";
import { AnimeCharacter } from "@/components/Anime/AnimeCharacters";

const ROLES = [
  {
    tier: "ULTIMATE BEAST" as const,
    tierId: "ultimate_beast" as const,
    emoji: "🌌",
    score: "≥ 18,000",
    color: "from-cyan-400 via-white to-cyan-400",
    borderColor: "border-cyan-400/40",
    glowColor: "shadow-cyan-500/40",
    flameColor: "#00ffff",
    description: "Absolute gravity-bending presence. You operate on pure instinct. The world bends around your choices.",
    stats: ["α ≥ 92%", "δ ≤ 4%", "Response ≤ 1.2s"],
    bgGradient: "from-cyan-900/30 via-blue-900/20 to-cyan-900/30",
  },
  {
    tier: "GIGA CHAD" as const,
    tierId: "giga_chad" as const,
    emoji: "🔱",
    score: "10,000 - 17,999",
    color: "from-purple-400 via-violet-300 to-purple-400",
    borderColor: "border-purple-400/40",
    glowColor: "shadow-purple-500/40",
    flameColor: "#a855f7",
    description: "High presence, massive physical confidence. You handle fumbles like an action star.",
    stats: ["α+β ≥ 80%", "δ ≤ 10%", "Near-perfect composure"],
    bgGradient: "from-purple-900/30 via-violet-900/20 to-purple-900/30",
  },
  {
    tier: "AURA FARMER" as const,
    tierId: "aura_farmer" as const,
    emoji: "🚜",
    score: "0 - 9,999",
    color: "from-amber-400 via-yellow-300 to-amber-400",
    borderColor: "border-amber-400/40",
    glowColor: "shadow-amber-500/40",
    flameColor: "#f59e0b",
    description: "The try-hard black hole. You select the coolest options but take too long. The algorithm spots the desperation.",
    stats: ["High α vs High δ", "Slow response times", "Consistency failures"],
    bgGradient: "from-amber-900/30 via-yellow-900/20 to-amber-900/30",
  },
  {
    tier: "CLOWN" as const,
    tierId: "clown" as const,
    emoji: "🤡",
    score: "-1 to -4,000",
    color: "from-pink-400 via-rose-300 to-pink-400",
    borderColor: "border-pink-400/40",
    glowColor: "shadow-pink-500/40",
    flameColor: "#ec4899",
    description: "Public chaos incarnate. You drop items, apologize to objects, and laugh off internal screaming.",
    stats: ["High φ coefficient", "Verbal panic patterns", "Erratic adaptation"],
    bgGradient: "from-pink-900/30 via-rose-900/20 to-pink-900/30",
  },
  {
    tier: "NOOB" as const,
    tierId: "noob" as const,
    emoji: "💀",
    score: "≤ -4,001",
    color: "from-red-500 via-red-400 to-red-500",
    borderColor: "border-red-500/40",
    glowColor: "shadow-red-500/40",
    flameColor: "#ef4444",
    description: "Absolute aura insolvency. You run with rolling backpacks and apologize to wrong-order waiters.",
    stats: ["(δ+φ)² > (α+β+γ)", "Total system failure", "24hr cooldown active"],
    bgGradient: "from-red-900/30 via-red-950/20 to-red-900/30",
  },
];

export function RolesSection() {
  return (
    <section className="relative py-32 px-4 overflow-hidden">
      {/* Anime-style background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-[#0a0015] to-black" />
      
      {/* Speed lines effect */}
      <div className="absolute inset-0 overflow-hidden opacity-10">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-px bg-gradient-to-r from-transparent via-white to-transparent"
            style={{
              top: `${5 + i * 5}%`,
              left: "-10%",
              right: "-10%",
              transform: `rotate(${-5 + Math.random() * 10}deg)`,
            }}
            animate={{
              opacity: [0, 0.5, 0],
              scaleX: [0.5, 1.5, 0.5],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          />
        ))}
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Anime-style section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <motion.div
            className="inline-block px-6 py-2 rounded-full border-2 border-red-500/50 bg-red-500/10 mb-6"
            animate={{ 
              boxShadow: [
                "0 0 20px rgba(239, 68, 68, 0.3)",
                "0 0 40px rgba(239, 68, 68, 0.6)",
                "0 0 20px rgba(239, 68, 68, 0.3)",
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <span className="text-sm font-bold text-red-400 tracking-wider uppercase">
              ⚔️ THE 5 DANGER TIERS ⚔️
            </span>
          </motion.div>
          
          <motion.h2 
            className="text-5xl md:text-7xl font-black mb-6"
            style={{
              textShadow: "0 0 30px rgba(255, 100, 0, 0.5), 0 0 60px rgba(255, 50, 0, 0.3)",
            }}
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-red-500 to-yellow-500">
              WHERE DO YOU STAND?
            </span>
          </motion.h2>
          
          <p className="text-xl text-white/60 max-w-2xl mx-auto">
            Your aura score determines your tier. <span className="text-red-400 font-bold">There are no participation trophies here.</span>
          </p>
        </motion.div>

        {/* Anime character cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {ROLES.map((role, index) => (
            <motion.div
              key={role.tier}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, type: "spring", stiffness: 100 }}
              whileHover={{ 
                scale: 1.05, 
                y: -10,
                boxShadow: `0 20px 60px ${role.flameColor}40`,
              }}
              className={`relative rounded-3xl border-2 ${role.borderColor} bg-gradient-to-br ${role.bgGradient} p-6 backdrop-blur-sm overflow-hidden group`}
            >
              {/* Animated flame background */}
              <div className="absolute inset-0 opacity-30 group-hover:opacity-60 transition-opacity duration-500">
                <div 
                  className="absolute bottom-0 left-0 right-0 h-32"
                  style={{
                    background: `linear-gradient(to top, ${role.flameColor}40, transparent)`,
                  }}
                />
              </div>
              
              {/* Glow effect */}
              <div className={`absolute inset-0 rounded-3xl ${role.glowColor} blur-2xl opacity-20 group-hover:opacity-40 transition-opacity`} />
              
              <div className="relative z-10">
                {/* Anime character */}
                <div className="flex justify-center mb-4">
                  <AnimeCharacter tier={role.tierId} size={140} />
                </div>

                {/* Tier badge */}
                <div className="flex items-center justify-center gap-3 mb-4">
                  <span className="text-3xl">{role.emoji}</span>
                  <div className="text-center">
                    <h3 className={`text-2xl font-black bg-gradient-to-r ${role.color} bg-clip-text text-transparent`}>
                      {role.tier}
                    </h3>
                    <span className="text-sm text-white/50 font-mono">{role.score}</span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-white/70 text-sm leading-relaxed mb-4 text-center">
                  {role.description}
                </p>

                {/* Stats */}
                <div className="flex flex-wrap justify-center gap-2">
                  {role.stats.map((stat, i) => (
                    <span 
                      key={i} 
                      className="px-3 py-1 rounded-full text-xs font-mono border"
                      style={{
                        borderColor: `${role.flameColor}40`,
                        backgroundColor: `${role.flameColor}10`,
                        color: role.flameColor,
                      }}
                    >
                      {stat}
                    </span>
                  ))}
                </div>
              </div>

              {/* Corner flame accent */}
              <div 
                className="absolute -bottom-4 -right-4 w-24 h-24 rounded-full blur-xl opacity-50"
                style={{ backgroundColor: role.flameColor }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
