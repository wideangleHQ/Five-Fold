# 07 — About, FAQ & Contact

## About Us

Redesign the company story into a strong visual narrative:

Who We Are  
↓  
10+ Years of Experience  
↓  
20+ MW Installed  
↓  
30+ Projects  
↓  
800+ MW Engineering Experience  
↓  
10+ States  
↓  
Engineering-Led Philosophy

Keep the page concise and visual. Avoid long paragraphs.

---

## FAQ

Interactive accordion system covering:

- Solar savings
- Government subsidy
- Installation timelines
- Cloudy weather performance
- Maintenance
- Net metering
- Government schemes
- SolarCare
- Warranty

Use the existing foundational FAQ content. Present answers in short, scannable form.

---

## Contact / Lead Generation

Replace a basic contact form with a **structured enquiry system**.

### Interest selection
I am interested in:
- Residential Solar
- Commercial Solar
- Industrial Solar
- Government Scheme Assistance
- SolarCare / AMC
- Maintenance
- Other

### Then collect
- Name
- Phone
- Email
- Location
- Requirement
- Optional electricity information

All enquiries are stored in Supabase (the persistent database). Each valid submission also triggers a notification email to `info@fivefold.co.in` via Resend. Email delivery is the business notification layer — a lead is never lost if the email fails, because Supabase is the source of truth.

The Resend API key is a server-only secret and must never appear in the React client bundle or any `NEXT_PUBLIC_*` variable. All email delivery originates from the NestJS server.

### Confirmed contact details
```
Phone    +91 70081 01078 / +91 70081 33792
Email    info@fivefoldsolar.com
Address  Plot No. SCR 2, Lane No. 6, Anant Vihar Phase-3,
         Pokhariput, Bhubaneswar – 751020
Hours    Monday–Saturday, 9:30 AM–6:30 PM
```

Success state should confirm receipt and set clear expectations for follow-up.
