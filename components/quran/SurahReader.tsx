'use client';

import { useEffect } from 'react';
import AyahRow from './AyahRow';
import BismillahRow from './BismillahRow';
import TranslationSwitcher from './TranslationSwitcher';
import JumpToAyah from './JumpToAyah';
import type { Ayah } from '@/types/quran';

type Props = {
	surahNumber: number;
	ayahs: Ayah[];
	bismillahText: string;
	bismillahTranslations: Record<string, string>;
};

// Surah 1's Ayah 1 IS the Bismillah (rendered inline as the first ayah),
// and Surah 9 has none — every other surah gets it rendered once, up top,
// since the sync script already stripped it out of each surah's Ayah 1 text.
const SurahReader = ({ surahNumber, ayahs, bismillahText, bismillahTranslations }: Props) => {
	const showBismillah = surahNumber !== 1 && surahNumber !== 9;

	useEffect(() => {
		if (!window.location.hash) return;
		const target = document.getElementById(window.location.hash.slice(1));
		target?.scrollIntoView();
	}, []);

	return (
		<div className='flex flex-col w-full'>
			<div className='flex flex-col md:flex-row justify-between items-center gap-3 py-4'>
				<TranslationSwitcher />
				<JumpToAyah maxAyah={ayahs.length} />
			</div>

			{showBismillah ? <BismillahRow text={bismillahText} translations={bismillahTranslations} /> : null}

			<div>
				{ayahs.map((ayah) => (
					<AyahRow key={ayah.number} ayah={ayah} />
				))}
			</div>
		</div>
	);
};

export default SurahReader;
