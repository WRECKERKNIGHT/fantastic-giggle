"use client";

import { useId } from "react";
import { motion } from "framer-motion";

// ===== KAEL THE STOIC =====
export function KaelAvatar({ size = 256 }: { size?: number }) {
  const id = useId().replace(/:/g, "-");
  return (
    <motion.svg
      viewBox="0 0 200 200"
      role="img" aria-label="Kael the Stoic avatar"
      width={size}
      height={size}
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 200, damping: 15 }}
    >
      <defs>
        <radialGradient id={`${id}-bg`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#64748b" />
          <stop offset="100%" stopColor="#1e293b" />
        </radialGradient>
        <filter id="kael-glow">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>
      {/* Background circle */}
      <circle cx="100" cy="100" r="95" fill={`url(#${id}-bg)`} stroke="#94a3b8" strokeWidth="2" />
      {/* Face base */}
      <ellipse cx="100" cy="105" rx="55" ry="60" fill="#cbd5e1" />
      {/* Brow ridge - thick, serious */}
      <path d="M55 75 Q75 65 100 68 Q125 65 145 75" stroke="#475569" strokeWidth="4" fill="none" strokeLinecap="round" />
      {/* Eyes - narrow, intense */}
      <ellipse cx="75" cy="90" rx="12" ry="6" fill="white" />
      <ellipse cx="125" cy="90" rx="12" ry="6" fill="white" />
      <circle cx="75" cy="90" r="4" fill="#1e293b" />
      <circle cx="125" cy="90" r="4" fill="#1e293b" />
      {/* Eye glint */}
      <circle cx="77" cy="88" r="1.5" fill="white" />
      <circle cx="127" cy="88" r="1.5" fill="white" />
      {/* Nose */}
      <path d="M95 95 L100 110 L105 95" stroke="#94a3b8" strokeWidth="1.5" fill="none" />
      {/* Mouth - straight line */}
      <line x1="80" y1="125" x2="120" y2="125" stroke="#64748b" strokeWidth="3" strokeLinecap="round" />
      {/* Jaw line */}
      <path d="M45 100 Q50 150 100 160 Q150 150 155 100" stroke="#94a3b8" strokeWidth="2" fill="none" />
      {/* Scar */}
      <line x1="130" y1="75" x2="140" y2="100" stroke="#94a3b8" strokeWidth="1.5" opacity="0.6" />
    </motion.svg>
  );
}

