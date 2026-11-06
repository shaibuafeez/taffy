import Link from "next/link";
import { Candy } from "@/components/Art";

export default function NotFound() {
  return (
    <section className="relative overflow-hidden py-24 md:py-36">
      <div className="wrap text-center">
        <p className="eyebrow text-ink-3">Error 404</p>
        <p className="news mx-auto mt-8 max-w-[24ch] text-[clamp(28px,4vw,52px)] leading-[1.3] text-ink-2">
          <span className="bg-ink text-ink">The page you</span> <span className="bg-ink text-ink">wanted</span>{" "}
          <span className="relative z-0 font-semibold text-ink">
            got blacked out
            <span className="absolute inset-x-[-4px] bottom-0 top-[0.2em] -z-10 bg-pink" />
          </span>{" "}
          <span className="bg-ink text-ink">somewhere along the</span> <span className="bg-ink text-ink">way.</span>
        </p>
        <h1 className="display mt-12 text-[clamp(56px,8vw,120px)]">Nothing here.</h1>
        <p className="marker mt-4 text-[24px] text-pink-deep">creativity is subtraction. so is this url.</p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Link href="/" className="btn btn-pink">
            Back to the front page <span className="arrow">→</span>
          </Link>
          <Link href="/trade" className="btn btn-paper">
            Go trade
          </Link>
        </div>
        <Candy id="nf" tone="pink" className="wobble mx-auto mt-16 w-64" />
      </div>
    </section>
  );
}
