import { ProjectInfo } from '../../../types/project-info';
import { getProjectInfo } from '../project-info/get';
import { fetchModpackFromApi } from './fetch-from-api';

export type InfoProgressCallbackParams = {
	lastProjectName: string;
	progress: number;
}

export async function loadModpackInfos(modpackId: string, onProgress: (params: InfoProgressCallbackParams) => void): Promise<ProjectInfo[]> {
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
		onProgress({
			lastProjectName: projectInfo.title,
			progress: Math.round(((i + 1) / latestVersion.files.length) * 100)
		});
	}

	return projectInfos;

}