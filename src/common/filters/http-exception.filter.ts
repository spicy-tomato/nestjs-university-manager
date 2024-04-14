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

    console.log(exception);

    let exceptionMessage: string | string[] =
      exception.response?.message ??
      exception.meta?.message ??
      exception.message ??
      'Internal server error';

    exceptionMessage =
      typeof exceptionMessage === 'string'
        ? this.transformMessage(exceptionMessage)
        : exceptionMessage.map((em) => this.transformMessage(em));

    let httpStatus =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const responseBody: Result = {
      data: null,
      success: false,
      message: exceptionMessage,
    };

    httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
  }

  private transformMessage(message: string): string {
    message = message[0].toUpperCase() + message.substring(1);
    message = message.replaceAll(/id/gi, 'ID');
    message = message.replaceAll(/mongodb/gi, 'MongoDB');

    return message;
  }
}
