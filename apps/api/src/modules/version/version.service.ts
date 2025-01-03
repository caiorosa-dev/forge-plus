import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../shared/prisma/prisma.service';
import { CreateVersionDto } from './dto/create-version.dto';

@Injectable()
export class VersionService {
	constructor(private readonly prisma: PrismaService) { }

	async getAllVersionsByModpackId(modpackId: string) {
		return this.prisma.modpackVersion.findMany({
			where: { modpackId },
		});
	}

	async getVersionById(id: string) {
		return this.prisma.modpackVersion.findUnique({
			where: { id },
		});
	}

	async createVersion(data: CreateVersionDto) {
		return this.prisma.modpackVersion.create({
			data: {
				modpackId: data.modpackId,
				tag: data.tag,
				files: data.files as any,
			},
		});
	}

	async deleteVersion(id: string) {
		return this.prisma.modpackVersion.delete({
			where: { id },
		});
	}
}
