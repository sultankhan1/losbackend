import { Injectable } from "@nestjs/common"
/**
 * Service class for the application.
 */
@Injectable()
export class AppService {
  /**
   * Retrieves a hello message.
   * @returns {string} The hello message.
   */
  /**
   * Retrieves a hello message.
   * @returns {string} The hello message.
   */
  getHello(): string {
    const topBottomBorder = "✽✽✽✽✽✽✽✽✽✽✽✽✽✽✽✽✽✽✽✽✽✽✽✽✽✽✽✽✽✽✽✽✽✽✽✽";
    const middleBorder =
      "✽                                                      ✽";
    const greeting = "Welcome to LOS";
    // Center the greeting text within the middle border
    const spacesBeforeGreeting = middleBorder.length / 2 - greeting.length / 2;
    const paddedGreeting = `✽${" ".repeat(spacesBeforeGreeting)}${greeting}${" ".repeat(spacesBeforeGreeting)}✽`;

    return `${topBottomBorder}\n${middleBorder}\n${paddedGreeting}\n${middleBorder}\n${topBottomBorder}`;
  }
}
