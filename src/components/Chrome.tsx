import Link from "next/link";
import { brand, nav, footer, CONTACT_EMAIL } from "@/content/site";

export function Logo({ tone = "ink" }: { tone?: "ink" | "paper" }) {
  const c = tone === "ink" ? "var(--color-ink)" : "var(--color-paper)";
  return (
    <span className="flex items-center gap-2.5" style={{ color: c }}>
      <svg width="28" height="28" viewBox="0 0 30 30" aria-hidden="true">
        <rect x="1.5" y="1.5" width="27" height="27" fill="none" stroke="currentColor" strokeWidth="2" />
        <path d="M8 15.5l4.5 4.5L22 10" fill="none" stroke="var(--color-stamp)" strokeWidth="3" strokeLinecap="square" />
      </svg>
      <span className="display text-[24px] leading-none tracking-[0.02em]">{brand.name}</span>
    </span>
  );
}

export function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-rule-strong bg-paper/90 backdrop-blur-md">
      <nav aria-label="Main" className="mx-auto flex max-w-[1280px] items-center justify-between gap-4 px-[var(--gutter)] py-3">
        <Link href="/" aria-label={`${brand.name} home`}>
          <Logo />
        </Link>
        <div className="hidden items-center gap-7 text-[15px] font-medium md:flex">
          {nav.map((n) => (
            <Link key={n.href} href={n.href} className="link-u py-2">
              {n.label}
            </Link>
          ))}
          <Link href="/#start" className="btn btn-ink !min-h-11 !px-4 text-[15px]">
            Match last month, free
          </Link>
        </div>
        <details className="group relative md:hidden">
          <summary className="flex min-h-11 cursor-pointer list-none items-center gap-2 border border-ink px-4 text-[15px] font-semibold [&::-webkit-details-marker]:hidden">
            Menu
            <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true" className="transition-transform group-open:rotate-45">
              <path d="M6 1v10M1 6h10" stroke="currentColor" strokeWidth="1.6" />
            </svg>
          </summary>
          <div className="anim-rise absolute right-0 top-[calc(100%+8px)] flex w-64 flex-col border border-ink bg-card p-2 shadow-[6px_6px_0_var(--color-rule-strong)]">
            {nav.map((n) => (
              <Link key={n.href} href={n.href} className="flex min-h-11 items-center px-3 text-[16px] hover:bg-paper">
                {n.label}
              </Link>
            ))}
            <Link href="/#start" className="btn btn-ink mt-2">
              Match last month, free
            </Link>
          </div>
        </details>
      </nav>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="bg-night text-fog">
      <div className="mx-auto flex max-w-[1280px] flex-wrap items-center justify-between gap-6 px-[var(--gutter)] py-10 text-[14px]">
        <Logo tone="paper" />
        <p className="max-w-md">{footer.legal}</p>
        <div className="flex gap-6">
          <Link href="/demo" className="link-u text-fog">
            Live demo
          </Link>
          <Link href="/pay/demo" className="link-u text-fog">
            Pay page
          </Link>
          <a href={`mailto:${CONTACT_EMAIL}`} className="link-u text-fog">
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
}
