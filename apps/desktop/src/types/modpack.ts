export type Modpack = {
	id: string;
	displayName: string;
	curseForgeInstanceName: string;
	image: string;
	description: string;
	modCount: number;
	minecraftVersion: string;
	forgeVersion: string;
	currentVersionTag: string;
	versions: ModpackVersion[];
	updatedAt: Date;
	createdAt: Date;
};

export type VersionFile = {
	projectId: string;
	fileId: string;
};

export type ModpackVersion = {
	id: string;
	modpackId: string;
	tag: string;
	files: VersionFile[];
	createdAt: Date;
};

export type LocalModpack = {
	modpackId: string;
	installedVersionTag: string;
}
