"use client";

import type { CSSProperties } from "react";

const SEPARATORS = ["✕", "♠", "♛", "♧", "♤", "☍", "△", "✱"];

export function Marquee({
  items,
  reverse = false,
  inverted = false,
  speed = 26,
}: {
  items: string[];
  reverse?: boolean;
  inverted?: boolean;
  speed?: number;
}) {
  const row = (keyPrefix: string) => (
    <div
      key={keyPrefix}
      className="flex w-max shrink-0 items-center gap-8 pr-8"
      aria-hidden={keyPrefix === "b"}
    >
      {items.map((item, i) => (
        <span
          key={`${keyPrefix}-${i}`}
          className="flex items-center gap-8 whitespace-nowrap"
        >
          <span
            className={`font-[var(--font-mono)] text-sm font-bold uppercase tracking-[0.35em] ${
              inverted ? "text-[var(--paper)]" : "text-[var(--ink)]"
            }`}
          >
            {item}
          </span>
          <span
            className={`text-lg ${inverted ? "text-[var(--paper)]/50" : "text-[var(--ink)]/40"}`}
          >
            {SEPARATORS[i % SEPARATORS.length]}
          </span>
        </span>
      ))}
    </div>
  );

  return (
    <div
      className={`marquee overflow-hidden ${reverse ? "marquee-reverse" : ""}`}
    >
      <div
        className="marquee-track flex w-max will-change-transform"
        style={{ "--marquee-speed": `${speed}s` } as CSSProperties}
      >
        {row("a")}
        {row("b")}
      </div>
    </div>
  );
}
