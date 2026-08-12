'use client';

import { surahs } from '@/constants/surahs';
import React, { useState } from 'react';
import SurahCard from '../cards/SurahCard';
import { Select } from 'antd';

type Order = 'asc' | 'desc' | 'ro-asc' | 'ro-desc';

const SurahsList = () => {
	const [sortOrder, setSortOrder] = useState<Order>('asc');

	const handleChange = (value: Order) => {
		setSortOrder(value);
	};
	return (
		<div className='max-w-7xl flex flex-col gap-4 px-4 md:px-6 w-full mt-4 md:mt-10 mb-10'>
			{/* header filter */}
			<h1 className='text-3xl text-center font-hand font-semibold'>Lista e Sureve</h1>
			<hr />
			{/* description for the view */}
			<div className='flex justify-between px-6 items-center'>
				<div className='flex justify-center items-center gap-2'>
					<p className='text-sm'>Rëndid sipas:</p>
					<Select
						defaultValue='asc'
						style={{ width: 250 }}
						onChange={handleChange}
						options={[
							{
								label: <span>Rendi Ne Kuran</span>,
								title: 'order-kuran',
								options: [
									{
										value: 'asc',
										label: 'Renditje sipas radhës në Kur’an',
									},
									{
										value: 'desc',
										label: 'Renditje nga fundi në Kur’an',
									},
								],
							},
							{
								label: <span>Rendi Kronoligjik i sureve</span>,
								title: 'engineer',
								options: [
									{
										value: 'ro-asc',
										label: 'Nga surja e parë',
									},
									{
										value: 'ro-desc',
										label: 'Nga surja e fundit',
									},
								],
							},
						]}
					/>
				</div>
			</div>

			{/* List according to the filer */}
			<div className='grid grid-cols-1 md:grid-cols-2  justify-items-center items-center lg:grid-cols-3 gap-3 md:gap-5 '>
				{surahs
					.sort((a, b) => {
						if (sortOrder === 'asc') {
							return a.order - b.order;
						} else if (sortOrder === 'desc') {
							return b.order - a.order;
						} else if (sortOrder === 'ro-asc') {
							return a.revealOrder - b.revealOrder;
						} else {
							return b.revealOrder - a.revealOrder;
						}
					})
					.map((surah) => (
						<SurahCard surah={surah} key={surah.slug} />
					))}
			</div>
		</div>
	);
};

export default SurahsList;
