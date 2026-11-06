// Hand-drawn SVG illustrations. Original artwork, drawn in code.
// Ink outlines, flat candy fills, a little wobble in every line.

const INK = "#16130f";
const PAPER = "#faf7f1";
const PINK = "#ff4f8b";
const MINT = "#4bd6a4";
const YELLOW = "#ffd54a";

export const tones = { pink: PINK, mint: MINT, yellow: YELLOW, ink: INK, paper: PAPER } as const;
export type Tone = keyof typeof tones;

/* ---------------------------------------------------------------- */
/* Logo: a twist-wrapped taffy                                        */
/* ---------------------------------------------------------------- */
export function LogoMark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 40" className={className} aria-hidden="true">
      <path d="M3 6 14 15 14 25 3 34 6 20Z" fill={PINK} stroke={INK} strokeWidth="3" strokeLinejoin="round" />
      <path d="M61 6 50 15 50 25 61 34 58 20Z" fill={PINK} stroke={INK} strokeWidth="3" strokeLinejoin="round" />
      <rect x="13" y="8" width="38" height="24" rx="11" fill={PAPER} stroke={INK} strokeWidth="3" />
      <clipPath id="logo-body">
        <rect x="14.5" y="9.5" width="35" height="21" rx="9.5" />
      </clipPath>
      <g clipPath="url(#logo-body)" stroke={PINK} strokeWidth="5">
        <path d="M14 34 30 6M26 34 42 6M38 34 54 6" />
      </g>
      <rect x="13" y="8" width="38" height="24" rx="11" fill="none" stroke={INK} strokeWidth="3" />
    </svg>
  );
}

export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <LogoMark className="h-[26px] w-auto" />
      <span className="display text-[27px] leading-none tracking-[-0.05em]">Taffy</span>
    </span>
  );
}

