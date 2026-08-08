"use client";

import { useId } from "react";
import { motion } from "framer-motion";

const INK = "#14110c";
const INK_SOFT = "#3d382f";
const INK_MUTED = "#6f685c";
const PAPER = "#fbfaf6";
const PAPER_DEEP = "#ece8df";

function AvatarFrame({
  id,
  label,
  children,
}: {
  id: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <circle cx="100" cy="100" r="94" fill={PAPER} stroke={INK} strokeWidth="2.5" />
      <circle
        cx="100"
        cy="100"
        r="88"
        fill="none"
        stroke={INK}
        strokeWidth="1"
        strokeDasharray="3 5"
        opacity={0.5}
      />
      {children}
      {/* Label plate */}
      <g transform="rotate(-1.5 100 184)">
        <rect x="60" y="174" width="80" height="17" fill={INK} rx="2" />
        <text
          x="100"
          y="186"
          textAnchor="middle"
          fontSize="8"
          fill={PAPER}
          fontFamily="monospace"
          fontWeight="bold"
          letterSpacing="1.5"
        >
          {label}
        </text>
      </g>
    </>
  );
}

// ===== KAEL THE STOIC =====
export function KaelAvatar({ size = 256 }: { size?: number }) {
  const id = useId().replace(/:/g, "-");
  return (
    <motion.svg
      viewBox="0 0 200 200"
      role="img"
      aria-label="Kael the Stoic avatar"
      width={size}
      height={size}
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 200, damping: 15 }}
    >
      <AvatarFrame id={id} label="THE STOIC">
        {/* Face */}
        <ellipse cx="100" cy="108" rx="52" ry="58" fill={PAPER_DEEP} stroke={INK} strokeWidth="2" />
        {/* Brow ridge - serious */}
        <path d="M58,80 Q78,70 100,73 Q122,70 142,80" stroke={INK} strokeWidth="3.5" fill="none" strokeLinecap="round" />
        {/* Narrow eyes */}
        <line x1="66" y1="92" x2="84" y2="94" stroke={INK} strokeWidth="3" strokeLinecap="round" />
        <line x1="116" y1="94" x2="134" y2="92" stroke={INK} strokeWidth="3" strokeLinecap="round" />
        {/* Nose */}
        <path d="M95,96 L100,112 L105,96" stroke={INK_MUTED} strokeWidth="1.5" fill="none" />
        {/* Straight mouth */}
        <line x1="82" y1="128" x2="118" y2="128" stroke={INK} strokeWidth="3" strokeLinecap="round" />
        {/* Scar */}
        <line x1="128" y1="76" x2="138" y2="100" stroke={INK} strokeWidth="1.5" opacity={0.7} />
        {/* Jaw */}
        <path d="M48,104 Q52,152 100,162 Q148,152 152,104" stroke={INK_MUTED} strokeWidth="1.5" fill="none" />
      </AvatarFrame>
    </motion.svg>
  );
}

