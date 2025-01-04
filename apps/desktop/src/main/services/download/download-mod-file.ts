import axios, { AxiosRequestConfig } from 'axios';
import fs from 'fs';
import path from 'path';

import { VersionFile } from '../../../types/modpack';
import { app } from 'electron';

type DownloadModFileResult = {
	filePath: string;
}

export async function downloadModFile(versionFile: VersionFile, onProgress?: (progress: number) => void): Promise<DownloadModFileResult> {
	const url = `https://www.curseforge.com/api/v1/mods/${versionFile.projectId}/files/${versionFile.fileId}/download`;

	const cacheFilesDir = path.join(app.getPath('appData'), 'Forge Plus', 'app-cache', 'files');
	const cacheFilePath = path.join(cacheFilesDir, `${versionFile.projectId}-${versionFile.fileId}`);

	const requestConfig: AxiosRequestConfig = {
		responseType: 'stream',
		headers: {
			'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
		}
	}

	if (fs.existsSync(cacheFilePath)) {
		onProgress?.(100);
		return {
			filePath: cacheFilePath
		};
	}

	fs.mkdirSync(cacheFilesDir, { recursive: true });

	const writerStream = fs.createWriteStream(cacheFilePath);
	const response = await axios.get(url, requestConfig);

	const totalLength = Number(response.headers['content-length'] || 0);
	let downloaded = 0;

	response.data.on('data', (chunk: Buffer) => {
		downloaded += chunk.length;
		const progressPercentage = totalLength ? (downloaded / totalLength) * 100 : 0;

		onProgress?.(progressPercentage);
	});

	await new Promise<void>((resolve, reject) => {
		response.data.pipe(writerStream);
		writerStream.on('finish', () => {
			resolve();
		});
		writerStream.on('error', (err) => {
			console.error(`Erro ao baixar o arquivo: ${versionFile.fileId}`, err);
			reject(err);
		});
	});

	return {
		filePath: cacheFilePath
	};
}
