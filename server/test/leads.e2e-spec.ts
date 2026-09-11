import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { json } from 'express';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { HttpExceptionFilter } from '../src/common/filters/http-exception.filter';
import { requestIdMiddleware } from '../src/common/middleware/request-id.middleware';
import { bodyLimitErrorMiddleware } from '../src/common/middleware/body-limit-error.middleware';
import { PrismaService } from '../src/prisma/prisma.service';

const validLead = {
  name: 'Rajesh Mohanty',
  phone: '+919876543210',
  email: 'rajesh@example.com',
  city: 'Bhubaneswar',
  leadType: 'residential',
  source: 'contact',
};

function makePrismaMock(result: { data?: { id: string }; error?: Error } = { data: { id: 'lead-1' } }) {
  return {
    lead: {
      create: result.error
        ? jest.fn().mockRejectedValue(result.error)
        : jest.fn().mockResolvedValue(result.data),
    },
  };
}

// Mirrors the production bootstrap in src/main.ts so e2e behavior matches reality.
async function buildApp(prismaMock: ReturnType<typeof makePrismaMock>): Promise<INestApplication> {
  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [AppModule],
  })
    .overrideProvider(PrismaService)
    .useValue(prismaMock)
    .compile();

  const app = moduleFixture.createNestApplication({ bodyParser: false });
  app.use(json({ limit: '16kb' }));
  app.use(bodyLimitErrorMiddleware);
  app.use(requestIdMiddleware);
  app.setGlobalPrefix('api');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );
  app.useGlobalFilters(new HttpExceptionFilter());
  await app.init();
  return app;
}

describe('Leads (e2e)', () => {
  let app: INestApplication;
  let prismaMock: ReturnType<typeof makePrismaMock>;

  afterEach(async () => {
    if (app) await app.close();
  });

  const post = (body: Record<string, unknown>) =>
    request(app.getHttpServer()).post('/api/leads').send(body);

  it('accepts a valid lead and never leaks internals', async () => {
    prismaMock = makePrismaMock();
    app = await buildApp(prismaMock);

    const res = await post(validLead);

    expect(res.status).toBe(201);
    expect(res.body).toEqual({ success: true, leadId: 'lead-1' });
  });

  it('rejects a payload missing name', async () => {
    app = await buildApp(makePrismaMock());
    const { name, ...rest } = validLead;
    const res = await post(rest);
    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
  });

  it('rejects a payload missing phone', async () => {
    app = await buildApp(makePrismaMock());
    const { phone, ...rest } = validLead;
    const res = await post(rest);
    expect(res.status).toBe(400);
  });

  it('rejects an invalid phone', async () => {
    app = await buildApp(makePrismaMock());
    const res = await post({ ...validLead, phone: 'not-a-phone' });
    expect(res.status).toBe(400);
  });

  it('rejects an invalid email', async () => {
    app = await buildApp(makePrismaMock());
    const res = await post({ ...validLead, email: 'not-an-email' });
    expect(res.status).toBe(400);
  });

  it('rejects unknown/unexpected properties', async () => {
    app = await buildApp(makePrismaMock());
    const res = await post({ ...validLead, isAdmin: true, extraField: 'x' });
    expect(res.status).toBe(400);
  });

  it('rejects an invalid leadType', async () => {
    app = await buildApp(makePrismaMock());
    const res = await post({ ...validLead, leadType: 'bogus-type' });
    expect(res.status).toBe(400);
  });

  it('rejects an invalid source', async () => {
    app = await buildApp(makePrismaMock());
    const res = await post({ ...validLead, source: 'bogus-source' });
    expect(res.status).toBe(400);
  });

  it('rejects negative calculator values', async () => {
    app = await buildApp(makePrismaMock());
    const res = await post({ ...validLead, recommendedSystemKwp: -5 });
    expect(res.status).toBe(400);
  });

  it('rejects non-finite numeric values', async () => {
    app = await buildApp(makePrismaMock());
    const res = await post({ ...validLead, recommendedSystemKwp: 'NaN' });
    expect(res.status).toBe(400);
  });

  it('rejects excessively large calculator values', async () => {
    app = await buildApp(makePrismaMock());
    const res = await post({ ...validLead, recommendedSystemKwp: 999_999_999 });
    expect(res.status).toBe(400);
  });

  it('rejects an oversized request body', async () => {
    app = await buildApp(makePrismaMock());
    const res = await post({ ...validLead, message: 'a'.repeat(20_000) });
    expect(res.status).toBe(413);
  });

  it('rate-limits repeated submissions from the same client', async () => {
    app = await buildApp(makePrismaMock());

    let lastStatus = 0;
    // Default config: 5 requests / hour. The 6th must be throttled.
    for (let i = 0; i < 6; i++) {
      const res = await post(validLead);
      lastStatus = res.status;
    }

    expect(lastStatus).toBe(429);
  }, 20_000);

  it('returns a safe response when the database fails', async () => {
    prismaMock = makePrismaMock({ error: new Error('connection refused to db-host-internal') });
    app = await buildApp(prismaMock);

    const res = await post(validLead);

    expect(res.status).toBe(500);
    expect(res.body.success).toBe(false);
    expect(JSON.stringify(res.body)).not.toContain('connection refused');
    expect(JSON.stringify(res.body)).not.toMatch(/stack|Error:/i);
  });

  it('discards honeypot submissions without persisting', async () => {
    prismaMock = makePrismaMock();
    app = await buildApp(prismaMock);

    const res = await post({ ...validLead, _gotcha: 'filled-by-bot' });

    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
    expect(prismaMock.lead.create).not.toHaveBeenCalled();
  });
});
