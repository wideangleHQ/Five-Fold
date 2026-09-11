import { Body, Controller, HttpCode, HttpStatus, Post, Req, UseGuards } from '@nestjs/common';
import { ThrottlerGuard } from '@nestjs/throttler';
import { Request } from 'express';
import { CreateLeadDto } from './dto/create-lead.dto';
import { LeadsService } from './leads.service';

// Rate limit itself is configured in LeadsModule (ThrottlerModule.forRoot),
// via LEADS_RATE_LIMIT_TTL_MS / LEADS_RATE_LIMIT_MAX env vars.
@Controller('leads')
@UseGuards(ThrottlerGuard)
export class LeadsController {
  constructor(private readonly leads: LeadsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() dto: CreateLeadDto, @Req() req: Request) {
    return this.leads.create(dto, (req as Request & { id?: string }).id);
  }
}
