import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from "@nestjs/common";
import { Request, Response } from "express";

/**
 * Custom exception filter for handling HttpExceptions.
 */
@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  /**
   * Catches the HttpException and handles it by sending an appropriate response.
   * @param {any} exception - The HttpException object.
   * @param {ArgumentsHost} host - The host object containing the request and response objects.
   */
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    let responseObject: any = {};
    let message = exception.response.message;
    let data = exception.response.data || {};

    // Check for DTO error
    if (Array.isArray(message)) {
      responseObject.message = exception.response.message[0];
    } else if (!message) {
      responseObject.message = exception.response;
    }

    responseObject = {
      success: false,
      statusCode: status,
      message,
      ...responseObject,
      data,
    };
    response.status(status).json(responseObject);
  }
}
