"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Logo } from "@/components/Chrome";
import { messages } from "@/content/site";

/* ------------------------------------------------------------------ */
/* Sample data: Northline Studio, October 2026. Fictional.               */
/* ------------------------------------------------------------------ */
type Kind = "fee" | "chain" | "who";
type Item = {
  id: Kind;
  title: string;
  sub: string;
  amount: string;
  token: string;
  chain: string;
  date: string;
};

const ITEMS: Item[] = [
  { id: "fee", title: "Short by 1.20", sub: "INV-0420 · Halcyon Protocol", amount: "9,598.80", token: "USDC", chain: "Base", date: "09 Oct" },
  { id: "chain", title: "Paid on another chain", sub: "INV-0422 · Meridian Labs", amount: "5,400.00", token: "USDT", chain: "Tron", date: "15 Oct" },
  { id: "who", title: "Unknown wallet", sub: "0x7a3f…91c2 · 2 invoices fit", amount: "2,250.00", token: "USDC", chain: "Base", date: "17 Oct" },
];

const TOTAL = 23;
const AUTO = 20;

type Choice = { fee: "a" | "b" | "c"; chain: "a" | "b"; who: "kestrel" | "fathom" };
type Phase = "idle" | "writing" | "stamped";
type Toast = { id: number; text: string; undo: boolean };

function outcome(kind: Kind, c: Choice, rule: boolean) {
  if (kind === "fee") {
    if (c.fee === "a")
      return {
        label: "Mark INV-0420 paid in Xero",
        toast: `INV-0420 is paid in Xero. 1.20 went to Bank fees.${rule ? " Gaps under 5.00 from Halcyon will clear on their own." : ""}`,
        stamp: "Paid",
      };
    if (c.fee === "b") return { label: "Apply 9,598.80 to INV-0420", toast: "9,598.80 applied to INV-0420. 1.20 is still open in Xero.", stamp: "Part paid" };
    return { label: "Move to Unmatched", toast: "Moved to Unmatched. Pick the right invoice from there.", stamp: null };
  }
  if (kind === "chain") {
    if (c.chain === "a")
      return {
        label: "Mark INV-0422 paid in Xero",
        toast: `INV-0422 is paid in Xero.${rule ? " Tron payments from Meridian Labs will match on their own." : ""}`,
        stamp: "Paid",
      };
    return { label: "Move to Unmatched", toast: "Moved to Unmatched. Pick the right invoice from there.", stamp: null };
  }
  const inv = c.who === "kestrel" ? "INV-0426" : "INV-0427";
  const name = c.who === "kestrel" ? "Kestrel DAO" : "Fathom Network";
  return {
    label: `Mark ${inv} paid in Xero`,
    toast: `${inv} is paid in Xero.${rule ? ` 0x7a3f…91c2 is now saved as ${name}.` : ""}`,
    stamp: "Paid",
  };
}

