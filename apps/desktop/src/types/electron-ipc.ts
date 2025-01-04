export type SendChannelType =
	'modpack:install';

export type InvokeChannelType =
	'curse-forge:get-instances'
	| 'modpack:load-infos'
	| 'cache:clean'
	| 'upload:modpack'
	| 'upload:version'
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
		projectId: string;
		name: string;
		image: string;
	}[];
};

export type ModpackInstallQueueRemoveData = {
	projectId: string;
};

export type ModpackInstallProgressData = {
	currentMod: {
		name: string;
		version: string;
		projectId: string;
		progress: number;
	};
	totalProgress: number;
};

