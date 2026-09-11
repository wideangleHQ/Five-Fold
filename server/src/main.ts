import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe, Logger } from '@nestjs/common';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  const app = await NestFactory.create(AppModule);

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

  // CORS: allow only the configured client origin
  const clientUrl = process.env.CLIENT_URL ?? 'http://localhost:3000';
  app.enableCors({
    origin: clientUrl,
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  });

  const port = process.env.PORT ?? 3001;
  await app.listen(port);
  logger.log(`Fivefold API running at http://localhost:${port}/api`);
  logger.log(`Health: http://localhost:${port}/api/health`);
  logger.log(`Accepting requests from: ${clientUrl}`);
}

bootstrap();
