import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE_URL = 'https://res.cloudinary.com/dfooptvte/image/upload/v1778445060/quran/pages';

const TOTAL_PAGES = 604;

const pages = Array.from({ length: TOTAL_PAGES }, (_, i) => {
	const pageNumber = i + 1;
	const pageString = String(pageNumber).padStart(3, '0');

	return {
		page: pageNumber,
		page_string: pageString,
		image_url: `${BASE_URL}/${pageString}.jpg`,
		full_path: `/quran/pages/${pageString}.jpg`,
	};
});

const outputPath = path.join(__dirname, '../data/quran-pages.json');

fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, JSON.stringify(pages, null, 2), 'utf-8');

console.log(`Generated ${TOTAL_PAGES} pages → ${outputPath}`);
