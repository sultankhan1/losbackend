import { Injectable, NestMiddleware } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";
import { LoggerService } from "./logger.service";

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(private readonly loggerService: LoggerService) { }

  use(req: Request, res: Response, next: NextFunction) {
    const oldSend = res.send;
    const startHrTime = process.hrtime();
    const urlPath = req.route.path;
    // Use the regex to replace `/*` with an empty string
    const cleanedPath = urlPath.replace('$', '');
    // If the request URL is exactly the base path, skip logging
    if (cleanedPath === req.originalUrl) return next();

    res.send = function (body) {
      res.send = oldSend; // reset send to avoid infinite loop
      res.send(body); // send the actual response

      const { ip, method, originalUrl, body: requestBody } = req;
      const { statusCode } = res;
      const responseHost = req.get("host");
      const elapsedTime = process.hrtime(startHrTime);
      const elapsedTimeMs = elapsedTime[0] * 1000 + elapsedTime[1] / 1e6; // convert to milliseconds

      // const logMessage = `Request from IP ${ip} to ${method} ${originalUrl} with status ${statusCode} - Host: ${responseHost} - Response Time: ${elapsedTimeMs.toFixed(3)} ms --- Request Body: ${JSON.stringify(requestBody)} --- Response Body: ${body}`;
      const logMessage = `Request from IP ${ip} to ${method} ${originalUrl} with status ${statusCode} - Host: ${responseHost} - Response Time: ${elapsedTimeMs.toFixed(3)} ms`;


      if (statusCode >= 400) {
        const logErrorMessage = `Request from IP ${ip} to ${method} ${originalUrl} with status ${statusCode} - Host: ${responseHost} - Response Time: ${elapsedTimeMs.toFixed(3)} ms --- Request Body: ${JSON.stringify(requestBody)} --- Response Body: ${body}`;

        this.loggerService.getLogger().error(logErrorMessage);
      } else {
        this.loggerService.getLogger().info(logMessage);
      }
    }.bind(this);

    next();
  }
}
