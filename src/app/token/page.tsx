import type { Metadata } from "next";
import Link from "next/link";
import { KeepGoing, Receipt, SectionHead } from "@/components/Sections";
import { StretchWordmark } from "@/components/StretchWordmark";
import { Candy } from "@/components/Art";
import { MarginNote, Rule, Sparkle } from "@/components/Scribble";
import { allocation, tokenFacts, tokenUtility } from "@/content";

export const metadata: Metadata = { title: "$PULL" };

const toneBg: Record<string, string> = {
  pink: "bg-pink",
  ink: "bg-ink",
  mint: "bg-mint",
  yellow: "bg-yellow",
  paper: "bg-paper-2",
};

const vesting = [
  { who: "Community & rewards", plan: "Released each season through points, over six years." },
  { who: "Contributors", plan: "One-year cliff, then monthly over three more years." },
  { who: "Ecosystem fund", plan: "Granted to teams building on the book, milestone by milestone." },
  { who: "Treasury", plan: "Locked for a year, then spent only by governance vote." },
];

export default function TokenPage() {
  return (
    <>
      {/* Hero: the word itself is taffy. Hover it. */}
      <section className="relative overflow-hidden pb-16 pt-14 md:pb-24 md:pt-16">
        <div className="wrap">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <Rule n="01">Sell out (a little)</Rule>
            <p className="eyebrow text-ink-3">Introducing</p>
          </div>
          <StretchWordmark
            as="h1"
            word="PULL"
            size="text-[clamp(130px,30vw,500px)] leading-[0.78]"
            className="mt-6 justify-center border-b-[3px] border-ink"
          />
          <div className="mt-10 grid gap-10 md:grid-cols-12">
            <p className="pretty text-[22px] font-medium leading-snug md:col-span-6 md:text-[28px]" data-reveal>
              The token that keeps the book sticky. Pay fees with it, earn it for quoting, vote with it, and watch a slice of every fee
              burn it away.
            </p>
            <div className="flex flex-wrap items-start gap-3 md:col-span-6 md:justify-end" data-reveal>
              <Link href="#utility" className="btn btn-pink">
                What it does <span className="arrow">→</span>
              </Link>
              <Link href="#supply" className="btn btn-paper">
                Supply & allocation
              </Link>
            </div>
          </div>
          <MarginNote className="mt-10" arrow="none" credit="hover the word. it stretches.">
            make money without being weird about it.
          </MarginNote>
        </div>
      </section>

      {/* Numbers */}
      <section className="border-t-2 border-ink bg-paper-3/50 py-24 md:py-32" aria-labelledby="nums">
        <div className="wrap grid items-center gap-16 md:grid-cols-12">
          <div className="md:col-span-6">
            <Rule n="02">Show your work</Rule>
            <h2 id="nums" className="display mt-6 text-[clamp(44px,6vw,96px)]" data-reveal>
              Fees in, PULL out.
            </h2>
            <p className="news mt-8 max-w-[40ch] text-[20px] leading-snug text-ink-2 md:text-[22px]" data-reveal>
              Every number that matters to the token is on chain. Here&apos;s the running total, printed fresh.
            </p>
          </div>
          <div className="md:col-span-6">
            <Receipt title="Burned in public" />
          </div>
        </div>
      </section>

      {/* Utility */}
      <section id="utility" className="scroll-mt-24 border-t-2 border-ink py-24 md:py-32" aria-labelledby="util">
        <div className="wrap">
          <SectionHead
            id="util"
            n="03"
            rule="Do the work, then the token"
            title="Four jobs, no fluff."
            body="PULL exists because the book needs it, not the other way round."
          />
          <div className="mt-16 grid gap-6 md:grid-cols-2">
            {tokenUtility.map((u, i) => (
              <article key={u.title} data-reveal className="sheet relative flex min-h-[250px] flex-col justify-between overflow-hidden p-7 md:p-9">
                <div className="flex items-start justify-between gap-6">
                  <h3 className="display text-[clamp(44px,4.6vw,72px)]">{u.title}</h3>
                  <span className="mono grid h-10 w-12 shrink-0 place-items-center rounded-md border-2 border-ink bg-pink text-[14px] font-bold">
                    0{i + 1}
                  </span>
                </div>
                <p className="news mt-6 max-w-[44ch] text-[19px] leading-snug text-ink-2">{u.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Supply */}
      <section id="supply" className="scroll-mt-24 border-t-2 border-ink bg-paper-2/60 py-24 md:py-32" aria-labelledby="sup">
        <div className="wrap">
          <SectionHead id="sup" n="04" rule="Stick around" title="Who gets the candy." body="One billion PULL, ever. Here's how the jar is split and how slowly it opens." />

          <dl className="mt-16 grid grid-cols-2 border-y-2 border-ink md:grid-cols-4">
            {tokenFacts.map((f, i) => (
              <div key={f.label} className={`py-6 ${i ? "md:border-l-2 md:border-ink md:pl-6" : ""} ${i % 2 ? "border-l-2 border-ink pl-5 md:pl-6" : ""}`} data-reveal>
                <dt className="eyebrow text-ink-3">{f.label}</dt>
                <dd className="display mt-2 text-[clamp(26px,3vw,44px)] leading-none">{f.value}</dd>
              </div>
            ))}
          </dl>

          {/* Allocation as one long taffy bar */}
          <div className="mt-16" data-reveal>
            <div className="flex h-24 overflow-hidden rounded-full border-[3px] border-ink md:h-28" role="img" aria-label={allocation.map((a) => `${a.label} ${a.pct}%`).join(", ")}>
              {allocation.map((a, i) => (
                <div
                  key={a.label}
                  className={`relative flex items-center justify-center ${toneBg[a.tone]} ${i ? "border-l-[3px] border-ink" : ""}`}
                  style={{ width: `${a.pct}%` }}
                >
                  <span className={`display text-[clamp(18px,2.4vw,36px)] ${a.tone === "ink" ? "text-paper-2" : ""}`}>{a.pct}%</span>
                </div>
              ))}
            </div>
            <ul className="mt-8 grid gap-x-8 gap-y-3 sm:grid-cols-2 lg:grid-cols-5">
              {allocation.map((a) => (
                <li key={a.label} className="flex items-center gap-3 text-[17px] font-semibold">
                  <span className={`h-5 w-5 shrink-0 rounded-full border-2 border-ink ${toneBg[a.tone]}`} />
                  {a.label}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-20 grid gap-6 md:grid-cols-2">
            {vesting.map((v, i) => (
              <div key={v.who} data-reveal className="flex gap-5 border-t-2 border-dashed border-ink/30 pt-5">
                <span className="marker text-[28px] leading-none text-pink-deep">{i + 1}.</span>
                <div>
                  <p className="text-[20px] font-bold tracking-[-0.01em]">{v.who}</p>
                  <p className="news mt-1 text-[18px] leading-snug text-ink-2">{v.plan}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="relative mt-20 flex items-center justify-center gap-6" data-reveal>
            <Candy id="tok-1" tone="mint" className="w-32 -rotate-12" />
            <p className="marker max-w-[24ch] text-center text-[22px]">fictional token for a fictional book. not an offer of anything.</p>
            <Candy id="tok-2" tone="yellow" stripes="pink" className="w-32 rotate-12" />
            <Sparkle className="absolute -top-6 left-1/3 h-6 w-6" />
          </div>
        </div>
      </section>

      <KeepGoing line="Stick around. The interesting part of anything is what happens after year one." />
    </>
  );
}
