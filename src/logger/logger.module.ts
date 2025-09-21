import { Module } from "@nestjs/common";
import { LoggerService } from "./logger.service";
import { CommonUtilsModule } from "src/common/common_utils/common_utils.module";
import { CommonUtilsService } from "src/common/common_utils/common_utils.service";
import { ConstantModule } from "src/constant/constant.module"
import { ConstantService } from "src/constant/constant.service"

/**
 * Module for providing and exporting the LoggerService.
 */
@Module({
  providers: [LoggerService],
  exports: [LoggerService],
  imports: [CommonUtilsModule, ConstantModule]
})
export class LoggerModule {}
