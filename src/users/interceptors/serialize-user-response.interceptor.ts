import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Observable, map } from 'rxjs';

import { User } from '../entities/users.entity';

export class SerializeUserResponseInterceptor<T> implements NestInterceptor {
  constructor(private UserResponseDto: new (user: User) => T) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    return next.handle().pipe(
      map((user) => {
        if (Array.isArray(user)) {
          const usersResponseDto = user.map((user) => {
            return new this.UserResponseDto(user);
          });

          return usersResponseDto;
        } else {
          const userResponseDto = new this.UserResponseDto(user);

          return userResponseDto;
        }
      }),
    );
  }
}
