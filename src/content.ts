// Every word, number and name on the site lives here.
// Taffy is a design concept: teams, figures and the PULL token are fictional.

export const brand = {
  name: "Taffy",
  ticker: "PULL",
  tagline: "One book, every app, pulled tight.",
  description:
    "Taffy is the shared order book on Sui. Spot, margin and predictions in one stack, so builders skip the plumbing and traders get the tightest spreads in town.",
  waitlist: "The Taffy app is in the oven. Join the waitlist",
};

export const nav = [
  { href: "/build", label: "Build" },
  { href: "/trade", label: "Trade" },
  { href: "/token", label: "$PULL" },
  { href: "/points", label: "Points" },
];

/* ------------------------------------------------------------------ */
/* Home hero: newspaper blackout. Words wrapped in [[ ]] survive.       */
/* ------------------------------------------------------------------ */
export const blackout = {
  masthead: "The Daily Pull",
  edition: ["Vol. 01", "No. 001", "Sui edition", "Free, like it should be"],
  kicker: "Markets",
  text: `Across the chain this morning, traders woke to the familiar mess: liquidity split into a hundred thin pools, spreads wide enough to drive a truck through, and a toll at every bridge. Builders, meanwhile, spent another quarter writing matching engines no user will ever see. A quieter proposal is making the rounds. Put everything on [[one book,]] open it to [[every app]] that wants to plug in, settle each trade in under a second, and keep the whole thing [[pulled tight,]] the way a candy maker works a warm batch of [[taffy.]] on the hook until it shines. Early numbers suggest it works.`,
  note: "creativity is subtraction",
  noteCredit: "after Austin Kleon",
};

/* ------------------------------------------------------------------ */
/* Primitives                                                           */
/* ------------------------------------------------------------------ */
export type PrimitiveKey = "spot" | "margin" | "predict";

export const primitives: {
  key: PrimitiveKey;
  name: string;
  candy: string;
  line: string;
  trader: string;
  what: string;
  how: string;
  special: string;
}[] = [
  {
    key: "spot",
    name: "Spot",
    candy: "The gumball machine",
    line: "Coin in, candy out. A real order book with real depth, matched on chain.",
    trader:
      "Buy and sell against the deepest book on Sui. Live prices, tight spreads, and the same liquidity in every app you open.",
    what: "Sui's shared, fully on-chain central limit order book. Real bids, real asks, no synthetic pricing.",
    how: "Makers post limit orders into shared pools. Takers cross the spread. Every app that plugs in reads and writes the same book.",
    special:
      "Depth compounds. Each new app brings flow that tightens spreads for every other app, so nobody starts from zero.",
  },
  {
    key: "margin",
    name: "Margin",
    candy: "The taffy hook",
    line: "Stretch a position without snapping it. Leverage on the same book.",
    trader:
      "Borrow against what you hold and trade it on the same book. Shared collateral means more depth and fairer liquidation prices.",
    what: "Isolated and cross margin accounts that borrow from shared lending pools and trade directly on the spot book.",
    how: "Deposit collateral, open a position, and the risk engine watches health in real time. Liquidations route through the book, not a backstop auction.",
    special:
      "No second venue and no second order book. Margin positions add depth to spot instead of splitting it.",
  },
  {
    key: "predict",
    name: "Predict",
    candy: "The fortune cookie",
    line: "Crack it open on expiry. Markets on where a price will be.",
    trader:
      "Take a view on whether an asset ends above or below a price on a date. Settled against the book, paid out instantly.",
    what: "Binary and range markets on asset prices, written as tokens and settled by the spot book's own price at expiry.",
    how: "Pick a market, buy the side you believe in, hold or trade out before expiry. Settlement reads the book, so there's no oracle to argue with.",
    special:
      "Predictions share collateral with margin, so a hedge and a bet can live in a single transaction.",
  },
];

/* ------------------------------------------------------------------ */
/* Recipes: the combinations                                            */
/* ------------------------------------------------------------------ */
export const recipes = [
  {
    title: "Leveraged trading",
    ingredients: ["Spot", "Margin"],
    method: "A perps-style exchange with real order-book depth and shared collateral, without writing a matching engine.",
    serves: "Active traders",
    time: "A weekend",
  },
  {
    title: "Prediction markets",
    ingredients: ["Spot", "Predict"],
    method: "A predictions app where every market settles instantly against the deepest prices on Sui.",
    serves: "Everyone with an opinion",
    time: "A long weekend",
  },
  {
    title: "Structured products",
    ingredients: ["Margin", "Predict"],
    method: "Leveraged binaries, hedged yield and principal-protected vaults, built from two primitives.",
    serves: "Treasuries and funds",
    time: "Two sprints",
  },
  {
    title: "Full-stack finance",
    ingredients: ["Spot", "Margin", "Predict"],
    method: "A complete trading platform with spot, leverage and derivatives in one composable transaction.",
    serves: "The ambitious",
    time: "One quarter",
  },
];

