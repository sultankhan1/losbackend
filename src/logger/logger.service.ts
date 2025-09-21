import { Injectable, LoggerService as NestLoggerService } from "@nestjs/common";
import { createLogger, transports, format, Logger } from "winston";
import DailyRotateFile from "winston-daily-rotate-file";
import { join } from "path";
import * as fs from "fs";
import { CommonUtilsService } from "src/common/common_utils/common_utils.service";
import { ConstantService } from "src/constant/constant.service";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class LoggerService implements NestLoggerService {
  private readonly logger: Logger;

  constructor(
    private readonly commonUtilsService: CommonUtilsService,
    private readonly constantService: ConstantService,
    private readonly configService: ConfigService
  ) {

    const logDir = join(process.cwd(), "logs");
    const levels = [
      "error",
      "warn",
      "info",
      "http",
      "verbose",
      "debug",
      "silly",
    ];

    // Ensure log directories exist
    levels.forEach((level) => {
      const levelDir = join(logDir, level);
      if (!fs.existsSync(levelDir)) {
        fs.mkdirSync(levelDir, { recursive: true });
      }
    });

    const createDailyRotateTransport = (level: string) => {
      return new DailyRotateFile({
        filename: join(logDir, level, "%DATE%.log"),
        datePattern: "YYYY-MM-DD",
        level: level,
        auditFile: join(logDir, level, "audit.json"), // Specify the audit file path
      });
    };

    this.logger = createLogger({
      level: "silly", // Use the most verbose log level
      format: format.combine(
        format.label({ label: "Log Rotation" }),
        format.timestamp({ format: "MMM-DD-YYYY HH:mm:ss" }),
        format.printf(
          ({ level, message, label, timestamp }) =>
            `${timestamp} [${label}] ${level}: ${message}`
        )
      ),
      transports: [
        ...levels.map((level) => createDailyRotateTransport(level)),
        new transports.Console({
          format: format.combine(
            format.colorize(),
            format.printf(
              ({ level, message, label, timestamp }) =>
                `${timestamp} [${label}] ${level}: ${message}`
            )
          ),
        }),
      ],
    });

    // Error handling
    this.logger.on("error", (err) => {
      console.error("Logging error:", err);
    });

    // Debugging information to check if audit file is being created
    this.logger.debug("Logger initialized");
  }

  getLogger() {
    return this.logger;
  }

  log(message: string) {
    this.logger.info(message);
  }

  error(message: string, trace?: string) {
    this.logger.error(`${message} - ${trace || ""}`);
  }

  warn(message: string) {
    this.logger.warn(message);
  }

  debug(message: string) {
    this.logger.debug(message);
  }

  verbose(message: string) {
    this.logger.verbose(message);
  }

}
