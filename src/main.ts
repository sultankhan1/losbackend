import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { HttpException, HttpStatus, ValidationPipe } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { HttpExceptionFilter } from "./common/filters/http-exception.filters";
import express from "express";
import * as bodyParser from "body-parser";
import { ExpressAdapter } from '@nestjs/platform-express';

/**
 * Initializes and starts the server.
 * @returns {Promise<void>}
 */
async function bootstrap() {
  // Below code is for express adapter
  const expressApp = express();
  expressApp.disable("x-powered-by");
  const adapter = new ExpressAdapter(expressApp);

  const app = await NestFactory.create(AppModule, adapter);
  // Set body-parser limits
  app.use(bodyParser.json({ limit: "15mb" }));
  app.use(bodyParser.urlencoded({ limit: "15mb", extended: true }));

  const configService = app.get(ConfigService);
  app.setGlobalPrefix(configService.get("API_VERSION") || "v1");
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      // transformOptions:{
      //   enableImplicitConversion: true
      // }
      exceptionFactory: (errors) => {
        const result = errors.map((error) => ({
          property: error.property,
          message: error.constraints[Object.keys(error.constraints)[0]],
        }));
        return new HttpException(
          {
            status: "failed",
            message: "Validation failed",
            data: result,
          },
          HttpStatus.BAD_REQUEST
        );
      },
      stopAtFirstError: true,
    })
  );
  // Build origins array, filtering out undefined values
  const origins = [
    /^http:\/\/localhost:\d+$/,
    /^http:\/\/127\.0\.0\.1:\d+$/,
  ];
  
  const frontendUrl = configService.get<string>("FRONTEND_URL");
  if (frontendUrl) {
    origins.push(new RegExp(frontendUrl));
  }

  console.log('CORS Origins configured:', origins);

  // More explicit CORS configuration
  app.enableCors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);
      
      // Check if origin matches our allowed patterns
      const isAllowed = origins.some(pattern => {
        if (pattern instanceof RegExp) {
          return pattern.test(origin);
        }
        return pattern === origin;
      });
      
      if (isAllowed) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "Accept", "Origin", "X-Requested-With", "userid"],
    credentials: true,
  });
  /**
   * The port number for the server.
   * If the `PORT` environment variable is set, it will be used. Otherwise, the default value is 3000.
   * @type {number}
   */
  const PORT = parseInt(process.env.PORT) || 3000;
  await app.listen(PORT);

  console.log(`Server started at ${PORT}`);
}
bootstrap();