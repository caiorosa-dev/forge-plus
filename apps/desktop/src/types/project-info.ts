export type ProjectInfo = {
	id: number;
	title: string;
	summary: string;
	description: string;
	game: string;
	type: string;
	urls: {
		curseforge: string;
		project: string;
	};
	thumbnail: string;
	created_at: string;
	downloads: {
		monthly: number;
		total: number;
	};
	license: string;
	donate: string;
	categories: string[];
	members: {
		title: string;
		username: string;
		id: number;
	}[];
	links: string[];
	files: {
		id: number;
		url: string;
		display: string;
		name: string;
		type: string;
		version: string;
		filesize: number;
		versions: string[];
		downloads: number;
		uploaded_at: string;
	}[];
}
