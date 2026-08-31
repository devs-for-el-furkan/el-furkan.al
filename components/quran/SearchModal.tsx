'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Pagination, PaginationContent, PaginationItem, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { searchAyahs } from '@/lib/quran/searchAyahs';
import { useTranslationStore } from '@/lib/quran/store';
import type { SearchResultAyah } from '@/types/quran';

const PAGE_SIZE = 10;

const SearchModal = () => {
	const translationId = useTranslationStore((s) => s.translationId);
	const [open, setOpen] = useState(false);
	const [input, setInput] = useState('');
	const [query, setQuery] = useState('');
	const [page, setPage] = useState(1);
	const [results, setResults] = useState<SearchResultAyah[]>([]);
	const [total, setTotal] = useState(0);
	const [isSearching, setIsSearching] = useState(false);

	useEffect(() => {
		const id = setTimeout(() => {
			setQuery(input.trim());
			setPage(1);
		}, 300);
		return () => clearTimeout(id);
	}, [input]);

	useEffect(() => {
		if (!query) {
			setResults([]);
			setTotal(0);
			return;
		}

		let cancelled = false;
		setIsSearching(true);
		searchAyahs(query, page, PAGE_SIZE).then((res) => {
			if (cancelled) return;
			setResults(res.results);
			setTotal(res.total);
			setIsSearching(false);
		});

		return () => {
			cancelled = true;
		};
	}, [query, page]);

	const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

	return (
		<Dialog
			open={open}
			onOpenChange={(nextOpen) => {
				setOpen(nextOpen);
				if (!nextOpen) {
					setInput('');
					setQuery('');
					setPage(1);
				}
			}}
		>
			<DialogTrigger render={<Button variant='ghost' size='icon' aria-label='Kërko në Kuran' />}>
				<Search />
			</DialogTrigger>
			<DialogContent className='sm:max-w-2xl max-h-[85vh] flex flex-col'>
				<DialogHeader>
					<DialogTitle>Kërko në Kuran</DialogTitle>
				</DialogHeader>

				<Input autoFocus placeholder='Shkruaj një fjalë ose shprehje në shqip...' value={input} onChange={(e) => setInput(e.target.value)} />

				{query ? <p className='text-xs text-muted-foreground'>{isSearching ? 'Duke kërkuar…' : `${total} rezultate`}</p> : null}

				<div className='flex-1 overflow-y-auto flex flex-col gap-3'>
					{results.map((r) => (
						<Link
							key={`${r.surah}-${r.number}`}
							href={`/surja/${r.slug}#ajeti-${r.number}`}
							onClick={() => setOpen(false)}
							className='flex flex-col gap-1 border border-border p-3 hover:bg-muted transition'
						>
							<p className='text-xs font-semibold uppercase tracking-wider text-muted-foreground'>
								{r.surahNameAl} {r.surah}:{r.number}
							</p>
							<p dir='rtl' lang='ar' className='font-arabic text-xl leading-relaxed text-right'>
								{r.textAr}
							</p>
							<p className='text-sm text-foreground'>{r.translations[translationId]}</p>
						</Link>
					))}
				</div>

				{totalPages > 1 ? (
					<Pagination>
						<PaginationContent>
							<PaginationItem>
								<PaginationPrevious
									href='#'
									aria-disabled={page === 1}
									onClick={(e) => {
										e.preventDefault();
										setPage((p) => Math.max(1, p - 1));
									}}
								/>
							</PaginationItem>
							<PaginationItem>
								<span className='px-3 text-sm text-muted-foreground whitespace-nowrap'>
									{page} / {totalPages}
								</span>
							</PaginationItem>
							<PaginationItem>
								<PaginationNext
									href='#'
									aria-disabled={page === totalPages}
									onClick={(e) => {
										e.preventDefault();
										setPage((p) => Math.min(totalPages, p + 1));
									}}
								/>
							</PaginationItem>
						</PaginationContent>
					</Pagination>
				) : null}
			</DialogContent>
		</Dialog>
	);
};

export default SearchModal;
