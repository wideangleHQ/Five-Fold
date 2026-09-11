import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';

/**
 * Global exception filter. Catches everything (not just HttpException) so an
 * unexpected error can never leak a stack trace or internal message to the client.
 * Returns a consistent, safe error shape.
 */
@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request & { id?: string }>();
    const requestId = request.id ?? '-';

    const isHttpException = exception instanceof HttpException;
    const status = isHttpException
      ? exception.getStatus()
      : HttpStatus.INTERNAL_SERVER_ERROR;

    const exceptionResponse = isHttpException ? exception.getResponse() : undefined;
    const message =
      exceptionResponse && typeof exceptionResponse === 'object' && 'message' in exceptionResponse
        ? (exceptionResponse as Record<string, unknown>).message
        : exceptionResponse;

    if (status === HttpStatus.TOO_MANY_REQUESTS) {
      this.logger.warn(`Rate limit exceeded [${requestId}] ${request.method} ${request.url}`);
    } else if (status >= HttpStatus.INTERNAL_SERVER_ERROR) {
      this.logger.error(`${request.method} ${request.url} → ${status} [${requestId}]`);
    } else if (status === HttpStatus.BAD_REQUEST) {
      this.logger.debug(`Validation failed [${requestId}] ${request.method} ${request.url}`);
    }

    response.status(status).json({
      success: false,
      statusCode: status,
      message:
        status >= HttpStatus.INTERNAL_SERVER_ERROR
          ? 'An error occurred. Please try again.'
          : message ?? 'Request failed.',
    });
  }
}
