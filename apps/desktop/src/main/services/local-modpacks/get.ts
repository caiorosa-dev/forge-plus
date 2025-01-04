import fs from 'fs';
import path from 'path';
import { LocalModpack } from '../../../types/modpack';
import { app } from 'electron';

export function getLocalModpacks(): LocalModpack[] {
	const installedModpacksDir = path.join(app.getPath('appData'), 'Forge Plus', 'modpacks');

	if (!fs.existsSync(installedModpacksDir)) {
		return [];
	}

	const installedModpacks = fs.readdirSync(installedModpacksDir, { withFileTypes: true })
		.filter(dirent => dirent.isFile() && dirent.name.endsWith('.json'))
		.map(dirent => {
			const modpackPath = path.join(installedModpacksDir, dirent.name);

			if (fs.existsSync(modpackPath)) {
				const modpackData = fs.readFileSync(modpackPath, 'utf-8');
				const manifest = JSON.parse(modpackData);

				return manifest;
			}

			return null;
		})
		.filter(modpack => modpack !== null);

	return installedModpacks;
}