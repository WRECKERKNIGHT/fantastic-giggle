"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AnimeCharacter } from "@/components/Anime/AnimeCharacters";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const TIERS: Array<{
  tier: string;
  tierId: "ultimate_beast" | "giga_chad" | "aura_farmer" | "clown" | "noob";
  symbol: string;
  score: string;
  description: string;
}> = [
  {
    tier: "ULTIMATE BEAST",
    tierId: "ultimate_beast",
    symbol: "♠",
    score: "≥ 18,000",
    description:
      "Absolute gravity-bending presence. You operate on pure instinct. The world bends around your choices.",
  },
  {
    tier: "GIGA CHAD",
    tierId: "giga_chad",
    symbol: "♛",
    score: "10,000 - 17,999",
    description:
      "High presence, massive physical confidence. You handle fumbles like an action star.",
  },
  {
    tier: "AURA FARMER",
    tierId: "aura_farmer",
    symbol: "♧",
    score: "0 - 9,999",
    description:
      "The try-hard black hole. You select the coolest options but take too long. The algorithm spots the desperation.",
  },
  {
    tier: "CLOWN",
    tierId: "clown",
    symbol: "♧",
    score: "-1 to -4,000",
    description:
      "Public chaos incarnate. You drop items, apologize to objects, and laugh off internal screaming.",
  },
  {
    tier: "NOOB",
    tierId: "noob",
    symbol: "♤",
    score: "≤ -4,001",
    description:
      "Absolute aura insolvency. You run with rolling backpacks and apologize to wrong-order waiters.",
  },
];

export function TiersGauntletSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const indexRef = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const track = trackRef.current;
      const section = sectionRef.current;
      if (!track || !section) return;

      const amount = () => track.scrollWidth - window.innerWidth;

      gsap.to(track, {
        x: () => -amount(),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${amount()}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            if (barRef.current) {
              barRef.current.style.transform = `scaleX(${self.progress})`;
            }
            if (indexRef.current) {
              const idx = Math.min(
                TIERS.length - 1,
                Math.floor(self.progress * TIERS.length)
              );
              indexRef.current.textContent = String(idx + 1).padStart(2, "0");
            }
          },
        },
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[var(--ink)]"
      aria-label="The five aura tiers"
    >
      {/* Ink field decorations */}
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,#17130c,#241f17)]" />
      <div className="halftone absolute inset-0 opacity-[0.06] [background-image:radial-gradient(#f4f1ee_1px,transparent_1.5px)]" />

      <div className="relative z-10 h-screen overflow-hidden">
        {/* Fixed rail label */}
        <div className="pointer-events-none absolute inset-x-0 top-8 z-20 flex items-center justify-between px-6 sm:px-10">
          <span className="stamp stamp-invert">THE GAUNTLET</span>
          <span className="hidden font-[var(--font-mono)] text-xs tracking-widest text-[var(--paper)]/70 sm:block">
            KEEP SCROLLING → TRAVERSE ALL 5 TIERS
          </span>
        </div>

        {/* Horizontal track */}
        <div ref={trackRef} className="flex h-full w-max items-center gap-8 px-[12vw] sm:gap-14">
          {TIERS.map((role, index) => (
            <div
              key={role.tier}
              className="w-[78vw] max-w-xl shrink-0 border-2 border-[var(--paper)]/80 bg-[var(--paper-card)] p-8 text-[var(--ink)] shadow-[10px_10px_0_rgba(0,0,0,0.35)]"
            >
              <div className="mb-2 flex items-center justify-between">
                <span className="font-[var(--font-mono)] text-xs font-bold tracking-widest text-[var(--ink-muted)]">
                  TIER {String(index + 1).padStart(2, "0")} / 05
                </span>
                <span className="font-[var(--font-mono)] text-2xl font-black text-[var(--ink)]">
                  {role.symbol}
                </span>
              </div>

              <div className="mb-6 flex justify-center">
                <AnimeCharacter tier={role.tierId} size={200} />
              </div>

              <h3 className="mb-2 text-center font-[var(--font-display)] text-3xl font-black uppercase tracking-tight text-[var(--ink)]">
                {role.tier}
              </h3>
              <p className="mb-6 text-center font-[var(--font-mono)] text-sm text-[var(--ink-muted)]">
                AURA SCORE {role.score}
              </p>
              <p className="text-center text-sm leading-relaxed text-[var(--ink-soft)]">
                {role.description}
              </p>
            </div>
          ))}

          {/* Closing card */}
          <div className="flex w-[70vw] max-w-lg shrink-0 flex-col items-center justify-center border-2 border-dashed border-[var(--paper)]/50 p-8 text-center">
            <span className="mb-4 font-[var(--font-display)] text-4xl font-black uppercase text-[var(--paper)]">
              No escape
            </span>
            <p className="font-[var(--font-mono)] text-sm text-[var(--paper-deep)]">
              WHATEVER YOU PICK, THE SYSTEM WAS WATCHING BEFORE YOU DECIDED.
            </p>
          </div>
        </div>

        {/* Bottom counter + progress bar */}
        <div className="absolute inset-x-0 bottom-8 z-20 flex flex-col items-center gap-3 px-6">
          <div className="flex w-full max-w-3xl items-center gap-4">
            <span className="font-[var(--font-mono)] text-xs font-bold text-[var(--paper)]/80">
              TIER
            </span>
            <div className="h-[3px] flex-1 overflow-hidden border border-[var(--paper)]/30 bg-transparent">
              <div
                ref={barRef}
                className="h-full w-full origin-left bg-[var(--paper)]"
                style={{ transform: "scaleX(0)" }}
              />
            </div>
            <span className="font-[var(--font-mono)] text-xs font-bold text-[var(--paper)]">
              <span ref={indexRef}>01</span> / 05
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
