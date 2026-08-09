"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function InkCursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);

  const dotX = useSpring(x, { stiffness: 900, damping: 42, mass: 0.3 });
  const dotY = useSpring(y, { stiffness: 900, damping: 42, mass: 0.3 });
  const ringX = useSpring(x, { stiffness: 200, damping: 24, mass: 0.7 });
  const ringY = useSpring(y, { stiffness: 200, damping: 24, mass: 0.7 });

  const [hovering, setHovering] = useState(false);
  const [pressed, setPressed] = useState(false);
  const [label, setLabel] = useState("");

  useEffect(() => {
    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };

    const over = (e: MouseEvent) => {
      const target = (e.target as HTMLElement | null)?.closest?.(
        "a, button, [data-cursor], [data-cursor-label]"
      ) as HTMLElement | null;

      if (target) {
        setHovering(true);
        setLabel(target.dataset.cursorLabel ?? "");
      } else {
        setHovering(false);
        setLabel("");
      }
    };

    const down = () => setPressed(true);
    const up = () => setPressed(false);

    window.addEventListener("mousemove", move, { passive: true });
    window.addEventListener("mouseover", over, { passive: true });
    window.addEventListener("mousedown", down);
    window.addEventListener("mouseup", up);

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
      window.removeEventListener("mousedown", down);
      window.removeEventListener("mouseup", up);
    };
  }, [x, y]);

  return (
    <div className="ink-cursor" aria-hidden="true">
      {/* Trailing ring */}
      <motion.div
        className="absolute left-0 top-0"
        style={{ x: ringX, y: ringY }}
      >
        <motion.div
          animate={{
            scale: pressed ? 0.7 : hovering ? label ? 2.6 : 1.8 : 1,
          }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className="flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-[var(--ink)]"
        >
          {label && (
            <motion.span
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              className="px-1 font-[var(--font-mono)] text-[9px] font-bold tracking-widest text-[var(--ink)]"
            >
              {label}
            </motion.span>
          )}
        </motion.div>
      </motion.div>

      {/* Ink dot */}
      <motion.div className="absolute left-0 top-0" style={{ x: dotX, y: dotY }}>
        <motion.div
          animate={{ scale: hovering ? 0.4 : pressed ? 1.6 : 1 }}
          transition={{ type: "spring", stiffness: 400, damping: 24 }}
          className="h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--ink)]"
        />
      </motion.div>
    </div>
  );
}
