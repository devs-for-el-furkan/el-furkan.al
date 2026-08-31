# Project TODO

## 1. Finish the Quran data structure
Inspiration: [QUL — Quranic Universal Library](https://qul.tarteel.ai/resources) (mushaf layouts, Uthmani/IndoPak/Madani script, translations, word-by-word, tafsir, morphology, juz/hizb/rub/manzil metadata, topics, audio timestamps — all downloadable as SQLite/JSON).

Data source: **[fawazahmed0/quran-api](https://github.com/fawazahmed0/quran-api)** (Unlicense, static CDN-hosted JSON) — supersedes the originally-planned QuranHub, whose Non-Commercial License + translator copyright question stalled this item. See [docs/plans/quran-structure-plan.md](./plans/quran-structure-plan.md) for the full rationale and the revised (lower-risk, not zero-risk) licensing note.

Ayah-level text + 3 Albanian translations (Sherif Ahmeti, Hasan Efendi Nahi, Feti Mehdiu) are now synced for all 114 surahs and live at `/surja/[slug]` and the new `/xhuzi/[nr]` (juz) route. `constants/surahs.ts` remains the surah-metadata source. `lib/data/suret/sq.json` is still unused/unmerged scaffolding.

- [x] Decide the target ayah-level schema — each ayah keyed by explicit `surah`+`number`, `translations` as an edition-id map (not a single string), no per-ayah `page`/`juz`/`hizb` duplication (derived on read from `lib/data/map/*.json` instead)
- [x] Resolve translation licensing enough to proceed — Unlicense API layer + tanzil.net-sourced text is a much safer position than the QuranHub NCL blocker; added a UI attribution line (`components/quran/TranslationAttribution.tsx`) as the recommended mitigation for the residual translator-copyright question
- [x] Pick Albanian editions — `sqi-sherifahmeti`, `sqi-hasanefendinahi`, `sqi-fetimehdiu`, shipped with a translator switcher from day one
- [x] Build `scripts/generate-quran-ayahs.js` (mirrors `scripts/generate-quran-pages.js`) — pulls from fawazahmed0/quran-api, backfills `lib/data/kuran/ajetet/*.json` for all 114 surahs
- [x] Wire `lib/data/map/juz-to-chapter-verse-mappings.json` (→ `/xhuzi/[nr]`) and `lib/data/map/faqe-to-sure.json` (→ `/surja/[slug]` ↔ `/faqja/[id]` cross-links) into actual routes/UI
- [ ] `lib/data/map/hizb-to-chapter-mappings.json` still unwired — no hizb-level UI planned yet
- [ ] Merge or retire `lib/data/suret/sq.json` (duplicates `constants/surahs.ts`)
- [ ] Re-enable and finish `PlayQuran` using real audio/timing data (currently commented out in `app/faqja/[id]/page.tsx`, hardcoded to a single reciter/stub timing) — fawazahmed0/quran-api has no audio data, so this still needs its own source
- [ ] Word-by-word/morphology — still out of scope, not provided by fawazahmed0/quran-api either
- [x] Tafsir — no longer blocked on fawazahmed0/quran-api (it has none); a `tefsir` content type now exists in the shared `cms-ihsan-strapi` Strapi backend, synced from QuranHub's Albanian `sq.saddi` (Tafsir al-Saadi) edition (5,604 rows across all 114 surahs). Not yet wired into el-furkan-al-web's frontend — that's a separate, not-yet-scoped pass. Same QuranHub Non-Commercial-License caveat applies as elsewhere in this doc.
- [ ] Footnotes on ayah translations (quran.com-style: superscript marker → expandable panel) — investigated and skipped for MVP. fawazahmed0/quran-api has no structured footnote data for any edition (flat `{chapter,verse,text}` shape); the closest real-world source, Saheeh International, isn't in that dataset at all. The clarifying content mostly already reaches readers today as inline parentheticals baked into the translation text itself (`sqi-sherifahmeti`: 46% of ayahs, `sqi-hasanefendinahi`: 49%, `sqi-fetimehdiu`: 7%) — just not as a separate clickable footnote. If revisited later, the lowest-risk path is a new `footnote` content type in `cms-ihsan-strapi` mirroring `tefsir` (`ayahRef` + `markerText` + `body`, manually authored), not auto-parsing the parentheses out of existing translations.

## 2. Plan for #1
Done — see [docs/plans/quran-structure-plan.md](./plans/quran-structure-plan.md).

## 3. Hard-copy QR code reading tracker
Goal description lives in [.claude/rules/goals.md](../.claude/rules/goals.md) (physical mushaf gets QR codes per surah/page; scanning opens the matching online page; users can save/bookmark progress and track their reading over time).

- [ ] Design the reading-progress data model (per-user or per-device: last read ayah/page, saved bookmarks, streak/history)
- [ ] Decide auth/identity approach for tracking without requiring a full account (device id? optional login?)
- [ ] Define the QR code target URL scheme (e.g. `/faqja/[id]` and `/surja/[slug]` already exist as scan targets)
- [ ] Design the "save/stop here" UI on the reading pages
- [ ] Plan physical print production (QR generation per page/surah, placement on hard-copy layout)

## 4. Suggestions list
See [docs/suggestions/](./suggestions/).

## 5. codewithkoli.com public metadata
Done for this pass — see summary in the conversation. Updated `public/tools.json` and `public/changelog.json`. A few fields are flagged as needing your confirmation rather than guessed (production status/URL, your role, repo visibility) — see the flagged items in the chat summary before treating those files as final.
