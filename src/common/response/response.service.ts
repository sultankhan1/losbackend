/* eslint-disable prettier/prettier */
import { HttpStatus, Injectable } from "@nestjs/common";
import { Response } from "express";
@Injectable()
export class ResponseService {
  constructor() { }
  async responseStructure(
    status: string,
    message: string,
    data: any,
    code: number,
    res: Response
  ) {
    return res.status(code).json({
      status: status,
      message: message,
      code: code,
      data: data || {},
    });
  }

  async USER_NOT_FOUND(message: string, data: any, res: Response) {
    return await this.responseStructure(
      "USER_NOT_FOUND",
      message,
      data,
      HttpStatus.OK,
      res
    );
  }

  async NOT_FOUND(message: string, data: any, res: Response) {
    return await this.responseStructure(
      "NOT_FOUND",
      message,
      data,
      HttpStatus.NOT_FOUND,
      res
    );
  }


  async FORBIDDED(message: string, res: Response) {
    return await this.responseStructure(
      "FORBIDDED",
      message,
      {},
      HttpStatus.FORBIDDEN,
      res
    );
  }

  async success(status: string, message: string, data: any, res: Response) {
    return await this.responseStructure(
      status,
      message,
      data,
      HttpStatus.OK,
      res
    );
  }

  async NOT_FOUND_MESSAGE(loginType: string) {
    return `${loginType} DOES NOT EXIST`;
  }

  async noDataInput(message: string, data: any, res: Response) {
    return await this.responseStructure(
      "NO_INPUT_DATA",
      message,
      data,
      HttpStatus.OK,
      res
    );
  }

  async notVerified(message: string, res: Response) {
    return await this.responseStructure(
      "NOT_VERIFIED",
      message,
      {},
      HttpStatus.OK,
      res
    );
  }

  async incorrectData(message: string, res: Response) {
    return await this.responseStructure(
      "INCORRECT",
      message,
      {},
      HttpStatus.BAD_REQUEST,
      res
    );
  }

  async INTERNAL_SERVER_ERROR(message: string, data: any, res: Response) {
    return await this.responseStructure(
      "INTERNAL_SERVER_ERROR",
      message,
      data,
      HttpStatus.INTERNAL_SERVER_ERROR,
      res
    );
  }

  async CONFLICT(status: string, res: Response) {
    return await this.responseStructure(
      `${status}_EXIST`,
      `${await this.WordToPascalCase(status)} Already Exist`,
      {},
      HttpStatus.OK,
      res
    );
  }


  async VERIFIED(message: string, res: Response) {
    return await this.responseStructure(
      "ALREADY_VERIFIED",
      message,
      {},
      HttpStatus.OK,
      res
    );
  }

  async UNAUTHORIZED(message: string, res: Response) {
    return await this.responseStructure(
      "UNAUTHORIZED",
      message,
      {},
      HttpStatus.UNAUTHORIZED,
      res
    );
  }

  async EXPIRED(message: string, res: Response) {
    return await this.responseStructure(
      "EXPIRED",
      message,
      {},
      HttpStatus.FORBIDDEN,
      res
    );
  }

  async SERVICE_UNAVAILABLE(message: string, data: any, res: Response) {
    return await this.responseStructure(
      "SERVICE_UNAVAILABLE",
      message,
      data,
      HttpStatus.SERVICE_UNAVAILABLE,
      res
    );
  }

  async PAYLOAD_TOO_LARGE(message: string, res: Response) {
    return await this.responseStructure(
      `PAYLOAD_TOO_LARGE`,
      message,
      {},
      HttpStatus.PAYLOAD_TOO_LARGE,
      res
    );
  }

  async BAD_REQUEST(message: string, res: Response) {
    return await this.responseStructure(
      "BAD_REQUEST",
      message,
      {},
      HttpStatus.BAD_REQUEST,
      res
    );
  }

  async NO_CONTENT(message: string, res: Response) {
    return await this.responseStructure(
      "NO_CONTENT",
      message,
      {},
      HttpStatus.NO_CONTENT,
      res
    );
  }

  async TIMEOUT_ERROR(message: string, res: Response) {
    return await this.responseStructure(
      "TIMEOUT_ERROR",
      message,
      {},
      HttpStatus.REQUEST_TIMEOUT,
      res
    );
  }

  async BAD_GATEWAY(message: string, res: Response) {
    return await this.responseStructure(
      "BAD_GATEWAY",
      message,
      {},
      HttpStatus.BAD_GATEWAY,
      res
    );
  }


  async NUMBER_OF_FILES_EXCEEDED(message: string, res: Response) {
    return await this.responseStructure(
      "LIMIT_UNEXPECTED_FILE",
      message,
      {},
      HttpStatus.UNPROCESSABLE_ENTITY,
      res
    );
  }

  private async WordToPascalCase(word: string) {
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  }
}
