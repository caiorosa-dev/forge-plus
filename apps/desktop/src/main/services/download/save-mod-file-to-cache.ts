import fs from 'fs';
import path from 'path';
import { getUser } from '../../helpers/get-user';

export function saveModFileToCache(modFilePath: string, { projectId, fileId }: { projectId: string, fileId: string }): string {
	const user = getUser();
	const cacheFilesDir = `C:\\Users\\${user}\\AppData\\Roaming\\Forge Plus\\cache\\files`;
	const cacheFilePath = path.join(cacheFilesDir, `${projectId}-${fileId}`);

	if (!fs.existsSync(cacheFilesDir)) {
		fs.mkdirSync(cacheFilesDir, { recursive: true });
	}

	fs.copyFileSync(modFilePath, cacheFilePath);

	return cacheFilePath;
}
