"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { Logo } from "@/components/Chrome";

type Fam = "evm" | "tron" | "solana";
type Wallet = { addr: string; short: string; fam: Fam };

const FAM_NETWORKS: Record<Fam, string> = {
  evm: "Base, Ethereum, Arbitrum, Polygon, Tempo, Arc",
  tron: "Tron",
  solana: "Solana",
};

const SAMPLE_EVM: Wallet = { addr: "0x4b1e9c2a7d3f50b8e61c4a29d0f7e3b8c5a1a07d", short: "0x4b1e…a07d", fam: "evm" };
const SAMPLE_TRON: Wallet = { addr: "TQm4hX2vR7pNcL9eYw3kD5fJ6uA1zG8sLb", short: "TQm4…8sLb", fam: "tron" };

function detect(s: string): Fam | "secret" | null {
  const v = s.trim();
  if (!v) return null;
  const words = v.split(/\s+/);
  if (words.length >= 12 && words.every((w) => /^[a-z]+$/.test(w))) return "secret";
  if (/^(0x)?[0-9a-fA-F]{64}$/.test(v)) return "secret";
  if (/^0x[0-9a-fA-F]{40}$/.test(v)) return "evm";
  if (/^T[1-9A-HJ-NP-Za-km-z]{33}$/.test(v)) return "tron";
  if (/^[1-9A-HJ-NP-Za-km-z]{32,44}$/.test(v)) return "solana";
  return null;
}

const shorten = (a: string) => `${a.slice(0, 6)}…${a.slice(-4)}`;

