// ===== AURA INTELLIGENCE REASONING ENGINE =====
// Turns the raw exam telemetry into a readable "case file": why the
// score landed where it did, which traits dominate, and what the
// psychometric fingerprint says about the subject.

import {
  AuraAxis,
  AuraTier,
  AuraScoreBreakdown,
  TruthMatrixEntry,
  TIERS,
} from "./questions-new";

export type StoredAnswer = {
  questionId: number;
  optionId: string;
  responseTimeMs: number;
};

export type ReasoningEvidence = {
  type: "positive" | "negative" | "neutral";
  title: string;
  detail: string;
};

export type DominantTrait = {
  name: string;
  emoji: string;
  summary: string;
};

export type AuraReasoning = {
  intelligence: number; // 0-100
  intelligenceLabel: string;
  dominantTrait: DominantTrait;
  verdict: string;
  evidence: ReasoningEvidence[];
  countermeasure: string;
};

export type ReasoningInput = {
  score: number;
  tier: AuraTier;
  axes: Record<AuraAxis, number>;
  breakdown: AuraScoreBreakdown;
  truthMatrix: TruthMatrixEntry[];
  responsePattern: { pattern: string; description: string; icon: string };
  answers?: StoredAnswer[];
  bestStreak?: number;
  curveballCount?: number;
};

const AXIS_META: Record<
  AuraAxis,
  { name: string; emoji: string; high: string; low: string }
> = {
  presence: {
    name: "PRESENCE",
    emoji: "♜",
    high: "command of the room is instinctive, not rehearsed",
    low: "silently yields space instead of taking it",
  },
  composure: {
    name: "COMPOSURE",
    emoji: "♞",
    high: "stays steady while the world catches fire",
    low: "leaks panic the second the spotlight lands",
  },
  fluidity: {
    name: "FLUIDITY",
    emoji: "♝",
    high: "conversations bend around your timing",
    low: "the recovery shot always arrives a beat too late",
  },
  desperation: {
    name: "DESPERATION",
    emoji: "♟",
    high: "tries visibly hard to look effortless",
    low: "moves without needing applause",
  },
  fumble: {
    name: "FUMBLE COEFFICIENT",
    emoji: "♙",
    high: "objects and social cues fall apart in your hands",
    low: "catastrophes land on other people, never on you",
  },
};

const PATTERN_PLAY: Record<string, string> = {
  instant: "answers before the question finishes leaving the screen",
  quick: "commits in under three seconds and rarely flinches",
  deliberate: "pauses to weigh optics before every move",
  hesitant: "reads the room twice before risking a response",
  chaotic: "scrambles between lightning and paralyzed timing",
};

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
}

function pickTrait(axes: Record<AuraAxis, number>): DominantTrait {
  const positives: AuraAxis[] = ["presence", "composure", "fluidity"];
  const top = positives.reduce((best, axis) =>
    Math.abs(axes[axis]) > Math.abs(axes[best]) ? axis : best
  );
  const negatives: AuraAxis[] = ["desperation", "fumble"];
  const worst = negatives.reduce((best, axis) =>
    Math.abs(axes[axis]) > Math.abs(axes[best]) ? axis : best
  );

  const topScore = axes[top];
  const worstScore = axes[worst];

  if (Math.abs(topScore) >= Math.abs(worstScore)) {
    const meta = AXIS_META[top];
    return {
      name: meta.name,
      emoji: meta.emoji,
      summary: meta.high,
    };
  }
  const meta = AXIS_META[worst];
  return {
    name: meta.name,
    emoji: meta.emoji,
    summary: meta.low,
  };
}

function buildEvidence(input: ReasoningInput): ReasoningEvidence[] {
  const { truthMatrix, breakdown, responsePattern, answers, bestStreak } = input;
  const evidence: ReasoningEvidence[] = [];

  const total = truthMatrix.length;
  const consistent = truthMatrix.filter((t) => t.isConsistent).length;
  const consistencyPct = total > 0 ? (consistent / total) * 100 : 100;

  evidence.push({
    type: consistencyPct >= 80 ? "positive" : "negative",
    title: "CONSISTENCY",
    detail: `${Math.round(consistencyPct)}% of answers survived the cross-reference engine — ${
      consistencyPct >= 80 ? "your story holds together under pressure" : "the narrative cracked at least once"
    }.`,
  });

  const honeypots = truthMatrix.filter((t) => t.honeypotTriggered).length;
  if (honeypots > 0) {
    evidence.push({
      type: "negative",
      title: "EGO TRAPS",
      detail: `Bit on ${honeypots} trap option${honeypots > 1 ? "s" : ""} — the system baited the performative answer and you took it.`,
    });
  } else {
    evidence.push({
      type: "positive",
      title: "EGO TRAPS",
      detail: "Dodged every honeypot. The trap options were set and you refused the bait.",
    });
  }

  const avgTime =
    total > 0 ? truthMatrix.reduce((s, t) => s + t.responseTimeMs, 0) / total : 0;
  const fastest =
    total > 0 ? Math.min(...truthMatrix.map((t) => t.responseTimeMs)) : 0;
  evidence.push({
    type: avgTime < 3000 ? "positive" : "neutral",
    title: "INSTINCT VELOCITY",
    detail: `Average ${Math.round(avgTime)}ms per answer, fastest ${fastest}ms — ${
      avgTime < 3000 ? "the velocity multiplier worked in your favor" : "slow decisions bled score through the time factor"
    }.`,
  });

  if (breakdown.inauthenticityTax > 0) {
    evidence.push({
      type: "negative",
      title: "INAUTHENTICITY TAX",
      detail: `Burned ${Math.round(breakdown.inauthenticityTax)} points to performative penalties — consistency failures and traps compound exponentially.`,
    });
  }

  if (bestStreak && bestStreak >= 5) {
    evidence.push({
      type: "positive",
      title: "MOMENTUM",
      detail: `Peak streak of ${bestStreak} — the multiplier stacked and carried your score.`,
    });
  }

  const curveballs = (answers ?? []).filter((a) => a.questionId >= 100).length;
  if (curveballs > 0) {
    evidence.push({
      type: "neutral",
      title: "CURVEBALL SURVIVAL",
      detail: `Fielded ${curveballs} curveball${curveballs > 1 ? "s" : ""} with no preparation. The chaos chain tried to break your rhythm.`,
    });
  }

  evidence.push({
    type: "neutral",
    title: "RESPONSE PATTERN",
    detail: responsePattern.description,
  });

  return evidence;
}

