# Local setup

No repository exists yet, so this page is a placeholder for the commands a
real project would need, not a verified setup guide. Replace every command
below once the repository is initialised.

## Prerequisites

- Node.js — version not yet fixed; pin it in `package.json#engines` once chosen
- A package manager — npm assumed, confirm on init

## Install

```bash
npm install
```

## Run

```bash
npm run dev
```

## Build

```bash
npm run build
```

## Lint

```bash
npm run lint
```

## Environment variables

None are known to be required yet — the site has no confirmed backend, CMS, or
third-party integration beyond the contact form. If the contact form ships
with an email or CRM integration, its variables belong here, named but with no
real values:

```
CONTACT_FORM_ENDPOINT=...
```

Never commit real secrets to this file or to the repository.
