import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { EmailService } from '../email/email.service';
import { CreateLeadDto } from './dto/create-lead.dto';

export interface LeadCreatedResult {
  success: true;
  leadId: string;
}

@Injectable()
export class LeadsService {
  private readonly logger = new Logger(LeadsService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly email: EmailService,
  ) {}

  async create(dto: CreateLeadDto, requestId?: string): Promise<LeadCreatedResult> {
    if (dto._gotcha) {
      // Honeypot tripped — pretend success without persisting or notifying.
      this.logger.warn(`Honeypot triggered, submission discarded [${requestId ?? '-'}]`);
      return { success: true, leadId: 'discarded' };
    }

    let lead: { id: string };
    try {
      lead = await this.prisma.lead.create({
        data: {
          name: dto.name,
          phone: dto.phone,
          email: dto.email ?? null,
          city: dto.city ?? null,
          state: dto.state ?? null,
          leadType: dto.leadType ?? null,
          source: dto.source ?? null,
          message: dto.message ?? null,
          electricityInfo: dto.electricityInfo ?? null,
          monthlyConsumptionKwh: dto.monthlyConsumptionKwh ?? null,
          recommendedSystemKwp: dto.recommendedSystemKwp ?? null,
          estimatedAnnualSavingsInr: dto.estimatedAnnualSavingsInr ?? null,
          potentialSubsidyInr: dto.potentialSubsidyInr ?? null,
          status: 'new',
          emailStatus: 'pending',
        },
        select: { id: true },
      });
    } catch (error) {
      this.logger.error(
        `Lead insert failed [${requestId ?? '-'}]: ${(error as Error).message}`,
      );
      throw new InternalServerErrorException('Unable to submit your enquiry.');
    }

    this.logger.log(
      `Lead created: ${lead.id} source=${dto.source ?? 'unknown'} [${requestId ?? '-'}]`,
    );

    const now = new Date();
    const { sent, error: emailError } = await this.email.sendLeadNotification({
      id: lead.id,
      createdAt: now,
      name: dto.name,
      phone: dto.phone,
      email: dto.email ?? null,
      city: dto.city ?? null,
      state: dto.state ?? null,
      leadType: dto.leadType ?? null,
      source: dto.source ?? null,
      message: dto.message ?? null,
      electricityInfo: dto.electricityInfo ?? null,
      monthlyConsumptionKwh: dto.monthlyConsumptionKwh ?? null,
      recommendedSystemKwp: dto.recommendedSystemKwp ?? null,
      estimatedAnnualSavingsInr: dto.estimatedAnnualSavingsInr ?? null,
      potentialSubsidyInr: dto.potentialSubsidyInr ?? null,
    });

    // Best-effort: update email tracking status. Failure here does not fail the request.
    try {
      await this.prisma.lead.update({
        where: { id: lead.id },
        data: {
          emailStatus: sent ? 'sent' : 'failed',
          emailAttempts: 1,
          ...(sent ? { emailSentAt: now } : { emailError: emailError ?? 'unknown' }),
        },
      });
    } catch (err) {
      this.logger.error(
        `emailStatus update failed for ${lead.id}: ${(err as Error).message}`,
      );
    }

    return { success: true, leadId: lead.id };
  }
}
