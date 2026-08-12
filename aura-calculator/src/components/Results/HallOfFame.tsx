"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Trophy, History, Trash2, Crown } from "lucide-react";
import {
  FameEntry,
  getAuraHistory,
  getAuraLeaderboard,
  clearAuraHistory,
} from "@/lib/auraHallOfFame";

const MEDALS = ["#ffd700", "#c0c0c0", "#cd7f32"];
const INK_MEDAL_TEXT = "#14110c";

const REFRESH_EVENT = "aura-fame-updated";

function timeAgo(timestamp: number): string {
  const diff = Date.now() - timestamp;
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "JUST NOW";
  if (mins < 60) return `${mins}M AGO`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}H AGO`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}D AGO`;
  return new Date(timestamp).toLocaleDateString();
}

function ModeBadge({ mode }: { mode: FameEntry["mode"] }) {
  return (
    <span
      className={`px-2 py-0.5 font-[var(--font-mono)] text-[10px] font-bold tracking-widest ${
        mode === "full" ? "bg-[var(--ink)] text-[var(--paper)]" : "border border-[var(--ink)] text-[var(--ink)]"
      }`}
    >
      {mode === "full" ? "EXAM" : "QUICK"}
    </span>
  );
}

export function HallOfFame() {
  const [history, setHistory] = useState<FameEntry[]>(() =>
    getAuraHistory().slice(0, 10)
  );
  const [leaderboard, setLeaderboard] = useState<FameEntry[]>(() =>
    getAuraLeaderboard(undefined, 10)
  );

  useEffect(() => {
    const refresh = () => {
      setHistory(getAuraHistory().slice(0, 10));
      setLeaderboard(getAuraLeaderboard(undefined, 10));
    };
    window.addEventListener(REFRESH_EVENT, refresh);
    window.addEventListener("storage", refresh);
    return () => {
      window.removeEventListener(REFRESH_EVENT, refresh);
      window.removeEventListener("storage", refresh);
    };
  }, []);

  const handleClear = () => {
    clearAuraHistory();
    setHistory([]);
    setLeaderboard([]);
  };

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      {/* Leaderboard */}
      <div className="sketch-card p-6">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-[var(--ink)]" />
            <span className="font-[var(--font-mono)] text-sm font-bold tracking-widest text-[var(--ink)]">
              HALL OF FAME
            </span>
          </div>
        </div>

        {leaderboard.length === 0 ? (
          <p className="py-6 text-center font-[var(--font-mono)] text-xs text-[var(--ink-faint)]">
            NO LEGENDS YET — TAKE THE TEST TO CLAIM THE TOP SPOT.
          </p>
        ) : (
          <ul className="space-y-2">
            {leaderboard.map((entry, i) => (
              <motion.li
                key={entry.id}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.06 }}
                className="flex items-center gap-3 border-b border-[var(--ink-line-faint)] py-2"
              >
                <span
                  className="flex h-8 w-8 shrink-0 items-center justify-center font-[var(--font-mono)] text-sm font-black"
                  style={{
                    backgroundColor: i < 3 ? MEDALS[i] : "transparent",
                    color: i < 3 ? INK_MEDAL_TEXT : undefined,
                    border: i >= 3 ? "1px solid var(--ink)" : "none",
                  }}
                >
                  {i === 0 ? <Crown className="h-4 w-4" /> : i + 1}
                </span>
                <span className="flex-1 truncate font-[var(--font-mono)] text-sm font-bold text-[var(--ink)]">
                  {entry.emoji} {entry.label}
                </span>
                <ModeBadge mode={entry.mode} />
                <span className="font-[var(--font-mono)] text-sm font-bold text-[var(--ink)]">
                  {entry.score.toLocaleString()}
                </span>
              </motion.li>
            ))}
          </ul>
        )}
      </div>

      {/* Recent history */}
      <div className="sketch-card p-6">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <History className="h-5 w-5 text-[var(--ink)]" />
            <span className="font-[var(--font-mono)] text-sm font-bold tracking-widest text-[var(--ink)]">
              YOUR HISTORY
            </span>
          </div>
          {history.length > 0 && (
            <button
              onClick={handleClear}
              className="flex items-center gap-1 font-[var(--font-mono)] text-[11px] font-bold text-[var(--ink-muted)] transition-colors hover:text-[var(--ink)]"
              aria-label="Clear hall of fame history"
            >
              <Trash2 className="h-3.5 w-3.5" />
              CLEAR
            </button>
          )}
        </div>

        {history.length === 0 ? (
          <p className="py-6 text-center font-[var(--font-mono)] text-xs text-[var(--ink-faint)]">
            NO READINGS YET.
          </p>
        ) : (
          <ul className="space-y-2">
            {history.map((entry, i) => (
              <motion.li
                key={entry.id}
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="flex items-center gap-3 border-b border-[var(--ink-line-faint)] py-2"
              >
                <span className="text-base">{entry.emoji}</span>
                <span className="flex-1 truncate font-[var(--font-mono)] text-sm text-[var(--ink-soft)]">
                  {entry.label}
                </span>
                <ModeBadge mode={entry.mode} />
                <span className="font-[var(--font-mono)] text-sm font-bold text-[var(--ink)]">
                  {entry.score.toLocaleString()}
                </span>
                <span className="hidden font-[var(--font-mono)] text-[10px] text-[var(--ink-faint)] sm:inline">
                  {timeAgo(entry.timestamp)}
                </span>
              </motion.li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
