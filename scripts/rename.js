const cloudinary = require('cloudinary').v2;

cloudinary.config({
	cloud_name: 'dfooptvte',
	api_key: '751232232219812',
	api_secret: 'W1OiRImNON_te2ASsry-hLc8y3o',
});

async function run() {
	let nextCursor = null;
	let counter = {};

	do {
		const result = await cloudinary.api.resources({
			type: 'upload',
			prefix: 'quran/pages',
			max_results: 604,
			next_cursor: nextCursor,
			resource_type: 'image',
		});
		console.log('🚀 ~ run ~ result:', result.resources.length);

		for (const file of result.resources) {
			const oldId = file.public_id; // quran/pages/559
			const filename = oldId.split('/').pop(); // 559

			const first3 = filename.substring(0, 3);

			counter[first3] = (counter[first3] || 0) + 1;

			const newName = counter[first3] === 1 ? `quran/pages/${first3}` : `quran/pages/${first3}-${counter[first3]}`;

			if (oldId === newName) {
				console.log(`Skipping ${oldId} (already correct)`);
				continue;
			}

			console.log(`Renaming ${oldId} -> ${newName}`);

			await cloudinary.uploader.rename(oldId, newName, {
				overwrite: false,
			});
		}

		nextCursor = result.next_cursor;
	} while (nextCursor);

	console.log('Done renaming all files.');
}

run().catch(console.error);
