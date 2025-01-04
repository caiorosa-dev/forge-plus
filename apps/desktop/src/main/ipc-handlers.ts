/* eslint-disable @typescript-eslint/no-explicit-any */
import { ipcMain } from 'electron';
import { getLocalModpacks } from './services/local-modpacks/get';
import { getCurseForgeInstances } from './services/curse-forge/get-instances';
import { loadModpackInfos } from './services/modpack/load-mods-infos';
import { fetchModpackFromApi } from './services/modpack/fetch-from-api';
import { installModpack } from './services/modpack/install';
import { loadModsFromFolderToCache } from './services/download/load-mods-to-cache';

export function registerIPCHandlers() {
	/**
	 * Retorna a lista de modpacks instalados em
	 * C:\Users\{USER}\curseforge\minecraft\Instances
	 */
	ipcMain.handle('curse-forge:get-instances', async () => {
		return getCurseForgeInstances();
	});

	/**
	 * Retorna a lista de modpacks instalados no sistema
	 */
	ipcMain.handle('local-modpacks:get-all', async () => {
		return getLocalModpacks();
	});

	ipcMain.on('modpack:sync', async (event, modpackId: string) => {
		const modpack = await fetchModpackFromApi(modpackId);

		if (!modpack) {
			return {
				success: false,
				message: 'Modpack não encontrado'
			}
		}

		const installedModpack = getLocalModpacks().find(localModpack => localModpack.modpackId === modpackId);

		if (installedModpack) {
			return {
				success: true,
				message: 'Modpack já está instalado'
			}
		}

		const instances = getCurseForgeInstances();

		if (!instances.includes(modpack.curseForgeInstanceName)) {
			return {
				success: false,
				message: 'Instância do Curse Forge não encontrada'
			}
		}

		const projectInfos = await loadModpackInfos(modpack.id, (progress: number) => {
			event.sender.send('modpack:sync:info-progress', progress);
		});

		loadModsFromFolderToCache(modpack, projectInfos);

		installModpack(modpack, modpack.currentVersionTag, (progress: number) => {
			event.sender.send('modpack:sync:progress', progress);
		});

		event.sender.send('modpack:sync:success');

		return {
			success: true,
			message: 'Modpack sincronizado com sucesso'
		}
	});

	/**
	 * Carrega as informações de um modpack
	 */
	ipcMain.handle('modpack:load-infos', async (event, modpackId: string) => {
		return loadModpackInfos(modpackId, (progress: number) => {
			event.sender.send('modpack:load-infos:progress', progress);
		});
	});
}

