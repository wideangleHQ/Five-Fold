import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable()
export class SupabaseService implements OnModuleInit {
  private readonly logger = new Logger(SupabaseService.name);
  private client: SupabaseClient;

  constructor(private readonly config: ConfigService) {}

  onModuleInit() {
    const url = this.config.get<string>('SUPABASE_URL');
    const key = this.config.get<string>('SUPABASE_SERVICE_ROLE_KEY');

    if (!url || !key) {
      this.logger.warn(
        'SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY is not set. ' +
        'Database operations will fail until these are configured.',
      );
    }

    // createClient is safe to call with empty strings — operations will fail
    // at runtime rather than at startup, which is desirable during local dev.
    this.client = createClient(url ?? '', key ?? '', {
      auth: { persistSession: false },
    });
  }

  get db(): SupabaseClient {
    return this.client;
  }
}
