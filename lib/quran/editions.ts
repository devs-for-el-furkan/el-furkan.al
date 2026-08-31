import type { TranslationOption } from '@/types/quran';

export const ARABIC_EDITION = 'ara-quransimple';

export const TRANSLATION_OPTIONS: TranslationOption[] = [
	{ id: 'sqi-sherifahmeti', label: 'Sherif Ahmeti' },
	{ id: 'sqi-hasanefendinahi', label: 'Hasan Efendi Nahi' },
	{ id: 'sqi-fetimehdiu', label: 'Feti Mehdiu' },
];

export const DEFAULT_TRANSLATION = 'sqi-hasanefendinahi';
