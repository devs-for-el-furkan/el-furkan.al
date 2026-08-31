import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Pinned to the @1 tag so re-running this script later can't silently pull
// in upstream changes — bump deliberately if a resync is ever needed.
const CDN_BASE = 'https://cdn.jsdelivr.net/gh/fawazahmed0/quran-api@1/editions';

const ARABIC_EDITION = 'ara-quransimple';
const TRANSLATION_EDITIONS = ['sqi-sherifahmeti', 'sqi-hasanefendinahi', 'sqi-fetimehdiu'];

const TOTAL_SURAHS = 114;

async function fetchEdition(editionId) {
	const url = `${CDN_BASE}/${editionId}.min.json`;
	const res = await fetch(url);
	if (!res.ok) {
		throw new Error(`Failed to fetch ${editionId}: ${res.status} ${res.statusText}`);
	}
	const data = await res.json();
	return data.quran;
}

// Map<surahNumber, Map<verseNumber, text>>
function groupBySurah(ayahs) {
	const bySurah = new Map();
	for (const { chapter, verse, text } of ayahs) {
		if (!bySurah.has(chapter)) bySurah.set(chapter, new Map());
		bySurah.get(chapter).set(verse, text);
	}
	return bySurah;
}

function stripBismillah(text, surahNumber, verseNumber, bismillah) {
	if (verseNumber !== 1 || surahNumber === 1 || surahNumber === 9) return text;
	const prefix = `${bismillah} `;
	if (!text.startsWith(prefix)) {
		throw new Error(
			`Surah ${surahNumber} ayah 1 does not start with the expected Bismillah prefix: "${text}"`
		);
	}
	return text.slice(prefix.length);
}

async function main() {
	console.log(`Fetching Arabic edition: ${ARABIC_EDITION}`);
	const arabicBySurah = groupBySurah(await fetchEdition(ARABIC_EDITION));
	// Derived from the source data itself (Surah 1 Ayah 1 IS the Bismillah)
	// rather than hand-typed, so the prefix match below can't drift from the
	// exact combining-character sequence the API actually uses.
	const bismillah = arabicBySurah.get(1).get(1);

	const translationsBySurah = new Map();
	for (const editionId of TRANSLATION_EDITIONS) {
		console.log(`Fetching translation edition: ${editionId}`);
		translationsBySurah.set(editionId, groupBySurah(await fetchEdition(editionId)));
	}

	const outDir = path.join(__dirname, '../lib/data/kuran/ajetet');
	fs.mkdirSync(outDir, { recursive: true });

	for (let surahNumber = 1; surahNumber <= TOTAL_SURAHS; surahNumber++) {
		const arabicVerses = arabicBySurah.get(surahNumber);
		if (!arabicVerses) {
			throw new Error(`Missing Arabic verses for surah ${surahNumber} in ${ARABIC_EDITION}`);
		}

		const verseNumbers = [...arabicVerses.keys()].sort((a, b) => a - b);

		const ayahs = verseNumbers.map((verseNumber) => {
			const translations = {};
			for (const editionId of TRANSLATION_EDITIONS) {
				const text = translationsBySurah.get(editionId).get(surahNumber)?.get(verseNumber);
				if (!text) {
					throw new Error(`Missing ${editionId} text for ${surahNumber}:${verseNumber}`);
				}
				translations[editionId] = text;
			}

			return {
				surah: surahNumber,
				number: verseNumber,
				textAr: stripBismillah(arabicVerses.get(verseNumber), surahNumber, verseNumber, bismillah),
				translations,
			};
		});

		const output = {
			surah: surahNumber,
			editions: {
				arabic: ARABIC_EDITION,
				translations: TRANSLATION_EDITIONS,
			},
			ayahs,
		};

		const surahIdString = String(surahNumber).padStart(3, '0');
		fs.writeFileSync(
			path.join(outDir, `${surahIdString}.json`),
			JSON.stringify(output, null, 2),
			'utf-8'
		);
	}

	console.log(`Generated ${TOTAL_SURAHS} surah ayah files → ${outDir}`);
}

main().catch((err) => {
	console.error(err);
	process.exit(1);
});
