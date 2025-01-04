import fs from 'fs';
import { getModsFolder } from '../../helpers/get-mods-folder';

export function cleanInstanceModsFolder(instanceName: string) {
	const modsFolder = getModsFolder(instanceName);

	fs.rmSync(modsFolder, { recursive: true, force: true });
	fs.mkdirSync(modsFolder, { recursive: true });
}