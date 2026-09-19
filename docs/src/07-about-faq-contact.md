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

## FAQ Section

The FAQ section provides clear, concise, client-approved answers to the most common customer enquiries without inventing unapproved statistics, timelines, or financial claims.

- **Components:** `client/src/components/sections/FaqSection.tsx`, `client/src/app/faq/page.tsx`
- **Data Source:** `client/src/data/faqs.ts`
- **Schema:** Implements JSON-LD `FAQPage` structured data (`generateFaqSchema`).

### Approved FAQs (6 Total)

Source: Client-Approved Document (*Fivefold website Details(3).pdf*).

1. **How much can I save with rooftop solar?**
   > *Your savings depend on electricity consumption, system capacity, tariff, rooftop conditions and system generation. A properly designed solar system can significantly reduce your dependence on grid electricity and monthly electricity expenses.*
2. **Do you provide subsidy assistance?**
   > *Yes. Fivefold assists eligible residential customers with the applicable PM Surya Ghar Muft Bijli Yojana process and related documentation.*
3. **How long does solar installation take?**
   > *Installation timelines depend on system size, site conditions, approvals, material availability and project requirements.*
4. **Do solar panels work during cloudy weather?**
   > *Yes. Solar panels can continue generating electricity during cloudy conditions, although generation may be lower than under clear-sky conditions.*
5. **What maintenance does a solar system require?**
   > *Regular cleaning, preventive inspection and performance monitoring help maintain system efficiency and reliability.*
6. **Do you provide net metering support?**
   > *Yes. Fivefold provides support for the applicable net metering process.*

### Content Restrictions & Compliance Guidelines
- **No Invented Figures:** Do NOT include unverified saving percentages, fixed rupee amounts, or fixed timelines (e.g. "3 to 7 days").
- **No Guarantee Claims:** Do NOT guarantee subsidy disbursement, 100% net metering approval, or fixed weather outputs.
- **SEO Intent:** Rooftop solar Odisha, solar company Odisha, solar installation Odisha, solar subsidy Odisha, PM Surya Ghar Odisha, solar net metering Odisha, solar maintenance Odisha.

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
