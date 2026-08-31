import fs from 'fs';
import path from 'path';
import { surahs } from '@/constants/surahs';
import type { Ayah, JuzSegment, SurahAyahs } from '@/types/quran';
import juzToChapterVerseMappings from '@/lib/data/map/juz-to-chapter-verse-mappings.json';
import faqeToSure from '@/lib/data/map/faqe-to-sure.json';

const AJETET_DIR = path.join(process.cwd(), 'lib/data/kuran/ajetet');

export function getSurahAyahs(surahId: string): SurahAyahs {
	const filePath = path.join(AJETET_DIR, `${surahId}.json`);
	const raw = fs.readFileSync(filePath, 'utf-8');
	return JSON.parse(raw) as SurahAyahs;
}

export function getAyahRef(surah: number, ayah: number): string {
	return `${surah}:${ayah}`;
}

// Surah 1 Ayah 1 IS the Bismillah — reuse it as the single source of truth
// for the standalone Bismillah row, instead of a second hand-typed literal
// that could drift from the exact combining-character sequence in the data.
export function getBismillahText(): string {
	return getSurahAyahs('001').ayahs[0].textAr;
}

// Surah 1 Ayah 1 IS the Bismillah, so its own translations map already holds
// real Albanian translations of it — reused here rather than a second source.
export function getBismillahTranslations(): Record<string, string> {
	return getSurahAyahs('001').ayahs[0].translations;
}

// Slices each juz's surah segments straight out of the already-synced
// per-surah ayah files using the existing juz↔chapter-verse range map —
// no separate juz data source needed.
export function getJuzSegments(juzNr: number): JuzSegment[] {
	const ranges = (juzToChapterVerseMappings as Record<string, Record<string, string>>)[String(juzNr)];
	if (!ranges) return [];

	return Object.entries(ranges).map(([surahNumberStr, range]) => {
		const surahNumber = Number(surahNumberStr);
		const [fromAyah, toAyah] = range.split('-').map(Number);
		const surahId = String(surahNumber).padStart(3, '0');
		const { ayahs } = getSurahAyahs(surahId);

		return {
			surah: surahNumber,
			fromAyah,
			toAyah,
			ayahs: ayahs.filter((a) => a.number >= fromAyah && a.number <= toAyah),
		};
	});
}

export function getMushafPageRangeForSurah(surahNumber: number): { first: number; last: number } | null {
	const map = faqeToSure as Record<string, string[]>;
	let first: number | null = null;
	let last: number | null = null;

	for (const [pageStr, surahIds] of Object.entries(map)) {
		if (!surahIds.includes(String(surahNumber))) continue;
		const page = Number(pageStr);
		if (first === null || page < first) first = page;
		if (last === null || page > last) last = page;
	}

	return first !== null && last !== null ? { first, last } : null;
}

export function getSurahsForMushafPage(pageNumber: number) {
	const map = faqeToSure as Record<string, string[]>;
	const surahIds = map[String(pageNumber)] ?? [];
	return surahs.filter((s) => surahIds.includes(String(Number(s.id))));
}

export function getAyahByNumber(surahAyahs: SurahAyahs, ayahNumber: number): Ayah | undefined {
	return surahAyahs.ayahs.find((a) => a.number === ayahNumber);
}
