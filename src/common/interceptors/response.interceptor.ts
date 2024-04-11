import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Result } from '../dto';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(_: ExecutionContext, next: CallHandler): Observable<unknown> {
    return next.handle().pipe(map((res: unknown) => this.responseHandler(res)));
  }

  private responseHandler<T>(res: T): Result<T> {
    return {
      data: res,
      success: true,
      message: null,
    };
  }
}
