import { Module } from "@nestjs/common";
import { ConstantService } from "./constant.service";

/**
 * Module for managing constants.
 * @description These constants are used throughout the application.
 * @module ConstantModule
 */
@Module({
  providers: [ConstantService],
  exports: [ConstantService],
  imports: [],
})
export class ConstantModule {}
