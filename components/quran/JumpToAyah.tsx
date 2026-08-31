'use client';

import { InputNumber } from 'antd';
import { useState } from 'react';

type Props = {
	maxAyah: number;
};

const JumpToAyah = ({ maxAyah }: Props) => {
	const [ayah, setAyah] = useState(1);

	const jump = () => {
		const safeAyah = Math.max(1, Math.min(maxAyah, ayah));
		document.getElementById(`ajeti-${safeAyah}`)?.scrollIntoView({ behavior: 'smooth' });
	};

	return (
		<div className='flex justify-center items-center gap-2'>
			<p className='text-sm whitespace-nowrap'>Shko te ajeti:</p>
			<InputNumber
				type='number'
				value={ayah}
				min={1}
				max={maxAyah}
				parser={(value) => Number(value)}
				onChange={(value) => setAyah(Number(value))}
				onKeyDown={(e) => {
					if (e.key === 'Enter') jump();
				}}
				style={{ width: 75 }}
				className='text-end border rounded-md font-semibold'
			/>
			<button
				onClick={jump}
				className='px-3 py-1.5 text-sm rounded-md bg-emerald-600 text-white hover:bg-emerald-700 transition'
			>
				Shko
			</button>
		</div>
	);
};

export default JumpToAyah;
