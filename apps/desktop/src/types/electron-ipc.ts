export type SendChannelType =
	'modpack:install';

export type InvokeChannelType =
	'curse-forge:get-instances'
	| 'modpack:load-infos'
	| 'cache:clean'
	| 'local-modpacks:get-all';

export type EventChannelType =
	'modpack:install:error'
	| 'modpack:install:info:progress'
	| 'modpack:install:queue:start'
	| 'modpack:install:queue:remove'
	| 'modpack:install:progress'
	| 'modpack:install:success'
	| 'modpack:load-infos:progress';

export type ModpackInstallErrorData = {
	message: string;
};

export type InfoProgressData = {
	lastProjectName: string;
	progress: number;
};

export type ModpackInstallQueueStartData = {
	queue: {
		projectId: number;
		name: string;
		image: string;
	}[];
};

export type ModpackInstallQueueRemoveData = {
	projectId: number;
};

export type ModpackInstallProgressData = {
	currentMod: {
		name: string;
		version: string;
		projectId: number;
		progress: number;
	};
	totalProgress: number;
};

