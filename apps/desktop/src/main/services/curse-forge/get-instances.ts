import fs from 'fs';
import { getUser } from '../../helpers/get-user';

export function getCurseForgeInstances() {
	const user = getUser();
	const instancesDir = `C:\\Users\\${user}\\curseforge\\minecraft\\Instances`;

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