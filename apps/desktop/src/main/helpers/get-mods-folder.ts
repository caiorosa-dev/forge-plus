import path from 'path';
import { app } from 'electron';

export function getModsFolder(instanceName: string): string {
	const instancesDir = `${app.getPath('home')}\\curseforge\\minecraft\\Instances`;

	const modsFolder = path.join(instancesDir, instanceName, 'mods');

	return modsFolder;
}