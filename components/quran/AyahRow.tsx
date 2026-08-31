'use client';

import { Bookmark, Link2, Play } from 'lucide-react';
import type { Ayah } from '@/types/quran';
import { useTranslationStore } from '@/lib/quran/store';
import { toArabicIndicNumeral } from '@/lib/quran/arabicNumerals';

type Props = {
	ayah: Ayah;
};

const AyahRow = ({ ayah }: Props) => {
	const translationId = useTranslationStore((s) => s.translationId);
	const anchorId = `ajeti-${ayah.number}`;

	const copyLink = () => {
		if (typeof window === 'undefined') return;
		const url = `${window.location.origin}${window.location.pathname}#${anchorId}`;
		navigator.clipboard?.writeText(url);
	};

	return (
		<div id={anchorId} className='flex flex-col gap-3 py-5 border-b border-gray-200 scroll-mt-24'>
			<div className='flex justify-between items-center gap-4'>
				<span className='text-sm font-semibold text-emerald-700'>
					{ayah.surah}:{ayah.number}
				</span>

				<div className='flex items-center gap-3'>
					<button
						type='button'
						disabled
						title='Së shpejti'
						aria-label='Dëgjo ajetin (së shpejti)'
						className='text-gray-300 cursor-not-allowed'
					>
						<Play size={14} />
					</button>
					<button
						type='button'
						disabled
						title='Së shpejti'
						aria-label='Ruaj ajetin (së shpejti)'
						className='text-gray-300 cursor-not-allowed'
					>
						<Bookmark size={14} />
					</button>
					<button
						onClick={copyLink}
						className='flex items-center gap-1 text-xs text-gray-400 hover:text-orange-500 transition'
						aria-label='Kopjo lidhjen e ajetit'
					>
						<Link2 size={14} />
					</button>
				</div>
			</div>

			<p dir='rtl' lang='ar' className='font-arabic text-3xl md:text-4xl leading-loose text-right'>
				{ayah.textAr}
				<span className='inline-flex items-center justify-center w-7 h-7 rounded-full border border-emerald-600 text-emerald-700 text-sm font-arabic align-middle mx-1.5'>
					{toArabicIndicNumeral(ayah.number)}
				</span>
			</p>

			<p className='text-gray-800 leading-relaxed'>{ayah.translations[translationId]}</p>
		</div>
	);
};

export default AyahRow;
