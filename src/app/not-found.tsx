import Link from "next/link";

export default function NotFound() {
  return (
    <main id="main" className="ledger-lines flex min-h-screen flex-col items-start justify-center gap-6 px-[var(--gutter)]">
      <p className="font-mono text-[13px] uppercase tracking-[0.08em] text-ink-3">404 · unmatched</p>
      <h1 className="display text-[clamp(56px,9vw,128px)]">This page has no invoice.</h1>
      <p className="max-w-lg text-[18px] text-ink-2">We looked everywhere it could be. It isn&apos;t here.</p>
      <Link href="/" className="btn btn-ink">Back to Cleared</Link>
    </main>
  );
}
