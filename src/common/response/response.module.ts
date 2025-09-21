/* eslint-disable prettier/prettier */
import { Module } from "@nestjs/common";
import { ResponseService } from "./response.service";

/**
 * Module for handling responses that are used as the common response structure for all the responses of the API in the Application.
 */
@Module({
  providers: [ResponseService],
  exports: [ResponseService],
})
export class ResponseModule { }
