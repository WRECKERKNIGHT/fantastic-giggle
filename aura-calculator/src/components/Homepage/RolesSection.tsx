"use client";

import { motion } from "framer-motion";
import { AnimeCharacter } from "@/components/Anime/AnimeCharacters";

const ROLES = [
  {
    tier: "ULTIMATE BEAST",
    tierId: "ultimate_beast" as const,
    symbol: "♠",
    score: "≥ 18,000",
    description:
      "Absolute gravity-bending presence. You operate on pure instinct. The world bends around your choices.",
    stats: ["α ≥ 92%", "δ ≤ 4%", "RESPONSE ≤ 1.2s"],
  },
  {
    tier: "GIGA CHAD",
    tierId: "giga_chad" as const,
    symbol: "♛",
    score: "10,000 - 17,999",
    description:
      "High presence, massive physical confidence. You handle fumbles like an action star.",
    stats: ["α + β ≥ 80%", "δ ≤ 10%", "NEAR-PERFECT COMPOSURE"],
  },
  {
    tier: "AURA FARMER",
    tierId: "aura_farmer" as const,
    symbol: "♧",
    score: "0 - 9,999",
    description:
      "The try-hard black hole. You select the coolest options but take too long. The algorithm spots the desperation.",
    stats: ["HIGH α vs HIGH δ", "SLOW RESPONSE", "CONSISTENCY FAILURES"],
  },
  {
    tier: "CLOWN",
    tierId: "clown" as const,
    symbol: "♧",
    score: "-1 to -4,000",
    description:
      "Public chaos incarnate. You drop items, apologize to objects, and laugh off internal screaming.",
    stats: ["HIGH φ COEFFICIENT", "PANIC PATTERNS", "ERRATIC ADAPTATION"],
  },
  {
    tier: "NOOB",
    tierId: "noob" as const,
    symbol: "♤",
    score: "≤ -4,001",
    description:
      "Absolute aura insolvency. You run with rolling backpacks and apologize to wrong-order waiters.",
    stats: ["(δ+φ)² > (α+β+γ)", "SYSTEM FAILURE", "COOLDOWN ACTIVE"],
  },
];

export function RolesSection() {
  return (
    <section className="relative overflow-hidden py-32 px-4 paper-grain">
      {/* Cross-hatch backdrop */}
      <div className="crosshatch-soft absolute inset-0" />
      <div className="ink-divider absolute top-0 left-8 right-8" />

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20 text-center"
        >
          <span className="stamp mb-6">THE 5 TIERS</span>
          <h2 className="mt-6 font-[var(--font-display)] text-5xl font-black uppercase sm:text-6xl">
            <span className="sketch-underline">Where do you stand?</span>
          </h2>
          <p className="mx-auto mt-6 max-w-2xl font-[var(--font-mono)] text-sm text-[var(--ink-muted)]">
            YOUR AURA SCORE DETERMINES YOUR TIER. THERE ARE NO PARTICIPATION TROPHIES HERE.
          </p>
        </motion.div>

        {/* Tier cards */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
          {ROLES.map((role, index) => (
            <motion.div
              key={role.tier}
              initial={{ opacity: 0, y: 40, rotate: index % 2 === 0 ? -1 : 1 }}
              whileInView={{ opacity: 1, y: 0, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, type: "spring", stiffness: 120 }}
              whileHover={{ y: -8, rotate: 0 }}
              className={`sketch-card relative p-6 ${index === 0 ? "tilt-l" : ""}`}
            >
              {/* Character bust */}
              <div className="mb-2 flex justify-center">
                <AnimeCharacter tier={role.tierId} size={150} />
              </div>

              {/* Tier name */}
              <div className="mb-4 flex items-center justify-center gap-3">
                <span className="font-[var(--font-mono)] text-2xl font-bold text-[var(--ink)]">
                  {role.symbol}
                </span>
                <div className="text-center">
                  <h3 className="font-[var(--font-display)] text-2xl font-black uppercase tracking-tight text-[var(--ink)]">
                    {role.tier}
                  </h3>
                  <span className="font-[var(--font-mono)] text-xs text-[var(--ink-muted)]">
                    {role.score}
                  </span>
                </div>
                <span className="font-[var(--font-mono)] text-2xl font-bold text-[var(--ink)]">
                  {role.symbol}
                </span>
              </div>

              <div className="ink-divider mb-4 opacity-60" />

              {/* Description */}
              <p className="mb-5 text-center text-sm leading-relaxed text-[var(--ink-soft)]">
                {role.description}
              </p>

              {/* Stats */}
              <div className="flex flex-wrap justify-center gap-2">
                {role.stats.map((stat, i) => (
                  <span
                    key={i}
                    className="border-2 border-[var(--ink-line)] bg-[var(--paper-deep)] px-2.5 py-1 font-[var(--font-mono)] text-[10px] font-semibold tracking-wide text-[var(--ink-soft)]"
                  >
                    {stat}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}

          {/* Spacer card for balanced grid */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="hidden items-center justify-center border-2 border-dashed border-[var(--ink-line-faint)] p-6 lg:flex"
          >
            <p className="text-center font-[var(--font-mono)] text-sm text-[var(--ink-faint)]">
              YOUR TIER WILL BE
              <br />
              <span className="font-bold">PERMANENTLY RECORDED</span>
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
