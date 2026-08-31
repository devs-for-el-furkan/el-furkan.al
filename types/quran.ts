export type Ayah = {
	surah: number;
	number: number;
	textAr: string;
	translations: Record<string, string>;
};

export type SurahAyahs = {
	surah: number;
	editions: {
		arabic: string;
		translations: string[];
	};
	ayahs: Ayah[];
};

export type JuzSegment = {
	surah: number;
	fromAyah: number;
	toAyah: number;
	ayahs: Ayah[];
};

export type TranslationOption = {
	id: string;
	label: string;
};

export type SearchResultAyah = {
	surah: number;
	number: number;
	slug: string;
	surahNameAl: string;
	textAr: string;
	translations: Record<string, string>;
};

export type SearchResponse = {
	results: SearchResultAyah[];
	total: number;
};
