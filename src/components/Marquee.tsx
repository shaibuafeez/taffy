import { LogoMark } from "./Art";

export function Marquee({ words, tone = "ink" }: { words: string[]; tone?: "ink" | "pink" }) {
  const row = (
    <div className="flex shrink-0 items-center">
      {words.map((w, i) => (
        <span key={i} className="flex items-center">
          <span className="display px-6 text-[clamp(36px,5vw,72px)] leading-none md:px-9">{w}</span>
          <LogoMark className="h-7 w-auto md:h-9" />
        </span>
      ))}
    </div>
  );
  return (
    <div
      className={`marquee relative overflow-hidden border-y-2 border-ink py-5 md:py-7 ${tone === "ink" ? "bg-ink text-paper-2" : "bg-pink text-ink"}`}
      aria-hidden="true"
    >
      <div className="marquee-track">
        {row}
        {row}
      </div>
    </div>
  );
}
