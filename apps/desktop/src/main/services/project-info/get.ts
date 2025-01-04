import fs from 'fs';
import path from 'path';
import axios from 'axios';
import { getUser } from '../../helpers/get-user';
import { ProjectInfo } from '../../../types/project-info';

export async function getProjectInfo(projectId: string): Promise<ProjectInfo> {
	const user = getUser();
	const cacheInfoDirectory = `C:\\Users\\${user}\\AppData\\Roaming\\Forge Plus\\cache\\info`;

	const cacheInfoPath = path.join(cacheInfoDirectory, `${projectId}.json`);

	let modInfo = null;

	if (fs.existsSync(cacheInfoPath)) {
		const cachedData = JSON.parse(fs.readFileSync(cacheInfoPath, 'utf-8'));
		modInfo = cachedData;
	} else {
		const response = await axios.get(`https://api.cfwidget.com/${projectId}`);
		modInfo = response.data;

		fs.mkdirSync(cacheInfoDirectory, { recursive: true });
		fs.writeFileSync(cacheInfoPath, JSON.stringify({
			...modInfo,
			lastRequestDate: new Date().toISOString()
		}, null, 2), 'utf-8');
	}

	return modInfo;
}
