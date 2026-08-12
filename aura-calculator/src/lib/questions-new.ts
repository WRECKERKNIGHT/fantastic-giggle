// ===== THE 5-PHASE AURA QUANTIFICATION ENGINE =====
// 50 questions across 5 distinct psychological pressure phases

export type Phase = 1 | 2 | 3 | 4 | 5;

export type PhaseInfo = {
  phase: Phase;
  name: string;
  questions: string; // e.g. "Q1-Q10"
  theme: string;
  description: string;
  timerSeconds?: number; // Phase 5 has 2-second timer
  uiStyle: "default" | "chat" | "glitch" | "spectator" | "kinetic";
};

export const PHASES: Record<Phase, PhaseInfo> = {
  1: {
    phase: 1,
    name: "Physical & Cognitive Spatial Deviation",
    questions: "Q1-Q10",
    theme: "default",
    description: "Tracks your physical coordination and spatial awareness.",
    uiStyle: "default",
  },
  2: {
    phase: 2,
    name: "Verbal Banter & Compression Stress",
    questions: "Q11-Q20",
    theme: "chat",
    description: "Tests your wit and panic speech patterns.",
    uiStyle: "chat",
  },
  3: {
    phase: 3,
    name: "The Ego Trap & Transparency Decay",
    questions: "Q21-Q30",
    theme: "glitch",
    description: "Hunts for try-hard behavior and performative answers.",
    uiStyle: "glitch",
  },
  4: {
    phase: 4,
    name: "Audience Dynamics & Scenario Shifts",
    questions: "Q31-Q40",
    theme: "spectator",
    description: "Tests performance anxiety under simulated public scrutiny.",
    uiStyle: "spectator",
  },
  5: {
    phase: 5,
    name: "Subconscious Neural Speed Run",
    questions: "Q41-Q50",
    theme: "kinetic",
    description: "Strips away your ability to think. Pure instinct only.",
    timerSeconds: 2,
    uiStyle: "kinetic",
  },
};

export type AuraAxis =
  | "presence"      // α - Passive authority
  | "composure"     // β - Stoicism under fire
  | "fluidity"      // γ - Social mechanics
  | "desperation"   // δ - Try-hard metrics (negative)
  | "fumble";       // φ - Physical clumsiness (negative)

export type QuestionOption = {
  id: string;
  text: string;
  icon?: string;
  scores: Partial<Record<AuraAxis, number>>; // -100 to +100
  isHoneypot?: boolean; // Phase 3 trap option
  narrativeTag: string;
};

export type QuizQuestion = {
  id: number;
  phase: Phase;
  text: string;
  subtext?: string;
  options: QuestionOption[];
  timeLimitMs?: number;
  crossRefWith?: number; // For consistency checking
  spectatorCount?: number; // Phase 4 audience counter
};

// ===== PHASE 1: PHYSICAL & COGNITIVE SPATIAL DEVIATION (Q1-Q10) =====
export const PHASE1_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    phase: 1,
    text: "You're walking fast with a rolling backpack. It hits someone's ankle. What do you do?",
    subtext: "First instinct only.",
    options: [
      { id: "1a", text: "Mumble sorry without stopping", scores: { composure: 20, desperation: 10 }, narrativeTag: "mumbler" },
      { id: "1b", text: "Stop, make eye contact, apologize properly", scores: { presence: 40, composure: 30 }, narrativeTag: "proper_apologizer" },
      { id: "1c", text: "Pretend it didn't happen and keep walking", scores: { fumble: 30, composure: -10 }, narrativeTag: "denier" },
      { id: "1d", text: "Laugh nervously and speed up", scores: { fumble: 40, desperation: 20 }, narrativeTag: "nervous_laugher" },
    ],
    crossRefWith: 42,
  },
  {
    id: 2,
    phase: 1,
    text: "You push a glass door. It doesn't open. It says PULL. What's your reaction?",
    options: [
      { id: "2a", text: "Look around to see if anyone noticed", scores: { fumble: 20, composure: -20 }, narrativeTag: "self_conscious" },
      { id: "2b", text: "Laugh it off and walk through normally", scores: { composure: 40, fluidity: 20 }, narrativeTag: "unbothered" },
      { id: "2c", text: "Check the door again like it tricked you", scores: { fumble: 30 }, narrativeTag: "confused" },
      { id: "2d", text: "Pretend you were testing the door's security", scores: { desperation: 40, fumble: 10 }, narrativeTag: "pretender" },
    ],
  },
  {
    id: 3,
    phase: 1,
    text: "You miss a step in a dark theater. You stumble hard. What happens next?",
    options: [
      { id: "3a", text: "Freeze and pretend you meant to do that", scores: { fumble: 50, composure: -30 }, narrativeTag: "freeze_frame" },
      { id: "3b", text: "Recover smoothly like nothing happened", scores: { composure: 50, presence: 30 }, narrativeTag: "smooth_recovery" },
      { id: "3c", text: "Whisper an apology to the empty seat", scores: { fumble: 20, fluidity: 10 }, narrativeTag: "polite_stumbler" },
      { id: "3d", text: "Laugh loudly to show you're fine", scores: { desperation: 30, composure: 10 }, narrativeTag: "loud_recovery" },
    ],
  },
  {
    id: 4,
    phase: 1,
    text: "Your phone slips and lands on a stranger's foot. What's your move?",
    options: [
      { id: "4a", text: "Pick it up and check YOUR phone first", scores: { fumble: 40, fluidity: -20 }, narrativeTag: "phone_first" },
      { id: "4b", text: "Ask if they're okay before anything else", scores: { presence: 40, composure: 30 }, narrativeTag: "caring_first" },
      { id: "4c", text: "Apologize profusely while picking it up", scores: { desperation: 30, composure: 10 }, narrativeTag: "over_apologizer" },
      { id: "4d", text: "Make a joke to break the tension", scores: { fluidity: 40, composure: 20 }, narrativeTag: "joke_maker" },
    ],
  },
  {
    id: 5,
    phase: 1,
    text: "You're running late. You sprint and slip on ice in public. What do you do?",
    options: [
      { id: "5a", text: "Get up fast and keep running like a normal person", scores: { composure: 30, presence: 20 }, narrativeTag: "keep_running" },
      { id: "5b", text: "Stay down for a second questioning your life choices", scores: { fumble: 40, desperation: 10 }, narrativeTag: "existential_slip" },
      { id: "5c", text: "Check if anyone filmed it", scores: { desperation: 30, composure: -20 }, narrativeTag: "social_media_fear" },
      { id: "5d", text: "Laugh it off and keep going", scores: { composure: 40, fluidity: 20 }, narrativeTag: "laugh_it_off" },
    ],
  },
  {
    id: 6,
    phase: 1,
    text: "You wave at someone. They're waving at the person behind you. What now?",
    options: [
      { id: "6a", text: "Quickly pretend to fix your hair", scores: { fumble: 30, composure: 10 }, narrativeTag: "hair_fixer" },
      { id: "6b", text: "Just keep walking with dignity", scores: { composure: 50, presence: 30 }, narrativeTag: "dignity_walk" },
      { id: "6c", text: "Commit and wave harder", scores: { desperation: 40, fluidity: -10 }, narrativeTag: "commitment" },
      { id: "6d", text: "Point behind you like you were waving at them too", scores: { fluidity: 30, composure: 20 }, narrativeTag: "redirect" },
    ],
  },
  {
    id: 7,
    phase: 1,
    text: "You're at a no-shoes house. You realize you have a hole in your sock. What do you do?",
    options: [
      { id: "7a", text: "Try to angle your foot so nobody sees", scores: { fumble: 40, desperation: 20 }, narrativeTag: "angle_master" },
      { id: "7b", text: "Take off the socks and own it", scores: { presence: 50, composure: 40 }, narrativeTag: "own_it" },
      { id: "7c", text: "Leave before anyone notices", scores: { fumble: 20, composure: -10 }, narrativeTag: "escape_artist" },
      { id: "7d", text: "Point it out yourself before anyone else can", scores: { fluidity: 40, composure: 30 }, narrativeTag: "self_aware" },
    ],
  },
  {
    id: 8,
    phase: 1,
    text: "You walk into a glass door at a mall. A crowd is nearby. Your move?",
    options: [
      { id: "8a", text: "Pretend to inspect the glass like it's interesting", scores: { fumble: 30, composure: 10 }, narrativeTag: "glass_inspector" },
      { id: "8b", text: "Laugh and walk through like you meant to stop", scores: { composure: 40, fluidity: 20 }, narrativeTag: "intentional_stop" },
      { id: "8c", text: "Check if the glass is okay (not your face)", scores: { fumble: 20, desperation: 10 }, narrativeTag: "glass_check" },
      { id: "8d", text: "Walk around to the open door with zero emotion", scores: { presence: 50, composure: 40 }, narrativeTag: "stone_face" },
    ],
  },
  {
    id: 9,
    phase: 1,
    text: "You drop your entire tray in the cafeteria. Food everywhere. What's your first move?",
    options: [
      { id: "9a", text: "Start cleaning without looking up", scores: { composure: 30, fumble: 20 }, narrativeTag: "silent_cleaner" },
      { id: "9b", text: "Say something funny to the room", scores: { fluidity: 50, composure: 20 }, narrativeTag: "comedian" },
      { id: "9c", text: "Freeze and question every decision that led here", scores: { fumble: 50, desperation: 20 }, narrativeTag: "existential_crisis" },
      { id: "9d", text: "Pick up the biggest piece and walk away", scores: { composure: 40, presence: 20 }, narrativeTag: "minimal_save" },
    ],
  },
  {
    id: 10,
    phase: 1,
    text: "You think your shoe is untied. You bend down. It was tied the whole time. Now what?",
    options: [
      { id: "10a", text: "Pretend to adjust something else", scores: { fumble: 20, composure: 10 }, narrativeTag: "adjuster" },
      { id: "10b", text: "Stand up with zero reaction", scores: { presence: 50, composure: 40 }, narrativeTag: "zero_reaction" },
      { id: "10c", text: "Actually untie and retie it for no reason", scores: { fumble: 30, desperation: 20 }, narrativeTag: "commitment_issues" },
      { id: "10d", text: "Look around nervously hoping nobody saw", scores: { fumble: 30, composure: -20 }, narrativeTag: "paranoid" },
    ],
  },
];

