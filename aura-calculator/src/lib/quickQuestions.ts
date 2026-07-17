// ===== QUICK AURA CHECK =====
// 10 powerful questions that reveal your aura fast

export type QuickCharacter = {
  id: string;
  name: string;
  title: string;
  emoji: string;
  tagline: string;
  description: string;
  personality: string[];
  gradient: string;
  avatarBg: string;
  accentColor: string;
  expression: string;
  scoreRange: { min: number; max: number };
};

export type QuickQuestion = {
  id: number;
  text: string;
  subtext?: string;
  options: {
    id: string;
    text: string;
    scores: Record<string, number>;
  }[];
};

export const QUICK_CHARACTERS: QuickCharacter[] = [
  {
    id: "the_stoic",
    name: "Kael",
    title: "The Stoic",
    emoji: "\u{1F5FF}",
    tagline: "Unreadable. Untouchable. Unbothered.",
    description: "You walk into rooms and the temperature drops. Not from fear \u2014 from respect. You don't perform confidence; you simply are. Your silence speaks louder than most people's loudest words.",
    personality: ["Calm under pressure", "Rarely rattled", "Speaks only when it matters", "Magnetic presence"],
    gradient: "from-slate-700 via-gray-800 to-slate-900",
    avatarBg: "bg-gradient-to-br from-slate-600 to-gray-800",
    accentColor: "#94a3b8",
    expression: "stoic",
    scoreRange: { min: 80, max: 100 },
  },
  {
    id: "the_chaos_gremlin",
    name: "Zara",
    title: "The Chaos Gremlin",
    emoji: "\u{1F608}",
    tagline: "Rules? Where we're going, we don't need rules.",
    description: "You're the human equivalent of a mic drop. You thrive in chaos, turn awkward moments into comedy gold, and somehow always land on your feet. People either love you or are deeply confused by you.",
    personality: ["Unpredictable", "Magnetic energy", "Turns disaster into comedy", "Zero filter"],
    gradient: "from-fuchsia-500 via-pink-500 to-rose-500",
    avatarBg: "bg-gradient-to-br from-fuchsia-500 to-pink-600",
    accentColor: "#ec4899",
    expression: "chaos",
    scoreRange: { min: 60, max: 79 },
  },
  {
    id: "the_smooth_operator",
    name: "Dante",
    title: "The Smooth Operator",
    emoji: "\u{1F576}\uFE0F",
    tagline: "Everything looks better when I do it.",
    description: "You've got that effortless cool that can't be manufactured. You handle social situations like a jazz musician handles a saxophone \u2014 improvised, but flawless. People watch you just to see how it's done.",
    personality: ["Effortlessly cool", "Social butterfly", "Always composed", "Quick-witted"],
    gradient: "from-violet-600 via-purple-500 to-indigo-500",
    avatarBg: "bg-gradient-to-br from-violet-500 to-indigo-600",
    accentColor: "#8b5cf6",
    expression: "smooth",
    scoreRange: { min: 45, max: 59 },
  },
  {
    id: "the_sweet_disaster",
    name: "Luna",
    title: "The Sweet Disaster",
    emoji: "\u{1F338}",
    tagline: "I'm not clumsy, I'm just... expressive.",
    description: "You're the person who apologizes to furniture and trips over nothing. But here's the thing \u2014 your energy is so pure that people can't help but root for you. Your chaos is adorable, not destructive.",
    personality: ["Endearingly clumsy", "Pure-hearted", "Apologizes to objects", "Unintentionally hilarious"],
    gradient: "from-pink-400 via-rose-300 to-pink-200",
    avatarBg: "bg-gradient-to-br from-pink-400 to-rose-300",
    accentColor: "#f472b6",
    expression: "sweet",
    scoreRange: { min: 25, max: 44 },
  },
  {
    id: "the_ghost",
    name: "Rei",
    title: "The Ghost",
    emoji: "\u{1F47B}",
    tagline: "You can't embarrass someone who doesn't exist.",
    description: "You've mastered the art of vanishing mid-conversation. Social situations? You've already left. Eye contact? What's that? You're not antisocial \u2014 you're selectively invisible, and honestly, it's kind of iconic.",
    personality: ["Master of escape", "Avoids eye contact", "Social ninja", "Existential vibes"],
    gradient: "from-cyan-400 via-blue-400 to-indigo-400",
    avatarBg: "bg-gradient-to-br from-cyan-400 to-blue-500",
    accentColor: "#22d3ee",
    expression: "ghost",
    scoreRange: { min: 10, max: 24 },
  },
  {
    id: "the_black_hole",
    name: "Brutus",
    title: "The Black Hole",
    emoji: "\u{1F573}\uFE0F",
    tagline: "I came, I saw, I ruined the vibe.",
    description: "You're an aura vacuum. You walk into a party and somehow the music gets quieter. Not because you're bad \u2014 because your energy is so overwhelming that the room needs a minute to recalibrate. It's a gift, technically.",
    personality: ["Room-clearing presence", "Obliviously powerful", "Energy vampire (affectionate)", "Unstoppable force"],
    gradient: "from-red-600 via-orange-500 to-yellow-500",
    avatarBg: "bg-gradient-to-br from-red-500 to-orange-600",
    accentColor: "#f97316",
    expression: "blackhole",
    scoreRange: { min: 0, max: 9 },
  },
];

