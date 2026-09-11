import { randomUUID } from 'crypto';
import { NextFunction, Request, Response } from 'express';

// Lightweight correlation ID — no distributed tracing infrastructure needed
// at current scale. Lets a single request be traced across log lines.
export function requestIdMiddleware(req: Request, res: Response, next: NextFunction) {
  const id = randomUUID();
  (req as Request & { id: string }).id = id;
  res.setHeader('X-Request-Id', id);
  next();
}
