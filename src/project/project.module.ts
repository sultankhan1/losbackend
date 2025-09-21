import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { ResponseModule } from '../common/response/response.module';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';

@Module({
  imports: [
    PrismaModule,
    ResponseModule,
  ],
  controllers: [ProjectController],
  providers: [ProjectService],
  exports: [ProjectService],
})
export class ProjectModule {}
