"use client";

import { useState } from "react";

// Sample data only: a deterministic hash turns any address into a
// believable balance so the screen can be designed and tested before
// wallet connect exists.
function hash(s: string) {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function rng(seed: number) {
  let x = seed || 1;
  return () => {
    x ^= x << 13;
    x ^= x >>> 17;
    x ^= x << 5;
    return ((x >>> 0) % 1000) / 1000;
  };
}

const SAMPLE = "0x7a3f9c2e81b44d0f6a1e2c3b4d5e6f708192a3b4c5d6e7f8091a2b3c4d5ec91e";
const valid = (a: string) => /^0x[0-9a-fA-F]{6,64}$/.test(a.trim());

export function PointsLookup() {
  const [addr, setAddr] = useState("");
  const [result, setResult] = useState<null | { addr: string; pts: number; rank: number; streak: number; days: number[]; mult: string }>(null);
  const [err, setErr] = useState("");

  const look = (a: string) => {
    if (!valid(a)) {
      setErr("That doesn't look like a Sui address. It should start with 0x.");
      setResult(null);
      return;
    }
    setErr("");
    const r = rng(hash(a.toLowerCase()));
    const days = Array.from({ length: 84 }, (_, i) => {
      const active = r() < 0.35 + (i / 84) * 0.45;
      return active ? 1 + Math.floor(r() * 3) : 0;
    });
    let streak = 0;
    for (let i = days.length - 1; i >= 0 && days[i] > 0; i--) streak++;
    const pts = Math.round(days.reduce((s, d) => s + d * (900 + r() * 700), 0));
    const mult = Math.min(3, 1 + streak / 15).toFixed(1);
    setResult({ addr: a.trim(), pts, rank: 120 + Math.floor((1 - Math.min(pts, 180000) / 180000) * 21000), streak, days, mult });
  };

  return (
    <div className="sheet relative mx-auto max-w-[880px] p-6 md:p-10">
      <span className="tape -top-3 left-1/2 -translate-x-1/2 -rotate-2" />
      <form
        className="flex flex-col gap-3 sm:flex-row"
        onSubmit={(e) => {
          e.preventDefault();
          look(addr);
        }}
      >
        <label htmlFor="addr" className="sr-only">
          Sui address
        </label>
        <input
          id="addr"
          value={addr}
          onChange={(e) => setAddr(e.target.value)}
          placeholder="Paste a Sui address, 0x…"
          spellCheck={false}
          autoComplete="off"
          className="mono h-[52px] flex-1 rounded-full border-2 border-ink bg-paper px-5 text-[15px] outline-none placeholder:text-ink-3 focus:bg-white"
        />
        <button type="submit" className="btn btn-pink justify-center">
          Check balance <span className="arrow">→</span>
        </button>
      </form>
      <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-[14px]">
        <button
          type="button"
          className="link-ul font-semibold"
          onClick={() => {
            setAddr(SAMPLE);
            look(SAMPLE);
          }}
        >
          Try a sample address
        </button>
        <span className="eyebrow text-ink-3">Preview · sample data until the app ships</span>
      </div>
      {err && (
        <p role="alert" className="mt-4 text-[15px] font-semibold text-pink-deep">
          {err}
        </p>
      )}

      {result && (
        <div className="mt-8 border-t-2 border-dashed border-ink/30 pt-8" aria-live="polite">
          <p className="mono truncate text-[13px] text-ink-3">{result.addr}</p>
          <div className="mt-4 grid gap-6 sm:grid-cols-4">
            {[
              ["Points", result.pts.toLocaleString("en-US")],
              ["Rank", `#${result.rank.toLocaleString("en-US")}`],
              ["Streak", `${result.streak} days`],
              ["Multiplier", `${result.mult}×`],
            ].map(([k, v]) => (
              <div key={k}>
                <p className="eyebrow text-ink-3">{k}</p>
                <p className="display mt-1 text-[38px] leading-none">{v}</p>
              </div>
            ))}
          </div>
          <p className="marker mt-8 text-[18px]">the last 12 weeks</p>
          <div className="mt-3 grid grid-flow-col grid-rows-7 gap-[5px] overflow-x-auto pb-2" role="img" aria-label={`Activity over 84 days, current streak ${result.streak} days`}>
            {result.days.map((d, i) => (
              <span
                key={i}
                className={`h-[18px] w-[18px] rounded-[4px] border-2 border-ink/80 ${
                  d === 0 ? "bg-paper" : d === 1 ? "bg-pink-soft" : d === 2 ? "bg-pink/70" : "bg-pink"
                }`}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
