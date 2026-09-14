-- Migration: add email delivery tracking columns to the leads table.
-- Run this in the Supabase SQL editor (or via `prisma migrate deploy`).

ALTER TABLE leads
  ADD COLUMN IF NOT EXISTS email_status   text        NOT NULL DEFAULT 'pending',
  ADD COLUMN IF NOT EXISTS email_sent_at  timestamptz,
  ADD COLUMN IF NOT EXISTS email_attempts integer     NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS email_error    text;
