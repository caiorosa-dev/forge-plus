import path from 'path';
import fs from 'fs';
import { getUser } from '../../helpers/get-user';

export function cleanInstanceModsFolder(instanceName: string) {
	const user = getUser();
	const instancesDir = `C:\\Users\\${user}\\curseforge\\minecraft\\Instances`;

	const modsFolder = path.join(instancesDir, instanceName, 'mods');

	fs.rmSync(modsFolder, { recursive: true, force: true });
	fs.mkdirSync(modsFolder, { recursive: true });
}