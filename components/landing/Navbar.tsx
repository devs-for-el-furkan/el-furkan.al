import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import AuthBtn from './AuthBtn';
import TranslationGlobe from '@/components/quran/TranslationGlobe';
import SearchModal from '@/components/quran/SearchModal';

const Navbar = () => {
	return (
		<nav className='w-full shadow-md  '>
			<div className='max-w-[1400px] mx-auto px-3 md:px-8 lg:px-10 py-1 md:py-2 h-20 flex justify-between items-center'>
				<Link href={'/'} className='block'>
					<div className='relative flex justify-center items-end gap-2 w-fit flex-row  p-1'>
						<Image src={'/img/quran-caligraphy.png'} width={56} height={56} alt='' />
						<div>
							<strong className=''>El Furkan.al</strong>
							<p className='text-sm text-slate-600'>Kur&apos;ani Fisnik</p>
						</div>
					</div>
				</Link>

				<div className='flex items-center gap-1'>
					<TranslationGlobe />
					<SearchModal />
					<AuthBtn />
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
