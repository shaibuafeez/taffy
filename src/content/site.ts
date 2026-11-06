// Every word on the site lives here. Facts are sourced; see the comments.
// Sample data (Northline Studio and its clients) is fictional and labelled as such wherever it shows.

export const CONTACT_EMAIL = process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "hello@cleared.example";

export const brand = {
  name: "Cleared",
  tagline: "Paid in USDC. Marked paid in Xero.",
  description:
    "Cleared matches the USDC and USDT payments your clients send to your wallet with the right Xero invoice, records them at the USD value on the day they landed, and asks you only about the ones it can't be sure of.",
};

export const nav = [
  { href: "/#cases", label: "The six cases" },
  { href: "/#how", label: "How it works" },
  { href: "/#pricing", label: "Pricing" },
  { href: "/demo", label: "Live demo" },
];

export const hero = {
  eyebrow: "For businesses on Xero that get paid in USDC or USDT",
  lines: ["Paid in USDC.", "Marked paid", "in Xero."],
  sub: "Your clients send stablecoins straight to your wallet with no reference, sometimes on the wrong chain, sometimes short by an exchange fee. Cleared works out which invoice each payment is for, records it in Xero at the USD value on the day it landed, and asks you only about the ones it can't be sure of.",
  primary: { label: "Match last month, free", href: "#start" },
  secondary: { label: "Try the live demo", href: "/demo" },
  trust: ["No keys", "No 1% cut", "Your money stays in your wallet"],
};

// Sample ledger for the hero. Fictional.
export const ledger = {
  title: "Receipts · October 2026",
  org: "Northline Studio · sample",
  rows: [
    { date: "02 Oct", from: "Halcyon Protocol", chain: "Base", amount: "12,500.00", invoice: "INV-0418", status: "ok" },
    { date: "05 Oct", from: "Orbit Foundation", chain: "Tron", amount: "24,000.00", invoice: "INV-0419", status: "ok" },
    { date: "09 Oct", from: "Halcyon Protocol", chain: "Base", amount: "9,598.80", invoice: "INV-0420", status: "fee", note: "fee −1.20" },
    { date: "14 Oct", from: "Meridian Labs", chain: "Arbitrum", amount: "8,000.00", invoice: "INV-0421", status: "ok" },
    { date: "17 Oct", from: "0x7a3f…91c2", chain: "Base", amount: "2,250.00", invoice: "2 fit", status: "who", note: "who?" },
    { date: "22 Oct", from: "Lumen Grants", chain: "Tempo", amount: "3,000.00", invoice: "INV-0425", status: "ok" },
  ],
  totals: { received: 23, matched: 20, review: 3 },
};

export const chains = ["Base", "Ethereum", "Arbitrum", "Polygon", "Solana", "Tron", "Tempo", "Arc"];

// Verbatim from Xero Product Ideas, "Multicurrency – Support for new currencies & Bitcoin" (131 votes).
// https://productideas.xero.com/forums/967121-users-setup/suggestions/44960431-multicurrency-support-for-new-currencies-bitco
export const proof = {
  kicker: "Written by Xero users on Xero's own ideas board",
  quotes: [
    { text: "Currently, this is the most manual part of our billing and accounting (ironic, yes?)", meta: "A Xero user paid in crypto · Dec 2022" },
    { text: "99% of the companies supporting cryptos are working with USDT and/or USDC", meta: "A Xero user with clients paying in crypto · Mar 2023" },
    { text: "…the prices are ludicrous for those of us with small amounts of crypto assets.", meta: "A Xero user, on the apps that exist · Aug 2025" },
  ],
  votes: 131,
  reply: "Digital currencies aren't prioritised in the next year.",
  replyMeta: "Xero's reply on the thread, February 2023. No update since.",
};

