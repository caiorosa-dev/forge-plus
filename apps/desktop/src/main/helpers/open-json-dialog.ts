import { dialog } from 'electron';
import fs from 'fs/promises';
import { ModpackManifest } from '../../types/modpack-manifest';

export async function openJsonManifestDialog(): Promise<{ manifest: ModpackManifest }> {
	const result = await dialog.showOpenDialog({
		properties: ['openFile'],
		filters: [{ name: 'JSON', extensions: ['json'] }],
		title: 'Selecione o manifest JSON do modpack',
	});

	if (!result.filePaths.length) {
		throw new Error('Nenhum arquivo selecionado');
	}

	const fileContent = await fs.readFile(result.filePaths[0], 'utf8');

	return { manifest: JSON.parse(fileContent) };
}