import Link from "next/link";
import { recipes, stats, teams } from "@/content";
import { Candy, TeamBadge, type Tone } from "./Art";
import { Check, Circled, MarginNote, Rule, Sparkle, Underline } from "./Scribble";

/* ---------------------------------------------------------------- */
/* Inner page hero                                                    */
/* ---------------------------------------------------------------- */
export function PageHero({
  rule,
  n,
  title,
  mark,
  body,
  children,
  aside,
}: {
  rule: string;
  n: string;
  title: React.ReactNode;
  mark?: string;
  body: string;
  children?: React.ReactNode;
  aside?: React.ReactNode;
}) {
  return (
    <section className="relative overflow-hidden pb-20 pt-14 md:pb-28 md:pt-20">
      <div className="wrap grid gap-12 md:grid-cols-12">
        <div className="md:col-span-8">
          <Rule n={n}>{rule}</Rule>
          <h1 className="display mt-6 text-[clamp(56px,9vw,150px)]" data-reveal>
            {title}
          </h1>
          {mark && (
            <div className="relative mt-6 inline-block" data-reveal>
              <p className="marker text-[24px] text-pink-deep md:text-[28px]">{mark}</p>
              <Underline className="absolute -bottom-3 left-0 h-4 w-full" />
            </div>
          )}
        </div>
        <div className="flex flex-col justify-end md:col-span-4">
          <div className="sheet relative p-6" data-reveal>
            <span className="tape -top-3 right-8 rotate-3" />
            <p className="pretty text-[19px] font-medium leading-snug">{body}</p>
            {children && <div className="mt-6 flex flex-wrap gap-3">{children}</div>}
          </div>
          {aside}
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- */
/* Section heading: label on the left, headline on the right          */
/* ---------------------------------------------------------------- */
export function SectionHead({
  n,
  rule,
  title,
  body,
  id,
}: {
  n: string;
  rule: string;
  title: React.ReactNode;
  body?: React.ReactNode;
  id?: string;
}) {
  return (
    <div className="grid gap-6 md:grid-cols-12">
      <div className="md:col-span-4">
        <Rule n={n}>{rule}</Rule>
      </div>
      <div className="md:col-span-8">
        <h2 id={id} className="display text-[clamp(44px,6vw,96px)]" data-reveal>
          {title}
        </h2>
        {body && (
          <p className="news mt-5 max-w-[48ch] text-[19px] leading-snug text-ink-2 md:text-[21px]" data-reveal>
            {body}
          </p>
        )}
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------- */
/* Stats as a printed receipt                                         */
/* ---------------------------------------------------------------- */
export function Receipt({ title = "Show your work" }: { title?: string }) {
  return (
    <div className="relative mx-auto w-full max-w-[460px]">
      <div className="receipt mono px-7 pb-12 pt-8 text-[14px]" data-print>
        <p className="text-center text-[13px] uppercase tracking-[0.3em]">Taffy · The Book</p>
        <p className="mt-1 text-center text-[12px] text-ink-3">Receipt no. 000214 · all-time</p>
        <div className="my-5 border-t-2 border-dashed border-ink/40" />
        <ul className="space-y-4">
          {stats.map((s) => (
            <li key={s.label} className="flex items-end">
              <span className="max-w-[18ch] uppercase leading-tight">{s.label}</span>
              <span className="leader" />
              <span
                className="text-[20px] font-bold"
                data-count={s.value}
                data-decimals={s.decimals}
                data-prefix={s.prefix}
                data-suffix={s.suffix}
              >
                {s.prefix}
                {s.value.toLocaleString("en-US", { minimumFractionDigits: s.decimals, maximumFractionDigits: s.decimals })}
                {s.suffix}
              </span>
            </li>
          ))}
        </ul>
        <div className="my-5 border-t-2 border-dashed border-ink/40" />
        <div className="flex justify-between text-[13px] uppercase">
          <span>Hidden fees</span>
          <span>0.00</span>
        </div>
        <div className="mt-1 flex justify-between text-[13px] uppercase">
          <span>Matching engines you wrote</span>
          <span>0</span>
        </div>
        <div className="mt-6 flex h-12 items-end gap-[3px]" aria-hidden="true">
          {Array.from({ length: 46 }, (_, i) => (
            <span key={i} className="bg-ink" style={{ width: (i * 7) % 3 === 0 ? 3 : 1.5, height: (i * 13) % 5 === 0 ? "100%" : "82%" }} />
          ))}
        </div>
        <p className="mt-4 text-center text-[12px] uppercase tracking-[0.2em]">Thank you. Keep going.</p>
      </div>
      <MarginNote className="absolute -left-2 top-24 hidden w-[170px] -translate-x-full xl:block" arrow="none">
        {title}, every number on chain.
      </MarginNote>
    </div>
  );
}

/* ---------------------------------------------------------------- */
/* The swipe file: pinned index cards                                 */
/* ---------------------------------------------------------------- */
const tilt = ["-rotate-[1.6deg]", "rotate-[1.2deg]", "-rotate-[0.6deg]", "rotate-[2deg]", "-rotate-[1.8deg]", "rotate-[0.8deg]"];

export function SwipeFile({ only }: { only?: "trade" }) {
  const list = only === "trade" ? teams.filter((t) => t.trade) : teams;
  return (
    <div className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
      {list.map((t, i) => (
        <article
          key={t.name}
          data-reveal
          className={`index-card group p-5 pt-4 transition-transform duration-500 ease-[cubic-bezier(.3,.7,.4,1.4)] hover:-translate-y-2 hover:rotate-0 ${tilt[i % tilt.length]}`}
        >
          <span className={`tape ${i % 3 === 1 ? "pink" : i % 3 === 2 ? "mint" : ""} -top-3 left-1/2 -translate-x-1/2 ${i % 2 ? "rotate-2" : "-rotate-3"}`} />
          <div className="flex h-[38px] items-center justify-between">
            <h3 className="text-[21px] font-extrabold tracking-[-0.02em]">{t.name}</h3>
            <span className="eyebrow rounded-full border-2 border-ink px-2.5 py-0.5 text-[10px] text-ink">{t.kind}</span>
          </div>
          <div className="mt-6 flex items-start gap-4">
            <TeamBadge name={t.name} tone={t.color as Tone} />
            <p className="news text-[17px] leading-[28px] text-ink-2">{t.blurb}</p>
          </div>
          <p className="marker mt-4 text-[16px] text-pink-deep opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            built on the book ✓
          </p>
        </article>
      ))}
    </div>
  );
}

/* ---------------------------------------------------------------- */
/* Security: be boring                                                */
/* ---------------------------------------------------------------- */
export function BeBoring() {
  return (
    <section className="border-t-2 border-ink bg-paper-2 py-24 md:py-36" aria-labelledby="boring">
      <div className="wrap grid items-center gap-16 md:grid-cols-12">
        <div className="md:col-span-6">
          <Rule n="06">Be boring. It&apos;s the only way to get work done.</Rule>
          <h2 id="boring" className="display mt-6 text-[clamp(48px,6.4vw,104px)]" data-reveal>
            Boring on{" "}
            <span className="relative inline-block">
              purpose.
              <Circled className="absolute -inset-x-6 -inset-y-4 h-[calc(100%+32px)] w-[calc(100%+48px)]" />
            </span>
          </h2>
          <p className="news mt-8 max-w-[40ch] text-[20px] leading-snug text-ink-2 md:text-[22px]" data-reveal>
            Audited three times, covered by a standing bug bounty and open source down to the last module. The most exciting thing about
            our security should be how little there is to say about it.
          </p>
          <div className="mt-8 flex flex-wrap gap-3" data-reveal>
            <Link href="/build#resources" className="btn btn-ink">
              Read the audits <span className="arrow">→</span>
            </Link>
            <Link href="/build#resources" className="btn btn-paper">
              Bug bounty
            </Link>
          </div>
        </div>

        <div className="relative md:col-span-6">
          <div className="sheet relative mx-auto max-w-[520px] rotate-[-1.5deg] p-8 md:p-10" data-reveal>
            <span className="tape -top-3 left-10 -rotate-3" />
            <p className="eyebrow text-ink-3">Security review · v3</p>
            <p className="headline mt-2 text-[28px]">Findings summary</p>
            <ul className="mono mt-6 space-y-3 text-[14px]">
              {[
                ["Critical", "0"],
                ["High", "0"],
                ["Medium", "2 fixed"],
                ["Low", "7 fixed"],
                ["Informational", "11 noted"],
              ].map(([k, v]) => (
                <li key={k} className="flex items-end">
                  <span>{k}</span>
                  <span className="leader" />
                  <span className="font-bold">{v}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8 space-y-2" aria-hidden="true">
              <div className="h-2.5 w-[92%] rounded bg-ink/10" />
              <div className="h-2.5 w-[78%] rounded bg-ink/10" />
              <div className="h-2.5 w-[85%] rounded bg-ink/10" />
              <div className="h-2.5 w-[40%] rounded bg-ink/10" />
            </div>
            <div className="absolute -right-4 bottom-8 md:-right-10">
              <span data-stamp="-12" className="stamp text-[30px] text-pink-deep">
                Audited ×3
              </span>
            </div>
            <div className="absolute -left-6 -top-8 md:-left-12">
              <span data-stamp="9" className="stamp bg-paper-2/40 text-[17px] text-mint-ink">
                Open source
              </span>
            </div>
          </div>
          <div className="mt-10 flex justify-center">
            <span data-stamp="-4" className="stamp text-[22px] text-ink">
              Bounty · up to $500k
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- */
/* Recipes: steal, then remix                                         */
/* ---------------------------------------------------------------- */
const recipeTone = ["bg-paper-2", "bg-pink-soft", "bg-mint-soft", "bg-[#fff1c2]"];

export function Recipes() {
  return (
    <div className="grid gap-8 md:grid-cols-2">
      {recipes.map((r, i) => (
        <article key={r.title} data-reveal className={`sheet relative overflow-hidden p-7 md:p-9 ${recipeTone[i]}`}>
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="eyebrow text-ink-3">Recipe no. {String(i + 1).padStart(2, "0")}</p>
              <h3 className="headline mt-2 text-[34px] md:text-[42px]">{r.title}</h3>
            </div>
            <Candy id={`recipe-${i}`} tone={(["pink", "mint", "yellow", "pink"] as Tone[])[i]} className="-mr-4 -mt-2 w-28 shrink-0 rotate-[-12deg] md:w-36" />
          </div>
          <div className="mt-6 grid gap-6 sm:grid-cols-[160px_1fr]">
            <div>
              <p className="marker text-[18px]">You&apos;ll need</p>
              <ul className="mt-2 space-y-1.5">
                {r.ingredients.map((x) => (
                  <li key={x} className="flex items-center gap-2 text-[17px] font-semibold">
                    <Check className="h-5 w-5 text-pink-deep" color="#d92f6b" /> {x}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="marker text-[18px]">Method</p>
              <p className="news mt-2 text-[18px] leading-snug text-ink-2">{r.method}</p>
            </div>
          </div>
          <div className="mono mt-7 flex flex-wrap gap-x-6 gap-y-1 border-t-2 border-dashed border-ink/25 pt-4 text-[12px] uppercase tracking-[0.1em] text-ink-2">
            <span>Serves: {r.serves}</span>
            <span>Prep: {r.time}</span>
          </div>
        </article>
      ))}
    </div>
  );
}

/* ---------------------------------------------------------------- */
/* FAQ                                                                */
/* ---------------------------------------------------------------- */
export function Faq({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div className="border-t-2 border-ink">
      {items.map((f) => (
        <details key={f.q} className="faq group border-b-2 border-ink" data-reveal>
          <summary className="flex items-center justify-between gap-6 py-6">
            <span className="text-[22px] font-bold tracking-[-0.02em] md:text-[26px]">{f.q}</span>
            <span className="plus grid h-11 w-11 shrink-0 place-items-center rounded-full border-2 border-ink bg-paper-2 text-[24px] leading-none group-open:bg-pink">
              +
            </span>
          </summary>
          <p className="news max-w-[60ch] pb-7 text-[19px] leading-relaxed text-ink-2">{f.a}</p>
        </details>
      ))}
    </div>
  );
}

/* ---------------------------------------------------------------- */
/* Closing band: keep going                                           */
/* ---------------------------------------------------------------- */
export function KeepGoing({ line = "The best time to start was last cycle. The second best is this block." }: { line?: string }) {
  return (
    <section className="relative overflow-hidden border-t-2 border-ink py-28 md:py-40" aria-labelledby="keep-going">
      <div className="pointer-events-none absolute inset-0 opacity-60" aria-hidden="true">
        <Candy id="kg-1" tone="mint" className="absolute -left-10 top-10 w-56 rotate-[24deg] md:w-80" />
        <Candy id="kg-2" tone="yellow" stripes="pink" className="absolute -right-12 bottom-6 w-60 -rotate-[18deg] md:w-96" />
      </div>
      <div className="wrap relative text-center">
        <Rule n="∞" className="justify-center">
          Keep going
        </Rule>
        <h2 id="keep-going" className="marker mt-8 text-[clamp(72px,13vw,220px)] leading-[0.85] tracking-[-0.01em]" data-reveal>
          Keep going.
        </h2>
        <p className="news mx-auto mt-8 max-w-[34ch] text-[21px] leading-snug text-ink-2 md:text-[24px]" data-reveal>
          {line}
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-3" data-reveal>
          <Link href="/build" className="btn btn-pink">
            Start building <span className="arrow">→</span>
          </Link>
          <Link href="/trade" className="btn btn-paper">
            Start trading
          </Link>
        </div>
        <Sparkle className="absolute left-[18%] top-[28%] hidden h-10 w-10 md:block" />
        <Sparkle className="absolute right-[20%] top-[18%] hidden h-7 w-7 md:block" color="#ffd54a" />
      </div>
    </section>
  );
}
