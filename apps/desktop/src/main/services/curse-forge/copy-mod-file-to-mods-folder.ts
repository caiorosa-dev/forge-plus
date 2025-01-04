import path from 'path';
import fs from 'fs';

import { getProjectInfo } from '../project-info/get';
import { getModsFolder } from '../../helpers/get-mods-folder';

type CopyModFileToModsFolderPayload = {
	instanceName: string;
	cachedFilePath: string;
	projectId: string;
	fileId: string;
}

export async function copyModFileToModsFolder(payload: CopyModFileToModsFolderPayload) {
	const modsFolder = getModsFolder(payload.instanceName);

	const projectInfo = await getProjectInfo(payload.projectId);

	const fileInfo = projectInfo.files.find(file => file.id === Number(payload.fileId)) || projectInfo.files[0];

	const fileName = fileInfo.name;
	const fileExtension = fileName.split('.').pop();

	const finalFilePath = path.join(modsFolder, fileName);

	if (fileExtension !== 'jar') {
		return;
	}

	fs.copyFileSync(payload.cachedFilePath, finalFilePath);
}