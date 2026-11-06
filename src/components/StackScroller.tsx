"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { primitives } from "@/content";
import { PrimitiveArt } from "./Art";
import { Rule } from "./Scribble";

gsap.registerPlugin(ScrollTrigger);

const tint = ["bg-paper-2", "bg-pink-soft", "bg-mint-soft"];
const bar = ["bg-ink", "bg-pink", "bg-mint"];

/**
 * Three primitives, one stack. On desktop the section pins and each
 * candy is pulled in as you scroll; on phones it's a simple stack.
 */
export function StackScroller() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const mm = gsap.matchMedia();
    mm.add("(min-width: 900px) and (min-height: 700px) and (prefers-reduced-motion: no-preference)", () => {
      // Layout switches to stacked panels only while the pin is active.
      el.dataset.pinned = "true";
      const panels = gsap.utils.toArray<HTMLElement>("[data-panel]", el);
      const arts = gsap.utils.toArray<HTMLElement>("[data-art]", el);
      const fills = gsap.utils.toArray<HTMLElement>("[data-fill]", el);
      const nums = gsap.utils.toArray<HTMLElement>("[data-num]", el);

      gsap.set(panels.slice(1), { autoAlpha: 0, y: 60 });
      gsap.set(arts.slice(1), { autoAlpha: 0, scale: 0.6, rotate: 18 });
      gsap.set(fills, { scaleX: 0 });
      gsap.set(nums.slice(1), { yPercent: 100 });

      const tl = gsap.timeline({
        defaults: { ease: "power3.inOut" },
        scrollTrigger: {
          trigger: el.querySelector("[data-pin]"),
          start: "top top",
          end: () => `+=${window.innerHeight * 2.4}`,
          pin: true,
          scrub: 0.8,
          snap: { snapTo: [0, 0.5, 1], duration: { min: 0.2, max: 0.6 }, ease: "power2.inOut" },
          invalidateOnRefresh: true,
        },
      });

      tl.to(fills[0], { scaleX: 1, duration: 1, ease: "none" }, 0);
      for (let i = 1; i < panels.length; i++) {
        const at = i * 1.2 - 0.2;
        tl.to(panels[i - 1], { autoAlpha: 0, y: -60, duration: 0.5 }, at)
          .to(arts[i - 1], { autoAlpha: 0, scale: 0.7, rotate: -16, x: -80, duration: 0.6 }, at)
          .to(nums[i - 1], { yPercent: -100, duration: 0.5 }, at)
          .to(nums[i], { yPercent: 0, duration: 0.5 }, at)
          .to(panels[i], { autoAlpha: 1, y: 0, duration: 0.6 }, at + 0.2)
          .to(arts[i], { autoAlpha: 1, scale: 1, rotate: 0, x: 0, duration: 0.8, ease: "back.out(1.6)" }, at + 0.15)
          .to(fills[i], { scaleX: 1, duration: 1, ease: "none" }, at);
      }
      return () => {
        tl.scrollTrigger?.kill();
        delete el.dataset.pinned;
      };
    });
    return () => mm.revert();
  }, []);

  return (
    <section ref={root} className="group relative border-t-2 border-ink" aria-labelledby="stack-title">
      <div data-pin className="relative group-data-[pinned=true]:h-screen">
        <div className="wrap flex h-full flex-col pb-10 pt-16 md:pt-24 group-data-[pinned=true]:pt-[calc(var(--nav-h)+24px)]">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div className="max-w-[760px]">
              <Rule n="01">Write the book you want to read</Rule>
              <h2 id="stack-title" className="display mt-5 text-[clamp(44px,5.6vw,92px)]">
                Three layers, one chew.
              </h2>
            </div>
            <p className="news max-w-[38ch] text-[19px] leading-snug text-ink-2 md:text-[21px]" data-reveal>
              We wrote the order book we wanted to trade on, then made every layer of it something you can build with.
            </p>
          </div>

          {/* progress: three taffy segments */}
          <div className="mt-7 hidden grid-cols-3 gap-3 group-data-[pinned=true]:grid" aria-hidden="true">
            {primitives.map((p, i) => (
              <div key={p.key}>
                <div className="h-3 overflow-hidden rounded-full border-2 border-ink bg-paper-2">
                  <span data-fill className={`block h-full origin-left ${bar[i]}`} />
                </div>
                <p className="eyebrow mt-2 text-ink-2">{p.name}</p>
              </div>
            ))}
          </div>

          <div className="relative mt-12 flex-1 group-data-[pinned=true]:mt-6">
            {primitives.map((p, i) => (
              <div
                key={p.key}
                className="relative mb-20 grid gap-8 md:grid-cols-12 md:items-center md:gap-10 group-data-[pinned=true]:absolute group-data-[pinned=true]:inset-0 group-data-[pinned=true]:mb-0"
              >
                <div data-panel className="md:col-span-6">
                  <div className="flex items-baseline gap-4">
                    <span className="relative inline-block h-[0.95em] overflow-hidden align-top text-[clamp(56px,6.4vw,104px)]">
                      <span data-num className="display block leading-[0.95]">
                        0{i + 1}
                      </span>
                    </span>
                    <span className="marker text-[22px] text-pink-deep">{p.candy}</span>
                  </div>
                  <h3 className="display mt-1 text-[clamp(48px,5.2vw,84px)]">{p.name}</h3>
                  <p className="pretty mt-4 max-w-[30ch] text-[22px] font-medium leading-snug md:text-[26px]">{p.line}</p>
                  <p className="news mt-4 max-w-[46ch] text-[18px] leading-relaxed text-ink-2">{p.special}</p>
                  <div className="mt-7 flex flex-wrap gap-3">
                    <Link href="/build" className="btn btn-ink btn-sm">
                      Build with {p.name} <span className="arrow">→</span>
                    </Link>
                    <Link href="/trade" className="btn btn-paper btn-sm">
                      Trade it
                    </Link>
                  </div>
                </div>
                <div data-art className="md:col-span-6">
                  <div className={`sheet relative mx-auto grid aspect-square w-full max-w-[min(500px,52vh)] place-items-center ${tint[i]}`}>
                    <span className={`tape ${i === 1 ? "mint" : i === 2 ? "pink" : ""} -top-3 left-10 -rotate-6`} />
                    <PrimitiveArt kind={p.key} className="h-[78%] w-[78%]" />
                    <span className="eyebrow absolute bottom-4 left-5 text-ink-3">fig. {i + 2}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
