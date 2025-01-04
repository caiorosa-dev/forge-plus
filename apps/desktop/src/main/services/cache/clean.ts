import fs from 'fs/promises';
import path from 'path';

import { app } from 'electron';

export async function cleanCache(type: 'info' | 'files' | 'all') {
	const cacheDir = path.join(app.getPath('appData'), 'Forge Plus', 'app-cache');

	try {
		if (type === 'all') {
			await fs.rm(cacheDir, { recursive: true, force: true });
		} else {
			const cacheTypeDir = path.join(cacheDir, type);
			await fs.rm(cacheTypeDir, { recursive: true, force: true });
		}
	} catch (error) {
		console.error(`Failed to clean cache: ${error}`);
	}
}