"use client";

import { useRef, Suspense } from "react";
import { motion } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sparkles, Float } from "@react-three/drei";
import * as THREE from "three";
import {
  AuraTier,
  AuraAxis,
  TIERS,
  AuraScoreBreakdown,
  TruthMatrixEntry,
} from "@/lib/questions-new";
import {
  RotateCcw,
  Download,
  Share2,
  AlertTriangle,
  Shield,
  Clock,
  Zap,
  Target,
  Trophy,
  TrendingUp,
  Brain,
  Heart,
  Swords,
  Flame,
  Crown,
} from "lucide-react";
import { AnimeCharacter } from "@/components/Anime/AnimeCharacters";
import { ErrorBoundary } from "@/components/ErrorBoundary";

// ===== CANVAS ERROR BOUNDARY FOR WebGL CONTEXT LOSS =====
function CanvasErrorBoundary({ children }: { children: React.ReactNode }) {
  return (
    <ErrorBoundary
      fallback={
        <div className="w-full h-full flex items-center justify-center text-white/30 text-sm">
          3D unavailable
        </div>
      }
    >
      {children}
    </ErrorBoundary>
  );
}

type ResultsProps = {
  score: number;
  tier: AuraTier;
  axes: Record<AuraAxis, number>;
  breakdown: AuraScoreBreakdown;
  truthMatrix: TruthMatrixEntry[];
  responsePattern: {
    pattern: string;
    description: string;
    icon: string;
  };
  auraVelocity: number[];
  onRestart: () => void;
};

// ===== 3D AURA ORB =====
function AuraOrb3D({ color, intensity }: { color: string; intensity: number }) {
  const ref = useRef<THREE.Mesh>(null);
  const outerRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (ref.current) {
      const scale = 1 + Math.sin(t * 2) * 0.1 * intensity;
      ref.current.scale.setScalar(scale);
      ref.current.rotation.y = t * 0.5;
    }
    if (outerRef.current) {
      outerRef.current.rotation.x = t * 0.3;
      outerRef.current.rotation.z = t * 0.2;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.8}>
      {/* Core */}
      <mesh ref={ref}>
        <sphereGeometry args={[1.5, 64, 64]} />
        <meshStandardMaterial
          color={color}
          transparent
          opacity={0.7}
          emissive={color}
          emissiveIntensity={intensity}
          roughness={0.1}
          metalness={0.3}
        />
      </mesh>
      {/* Inner glow */}
      <mesh>
        <sphereGeometry args={[1.2, 32, 32]} />
        <meshStandardMaterial
          color="#ffffff"
          transparent
          opacity={0.4}
          emissive="#ffffff"
          emissiveIntensity={0.5}
        />
      </mesh>
      {/* Outer aura */}
      <mesh ref={outerRef}>
        <sphereGeometry args={[2.5, 32, 32]} />
        <meshStandardMaterial
          color={color}
          transparent
          opacity={0.15}
          emissive={color}
          emissiveIntensity={0.3}
          side={THREE.DoubleSide}
        />
      </mesh>
    </Float>
  );
}

function AuraScene({ color, intensity }: { color: string; intensity: number }) {
  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[5, 5, 5]} intensity={1} color={color} />
      <pointLight position={[-5, -5, 5]} intensity={0.5} color="#ffffff" />
      <AuraOrb3D color={color} intensity={intensity} />
      <Sparkles count={150} scale={10} size={3} speed={1} opacity={0.8} color={color} />
    </>
  );
}



