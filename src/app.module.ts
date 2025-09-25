/* eslint-disable prettier/prettier */
import { Module, MiddlewareConsumer, RequestMethod } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { ResponseModule } from "./common/response/response.module";
import { ConstantModule } from "./constant/constant.module";
import * as path from "path";
import { CommonUtilsModule } from "./common/common_utils/common_utils.module";
import { LoggerModule } from "./logger/logger.module";
import { PrismaModule } from "./prisma/prisma.module";
import { ApplicationModule } from './application/application.module';
import { ProjectModule } from './project/project.module';
import { ChatModule } from './chat/chat.module';
import { UserModule } from './user/user.module';

/**
 * The main module of the CMS service.
 *
 * @module AppModule
 */
@Module({
  imports: [
    PrismaModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: path.join(process.cwd(), "./.env"),
    }),
    LoggerModule,
    CommonUtilsModule,
    ConstantModule,
    ResponseModule,
    ApplicationModule,
    ProjectModule,
    ChatModule,
    UserModule,
  ],
  controllers: [
    AppController
  ],
  providers: [
    AppService  ],
})
export class AppModule {
  constructor() { }
  configure(consumer: MiddlewareConsumer) {
    // consumer
    //   .apply(LoggerMiddleware)
    //   .forRoutes({ path: '*', method: RequestMethod.ALL });
    // consumer
    //   .apply(DecryptMiddleware)
    //   .forRoutes({ path: '/pandirectory/api', method: RequestMethod.POST })
  }
}