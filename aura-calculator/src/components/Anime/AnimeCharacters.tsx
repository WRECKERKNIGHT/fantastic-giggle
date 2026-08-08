"use client";

import { useId } from "react";
import { motion } from "framer-motion";

type AnimeCharacterProps = {
  size?: number;
  className?: string;
};

const INK = "#14110c";
const INK_SOFT = "#3d382f";
const INK_MUTED = "#6f685c";
const PAPER = "#fbfaf6";
const PAPER_DEEP = "#ece8df";

// ===== COMMON SKETCH FRAME =====
function SketchFrame({
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
      {/* Drawn circle frame */}
      <circle cx="100" cy="100" r="88" fill={PAPER} stroke={INK} strokeWidth="2.5" />
      <circle
        cx="100"
        cy="100"
        r="82"
        fill="none"
        stroke={INK}
        strokeWidth="1"
        strokeDasharray="3 5"
        opacity={0.5}
      />
      {/* Cross-hatch lower third */}
      <path
        d="M20,150 L180,150 M14,160 L186,160 M20,170 L180,170 M24,180 L176,180"
        stroke={INK}
        strokeWidth="1"
        opacity={0.14}
      />
      {children}
      {/* Corner ticks (sketched plate corners) */}
      <path d="M24,30 L32,24 M176,30 L168,24 M24,170 L32,176 M176,170 L168,176" stroke={INK} strokeWidth="2" />
      {/* Label plate */}
      <g transform="rotate(-2 100 184)">
        <rect x="55" y="174" width="90" height="18" fill={INK} rx="2" />
        <text
          x="100"
          y="187"
          textAnchor="middle"
          fontSize="9"
          fill={PAPER}
          fontFamily="monospace"
          fontWeight="bold"
          letterSpacing="2"
        >
          {label}
        </text>
      </g>
    </>
  );
}

// ===== NOOB =====
export function NoobCharacter({ size = 200, className = "" }: AnimeCharacterProps) {
  const id = useId().replace(/:/g, "-");

  return (
    <motion.svg
      viewBox="0 0 200 200"
      width={size}
      height={size}
      className={className}
      role="img"
      aria-label="Noob character - a defeated ink sketch"
      initial={{ scale: 0.8, opacity: 0, rotate: -8 }}
      animate={{ scale: 1, opacity: 1, rotate: 0 }}
      transition={{ type: "spring", stiffness: 200, damping: 15 }}
    >
      <SketchFrame id={id} label="NOOB">
        {/* Drooping shoulders */}
        <path
          d="M70,150 Q68,168 60,182 M130,150 Q132,168 140,182"
          stroke={INK}
          strokeWidth="7"
          strokeLinecap="round"
          fill="none"
        />
        {/* Head */}
        <circle cx="100" cy="100" r="34" fill={PAPER_DEEP} stroke={INK} strokeWidth="2.5" />
        {/* Sad eyes with X marks */}
        <g stroke={INK} strokeWidth="2.5" strokeLinecap="round">
          <line x1="83" y1="92" x2="93" y2="100" />
          <line x1="93" y1="92" x2="83" y2="100" />
          <line x1="107" y1="92" x2="117" y2="100" />
          <line x1="117" y1="92" x2="107" y2="100" />
        </g>
        {/* Tear drop */}
        <motion.path
          d="M87,106 q3,7 0,11 q-3,-4 0,-11z"
          fill={INK}
          animate={{ y: [0, 6, 0], opacity: [1, 0.2, 1] }}
          transition={{ duration: 2.2, repeat: Infinity }}
        />
        {/* Frown */}
        <path d="M90,118 Q100,112 110,118" stroke={INK} strokeWidth="2.5" fill="none" strokeLinecap="round" />
        {/* Sweat beads */}
        <path d="M120,80 q3,5 0,9" stroke={INK} strokeWidth="1.5" fill="none" />
        {/* "L" branded on forehead */}
        <text x="100" y="82" textAnchor="middle" fontSize="14" fill={INK} fontWeight="bold" fontFamily="monospace">
          L
        </text>
      </SketchFrame>
    </motion.svg>
  );
}

