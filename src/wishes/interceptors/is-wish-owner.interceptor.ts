import { Request } from 'express';
import { Observable } from 'rxjs';

import {
  CallHandler,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  NestInterceptor,
  NotFoundException,
} from '@nestjs/common';

import { MESSAGE_ERROR } from 'src/utils/constants';

import { WishesRepository } from '../wishes.repository';

@Injectable()
export class IsWishOwnerInterceptor implements NestInterceptor {
  constructor(private readonly wishesRepository: WishesRepository) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Promise<Observable<any>> {
    const http = context.switchToHttp();
    const request = http.getRequest<Request>();

    const user = request.user;

    const wishId = request.params['id'];

    const wish = await this.wishesRepository.findById(wishId, { owner: true });

    if (!wish) {
      throw new NotFoundException(MESSAGE_ERROR.NOT_FOUND_WISH);
    }

    const wishOwner = wish.owner;

    if (user.id !== wishOwner.id) {
      throw new ForbiddenException(MESSAGE_ERROR.FORBIDDEN_WISH);
    }

    return next.handle();
  }
}
