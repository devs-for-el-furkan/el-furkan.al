import SurahPage from '@/components/pages/SurahPage';
import { surahs } from '@/constants/surahs';
import { Metadata } from 'next';
import React from 'react';

export async function generateMetadata({ params }: any): Promise<Metadata> {
	const { slug } = await params;
	const surah = surahs.find((s) => s.slug === slug);

	return {
		title: surah ? `Surja ${surah.nameAl} (${surah.name}) - Kurani Fisnik` : `Surja ${slug} - Kurani Fisnik`,
		description: surah
			? `Lexo suren ${surah.nameAl} (${surah.name}) në arabisht dhe shqip, ajet për ajet.`
			: `This is the Quran ${slug}.`,
	};
}

export async function generateStaticParams() {
	return surahs.map((s) => ({
		slug: s.slug,
	}));
}
const page = async ({ params }: any): Promise<any> => {
	const { slug } = await params;

	return <SurahPage slug={slug} />;
};

export default page;
