/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { createContext, useState, useCallback, useContext } from 'react';
import { ModpackInstallProgressData, ModpackInstallQueueStartData, ModpackInstallQueueRemoveData, ModpackInstallErrorData, InfoProgressData } from '../../types/electron-ipc';
import { useListener } from '../hooks/use-listener';
import { useQueryClient } from '@tanstack/react-query';

type InstallModpackPayload = {
	modpackId: string;
	versionTag: string;
	loadToCache: boolean;
};

interface ModpackDownloadContextProps {
	totalProgress: number;
	loadInfosProgress: InfoProgressData | null;
	queue: ModpackInstallQueueStartData['queue'];
	currentMod: ModpackInstallProgressData['currentMod'] | null;
	error: ModpackInstallErrorData | null;
	isDownloading: boolean;
	isWorking: boolean;
	installModpack: (payload: InstallModpackPayload) => void;
}

const ModpackDownloadContext = createContext<ModpackDownloadContextProps | undefined>(undefined);

export const ModpackDownloadProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const queryClient = useQueryClient();

	const [queue, setQueue] = useState<ModpackInstallQueueStartData['queue']>([]);
	const [currentMod, setCurrentMod] = useState<ModpackInstallProgressData['currentMod'] | null>(null);
	const [totalProgress, setTotalProgress] = useState<number>(0);
	const [error, setError] = useState<ModpackInstallErrorData | null>(null);
	const [isDownloading, setIsDownloading] = useState<boolean>(false);
	const [isWorking, setIsWorking] = useState<boolean>(false);
	const [loadInfosProgress, setLoadInfosProgress] = useState<InfoProgressData | null>(null);

	const handleProgress = useCallback((_event: any, data: ModpackInstallProgressData) => {
		setTotalProgress(data.totalProgress);
		setCurrentMod(data.currentMod);
	}, []);

	const handleQueueStart = useCallback((_event: any, data: ModpackInstallQueueStartData) => {
		setQueue(data.queue);
		setIsDownloading(true);
	}, []);

	const handleLoadInfosProgress = useCallback((_event: any, data: InfoProgressData) => {
		setLoadInfosProgress(data);
	}, []);

	const handleQueueRemove = useCallback((_event: any, data: ModpackInstallQueueRemoveData) => {
		setQueue(prevQueue => prevQueue.filter(mod => mod.projectId !== data.projectId));
	}, [queue]);

	const handleError = useCallback((_event: any, data: ModpackInstallErrorData) => {
		setError(data);
		cleanState();
		alert(data.message);
	}, []);

	const handleSuccess = useCallback(() => {
		cleanState();
		alert('Modpack instalado com sucesso');
	}, []);

	function cleanState() {
		setIsDownloading(false);
		setIsWorking(false);
		setTotalProgress(0);
		setQueue([]);
		setCurrentMod(null);
		setError(null);
		setLoadInfosProgress(null);

		queryClient.invalidateQueries({ queryKey: ['local-modpacks'] });
	}

	const installModpack = useCallback((payload: InstallModpackPayload) => {
		setIsWorking(true);
		window.api.send('modpack:install', payload);
	}, []);

	useListener<ModpackInstallQueueStartData>('modpack:install:queue:start', handleQueueStart);
	useListener<ModpackInstallQueueRemoveData>('modpack:install:queue:remove', handleQueueRemove);
	useListener<ModpackInstallProgressData>('modpack:install:progress', handleProgress);
	useListener<ModpackInstallErrorData>('modpack:install:error', handleError);
	useListener<InfoProgressData>('modpack:load-infos:progress', handleLoadInfosProgress);
	useListener('modpack:install:success', handleSuccess);

	return (
		<ModpackDownloadContext.Provider value={{ totalProgress, queue, currentMod, error, isDownloading, isWorking, installModpack, loadInfosProgress }}>
			{children}
		</ModpackDownloadContext.Provider>
	);
};

export const useModpackDownload = (): ModpackDownloadContextProps => {
	const context = useContext(ModpackDownloadContext);

	if (context === undefined) {
		throw new Error('useModpackDownload must be used within a ModpackDownloadProvider');
	}

	return context;
};
