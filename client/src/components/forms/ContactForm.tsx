"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Send, CheckCircle2, Shield, AlertCircle } from "lucide-react";

const INTEREST_OPTIONS = [
  "Residential Solar",
  "Commercial Solar",
  "Industrial Solar",
  "Government Scheme Assistance",
  "SolarCare / AMC",
  "Maintenance",
  "Other",
];

const SOURCE_TO_INTEREST: Record<string, string> = {
  solarcare: "SolarCare / AMC",
  schemes: "Government Scheme Assistance",
  residential: "Residential Solar",
  commercial: "Commercial Solar",
  industrial: "Industrial Solar",
};

export const ContactForm: React.FC = () => {
  const searchParams = useSearchParams();

  const [interest, setInterest] = useState<string>("Residential Solar");
  const [name, setName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [requirement, setRequirement] = useState<string>("");
  const [electricityInfo, setElectricityInfo] = useState<string>("");
  const [gotcha, setGotcha] = useState<string>("");

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  useEffect(() => {
    const source = searchParams.get("source");
    const plan = searchParams.get("plan");
    const tier = searchParams.get("tier");
    const loc = searchParams.get("location");
    const propertyType = searchParams.get("propertyType");
    const category = searchParams.get("category");
    const capacity = searchParams.get("capacity");
    const existingSolar = searchParams.get("existingSolar");

    if (source && SOURCE_TO_INTEREST[source]) setInterest(SOURCE_TO_INTEREST[source]);
    else if (plan) setInterest("SolarCare / AMC");

    if (loc) setLocation(decodeURIComponent(loc));

    if (plan && tier) {
      setRequirement(`Interested in SolarCare ${plan} plan, ${tier} tier.`);
    } else if (propertyType || category) {
      const parts: string[] = [];
      if (propertyType) parts.push(`Property type: ${propertyType}`);
      if (category) parts.push(`Category: ${category}`);
      if (capacity) parts.push(`Required capacity: ${capacity}`);
      if (existingSolar) parts.push(`Existing solar: ${existingSolar}`);
      setRequirement(parts.join(". "));
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    const INTEREST_MAP: Record<string, { leadType: string; source: string }> = {
      "Residential Solar":          { leadType: "residential", source: "contact" },
      "Commercial Solar":           { leadType: "commercial",  source: "contact" },
      "Industrial Solar":           { leadType: "industrial",  source: "contact" },
      "Government Scheme Assistance": { leadType: "residential", source: "schemes" },
      "SolarCare / AMC":            { leadType: "solarcare",   source: "solarcare" },
      "Maintenance":                { leadType: "solarcare",   source: "contact" },
      "Other":                      { leadType: "other",       source: "contact" },
    };

    const { leadType, source } = INTEREST_MAP[interest] ?? { leadType: "other", source: "contact" };
    const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";

    try {
      const res = await fetch(`${apiUrl}/api/leads`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          phone,
          email: email || undefined,
          city: location || undefined,
          leadType,
          source,
          message: requirement || undefined,
          electricityInfo: electricityInfo || undefined,
          _gotcha: gotcha || undefined,
        }),
      });

      if (!res.ok) {
        if (res.status === 429) {
          throw new Error("Too many requests. Please wait a moment and try again.");
        }
        const body = await res.json().catch(() => ({}));
        throw new Error((body as { message?: string }).message ?? `Error ${res.status}`);
      }

      setIsSubmitted(true);
    } catch (err) {
      setSubmitError(
        err instanceof Error
          ? err.message
          : "Unable to submit. Please try again or call us directly.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Honeypot */}
      <input
        type="text"
        name="_gotcha"
        tabIndex={-1}
        className="hidden"
        aria-hidden="true"
        value={gotcha}
        onChange={(e) => setGotcha(e.target.value)}
      />

      {/* Interest Selector */}
      <div className="space-y-2">
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
          I am interested in: <span className="text-red-500">*</span>
        </label>
        <div className="flex flex-wrap gap-2">
          {INTEREST_OPTIONS.map((option) => (
            <button
              type="button"
              key={option}
              onClick={() => setInterest(option)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                interest === option
                  ? "bg-[#20435F] text-white border-[#20435F] shadow-xs"
                  : "bg-white text-slate-700 border-slate-200 hover:border-[#20435F]/40"
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      {/* Grid Inputs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Name */}
        <div className="space-y-1">
          <label className="block text-xs font-semibold text-slate-700">
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Rajesh Mohanty"
            className="w-full px-4 py-2.5 rounded-lg border border-slate-300 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#20435F]"
          />
        </div>

        {/* Phone */}
        <div className="space-y-1">
          <label className="block text-xs font-semibold text-slate-700">
            Phone Number <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+91 98765 43210"
            className="w-full px-4 py-2.5 rounded-lg border border-slate-300 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#20435F]"
          />
        </div>

        {/* Email */}
        <div className="space-y-1">
          <label className="block text-xs font-semibold text-slate-700">
            Email Address <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="name@company.com"
            className="w-full px-4 py-2.5 rounded-lg border border-slate-300 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#20435F]"
          />
        </div>

        {/* Location */}
        <div className="space-y-1">
          <label className="block text-xs font-semibold text-slate-700">
            Location / District <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            required
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="e.g. Bhubaneswar, Odisha"
            className="w-full px-4 py-2.5 rounded-lg border border-slate-300 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#20435F]"
          />
        </div>
      </div>

      {/* Requirement Details */}
      <div className="space-y-1">
        <label className="block text-xs font-semibold text-slate-700">
          Solar Requirement Details
        </label>
        <textarea
          rows={3}
          value={requirement}
          onChange={(e) => setRequirement(e.target.value)}
          placeholder="Briefly describe your rooftop space, target capacity (kWp), or specific questions..."
          className="w-full px-4 py-2.5 rounded-lg border border-slate-300 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#20435F]"
        />
      </div>

      {/* Optional Electricity Information */}
      <div className="space-y-1">
        <label className="block text-xs font-semibold text-slate-700">
          Optional Electricity Bill / Consumption Info
        </label>
        <input
          type="text"
          value={electricityInfo}
          onChange={(e) => setElectricityInfo(e.target.value)}
          placeholder="e.g. Monthly Bill ₹15,000 or 1,500 units/month"
          className="w-full px-4 py-2.5 rounded-lg border border-slate-300 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#20435F]"
        />
      </div>

      {/* Submission Success */}
      {isSubmitted && (
        <div className="p-4 rounded-xl bg-sky-50 border border-sky-200 text-sky-900 text-xs space-y-1 animate-in fade-in">
          <div className="flex items-center gap-2 font-bold text-sky-950">
            <CheckCircle2 className="h-4 w-4 text-[#00A9D6] shrink-0" />
            <span>Consultation Request Received</span>
          </div>
          <p className="text-sky-800 leading-relaxed">
            Thank you, <strong>{name}</strong>. A Fivefold solar engineer will review your details ({interest} in {location}) and connect with you shortly.
          </p>
        </div>
      )}

      {/* Submission Error */}
      {submitError && (
        <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-900 text-xs space-y-1 animate-in fade-in">
          <div className="flex items-center gap-2 font-bold text-red-950">
            <AlertCircle className="h-4 w-4 text-red-500 shrink-0" />
            <span>Submission Failed</span>
          </div>
          <p className="text-red-800 leading-relaxed">{submitError}</p>
        </div>
      )}

      {/* CTA Button */}
      <Button
        type="submit"
        variant="primary"
        size="lg"
        disabled={isSubmitting}
        className="w-full font-bold"
      >
        {isSubmitting ? (
          <span>Submitting Enquiry...</span>
        ) : (
          <span className="flex items-center gap-2">
            <span>Submit Enquiry & Request Assessment</span>
            <Send className="h-4 w-4" />
          </span>
        )}
      </Button>

      <div className="flex items-center justify-center gap-2 text-[11px] text-slate-500 font-medium pt-1">
        <Shield className="h-3.5 w-3.5 text-[#20435F]" />
        <span>Your contact information is strictly confidential and protected.</span>
      </div>
    </form>
  );
};
