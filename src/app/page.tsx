import Link from "next/link";
import { BlackoutHero } from "@/components/BlackoutHero";
import { Marquee } from "@/components/Marquee";
import { StackScroller } from "@/components/StackScroller";
import { TaffyPull } from "@/components/TaffyPull";
import { BeBoring, KeepGoing, Receipt, SectionHead, SwipeFile } from "@/components/Sections";
import { Check, MarginNote, Rule } from "@/components/Scribble";
import { LogoMark } from "@/components/Art";

const audiences = [
  {
    who: "Builders",
    title: "Steal the hard parts.",
    points: [
      "Shared liquidity from the first block. Nothing to bootstrap.",
      "Composable primitives that handle matching, margin and settlement.",
      "You make the product. The book does the plumbing.",
    ],
    href: "/build",
    cta: "Open the builder hub",
    tone: "bg-paper-2",
  },
  {
    who: "Traders",
    title: "One book, every app.",
    points: [
      "The deepest liquidity on Sui, whichever app you open.",
      "Spot, leverage and predictions on the same book.",
      "Tighter spreads, fairer liquidations, no venue-hopping.",
    ],
    href: "/trade",
    cta: "Open the trader hub",
    tone: "bg-pink-soft",
  },
];

export default function Home() {
  return (
    <>
      <BlackoutHero />

      <Marquee words={["Spot", "Margin", "Predict", "One book", "Every app", "Pulled tight"]} />

      <StackScroller />

      {/* Builders & traders */}
      <section className="border-t-2 border-ink py-24 md:py-36" aria-labelledby="who">
        <div className="wrap">
          <SectionHead
            id="who"
            n="02"
            rule="Steal like an artist"
            title={
              <>
                Whether you build or trade, <span className="text-pink-deep">steal from the same book.</span>
              </>
            }
            body="Good artists borrow from everything around them. Good markets should too: every app on Taffy shares the same liquidity, so each one starts where the last one left off."
          />
          <div className="mt-16 grid gap-8 md:grid-cols-2 md:gap-10">
            {audiences.map((a, i) => (
              <article key={a.who} data-reveal className={`sheet relative flex flex-col p-7 md:p-10 ${a.tone} ${i ? "md:mt-16 md:rotate-[0.8deg]" : "md:-rotate-[0.8deg]"}`}>
                <span className={`tape ${i ? "mint" : ""} -top-3 left-12 -rotate-3`} />
                <p className="eyebrow text-ink-3">For {a.who.toLowerCase()}</p>
                <h3 className="display mt-3 text-[clamp(40px,4.4vw,68px)]">{a.title}</h3>
                <ul className="mt-8 flex-1 space-y-4">
                  {a.points.map((p) => (
                    <li key={p} className="flex gap-3 border-t-2 border-dashed border-ink/20 pt-4 text-[18px] font-medium leading-snug md:text-[20px]">
                      <Check className="mt-0.5 h-6 w-6 shrink-0" color="#d92f6b" />
                      {p}
                    </li>
                  ))}
                </ul>
                <Link href={a.href} className="btn btn-ink mt-10 self-start">
                  {a.cta} <span className="arrow">→</span>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Pull the spread */}
      <section className="border-t-2 border-ink bg-paper-3/60 py-24 md:py-36" aria-labelledby="pull">
        <div className="wrap">
          <SectionHead
            id="pull"
            n="03"
            rule="The world is a small town"
            title={<>Split markets stretch thin. One book snaps back.</>}
            body="When liquidity is scattered across a hundred pools, every spread gets pulled wider. Put it all on one book and it springs back tight. Go on, try it."
          />
          <div className="relative mt-14" data-reveal>
            <TaffyPull />
          </div>
        </div>
      </section>

      {/* Show your work */}
      <section className="border-t-2 border-ink py-24 md:py-36" aria-labelledby="receipt">
        <div className="wrap grid items-center gap-16 md:grid-cols-12">
          <div className="md:col-span-6">
            <Rule n="04">Show your work</Rule>
            <h2 id="receipt" className="display mt-6 text-[clamp(48px,6.4vw,104px)]" data-reveal>
              Every fill, on the record.
            </h2>
            <p className="news mt-8 max-w-[40ch] text-[20px] leading-snug text-ink-2 md:text-[22px]" data-reveal>
              No dashboards we made up and no volume we can&apos;t prove. Every trade on the book is public, so here&apos;s the receipt.
            </p>
            <MarginNote className="mt-10 max-w-[260px] md:hidden" arrow="down">
              figures are illustrative: this is a concept
            </MarginNote>
          </div>
          <div className="md:col-span-6">
            <Receipt />
          </div>
        </div>
      </section>

      {/* Swipe file */}
      <section className="border-t-2 border-ink bg-paper-2/60 py-24 md:py-36" aria-labelledby="swipe">
        <div className="wrap">
          <SectionHead
            id="swipe"
            n="05"
            rule="Keep a swipe file"
            title={<>Who&apos;s already chewing.</>}
            body="Teams that skipped the hard parts and launched on the book. Steal their ideas; they stole ours."
          />
          <div className="mt-20">
            <SwipeFile />
          </div>
          <div className="mt-16 flex items-center justify-center gap-4" data-reveal>
            <LogoMark className="h-8 w-auto" />
            <Link href="/build" className="link-ul text-[19px] font-bold">
              Add your team to the file →
            </Link>
          </div>
        </div>
      </section>

      <BeBoring />

      <KeepGoing />
    </>
  );
}
