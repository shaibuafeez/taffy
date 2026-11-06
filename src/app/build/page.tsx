import type { Metadata } from "next";
import Link from "next/link";
import { PageHero, Recipes, SectionHead, SwipeFile, KeepGoing } from "@/components/Sections";
import { PrimitiveTabs } from "@/components/PrimitiveTabs";
import { MarginNote, Underline } from "@/components/Scribble";
import { Candy } from "@/components/Art";
import { resources, whyBuild } from "@/content";

export const metadata: Metadata = { title: "Builder hub" };

const snippet = `import { Taffy } from "@taffy/sdk";

const book = new Taffy({ network: "mainnet" });

// borrow, buy and hedge in one transaction
const tx = book.compose()
  .borrow("USDC", 5_000)
  .market("SUI/USDC", { side: "buy", size: 3_800 })
  .predict("SUI-ABOVE-4.20-FRI", { side: "no", stake: 200 });

await wallet.signAndExecute(tx);`;

export default function BuildPage() {
  return (
    <>
      <PageHero
        n="01"
        rule="Steal like an artist"
        title={
          <>
            Three primitives.
            <br />
            <span className="relative inline-block">
              Steal all of them.
              <Underline className="absolute -bottom-2 left-0 h-5 w-full" />
            </span>
          </>
        }
        mark="nothing is original. build anyway."
        body="Spot, margin and predictions: three composable primitives on one shared book. Snap them together into terminals, vaults, or something nobody has tried yet."
        aside={
          <MarginNote className="mt-8 hidden md:block" arrow="none" credit="Kleon's rule no. 1">
            steal from many, credit all, transform everything.
          </MarginNote>
        }
      >
        <Link href="#resources" className="btn btn-pink btn-sm">
          Read the docs <span className="arrow">→</span>
        </Link>
        <Link href="#recipes" className="btn btn-paper btn-sm">
          See recipes
        </Link>
      </PageHero>

      {/* Why */}
      <section className="border-t-2 border-ink py-24 md:py-32" aria-labelledby="why">
        <div className="wrap">
          <SectionHead id="why" n="02" rule="Why builders pick Taffy" title="Skip to the good part." />
          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {whyBuild.map((w, i) => (
              <article key={w.n} data-reveal className={`index-card p-5 pb-8 ${i % 2 ? "lg:mt-10" : ""}`}>
                <div className="flex h-[38px] items-center gap-3">
                  <span className="mono grid h-7 w-9 place-items-center rounded bg-pink text-[12px] font-bold">{w.n}</span>
                  <h3 className="text-[19px] font-extrabold tracking-[-0.02em]">{w.title}</h3>
                </div>
                <p className="news mt-6 text-[18px] leading-[28px] text-ink-2">{w.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Primitives */}
      <section className="border-t-2 border-ink bg-paper-2/60 py-24 md:py-32" aria-labelledby="prims">
        <div className="wrap">
          <SectionHead
            id="prims"
            n="03"
            rule="Know your tools"
            title="Open the tin."
            body="Each primitive works on its own and all three share collateral and liquidity, so mixing them costs nothing extra."
          />
          <div className="mt-14">
            <PrimitiveTabs />
          </div>
        </div>
      </section>

      {/* Compose */}
      <section className="border-t-2 border-ink py-24 md:py-32" aria-labelledby="compose">
        <div className="wrap grid items-center gap-14 md:grid-cols-12">
          <div className="md:col-span-5">
            <SectionHead id="compose" n="04" rule="Use your hands" title={<>Five lines. One transaction.</>} />
            <p className="news mt-6 max-w-[40ch] text-[20px] leading-snug text-ink-2" data-reveal>
              Borrow, buy and hedge in a single programmable transaction. If any step fails, none of it happens, so your users never end
              up half-filled.
            </p>
          </div>
          <div className="relative md:col-span-7" data-reveal>
            <div className="overflow-hidden rounded-[6px] border-2 border-ink bg-ink text-paper-2 shadow-[0_8px_0_#ff4f8b]">
              <div className="flex items-center gap-2 border-b border-white/15 px-4 py-3">
                <span className="h-3 w-3 rounded-full bg-pink" />
                <span className="h-3 w-3 rounded-full bg-yellow" />
                <span className="h-3 w-3 rounded-full bg-mint" />
                <span className="mono ml-3 text-[12px] text-white/60">compose.ts</span>
              </div>
              <pre className="mono overflow-x-auto p-5 text-[13px] leading-[1.7] md:p-7 md:text-[15px]">
                <code>{snippet}</code>
              </pre>
            </div>
            <p className="marker absolute -bottom-12 right-2 rotate-[-2deg] text-[18px] text-pink-deep">illustrative SDK, not a real package</p>
          </div>
        </div>
      </section>

      {/* Recipes */}
      <section id="recipes" className="scroll-mt-24 border-t-2 border-ink bg-paper-3/50 py-24 md:py-32" aria-labelledby="recipes-h">
        <div className="wrap">
          <SectionHead
            id="recipes-h"
            n="05"
            rule="Remix, don't copy"
            title={<>This is where it gets sticky.</>}
            body="Combine primitives into products that don't exist anywhere else. A few recipes from our tin to get you started."
          />
          <div className="mt-16">
            <Recipes />
          </div>
        </div>
      </section>

      {/* Ecosystem */}
      <section className="border-t-2 border-ink py-24 md:py-32" aria-labelledby="eco">
        <div className="wrap">
          <SectionHead id="eco" n="06" rule="Keep a swipe file" title="Already pulling their weight." body="Meet the teams already earning on the book." />
          <div className="mt-20">
            <SwipeFile />
          </div>
        </div>
      </section>

      {/* Resources */}
      <section id="resources" className="scroll-mt-24 border-t-2 border-ink bg-ink py-24 text-paper-2 md:py-32" aria-labelledby="res">
        <div className="wrap">
          <div className="grid gap-6 md:grid-cols-12">
            <p className="eyebrow text-paper-2/60 md:col-span-4" data-reveal>
              07 · Teach what you know
            </p>
            <h2 id="res" className="display text-[clamp(44px,6vw,96px)] md:col-span-8" data-reveal>
              Everything you need to start building.
            </h2>
          </div>
          <div className="mt-16 grid gap-px overflow-hidden rounded-[6px] border-2 border-paper-2/20 bg-paper-2/20 sm:grid-cols-2 lg:grid-cols-3">
            {resources.map((r) => (
              <Link
                key={r.title}
                href="#resources"
                data-reveal
                className="group relative flex min-h-[220px] flex-col justify-between bg-ink p-7 transition-colors duration-300 hover:bg-pink hover:text-ink"
              >
                <div className="flex items-start justify-between gap-4">
                  <h3 className="headline text-[30px]">{r.title}</h3>
                  <span className="mono rounded-full border-2 border-current px-3 py-1 text-[11px] uppercase tracking-[0.1em]">{r.tag}</span>
                </div>
                <div className="flex items-end justify-between gap-6">
                  <p className="news max-w-[30ch] text-[17px] leading-snug opacity-80">{r.body}</p>
                  <span className="text-[28px] transition-transform duration-300 group-hover:translate-x-1" aria-hidden>
                    →
                  </span>
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-14 flex items-center gap-4" data-reveal>
            <Candy id="res-candy" tone="pink" className="w-28" />
            <p className="marker text-[22px] text-pink">the docs are written by people, for people.</p>
          </div>
        </div>
      </section>

      <KeepGoing line="Ship something small this week. Then ship the next thing." />
    </>
  );
}
