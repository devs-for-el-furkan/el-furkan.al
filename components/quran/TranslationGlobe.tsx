'use client';

import { Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { TRANSLATION_OPTIONS } from '@/lib/quran/editions';
import { useTranslationStore } from '@/lib/quran/store';

const TranslationGlobe = () => {
	const translationId = useTranslationStore((s) => s.translationId);
	const setTranslationId = useTranslationStore((s) => s.setTranslationId);

	return (
		<DropdownMenu>
			<DropdownMenuTrigger render={<Button variant='ghost' size='icon' aria-label='Ndrysho përkthimin' />}>
				<Globe />
			</DropdownMenuTrigger>
			<DropdownMenuContent align='end'>
				{TRANSLATION_OPTIONS.map((option) => (
					<DropdownMenuItem key={option.id} data-active={option.id === translationId} onClick={() => setTranslationId(option.id)}>
						{option.label}
					</DropdownMenuItem>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default TranslationGlobe;
