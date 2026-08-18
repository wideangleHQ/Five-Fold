"use client";

import React, { useState } from "react";
import { Calculator, ArrowRight, ArrowLeft, CheckCircle2, ShieldAlert, Sparkles, Building2, Home, Factory, Landmark } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { calculateSolarEstimate, CalculatorOutputs } from "@/lib/calculator";

export const SolarCalculator: React.FC = () => {
  const [step, setStep] = useState<number>(1);
  const [propertyType, setPropertyType] = useState<string>("Residential");
  
  // Usage Inputs
  const [monthlyBill, setMonthlyBill] = useState<number>(10000);
  const [usageType, setUsageType] = useState<"bill" | "consumption">("bill");
  
  // Appliance Inputs (Optional)
  const [fans, setFans] = useState<number>(4);
  const [lights, setLights] = useState<number>(8);
  const [acs, setAcs] = useState<number>(1);
  const [refrigerators, setRefrigerators] = useState<number>(1);
  const [pumps, setPumps] = useState<number>(1);
  const [computers, setComputers] = useState<number>(1);
  
  // Rooftop Inputs
  const [roofAreaSqFt, setRoofAreaSqFt] = useState<number>(800);
  const [location, setLocation] = useState<string>("Bhubaneswar, Odisha");

  // State output
  const [result, setResult] = useState<CalculatorOutputs | null>(null);

  const handleCalculate = () => {
    // If appliances specified, add estimated appliance bill factor
    let adjustedBill = monthlyBill;
    if (step >= 3) {
      const applianceUnitsEst = (fans * 30) + (lights * 15) + (acs * 250) + (refrigerators * 60) + (pumps * 90) + (computers * 40);
      if (applianceUnitsEst > 0) {
        adjustedBill = Math.max(monthlyBill, applianceUnitsEst * 7.5);
      }
    }

    const calcResult = calculateSolarEstimate({
      monthlyBill: adjustedBill,
      location,
      roofType: "Flat RCC",
      roofAreaSqFt,
    });
    setResult(calcResult);
    setStep(5); // Result Screen
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-md p-6 sm:p-10 max-w-4xl mx-auto">
      {/* Wizard Progress Header */}
      <div className="flex items-center justify-between pb-6 mb-8 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 text-brand-green text-xs font-mono font-bold uppercase tracking-wider">
            <Calculator className="h-4 w-4" />
            <span>Step 0{step} of 05</span>
          </div>
          <h3 className="font-heading text-xl sm:text-2xl font-bold text-slate-900 mt-1">
            {step === 1 && "Select Property Type"}
            {step === 2 && "Electricity Usage"}
            {step === 3 && "Appliance-Based Estimation (Optional)"}
            {step === 4 && "Rooftop & Location Information"}
            {step === 5 && "Your Indicative Solar Estimate"}
          </h3>
        </div>
        <div className="hidden sm:flex gap-1.5">
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className={`h-2 rounded-full transition-all ${
                i === step
                  ? "w-8 bg-brand-green"
                  : i < step
                  ? "w-2 bg-emerald-600"
                  : "w-2 bg-slate-200"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Step 01: Property Type */}
      {step === 1 && (
        <div className="space-y-6">
          <p className="text-sm text-slate-600">
            Select your property category to tailor system sizing benchmarks and subsidy/tax calculations.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { type: "Residential", desc: "Homes, villas & housing societies", icon: Home },
              { type: "Commercial", desc: "Offices, retail, hotels & hospitals", icon: Building2 },
              { type: "Industrial", desc: "Factories, plants & warehouses", icon: Factory },
              { type: "Institutional", desc: "Schools, colleges & government campuses", icon: Landmark },
            ].map((item) => {
              const Icon = item.icon;
              const isSelected = propertyType === item.type;
              return (
                <button
                  key={item.type}
                  type="button"
                  onClick={() => setPropertyType(item.type)}
                  className={`p-5 text-left rounded-xl border transition-all ${
                    isSelected
                      ? "border-brand-green bg-brand-green/5 ring-2 ring-brand-green/20"
                      : "border-slate-200 hover:border-slate-300 bg-white"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <Icon className={`h-6 w-6 ${isSelected ? "text-brand-green" : "text-slate-500"}`} />
                    {isSelected && <CheckCircle2 className="h-5 w-5 text-brand-green" />}
                  </div>
                  <div className="font-heading font-bold text-base text-slate-900">{item.type}</div>
                  <div className="text-xs text-slate-500 mt-1">{item.desc}</div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Step 02: Electricity Usage */}
      {step === 2 && (
        <div className="space-y-6">
          <p className="text-sm text-slate-600">
            Enter your average monthly electricity expenses or monthly units consumed.
          </p>
          <div className="space-y-4 max-w-md">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                Monthly Electricity Bill (INR)
              </label>
              <div className="relative">
                <span className="absolute left-4 top-3 text-slate-400 font-bold">₹</span>
                <input
                  type="number"
                  value={monthlyBill}
                  onChange={(e) => setMonthlyBill(Number(e.target.value))}
                  className="w-full pl-8 pr-4 py-2.5 rounded-xl border border-slate-300 text-lg font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-green"
                />
              </div>
              <div className="flex justify-between text-xs text-slate-500 mt-2">
                <span>₹2,000</span>
                <span>₹50,000</span>
                <span>₹200,000+</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Step 03: Appliance Estimation */}
      {step === 3 && (
        <div className="space-y-6">
          <p className="text-sm text-slate-600">
            Optional: Add major electrical appliances to refine your daytime power baseline.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {[
              { label: "Fans", value: fans, setter: setFans },
              { label: "Lights / Bulbs", value: lights, setter: setLights },
              { label: "AC Units", value: acs, setter: setAcs },
              { label: "Refrigerators", value: refrigerators, setter: setRefrigerators },
              { label: "Water Pumps", value: pumps, setter: setPumps },
              { label: "Computers / Desktops", value: computers, setter: setComputers },
            ].map((app) => (
              <div key={app.label} className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
                <label className="block text-xs font-bold text-slate-700">{app.label}</label>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => app.setter(Math.max(0, app.value - 1))}
                    className="w-8 h-8 rounded-lg bg-white border border-slate-300 font-bold text-slate-700 hover:bg-slate-100"
                  >
                    -
                  </button>
                  <span className="font-bold text-sm text-slate-900 w-8 text-center">{app.value}</span>
                  <button
                    type="button"
                    onClick={() => app.setter(app.value + 1)}
                    className="w-8 h-8 rounded-lg bg-white border border-slate-300 font-bold text-slate-700 hover:bg-slate-100"
                  >
                    +
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Step 04: Rooftop & Location */}
      {step === 4 && (
        <div className="space-y-6">
          <p className="text-sm text-slate-600">
            Enter your available shadow-free rooftop space and location.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-xl">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                Available Rooftop Area (Sq. Ft.)
              </label>
              <input
                type="number"
                value={roofAreaSqFt}
                onChange={(e) => setRoofAreaSqFt(Number(e.target.value))}
                placeholder="e.g. 1000"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-base font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-green"
              />
              <span className="text-[11px] text-slate-500 mt-1 block">
                Rule of thumb: 1 kW requires approx 90-100 sq ft.
              </span>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                Location in Odisha / India
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g. Bhubaneswar, Odisha"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-base font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-green"
              />
            </div>
          </div>
        </div>
      )}

      {/* Step 05: Calculation Result */}
      {step === 5 && result && (
        <div className="space-y-8 animate-in fade-in duration-300">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-5 rounded-2xl bg-slate-900 text-white border border-slate-800 space-y-1">
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Recommended Capacity
              </div>
              <div className="font-heading text-3xl font-extrabold text-emerald-400">
                {result.recommendedCapacityKw} kWp
              </div>
              <div className="text-[11px] text-slate-400">Optimal PV Plant Size</div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900 text-white border border-slate-800 space-y-1">
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Annual Generation
              </div>
              <div className="font-heading text-3xl font-extrabold text-white">
                {result.estimatedAnnualGenerationKwh.toLocaleString()} kWh
              </div>
              <div className="text-[11px] text-slate-400">Estimated Annual Yield</div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900 text-white border border-slate-800 space-y-1">
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Estimated Annual Savings
              </div>
              <div className="font-heading text-3xl font-extrabold text-brand-amber">
                ₹{result.estimatedAnnualSavingsInr.toLocaleString()}
              </div>
              <div className="text-[11px] text-slate-400">Yearly Electricity Savings</div>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
            <div className="font-heading font-bold text-slate-900 text-base">
              Suggested Solution & Scheme Eligibility
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-3.5 rounded-xl bg-white border border-slate-200 space-y-1">
                <div className="font-semibold text-slate-700">Recommended Solution</div>
                <div className="font-bold text-brand-green text-sm">
                  {propertyType === "Residential"
                    ? "Rooftop On-Grid Solar Plant with DISCOM Net Metering"
                    : "C&I High-Yield Rooftop Plant with Zero Export & PVsyst Modeling"}
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-white border border-slate-200 space-y-1">
                <div className="font-semibold text-slate-700">Applicable Scheme</div>
                <div className="font-bold text-slate-900 text-sm">
                  {propertyType === "Residential"
                    ? "PM Surya Ghar Subsidy (Up to ₹78,000 Direct Credit)"
                    : "40% Accelerated Depreciation & DISCOM Net-Metering"}
                </div>
              </div>
            </div>
          </div>

          {/* Mandatory Disclaimer */}
          <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs space-y-1">
            <div className="font-bold flex items-center gap-1.5 text-amber-950">
              <ShieldAlert className="h-4 w-4 text-amber-700 shrink-0" />
              <span>Indicative Estimate Disclaimer</span>
            </div>
            <p className="text-amber-800 leading-relaxed">
              {result.disclaimer}
            </p>
          </div>
        </div>
      )}

      {/* Navigation Footer */}
      <div className="flex items-center justify-between pt-6 mt-8 border-t border-slate-200">
        {step > 1 && step < 5 ? (
          <Button variant="outline" size="sm" onClick={() => setStep(step - 1)}>
            <ArrowLeft className="mr-1.5 h-4 w-4" />
            <span>Previous</span>
          </Button>
        ) : (
          <div />
        )}

        {step < 4 && (
          <Button variant="primary" size="md" onClick={() => setStep(step + 1)}>
            <span>Next Step</span>
            <ArrowRight className="ml-1.5 h-4 w-4" />
          </Button>
        )}

        {step === 4 && (
          <Button variant="primary" size="md" onClick={handleCalculate}>
            <Sparkles className="mr-1.5 h-4 w-4 text-brand-amber" />
            <span>Calculate Estimate</span>
          </Button>
        )}

        {step === 5 && (
          <div className="flex gap-3 w-full sm:w-auto justify-end">
            <Button variant="outline" size="sm" onClick={() => setStep(1)}>
              Recalculate
            </Button>
            <Button href="/contact" variant="primary" size="md">
              <span>Talk to Fivefold Engineers</span>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
