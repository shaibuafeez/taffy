"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Logo } from "./Art";
import { brand, nav } from "@/content";

function ActiveRing() {
  return (
    <svg viewBox="0 0 120 50" preserveAspectRatio="none" className="pointer-events-none absolute -inset-x-2 -inset-y-1.5 h-[calc(100%+12px)] w-[calc(100%+16px)]" aria-hidden="true">
      <path d="M70 5C40 3 8 10 6 26c-2 16 36 20 64 19s44-8 44-22C114 10 84 2 52 7" fill="none" stroke="#ff4f8b" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

export function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [bar, setBar] = useState(true);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <>
      {bar && (
        <div className="relative z-40 bg-ink text-paper-2">
          <Link href="/points" className="wrap flex h-10 items-center justify-center gap-2 pr-12 text-[13px] font-semibold sm:text-[14px]">
            <span className="inline-block h-2 w-2 rounded-full bg-pink" />
            <span className="link-ul">{brand.waitlist}</span>
            <span aria-hidden>→</span>
          </Link>
          <button
            onClick={() => setBar(false)}
            aria-label="Dismiss announcement"
            className="absolute right-3 top-1/2 grid h-8 w-8 -translate-y-1/2 place-items-center rounded-full hover:bg-white/10"
          >
            <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" aria-hidden="true">
              <path d="M3 3l10 10M13 3 3 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      )}

      <header className="sticky top-0 z-50 pt-3">
        <nav
          className={`wrap flex items-center justify-between transition-transform duration-500`}
          aria-label="Main"
        >
          <div
            className={`flex w-full items-center justify-between rounded-full border-2 border-ink bg-paper-2 py-1.5 pl-5 pr-1.5 transition-shadow duration-300 ${
              scrolled ? "shadow-[0_5px_0_#16130f]" : "shadow-[0_3px_0_#16130f]"
            }`}
          >
            <Link href="/" aria-label="Taffy home" className="shrink-0">
              <Logo />
            </Link>

            <ul className="hidden items-center gap-1 md:flex">
              {nav.map((n) => {
                const active = pathname === n.href;
                return (
                  <li key={n.href}>
                    <Link
                      href={n.href}
                      aria-current={active ? "page" : undefined}
                      className="relative inline-block rounded-full px-4 py-2 text-[16px] font-semibold tracking-[-0.01em] transition-colors hover:bg-paper-3/70"
                    >
                      {active && <ActiveRing />}
                      {n.label}
                    </Link>
                  </li>
                );
              })}
            </ul>

            <div className="flex items-center gap-2">
              <Link href="/build#resources" className="btn btn-pink btn-sm hidden sm:inline-flex">
                Docs <span className="arrow" aria-hidden>→</span>
              </Link>
              <button
                className="grid h-[42px] w-[42px] place-items-center rounded-full border-2 border-ink bg-paper md:hidden"
                onClick={() => setOpen((v) => !v)}
                aria-expanded={open}
                aria-controls="mobile-menu"
                aria-label={open ? "Close menu" : "Open menu"}
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
                  {open ? (
                    <path d="M5 5l14 14M19 5 5 19" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                  ) : (
                    <path d="M4 8c5-1.5 11 1 16-.5M4 16c6 1 10-1.5 16 .5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </nav>

        <div
          id="mobile-menu"
          className={`fixed inset-x-0 bottom-0 top-0 -z-10 bg-pink transition-[clip-path] duration-700 ease-[cubic-bezier(.7,0,.2,1)] md:hidden ${
            open ? "[clip-path:circle(150%_at_92%_40px)]" : "pointer-events-none [clip-path:circle(0%_at_92%_40px)]"
          }`}
        >
          <ul className="wrap flex h-full flex-col justify-center gap-1 pt-16">
            {[{ href: "/", label: "Home" }, ...nav, { href: "/build#resources", label: "Docs" }].map((n, i) => (
              <li key={n.href} style={{ transitionDelay: open ? `${120 + i * 50}ms` : "0ms" }} className={`transition-all duration-500 ${open ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"}`}>
                <Link href={n.href} className="display block py-1 text-[64px] text-ink">
                  {n.label}
                </Link>
              </li>
            ))}
            <li className="marker mt-6 text-[20px] text-ink/70">keep going →</li>
          </ul>
        </div>
      </header>
    </>
  );
}
