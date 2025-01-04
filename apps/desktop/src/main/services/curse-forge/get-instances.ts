import fs from 'fs';
import { app } from 'electron';

export function getCurseForgeInstances() {
	const instancesDir = `${app.getPath('home')}\\curseforge\\minecraft\\Instances`;

	try {
		const instances = fs.readdirSync(instancesDir, { withFileTypes: true })
			.filter(dirent => dirent.isDirectory())
			.map(dirent => dirent.name);

		return instances;
	} catch (err) {
		console.error(err);
		return [];
	}
}