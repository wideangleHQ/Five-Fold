import React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Phone, Mail, MapPin, Clock, ShieldCheck } from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#0B3D2E] text-slate-200 border-t border-emerald-900/60 font-sans">
      <Container className="py-14 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-10 pb-12 border-b border-emerald-900/60">
          {/* Brand & Overview */}
          <div className="lg:col-span-1 space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#1F7A45] font-heading text-lg font-bold text-white">
                F
              </div>
              <div className="flex flex-col">
                <span className="font-heading text-base font-extrabold tracking-tight text-white leading-none">
                  FIVEFOLD
                </span>
                <span className="text-[9px] tracking-widest uppercase font-semibold text-[#E9B949] mt-0.5 font-sans">
                  RENEWABLE
                </span>
              </div>
            </Link>
            <p className="text-xs text-slate-300 leading-relaxed font-sans">
              We do not sell drawings. We engineer bankable solar plants. Engineering-led solar EPC solutions in Odisha since 2016.
            </p>
            <div className="pt-2 flex items-center gap-2 text-xs text-[#E9B949] font-medium font-sans">
              <ShieldCheck className="h-4 w-4 shrink-0 text-[#E9B949]" />
              <span>Engineering Excellence & Quality Guarantee</span>
            </div>
          </div>

          {/* Column 1: Company */}
          <div className="space-y-3">
            <h4 className="font-heading text-xs font-bold uppercase tracking-wider text-white">
              Company
            </h4>
            <ul className="space-y-2 text-xs font-sans text-slate-300">
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  About Fivefold
                </Link>
              </li>
              <li>
                <Link href="/engineering" className="hover:text-white transition-colors">
                  Engineering Capabilities
                </Link>
              </li>
              <li>
                <Link href="/projects" className="hover:text-white transition-colors">
                  Project Portfolio
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Contact & Enquiry
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Solutions */}
          <div className="space-y-3">
            <h4 className="font-heading text-xs font-bold uppercase tracking-wider text-white">
              Solutions
            </h4>
            <ul className="space-y-2 text-xs font-sans text-slate-300">
              <li>
                <Link href="/residential-solar" className="hover:text-white transition-colors">
                  Residential Solar
                </Link>
              </li>
              <li>
                <Link href="/commercial-solar" className="hover:text-white transition-colors">
                  Commercial Solar
                </Link>
              </li>
              <li>
                <Link href="/industrial-solar" className="hover:text-white transition-colors">
                  Industrial Solar EPC
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-white transition-colors">
                  All Services Hub
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Platform Tools & Schemes */}
          <div className="space-y-3">
            <h4 className="font-heading text-xs font-bold uppercase tracking-wider text-white">
              Decision Platform
            </h4>
            <ul className="space-y-2 text-xs font-sans text-slate-300">
              <li>
                <Link href="/solar-calculator" className="hover:text-[#E9B949] transition-colors font-semibold text-white">
                  Smart Solar Calculator
                </Link>
              </li>
              <li>
                <Link href="/government-schemes" className="hover:text-white transition-colors">
                  Government Scheme Finder
                </Link>
              </li>
              <li>
                <Link href="/solarcare" className="hover:text-white transition-colors">
                  SolarCare AMC Plans
                </Link>
              </li>
              <li>
                <Link href="/warranty" className="hover:text-white transition-colors">
                  Warranty & Diagnostics
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-white transition-colors">
                  FAQ & Knowledge Base
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact Info */}
          <div className="space-y-3">
            <h4 className="font-heading text-xs font-bold uppercase tracking-wider text-white">
              Contact Us
            </h4>
            <div className="space-y-2.5 text-xs font-sans text-slate-300">
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-[#E9B949] shrink-0 mt-0.5" />
                <span>
                  Plot No. SCR 2, Lane No. 6, Anant Vihar Phase-3, Pokhariput, Bhubaneswar – 751020, Odisha
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-[#E9B949] shrink-0" />
                <span>+91 70081 01078 / +91 70081 33792</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-[#E9B949] shrink-0" />
                <span>info@fivefoldsolar.com</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-[#E9B949] shrink-0" />
                <span>Mon–Sat: 9:30 AM – 6:30 PM</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-sans text-slate-400">
          <p>
            © {new Date().getFullYear()} Fivefold Renewable Pvt. Ltd. All rights reserved.
          </p>

          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms & Conditions
            </Link>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-emerald-900/60 text-[11px] font-sans text-slate-400 leading-relaxed">
          <p>
            <strong>Disclaimer:</strong> Indicative estimates generated by decision tools on this website are preliminary models based on standard Odisha solar irradiance benchmarks. Final solar plant sizing, financial ROI, and government subsidy disbursals are subject to engineering site assessment and DISCOM guidelines.
          </p>
        </div>
      </Container>
    </footer>
  );
};