// ===== ZARA THE CHAOS GREMLIN =====
export function ZaraAvatar({ size = 256 }: { size?: number }) {
  const id = useId().replace(/:/g, "-");
  return (
    <motion.svg
      viewBox="0 0 200 200"
      role="img" aria-label="Zara the Chaos Gremlin avatar"
      width={size}
      height={size}
      initial={{ scale: 0.8, opacity: 0, rotate: -5 }}
      animate={{ scale: 1, opacity: 1, rotate: 0 }}
      transition={{ type: "spring", stiffness: 200, damping: 15 }}
    >
      <defs>
        <radialGradient id={`${id}-bg`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ec4899" />
          <stop offset="100%" stopColor="#831843" />
        </radialGradient>
      </defs>
      <circle cx="100" cy="100" r="95" fill={`url(#${id}-bg)`} stroke="#f472b6" strokeWidth="2" />
      {/* Hair - wild, spiky */}
      <path d="M40 70 Q30 40 60 50 Q50 20 80 40 Q90 10 110 35 Q130 5 140 40 Q170 20 160 60 Q180 50 165 80" fill="#1a1a2e" />
      {/* Face */}
      <ellipse cx="100" cy="108" rx="50" ry="55" fill="#fecdd3" />
      {/* Eyes - wide, mischievous */}
      <ellipse cx="78" cy="95" rx="14" ry="12" fill="white" />
      <ellipse cx="122" cy="95" rx="14" ry="12" fill="white" />
      <circle cx="80" cy="93" r="6" fill="#ec4899" />
      <circle cx="124" cy="93" r="6" fill="#ec4899" />
      <circle cx="80" cy="93" r="3" fill="#1a1a2e" />
      <circle cx="124" cy="93" r="3" fill="#1a1a2e" />
      {/* Sparkle in eyes */}
      <circle cx="83" cy="90" r="2" fill="white" />
      <circle cx="127" cy="90" r="2" fill="white" />
      {/* Raised eyebrow */}
      <path d="M60 78 Q78 68 95 75" stroke="#1a1a2e" strokeWidth="3" fill="none" strokeLinecap="round" />
      <path d="M105 75 Q122 68 140 78" stroke="#1a1a2e" strokeWidth="3" fill="none" strokeLinecap="round" />
      {/* Nose - small, cute */}
      <circle cx="100" cy="108" r="4" fill="#fda4af" />
      {/* Mouth - big grin */}
      <path d="M70 125 Q85 145 100 140 Q115 145 130 125" stroke="#1a1a2e" strokeWidth="2.5" fill="#ec4899" />
      {/* Teeth showing */}
      <path d="M80 130 L85 135 L90 130 L95 135 L100 130 L105 135 L110 130 L115 135 L120 130" stroke="white" strokeWidth="1.5" fill="none" />
      {/* Blush */}
      <circle cx="60" cy="115" r="10" fill="#f472b6" opacity="0.4" />
      <circle cx="140" cy="115" r="10" fill="#f472b6" opacity="0.4" />
      {/* Star sticker */}
      <polygon points="155,60 158,70 168,70 160,76 163,86 155,80 147,86 150,76 142,70 152,70" fill="#fbbf24" aria-hidden="true" />
    </motion.svg>
  );
}

// ===== DANTE THE SMOOTH OPERATOR =====
export function DanteAvatar({ size = 256 }: { size?: number }) {
  const id = useId().replace(/:/g, "-");
  return (
    <motion.svg
      viewBox="0 0 200 200"
      role="img" aria-label="Dante the Smooth Operator avatar"
      width={size}
      height={size}
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 200, damping: 15 }}
    >
      <defs>
        <radialGradient id={`${id}-bg`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#3b0764" />
        </radialGradient>
      </defs>
      <circle cx="100" cy="100" r="95" fill={`url(#${id}-bg)`} stroke="#a78bfa" strokeWidth="2" />
      {/* Hair - slicked back */}
      <path d="M45 80 Q50 40 100 35 Q150 40 155 80 Q150 55 100 50 Q50 55 45 80" fill="#1a1a2e" />
      {/* Face */}
      <ellipse cx="100" cy="108" rx="50" ry="55" fill="#e2d1f9" />
      {/* Sunglasses */}
      <rect x="55" y="80" width="35" height="25" rx="8" fill="#1a1a2e" stroke="#a78bfa" strokeWidth="1.5" />
      <rect x="110" y="80" width="35" height="25" rx="8" fill="#1a1a2e" stroke="#a78bfa" strokeWidth="1.5" />
      <line x1="90" y1="92" x2="110" y2="92" stroke="#a78bfa" strokeWidth="2" />
      {/* Lens reflection */}
      <path d="M62 85 L72 85" stroke="white" strokeWidth="1.5" opacity="0.5" strokeLinecap="round" />
      <path d="M117 85 L127 85" stroke="white" strokeWidth="1.5" opacity="0.5" strokeLinecap="round" />
      {/* Nose */}
      <path d="M95 100 L100 115 L105 100" stroke="#c4b5fd" strokeWidth="1.5" fill="none" />
      {/* Mouth - smirk */}
      <path d="M80 128 Q95 138 115 130" stroke="#6d28d9" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      {/* Chin dimple */}
      <circle cx="100" cy="148" r="2" fill="#c4b5fd" opacity="0.5" />
      {/* Collar hint */}
      <path d="M55 155 L75 145 L100 150 L125 145 L145 155" stroke="#a78bfa" strokeWidth="2" fill="none" />
    </motion.svg>
  );
}

