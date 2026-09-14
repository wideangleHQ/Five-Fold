import { Test } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { EmailService, LeadEmailData } from './email.service';

const SAMPLE_LEAD: LeadEmailData = {
  id: 'test-lead-id',
  createdAt: new Date('2026-01-15T10:00:00Z'),
  name: 'Rajesh Mohanty',
  phone: '+919876543210',
  email: 'rajesh@example.com',
  city: 'Bhubaneswar',
  state: 'Odisha',
  leadType: 'residential',
  source: 'contact',
  message: 'Interested in rooftop solar',
};

const makeConfigMock = (overrides: Record<string, string> = {}) => ({
  get: jest.fn((key: string) =>
    overrides[key] ??
    ({
      RESEND_API_KEY: 'test-key',
      LEAD_NOTIFICATION_EMAIL: 'info@fivefold.co.in',
      LEAD_FROM_EMAIL: 'leads@fivefoldrenewable.com',
    }[key]),
  ),
});

describe('EmailService', () => {
  describe('when RESEND_API_KEY is not set', () => {
    it('returns { sent: false } without throwing', async () => {
      const module = await Test.createTestingModule({
        providers: [
          EmailService,
          { provide: ConfigService, useValue: makeConfigMock({ RESEND_API_KEY: '' }) },
        ],
      }).compile();
      const svc = module.get(EmailService);
      const result = await svc.sendLeadNotification(SAMPLE_LEAD);
      expect(result.sent).toBe(false);
      expect(result.error).toMatch(/not configured/i);
    });
  });

  describe('when Resend SDK throws', () => {
    it('returns { sent: false, error } without throwing', async () => {
      const module = await Test.createTestingModule({
        providers: [
          EmailService,
          { provide: ConfigService, useValue: makeConfigMock() },
        ],
      }).compile();
      const svc = module.get(EmailService);
      // Patch the private resend instance
      (svc as any).resend = {
        emails: { send: jest.fn().mockRejectedValue(new Error('rate limited')) },
      };
      const result = await svc.sendLeadNotification(SAMPLE_LEAD);
      expect(result.sent).toBe(false);
      expect(result.error).toBe('rate limited');
    });
  });

  describe('when Resend SDK succeeds', () => {
    it('returns { sent: true }', async () => {
      const module = await Test.createTestingModule({
        providers: [
          EmailService,
          { provide: ConfigService, useValue: makeConfigMock() },
        ],
      }).compile();
      const svc = module.get(EmailService);
      (svc as any).resend = {
        emails: { send: jest.fn().mockResolvedValue({ id: 'email-id' }) },
      };
      const result = await svc.sendLeadNotification(SAMPLE_LEAD);
      expect(result.sent).toBe(true);
    });

    it('sets Reply-To to customer email when provided', async () => {
      const module = await Test.createTestingModule({
        providers: [
          EmailService,
          { provide: ConfigService, useValue: makeConfigMock() },
        ],
      }).compile();
      const svc = module.get(EmailService);
      const sendMock = jest.fn().mockResolvedValue({ id: 'email-id' });
      (svc as any).resend = { emails: { send: sendMock } };
      await svc.sendLeadNotification(SAMPLE_LEAD);
      expect(sendMock.mock.calls[0][0].replyTo).toBe('rajesh@example.com');
    });

    it('omits Reply-To when no customer email', async () => {
      const module = await Test.createTestingModule({
        providers: [
          EmailService,
          { provide: ConfigService, useValue: makeConfigMock() },
        ],
      }).compile();
      const svc = module.get(EmailService);
      const sendMock = jest.fn().mockResolvedValue({ id: 'email-id' });
      (svc as any).resend = { emails: { send: sendMock } };
      await svc.sendLeadNotification({ ...SAMPLE_LEAD, email: null });
      expect(sendMock.mock.calls[0][0].replyTo).toBeUndefined();
    });

    it('HTML-escapes user content in the email body', async () => {
      const module = await Test.createTestingModule({
        providers: [
          EmailService,
          { provide: ConfigService, useValue: makeConfigMock() },
        ],
      }).compile();
      const svc = module.get(EmailService);
      const sendMock = jest.fn().mockResolvedValue({ id: 'email-id' });
      (svc as any).resend = { emails: { send: sendMock } };
      const xssLead: LeadEmailData = {
        ...SAMPLE_LEAD,
        name: '<script>alert(1)</script>',
        message: '"><img src=x onerror=alert(2)>',
      };
      await svc.sendLeadNotification(xssLead);
      const html: string = sendMock.mock.calls[0][0].html;
      expect(html).not.toContain('<script>');
      expect(html).not.toContain('<img');
      expect(html).toContain('&lt;script&gt;');
    });
  });
});
