import Link from 'next/link';
import type { Sura } from '@/constants/surahs';

type Props = {
	surah: Sura;
};

const SurahTefsir = ({ surah }: Props) => {
	if (!surah.theme && !surah.keyMessage) return null;

	return (
		<div className='flex flex-col gap-3 border border-emerald-600/30 bg-emerald-50/40 rounded-xl p-4'>
			{surah.theme ? (
				<div>
					<p className='text-sm font-semibold text-emerald-800'>Tema kryesore</p>
					<p className='text-gray-700'>{surah.theme}</p>
				</div>
			) : null}

			{surah.keyMessage ? (
				<div>
					<p className='text-sm font-semibold text-emerald-800'>Mesazhi kryesor</p>
					<p className='text-gray-700 italic'>{surah.keyMessage}</p>
				</div>
			) : null}

			<Link href='/burimet' className='text-xs text-gray-400 hover:text-orange-500 transition self-start'>
				Shiko burimet e përdorura →
			</Link>
		</div>
	);
};

export default SurahTefsir;
