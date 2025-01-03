import { Module } from '@nestjs/common';
import { ModpackService } from './modpack.service';
import { ModpackController } from './modpack.controller';
import { PrismaService } from '../../shared/prisma/prisma.service';

@Module({
	controllers: [ModpackController],
	providers: [ModpackService, PrismaService],
})
export class ModpackModule { }
