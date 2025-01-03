import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './shared/prisma/prisma.module';
import { ModpackModule } from './modules/modpack/modpack.module';
import { VersionModule } from './modules/version/version.module';

@Module({
  imports: [PrismaModule, ModpackModule, VersionModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
