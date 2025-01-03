import { IsString, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class FileDto {
	@IsString()
	projectId: string;

	@IsString()
	fileId: string;
}

export class CreateVersionDto {
	@IsString()
	modpackId: string;

	@IsString()
	tag: string;

	@IsArray()
	@ValidateNested({ each: true })
	@Type(() => FileDto)
	files: FileDto[];
} 