// ===== ZARA THE CHAOS GREMLIN =====
export function ZaraAvatar({ size = 256 }: { size?: number }) {
  const id = useId().replace(/:/g, "-");
  return (
    <motion.svg
      viewBox="0 0 200 200"
      role="img"
      aria-label="Zara the Chaos Gremlin avatar"
      width={size}
      height={size}
      initial={{ scale: 0.8, opacity: 0, rotate: -5 }}
      animate={{ scale: 1, opacity: 1, rotate: 0 }}
      transition={{ type: "spring", stiffness: 200, damping: 15 }}
    >
      <AvatarFrame id={id} label="THE GREMLIN">
        {/* Wild hair */}
        <path
          d="M42,78 Q34,40 62,52 Q52,18 84,42 Q95,8 112,38 Q132,6 140,44 Q170,22 158,64 Q178,52 166,84"
          stroke={INK}
          strokeWidth="2.5"
          fill="none"
        />
        {/* Face */}
        <ellipse cx="100" cy="108" rx="48" ry="54" fill={PAPER_DEEP} stroke={INK} strokeWidth="2" />
        {/* Mismatched eyes */}
        <circle cx="80" cy="96" r="9" fill={PAPER} stroke={INK} strokeWidth="2.5" />
        <circle cx="122" cy="96" r="6" fill={INK} />
        {/* Spiral eye */}
        <motion.path
          d="M80,96 m0,0 q6,-3 4,2 q0,4 -4,2 q-5,-1 -3,-6 q2,-5 7,-2"
          stroke={INK}
          strokeWidth="1.5"
          fill="none"
          animate={{ rotate: 360 }}
          transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: "80px 96px" }}
        />
        {/* Raised brows */}
        <path d="M60,80 Q78,68 96,76" stroke={INK} strokeWidth="3" fill="none" strokeLinecap="round" />
        <path d="M104,76 Q122,68 140,80" stroke={INK} strokeWidth="3" fill="none" strokeLinecap="round" />
        {/* Nose */}
        <circle cx="100" cy="108" r="4" fill={INK_SOFT} />
        {/* Big grin */}
        <path d="M70,126 Q85,146 100,140 Q115,146 130,126" stroke={INK} strokeWidth="2.5" fill="none" />
        {/* Star */}
        <text x="150" y="62" fontSize="12" fill={INK}>✦</text>
      </AvatarFrame>
    </motion.svg>
  );
}

// ===== DANTE THE SMOOTH OPERATOR =====
export function DanteAvatar({ size = 256 }: { size?: number }) {
  const id = useId().replace(/:/g, "-");
  return (
    <motion.svg
      viewBox="0 0 200 200"
      role="img"
      aria-label="Dante the Smooth Operator avatar"
      width={size}
      height={size}
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 200, damping: 15 }}
    >
      <AvatarFrame id={id} label="THE OPERATOR">
        {/* Slicked hair */}
        <path
          d="M48,82 Q50,42 100,38 Q150,42 152,82 Q150,56 100,52 Q50,56 48,82"
          stroke={INK}
          strokeWidth="2.5"
          fill={PAPER_DEEP}
        />
        {/* Face */}
        <ellipse cx="100" cy="108" rx="50" ry="54" fill={PAPER_DEEP} stroke={INK} strokeWidth="2" />
        {/* Sunglasses */}
        <rect x="56" y="82" width="36" height="24" rx="6" fill={INK} />
        <rect x="108" y="82" width="36" height="24" rx="6" fill={INK} />
        <line x1="92" y1="94" x2="108" y2="94" stroke={INK} strokeWidth="2" />
        {/* Lens reflection */}
        <line x1="63" y1="87" x2="73" y2="87" stroke={PAPER} strokeWidth="1.5" opacity={0.5} />
        <line x1="115" y1="87" x2="125" y2="87" stroke={PAPER} strokeWidth="1.5" opacity={0.5} />
        {/* Nose */}
        <path d="M95,102 L100,116 L105,102" stroke={INK_MUTED} strokeWidth="1.5" fill="none" />
        {/* Smirk */}
        <path d="M80,130 Q96,140 118,131" stroke={INK} strokeWidth="2.5" fill="none" strokeLinecap="round" />
        {/* Chin dimple */}
        <circle cx="100" cy="150" r="1.5" fill={INK_MUTED} />
        {/* Collar hint */}
        <path d="M56,156 L76,146 L100,152 L124,146 L144,156" stroke={INK_MUTED} strokeWidth="2" fill="none" />
      </AvatarFrame>
    </motion.svg>
  );
}

