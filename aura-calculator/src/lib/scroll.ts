"use client";

import type Lenis from "lenis";

let lenis: Lenis | null = null;

export function setLenisInstance(instance: Lenis | null) {
  lenis = instance;
}

export function smoothScrollTo(
  target: number | string | HTMLElement,
  options?: { duration?: number }
) {
  if (lenis) {
    lenis.scrollTo(target, { duration: options?.duration ?? 1.1 });
    return;
  }
  if (typeof target === "number") {
    window.scrollTo({ top: target, behavior: "smooth" });
  } else if (typeof target === "string") {
    document.querySelector(target)?.scrollIntoView({ behavior: "smooth" });
  } else {
    target.scrollIntoView({ behavior: "smooth" });
  }
}
