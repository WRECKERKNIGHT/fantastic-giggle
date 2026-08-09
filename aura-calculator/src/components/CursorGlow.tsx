"use client";

import { useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function CursorGlow() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 280, damping: 28, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 280, damping: 28, mass: 0.5 });

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [x, y]);

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[80] h-0 w-0"
      style={{ x: sx, y: sy }}
    >
      <div className="-translate-x-1/2 -translate-y-1/2 h-[480px] w-[480px] rounded-full bg-[radial-gradient(circle,rgba(20,17,12,0.08)_0%,rgba(20,17,12,0.04)_40%,transparent_70%)]" />
    </motion.div>
  );
}
