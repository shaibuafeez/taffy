"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const LEFT = 150;
const REST = 360;
const MAX = 900;
const Y = 160;
const W0 = 74;

/**
 * Pull the spread. Fragmented liquidity stretches a market thin; one
 * shared book snaps it back. The ribbon conserves its volume, so the
 * further you pull, the thinner it gets.
 */
export function TaffyPull() {
  const svg = useRef<SVGSVGElement>(null);
  const outline = useRef<SVGPathElement>(null);
  const body = useRef<SVGPathElement>(null);
  const stripes = useRef<SVGPathElement>(null);
  const knob = useRef<SVGGElement>(null);
  const spreadTxt = useRef<HTMLSpanElement>(null);
  const poolsTxt = useRef<HTMLSpanElement>(null);
  const askTxt = useRef<SVGTextElement>(null);
  const meter = useRef<HTMLSpanElement>(null);
  const state = useRef({ x: REST + LEFT, dragging: false });

  useEffect(() => {
    const s = state.current;

    const draw = () => {
      const x = Math.max(LEFT + 70, s.x);
      const len = x - LEFT;
      const t = Math.max(0, Math.min(1, (len - REST) / (MAX - LEFT - REST)));
      const w = W0 * Math.pow(REST / len, 0.8);
      const sag = Math.max(-20, (len - REST) * 0.11);
      const d = `M${LEFT} ${Y} C${LEFT + len * 0.32} ${Y + sag} ${x - len * 0.32} ${Y + sag} ${x} ${Y}`;
      outline.current?.setAttribute("d", d);
      outline.current?.setAttribute("stroke-width", String(w + 9));
      body.current?.setAttribute("d", d);
      body.current?.setAttribute("stroke-width", String(w));
      stripes.current?.setAttribute("d", d);
      stripes.current?.setAttribute("stroke-width", String(w));
      const k = len / REST;
      stripes.current?.setAttribute("stroke-dasharray", `${(7 * Math.min(k, 1.6)).toFixed(1)} ${(17 * k).toFixed(1)}`);
      knob.current?.setAttribute("transform", `translate(${x} ${Y})`);

      const spread = 0.01 + t * 2.39;
      const pools = Math.max(1, Math.round(1 + t * 23));
      if (spreadTxt.current) spreadTxt.current.textContent = `${spread.toFixed(2)}%`;
      if (poolsTxt.current)
        poolsTxt.current.textContent = pools === 1 ? "One shared book" : `Split across ${pools} pools`;
      if (askTxt.current) askTxt.current.textContent = (1.2841 * (1 + spread / 100)).toFixed(4);
      if (meter.current) meter.current.style.transform = `scaleX(${0.02 + t * 0.98})`;
      svg.current?.setAttribute("aria-valuenow", spread.toFixed(2));
    };

    const release = () => {
      s.dragging = false;
      gsap.to(s, { x: LEFT + REST, duration: 1.7, ease: "elastic.out(1, 0.22)", onUpdate: draw, overwrite: true });
    };

    const toSvgX = (clientX: number) => {
      const r = svg.current!.getBoundingClientRect();
      return ((clientX - r.left) / r.width) * 1000;
    };

    const down = (e: PointerEvent) => {
      s.dragging = true;
      gsap.killTweensOf(s);
      svg.current!.setPointerCapture(e.pointerId);
      gsap.to(s, { x: Math.min(MAX, Math.max(LEFT + 70, toSvgX(e.clientX))), duration: 0.25, ease: "power3.out", onUpdate: draw });
    };
    const move = (e: PointerEvent) => {
      if (!s.dragging) return;
      gsap.killTweensOf(s);
      s.x = Math.min(MAX, Math.max(LEFT + 70, toSvgX(e.clientX)));
      draw();
    };
    const up = () => s.dragging && release();

    let keyTimer = 0;
    const key = (e: KeyboardEvent) => {
      if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
      e.preventDefault();
      gsap.killTweensOf(s);
      s.x = Math.min(MAX, Math.max(LEFT + 70, s.x + (e.key === "ArrowRight" ? 70 : -70)));
      draw();
      window.clearTimeout(keyTimer);
      keyTimer = window.setTimeout(release, 700);
    };

    const el = svg.current!;
    el.addEventListener("pointerdown", down);
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerup", up);
    el.addEventListener("pointercancel", up);
    el.addEventListener("keydown", key);
    draw();

    // Demonstrate once, so people know it moves.
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const demo = reduced
      ? null
      : ScrollTrigger.create({
          trigger: el,
          start: "top 70%",
          once: true,
          onEnter: () => {
            if (s.dragging) return;
            gsap.to(s, { x: 720, duration: 1.1, ease: "power2.inOut", onUpdate: draw, onComplete: () => {
              if (!s.dragging) release();
            } });
          },
        });

    return () => {
      demo?.kill();
      gsap.killTweensOf(s);
      window.clearTimeout(keyTimer);
      el.removeEventListener("pointerdown", down);
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerup", up);
      el.removeEventListener("pointercancel", up);
      el.removeEventListener("keydown", key);
    };
  }, []);

  return (
    <div className="sheet relative overflow-hidden">
      <div className="flex flex-wrap items-end justify-between gap-6 border-b-2 border-dashed border-ink/25 px-5 pb-5 pt-6 md:px-8">
        <div>
          <p className="eyebrow text-ink-3">SUI / USDC · spread</p>
          <p className="display mt-1 text-[clamp(56px,8vw,112px)] leading-[0.8]">
            <span ref={spreadTxt}>0.01%</span>
          </p>
        </div>
        <div className="min-w-[220px] flex-1 md:max-w-[340px]">
          <p className="text-[18px] font-bold">
            <span ref={poolsTxt}>One shared book</span>
          </p>
          <div className="mt-2 h-3 overflow-hidden rounded-full border-2 border-ink bg-paper">
            <span ref={meter} className="block h-full origin-left bg-pink" style={{ transform: "scaleX(0.02)" }} />
          </div>
          <p className="eyebrow mt-2 flex justify-between text-ink-3">
            <span>tight</span>
            <span>fragmented</span>
          </p>
        </div>
      </div>

      <div className="graph-paper relative bg-paper">
        <svg
          ref={svg}
          viewBox="0 0 1000 320"
          className="block h-auto w-full cursor-grab touch-pan-y select-none active:cursor-grabbing"
          role="slider"
          tabIndex={0}
          aria-label="Pull the spread. Use the arrow keys to stretch it."
          aria-valuemin={0.01}
          aria-valuemax={2.4}
          aria-valuenow={0.01}
        >
          <defs>
            <pattern id="post" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
              <rect width="4" height="8" fill="#16130f" />
            </pattern>
          </defs>

          {/* bid post */}
          <rect x={LEFT - 22} y={Y - 110} width="16" height="220" rx="4" fill="url(#post)" stroke="#16130f" strokeWidth="3" />
          <text x={LEFT - 14} y={Y + 140} textAnchor="middle" fontFamily="var(--font-mono)" fontSize="15" fontWeight="700" fill="#0c7a54">
            BID 1.2840
          </text>

          <path ref={outline} fill="none" stroke="#16130f" strokeLinecap="round" />
          <path ref={body} fill="none" stroke="#ff4f8b" strokeLinecap="round" />
          <path ref={stripes} fill="none" stroke="#faf7f1" strokeLinecap="butt" opacity=".95" />

          <g ref={knob}>
            <circle r="70" fill="transparent" />
            <circle r="30" fill="#ffd54a" stroke="#16130f" strokeWidth="4" />
            <path d="M-8 -10v20M0 -10v20M8 -10v20" stroke="#16130f" strokeWidth="3" strokeLinecap="round" />
            <text ref={askTxt} y="64" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="15" fontWeight="700" fill="#d92f6b">
              1.2841
            </text>
            <text y="-44" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="13" fontWeight="700" fill="#16130f">
              ASK
            </text>
          </g>
        </svg>
        <p className="marker pointer-events-none absolute bottom-4 right-5 rotate-[-3deg] text-[17px] text-pink-deep md:text-[20px]">
          grab the yellow knob and pull →
        </p>
      </div>
    </div>
  );
}
