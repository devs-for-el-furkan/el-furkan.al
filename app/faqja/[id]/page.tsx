/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';
import { BookOpenText } from 'lucide-react';
import Pagination from '../_components/Pagination';
import { getSurahsForMushafPage } from '@/lib/quran/getSurahAyahs';
// import PlayQuran from '../_components/PlayQuran';

// Define metadata dynamically for each page
export async function generateMetadata({ params }: any): Promise<Metadata> {
	const { id } = params; // ✅ Removed unnecessary await

	return {
		title: `Faqja ${id} - Lexo Kuran`,
		description: `This is the Quran page number ${id}.`,
	};
}

export async function generateStaticParams() {
	return Array.from({ length: 604 }, (_, i) => ({
		id: String(i + 1).padStart(3, '0'), // Converts 1 → '001', 2 → '002', ..., 604 → '604'
	}));
}

const QuranPage = async ({ params }: any): Promise<any> => {
	const { id } = await params;
	const surahsOnPage = getSurahsForMushafPage(Number(id));

	return (
		<div className='flex flex-col justify-center items-center max-w-7xl gap-4 mx-auto px-4 my-4 md:my-10'>
			<h1>Quran page - {id}</h1>
			{surahsOnPage.length > 0 ? (
				<div className='flex flex-wrap justify-center gap-3'>
					{surahsOnPage.map((surah) => (
						<Link
							key={surah.slug}
							href={`/surja/${surah.slug}`}
							className='flex items-center gap-1 text-sm text-gray-500 hover:text-orange-500 transition'
						>
							<BookOpenText size={16} />
							Lexo tekstin: {surah.nameAl}
						</Link>
					))}
				</div>
			) : null}
			{/* <PlayQuran id={id} /> */}
			<div className='px-3 md:px-6'>
				<Image
					src={`/img/quran/${id}.jpg`}
					alt='quran page'
					width={700}
					height={1100}
					className='bg-cover w-full h-full md:w-[700px] md:h-[1100px]'
					placeholder='blur'
					blurDataURL='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR4AWPg5+gHAAHhAqwXIOFgAAAAAElFTkSuQmCC'
				/>
			</div>

			<Pagination currentPage={Number(id)} />

			<div className='overflow-hidden relative'>
				<Image src={`/img/page-under-construction.png`} alt='' width={500} height={700} />
			</div>
		</div>
	);
};

export default QuranPage;
