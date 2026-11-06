import { Rule } from "./Scribble";

export type LegalSection = { h: string; p: string[] };

/** A typed document on paper, with a contents list that stays in view. */
export function LegalDoc({ title, updated, intro, sections }: { title: string; updated: string; intro: string; sections: LegalSection[] }) {
  const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-");
  return (
    <section className="pb-28 pt-14 md:pt-20">
      <div className="wrap grid gap-12 lg:grid-cols-12">
        <aside className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <Rule n="§">Be nice. The world is a small town.</Rule>
            <h1 className="display mt-6 text-[clamp(52px,7vw,112px)]" data-reveal>
              {title}
            </h1>
            <p className="eyebrow mt-5 text-ink-3">Last updated {updated}</p>
            <nav className="mt-10 hidden lg:block" aria-label="Contents">
              <ol className="space-y-2 border-l-2 border-ink pl-5">
                {sections.map((s, i) => (
                  <li key={s.h}>
                    <a href={`#${slug(s.h)}`} className="link-ul text-[16px] font-semibold">
                      {i + 1}. {s.h}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          </div>
        </aside>

        <article className="sheet relative p-7 md:p-14 lg:col-span-8">
          <span className="tape -top-3 left-14 -rotate-3" />
          <span className="stamp absolute right-6 top-6 rotate-[8deg] text-[13px] text-pink-deep md:right-10 md:top-10">Concept · sample text</span>
          <p className="news max-w-[60ch] pt-10 text-[21px] leading-relaxed md:pt-6">{intro}</p>
          {sections.map((s, i) => (
            <div key={s.h} id={slug(s.h)} className="mt-12 scroll-mt-28 border-t-2 border-dashed border-ink/25 pt-8">
              <h2 className="headline text-[28px] md:text-[34px]">
                <span className="marker mr-3 text-pink-deep">{i + 1}.</span>
                {s.h}
              </h2>
              {s.p.map((p, j) => (
                <p key={j} className="news mt-4 max-w-[64ch] text-[18px] leading-relaxed text-ink-2">
                  {p}
                </p>
              ))}
            </div>
          ))}
          <p className="marker mt-14 text-[20px]">questions? hello@taffy.example</p>
        </article>
      </div>
    </section>
  );
}
