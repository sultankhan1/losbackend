import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { ResponseModule } from '../common/response/response.module';
import { HeaderAuthGuard } from './guards/header-auth.guard';
import { ApplicationService } from './application.service';
import { ApplicationController } from './application.controller';

@Module({
  imports: [
    PrismaModule,
    ResponseModule,
  ],
  controllers: [ApplicationController],
  providers: [HeaderAuthGuard, ApplicationService],
  exports: [HeaderAuthGuard, ApplicationService],
})
export class ApplicationModule { } 