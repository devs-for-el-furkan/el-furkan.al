# Suggestions

Observations from reviewing the current codebase — not committed to, just worth a decision.

## Security
- `scripts/rename.js` has a live Cloudinary `api_key`/`api_secret` hardcoded and committed to git. It should read from `.env` (already used correctly in `.env` itself) and the exposed key/secret should be rotated in the Cloudinary dashboard, since they're in git history even after removal.

## Product / content
- `README.md` calls the project "LexoKuran.al", `app/layout.tsx` metadata says "El-Furkan.al", and the landing page (`components/landing/index.tsx`) still shows "vjen se shpejti" (coming soon). Worth deciding on one public name before the codewithkoli.com listing or any marketing goes out.
- `components/landing/Footer.tsx` is an empty placeholder (`<div className='w-full h-24'></div>`) — no links, no attribution, no contact.
- The `Settings` icon in `Navbar.tsx` doesn't link anywhere yet.
- `lib/data/suret/sq.json` duplicates surah metadata already in `constants/surahs.ts` — pick one source (see [docs/plans/quran-structure-plan.md](../plans/quran-structure-plan.md)).
- [QuranHub](https://github.com/misraj-ai/quranhub) has confirmed Albanian translation editions (`sq.ahmeti`, `sq.nahi`, `sq.mehdiu`) that would close the ayah-translation gap — but it's published under a Non-Commercial License, and the translations themselves are copyrighted works of named translators/publishers independent of QuranHub's own terms. Get this cleared (see the plan's "Open decision") before syncing any of that text into the repo, especially given el-furkan.al's public/commercial-adjacent goals.

## Code quality
- Several `console.log` debug statements left in shipped components (`components/pages/SurahPage.tsx`, `app/faqja/_components/PlayQuran.tsx`).
- `app/layout.tsx` has a standing `{/* TODO ? dark mode */}` comment — decide whether dark mode is in scope or remove the marker.
- Route handlers (`app/surja/[slug]/page.tsx`, `app/faqja/[id]/page.tsx`) type `params` as `any` — `eslint` allows this (`no-explicit-any` is off) but Next 15's generated `PageProps` types could replace the `any` casts now that params are awaited correctly.
- `PlayQuran` is fully built but disconnected: hardcoded to "Surah Al-Fatiha", a single reciter, and a stub `playAyah(10, 4)` call — needs real per-ayah timing data before it can be re-enabled (tracked in the Quran-structure plan).

## Not yet decided
- No analytics beyond `NEXT_PUBLIC_GA_TRACKING_ID` (Google Analytics) — fine for now, just noting nothing else is wired in.
- No test framework configured — not necessarily needed yet given the project's current size, but worth revisiting once the ayah-data layer and reading-tracker (goals.md) land, since those will have real logic to break.
