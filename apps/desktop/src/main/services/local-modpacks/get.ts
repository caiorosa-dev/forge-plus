import fs from 'fs/promises';
import path from 'path';
import { LocalModpack } from '../../../types/modpack';
import { app } from 'electron';
import { asyncFileExists } from '../../helpers/file-exists';

export async function getLocalModpacks(): Promise<LocalModpack[]> {
	const installedModpacksDir = path.join(app.getPath('appData'), 'Forge Plus', 'modpacks');

	if (!await asyncFileExists(installedModpacksDir)) {
		return [];
	}

	const dirents = await fs.readdir(installedModpacksDir, { withFileTypes: true });
	const installedModpacksPromises = dirents
		.filter(dirent => dirent.isFile() && dirent.name.endsWith('.json'))
		.map(async dirent => {
			const modpackPath = path.join(installedModpacksDir, dirent.name);

			try {
				await fs.access(modpackPath);
				const modpackData = await fs.readFile(modpackPath, 'utf-8');
				const manifest = JSON.parse(modpackData);

				return manifest;
			} catch {
				return null;
			}
		});

	const installedModpacks = await Promise.all(installedModpacksPromises);
	return installedModpacks.filter(modpack => modpack !== null) as LocalModpack[];
}