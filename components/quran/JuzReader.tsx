'use client';

import AyahRow from './AyahRow';
import BismillahRow from './BismillahRow';
import SurahHeader from './SurahHeader';
import TranslationSwitcher from './TranslationSwitcher';
import { surahs } from '@/constants/surahs';
import type { JuzSegment } from '@/types/quran';

type Props = {
	segments: JuzSegment[];
	bismillahText: string;
	bismillahTranslations: Record<string, string>;
};

const JuzReader = ({ segments, bismillahText, bismillahTranslations }: Props) => {
	return (
		<div className='flex flex-col w-full'>
			<div className='flex justify-center py-4'>
				<TranslationSwitcher />
			</div>

			{segments.map((segment) => {
				const surah = surahs.find((s) => Number(s.id) === segment.surah);
				if (!surah) return null;
				const showBismillah = segment.fromAyah === 1 && segment.surah !== 1 && segment.surah !== 9;

				return (
					<div key={segment.surah} className='flex flex-col'>
						<SurahHeader surah={surah} compact />
						{showBismillah ? <BismillahRow text={bismillahText} translations={bismillahTranslations} /> : null}
						{segment.ayahs.map((ayah) => (
							<AyahRow key={`${segment.surah}-${ayah.number}`} ayah={ayah} />
						))}
					</div>
				);
			})}
		</div>
	);
};

export default JuzReader;
