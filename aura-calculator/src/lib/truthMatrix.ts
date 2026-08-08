// ===== THE TRUTH MATRIX ENGINE =====
// Anti-lie logic with Instinct Velocity and Contextual Memory Cross-References

import {
  AuraAxis,
  AuraScoreBreakdown,
  TruthMatrixEntry,
  ALL_QUESTIONS,
  AuraTier,
} from "./questions-new";

// ===== INSTINCT VELOCITY CALCULATION =====
// Formula: Effective Aura Shift = Base Value × (1.8 / Time taken in seconds)²
export function calculateInstinctVelocity(
  responseTimeMs: number,
  baseValue: number
): number {
  const timeInSeconds = responseTimeMs / 1000;
  const velocity = 1.8 / Math.max(timeInSeconds, 0.1);
  return baseValue * Math.pow(velocity, 2);
}

// ===== CROSS-REFERENCE CONSISTENCY CHECK =====
// Checks if answers are consistent with linked questions
export function checkConsistency(
  currentAnswer: { questionId: number; optionId: string },
  previousAnswers: { questionId: number; optionId: string }[]
): { isConsistent: boolean; penalty: number } {
  const currentQuestion = ALL_QUESTIONS.find(
    (q) => q.id === currentAnswer.questionId
  );

  if (!currentQuestion?.crossRefWith) {
    return { isConsistent: true, penalty: 0 };
  }

  const linkedAnswer = previousAnswers.find(
    (a) => a.questionId === currentQuestion.crossRefWith
  );

  if (!linkedAnswer) {
    return { isConsistent: true, penalty: 0 };
  }

  // Get the narrative tags for both answers
  const currentOption = currentQuestion.options.find(
    (o) => o.id === currentAnswer.optionId
  );
  const linkedQuestion = ALL_QUESTIONS.find(
    (q) => q.id === currentQuestion.crossRefWith
  );
  const linkedOption = linkedQuestion?.options.find(
    (o) => o.id === linkedAnswer.optionId
  );

  if (!currentOption || !linkedOption) {
    return { isConsistent: true, penalty: 0 };
  }

  // Check for contradiction patterns
  const contradictions = [
    // Fearless vs Frozen
    { tags1: ["phone_psychopath", "bless_me", "night_turner"], tags2: ["freeze_frame", "scream_runner", "freezer"], penalty: 500 },
    // Confident vs Desperate
    { tags1: ["own_it", "stone_face", "smooth_recovery"], tags2: ["pretender", "ego_trap", "blame_audience"], penalty: 400 },
    // Honest vs Lying
    { tags1: ["honest_terrible", "brutal_honest"], tags2: ["nice_liar", "automatic_good"], penalty: 300 },
    // Calm vs Panic
    { tags1: ["calm_flicker", "heat_holder", "keep_running"], tags2: ["scream_runner", "heat_dropper", "existential_slip"], penalty: 450 },
  ];

  for (const contradiction of contradictions) {
    const inTags1 =
      contradiction.tags1.includes(currentOption.narrativeTag) ||
      contradiction.tags1.includes(linkedOption.narrativeTag);
    const inTags2 =
      contradiction.tags2.includes(currentOption.narrativeTag) ||
      contradiction.tags2.includes(linkedOption.narrativeTag);

    if (inTags1 && inTags2) {
      return { isConsistent: false, penalty: contradiction.penalty };
    }
  }

  return { isConsistent: true, penalty: 0 };
}

// ===== HONEYPOT DETECTION =====
// Phase 3 trap options that lower score when selected
export function checkHoneypot(optionId: string, questionId: number): {
  triggered: boolean;
  penalty: number;
} {
  const question = ALL_QUESTIONS.find((q) => q.id === questionId);
  if (!question) return { triggered: false, penalty: 0 };

  const option = question.options.find((o) => o.id === optionId);
  if (!option) return { triggered: false, penalty: 0 };

  if (option.isHoneypot) {
    return { triggered: true, penalty: 800 };
  }

  return { triggered: false, penalty: 0 };
}

