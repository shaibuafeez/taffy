"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

const reduced = () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Smooth scroll for the whole session. Lenis drives ScrollTrigger. */
export function SmoothScroll() {
  const pathname = usePathname();

  useEffect(() => {
    if (reduced()) return;
    const lenis = new Lenis({ lerp: 0.11, wheelMultiplier: 1 });
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
    const lenis = (window as unknown as { __lenis?: Lenis }).__lenis;
    if (window.location.hash) return;
    if (lenis) lenis.scrollTo(0, { immediate: true });
    else window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

/**
 * Declarative motion. Pages mark elements, this wires them up per route:
 *   data-reveal      fade + rise when it enters
 *   data-draw        SVG strokes draw themselves in
 *   data-stamp       rubber stamp slams down
 *   data-count       number counts up (data-decimals, data-prefix, data-suffix)
 *   data-print       receipt prints from the top
 *   data-drift       slow parallax (value = pixels)
 */
export function Motion() {
  const pathname = usePathname();

  useEffect(() => {
    if (reduced()) return;
    const ctx = gsap.context(() => {
      ScrollTrigger.batch("[data-reveal]", {
        start: "top 90%",
        once: true,
        onEnter: (els) =>
          gsap.to(els, { opacity: 1, y: 0, duration: 0.9, ease: "expo.out", stagger: 0.07, overwrite: true }),
      });

      gsap.utils.toArray<SVGSVGElement>("[data-draw]").forEach((svg) => {
        const paths = svg.querySelectorAll<SVGGeometryElement>("path, ellipse");
        paths.forEach((p) => {
          const len = Math.ceil(p.getTotalLength?.() ?? 600) + 2;
          p.style.strokeDasharray = `${len}`;
          p.style.strokeDashoffset = `${len}`;
        });
        gsap.to(paths, {
          strokeDashoffset: 0,
          duration: 0.9,
          ease: "power2.inOut",
          stagger: 0.18,
          scrollTrigger: { trigger: svg, start: "top 88%", once: true },
        });
      });

      gsap.utils.toArray<HTMLElement>("[data-stamp]").forEach((el, i) => {
        const rot = Number(el.dataset.stamp || (i % 2 ? 8 : -9));
        gsap.fromTo(
          el,
          { opacity: 0, scale: 2.4, rotate: rot - 14 },
          {
            opacity: 1,
            scale: 1,
            rotate: rot,
            duration: 0.42,
            ease: "power4.in",
            delay: i * 0.12,
            scrollTrigger: { trigger: el, start: "top 85%", once: true },
            onComplete: () => {
              gsap.fromTo(el.parentElement, { x: -3 }, { x: 0, duration: 0.3, ease: "elastic.out(1.4, 0.3)" });
            },
          },
        );
      });

      gsap.utils.toArray<HTMLElement>("[data-count]").forEach((el) => {
        const end = Number(el.dataset.count);
        const dec = Number(el.dataset.decimals || 0);
        const pre = el.dataset.prefix || "";
        const suf = el.dataset.suffix || "";
        const fmt = (v: number) =>
          pre + v.toLocaleString("en-US", { minimumFractionDigits: dec, maximumFractionDigits: dec }) + suf;
        const o = { v: 0 };
        el.textContent = fmt(0);
        gsap.to(o, {
          v: end,
          duration: 1.8,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 90%", once: true },
          onUpdate: () => {
            el.textContent = fmt(o.v);
          },
        });
      });

      gsap.utils.toArray<HTMLElement>("[data-print]").forEach((el) => {
        gsap.fromTo(
          el,
          { clipPath: "inset(0 0 100% 0)" },
          {
            clipPath: "inset(0 0 0% 0)",
            duration: 1.6,
            ease: "steps(18)",
            scrollTrigger: { trigger: el, start: "top 80%", once: true },
          },
        );
      });

      gsap.utils.toArray<HTMLElement>("[data-drift]").forEach((el) => {
        const d = Number(el.dataset.drift || 60);
        gsap.fromTo(
          el,
          { y: d },
          { y: -d, ease: "none", scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true } },
        );
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
