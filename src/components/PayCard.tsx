"use client";

import { useEffect, useRef, useState } from "react";

type ChainKey = "base" | "ethereum" | "arbitrum" | "solana" | "tron" | "tempo";

const EVM = { short: "0x4b1e…a07d", full: "0x4b1e9c2a7d3f50b8e61c4a29d0f7e3b8c5a1a07d" };
const CHAINS: { key: ChainKey; label: string; addr: { short: string; full: string }; memo?: boolean }[] = [
  { key: "base", label: "Base", addr: EVM },
  { key: "ethereum", label: "Ethereum", addr: EVM },
  { key: "arbitrum", label: "Arbitrum", addr: EVM },
  { key: "solana", label: "Solana", addr: { short: "7xKp…f3Qd", full: "7xKpQ2mWn8Rb4Tz6Yc1Vd9Hs5Lg3Jf2Ea7Uk3f3Qd" } },
  { key: "tron", label: "Tron", addr: { short: "TQm4…8sLb", full: "TQm4hX2vR7pNcL9eYw3kD5fJ6uA1zG8sLb" } },
  { key: "tempo", label: "Tempo", addr: EVM, memo: true },
];

const INVOICE = "INV-0426";
const ORG = "Northline Studio";

type Phase = "waiting" | "checking" | "received";

