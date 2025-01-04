import { Controller, Get, Post, Delete, Param, Body, NotFoundException, UseGuards } from '@nestjs/common';
import { VersionService } from './version.service';
import { CreateVersionDto } from './dto/create-version.dto';
import { PrismaService } from '../../shared/prisma/prisma.service';
import { ApiKeyGuard } from '../../shared/api-key.guard';

@Controller('versions')
export class VersionController {
	constructor(
		private readonly versionService: VersionService,
		private readonly prisma: PrismaService
	) { }

	@Get()
	async getAllVersionsByModpackId(@Param('modpackId') modpackId: string) {
		return this.versionService.getAllVersionsByModpackId(modpackId);
	}

	@Get(':id')
	async getVersionById(@Param('id') id: string) {
		return this.versionService.getVersionById(id);
	}

	@UseGuards(ApiKeyGuard)
	@Post()
	async createVersion(@Body() createVersionDto: CreateVersionDto) {
		const modpackExists = await this.prisma.modpack.findUnique({
			where: { id: createVersionDto.modpackId },
		});

		if (!modpackExists) {
			throw new NotFoundException('Modpack not found');
		}

		return this.versionService.createVersion(createVersionDto);
	}

	@UseGuards(ApiKeyGuard)
	@Delete(':id')
	async deleteVersion(@Param('id') id: string) {
		return this.versionService.deleteVersion(id);
	}
}
