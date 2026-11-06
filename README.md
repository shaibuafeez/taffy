# Cleared

**Paid in USDC. Marked paid in Xero.**

Small businesses on Xero increasingly get paid in USDC and USDT, straight to their own wallet. The payments arrive with
no reference, sometimes on the wrong chain, sometimes short by an exchange fee, and someone matches each one to an
invoice by hand. Cleared works out which invoice each stablecoin payment is for, records it in Xero at the USD value on
the day it landed, and asks only about the ones it can't be sure of.

This repo is the site and the clickable product demo.

| Route | What it is |
|---|---|
| `/` | Landing page, plus the "send us last month" form (opens a pre-filled email; no backend yet) |
| `/demo` | Review inbox: clear three real-world problem payments in a sample Xero organisation |
| `/demo/setup` | First run: connect Xero, add wallets (network detected from the address), read 90 days |
| `/pay/demo` | The page a client opens to pay a Xero invoice in USDC or USDT |

Everything under `/demo` and `/pay/demo` uses **sample data** (Northline Studio and its clients are fictional).

## Run it

```bash
npm install
npm run dev        # http://127.0.0.1:3011
npm run build && npm run start
```

Node 22 or newer. Set `NEXT_PUBLIC_CONTACT_EMAIL` to the address that should receive "match my month" requests.

## Where things live

- `src/content/site.ts`: every word on the site, including product messages (toasts, errors, empty states). The comments mark which facts are sourced.
- `src/components/Motion.tsx`: declarative motion (`data-reveal`, `data-draw`, `data-stamp`, `data-count`) on GSAP and Lenis. Respects `prefers-reduced-motion`.
- `src/components/LedgerHero.tsx`: the hero ledger: rows tick in, the tally fills, the PAID stamp comes down.
- `src/components/ReviewInbox.tsx`: the review inbox demo: evidence, suggested fixes, rules, stamp, undo, keyboard (Enter, S, U).
- `src/components/Setup.tsx`, `PayCard.tsx`, `MatchForm.tsx`: setup, the pay page and the request form, including the warning when someone pastes a private key or seed phrase.

## Voice

Say what happened, then what to do. Numbers first, invoice numbers always. Never blame the client. Never claim a
feature the product doesn't have.

---

This repository previously held **Taffy**, a design study for a fictional order book on Sui. Its last version is preserved in
the git history at commit `8d427cb`.
