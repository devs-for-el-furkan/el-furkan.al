import Link from 'next/link';
import React from 'react';

const Footer = () => {
	return (
		<div className='w-full h-24 flex justify-center items-center'>
			<Link href='/burimet' className='text-sm text-gray-500 hover:text-orange-500 transition'>
				Burimet
			</Link>
		</div>
	);
};

export default Footer;
