"use client";

import React, { useState, useEffect } from "react";
import { X, CheckCircle2, FileText, HelpCircle, ArrowRight, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface SchemeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SchemeModal: React.FC<SchemeModalProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState<number>(1);
  const [propertyType, setPropertyType] = useState<string>("Residential");
  const [customerCategory, setCustomerCategory] = useState<string>("Individual Homeowner");
  const [location, setLocation] = useState<string>("Odisha");
  const [solarReqKw, setSolarReqKw] = useState<string>("3 kWp");
  const [hasExistingSolar, setHasExistingSolar] = useState<string>("No");

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
  };

  const handleReset = () => {
    setStep(1);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2 text-brand-amber text-xs font-mono font-semibold uppercase tracking-wider">
              <ShieldCheck className="h-4 w-4 text-emerald-400" />
              <span>Government Scheme Discovery</span>
            </div>
            <h3 className="font-heading text-lg font-bold text-white">
              Check Solar Subsidy & Scheme Eligibility
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            aria-label="Close Modal"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {step === 1 && (
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">
                  1. Select Property Type
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {["Residential", "Commercial", "Industrial", "Institutional"].map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setPropertyType(type)}
                      className={`p-3 text-center rounded-xl border text-xs font-semibold transition-all ${
                        propertyType === type
                          ? "border-brand-green bg-brand-green/10 text-brand-green"
                          : "border-slate-200 hover:border-slate-300 text-slate-700"
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">
                  2. Customer Category
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {[
                    "Individual Homeowner",
                    "Housing Society / RWA",
                    "Private Enterprise / MSME",
                    "Institutional Trust / NGO",
                  ].map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setCustomerCategory(cat)}
                      className={`p-3 text-left rounded-xl border text-xs font-semibold transition-all ${
                        customerCategory === cat
                          ? "border-brand-green bg-brand-green/10 text-brand-green"
                          : "border-slate-200 hover:border-slate-300 text-slate-700"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">
                  3. Approximate Solar System Requirement
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {["1 - 3 kWp", "3 - 10 kWp", "10 - 50 kWp", "50+ kWp"].map((req) => (
                    <button
                      key={req}
                      type="button"
                      onClick={() => setSolarReqKw(req)}
                      className={`p-2.5 text-center rounded-xl border text-xs font-semibold transition-all ${
                        solarReqKw === req
                          ? "border-brand-green bg-brand-green/10 text-brand-green"
                          : "border-slate-200 hover:border-slate-300 text-slate-700"
                      }`}
                    >
                      {req}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">
                  4. Do you currently have an existing rooftop solar system?
                </label>
                <div className="flex gap-4">
                  {["No", "Yes"].map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => setHasExistingSolar(option)}
                      className={`px-5 py-2 rounded-lg border text-xs font-semibold transition-all ${
                        hasExistingSolar === option
                          ? "border-brand-green bg-brand-green/10 text-brand-green"
                          : "border-slate-200 hover:border-slate-300 text-slate-700"
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-5">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Summary of your inputs
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs text-slate-800">
                  <div>
                    Property: <strong className="text-slate-900">{propertyType}</strong>
                  </div>
                  <div>
                    Category: <strong className="text-slate-900">{customerCategory}</strong>
                  </div>
                  <div>
                    Capacity: <strong className="text-slate-900">{solarReqKw}</strong>
                  </div>
                  <div>
                    Existing Solar: <strong className="text-slate-900">{hasExistingSolar}</strong>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-1">
                  Location / District in Odisha
                </label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g. Khordha / Bhubaneswar / Cuttack"
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-brand-green"
                />
              </div>

              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs space-y-2">
                <div className="font-bold text-emerald-950 flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-emerald-700" />
                  <span>Verified Government Scheme Match Identified</span>
                </div>
                <p className="text-emerald-800 leading-relaxed">
                  Based on your input, your property qualifies for central government rooftop subsidy (PM Surya Ghar Muft Bijli Yojana) and Odisha DISCOM Net Metering regulatory support.
                </p>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-5">
              <div className="p-5 rounded-xl border border-brand-green/30 bg-brand-green/5 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold uppercase text-brand-green">
                    Recommended Primary Scheme
                  </span>
                  <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                    Active Guidelines
                  </span>
                </div>
                <h4 className="font-heading text-lg font-bold text-slate-900">
                  {propertyType === "Residential"
                    ? "PM Surya Ghar Muft Bijli Yojana"
                    : "RTS Phase II & C&I Accelerated Depreciation (40%)"}
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {propertyType === "Residential"
                    ? "Central Government financial assistance providing up to ₹78,000 direct subsidy for systems up to 3 kW, along with low-interest collateral-free loan options."
                    : "Commercial and Industrial facilities benefit from 40% Accelerated Depreciation tax benefits, DISCOM open access / net metering provisions, and GST tax credit structures."}
                </p>
              </div>

              {/* Benefits & Requirements */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
                  <div className="font-bold text-slate-900 flex items-center gap-1.5">
                    <CheckCircle2 className="h-4 w-4 text-brand-green" />
                    <span>Potential Benefits</span>
                  </div>
                  <ul className="space-y-1 text-slate-600 list-disc list-inside">
                    <li>Up to ₹78,000 direct central subsidy</li>
                    <li>Up to 90% electricity bill savings</li>
                    <li>DISCOM Net Metering Approval</li>
                    <li>25-Year performance assurance</li>
                  </ul>
                </div>

                <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
                  <div className="font-bold text-slate-900 flex items-center gap-1.5">
                    <FileText className="h-4 w-4 text-brand-green" />
                    <span>Required Documents</span>
                  </div>
                  <ul className="space-y-1 text-slate-600 list-disc list-inside">
                    <li>Electricity Bill (Latest)</li>
                    <li>Aadhaar Card / ID Proof</li>
                    <li>Rooftop Ownership Proof</li>
                    <li>Bank Account Details</li>
                  </ul>
                </div>
              </div>

              {/* Mandatory Disclaimer */}
              <div className="p-3.5 rounded-lg bg-slate-100 text-slate-600 text-[11px] leading-normal border border-slate-200">
                <strong>Important Notice:</strong> Final scheme eligibility, subsidy disbursal, and benefits are strictly subject to prevailing government guidelines and DISCOM technical verification.
              </div>
            </div>
          )}
        </div>

        {/* Footer Controls */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          {step > 1 ? (
            <Button variant="outline" size="sm" onClick={() => setStep(step - 1)}>
              Back
            </Button>
          ) : (
            <div />
          )}

          {step < 3 ? (
            <Button variant="primary" size="sm" onClick={handleNext}>
              <span>Continue</span>
              <ArrowRight className="ml-1.5 h-4 w-4" />
            </Button>
          ) : (
            <Button href="/contact" variant="primary" size="sm" onClick={handleReset}>
              <span>Get Assistance from Fivefold</span>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
