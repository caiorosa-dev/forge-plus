import axios, { AxiosRequestConfig } from 'axios';
import fs from 'fs/promises';
import path from 'path';
import { createWriteStream } from 'fs';

import { VersionFile } from '../../../types/modpack';
import { app } from 'electron';
import { asyncFileExists } from '../../helpers/file-exists';

type DownloadModFileResult = {
	filePath: string;
	alreadyExists: boolean;
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


	if (await asyncFileExists(cacheFilePath)) {
		onProgress?.(100);
		return {
			filePath: cacheFilePath,
			alreadyExists: true
		};
	}

	await fs.mkdir(cacheFilesDir, { recursive: true });

	const response = await axios.get(url, requestConfig);

	const totalLength = Number(response.headers['content-length'] || 0);
	let downloaded = 0;

	const writerStream = createWriteStream(cacheFilePath);
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
		filePath: cacheFilePath,
		alreadyExists: false
	};
}