// ===== PHASE 2: VERBAL BANTER & COMPRESSION STRESS (Q11-Q20) =====
export const PHASE2_QUESTIONS: QuizQuestion[] = [
  {
    id: 11,
    phase: 2,
    text: "Someone at a party calls you by the wrong name for the 3rd time. You correct them. They do it again. What do you say?",
    options: [
      { id: "11a", text: "Just go with it. You're 'Dave' now.", scores: { composure: 40, fluidity: 30 }, narrativeTag: "accept_dave" },
      { id: "11b", text: "Actually, it's [name]. Nice to meet you... again.", scores: { presence: 40, composure: 20 }, narrativeTag: "polite_correction" },
      { id: "11c", text: "I'm going to start calling you the wrong name too", scores: { fluidity: 50, composure: 10 }, narrativeTag: "revenge_name" },
      { id: "11d", text: "Nod and never talk to them again", scores: { fumble: 20, composure: -10 }, narrativeTag: "ghost" },
    ],
  },
  {
    id: 12,
    phase: 2,
    text: "You're getting roasted by a friend in front of 10 people. Your comeback options?",
    options: [
      { id: "12a", text: "Take it with a smile and fire back harder", scores: { fluidity: 50, presence: 30 }, narrativeTag: "comeback_king" },
      { id: "12b", text: "Laugh along but silently plan revenge", scores: { composure: 20, desperation: 10 }, narrativeTag: "silent_revenge" },
      { id: "12c", text: "Roast them back but it falls flat", scores: { fumble: 40, desperation: 20 }, narrativeTag: "failed_comeback" },
      { id: "12d", text: "Change the subject immediately", scores: { composure: 10, fumble: 10 }, narrativeTag: "topic_changer" },
    ],
  },
  {
    id: 13,
    phase: 2,
    text: "A barista gives you the wrong order. You already took a sip. What do you do?",
    options: [
      { id: "13a", text: "Drink it anyway. Free coffee is free coffee.", scores: { composure: 30, fluidity: 20 }, narrativeTag: "free_coffee" },
      { id: "13b", text: "Politely mention it and ask for the right one", scores: { presence: 40, composure: 30 }, narrativeTag: "polite_correction" },
      { id: "13c", text: "Say nothing and never go back", scores: { fumble: 30, composure: -10 }, narrativeTag: "ghost_customer" },
      { id: "13d", text: "Act like it was the right order all along", scores: { desperation: 30, composure: 10 }, narrativeTag: "gaslighter" },
    ],
  },
  {
    id: 14,
    phase: 2,
    text: "Someone compliments your outfit. It's actually borrowed and you know it looks mid. Your response?",
    options: [
      { id: "14a", text: "Thanks! I picked it out myself", scores: { desperation: 40, composure: -10 }, narrativeTag: "credit_taker" },
      { id: "14b", text: "Thanks, it's actually my friend's", scores: { presence: 30, fluidity: 20 }, narrativeTag: "honest_receiver" },
      { id: "14c", text: "Deny it aggressively", scores: { fumble: 30, composure: -20 }, narrativeTag: "aggressive_denierr" },
      { id: "14d", text: "Deflect with humor", scores: { fluidity: 40, composure: 30 }, narrativeTag: "humble_deflector" },
    ],
  },
  {
    id: 15,
    phase: 2,
    text: "Your phone rings with the most embarrassing ringtone during a silent meeting. What do you do?",
    options: [
      { id: "15a", text: "Answer it normally like a psychopath", scores: { presence: 50, composure: 40 }, narrativeTag: "phone_psychopath" },
      { id: "15b", text: "Mute it while making eye contact with everyone", scores: { composure: 20, fumble: 20 }, narrativeTag: "awkward_mute" },
      { id: "15c", text: "Pretend it's not your phone", scores: { fumble: 40, desperation: 30 }, narrativeTag: "phone_denier" },
      { id: "15d", text: "Let it ring and address it with humor", scores: { fluidity: 40, composure: 30 }, narrativeTag: "ring_humor" },
    ],
    crossRefWith: 31,
  },
  {
    id: 16,
    phase: 2,
    text: "You're in an elevator. You press the floor button. The person next to you already pressed it. Awkward silence. You say?",
    options: [
      { id: "16a", text: "Nothing. Silence is golden.", scores: { composure: 30, presence: 20 }, narrativeTag: "silent_golden" },
      { id: "16b", text: "Great minds think alike", scores: { fluidity: 40, composure: 20 }, narrativeTag: "smooth_talker" },
      { id: "16c", text: "Sorry, I have a problem", scores: { fumble: 30, desperation: 10 }, narrativeTag: "elevator_apologizer" },
      { id: "16d", text: "Pretend to check your phone immediately", scores: { fumble: 20, composure: 10 }, narrativeTag: "phone_escape" },
    ],
  },
  {
    id: 17,
    phase: 2,
    text: "You accidentally send a meme to your boss instead of your friend. What's your play?",
    options: [
      { id: "17a", text: "Delete it and pray they didn't see", scores: { fumble: 30, desperation: 20 }, narrativeTag: "delete_and_pray" },
      { id: "17b", text: "Own it. 'Thought you'd appreciate this'", scores: { presence: 50, fluidity: 30 }, narrativeTag: "own_it_boss" },
      { id: "17c", text: "Send a follow-up: 'Wrong person lol'", scores: { composure: 20, fumble: 10 }, narrativeTag: "classic_recovery" },
      { id: "17d", text: "Quit immediately", scores: { fumble: 50, desperation: 30 }, narrativeTag: "quit_instant" },
    ],
  },
  {
    id: 18,
    phase: 2,
    text: "Someone asks 'How are you?' and you're having the worst day. Your answer?",
    options: [
      { id: "18a", text: "Good, you?", scores: { composure: 30, fluidity: 20 }, narrativeTag: "automatic_good" },
      { id: "18b", text: "Honestly? Terrible. But thanks for asking.", scores: { presence: 40, fluidity: 20 }, narrativeTag: "honest_terrible" },
      { id: "18c", text: "Living the dream", scores: { desperation: 20, composure: 10 }, narrativeTag: "sarcastic_dream" },
      { id: "18d", text: "Don't ask questions you don't want answered", scores: { presence: 30, composure: 20 }, narrativeTag: "dark_humor" },
    ],
  },
  {
    id: 19,
    phase: 2,
    text: "You're telling a story and nobody's listening. Mid-sentence, you notice. What do you do?",
    options: [
      { id: "19a", text: "Stop talking and walk away", scores: { composure: 20, fumble: 10 }, narrativeTag: "silent_exit" },
      { id: "19b", text: "Say 'anyway' and keep going", scores: { composure: 30, desperation: 10 }, narrativeTag: "anyway_warrior" },
      { id: "19c", text: "Make it louder and more dramatic", scores: { desperation: 40, fluidity: 10 }, narrativeTag: "drama_king" },
      { id: "19d", text: "Call someone out directly", scores: { presence: 40, composure: 20 }, narrativeTag: "direct_callout" },
    ],
  },
  {
    id: 20,
    phase: 2,
    text: "You sneeze in a quiet library. The whole room looks at you. Your recovery?",
    options: [
      { id: "20a", text: "Quiet 'sorry' and look down", scores: { composure: 20, fumble: 10 }, narrativeTag: "quiet_sneezer" },
      { id: "20b", text: "Own it with a loud 'EXCUSE ME'", scores: { presence: 50, composure: 30 }, narrativeTag: "loud_owner" },
      { id: "20c", text: "Pretend it was the person next to you", scores: { fumble: 30, desperation: 20 }, narrativeTag: "sneeze_blamer" },
      { id: "20d", text: "Make eye contact with the loudest person and wink", scores: { fluidity: 50, composure: 40 }, narrativeTag: "wink_sneezer" },
    ],
  },
];

