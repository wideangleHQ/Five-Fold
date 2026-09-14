import { Test, TestingModule } from '@nestjs/testing';
import { InternalServerErrorException } from '@nestjs/common';
import { LeadsService } from './leads.service';
import { PrismaService } from '../prisma/prisma.service';
import { EmailService } from '../email/email.service';
import { LeadSource, LeadType } from './dto/create-lead.dto';

const EMAIL_SENT = { sent: true };
const EMAIL_FAILED = { sent: false, error: 'Resend error' };

const makeEmailMock = (result = EMAIL_SENT) => ({
  sendLeadNotification: jest.fn().mockResolvedValue(result),
});

const makePrismaMock = (result: { data?: { id: string }; error?: Error }) => ({
  lead: {
    create: result.error
      ? jest.fn().mockRejectedValue(result.error)
      : jest.fn().mockResolvedValue(result.data),
    update: jest.fn().mockResolvedValue({}),
  },
});

describe('LeadsService', () => {
  let service: LeadsService;
  let prismaMock: ReturnType<typeof makePrismaMock>;
  let emailMock: ReturnType<typeof makeEmailMock>;

  const buildModule = async (
    prisma: ReturnType<typeof makePrismaMock>,
    email: ReturnType<typeof makeEmailMock>,
  ) => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LeadsService,
        { provide: PrismaService, useValue: prisma },
        { provide: EmailService, useValue: email },
      ],
    }).compile();
    return module.get<LeadsService>(LeadsService);
  };

  describe('create — success', () => {
    beforeEach(async () => {
      prismaMock = makePrismaMock({ data: { id: 'lead-uuid-1' } });
      emailMock = makeEmailMock(EMAIL_SENT);
      service = await buildModule(prismaMock, emailMock);
    });

    it('returns success and leadId on valid payload', async () => {
      const result = await service.create({
        name: 'Rajesh Mohanty',
        phone: '+919876543210',
        email: 'rajesh@example.com',
        city: 'Bhubaneswar',
        state: 'Odisha',
        leadType: LeadType.Residential,
        source: LeadSource.Contact,
        message: 'Interested in rooftop solar',
      });
      expect(result).toEqual({ success: true, leadId: 'lead-uuid-1' });
    });

    it('works without optional calculator fields', async () => {
      const result = await service.create({ name: 'Priya Das', phone: '9999999999' });
      expect(result.success).toBe(true);
    });

    it('maps camelCase DTO fields to Prisma model fields', async () => {
      await service.create({
        name: 'Test',
        phone: '+910000000000',
        monthlyConsumptionKwh: 300,
        recommendedSystemKwp: 3.5,
        estimatedAnnualSavingsInr: 45000,
        potentialSubsidyInr: 78000,
      });
      const createArg = prismaMock.lead.create.mock.calls[0][0].data;
      expect(createArg.monthlyConsumptionKwh).toBe(300);
      expect(createArg.recommendedSystemKwp).toBe(3.5);
      expect(createArg.estimatedAnnualSavingsInr).toBe(45000);
      expect(createArg.potentialSubsidyInr).toBe(78000);
    });

    it('sets status to "new" and emailStatus to "pending" by default', async () => {
      await service.create({ name: 'Test', phone: '+910000000000' });
      const createArg = prismaMock.lead.create.mock.calls[0][0].data;
      expect(createArg.status).toBe('new');
      expect(createArg.emailStatus).toBe('pending');
    });

    it('calls sendLeadNotification after persisting', async () => {
      await service.create({ name: 'Test', phone: '+910000000000' });
      expect(emailMock.sendLeadNotification).toHaveBeenCalledTimes(1);
    });

    it('updates emailStatus to "sent" on email success', async () => {
      await service.create({ name: 'Test', phone: '+910000000000' });
      const updateArg = prismaMock.lead.update.mock.calls[0][0].data;
      expect(updateArg.emailStatus).toBe('sent');
      expect(updateArg.emailAttempts).toBe(1);
    });
  });

  describe('create — email failure', () => {
    beforeEach(async () => {
      prismaMock = makePrismaMock({ data: { id: 'lead-uuid-2' } });
      emailMock = makeEmailMock(EMAIL_FAILED);
      service = await buildModule(prismaMock, emailMock);
    });

    it('still returns success when email fails', async () => {
      const result = await service.create({ name: 'Test', phone: '+910000000000' });
      expect(result).toEqual({ success: true, leadId: 'lead-uuid-2' });
    });

    it('updates emailStatus to "failed" on email failure', async () => {
      await service.create({ name: 'Test', phone: '+910000000000' });
      const updateArg = prismaMock.lead.update.mock.calls[0][0].data;
      expect(updateArg.emailStatus).toBe('failed');
      expect(updateArg.emailError).toBe('Resend error');
    });
  });

  describe('create — database error', () => {
    it('throws InternalServerErrorException on insert failure', async () => {
      const errMock = makePrismaMock({ error: new Error('connection refused') });
      const svc = await buildModule(errMock, makeEmailMock());
      await expect(
        svc.create({ name: 'Test', phone: '+910000000000' }),
      ).rejects.toThrow(InternalServerErrorException);
    });

    it('does NOT call sendLeadNotification if insert fails', async () => {
      const errMock = makePrismaMock({ error: new Error('connection refused') });
      const email = makeEmailMock();
      const svc = await buildModule(errMock, email);
      await expect(svc.create({ name: 'Test', phone: '+910000000000' })).rejects.toThrow();
      expect(email.sendLeadNotification).not.toHaveBeenCalled();
    });
  });

  describe('create — honeypot', () => {
    it('returns fake success without calling Prisma or email', async () => {
      const prisma = makePrismaMock({ data: { id: 'x' } });
      const email = makeEmailMock();
      const svc = await buildModule(prisma, email);
      const result = await svc.create({ name: 'Bot', phone: '+910000000000', _gotcha: 'filled' });
      expect(result).toEqual({ success: true, leadId: 'discarded' });
      expect(prisma.lead.create).not.toHaveBeenCalled();
      expect(email.sendLeadNotification).not.toHaveBeenCalled();
    });
  });
});