// ===== CLOWN =====
export function ClownCharacter({ size = 200, className = "" }: AnimeCharacterProps) {
  const id = useId().replace(/:/g, "-");

  return (
    <motion.svg
      viewBox="0 0 200 200"
      width={size}
      height={size}
      className={className}
      role="img"
      aria-label="Clown character - a chaotic ink sketch"
      initial={{ scale: 0.8, opacity: 0, rotate: 10 }}
      animate={{ scale: 1, opacity: 1, rotate: 0 }}
      transition={{ type: "spring", stiffness: 200, damping: 15 }}
    >
      <SketchFrame id={id} label="CLOWN">
        {/* Zigzag body */}
        <path
          d="M70,150 L85,140 L80,150 L95,140 L90,150 L105,140 L100,150 L115,140 L110,150 L130,150"
          stroke={INK}
          strokeWidth="2.5"
          fill="none"
        />
        {/* Head */}
        <circle cx="100" cy="96" r="36" fill={PAPER_DEEP} stroke={INK} strokeWidth="2.5" />
        {/* Jester hat */}
        <motion.g
          animate={{ rotate: [-6, 6, -6] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformOrigin: "100px 100px" }}
        >
          <path d="M64,84 L100,34 L136,84" stroke={INK} strokeWidth="2.5" fill="none" />
          <path d="M100,34 L100,50 M100,50 L112,42 M100,50 L88,42" stroke={INK} strokeWidth="2" fill="none" />
          <circle cx="100" cy="30" r="5" fill={INK} />
        </motion.g>
        {/* Mismatched eyes */}
        <circle cx="86" cy="92" r="7" fill="none" stroke={INK} strokeWidth="2.5" />
        <circle cx="114" cy="92" r="4" fill={INK} />
        {/* Spiral eye */}
        <motion.path
          d="M86,92 m0,0 q5,-2 4,2 q0,3 -4,2 q-4,-1 -3,-5 q2,-4 6,-2"
          stroke={INK}
          strokeWidth="1.5"
          fill="none"
          animate={{ rotate: 360 }}
          transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: "86px 92px" }}
        />
        {/* Clown nose */}
        <circle cx="100" cy="102" r="7" fill={INK} />
        {/* Big grin */}
        <path d="M84,114 Q100,132 116,114" stroke={INK} strokeWidth="2.5" fill="none" />
        {/* Star sparkles */}
        <motion.text
          x="58"
          y="70"
          fontSize="12"
          fill={INK}
          animate={{ opacity: [0.3, 1, 0.3], rotate: [0, 45, 0] }}
          transition={{ duration: 1.6, repeat: Infinity }}
          style={{ transformOrigin: "58px 70px" }}
        >
          ✦
        </motion.text>
        <motion.text
          x="146"
          y="80"
          fontSize="9"
          fill={INK}
          animate={{ opacity: [1, 0.2, 1], rotate: [45, 0, 45] }}
          transition={{ duration: 1.9, repeat: Infinity }}
          style={{ transformOrigin: "146px 80px" }}
        >
          ✦
        </motion.text>
      </SketchFrame>
    </motion.svg>
  );
}

