import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HealthModule } from './health/health.module';

@Module({
  imports: [
    // Load .env and make ConfigService available globally
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),

    HealthModule,

    // Future modules added here as each phase is implemented:
    //
    // Phase 1 — Lead API:
    //   LeadsModule
    //
    // Phase 2 — Security:
    //   (rate limiting, guards — added within existing modules)
    //
    // Phase 3 — Integrations:
    //   SupabaseModule
    //   WhatsAppModule
  ],
})
export class AppModule {}
