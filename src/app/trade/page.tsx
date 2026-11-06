import type { Metadata } from "next";
import Link from "next/link";
import { Faq, KeepGoing, SectionHead, SwipeFile } from "@/components/Sections";
import { OrderBook } from "@/components/OrderBook";
import { TaffyPull } from "@/components/TaffyPull";
import { PrimitiveArt } from "@/components/Art";
import { Circled, MarginNote, Rule } from "@/components/Scribble";
import { primitives, startSteps, tradeFaq } from "@/content";

export const metadata: Metadata = { title: "Trader hub" };

const tint = ["bg-paper-2", "bg-pink-soft", "bg-mint-soft"];

export default function TradePage() {
  return (
    <>
      {/* Hero with a live (sample) book */}
      <section className="relative overflow-hidden pb-20 pt-14 md:pb-28 md:pt-20">
        <div className="wrap grid items-start gap-14 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Rule n="01">Geography is no longer our master</Rule>
            <h1 className="display mt-6 text-[clamp(56px,8.4vw,140px)]" data-reveal>
              Every market.{" "}
              <span className="relative inline-block">
                One
                <Circled className="absolute -inset-x-5 -inset-y-3 h-[calc(100%+24px)] w-[calc(100%+40px)]" />
              </span>{" "}
              book.
            </h1>
            <p className="pretty mt-8 max-w-[34ch] text-[21px] font-medium leading-snug md:text-[24px]" data-reveal>
              Spot, leverage and predictions. Every app on Taffy shares the same liquidity, so you get deeper markets, tighter spreads and
              trades you won&apos;t find anywhere else.
            </p>
            <div className="mt-9 flex flex-wrap gap-3" data-reveal>
              <Link href="#apps" className="btn btn-pink">
                Start trading <span className="arrow">→</span>
              </Link>
              <Link href="#start" className="btn btn-paper">
                New to Sui? Start here
              </Link>
            </div>
          </div>
          <div className="relative lg:col-span-5" data-reveal>
            <div className="rotate-[1.2deg]">
              <OrderBook />
            </div>
            <MarginNote className="absolute -left-40 top-40 hidden w-[150px] xl:block" arrow="none">
              one tick wide. that&apos;s the whole trick.
            </MarginNote>
          </div>
        </div>
      </section>

      {/* What you can trade */}
      <section className="border-t-2 border-ink py-24 md:py-32" aria-labelledby="what">
        <div className="wrap">
          <SectionHead
            id="what"
            n="02"
            rule="What's in the jar"
            title={<>Spot. Margin. Predictions. And the mix.</>}
            body="Apps on Taffy don't just offer these side by side. They combine them into strategies you can't get on any other chain."
          />
          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {primitives.map((p, i) => (
              <article key={p.key} data-reveal className="sheet flex flex-col overflow-hidden">
                <div className={`graph-paper grid aspect-[4/3.2] place-items-center border-b-2 border-ink ${tint[i]}`}>
                  <PrimitiveArt kind={p.key} className="h-[78%] w-[78%]" />
                </div>
                <div className="flex flex-1 flex-col p-6 md:p-7">
                  <div className="flex items-baseline justify-between gap-3">
                    <h3 className="display text-[44px]">{p.name}</h3>
                    <span className="marker text-[16px] text-pink-deep">{p.candy}</span>
                  </div>
                  <p className="news mt-3 text-[18px] leading-snug text-ink-2">{p.trader}</p>
                </div>
              </article>
            ))}
          </div>
          <p className="news mx-auto mt-14 max-w-[60ch] text-center text-[19px] italic leading-snug text-ink-2" data-reveal>
            On most chains each kind of trading is its own silo. On Taffy they share a book, which is what &ldquo;one book, every app&rdquo;
            actually means for you.
          </p>
        </div>
      </section>

      {/* Pull */}
      <section className="border-t-2 border-ink bg-paper-3/60 py-24 md:py-32" aria-labelledby="pull-t">
        <div className="wrap">
          <SectionHead
            id="pull-t"
            n="03"
            rule="Why the spread stays tight"
            title="Feel the difference."
            body="Drag the knob to scatter liquidity across more pools and watch the spread you'd pay. Let go to put it back on one book."
          />
          <div className="mt-14" data-reveal>
            <TaffyPull />
          </div>
        </div>
      </section>

      {/* Start here */}
      <section id="start" className="scroll-mt-24 border-t-2 border-ink py-24 md:py-32" aria-labelledby="start-h">
        <div className="wrap">
          <SectionHead
            id="start-h"
            n="04"
            rule="Don't wait until you know who you are"
            title="Start before you feel ready."
            body="Nobody feels ready. Three steps, about ten minutes, and you're trading on the deepest book on Sui."
          />
          <ol className="mt-16 grid gap-8 md:grid-cols-3">
            {startSteps.map((s, i) => (
              <li key={s.n} data-reveal className={`index-card p-6 pb-9 ${i === 1 ? "md:mt-12 md:rotate-[1deg]" : i === 2 ? "md:mt-24 md:-rotate-[1deg]" : "md:-rotate-[0.6deg]"}`}>
                <div className="flex h-[38px] items-center gap-3">
                  <span className="marker text-[34px] leading-none text-pink-deep">{s.n}</span>
                  <h3 className="text-[21px] font-extrabold tracking-[-0.02em]">{s.title}</h3>
                </div>
                <p className="news mt-6 text-[18px] leading-[28px] text-ink-2">{s.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Apps */}
      <section id="apps" className="scroll-mt-24 border-t-2 border-ink bg-paper-2/60 py-24 md:py-32" aria-labelledby="apps-h">
        <div className="wrap">
          <SectionHead id="apps-h" n="05" rule="Pick your flavour" title="Where to trade." body="Every one of these apps trades on the same book. Choose the one whose design you like best." />
          <div className="mt-20">
            <SwipeFile only="trade" />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t-2 border-ink py-24 md:py-32" aria-labelledby="faq">
        <div className="wrap grid gap-12 md:grid-cols-12">
          <div className="md:col-span-4">
            <Rule n="06">Ask the dumb questions</Rule>
            <h2 id="faq" className="display mt-6 text-[clamp(44px,5vw,80px)]" data-reveal>
              Fair questions.
            </h2>
          </div>
          <div className="md:col-span-8">
            <Faq items={tradeFaq} />
          </div>
        </div>
      </section>

      <KeepGoing line="Your first trade will be small. That's the point. Make the second one." />
    </>
  );
}
