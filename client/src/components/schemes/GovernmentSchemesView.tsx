import React from "react";
import { ShieldCheck } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { COMPANY_CONTACT, whatsappUrl } from "@/lib/company";
import {
  APPLICATION_STEPS,
  CENTRAL_ELIGIBILITY,
  NOT_COVERED,
  OFFICIAL_LINKS,
  ODISHA_ELIGIBILITY,
  ODISHA_STATUS_NOTE,
  SCHEME_CONTENT_VERIFIED_ON,
  SCHEME_DISCLAIMER,
  SUBSIDY_CAPACITIES_KWP,
  inr,
  subsidyAtCapacity,
} from "@/data/government-schemes";

export const GovernmentSchemesView: React.FC = () => {
  return (
    <div className="pt-28 pb-16 lg:pt-36 lg:pb-24 bg-white min-h-screen">
      <Container>
        {/* Header */}
        <div data-reveal="group" className="max-w-3xl mx-auto text-center space-y-4 mb-14">
          <div
            data-reveal="eyebrow"
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-100 text-[#20435F] text-xs font-semibold uppercase tracking-wider"
          >
            <ShieldCheck className="h-4 w-4 text-[#20435F]" />
            <span>Government Assistance & Subsidies</span>
          </div>
          <h1
            data-reveal="heading"
            className="font-heading text-3xl sm:text-5xl font-extrabold text-slate-900"
          >
            Government Scheme Discovery
          </h1>
          <p
            data-reveal="paragraph"
            className="text-slate-600 text-base sm:text-lg leading-relaxed"
          >
            Fivefold assists customers with complete documentation, DISCOM net metering applications, and subsidy disbursal tracking under central and state renewable schemes.
          </p>
        </div>

        {/* Featured Schemes */}
        <div data-reveal="cards-container" className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-16">
          {/* PM Surya Ghar */}
          <div data-reveal="card" className="p-7 lg:p-8 rounded-2xl border border-slate-200 bg-slate-50 space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold uppercase text-[#173B53] px-2.5 py-1 rounded-md bg-[#173B53]/10">
                  Residential Scheme
                </span>
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-sky-100 text-[#173B53]">
                  01
                </span>
              </div>
              <h2 className="font-heading text-xl lg:text-2xl font-bold text-slate-900">
                PM Surya Ghar: Muft Bijli Yojana
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Central government flagship rooftop solar scheme delivering up to 300 units of free power monthly and direct DBT subsidies.
              </p>
              <div className="space-y-2 pt-2 border-t border-slate-200">
                <div className="text-xs font-bold text-slate-900">Key Benefits &amp; Subsidies:</div>
                <ul className="text-xs text-slate-600 space-y-1.5 list-disc list-inside">
                  <li><strong>Up to 2 kW:</strong> ₹30,000 per kW (Up to ₹60,000)</li>
                  <li><strong>3 kW &amp; Above:</strong> Fixed ₹78,000 direct DBT subsidy</li>
                  <li><strong>Collateral-Free Loan:</strong> Low ~7% interest bank financing</li>
                  <li><strong>DISCOM Integration:</strong> Net metering across TPCODL/TPNODL</li>
                </ul>
              </div>
            </div>
            <Button href="/contact" variant="primary" size="md">
              <span>Apply with Fivefold</span>
            </Button>
          </div>

          {/* PM KUSUM */}
          <div data-reveal="card" className="p-7 lg:p-8 rounded-2xl border border-slate-200 bg-slate-50 space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold uppercase text-emerald-800 px-2.5 py-1 rounded-md bg-emerald-100">
                  Agricultural Scheme
                </span>
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                  02
                </span>
              </div>
              <h2 className="font-heading text-xl lg:text-2xl font-bold text-slate-900">
                PM-KUSUM Yojana
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Empowering farmers and rural institutions with standalone solar irrigation pumps and solarized agricultural feeders.
              </p>
              <div className="space-y-2 pt-2 border-t border-slate-200">
                <div className="text-xs font-bold text-slate-900">Key Benefits &amp; Subsidies:</div>
                <ul className="text-xs text-slate-600 space-y-1.5 list-disc list-inside">
                  <li><strong>60% Subsidy:</strong> 30% Central + 30% State assistance</li>
                  <li><strong>Diesel Elimination:</strong> Zero recurring agricultural fuel cost</li>
                  <li><strong>Surplus Energy Sale:</strong> Earn revenue by feeding grid</li>
                  <li><strong>0.5 to 2 MW Plants:</strong> Component A barren land solar</li>
                </ul>
              </div>
            </div>
            <Button href="/contact" variant="primary" size="md">
              <span>Explore PM-KUSUM</span>
            </Button>
          </div>

          {/* Odisha Renewable Energy Policy 2022 */}
          <div data-reveal="card" className="p-7 lg:p-8 rounded-2xl border border-slate-200 bg-slate-50 space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold uppercase text-slate-700 px-2.5 py-1 rounded-md bg-slate-200">
                  C&amp;I &amp; Utility
                </span>
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-slate-200 text-slate-800">
                  03
                </span>
              </div>
              <h2 className="font-heading text-xl lg:text-2xl font-bold text-slate-900">
                Odisha RE Policy 2022
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                State framework accelerating clean energy adoption for commercial, industrial, and institutional enterprises.
              </p>
              <div className="space-y-2 pt-2 border-t border-slate-200">
                <div className="text-xs font-bold text-slate-900">Key Incentives &amp; Concessions:</div>
                <ul className="text-xs text-slate-600 space-y-1.5 list-disc list-inside">
                  <li><strong>Electricity Duty:</strong> 50 paise/unit exemption (up to 20 yrs)</li>
                  <li><strong>Cross-Subsidy Relief:</strong> 50% concession on wheeling/charges</li>
                  <li><strong>Land Exemption:</strong> 100% conversion fee reimbursement</li>
                  <li><strong>Single Window:</strong> Fast-track approvals via OREDA &amp; GRIDCO</li>
                </ul>
              </div>
            </div>
            <Button href="/contact" variant="secondary" size="md">
              <span>Discuss Commercial EPC</span>
            </Button>
          </div>
        </div>

        {/* Residential subsidy: central + Odisha state */}
        <section id="residential-subsidy" aria-labelledby="residential-subsidy-title" className="mb-16 space-y-8">
          <div data-reveal="group" className="max-w-3xl space-y-2">
            <span data-reveal="eyebrow" className="text-xs font-mono font-bold uppercase tracking-wider text-[#1684C7] block">
              • RESIDENTIAL ROOFTOP SOLAR
            </span>
            <h2 id="residential-subsidy-title" data-reveal="heading" className="font-heading text-2xl sm:text-3xl font-extrabold text-[#173B53] tracking-tight">
              PM Surya Ghar and Odisha State Subsidy
            </h2>
            <p data-reveal="paragraph" className="text-sm sm:text-base text-[#526673] leading-relaxed">
              Eligible households can receive central financial assistance under PM Surya Ghar: Muft Bijli Yojana,
              and Odisha has announced additional state assistance on top of it.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[34rem] text-left text-sm">
              <caption className="sr-only">Indicative subsidy by system capacity for an individual residential household</caption>
              <thead>
                <tr className="border-b border-[#DCE2E2] text-xs font-mono uppercase tracking-wider text-[#526673]">
                  <th scope="col" className="py-2 pr-4 font-semibold">System size</th>
                  <th scope="col" className="py-2 pr-4 font-semibold">Central (PM Surya Ghar)</th>
                  <th scope="col" className="py-2 pr-4 font-semibold">Odisha state</th>
                  <th scope="col" className="py-2 font-semibold">Combined</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#DCE2E2] text-[#173B53]">
                {SUBSIDY_CAPACITIES_KWP.map((kw) => {
                  const r = subsidyAtCapacity(kw);
                  return (
                    <tr key={kw}>
                      <th scope="row" className="py-3 pr-4 font-semibold">{kw === 3 ? "3 kW and above" : `${kw} kW`}</th>
                      <td className="py-3 pr-4">{inr(r.central)}</td>
                      <td className="py-3 pr-4">{inr(r.state)}</td>
                      <td className="py-3 font-semibold">{inr(r.combined)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <p className="mt-2 text-xs text-[#526673]">
              Central assistance: ₹30,000 per kW for the first 2 kW and ₹18,000 for the third kW; no additional
              assistance beyond 3 kW. Odisha figures are the announced state assistance: ₹25,000 for each of the first
              2 kW and ₹10,000 for the third kW.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            <div data-reveal="group" className="space-y-3">
              <h3 data-reveal="heading" className="font-heading text-lg font-bold text-[#173B53]">Central eligibility (PM Surya Ghar)</h3>
              <ul className="space-y-2 text-sm text-[#526673] leading-relaxed list-disc list-outside pl-5">
                {CENTRAL_ELIGIBILITY.map((c) => <li key={c}>{c}</li>)}
              </ul>
            </div>
            <div data-reveal="group" className="space-y-3">
              <h3 data-reveal="heading" className="font-heading text-lg font-bold text-[#173B53]">Odisha state assistance</h3>
              <ul className="space-y-2 text-sm text-[#526673] leading-relaxed list-disc list-outside pl-5">
                {ODISHA_ELIGIBILITY.map((c) => <li key={c}>{c}</li>)}
              </ul>
              <p className="text-xs text-amber-800 bg-amber-50 border border-amber-200 rounded-lg p-3 leading-relaxed">{ODISHA_STATUS_NOTE}</p>
            </div>
          </div>

          <p className="text-sm text-[#526673] leading-relaxed max-w-3xl">{NOT_COVERED}</p>

          <div data-reveal="group" className="space-y-3">
            <h3 data-reveal="heading" className="font-heading text-lg font-bold text-[#173B53]">How to apply</h3>
            <ol className="space-y-2 text-sm text-[#526673] leading-relaxed list-decimal list-outside pl-5 max-w-3xl">
              {APPLICATION_STEPS.map((step) => <li key={step}>{step}</li>)}
            </ol>
          </div>

          <div className="space-y-3">
            <h3 className="font-heading text-lg font-bold text-[#173B53]">Official resources</h3>
            <ul className="space-y-1.5 text-sm">
              {OFFICIAL_LINKS.map((l) => (
                <li key={l.href}>
                  <a href={l.href} target="_blank" rel="noopener noreferrer" className="text-[#1684C7] hover:underline">{l.label}</a>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-3 pt-2 border-t border-[#DCE2E2]">
            <h3 className="font-heading text-lg font-bold text-[#173B53]">Need help?</h3>
            <p className="text-sm text-[#526673] leading-relaxed max-w-3xl">
              Talk to our team about your eligibility and a site assessment.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <Button href={COMPANY_CONTACT.contactPath} variant="primary" size="md"><span>Contact Us</span></Button>
              <a href={COMPANY_CONTACT.phoneHref} className="text-sm font-semibold text-[#173B53] hover:text-[#1684C7]">{COMPANY_CONTACT.phoneDisplay}</a>
              <a href={whatsappUrl("Hello Fivefold, I would like to check my rooftop solar subsidy eligibility.")} target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-[#173B53] hover:text-[#1684C7]">Enquire on WhatsApp</a>
            </div>
            <p className="text-xs text-[#526673] leading-relaxed max-w-3xl">{SCHEME_DISCLAIMER} Content last verified {SCHEME_CONTENT_VERIFIED_ON}.</p>
          </div>
        </section>

        {/* Fivefold Assistance Process */}
        <div className="p-8 rounded-2xl bg-slate-900 text-white border border-slate-800 space-y-6">
          <div className="max-w-2xl space-y-2">
            <div className="text-xs font-mono font-bold uppercase text-[#00A9D6]">
              End-to-End Execution
            </div>
            <h3 className="font-heading text-2xl font-bold text-white">
              How Fivefold Handles Government Scheme Process
            </h3>
            <p className="text-xs text-slate-300">
              We handle the entire administrative and technical lifecycle so you don&apos;t have to deal with DISCOM paperwork.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs pt-4 border-t border-slate-800">
            <div className="space-y-1">
              <div className="font-bold text-[#00A9D6]">1. Feasibility</div>
              <div className="text-slate-300">Technical roof verification & transformer load check.</div>
            </div>
            <div className="space-y-1">
              <div className="font-bold text-[#00A9D6]">2. Application</div>
              <div className="text-slate-300">Portal submission & DISCOM registration.</div>
            </div>
            <div className="space-y-1">
              <div className="font-bold text-[#00A9D6]">3. Net Metering</div>
              <div className="text-slate-300">Bidirectional meter installation & testing.</div>
            </div>
            <div className="space-y-1">
              <div className="font-bold text-[#00A9D6]">4. Subsidy Claim</div>
              <div className="text-slate-300">PCR submission for direct bank disbursal.</div>
            </div>
          </div>
        </div>

        {/* Mandatory Disclaimer */}
        <div className="mt-8 p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs space-y-1">
          <div className="font-bold text-amber-950">Important Notice</div>
          <p className="text-amber-800 leading-relaxed">
            Final eligibility, subsidy disbursal amounts, and scheme guidelines remain subject to prevailing government policies, ministry notifications, and DISCOM technical approvals.
          </p>
        </div>
      </Container>
    </div>
  );
};
