import axios from 'axios';
import { openJsonManifestDialog } from '../../helpers/open-json-dialog';
import { API_URL } from '../../../app.config';
import { ModpackManifest } from '../../../types/modpack-manifest';

export type UploadModpackVersionPayload = {
	apiKey: string;
	modpackId: string;
	versionTag: string;
	manifest?: ModpackManifest;
}

export async function uploadModpackVersion(payload: UploadModpackVersionPayload) {
	const { apiKey, modpackId, versionTag, manifest } = payload;
	let manifestToUse = manifest;

	if (!manifestToUse) {
		const { manifest: dialogManifest } = await openJsonManifestDialog();

		manifestToUse = dialogManifest;
	}

	const files = manifestToUse.files.map((file: ModpackManifest['files'][number]) => ({
		projectId: file.projectID.toString(),
		fileId: file.fileID.toString()
	}));

	const response = await axios.post(`${API_URL}/versions`, {
		modpackId,
		tag: versionTag,
		files
	}, {
		headers: {
			Authorization: apiKey
		}
	});

	return response.data;
}