// ===== PHASE 3: THE EGO TRAP & TRANSPARENCY DECAY (Q21-Q30) =====
// WARNING: Options marked with isHoneypot are TRAPS that lower your score
export const PHASE3_QUESTIONS: QuizQuestion[] = [
  {
    id: 21,
    phase: 3,
    text: "Your crush catches you eating messy food. You have sauce on your face. What's your move?",
    subtext: "Be honest. The system is watching.",
    options: [
      { id: "21a", text: "Wipe it off with maximum confidence", scores: { composure: 40, presence: 20 }, narrativeTag: "confident_wipe" },
      { id: "21b", text: "Act like you meant to look like this", scores: { desperation: 50 }, isHoneypot: true, narrativeTag: "ego_trap" },
      { id: "21c", text: "Laugh and own the mess", scores: { fluidity: 40, composure: 30 }, narrativeTag: "messy_owner" },
      { id: "21d", text: "Never eat in public again", scores: { fumble: 30, composure: -20 }, narrativeTag: "public_eating_ban" },
    ],
    crossRefWith: 28,
  },
  {
    id: 22,
    phase: 3,
    text: "You lose a minor argument on the internet. The other person is clearly wrong. Your response?",
    options: [
      { id: "22a", text: "Write a 500-word essay proving them wrong", scores: { desperation: 50 }, isHoneypot: true, narrativeTag: "essay_writer" },
      { id: "22b", text: "Let it go. Your peace is worth more.", scores: { composure: 50, presence: 30 }, narrativeTag: "peace_keeper" },
      { id: "22c", text: "Screenshot and post it to your story", scores: { desperation: 40, fumble: 20 }, narrativeTag: "screenshot_poster" },
      { id: "22d", text: "Send one last 'you're wrong' and block them", scores: { composure: 20, fumble: 10 }, narrativeTag: "last_word" },
    ],
  },
  {
    id: 23,
    phase: 3,
    text: "You're at a party. You tell a joke. Nobody laughs. Dead silence. What now?",
    subtext: "This is the ego trap. Choose wisely.",
    options: [
      { id: "23a", text: "Laugh at your own joke loudly", scores: { desperation: 50 }, isHoneypot: true, narrativeTag: "self_laugh" },
      { id: "23b", text: "Move on like it never happened", scores: { composure: 50, presence: 30 }, narrativeTag: "move_on" },
      { id: "23c", text: "Say 'tough crowd' and walk away", scores: { fluidity: 30, composure: 20 }, narrativeTag: "tough_crowd" },
      { id: "23d", text: "Blame the audience for not getting it", scores: { desperation: 40, fumble: 20 }, narrativeTag: "blame_audience" },
    ],
    crossRefWith: 35,
  },
  {
    id: 24,
    phase: 3,
    text: "Someone takes the last slice of pizza you were eyeing. They don't know. What do you do?",
    options: [
      { id: "24a", text: "Say 'I was going to get that' with a weirdly intense stare", scores: { desperation: 40, fumble: 20 }, narrativeTag: "intense_stare" },
      { id: "24b", text: "Nothing. There's more pizza in the world.", scores: { composure: 50, presence: 30 }, narrativeTag: "pizza_philosopher" },
      { id: "24c", text: "Passive aggressively mention it later", scores: { desperation: 30, fumble: 20 }, narrativeTag: "passive_aggressive" },
      { id: "24d", text: "Take their drink as compensation", scores: { fluidity: 20, composure: 10 }, narrativeTag: "drink_thief" },
    ],
  },
  {
    id: 25,
    phase: 3,
    text: "You realize you have spinach in your teeth after a 20-minute conversation. The other person never told you. Your reaction?",
    options: [
      { id: "25a", text: "Never trust that person again", scores: { fumble: 30, composure: -10 }, narrativeTag: "trust_broken" },
      { id: "25b", text: "It happens. Move on.", scores: { composure: 40, presence: 20 }, narrativeTag: "spinach_happens" },
      { id: "25c", text: "Post a selfie to see if anyone mentions it", scores: { desperation: 40 }, isHoneypot: true, narrativeTag: "selfie_test" },
      { id: "25d", text: "Laugh about it and check your teeth now", scores: { fluidity: 30, composure: 30 }, narrativeTag: "laughing_check" },
    ],
  },
  {
    id: 26,
    phase: 3,
    text: "You accidentally like someone's old Instagram post. You unlike it. They saw it. What now?",
    subtext: "The ego trap is real.",
    options: [
      { id: "26a", text: "Like it again and own it", scores: { presence: 40, composure: 30 }, narrativeTag: "like_owner" },
      { id: "26b", text: "Delete your account", scores: { fumble: 50, desperation: 30 }, narrativeTag: "account_deleter" },
      { id: "26c", text: "Pretend it never happened", scores: { composure: 20, fumble: 10 }, narrativeTag: "denial" },
      { id: "26d", text: "Send them a meme about stalking", scores: { fluidity: 40, desperation: 20 }, narrativeTag: "meme_deflection" },
    ],
  },
  {
    id: 27,
    phase: 3,
    text: "You're telling a story and someone says 'That already happened to me, but better.' What do you say?",
    options: [
      { id: "27a", text: "Cool. Anyway—", scores: { composure: 50, presence: 30 }, narrativeTag: "anyway_master" },
      { id: "27b", text: "One-up them back", scores: { desperation: 40 }, isHoneypot: true, narrativeTag: "one_upper" },
      { id: "27c", text: "Nod and let them have it", scores: { composure: 30, fluidity: 20 }, narrativeTag: "let_them_have" },
      { id: "27d", text: "Question their story's authenticity", scores: { fumble: 20, composure: -10 }, narrativeTag: "story_checker" },
    ],
  },
  {
    id: 28,
    phase: 3,
    text: "You're wearing the same outfit as someone at an event. You both notice. What's your move?",
    options: [
      { id: "28a", text: "Say 'Great minds think alike' with a smile", scores: { fluidity: 50, composure: 40 }, narrativeTag: "great_minds" },
      { id: "28b", text: "Immediately try to change or cover up", scores: { fumble: 30, desperation: 20 }, narrativeTag: "outfit_panic" },
      { id: "28c", text: "Pretend you didn't notice", scores: { composure: 20, fumble: 10 }, narrativeTag: "outfit_blind" },
      { id: "28d", text: "Compliment their taste", scores: { presence: 40, fluidity: 30 }, narrativeTag: "taste_complimenter" },
    ],
  },
  {
    id: 29,
    phase: 3,
    text: "You realize you've been walking around with your zipper down for the past hour. You just found out. What's the damage?",
    options: [
      { id: "29a", text: "Accept that this is your life now", scores: { composure: 30, fumble: 20 }, narrativeTag: "acceptance" },
      { id: "29b", text: "Zip up and never speak of it", scores: { composure: 40, presence: 20 }, narrativeTag: "silent_zip" },
      { id: "29c", text: "Blame someone else", scores: { desperation: 40 }, isHoneypot: true, narrativeTag: "zipper_blamer" },
      { id: "29d", text: "Post about it online for sympathy", scores: { desperation: 30, fumble: 20 }, narrativeTag: "sympathy_poster" },
    ],
  },
  {
    id: 30,
    phase: 3,
    text: "You're at a 'no phones' dinner. Your phone buzzes 15 times. Everyone hears it. What do you do?",
    subtext: "The ego trap awaits.",
    options: [
      { id: "30a", text: "Ignore it completely", scores: { composure: 50, presence: 40 }, narrativeTag: "phone_ignorer" },
      { id: "30b", text: "Flip it over and say 'important meeting'", scores: { desperation: 40 }, isHoneypot: true, narrativeTag: "important_meeting" },
      { id: "30c", text: "Quick check, then apologize", scores: { composure: 20, fluidity: 10 }, narrativeTag: "quick_check" },
      { id: "30d", text: "Turn it off dramatically", scores: { presence: 30, composure: 30 }, narrativeTag: "dramatic_off" },
    ],
  },
];

