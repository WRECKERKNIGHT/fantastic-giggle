"use client";

import { useEffect, useRef, useState } from "react";

const GLYPHS = "!<>-_\\/[]{}—=+*^?#_%&$@";

export function GlitchText({
  text,
  className = "",
}: {
  text: string;
  className?: string;
}) {
  const [display, setDisplay] = useState(text);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  const scramble = () => {
    if (timer.current) clearInterval(timer.current);

    let iter = 0;
    timer.current = setInterval(() => {
      setDisplay(
        text
          .split("")
          .map((char, index) =>
            index < iter
              ? char
              : char === " "
                ? " "
                : GLYPHS[Math.floor(Math.random() * GLYPHS.length)]
          )
          .join("")
      );
      iter += 1;
      if (iter > text.length) {
        if (timer.current) clearInterval(timer.current);
        setDisplay(text);
      }
    }, 24);
  };

  const reset = () => {
    if (timer.current) clearInterval(timer.current);
    setDisplay(text);
  };

  useEffect(() => {
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, []);

  return (
    <span
      className={className}
      onMouseEnter={scramble}
      onMouseLeave={reset}
      aria-label={text}
    >
      {display}
    </span>
  );
}
