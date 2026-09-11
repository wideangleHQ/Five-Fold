import { Module } from '@nestjs/common';
import { SupabaseModule } from '../integrations/supabase/supabase.module';
import { LeadsController } from './leads.controller';
import { LeadsService } from './leads.service';

@Module({
  imports: [SupabaseModule],
  controllers: [LeadsController],
  providers: [LeadsService],
})
export class LeadsModule {}