export const cases = {
  title: "Six ways a stablecoin payment breaks your books.",
  intro:
    "Matching on the exact amount works until a real client pays. The stablecoin rails' own docs leave every one of these to the merchant. Cleared has a rule for each, and asks you only when the rule isn't sure.",
  rows: [
    { n: "01", what: "Short by an exchange fee.", detail: "The client sent 9,600. Their exchange kept 1.20 on the way.", today: "Find it on a block explorer, then journal the difference by hand.", cleared: "Matches it, books the 1.20 to Bank fees, marks the invoice paid." },
    { n: "02", what: "Part payment.", detail: "Half now, half next month.", today: "Track what's still owed in a spreadsheet.", cleared: "Applies what arrived. The invoice stays open for the rest." },
    { n: "03", what: "Overpaid.", detail: "More arrived than the invoice asked for.", today: "The extra sits in the wallet, unexplained.", cleared: "Records it as credit on the customer, ready to refund or apply." },
    { n: "04", what: "Right money, other chain.", detail: "The invoice said Base. It came on Tron.", today: "Email the client and wait.", cleared: "Recognises the payer's wallet and matches it anyway." },
    { n: "05", what: "Late.", detail: "Paid after the invoice was voided.", today: "Money in, nothing to match it to.", cleared: "Finds the voided invoice and asks you once what to do." },
    { n: "06", what: "No reference, unknown wallet.", detail: "Two open invoices for the same amount.", today: "Guess.", cleared: "Shows the likely invoices and why. After you pick, it remembers the wallet." },
  ],
};

export const how = {
  title: "Set up in one sitting. Then it runs on its own.",
  steps: [
    { n: "01", title: "Connect Xero", body: "Cleared reads open invoices and records payments against them through one clearing account it creates. It can't see your bank feeds, payroll or reports." },
    { n: "02", title: "Add the wallets you're paid to", body: "Paste public addresses. There is nothing to sign and nothing Cleared could move." },
    { n: "03", title: "Review what it isn't sure of", body: "Each one comes with the evidence and a suggested fix. Everything else is already marked paid in Xero." },
  ],
};

export const payPage = {
  title: "Make the next payment impossible to mismatch.",
  body: [
    "Every Xero invoice gets a Pay with USDC link. Your client picks a network and sends the amount shown. The last digits, or a memo on Tempo, tell Cleared exactly which invoice it is.",
    "The money goes straight to your wallet. Cleared never touches it, so there's no 1% cut.",
  ],
};

// Prices from public pricing pages, checked 6 Nov 2026.
export const compare = {
  title: "What you're choosing between.",
  note: "Prices from public pricing pages, 6 Nov 2026. 1% tools at $300k a year received.",
  cols: ["By hand", "Sub-ledger apps", "1% payment links", "Enterprise tools", "Cleared"],
  rows: [
    { label: "Works out which invoice was paid", cells: ["You do", "You pick it from a list", "Only for payments through their link", "Yes", "Yes"] },
    { label: "Handles fee-short, part, over, wrong chain", cells: ["You do", "You do", "Some", "Yes", "Yes"] },
    { label: "Money goes straight to your wallet", cells: ["Yes", "Yes", "Through them", "Yes", "Yes"] },
    { label: "Cost", cells: ["Your evenings", "From $29/mo", "About $250/mo", "$247–$300+/mo, after a sales call", "$49–$99/mo"] },
  ],
};

export const bookkeepers = {
  title: "Run it for every client from one inbox.",
  points: [
    "One review queue across up to 15 client organisations.",
    "Send a client a link to confirm who paid. No login for them.",
    "Teach Cleared a payer once and it remembers for every month after.",
  ],
};

export const pricing = {
  title: "Flat. Not 1%.",
  sub: "At $300k a year in stablecoin receipts, a 1% tool costs about $250 a month. Cleared costs the same whatever you're paid.",
  plans: [
    { name: "Starter", price: 49, items: ["1 Xero organisation", "Up to 50 matched payments a month", "Every chain we support"] },
    { name: "Growth", price: 99, items: ["3 Xero organisations", "Up to 250 matched payments a month", "Pay pages on every invoice", "Refund queue"], featured: true },
    { name: "Bookkeeper", price: 199, items: ["15 client organisations", "One inbox across clients", "Review links for clients"] },
  ],
  founding: "First 20 businesses: $39 a month, locked for as long as you stay.",
  guarantee: "If Cleared doesn't auto-match at least 80% of your stablecoin receipts in month one, you don't pay.",
};

