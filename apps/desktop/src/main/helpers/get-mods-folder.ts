import path from 'path';
import { getUser } from './get-user';

export function getModsFolder(instanceName: string): string {
	const user = getUser();
	const instancesDir = `C:\\Users\\${user}\\curseforge\\minecraft\\Instances`;
	const modsFolder = path.join(instancesDir, instanceName, 'mods');

	return modsFolder;
}