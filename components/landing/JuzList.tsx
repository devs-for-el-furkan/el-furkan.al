import Link from 'next/link';
import { surahs } from '@/constants/surahs';
import { getJuzSegments } from '@/lib/quran/getSurahAyahs';
import JuzCard from '../cards/JuzCard';

const TOTAL_JUZ = 30;

const surahNameByNumber = (surahNumber: number) => surahs.find((s) => Number(s.id) === surahNumber)?.nameAl ?? '';

const JuzList = () => {
	const juzNumbers = Array.from({ length: TOTAL_JUZ }, (_, i) => i + 1);

	return (
		<div className='max-w-7xl flex flex-col gap-4 px-4 md:px-6 w-full mt-4 md:mt-10 mb-10'>
			<h1 className='text-3xl text-center font-hand font-semibold'>Lista e Xhuzeve</h1>
			<hr />

			<div className='flex justify-center'>
				<Link href='/list-suret-e-kuranit' className='text-sm text-gray-600 hover:text-orange-500 transition'>
					Shiko sipas sureve
				</Link>
			</div>

			<div className='grid grid-cols-1 md:grid-cols-2 justify-items-center items-center lg:grid-cols-3 gap-3 md:gap-5'>
				{juzNumbers.map((nr) => {
					const segments = getJuzSegments(nr);
					const firstSurahName = surahNameByNumber(segments[0]?.surah);
					const lastSurahName = surahNameByNumber(segments[segments.length - 1]?.surah);

					return <JuzCard key={nr} nr={nr} firstSurahName={firstSurahName} lastSurahName={lastSurahName} />;
				})}
			</div>
		</div>
	);
};

export default JuzList;
