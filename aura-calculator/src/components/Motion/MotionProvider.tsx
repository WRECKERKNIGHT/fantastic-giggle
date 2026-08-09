"use client";

import { useEffect, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { getLenisInstance } from "@/lib/scroll";

gsap.registerPlugin(ScrollTrigger);

gsap.defaults({ ease: "power3.out", duration: 0.85 });

const reduceMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function splitWords(element: HTMLElement) {
  if (element.dataset.motionSplit === "true") return;

  const text = element.textContent || "";
  const parts = text.split(/(\s+)/);

  element.textContent = "";
  element.setAttribute("aria-label", text.trim());

  let index = 0;
  parts.forEach((part) => {
    if (!part.trim()) {
      element.appendChild(document.createTextNode(part));
      return;
    }

    const mask = document.createElement("span");
    const word = document.createElement("span");

    mask.className = "motion-word-mask";
    mask.setAttribute("aria-hidden", "true");
    word.className = "motion-word";
    word.textContent = part;
    word.style.setProperty("--word-index", String(index));

    mask.appendChild(word);
    element.appendChild(mask);
    index += 1;
  });

  element.dataset.motionSplit = "true";
}

const revealPresets = {
  "fade-up": { from: { y: 32, autoAlpha: 0 }, to: { y: 0, autoAlpha: 1 } },
  "blur-in": {
    from: { y: 18, autoAlpha: 0, filter: "blur(10px)" },
    to: { y: 0, autoAlpha: 1, filter: "blur(0px)" },
  },
  scale: { from: { scale: 0.96, autoAlpha: 0 }, to: { scale: 1, autoAlpha: 1 } },
  "slide-left": { from: { x: 48, autoAlpha: 0 }, to: { x: 0, autoAlpha: 1 } },
  "slide-right": { from: { x: -48, autoAlpha: 0 }, to: { x: 0, autoAlpha: 1 } },
};

export function MotionProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    if (reduceMotion()) return;

    document.documentElement.classList.add("has-motion");

    // Keep ScrollTrigger in sync with the Lenis smooth-scroll instance.
    const lenis = getLenisInstance();
    const unsubscribe = lenis?.on("scroll", ScrollTrigger.update);

    const ctx = gsap.context(() => {
      // ---- Staggered word reveals ----
      gsap.utils.toArray<HTMLElement>("[data-motion-text='words']").forEach((element) => {
        splitWords(element);
        const words = element.querySelectorAll(".motion-word");

        gsap.set(element, { autoAlpha: 1 });
        gsap.fromTo(
          words,
          { yPercent: 110, autoAlpha: 0, filter: "blur(8px)" },
          {
            yPercent: 0,
            autoAlpha: 1,
            filter: "blur(0px)",
            duration: 0.9,
            ease: "power4.out",
            stagger: 0.055,
            clearProps: "transform,filter",
            scrollTrigger: { trigger: element, start: "top 82%", once: true },
          }
        );
      });

      // ---- Scroll reveals ----
      gsap.utils.toArray<HTMLElement>("[data-reveal-group]").forEach((group) => {
        const items = group.querySelectorAll("[data-reveal-item]");
        gsap.set(group, { autoAlpha: 1 });
        gsap.fromTo(
          items,
          { y: 36, autoAlpha: 0, filter: "blur(8px)" },
          {
            y: 0,
            autoAlpha: 1,
            filter: "blur(0px)",
            duration: 0.95,
            ease: "power4.out",
            stagger: 0.075,
            clearProps: "transform,filter",
            scrollTrigger: { trigger: group, start: "top 82%", once: true },
          }
        );
      });

      gsap.utils
        .toArray<HTMLElement>("[data-reveal]:not([data-reveal-item])")
        .forEach((element) => {
          const key = (element.dataset.reveal ?? "fade-up") as keyof typeof revealPresets;
          const preset = revealPresets[key] ?? revealPresets["fade-up"];
          gsap.set(element, { autoAlpha: 1 });
          gsap.fromTo(
            element,
            preset.from,
            {
              ...preset.to,
              duration: 0.9,
              ease: "power4.out",
              delay: Number(element.dataset.revealDelay || 0),
              clearProps: "transform,filter",
              scrollTrigger: { trigger: element, start: "top 84%", once: true },
            }
          );
        });

      // ---- Parallax layers (scroll) ----
      gsap.utils
        .toArray<HTMLElement>("[data-parallax-layer]")
        .forEach((layer) => {
          const speed = Number(layer.dataset.parallaxSpeed || 0.18);
          const section =
            layer.closest<HTMLElement>("[data-parallax-section]") || layer;

          gsap.to(layer, {
            y: () => window.innerHeight * speed * -1,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.2,
              invalidateOnRefresh: true,
            },
          });
        });

      // ---- Mouse-reactive depth layers ----
      if (window.matchMedia("(pointer: fine)").matches) {
        gsap.utils
          .toArray<HTMLElement>("[data-mouse-parallax]")
          .forEach((section) => {
            const layers = section.querySelectorAll("[data-mouse-depth]");
            const setters = Array.from(layers).map((layer) => {
              const depth = Number(
                (layer as HTMLElement).dataset.mouseDepth || 0.04
              );
              return {
                layer,
                depth,
                xTo: gsap.quickTo(layer, "x", { duration: 0.8, ease: "power3.out" }),
                yTo: gsap.quickTo(layer, "y", { duration: 0.8, ease: "power3.out" }),
              };
            });

            section.addEventListener("pointermove", (event) => {
              const rect = section.getBoundingClientRect();
              const x = event.clientX - rect.left - rect.width / 2;
              const y = event.clientY - rect.top - rect.height / 2;

              setters.forEach(({ depth, xTo, yTo }) => {
                xTo(x * depth);
                yTo(y * depth);
              });
            });

            section.addEventListener("pointerleave", () => {
              setters.forEach(({ xTo, yTo }) => {
                xTo(0);
                yTo(0);
              });
            });
          });
      }
    });

    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener("load", onLoad);

    return () => {
      window.removeEventListener("load", onLoad);
      unsubscribe?.();
      ctx.revert();
      document.documentElement.classList.remove("has-motion");
    };
  }, []);

  return <>{children}</>;
}
