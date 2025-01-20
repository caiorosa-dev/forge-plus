import fs from 'fs/promises';
import { app } from 'electron';

export async function getCurseForgeInstances() {
	const instancesDir = `${app.getPath('home')}\\curseforge\\minecraft\\Instances`;

	try {
		const instancesDirContent = await fs.readdir(instancesDir, { withFileTypes: true });

		const instances = instancesDirContent
			.filter(dirent => dirent.isDirectory())
			.map(dirent => dirent.name);

		return instances;
	} catch (err) {
		console.error(err);
		return [];
	}
}