// ===== 5-AXIS RADAR CHART =====
function AxisRadar({ axes }: { axes: Record<AuraAxis, number> }) {
  const centerX = 150;
  const centerY = 150;
  const maxRadius = 110;

  const axisOrder: AuraAxis[] = ["presence", "composure", "fluidity", "desperation", "fumble"];
  const axisLabels = ["Presence (α)", "Composure (β)", "Fluidity (γ)", "Desperation (δ)", "Fumble (φ)"];
  const axisColors = ["#00ffff", "#a855f7", "#10b981", "#f59e0b", "#ef4444"];

  const normalizedAxes = axisOrder.map((axis, i) => {
    const raw = axes[axis] || 0;
    const isNegative = axis === "desperation" || axis === "fumble";
    const normalized = isNegative
      ? Math.min(100, Math.max(0, 50 - raw / 2))
      : Math.min(100, Math.max(0, 50 + raw / 2));
    return normalized;
  });

  const points = normalizedAxes.map((value, i) => {
    const angle = (i / axisOrder.length) * Math.PI * 2 - Math.PI / 2;
    const radius = (value / 100) * maxRadius;
    return {
      x: centerX + Math.cos(angle) * radius,
      y: centerY + Math.sin(angle) * radius,
      labelX: centerX + Math.cos(angle) * (maxRadius + 30),
      labelY: centerY + Math.sin(angle) * (maxRadius + 30),
      value,
    };
  });

  const polygonPoints = points.map((p) => `${p.x},${p.y}`).join(" ");
  const gridLevels = [0.25, 0.5, 0.75, 1];

  return (
    <div className="relative">
      <svg viewBox="0 0 300 300" className="w-full h-full max-w-sm mx-auto">
        {/* Grid */}
        {gridLevels.map((level) => (
          <polygon
            key={level}
            points={axisOrder
              .map((_, i) => {
                const angle = (i / axisOrder.length) * Math.PI * 2 - Math.PI / 2;
                const r = maxRadius * level;
                return `${centerX + Math.cos(angle) * r},${centerY + Math.sin(angle) * r}`;
              })
              .join(" ")}
            fill="none"
            stroke="rgba(255,255,255,0.1)"
            strokeWidth="1"
          />
        ))}

        {/* Axis lines */}
        {axisOrder.map((_, i) => {
          const angle = (i / axisOrder.length) * Math.PI * 2 - Math.PI / 2;
          return (
            <line
              key={i}
              x1={centerX}
              y1={centerY}
              x2={centerX + Math.cos(angle) * maxRadius}
              y2={centerY + Math.sin(angle) * maxRadius}
              stroke="rgba(255,255,255,0.1)"
              strokeWidth="1"
            />
          );
        })}

        {/* Data polygon */}
        <polygon
          points={polygonPoints}
          fill="url(#radarGradient)"
          stroke="rgba(0,255,255,0.8)"
          strokeWidth="2"
        />

        {/* Data points */}
        {points.map((p, i) => (
          <circle
            key={i}
            cx={p.x}
            cy={p.y}
            r="6"
            fill={axisColors[i]}
            stroke="white"
            strokeWidth="2"
          />
        ))}

        {/* Labels */}
        {points.map((p, i) => (
          <g key={`label-${i}`}>
            <text
              x={p.labelX}
              y={p.labelY}
              textAnchor="middle"
              dominantBaseline="middle"
              fill="white"
              fontSize="8"
              fontWeight="600"
            >
              {axisLabels[i]}
            </text>
            <text
              x={p.labelX}
              y={p.labelY + 12}
              textAnchor="middle"
              dominantBaseline="middle"
              fill={axisColors[i]}
              fontSize="10"
              fontWeight="bold"
            >
              {Math.round(p.value)}%
            </text>
          </g>
        ))}

        <defs>
          <linearGradient id="radarGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00ffff" stopOpacity="0.3" />
            <stop offset="50%" stopColor="#a855f7" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#10b981" stopOpacity="0.3" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

// ===== AURA VELOCITY LINE GRAPH =====
function AuraVelocityGraph({ velocity }: { velocity: number[] }) {
  const maxScore = Math.max(...velocity, 1);
  const minScore = Math.min(...velocity, 0);
  const range = maxScore - minScore || 1;

  const width = 600;
  const height = 200;
  const padding = 40;

  const points = velocity.map((score, i) => ({
    x: padding + (i / (velocity.length - 1)) * (width - padding * 2),
    y: padding + ((maxScore - score) / range) * (height - padding * 2),
  }));

  const linePath = points.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ");

  return (
    <div className="w-full overflow-x-auto">
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto">
        {/* Grid lines */}
        {[0, 0.25, 0.5, 0.75, 1].map((level) => (
          <line
            key={level}
            x1={padding}
            y1={padding + level * (height - padding * 2)}
            x2={width - padding}
            y2={padding + level * (height - padding * 2)}
            stroke="rgba(255,255,255,0.05)"
            strokeWidth="1"
          />
        ))}

        {/* Zero line */}
        <line
          x1={padding}
          y1={padding + (maxScore / range) * (height - padding * 2)}
          x2={width - padding}
          y2={padding + (maxScore / range) * (height - padding * 2)}
          stroke="rgba(255,255,255,0.2)"
          strokeWidth="1"
          strokeDasharray="4"
        />

        {/* Gradient fill */}
        <defs>
          <linearGradient id="velocityGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#00ffff" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#00ffff" stopOpacity="0" />
          </linearGradient>
        </defs>

        <path
          d={`${linePath} L ${points[points.length - 1].x} ${height - padding} L ${points[0].x} ${height - padding} Z`}
          fill="url(#velocityGradient)"
        />

        {/* Line */}
        <path d={linePath} fill="none" stroke="#00ffff" strokeWidth="2" />

        {/* Data points */}
        {points.map((p, i) => (
          <circle
            key={i}
            cx={p.x}
            cy={p.y}
            r="3"
            fill="#00ffff"
            stroke="white"
            strokeWidth="1"
          />
        ))}

        {/* Axis labels */}
        <text x={padding} y={height - 10} fill="rgba(255,255,255,0.3)" fontSize="10">
          Q1
        </text>
        <text x={width - padding - 10} y={height - 10} fill="rgba(255,255,255,0.3)" fontSize="10">
          Q50
        </text>
        <text x={5} y={padding + 5} fill="rgba(255,255,255,0.3)" fontSize="10">
          {Math.round(maxScore)}
        </text>
        <text x={5} y={height - padding + 5} fill="rgba(255,255,255,0.3)" fontSize="10">
          {Math.round(minScore)}
        </text>
      </svg>
    </div>
  );
}

// ===== POWER LEVEL METER =====
function PowerLevelMeter({ score, tier }: { score: number; tier: AuraTier }) {
  const tierInfo = TIERS[tier];
  const normalizedScore = Math.min(100, Math.max(0, (score + 5000) / 23000 * 100));
  
  return (
    <div className="relative">
      <div className="h-8 bg-white/5 rounded-full overflow-hidden border border-white/10">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${normalizedScore}%` }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="h-full rounded-full relative overflow-hidden"
          style={{
            background: `linear-gradient(90deg, ${tierInfo.color}, white, ${tierInfo.color})`,
            backgroundSize: "200% 100%",
            animation: "shimmer 3s linear infinite",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
        </motion.div>
      </div>
      <div className="flex justify-between mt-2">
        <span className="text-xs text-white/40">NOOB</span>
        <span className="text-xs text-white/40">ULTIMATE BEAST</span>
      </div>
    </div>
  );
}

// ===== TRUTH MATRIX TABLE =====
function TruthMatrixTable({ truthMatrix }: { truthMatrix: TruthMatrixEntry[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-white/10">
            <th className="text-left py-3 px-4 text-white/50 font-semibold">Q#</th>
            <th className="text-left py-3 px-4 text-white/50 font-semibold">Response Time</th>
            <th className="text-left py-3 px-4 text-white/50 font-semibold">Instinct Velocity</th>
            <th className="text-left py-3 px-4 text-white/50 font-semibold">Consistent</th>
            <th className="text-left py-3 px-4 text-white/50 font-semibold">Honeypot</th>
          </tr>
        </thead>
        <tbody>
          {truthMatrix.slice(0, 10).map((entry, i) => (
            <motion.tr
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className="border-b border-white/5 hover:bg-white/5 transition-colors"
            >
              <td className="py-3 px-4 font-mono text-white/70">Q{entry.questionId}</td>
              <td className="py-3 px-4 font-mono text-cyan-400">{entry.responseTimeMs}ms</td>
              <td className="py-3 px-4 font-mono text-purple-400">{entry.instinctVelocity.toFixed(1)}</td>
              <td className="py-3 px-4">
                {entry.isConsistent ? (
                  <span className="text-green-400">✓</span>
                ) : (
                  <span className="text-red-400">✗</span>
                )}
              </td>
              <td className="py-3 px-4">
                {entry.honeypotTriggered ? (
                  <span className="text-yellow-400">⚠️</span>
                ) : (
                  <span className="text-white/30">—</span>
                )}
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>
      {truthMatrix.length > 10 && (
        <p className="text-center text-white/40 text-sm mt-4">
          Showing 10 of {truthMatrix.length} entries
        </p>
      )}
    </div>
  );
}

// ===== MAIN RESULTS DASHBOARD =====
export function AuraResultsDashboard({
  score,
  tier,
  axes,
  breakdown,
  truthMatrix,
  responsePattern,
  auraVelocity,
  onRestart,
}: ResultsProps) {
  const tierInfo = TIERS[tier];

  // Truth score calculation
  const truthScore = truthMatrix.length > 0
    ? truthMatrix.filter((t) => t.isConsistent).length / truthMatrix.length * 100
    : 0;
  const honeypotTriggers = truthMatrix.filter((t) => t.honeypotTriggered).length;

  // Response time stats
  const avgResponseTime = truthMatrix.length > 0
    ? truthMatrix.reduce((sum, t) => sum + t.responseTimeMs, 0) / truthMatrix.length
    : 0;
  const fastestResponse = truthMatrix.length > 0
    ? Math.min(...truthMatrix.map((t) => t.responseTimeMs))
    : 0;
  const slowestResponse = truthMatrix.length > 0
    ? Math.max(...truthMatrix.map((t) => t.responseTimeMs))
    : 0;

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.3 },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-8 max-w-6xl mx-auto px-4"
    >
      {/* Tier Header with Anime Character */}
      <motion.div variants={item} className="text-center">
        <motion.div
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full border-2 border-cyan-400/50 bg-cyan-400/10 mb-6"
          animate={{ 
            boxShadow: [
              "0 0 20px rgba(0, 255, 255, 0.3)",
              "0 0 40px rgba(0, 255, 255, 0.6)",
              "0 0 20px rgba(0, 255, 255, 0.3)",
            ]
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <Target className="w-5 h-5 text-cyan-400" />
          <span className="text-sm font-bold text-cyan-400 tracking-wider">
            ⚔️ PSYCHOMETRIC EVALUATION COMPLETE ⚔️
          </span>
        </motion.div>

        <div className="flex flex-col md:flex-row items-center justify-center gap-8 mb-8">
          {/* Anime character */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.5 }}
          >
            <AnimeCharacter tier={tier} size={180} />
          </motion.div>
          
          <div className="text-center md:text-left">
            <h1 className="text-5xl md:text-8xl font-black mb-4">
              <span className="text-6xl mr-4">{tierInfo.emoji}</span>
              <span
                className="text-transparent bg-clip-text"
                style={{
                  backgroundImage: `linear-gradient(135deg, ${tierInfo.color}, white)`,
                }}
              >
                {tierInfo.name}
              </span>
            </h1>
            <p className="text-xl text-white/60 max-w-2xl leading-relaxed mb-4">
              {tierInfo.description}
            </p>
            <div className="inline-flex items-center gap-4 px-8 py-4 rounded-2xl glass">
              <span className="text-sm text-white/50 uppercase tracking-wider">Final Score</span>
              <motion.span
                className="text-4xl font-black"
                style={{ color: tierInfo.color }}
                animate={{ 
                  textShadow: [
                    `0 0 10px ${tierInfo.color}50`,
                    `0 0 30px ${tierInfo.color}80`,
                    `0 0 10px ${tierInfo.color}50`,
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {score.toLocaleString()}
              </motion.span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Power Level Meter */}
      <motion.div variants={item}>
        <h3 className="text-2xl font-bold text-center mb-6 flex items-center justify-center gap-3">
          <Flame className="w-6 h-6 text-orange-400" />
          Power Level Assessment
        </h3>
        <div className="glass rounded-2xl p-6">
          <PowerLevelMeter score={score} tier={tier} />
        </div>
      </motion.div>

      {/* 3D Aura Orb */}
      <motion.div variants={item} className="flex justify-center">
        <div className="w-80 h-80 rounded-full overflow-hidden glass">
          <CanvasErrorBoundary>
            <Canvas
              camera={{ position: [0, 0, 5], fov: 50 }}
              dpr={[1, 1.5]}
              gl={{ antialias: true, alpha: true }}
              onCreated={({ gl }) => {
                gl.setClearColor(0x000000, 0);
              }}
            >
              <Suspense fallback={null}>
                <AuraScene
                  color={tierInfo.color}
                  intensity={Math.min(Math.abs(score) / 10000, 1)}
                />
              </Suspense>
            </Canvas>
          </CanvasErrorBoundary>
        </div>
      </motion.div>

      {/* 5-Axis Radar */}
      <motion.div variants={item}>
        <h3 className="text-2xl font-bold text-center mb-6 flex items-center justify-center gap-3">
          <Brain className="w-6 h-6 text-purple-400" />
          5-Axis Aura Vector
        </h3>
        <div className="glass rounded-2xl p-6">
          <AxisRadar axes={axes} />
        </div>
      </motion.div>

      {/* Expanded Stats Grid */}
      <motion.div variants={item} className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          {
            icon: <Shield className="w-6 h-6" />,
            label: "Truth Score",
            value: `${Math.round(truthScore)}%`,
            color: "#10b981",
            description: "Consistency rating",
          },
          {
            icon: <AlertTriangle className="w-6 h-6" />,
            label: "Honeypots Caught",
            value: `${honeypotTriggers}`,
            color: "#f59e0b",
            description: "Traps detected",
          },
          {
            icon: <Zap className="w-6 h-6" />,
            label: "Avg Response",
            value: `${Math.round(avgResponseTime)}ms`,
            color: "#06b6d4",
            description: "Reaction speed",
          },
          {
            icon: <Clock className="w-6 h-6" />,
            label: "Fastest Response",
            value: `${fastestResponse}ms`,
            color: "#a855f7",
            description: "Peak performance",
          },
        ].map((stat, i) => (
          <motion.div
            key={i}
            className="glass rounded-xl p-5 text-center group"
            whileHover={{ y: -5, scale: 1.03 }}
          >
            <div
              className="w-12 h-12 rounded-full mx-auto mb-3 flex items-center justify-center group-hover:scale-110 transition-transform"
              style={{ backgroundColor: `${stat.color}20`, color: stat.color }}
            >
              {stat.icon}
            </div>
            <p className="text-xs text-white/50 mb-1">{stat.label}</p>
            <p className="text-xl font-bold text-white/90">{stat.value}</p>
            <p className="text-xs text-white/40 mt-1">{stat.description}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Aura Velocity Graph */}
      <motion.div variants={item}>
        <h3 className="text-2xl font-bold text-center mb-6 flex items-center justify-center gap-3">
          <TrendingUp className="w-6 h-6 text-cyan-400" />
          Aura Velocity Journey
        </h3>
        <div className="glass rounded-2xl p-6">
          <AuraVelocityGraph velocity={auraVelocity} />
        </div>
      </motion.div>

      {/* Truth Matrix Table */}
      <motion.div variants={item}>
        <h3 className="text-2xl font-bold text-center mb-6 flex items-center justify-center gap-3">
          <Heart className="w-6 h-6 text-pink-400" />
          Truth Matrix Analysis
        </h3>
        <div className="glass rounded-2xl p-6">
          <TruthMatrixTable truthMatrix={truthMatrix} />
        </div>
      </motion.div>

      {/* Score Breakdown */}
      <motion.div variants={item}>
        <h3 className="text-2xl font-bold text-center mb-6 flex items-center justify-center gap-3">
          <Trophy className="w-6 h-6 text-yellow-400" />
          Score Breakdown
        </h3>
        <div className="glass rounded-2xl p-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 rounded-xl bg-cyan-500/10 border border-cyan-500/20">
              <p className="text-sm text-cyan-400 mb-1">Presence (α)</p>
              <p className="text-2xl font-bold text-white">+{Math.round(breakdown.presenceBonus)}</p>
            </div>
            <div className="text-center p-4 rounded-xl bg-purple-500/10 border border-purple-500/20">
              <p className="text-sm text-purple-400 mb-1">Composure (β)</p>
              <p className="text-2xl font-bold text-white">+{Math.round(breakdown.composureBonus)}</p>
            </div>
            <div className="text-center p-4 rounded-xl bg-green-500/10 border border-green-500/20">
              <p className="text-sm text-green-400 mb-1">Fluidity (γ)</p>
              <p className="text-2xl font-bold text-white">+{Math.round(breakdown.fluidityBonus)}</p>
            </div>
            <div className="text-center p-4 rounded-xl bg-amber-500/10 border border-amber-500/20">
              <p className="text-sm text-amber-400 mb-1">Streak Multiplier</p>
              <p className="text-2xl font-bold text-white">×{breakdown.streakMultiplier.toFixed(2)}</p>
            </div>
          </div>
          <div className="mt-4 p-4 rounded-xl bg-red-500/10 border border-red-500/20">
            <div className="flex justify-between items-center">
              <span className="text-sm text-red-400">Inauthenticity Tax</span>
              <span className="text-lg font-bold text-red-400">-{Math.round(breakdown.inauthenticityTax)}</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Narrative */}
      <motion.div variants={item} className="glass-strong rounded-2xl p-8 text-center">
        <div className="text-6xl mb-4">{tierInfo.emoji}</div>
        <h3 className="text-3xl font-bold mb-4 flex items-center justify-center gap-3">
          <Crown className="w-8 h-8 text-yellow-400" />
          Your Aura Narrative
        </h3>
        <p className="text-white/70 leading-relaxed max-w-3xl mx-auto italic text-lg">
          &ldquo;{tierInfo.narrative}&rdquo;
        </p>
      </motion.div>

      {/* Response Pattern */}
      <motion.div variants={item} className="glass rounded-2xl p-8 text-center">
        <div className="text-5xl mb-4">{responsePattern.icon}</div>
        <h4 className="text-2xl font-bold text-white/90 mb-3 capitalize">
          {responsePattern.pattern} Response Pattern
        </h4>
        <p className="text-lg text-white/60 max-w-lg mx-auto">
          {responsePattern.description}
        </p>
      </motion.div>

      {/* Action Buttons */}
      <motion.div
        variants={item}
        className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 pb-8"
      >
        <motion.button
          onClick={onRestart}
          className="px-10 py-5 rounded-2xl font-bold text-lg text-white bg-gradient-to-r from-orange-500 to-red-500 inline-flex items-center gap-3 border-2 border-orange-400/50"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Retake the aura test"
        >
          <RotateCcw className="w-6 h-6" />
          Retake Test
        </motion.button>

        <motion.button
          onClick={() => {
            const data = JSON.stringify({ score, tier, axes, breakdown }, null, 2);
            const blob = new Blob([data], { type: "application/json" });
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = "aura-result.json";
            a.click();
            URL.revokeObjectURL(url);
          }}
          className="glass px-8 py-5 rounded-2xl font-semibold text-white/70 hover:text-white inline-flex items-center gap-3 transition-colors border border-white/10"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Export aura results as JSON"
        >
          <Download className="w-6 h-6" />
          Export Results
        </motion.button>

        <motion.button
          onClick={async () => {
            const shareData = {
              title: `I'm a ${tierInfo.name}!`,
              text: `My aura score: ${score.toLocaleString()}. I'm a ${tierInfo.emoji} ${tierInfo.name}! Take the test yourself!`,
              url: window.location.href,
            };
            try {
              if (navigator.share) {
                await navigator.share(shareData);
              } else {
                await navigator.clipboard.writeText(
                  `${shareData.text}\n${shareData.url}`
                );
                alert("Result copied to clipboard!");
              }
            } catch {
              try {
                await navigator.clipboard.writeText(window.location.href);
                alert("Link copied to clipboard!");
              } catch {
                // Final fallback
              }
            }
          }}
          className="glass px-8 py-5 rounded-2xl font-semibold text-white/70 hover:text-white inline-flex items-center gap-3 transition-colors border border-white/10"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Share your aura result"
        >
          <Share2 className="w-6 h-6" />
          Share
        </motion.button>
      </motion.div>
    </motion.div>
  );
}
