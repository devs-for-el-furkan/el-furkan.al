'use client';

import { Select } from 'antd';
import { TRANSLATION_OPTIONS } from '@/lib/quran/editions';
import { useTranslationStore } from '@/lib/quran/store';

const TranslationSwitcher = () => {
	const translationId = useTranslationStore((s) => s.translationId);
	const setTranslationId = useTranslationStore((s) => s.setTranslationId);

	return (
		<div className='flex justify-center items-center gap-2'>
			<p className='text-sm whitespace-nowrap'>Përkthimi:</p>
			<Select
				value={translationId}
				style={{ width: 220 }}
				onChange={setTranslationId}
				options={TRANSLATION_OPTIONS.map((t) => ({ value: t.id, label: t.label }))}
			/>
		</div>
	);
};

export default TranslationSwitcher;
