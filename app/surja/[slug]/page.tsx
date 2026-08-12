import SurahPage from '@/components/pages/SurahPage';
import { surahs } from '@/constants/surahs';
import { Metadata } from 'next';
import React from 'react';

export async function generateMetadata({ params }: any): Promise<Metadata> {
	const { slug } = params; // ✅ Removed unnecessary await

	return {
		title: `Surja ${slug} - Lexo Kuran`,
		description: `This is the Quran  ${slug}.`,
	};
}

export async function generateStaticParams() {
	return surahs.map((s) => ({
		slug: s.nameAl,
	}));
}
const page = async ({ params }: any): Promise<any> => {
	const { slug } = params; // ✅ Removed unnecessary await

	return <SurahPage slug={slug} />;
};

export default page;