export const QUICK_QUESTIONS: QuickQuestion[] = [
  {
    id: 1,
    text: "You walk into a room full of strangers. What's your first move?",
    subtext: "Be honest. No one's watching.",
    options: [
      { id: "1a", text: "Find the corner and become furniture", scores: { the_ghost: 3, the_stoic: 2, the_sweet_disaster: 1 } },
      { id: "1b", text: "Make eye contact with the most confident person and smile", scores: { the_smooth_operator: 3, the_chaos_gremlin: 2, the_stoic: 1 } },
      { id: "1c", text: "Immediately do something weird to break the tension", scores: { the_chaos_gremlin: 3, the_sweet_disaster: 2, the_smooth_operator: 1 } },
      { id: "1d", text: "Stand still and let the room come to you", scores: { the_stoic: 3, the_smooth_operator: 2, the_black_hole: 1 } },
    ],
  },
  {
    id: 2,
    text: "Your phone rings with the most embarrassing ringtone during a meeting. What do you do?",
    subtext: "This determines everything.",
    options: [
      { id: "2a", text: "Answer it like you're taking a business call", scores: { the_stoic: 3, the_smooth_operator: 2, the_black_hole: 1 } },
      { id: "2b", text: "Let it ring and pretend it's not yours", scores: { the_ghost: 3, the_sweet_disaster: 2, the_stoic: 1 } },
      { id: "2c", text: "Answer it with 'This is the Matrix. I have to go.'", scores: { the_chaos_gremlin: 3, the_smooth_operator: 2, the_stoic: 1 } },
      { id: "2d", text: "Mute it while making eye contact with everyone", scores: { the_sweet_disaster: 2, the_stoic: 2, the_ghost: 1 } },
    ],
  },
  {
    id: 3,
    text: "Someone roasts you in front of 20 people. Your comeback?",
    subtext: "Choose wisely.",
    options: [
      { id: "3a", text: "Take it with a grin and fire back harder", scores: { the_chaos_gremlin: 3, the_smooth_operator: 2, the_stoic: 1 } },
      { id: "3b", text: "Nod slowly and say 'Interesting' then walk away", scores: { the_stoic: 3, the_ghost: 2, the_smooth_operator: 1 } },
      { id: "3c", text: "Laugh so hard they forget what they said", scores: { the_chaos_gremlin: 2, the_smooth_operator: 2, the_sweet_disaster: 1 } },
      { id: "3d", text: "Already left the room before they finished", scores: { the_ghost: 3, the_sweet_disaster: 1, the_stoic: 1 } },
    ],
  },
  {
    id: 4,
    text: "You trip going UP the stairs in public. 30 people saw. Recovery?",
    subtext: "This is the moment of truth.",
    options: [
      { id: "4a", text: "Sit down like you meant to rest", scores: { the_chaos_gremlin: 3, the_sweet_disaster: 2, the_smooth_operator: 1 } },
      { id: "4b", text: "Get up and keep going like nothing happened", scores: { the_stoic: 3, the_smooth_operator: 2, the_black_hole: 1 } },
      { id: "4c", text: "Do a pushup to make it look intentional", scores: { the_chaos_gremlin: 2, the_smooth_operator: 2, the_black_hole: 1 } },
      { id: "4d", text: "Check if the stairs are okay", scores: { the_sweet_disaster: 3, the_ghost: 1, the_stoic: 1 } },
    ],
  },
  {
    id: 5,
    text: "Your friend falls in public. Help or laugh?",
    subtext: "Choose one.",
    options: [
      { id: "5a", text: "Laugh first, then help", scores: { the_chaos_gremlin: 3, the_smooth_operator: 1, the_sweet_disaster: 1 } },
      { id: "5b", text: "Help immediately without hesitation", scores: { the_stoic: 2, the_sweet_disaster: 2, the_smooth_operator: 1 } },
      { id: "5c", text: "Pretend you don't know them", scores: { the_ghost: 3, the_chaos_gremlin: 1, the_stoic: 1 } },
      { id: "5d", text: "Film it, help them up, then show them the footage", scores: { the_chaos_gremlin: 2, the_smooth_operator: 2, the_sweet_disaster: 1 } },
    ],
  },
  {
    id: 6,
    text: "You accidentally like someone's old Instagram post from 2019. They saw it. What now?",
    subtext: "The ego trap is real.",
    options: [
      { id: "6a", text: "Like it again and own it", scores: { the_stoic: 3, the_smooth_operator: 2, the_black_hole: 1 } },
      { id: "6b", text: "Delete your account immediately", scores: { the_sweet_disaster: 2, the_ghost: 2, the_stoic: 1 } },
      { id: "6c", text: "Send them a meme about stalking", scores: { the_chaos_gremlin: 3, the_smooth_operator: 1, the_sweet_disaster: 1 } },
      { id: "6d", text: "Pretend it never happened. Gaslight if necessary.", scores: { the_smooth_operator: 2, the_ghost: 2, the_black_hole: 1 } },
    ],
  },
  {
    id: 7,
    text: "You're telling a story and nobody's listening. Mid-sentence, you notice. What do you do?",
    subtext: "This reveals your core energy.",
    options: [
      { id: "7a", text: "Stop talking and walk away", scores: { the_ghost: 3, the_stoic: 2, the_sweet_disaster: 1 } },
      { id: "7b", text: "Make it louder and more dramatic", scores: { the_chaos_gremlin: 3, the_black_hole: 1, the_smooth_operator: 1 } },
      { id: "7c", text: "Say 'anyway' and keep going", scores: { the_stoic: 2, the_smooth_operator: 2, the_sweet_disaster: 1 } },
      { id: "7d", text: "Call someone out directly", scores: { the_black_hole: 2, the_stoic: 2, the_smooth_operator: 1 } },
    ],
  },
  {
    id: 8,
    text: "A bug lands on you. Your first move?",
    subtext: "Instinct only.",
    options: [
      { id: "8a", text: "Flick it off calmly", scores: { the_stoic: 3, the_smooth_operator: 1, the_black_hole: 1 } },
      { id: "8b", text: "Scream and run", scores: { the_sweet_disaster: 3, the_chaos_gremlin: 1, the_ghost: 1 } },
      { id: "8c", text: "Freeze and accept your new friend", scores: { the_sweet_disaster: 2, the_ghost: 2, the_stoic: 1 } },
      { id: "8d", text: "Squish it with zero hesitation", scores: { the_black_hole: 3, the_stoic: 1, the_chaos_gremlin: 1 } },
    ],
  },
  {
    id: 9,
    text: "Someone asks for your honest opinion on their outfit. Quick.",
    subtext: "Your filter is off.",
    options: [
      { id: "9a", text: "Honest and kind", scores: { the_smooth_operator: 3, the_sweet_disaster: 1, the_stoic: 1 } },
      { id: "9b", text: "Lie to be nice", scores: { the_sweet_disaster: 3, the_smooth_operator: 1, the_ghost: 1 } },
      { id: "9c", text: "Brutal honesty", scores: { the_black_hole: 3, the_stoic: 1, the_chaos_gremlin: 1 } },
      { id: "9d", text: "Deflect with humor", scores: { the_chaos_gremlin: 2, the_smooth_operator: 2, the_ghost: 1 } },
    ],
  },
  {
    id: 10,
    text: "Last question. The universe gives you one superpower. What do you choose?",
    subtext: "This reveals your deepest self.",
    options: [
      { id: "10a", text: "Invisibility \u2014 to observe without being seen", scores: { the_ghost: 3, the_stoic: 1, the_smooth_operator: 1 } },
      { id: "10b", text: "Mind reading \u2014 to know what people really think", scores: { the_smooth_operator: 2, the_stoic: 2, the_black_hole: 1 } },
      { id: "10c", text: "Time freeze \u2014 to prepare for every embarrassing moment", scores: { the_sweet_disaster: 3, the_ghost: 1, the_stoic: 1 } },
      { id: "10d", text: "Absolute confidence \u2014 the power to never feel awkward again", scores: { the_black_hole: 2, the_chaos_gremlin: 2, the_smooth_operator: 1 } },
    ],
  },
];
