import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { QueryFailedError, TypeORMError } from 'typeorm';

import { MESSAGE_ERROR } from 'src/utils/constants';

import { TypeOrmException } from 'src/exceptions/typeorm.exception';

@Catch(TypeOrmException)
export class TypeOrmExceptionFilter implements ExceptionFilter {
  private message: string;
  private statusCode: number;

  catch(exception: TypeOrmException, host: ArgumentsHost) {
    const http = host.switchToHttp();
    const httpResponse = http.getResponse();

    const exceptionResponse = exception.getResponse();

    this.statusCode = exception.getStatus();

    if (exceptionResponse instanceof QueryFailedError) {
      this.handlerQueryFailedError(exceptionResponse);
    } else if (exceptionResponse instanceof TypeORMError) {
      this.statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
      this.message = exceptionResponse.message;
    } else {
      this.message = exception.message;
    }

    httpResponse
      .status(this.statusCode)
      .json({ message: this.message, statusCode: this.statusCode });
  }

  private handlerQueryFailedError(exception: QueryFailedError<any>): void {
    const driverError = exception.driverError;

    if (driverError.code === '23505' && driverError.table === 'users') {
      this.statusCode = HttpStatus.CONFLICT;

      this.message =
        MESSAGE_ERROR.USER_ALREADY_EXISTS +
        `. Поле, вызвавшее конфликт: ${driverError.detail}`;
    } else {
      this.message = driverError.detail;
    }
  }
}
