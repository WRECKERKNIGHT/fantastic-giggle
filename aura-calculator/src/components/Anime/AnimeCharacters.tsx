"use client";

import { useId } from "react";
import { motion } from "framer-motion";

type AnimeCharacterProps = {
  size?: number;
  className?: string;
};

// ===== NOOB - Loser with red aura =====
export function NoobCharacter({ size = 200, className = "" }: AnimeCharacterProps) {
  const id = useId().replace(/:/g, "-");
  
  return (
    <motion.svg
      viewBox="0 0 200 200"
      width={size}
      height={size}
      className={className}
      role="img"
      aria-label="Noob character - a defeated figure with red aura"
      initial={{ scale: 0.8, opacity: 0, rotate: -10 }}
      animate={{ scale: 1, opacity: 1, rotate: 0 }}
      transition={{ type: "spring", stiffness: 200, damping: 15 }}
    >
      <defs>
        <radialGradient id={`${id}-flame`} cx="50%" cy="100%" r="60%">
          <stop offset="0%" stopColor="#ef4444" stopOpacity="0.8" />
          <stop offset="50%" stopColor="#dc2626" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#991b1b" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`${id}-body`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#4b5563" />
          <stop offset="100%" stopColor="#1f2937" />
        </linearGradient>
      </defs>
      
      {/* Flame aura background */}
      <ellipse cx="100" cy="180" rx="80" ry="60" fill={`url(#${id}-flame)`} />
      
      {/* Red flames rising */}
      {[...Array(8)].map((_, i) => (
        <motion.path
          key={i}
          d={`M${70 + i * 10},180 Q${75 + i * 10},${140 - (i * 3.7) % 20} ${80 + i * 10},${120 + (i * 4.3) % 30}`}
          stroke="#ef4444"
          strokeWidth="3"
          fill="none"
          opacity={0.6}
          animate={{ 
            d: [
              `M${70 + i * 10},180 Q${75 + i * 10},${140 - (i * 3.7) % 20} ${80 + i * 10},${120 + (i * 4.3) % 30}`,
              `M${70 + i * 10},180 Q${75 + i * 10},${130 - Math.random() * 30} ${80 + i * 10},${110 + Math.random() * 30}`,
              `M${70 + i * 10},180 Q${75 + i * 10},${140 - (i * 3.7) % 20} ${80 + i * 10},${120 + (i * 4.3) % 30}`,
            ],
            opacity: [0.4, 0.7, 0.4],
          }}
          transition={{ duration: 1.5 + (i * 0.3) % 1, repeat: Infinity }}
        />
      ))}
      
      {/* Body - defeated posture */}
      <path
        d="M75,130 Q70,150 65,175 M125,130 Q130,150 135,175"
        stroke="#374151"
        strokeWidth="8"
        strokeLinecap="round"
        fill="none"
      />
      
      {/* Head - drooping */}
      <circle cx="100" cy="100" r="35" fill="#fcd5b8" stroke="#d4a574" strokeWidth="2" />
      
      {/* Sad eyes - anime style */}
      <ellipse cx="88" cy="95" rx="6" ry="8" fill="white" />
      <ellipse cx="112" cy="95" rx="6" ry="8" fill="white" />
      <ellipse cx="88" cy="97" rx="4" ry="5" fill="#6b7280" />
      <ellipse cx="112" cy="97" rx="4" ry="5" fill="#6b7280" />
      {/* Tear drops */}
      <motion.ellipse
        cx="85"
        cy="108"
        rx="2"
        ry="4"
        fill="#60a5fa"
        opacity={0.8}
        animate={{ cy: [108, 118, 108], opacity: [0.8, 0, 0.8] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
      
      {/* Sad mouth */}
      <path d="M90,115 Q100,110 110,115" stroke="#374151" strokeWidth="2" fill="none" />
      
      {/* X marks on forehead (loser marks) */}
      <g stroke="#ef4444" strokeWidth="2">
        <line x1="95" y1="78" x2="105" y2="88" />
        <line x1="105" y1="78" x2="95" y2="88" />
      </g>
      
      {/* Speech bubble */}
      <g>
        <ellipse cx="150" cy="60" rx="30" ry="20" fill="white" opacity={0.9} />
        <polygon points="135,75 140,65 130,70" fill="white" opacity={0.9} />
        <text x="150" y="65" textAnchor="middle" fontSize="10" fill="#374151" fontWeight="bold">LOST...</text>
      </g>
    </motion.svg>
  );
}

// ===== CLOWN - Pink chaos with sparkles =====
export function ClownCharacter({ size = 200, className = "" }: AnimeCharacterProps) {
  const id = useId().replace(/:/g, "-");
  
  return (
    <motion.svg
      viewBox="0 0 200 200"
      width={size}
      height={size}
      className={className}
      role="img"
      aria-label="Clown character - a chaotic figure with pink aura"
      initial={{ scale: 0.8, opacity: 0, rotate: 15 }}
      animate={{ scale: 1, opacity: 1, rotate: 0 }}
      transition={{ type: "spring", stiffness: 200, damping: 15 }}
    >
      <defs>
        <radialGradient id={`${id}-aura`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ec4899" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#9d174d" stopOpacity="0" />
        </radialGradient>
      </defs>
      
      {/* Pink aura glow */}
      <circle cx="100" cy="100" r="90" fill={`url(#${id}-aura)`} />
      
      {/* Confetti particles */}
      {[...Array(12)].map((_, i) => (
        <motion.rect
          key={i}
          x={40 + (i * 17) % 120}
          y={30 + (i * 23) % 140}
          width="4"
          height="8"
          fill={["#ec4899", "#f472b6", "#fbbf24", "#06b6d4", "#a855f7"][i % 5]}
          rx="1"
          animate={{
            rotate: [0, 360],
            y: [0, 20, 0],
          }}
          transition={{ duration: 2 + Math.random() * 2, repeat: Infinity, delay: Math.random() }}
        />
      ))}
      
      {/* Body - juggling pose */}
      <ellipse cx="100" cy="145" rx="30" ry="40" fill="#ec4899" />
      
      {/* Head */}
      <circle cx="100" cy="80" r="40" fill="#fcd5b8" stroke="#d4a574" strokeWidth="2" />
      
      {/* Clown nose */}
      <circle cx="100" cy="85" r="8" fill="#ef4444" />
      
      {/* Crazy eyes - different sizes */}
      <ellipse cx="85" cy="75" rx="10" ry="12" fill="white" />
      <ellipse cx="115" cy="75" rx="8" ry="10" fill="white" />
      <circle cx="87" cy="76" r="5" fill="#1f2937" />
      <circle cx="117" cy="76" r="4" fill="#1f2937" />
      {/* Star sparkles in eyes */}
      <motion.circle
        cx="85"
        cy="73"
        r="2"
        fill="#fbbf24"
        animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
        transition={{ duration: 1, repeat: Infinity }}
      />
      
      {/* Big grin */}
      <path d="M78,95 Q100,115 122,95" stroke="#374151" strokeWidth="3" fill="none" />
      
      {/* Rainbow hair spikes */}
      <polygon points="70,60 60,20 80,50" fill="#ef4444" />
      <polygon points="85,55 80,10 95,45" fill="#f59e0b" />
      <polygon points="100,52 100,5 115,45" fill="#22c55e" />
      <polygon points="115,55 120,10 105,45" fill="#3b82f6" />
      <polygon points="130,60 140,20 120,50" fill="#a855f7" />
      
      {/* Juggling balls */}
      {[0, 1, 2].map((i) => (
        <motion.circle
          key={i}
          cx={60 + i * 40}
          cy={30}
          r="8"
          fill={["#ec4899", "#fbbf24", "#06b6d4"][i]}
          animate={{
            cy: [30, 15, 30],
            cx: [60 + i * 40, 70 + i * 30, 60 + i * 40],
          }}
          transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.3 }}
        />
      ))}
    </motion.svg>
  );
}

// ===== AURA FARMER - Amber/gold farmer with wheat =====
export function AuraFarmerCharacter({ size = 200, className = "" }: AnimeCharacterProps) {
  const id = useId().replace(/:/g, "-");
  
  return (
    <motion.svg
      viewBox="0 0 200 200"
      width={size}
      height={size}
      className={className}
      role="img"
      aria-label="Aura Farmer character - a determined figure with golden aura"
      initial={{ scale: 0.8, opacity: 0, y: 20 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 200, damping: 15 }}
    >
      <defs>
        <radialGradient id={`${id}-aura`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#92400e" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`${id}-flame`} x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#fbbf24" stopOpacity="0.3" />
        </linearGradient>
      </defs>
      
      {/* Golden aura */}
      <circle cx="100" cy="100" r="85" fill={`url(#${id}-aura)`} />
      
      {/* Wheat stalks */}
      {[...Array(6)].map((_, i) => (
        <motion.g
          key={i}
          animate={{ rotate: [-5, 5, -5] }}
          transition={{ duration: 3, repeat: Infinity, delay: i * 0.2 }}
          style={{ transformOrigin: `${30 + i * 28}px 180px` }}
        >
          <line
            x1={30 + i * 28}
            y1={180}
            x2={30 + i * 28}
            y2={120}
            stroke="#92400e"
            strokeWidth="3"
          />
          <ellipse
            cx={30 + i * 28}
            cy={115}
            rx="6"
            ry="12"
            fill="#f59e0b"
          />
        </motion.g>
      ))}
      
      {/* Body - farmer posture */}
      <rect x="80" y="110" width="40" height="50" rx="5" fill="#92400e" />
      
      {/* Head with hat */}
      <circle cx="100" cy="85" r="35" fill="#fcd5b8" stroke="#d4a574" strokeWidth="2" />
      
      {/* Straw hat */}
      <ellipse cx="100" cy="60" rx="45" ry="10" fill="#d97706" />
      <path d="M60,60 Q100,30 140,60" fill="#f59e0b" />
      
      {/* Determined eyes */}
      <ellipse cx="88" cy="82" rx="5" ry="6" fill="white" />
      <ellipse cx="112" cy="82" rx="5" ry="6" fill="white" />
      <circle cx="89" cy="83" r="3" fill="#92400e" />
      <circle cx="113" cy="83" r="3" fill="#92400e" />
      {/* Determined eyebrows */}
      <line x1="82" y1="72" x2="95" y2="75" stroke="#374151" strokeWidth="2" />
      <line x1="118" y1="72" x2="105" y2="75" stroke="#374151" strokeWidth="2" />
      
      {/* Smirk */}
      <path d="M90,98 Q100,105 115,100" stroke="#374151" strokeWidth="2" fill="none" />
      
      {/* Gold coins floating */}
      {[...Array(4)].map((_, i) => (
        <motion.circle
          key={i}
          cx={50 + i * 35}
          cy={50}
          r="8"
          fill="#fbbf24"
          stroke="#92400e"
          strokeWidth="1"
          animate={{
            cy: [50, 40, 50],
            opacity: [0.8, 1, 0.8],
          }}
          transition={{ duration: 2, repeat: Infinity, delay: i * 0.4 }}
        />
      ))}
      
      {/* "FARMING" text */}
      <text x="100" y="195" textAnchor="middle" fontSize="12" fill="#f59e0b" fontWeight="bold">
        FARMING AURA...
      </text>
    </motion.svg>
  );
}

// ===== GIGA CHAD - Purple/indigo powerful figure =====
export function GigaChadCharacter({ size = 200, className = "" }: AnimeCharacterProps) {
  const id = useId().replace(/:/g, "-");
  
  return (
    <motion.svg
      viewBox="0 0 200 200"
      width={size}
      height={size}
      className={className}
      role="img"
      aria-label="Giga Chad character - a powerful figure with purple aura"
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 200, damping: 15 }}
    >
      <defs>
        <radialGradient id={`${id}-aura`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#a855f7" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#581c87" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`${id}-body`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#4c1d95" />
        </linearGradient>
      </defs>
      
      {/* Purple aura burst */}
      <circle cx="100" cy="100" r="90" fill={`url(#${id}-aura)`} />
      
      {/* Energy lines */}
      {[...Array(12)].map((_, i) => {
        const angle = (i / 12) * Math.PI * 2;
        const x1 = 100 + Math.cos(angle) * 50;
        const y1 = 100 + Math.sin(angle) * 50;
        const x2 = 100 + Math.cos(angle) * 80;
        const y2 = 100 + Math.sin(angle) * 80;
        return (
          <motion.line
            key={i}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke="#a855f7"
            strokeWidth="2"
            opacity={0.5}
            animate={{ opacity: [0.3, 0.7, 0.3] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.1 }}
          />
        );
      })}
      
      {/* Muscular body */}
      <path
        d="M70,115 Q65,130 68,160 L132,160 Q135,130 130,115"
        fill={`url(#${id}-body)`}
      />
      
      {/* Broad shoulders */}
      <path
        d="M60,110 Q70,105 80,115 M140,110 Q130,105 120,115"
        stroke="#7c3aed"
        strokeWidth="8"
        strokeLinecap="round"
        fill="none"
      />
      
      {/* Head - chiseled */}
      <circle cx="100" cy="80" r="35" fill="#fcd5b8" stroke="#d4a574" strokeWidth="2" />
      
      {/* Jawline emphasis */}
      <path
        d="M75,85 L85,105 L115,105 L125,85"
        stroke="#d4a574"
        strokeWidth="2"
        fill="none"
      />
      
      {/* Confident eyes */}
      <ellipse cx="88" cy="78" rx="5" ry="4" fill="white" />
      <ellipse cx="112" cy="78" rx="5" ry="4" fill="white" />
      <circle cx="89" cy="78" r="3" fill="#1f2937" />
      <circle cx="113" cy="78" r="3" fill="#1f2937" />
      
      {/* Thick eyebrows */}
      <line x1="82" y1="70" x2="95" y2="72" stroke="#374151" strokeWidth="3" />
      <line x1="118" y1="70" x2="105" y2="72" stroke="#374151" strokeWidth="3" />
      
      {/* Smirk */}
      <path d="M92,92 Q100,98 112,92" stroke="#374151" strokeWidth="2" fill="none" />
      
      {/* Sunglasses */}
      <rect x="78" y="73" width="18" height="10" rx="3" fill="#1f2937" opacity={0.9} />
      <rect x="104" y="73" width="18" height="10" rx="3" fill="#1f2937" opacity={0.9} />
      <line x1="96" y1="78" x2="104" y2="78" stroke="#1f2937" strokeWidth="2" />
      
      {/* Lightning bolts */}
      <motion.polygon
        points="160,60 165,75 155,72 165,90"
        fill="#fbbf24"
        animate={{ opacity: [0.6, 1, 0.6], scale: [0.9, 1.1, 0.9] }}
        transition={{ duration: 1, repeat: Infinity }}
      />
      <motion.polygon
        points="40,50 45,65 35,62 45,80"
        fill="#fbbf24"
        animate={{ opacity: [0.6, 1, 0.6], scale: [0.9, 1.1, 0.9] }}
        transition={{ duration: 1, repeat: Infinity, delay: 0.5 }}
      />
      
      {/* "CHAD" text */}
      <text x="100" y="195" textAnchor="middle" fontSize="14" fill="#a855f7" fontWeight="bold">
        ABSOLUTE CHAD
      </text>
    </motion.svg>
  );
}

// ===== ULTIMATE BEAST - Cyan/white cosmic power =====
export function UltimateBeastCharacter({ size = 200, className = "" }: AnimeCharacterProps) {
  const id = useId().replace(/:/g, "-");
  
  return (
    <motion.svg
      viewBox="0 0 200 200"
      width={size}
      height={size}
      className={className}
      role="img"
      aria-label="Ultimate Beast character - a transcendent figure with cosmic power"
      initial={{ scale: 0.5, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 150, damping: 12 }}
    >
      <defs>
        <radialGradient id={`${id}-aura`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#00ffff" stopOpacity="0.7" />
          <stop offset="50%" stopColor="#0891b2" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#164e63" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`${id}-body`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#22d3ee" />
          <stop offset="100%" stopColor="#0e7490" />
        </linearGradient>
        <filter id={`${id}-glow`}>
          <feGaussianBlur stdDeviation="3" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      
      {/* Cosmic aura */}
      <circle cx="100" cy="100" r="95" fill={`url(#${id}-aura)`} />
      
      {/* Rotating rings */}
      {[0, 1, 2].map((i) => (
        <motion.ellipse
          key={i}
          cx="100"
          cy="100"
          rx={60 + i * 15}
          ry={20 + i * 5}
          fill="none"
          stroke="#00ffff"
          strokeWidth="1"
          opacity={0.4 - i * 0.1}
          animate={{ rotate: 360 }}
          transition={{ duration: 10 + i * 5, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: "100px 100px" }}
        />
      ))}
      
      {/* Stars */}
      {[...Array(20)].map((_, i) => (
        <motion.circle
          key={i}
          cx={20 + (i * 11) % 160}
          cy={20 + (i * 13) % 160}
          r={1 + (i * 0.7) % 2}
          fill="white"
          animate={{
            opacity: [0.3, 1, 0.3],
            scale: [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: 1 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}
      
      {/* Cosmic body - floating */}
      <motion.g
        animate={{ y: [-5, 5, -5] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        {/* Robe/body */}
        <path
          d="M70,110 Q60,130 65,170 L135,170 Q140,130 130,110"
          fill={`url(#${id}-body)`}
          filter={`url(#${id}-glow)`}
        />
        
        {/* Head */}
        <circle cx="100" cy="80" r="35" fill="#e0f2fe" stroke="#22d3ee" strokeWidth="2" />
        
        {/* Glowing eyes */}
        <motion.ellipse
          cx="88"
          cy="78"
          rx="6"
          ry="5"
          fill="#00ffff"
          animate={{ 
            opacity: [0.8, 1, 0.8],
            filter: ["drop-shadow(0 0 5px #00ffff)", "drop-shadow(0 0 15px #00ffff)", "drop-shadow(0 0 5px #00ffff)"]
          }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <motion.ellipse
          cx="112"
          cy="78"
          rx="6"
          ry="5"
          fill="#00ffff"
          animate={{ 
            opacity: [0.8, 1, 0.8],
            filter: ["drop-shadow(0 0 5px #00ffff)", "drop-shadow(0 0 15px #00ffff)", "drop-shadow(0 0 5px #00ffff)"]
          }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        
        {/* Cosmic crown */}
        {[...Array(5)].map((_, i) => {
          const angle = ((i - 2) / 4) * Math.PI * 0.6 - Math.PI / 2;
          return (
            <motion.polygon
              key={i}
              points={`${100 + Math.cos(angle) * 30},${55 + Math.sin(angle) * 15} ${100 + Math.cos(angle) * 25 - 5},${45 + Math.sin(angle) * 20} ${100 + Math.cos(angle) * 25 + 5},${45 + Math.sin(angle) * 20}`}
              fill="#00ffff"
              animate={{
                opacity: [0.6, 1, 0.6],
                scale: [0.9, 1.1, 0.9],
              }}
              transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
            />
          );
        })}
        
        {/* Serene smile */}
        <path d="M90,92 Q100,98 110,92" stroke="#0e7490" strokeWidth="2" fill="none" />
      </motion.g>
      
      {/* Aura text */}
      <text x="100" y="195" textAnchor="middle" fontSize="12" fill="#00ffff" fontWeight="bold" filter={`url(#${id}-glow)`}>
        TRANSCENDENCE
      </text>
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
