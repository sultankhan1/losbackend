import { Module } from "@nestjs/common";
import { CommonUtilsService } from "./common_utils.service.js";
import { ConfigModule } from "@nestjs/config";

/**
 * Module for common utility functions.
 */
@Module({
  providers: [CommonUtilsService],
  exports: [CommonUtilsService],
  imports: [ConfigModule]
})
export class CommonUtilsModule {}