/* ------------------------------------------------------------------ */
/* Small pieces                                                         */
/* ------------------------------------------------------------------ */
function Tick({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 18 18" aria-hidden="true" className="anim-draw shrink-0">
      <path d="M3 9.5l4 4 8-9" fill="none" stroke="var(--color-pencil)" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Stamp({ text }: { text: string }) {
  return (
    <div
      aria-hidden="true"
      className="anim-stamp pointer-events-none absolute right-4 top-4 border-4 border-double border-stamp bg-card/60 px-3 pb-1 pt-1.5 text-stamp mix-blend-multiply"
      style={{ ["--rot" as string]: "-8deg" }}
    >
      <span className="display text-[34px] tracking-[0.08em]">{text}</span>
    </div>
  );
}

function Card({ label, children, stamp }: { label: string; children: React.ReactNode; stamp?: string | null }) {
  return (
    <div className="relative flex min-w-0 flex-col gap-3.5 p-5 sm:p-6">
      <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-ink-3">{label}</span>
      {children}
      {stamp ? <Stamp text={stamp} /> : null}
    </div>
  );
}

function Facts({ rows }: { rows: [string, React.ReactNode][] }) {
  return (
    <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 text-[14px]">
      {rows.map(([k, v]) => (
        <div key={k} className="contents">
          <dt className="text-ink-3">{k}</dt>
          <dd className="min-w-0">{v}</dd>
        </div>
      ))}
    </dl>
  );
}

function Evidence({ points }: { points: string[] }) {
  return (
    <div className="flex flex-col gap-2.5">
      <h3 className="display text-[18px]">Why Cleared thinks so</h3>
      <ul className="flex flex-col gap-2 text-[15px] leading-relaxed text-ink-2">
        {points.map((p, i) => (
          <li key={p} className="anim-rise flex gap-3" style={{ animationDelay: `${120 + i * 70}ms` }}>
            <Tick />
            {p}
          </li>
        ))}
      </ul>
    </div>
  );
}

function Option({
  name,
  checked,
  onChange,
  children,
  suggested,
}: {
  name: string;
  checked: boolean;
  onChange: () => void;
  children: React.ReactNode;
  suggested?: boolean;
}) {
  return (
    <label
      className={`flex min-h-12 cursor-pointer items-start gap-3.5 border px-4 py-3.5 text-[16px] leading-snug transition-[border-color,background-color,box-shadow] duration-200 ${
        checked ? "border-2 border-ink bg-card shadow-[4px_4px_0_var(--color-rule-strong)]" : "border-rule-strong hover:border-ink"
      }`}
    >
      <input type="radio" name={name} checked={checked} onChange={onChange} className="mt-0.5 h-[18px] w-[18px] shrink-0 accent-[var(--color-ink)]" />
      <span>
        {children}
        {suggested ? <span className="ml-2 whitespace-nowrap font-mono text-[12px] text-pencil">suggested</span> : null}
      </span>
    </label>
  );
}

/* ------------------------------------------------------------------ */
/* The inbox                                                            */
/* ------------------------------------------------------------------ */
export function ReviewInbox() {
  const [current, setCurrent] = useState<Kind | null>("fee");
  const [resolved, setResolved] = useState<Kind[]>([]);
  const [choice, setChoice] = useState<Choice>({ fee: "a", chain: "a", who: "kestrel" });
  const [rules, setRules] = useState<Record<Kind, boolean>>({ fee: true, chain: true, who: true });
  const [phase, setPhase] = useState<Phase>("idle");
  const [stampText, setStampText] = useState<string | null>(null);
  const [toast, setToast] = useState<Toast | null>(null);
  const [closed, setClosed] = useState(false);
  const timers = useRef<number[]>([]);
  const savedRules = useRef(0);

  const later = (fn: () => void, ms: number) => {
    timers.current.push(window.setTimeout(fn, ms));
  };
  useEffect(() => () => timers.current.forEach((t) => window.clearTimeout(t)), []);

  const left = ITEMS.length - resolved.length;
  const done = left === 0;
  const item = ITEMS.find((i) => i.id === current) ?? null;
  const out = useMemo(() => (current ? outcome(current, choice, rules[current]) : null), [current, choice, rules]);

  const showToast = useCallback((text: string, undo: boolean) => {
    const id = Date.now();
    setToast({ id, text, undo });
    timers.current.push(window.setTimeout(() => setToast((t) => (t && t.id === id ? null : t)), 5200));
  }, []);

  const apply = useCallback(() => {
    if (!current || phase !== "idle" || !out) return;
    const kind = current;
    setPhase("writing");
    later(() => {
      setPhase("stamped");
      setStampText(out.stamp);
      setResolved((r) => [...r, kind]);
      if (rules[kind]) savedRules.current += 1;
      showToast(out.toast, true);
      later(() => {
        const next = ITEMS.find((i) => i.id !== kind && !resolvedRef.current.includes(i.id));
        setCurrent(next ? next.id : null);
        setPhase("idle");
        setStampText(null);
      }, 1300);
    }, 650);
  }, [current, phase, out, rules, showToast]);

  const resolvedRef = useRef<Kind[]>([]);
  useEffect(() => {
    resolvedRef.current = resolved;
  }, [resolved]);

  const undo = () => {
    const last = resolved[resolved.length - 1];
    if (!last) return;
    if (rules[last] && savedRules.current > 0) savedRules.current -= 1;
    setResolved((r) => r.slice(0, -1));
    setCurrent(last);
    setPhase("idle");
    setStampText(null);
    setClosed(false);
    const inv = last === "fee" ? "INV-0420" : last === "chain" ? "INV-0422" : choice.who === "kestrel" ? "INV-0426" : "INV-0427";
    showToast(messages.undone(inv), false);
  };

  const skip = () => {
    if (!current) return;
    const open = ITEMS.filter((i) => !resolved.includes(i.id));
    const idx = open.findIndex((i) => i.id === current);
    setCurrent(open[(idx + 1) % open.length].id);
  };

  const reset = () => {
    timers.current.forEach((t) => window.clearTimeout(t));
    timers.current = [];
    savedRules.current = 0;
    setResolved([]);
    setCurrent("fee");
    setChoice({ fee: "a", chain: "a", who: "kestrel" });
    setRules({ fee: true, chain: true, who: true });
    setPhase("idle");
    setStampText(null);
    setToast(null);
    setClosed(false);
  };

  // Keyboard: Enter applies, S skips, U undoes. Ignored while typing.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement;
      if (t && (t.tagName === "TEXTAREA" || (t.tagName === "INPUT" && (t as HTMLInputElement).type === "text"))) return;
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      if (e.key === "Enter" && t?.tagName !== "BUTTON" && t?.tagName !== "A") {
        e.preventDefault();
        apply();
      } else if (e.key.toLowerCase() === "s") skip();
      else if (e.key.toLowerCase() === "u" && toast?.undo) undo();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  const filled = AUTO + resolved.length;

  return (
    <div className="flex min-h-screen flex-wrap bg-paper">
      {/* SIDEBAR */}
      <aside className="flex w-full flex-col gap-6 bg-ink px-5 py-5 text-fog lg:sticky lg:top-0 lg:h-screen lg:w-[248px] lg:gap-8 lg:py-6">
        <div className="flex items-center justify-between gap-4">
          <Link href="/" aria-label="Cleared home">
            <Logo tone="paper" />
          </Link>
          <span className="border border-fog/40 px-2 py-1 font-mono text-[11px] uppercase tracking-[0.08em] text-fog">Demo</span>
        </div>
        <nav aria-label="App" className="flex flex-wrap gap-1 text-[15px] lg:flex-col lg:flex-nowrap lg:gap-0.5">
          <a href="#review" aria-current="page" className="flex min-h-11 items-center justify-between gap-3 bg-paper px-3 font-semibold text-ink">
            Review
            <span key={left} className="anim-flip font-mono text-[13px] text-stamp">
              {left}
            </span>
          </a>
          {[
            ["Matched", String(filled)],
            ["Invoices", ""],
            ["Wallets", "2"],
            ["Month-end", ""],
            ["Settings", ""],
          ].map(([l, n]) => (
            <a key={l} href="#review" className="flex min-h-11 items-center justify-between gap-3 px-3 text-fog transition-colors hover:bg-white/5">
              {l}
              {n ? <span className="font-mono text-[13px]">{n}</span> : null}
            </a>
          ))}
        </nav>
        <div className="mt-auto hidden flex-col gap-1.5 border-t border-white/10 pt-4 text-[13px] lg:flex">
          <span className="font-semibold text-paper">Northline Studio</span>
          <span className="flex items-center gap-2">
            <span aria-hidden="true" className="h-2 w-2 rounded-full bg-mint" />
            Xero connected · synced 4 min ago
          </span>
          <span className="mt-2 font-mono text-[11px] text-fog/80">Sample data. Nothing here is real.</span>
        </div>
      </aside>

      {/* MAIN */}
      <main id="review" className="flex min-w-0 flex-[999_1_560px] flex-col">
        <header className="flex flex-wrap items-end justify-between gap-6 border-b-2 border-ink px-6 pb-5 pt-7 sm:px-10">
          <div className="flex items-end gap-5">
            <span key={left} className="anim-flip display text-[96px] leading-[0.78] text-stamp" aria-hidden="true">
              {left}
            </span>
            <div className="flex flex-col gap-1 pb-1">
              <span className="font-mono text-[12px] uppercase tracking-[0.08em] text-ink-3">Receipts · October 2026</span>
              <h1 className="display text-[40px]">{done ? "Nothing to review" : left === 1 ? "Left to review" : "Left to review"}</h1>
              <span className="sr-only" aria-live="polite">
                {left} payments left to review
              </span>
            </div>
          </div>
          <div className="flex min-w-[260px] flex-1 flex-col gap-2 sm:max-w-[420px]">
            <div className="grid grid-cols-[repeat(23,minmax(0,1fr))] gap-[3px]" role="img" aria-label={`${filled} of ${TOTAL} payments recorded in Xero`}>
              {Array.from({ length: TOTAL }, (_, i) =>
                i < filled ? (
                  <span key={i} className={`h-6 bg-ink ${i >= AUTO ? "anim-fill" : ""}`} />
                ) : (
                  <span key={i} className="h-6 border-2 border-stamp" />
                ),
              )}
            </div>
            <p className="flex justify-between font-mono text-[12px] text-ink-3">
              <span>
                {filled} of {TOTAL} in Xero
              </span>
              <span>{AUTO} matched without you</span>
            </p>
          </div>
        </header>

        {done ? (
          <section className="flex flex-1 flex-col items-start justify-center gap-7 px-6 py-16 sm:px-14">
            <span className="anim-flip display text-[clamp(160px,22vw,280px)] leading-[0.75]" aria-hidden="true">
              0
            </span>
            <h2 className="anim-rise display text-[56px]" style={{ animationDelay: "120ms" }}>
              {messages.clearMonth("October", TOTAL)}
            </h2>
            <p className="anim-rise max-w-[560px] text-[19px] leading-relaxed text-ink-2" style={{ animationDelay: "200ms" }}>
              {messages.clearMonthBody(TOTAL, savedRules.current)}
            </p>
            {closed ? (
              <p className="anim-rise border-l-4 border-pencil bg-pencil-soft px-4 py-3 text-[16px]" aria-live="polite">
                October is closed. November&apos;s payments will show here as they land.
              </p>
            ) : (
              <div className="anim-rise flex flex-wrap items-center gap-4" style={{ animationDelay: "280ms" }}>
                <button type="button" onClick={() => setClosed(true)} className="btn btn-ink">
                  Close October
                </button>
                <button type="button" onClick={reset} className="link-u text-[16px] font-medium text-pencil">
                  Run the demo again
                </button>
              </div>
            )}
          </section>
        ) : (
          <div className="flex min-h-0 flex-1 flex-wrap">
            {/* QUEUE */}
            <section aria-label="Needs review" className="ledger-lines w-full border-b border-rule-strong md:w-[340px] md:border-b-0 md:border-r">
              <ul>
                {ITEMS.map((i) => {
                  const isDone = resolved.includes(i.id);
                  const isCur = i.id === current;
                  return (
                    <li key={i.id} className="border-b border-rule-strong">
                      <button
                        type="button"
                        disabled={isDone}
                        onClick={() => {
                          if (phase === "idle") setCurrent(i.id);
                        }}
                        aria-current={isCur ? "true" : undefined}
                        className={`flex w-full flex-col gap-1.5 px-6 py-5 text-left transition-[background-color,box-shadow,opacity] duration-300 ${
                          isCur ? "bg-card shadow-[inset_6px_0_0_var(--color-stamp)]" : isDone ? "opacity-60" : "hover:bg-card/70"
                        }`}
                      >
                        <span className="flex items-center justify-between gap-3">
                          <span className={`display text-[21px] ${isDone ? "text-ink-3 line-through decoration-2" : isCur ? "text-stamp" : ""}`}>{i.title}</span>
                          {isDone ? <Tick size={18} /> : <span className="font-mono text-[12px] text-ink-3">{i.date}</span>}
                        </span>
                        <span className="text-[15px]">{i.sub}</span>
                        <span className="font-mono text-[13px] text-ink-3">
                          {i.amount} {i.token} · {i.chain}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
              <p className="hidden px-6 py-5 font-mono text-[12px] leading-relaxed text-ink-3 md:block">
                <kbd className="border border-rule-strong bg-card px-1.5">Enter</kbd> apply · <kbd className="border border-rule-strong bg-card px-1.5">S</kbd> skip ·{" "}
                <kbd className="border border-rule-strong bg-card px-1.5">U</kbd> undo
              </p>
            </section>

            {/* DETAIL */}
            {item && out ? (
              <section key={item.id} aria-label="Payment detail" className="anim-rise flex min-w-0 flex-[999_1_520px] flex-col gap-7 px-6 py-8 sm:px-10">
                {item.id === "fee" ? (
                  <>
                    <div className="flex flex-col gap-2.5">
                      <h2 className="display text-[44px]">
                        Short by <span className="text-stamp">1.20 USDC</span>
                      </h2>
                      <p className="max-w-[640px] text-[17px] leading-relaxed text-ink-2">
                        Halcyon Protocol paid from the wallet it always uses. Their exchange took its fee out of the amount, so 1.20 never arrived.
                      </p>
                    </div>
                    <div className="grid border border-ink bg-card sm:grid-cols-2">
                      <Card label="In your wallet">
                        <span className="font-mono text-[30px] font-semibold tnum">
                          9,598.80 <span className="text-[15px]">USDC</span>
                        </span>
                        <Facts rows={[["From", <span key="f" className="font-mono">0x91d0…4e2a</span>], ["Network", "Base"], ["Landed", <span key="l" className="font-mono">09 Oct 2026 · 14:22 UTC</span>]]} />
                      </Card>
                      <div className="border-t border-rule-strong sm:border-l sm:border-t-0">
                        <Card label="In Xero" stamp={phase === "stamped" ? stampText : null}>
                          <span className="font-mono text-[30px] font-semibold tnum">
                            9,600.00 <span className="text-[15px]">USD</span>
                          </span>
                          <Facts rows={[["Invoice", <span key="i" className="font-mono">INV-0420</span>], ["Contact", "Halcyon Protocol"], ["Due", "15 Oct 2026"]]} />
                        </Card>
                      </div>
                      <div className="flex flex-wrap justify-between gap-2 border-t-2 border-ink px-6 py-3.5 font-mono text-[14px] sm:col-span-2">
                        <span>Difference</span>
                        <span className="font-semibold text-stamp">−1.20 · 0.0125% of the invoice</span>
                      </div>
                    </div>
                    <Evidence
                      points={[
                        "Same wallet as Halcyon's last four payments.",
                        "Arrived 8 days after INV-0420 was sent, before it was due.",
                        "No other open invoice is within 5.00 of this amount.",
                      ]}
                    />
                    <fieldset className="flex flex-col gap-2.5">
                      <legend className="display mb-3 text-[18px]">What should happen</legend>
                      <Option name="fee" checked={choice.fee === "a"} onChange={() => setChoice((c) => ({ ...c, fee: "a" }))} suggested>
                        Book 1.20 to <strong className="font-semibold">Bank fees</strong> and mark INV-0420 paid
                      </Option>
                      <Option name="fee" checked={choice.fee === "b"} onChange={() => setChoice((c) => ({ ...c, fee: "b" }))}>
                        Apply 9,598.80 and leave 1.20 open on the invoice
                      </Option>
                      <Option name="fee" checked={choice.fee === "c"} onChange={() => setChoice((c) => ({ ...c, fee: "c" }))}>
                        It&apos;s for a different invoice
                      </Option>
                    </fieldset>
                  </>
                ) : null}

                {item.id === "chain" ? (
                  <>
                    <div className="flex flex-col gap-2.5">
                      <h2 className="display text-[44px]">
                        Paid on <span className="text-stamp">Tron</span>. The invoice asked for Base.
                      </h2>
                      <p className="max-w-[640px] text-[17px] leading-relaxed text-ink-2">
                        Meridian Labs sent 5,400.00 USDT on Tron for INV-0422. The amount matches to the cent; only the network is different.
                      </p>
                    </div>
                    <div className="grid border border-ink bg-card sm:grid-cols-2">
                      <Card label="In your wallet">
                        <span className="font-mono text-[30px] font-semibold tnum">
                          5,400.00 <span className="text-[15px]">USDT</span>
                        </span>
                        <Facts rows={[["From", <span key="f" className="font-mono">T9yD…3kQx</span>], ["Network", "Tron"], ["Landed", <span key="l" className="font-mono">15 Oct 2026 · 11:05 UTC</span>]]} />
                      </Card>
                      <div className="border-t border-rule-strong sm:border-l sm:border-t-0">
                        <Card label="In Xero" stamp={phase === "stamped" ? stampText : null}>
                          <span className="font-mono text-[30px] font-semibold tnum">
                            5,400.00 <span className="text-[15px]">USD</span>
                          </span>
                          <Facts rows={[["Invoice", <span key="i" className="font-mono">INV-0422</span>], ["Contact", "Meridian Labs"], ["Due", "20 Oct 2026"]]} />
                        </Card>
                      </div>
                    </div>
                    <Evidence
                      points={["This Tron wallet paid Meridian's last two invoices, INV-0391 and INV-0407.", "The amount matches INV-0422 exactly.", "Valued in USD at the 15 Oct USDT rate."]}
                    />
                    <fieldset className="flex flex-col gap-2.5">
                      <legend className="display mb-3 text-[18px]">What should happen</legend>
                      <Option name="chain" checked={choice.chain === "a"} onChange={() => setChoice((c) => ({ ...c, chain: "a" }))} suggested>
                        Accept it and mark INV-0422 paid
                      </Option>
                      <Option name="chain" checked={choice.chain === "b"} onChange={() => setChoice((c) => ({ ...c, chain: "b" }))}>
                        It isn&apos;t from Meridian. Find the right invoice
                      </Option>
                    </fieldset>
                  </>
                ) : null}

                {item.id === "who" ? (
                  <>
                    <div className="flex flex-col gap-2.5">
                      <h2 className="display text-[44px]">
                        Who sent <span className="text-stamp">2,250.00</span>?
                      </h2>
                      <p className="max-w-[640px] text-[17px] leading-relaxed text-ink-2">
                        A wallet we haven&apos;t seen before paid 2,250.00 USDC on Base on 17 Oct. Two open invoices are for exactly that amount.
                      </p>
                    </div>
                    <fieldset className="grid gap-3 sm:grid-cols-2">
                      <legend className="display mb-3 text-[18px]">Pick the invoice it pays</legend>
                      {(
                        [
                          ["kestrel", "INV-0426", "Kestrel DAO", "Sent 12 Oct", "Pay page opened 17 Oct at 09:41, 20 minutes before this payment.", true],
                          ["fathom", "INV-0427", "Fathom Network", "Sent 14 Oct", "Pay page not opened yet.", false],
                        ] as const
                      ).map(([key, inv, name, sent, why, likely]) => {
                        const on = choice.who === key;
                        return (
                          <label
                            key={key}
                            className={`relative flex cursor-pointer flex-col gap-3 border bg-card p-5 transition-[border-color,box-shadow] duration-200 ${
                              on ? "border-2 border-ink shadow-[5px_5px_0_var(--color-rule-strong)]" : "border-rule-strong hover:border-ink"
                            }`}
                          >
                            <span className="flex items-center justify-between gap-3">
                              <span className="flex items-center gap-3">
                                <input type="radio" name="who" checked={on} onChange={() => setChoice((c) => ({ ...c, who: key }))} className="h-[18px] w-[18px] accent-[var(--color-ink)]" />
                                <span className="font-mono text-[15px] font-semibold">{inv}</span>
                              </span>
                              {likely ? <span className="font-mono text-[12px] text-pencil">likely</span> : null}
                            </span>
                            <span className="text-[17px] font-semibold">{name}</span>
                            <span className="font-mono text-[13px] text-ink-3">2,250.00 USD · {sent}</span>
                            <span className="text-[14px] leading-relaxed text-ink-2">{why}</span>
                            {on && phase === "stamped" && stampText ? <Stamp text={stampText} /> : null}
                          </label>
                        );
                      })}
                    </fieldset>
                  </>
                ) : null}

                <label className="flex min-h-11 cursor-pointer items-center gap-3 text-[15px]">
                  <input
                    type="checkbox"
                    checked={rules[item.id]}
                    onChange={() => setRules((r) => ({ ...r, [item.id]: !r[item.id] }))}
                    className="h-[18px] w-[18px] accent-[var(--color-ink)]"
                  />
                  {item.id === "fee"
                    ? "From now on, book gaps under 5.00 from Halcyon Protocol to Bank fees without asking"
                    : item.id === "chain"
                      ? "Accept Tron payments from Meridian Labs from now on"
                      : `Remember 0x7a3f…91c2 as ${choice.who === "kestrel" ? "Kestrel DAO" : "Fathom Network"}`}
                </label>

                <div className="flex flex-wrap items-center gap-4 border-t border-rule-strong pt-6">
                  <button type="button" onClick={apply} disabled={phase !== "idle"} className="btn btn-ink min-w-[280px]">
                    {phase === "writing" ? (
                      <>
                        <svg width="16" height="16" viewBox="0 0 18 18" className="anim-spin" aria-hidden="true">
                          <circle cx="9" cy="9" r="7" fill="none" stroke="rgba(243,246,240,0.3)" strokeWidth="2" />
                          <path d="M9 2a7 7 0 0 1 7 7" fill="none" stroke="currentColor" strokeWidth="2" />
                        </svg>
                        {messages.writing}
                      </>
                    ) : phase === "stamped" ? (
                      <>Done</>
                    ) : (
                      out.label
                    )}
                  </button>
                  <button type="button" onClick={skip} disabled={phase !== "idle" || left < 2} className="btn btn-line">
                    Skip for now
                  </button>
                  <span className="font-mono text-[13px] text-ink-3">Recorded through “USDC clearing” at the USD value on the day it landed</span>
                </div>
              </section>
            ) : null}
          </div>
        )}
      </main>

      {/* TOAST */}
      <div aria-live="polite" className="pointer-events-none fixed inset-x-4 bottom-5 z-50 flex justify-center md:inset-x-auto md:bottom-6 md:left-6 lg:left-[272px]">
        {toast ? (
          <div key={toast.id} role="status" className="anim-toast pointer-events-auto relative flex w-full max-w-[460px] flex-col gap-3 overflow-hidden bg-ink px-5 py-4 text-paper shadow-[6px_6px_0_var(--color-rule-strong)] md:w-[296px]">
            <div className="flex items-start gap-3">
              <svg width="20" height="20" viewBox="0 0 18 18" aria-hidden="true" className="anim-draw mt-0.5 shrink-0">
                <path d="M3 9.5l4 4 8-9" fill="none" stroke="var(--color-mint)" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <p className="flex-1 text-[15px] leading-snug">{toast.text}</p>
            </div>
            {toast.undo ? (
              <button type="button" onClick={undo} className="min-h-9 self-end border border-fog/50 px-3 text-[14px] font-semibold hover:bg-paper hover:text-ink">
                {messages.undo} <span className="font-mono text-[12px] font-normal text-fog">U</span>
              </button>
            ) : null}
            <span aria-hidden="true" className="absolute inset-x-0 bottom-0 h-[3px] origin-left bg-stamp" style={{ animation: "toast-timer 5.2s linear both" }} />
          </div>
        ) : null}
      </div>
    </div>
  );
}