// ===== AURA FARMER =====
export function AuraFarmerCharacter({ size = 200, className = "" }: AnimeCharacterProps) {
  const id = useId().replace(/:/g, "-");

  return (
    <motion.svg
      viewBox="0 0 200 200"
      width={size}
      height={size}
      className={className}
      role="img"
      aria-label="Aura Farmer character - a determined ink sketch"
      initial={{ scale: 0.8, opacity: 0, y: 16 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 200, damping: 15 }}
    >
      <SketchFrame id={id} label="AURA FARMER">
        {/* Wheat stalks */}
        {[...Array(4)].map((_, i) => (
          <motion.g
            key={i}
            animate={{ rotate: [-4, 4, -4] }}
            transition={{ duration: 2.6, repeat: Infinity, delay: i * 0.15 }}
            style={{ transformOrigin: `${58 + i * 28}px 168px` }}
          >
            <path
              d={`M${58 + i * 28},168 L${58 + i * 28},138`}
              stroke={INK}
              strokeWidth="2"
            />
            <path
              d={`M${58 + i * 28},140 L${50 + i * 28},132 M${58 + i * 28},132 L${66 + i * 28},124`}
              stroke={INK}
              strokeWidth="1.5"
              fill="none"
            />
            <circle cx={`${58 + i * 28}`} cy="140" r="3.5" fill={INK} />
          </motion.g>
        ))}
        {/* Body / overalls */}
        <rect x="82" y="120" width="36" height="46" fill="none" stroke={INK} strokeWidth="2.5" />
        <line x1="100" y1="120" x2="100" y2="166" stroke={INK} strokeWidth="2" />
        {/* Head */}
        <circle cx="100" cy="92" r="32" fill={PAPER_DEEP} stroke={INK} strokeWidth="2.5" />
        {/* Straw hat */}
        <ellipse cx="100" cy="70" rx="44" ry="9" fill="none" stroke={INK} strokeWidth="2.5" />
        <path d="M66,70 Q100,38 134,70" fill="none" stroke={INK} strokeWidth="2.5" />
        <line x1="100" y1="42" x2="100" y2="64" stroke={INK} strokeWidth="1.5" />
        {/* Determined eyes */}
        <circle cx="89" cy="90" r="4.5" fill={INK} />
        <circle cx="111" cy="90" r="4.5" fill={INK} />
        <line x1="81" y1="80" x2="94" y2="83" stroke={INK} strokeWidth="2.5" />
        <line x1="119" y1="80" x2="106" y2="83" stroke={INK} strokeWidth="2.5" />
        {/* Gritting smile */}
        <path d="M90,106 Q100,112 110,106" stroke={INK} strokeWidth="2.5" fill="none" />
        {/* Rising coins */}
        <motion.g
          animate={{ y: [-6, -16, -6], opacity: [0, 1, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, delay: 0.3 }}
        >
          <circle cx="58" cy="96" r="6" fill="none" stroke={INK} strokeWidth="2" />
          <text x="58" y="99" textAnchor="middle" fontSize="7" fill={INK} fontWeight="bold">+</text>
        </motion.g>
        <motion.g
          animate={{ y: [-6, -16, -6], opacity: [0, 1, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, delay: 1 }}
        >
          <circle cx="146" cy="102" r="6" fill="none" stroke={INK} strokeWidth="2" />
          <text x="146" y="105" textAnchor="middle" fontSize="7" fill={INK} fontWeight="bold">+</text>
        </motion.g>
      </SketchFrame>
    </motion.svg>
  );
}

// ===== GIGA CHAD =====
export function GigaChadCharacter({ size = 200, className = "" }: AnimeCharacterProps) {
  const id = useId().replace(/:/g, "-");

  return (
    <motion.svg
      viewBox="0 0 200 200"
      width={size}
      height={size}
      className={className}
      role="img"
      aria-label="Giga Chad character - a powerful ink sketch"
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 200, damping: 15 }}
    >
      <SketchFrame id={id} label="GIGA CHAD">
        {/* Radiating energy ticks */}
        {[...Array(16)].map((_, i) => {
          const angle = (i / 16) * Math.PI * 2;
          const x1 = 100 + Math.cos(angle) * 46;
          const y1 = 100 + Math.sin(angle) * 46;
          const x2 = 100 + Math.cos(angle) * 58;
          const y2 = 100 + Math.sin(angle) * 58;
          return (
            <line
              key={i}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke={INK}
              strokeWidth="2"
              strokeLinecap="round"
              opacity={0.8}
            />
          );
        })}
        {/* Broad shoulders */}
        <path
          d="M62,160 Q60,138 74,128 M138,160 Q140,138 126,128"
          stroke={INK}
          strokeWidth="9"
          strokeLinecap="round"
          fill="none"
        />
        {/* Trapezius block */}
        <path d="M62,160 L84,126 L116,126 L138,160" fill="none" stroke={INK} strokeWidth="2.5" />
        {/* Head - chiseled */}
        <circle cx="100" cy="86" r="33" fill={PAPER_DEEP} stroke={INK} strokeWidth="2.5" />
        {/* Jawline */}
        <path d="M76,92 L84,114 L116,114 L124,92" fill="none" stroke={INK} strokeWidth="2.5" />
        {/* Sunglasses */}
        <rect x="78" y="78" width="19" height="11" rx="3" fill={INK} />
        <rect x="103" y="78" width="19" height="11" rx="3" fill={INK} />
        <line x1="97" y1="83" x2="103" y2="83" stroke={INK} strokeWidth="2" />
        {/* Smirk */}
        <path d="M92,102 Q100,108 112,100" stroke={INK} strokeWidth="2.5" fill="none" strokeLinecap="round" />
        {/* Chin tick */}
        <path d="M95,119 L105,119" stroke={INK} strokeWidth="1.5" opacity={0.6} />
      </SketchFrame>
    </motion.svg>
  );
}

