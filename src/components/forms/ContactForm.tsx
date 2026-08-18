"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Send, CheckCircle2, Shield } from "lucide-react";

const INTEREST_OPTIONS = [
  "Residential Solar",
  "Commercial Solar",
  "Industrial Solar",
  "Government Scheme Assistance",
  "SolarCare / AMC",
  "Maintenance",
  "Other",
];

export const ContactForm: React.FC = () => {
  const [interest, setInterest] = useState<string>("Residential Solar");
  const [name, setName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [requirement, setRequirement] = useState<string>("");
  const [electricityInfo, setElectricityInfo] = useState<string>("");

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Asynchronous lead submission simulation (no blocking DB calls on page load)
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 600);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
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
                  ? "bg-brand-green text-white border-brand-green shadow-xs"
                  : "bg-white text-slate-700 border-slate-200 hover:border-brand-green/40"
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
            className="w-full px-4 py-2.5 rounded-lg border border-slate-300 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-brand-green"
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
            className="w-full px-4 py-2.5 rounded-lg border border-slate-300 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-brand-green"
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
            className="w-full px-4 py-2.5 rounded-lg border border-slate-300 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-brand-green"
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
            className="w-full px-4 py-2.5 rounded-lg border border-slate-300 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-brand-green"
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
          className="w-full px-4 py-2.5 rounded-lg border border-slate-300 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-brand-green"
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
          className="w-full px-4 py-2.5 rounded-lg border border-slate-300 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-brand-green"
        />
      </div>

      {/* Submission Success */}
      {isSubmitted && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs space-y-1 animate-in fade-in">
          <div className="flex items-center gap-2 font-bold text-emerald-950">
            <CheckCircle2 className="h-4 w-4 text-emerald-700 shrink-0" />
            <span>Consultation Request Received</span>
          </div>
          <p className="text-emerald-800 leading-relaxed">
            Thank you, <strong>{name}</strong>. A Fivefold solar engineer will review your details ({interest} in {location}) and connect with you shortly.
          </p>
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
        <Shield className="h-3.5 w-3.5 text-brand-green" />
        <span>Your contact information is strictly confidential and protected.</span>
      </div>
    </form>
  );
};
