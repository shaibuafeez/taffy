"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef } from "react";
import gsap from "gsap";
import { blackout, brand } from "@/content";
import { Candy } from "./Art";
import { Arrow, Sparkle } from "./Scribble";

type Tok = { keep: boolean; text: string };

function tokenize(src: string): Tok[] {
  const out: Tok[] = [];
  src.split(/(\[\[.+?\]\])/g).forEach((part) => {
    if (!part) return;
    if (part.startsWith("[[")) out.push({ keep: true, text: part.slice(2, -2) });
    else part.split(/\s+/).filter(Boolean).forEach((w) => out.push({ keep: false, text: w }));
  });
  return out;
}

/**
 * Newspaper blackout, after Austin Kleon. A column of market news is
 * redacted word by word with a marker until only the poem is left.
 * Creativity is subtraction.
 */
export function BlackoutHero() {
  const root = useRef<HTMLElement>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);
  const toks = useMemo(() => tokenize(blackout.text), []);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const bars = el.querySelectorAll<HTMLElement>(".bo-bar");
    const hls = el.querySelectorAll<HTMLElement>(".bo-hl");
    const keeps = el.querySelectorAll<HTMLElement>(".bo-keep");
    const after = el.querySelectorAll<HTMLElement>("[data-after]");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduced) {
      gsap.set([...bars, ...hls], { scaleX: 1 });
      gsap.set(after, { opacity: 1, y: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.set(after, { opacity: 0, y: 24 });
      const t = gsap.timeline({ delay: 0.55 });
      t.fromTo(
        bars,
        { scaleX: 0 },
        { scaleX: 1, duration: 0.17, ease: "power2.out", stagger: { each: 0.021 } },
      )
        .to(keeps, { color: "#16130f", duration: 0.01 }, "<")
        .fromTo(hls, { scaleX: 0 }, { scaleX: 1, duration: 0.42, ease: "power3.inOut", stagger: 0.26 }, "-=0.1")
        .fromTo(keeps, { y: 0 }, { y: -3, duration: 0.25, yoyo: true, repeat: 1, stagger: 0.26, ease: "sine.inOut" }, "<")
        .to(after, { opacity: 1, y: 0, duration: 0.9, ease: "expo.out", stagger: 0.08 }, "-=0.5");
      tl.current = t;
    }, el);

    // Impatient? Click or press a key and the marker finishes the job.
    const skip = () => tl.current && tl.current.progress() < 1 && tl.current.timeScale(6);
    el.addEventListener("pointerdown", skip);
    window.addEventListener("keydown", skip);
    return () => {
      el.removeEventListener("pointerdown", skip);
      window.removeEventListener("keydown", skip);
      ctx.revert();
    };
  }, []);

  let wi = 0;
  return (
    <section ref={root} className="relative overflow-hidden pb-24 pt-8 md:pb-32">
      <h1 className="sr-only">
        {brand.tagline} {brand.name}.
      </h1>

      <div className="wrap" aria-hidden="true">
        {/* Masthead */}
        <div className="border-y-[3px] border-double border-ink py-3">
          <div className="mono flex items-center justify-between gap-4 text-[11px] uppercase tracking-[0.18em] text-ink-2 sm:text-[12px]">
            {blackout.edition.map((e, i) => (
              <span key={e} className={i > 1 ? "hidden sm:inline" : ""}>
                {e}
              </span>
            ))}
          </div>
        </div>
        <p className="display py-4 text-center text-[clamp(52px,10.4vw,168px)] leading-[0.8] tracking-[-0.055em]">
          {blackout.masthead}
        </p>
        <div className="rule-x" />
      </div>

      <div className="wrap mt-8 grid gap-10 md:mt-12 md:grid-cols-12 md:gap-8">
        {/* The column */}
        <div className="md:col-span-8">
          <p className="eyebrow mb-4 flex items-center gap-2 text-ink" aria-hidden="true">
            <span className="inline-block h-2.5 w-2.5 bg-pink" /> {blackout.kicker}
          </p>
          <p
            aria-hidden="true"
            className="news text-[clamp(21px,2.45vw,38px)] leading-[1.36] tracking-[-0.01em] text-ink-2 [text-align:justify]"
          >
            {toks.map((t, i) =>
              t.keep ? (
                <span key={i}>
                  <span className="bo-keep font-semibold">
                    <span className="bo-hl" />
                    {t.text}
                  </span>{" "}
                </span>
              ) : (
                <span key={i} className="bo-word">
                  {t.text}
                  <span className="bo-bar" style={{ rotate: `${(((wi++ * 37) % 7) - 3) * 0.28}deg` }} />{" "}
                </span>
              ),
            )}
          </p>

          <div className="mt-12 grid gap-8 md:grid-cols-[1fr_auto] md:items-end">
            <p data-after className="pretty max-w-[34ch] text-[20px] font-medium leading-snug md:text-[23px]">
              {brand.description}
            </p>
            <div data-after className="flex flex-wrap gap-3">
              <Link href="/build" className="btn btn-pink">
                Start building <span className="arrow">→</span>
              </Link>
              <Link href="/trade" className="btn btn-paper">
                Start trading
              </Link>
            </div>
          </div>
        </div>

        {/* The sidebar: a taped-in figure and a note in the margin */}
        <aside className="relative md:col-span-4" aria-hidden="true">
          <div data-after className="sheet relative mx-auto max-w-[360px] rotate-[2.2deg] p-4 pb-5">
            <span className="tape -top-3 left-8 -rotate-6" />
            <span className="tape pink -right-6 top-10 rotate-[58deg]" />
            <div className="graph-paper relative grid aspect-[4/3.4] place-items-center overflow-hidden rounded-[2px] bg-paper">
              <Candy id="hero-candy" className="wobble w-[86%]" />
              <Sparkle className="absolute left-5 top-6 h-7 w-7" />
              <Sparkle className="absolute bottom-7 right-6 h-5 w-5" color="#4bd6a4" />
            </div>
            <p className="marker mt-3 text-[18px] leading-tight">fig. 1: a market, pulled tight</p>
          </div>

          <div data-after className="relative mt-10 pl-2 md:mt-14">
            <Arrow className="absolute -left-16 -top-8 hidden h-16 w-28 -scale-x-100 rotate-[200deg] md:block" color="#d92f6b" draw={false} />
            <p className="marker text-[28px] leading-[1.05] text-pink-deep">{blackout.note}.</p>
            <p className="eyebrow mt-2 text-ink-3">{blackout.noteCredit}</p>
            <p className="news mt-5 max-w-[30ch] text-[17px] italic leading-snug text-ink-2">
              We started with a page of market news and took away everything that wasn&apos;t the point.
            </p>
          </div>
        </aside>
      </div>
    </section>
  );
}
