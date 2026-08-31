import { TRANSLATION_OPTIONS } from '@/lib/quran/editions';

const TranslationAttribution = () => {
	return (
		<p className='text-xs text-gray-400 text-center py-4'>
			Përkthimi: {TRANSLATION_OPTIONS.map((t) => t.label).join(' / ')} — burimi: tanzil.net via fawazahmed0/quran-api
		</p>
	);
};

export default TranslationAttribution;
