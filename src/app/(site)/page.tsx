import Link from "next/link";
import { LedgerHero } from "@/components/LedgerHero";
import { PayCard } from "@/components/PayCard";
import { MatchForm } from "@/components/MatchForm";
import { hero, chains, proof, cases, how, payPage, compare, bookkeepers, pricing, start, faq } from "@/content/site";

const wrap = "mx-auto max-w-[1280px] px-[var(--gutter)]";

function SectionTitle({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <h2 className={`display text-[clamp(40px,5vw,72px)] ${className}`}>{children}</h2>;
}

export default function Home() {
  return (
    <>
      {/* HERO */}
      <section className="ledger-lines margin-rule relative overflow-hidden border-b border-rule-strong">
        <div className={`${wrap} grid items-start gap-14 pb-28 pt-16 sm:pl-[calc(var(--gutter)+40px)] lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)] lg:pt-24`}>
          <div className="flex min-w-0 flex-col gap-7">
            <p data-reveal className="font-mono text-[13px] uppercase tracking-[0.08em] text-ink-3">
              {hero.eyebrow}
            </p>
            <h1 className="display text-[clamp(56px,7vw,108px)]">
              {hero.lines.map((l, i) => (
                <span key={l} data-reveal className={`block ${i === 1 ? "text-stamp" : ""}`}>
                  {l}
                </span>
              ))}
            </h1>
            <p data-reveal className="max-w-[540px] text-[19px] leading-[1.55] text-ink-2 [text-wrap:pretty]">
              {hero.sub}
            </p>
            <div data-reveal className="flex flex-wrap items-center gap-5">
              <a href={hero.primary.href} className="btn btn-ink text-[17px]">
                {hero.primary.label}
                <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
                  <path d="M2 8h11M9 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.8" />
                </svg>
              </a>
              <Link href={hero.secondary.href} className="link-u text-[16px] font-medium text-pencil">
                {hero.secondary.label}
              </Link>
            </div>
            <ul data-reveal className="flex flex-wrap gap-x-5 gap-y-2 font-mono text-[12px] uppercase tracking-[0.06em] text-ink-3">
              {hero.trust.map((t) => (
                <li key={t} className="flex items-center gap-2">
                  <span aria-hidden="true" className="h-1.5 w-1.5 bg-stamp" />
                  {t}
                </li>
              ))}
            </ul>
          </div>
          <div className="min-w-0 pb-6">
            <LedgerHero />
          </div>
        </div>
      </section>

      {/* CHAINS */}
      <section aria-label="Supported networks" className="border-b border-rule-strong bg-ink text-fog">
        <div className={`${wrap} flex flex-wrap items-center justify-between gap-x-7 gap-y-3 py-4 font-mono text-[13px] uppercase tracking-[0.06em]`}>
          <span className="text-rule-strong">USDC + USDT on</span>
          {chains.map((c) => (
            <span key={c} className="text-paper">
              {c}
            </span>
          ))}
        </div>
      </section>

      {/* PROOF */}
      <section className="border-b border-rule-strong">
        <div className={`${wrap} flex flex-col gap-12 py-28`}>
          <p data-reveal className="font-mono text-[13px] uppercase tracking-[0.08em] text-ink-3">
            {proof.kicker}
          </p>
          <div className="grid gap-px bg-rule-strong md:grid-cols-3">
            {proof.quotes.map((q, i) => (
              <figure key={i} data-reveal className="flex flex-col justify-between gap-8 bg-paper p-7 md:first:pl-0">
                <blockquote className={`display ${i === 0 ? "text-[clamp(30px,3vw,44px)]" : "text-[clamp(26px,2.4vw,34px)]"} leading-[0.98]`}>
                  “{q.text}”
                </blockquote>
                <figcaption className="font-mono text-[12px] text-ink-3">{q.meta}</figcaption>
              </figure>
            ))}
          </div>
          <div data-reveal className="flex flex-wrap items-end gap-x-10 gap-y-4 border-t-2 border-ink pt-6">
            <p className="flex items-baseline gap-3">
              <span className="display text-[64px] text-stamp" data-count={proof.votes}>
                {proof.votes}
              </span>
              <span className="text-[17px] text-ink-2">votes asking Xero for this.</span>
            </p>
            <p className="max-w-xl text-[17px] leading-relaxed text-ink-2">
              <strong className="font-semibold text-ink">“{proof.reply}”</strong> {proof.replyMeta}
            </p>
          </div>
        </div>
      </section>

      {/* SIX CASES */}
      <section id="cases" className="border-b border-rule-strong bg-card">
        <div className={`${wrap} flex flex-col gap-12 py-28`}>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionTitle className="max-w-[780px]">{cases.title}</SectionTitle>
            <p data-reveal className="max-w-[400px] text-[17px] leading-relaxed text-ink-2">
              {cases.intro}
            </p>
          </div>
          <div data-reveal className="overflow-x-auto border border-ink">
            <table className="w-full min-w-[880px] border-collapse text-[16px] leading-[1.45]">
              <caption className="sr-only">Six ways a stablecoin payment goes wrong, what you do today, and what Cleared does</caption>
              <thead>
                <tr className="bg-ink text-left font-mono text-[12px] uppercase tracking-[0.08em] text-paper">
                  <th scope="col" className="w-16 px-5 py-3.5 font-medium">No.</th>
                  <th scope="col" className="px-5 py-3.5 font-medium">What happened</th>
                  <th scope="col" className="px-5 py-3.5 font-medium">What you do today</th>
                  <th scope="col" className="px-5 py-3.5 font-medium">What Cleared does</th>
                </tr>
              </thead>
              <tbody>
                {cases.rows.map((r) => (
                  <tr key={r.n} className="row-mark border-b border-rule last:border-b-0">
                    <td className="px-5 py-5 align-top font-mono font-semibold text-stamp">{r.n}</td>
                    <td className="px-5 py-5 align-top">
                      <strong className="font-semibold">{r.what}</strong> {r.detail}
                    </td>
                    <td className="px-5 py-5 align-top text-ink-3">{r.today}</td>
                    <td className="px-5 py-5 align-top">
                      <span className="flex gap-3">
                        <svg data-draw width="18" height="18" viewBox="0 0 18 18" aria-hidden="true" className="mt-0.5 shrink-0">
                          <path d="M3 9.5l4 4 8-9" fill="none" stroke="var(--color-pencil)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        {r.cleared}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* HOW */}
      <section id="how" className="ledger-lines border-b border-rule-strong">
        <div className={`${wrap} flex flex-col gap-14 py-28`}>
          <SectionTitle className="max-w-[900px]">{how.title}</SectionTitle>
          <ol className="grid border-t-2 border-ink md:grid-cols-3">
            {how.steps.map((s, i) => (
              <li
                key={s.n}
                data-reveal
                className={`flex flex-col gap-3.5 py-8 md:pb-10 ${i > 0 ? "md:border-l md:border-rule-strong md:pl-8" : ""} ${i < 2 ? "md:pr-8" : ""}`}
              >
                <span className="font-mono text-[13px] font-semibold text-stamp">{s.n}</span>
                <h3 className="display text-[30px]">{s.title}</h3>
                <p className="text-[17px] leading-relaxed text-ink-2">{s.body}</p>
              </li>
            ))}
          </ol>
          <Link href="/demo/setup" data-reveal className="link-u self-start text-[16px] font-medium text-pencil">
            Walk through setup in the demo →
          </Link>
        </div>
      </section>

      {/* PAY PAGE */}
      <section className="border-b border-rule-strong">
        <div className={`${wrap} grid items-center gap-16 py-28 lg:grid-cols-2`}>
          <div className="flex flex-col gap-6">
            <SectionTitle>{payPage.title}</SectionTitle>
            {payPage.body.map((p) => (
              <p key={p} data-reveal className="max-w-[520px] text-[18px] leading-relaxed text-ink-2">
                {p}
              </p>
            ))}
            <p data-reveal className="font-mono text-[13px] text-ink-3">
              Try it: pick Tempo to see the memo, or Tron for USDT.
            </p>
          </div>
          <div data-reveal className="flex justify-center lg:justify-end">
            <PayCard />
          </div>
        </div>
      </section>

      {/* COMPARE */}
      <section className="border-b border-rule-strong bg-card">
        <div className={`${wrap} flex flex-col gap-10 py-28`}>
          <SectionTitle>{compare.title}</SectionTitle>
          <div data-reveal className="overflow-x-auto border border-ink">
            <table className="w-full min-w-[920px] border-collapse text-[15px] leading-snug">
              <caption className="sr-only">How Cleared compares with doing it by hand and with other kinds of tool</caption>
              <thead>
                <tr className="text-left">
                  <th scope="col" className="w-[22%] border-b-2 border-ink px-5 py-4">
                    <span className="sr-only">Question</span>
                  </th>
                  {compare.cols.map((c, i) => (
                    <th
                      key={c}
                      scope="col"
                      className={`border-b-2 border-ink px-5 py-4 font-mono text-[12px] font-medium uppercase tracking-[0.06em] ${
                        i === compare.cols.length - 1 ? "bg-ink text-paper" : "text-ink-3"
                      }`}
                    >
                      {c}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {compare.rows.map((r) => (
                  <tr key={r.label} className="border-b border-rule last:border-b-0">
                    <th scope="row" className="px-5 py-4 text-left font-semibold">
                      {r.label}
                    </th>
                    {r.cells.map((c, i) => (
                      <td key={i} className={`px-5 py-4 ${i === r.cells.length - 1 ? "bg-pencil-soft font-semibold text-ink" : "text-ink-2"}`}>
                        {c}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="font-mono text-[12px] text-ink-3">{compare.note}</p>
        </div>
      </section>

      {/* BOOKKEEPERS */}
      <section className="border-b border-rule-strong">
        <div className={`${wrap} grid gap-12 py-24 lg:grid-cols-[1fr_1fr]`}>
          <div className="flex flex-col gap-4">
            <p className="font-mono text-[13px] uppercase tracking-[0.08em] text-ink-3">For bookkeepers and accountants</p>
            <SectionTitle>{bookkeepers.title}</SectionTitle>
          </div>
          <ul className="flex flex-col border-t-2 border-ink">
            {bookkeepers.points.map((p) => (
              <li key={p} data-reveal className="flex gap-4 border-b border-rule py-5 text-[18px] leading-relaxed">
                <span aria-hidden="true" className="mt-2.5 h-2 w-2 shrink-0 bg-stamp" />
                {p}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="border-b border-rule-strong bg-card">
        <div className={`${wrap} flex flex-col gap-12 py-28`}>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionTitle>{pricing.title}</SectionTitle>
            <p data-reveal className="max-w-[440px] text-[17px] leading-relaxed text-ink-2">
              {pricing.sub}
            </p>
          </div>
          <div className="grid border border-ink md:grid-cols-3">
            {pricing.plans.map((p, i) => (
              <div
                key={p.name}
                data-reveal
                className={`relative flex flex-col gap-5 p-8 ${i > 0 ? "border-t border-rule-strong md:border-l md:border-t-0" : ""} ${p.featured ? "bg-paper" : ""}`}
              >
                <h3 className="display text-[26px]">{p.name}</h3>
                <p className="font-mono text-[46px] font-semibold leading-none tnum">
                  ${p.price}
                  <span className="text-[16px] font-normal text-ink-3"> /month</span>
                </p>
                <ul className="flex flex-col gap-2.5 border-t border-rule pt-5 text-[16px]">
                  {p.items.map((it) => (
                    <li key={it} className="flex gap-3">
                      <svg width="16" height="16" viewBox="0 0 18 18" aria-hidden="true" className="mt-1 shrink-0">
                        <path d="M3 9.5l4 4 8-9" fill="none" stroke="var(--color-pencil)" strokeWidth="2.2" strokeLinecap="round" />
                      </svg>
                      {it}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="grid gap-6 text-[16px] leading-relaxed md:grid-cols-2">
            <p data-reveal>
              <strong className="font-semibold">Founding price:</strong> {pricing.founding}
            </p>
            <p data-reveal>
              <strong className="font-semibold">Guarantee:</strong> {pricing.guarantee}
            </p>
          </div>
        </div>
      </section>

      {/* START */}
      <section id="start" className="bg-ink text-paper">
        <div className={`${wrap} grid items-start gap-14 py-28 lg:grid-cols-[1fr_1fr]`}>
          <div className="flex flex-col gap-6">
            <h2 className="display text-[clamp(40px,5vw,72px)]">{start.title}</h2>
            <p className="max-w-[500px] text-[18px] leading-relaxed text-fog">{start.body}</p>
            <p className="max-w-[500px] border-t border-fog/30 pt-5 font-mono text-[13px] leading-relaxed text-fog/90">{start.honesty}</p>
          </div>
          <MatchForm />
        </div>
      </section>

      {/* FAQ */}
      <section className="border-b border-rule-strong">
        <div className={`${wrap} grid gap-12 py-28 lg:grid-cols-[0.8fr_1.2fr]`}>
          <SectionTitle>Questions people ask first.</SectionTitle>
          <div className="flex flex-col border-t-2 border-ink">
            {faq.map((f) => (
              <details key={f.q} className="group border-b border-rule">
                <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-6 py-4 text-[19px] font-semibold [&::-webkit-details-marker]:hidden">
                  {f.q}
                  <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true" className="shrink-0 transition-transform duration-300 group-open:rotate-45">
                    <path d="M8 1v14M1 8h14" stroke="currentColor" strokeWidth="1.8" />
                  </svg>
                </summary>
                <p className="anim-rise max-w-[640px] pb-6 text-[17px] leading-relaxed text-ink-2">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
