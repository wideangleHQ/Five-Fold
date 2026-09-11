-- Migration 001: Create leads table
-- Run this in your Supabase project → SQL Editor.
-- Do NOT run against production until you have verified it in a dev project first.

create table if not exists public.leads (
  id              uuid primary key default gen_random_uuid(),
  created_at      timestamptz not null default now(),

  -- Contact
  name            text not null,
  phone           text not null,
  email           text,
  city            text,
  state           text default 'Odisha',

  -- Classification
  lead_type       text,
  source          text,

  -- Enquiry content
  message         text,
  electricity_info text,

  -- Solar Calculator context (all optional — not every lead comes from the calculator)
  monthly_consumption_kwh       numeric,
  recommended_system_kwp        numeric,
  estimated_annual_savings_inr  numeric,
  potential_subsidy_inr         numeric,

  -- CRM lifecycle (start simple)
  status          text not null default 'new'
);

-- Deny public access; service-role key bypasses RLS
alter table public.leads enable row level security;

-- No RLS policies — only the NestJS service-role connection can read/write
-- Add policies here if a future dashboard needs anon/authenticated reads.

comment on table public.leads is 'Fivefold Renewable enquiry leads — server-side write only';
