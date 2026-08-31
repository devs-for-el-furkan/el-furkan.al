import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { getSurahAyahs } from '@/lib/quran/getSurahAyahs';

const Hero = () => {
	const ayah = getSurahAyahs('025').ayahs[0];
	const translation = ayah.translations['sqi-hasanefendinahi'];

	return (
		<div>
			<div className='max-w-[1400px] mx-auto px-4 md:px-8 lg:px-10 py-10 md:py-16 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14 items-center'>
				{/* Text column */}
				<div className='flex flex-col items-center md:items-start text-center md:text-left'>
					<div className='flex items-center gap-2 mb-4'>
						<span dir='rtl' lang='ar' className='font-arabic text-xl text-emerald-600'>
							الفرقان
						</span>
						<span className='text-gray-300'>·</span>
						<span className='text-xs font-bold tracking-wider uppercase text-orange-600'>Emër tjetër i Kuranit</span>
					</div>

					<h1 className='font-hand text-4xl md:text-5xl lg:text-6xl leading-tight mb-5'>
						El-Furkan: <span className='text-emerald-600'>Standardi</span> Që Ndan të Vërtetën
					</h1>

					<p className='text-gray-600 text-base md:text-lg leading-relaxed max-w-md mb-8'>
						Al-Furkan (الفرقَان) është një fjalë arabe që do të thotë &quot;kriteri&quot;, &quot;standardi&quot;, ose ai që dallon të vërtetën nga e pavërteta.
					</p>

					<div className='flex items-center gap-6'>
						<Link
							href='/surja/al-furqan'
							className='inline-flex items-center gap-2 bg-emerald-600 text-white px-6 py-3.5 rounded-lg font-semibold hover:bg-emerald-700 transition shadow-md'
						>
							Lexo El-Furkanin
							<ArrowRight size={16} />
						</Link>
						<Link href='/list-suret-e-kuranit' className='font-semibold text-emerald-700 hover:text-orange-500 transition'>
							Shiko të gjitha suret →
						</Link>
					</div>
				</div>

				{/* Art column */}
				<div className='relative flex justify-center items-center h-[240px] md:h-[420px]'>
					<div className='absolute w-[220px] h-[220px] md:w-[400px] md:h-[400px] rounded-full bg-emerald-600/10 blur-3xl' />

					<Image
						src='/img/quran-caligraphy.png'
						alt='El Furkan'
						width={340}
						height={340}
						priority
						className='relative w-[200px] h-[200px] md:w-[320px] md:h-[320px] object-contain drop-shadow-[0_20px_40px_rgba(5,150,105,0.25)]'
					/>
				</div>
			</div>

			{/* Ayah band */}
			<div className='bg-gray-50 border-y border-gray-200 py-12 md:py-14 px-6'>
				<div className='max-w-3xl mx-auto text-center'>
					<p className='text-xs font-bold tracking-wider uppercase text-gray-400 mb-5'>Ajeti që i jep emrin — El-Furkan, 25:1</p>
					<p dir='rtl' lang='ar' className='font-arabic text-2xl md:text-4xl leading-loose text-emerald-800 mb-5'>
						{ayah.textAr}
					</p>
					<p className='text-gray-700 text-sm md:text-base leading-relaxed max-w-2xl mx-auto mb-6'>&quot;{translation}&quot;</p>
					<span className='inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold'>
						El-Furkan · Ajeti 1
					</span>
				</div>
			</div>

			{/* Scroll cue */}
			<div className='flex flex-col items-center gap-1 py-6 text-gray-400'>
				<ChevronDown size={20} />
				<span className='text-[11px] tracking-wide uppercase'>Lista e Sureve</span>
			</div>
		</div>
	);
};

export default Hero;
