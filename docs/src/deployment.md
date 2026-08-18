# Deployment

Not yet decided. No hosting provider, domain, or CI pipeline exists for this
project at the time of writing — do not assume Vercel, or any other host,
until it is confirmed.

## Proposed flow, pending confirmation

```
Git repository
      |
      v
Host (not yet chosen)
      |
      v
Next.js production build
      |
      v
Live site
```

## Open questions

- Hosting provider
- Production domain (likely `www.fivefoldsolar.com`, already in use for
  contact details — confirm whether the new site replaces the existing one
  at that domain or launches elsewhere first)
- Preview/staging deployment process
- Environment variables per environment
- Rollback approach

None of these block the build itself — see
[Architecture](architecture.md) — but they need an answer before the first
production deploy.
