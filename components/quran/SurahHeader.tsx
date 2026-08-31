import Link from 'next/link';
import { BookOpen } from 'lucide-react';
import type { Sura } from '@/constants/surahs';

type Props = {
	surah: Sura;
	mushafPageRange?: { first: number; last: number } | null;
	compact?: boolean;
};

const SurahHeader = ({ surah, mushafPageRange, compact = false }: Props) => {
	if (compact) {
		return (
			<div className='flex justify-between items-center gap-3 py-3 border-b-2 border-emerald-600'>
				<Link href={`/surja/${surah.slug}`} className='hover:text-orange-500 transition'>
					<h2 className='text-xl font-semibold'>
						{surah.order}. Surja: {surah.nameAl}
					</h2>
				</Link>
				<p className='font-arabic text-2xl'>{surah.arabicName}</p>
			</div>
		);
	}

	return (
		<div className='flex flex-col gap-4 w-full'>
			<div className='flex flex-col md:flex-row justify-center items-center w-full md:w-fit gap-8 p-4 mx-auto'>
				<div className='p-2 border-2 border-emerald-600 bg-emerald-100/10 backdrop-blur-md shadow-xl rounded-full w-40 h-40 flex justify-center items-center'>
					<p className='text-[60px] font-arabic'>{surah.arabicName}</p>
				</div>

				<div className='flex flex-col justify-center items-center gap-1 w-full md:w-fit'>
					<h1 className='text-3xl font-semibold mb-2 text-center w-full md:w-fit'>
						{surah.order}. Surja: {surah.nameAl}
					</h1>

					<div className='flex flex-col md:flex-row gap-3 mb-1 w-full md:w-fit justify-start items-start'>
						<div className='flex flex-row gap-2 md:gap-1 md:flex-col justify-center items-center'>
							<p className='text-lg font-semibold'>Ajete</p>
							<p className='text-gray-900'>{surah.ayahs}</p>
						</div>
						<div className='py-1'>
							<div className='bg-gray-300 h-full w-0.5 rounded' />
						</div>
						<div className='flex flex-row gap-2 md:gap-1 md:flex-col justify-center items-center'>
							<p className='text-lg font-semibold'>Vendi i shpalljes</p>
							<p className='text-gray-900'>{surah.place}</p>
						</div>
						<div className='py-1'>
							<div className='bg-gray-300 h-full w-0.5 rounded' />
						</div>
						<div className='flex flex-row gap-2 md:gap-1 md:flex-col justify-center items-center'>
							<p className='text-lg font-semibold'>Rendi i shpalljes</p>
							<p className='text-gray-900'>{surah.revealOrder}</p>
						</div>
					</div>

					{mushafPageRange ? (
						<Link
							href={`/faqja/${String(mushafPageRange.first).padStart(3, '0')}`}
							className='flex items-center gap-1 text-sm text-gray-500 hover:text-orange-500 transition mt-1'
						>
							<BookOpen size={16} />
							Shiko në Mus&apos;haf: faqet {mushafPageRange.first}
							{mushafPageRange.last !== mushafPageRange.first ? `–${mushafPageRange.last}` : ''}
						</Link>
					) : null}

					<div className='bg-gray-300 rounded my-2 w-full h-0.5' />
				</div>
			</div>

			<div className='w-full h-0.5 rounded bg-gray-300' />

			<div className='flex flex-row gap-5 justify-center'>
				<div className='flex flex-col justify-center items-center'>
					<p className='text-lg font-semibold'>Fjalë</p>
					<p className='text-gray-900'>{surah.words}</p>
				</div>

				<div className='py-1'>
					<div className='bg-gray-300 h-full w-0.5 rounded' />
				</div>

				<div className='flex flex-col justify-center items-center'>
					<p className='text-lg font-semibold'>Sasia e Shkronjave</p>
					<p className='text-gray-900'>{surah.chars}</p>
				</div>
			</div>
		</div>
	);
};

export default SurahHeader;