export const start = {
  title: "Send us last month. We'll match it, free.",
  body: "We're onboarding our first 20 businesses by hand. Send your wallet address and a Xero invoice export, and within 48 hours you get back every payment matched to its invoice, as a file you can import into Xero.",
  honesty: "Right now a person checks every match. You get the same file the app will make.",
  fields: {
    email: { label: "Work email", placeholder: "you@company.com" },
    wallets: { label: "Wallet addresses you get paid to", placeholder: "One per line: 0x…, T…, or a Solana address", hint: "Public addresses only." },
    month: { label: "Month to match" },
  },
  submit: "Email us your month",
  safety: "Never send a private key or seed phrase. We will never ask for one.",
};

export const faq = [
  { q: "Does Cleared ever hold my money?", a: "No. Clients pay your wallet directly. Cleared only reads public transaction data and writes payments into Xero." },
  { q: "What exactly does Cleared change in Xero?", a: "It records payments against invoices through a clearing account it creates, and books differences to the account you choose, such as Bank fees. Each one is a normal Xero payment you can delete." },
  { q: "Which networks and coins?", a: "USDC and USDT on Base, Ethereum, Arbitrum, Polygon, Solana and Tron, plus Tempo and Arc." },
  { q: "How is the USD value set?", a: "At the rate on the day the payment landed: usually 1.00 for USDC, the market rate for USDT. How stablecoins sit on your balance sheet is your accountant's call. Cleared records the receipt and keeps the evidence." },
  { q: "What if it matches the wrong invoice?", a: "Undo it in Cleared and the payment comes off the invoice in Xero. Anything Cleared isn't sure of comes to you before it touches Xero." },
  { q: "QuickBooks?", a: "Not yet. Xero first, QuickBooks next. If you need it, tell us when you send your month." },
];

export const footer = {
  legal: "Not affiliated with Xero Limited. Xero is a trademark of Xero Limited.",
};

/* ------------------------------------------------------------------ */
/* Product messages. One voice: say what happened, then what to do.     */
/* Numbers first, invoice numbers always, never blame the client.       */
/* ------------------------------------------------------------------ */
export const messages = {
  writing: "Writing to Xero…",
  undo: "Undo",
  undone: (inv: string) => `Undone. ${inv} is unpaid in Xero again.`,
  clearMonth: (month: string, n: number) => `${month} is clear.`,
  clearMonthBody: (n: number, rules: number) =>
    `All ${n} stablecoin payments are recorded in Xero at their USD value.${rules ? ` You saved ${rules} rule${rules === 1 ? "" : "s"}, so next month asks less.` : ""}`,
  errors: {
    lockDate: { title: "Xero didn't accept this payment.", body: "October is locked in Xero (lock date 31 Oct). Unlock October, or record the payment on 1 November.", actions: ["Open Xero settings", "Record on 1 Nov"] },
    disconnected: { title: "Xero disconnected Cleared on 4 Nov.", body: "Nothing is being recorded until you reconnect. Payments keep arriving in your wallet as normal.", actions: ["Reconnect Xero"] },
    invoiceChanged: { title: "INV-0420 changed in Xero after we matched it.", body: "The amount went from 9,600.00 to 9,900.00. Check the match before we record it.", actions: ["Check the match"] },
    chainDelay: { title: "We couldn't read Tron for the last 40 minutes.", body: "Nothing is lost. We'll catch up on our own when it's back.", actions: [] },
    duplicate: { title: "Already recorded.", body: "This payment is already on INV-0418 in Xero, so we skipped it to avoid counting it twice.", actions: [] },
  },
  empty: {
    review: "Nothing to review. Every stablecoin payment this month is in Xero.",
    wallets: "Add the wallet your clients pay into. A public address is all we need.",
    matched: "No stablecoin payments yet this month. They'll show here within a minute of landing.",
  },
  email: {
    weeklySubject: "3 payments need you · 20 marked paid in Xero this week",
    clientReceipt: "Payment received for INV-0426. Thank you.",
  },
};
