import type { Metadata } from "next";
import Link from "next/link";
import { Faq, KeepGoing, SectionHead } from "@/components/Sections";
import { PointsLookup } from "@/components/PointsLookup";
import { Candy } from "@/components/Art";
import { Circled, MarginNote, Rule, Underline } from "@/components/Scribble";
import { leaderboard, pointsFaq, pointsSteps } from "@/content";

export const metadata: Metadata = { title: "Points" };

export default function PointsPage() {
  return (
    <>
      <section className="relative overflow-hidden pb-20 pt-14 md:pb-28 md:pt-20">
        <div className="wrap text-center">
          <p className="mono inline-flex items-center gap-2 rounded-full border-2 border-ink bg-paper-2 px-4 py-1.5 text-[12px] uppercase tracking-[0.14em]" data-reveal>
            <span className="h-2 w-2 animate-pulse rounded-full bg-pink" /> Season 01 · week 7 of 12
          </p>
          <div className="mt-8 flex justify-center">
            <Rule n="01">Share something small every day</Rule>
          </div>
          <h1 className="display mx-auto mt-6 max-w-[12ch] text-[clamp(60px,10vw,170px)]" data-reveal>
            Show up.{" "}
            <span className="relative inline-block text-pink-deep">
              Get sticky.
              <Underline className="absolute -bottom-3 left-0 h-5 w-full" />
            </span>
          </h1>
          <p className="pretty mx-auto mt-10 max-w-[38ch] text-[21px] font-medium leading-snug md:text-[24px]" data-reveal>
            Points reward the days you show up, not the size of your wallet. Trade a little, often, and watch your streak do the work.
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-3" data-reveal>
            <Link href="#balance" className="btn btn-pink">
              Check your balance <span className="arrow">→</span>
            </Link>
            <Link href="#earn" className="btn btn-paper">
              How it works
            </Link>
          </div>
        </div>
        <Candy id="pts-a" tone="mint" className="pointer-events-none absolute -left-16 top-24 hidden w-64 rotate-[28deg] opacity-80 lg:block" />
        <Candy id="pts-b" tone="yellow" stripes="pink" className="pointer-events-none absolute -right-14 bottom-10 hidden w-72 -rotate-[22deg] opacity-80 lg:block" />
      </section>

      {/* Real usage */}
      <section className="border-t-2 border-ink py-24 md:py-32" aria-labelledby="real">
        <div className="wrap grid gap-12 md:grid-cols-12">
          <div className="md:col-span-4">
            <Rule n="02">Don&apos;t turn into human spam</Rule>
          </div>
          <div className="md:col-span-8">
            <h2 id="real" className="display text-[clamp(44px,6vw,96px)]" data-reveal>
              Built to reward real usage.
            </h2>
            <div className="news mt-8 max-w-[52ch] space-y-5 text-[20px] leading-snug text-ink-2" data-reveal>
              <p>
                The points program tracks real activity across apps built on Taffy. There are no sign-ups, no quests to retweet and no forms.
                If you trade, you earn.
              </p>
              <p>
                Wash trading and self-matching are filtered out before points are counted, so the only way up the board is to actually use
                the thing.
              </p>
            </div>
            <MarginNote className="mt-8" arrow="none" credit="points aren't tokens">
              small and daily beats big and once.
            </MarginNote>
          </div>
        </div>
      </section>

      {/* Balance */}
      <section id="balance" className="scroll-mt-24 border-t-2 border-ink bg-paper-3/60 py-24 md:py-32" aria-labelledby="bal">
        <div className="wrap">
          <div className="text-center">
            <div className="flex justify-center">
              <Rule n="03">Keep a logbook</Rule>
            </div>
            <h2 id="bal" className="display mt-6 text-[clamp(48px,7vw,116px)]" data-reveal>
              View your{" "}
              <span className="relative inline-block">
                balance.
                <Circled className="absolute -inset-x-6 -inset-y-4 h-[calc(100%+32px)] w-[calc(100%+48px)]" />
              </span>
            </h2>
            <p className="news mx-auto mt-6 max-w-[44ch] text-[19px] leading-snug text-ink-2" data-reveal>
              Points are counted automatically and balances refresh every Friday.
            </p>
          </div>
          <div className="mt-14" data-reveal>
            <PointsLookup />
          </div>
        </div>
      </section>

      {/* How to earn */}
      <section id="earn" className="scroll-mt-24 border-t-2 border-ink py-24 md:py-32" aria-labelledby="earn-h">
        <div className="wrap">
          <SectionHead id="earn-h" n="04" rule="Every day is groundhog day" title="How to earn." body="Three habits, tracked for you." />
          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {pointsSteps.map((s, i) => (
              <article key={s.n} data-reveal className={`index-card p-6 pb-9 ${i === 1 ? "md:mt-10" : ""}`}>
                <div className="flex h-[38px] items-center gap-3">
                  <span className="mono grid h-7 w-9 place-items-center rounded bg-pink text-[12px] font-bold">{s.n}</span>
                  <h3 className="text-[20px] font-extrabold tracking-[-0.02em]">{s.title}</h3>
                </div>
                <p className="news mt-6 text-[18px] leading-[28px] text-ink-2">{s.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Leaderboard */}
      <section className="border-t-2 border-ink bg-paper-2/60 py-24 md:py-32" aria-labelledby="lb">
        <div className="wrap grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <Rule n="05">Stick around</Rule>
            <h2 id="lb" className="display mt-6 text-[clamp(44px,5.6vw,92px)]" data-reveal>
              The long-streak club.
            </h2>
            <p className="news mt-6 max-w-[36ch] text-[19px] leading-snug text-ink-2" data-reveal>
              The top of the board this season. Notice the streaks: the leaders didn&apos;t trade the most, they just never stopped.
            </p>
            <p className="eyebrow mt-6 text-ink-3" data-reveal>
              Sample leaderboard
            </p>
          </div>
          <div className="md:col-span-7" data-reveal>
            <div className="sheet overflow-hidden">
              <div className="mono grid grid-cols-[48px_1fr_auto_90px] gap-3 border-b-2 border-ink bg-ink px-5 py-3 text-[11px] uppercase tracking-[0.12em] text-paper-2">
                <span>#</span>
                <span>Address</span>
                <span className="text-right">Points</span>
                <span className="text-right">Streak</span>
              </div>
              <ol>
                {leaderboard.map((r, i) => (
                  <li
                    key={r.addr}
                    className={`mono grid grid-cols-[48px_1fr_auto_90px] items-center gap-3 border-b-2 border-dashed border-ink/15 px-5 py-3.5 text-[14px] ${i === 0 ? "bg-pink-soft" : ""}`}
                  >
                    <span className={i < 3 ? "marker text-[22px] text-pink-deep" : "text-ink-3"}>{i + 1}</span>
                    <span className="truncate">{r.addr}</span>
                    <span className="text-right font-bold">{r.pts.toLocaleString("en-US")}</span>
                    <span className="text-right">{r.streak}d</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t-2 border-ink py-24 md:py-32" aria-labelledby="pfaq">
        <div className="wrap grid gap-12 md:grid-cols-12">
          <div className="md:col-span-4">
            <Rule n="06">Learn to take a punch</Rule>
            <h2 id="pfaq" className="display mt-6 text-[clamp(44px,5vw,80px)]" data-reveal>
              The fine print, in big print.
            </h2>
          </div>
          <div className="md:col-span-8">
            <Faq items={pointsFaq} />
          </div>
        </div>
      </section>

      <KeepGoing line="Do one small thing today. Then do it again tomorrow." />
    </>
  );
}
