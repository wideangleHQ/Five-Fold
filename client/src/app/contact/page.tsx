import { Metadata } from "next";
import { constructMetadata } from "@/lib/seo";
import { Container } from "@/components/ui/Container";
import { ContactForm } from "@/components/forms/ContactForm";
import { Phone, Mail, MapPin, Clock, ShieldCheck } from "lucide-react";

export const metadata: Metadata = constructMetadata({
  title: "Contact Fivefold Renewable | Solar EPC Consultation",
  description: "Get a free engineering consultation for rooftop, commercial, or industrial solar in Odisha. Contact Fivefold Renewable in Bhubaneswar.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <div className="pt-24 sm:pt-32">
      {/* Page Hero */}
      <section className="py-16 sm:py-20 bg-brand-charcoal text-white relative overflow-hidden">
        <Container>
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-brand-green/40 bg-brand-green/10 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-brand-green">
              <ShieldCheck className="h-4 w-4" />
              Direct Engineering Consultation
            </div>
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight">
              Get a Free Consultation
            </h1>
            <p className="text-slate-300 text-lg sm:text-xl font-light leading-relaxed">
              Connect directly with senior solar engineers to discuss 3D shadow analysis, roof feasibility, bankable DPR preparation, and project financing.
            </p>
          </div>
        </Container>
      </section>

      {/* Main Content Grid */}
      <section className="py-16 sm:py-20 bg-white text-brand-charcoal">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Column: Form */}
            <div className="lg:col-span-7 p-6 sm:p-8 rounded-2xl bg-brand-off-white border border-slate-200 shadow-sm">
              <h2 className="font-heading text-2xl font-bold text-brand-charcoal mb-2">
                Request Engineering Evaluation
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mb-6">
                Fill out the intent-based form below to receive a customized preliminary assessment.
              </p>
              <ContactForm />
            </div>

            {/* Right Column: Office Credentials */}
            <div className="lg:col-span-5 space-y-8">
              <div className="p-6 sm:p-8 rounded-2xl bg-brand-green-dark text-white space-y-6 shadow-xl">
                <h3 className="font-heading text-2xl font-bold text-white border-b border-brand-green/40 pb-3">
                  Registered Headquarters
                </h3>

                <div className="space-y-4 text-sm text-slate-200">
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-brand-amber shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-white">Office Address</strong>
                      <span>
                        Plot No. SCR 2, Lane No. 6, Anant Vihar Phase-3, Pokhariput, Bhubaneswar – 751020, Odisha, India
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Phone className="h-5 w-5 text-brand-amber shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-white">Direct Phone / Helplines</strong>
                      <span>+91 70081 01078</span> <br />
                      <span>+91 70081 33792</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Mail className="h-5 w-5 text-brand-amber shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-white">Email Address</strong>
                      <span>info@fivefoldsolar.com</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Clock className="h-5 w-5 text-brand-amber shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-white">Working Hours</strong>
                      <span>Monday – Saturday: 9:30 AM – 6:30 PM</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
