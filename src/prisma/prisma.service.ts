/* eslint-disable prettier/prettier */
import { INestApplication, Injectable, OnModuleInit } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";

@Injectable()
/**
 * PrismaService class extends PrismaClient and implements OnModuleInit.
 * It provides methods to connect to the Prisma database and enable shutdown hooks.
 */
export class PrismaService extends PrismaClient implements OnModuleInit {
  /**
   * Initializes the Prisma client by connecting to the database.
   */
  async onModuleInit() {
    await this.$connect();
  }

  /**
   * Enables shutdown hooks to gracefully close the application.
   * @param app - The INestApplication instance.
   */
  async enableShutdownHooks(app: INestApplication) {
    (this.$on as any)("beforeExit", async () => {
      await app.close();
    });
  }
}
