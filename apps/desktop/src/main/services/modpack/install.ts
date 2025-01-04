import { Modpack } from '../../../types/modpack';
import { cleanInstanceModsFolder } from '../curse-forge/clean-instance-mods-folder';
import { copyModFileToModsFolder } from '../curse-forge/copy-mod-file-to-mods-folder';
import { downloadModFile } from '../download/download-mod-file';
import { createLocalModpackFile } from '../local-modpacks/create-file';

export async function installModpack(modpack: Modpack, versionTag: string, onProgress: (progress: number) => void) {
	const version = modpack.versions.find(version => version.tag === versionTag);
	const totalFiles = version.files.length;
	let downloadedFiles = 0;

	cleanInstanceModsFolder(modpack.curseForgeInstanceName);

	for (const file of version.files) {
		const { filePath } = await downloadModFile(file, {
			onProgress: (progress) => {
				const overallProgress = ((downloadedFiles + progress / 100) / totalFiles) * 100;

				onProgress(overallProgress);
			}
		});

		await copyModFileToModsFolder({
			instanceName: modpack.curseForgeInstanceName,
			cachedFilePath: filePath,
			projectId: file.projectId,
			fileId: file.fileId
		});

		downloadedFiles++;
	}

	createLocalModpackFile(modpack.id, versionTag);
}