import { Metadata } from "next";
import { constructMetadata } from "@/lib/seo";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = constructMetadata({
  title: "Privacy Policy | Fivefold Renewable",
  description: "Privacy Policy for Fivefold Renewable Pvt. Ltd.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <div className="pt-24 sm:pt-32 pb-20">
      <Container className="max-w-4xl space-y-6">
        <h1 className="font-heading text-4xl font-extrabold text-brand-charcoal">
          Privacy Policy
        </h1>
        <p className="text-sm text-slate-500">Last updated: August 2026</p>

        <div className="prose prose-slate max-w-none space-y-4 text-slate-600 text-sm leading-relaxed">
          <p>
            Fivefold Renewable Pvt. Ltd. (&ldquo;Fivefold&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;) respects your privacy and is committed to protecting personal data submitted through our corporate website (fivefoldsolar.com).
          </p>

          <h2 className="font-heading text-lg font-bold text-brand-charcoal pt-2">
            1. Information We Collect
          </h2>
          <p>
            We collect personal information that you voluntarily provide when requesting a consultation, including your name, contact phone number, email address, city, and estimated electricity bill details.
          </p>

          <h2 className="font-heading text-lg font-bold text-brand-charcoal pt-2">
            2. Use of Information
          </h2>
          <p>
            Information collected is used strictly to evaluate solar project feasibility, prepare initial preliminary engineering proposals, respond to inquiries, and facilitate statutory DISCOM net metering documentation.
          </p>

          <h2 className="font-heading text-lg font-bold text-brand-charcoal pt-2">
            3. Data Protection & Sharing
          </h2>
          <p>
            We do not sell, rent, or trade your personal information to third parties. Information may only be disclosed to statutory energy distribution companies (DISCOMs) or government authorities where explicitly required for solar plant net metering registration and grid interconnection approvals.
          </p>

          <h2 className="font-heading text-lg font-bold text-brand-charcoal pt-2">
            4. Contact
          </h2>
          <p>
            For any queries regarding this Privacy Policy, please contact info@fivefoldsolar.com.
          </p>
        </div>
      </Container>
    </div>
  );
}
