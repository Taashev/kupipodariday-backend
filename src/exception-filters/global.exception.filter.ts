import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

import { TypeORMError } from 'typeorm';

import { MESSAGE_ERROR } from 'src/utils/constants';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  private statusCode: number = HttpStatus.INTERNAL_SERVER_ERROR;
  private message: string = MESSAGE_ERROR.INTERNAL_SERVER_ERROR;

  catch(exception: any, host: ArgumentsHost) {
    const http = host.switchToHttp();
    const httpResponse = http.getResponse();

    if (exception instanceof HttpException) {
      const exceptionResponse = exception.getResponse() as HttpException;

      this.statusCode = exception.getStatus();
      this.message = exceptionResponse.message;
    }

    if (exception instanceof TypeORMError) {
      this.message = exception.message;
    }

    httpResponse
      .status(this.statusCode)
      .json({ message: this.message, statusCode: this.statusCode });
  }
}
