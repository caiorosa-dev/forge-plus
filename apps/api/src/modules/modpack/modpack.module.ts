import { Module } from '@nestjs/common';
import { ModpackService } from './modpack.service';
import { ModpackController } from './modpack.controller';

@Module({
	controllers: [ModpackController],
	providers: [ModpackService],
})
export class ModpackModule { }