// ===== LUNA THE SWEET DISASTER =====
export function LunaAvatar({ size = 256 }: { size?: number }) {
  const id = useId().replace(/:/g, "-");
  return (
    <motion.svg
      viewBox="0 0 200 200"
      role="img"
      aria-label="Luna the Sweet Disaster avatar"
      width={size}
      height={size}
      initial={{ scale: 0.8, opacity: 0, y: 10 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 200, damping: 15 }}
    >
      <AvatarFrame id={id} label="THE DISASTER">
        {/* Long hair */}
        <path
          d="M36,92 Q30,52 70,46 Q90,30 110,46 Q142,36 158,62 Q174,58 170,100 Q174,138 156,158 Q140,148 130,128 Q120,140 100,134 Q80,142 66,128 Q50,144 42,156 Q26,140 30,100 Z"
          stroke={INK}
          strokeWidth="2.5"
          fill={PAPER_DEEP}
        />
        {/* Face */}
        <ellipse cx="100" cy="108" rx="46" ry="50" fill={PAPER} stroke={INK} strokeWidth="2" />
        {/* Big sparkly eyes */}
        <ellipse cx="80" cy="94" rx="12" ry="13" fill={PAPER} stroke={INK} strokeWidth="2.5" />
        <ellipse cx="120" cy="94" rx="12" ry="13" fill={PAPER} stroke={INK} strokeWidth="2.5" />
        <circle cx="82" cy="92" r="5.5" fill={INK} />
        <circle cx="122" cy="92" r="5.5" fill={INK} />
        <circle cx="84" cy="90" r="1.5" fill={PAPER} />
        <circle cx="124" cy="90" r="1.5" fill={PAPER} />
        {/* Soft brows */}
        <path d="M66,78 Q80,72 94,78" stroke={INK_SOFT} strokeWidth="2" fill="none" strokeLinecap="round" />
        <path d="M106,78 Q120,72 134,78" stroke={INK_SOFT} strokeWidth="2" fill="none" strokeLinecap="round" />
        {/* Tiny nose */}
        <ellipse cx="100" cy="106" rx="3" ry="4" fill={INK_SOFT} />
        {/* Surprised O mouth */}
        <ellipse cx="100" cy="128" rx="9" ry="7" fill="none" stroke={INK} strokeWidth="2" />
        {/* Flower */}
        <motion.g
          animate={{ rotate: [-8, 8, -8] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformOrigin: "146px 52px" }}
        >
          <g transform="translate(146,52)">
            {[0, 72, 144, 216, 288].map((deg) => (
              <circle
                key={deg}
                cx="5"
                cy="0"
                r="4"
                fill="none"
                stroke={INK}
                strokeWidth="1.5"
                transform={`rotate(${deg})`}
              />
            ))}
            <circle cx="0" cy="0" r="2.5" fill={INK} />
          </g>
        </motion.g>
      </AvatarFrame>
    </motion.svg>
  );
}

// ===== REI THE GHOST =====
export function ReiAvatar({ size = 256 }: { size?: number }) {
  const id = useId().replace(/:/g, "-");
  return (
    <motion.svg
      viewBox="0 0 200 200"
      role="img"
      aria-label="Rei the Ghost avatar"
      width={size}
      height={size}
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 0.9 }}
      transition={{ type: "spring", stiffness: 200, damping: 15 }}
    >
      <AvatarFrame id={id} label="THE GHOST">
        {/* Ethereal wisps */}
        <motion.path
          d="M34,120 Q52,100 42,82"
          stroke={INK}
          strokeWidth="1.5"
          fill="none"
          opacity={0.5}
          animate={{ d: ["M34,120 Q52,100 42,82", "M30,124 Q48,104 40,86"] }}
          transition={{ duration: 4, repeat: Infinity }}
        />
        <motion.path
          d="M166,120 Q148,100 158,82"
          stroke={INK}
          strokeWidth="1.5"
          fill="none"
          opacity={0.5}
          animate={{ d: ["M166,120 Q148,100 158,82", "M170,124 Q152,104 160,86"] }}
          transition={{ duration: 4, repeat: Infinity }}
        />
        {/* Face */}
        <ellipse cx="100" cy="108" rx="46" ry="50" fill={PAPER_DEEP} stroke={INK} strokeWidth="2" />
        {/* Messy hair covering one eye */}
        <path
          d="M42,86 Q46,50 82,46 Q100,36 120,52 Q144,42 152,72 Q158,62 156,86 L120,84 Q128,74 124,64 Q108,52 90,56 Q68,50 56,72 Z"
          fill={INK}
        />
        {/* Visible half-lidded eye */}
        <ellipse cx="126" cy="90" rx="10" ry="6" fill={PAPER} stroke={INK} strokeWidth="2" />
        <circle cx="127" cy="89" r="3.5" fill={INK} />
        <path d="M114,86 Q126,82 138,86" stroke={INK} strokeWidth="2" fill={PAPER_DEEP} />
        {/* Hidden eye slit */}
        <line x1="72" y1="92" x2="86" y2="92" stroke={INK} strokeWidth="1.5" opacity={0.5} />
        {/* Nose */}
        <path d="M97,102 L100,114 L103,102" stroke={INK_MUTED} strokeWidth="1.5" fill="none" />
        {/* Tiny neutral mouth */}
        <line x1="90" y1="126" x2="110" y2="126" stroke={INK} strokeWidth="2" strokeLinecap="round" />
        {/* Sparkles */}
        <motion.text
          x="44" y="58" fontSize="9" fill={INK} opacity={0.6}
          animate={{ opacity: [0.2, 0.8, 0.2] }}
          transition={{ duration: 2.4, repeat: Infinity }}
        >
          ✦
        </motion.text>
      </AvatarFrame>
    </motion.svg>
  );
}

