import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { SupabaseService } from '../integrations/supabase/supabase.service';
import { CreateLeadDto } from './dto/create-lead.dto';

export interface LeadCreatedResult {
  success: true;
  leadId: string;
}

@Injectable()
export class LeadsService {
  private readonly logger = new Logger(LeadsService.name);

  constructor(private readonly supabase: SupabaseService) {}

  async create(dto: CreateLeadDto): Promise<LeadCreatedResult> {
    const row = {
      name: dto.name,
      phone: dto.phone,
      email: dto.email ?? null,
      city: dto.city ?? null,
      state: dto.state ?? null,
      lead_type: dto.leadType ?? null,
      source: dto.source ?? null,
      message: dto.message ?? null,
      electricity_info: dto.electricityInfo ?? null,
      monthly_consumption_kwh: dto.monthlyConsumptionKwh ?? null,
      recommended_system_kwp: dto.recommendedSystemKwp ?? null,
      estimated_annual_savings_inr: dto.estimatedAnnualSavingsInr ?? null,
      potential_subsidy_inr: dto.potentialSubsidyInr ?? null,
      status: 'new',
    };

    const { data, error } = await this.supabase.db
      .from('leads')
      .insert(row)
      .select('id')
      .single();

    if (error) {
      this.logger.error(`Supabase insert failed: ${error.message}`, error.details);
      throw new InternalServerErrorException('Unable to submit your enquiry.');
    }

    this.logger.log(`Lead created: ${data.id} source=${row.source ?? 'unknown'}`);
    return { success: true, leadId: data.id as string };
  }
}
