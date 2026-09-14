# 04 — Government Scheme Discovery

**Title options:**  
“Which Scheme Can I Get?” or “Check Government Scheme Eligibility”

Fivefold already assists with schemes including RTS 1, RTS 2 and PM Surya Ghar Muft Bijli Yojana.

## Interactive Experience

Visitor clicks **Check Government Scheme Eligibility**  
→ A focused pop-up or dedicated page opens.

### Questions
1. Property Type
2. Residential / Commercial / Industrial
3. Location
4. Approximate Solar Requirement
5. Existing Solar System — Yes / No
6. Electricity Consumer Information

### Result
“Your Possible Solar Scheme Options”

Each option card shows:
- Scheme name
- Basic eligibility information
- Potential benefits
- Required documents
- Fivefold assistance
- CTA: **Get Assistance from Fivefold**

When the user submits an assistance enquiry, a lead is created via `POST /api/leads` with `source = "schemes"`. The server persists the lead to Supabase and sends a notification email to `info@fivefold.co.in` via Resend. If email delivery fails, the lead is not lost — Supabase is the source of truth. See `10-lead-submission-architecture.md`.

## Important Disclaimer

Final eligibility, subsidy, scheme availability and applicable benefits remain subject to prevailing government guidelines.  
**Do not hardcode specific subsidy amounts.**

This turns a static information page into a genuine lead-generation tool.
