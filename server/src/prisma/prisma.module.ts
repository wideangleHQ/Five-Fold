import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

// Global — every feature module needs DB access via one shared client.
@Global()
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
