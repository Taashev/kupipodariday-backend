import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Observable, map } from 'rxjs';

import { UserProfileResponseDto } from '../dto/user-profile-response.dto';
import { UserPublicProfileResponseDto } from '../dto/user-public-profile-response.dto';

type SerializeUserResponseInterceptorDtoParam =
  | 'UserProfileResponseDto'
  | 'UserPublicProfileResponseDto';

const userResponseDto = {
  UserProfileResponseDto,
  UserPublicProfileResponseDto,
};

export class SerializeUserResponseInterceptor implements NestInterceptor {
  UserResponseDto = userResponseDto[this.dto];

  constructor(private dto: SerializeUserResponseInterceptorDtoParam) {}

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
