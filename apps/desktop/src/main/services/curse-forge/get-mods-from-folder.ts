import fs from 'fs';
import { getModsFolder } from '../../helpers/get-mods-folder';

export function getModsFromFolder(instanceName: string): string[] {
	const modsFolder = getModsFolder(instanceName);

	if (!fs.existsSync(modsFolder)) {
		return [];
	}

	const mods = fs.readdirSync(modsFolder, { withFileTypes: true })
		.filter(dirent => dirent.isFile() && dirent.name.endsWith('.jar'))
		.map(dirent => dirent.name);

	return mods;
}
