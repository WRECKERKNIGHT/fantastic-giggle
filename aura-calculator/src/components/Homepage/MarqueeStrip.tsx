"use client";

import { motion, useMotionValueEvent, useScroll, useSpring } from "framer-motion";
import { Marquee } from "@/components/Marquee";

const TOP_ITEMS = [
  "AURA DETECTED",
  "LIE DETECTION ACTIVE",
  "INSTINCT VELOCITY NOMINAL",
  "5 PRESSURE PHASES ARMED",
  "NO COLOUR",
  "PURE MEASUREMENT",
];

const BOTTOM_ITEMS = [
  "5 TIERS",
  "50 QUESTIONS",
  "0 MERCY",
  "8-12 MIN",
  "HONESTY REQUIRED",
  "THE MACHINE IS WATCHING",
];

export function MarqueeStrip({
  variant = "top",
}: {
  variant?: "top" | "bottom";
}) {
  const { scrollY } = useScroll();
  const skewX = useSpring(0, { stiffness: 140, damping: 22, mass: 0.4 });

  useMotionValueEvent(scrollY, "change", () => {
    const velocity = scrollY.getVelocity();
    skewX.set(Math.max(-14, Math.min(14, velocity * 0.018)));
  });

  const inverted = variant === "bottom";
  const items = variant === "top" ? TOP_ITEMS : BOTTOM_ITEMS;

  return (
    <div
      className={`relative overflow-hidden py-4 ${
        inverted
          ? "bg-[var(--ink)]"
          : "border-y-2 border-[var(--ink)] bg-[var(--paper)]"
      }`}
    >
      {/* Soft edge masks */}
      <div
        className={`pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r ${
          inverted
            ? "from-[var(--ink)] to-transparent"
            : "from-[var(--paper)] to-transparent"
        }`}
      />
      <div
        className={`pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l ${
          inverted
            ? "from-[var(--ink)] to-transparent"
            : "from-[var(--paper)] to-transparent"
        }`}
      />

      <motion.div style={{ skewX }} className="will-change-transform">
        <Marquee
          items={items}
          reverse={variant === "bottom"}
          inverted={inverted}
        />
      </motion.div>
    </div>
  );
}