function buildVerdict(input: ReasoningInput, trait: DominantTrait): string {
  const tierInfo = TIERS[input.tier];
  const play = PATTERN_PLAY[input.responsePattern.pattern] ?? "moves on instinct";
  const negativity = Math.abs(input.axes.desperation) + Math.abs(input.axes.fumble);
  const tax = input.breakdown.inauthenticityTax;

  const taxClause =
    tax >= 1500
      ? "The inauthenticity tax hit hard enough to reshape the outcome."
      : tax > 0
        ? "A measurable inauthenticity tax was applied."
        : "No inauthenticity tax was applied — the reading stayed clean.";

  const negativityClause =
    negativity >= 300
      ? "The negative axes ran hot, dragging the sum down."
      : negativity >= 150
        ? "Desperation and fumble were present but contained."
        : "Desperation and fumble stayed low, letting the positives run."

  return `The engine records a subject that ${play}. Dominant fingerprint: ${trait.name} (${trait.emoji}) — ${trait.summary}. ${negativityClause} ${taxClause} Final classification: ${tierInfo.emoji} ${tierInfo.name} at ${input.score.toLocaleString()}.`;
}

function buildCountermeasure(input: ReasoningInput, trait: DominantTrait): string {
  const { axes, breakdown } = input;
  const positives: AuraAxis[] = ["presence", "composure", "fluidity"];
  const weakestPositive = positives.reduce((best, axis) =>
    axes[axis] < axes[best] ? axis : best
  );

  if (trait.name === "DESPERATION" || trait.name === "FUMBLE COEFFICIENT") {
    return `Stop auditioning. ${trait.emoji} The data says you perform for the room instead of acting. Slow down the recovery, kill the over-apologizing, and let one clean beat pass before you speak.`;
  }

  if (breakdown.inauthenticityTax > 1000) {
    return "Your answers contradict each other under cross-reference. The engine doesn't care what sounds cool — it cares what stays consistent. Pick a story and commit to it every time.";
  }

  switch (weakestPositive) {
    case "presence":
      return "Raise your presence: take the space, hold eye contact, let silence sit. The engine rewards people who stop shrinking.";
    case "composure":
      return "Train composure: your instincts are fine, but you leak panic under time pressure. Breathe before you act and the fumbles stop costing points.";
    default:
      return "Sharpen your fluidity: the recovery beats are late. Have the line ready before the situation demands it, so it looks like timing instead of recovery.";
  }
}

export function generateAuraReasoning(input: ReasoningInput): AuraReasoning {
  const trait = pickTrait(input.axes);

  const total = input.truthMatrix.length || 1;
  const consistent = input.truthMatrix.filter((t) => t.isConsistent).length;
  const consistencyPct = (consistent / total) * 100;
  const honeypots = input.truthMatrix.filter((t) => t.honeypotTriggered).length;
  const avgTime =
    input.truthMatrix.length > 0
      ? input.truthMatrix.reduce((s, t) => s + t.responseTimeMs, 0) / input.truthMatrix.length
      : 5000;
  const negativity = Math.abs(input.axes.desperation) + Math.abs(input.axes.fumble);

  const consistencyScore = clamp(consistencyPct * 0.4, 0, 40);
  const honeypotScore = clamp(20 - honeypots * 6, 0, 20);
  const speedScore =
    avgTime < 1500 ? 20 : avgTime < 3000 ? 15 : avgTime < 5000 ? 10 : 5;
  const negativityScore = clamp(20 - negativity / 25, 0, 20);

  const intelligence = Math.round(
    clamp(consistencyScore + honeypotScore + speedScore + negativityScore, 0, 100)
  );
  const intelligenceLabel =
    intelligence >= 85
      ? "SIGNAL-CLEAN"
      : intelligence >= 70
        ? "HIGH-SIGNAL"
        : intelligence >= 50
          ? "NOISY"
          : "CORRUPTED";

  return {
    intelligence,
    intelligenceLabel,
    dominantTrait: trait,
    verdict: buildVerdict(input, trait),
    evidence: buildEvidence(input),
    countermeasure: buildCountermeasure(input, trait),
  };
}
