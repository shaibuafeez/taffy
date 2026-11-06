// Marker doodles. Add data-draw so Motion draws them in on scroll.

type P = { className?: string; color?: string; draw?: boolean };

export function Underline({ className = "", color = "#ff4f8b", draw = true }: P) {
  return (
    <svg viewBox="0 0 300 24" preserveAspectRatio="none" className={className} aria-hidden="true" data-draw={draw ? "" : undefined}>
      <path d="M4 15C50 6 98 19 150 11s104-6 146 3" fill="none" stroke={color} strokeWidth="7" strokeLinecap="round" />
    </svg>
  );
}

export function DoubleUnderline({ className = "", color = "#ff4f8b", draw = true }: P) {
  return (
    <svg viewBox="0 0 300 30" preserveAspectRatio="none" className={className} aria-hidden="true" data-draw={draw ? "" : undefined}>
      <path d="M4 10C60 4 120 14 180 8s90-2 114 3" fill="none" stroke={color} strokeWidth="5" strokeLinecap="round" />
      <path d="M20 24C80 17 150 26 210 20s60-3 80 0" fill="none" stroke={color} strokeWidth="5" strokeLinecap="round" />
    </svg>
  );
}

export function Circled({ className = "", color = "#ff4f8b", draw = true }: P) {
  return (
    <svg viewBox="0 0 220 80" preserveAspectRatio="none" className={className} aria-hidden="true" data-draw={draw ? "" : undefined}>
      <path
        d="M120 8C70 4 14 14 8 40c-6 26 60 36 112 34s96-12 92-38C208 12 150 2 96 10"
        fill="none"
        stroke={color}
        strokeWidth="4.5"
        strokeLinecap="round"
       
      />
    </svg>
  );
}

export function Arrow({ className = "", color = "#16130f", draw = true }: P) {
  return (
    <svg viewBox="0 0 160 90" className={className} aria-hidden="true" data-draw={draw ? "" : undefined}>
      <path d="M8 18c26 52 76 66 136 52" fill="none" stroke={color} strokeWidth="4" strokeLinecap="round" />
      <path d="M124 54l22 15-24 12" fill="none" stroke={color} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ArrowDown({ className = "", color = "#16130f", draw = true }: P) {
  return (
    <svg viewBox="0 0 80 140" className={className} aria-hidden="true" data-draw={draw ? "" : undefined}>
      <path d="M52 6C18 30 14 70 38 124" fill="none" stroke={color} strokeWidth="4" strokeLinecap="round" />
      <path d="M22 108l16 20 16-22" fill="none" stroke={color} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Sparkle({ className = "", color = "#ff4f8b" }: Omit<P, "draw">) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden="true">
      <path d="M20 2c2 12 6 16 18 18-12 2-16 6-18 18-2-12-6-16-18-18 12-2 16-6 18-18Z" fill={color} stroke="#16130f" strokeWidth="2.5" strokeLinejoin="round" />
    </svg>
  );
}

export function Check({ className = "", color = "#16130f" }: Omit<P, "draw">) {
  return (
    <svg viewBox="0 0 28 28" className={className} aria-hidden="true">
      <path d="M4 15c4 3 6 6 8 9 3-8 7-14 13-20" fill="none" stroke={color} strokeWidth="3.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** A handwritten aside in the margin, with a little arrow. */
export function MarginNote({
  children,
  className = "",
  credit,
  arrow = "left",
}: {
  children: React.ReactNode;
  className?: string;
  credit?: string;
  arrow?: "left" | "down" | "none";
}) {
  return (
    <div className={`pointer-events-none select-none ${className}`} data-reveal>
      <p className="marker text-pink-deep text-[19px] leading-[1.15] md:text-[22px]">{children}</p>
      {credit && <p className="eyebrow mt-1 text-ink-3">{credit}</p>}
      {arrow === "left" && <Arrow className="mt-1 h-10 w-20 -scale-x-100" color="#d92f6b" />}
      {arrow === "down" && <ArrowDown className="mt-1 h-16 w-8" color="#d92f6b" />}
    </div>
  );
}

/** Section label in the Kleon voice: a rule number plus the idea. */
export function Rule({ n, children, className = "" }: { n: string; children: React.ReactNode; className?: string }) {
  return (
    <p className={`eyebrow flex items-center gap-3 text-ink-2 ${className}`} data-reveal>
      <span className="grid h-7 min-w-7 place-items-center rounded-full border-2 border-ink px-1.5 text-[11px] font-bold text-ink">{n}</span>
      <span>{children}</span>
    </p>
  );
}