// ===== LUNA THE SWEET DISASTER =====
export function LunaAvatar({ size = 256 }: { size?: number }) {
  const id = useId().replace(/:/g, "-");
  return (
    <motion.svg
      viewBox="0 0 200 200"
      role="img" aria-label="Luna the Sweet Disaster avatar"
      width={size}
      height={size}
      initial={{ scale: 0.8, opacity: 0, y: 10 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 200, damping: 15 }}
    >
      <defs>
        <radialGradient id={`${id}-bg`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#f472b6" />
          <stop offset="100%" stopColor="#831843" />
        </radialGradient>
      </defs>
      <circle cx="100" cy="100" r="95" fill={`url(#${id}-bg)`} stroke="#f9a8d4" strokeWidth="2" />
      {/* Hair - long, flowing */}
      <path d="M35 90 Q30 50 70 45 Q90 30 110 45 Q140 35 160 60 Q175 55 170 100 Q175 140 155 160 Q140 150 130 130 Q120 140 100 135 Q80 145 65 130 Q50 145 40 160 Q25 140 30 100 Z" fill="#fef3c7" />
      {/* Hair highlights */}
      <path d="M60 60 Q80 55 90 70" stroke="#fcd34d" strokeWidth="2" fill="none" opacity="0.5" />
      {/* Face */}
      <ellipse cx="100" cy="108" rx="48" ry="52" fill="#fef9ef" />
      {/* Eyes - big, sparkly */}
      <ellipse cx="80" cy="95" rx="13" ry="14" fill="white" />
      <ellipse cx="120" cy="95" rx="13" ry="14" fill="white" />
      <circle cx="82" cy="93" r="7" fill="#ec4899" />
      <circle cx="122" cy="93" r="7" fill="#ec4899" />
      <circle cx="82" cy="93" r="4" fill="#1a1a2e" />
      <circle cx="122" cy="93" r="4" fill="#1a1a2e" />
      {/* Big sparkles in eyes */}
      <circle cx="85" cy="89" r="3" fill="white" />
      <circle cx="125" cy="89" r="3" fill="white" />
      <circle cx="79" cy="96" r="1.5" fill="white" />
      <circle cx="119" cy="96" r="1.5" fill="white" />
      {/* Eyebrows - soft */}
      <path d="M65 78 Q80 72 95 78" stroke="#d97706" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M105 78 Q120 72 135 78" stroke="#d97706" strokeWidth="2" fill="none" strokeLinecap="round" />
      {/* Nose - tiny */}
      <ellipse cx="100" cy="108" rx="3" ry="4" fill="#fda4af" />
      {/* Mouth - O shape (surprised) */}
      <ellipse cx="100" cy="128" rx="10" ry="8" fill="#fda4af" stroke="#ec4899" strokeWidth="1.5" />
      {/* Blush - heavy */}
      <circle cx="60" cy="110" r="12" fill="#f9a8d4" opacity="0.5" />
      <circle cx="140" cy="110" r="12" fill="#f9a8d4" opacity="0.5" />
      {/* Flower in hair */}
      <g transform="translate(145, 55) rotate(15)">
        <circle cx="0" cy="0" r="4" fill="#f472b6" />
        <circle cx="6" cy="-3" r="3" fill="#f9a8d4" />
        <circle cx="5" cy="5" r="3" fill="#f9a8d4" />
        <circle cx="-4" cy="4" r="3" fill="#f9a8d4" />
        <circle cx="-5" cy="-3" r="3" fill="#f9a8d4" />
      </g>
    </motion.svg>
  );
}

// ===== REI THE GHOST =====
export function ReiAvatar({ size = 256 }: { size?: number }) {
  const id = useId().replace(/:/g, "-");
  return (
    <motion.svg
      viewBox="0 0 200 200"
      role="img" aria-label="Rei the Ghost avatar"
      width={size}
      height={size}
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 0.9 }}
      transition={{ type: "spring", stiffness: 200, damping: 15 }}
    >
      <defs>
        <radialGradient id={`${id}-bg`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#22d3ee" />
          <stop offset="100%" stopColor="#164e63" />
        </radialGradient>
        <filter id={`${id}-glow`}>
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>
      <circle cx="100" cy="100" r="95" fill={`url(#${id}-bg)`} stroke="#67e8f9" strokeWidth="2" opacity="0.8" />
      {/* Ethereal wisps */}
      <path d="M30 120 Q50 100 40 80 Q60 90 50 70" stroke="#67e8f9" aria-hidden="true" strokeWidth="1.5" fill="none" opacity="0.4" />
      <path d="M170 120 Q150 100 160 80 Q140 90 150 70" stroke="#67e8f9" aria-hidden="true" strokeWidth="1.5" fill="none" opacity="0.4" />
      {/* Face - slightly transparent */}
      <ellipse cx="100" cy="108" rx="48" ry="52" fill="#cffafe" opacity="0.85" />
      {/* Hair - messy, covering one eye */}
      <path d="M40 85 Q45 50 80 45 Q100 35 120 50 Q145 40 155 70 Q160 60 158 85 Q155 75 140 80 Q150 90 145 100 L120 95 Q130 85 125 75 Q110 65 90 70 Q70 60 55 75 Z" fill="#0e7490" />
      {/* Visible eye - half-lidded */}
      <ellipse cx="125" cy="92" rx="10" ry="7" fill="white" opacity="0.9" />
      <circle cx="126" cy="91" r="4" fill="#06b6d4" />
      <circle cx="126" cy="91" r="2" fill="#1a1a2e" />
      <circle cx="128" cy="89" r="1" fill="white" />
      {/* Half-closed lid */}
      <path d="M115 88 Q125 85 135 88" stroke="#0e7490" strokeWidth="2" fill="#cffafe" opacity="0.7" />
      {/* Other eye - barely visible through hair */}
      <line x1="75" y1="90" x2="85" y2="90" stroke="#67e8f9" strokeWidth="1.5" opacity="0.4" />
      {/* Nose */}
      <path d="M97 100 L100 112 L103 100" stroke="#a5f3fc" strokeWidth="1" fill="none" opacity="0.6" />
      {/* Mouth - tiny, neutral */}
      <line x1="90" y1="125" x2="110" y2="125" stroke="#0891b2" strokeWidth="2" strokeLinecap="round" opacity="0.7" />
      {/* Floating sparkles */}
      <circle cx="45" cy="55" r="2" fill="#67e8f9" opacity="0.6" aria-hidden="true" />
      <circle cx="160" cy="45" r="1.5" fill="#67e8f9" opacity="0.5" aria-hidden="true" />
      <circle cx="35" cy="140" r="1" fill="#67e8f9" opacity="0.4" aria-hidden="true" />
      <circle cx="165" cy="150" r="1.5" fill="#67e8f9" opacity="0.5" aria-hidden="true" />
    </motion.svg>
  );
}

