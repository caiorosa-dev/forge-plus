import fs from 'fs/promises';
import path from 'path';
import { app } from 'electron';
import { asyncFileExists } from '../../helpers/file-exists';

export async function saveModFileToCache(modFilePath: string, { projectId, fileId }: { projectId: string, fileId: string }): Promise<string> {
	const cacheFilesDir = path.join(app.getPath('appData'), 'Forge Plus', 'app-cache', 'files');
	const cacheFilePath = path.join(cacheFilesDir, `${projectId}-${fileId}`);

	if (!await asyncFileExists(cacheFilesDir)) {
		await fs.mkdir(cacheFilesDir, { recursive: true });
	}

	await fs.copyFile(modFilePath, cacheFilePath);

	return cacheFilePath;
}
