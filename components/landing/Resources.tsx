const Resources = () => {
	return (
		<div className='max-w-3xl flex flex-col gap-6 px-4 md:px-6 w-full mt-4 md:mt-10 mb-10 mx-auto'>
			<h1 className='text-3xl text-center font-hand font-semibold'>Burimet</h1>
			<hr />

			<p className='text-gray-700'>
				Më poshtë janë të gjitha burimet e jashtme që përdor ky sajt për tekstin, përkthimet, zërin dhe përmbledhjet e
				sureve.
			</p>

			<div className='flex flex-col gap-2'>
				<h2 className='text-xl font-semibold'>Teksti arab dhe përkthimet shqip</h2>
				<p className='text-gray-700'>
					Teksti origjinal arab dhe përkthimet shqip merren nga{' '}
					<a
						href='https://github.com/fawazahmed0/quran-api'
						target='_blank'
						rel='noopener noreferrer'
						className='text-emerald-700 hover:text-orange-500 transition underline'
					>
						fawazahmed0/quran-api
					</a>{' '}
					(bazuar në tekstin e tanzil.net). Përkthimet e përdorura janë: Sherif Ahmeti, Hasan Efendi Nahi dhe Feti
					Mehdiu.
				</p>
			</div>

			<div className='flex flex-col gap-2'>
				<h2 className='text-xl font-semibold'>Audio (lexim me zë)</h2>
				<p className='text-gray-700'>
					Regjistrimet audio të leximit vijnë nga{' '}
					<a
						href='https://quranicaudio.com'
						target='_blank'
						rel='noopener noreferrer'
						className='text-emerald-700 hover:text-orange-500 transition underline'
					>
						quranicaudio.com
					</a>
					, recitues Mostafa Ismaeel.
				</p>
			</div>

			<div className='flex flex-col gap-2'>
				<h2 className='text-xl font-semibold'>Tema dhe mesazhi kryesor i sureve</h2>
				<p className='text-gray-700'>
					Përmbledhjet e temës kryesore dhe mesazhit kryesor për secilën sure janë përgatitur në dritën e mealit të
					Suat Yıldırım dhe të tefsirit Hak Dini Kur&apos;an Dili të Elmalılı Hamdi Yazır. Këto përmbledhje janë vetëm
					orientuese dhe nuk zëvendësojnë leximin e plotë të mealit dhe tefsirit.
				</p>
			</div>

			<div className='flex flex-col gap-2'>
				<h2 className='text-xl font-semibold'>Faqet e Mus&apos;hafit</h2>
				<p className='text-gray-700'>Burimi i figurave të faqeve të Mus&apos;hafit do të shtohet së shpejti.</p>
			</div>
		</div>
	);
};

export default Resources;
