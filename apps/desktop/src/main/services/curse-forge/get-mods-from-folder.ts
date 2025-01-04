import fs from 'fs';
import path from 'path';
import { getUser } from '../../helpers/get-user';

export function getModsFromFolder(instanceName: string): string[] {
	const user = getUser();
	const instancesDir = `C:\\Users\\${user}\\curseforge\\minecraft\\Instances`;
	const modsFolder = path.join(instancesDir, instanceName, 'mods');

	if (!fs.existsSync(modsFolder)) {
		return [];
	}

	const mods = fs.readdirSync(modsFolder, { withFileTypes: true })
		.filter(dirent => dirent.isFile() && dirent.name.endsWith('.jar'))
		.map(dirent => dirent.name);

	return mods;
}
