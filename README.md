# Taffy

**One book, every app, pulled tight.**

Taffy is a design study: the marketing site for a fictional shared order book on Sui, with spot, margin and predictions in one stack. The visual language is built on Austin Kleon's ideas (*Steal Like an Artist*, *Show Your Work!*, *Keep Going*): newsprint, black marker, index cards, tape, receipts and rubber stamps.

> The teams, figures, SDK and PULL token on this site are fictional. Nothing here is a real product or an offer of anything.

## Highlights

- **Blackout hero.** A column of market news is redacted word by word with a marker until only the poem is left. *Creativity is subtraction.*
- **Pull the spread.** A taffy ribbon between bid and ask. Drag it and it thins out as liquidity fragments; let go and it snaps back to one tick.
- **Stretchy wordmarks.** The footer "Taffy" and the token page's "PULL" stretch toward your cursor and spring back.
- **Three layers, one chew.** A pinned scroll section pulls in Spot, Margin and Predict, each drawn as a sweet: a gumball machine, a taffy hook and a fortune cookie.
- **Paper objects.** Receipts that print, stamps that slam, index cards with tape, and doodles that draw themselves in.
- **Seven pages:** home, builder hub, trader hub (with a simulated order book), token, points (with a sample balance lookup), privacy, terms, plus a blacked-out 404.

All illustrations are hand-drawn SVG in code. There are no image files.

## Run it

Requires Node.js 22 or newer.

```sh
npm ci
npm run dev        # http://127.0.0.1:3007
```

| Script              | What it does                                                     |
| ------------------- | ---------------------------------------------------------------- |
| `npm run dev`       | Dev server on 127.0.0.1:3007                                     |
| `npm run build`     | Production build                                                 |
| `npm start`         | Serve the production build on 127.0.0.1:3007                     |
| `npm run typecheck` | TypeScript check                                                 |
| `npm run verify`    | Desktop and phone screenshots of every route into `evidence/`, plus console errors (needs Chrome) |

## Where to edit

| What                                   | Where                                  |
| -------------------------------------- | -------------------------------------- |
| Every word, number and team name       | `src/content.ts`                       |
| Colours, fonts, paper textures, marker strokes | `src/app/globals.css`          |
| Illustrations and logo                 | `src/components/Art.tsx`               |
| Doodles (underlines, circles, arrows)  | `src/components/Scribble.tsx`          |
| Blackout hero                          | `src/components/BlackoutHero.tsx`      |
| Pull-the-spread interaction            | `src/components/TaffyPull.tsx`         |
| Pinned primitives section              | `src/components/StackScroller.tsx`     |
| Scroll reveals, stamps, counters       | `src/components/Motion.tsx`            |
| Pages                                  | `src/app/*/page.tsx`                   |

## Stack

Next.js 16 (App Router), React 19, Tailwind CSS 4, GSAP with ScrollTrigger, and Lenis. Fonts are Bricolage Grotesque, Newsreader, Permanent Marker and JetBrains Mono, self-hosted through `next/font`. All motion respects `prefers-reduced-motion`.

## Stolen from

Following Kleon's advice to credit your influences: Austin Kleon's books, newspaper blackout poems, boardwalk taffy-pulling machines, recipe cards in a grandmother's tin, shop receipts and rubber stamps. The page structure was studied from a DeFi landing page used as a reference. All copy, artwork and code here are original.

## License

[MIT](LICENSE)