function Spinner() {
  return (
    <svg width="16" height="16" viewBox="0 0 18 18" className="anim-spin shrink-0" aria-hidden="true">
      <circle cx="9" cy="9" r="7" fill="none" stroke="var(--color-rule-strong)" strokeWidth="2" />
      <path d="M9 2a7 7 0 0 1 7 7" fill="none" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}
function Tick() {
  return (
    <svg width="16" height="16" viewBox="0 0 18 18" aria-hidden="true" className="anim-draw shrink-0">
      <path d="M3 9.5l4 4 8-9" fill="none" stroke="var(--color-pencil)" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const STEPS = ["Connect Xero", "Add wallets", "Read 90 days"];

export function Setup() {
  const [step, setStep] = useState(0);
  const [xero, setXero] = useState<"idle" | "connecting" | "connected">("idle");
  const [wallets, setWallets] = useState<Wallet[]>([SAMPLE_EVM]);
  const [input, setInput] = useState("");
  const [err, setErr] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const timers = useRef<number[]>([]);
  const later = (fn: () => void, ms: number) => timers.current.push(window.setTimeout(fn, ms));
  useEffect(() => () => timers.current.forEach((t) => window.clearTimeout(t)), []);

  const kind = detect(input);
  const hasEvm = wallets.some((w) => w.fam === "evm");
  const hasTron = wallets.some((w) => w.fam === "tron");

  const lines = useMemo(() => {
    const l: { label: string; result: string; n: number }[] = [];
    if (hasEvm) {
      l.push({ label: `Reading Base · ${SAMPLE_EVM.short}`, result: "14 payments", n: 14 });
      l.push({ label: `Reading Ethereum · ${SAMPLE_EVM.short}`, result: "2 payments", n: 2 });
      l.push({ label: `Reading Arbitrum · ${SAMPLE_EVM.short}`, result: "3 payments", n: 3 });
    }
    if (hasTron) l.push({ label: `Reading Tron · ${SAMPLE_TRON.short}`, result: "4 payments", n: 4 });
    wallets
      .filter((w) => w.addr !== SAMPLE_EVM.addr && w.addr !== SAMPLE_TRON.addr)
      .forEach((w) => l.push({ label: `Reading ${w.fam === "solana" ? "Solana" : w.fam === "tron" ? "Tron" : "Base"} · ${w.short}`, result: "no payments in 90 days", n: 0 }));
    return l;
  }, [wallets, hasEvm, hasTron]);

  const found = lines.reduce((a, b) => a + b.n, 0);
  const review = (hasEvm ? 2 : 0) + (hasTron ? 1 : 0);
  const matched = found - review;
  const totalSteps = lines.length + 1; // + matching line
  const finished = progress > totalSteps;

  const connect = () => {
    setXero("connecting");
    later(() => setXero("connected"), 1100);
  };

  const add = (w?: Wallet) => {
    const candidate = w ?? (kind && kind !== "secret" ? { addr: input.trim(), short: shorten(input.trim()), fam: kind } : null);
    if (!w) {
      if (!input.trim()) return setErr("Paste a wallet address first.");
      if (kind === "secret") return setErr("That looks like a private key or seed phrase. Delete it now and never share it. Cleared only needs the public address.");
      if (!kind) return setErr("That doesn't look like a wallet address. Check for a missing character.");
    }
    if (!candidate) return;
    if (wallets.some((x) => x.addr.toLowerCase() === candidate.addr.toLowerCase())) return setErr("Already added.");
    setWallets((ws) => [...ws, candidate]);
    setInput("");
    setErr(null);
  };

  const read = () => {
    setStep(2);
    setProgress(0);
    const n = lines.length + 2;
    for (let i = 1; i <= n; i++) later(() => setProgress(i), i * 750);
  };

  return (
    <div className="ledger-lines min-h-screen">
      <header className="mx-auto flex max-w-[880px] items-center justify-between gap-4 px-5 pb-4 pt-6">
        <Link href="/" aria-label="Cleared home">
          <Logo />
        </Link>
        <span className="flex items-center gap-4">
          <span className="border border-ink px-2 py-1 font-mono text-[11px] uppercase tracking-[0.08em]">Demo</span>
          <Link href="/demo" className="link-u text-[14px] text-pencil">
            Skip to the inbox
          </Link>
        </span>
      </header>

      <main id="main" className="mx-auto flex max-w-[880px] flex-col gap-8 px-5 pb-20 pt-6">
        {/* Stepper */}
        <ol className="relative grid grid-cols-3 gap-2" aria-label="Setup steps">
          <span aria-hidden="true" className="absolute left-0 right-0 top-[13px] h-[2px] bg-rule-strong" />
          <span
            aria-hidden="true"
            className="absolute left-0 top-[13px] h-[2px] bg-ink transition-[width] duration-700 ease-[var(--ease-out)]"
            style={{ width: `${(Math.min(step, 2) / 2) * 100}%` }}
          />
          {STEPS.map((s, i) => (
            <li key={s} aria-current={i === step ? "step" : undefined} className={`relative flex flex-col gap-2 ${i === 1 ? "items-center" : i === 2 ? "items-end" : ""}`}>
              <span
                className={`flex h-7 w-7 items-center justify-center border-2 font-mono text-[12px] font-semibold transition-colors duration-300 ${
                  i < step ? "border-ink bg-ink text-paper" : i === step ? "border-ink bg-card" : "border-rule-strong bg-paper text-ink-3"
                }`}
              >
                {i < step ? "✓" : i + 1}
              </span>
              <span className={`text-[14px] ${i === step ? "font-semibold" : "text-ink-3"}`}>{s}</span>
            </li>
          ))}
        </ol>

        <section key={step} className="anim-rise border border-ink bg-card p-6 shadow-[10px_10px_0_var(--color-rule)] sm:p-10">
          {step === 0 ? (
            <div className="flex flex-col gap-7">
              <div className="flex flex-col gap-3">
                <h1 className="display text-[48px]">Connect Xero</h1>
                <p className="max-w-[600px] text-[17px] leading-relaxed text-ink-2">
                  You&apos;ll approve this on Xero&apos;s own page. You can disconnect any time, from Xero or from Cleared, and every payment Cleared recorded stays in Xero.
                </p>
              </div>
              <div className="grid gap-px border border-rule-strong bg-rule-strong sm:grid-cols-2">
                <div className="flex flex-col gap-3 bg-card p-5">
                  <h2 className="display text-[18px] text-pencil">Cleared will</h2>
                  <ul className="flex flex-col gap-2 text-[15px] leading-relaxed">
                    <li>Read your open invoices and contacts</li>
                    <li>Record payments against those invoices</li>
                    <li>Create one account, called “USDC clearing”</li>
                  </ul>
                </div>
                <div className="flex flex-col gap-3 bg-card p-5">
                  <h2 className="display text-[18px] text-stamp">Cleared won&apos;t</h2>
                  <ul className="flex flex-col gap-2 text-[15px] leading-relaxed">
                    <li>See your bank feeds, payroll or reports</li>
                    <li>Edit or delete your invoices</li>
                    <li>Move any money, anywhere</li>
                  </ul>
                </div>
              </div>
              <div aria-live="polite" className="flex flex-wrap items-center gap-5">
                {xero === "connected" ? (
                  <>
                    <p className="anim-rise flex items-center gap-3 text-[16px]">
                      <Tick />
                      Connected to <strong className="font-semibold">Northline Studio</strong>. 41 open invoices.
                    </p>
                    <button type="button" onClick={() => setStep(1)} className="btn btn-ink">
                      Continue
                    </button>
                  </>
                ) : (
                  <button type="button" onClick={connect} disabled={xero === "connecting"} className="btn btn-ink min-w-[220px]">
                    {xero === "connecting" ? (
                      <>
                        <Spinner /> Opening Xero…
                      </>
                    ) : (
                      "Connect Xero"
                    )}
                  </button>
                )}
              </div>
            </div>
          ) : null}

          {step === 1 ? (
            <div className="flex flex-col gap-7">
              <div className="flex flex-col gap-3">
                <h1 className="display text-[48px]">Add the wallets you get paid to</h1>
                <p className="max-w-[600px] text-[17px] leading-relaxed text-ink-2">
                  Public addresses only. There is nothing to sign, and nothing Cleared could move.
                </p>
              </div>

              <ul className="flex flex-col border-t-2 border-ink">
                {wallets.map((w) => (
                  <li key={w.addr} className="anim-rise flex flex-wrap items-center justify-between gap-3 border-b border-rule py-3.5">
                    <span className="flex flex-col gap-0.5">
                      <span className="font-mono text-[15px]">{w.short}</span>
                      <span className="text-[13px] text-ink-3">{FAM_NETWORKS[w.fam]}</span>
                    </span>
                    <button
                      type="button"
                      onClick={() => setWallets((ws) => ws.filter((x) => x.addr !== w.addr))}
                      className="min-h-10 px-3 text-[14px] text-ink-3 hover:text-stamp"
                      aria-label={`Remove ${w.short}`}
                    >
                      Remove
                    </button>
                  </li>
                ))}
                {!wallets.length ? <li className="border-b border-rule py-4 text-[15px] text-ink-3">Add the wallet your clients pay into. A public address is all we need.</li> : null}
              </ul>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  add();
                }}
                className="flex flex-col gap-2"
              >
                <label htmlFor="su-addr" className="text-[14px] text-ink-3">
                  Wallet address
                </label>
                <div className="flex flex-wrap gap-2">
                  <input
                    id="su-addr"
                    value={input}
                    onChange={(e) => {
                      setInput(e.target.value);
                      setErr(null);
                    }}
                    spellCheck={false}
                    autoComplete="off"
                    placeholder="0x…, T…, or a Solana address"
                    aria-invalid={!!err}
                    aria-describedby="su-help"
                    className="min-h-13 min-w-0 flex-[1_1_320px] border border-ink bg-paper px-4 font-mono text-[15px] placeholder:text-ink-3"
                  />
                  <button type="submit" className="btn btn-line min-h-13">
                    Add wallet
                  </button>
                </div>
                <p id="su-help" aria-live="polite" className="min-h-6 text-[14px]">
                  {err ? (
                    <span className="anim-rise font-medium text-stamp">{err}</span>
                  ) : kind === "secret" ? (
                    <span className="anim-rise font-semibold text-stamp">That looks like a private key or seed phrase. Delete it now.</span>
                  ) : kind ? (
                    <span className="anim-rise text-pencil">Looks like {kind === "evm" ? "an EVM" : kind === "tron" ? "a Tron" : "a Solana"} address · {FAM_NETWORKS[kind]}</span>
                  ) : (
                    <span className="text-ink-3">We work out the network from the address.</span>
                  )}
                </p>
              </form>

              <div className="flex flex-wrap items-center gap-5 border-t border-rule-strong pt-6">
                <button type="button" onClick={read} disabled={!wallets.length} className="btn btn-ink disabled:cursor-not-allowed disabled:opacity-50">
                  Read the last 90 days
                </button>
                {!hasTron ? (
                  <button type="button" onClick={() => add(SAMPLE_TRON)} className="link-u text-[15px] text-pencil">
                    Add a sample Tron wallet
                  </button>
                ) : null}
              </div>
            </div>
          ) : null}

          {step === 2 ? (
            <div className="flex flex-col gap-7">
              <h1 className="display text-[48px]">{finished ? "Done reading." : "Reading the last 90 days…"}</h1>
              <ul className="flex flex-col border-t-2 border-ink font-mono text-[14px]" aria-live="polite">
                {[...lines, { label: `Matching ${found} payments against 41 open invoices`, result: `${matched} matched`, n: 0 }].map((l, i) =>
                  progress >= i ? (
                    <li key={l.label} className="anim-rise flex flex-wrap items-center justify-between gap-3 border-b border-rule py-3">
                      <span className="flex items-center gap-3">
                        {progress > i ? <Tick /> : <Spinner />}
                        {l.label}
                      </span>
                      <span className={progress > i ? "text-ink" : "text-ink-3"}>{progress > i ? l.result : "…"}</span>
                    </li>
                  ) : null,
                )}
              </ul>

              {finished ? (
                <div className="anim-rise flex flex-col gap-6">
                  <dl className="grid grid-cols-3 border-t-2 border-ink">
                    {[
                      [found, "found"],
                      [matched, "already paid in Xero"],
                      [review, "need a look"],
                    ].map(([n, l], i) => (
                      <div key={l} className={`flex flex-col-reverse gap-1 pt-4 ${i ? "border-l border-rule-strong pl-4" : ""}`}>
                        <dt className="text-[14px] text-ink-3">{l}</dt>
                        <dd className={`display text-[56px] leading-none ${i === 2 ? "text-stamp" : ""}`}>{n}</dd>
                      </div>
                    ))}
                  </dl>
                  <p className="max-w-[620px] text-[17px] leading-relaxed text-ink-2">
                    {matched} payments are already recorded in Xero at their USD value.{" "}
                    {review
                      ? `${review === 1 ? "One needs" : `${review} need`} a look: ${[hasEvm ? "one short by a fee" : "", hasTron ? "one on another chain" : "", hasEvm ? "one from a wallet we don't know" : ""].filter(Boolean).join(", ")}.`
                      : "Nothing needs you."}
                  </p>
                  <Link href="/demo" className="btn btn-ink self-start">
                    {review ? `Review ${review} payment${review === 1 ? "" : "s"}` : "Open the inbox"}
                  </Link>
                </div>
              ) : null}
            </div>
          ) : null}
        </section>
      </main>
    </div>
  );
}
