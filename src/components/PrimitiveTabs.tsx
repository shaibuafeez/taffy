"use client";

import { useId, useState } from "react";
import { primitives, type PrimitiveKey } from "@/content";
import { PrimitiveArt } from "./Art";

const tint: Record<PrimitiveKey, string> = { spot: "bg-paper-2", margin: "bg-pink-soft", predict: "bg-mint-soft" };

export function PrimitiveTabs() {
  const [tab, setTab] = useState<PrimitiveKey>("spot");
  const [open, setOpen] = useState(0);
  const id = useId();
  const p = primitives.find((x) => x.key === tab)!;
  const rows = [
    { h: "What it is", b: p.what },
    { h: "How it works", b: p.how },
    { h: "What makes it special", b: p.special },
  ];

  return (
    <div>
      <div role="tablist" aria-label="Primitives" className="flex flex-wrap justify-center gap-3">
        {primitives.map((x) => (
          <button
            key={x.key}
            role="tab"
            id={`${id}-${x.key}`}
            aria-selected={tab === x.key}
            aria-controls={`${id}-panel`}
            onClick={() => {
              setTab(x.key);
              setOpen(0);
            }}
            className={`btn min-w-[140px] justify-center ${tab === x.key ? "btn-pink" : "btn-paper"}`}
          >
            {x.name}
          </button>
        ))}
      </div>

      <div
        role="tabpanel"
        id={`${id}-panel`}
        aria-labelledby={`${id}-${tab}`}
        className="sheet mt-10 grid overflow-hidden md:grid-cols-2"
      >
        <div className="p-7 md:p-10">
          <p className="marker text-[20px] text-pink-deep">{p.candy}</p>
          <h3 className="display mt-1 text-[clamp(56px,6vw,96px)]">{p.name}</h3>
          <div className="mt-8 border-t-2 border-ink">
            {rows.map((r, i) => (
              <div key={r.h} className="border-b-2 border-dashed border-ink/25">
                <button
                  className="flex w-full items-center gap-4 py-5 text-left"
                  aria-expanded={open === i}
                  onClick={() => setOpen(open === i ? -1 : i)}
                >
                  <span
                    className={`grid h-8 w-8 shrink-0 place-items-center rounded-full border-2 border-ink text-[18px] leading-none transition-colors ${
                      open === i ? "bg-ink text-paper-2" : "bg-pink"
                    }`}
                  >
                    {open === i ? "−" : "+"}
                  </span>
                  <span className="text-[20px] font-bold tracking-[-0.01em] md:text-[22px]">{r.h}</span>
                </button>
                <div className={`grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(.6,0,.2,1)] ${open === i ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                  <p className="news overflow-hidden pl-12 text-[18px] leading-relaxed text-ink-2">
                    <span className="block pb-6">{r.b}</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className={`graph-paper relative grid min-h-[380px] place-items-center border-t-2 border-ink md:border-l-2 md:border-t-0 ${tint[tab]}`}>
          <div key={tab} className="animate-[pop_.7s_cubic-bezier(.3,.7,.4,1.4)_both]">
            <PrimitiveArt kind={tab} className="h-[340px] w-[340px] max-w-[80vw]" />
          </div>
          <span className="eyebrow absolute bottom-4 left-5 text-ink-3">{p.line}</span>
        </div>
      </div>
    </div>
  );
}
