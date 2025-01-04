import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { ModpackService } from './modpack.service';
import { Modpack } from '@prisma/client';
import { CreateModpackDto } from './dto/create-modpack.dto';
import { ApiKeyGuard } from '../../shared/api-key.guard';

@Controller('modpacks')
export class ModpackController {
	constructor(private readonly modpackService: ModpackService) { }

	@Get()
	async getAllModpacks(): Promise<Modpack[]> {
		return this.modpackService.getAllModpacks();
	}

	@Get(':id')
	async getModpackById(@Param('id') id: string): Promise<Modpack | null> {
		return this.modpackService.getModpackById(id);
	}

	@UseGuards(ApiKeyGuard)
	@Post()
	async createModpack(@Body() modpackData: CreateModpackDto): Promise<Modpack> {
		return this.modpackService.createModpack(modpackData);
	}
}
