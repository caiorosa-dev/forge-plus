import fs from 'fs/promises';
import path from 'path';
import axios from 'axios';
import { ProjectInfo } from '../../../types/project-info';
import { app } from 'electron';
import { asyncFileExists } from '../../helpers/file-exists';

export async function getProjectInfo(projectId: string, ignoreCache?: boolean): Promise<ProjectInfo> {
	const cacheInfoDirectory = path.join(app.getPath('appData'), 'Forge Plus', 'app-cache', 'info');

	const cacheInfoPath = path.join(cacheInfoDirectory, `${projectId}.json`);

	if (await asyncFileExists(cacheInfoPath) && !ignoreCache) {
		const fileContent = await fs.readFile(cacheInfoPath, 'utf-8');

		return JSON.parse(fileContent);
	}

	const response = await axios.get(`https://api.cfwidget.com/${projectId}`);
	const modInfo = response.data;

	await fs.mkdir(cacheInfoDirectory, { recursive: true });
	await fs.writeFile(cacheInfoPath, JSON.stringify({
		...modInfo,
		lastRequestDate: new Date().toISOString()
	}, null, 2), 'utf-8');

	return modInfo;
}
