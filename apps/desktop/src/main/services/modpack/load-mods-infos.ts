import { ProjectInfo } from '../../../types/project-info';
import { getProjectInfo } from '../project-info/get';
import { fetchModpackFromApi } from './fetch-from-api';

export async function loadModpackInfos(modpackId: string, onProgress: (progress: number) => void): Promise<ProjectInfo[]> {
	const modpack = await fetchModpackFromApi(modpackId);
	const latestVersion = modpack.versions.find(version => version.tag === modpack.currentVersionTag);

	if (!latestVersion) {
		throw new Error('Latest version not found');
	}

	const projectInfos: ProjectInfo[] = [];

	for (let i = 0; i < latestVersion.files.length; i++) {
		const file = latestVersion.files[i];

		const projectInfo = await getProjectInfo(file.projectId);

		projectInfos.push(projectInfo);
		onProgress((i + 1) / latestVersion.files.length);
	}

	return projectInfos;

}