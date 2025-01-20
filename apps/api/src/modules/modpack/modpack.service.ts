import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../shared/prisma/prisma.service';
import { Modpack } from '@prisma/client';
import { CreateModpackDto } from './dto/create-modpack.dto';

@Injectable()
export class ModpackService {
	constructor(private readonly prisma: PrismaService) { }

	async getAllModpacks(): Promise<Modpack[]> {
		return this.prisma.modpack.findMany({
			include: {
				versions: {
					orderBy: {
						createdAt: 'desc'
					}
				}
			},
			orderBy: {
				createdAt: 'desc'
			}
		});
	}

	async getModpackById(id: string): Promise<Modpack | null> {
		return this.prisma.modpack.findUnique({
			where: { id },
			include: {
				versions: {
					orderBy: {
						createdAt: 'desc'
					}
				},
			}
		});
	}

	async createModpack(data: CreateModpackDto): Promise<Modpack> {
		return this.prisma.modpack.create({
			data,
		});
	}
}
