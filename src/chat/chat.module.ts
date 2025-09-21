import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { ResponseModule } from '../common/response/response.module';
import { ProjectModule } from '../project/project.module';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';

@Module({
  imports: [
    PrismaModule,
    ResponseModule,
    ProjectModule,
  ],
  controllers: [ChatController],
  providers: [ChatService],
  exports: [ChatService],
})
export class ChatModule {}
