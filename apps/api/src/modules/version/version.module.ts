import { Module } from '@nestjs/common';
import { VersionService } from './version.service';
import { VersionController } from './version.controller';
import { PrismaService } from '../../shared/prisma/prisma.service';

@Module({
	controllers: [VersionController],
	providers: [VersionService, PrismaService],
})
export class VersionModule { }
