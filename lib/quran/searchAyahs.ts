'use server';

import { surahs } from '@/constants/surahs';
import { getSurahAyahs } from './getSurahAyahs';
import type { SearchResponse, SearchResultAyah } from '@/types/quran';

let index: SearchResultAyah[] | null = null;

function getIndex(): SearchResultAyah[] {
	if (index) return index;

	const flat: SearchResultAyah[] = [];
	for (const surah of surahs) {
		const { ayahs } = getSurahAyahs(surah.id);
		for (const ayah of ayahs) {
			flat.push({
				surah: ayah.surah,
				number: ayah.number,
				slug: surah.slug,
				surahNameAl: surah.nameAl,
				textAr: ayah.textAr,
				translations: ayah.translations,
			});
		}
	}

	index = flat;
	return flat;
}

export async function searchAyahs(query: string, page: number, pageSize: number): Promise<SearchResponse> {
	const needle = query.trim().toLowerCase();
	if (!needle) return { results: [], total: 0 };

	const matches = getIndex().filter((ayah) =>
		Object.values(ayah.translations).some((text) => text.toLowerCase().includes(needle))
	);

	const start = (page - 1) * pageSize;
	return {
		results: matches.slice(start, start + pageSize),
		total: matches.length,
	};
}
