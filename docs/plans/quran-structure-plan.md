# Plan: Finish the Quran data structure

Inspiration: [QUL — Quranic Universal Library](https://qul.tarteel.ai/resources), which ships (as downloadable SQLite/JSON) mushaf layouts, script variants (Uthmani/IndoPak/Madani), transliteration, translations + word-by-word, tafsir, morphology (roots/lemmas/stems), juz/hizb/rub/manzil metadata, topics/similar-ayahs, and audio timestamps. We don't need all of that — this app's value is Albanian-language reading + mushaf-page browsing, not a linguistics tool — but it's the reference for what a "complete" Quran dataset looks like and which IDs/keys to reuse so we don't invent an incompatible scheme.

Primary data source: **[fawazahmed0/quran-api](https://github.com/fawazahmed0/quran-api)** — see dedicated section below. It directly closes the biggest gap (Albanian ayah translation) that QUL alone did not solve, and does so with a much simpler licensing story than the QuranHub approach this plan originally proposed (superseded — see "Data source: fawazahmed0/quran-api" below).

## Current state

| Layer | Where | Status |
|---|---|---|
| Surah metadata (AL + AR names, counts, order) | `constants/surahs.ts` | Complete, hand-authored, live in routing/UI |
| Surah metadata (alt source) | `lib/data/suret/sq.json` | Complete but unused — overlaps `constants/surahs.ts` |
| Ayah text + Albanian translation | `lib/data/kuran/ajetet/*.json` | **Done** — all 114 surahs, synced from fawazahmed0/quran-api, 3 Albanian editions |
| Juz/hizb/page↔chapter maps | `lib/data/map/*.json` | `juz-to-chapter-verse-mappings.json` and `faqe-to-sure.json` wired in (`/xhuzi/[nr]`, mushaf cross-links); `hizb-to-chapter-mappings.json` still unused |
| Mushaf page images | `public/img/quran/*.jpg` + `data/quran-pages.json` | Complete, live (`/faqja/[id]`) |
| Per-ayah audio | `PlayQuran` component | Built, wired to a single hardcoded reciter/surah, commented out — still not addressed by fawazahmed0/quran-api (see below) |

The ayah-level text + Albanian translation gap that used to block this plan is closed. What's left is largely the audio/tafsir/morphology extras noted in step 7 below, which were always explicitly out of scope for the initial reading experience.

## Data source: fawazahmed0/quran-api (supersedes the original QuranHub choice)

This plan originally picked [misraj-ai/quranhub](https://github.com/misraj-ai/quranhub) as the data source, but that stalled on an unresolved translation-licensing question (QuranHub's Non-Commercial License, plus the underlying translators' own copyright — see the original "Open decision" text, preserved and revised below). The implementation instead used **[fawazahmed0/quran-api](https://github.com/fawazahmed0/quran-api)**:

- **Endpoint shape**: static, CDN-hosted JSON via jsDelivr, e.g. `https://cdn.jsdelivr.net/gh/fawazahmed0/quran-api@1/editions/{editionId}.min.json` returns the entire Quran for that edition as `{ quran: [{ chapter, verse, text }, ...] }`. No backend, no API key, no rate limits — a static snapshot fetched once at sync time, not a live service.
- **License: Unlicense** (public-domain-equivalent) on the API/aggregation itself. This is what actually unblocks the work compared to QuranHub's NCL.
- **Albanian editions used** (confirmed live via `editions.json`, keys use `sqi` — ISO 639-3 — not `sq`): `sqi-sherifahmeti` (Sherif Ahmeti), `sqi-hasanefendinahi` (Hasan Efendi Nahi), `sqi-fetimehdiu` (Feti Mehdiu) — the same three translators this plan originally wanted from QuranHub (`sq.ahmeti`/`sq.nahi`/`sq.mehdiu`). A fourth, lower-quality `sqi-unknown` edition exists and was deliberately skipped.
- **Arabic edition used**: `ara-quransimple`, not the Uthmani Hafs edition (`ara-quranuthmanihaf`) originally considered — that edition's own comments note it uses non-standard Unicode substitutions requiring specific Uthmani fonts, which this app's `font-arabic` stack (Traditional Arabic/Scheherazade) isn't built for. `ara-quransimple` renders correctly with the existing font stack. Tajweed coloring isn't needed from this source either way — it already lives in the Cloudinary mushaf-page images (`/faqja/[id]`).
- **No audio, word-by-word, or tafsir data** in this API — `PlayQuran`'s re-enablement and any future tafsir/morphology work (step 6–7 below) will need a different source.

### Integration approach (implemented as planned)

`scripts/generate-quran-ayahs.js` follows the existing `scripts/generate-quran-pages.js` pattern: pulls the whole-Quran JSON per edition (4 requests total: 1 Arabic + 3 Albanian, not per-surah/per-ayah), splits it into per-surah files locally in Node, and writes the committed result into `lib/data/kuran/ajetet/*.json`. Not a runtime fetch — this project stays 100% static generation with zero live external dependencies. Re-run manually (`node scripts/generate-quran-ayahs.js`) when a resync is needed.

One data-cleaning step the raw source needed: the Arabic text embeds the Bismillah literally at the start of every surah's Ayah 1 except Surah 1 (where Ayah 1 *is* the Bismillah) and Surah 9 (which has none). The sync script strips it out (derived dynamically from Surah 1 Ayah 1's own text, not hand-typed, to avoid a Unicode-normalization mismatch), so the UI can render it once as its own row (`BismillahRow`, `components/quran/BismillahRow.tsx`) instead of duplicating it inline.

## Steps

1. ~~Pick the ayah-level schema before writing any more data.~~ **Done.** Each ayah in `lib/data/kuran/ajetet/{id}.json` carries explicit `surah`/`number` fields (addressable as `surah:ayah` without remapping), `textAr`, and a `translations` map keyed by edition id (not a single string) so adding a 4th/5th translator later is a data change, not a schema change. `page`/`juz`/`hizb` are deliberately *not* duplicated per-ayah — they're derived on read from the existing `lib/data/map/*.json` files via `lib/quran/getSurahAyahs.ts`.

2. ~~Resolve the Albanian translation licensing question, then pick which edition(s) to use.~~ **Done** — see the revised "Open decision" below. All three standard translators (Ahmeti, Nahi, Mehdiu) shipped with a switcher (`TranslationSwitcher`) from day one.

3. ~~Build `scripts/generate-quran-ayahs.js`.~~ **Done** — see "Integration approach" above.

4. **Merge or retire `lib/data/suret/sq.json`.**
   Still open. It duplicates `constants/surahs.ts`. Either fold any fields it has that `constants/surahs.ts` lacks into that file, or delete it — don't maintain two surah-metadata sources.

5. ~~Wire the juz/hizb/page maps into the UI.~~ **Mostly done.** `/xhuzi/[nr]` (juz reading view) and `/lista-e-xhuzeve` (index) use `juz-to-chapter-verse-mappings.json`; `/surja/[slug]` ↔ `/faqja/[id]` cross-link using `faqe-to-sure.json`. `hizb-to-chapter-mappings.json` is still unused — no hizb-level UI exists yet, not currently planned.

6. **Re-enable `PlayQuran`** once a per-ayah audio+timing data source is picked (fawazahmed0/quran-api doesn't have one) — replacing the current hardcoded single-reciter URL and stub `playAyah(10, 4)` call with real per-ayah boundaries. Still open.

7. **Tafsir, word-by-word, or morphology data** — still out of scope; revisit only if a future need arises. Not provided by fawazahmed0/quran-api either, so this would need its own source (e.g. QuranHub, for these specific extras, once/if the NCL question is worth resolving just for them).

## Open decision for the user (revised, not resolved)

**Translation licensing is much lower-risk with fawazahmed0/quran-api, but not zero-risk.** The API's own Unlicense covers the aggregator/API layer, and its Albanian translations are sourced via tanzil.net, whose own hosting terms are presumably why this aggregator can redistribute them under Unlicense at all — this is a meaningfully safer position than the original QuranHub NCL blocker. But the underlying translations (Ahmeti, Nahi, Mehdiu) are still, originally, copyrighted works of named translators — fawazahmed0's Unlicense declaration doesn't erase that at the source. Recommended mitigation, not a hard requirement: add a short attribution line in the UI as good practice. **Done** — `components/quran/TranslationAttribution.tsx` renders "Përkthimi: Sherif Ahmeti / Hasan Efendi Nahi / Feti Mehdiu — burimi: tanzil.net via fawazahmed0/quran-api" at the bottom of both `/surja/[slug]` and `/xhuzi/[nr]`.
