import { Test, TestingModule } from '@nestjs/testing';
import { ThrottlerModule } from '@nestjs/throttler';
import { LeadsController } from './leads.controller';
import { LeadsService } from './leads.service';
import { CreateLeadDto, LeadSource, LeadType } from './dto/create-lead.dto';

const mockLeadsService = {
  create: jest.fn(),
};

describe('LeadsController', () => {
  let controller: LeadsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ThrottlerModule.forRoot({ throttlers: [{ ttl: 60000, limit: 5 }] })],
      controllers: [LeadsController],
      providers: [{ provide: LeadsService, useValue: mockLeadsService }],
    }).compile();

    controller = module.get<LeadsController>(LeadsController);
    jest.clearAllMocks();
  });

  it('delegates to LeadsService and returns the result', async () => {
    const dto: CreateLeadDto = {
      name: 'Test User',
      phone: '+919999999999',
      email: 'test@example.com',
      city: 'Bhubaneswar',
      leadType: LeadType.Residential,
      source: LeadSource.Contact,
    };
    mockLeadsService.create.mockResolvedValue({ success: true, leadId: 'abc-123' });

    const req = { id: 'req-1' } as any;
    const result = await controller.create(dto, req);

    expect(mockLeadsService.create).toHaveBeenCalledWith(dto, 'req-1');
    expect(result).toEqual({ success: true, leadId: 'abc-123' });
  });
});
