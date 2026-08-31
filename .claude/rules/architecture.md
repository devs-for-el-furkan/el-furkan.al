## Commands

```bash
npm run dev      # start dev server with Turbopack
npm run build    # production build
npm run start    # serve production build
npm run lint     # next lint (eslint-config-next, @typescript-eslint/no-unused-vars=warn, no-explicit-any=off)
```

There is no test framework configured in this repo.

`node scripts/generate-quran-pages.js` regenerates `data/quran-pages.json` (the 604 mushaf-page → Cloudinary URL mapping) from a hardcoded `TOTAL_PAGES`/`BASE_URL`.

`node scripts/generate-quran-ayahs.js` regenerates `lib/data/kuran/ajetet/{001..114}.json` (per-surah Arabic text + Albanian translations) by pulling whole-Quran JSON from [fawazahmed0/quran-api](https://github.com/fawazahmed0/quran-api) (pinned to its `@1` CDN tag) — one Arabic edition (`ara-quransimple`) and three Albanian translation editions (`sqi-sherifahmeti`, `sqi-hasanefendinahi`, `sqi-fetimehdiu`). Output is committed to git, not fetched at build/request time. Re-run manually to resync.

## Architecture

**Routing (`app/`, App Router)**
- `/` — landing page (`app/page.tsx` → `components/landing`)
- `/list-suret-e-kuranit` — list of all 114 surahs, client-sortable by Quran order or chronological reveal order
- `/surja/[slug]` — one page per surah; `slug` is `Sura.slug` from `constants/surahs.ts`. Statically generated via `generateStaticParams`. Renders the surah's full Arabic + Albanian ayah-by-ayah reading view (`components/pages/SurahPage.tsx`), not just metadata — this is also a printed-QR-code target (see `.claude/rules/goals.md`), so the `slug` param and its values must stay stable.
- `/xhuzi/[nr]` — one page per juz (`nr` 1–30), continuous ayah reading across that juz's surah segments. Statically generated via `generateStaticParams`. Segments come from `lib/data/map/juz-to-chapter-verse-mappings.json`, sliced against the same per-surah ayah data as `/surja/[slug]`.
- `/lista-e-xhuzeve` — index of all 30 juz, mirrors `/list-suret-e-kuranit`.
- `/faqja/[id]` — one page per mushaf page image, `id` zero-padded to 3 digits (`001`–`604`). Statically generated for all 604 pages; images are served from `/public/img/quran/{id}.jpg` (also mirrored on Cloudinary, see `data/quran-pages.json`). Also a printed-QR-code target — see `.claude/rules/goals.md`. `PlayQuran` (per-page audio playback, reciter `mostafa_ismaeel` via `quranicaudio.com`) exists but is currently commented out of this route. Cross-links to/from `/surja/[slug]` for the surah(s) present on that page, via `lib/data/map/faqe-to-sure.json`.

**Data model**
- `constants/surahs.ts` is the canonical, hand-authored source of truth for all 114 surahs (id, slug, Albanian/Arabic/transliterated names, place of revelation, ayah/word/char counts, Quran order, chronological reveal order). Routing and all surah UI (`SurahsList`, `SurahCard`, `SurahPage`) read from this array, not from `lib/data`.
- `lib/data/kuran/ajetet/{001..114}.json` holds the synced ayah-level data (see `generate-quran-ayahs.js` above): each ayah carries explicit `surah`/`number` fields, `textAr` (Bismillah stripped out of Ayah 1 for every surah except 1 and 9 — see `getBismillahText()`), and a `translations` map keyed by edition id. Read through `lib/quran/getSurahAyahs.ts` (`getSurahAyahs`, `getJuzSegments`, `getMushafPageRangeForSurah`, `getSurahsForMushafPage`, `getBismillahText`), not imported directly — that module is Node/`fs`-based and must not be imported into `'use client'` components. `lib/quran/editions.ts` lists the available Albanian translation editions for the `TranslationSwitcher`.
- `lib/data/suret/sq.json` (Albanian surah metadata from a different source) and other `lib/data/map/*.json` files beyond `juz-to-chapter-verse-mappings.json`/`faqe-to-sure.json` remain unwired scaffolding.
- `data/quran-pages.json` is generated output (see command above), not hand-edited.

**UI structure**
- `components/landing/` — homepage sections (Navbar, Footer, SurahsList, JuzList).
- `components/pages/` — full-page components rendered by route files (`SurahPage`, `JuzPage`, `PageNotFound`).
- `components/cards/` — presentational list items (`SurahCard`, `JuzCard`).
- `components/quran/` — the ayah-reading UI: `SurahHeader` (also used compactly per-segment in the juz view), `SurahReader`/`JuzReader` (`'use client'` — own the selected-translation state), `AyahRow`, `BismillahRow` (takes the Bismillah text as a prop from `getBismillahText()`, never hardcode it separately), `TranslationSwitcher`, `JumpToAyah`, `SurahJuzFooterNav`.
- Arabic script uses the `font-arabic` Tailwind class (Traditional Arabic/Scheherazade, configured in `tailwind.config.ts`) with `dir="rtl" lang="ar"` on ayah text; a separate `font-hand` family is used for stylized Albanian headings.
- Ant Design components are wrapped in `AntdRegistry` (`@ant-design/nextjs-registry`) in `app/layout.tsx` for SSR-compatible style injection — keep new pages under that provider rather than importing antd components outside it.

**Data source note:** ayah text/translations come from fawazahmed0/quran-api (Unlicense) rather than QuranHub — see `docs/plans/quran-structure-plan.md` for the full rationale and the residual translation-licensing caveat.

**Config notes**
- Path alias `@/*` resolves to the repo root (`tsconfig.json`).
- `GoogleAnalytics` reads `NEXT_PUBLIC_GA_TRACKING_ID` from the environment.
- `.npmrc` sets `legacy-peer-deps=true` — required because React is pinned to a 19 RC build.