// ===== PHASE 4: AUDIENCE DYNAMICS & SCENARIO SHIFTS (Q31-Q40) =====
export const PHASE4_QUESTIONS: QuizQuestion[] = [
  {
    id: 31,
    phase: 4,
    text: "You're at a funeral. Your phone goes off with the loudest, most embarrassing ringtone. 200 people turn to look. What now?",
    subtext: "The spectator counter is active. People are watching.",
    spectatorCount: 200,
    options: [
      { id: "31a", text: "Answer it like a professional call", scores: { presence: 60, composure: 50 }, narrativeTag: "funeral_caller" },
      { id: "31b", text: "Silence it while making eye contact with the deceased's family", scores: { fumble: 40, composure: -20 }, narrativeTag: "eye_contact_shame" },
      { id: "31c", text: "Let it ring and never come back", scores: { fumble: 50, desperation: 30 }, narrativeTag: "eternal_escape" },
      { id: "31d", text: "Stand up, bow, and apologize to the room", scores: { composure: 30, fluidity: 20 }, narrativeTag: "formal_apology" },
    ],
    crossRefWith: 15,
  },
  {
    id: 32,
    phase: 4,
    text: "You drop a heavily stacked cafeteria tray. Food flies. 50 people are eating. Your first move?",
    spectatorCount: 50,
    options: [
      { id: "32a", text: "Bow to the audience", scores: { fluidity: 50, composure: 40 }, narrativeTag: "tray_bow" },
      { id: "32b", text: "Start cleaning like nothing happened", scores: { composure: 40, presence: 20 }, narrativeTag: "silent_cleaner_2" },
      { id: "32c", text: "Blame gravity", scores: { desperation: 30, fumble: 20 }, narrativeTag: "gravity_blamer" },
      { id: "32d", text: "Freeze and wait for the simulation to reset", scores: { fumble: 40, composure: -10 }, narrativeTag: "simulation_reset" },
    ],
  },
  {
    id: 33,
    phase: 4,
    text: "You walk into a glass door at a mall. 30 people saw. The door is now cracked. What's your move?",
    spectatorCount: 30,
    options: [
      { id: "33a", text: "Inspect the damage like a building inspector", scores: { fluidity: 40, composure: 30 }, narrativeTag: "inspector" },
      { id: "33b", text: "Walk through the broken door like it's an achievement", scores: { presence: 50, composure: 40 }, narrativeTag: "broken_door_achievement" },
      { id: "33c", text: "Run away immediately", scores: { fumble: 40, desperation: 30 }, narrativeTag: "door_runner" },
      { id: "33d", text: "Knock on the next door to make sure it's real", scores: { fumble: 30, composure: -10 }, narrativeTag: "door_knocker" },
    ],
  },
  {
    id: 34,
    phase: 4,
    text: "You're giving a presentation. Your fly has been down the entire time. Someone tells you after. What do you do?",
    spectatorCount: 40,
    options: [
      { id: "34a", text: "Zip up and continue like nothing happened", scores: { composure: 50, presence: 30 }, narrativeTag: "zip_continuer" },
      { id: "34b", text: "Make a joke about it to the audience", scores: { fluidity: 40, composure: 30 }, narrativeTag: "fly_joker" },
      { id: "34c", text: "End the presentation immediately", scores: { fumble: 40, composure: -20 }, narrativeTag: "presentation_ender" },
      { id: "34d", text: "Blame the person who told you for not saying earlier", scores: { desperation: 40 }, isHoneypot: true, narrativeTag: "blame_messenger" },
    ],
  },
  {
    id: 35,
    phase: 4,
    text: "You wave at someone. They don't wave back. You realize they were waving at someone behind you. But now 15 people saw you wave at nothing.",
    spectatorCount: 15,
    options: [
      { id: "35a", text: "Keep your hand up and point behind you", scores: { presence: 40, composure: 30 }, narrativeTag: "point_redirect" },
      { id: "35b", text: "Smoothly transition into fixing your hair", scores: { composure: 30, fumble: 10 }, narrativeTag: "hair_transition" },
      { id: "35c", text: "Wave harder at nobody", scores: { desperation: 50 }, isHoneypot: true, narrativeTag: "harder_wave" },
      { id: "35d", text: "Put your hand in your pocket like you were reaching for something", scores: { fluidity: 40, composure: 20 }, narrativeTag: "pocket_reach" },
    ],
  },
  {
    id: 36,
    phase: 4,
    text: "You're walking the wrong direction on a busy street. 25 people are watching. You realize halfway down. What do you do?",
    spectatorCount: 25,
    options: [
      { id: "36a", text: "Turn around like you meant to explore this street", scores: { presence: 40, composure: 30 }, narrativeTag: "explorer" },
      { id: "36b", text: "Stop, check your phone like you got directions", scores: { composure: 20, fluidity: 10 }, narrativeTag: "phone_directions" },
      { id: "36c", text: "Run back the other way", scores: { fumble: 40, desperation: 20 }, narrativeTag: "street_runner" },
      { id: "36d", text: "Keep going until you find a side street to escape", scores: { composure: 30, fumble: 10 }, narrativeTag: "side_street_escape" },
    ],
  },
  {
    id: 37,
    phase: 4,
    text: "You sneeze so loud in a quiet coffee shop that the barista drops a cup. 20 people are staring.",
    spectatorCount: 20,
    options: [
      { id: "37a", text: "Say 'sorry' to the barista and the cup", scores: { fluidity: 40, composure: 20 }, narrativeTag: "cup_apologizer" },
      { id: "37b", text: "Say 'bless me' with confidence", scores: { presence: 50, composure: 40 }, narrativeTag: "bless_me" },
      { id: "37c", text: "Leave immediately without ordering", scores: { fumble: 30, composure: -10 }, narrativeTag: "sneeze_escape" },
      { id: "37d", text: "Apologize to everyone individually", scores: { desperation: 40, fumble: 20 }, narrativeTag: "individual_apologizer" },
    ],
  },
  {
    id: 38,
    phase: 4,
    text: "Your loud, embarrassing ringtone goes off during a movie. 100 people are in the theater.",
    spectatorCount: 100,
    options: [
      { id: "38a", text: "Answer it with 'This is the Matrix. I have to go.'", scores: { fluidity: 50, composure: 40 }, narrativeTag: "matrix_call" },
      { id: "38b", text: "Silence it while everyone judges you", scores: { composure: 20, fumble: 20 }, narrativeTag: "judged_silencer" },
      { id: "38c", text: "Pretend it's not your phone", scores: { fumble: 40, desperation: 30 }, narrativeTag: "phone_disowned" },
      { id: "38d", text: "Let it ring and enjoy the attention", scores: { presence: 30, desperation: 20 }, narrativeTag: "ring_enjoyer" },
    ],
  },
  {
    id: 39,
    phase: 4,
    text: "You trip going UP the stairs. A crowd is behind you going down. What's your recovery?",
    spectatorCount: 30,
    options: [
      { id: "39a", text: "Sit down like you meant to rest", scores: { composure: 40, fluidity: 30 }, narrativeTag: "rest_tripper" },
      { id: "39b", text: "Get up and keep going like nothing happened", scores: { presence: 50, composure: 40 }, narrativeTag: "trip_continuer" },
      { id: "39c", text: "Check if the stairs are okay", scores: { fumble: 30, desperation: 20 }, narrativeTag: "stair_checker" },
      { id: "39d", text: "Do a push-up to make it look intentional", scores: { fluidity: 40, composure: 30 }, narrativeTag: "pushup_recovery" },
    ],
  },
  {
    id: 40,
    phase: 4,
    text: "You're at a job interview. You call the interviewer the wrong name. They correct you. You do it again. 3 interviewers are watching.",
    spectatorCount: 3,
    options: [
      { id: "40a", text: "Say 'I'm sorry, I'm nervous. You make me nervous.'", scores: { presence: 40, fluidity: 30 }, narrativeTag: "nervous_compliment" },
      { id: "40b", text: "Write their name down and keep going", scores: { composure: 30, fluidity: 20 }, narrativeTag: "name_writer" },
      { id: "40c", text: "Pretend you have a memory condition", scores: { desperation: 40 }, isHoneypot: true, narrativeTag: "memory_condition" },
      { id: "40d", text: "Just call everyone 'boss' from now on", scores: { fluidity: 30, composure: 20 }, narrativeTag: "boss_caller" },
    ],
  },
];

