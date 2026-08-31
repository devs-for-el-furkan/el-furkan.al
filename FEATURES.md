# Features

## Building
- [~] shadcn/ui design-system migration <!-- id:shadcn-migration since:2026-08-31 -->
  Partial shadcn/ui + `tw-animate-css` setup in `app/globals.css`/`components.json`/`package.json`; currently broken (unresolved module-resolution build error).

## Planned
- [ ] Launch MVP to production <!-- id:mvp-launch -->
  Ship the current feature set (surah/juz reading, mushaf viewer, resources page) live at el-furkan.al.
- [ ] Tafsir/commentary + related posts on el-furkan-al-web <!-- id:tefsir-frontend -->
  Backend content model + Albanian tafsir data already synced in the shared `cms-ihsan-strapi` Strapi backend; not yet wired into this site's frontend.
- [ ] Ayah/surah search <!-- id:quran-search -->
  Search across ayah text, translations, and surah names.
- [ ] Hatme tracking via ihsan.al <!-- id:hatme-tracking -->
  Arabic + Albanian reading progress tracked in sync with ihsan.al's hatme feature.
- [ ] Hard-copy QR code reading tracker <!-- id:qr-reading-tracker -->
  Printed mushaf QR codes link to `/faqja/[id]`/`/surja/[slug]`; readers can save their place and track reading progress over time.
- [ ] Re-enable `PlayQuran` per-ayah audio playback <!-- id:playquran-audio -->
  Component exists but is commented out, hardcoded to one reciter/page with stub timing.
- [ ] Word-by-word / morphology data <!-- id:word-by-word -->
- [ ] Footnotes on ayah translations <!-- id:ayah-footnotes -->
  Quran.com-style superscript footnotes; no structured footnote data source currently available.

## Shipped
- [x] Surah index & browsing <!-- id:surah-index shipped:2025-03-20 -->
  `/list-suret-e-kuranit`, sortable by Quran order or chronological reveal order.
- [x] Ayah-by-ayah surah reading (Arabic + Albanian translations) <!-- id:surah-reading -->
  `/surja/[slug]`; multi-edition translator switcher (Sherif Ahmeti, Hasan Efendi Nahi, Feti Mehdiu).
- [x] Juz reading view & index <!-- id:juz-reading -->
  `/xhuzi/[nr]` and `/lista-e-xhuzeve`.
- [x] Mushaf page image viewer <!-- id:mushaf-viewer shipped:2026-08-12 -->
  `/faqja/[id]`, all 604 pages, with jump-to-page navigation.
- [x] Resources page <!-- id:resources-page -->
  `/burimet`, per-surah theme/message excerpts.
