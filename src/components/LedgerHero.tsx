"use client";

import { useCallback, useEffect, useRef } from "react";
import gsap from "gsap";
import { ledger } from "@/content/site";
import { reducedMotion } from "@/components/Motion";

const TALLY = Array.from({ length: ledger.totals.received }, (_, i) => i);

export function Tick({ className = "" }: { className?: string }) {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" role="img" aria-label="Matched" className={className}>
      <path data-tick d="M3 9.5l4 4 8-9" fill="none" stroke="var(--color-pencil)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function LedgerHero() {
  const root = useRef<HTMLDivElement>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);

  const play = useCallback(() => {
    const el = root.current;
    if (!el) return;
    tl.current?.kill();
    if (reducedMotion()) {
      gsap.set(el.querySelectorAll("[data-lh]"), { clearProps: "all", opacity: 1 });
      return;
    }
    const q = gsap.utils.selector(el);
    const ticks = Array.from(el.querySelectorAll<SVGPathElement>("[data-tick]"));
    ticks.forEach((p) => {
      const len = Math.ceil(p.getTotalLength()) + 2;
      p.style.strokeDasharray = `${len}`;
      p.style.strokeDashoffset = `${len}`;
    });
    const counts = q("[data-lh-count]") as HTMLElement[];
    const vals = counts.map(() => ({ v: 0 }));

    const t = gsap.timeline({ defaults: { ease: "expo.out" } });
    t.set(q("[data-lh]"), { opacity: 1 })
      .fromTo(q("[data-lh-card]"), { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9 })
      .fromTo(q("[data-lh-row]"), { opacity: 0, x: -14 }, { opacity: 1, x: 0, duration: 0.6, stagger: 0.12 }, "-=0.5")
      .to(ticks, { strokeDashoffset: 0, duration: 0.45, ease: "power2.out", stagger: 0.12 }, "-=0.55")
      .fromTo(q("[data-lh-flag]"), { backgroundColor: "rgba(255,241,234,0)" }, { backgroundColor: "rgba(255,241,234,1)", duration: 0.5, stagger: 0.15 }, "-=0.2")
      .fromTo(q("[data-lh-note]"), { opacity: 0, scale: 0.7 }, { opacity: 1, scale: 1, duration: 0.4, ease: "back.out(2.2)", stagger: 0.15 }, "<")
      .fromTo(q("[data-lh-box]"), { scaleY: 0.2, opacity: 0 }, { scaleY: 1, opacity: 1, duration: 0.35, stagger: 0.025, transformOrigin: "50% 100%" }, "-=0.6")
      .add(() => {
        counts.forEach((c, i) => {
          const end = Number(c.dataset.lhCount);
          vals[i].v = 0;
          gsap.to(vals[i], {
            v: end,
            duration: 1.1,
            ease: "power3.out",
            onUpdate: () => {
              c.textContent = String(Math.round(vals[i].v));
            },
          });
        });
      }, "<")
      .fromTo(
        q("[data-lh-stamp]"),
        { opacity: 0, scale: 2.4, rotate: -21 },
        { opacity: 1, scale: 1, rotate: -9, duration: 0.42, ease: "power4.in" },
        "+=0.25",
      )
      .fromTo(q("[data-lh-card]"), { x: -4 }, { x: 0, duration: 0.4, ease: "elastic.out(1.4, 0.3)" });
    tl.current = t;
  }, []);

  useEffect(() => {
    play();
    return () => {
      tl.current?.kill();
    };
  }, [play]);

  return (
    <div ref={root} className="relative">
      <div data-lh data-lh-card className="relative border border-ink bg-card shadow-[10px_10px_0_var(--color-rule)]">
        <div className="flex items-baseline justify-between gap-3 border-b-2 border-ink px-5 py-4">
          <span className="display text-[20px] tracking-[0.04em]">{ledger.title}</span>
          <span className="flex items-center gap-3 font-mono text-[12px] text-ink-3">
            {ledger.org}
            <button type="button" onClick={play} className="link-u min-h-8 text-pencil" aria-label="Replay the animation">
              Replay
            </button>
          </span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[560px] border-collapse whitespace-nowrap font-mono text-[12.5px] tnum">
            <caption className="sr-only">Sample October receipts, matched to Xero invoices</caption>
            <thead>
              <tr className="text-left text-[11px] uppercase tracking-[0.08em] text-ink-3">
                <th scope="col" className="border-b border-rule-strong py-2.5 pl-5 pr-2.5 font-medium">Date</th>
                <th scope="col" className="border-b border-l border-rule-strong border-l-rule px-2.5 py-2.5 font-medium">From</th>
                <th scope="col" className="border-b border-l border-rule-strong border-l-rule px-2.5 py-2.5 font-medium">Chain</th>
                <th scope="col" className="border-b border-l border-rule-strong border-l-rule px-2.5 py-2.5 text-right font-medium">Amount</th>
                <th scope="col" className="border-b border-l border-rule-strong border-l-rule px-2.5 py-2.5 font-medium">Invoice</th>
                <th scope="col" className="border-b border-l border-rule-strong border-l-rule py-2.5 pl-2.5 pr-5 font-medium">
                  <span className="sr-only">Status</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {ledger.rows.map((r) => {
                const flagged = r.status !== "ok";
                return (
                  <tr key={r.date + r.amount} data-lh data-lh-row {...(flagged ? { "data-lh-flag": true } : {})} className="border-b border-rule last:border-b-0">
                    <td className="py-2.5 pl-5 pr-2.5">{r.date}</td>
                    <td className="border-l border-rule px-2.5 py-2.5">{r.from}</td>
                    <td className="border-l border-rule px-2.5 py-2.5">{r.chain}</td>
                    <td className="border-l border-rule px-2.5 py-2.5 text-right">{r.amount}</td>
                    <td className={`border-l border-rule px-2.5 py-2.5 ${r.status === "who" ? "text-ink-3" : ""}`}>{r.invoice}</td>
                    <td className="border-l border-rule py-2.5 pl-2.5 pr-5">
                      {flagged ? (
                        <span data-lh data-lh-note className="inline-block whitespace-nowrap font-semibold text-stamp">
                          {r.note}
                        </span>
                      ) : (
                        <Tick />
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="flex flex-col gap-3 border-t-2 border-ink px-5 py-4">
          <div aria-hidden="true" className="grid grid-cols-[repeat(23,minmax(0,1fr))] gap-[3px]">
            {TALLY.map((i) => (
              <span
                key={i}
                data-lh
                data-lh-box
                className={`h-5 ${i < ledger.totals.matched ? "bg-ink" : "border-2 border-stamp"}`}
              />
            ))}
          </div>
          <p className="flex flex-wrap gap-x-2 gap-y-1 font-mono text-[13px] sm:pr-[210px]">
            <span>
              <span data-lh-count={ledger.totals.received}>{ledger.totals.received}</span> received ·{" "}
              <span data-lh-count={ledger.totals.matched}>{ledger.totals.matched}</span> matched ·
            </span>
            <span className="font-semibold text-stamp">
              <span data-lh-count={ledger.totals.review}>{ledger.totals.review}</span> to review
            </span>
          </p>
        </div>
      </div>
      <div
        data-lh
        data-lh-stamp
        aria-hidden="true"
        style={{ transform: "rotate(-9deg)" }}
        className="pointer-events-none absolute -bottom-14 right-2 border-4 border-double border-stamp bg-card/50 px-4 pb-2 pt-2.5 text-center leading-none text-stamp mix-blend-multiply sm:-right-4"
      >
        <div className="display text-[52px] tracking-[0.1em]">Paid</div>
        <div className="mt-1.5 font-mono text-[11px] tracking-[0.14em]">IN XERO · 24 OCT 2026</div>
      </div>
    </div>
  );
}
