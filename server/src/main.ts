import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe, Logger } from '@nestjs/common';
import { json } from 'express';
import helmet from 'helmet';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { requestIdMiddleware } from './common/middleware/request-id.middleware';
import { bodyLimitErrorMiddleware } from './common/middleware/body-limit-error.middleware';

const BODY_SIZE_LIMIT = process.env.BODY_SIZE_LIMIT ?? '16kb';

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  // Disable Nest's default body parser (100kb) so we can enforce our own limit.
  const app = await NestFactory.create(AppModule, { bodyParser: false });

  app.use(helmet());
  app.use(json({ limit: BODY_SIZE_LIMIT }));
  app.use(bodyLimitErrorMiddleware);
  app.use(requestIdMiddleware);

  // All routes are under /api
  app.setGlobalPrefix('api');

  // Global validation: strip unknown fields, transform types, reject invalid payloads
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );

  // Global exception filter — safe error shapes, no stack leaks
  app.useGlobalFilters(new HttpExceptionFilter());

  // CORS: allow only the configured client origin(s). Comma-separate for
  // multiple (e.g. apex + www + local dev).
  const clientUrls = (process.env.CLIENT_URL ?? 'http://localhost:3000')
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean);
  app.enableCors({
    origin: clientUrls,
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  });

  const port = process.env.PORT ?? 3001;
  await app.listen(port);
  logger.log(`Fivefold API running at http://localhost:${port}/api`);
  logger.log(`Health: http://localhost:${port}/api/health`);
  logger.log(`Accepting requests from: ${clientUrls.join(', ')}`);
}

bootstrap();
