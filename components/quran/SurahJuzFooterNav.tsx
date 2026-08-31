import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { surahs } from '@/constants/surahs';

type SurahNavProps = {
	mode: 'surah';
	currentOrder: number;
};

type JuzNavProps = {
	mode: 'juz';
	currentJuz: number;
};

type Props = SurahNavProps | JuzNavProps;

const TOTAL_JUZ = 30;

const SurahJuzFooterNav = (props: Props) => {
	if (props.mode === 'surah') {
		const prev = surahs.find((s) => s.order === props.currentOrder - 1);
		const next = surahs.find((s) => s.order === props.currentOrder + 1);

		return (
			<div className='flex justify-between items-center w-full py-6'>
				{prev ? (
					<Link href={`/surja/${prev.slug}`} className='flex items-center gap-1 text-emerald-700 hover:text-orange-500 transition'>
						<ChevronLeft size={18} />
						{prev.nameAl}
					</Link>
				) : (
					<span />
				)}
				{next ? (
					<Link href={`/surja/${next.slug}`} className='flex items-center gap-1 text-emerald-700 hover:text-orange-500 transition'>
						{next.nameAl}
						<ChevronRight size={18} />
					</Link>
				) : (
					<span />
				)}
			</div>
		);
	}

	const prevJuz = props.currentJuz > 1 ? props.currentJuz - 1 : null;
	const nextJuz = props.currentJuz < TOTAL_JUZ ? props.currentJuz + 1 : null;

	return (
		<div className='flex justify-between items-center w-full py-6'>
			{prevJuz ? (
				<Link href={`/xhuzi/${prevJuz}`} className='flex items-center gap-1 text-emerald-700 hover:text-orange-500 transition'>
					<ChevronLeft size={18} />
					Xhuzi {prevJuz}
				</Link>
			) : (
				<span />
			)}
			{nextJuz ? (
				<Link href={`/xhuzi/${nextJuz}`} className='flex items-center gap-1 text-emerald-700 hover:text-orange-500 transition'>
					Xhuzi {nextJuz}
					<ChevronRight size={18} />
				</Link>
			) : (
				<span />
			)}
		</div>
	);
};

export default SurahJuzFooterNav;
