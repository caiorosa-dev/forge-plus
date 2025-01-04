export type IPCChannelType =
	'curse-forge:get-instances'
	| 'modpack:load-infos'
	| 'modpack:load-infos:progress'
	| 'modpack:sync'
	| 'modpack:sync:progress'
	| 'modpack:sync:success'
	| 'local-modpacks:get-all';