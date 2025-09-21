import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class CommonUtilsService {
  constructor(private readonly configService: ConfigService) {
  }

  /**
   * Generates a random number with the specified number of digits.
   * @param digits The number of digits for the random number.
   * @returns The generated random number.
   */
  generateRandomNumber = (digits: number) => {
    const min = Math.pow(10, digits - 1);
    const max = Math.pow(10, digits) - 1;
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  /**
   * Extracts the first name and last name from a full name.
   * @param fullName The full name.
   * @returns An object containing the first name and last name.
   */
  extractNames = (fullName) => {
    const names = fullName.trim().split(/\s+/);
    let firstName, lastName;

    if (names.length > 1) {
      lastName = names.pop(); // Remove and save the last element as the last name
      firstName = names.join(" "); // Join the remaining elements as the first name
    } else {
      firstName = names[0];
      lastName = null; // or '' if you prefer an empty string over null
    }

    return { firstName, lastName };
  };

  /**
   * Generates a random suffix consisting of 3 lowercase characters.
   * @returns The generated random suffix.
   */
  generateRandomSuffix() {
    const characters = "abcdefghijklmnopqrstuvwxyz";
    let suffix = "";
    for (let i = 0; i < 3; i++) {
      suffix += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
    return suffix;
  }

  /**
   * Generates a random string using the last 4 digits of a phone number and the first 3 characters of a name.
   * @param phoneNumber The phone number.
   * @param name The name.
   * @returns The generated random string.
   */
  generateRandomString = (phoneNumber: string, name: string) => {
    const numberPart = phoneNumber.slice(-4); // Take last 4 digits from the phone number
    const namePart = name.replace(/\s/g, "").slice(0, 3).toLowerCase(); // Take first 3 characters from the name, remove spaces and convert to lowercase
    return `cersai${numberPart}${namePart}`;
  };


  /**
   * @description Validates the list of the tags in the text.
   * @param text The text to validate.
   * @param inTextTags The list of tags to validate.
   * @example validateTextWithTags("Hello {{FIRST_NAME}}", ["FIRST_NAME"]) => { status: true, message: "All Required Tags Are Present" }
   * @type {string}
   */
  validateTextWithTags = async (
    text: string,
    inTextTags: string[]
  ): Promise<{ status: boolean; message: string }> => {
    const pattern = /\{\{(.*?)\}\}/g;
    let match;

    let missingTags = [];

    // Extract tags from the text and remove the {{ and }}
    while ((match = pattern.exec(text)) !== null) {
      const tagWithoutBraces = match[1].trim(); // Extracts the content within the braces.

      if (!inTextTags.includes(tagWithoutBraces)) {
        missingTags.push(tagWithoutBraces);
      }
    }

    if (missingTags.length > 0)
      return {
        status: false,
        message: `Please provide all the tags. Missing ${missingTags.length === 1 ? "is" : "are"} ${missingTags}`,
      };
    else
      return {
        status: true,
        message: `All Required Tags Are Present`,
      };
  };
  
  /**
   * Validates if a given text is a valid UUID.
   * @param {string} text - The text to be validated.
   * @returns {Promise<boolean>} - A promise that resolves to a boolean indicating if the text is a valid UUID.
   * @example validateUUID('123e4567-e89b-12d3-a456-426614174000') // true
   * @example validateUUID('123e4567-e89b-12d3-a456-42661417400') // false
   */
  validateAnyUUID = async (text: string): Promise<boolean> => {
    return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(
      text
    );
  };

  getExtensionFromMimeType = async (mimeType): Promise<string> => {
    // Fallback MIME type to extension mappings
    const mimeTypes = new Map([
      ["image/png", "png"],
      ["image/jpeg", "jpg"],
      ["image/jpeg", "jpeg"],
      ["application/pdf", "pdf"],
      // Add more as needed
    ]);

    // Check if MIME type exists in the map, else return 'Unknown'
    return mimeTypes.get(mimeType) || "Unknown";
  }


  generateUserIdWithTimestamp = async (userId): Promise<string> => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");
    const milliseconds = String(now.getMilliseconds()).padStart(3, "0");

    const timestamp = `${year}${month}${day}${hours}${minutes}${seconds}${milliseconds}`;

    return `${userId}:${timestamp}`;
  };

  getISTTimestamp = async (): Promise<string> => {
    // Create a new Date object
    const now = new Date();

    // Convert to IST (UTC+5:30)
    const offset = 5.5 * 60 * 60 * 1000; // Offset in milliseconds
    const istTime = new Date(now.getTime() + offset);

    // Format the date and time components
    const year = istTime.getUTCFullYear();
    const month = String(istTime.getUTCMonth() + 1).padStart(2, "0");
    const day = String(istTime.getUTCDate()).padStart(2, "0");
    const hours = String(istTime.getUTCHours()).padStart(2, "0");
    const minutes = String(istTime.getUTCMinutes()).padStart(2, "0");
    const seconds = String(istTime.getUTCSeconds()).padStart(2, "0");

    // Construct the timestamp in the desired format
    const timestamp = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;


    return timestamp;
  };

  generateRandomUSPhoneNumber(): string {
    // Generate a random 10-digit number
    const randomNumber = Math.floor(Math.random() * 9000000000) + 1000000000;
    // Format as +1XXXXXXXXXX
    return `${randomNumber}`;
  }

  replaceTemplateValues = async (template: string, values: any): Promise<string> => {
   
    // Loop through the values and replace the template tags with the corresponding values

    for (const key in values) {
      // Create the regular expression to match the template tag e.g "{{FIRST_NAME}}"
      const pattern = new RegExp(`{{${key}}}`, 'g');

      // Replace the template tag with the corresponding value
      template = template.replace(pattern, values[key]);

    }

    return template;
  };

}