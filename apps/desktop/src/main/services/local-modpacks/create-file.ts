import fs from 'fs';
import path from 'path';
import { getUser } from '../../helpers/get-user';
import { LocalModpack } from '../../../types/modpack';

export function createLocalModpackFile(modpackId: string, versionTag: string) {
	const user = getUser();
	const installedModpacksDir = `C:\\Users\\${user}\\AppData\\Roaming\\Forge Plus\\modpacks`;

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