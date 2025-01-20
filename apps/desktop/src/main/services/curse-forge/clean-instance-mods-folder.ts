import fs from 'fs/promises';
import { getModsFolder } from '../../helpers/get-mods-folder';

export async function cleanInstanceModsFolder(instanceName: string) {
	const modsFolder = getModsFolder(instanceName);

	await fs.rm(modsFolder, { recursive: true, force: true });
	await fs.mkdir(modsFolder, { recursive: true });
}