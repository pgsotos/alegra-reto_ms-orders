// src/common/interceptors/error.interceptor.ts
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  HttpException,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable()
export class ErrorInterceptor implements NestInterceptor {
  private readonly logger = new Logger(ErrorInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((error) => {
        // Log the error
        this.logger.error(
          `Error Message: ${error.message}, Stack: ${error.stack}`
        );

        // If it's an HTTP error, throw it, otherwise throw a generic error
        if (error instanceof HttpException) {
          return throwError(() => error);
        }

        return throwError(
          () => new InternalServerErrorException('Internal server error')
        );
      })
    );
  }
}

export default ErrorInterceptor;
