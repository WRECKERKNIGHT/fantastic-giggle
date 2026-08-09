// Client-side "aura scan" analysis. Uses pixel statistics to produce a
// playful, deterministic reading. All analysis runs locally — no uploads.

export type AuraReading = {
  chadPoints: number;
  auraColor: string;
  auraName: string;
  energy: number;
  brightness: number;
  warmth: number;
  saturation: number;
  elements: string[];
  strengths: string[];
  weaknesses: string[];
  verdict: string;
  seed: number;
};

type RGB = { r: number; g: number; b: number };

function rgbToHsl({ r, g, b }: RGB) {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const l = (max + min) / 2;
  let h = 0;
  let s = 0;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      default:
        h = (r - g) / d + 4;
    }
    h *= 60;
  }
  return { h, s, l };
}

function hslToHex({ h, s, l }: { h: number; s: number; l: number }) {
  const hue2rgb = (p: number, q: number, t: number) => {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1 / 6) return p + (q - p) * 6 * t;
    if (t < 1 / 2) return q;
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
    return p;
  };
  if (s === 0) {
    const v = Math.round(l * 255);
    return `#${v.toString(16).padStart(2, "0").repeat(3)}`;
  }
  const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
  const p = 2 * l - q;
  const r = Math.round(hue2rgb(p, q, h / 360 + 1 / 3) * 255);
  const g = Math.round(hue2rgb(p, q, h / 360) * 255);
  const b = Math.round(hue2rgb(p, q, h / 360 - 1 / 3) * 255);
  const toHex = (v: number) => v.toString(16).padStart(2, "0");
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

function seededRandom(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807 + 0) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

const AURA_NAMES: { hue: number; name: string }[] = [
  { hue: 0, name: "BLAZING CRIMSON" },
  { hue: 30, name: "GOLDEN PRIMAL" },
  { hue: 50, name: "SUNFLARE" },
  { hue: 120, name: "VERDANT VITALITY" },
  { hue: 170, name: "TEAL SERENITY" },
  { hue: 200, name: "CYANOSPHERE" },
  { hue: 240, name: "AZURE PREDATOR" },
  { hue: 280, name: "VIOLET MYSTIC" },
  { hue: 320, name: "MAGENTA PHANTOM" },
];

const ELEMENT_POOL = ["🔥", "⚡", "🌊", "🌀", "🌪️", "💀", "👁️", "🌌", "🧠", "⚔️", "🛡️", "🎲"];

const STRENGTH_POOL = [
  "Faster instinct than 92% of humanity",
  "Fearless under pressure",
  "Natural leader energy",
  "Zero hesitation under fire",
  "Presence that bends the room",
  "Unshakeable composure",
  "Spontaneous creativity",
  "Emotional radar off the charts",
  "Lucky in the exact moments it counts",
  "Immune to peer pressure",
];

const WEAKNESS_POOL = [
  "Drops items when people watch",
  "Talks to objects you've bumped into",
  "Overthinks the perfect comeback (3 days late)",
  "Sweats profusely at small praise",
  "Laughs at the wrong moments",
  "Apologizes to furniture",
  "Freezes in group photos",
  "Says 'you too' to waiters",
  "Picks fights with mirrors",
  "Has never won rock-paper-scissors",
];

const VERDICT_POOL = [
  "The Aura Core detects untapped potential hiding behind a facade of mild awkwardness.",
  "You radiate chaotic energy. Nobody is sure if you're a threat or just really enthusiastic.",
  "The scanner struggled. Your aura is confused but powerful. Like a golden retriever possessed by a CEO.",
  "A rare hybrid aura. Scientists will be studying your vibe for decades.",
  "Your presence is undeniable. Even the scanner feels a little nervous.",
  "Certified aura-rich specimen. Handle with caution: may spontaneously gain followers.",
];

export async function analyzeImage(file: File | Blob): Promise<AuraReading> {
  const bitmap = await createImageBitmap(file);
  const size = 64;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  if (!ctx) throw new Error("Canvas not supported");
  ctx.drawImage(bitmap, 0, 0, size, size);
  const { data } = ctx.getImageData(0, 0, size, size);

  let sumR = 0;
  let sumB = 0;
  let sumSat = 0;
  let sumLight = 0;
  let count = 0;
  const hueBuckets = new Map<number, number>();
  let hash = 7;

  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    sumR += r;
    sumB += b;
    const { h, s, l } = rgbToHsl({ r, g, b });
    sumSat += s;
    sumLight += l;
    const bucket = Math.floor(h / 40) * 40;
    hueBuckets.set(bucket, (hueBuckets.get(bucket) || 0) + 1);
    hash = (hash * 31 + r) % 2147483647;
    hash = (hash * 31 + g) % 2147483647;
    hash = (hash * 31 + b) % 2147483647;
    count++;
  }

  const avgR = sumR / count;
  const avgB = sumB / count;
  const brightness = sumLight / count;
  const saturation = sumSat / count;

  // Dominant hue bucket
  let dominantBucket = 0;
  let maxCount = 0;
  hueBuckets.forEach((c, bucket) => {
    if (c > maxCount) {
      maxCount = c;
      dominantBucket = bucket;
    }
  });
  const dominantHue = dominantBucket + 20;
  const warmthScore = avgR > avgB ? (avgR - avgB) / 255 : (avgB - avgR) / 255;

  // Aura color: shift dominant hue slightly toward warm/gold for "chad energy"
  const auraHue = (dominantHue + 12) % 360;
  const auraColor = hslToHex({ h: auraHue, s: Math.max(0.55, saturation), l: 0.6 });

  const auraName = AURA_NAMES.reduce((closest, a) =>
    Math.abs(a.hue - auraHue) < Math.abs(closest.hue - auraHue) ? a : closest
  ).name;

  const energy = Math.min(1, Math.max(0, saturation * 0.55 + Math.abs(warmthScore) * 0.4 + 0.15));
  const rand = seededRandom(Math.abs(hash));
  const chadPoints = Math.round((500 + rand() * 4500) * (0.75 + energy * 0.75));

  const pick = <T,>(pool: T[], n: number): T[] => {
    const copy = [...pool];
    const out: T[] = [];
    for (let i = 0; i < n && copy.length; i++) {
      const idx = Math.floor(rand() * copy.length);
      out.push(copy.splice(idx, 1)[0]);
    }
    return out;
  };

  return {
    chadPoints,
    auraColor,
    auraName,
    energy,
    brightness,
    warmth: Math.max(-1, Math.min(1, warmthScore)),
    saturation,
    elements: pick(ELEMENT_POOL, 3),
    strengths: pick(STRENGTH_POOL, 3),
    weaknesses: pick(WEAKNESS_POOL, 2),
    verdict: VERDICT_POOL[Math.floor(rand() * VERDICT_POOL.length)],
    seed: Math.abs(hash),
  };
}
