import axios from 'axios';
import { API_URL } from '../../../app.config';
import { Modpack } from '../../../types/modpack';

export async function fetchModpackFromApi(modpackId: string): Promise<Modpack> {
	const response = await axios.get<Modpack>(`${API_URL}/modpacks/${modpackId}`);

	return response.data;
}