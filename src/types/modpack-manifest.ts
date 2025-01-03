export type ModpackManifest = {
	minecraft: {
		version: string;
		modLoaders: Array<{
			id: string;
			primary: boolean;
		}>;
	};
	manifestType: string;
	manifestVersion: number;
	name: string;
	version: string;
	author?: string;
	files: Array<{
		projectID: number;
		fileID: number;
		required: boolean;
	}>;
	overrides: string;
}
