import fs from 'fs/promises';

export async function asyncFileExists(filePath: string): Promise<boolean> {
	try {
		await fs.access(filePath);
		return true;
	} catch (error) {
		return false;
	}
}