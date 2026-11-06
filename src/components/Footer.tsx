import Link from "next/link";
import { brand, footerCols, stolenFrom } from "@/content";
import { LogoMark } from "./Art";
import { StretchWordmark } from "./StretchWordmark";

export function Footer() {
  return (
    <footer className="relative mt-0 overflow-hidden bg-pink text-ink">
      <div className="wrap grid gap-12 pb-10 pt-20 md:grid-cols-12">
        <div className="md:col-span-5">
          <LogoMark className="h-14 w-auto" />
          <p className="headline mt-6 max-w-[16ch] text-[34px] md:text-[42px]">{brand.tagline}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/build" className="btn btn-ink">
              Start building <span className="arrow">→</span>
            </Link>
            <Link href="/trade" className="btn btn-paper">
              Start trading
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 md:col-span-4">
          {footerCols.map((c) => (
            <div key={c.title}>
              <p className="eyebrow mb-4 text-ink/60">{c.title}</p>
              <ul className="space-y-2">
                {c.links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="link-ul text-[17px] font-semibold">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="md:col-span-3">
          <div className="sheet relative rotate-[1.5deg] p-5 pt-7">
            <span className="tape -top-3 left-1/2 -translate-x-1/2 -rotate-3" />
            <p className="marker text-[20px] leading-none">Stolen from</p>
            <p className="eyebrow mt-1 text-ink-3">our genealogy of influence</p>
            <ul className="news mt-4 space-y-2 text-[16px] leading-snug text-ink-2">
              {stolenFrom.map((s) => (
                <li key={s} className="flex gap-2">
                  <span className="text-pink-deep">✕</span>
                  {s}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="wrap">
        <StretchWordmark />
      </div>

      <div className="wrap flex flex-col gap-2 border-t-2 border-ink py-5 text-[13px] font-medium sm:flex-row sm:items-center sm:justify-between">
        <p>© 2026 Taffy. A design study: the teams, figures and PULL token on this site are fictional.</p>
        <p className="marker text-[16px]">keep going.</p>
      </div>
    </footer>
  );
}
