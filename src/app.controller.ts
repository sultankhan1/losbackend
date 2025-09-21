import { Controller, Get } from "@nestjs/common";
import { AppService } from "./app.service";

/**
 * Get the hello message.
 * @returns {string} The hello message.
 */
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
