import { Modpack } from '../../../types/modpack';
import { cleanInstanceModsFolder } from '../curse-forge/clean-instance-mods-folder';
import { copyModFileToModsFolder } from '../curse-forge/copy-mod-file-to-mods-folder';
import { downloadModFile } from '../download/download-mod-file';
import { createLocalModpackFile } from '../local-modpacks/create-file';

export type InstallProgressCallbackParams = {
	currentProjectId: string;
	currentFileId: string;
	progress: number;
}

export async function installModpack(modpack: Modpack, versionTag: string, onProgress: (params: InstallProgressCallbackParams) => void, onQueueRemove: (projectId: string) => void) {
	const version = modpack.versions.find(version => version.tag === versionTag);

	await cleanInstanceModsFolder(modpack.curseForgeInstanceName);

	for (const file of version.files) {
		const { filePath, alreadyExists } = await downloadModFile(file, (progress) => {
			onProgress({
				currentProjectId: file.projectId.toString(),
				currentFileId: file.fileId.toString(),
				progress
			});
		});

		await copyModFileToModsFolder({
			instanceName: modpack.curseForgeInstanceName,
			cachedFilePath: filePath,
			projectId: file.projectId.toString(),
			fileId: file.fileId.toString(),
			ignoreProjectInfoCache: alreadyExists
		});

		onQueueRemove(file.projectId.toString());
	}

	await createLocalModpackFile(modpack.id, versionTag);
}