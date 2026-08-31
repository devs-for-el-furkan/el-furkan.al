import React from 'react';
import { surahs } from '@/constants/surahs';
import PageNotFound from './PageNotFound';
import Link from 'next/link';
import { BetweenHorizonalEnd } from 'lucide-react';
import SurahHeader from '@/components/quran/SurahHeader';
import SurahTefsir from '@/components/quran/SurahTefsir';
import SurahReader from '@/components/quran/SurahReader';
import SurahJuzFooterNav from '@/components/quran/SurahJuzFooterNav';
import TranslationAttribution from '@/components/quran/TranslationAttribution';
import { getBismillahText, getBismillahTranslations, getMushafPageRangeForSurah, getSurahAyahs } from '@/lib/quran/getSurahAyahs';

type Props = {
	slug: string;
};

const SurahPage = ({ slug }: Props) => {
	const surah = surahs.find((s) => s.slug === slug);
	if (!surah) return <PageNotFound message={'Surah not found'} />;

	const { ayahs } = getSurahAyahs(surah.id);
	const mushafPageRange = getMushafPageRangeForSurah(Number(surah.id));

	return (
		<div id='surah-page' className='flex justify-center relative items-stretch flex-col gap-3 my-10 max-w-3xl mx-auto p-4'>
			<Link href={'/list-suret-e-kuranit'} className='absolute -top-3 left-4 flex justify-center items-center gap-2'>
				<BetweenHorizonalEnd />
				<p className='text-slate-700 font-semibold'>Lista e sureve</p>
			</Link>

			<SurahHeader surah={surah} mushafPageRange={mushafPageRange} />
			<SurahTefsir surah={surah} />
			<SurahReader surahNumber={Number(surah.id)} ayahs={ayahs} bismillahText={getBismillahText()} bismillahTranslations={getBismillahTranslations()} />
			<TranslationAttribution />
			<SurahJuzFooterNav mode='surah' currentOrder={surah.order} />
		</div>
	);
};

export default SurahPage;
