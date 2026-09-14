import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Resend } from 'resend';

export interface LeadEmailData {
  id: string;
  createdAt: Date;
  name: string;
  phone: string;
  email?: string | null;
  city?: string | null;
  state?: string | null;
  leadType?: string | null;
  source?: string | null;
  message?: string | null;
  electricityInfo?: string | null;
  monthlyConsumptionKwh?: number | null;
  recommendedSystemKwp?: number | null;
  estimatedAnnualSavingsInr?: number | null;
  potentialSubsidyInr?: number | null;
}

export interface EmailResult {
  sent: boolean;
  error?: string;
}

function esc(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function row(label: string, value: string | null | undefined): string {
  if (!value) return '';
  return `<tr><td style="padding:4px 12px 4px 0;color:#526673;white-space:nowrap;vertical-align:top">${label}</td><td style="padding:4px 0;color:#173B53;font-weight:600">${esc(value)}</td></tr>`;
}

function buildSubject(lead: LeadEmailData): string {
  const type = lead.leadType ?? 'Enquiry';
  const display = type.charAt(0).toUpperCase() + type.slice(1);
  return `New ${display} Lead — ${lead.name}`;
}

function buildHtml(lead: LeadEmailData): string {
  const hasCalc =
    lead.monthlyConsumptionKwh != null ||
    lead.recommendedSystemKwp != null ||
    lead.estimatedAnnualSavingsInr != null ||
    lead.potentialSubsidyInr != null;

  const calcBlock = hasCalc
    ? `<tr><td colspan="2" style="padding-top:16px"><strong style="color:#173B53">Calculator Result</strong></td></tr>
${row('Monthly Consumption', lead.monthlyConsumptionKwh != null ? `${lead.monthlyConsumptionKwh} kWh` : null)}
${row('Recommended System', lead.recommendedSystemKwp != null ? `${lead.recommendedSystemKwp} kWp` : null)}
${row('Est. Annual Savings', lead.estimatedAnnualSavingsInr != null ? `₹${lead.estimatedAnnualSavingsInr.toLocaleString('en-IN')}` : null)}
${row('Subsidy Estimate', lead.potentialSubsidyInr != null ? `₹${lead.potentialSubsidyInr.toLocaleString('en-IN')}` : null)}`
    : '';

  const messageBlock = lead.message
    ? `<tr><td colspan="2" style="padding-top:16px"><strong style="color:#173B53">Message</strong></td></tr>
<tr><td colspan="2" style="padding:4px 0;color:#173B53">${esc(lead.message)}</td></tr>`
    : '';

  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><title>New Lead</title></head>
<body style="margin:0;padding:0;background:#F6F3EC;font-family:sans-serif">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#F6F3EC;padding:32px 0">
  <tr><td align="center">
    <table width="580" cellpadding="0" cellspacing="0" style="background:#fff;border:1px solid #DCE2E2;border-radius:8px;overflow:hidden">
      <tr><td style="background:#173B53;padding:20px 28px">
        <span style="color:#fff;font-size:18px;font-weight:700">Fivefold Renewable</span>
        <span style="color:#1684C7;font-size:14px;margin-left:12px">New Lead Notification</span>
      </td></tr>
      <tr><td style="padding:24px 28px">
        <table cellpadding="0" cellspacing="0" width="100%">
          ${row('Name', lead.name)}
          ${row('Phone', lead.phone)}
          ${row('Email', lead.email)}
          ${row('Location', [lead.city, lead.state].filter(Boolean).join(', ') || null)}
          ${row('Lead Type', lead.leadType)}
          ${row('Source', lead.source)}
          ${row('Electricity Info', lead.electricityInfo)}
          ${calcBlock}
          ${messageBlock}
          <tr><td colspan="2" style="padding-top:20px;border-top:1px solid #DCE2E2;font-size:11px;color:#526673">
            Lead ID: ${esc(lead.id)} &nbsp;|&nbsp; ${lead.createdAt.toISOString()}
          </td></tr>
        </table>
      </td></tr>
    </table>
  </td></tr>
</table>
</body>
</html>`;
}

@Injectable()
export class EmailService {
  private readonly logger = new Logger(EmailService.name);
  private readonly resend: Resend | null;
  private readonly to: string;
  private readonly from: string;

  constructor(private readonly config: ConfigService) {
    const apiKey = config.get<string>('RESEND_API_KEY');
    this.to = config.get<string>('LEAD_NOTIFICATION_EMAIL') ?? 'info@fivefold.co.in';
    this.from = config.get<string>('LEAD_FROM_EMAIL') ?? 'leads@fivefoldrenewable.com';
    this.resend = apiKey ? new Resend(apiKey) : null;
    if (!apiKey) {
      this.logger.warn('RESEND_API_KEY not set — email notifications disabled');
    }
  }

  async sendLeadNotification(lead: LeadEmailData): Promise<EmailResult> {
    if (!this.resend) {
      return { sent: false, error: 'RESEND_API_KEY not configured' };
    }
    try {
      await this.resend.emails.send({
        from: this.from,
        to: this.to,
        subject: buildSubject(lead),
        html: buildHtml(lead),
        ...(lead.email ? { replyTo: lead.email } : {}),
      });
      this.logger.log(`Lead notification sent: ${lead.id}`);
      return { sent: true };
    } catch (err) {
      const message = (err as Error).message;
      this.logger.error(`Email notification failed for ${lead.id}: ${message}`);
      return { sent: false, error: message };
    }
  }
}
