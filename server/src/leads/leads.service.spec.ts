import { Test, TestingModule } from '@nestjs/testing';
import { InternalServerErrorException } from '@nestjs/common';
import { LeadsService } from './leads.service';
import { PrismaService } from '../prisma/prisma.service';
import { LeadSource, LeadType } from './dto/create-lead.dto';

const makePrismaMock = (result: { data?: { id: string }; error?: Error }) => ({
  lead: {
    create: result.error
      ? jest.fn().mockRejectedValue(result.error)
      : jest.fn().mockResolvedValue(result.data),
  },
});

describe('LeadsService', () => {
  let service: LeadsService;
  let prismaMock: ReturnType<typeof makePrismaMock>;

  const buildModule = async (mock: ReturnType<typeof makePrismaMock>) => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LeadsService, { provide: PrismaService, useValue: mock }],
    }).compile();
    return module.get<LeadsService>(LeadsService);
  };

  describe('create — success', () => {
    beforeEach(async () => {
      prismaMock = makePrismaMock({ data: { id: 'lead-uuid-1' } });
      service = await buildModule(prismaMock);
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
      const result = await service.create({
        name: 'Priya Das',
        phone: '9999999999',
      });
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

    it('sets status to "new" by default', async () => {
      await service.create({ name: 'Test', phone: '+910000000000' });
      const createArg = prismaMock.lead.create.mock.calls[0][0].data;
      expect(createArg.status).toBe('new');
    });
  });

  describe('create — database error', () => {
    it('throws InternalServerErrorException on insert failure', async () => {
      const errMock = makePrismaMock({ error: new Error('connection refused') });
      const svc = await buildModule(errMock);

      await expect(
        svc.create({ name: 'Test', phone: '+910000000000' }),
      ).rejects.toThrow(InternalServerErrorException);
    });
  });
});
