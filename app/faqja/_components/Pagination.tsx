'use client';

import { InputNumber } from 'antd';
import { ArrowLeftCircle, ArrowRightCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Pagination({ currentPage }: { currentPage: number }) {
	const [page, setPage] = useState(currentPage);
	const maxPage = 604;
	const minPage = 1;
	const router = useRouter();

	const goToPage = (p: number) => {
		const safePage = Math.max(minPage, Math.min(maxPage, p));

		const padded = safePage < 10 ? `00${safePage}` : safePage < 100 ? `0${safePage}` : safePage;

		router.push(`/faqja/${padded}`);
	};

	return (
		<div className='flex justify-center items-center gap-4 p-4'>
			<button onClick={() => goToPage(page + 1)} className='px-4 py-2 rounded-lg disabled:bg-gray-400' disabled={page === maxPage}>
				<ArrowLeftCircle />
			</button>

			<InputNumber
				type='number'
				value={page}
				size='large'
				min={minPage}
				max={maxPage}
				style={{
					width: 75,
					textAlign: 'start',
				}}
				parser={(value) => Number(value)}
				onChange={(e: any) => setPage(Number(e))}
				onBlur={() => goToPage(page)}
				onKeyDown={(e) => {
					if (e.key === 'Enter') goToPage(page);
				}}
				className=' text-end border rounded-md font-semibold tracking-widest'
				formatter={
					(value) => String(value).padStart(3, '0') // <- 3 digits always
				}
			/>

			<button onClick={() => goToPage(page - 1)} className='px-4 py-2 rounded-lg disabled:bg-gray-400' disabled={page === minPage}>
				<ArrowRightCircle />
			</button>
		</div>
	);
}
