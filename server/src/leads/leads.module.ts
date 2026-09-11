import { Module } from '@nestjs/common';
import { ThrottlerModule } from '@nestjs/throttler';
import { LeadsController } from './leads.controller';
import { LeadsService } from './leads.service';

@Module({
  imports: [
    // In-memory throttler storage — sufficient at current lead volume.
    // Applied to POST /api/leads only, via ThrottlerGuard on LeadsController.
    ThrottlerModule.forRoot({
      throttlers: [
        {
          ttl: Number(process.env.LEADS_RATE_LIMIT_TTL_MS ?? 60 * 60 * 1000),
          limit: Number(process.env.LEADS_RATE_LIMIT_MAX ?? 5),
        },
      ],
    }),
  ],
  controllers: [LeadsController],
  providers: [LeadsService],
})
export class LeadsModule {}