// ===== CALCULATE AURA SCORE =====
export function calculateAuraScore(
  answers: {
    questionId: number;
    optionId: string;
    responseTimeMs: number;
  }[]
): {
  score: number;
  breakdown: AuraScoreBreakdown;
  truthMatrix: TruthMatrixEntry[];
  tier: AuraTier;
  axes: Record<AuraAxis, number>;
} {
  let presence = 0; // α
  let composure = 0; // β
  let fluidity = 0; // γ
  let desperation = 0; // δ
  let fumble = 0; // φ

  const truthMatrix: TruthMatrixEntry[] = [];
  const previousAnswers: { questionId: number; optionId: string }[] = [];
  let streakMultiplier = 1;
  let consecutiveCorrect = 0;
  let inauthenticityTax = 0;

  for (const answer of answers) {
    const question = ALL_QUESTIONS.find((q) => q.id === answer.questionId);
    if (!question) continue;

    const option = question.options.find((o) => o.id === answer.optionId);
    if (!option) continue;

    // Calculate instinct velocity
    const instinctVelocity = calculateInstinctVelocity(
      answer.responseTimeMs,
      100
    );

    // Check consistency
    const consistency = checkConsistency(answer, previousAnswers);

    // Check honeypot
    const honeypot = checkHoneypot(answer.optionId, answer.questionId);

    // Apply scores
    const timeFactor = Math.min(1.8 / Math.max(answer.responseTimeMs / 1000, 0.1), 3);

    if (option.scores.presence) presence += option.scores.presence * timeFactor;
    if (option.scores.composure) composure += option.scores.composure * timeFactor;
    if (option.scores.fluidity) fluidity += option.scores.fluidity * timeFactor;
    if (option.scores.desperation) desperation += option.scores.desperation * timeFactor;
    if (option.scores.fumble) fumble += option.scores.fumble * timeFactor;

    // Apply penalties
    if (!consistency.isConsistent) {
      inauthenticityTax += consistency.penalty;
      consecutiveCorrect = 0;
    } else {
      consecutiveCorrect++;
      if (consecutiveCorrect >= 3) {
        streakMultiplier = Math.min(1 + consecutiveCorrect * 0.1, 2);
      }
    }

    if (honeypot.triggered) {
      inauthenticityTax += honeypot.penalty;
    }

    // Record truth matrix entry
    truthMatrix.push({
      questionId: answer.questionId,
      responseTimeMs: answer.responseTimeMs,
      instinctVelocity,
      isConsistent: consistency.isConsistent,
      honeypotTriggered: honeypot.triggered,
      auraShift: instinctVelocity - honeypot.penalty - consistency.penalty,
    });

    previousAnswers.push({
      questionId: answer.questionId,
      optionId: answer.optionId,
    });
  }

  // Calculate final score
  // Formula: [(α + β + γ) × Streak Multiplier] − [(δ + φ)² × Inauthenticity Tax]
  const positiveSum = (presence + composure + fluidity) * streakMultiplier;
  const negativeSum = Math.pow(desperation + fumble, 2);
  const finalScore = Math.round(positiveSum - negativeSum * (1 + inauthenticityTax / 1000));

  const breakdown: AuraScoreBreakdown = {
    baseScore: 0,
    presenceBonus: presence,
    composureBonus: composure,
    fluidityBonus: fluidity,
    desperationPenalty: desperation,
    fumblePenalty: fumble,
    streakMultiplier,
    inauthenticityTax,
    finalScore,
  };

  // Determine tier
  const tier = determineTier(finalScore);

  return {
    score: finalScore,
    breakdown,
    truthMatrix,
    tier,
    axes: { presence, composure, fluidity, desperation, fumble },
  };
}

// ===== DETERMINE TIER =====
export function determineTier(score: number): AuraTier {
  if (score >= 18000) return "ultimate_beast";
  if (score >= 10000) return "giga_chad";
  if (score >= 0) return "aura_farmer";
  if (score >= -4000) return "clown";
  return "noob";
}

// ===== GET CURRENT PHASE =====
// Supports both regular questions (1-50) and curveball questions (100+)
export function getCurrentPhase(questionIndex: number): 1 | 2 | 3 | 4 | 5 {
  // For regular questions (indices 0-49), map index to phase
  if (questionIndex < 50) {
    if (questionIndex < 10) return 1;
    if (questionIndex < 20) return 2;
    if (questionIndex < 30) return 3;
    if (questionIndex < 40) return 4;
    return 5;
  }
  // For curveball questions, look up the actual question's phase
  const question = ALL_QUESTIONS.find(q => q.id === questionIndex);
  if (question) return question.phase;
  // Fallback: default to phase 5 for unknown questions
  return 5;
}

// ===== AURA VELOCITY TRACKER =====
// Tracks score changes over time for the line graph
export function trackAuraVelocity(
  answers: {
    questionId: number;
    optionId: string;
    responseTimeMs: number;
  }[]
): number[] {
  const velocityPoints: number[] = [];

  for (let i = 0; i < answers.length; i++) {
    const partialAnswers = answers.slice(0, i + 1);
    const result = calculateAuraScore(partialAnswers);
    velocityPoints.push(result.score);
  }

  return velocityPoints;
}

// ===== RESPONSE PATTERN ANALYSIS =====
export function analyzeResponsePattern(
  answers: { responseTimeMs: number }[]
): {
  pattern: "instant" | "quick" | "deliberate" | "hesitant" | "chaotic";
  description: string;
  icon: string;
} {
  const avgTime =
    answers.reduce((sum, a) => sum + a.responseTimeMs, 0) / answers.length;
  const stdDev = Math.sqrt(
    answers.reduce(
      (sum, a) => sum + Math.pow(a.responseTimeMs - avgTime, 2),
      0
    ) / answers.length
  );

  if (avgTime < 1500 && stdDev < 500) {
    return {
      pattern: "instant",
      description: "Lightning reflexes. You don't think—you act.",
      icon: "\u25C9",
    };
  }
  if (avgTime < 3000) {
    return {
      pattern: "quick",
      description: "Fast and confident. Your instincts are sharp.",
      icon: "\u25C6",
    };
  }
  if (avgTime < 5000) {
    return {
      pattern: "deliberate",
      description: "Thoughtful and measured. You consider before acting.",
      icon: "\u25B2",
    };
  }
  if (avgTime < 8000) {
    return {
      pattern: "hesitant",
      description: "Taking your time. Sometimes too much time.",
      icon: "\u25BC",
    };
  }
  return {
    pattern: "chaotic",
    description: "Erratic timing. Your responses are all over the place.",
    icon: "\u25D0",
  };
}