export function PayCard({ full = false }: { full?: boolean }) {
  const [chain, setChain] = useState<ChainKey>("base");
  const [token, setToken] = useState<"USDC" | "USDT">("USDC");
  const [copied, setCopied] = useState<string | null>(null);
  const [phase, setPhase] = useState<Phase>("waiting");
  const timers = useRef<number[]>([]);

  useEffect(() => () => timers.current.forEach((t) => window.clearTimeout(t)), []);

  const c = CHAINS.find((x) => x.key === chain)!;
  const amount = c.memo ? "2,250.00" : "2,250.004";
  const raw = c.memo ? "2250.00" : "2250.004";

  const copy = async (what: string, text: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      /* clipboard can be blocked; the visual confirmation still helps */
    }
    setCopied(what);
    timers.current.push(window.setTimeout(() => setCopied((v) => (v === what ? null : v)), 1600));
  };

  const pick = (k: ChainKey) => {
    setChain(k);
    if (k === "tron") setToken("USDT");
    setPhase("waiting");
  };

  const sent = () => {
    setPhase("checking");
    timers.current.push(window.setTimeout(() => setPhase("received"), 2200));
  };

  return (
    <div className={`relative w-full border border-ink bg-card ${full ? "" : "max-w-[460px] shadow-[10px_10px_0_var(--color-rule)]"}`}>
      <div className="flex items-start justify-between gap-4 border-b border-dashed border-rule-strong px-6 py-5">
        <div className="flex flex-col gap-1">
          <span className="text-[13px] text-ink-3">Invoice from</span>
          <span className="display text-[22px]">{ORG}</span>
        </div>
        <div className="flex flex-col items-end gap-1 font-mono text-[12px] text-ink-3">
          <span>{INVOICE}</span>
          <span>Due 26 Oct 2026</span>
        </div>
      </div>

      {phase === "received" ? (
        <div className="flex flex-col items-start gap-5 px-6 py-8" aria-live="polite">
          <div
            className="anim-stamp border-4 border-double border-stamp px-4 pb-1.5 pt-2 text-stamp"
            style={{ ["--rot" as string]: "-6deg" }}
          >
            <span className="display text-[44px] tracking-[0.08em]">Received</span>
          </div>
          <p className="anim-rise text-[17px] leading-relaxed text-ink-2" style={{ animationDelay: "200ms" }}>
            <strong className="font-semibold text-ink">
              {amount} {token}
            </strong>{" "}
            arrived on {c.label}. {ORG} has been told. Thank you.
          </p>
          <dl className="anim-rise grid w-full grid-cols-[auto_1fr] gap-x-5 gap-y-2 font-mono text-[13px]" style={{ animationDelay: "320ms" }}>
            <dt className="text-ink-3">Invoice</dt>
            <dd>{INVOICE} · paid</dd>
            <dt className="text-ink-3">Transaction</dt>
            <dd className="text-pencil">0x8e2d…41bf</dd>
          </dl>
          <button type="button" onClick={() => setPhase("waiting")} className="link-u text-[14px] text-pencil">
            Start the demo again
          </button>
        </div>
      ) : (
        <div className="flex flex-col gap-6 px-6 py-6">
          <div className="flex flex-col gap-1">
            <span className="text-[13px] text-ink-3">Amount due</span>
            <span className="font-mono text-[34px] font-semibold tnum">
              2,250.00 <span className="text-[17px]">USD</span>
            </span>
          </div>

          <fieldset className="flex flex-col gap-2.5">
            <legend className="mb-2.5 text-[13px] text-ink-3">1 · Pick a network</legend>
            <div className="flex flex-wrap gap-2">
              {CHAINS.map((x) => (
                <button
                  key={x.key}
                  type="button"
                  aria-pressed={x.key === chain}
                  onClick={() => pick(x.key)}
                  className={`min-h-11 border px-3.5 text-[14px] transition-[background-color,color,transform] duration-150 active:scale-95 ${
                    x.key === chain ? "border-ink bg-ink font-semibold text-paper" : "border-rule-strong bg-card hover:border-ink"
                  }`}
                >
                  {x.label}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2 text-[13px] text-ink-3">
              Coin:
              {(["USDC", "USDT"] as const).map((t) => (
                <button
                  key={t}
                  type="button"
                  aria-pressed={token === t}
                  onClick={() => setToken(t)}
                  className={`min-h-9 px-2.5 font-mono ${token === t ? "bg-pencil-soft font-semibold text-pencil" : "hover:text-ink"}`}
                >
                  {t}
                </button>
              ))}
            </div>
            <p className="text-[13px] leading-relaxed text-ink-3">Paying from an exchange? Check it can withdraw {token} on {c.label}.</p>
          </fieldset>

          <div className="flex flex-col gap-3">
            <span className="text-[13px] text-ink-3">2 · Send exactly</span>
            <div key={chain} className="anim-rise flex items-center justify-between gap-3 border border-rule-strong bg-paper px-4 py-3">
              <span className="font-mono text-[22px] font-semibold tnum">
                {c.memo ? amount : <>2,250.00<mark className="bg-stamp-soft px-0.5 text-stamp">4</mark></>} {token}
              </span>
              <button type="button" onClick={() => copy("amount", raw)} className="min-h-10 min-w-20 border border-ink px-3 text-[13px] font-semibold hover:bg-ink hover:text-paper">
                {copied === "amount" ? "Copied" : "Copy"}
              </button>
            </div>
            <div className="flex items-center justify-between gap-3 border border-rule-strong bg-paper px-4 py-3">
              <span className="flex flex-col">
                <span className="text-[12px] text-ink-3">to {ORG} on {c.label}</span>
                <span className="font-mono text-[15px]">{c.addr.short}</span>
              </span>
              <button type="button" onClick={() => copy("address", c.addr.full)} className="min-h-10 min-w-20 border border-ink px-3 text-[13px] font-semibold hover:bg-ink hover:text-paper">
                {copied === "address" ? "Copied" : "Copy"}
              </button>
            </div>
            {c.memo ? (
              <div className="flex items-center justify-between gap-3 border border-stamp bg-stamp-soft px-4 py-3">
                <span className="flex flex-col">
                  <span className="text-[12px] text-stamp">Memo (required)</span>
                  <span className="font-mono text-[15px]">{INVOICE}</span>
                </span>
                <button type="button" onClick={() => copy("memo", INVOICE)} className="min-h-10 min-w-20 border border-ink bg-card px-3 text-[13px] font-semibold hover:bg-ink hover:text-paper">
                  {copied === "memo" ? "Copied" : "Copy"}
                </button>
              </div>
            ) : null}
            <p className="text-[13px] leading-relaxed text-ink-3">
              {c.memo
                ? `The memo tells ${ORG} this payment is for ${INVOICE}.`
                : `The last digit tells ${ORG} this payment is for ${INVOICE}. If your exchange takes a fee, that's fine: it will still match.`}
            </p>
          </div>

          <div className="flex flex-col gap-3 border-t border-dashed border-rule-strong pt-5" aria-live="polite">
            {phase === "waiting" ? (
              <>
                <p className="flex items-center gap-2.5 text-[14px] text-ink-2">
                  <span className="anim-pulse h-2 w-2 rounded-full bg-pencil" aria-hidden="true" />
                  Waiting for your payment. This page updates when it lands.
                </p>
                <button type="button" onClick={sent} className="btn btn-ink w-full">
                  I&apos;ve sent it
                </button>
              </>
            ) : (
              <p className="flex items-center gap-3 text-[14px] text-ink-2">
                <svg width="18" height="18" viewBox="0 0 18 18" className="anim-spin" aria-hidden="true">
                  <circle cx="9" cy="9" r="7" fill="none" stroke="var(--color-rule-strong)" strokeWidth="2" />
                  <path d="M9 2a7 7 0 0 1 7 7" fill="none" stroke="var(--color-ink)" strokeWidth="2" />
                </svg>
                Looking for your payment on {c.label}…
              </p>
            )}
          </div>
        </div>
      )}

      <p className="border-t border-dashed border-rule-strong px-6 py-3.5 font-mono text-[11px] leading-relaxed text-ink-3">
        Paid straight to {ORG}&apos;s wallet. Cleared never holds the money. · Demo, sample invoice
      </p>
    </div>
  );
}
