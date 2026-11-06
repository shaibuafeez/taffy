"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * The giant footer wordmark. Letters are taffy: they pull up toward the
 * cursor and spring back when it leaves. On first sight they're yanked
 * out of the floor.
 */
export function StretchWordmark({
  word = "Taffy",
  size = "text-[clamp(120px,33vw,560px)] leading-[0.76]",
  className = "justify-center pt-[5vw]",
  as: Tag = "div",
}: {
  word?: string;
  size?: string;
  className?: string;
  as?: "div" | "h1";
}) {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const letters = Array.from(el.querySelectorAll<HTMLSpanElement>("[data-l]"));
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const setters = letters.map((l) => gsap.quickTo(l, "scaleY", { duration: 0.9, ease: "elastic.out(1, 0.35)" }));
    const skew = letters.map((l) => gsap.quickTo(l, "skewX", { duration: 0.9, ease: "elastic.out(1, 0.35)" }));

    const intro = gsap.fromTo(
      letters,
      { scaleY: 0.08 },
      {
        scaleY: 1,
        duration: 1.6,
        ease: "elastic.out(1, 0.28)",
        stagger: 0.07,
        scrollTrigger: { trigger: el, start: "top 95%", once: true },
      },
    );

    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      letters.forEach((l, i) => {
        const lr = l.getBoundingClientRect();
        const cx = lr.left + lr.width / 2;
        const dx = (e.clientX - cx) / r.width;
        const near = Math.max(0, 1 - Math.abs(dx) * 2.4);
        const above = Math.max(0, Math.min(1, (lr.bottom - e.clientY) / lr.height));
        setters[i](1 + near * (0.18 + above * 0.32));
        skew[i](-dx * near * 14);
      });
    };
    const leave = () => {
      setters.forEach((s) => s(1));
      skew.forEach((s) => s(0));
    };
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerleave", leave);
    return () => {
      intro.scrollTrigger?.kill();
      intro.kill();
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerleave", leave);
    };
  }, []);

  return (
    <Tag
      ref={root as React.RefObject<HTMLDivElement & HTMLHeadingElement>}
      className={`relative flex select-none items-end overflow-hidden ${className}`}
      aria-label={word}
      role={Tag === "div" ? "img" : undefined}
    >
      {word.split("").map((c, i) => (
        <span
          key={i}
          data-l
          aria-hidden="true"
          className={`display -mx-[0.025em] inline-block origin-bottom will-change-transform ${size}`}
        >
          {c}
        </span>
      ))}
    </Tag>
  );
}
