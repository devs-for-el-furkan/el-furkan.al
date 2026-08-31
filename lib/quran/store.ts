import { create } from 'zustand';
import { DEFAULT_TRANSLATION } from './editions';

type TranslationState = {
	translationId: string;
	setTranslationId: (id: string) => void;
};

export const useTranslationStore = create<TranslationState>((set) => ({
	translationId: DEFAULT_TRANSLATION,
	setTranslationId: (id) => set({ translationId: id }),
}));
