import { Injectable, Logger, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(PrismaService.name);

  async onModuleInit() {
    try {
      await this.$connect();
    } catch (err) {
      // Never let a bad/missing DATABASE_URL crash the whole app at startup —
      // /api/health and other routes must stay up regardless. The first real
      // query will fail and is already wrapped as a safe 500 by LeadsService.
      this.logger.warn(
        `Could not connect to the database at startup: ${err instanceof Error ? err.message : 'unknown error'}`,
      );
    }
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
