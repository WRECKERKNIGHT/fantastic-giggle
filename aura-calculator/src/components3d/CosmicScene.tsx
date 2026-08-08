"use client";

// ===== SKETCHBOOK BACKDROP =====
// Pure-CSS monochrome background: paper grain, cross-hatch corners,
// halftone dust, faint sketched stars and a hand-drawn vignette ring.
// No WebGL. Zero colour. Zero jank.

function buildStars() {
  // Deterministic seeded star placement
  let seed = 7;
  const rand = () => {
    seed = (seed * 16807) % 2147483647;
    return (seed - 1) / 2147483646;
  };
  return Array.from({ length: 42 }, (_, i) => ({
    id: i,
    left: rand() * 100,
    top: rand() * 100,
    size: 1 + rand() * 2,
    delay: rand() * 4,
  }));
}

const STARS = buildStars();

export function CosmicScene() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* Paper base */}
      <div className="absolute inset-0 bg-[var(--paper)]" />

      {/* Faint halftone dust */}
      <div className="halftone absolute inset-0 opacity-40" />

      {/* Cross-hatch corner plates */}
      <div
        className="crosshatch absolute -top-2 -left-2 h-72 w-72 opacity-30"
        style={{ clipPath: "polygon(0 0, 100% 0, 0 100%)" }}
      />
      <div
        className="crosshatch absolute -right-2 -bottom-2 h-72 w-72 opacity-30"
        style={{ clipPath: "polygon(100% 100%, 100% 0, 0 100%)" }}
      />

      {/* Sketched stars */}
      {STARS.map((s) => (
        <span
          key={s.id}
          className="absolute rounded-full bg-[var(--ink)]"
          style={{
            left: `${s.left}%`,
            top: `${s.top}%`,
            width: s.size,
            height: s.size,
            opacity: 0.14,
          }}
        />
      ))}

      {/* Hand-drawn scribble ring (top-right) */}
      <svg
        className="absolute -top-24 -right-24 h-96 w-96 opacity-[0.08]"
        viewBox="0 0 200 200"
        fill="none"
      >
        <circle cx="100" cy="100" r="96" stroke="#14110c" strokeWidth="2" />
        <circle
          cx="100"
          cy="100"
          r="86"
          stroke="#14110c"
          strokeWidth="1"
          strokeDasharray="6 4"
        />
        <path d="M40,60 Q30,100 55,130 Q85,165 145,150 Q185,135 170,85 Q155,35 100,35 Q55,35 45,75" stroke="#14110c" strokeWidth="1.5" />
      </svg>

      {/* Hand-drawn scribble ring (bottom-left) */}
      <svg
        className="absolute -bottom-28 -left-28 h-[26rem] w-[26rem] opacity-[0.07]"
        viewBox="0 0 200 200"
        fill="none"
      >
        <circle cx="100" cy="100" r="96" stroke="#14110c" strokeWidth="2" />
        <path d="M60,140 Q35,105 55,65 Q80,20 135,40 Q180,60 170,115 Q160,165 105,170 Q55,170 45,120" stroke="#14110c" strokeWidth="1.5" />
      </svg>

      {/* Ink vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 55%, rgba(20,17,12,0.05) 85%, rgba(20,17,12,0.12) 100%)",
        }}
      />
    </div>
  );
}
