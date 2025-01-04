import fs from 'fs';
import path from 'path';
import { LocalModpack } from '../../../types/modpack';
import { app } from 'electron';

export function createLocalModpackFile(modpackId: string, versionTag: string) {
	const installedModpacksDir = path.join(app.getPath('appData'), 'Forge Plus', 'modpacks');

	if (!fs.existsSync(installedModpacksDir)) {
		fs.mkdirSync(installedModpacksDir, { recursive: true });
	}

	const modpackFilePath = path.join(installedModpacksDir, `${modpackId}.json`);
	if (fs.existsSync(modpackFilePath)) {
		fs.rmSync(modpackFilePath);
	}

	const modpackData: LocalModpack = {
		modpackId,
		installedVersionTag: versionTag
	};

	fs.writeFileSync(modpackFilePath, JSON.stringify(modpackData, null, 2), 'utf-8');
}