// ===== ULTIMATE BEAST =====
export function UltimateBeastCharacter({ size = 200, className = "" }: AnimeCharacterProps) {
  const id = useId().replace(/:/g, "-");

  return (
    <motion.svg
      viewBox="0 0 200 200"
      width={size}
      height={size}
      className={className}
      role="img"
      aria-label="Ultimate Beast character - a transcendent ink sketch"
      initial={{ scale: 0.5, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 150, damping: 12 }}
    >
      <SketchFrame id={id} label="ULTIMATE BEAST">
        {/* Halftone burst */}
        {[...Array(4)].map((_, i) => (
          <circle
            key={i}
            cx="100"
            cy="100"
            r={56 + i * 7}
            fill="none"
            stroke={INK}
            strokeWidth="1"
            strokeDasharray="2 8"
            opacity={0.35 - i * 0.07}
          />
        ))}
        {/* Rising robe */}
        <motion.g
          animate={{ y: [-4, 4, -4] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          <path
            d="M72,150 Q62,120 78,112 L122,112 Q138,120 128,150 Z"
            fill="none"
            stroke={INK}
            strokeWidth="2.5"
          />
          {/* Head */}
          <circle cx="100" cy="84" r="32" fill={PAPER_DEEP} stroke={INK} strokeWidth="2.5" />
          {/* Crown */}
          <path d="M72,64 L76,46 L88,60 L100,42 L112,60 L124,46 L128,64" fill={INK} />
          <circle cx="76" cy="44" r="2.5" fill={INK} />
          <circle cx="100" cy="40" r="2.5" fill={INK} />
          <circle cx="124" cy="44" r="2.5" fill={INK} />
          {/* Star eyes */}
          <g stroke={INK} strokeWidth="2" strokeLinecap="round">
            <path d="M89,82 l2.5,6 l6,2.5 l-6,2.5 l-2.5,6 l-2.5,-6 l-6,-2.5 l6,-2.5 Z" fill={INK} />
            <path d="M111,82 l2.5,6 l6,2.5 l-6,2.5 l-2.5,6 l-2.5,-6 l-6,-2.5 l6,-2.5 Z" fill={INK} />
          </g>
          {/* Calm smile */}
          <path d="M92,98 Q100,103 108,98" stroke={INK} strokeWidth="2.5" fill="none" strokeLinecap="round" />
        </motion.g>
        {/* Sparkle accents */}
        <motion.text
          x="148"
          y="66"
          fontSize="10"
          fill={INK}
          animate={{ opacity: [1, 0.2, 1], rotate: [0, 90, 0] }}
          transition={{ duration: 2.4, repeat: Infinity }}
          style={{ transformOrigin: "148px 66px" }}
        >
          ✦
        </motion.text>
        <motion.text
          x="52"
          y="52"
          fontSize="7"
          fill={INK}
          animate={{ opacity: [0.2, 1, 0.2], rotate: [90, 0, 90] }}
          transition={{ duration: 2, repeat: Infinity }}
          style={{ transformOrigin: "52px 52px" }}
        >
          ✦
        </motion.text>
      </SketchFrame>
    </motion.svg>
  );
}

// ===== CHARACTER MAPPER =====
export const CHARACTER_MAP = {
  noob: NoobCharacter,
  clown: ClownCharacter,
  aura_farmer: AuraFarmerCharacter,
  giga_chad: GigaChadCharacter,
  ultimate_beast: UltimateBeastCharacter,
} as const;

export function AnimeCharacter({ tier, size = 200, className = "" }: {
  tier: keyof typeof CHARACTER_MAP;
  size?: number;
  className?: string;
}) {
  const Character = CHARACTER_MAP[tier];
  return <Character size={size} className={className} />;
}