/* ---------------------------------------------------------------- */
/* A big wrapped candy                                                */
/* ---------------------------------------------------------------- */
export function Candy({
  tone = "pink",
  id,
  className = "",
  stripes = "paper",
}: {
  tone?: Tone;
  id: string;
  className?: string;
  stripes?: Tone;
}) {
  const fill = tones[tone];
  const stripe = tones[stripes];
  return (
    <svg viewBox="0 0 300 170" className={className} aria-hidden="true">
      {/* wrapper ends, crinkled */}
      <path
        d="M78 62 46 40 30 30 38 46 14 44 32 60 8 70 34 78 12 96 38 98 24 118 50 110 46 134 78 106Z"
        fill={PAPER}
        stroke={INK}
        strokeWidth="4"
        strokeLinejoin="round"
      />
      <path
        d="M222 62 254 40 270 30 262 46 286 44 268 60 292 70 266 78 288 96 262 98 276 118 250 110 254 134 222 106Z"
        fill={PAPER}
        stroke={INK}
        strokeWidth="4"
        strokeLinejoin="round"
      />
      <path d="M58 58 44 72M52 88 30 92M60 102 50 116" stroke={INK} strokeWidth="2.5" strokeLinecap="round" opacity=".55" />
      <path d="M242 58 256 72M248 88 270 92M240 102 250 116" stroke={INK} strokeWidth="2.5" strokeLinecap="round" opacity=".55" />
      {/* twists */}
      <path d="M70 66C80 72 80 98 70 104" fill="none" stroke={INK} strokeWidth="4" strokeLinecap="round" />
      <path d="M230 66C220 72 220 98 230 104" fill="none" stroke={INK} strokeWidth="4" strokeLinecap="round" />
      {/* body */}
      <clipPath id={`${id}-clip`}>
        <path d="M86 46C120 38 182 38 214 46 232 52 236 118 214 124 182 132 120 132 86 124 64 118 66 52 86 46Z" />
      </clipPath>
      <path d="M86 46C120 38 182 38 214 46 232 52 236 118 214 124 182 132 120 132 86 124 64 118 66 52 86 46Z" fill={fill} />
      <g clipPath={`url(#${id}-clip)`} stroke={stripe} strokeWidth="13" strokeLinecap="round">
        <path d="M60 150 120 20M100 150 160 20M140 150 200 20M180 150 240 20M220 150 280 20" />
      </g>
      <path d="M96 58C120 52 160 50 186 54" fill="none" stroke={PAPER} strokeWidth="6" strokeLinecap="round" opacity=".75" />
      <path
        d="M86 46C120 38 182 38 214 46 232 52 236 118 214 124 182 132 120 132 86 124 64 118 66 52 86 46Z"
        fill="none"
        stroke={INK}
        strokeWidth="4.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* ---------------------------------------------------------------- */
/* Spot: the gumball machine                                          */
/* ---------------------------------------------------------------- */
export function GumballMachine({ className = "" }: { className?: string }) {
  const balls: [number, number, string][] = [
    [96, 96, PINK], [124, 104, MINT], [152, 98, YELLOW], [180, 104, PINK],
    [108, 72, YELLOW], [138, 76, PINK], [166, 74, MINT], [122, 50, MINT],
    [152, 52, PINK], [190, 80, YELLOW], [88, 120, MINT], [114, 128, PINK],
    [142, 126, YELLOW], [170, 128, MINT], [196, 120, PINK],
  ];
  return (
    <svg viewBox="0 0 280 300" className={className} aria-hidden="true">
      <rect x="112" y="6" width="56" height="16" rx="5" fill={PINK} stroke={INK} strokeWidth="4" />
      <rect x="126" y="0" width="28" height="10" rx="4" fill={INK} />
      <clipPath id="gum-globe">
        <circle cx="140" cy="94" r="74" />
      </clipPath>
      <circle cx="140" cy="94" r="76" fill={PAPER} />
      <g clipPath="url(#gum-globe)">
        {balls.map(([x, y, c], i) => (
          <circle key={i} cx={x} cy={y + 18} r="15" fill={c} stroke={INK} strokeWidth="3.5" />
        ))}
      </g>
      <path d="M92 52C104 38 122 30 140 30" fill="none" stroke="#fff" strokeWidth="8" strokeLinecap="round" opacity=".9" />
      <circle cx="140" cy="94" r="76" fill="none" stroke={INK} strokeWidth="5" />
      <rect x="104" y="166" width="72" height="14" rx="4" fill={INK} />
      <path d="M86 180h108l14 104H72Z" fill={PINK} stroke={INK} strokeWidth="5" strokeLinejoin="round" />
      <circle cx="140" cy="214" r="18" fill={PAPER} stroke={INK} strokeWidth="4" />
      <path d="M140 202v24" stroke={INK} strokeWidth="5" strokeLinecap="round" />
      <path d="M118 252h44v22h-44Z" fill={INK} />
      <path d="M124 252c4 10 28 10 32 0" fill="none" stroke={PAPER} strokeWidth="3" />
      <rect x="66" y="282" width="148" height="12" rx="4" fill={INK} />
      {/* price tag */}
      <g transform="rotate(-10 236 214)">
        <path d="M206 198h52l12 16-12 16h-52Z" fill={YELLOW} stroke={INK} strokeWidth="3.5" strokeLinejoin="round" />
        <circle cx="215" cy="214" r="3.5" fill={INK} />
        <text x="238" y="219" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="13" fontWeight="700" fill={INK}>
          1.284
        </text>
      </g>
      <path d="M190 220c8 2 12 -2 16 -6" fill="none" stroke={INK} strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

/* ---------------------------------------------------------------- */
/* Margin: the taffy hook (stretch without snapping)                  */
/* ---------------------------------------------------------------- */
export function TaffyHook({ className = "" }: { className?: string }) {
  const rope = "M58 286C56 196 82 98 140 92C198 86 226 196 222 286";
  return (
    <svg viewBox="0 0 280 300" className={className} aria-hidden="true">
      <rect x="104" y="6" width="72" height="22" rx="4" fill={INK} />
      <circle cx="118" cy="17" r="4" fill={PAPER} />
      <circle cx="162" cy="17" r="4" fill={PAPER} />
      <path d="M140 28v34c0 22 26 24 26 4" fill="none" stroke={INK} strokeWidth="9" strokeLinecap="round" />
      <path d="M140 28v34c0 22 26 24 26 4" fill="none" stroke="#c9c2b4" strokeWidth="3" strokeLinecap="round" />
      <path d={rope} fill="none" stroke={INK} strokeWidth="40" strokeLinecap="round" />
      <path d={rope} fill="none" stroke={PINK} strokeWidth="32" strokeLinecap="round" />
      <path d={rope} fill="none" stroke={PAPER} strokeWidth="32" strokeDasharray="5 15" />
      <path d="M140 66v8" stroke={INK} strokeWidth="9" strokeLinecap="round" />
      {/* leverage note */}
      <g transform="rotate(8 236 60)">
        <rect x="204" y="38" width="64" height="40" rx="6" fill={MINT} stroke={INK} strokeWidth="3.5" />
        <text x="236" y="65" textAnchor="middle" fontFamily="var(--font-display)" fontWeight="800" fontSize="20" fill={INK}>
          5×
        </text>
      </g>
      <path d="M30 120c-8 -14 -6 -30 6 -40M24 86l12 -6 2 13" fill="none" stroke={INK} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M250 130c8 -14 6 -30 -6 -40M256 96l-12 -6 -2 13" fill="none" stroke={INK} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ---------------------------------------------------------------- */
/* Predict: the fortune cookie                                        */
/* ---------------------------------------------------------------- */
export function FortuneCookie({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 280 300" className={className} aria-hidden="true">
      <g transform="rotate(-14 214 96)">
        <rect x="150" y="70" width="128" height="52" rx="3" fill="#fff" stroke={INK} strokeWidth="3.5" />
        <text x="214" y="93" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="12" fontWeight="700" fill={INK}>
          SUI ABOVE 4.20
        </text>
        <text x="214" y="111" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="11" fill={INK} opacity=".7">
          by Friday · 64¢
        </text>
      </g>
      <path
        d="M30 190C26 128 74 84 136 92c34 4 58 22 70 50 10 22 6 50-14 62-22 12-44-4-62 2-24 8-30 34-58 30-26-4-40-22-42-46Z"
        fill="#f2c062"
        stroke={INK}
        strokeWidth="5"
        strokeLinejoin="round"
      />
      <path d="M130 206c-8-30 4-72 40-96" fill="none" stroke={INK} strokeWidth="4.5" strokeLinecap="round" />
      <path d="M60 150c10-22 30-36 56-40" fill="none" stroke="#fff3cf" strokeWidth="7" strokeLinecap="round" opacity=".85" />
      <path d="M148 212c10 4 26 4 38-4" fill="none" stroke="#c48a2c" strokeWidth="4" strokeLinecap="round" />
      <path d="M70 220c12 6 30 6 44 0" fill="none" stroke="#c48a2c" strokeWidth="4" strokeLinecap="round" />
      {/* crumbs and sparkle */}
      <circle cx="58" cy="262" r="4" fill="#f2c062" stroke={INK} strokeWidth="2.5" />
      <circle cx="84" cy="276" r="3" fill="#f2c062" stroke={INK} strokeWidth="2.5" />
      <circle cx="210" cy="250" r="3.5" fill="#f2c062" stroke={INK} strokeWidth="2.5" />
      <path d="M236 168v22M225 179h22" stroke={PINK} strokeWidth="4" strokeLinecap="round" />
      <path d="M40 92v16M32 100h16" stroke={MINT} strokeWidth="4" strokeLinecap="round" />
    </svg>
  );
}

export function PrimitiveArt({ kind, className = "" }: { kind: "spot" | "margin" | "predict"; className?: string }) {
  if (kind === "spot") return <GumballMachine className={className} />;
  if (kind === "margin") return <TaffyHook className={className} />;
  return <FortuneCookie className={className} />;
}

/* ---------------------------------------------------------------- */
/* Team badges for the swipe file (fictional teams)                  */
/* ---------------------------------------------------------------- */
export function TeamBadge({ name, tone }: { name: string; tone: Tone }) {
  const fill = tones[tone];
  const fg = tone === "ink" ? PAPER : INK;
  return (
    <svg viewBox="0 0 64 64" className="h-14 w-14" aria-hidden="true">
      <path d="M32 3c10 0 14 6 20 9s10 10 9 20-4 14-9 20-10 9-20 9-15-4-20-9S3 42 3 32s4-15 9-20S22 3 32 3Z" fill={fill} stroke={INK} strokeWidth="3" />
      <text x="32" y="41" textAnchor="middle" fontFamily="var(--font-display)" fontWeight="800" fontSize="26" fill={fg}>
        {name[0]}
      </text>
    </svg>
  );
}
