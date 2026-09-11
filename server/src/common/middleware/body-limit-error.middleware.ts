import { NextFunction, Request, Response } from 'express';

// Catches body-parser's PayloadTooLargeError (raised before Nest's own
// exception filter is in the request pipeline) and returns the same safe
// error shape as the rest of the API instead of Express's default HTML page.
export function bodyLimitErrorMiddleware(
  err: unknown,
  _req: Request,
  res: Response,
  next: NextFunction,
) {
  const status = (err as { status?: number; statusCode?: number })?.status
    ?? (err as { statusCode?: number })?.statusCode;

  if (status === 413) {
    res.status(413).json({
      success: false,
      statusCode: 413,
      message: 'Request body is too large.',
    });
    return;
  }

  next(err);
}