// ===== BRUTUS THE BLACK HOLE =====
export function BrutusAvatar({ size = 256 }: { size?: number }) {
  const id = useId().replace(/:/g, "-");
  return (
    <motion.svg
      viewBox="0 0 200 200"
      role="img"
      aria-label="Brutus the Black Hole avatar"
      width={size}
      height={size}
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 200, damping: 15 }}
    >
      <AvatarFrame id={id} label="THE BLACK HOLE">
        {/* Square head */}
        <rect x="48" y="62" width="104" height="96" rx="10" fill={PAPER_DEEP} stroke={INK} strokeWidth="2.5" />
        {/* Short hair */}
        <path d="M52,72 Q56,48 100,44 Q144,48 148,72 Q144,58 100,54 Q56,58 52,72" fill={INK} />
        {/* Heavy brow */}
        <path d="M52,84 Q76,72 100,77 Q124,72 148,84" stroke={INK} strokeWidth="5" fill="none" strokeLinecap="round" />
        {/* Intense eyes */}
        <ellipse cx="76" cy="96" rx="13" ry="11" fill={PAPER} stroke={INK} strokeWidth="2.5" />
        <ellipse cx="124" cy="96" rx="13" ry="11" fill={PAPER} stroke={INK} strokeWidth="2.5" />
        <circle cx="78" cy="95" r="5.5" fill={INK} />
        <circle cx="126" cy="95" r="5.5" fill={INK} />
        <circle cx="80" cy="92" r="1.5" fill={PAPER} />
        <circle cx="128" cy="92" r="1.5" fill={PAPER} />
        {/* Broad nose */}
        <path d="M88,100 L100,120 L112,100" stroke={INK_SOFT} strokeWidth="2" fill="none" />
        {/* Wide open mouth */}
        <path d="M82,136 q18,16 36,0 q-2,16 -18,18 q-16,-2 -18,-18z" fill={INK} />
        {/* Teeth */}
        <line x1="88" y1="142" x2="92" y2="142" stroke={PAPER} strokeWidth="2.5" />
        <line x1="96" y1="142" x2="100" y2="142" stroke={PAPER} strokeWidth="2.5" />
        <line x1="104" y1="142" x2="108" y2="142" stroke={PAPER} strokeWidth="2.5" />
        <line x1="112" y1="142" x2="116" y2="142" stroke={PAPER} strokeWidth="2.5" />
        {/* Chin */}
        <path d="M72,152 Q100,166 128,152" stroke={INK_MUTED} strokeWidth="2" fill="none" />
      </AvatarFrame>
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
