# Goal: Hard-copy Quran ↔ online reading tracker

We will produce a physical (printed) copy of the Quran with QR codes placed at the start and end of each surah, and on individual pages.

Scanning a QR code takes the reader straight to the matching page online (`/faqja/[id]` for a mushaf page, `/surja/[slug]` for a surah), so the physical book and the website are two entry points into the same reading experience.

The underlying goal is not just navigation — it's letting Muslims **track their Quran reading over time**. Concretely:

- A reader can save or "stop here" at a page/ayah they've reached, so they can resume later instead of losing their place.
- Reading progress persists across sessions (and ideally across scanning the physical book again later).
- Over time this becomes a personal reading history/progress tracker, not just a one-off bookmark.

## Implications for future work

- Every physical-page and per-surah URL that gets a QR code needs to already exist and be stable (`/faqja/[id]`, `/surja/[slug]` — don't change these URL shapes without accounting for printed codes pointing at them).
- The "save/stop" feature needs an identity mechanism that works for someone scanning a printed book, not just an existing logged-in web user — this is an open design question (device-based tracking vs. lightweight account) and should be resolved before building it, not assumed.
- QR codes should encode stable, canonical URLs (prefer the production domain, e.g. `https://el-furkan.al/...`) since they're printed and can't be edited after the book is published.

See [docs/todo.md](../../docs/todo.md) item 3 and [docs/plans/quran-structure-plan.md](../../docs/plans/quran-structure-plan.md) for the current data-structure gaps this depends on (ayah-level data doesn't exist yet, which the progress tracker will eventually need).