// ===== BRUTUS THE BLACK HOLE =====
export function BrutusAvatar({ size = 256 }: { size?: number }) {
  const id = useId().replace(/:/g, "-");
  return (
    <motion.svg
      viewBox="0 0 200 200"
      role="img" aria-label="Brutus the Black Hole avatar"
      width={size}
      height={size}
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 200, damping: 15 }}
    >
      <defs>
        <radialGradient id={`${id}-bg`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#f97316" />
          <stop offset="100%" stopColor="#7c2d12" />
        </radialGradient>
      </defs>
      <circle cx="100" cy="100" r="95" fill={`url(#${id}-bg)`} stroke="#fb923c" strokeWidth="2" />
      {/* Face - square, powerful */}
      <rect x="45" y="60" width="110" height="100" rx="20" fill="#fed7aa" />
      {/* Hair - short, military */}
      <path d="M50 70 Q55 45 100 40 Q145 45 150 70 Q145 55 100 50 Q55 55 50 70" fill="#78350f" />
      {/* Brow ridge - heavy */}
      <path d="M50 80 Q75 70 100 75 Q125 70 150 80" stroke="#78350f" strokeWidth="5" fill="none" strokeLinecap="round" />
      {/* Eyes - intense, wide */}
      <ellipse cx="75" cy="95" rx="14" ry="12" fill="white" />
      <ellipse cx="125" cy="95" rx="14" ry="12" fill="white" />
      <circle cx="77" cy="94" r="6" fill="#dc2626" />
      <circle cx="127" cy="94" r="6" fill="#dc2626" />
      <circle cx="77" cy="94" r="3" fill="#1a1a2e" />
      <circle cx="127" cy="94" r="3" fill="#1a1a2e" />
      {/* Angry eye glint */}
      <circle cx="80" cy="91" r="2" fill="white" />
      <circle cx="130" cy="91" r="2" fill="white" />
      {/* Nose - broad */}
      <path d="M88 98 L100 118 L112 98" stroke="#fdba74" strokeWidth="2" fill="none" />
      {/* Mouth - wide open (intimidating) */}
      <ellipse cx="100" cy="138" rx="20" ry="12" fill="#991b1b" stroke="#78350f" strokeWidth="2" />
      {/* Teeth */}
      <rect x="82" y="130" width="6" height="8" fill="white" rx="1" />
      <rect x="90" y="128" width="6" height="10" fill="white" rx="1" />
      <rect x="98" y="130" width="6" height="8" fill="white" rx="1" />
      <rect x="106" y="128" width="6" height="10" fill="white" rx="1" />
      <rect x="114" y="130" width="6" height="8" fill="white" rx="1" />
      {/* Chin */}
      <path d="M70 155 Q100 170 130 155" stroke="#fdba74" strokeWidth="2" fill="none" />
      {/* Energy lines */}
      <line x1="20" y1="100" x2="40" y2="100" stroke="#f97316" aria-hidden="true" strokeWidth="1.5" opacity="0.5" />
      <line x1="160" y1="100" x2="180" y2="100" stroke="#f97316" aria-hidden="true" strokeWidth="1.5" opacity="0.5" />
      <line x1="100" y1="15" x2="100" y2="35" stroke="#f97316" aria-hidden="true" strokeWidth="1.5" opacity="0.5" />
    </motion.svg>
  );
}

// ===== CHARACTER AVATAR MAP =====
export const CHARACTER_AVATARS: Record<string, React.FC<{ size?: number }>> = {
  the_stoic: KaelAvatar,
  the_chaos_gremlin: ZaraAvatar,
  the_smooth_operator: DanteAvatar,
  the_sweet_disaster: LunaAvatar,
  the_ghost: ReiAvatar,
  the_black_hole: BrutusAvatar,
};
