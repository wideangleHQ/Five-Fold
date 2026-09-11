import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsEmail,
  IsEnum,
  IsNumber,
  Min,
  MaxLength,
  Matches,
} from 'class-validator';
import { Transform } from 'class-transformer';

export enum LeadType {
  Residential = 'residential',
  Commercial = 'commercial',
  Industrial = 'industrial',
  Solarcare = 'solarcare',
  Schemes = 'schemes',
  Consultation = 'consultation',
  Other = 'other',
}

export enum LeadSource {
  Contact = 'contact',
  SolarCalculator = 'solar-calculator',
  Residential = 'residential',
  Commercial = 'commercial',
  Industrial = 'industrial',
  Schemes = 'schemes',
  Solarcare = 'solarcare',
  Warranty = 'warranty',
}

const trim = (): PropertyDecorator =>
  Transform(({ value }) => (typeof value === 'string' ? value.trim() : value));

const toNullIfEmpty = (): PropertyDecorator =>
  Transform(({ value }) =>
    typeof value === 'string' && value.trim() === '' ? null : value,
  );

export class CreateLeadDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  @trim()
  name: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(20)
  @Matches(/^[+\d][\d\s\-().]{6,19}$/, {
    message: 'phone must be a valid phone number',
  })
  @trim()
  phone: string;

  @IsOptional()
  @IsEmail()
  @MaxLength(200)
  @toNullIfEmpty()
  email?: string | null;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  @trim()
  @toNullIfEmpty()
  city?: string | null;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  @trim()
  @toNullIfEmpty()
  state?: string | null;

  @IsOptional()
  @IsEnum(LeadType)
  leadType?: LeadType;

  @IsOptional()
  @IsEnum(LeadSource)
  source?: LeadSource;

  @IsOptional()
  @IsString()
  @MaxLength(2000)
  @trim()
  @toNullIfEmpty()
  message?: string | null;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  @trim()
  @toNullIfEmpty()
  electricityInfo?: string | null;

  // Solar Calculator context — all optional; normal contact leads won't have these
  @IsOptional()
  @IsNumber()
  @Min(0)
  monthlyConsumptionKwh?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  recommendedSystemKwp?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  estimatedAnnualSavingsInr?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  potentialSubsidyInr?: number;
}
