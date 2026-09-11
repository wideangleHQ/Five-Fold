import { Test, TestingModule } from '@nestjs/testing';
import { InternalServerErrorException } from '@nestjs/common';
import { LeadsService } from './leads.service';
import { SupabaseService } from '../integrations/supabase/supabase.service';
import { LeadSource, LeadType } from './dto/create-lead.dto';

const makeSupabaseMock = (result: { data: unknown; error: unknown }) => ({
  db: {
    from: jest.fn().mockReturnValue({
      insert: jest.fn().mockReturnValue({
        select: jest.fn().mockReturnValue({
          single: jest.fn().mockResolvedValue(result),
        }),
      }),
    }),
  },
});

describe('LeadsService', () => {
  let service: LeadsService;
  let supabaseMock: ReturnType<typeof makeSupabaseMock>;

  const buildModule = async (mock: ReturnType<typeof makeSupabaseMock>) => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LeadsService,
        { provide: SupabaseService, useValue: mock },
      ],
    }).compile();
    return module.get<LeadsService>(LeadsService);
  };

  describe('create — success', () => {
    beforeEach(async () => {
      supabaseMock = makeSupabaseMock({ data: { id: 'lead-uuid-1' }, error: null });
      service = await buildModule(supabaseMock);
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

    it('maps camelCase DTO fields to snake_case DB columns', async () => {
      await service.create({
        name: 'Test',
        phone: '+910000000000',
        monthlyConsumptionKwh: 300,
        recommendedSystemKwp: 3.5,
        estimatedAnnualSavingsInr: 45000,
        potentialSubsidyInr: 78000,
      });

      const insertArg = supabaseMock.db.from('leads').insert.mock.calls[0][0];
      expect(insertArg.monthly_consumption_kwh).toBe(300);
      expect(insertArg.recommended_system_kwp).toBe(3.5);
      expect(insertArg.estimated_annual_savings_inr).toBe(45000);
      expect(insertArg.potential_subsidy_inr).toBe(78000);
    });

    it('sets status to "new" by default', async () => {
      await service.create({ name: 'Test', phone: '+910000000000' });
      const insertArg = supabaseMock.db.from('leads').insert.mock.calls[0][0];
      expect(insertArg.status).toBe('new');
    });
  });

  describe('create — Supabase error', () => {
    it('throws InternalServerErrorException on DB failure', async () => {
      const errMock = makeSupabaseMock({
        data: null,
        error: { message: 'connection refused', details: '' },
      });
      const svc = await buildModule(errMock);

      await expect(
        svc.create({ name: 'Test', phone: '+910000000000' }),
      ).rejects.toThrow(InternalServerErrorException);
    });
  });
});
