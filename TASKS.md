# Tasks

## In Progress
- [ ] Fix `tw-animate-css` / shadcn "Module not found" build error in `app/globals.css` @high #frontend

## Blocked

## Backlog
- [ ] Rotate exposed Cloudinary API key/secret in `scripts/rename.js` (committed to git history) @high #security
- [ ] Remove `console.log` debug statements in `components/pages/SurahPage.tsx` / `app/faqja/_components/PlayQuran.tsx` @low #cleanup
- [ ] Decide dark mode scope or remove the `{/* TODO ? dark mode */}` marker in `app/layout.tsx` @low #frontend
- [ ] Replace `params: any` with generated `PageProps` types in `app/surja/[slug]/page.tsx` / `app/faqja/[id]/page.tsx` @low #frontend
- [ ] Wire `lib/data/map/hizb-to-chapter-mappings.json` into UI (no hizb-level route yet) @low #backend
- [ ] Merge or retire `lib/data/suret/sq.json` (duplicates `constants/surahs.ts`) @low #backend
- [ ] Re-enable `PlayQuran` with real per-ayah audio/timing data @med #frontend
- [ ] Add word-by-word/morphology data @low #backend
- [ ] Add footnotes on ayah translations (new `footnote` content type mirroring `tefsir`) @low #backend
- [ ] Design reading-progress data model for the QR hard-copy tracker @med #backend
- [ ] Decide auth/identity approach for QR reading-progress tracking @med #backend
- [ ] Design "save/stop here" UI on reading pages @med #frontend
- [ ] Plan physical print production for QR codes @low #other
- [ ] Resolve `package.json` name/version drift (`0.1.0` vs `public/changelog.json`'s `0.3.0`) @low #other

## Done
- [x] Sync Arabic + Albanian ayah text from fawazahmed0/quran-api for all 114 surahs #backend
- [x] Add global translation-switcher state (zustand), default Hasan Efendi Nahi #frontend
- [x] Fix `generateStaticParams` bug on `/surja/[slug]` (was keying by display name, not slug) #frontend
