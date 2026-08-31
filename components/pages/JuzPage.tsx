import PageNotFound from './PageNotFound';
import Link from 'next/link';
import { BetweenHorizonalEnd } from 'lucide-react';
import JuzReader from '@/components/quran/JuzReader';
import SurahJuzFooterNav from '@/components/quran/SurahJuzFooterNav';
import TranslationAttribution from '@/components/quran/TranslationAttribution';
import { getBismillahText, getBismillahTranslations, getJuzSegments } from '@/lib/quran/getSurahAyahs';

type Props = {
	nr: number;
};

const JuzPage = ({ nr }: Props) => {
	if (!Number.isInteger(nr) || nr < 1 || nr > 30) return <PageNotFound message={'Xhuzi nuk u gjet'} />;

	const segments = getJuzSegments(nr);
	if (segments.length === 0) return <PageNotFound message={'Xhuzi nuk u gjet'} />;

	return (
		<div id='juz-page' className='flex justify-center relative items-stretch flex-col gap-3 my-10 max-w-3xl mx-auto p-4'>
			<Link href={'/lista-e-xhuzeve'} className='absolute -top-3 left-4 flex justify-center items-center gap-2'>
				<BetweenHorizonalEnd />
				<p className='text-slate-700 font-semibold'>Lista e xhuzeve</p>
			</Link>

			<h1 className='text-3xl font-semibold text-center mt-6'>Xhuzi {nr}</h1>

			<JuzReader segments={segments} bismillahText={getBismillahText()} bismillahTranslations={getBismillahTranslations()} />
			<TranslationAttribution />
			<SurahJuzFooterNav mode='juz' currentJuz={nr} />
		</div>
	);
};

export default JuzPage;