/* ------------------------------------------------------------------ */
/* The swipe file: teams building on Taffy (fictional)                  */
/* ------------------------------------------------------------------ */
export const teams = [
  { name: "Saltwater", kind: "Perps", color: "pink", trade: true, blurb: "A perpetuals terminal with up to 25x leverage, running on Taffy's margin book." },
  { name: "Gumdrop", kind: "Vaults", color: "mint", trade: false, blurb: "Automated vaults that quote both sides of the book and pass maker rebates to depositors." },
  { name: "Sherbet", kind: "Predictions", color: "yellow", trade: true, blurb: "Price markets for the curious, settled against the book the second they expire." },
  { name: "Licorice", kind: "Routing", color: "ink", trade: true, blurb: "Splits big orders across Taffy pools and time so size moves without moving the price." },
  { name: "Fondant", kind: "Lending", color: "pink", trade: false, blurb: "Borrow against open positions and repay in the same transaction you close them." },
  { name: "Brittle", kind: "Risk", color: "ink", trade: false, blurb: "A keeper network that watches account health and routes liquidations through the book." },
  { name: "Caramel", kind: "Wallet", color: "yellow", trade: true, blurb: "A mobile wallet with one-tap swaps and limit orders that sit right on the book." },
  { name: "Sprinkles", kind: "Social", color: "mint", trade: true, blurb: "Daily trading quests with friends. Small streaks, real fills, no paper money." },
  { name: "Toffee", kind: "Terminal", color: "pink", trade: true, blurb: "A pro terminal with depth charts, TWAPs and hotkeys for people who never touch a mouse." },
] as const;

/* ------------------------------------------------------------------ */
/* Numbers (fictional)                                                  */
/* ------------------------------------------------------------------ */
export const stats = [
  { label: "Volume pulled through the book", value: 9.42, prefix: "$", suffix: "B", decimals: 2 },
  { label: "Traders", value: 212480, prefix: "", suffix: "", decimals: 0 },
  { label: "24h volume", value: 31.8, prefix: "$", suffix: "M", decimals: 1 },
  { label: "PULL burned from fees", value: 84.2, prefix: "", suffix: "M", decimals: 1 },
];

/* ------------------------------------------------------------------ */
/* Builders                                                             */
/* ------------------------------------------------------------------ */
export const whyBuild = [
  { n: "01", title: "Paid from day one", body: "Every trade routed through your integration shares fees with you. No volume minimums, no waiting list." },
  { n: "02", title: "No bootstrapping", body: "Plug into the book and your users see full depth on the first block. You never seed an empty pool again." },
  { n: "03", title: "One call, many moves", body: "Combine primitives in a single programmable transaction. Borrow, trade and hedge, all or nothing." },
  { n: "04", title: "Sub-second settlement", body: "Fills settle on Sui in well under a second, so your UI never has to pretend." },
];

export const resources = [
  { title: "Docs", body: "Concepts, guides and the full API, written by the people who built it.", tag: "Read" },
  { title: "TypeScript SDK", body: "Place, cancel and compose orders in a few lines. Typed end to end.", tag: "npm i" },
  { title: "Move packages", body: "Call the book straight from your own Move modules.", tag: "Source" },
  { title: "Example apps", body: "A swap widget, a margin terminal and a predictions market to fork.", tag: "Fork" },
  { title: "Builder Discord", body: "A channel where the core team answers questions and reviews designs.", tag: "Join" },
  { title: "Grants", body: "Small, fast grants for teams shipping something new on the book.", tag: "Apply" },
];

/* ------------------------------------------------------------------ */
/* Traders                                                              */
/* ------------------------------------------------------------------ */
export const startSteps = [
  { n: "1", title: "Get a Sui wallet", body: "Any Sui wallet works. It takes about a minute and nobody asks for your email." },
  { n: "2", title: "Fund it", body: "Bridge in or buy SUI and USDC on an exchange, then send them to your address." },
  { n: "3", title: "Pick an app", body: "Every app below trades on the same book, so pick the one whose design you like best." },
];

