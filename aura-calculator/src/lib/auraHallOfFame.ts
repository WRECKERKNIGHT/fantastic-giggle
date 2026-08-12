// ===== HALL OF FAME — LOCAL HISTORY + LEADERBOARD STORAGE =====

export type FameEntry = {
  id: string;
  mode: "full" | "quick" | "scan";
  tier: string;
  emoji: string;
  label: string;
  score: number;
  timestamp: number;
};

const STORAGE_KEY = "auraHallOfFame";
const MAX_ENTRIES = 30;
const REFRESH_EVENT = "aura-fame-updated";

function notifyUpdated() {
  try {
    if (typeof window !== "undefined") {
      window.dispatchEvent(new Event(REFRESH_EVENT));
    }
  } catch {
    // ignore
  }
}

function readEntries(): FameEntry[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeEntries(entries: FameEntry[]) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
  } catch {
    // Storage unavailable (private mode / quota) — fail silently
  }
}

function makeId(): string {
  try {
    if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
      return crypto.randomUUID();
    }
  } catch {
    // fall through
  }
  return `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

export function saveAuraEntry(entry: Omit<FameEntry, "id" | "timestamp">): FameEntry {
  const full: FameEntry = { ...entry, id: makeId(), timestamp: Date.now() };
  const entries = readEntries();

  // Dedupe identical results within 24h so retakes don't spam the board
  const dayAgo = Date.now() - 24 * 60 * 60 * 1000;
  const isDuplicate = entries.some(
    (e) =>
      e.mode === full.mode &&
      e.score === full.score &&
      e.label === full.label &&
      e.timestamp > dayAgo
  );
  if (isDuplicate) return full;

  writeEntries([full, ...entries].slice(0, MAX_ENTRIES));
  notifyUpdated();
  return full;
}

export function getAuraHistory(): FameEntry[] {
  return readEntries().sort((a, b) => b.timestamp - a.timestamp);
}

export function getAuraLeaderboard(
  mode?: "full" | "quick",
  limit = 10
): FameEntry[] {
  const entries = readEntries().filter((e) => (mode ? e.mode === mode : true));
  return entries.sort((a, b) => b.score - a.score).slice(0, limit);
}

export function clearAuraHistory() {
  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch {
    // ignore
  }
}
