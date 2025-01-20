import fs from 'fs/promises';
import { getModsFolder } from '../../helpers/get-mods-folder';
import { asyncFileExists } from '../../helpers/file-exists';

export async function getModsFromFolder(instanceName: string): Promise<string[]> {
	const modsFolder = getModsFolder(instanceName);

	if (!await asyncFileExists(modsFolder)) {
		return [];
	}

	const dirents = await fs.readdir(modsFolder, { withFileTypes: true });
	const mods = dirents
		.filter(dirent => dirent.isFile() && dirent.name.endsWith('.jar'))
		.map(dirent => dirent.name);

	return mods;
}