export const tradeFaq = [
  { q: "Do I trade on Taffy directly?", a: "You trade through apps built on Taffy. They all share one order book, so the price and depth are the same wherever you go." },
  { q: "What does it cost?", a: "Takers pay a small fee per fill and makers can earn rebates. Paying fees in PULL takes a discount off the top." },
  { q: "Who holds my funds?", a: "You do. Orders are placed from your own wallet and settle on chain. There's no account to open and nobody can freeze it." },
  { q: "What happens if an app goes down?", a: "Your orders live on the book, not in the app. Open another app and you'll see them there." },
];

/* ------------------------------------------------------------------ */
/* Token                                                                */
/* ------------------------------------------------------------------ */
export const tokenUtility = [
  { title: "Fees", body: "Pay trading and pool-creation fees in PULL and take a discount off the top. One currency for the whole book." },
  { title: "Liquidity", body: "Makers earn PULL rebates when the book is thin and takers earn volume discounts when it's busy." },
  { title: "Governance", body: "Stake to vote on fees and parameters pool by pool. Votes curve so small holders still count." },
  { title: "Burn", body: "A slice of every fee is bought back and burned, so usage leaves the supply a little smaller every day." },
];

export const tokenFacts = [
  { label: "Symbol", value: "PULL" },
  { label: "Max supply", value: "1,000,000,000" },
  { label: "Initial circulating", value: "250,000,000" },
  { label: "Network", value: "Sui" },
];

export const allocation = [
  { label: "Community & rewards", pct: 40, tone: "pink" },
  { label: "Contributors", pct: 22, tone: "ink" },
  { label: "Ecosystem fund", pct: 18, tone: "mint" },
  { label: "Treasury", pct: 12, tone: "yellow" },
  { label: "Launch liquidity", pct: 8, tone: "paper" },
] as const;

/* ------------------------------------------------------------------ */
/* Points                                                               */
/* ------------------------------------------------------------------ */
export const pointsSteps = [
  { n: "01", title: "Trade a little, often", body: "Points reward days you show up, not one giant trade. A small fill every day beats a whale once a month." },
  { n: "02", title: "Keep a streak", body: "Consecutive active days multiply your points, up to 3x at a 30-day streak. Miss a day and the multiplier steps down, not to zero." },
  { n: "03", title: "Use more of the stack", body: "Spot, margin and predictions each count. Touching all three in a week adds a combo bonus." },
];

export const leaderboard = [
  { addr: "0x7a3f…c91e", pts: 184220, streak: 49 },
  { addr: "0x1bd0…44a7", pts: 171905, streak: 49 },
  { addr: "0xe912…0b3c", pts: 158640, streak: 46 },
  { addr: "0x55c8…9fd2", pts: 149377, streak: 49 },
  { addr: "0x0f6a…7e10", pts: 133012, streak: 38 },
  { addr: "0xa4e1…d8b5", pts: 127788, streak: 44 },
  { addr: "0x3c97…12af", pts: 119450, streak: 31 },
  { addr: "0xd02b…6c4e", pts: 112006, streak: 41 },
];

export const pointsFaq = [
  { q: "Are points a token?", a: "No. Points track participation during a season. They aren't transferable and they aren't a promise of anything." },
  { q: "Do I need to sign up?", a: "No sign-ups, no tasks, no forms. If you trade through an app on Taffy, your address earns points automatically." },
  { q: "When do balances update?", a: "Every Friday, based on the previous week's on-chain activity." },
];

/* ------------------------------------------------------------------ */
/* Footer                                                               */
/* ------------------------------------------------------------------ */
export const footerCols = [
  { title: "Build", links: [{ label: "Builder hub", href: "/build" }, { label: "Docs", href: "/build#resources" }, { label: "Recipes", href: "/build#recipes" }] },
  { title: "Trade", links: [{ label: "Trader hub", href: "/trade" }, { label: "Start here", href: "/trade#start" }, { label: "$PULL", href: "/token" }] },
  { title: "Resources", links: [{ label: "Points", href: "/points" }, { label: "Privacy", href: "/privacy" }, { label: "Terms", href: "/terms" }] },
];

// Kleon's advice: credit your influences. This is the site's genealogy.
export const stolenFrom = [
  "Austin Kleon: Steal Like an Artist, Show Your Work!, Keep Going",
  "Newspaper blackout poems",
  "Boardwalk taffy-pulling machines",
  "Recipe cards in a grandmother's tin",
  "Shop receipts and rubber stamps",
];