// ===== PHASE 5: SUBCONSCIOUS NEURAL SPEED RUN (Q41-Q50) =====
export const PHASE5_QUESTIONS: QuizQuestion[] = [
  {
    id: 41,
    phase: 5,
    text: "Something falls toward your face. Catch or duck?",
    timeLimitMs: 2000,
    options: [
      { id: "41a", text: "Catch it", scores: { presence: 30, composure: 20 }, narrativeTag: "catcher" },
      { id: "41b", text: "Duck", scores: { composure: 10, fumble: 10 }, narrativeTag: "ducker" },
      { id: "41c", text: "Freeze", scores: { fumble: 30, composure: -20 }, narrativeTag: "freezer" },
      { id: "41d", text: "Catch it with style", scores: { presence: 40, fluidity: 30 }, narrativeTag: "stylish_catcher" },
    ],
  },
  {
    id: 42,
    phase: 5,
    text: "Someone challenges you to a staring contest. Your instinct?",
    timeLimitMs: 2000,
    options: [
      { id: "42a", text: "Accept immediately", scores: { presence: 40, composure: 30 }, narrativeTag: "staring_acceptor" },
      { id: "42b", text: "Decline politely", scores: { composure: 20, fluidity: 10 }, narrativeTag: "staring_decliner" },
      { id: "42c", text: "Start before they say go", scores: { fluidity: 20, composure: 10 }, narrativeTag: "early_starer" },
      { id: "42d", text: "Laugh and walk away", scores: { composure: 30, presence: 20 }, narrativeTag: "laughing_away" },
    ],
    crossRefWith: 1,
  },
  {
    id: 43,
    phase: 5,
    text: "Your phone is about to fall off a table. Reach or let it fall?",
    timeLimitMs: 2000,
    options: [
      { id: "43a", text: "Snatch it mid-air", scores: { presence: 50, composure: 30 }, narrativeTag: "phone_snatcher" },
      { id: "43b", text: "Watch it fall", scores: { composure: 20, fumble: 20 }, narrativeTag: "phone_watcher" },
      { id: "43c", text: "Try to catch and drop it worse", scores: { fumble: 50, composure: -30 }, narrativeTag: "drop_worse" },
      { id: "43d", text: "Kick it back up", scores: { fluidity: 40, presence: 30 }, narrativeTag: "phone_kicker" },
    ],
  },
  {
    id: 44,
    phase: 5,
    text: "Someone hands you something hot. Your reaction?",
    timeLimitMs: 2000,
    options: [
      { id: "44a", text: "Hold it like it's nothing", scores: { composure: 50, presence: 30 }, narrativeTag: "heat_holder" },
      { id: "44b", text: "Drop it immediately", scores: { fumble: 30, composure: -10 }, narrativeTag: "heat_dropper" },
      { id: "44c", text: "Juggle it and put it down", scores: { fluidity: 30, fumble: 10 }, narrativeTag: "heat_juggler" },
      { id: "44d", text: "Blow on your hand dramatically", scores: { desperation: 20, fumble: 10 }, narrativeTag: "dramatic_blower" },
    ],
  },
  {
    id: 45,
    phase: 5,
    text: "A bug lands on you. Your first move?",
    timeLimitMs: 2000,
    options: [
      { id: "45a", text: "Flick it off calmly", scores: { composure: 50, presence: 30 }, narrativeTag: "calm_flicker" },
      { id: "45b", text: "Scream and run", scores: { fumble: 50, composure: -30 }, narrativeTag: "scream_runner" },
      { id: "45c", text: "Freeze and accept your new friend", scores: { composure: 20, fluidity: 10 }, narrativeTag: "bug_friend" },
      { id: "45d", text: "Squish it with zero hesitation", scores: { presence: 40, composure: 30 }, narrativeTag: "bug_squisher" },
    ],
  },
  {
    id: 46,
    phase: 5,
    text: "Someone asks for your honest opinion on their outfit. Quick.",
    timeLimitMs: 2000,
    options: [
      { id: "46a", text: "Honest and kind", scores: { fluidity: 40, composure: 30 }, narrativeTag: "honest_kind" },
      { id: "46b", text: "Lie to be nice", scores: { desperation: 20, composure: 10 }, narrativeTag: "nice_liar" },
      { id: "46c", text: "Brutal honesty", scores: { presence: 30, fluidity: -10 }, narrativeTag: "brutal_honest" },
      { id: "46d", text: "Deflect with humor", scores: { fluidity: 50, composure: 30 }, narrativeTag: "humor_deflector" },
    ],
  },
  {
    id: 47,
    phase: 5,
    text: "You hear a strange noise behind you at night. Turn or ignore?",
    timeLimitMs: 2000,
    options: [
      { id: "47a", text: "Turn around immediately", scores: { presence: 40, composure: 30 }, narrativeTag: "night_turner" },
      { id: "47b", text: "Keep walking faster", scores: { fumble: 20, composure: 10 }, narrativeTag: "fast_walker" },
      { id: "47c", text: "Pull out your phone flashlight like a weapon", scores: { composure: 30, fluidity: 20 }, narrativeTag: "flashlight_weapon" },
      { id: "47d", text: "Accept that the ghost has chosen you", scores: { composure: 20, fluidity: 20 }, narrativeTag: "ghost_acceptor" },
    ],
  },
  {
    id: 48,
    phase: 5,
    text: "Someone cuts in front of you in line. What's your move?",
    timeLimitMs: 2000,
    options: [
      { id: "48a", text: "Confront them directly", scores: { presence: 50, composure: 30 }, narrativeTag: "line_confronter" },
      { id: "48b", text: "Say nothing and seethe", scores: { fumble: 30, composure: -20 }, narrativeTag: "silent_seether" },
      { id: "48c", text: "Tap them on the shoulder politely", scores: { composure: 40, fluidity: 20 }, narrativeTag: "polite_tapper" },
      { id: "48d", text: "Cut in front of someone else to balance it out", scores: { fumble: 30, desperation: 20 }, narrativeTag: "line_balancer" },
    ],
  },
  {
    id: 49,
    phase: 5,
    text: "Your friend falls in public. Help or laugh?",
    timeLimitMs: 2000,
    options: [
      { id: "49a", text: "Help immediately", scores: { composure: 40, fluidity: 20 }, narrativeTag: "immediate_helper" },
      { id: "49b", text: "Laugh first, then help", scores: { fluidity: 30, composure: 10 }, narrativeTag: "laugh_then_help" },
      { id: "49c", text: "Film it for memories", scores: { desperation: 40 }, isHoneypot: true, narrativeTag: "friend_filer" },
      { id: "49d", text: "Pretend you don't know them", scores: { fumble: 30, composure: -20 }, narrativeTag: "stranger_deny" },
    ],
  },
  {
    id: 50,
    phase: 5,
    text: "Last question. Someone asks: Are you ready for this to end?",
    timeLimitMs: 2000,
    options: [
      { id: "50a", text: "Yes. Let's see the results.", scores: { presence: 40, composure: 30 }, narrativeTag: "ready_results" },
      { id: "50b", text: "I was born ready.", scores: { presence: 30, desperation: 20 }, narrativeTag: "born_ready" },
      { id: "50c", text: "I don't want it to end.", scores: { fluidity: 30, composure: 20 }, narrativeTag: "dont_end" },
      { id: "50d", text: "I never started.", scores: { presence: 50, composure: 40 }, narrativeTag: "never_started" },
    ],
  },
];

