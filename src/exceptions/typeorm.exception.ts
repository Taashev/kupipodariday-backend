import {
  HttpException,
  HttpExceptionOptions,
  HttpStatus,
} from '@nestjs/common';

import { MESSAGE_ERROR } from 'src/utils/constants';

export class TypeOrmException extends HttpException {
  constructor(
    message: string | Record<string, any> = MESSAGE_ERROR.BAD_REQUEST,
    statusCode: number = HttpStatus.BAD_REQUEST,
    options?: HttpExceptionOptions,
  ) {
    super(message, statusCode, options);
  }
}
