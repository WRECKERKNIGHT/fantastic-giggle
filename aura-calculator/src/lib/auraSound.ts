// ===== WEB AUDIO SOUND EFFECTS (100% client-side, lazy AudioContext) =====

let ctx: AudioContext | null = null;

function getCtx(): AudioContext | null {
  if (typeof window === "undefined") return null;
  try {
    if (!ctx) {
      const Ctor =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext?: typeof AudioContext })
          .webkitAudioContext;
      if (!Ctor) return null;
      ctx = new Ctor();
    }
    if (ctx.state === "suspended") {
      void ctx.resume();
    }
    return ctx;
  } catch {
    return null;
  }
}

function tone(
  frequency: number,
  duration: number,
  opts: { type?: OscillatorType; volume?: number; when?: number } = {}
) {
  const audio = getCtx();
  if (!audio) return;
  try {
    const osc = audio.createOscillator();
    const gain = audio.createGain();
    const t = audio.currentTime + (opts.when ?? 0);
    osc.type = opts.type ?? "sine";
    osc.frequency.setValueAtTime(frequency, t);
    const volume = opts.volume ?? 0.06;
    gain.gain.setValueAtTime(0.0001, t);
    gain.gain.exponentialRampToValueAtTime(volume, t + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + duration);
    osc.connect(gain);
    gain.connect(audio.destination);
    osc.start(t);
    osc.stop(t + duration + 0.02);
  } catch {
    // Audio unavailable — ignore
  }
}

/** Short click played when an answer is locked in. */
export function playSelect() {
  tone(620, 0.09, { type: "square", volume: 0.04 });
  tone(930, 0.14, { type: "square", volume: 0.03, when: 0.05 });
}

/** Higher-pitch ding for streak milestones. */
export function playDing() {
  tone(880, 0.12, { type: "sine", volume: 0.05 });
  tone(1320, 0.2, { type: "sine", volume: 0.04, when: 0.09 });
}

/** Low buzz when time runs out. */
export function playTimeUp() {
  tone(220, 0.18, { type: "sawtooth", volume: 0.04 });
  tone(180, 0.22, { type: "sawtooth", volume: 0.04, when: 0.12 });
}
