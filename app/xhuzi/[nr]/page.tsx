import JuzPage from '@/components/pages/JuzPage';
import { Metadata } from 'next';
import React from 'react';

const TOTAL_JUZ = 30;

export async function generateMetadata({ params }: any): Promise<Metadata> {
	const { nr } = await params;

	return {
		title: `Xhuzi ${nr} - Kurani Fisnik`,
		description: `Lexo xhuzin ${nr} të Kuranit në arabisht dhe shqip.`,
	};
}

export async function generateStaticParams() {
	return Array.from({ length: TOTAL_JUZ }, (_, i) => ({
		nr: String(i + 1),
	}));
}

const page = async ({ params }: any): Promise<any> => {
	const { nr } = await params;

	return <JuzPage nr={Number(nr)} />;
};

export default page;