// ===== CURVEBALL QUESTIONS (Random Unpredictable Events) =====
export const CURVEBALL_QUESTIONS: QuizQuestion[] = [
  {
    id: 101,
    phase: 1,
    text: "Curveball: You're falling. What's your first thought?",
    subtext: "⚡ UNPREDICTABLE QUESTION",
    options: [
      { id: "101a", text: "Regret", scores: { desperation: 20 }, narrativeTag: "regretter" },
      { id: "101b", text: "Laugh", scores: { composure: 40, fluidity: 30 }, narrativeTag: "falling_laugh" },
      { id: "101c", text: "Scream", scores: { fumble: 30 }, narrativeTag: "falling_scream" },
      { id: "101d", text: "Accept it", scores: { presence: 50, composure: 40 }, narrativeTag: "falling_accept" },
    ],
  },
  {
    id: 102,
    phase: 2,
    text: "Curveball: Someone says your name wrong. You've corrected them 5 times. Now?",
    subtext: "⚡ UNPREDICTABLE QUESTION",
    options: [
      { id: "102a", text: "Correct them again", scores: { composure: 20 }, narrativeTag: "correct_again" },
      { id: "102b", text: "Give up and embrace the new name", scores: { fluidity: 40, composure: 30 }, narrativeTag: "embrace_new" },
      { id: "102c", text: "Start calling them the wrong name too", scores: { fluidity: 30, desperation: 10 }, narrativeTag: "revenge_name" },
      { id: "102d", text: "Walk away", scores: { fumble: 20, composure: 10 }, narrativeTag: "name_walkaway" },
    ],
  },
  {
    id: 103,
    phase: 3,
    text: "Curveball: You're trying to look cool but your zipper is down. Everyone sees it.",
    subtext: "⚡ UNPREDICTABLE QUESTION",
    options: [
      { id: "103a", text: "Zip up confidently", scores: { composure: 50, presence: 30 }, narrativeTag: "zip_confident" },
      { id: "103b", text: "Pretend it's fashion", scores: { desperation: 40 }, isHoneypot: true, narrativeTag: "fashion_pretend" },
      { id: "103c", text: "Leave immediately", scores: { fumble: 30 }, narrativeTag: "zip_leave" },
      { id: "103d", text: "Own it with humor", scores: { fluidity: 40, composure: 30 }, narrativeTag: "zip_own_it" },
    ],
  },
  {
    id: 104,
    phase: 4,
    text: "Curveball: You're being filmed. 500 people are watching. You trip.",
    subtext: "⚡ UNPREDICTABLE QUESTION",
    spectatorCount: 500,
    options: [
      { id: "104a", text: "Get up like an action hero", scores: { presence: 60, composure: 50 }, narrativeTag: "action_hero" },
      { id: "104b", text: "Stay down and accept fate", scores: { fumble: 40, desperation: 20 }, narrativeTag: "fate_accept" },
      { id: "104c", text: "Do a pushup to make it look intentional", scores: { fluidity: 50, composure: 40 }, narrativeTag: "pushup_recovery" },
      { id: "104d", text: "Wave at the camera", scores: { fluidity: 40, composure: 30 }, narrativeTag: "camera_wave" },
    ],
  },
  {
    id: 105,
    phase: 5,
    text: "Curveball: Something hot. Now.",
    subtext: "⚡ UNPREDICTABLE QUESTION",
    timeLimitMs: 1500,
    options: [
      { id: "105a", text: "Drop it", scores: { fumble: 20 }, narrativeTag: "hot_drop" },
      { id: "105b", text: "Hold it", scores: { composure: 50, presence: 40 }, narrativeTag: "hot_hold" },
      { id: "105c", text: "Juggle it", scores: { fluidity: 30, fumble: 10 }, narrativeTag: "hot_juggle" },
      { id: "105d", text: "Scream", scores: { fumble: 40, composure: -20 }, narrativeTag: "hot_scream" },
    ],
  },
  {
    id: 106,
    phase: 1,
    text: "Curveball: A stranger stops you mid-walk: 'Do I know you?'",
    subtext: "⚡ UNPREDICTABLE QUESTION",
    options: [
      { id: "106a", text: "'Wrong person, sorry.'", scores: { composure: 30 }, narrativeTag: "wrong_person" },
      { id: "106b", text: "'You should.'", scores: { presence: 40, composure: 30 }, narrativeTag: "you_should" },
      { id: "106c", text: "Check your own face first", scores: { fumble: 30, desperation: 10 }, narrativeTag: "face_check" },
      { id: "106d", text: "Lean in and ask who's asking", scores: { presence: 30, fluidity: 30 }, narrativeTag: "who_asking" },
    ],
  },
  {
    id: 107,
    phase: 2,
    text: "Curveball: The group chat is roasting you. Your play?",
    subtext: "⚡ UNPREDICTABLE QUESTION",
    options: [
      { id: "107a", text: "Roast back instantly", scores: { fluidity: 40, composure: 20 }, narrativeTag: "roast_back" },
      { id: "107b", text: "Leave the chat", scores: { fumble: 20, composure: -10 }, narrativeTag: "chat_leave" },
      { id: "107c", text: "Laugh and screenshot it for later", scores: { composure: 40, fluidity: 10 }, narrativeTag: "chat_laugh" },
      { id: "107d", text: "Start roasting someone else to deflect", scores: { desperation: 30, fluidity: 10 }, narrativeTag: "chat_deflect" },
    ],
  },
  {
    id: 108,
    phase: 3,
    text: "Curveball: You got caught flexing. The room is silent. Now?",
    subtext: "⚡ UNPREDICTABLE QUESTION",
    options: [
      { id: "108a", text: "Own it: 'Yeah, and?'", scores: { presence: 50, composure: 30 }, narrativeTag: "own_it" },
      { id: "108b", text: "Pretend it was a joke", scores: { desperation: 40 }, isHoneypot: true, narrativeTag: "pretender" },
      { id: "108c", text: "Deflect to someone else", scores: { fumble: 20, composure: -10 }, narrativeTag: "flex_deflect" },
      { id: "108d", text: "Double down and flex harder", scores: { desperation: 30, fumble: 10 }, narrativeTag: "double_flex" },
    ],
  },
  {
    id: 109,
    phase: 4,
    text: "Curveball: The mic is on you at a wedding. No speech prepared.",
    subtext: "⚡ UNPREDICTABLE QUESTION",
    spectatorCount: 350,
    options: [
      { id: "109a", text: "Improvise a toast on the spot", scores: { presence: 50, fluidity: 40 }, narrativeTag: "toast_improv" },
      { id: "109b", text: "Hand the mic to someone else", scores: { fumble: 20, composure: -10 }, narrativeTag: "mic_pass" },
      { id: "109c", text: "Say one word and sit down", scores: { composure: 30, fumble: 10 }, narrativeTag: "one_word" },
      { id: "109d", text: "Start a chant to buy time", scores: { fluidity: 40, desperation: 10 }, narrativeTag: "chant_time" },
    ],
  },
  {
    id: 110,
    phase: 5,
    text: "Curveball: A bee flies straight at your face. Now.",
    subtext: "⚡ UNPREDICTABLE QUESTION",
    timeLimitMs: 1500,
    options: [
      { id: "110a", text: "Stay completely still", scores: { composure: 50, presence: 30 }, narrativeTag: "bee_still" },
      { id: "110b", text: "Swing at it", scores: { fumble: 30, composure: -20 }, narrativeTag: "bee_swing" },
      { id: "110c", text: "Run", scores: { fumble: 40 }, narrativeTag: "bee_run" },
      { id: "110d", text: "Wave it off calmly", scores: { composure: 40, fluidity: 20 }, narrativeTag: "bee_wave" },
    ],
  },
  {
    id: 111,
    phase: 3,
    text: "Curveball: Your crush just saw your search history. What now?",
    subtext: "⚡ UNPREDICTABLE QUESTION",
    options: [
      { id: "111a", text: "Lock the phone slowly and smile", scores: { composure: 40, presence: 20 }, narrativeTag: "lock_smile" },
      { id: "111b", text: "'That was for a friend.'", scores: { desperation: 40 }, isHoneypot: true, narrativeTag: "nice_liar" },
      { id: "111c", text: "Own it: 'We've all been there.'", scores: { fluidity: 40, composure: 30 }, narrativeTag: "own_history" },
      { id: "111d", text: "Drop the phone and run", scores: { fumble: 40, composure: -20 }, narrativeTag: "phone_run" },
    ],
  },
];

