import Link from 'next/link';

type Props = {
	nr: number;
	firstSurahName: string;
	lastSurahName: string;
};

const JuzCard = ({ nr, firstSurahName, lastSurahName }: Props) => {
	return (
		<Link
			href={`/xhuzi/${nr}`}
			className='border-2 flex justify-between items-center group rounded-lg w-full px-4 md:px-1 lg:px-3 py-2 hover:bg-orange-50 md:w-[330px] lg:w-[400px] hover:border-orange-200 shadow-md hover:shadow-orange-200 hover:scale-105 relative'
		>
			<div className='flex gap-3 justify-start items-center'>
				<div className='relative'>
					<div className='border-4 rounded-lg rotate-45 w-9 h-9 group-hover:border-orange-400 group-hover:bg-orange-400' />
					<div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-sm group-hover:text-white font-semibold'>{nr}</div>
				</div>
				<div className='flex flex-col justify-start'>
					<p className='font-bold text-base leading-8'>Xhuzi {nr}</p>
					<p className='font-semibold text-sm text-gray-600'>
						{firstSurahName === lastSurahName ? firstSurahName : `${firstSurahName} – ${lastSurahName}`}
					</p>
				</div>
			</div>
		</Link>
	);
};

export default JuzCard;
