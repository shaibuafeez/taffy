"use client";

import { useEffect, useState } from "react";

type Level = { px: number; size: number };

// Deterministic starting book so server and client render the same thing.
function seedBook(mid: number) {
  const asks: Level[] = [];
  const bids: Level[] = [];
  for (let i = 0; i < 8; i++) {
    asks.push({ px: +(mid + 0.0001 * (i + 1)).toFixed(4), size: 1200 + ((i * 7919) % 5400) });
    bids.push({ px: +(mid - 0.0001 * i).toFixed(4), size: 1400 + ((i * 6151) % 5800) });
  }
  return { asks, bids };
}

/**
 * A small simulated order book (sample data). Sizes breathe, trades print,
 * and the spread stays one tick wide, which is the whole point.
 */
export function OrderBook() {
  const [mid, setMid] = useState(1.284);
  const [book, setBook] = useState(() => seedBook(1.284));
  const [tape, setTape] = useState<{ id: number; side: "buy" | "sell"; px: number; size: number }[]>([]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let n = 0;
    let m = 1.284;
    const jiggle = (prev: Level[], fresh: Level[]) =>
      fresh.map((l, i) => ({ ...l, size: Math.max(300, Math.round((prev[i]?.size ?? l.size) * (0.86 + Math.random() * 0.3))) }));
    const t = window.setInterval(() => {
      n++;
      if (Math.random() < 0.3) m = +(m + (Math.random() < 0.5 ? -0.0001 : 0.0001)).toFixed(4);
      const fresh = seedBook(m);
      const side: "buy" | "sell" = Math.random() < 0.5 ? "buy" : "sell";
      const fill = { id: n, side, px: side === "buy" ? +(m + 0.0001).toFixed(4) : m, size: Math.round(50 + Math.random() * 2400) };
      setMid(m);
      setBook((b) => ({ asks: jiggle(b.asks, fresh.asks), bids: jiggle(b.bids, fresh.bids) }));
      setTape((tp) => [fill, ...tp].slice(0, 6));
    }, 900);
    return () => window.clearInterval(t);
  }, []);

  const max = Math.max(...book.asks.map((a) => a.size), ...book.bids.map((b) => b.size));
  const row = (l: Level, side: "ask" | "bid") => (
    <li key={`${side}-${l.px}`} className="relative flex justify-between px-4 py-[5px]">
      <span
        className={`absolute inset-y-0.5 right-0 rounded-l-sm transition-[width] duration-700 ${side === "ask" ? "bg-pink/25" : "bg-mint/35"}`}
        style={{ width: `${(l.size / max) * 100}%` }}
      />
      <span className={`relative font-bold ${side === "ask" ? "text-pink-deep" : "text-mint-ink"}`}>{l.px.toFixed(4)}</span>
      <span className="relative">{l.size.toLocaleString("en-US")}</span>
    </li>
  );

  return (
    <div className="sheet mono overflow-hidden text-[13px]" aria-label="Sample order book for SUI/USDC" role="figure">
      <div className="flex items-center justify-between border-b-2 border-ink bg-ink px-4 py-3 text-paper-2">
        <span className="font-bold tracking-[0.06em]">SUI / USDC</span>
        <span className="flex items-center gap-2 text-[11px] uppercase tracking-[0.14em]">
          <span className="h-2 w-2 animate-pulse rounded-full bg-mint" /> sample feed
        </span>
      </div>
      <div className="flex justify-between px-4 pb-1 pt-3 text-[11px] uppercase tracking-[0.12em] text-ink-3">
        <span>Price</span>
        <span>Size</span>
      </div>
      <ul>{[...book.asks].reverse().map((l) => row(l, "ask"))}</ul>
      <div className="my-1 flex items-center justify-between border-y-2 border-dashed border-ink/25 bg-yellow/40 px-4 py-2.5">
        <span className="display text-[24px] tracking-[-0.03em]">{mid.toFixed(4)}</span>
        <span className="text-[11px] uppercase tracking-[0.12em]">spread 0.0001 · 0.01%</span>
      </div>
      <ul>{book.bids.map((l) => row(l, "bid"))}</ul>
      <div className="mt-2 border-t-2 border-ink px-4 py-3">
        <p className="mb-2 text-[11px] uppercase tracking-[0.12em] text-ink-3">Trades</p>
        <ul className="space-y-1">
          {tape.length === 0 && <li className="text-ink-3">waiting for the first fill…</li>}
          {tape.map((t) => (
            <li key={t.id} className="flex justify-between">
              <span className={t.side === "buy" ? "text-mint-ink" : "text-pink-deep"}>{t.side === "buy" ? "▲ buy" : "▼ sell"}</span>
              <span>{t.px.toFixed(4)}</span>
              <span>{t.size.toLocaleString("en-US")}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
