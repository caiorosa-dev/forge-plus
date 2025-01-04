import fs from 'fs';
import path from 'path';
import { app } from 'electron';

export function saveModFileToCache(modFilePath: string, { projectId, fileId }: { projectId: string, fileId: string }): string {
	const cacheFilesDir = path.join(app.getPath('appData'), 'cache', 'files');
	const cacheFilePath = path.join(cacheFilesDir, `${projectId}-${fileId}`);

	if (!fs.existsSync(cacheFilesDir)) {
		fs.mkdirSync(cacheFilesDir, { recursive: true });
	}

	fs.copyFileSync(modFilePath, cacheFilePath);

	return cacheFilePath;
}
