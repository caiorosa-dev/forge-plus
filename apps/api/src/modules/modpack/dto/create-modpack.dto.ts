import { IsString, IsInt, IsOptional } from 'class-validator';

export class CreateModpackDto {
	@IsString()
	displayName: string;

	@IsString()
	@IsOptional()
	image?: string;

	@IsString()
	@IsOptional()
	description?: string;

	@IsInt()
	@IsOptional()
	modCount?: number;

	@IsString()
	minecraftVersion: string;

	@IsString()
	curseForgeInstanceName: string;

	@IsString()
	forgeVersion: string;

	@IsString()
	currentVersionTag: string;
} 