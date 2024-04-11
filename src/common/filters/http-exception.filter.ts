import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { Result } from '../dto';

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: any, host: ArgumentsHost) {
    const { httpAdapter } = this.httpAdapterHost;
    const ctx = host.switchToHttp();
    let httpStatus: number;
    let exceptionMessage = exception.message;

    console.log(exception);

    httpStatus =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    if (exception.error) {
      switch (httpStatus) {
        case HttpStatus.UNAUTHORIZED:
          exceptionMessage = 'You have to login to perform this action';
          break;
        case HttpStatus.FORBIDDEN:
          exceptionMessage = 'You are not authorize to perform this action';
          break;
      }
    }

    const responseBody: Result = {
      data: null,
      success: false,
      message: exceptionMessage,
    };

    httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
  }
}
