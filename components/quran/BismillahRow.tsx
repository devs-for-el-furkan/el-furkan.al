'use client';

import { useTranslationStore } from '@/lib/quran/store';

type Props = {
	text: string;
	translations: Record<string, string>;
};

const BismillahRow = ({ text, translations }: Props) => {
	const translationId = useTranslationStore((s) => s.translationId);

	return (
		<div className='flex flex-col items-center gap-3 py-6'>
			<p dir='rtl' lang='ar' className='font-arabic text-3xl md:text-4xl text-center'>
				{text}
			</p>
			<p className='text-gray-800 leading-relaxed text-center'>{translations[translationId]}</p>
		</div>
	);
};

export default BismillahRow;