// ===== THE 50-QUESTION EXAM (regular progression) =====
export const REGULAR_QUESTIONS: QuizQuestion[] = [
  ...PHASE1_QUESTIONS,
  ...PHASE2_QUESTIONS,
  ...PHASE3_QUESTIONS,
  ...PHASE4_QUESTIONS,
  ...PHASE5_QUESTIONS,
];

// ===== ALL QUESTIONS COMBINED (used for scoring lookups) =====
export const ALL_QUESTIONS: QuizQuestion[] = [
  ...REGULAR_QUESTIONS,
  ...CURVEBALL_QUESTIONS,
];

// ===== TIER DEFINITIONS =====
export type AuraTier =
  | "ultimate_beast"
  | "giga_chad"
  | "aura_farmer"
  | "clown"
  | "noob";

export type TierInfo = {
  id: AuraTier;
  name: string;
  emoji: string;
  scoreRange: string;
  minScore: number;
  maxScore: number;
  color: string;
  gradient: string;
  description: string;
  narrative: string;
  uiEffect: string;
};

export const TIERS: Record<AuraTier, TierInfo> = {
  ultimate_beast: {
    id: "ultimate_beast",
    name: "ULTIMATE BEAST",
    emoji: "♠",
    scoreRange: "≥ 18,000",
    minScore: 18000,
    maxScore: Infinity,
    color: "#111111",
    gradient: "from-black via-neutral-400 to-black",
    description: "Absolute gravity-bending presence. You operate on pure instinct. The world bends around your choices.",
    narrative: "You exert an absolute, gravity-bending grip on your environment. You operate completely on instinct. The system tracks that you do not think before choosing—your cool actions are second-nature. You don't try to impress the system; the world bends around your choices.",
    uiEffect: "halftone_burst",
  },
  giga_chad: {
    id: "giga_chad",
    name: "GIGA CHAD",
    emoji: "♛",
    scoreRange: "10,000 - 17,999",
    minScore: 10000,
    maxScore: 17999,
    color: "#2b2b2b",
    gradient: "from-neutral-700 via-neutral-300 to-neutral-700",
    description: "High presence, massive physical confidence. You handle fumbles like an action star.",
    narrative: "High presence, massive physical confidence, and total control over sudden variables. You handle public fumbles like a seasoned action star. The only reason you aren't an Ultimate Beast is that you took a minor split-second fraction longer to process a couple of high-stress social anomalies.",
    uiEffect: "crosshatch_aura",
  },
  aura_farmer: {
    id: "aura_farmer",
    name: "AURA FARMER",
    emoji: "♧",
    scoreRange: "0 - 9,999",
    minScore: 0,
    maxScore: 9999,
    color: "#4d4d4d",
    gradient: "from-neutral-600 via-neutral-300 to-neutral-600",
    description: "The try-hard black hole. You select the coolest options but take too long.",
    narrative: "The Try-Hard Black Hole. You are constantly harvesting the vibe. The system flags that you select the coolest sounding options, but you consistently take over 4 seconds to think about them, or you fail the Consistency Tests. You are acting out a script to appear alpha, but the psychometric algorithm spots the stress and desperation beneath the surface.",
    uiEffect: "warning_gauge",
  },
  clown: {
    id: "clown",
    name: "CLOWN",
    emoji: "♧",
    scoreRange: "-1 to -4,000",
    minScore: -4000,
    maxScore: -1,
    color: "#666666",
    gradient: "from-neutral-500 via-neutral-300 to-neutral-500",
    description: "Public chaos incarnate. You drop items, apologize to objects, and laugh off internal screaming.",
    narrative: "You are the epicenter of public chaos. You drop items, apologize to inanimate objects, and try to laugh off situations while internally screaming. Your social adaptability is erratic. You don't mean to destroy the room's energy, but you consistently choose panicked recoveries.",
    uiEffect: "dotted_jitter",
  },
  noob: {
    id: "noob",
    name: "NOOB",
    emoji: "♤",
    scoreRange: "≤ -4,001",
    minScore: -Infinity,
    maxScore: -4001,
    color: "#8a8a8a",
    gradient: "from-neutral-500 via-neutral-400 to-neutral-500",
    description: "Absolute aura insolvency. You run with rolling backpacks and apologize to wrong-order waiters.",
    narrative: "Absolute, unmitigated Aura Insolvency. You run with a rolling backpack, apologize to waiters who brought you the wrong order, and pretend to look at your phone when you walk into a wall. You are trapped in an ongoing debt cycle to the universe.",
    uiEffect: "erased_sketch",
  },
};

// ===== TRUTH MATRIX TYPES =====
export type TruthMatrixEntry = {
  questionId: number;
  responseTimeMs: number;
  instinctVelocity: number;
  isConsistent: boolean;
  honeypotTriggered: boolean;
  auraShift: number;
};

export type AuraScoreBreakdown = {
  baseScore: number;
  presenceBonus: number;
  composureBonus: number;
  fluidityBonus: number;
  desperationPenalty: number;
  fumblePenalty: number;
  streakMultiplier: number;
  inauthenticityTax: number;
  finalScore: number;
};
