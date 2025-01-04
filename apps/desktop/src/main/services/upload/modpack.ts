import axios from 'axios';
import { openJsonManifestDialog } from '../../helpers/open-json-dialog';
import { API_URL } from '../../../app.config';
import { uploadModpackVersion } from './modpack-version';

export type UploadModpackPayload = {
	apiKey: string;
	displayName: string;
	image: string;
}

export async function uploadModpack(payload: UploadModpackPayload) {
	const { apiKey, displayName, image } = payload;

	const { manifest } = await openJsonManifestDialog();

	const response = await axios.post(`${API_URL}/modpacks`, {
		displayName,
		image,
		description: 'NOT_PROVIDED_YET',
		modCount: manifest.files.length,
		minecraftVersion: manifest.minecraft.version,
		curseForgeInstanceName: manifest.name,
		forgeVersion: manifest.minecraft.modLoaders[0].id.split('-')[1],
		currentVersionTag: manifest.version,
	}, {
		headers: {
			Authorization: apiKey
		}
	});

	await uploadModpackVersion({
		apiKey,
		modpackId: response.data.id,
		versionTag: manifest.version,
		manifest
	});

	return response.data;
}