import path from 'path';
import fs from 'fs';

import { getUser } from '../../helpers/get-user';
import { getProjectInfo } from '../project-info/get';

type CopyModFileToModsFolderPayload = {
	instanceName: string;
	cachedFilePath: string;
	projectId: string;
	fileId: string;
}

export async function copyModFileToModsFolder(payload: CopyModFileToModsFolderPayload) {
	const user = getUser();
	const instancesDir = `C:\\Users\\${user}\\curseforge\\minecraft\\Instances`;
	const modsFolder = path.join(instancesDir, payload.instanceName, 'mods');

	const projectInfo = await getProjectInfo(payload.projectId);

	const fileInfo = projectInfo.files.find(file => file.id === Number(payload.fileId)) || projectInfo.files[0];

	const fileName = fileInfo.name;
	const fileExtension = fileName.split('.').pop();

	const finalFilePath = path.join(modsFolder, fileName);

	if (fileExtension !== 'jar') {
		console.log(`Arquivo não suportado: ${fileName}`);
		return;
	}

	fs.copyFileSync(payload.cachedFilePath, finalFilePath);
}