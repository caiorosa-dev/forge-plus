/* eslint-disable @typescript-eslint/no-explicit-any */
import { dialog, ipcMain } from 'electron';
import fs from 'fs';
import path from 'path';
import axios from 'axios';
import os from 'os';
import { ModpackManifest } from '../types/modpack-manifest';
import { ProjectInfo } from '../types/project-info';

const USER = os.userInfo().username;
const CF_INSTANCES_DIR = `C:\\Users\\${USER}\\curseforge\\minecraft\\Instances`;
const CACHE_INFO_DIR = `C:\\Users\\${USER}\\AppData\\Roaming\\Forge Plus\\cache\\info`;
const CACHE_FILES_DIR = `C:\\Users\\${USER}\\AppData\\Roaming\\Forge Plus\\cache\\files`;

const CFWIDGET_API = (projectId: number) => `https://api.cfwidget.com/${projectId}`;
const CURSEFORGE_DOWNLOAD_API = (projectId: number, fileId: number) =>
	`https://www.curseforge.com/api/v1/mods/${projectId}/files/${fileId}/download`;

export function registerIPCHandlers() {

	/**
	 * Retorna a lista de modpacks instalados em
	 * C:\Users\{USER}\curseforge\minecraft\Instances
	 */
	ipcMain.handle('curse-forge:get-instances', async () => {
		try {
			const instances = fs.readdirSync(CF_INSTANCES_DIR, { withFileTypes: true })
				.filter(dirent => dirent.isDirectory())
				.map(dirent => dirent.name);

			return instances;
		} catch (err) {
			console.error(err);
			return [];
		}
	});

	ipcMain.handle('dialog:open-file', async (_event, options) => {
		const result = await dialog.showOpenDialog(options);

		return result;
	});

	/**
	 * Recebe o caminho de um .json e retorna o objeto do manifest
	 */
	ipcMain.handle('manifest:load', async (_event, filePath: string) => {
		try {
			const data = fs.readFileSync(filePath, 'utf-8');
			const manifest: ModpackManifest = JSON.parse(data);
			return manifest;
		} catch (error) {
			console.error('Erro ao carregar manifest:', error);
			throw error;
		}
	});

	/**
	 * Executa o processo de:
	 * 1. Deletar o conteúdo da pasta mods
	 * 2. Buscar informações de cada mod (API ou cache)
	 * 3. Fazer download do mod (caso não exista no cache)
	 * 4. Enviar sinais de progresso
	 *
	 * @param manifest - O manifest carregado
	 * @param instanceName - O nome da pasta da instância no CF_INSTANCES_DIR
	 */
	ipcMain.on('modpack:update', async (event, { manifest, instanceName }) => {
		try {
			console.log('Iniciando atualização do modpack para a instância:', instanceName);
			const modsFolder = path.join(CF_INSTANCES_DIR, instanceName, 'mods');
			// 1. Deletar o conteúdo da pasta mods
			console.log('Deletando conteúdo da pasta mods:', modsFolder);
			fs.rmSync(modsFolder, { recursive: true, force: true });
			fs.mkdirSync(modsFolder, { recursive: true });

			// Passo 1: Buscar infos de todos os mods
			const modsInfo: { fileID: number, projectID: number, info: ProjectInfo }[] = [];
			console.log('Buscando informações dos mods...');

			for (let i = 0; i < manifest.files.length; i++) {
				const mod = manifest.files[i];
				const cacheInfoPath = path.join(CACHE_INFO_DIR, `${mod.projectID}.json`);
				console.log(`Processando mod: ${mod.projectID}`);

				// Sinal para o front-end
				event.sender.send('modpack:update-progress', {
					step: 'info',
					status: 'start',
					projectID: mod.projectID
				});

				// Verifica se existe cache de informação
				let modInfo = null;
				if (fs.existsSync(cacheInfoPath)) {
					console.log(`Carregando informações do cache para o mod: ${mod.projectID}`);
					// Carrega do cache
					const cachedData = JSON.parse(fs.readFileSync(cacheInfoPath, 'utf-8'));
					modInfo = cachedData;
				} else {
					console.log(`Buscando informações da API para o mod: ${mod.projectID}`);
					// Busca na API
					const response = await axios.get(CFWIDGET_API(mod.projectID));
					modInfo = response.data;

					// Salva no cache
					fs.mkdirSync(CACHE_INFO_DIR, { recursive: true });
					fs.writeFileSync(cacheInfoPath, JSON.stringify({
						...modInfo,
						lastRequestDate: new Date().toISOString()
					}, null, 2), 'utf-8');
					console.log(`Informações do mod ${mod.projectID} salvas no cache.`);
				}

				modsInfo.push({ fileID: mod.fileID, projectID: mod.projectID, info: modInfo });
			}

			// Passo 2: Download de todos os mods
			console.log('Iniciando download dos mods...');
			for (let i = 0; i < modsInfo.length; i++) {
				const { fileID, projectID, info } = modsInfo[i];
				const cacheFilePath = path.join(CACHE_FILES_DIR, `${fileID}`);
				const fileInfo = info.files.find(file => file.id === fileID) || info.files[0];
				let fileName = fileInfo.name;
				const fileExtension = fileName.split('.').pop();
				if (fileExtension !== 'jar') {
					console.log(`Arquivo não suportado: ${fileName}`);
					continue;
				}

				console.log(`Preparando download para o mod: ${projectID}, arquivo: ${fileID}`);

				// Sinal para o front-end
				event.sender.send('modpack:update-progress', {
					step: 'download',
					status: 'start',
					projectID: projectID,
					fileID: fileID
				});

				if (!fs.existsSync(cacheFilePath)) {
					console.log(`Arquivo não encontrado no cache, iniciando download: ${fileID}`);
					// Necessita download
					fs.mkdirSync(CACHE_FILES_DIR, { recursive: true });

					// Faz o download
					const downloadUrl = CURSEFORGE_DOWNLOAD_API(projectID, fileID);

					const writer = fs.createWriteStream(cacheFilePath);
					const response = await axios.get(downloadUrl, {
						responseType: 'stream',
						headers: {
							'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
						}
					});

					// A cada chunk, podemos enviar progresso
					const totalLength = Number(response.headers['content-length'] || 0);
					let downloaded = 0;

					response.data.on('data', (chunk: Buffer) => {
						downloaded += chunk.length;
						const progress = totalLength ? (downloaded / totalLength) * 100 : 0;
						console.log(`Progresso do download para ${fileID}: ${progress.toFixed(2)}%`);

						event.sender.send('modpack-update-progress', {
							step: 'download',
							status: 'progress',
							projectID: projectID,
							fileID: fileID,
							progress: progress.toFixed(2)
						});
					});

					// Espera terminar de escrever
					await new Promise<void>((resolve, reject) => {
						response.data.pipe(writer);
						writer.on('finish', () => {
							console.log(`Download completo para o arquivo: ${fileID}`);
							resolve();
						});
						writer.on('error', (err) => {
							console.error(`Erro ao baixar o arquivo: ${fileID}`, err);
							reject(err);
						});
					});
				}


				if (!fileInfo) {
					fileName = `mod-${info.title}-${fileID}.${fileExtension}`;
				}

				const finalModFilePath = path.join(modsFolder, fileName);
				console.log(`Copiando arquivo para a pasta mods: ${finalModFilePath}`);
				fs.copyFileSync(cacheFilePath, finalModFilePath);
			}

			// Finalizado
			console.log('Atualização do modpack concluída com sucesso.');
			event.sender.send('modpack:update-complete', { success: true });
		} catch (error: any) {
			console.error('Erro ao atualizar modpack:', error);
			event.sender.send('modpack:update-error', { success: false, error: error.message });
		}
	});
}

