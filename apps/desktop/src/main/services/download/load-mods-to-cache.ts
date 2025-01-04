import path from 'path';

import { Modpack } from '../../../types/modpack';
import { ProjectInfo } from '../../../types/project-info';
import { getModsFolder } from '../../helpers/get-mods-folder';
import { getModsFromFolder } from '../curse-forge/get-mods-from-folder';
import { saveModFileToCache } from './save-mod-file-to-cache';

export function loadModsFromFolderToCache(modpack: Modpack, projectInfos: ProjectInfo[]) {
	const modFilesList = getModsFromFolder(modpack.curseForgeInstanceName);

	for (let i = 0; i < projectInfos.length; i++) {
		const projectInfo = projectInfos[i];
		const validModFile = projectInfo.files.find(file => modFilesList.find(modFile => modFile === file.name));
		if (validModFile) {
			const modFilePath = path.join(getModsFolder(modpack.curseForgeInstanceName), validModFile.name);
			saveModFileToCache(modFilePath, {
				projectId: projectInfo.id.toString(),
				fileId: validModFile.id.toString()
			});
		}
	}
}