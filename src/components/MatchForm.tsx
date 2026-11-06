"use client";

import { useMemo, useState } from "react";
import { CONTACT_EMAIL, start } from "@/content/site";

type Kind = "evm" | "tron" | "solana" | "secret" | "unknown";

function classify(line: string): Kind {
  const s = line.trim();
  const words = s.split(/\s+/);
  if (words.length >= 12 && words.every((w) => /^[a-z]+$/.test(w))) return "secret";
  if (/^(0x)?[0-9a-fA-F]{64}$/.test(s)) return "secret";
  if (/^0x[0-9a-fA-F]{40}$/.test(s)) return "evm";
  if (/^T[1-9A-HJ-NP-Za-km-z]{33}$/.test(s)) return "tron";
  if (/^[1-9A-HJ-NP-Za-km-z]{32,44}$/.test(s)) return "solana";
  return "unknown";
}

const KIND_LABEL: Record<Kind, string> = {
  evm: "Base / Ethereum / Arbitrum / Polygon / Tempo / Arc",
  tron: "Tron",
  solana: "Solana",
  secret: "",
  unknown: "",
};

const MONTHS = ["October 2026", "September 2026", "August 2026"];

export function MatchForm() {
  const [email, setEmail] = useState("");
  const [wallets, setWallets] = useState("");
  const [month, setMonth] = useState(MONTHS[0]);
  const [errors, setErrors] = useState<{ email?: string; wallets?: string }>({});
  const [sent, setSent] = useState(false);
  const [copied, setCopied] = useState(false);

  const lines = useMemo(() => wallets.split("\n").map((l) => l.trim()).filter(Boolean), [wallets]);
  const kinds = useMemo(() => lines.map((l) => ({ line: l, kind: classify(l) })), [lines]);
  const secret = kinds.some((k) => k.kind === "secret");
  const unknown = kinds.filter((k) => k.kind === "unknown");

  const body = () =>
    [
      `Please match my ${month} stablecoin payments to my Xero invoices.`,
      "",
      "Wallets:",
      ...kinds.map((k) => `- ${k.line} (${KIND_LABEL[k.kind] || "check"})`),
      "",
      "Attached: my Xero invoice export (Xero > Sales > Invoices > Export).",
      "",
      `Reply to: ${email}`,
    ].join("\n");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const next: typeof errors = {};
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) next.email = "Add the email we should reply to.";
    if (!lines.length) next.wallets = "Add at least one wallet address you get paid to.";
    else if (secret) next.wallets = "Remove the private key or seed phrase first. We only need public addresses.";
    else if (unknown.length)
      next.wallets = `This doesn't look like a wallet address: “${unknown[0].line.slice(0, 18)}${unknown[0].line.length > 18 ? "…" : ""}”. Check for a missing character.`;
    setErrors(next);
    if (Object.keys(next).length) return;
    const href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(`Match my ${month} · ${email.trim()}`)}&body=${encodeURIComponent(body())}`;
    window.location.href = href;
    setSent(true);
  };

  const copyDetails = async () => {
    try {
      await navigator.clipboard.writeText(`To: ${CONTACT_EMAIL}\n\n${body()}`);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      /* ignore */
    }
  };

  if (sent) {
    return (
      <div className="anim-rise flex flex-col gap-5 border border-fog/40 p-8" aria-live="polite">
        <svg width="56" height="56" viewBox="0 0 56 56" aria-hidden="true" className="anim-draw">
          <rect x="2" y="2" width="52" height="52" fill="none" stroke="var(--color-fog)" strokeWidth="2" />
          <path d="M15 29l9 9 18-20" fill="none" stroke="var(--color-stamp)" strokeWidth="4" strokeLinecap="square" />
        </svg>
        <h3 className="display text-[40px] text-paper">Nearly there.</h3>
        <ol className="flex list-decimal flex-col gap-2 pl-5 text-[17px] leading-relaxed text-fog">
          <li>Your email app should have opened with everything filled in.</li>
          <li>Attach your Xero invoice export: Xero › Sales › Invoices › Export.</li>
          <li>Send it. We reply to {email.trim()} within 48 hours with every payment matched.</li>
        </ol>
        <p className="text-[14px] text-fog/80">
          Email app didn&apos;t open? Write to{" "}
          <a href={`mailto:${CONTACT_EMAIL}`} className="link-u text-paper">
            {CONTACT_EMAIL}
          </a>{" "}
          or{" "}
          <button type="button" onClick={copyDetails} className="link-u text-paper">
            {copied ? "copied" : "copy the details"}
          </button>
          .
        </p>
        <button type="button" onClick={() => setSent(false)} className="self-start text-[14px] text-fog/80 underline-offset-4 hover:underline">
          Edit what I sent
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} noValidate className="flex flex-col gap-5 border border-fog/40 p-6 sm:p-8">
      <div className="flex flex-col gap-2">
        <label htmlFor="mf-email" className="text-[14px] text-fog">
          {start.fields.email.label}
        </label>
        <input
          id="mf-email"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={start.fields.email.placeholder}
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? "mf-email-err" : undefined}
          className="min-h-13 border border-rule-strong bg-paper px-4 text-[16px] text-ink placeholder:text-ink-3"
        />
        {errors.email ? (
          <p id="mf-email-err" className="anim-rise text-[14px] font-medium text-[#ffb59c]">
            {errors.email}
          </p>
        ) : null}
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="mf-wallets" className="text-[14px] text-fog">
          {start.fields.wallets.label}
        </label>
        <textarea
          id="mf-wallets"
          rows={3}
          spellCheck={false}
          value={wallets}
          onChange={(e) => setWallets(e.target.value)}
          placeholder={start.fields.wallets.placeholder}
          aria-invalid={!!errors.wallets || secret}
          aria-describedby="mf-wallets-help"
          className="border border-rule-strong bg-paper px-4 py-3 font-mono text-[14px] leading-relaxed text-ink placeholder:text-ink-3"
        />
        <div id="mf-wallets-help" aria-live="polite" className="flex min-h-6 flex-wrap items-center gap-2 text-[13px]">
          {secret ? (
            <p className="anim-rise font-semibold text-[#ffb59c]">
              That looks like a private key or seed phrase. Delete it now and never share it. We only need public addresses.
            </p>
          ) : kinds.length ? (
            kinds.map((k, i) =>
              k.kind === "unknown" ? (
                <span key={i} className="anim-rise border border-[#ffb59c]/60 px-2 py-0.5 font-mono text-[#ffb59c]">
                  not recognised
                </span>
              ) : (
                <span key={i} className="anim-rise border border-fog/40 px-2 py-0.5 font-mono text-fog">
                  {k.kind === "evm" ? "EVM" : k.kind === "tron" ? "Tron" : "Solana"} ✓
                </span>
              ),
            )
          ) : (
            <span className="text-fog/80">{start.fields.wallets.hint}</span>
          )}
        </div>
        {errors.wallets && !secret ? <p className="anim-rise text-[14px] font-medium text-[#ffb59c]">{errors.wallets}</p> : null}
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="mf-month" className="text-[14px] text-fog">
          {start.fields.month.label}
        </label>
        <select
          id="mf-month"
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          className="min-h-13 border border-rule-strong bg-paper px-3 text-[16px] text-ink"
        >
          {MONTHS.map((m) => (
            <option key={m}>{m}</option>
          ))}
        </select>
      </div>

      <button type="submit" className="btn btn-stamp mt-1 w-full text-[17px]">
        {start.submit}
      </button>
      <p className="text-[13px] leading-relaxed text-fog/80">{start.safety}</p>
    </form>
  );
}
