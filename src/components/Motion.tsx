"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

export const reducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Smooth scroll for the whole session. Lenis drives ScrollTrigger. */
export function SmoothScroll() {
  const pathname = usePathname();

  useEffect(() => {
    if (reducedMotion()) return;
    const lenis = new Lenis({ lerp: 0.12, wheelMultiplier: 1, anchors: { offset: -88 } });
    (window as unknown as { __lenis?: Lenis }).__lenis = lenis;
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (t: number) => lenis.raf(t * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      delete (window as unknown as { __lenis?: Lenis }).__lenis;
    };
  }, []);

  useEffect(() => {
    if (window.location.hash) return;
    const lenis = (window as unknown as { __lenis?: Lenis }).__lenis;
    if (lenis) lenis.scrollTo(0, { immediate: true });
    else window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

/**
 * Declarative motion. Pages mark elements; this wires them up per route.
 *   data-reveal   fade and rise when it enters
 *   data-draw     SVG strokes draw themselves in
 *   data-stamp    rubber stamp comes down (value = rotation in degrees)
 *   data-count    number counts up (data-prefix, data-suffix)
 */
export function Motion() {
  const pathname = usePathname();

  useEffect(() => {
    if (reducedMotion()) return;
    const ctx = gsap.context(() => {
      ScrollTrigger.batch("[data-reveal]", {
        start: "top 90%",
        once: true,
        onEnter: (els) =>
          gsap.to(els, { opacity: 1, y: 0, duration: 0.9, ease: "expo.out", stagger: 0.07, overwrite: true }),
      });

      gsap.utils.toArray<SVGSVGElement>("[data-draw]").forEach((svg) => {
        const paths = svg.querySelectorAll<SVGGeometryElement>("path");
        paths.forEach((p) => {
          const len = Math.ceil(p.getTotalLength?.() ?? 200) + 2;
          p.style.strokeDasharray = `${len}`;
          p.style.strokeDashoffset = `${len}`;
        });
        gsap.to(paths, {
          strokeDashoffset: 0,
          duration: 0.7,
          ease: "power2.inOut",
          stagger: 0.12,
          scrollTrigger: { trigger: svg, start: "top 90%", once: true },
        });
      });

      gsap.utils.toArray<HTMLElement>("[data-stamp]").forEach((el) => {
        const rot = Number(el.dataset.stamp || -9);
        gsap.fromTo(
          el,
          { opacity: 0, scale: 2.3, rotate: rot - 12 },
          {
            opacity: 1,
            scale: 1,
            rotate: rot,
            duration: 0.42,
            ease: "power4.in",
            delay: Number(el.dataset.delay || 0),
            scrollTrigger: { trigger: el, start: "top 88%", once: true },
            onComplete: () => {
              gsap.fromTo(el.parentElement, { x: -3 }, { x: 0, duration: 0.35, ease: "elastic.out(1.4, 0.3)" });
            },
          },
        );
      });

      gsap.utils.toArray<HTMLElement>("[data-count]").forEach((el) => {
        const end = Number(el.dataset.count);
        const pre = el.dataset.prefix || "";
        const suf = el.dataset.suffix || "";
        const o = { v: 0 };
        el.textContent = pre + "0" + suf;
        gsap.to(o, {
          v: end,
          duration: 1.6,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 92%", once: true },
          onUpdate: () => {
            el.textContent = pre + Math.round(o.v).toLocaleString("en-US") + suf;
          },
        });
      });
    });

    const refresh = () => ScrollTrigger.refresh();
    document.fonts?.ready.then(refresh);
    const t = window.setTimeout(refresh, 600);

    return () => {
      window.clearTimeout(t);
      ctx.revert();
    };
  }, [pathname]);

  return null;
}
