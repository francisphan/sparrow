# Sparrow

Mahjong for people who have never seen a tile. 麻雀 (sparrow) is the Cantonese name for the game.

Live: https://francisphan.github.io/sparrow/

## Lessons

1. **The tiles.** All 144 tiles with the classic faces found on most sets: three suits (characters, dots, bamboo) one to nine, four winds, three dragons, flowers and seasons. Hover, tap or tab to any tile to read it, then try "Name that tile" with instant feedback.
2. **Sets and a winning hand.** Chow, pung, kong and the pair, and the goal of four sets plus a pair. Flip a hand between sorted and grouped to see the sets slide into place, then find the wait in four ready hands, including nine gates.
3. **How a round flows.** Seats and winds, the wall, the deal, draw and discard, calling a discard, and what happens when two players want the same tile. A 13-step animated table with all 144 tiles.
4. **Scoring basics.** Faan counting in Hong Kong rules: all chows, all pungs, mixed and pure one suit, dragon and wind pungs, self-draw, concealed hand, the minimum and the limit, plus a table of the rare named hands (the jade, ruby and pearl dragons at ten faan, and the limit hands). Score six pre-built hands and check your count.

Plus a glossary, reachable from the dotted words in every lesson.

## Rule set

Tiles, sets and the flow of a turn are shared by nearly every variant. Winning and scoring follow **Hong Kong (Cantonese) mahjong**, the simplest to count. Riichi (Japanese), Chinese Official and American mahjong score differently. Where common tables disagree (the all-chows pair rule, the three-faan minimum, the thirteen-faan limit) the lesson says which reading it uses.

The data model is variant-agnostic: tiles, melds and hands live in `src/data/`, and scoring is in `src/data/scoring/hongkong.ts`, so another rule set can be added beside it.

## Design

The page is the table: deep felt green, with bone tiles as the only raised surfaces. The tile faces are Cangjie6's classic set from Wikimedia Commons (CC BY-SA 4.0, see `CREDITS.md`), served as one SVG sprite in `public/tiles.svg`. The sprite is built in the [Pung](https://github.com/francisphan/pung) repository (`npm run tiles` there) and copied here; corner hints and the rings that mark a picked, correct, wrong or claimed tile are drawn over it in code. Lacquer red is the current thing (active tab, primary action, 中 and 萬), jade is the green dragon and a correct answer, indigo frames the white dragon. Young Serif for headings, Atkinson Hyperlegible for text, and a Noto Serif TC subset for the characters on the tiles. The subset is generated from every Chinese character in `src/`, and a test fails if one is missing from `index.html`.

## Metrics

Set the repository variable `SPARROW_GOATCOUNTER` to a [GoatCounter](https://www.goatcounter.com/) site, such as `https://sparrow.goatcounter.com`, and the build loads its script: page views plus a few named events (`lesson/tiles` and the other lessons, `quiz/tile/right` and `wrong`, `quiz/wait/right` and `wrong`, `quiz/score/right` and `wrong`; the list is in `src/metrics.ts`). GoatCounter sets no cookies and keeps no personal data, so there is no banner, and it skips localhost by itself. Without the variable nothing is loaded or counted.

## Develop

```bash
npm install
npm run dev        # http://localhost:5173
npm test           # vitest: tile set, hand validator, wait finder, scoring, scripted round, UI
npm run lint
npm run build      # tsc + vite, output in dist/
```

React 19, TypeScript, Vite. No UI library: tiles are `<use>` references into the sprite and move with CSS transitions, which are switched off under `prefers-reduced-motion`.

## Deploy

Pushing to `main` runs `.github/workflows/deploy.yml`, which builds the site and publishes it to GitHub Pages. The Vite `base` is `/sparrow/` in production builds. `ci.yml` runs lint, build and tests on pull requests.
