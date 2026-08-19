"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Phone, Mail, MapPin, Twitter, Facebook, Instagram, Linkedin, Youtube } from "lucide-react";

// Use approved local image asset for sky background
import footerBgImg from "@/assets/Images/hero section background.png";

export const Footer: React.FC = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <footer className="bg-white pt-3 sm:pt-4 pb-0 mb-0 font-sans relative z-10">
      {/* 1. SUBSTANTIALLY WIDER FOOTER CONTAINER WITH FLUSH BOTTOM EDGE */}
      <div className="w-full max-w-[1840px] mx-auto px-1 sm:px-2 pb-0 mb-0">
        <div className="relative rounded-t-[2.5rem] sm:rounded-t-[3.5rem] rounded-b-none bg-[#0B3D2E] text-white overflow-hidden shadow-2xl border-t border-l border-r border-emerald-900/60 pt-12 sm:pt-16 pb-0 mb-0">
          
          {/* Background Sky Image - 90% Visible at Top, Gradual Vertical Fade Down */}
          <div className="absolute inset-0 z-0">
            <Image
              src={footerBgImg}
              alt="Fivefold Renewable Solar Sky Background"
              fill
              priority
              sizes="(max-width: 1840px) 100vw, 1840px"
              className="object-cover object-top opacity-90"
            />
            {/* Seamless Gradient Overlay: Transparent at Top (~90% Visibility), Fading progressively down to Solid Deep Green */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0B3D2E]/80 via-40% to-[#0B3D2E] z-0" />
          </div>

          {/* Usable Wide Content Area */}
          <div className="relative z-10 px-4 sm:px-8 lg:px-10 xl:px-14 space-y-10 sm:space-y-12">
            
            {/* 2. TOP BRAND & SOCIAL AREA (CLEARLY VISIBLE OVER 90% SKY PHOTOGRAPHY) */}
            <div className="text-center space-y-4 max-w-xl mx-auto pb-10 border-b border-white/20">
              <Link href="/" className="inline-flex items-center gap-3 group">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#1F7A45] font-heading text-xl font-bold text-white shadow-md group-hover:bg-[#155E34] transition-colors">
                  F
                </div>
                <div className="flex flex-col text-left">
                  <span className="font-heading text-xl font-extrabold tracking-tight text-white leading-none">
                    FIVEFOLD RENEWABLE
                  </span>
                  <span className="text-[9.5px] tracking-widest uppercase font-semibold text-emerald-300 mt-1 font-sans">
                    SOLAR DECISION PLATFORM & EPC
                  </span>
                </div>
              </Link>

              <p className="font-sans text-xs sm:text-sm text-white font-medium leading-relaxed max-w-md mx-auto drop-shadow-xs">
                Engineering-led solar EPC solutions for smarter energy, stronger performance and long-term value.
              </p>

              {/* Compact Translucent Circular Social Icons */}
              <div className="flex items-center justify-center gap-2.5 pt-1">
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Twitter / X"
                  className="h-9 w-9 rounded-full bg-slate-900/60 border border-white/25 hover:bg-[#1F7A45] hover:border-[#1F7A45] text-white flex items-center justify-center transition-all shadow-xs"
                >
                  <Twitter className="h-4 w-4" />
                </a>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="h-9 w-9 rounded-full bg-slate-900/60 border border-white/25 hover:bg-[#1F7A45] hover:border-[#1F7A45] text-white flex items-center justify-center transition-all shadow-xs"
                >
                  <Facebook className="h-4 w-4" />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="h-9 w-9 rounded-full bg-slate-900/60 border border-white/25 hover:bg-[#1F7A45] hover:border-[#1F7A45] text-white flex items-center justify-center transition-all shadow-xs"
                >
                  <Instagram className="h-4 w-4" />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="h-9 w-9 rounded-full bg-slate-900/60 border border-white/25 hover:bg-[#1F7A45] hover:border-[#1F7A45] text-white flex items-center justify-center transition-all shadow-xs"
                >
                  <Linkedin className="h-4 w-4" />
                </a>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="YouTube"
                  className="h-9 w-9 rounded-full bg-slate-900/60 border border-white/25 hover:bg-[#1F7A45] hover:border-[#1F7A45] text-white flex items-center justify-center transition-all shadow-xs"
                >
                  <Youtube className="h-4 w-4" />
                </a>
              </div>
            </div>

            {/* 3. MAIN CONTENT: TWO PRIMARY AREAS (LEFT: NEWSLETTER ~40%, RIGHT: LINKS ~60%) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 pb-6">
              
              {/* LEFT SIDE: Newsletter & Stay Connected (~40% Width) */}
              <div className="lg:col-span-5 space-y-3.5">
                <h4 className="font-heading text-xs font-bold uppercase tracking-wider text-emerald-400">
                  STAY CONNECTED
                </h4>
                <p className="font-sans text-xs sm:text-sm text-slate-200 leading-relaxed max-w-md">
                  Get the latest solar insights delivered straight to your inbox.
                </p>
                <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 pt-1 max-w-md">
                  <input
                    type="email"
                    required
                    placeholder="Enter Your Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-white/10 border border-white/20 text-white placeholder:text-slate-400 rounded-lg px-4 py-2.5 text-xs focus:outline-none focus:border-[#1F7A45] flex-1 font-sans"
                  />
                  <button
                    type="submit"
                    className="bg-[#1F7A45] hover:bg-[#155E34] text-white px-5 py-2.5 text-xs font-sans font-semibold rounded-lg transition-colors shrink-0 shadow-xs"
                  >
                    {subscribed ? "Subscribed!" : "Subscribe"}
                  </button>
                </form>
              </div>

              {/* RIGHT SIDE: Navigation Columns (~60% Width) */}
              <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-6 lg:gap-8">
                
                {/* Column 1: MAIN MENU */}
                <div className="space-y-3">
                  <h4 className="font-heading text-xs font-bold uppercase tracking-wider text-emerald-400">
                    MAIN MENU
                  </h4>
                  <ul className="space-y-2 text-xs font-sans text-slate-300">
                    <li>
                      <Link href="/" className="hover:text-emerald-400 transition-colors">
                        Home
                      </Link>
                    </li>
                    <li>
                      <Link href="/about" className="hover:text-emerald-400 transition-colors">
                        About Fivefold
                      </Link>
                    </li>
                    <li>
                      <Link href="/engineering" className="hover:text-emerald-400 transition-colors">
                        Engineering
                      </Link>
                    </li>
                    <li>
                      <Link href="/projects" className="hover:text-emerald-400 transition-colors">
                        Project Portfolio
                      </Link>
                    </li>
                    <li>
                      <Link href="/solarcare" className="hover:text-emerald-400 transition-colors">
                        SolarCare O&M
                      </Link>
                    </li>
                    <li>
                      <Link href="/warranty" className="hover:text-emerald-400 transition-colors">
                        Warranty & Support
                      </Link>
                    </li>
                    <li>
                      <Link href="/faq" className="hover:text-emerald-400 transition-colors">
                        FAQ
                      </Link>
                    </li>
                    <li>
                      <Link href="/contact" className="hover:text-emerald-400 transition-colors">
                        Contact Us
                      </Link>
                    </li>
                  </ul>
                </div>

                {/* Column 2: SOLAR SOLUTIONS */}
                <div className="space-y-3">
                  <h4 className="font-heading text-xs font-bold uppercase tracking-wider text-emerald-400">
                    SOLAR SOLUTIONS
                  </h4>
                  <ul className="space-y-2 text-xs font-sans text-slate-300">
                    <li>
                      <Link href="/residential-solar" className="hover:text-emerald-400 transition-colors">
                        Residential Solar
                      </Link>
                    </li>
                    <li>
                      <Link href="/commercial-solar" className="hover:text-emerald-400 transition-colors">
                        Commercial Solar
                      </Link>
                    </li>
                    <li>
                      <Link href="/industrial-solar" className="hover:text-emerald-400 transition-colors">
                        Industrial Solar
                      </Link>
                    </li>
                    <li>
                      <Link href="/services" className="hover:text-emerald-400 transition-colors">
                        Institutional Solar
                      </Link>
                    </li>
                    <li>
                      <Link href="/solar-calculator" className="hover:text-emerald-400 transition-colors font-semibold text-white">
                        Smart Solar Calculator
                      </Link>
                    </li>
                    <li>
                      <Link href="/government-schemes" className="hover:text-emerald-400 transition-colors">
                        Government Schemes
                      </Link>
                    </li>
                  </ul>
                </div>

                {/* Column 3: CONTACT & OFFICE */}
                <div className="space-y-3">
                  <h4 className="font-heading text-xs font-bold uppercase tracking-wider text-emerald-400">
                    CONTACT & OFFICE
                  </h4>
                  <div className="space-y-2.5 text-xs font-sans text-slate-300">
                    <div className="flex items-start gap-2">
                      <MapPin className="h-3.5 w-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>
                        Plot No. SCR 2, Lane No. 6, Anant Vihar Phase-3, Pokhariput, Bhubaneswar – 751020, Odisha
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                      <span>+91 70081 01078 / +91 70081 33792</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                      <span>info@fivefoldsolar.com</span>
                    </div>
                  </div>
                </div>

              </div>

            </div>

            {/* 4. BOTTOM LEGAL BAR */}
            <div className="pt-4 pb-4 border-t border-emerald-900/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-sans text-slate-400 relative z-10">
              <p>© 2026 Fivefold Renewable. All Rights Reserved.</p>
              <div className="flex items-center gap-6">
                <Link href="/privacy" className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
                <Link href="/terms" className="hover:text-white transition-colors">
                  Terms of Use
                </Link>
              </div>
            </div>

          </div>

          {/* 5. OVERSIZED CROPPED BRAND TYPOGRAPHY ("FIVEFOLD") */}
          <div className="relative z-0 w-full overflow-hidden pointer-events-none select-none mb-0 pb-0">
            <div className="font-heading text-[17vw] sm:text-[19vw] lg:text-[18vw] font-extrabold text-center leading-none tracking-tighter text-emerald-500/15 transform translate-y-[22%] uppercase">
              FIVEFOLD
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
};
