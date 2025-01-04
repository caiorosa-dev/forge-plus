/* eslint-disable @typescript-eslint/no-explicit-any */
import { ipcMain } from 'electron';
import { getLocalModpacks } from './services/local-modpacks/get';
import { getCurseForgeInstances } from './services/curse-forge/get-instances';
import { InfoProgressCallbackParams, loadModpackInfos } from './services/modpack/load-mods-infos';
import { fetchModpackFromApi } from './services/modpack/fetch-from-api';
import { installModpack, InstallProgressCallbackParams } from './services/modpack/install';
import { loadModsFromFolderToCache } from './services/download/load-mods-to-cache';
import { createLocalModpackFile } from './services/local-modpacks/create-file';

type ModpackInstallPayload = {
	modpackId: string;
	versionTag: string;
	loadToCache?: boolean;
};

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

	ipcMain.on('modpack:install', async (event, payload: ModpackInstallPayload) => {
		const { modpackId, versionTag, loadToCache } = payload;

		const modpack = await fetchModpackFromApi(modpackId);

		if (!modpack) {
			event.sender.send('modpack:install:error', {
				message: 'Modpack não encontrado'
			});

			return;
		}

		const installedModpack = getLocalModpacks().find(localModpack => localModpack.modpackId === modpackId);

		if (installedModpack && installedModpack.installedVersionTag === versionTag) {
			event.sender.send('modpack:install:error', {
				message: `Modpack já está instalado na versão ${versionTag}`
			});

			return;
		}

		const instances = getCurseForgeInstances();

		if (!instances.includes(modpack.curseForgeInstanceName)) {
			event.sender.send('modpack:install:error', {
				message: 'Instância do Curse Forge não encontrada'
			});

			return;
		}

		const projectInfos = await loadModpackInfos(modpack.id, (params: InfoProgressCallbackParams) => {
			event.sender.send('modpack:load-infos:progress', params);
		});

		if (loadToCache) {
			loadModsFromFolderToCache(modpack, projectInfos);
		}

		event.sender.send('modpack:install:queue:start', {
			queue: projectInfos.map(projectInfo => ({
				projectId: projectInfo.id,
				name: projectInfo.title,
				image: projectInfo.thumbnail
			}))
		});

		try {
			await installModpack(modpack, versionTag,
				(params: InstallProgressCallbackParams) => {
					const projectInfo = projectInfos.find(projectInfo => projectInfo.id === Number(params.currentProjectId));

					if (!projectInfo) {
						return;
					}

					const fileVersion = projectInfo.files.find(file => file.id === Number(params.currentFileId));

					const totalProgress = (projectInfos.indexOf(projectInfo) + params.progress / 100) / projectInfos.length * 100;

					event.sender.send('modpack:install:progress', {
						currentMod: {
							projectId: projectInfo.id,
							name: projectInfo.title,
							version: fileVersion?.version || 'Unknown',
							progress: params.progress,
						},
						totalProgress
					});
				},
				(projectId: string) => {
					event.sender.send('modpack:install:queue:remove', {
						projectId
					});
				}
			);
		} catch (error) {
			event.sender.send('modpack:install:error', {
				message: 'Erro ao instalar o modpack, tente novamente...'
			});

		}

		createLocalModpackFile(modpackId, versionTag);
		event.sender.send('modpack:install:success');
	});

	/**
	 * Carrega as informações de um modpack
	 */
	ipcMain.handle('modpack:load-infos', async (event, modpackId: string) => {
		return loadModpackInfos(modpackId, (params: InfoProgressCallbackParams) => {
			event.sender.send('modpack:load-infos:progress', params);
		});
	});
}

