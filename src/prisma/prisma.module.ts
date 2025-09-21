import { Module } from "@nestjs/common";
import { PrismaService } from "./prisma.service";

/**
 * PrismaModule is responsible for providing and exporting the PrismaService.
 * @module PrismaModule
 */
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
