import fs from 'fs/promises';
import path from 'path';
import { LocalModpack } from '../../../types/modpack';
import { app } from 'electron';
import { asyncFileExists } from '../../helpers/file-exists';

export async function createLocalModpackFile(modpackId: string, versionTag: string) {
	const installedModpacksDir = path.join(app.getPath('appData'), 'Forge Plus', 'modpacks');

	if (!await asyncFileExists(installedModpacksDir)) {
		await fs.mkdir(installedModpacksDir, { recursive: true });
	}

	const modpackFilePath = path.join(installedModpacksDir, `${modpackId}.json`);
	if (await asyncFileExists(modpackFilePath)) {
		await fs.rm(modpackFilePath);
	}

	const modpackData: LocalModpack = {
		modpackId,
		installedVersionTag: versionTag
	};

	await fs.writeFile(modpackFilePath, JSON.stringify(modpackData, null, 2), 'utf-8');
}