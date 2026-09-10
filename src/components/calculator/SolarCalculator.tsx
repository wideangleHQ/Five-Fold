"use client";

import React, { useState } from "react";
import { ArrowRight, ChevronRight, Info } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { calculateSolarRequirement } from "@/lib/solar-engine";
import type { CalculatorInput, SolarCalculationResult } from "@/lib/solar-engine";
import { sqFtToM2 } from "@/lib/solar-engine/roof-feasibility";

// ─── Step 1: Property Type ────────────────────────────────────────────────────

type PropertyType = CalculatorInput["propertyType"];

const PROPERTY_TYPES: { id: PropertyType; label: string; description: string }[] = [
  { id: "residential", label: "Residential", description: "Home, apartment, villa" },
  { id: "commercial",  label: "Commercial",  description: "Shop, office, mall" },
  { id: "industrial",  label: "Industrial",  description: "Factory, warehouse, plant" },
  { id: "institutional", label: "Institutional", description: "Hospital, school, government" },
];

// ─── Step 2: Usage / Consumption ─────────────────────────────────────────────

type InputMode = "bill" | "consumption" | "appliances";

const USAGE_MODES: { id: InputMode; label: string; sublabel: string }[] = [
  { id: "consumption", label: "I know my monthly units", sublabel: "Most accurate — from your electricity bill" },
  { id: "bill",        label: "I know my monthly bill amount", sublabel: "We estimate consumption from the bill" },
  { id: "appliances",  label: "Help me estimate from my appliances", sublabel: "List your main appliances" },
];

interface ApplianceState {
  fans: number; lights: number; acs: number; refrigerators: number;
  waterPumps: number; washingMachines: number; computers: number;
  geysers: number; tvs: number; otherWatts: number; otherHoursPerDay: number;
}

const DEFAULT_APPLIANCES: ApplianceState = {
  fans: 0, lights: 0, acs: 0, refrigerators: 0, waterPumps: 0,
  washingMachines: 0, computers: 0, geysers: 0, tvs: 0, otherWatts: 0, otherHoursPerDay: 2,
};

const APPLIANCE_LABELS: { key: keyof Omit<ApplianceState, "otherWatts" | "otherHoursPerDay">; label: string; hint: string }[] = [
  { key: "fans",           label: "Ceiling Fans",    hint: "~75W each" },
  { key: "lights",         label: "LED Lights",      hint: "~10W each" },
  { key: "acs",            label: "ACs (1.5 ton)",   hint: "~1400W each" },
  { key: "refrigerators",  label: "Refrigerators",   hint: "~150W each" },
  { key: "waterPumps",     label: "Water Pumps",     hint: "~750W each" },
  { key: "washingMachines",label: "Washing Machines",hint: "~500W each" },
  { key: "computers",      label: "Computers/Laptops",hint: "~150W each" },
  { key: "geysers",        label: "Geysers",         hint: "~2000W each" },
  { key: "tvs",            label: "TVs",             hint: "~100W each" },
];

// ─── Step 3: Rooftop & Location ───────────────────────────────────────────────

type ShadingLevel = CalculatorInput["shading"];
type DaytimeUsage = CalculatorInput["daytimeUsage"];

const SHADING_OPTIONS: { id: ShadingLevel; label: string; description: string }[] = [
  { id: "low",     label: "Low / None",  description: "Open rooftop, minimal shadows" },
  { id: "medium",  label: "Moderate",    description: "Some nearby buildings or trees" },
  { id: "high",    label: "High",        description: "Significant shadows on the roof" },
  { id: "unknown", label: "Not sure",    description: "We will use a conservative estimate" },
];

const DAYTIME_OPTIONS: { id: DaytimeUsage; label: string; description: string }[] = [
  { id: "high",    label: "Heavy daytime use", description: "AC, office, business — mostly 9am–6pm" },
  { id: "medium",  label: "Mixed",              description: "Some daytime, mostly evening use" },
  { id: "low",     label: "Mostly evenings",    description: "Lights and appliances mainly after 6pm" },
  { id: "unknown", label: "Not sure",           description: "We will use a moderate assumption" },
];

// ─── Helper components ────────────────────────────────────────────────────────

function StepHeader({ step, total, title }: { step: number; total: number; title: string }) {
  return (
    <div className="mb-8">
      <p className="font-mono text-xs text-slate-400 tracking-[0.15em] uppercase mb-2">
        Step {step} of {total}
      </p>
      <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-[#111615] tracking-tight">
        {title}
      </h2>
    </div>
  );
}

function Counter({
  value, onChange, label, hint,
}: { value: number; onChange: (v: number) => void; label: string; hint: string }) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-slate-100">
      <div>
        <p className="text-sm font-medium text-[#111615]">{label}</p>
        <p className="text-xs text-slate-400">{hint}</p>
      </div>
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => onChange(Math.max(0, value - 1))}
          className="w-8 h-8 rounded-full border border-slate-200 text-slate-500 hover:bg-slate-50 flex items-center justify-center text-lg leading-none transition-colors"
          aria-label={`Decrease ${label}`}
        >
          −
        </button>
        <span className="w-6 text-center font-mono text-sm font-semibold text-[#111615]">
          {value}
        </span>
        <button
          type="button"
          onClick={() => onChange(value + 1)}
          className="w-8 h-8 rounded-full border border-slate-200 text-slate-500 hover:bg-slate-50 flex items-center justify-center text-lg leading-none transition-colors"
          aria-label={`Increase ${label}`}
        >
          +
        </button>
      </div>
    </div>
  );
}

function ResultMetric({
  label, value, sub, accent,
}: { label: string; value: string; sub?: string; accent?: boolean }) {
  return (
    <div className={`p-4 rounded-xl border ${accent ? "border-[#00A9D6]/30 bg-[#00A9D6]/5" : "border-slate-100 bg-white"}`}>
      <p className="font-mono text-[10px] text-slate-400 tracking-[0.15em] uppercase mb-1">{label}</p>
      <p className={`font-heading text-2xl font-extrabold tracking-tight ${accent ? "text-[#20435F]" : "text-[#111615]"}`}>
        {value}
      </p>
      {sub && <p className="font-sans text-xs text-slate-400 mt-0.5">{sub}</p>}
    </div>
  );
}

function ConfidenceBadge({ level }: { level: "high" | "medium" | "low" }) {
  const map = {
    high:   { label: "High Confidence",   cls: "bg-emerald-50 text-emerald-700 border-emerald-200" },
    medium: { label: "Medium Confidence", cls: "bg-amber-50 text-amber-700 border-amber-200" },
    low:    { label: "Lower Confidence",  cls: "bg-orange-50 text-orange-700 border-orange-200" },
  };
  const { label, cls } = map[level];
  return (
    <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full border ${cls}`}>
      <Info className="h-3 w-3" />
      {label}
    </span>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export function SolarCalculator() {
  const TOTAL_STEPS = 4;
  const [step, setStep] = useState(1);

  // Step 1
  const [propertyType, setPropertyType] = useState<PropertyType>("residential");

  // Step 2
  const [inputMode, setInputMode] = useState<InputMode>("consumption");
  const [monthlyBillINR, setMonthlyBillINR] = useState("");
  const [monthlyKWh, setMonthlyKWh] = useState("");
  const [appliances, setAppliances] = useState<ApplianceState>(DEFAULT_APPLIANCES);

  // Step 3
  const [roofAreaSqFt, setRoofAreaSqFt] = useState("");
  const [location, setLocation] = useState("Bhubaneswar, Odisha");
  const [shading, setShading] = useState<ShadingLevel>("unknown");
  const [daytimeUsage, setDaytimeUsage] = useState<DaytimeUsage>("unknown");
  const [targetOffset, setTargetOffset] = useState(100);

  // Result
  const [result, setResult] = useState<SolarCalculationResult | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  function updateAppliance(key: keyof ApplianceState, val: number) {
    setAppliances((prev) => ({ ...prev, [key]: val }));
  }

  function handleCalculate() {
    setIsCalculating(true);
    // Run synchronously but wrap in a micro-task so UI can show loading state
    setTimeout(() => {
      const input: CalculatorInput = {
        inputMode,
        propertyType,
        monthlyBillINR: inputMode === "bill" ? Number(monthlyBillINR) || null : null,
        monthlyConsumptionKWh: inputMode === "consumption" ? Number(monthlyKWh) || null : null,
        appliances: inputMode === "appliances" ? appliances : null,
        roofAreaM2: roofAreaSqFt ? sqFtToM2(Number(roofAreaSqFt)) : null,
        location: location.trim() || "Bhubaneswar, Odisha",
        shading,
        daytimeUsage,
        targetOffset: targetOffset / 100,
        sanctionedLoadKW: null,
      };
      const calc = calculateSolarRequirement(input);
      setResult(calc);
      setStep(4);
      setIsCalculating(false);
    }, 50);
  }

  function handleReset() {
    setStep(1);
    setResult(null);
    setPropertyType("residential");
    setInputMode("consumption");
    setMonthlyBillINR("");
    setMonthlyKWh("");
    setAppliances(DEFAULT_APPLIANCES);
    setRoofAreaSqFt("");
    setLocation("Bhubaneswar, Odisha");
    setShading("unknown");
    setDaytimeUsage("unknown");
    setTargetOffset(100);
  }

  function canProceedStep1() { return !!propertyType; }
  function canProceedStep2() {
    if (inputMode === "consumption") return Number(monthlyKWh) > 0;
    if (inputMode === "bill") return Number(monthlyBillINR) > 0;
    if (inputMode === "appliances") {
      const total = Object.entries(appliances).reduce((s, [k, v]) => {
        if (k !== "otherWatts" && k !== "otherHoursPerDay") return s + (v as number);
        return s;
      }, 0);
      return total > 0 || appliances.otherWatts > 0;
    }
    return false;
  }
  function canProceedStep3() { return !!location.trim(); }

  // ── Step 1: Property Type ───────────────────────────────────────────────────
  if (step === 1) {
    return (
      <div className="max-w-xl mx-auto">
        <StepHeader step={1} total={TOTAL_STEPS} title="What type of property is this?" />
        <div className="grid grid-cols-2 gap-3">
          {PROPERTY_TYPES.map((pt) => (
            <button
              key={pt.id}
              type="button"
              onClick={() => setPropertyType(pt.id)}
              className={`text-left p-4 rounded-xl border-2 transition-all ${
                propertyType === pt.id
                  ? "border-[#20435F] bg-[#20435F]/5"
                  : "border-slate-100 hover:border-slate-300 bg-white"
              }`}
            >
              <p className="font-sans text-sm font-semibold text-[#111615]">{pt.label}</p>
              <p className="font-sans text-xs text-slate-400 mt-0.5">{pt.description}</p>
            </button>
          ))}
        </div>
        <div className="mt-8 flex justify-end">
          <Button
            onClick={() => setStep(2)}
            disabled={!canProceedStep1()}
            variant="primary"
            className="bg-[#20435F] hover:bg-[#0C3046] text-white px-6 py-3 text-sm font-semibold rounded-lg inline-flex items-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
          >
            <span>Continue</span>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    );
  }

  // ── Step 2: Consumption ─────────────────────────────────────────────────────
  if (step === 2) {
    return (
      <div className="max-w-xl mx-auto">
        <StepHeader step={2} total={TOTAL_STEPS} title="What is your electricity consumption?" />

        {/* Mode selector */}
        <div className="space-y-2 mb-6">
          {USAGE_MODES.map((mode) => (
            <button
              key={mode.id}
              type="button"
              onClick={() => setInputMode(mode.id)}
              className={`w-full text-left px-4 py-3 rounded-xl border-2 transition-all ${
                inputMode === mode.id
                  ? "border-[#20435F] bg-[#20435F]/5"
                  : "border-slate-100 hover:border-slate-200 bg-white"
              }`}
            >
              <p className="font-sans text-sm font-semibold text-[#111615]">{mode.label}</p>
              <p className="font-sans text-xs text-slate-400 mt-0.5">{mode.sublabel}</p>
            </button>
          ))}
        </div>

        {/* Input fields */}
        {inputMode === "consumption" && (
          <div>
            <label className="block text-sm font-medium text-[#111615] mb-2">
              Monthly consumption (units / kWh)
            </label>
            <input
              type="number"
              min={0}
              value={monthlyKWh}
              onChange={(e) => setMonthlyKWh(e.target.value)}
              placeholder="e.g. 250"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 font-sans text-sm text-[#111615] focus:outline-none focus:border-[#20435F] transition-colors"
            />
            <p className="text-xs text-slate-400 mt-2">
              Find this on your electricity bill — look for "Units Consumed" or "kWh".
            </p>
          </div>
        )}

        {inputMode === "bill" && (
          <div>
            <label className="block text-sm font-medium text-[#111615] mb-2">
              Monthly electricity bill (INR)
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 font-sans text-sm text-slate-400">₹</span>
              <input
                type="number"
                min={0}
                value={monthlyBillINR}
                onChange={(e) => setMonthlyBillINR(e.target.value)}
                placeholder="e.g. 2500"
                className="w-full pl-8 pr-4 py-3 rounded-xl border border-slate-200 font-sans text-sm text-[#111615] focus:outline-none focus:border-[#20435F] transition-colors"
              />
            </div>
            <p className="text-xs text-amber-600 mt-2">
              Bills include fixed charges and taxes. We estimate consumption using OERC tariff slabs — accuracy is moderate.
            </p>
          </div>
        )}

        {inputMode === "appliances" && (
          <div>
            <p className="text-xs text-slate-400 mb-4">
              Add the number of each appliance you use. We calculate from standard BEE power ratings.
            </p>
            <div className="space-y-0 divide-y divide-slate-50">
              {APPLIANCE_LABELS.map(({ key, label, hint }) => (
                <Counter
                  key={key}
                  value={appliances[key as keyof ApplianceState] as number}
                  onChange={(v) => updateAppliance(key as keyof ApplianceState, v)}
                  label={label}
                  hint={hint}
                />
              ))}
              <div className="py-3">
                <p className="text-sm font-medium text-[#111615] mb-2">Other appliances (optional)</p>
                <div className="flex gap-3">
                  <div className="flex-1">
                    <input
                      type="number"
                      min={0}
                      value={appliances.otherWatts || ""}
                      onChange={(e) => updateAppliance("otherWatts", Number(e.target.value))}
                      placeholder="Total watts"
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-[#20435F]"
                    />
                  </div>
                  <div className="flex-1">
                    <input
                      type="number"
                      min={0}
                      max={24}
                      value={appliances.otherHoursPerDay || ""}
                      onChange={(e) => updateAppliance("otherHoursPerDay", Number(e.target.value))}
                      placeholder="Hours/day"
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-[#20435F]"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="mt-8 flex justify-between">
          <button
            type="button"
            onClick={() => setStep(1)}
            className="font-sans text-sm text-slate-500 hover:text-[#111615] transition-colors"
          >
            Back
          </button>
          <Button
            onClick={() => setStep(3)}
            disabled={!canProceedStep2()}
            variant="primary"
            className="bg-[#20435F] hover:bg-[#0C3046] text-white px-6 py-3 text-sm font-semibold rounded-lg inline-flex items-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
          >
            <span>Continue</span>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    );
  }

  // ── Step 3: Rooftop & Location ──────────────────────────────────────────────
  if (step === 3) {
    return (
      <div className="max-w-xl mx-auto">
        <StepHeader step={3} total={TOTAL_STEPS} title="Rooftop and location details" />

        <div className="space-y-5">
          {/* Location */}
          <div>
            <label className="block text-sm font-medium text-[#111615] mb-2">Location (city or district)</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="e.g. Bhubaneswar, Sambalpur, Berhampur"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 font-sans text-sm text-[#111615] focus:outline-none focus:border-[#20435F] transition-colors"
            />
            <p className="text-xs text-slate-400 mt-1.5">
              Used to load district-specific Odisha solar irradiance data.
            </p>
          </div>

          {/* Roof area */}
          <div>
            <label className="block text-sm font-medium text-[#111615] mb-2">
              Available rooftop area (sq ft) — optional
            </label>
            <input
              type="number"
              min={0}
              value={roofAreaSqFt}
              onChange={(e) => setRoofAreaSqFt(e.target.value)}
              placeholder="e.g. 800"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 font-sans text-sm text-[#111615] focus:outline-none focus:border-[#20435F] transition-colors"
            />
            <p className="text-xs text-slate-400 mt-1.5">
              Total accessible roof area. We apply a 70% usable factor for obstructions.
            </p>
          </div>

          {/* Shading */}
          <div>
            <label className="block text-sm font-medium text-[#111615] mb-2">Rooftop shading</label>
            <div className="grid grid-cols-2 gap-2">
              {SHADING_OPTIONS.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setShading(s.id)}
                  className={`text-left px-3 py-2.5 rounded-xl border-2 text-xs transition-all ${
                    shading === s.id
                      ? "border-[#20435F] bg-[#20435F]/5"
                      : "border-slate-100 hover:border-slate-200 bg-white"
                  }`}
                >
                  <p className="font-semibold text-[#111615]">{s.label}</p>
                  <p className="text-slate-400 mt-0.5">{s.description}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Daytime usage */}
          <div>
            <label className="block text-sm font-medium text-[#111615] mb-2">
              When do you use most of your electricity?
            </label>
            <div className="grid grid-cols-2 gap-2">
              {DAYTIME_OPTIONS.map((d) => (
                <button
                  key={d.id}
                  type="button"
                  onClick={() => setDaytimeUsage(d.id)}
                  className={`text-left px-3 py-2.5 rounded-xl border-2 text-xs transition-all ${
                    daytimeUsage === d.id
                      ? "border-[#20435F] bg-[#20435F]/5"
                      : "border-slate-100 hover:border-slate-200 bg-white"
                  }`}
                >
                  <p className="font-semibold text-[#111615]">{d.label}</p>
                  <p className="text-slate-400 mt-0.5">{d.description}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Target offset */}
          <div>
            <label className="block text-sm font-medium text-[#111615] mb-2">
              Target solar offset: <span className="text-[#20435F]">{targetOffset}%</span>
            </label>
            <input
              type="range"
              min={40}
              max={100}
              step={10}
              value={targetOffset}
              onChange={(e) => setTargetOffset(Number(e.target.value))}
              className="w-full accent-[#20435F]"
            />
            <div className="flex justify-between text-xs text-slate-400 mt-1">
              <span>40%</span><span>70%</span><span>100%</span>
            </div>
            <p className="text-xs text-slate-400 mt-1.5">
              100% offset means sizing the system to cover your full annual consumption.
            </p>
          </div>
        </div>

        <div className="mt-8 flex justify-between">
          <button
            type="button"
            onClick={() => setStep(2)}
            className="font-sans text-sm text-slate-500 hover:text-[#111615] transition-colors"
          >
            Back
          </button>
          <Button
            onClick={handleCalculate}
            disabled={!canProceedStep3() || isCalculating}
            variant="primary"
            className="bg-[#20435F] hover:bg-[#0C3046] text-white px-6 py-3 text-sm font-semibold rounded-lg inline-flex items-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
          >
            <span>{isCalculating ? "Calculating..." : "Calculate"}</span>
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    );
  }

  // ── Step 4: Results ─────────────────────────────────────────────────────────
  if (step === 4 && result) {
    const r = result;
    const isResidential = propertyType === "residential";
    const fmt = (n: number, dec = 0) =>
      n.toLocaleString("en-IN", { maximumFractionDigits: dec, minimumFractionDigits: dec });

    return (
      <div className="max-w-2xl mx-auto">
        <div className="mb-6 flex items-center justify-between flex-wrap gap-3">
          <div>
            <p className="font-mono text-xs text-slate-400 tracking-[0.15em] uppercase mb-1">
              Preliminary Solar Estimate
            </p>
            <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-[#111615] tracking-tight">
              Your Solar Requirement
            </h2>
          </div>
          <ConfidenceBadge level={r.confidence.level} />
        </div>

        {/* Primary metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          <ResultMetric
            label="Recommended Capacity"
            value={`${r.recommendedSystemKWp} kWp`}
            sub={`~${r.estimatedRoofAreaRequiredM2.toFixed(0)} m² required`}
            accent
          />
          <ResultMetric
            label="Annual Generation"
            value={`${fmt(r.estimatedAnnualGenerationKWh)} kWh`}
            sub={`${fmt(r.estimatedAnnualGenerationKWh / 12, 0)} kWh/month avg`}
          />
          <ResultMetric
            label="Est. Annual Savings"
            value={`₹${fmt(r.estimatedAnnualSavingsINR)}`}
            sub={`₹${fmt(r.estimatedAnnualSavingsINR / 12, 0)}/month avg`}
          />
          <ResultMetric
            label="Payback Period"
            value={r.estimatedPaybackYears ? `${r.estimatedPaybackYears.toFixed(1)} yrs` : "N/A"}
            sub={r.potentialSubsidyINR > 0 ? "after subsidy" : ""}
          />
        </div>

        {/* Financial breakdown */}
        <div className="bg-white rounded-2xl border border-slate-100 p-5 mb-5">
          <h3 className="font-heading text-base font-bold text-[#111615] mb-4">Financial Estimate</h3>
          <div className="space-y-2.5 text-sm">
            <div className="flex justify-between">
              <span className="text-slate-500">Estimated system cost</span>
              <span className="font-semibold text-[#111615]">₹{fmt(r.grossSystemCostINR)}</span>
            </div>
            {r.potentialSubsidyINR > 0 && (
              <div className="flex justify-between text-emerald-700">
                <span>Central subsidy (PM Surya Ghar)</span>
                <span className="font-semibold">- ₹{fmt(r.potentialSubsidyINR)}</span>
              </div>
            )}
            <div className="flex justify-between border-t border-slate-100 pt-2.5">
              <span className="font-semibold text-[#111615]">Estimated net investment</span>
              <span className="font-bold text-[#20435F]">₹{fmt(r.estimatedNetInvestmentINR)}</span>
            </div>
          </div>

          {isResidential && r.subsidy.applicableSchemes.length > 0 && (
            <div className="mt-4 p-3 bg-[#F7F8F5] rounded-xl">
              <p className="text-xs font-semibold text-[#20435F] mb-1">Applicable Scheme</p>
              <p className="text-xs text-slate-600">{r.subsidy.applicableSchemes[0]}</p>
              <p className="text-xs text-slate-400 mt-1">{r.subsidy.breakdown}</p>
            </div>
          )}
          {!isResidential && (
            <div className="mt-4 p-3 bg-[#F7F8F5] rounded-xl">
              <p className="text-xs font-semibold text-[#20435F] mb-1">Tax Benefit</p>
              <p className="text-xs text-slate-600">40% Accelerated Depreciation on solar investment (IT Act Section 32)</p>
            </div>
          )}
        </div>

        {/* Key assumptions */}
        <div className="bg-white rounded-2xl border border-slate-100 p-5 mb-5">
          <h3 className="font-heading text-base font-bold text-[#111615] mb-3">Key Assumptions</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-2 text-xs">
            {[
              ["Solar resource (PVOUT)", `${r.assumptions.solarResourcePVOUT} kWh/kWp/yr`],
              ["Location used", r.solarResource.locationName],
              ["Performance ratio", `${(r.assumptions.performanceRatio * 100).toFixed(0)}%`],
              ["Shading factor", `${(r.assumptions.shadingAdjustment * 100).toFixed(0)}%`],
              ["Self-consumption", `${(r.assumptions.selfConsumptionRatio * 100).toFixed(0)}%`],
              ["Export rate (APPC)", `₹${r.assumptions.exportRateINRPerKWh}/kWh`],
              ["Effective tariff", `₹${r.assumptions.effectiveTariffINRPerKWh.toFixed(2)}/kWh`],
              ["Roof factor", `${r.assumptions.roofPlanningFactorM2PerKWp} m²/kWp`],
              ["CO2 saving", `${r.estimatedCO2ReductionTonnesPerYear.toFixed(2)} t/yr`],
            ].map(([label, value]) => (
              <div key={label}>
                <p className="text-slate-400">{label}</p>
                <p className="font-semibold text-[#111615]">{value}</p>
              </div>
            ))}
          </div>
          <p className="text-xs text-slate-400 mt-3">
            Solar resource: {r.solarResource.source}
          </p>
        </div>

        {/* DISCOM */}
        {r.regulatory.discomMatched && (
          <div className="bg-white rounded-2xl border border-slate-100 p-5 mb-5">
            <p className="text-xs text-slate-400 mb-1">Your DISCOM (Net Metering Application)</p>
            <p className="text-sm font-semibold text-[#111615]">{r.regulatory.discomName}</p>
            <p className="text-xs text-slate-400 mt-0.5">{r.regulatory.applicableFramework}</p>
          </div>
        )}

        {/* Warnings */}
        {r.warnings.length > 0 && (
          <div className="bg-amber-50 border border-amber-100 rounded-2xl p-4 mb-5">
            <p className="text-xs font-semibold text-amber-800 mb-2">Notes &amp; Assumptions</p>
            <ul className="space-y-1.5">
              {r.warnings.slice(0, 4).map((w, i) => (
                <li key={i} className="text-xs text-amber-700 flex gap-2">
                  <span className="shrink-0 mt-0.5">•</span>
                  <span>{w}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Confidence reasons */}
        {r.confidence.reasons.length > 0 && (
          <div className="text-xs text-slate-400 mb-5 space-y-1">
            <p className="font-semibold text-slate-500">Why {r.confidence.level} confidence:</p>
            {r.confidence.reasons.map((reason, i) => (
              <p key={i} className="flex gap-2"><span className="shrink-0">•</span><span>{reason}</span></p>
            ))}
          </div>
        )}

        {/* Disclaimer */}
        <div className="border border-slate-100 rounded-xl p-4 mb-6">
          <p className="text-xs text-slate-400 leading-relaxed">{r.disclaimer}</p>
          <p className="text-xs text-slate-400 mt-1">Engine version: {r.engineVersion}</p>
        </div>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            href="/contact"
            variant="primary"
            className="flex-1 bg-[#20435F] hover:bg-[#0C3046] text-white px-6 py-3.5 text-sm font-semibold rounded-xl inline-flex items-center justify-center gap-2 transition-all"
          >
            <span>Talk to Fivefold Engineers</span>
            <ArrowRight className="h-4 w-4 text-[#00A9D6]" />
          </Button>
          <button
            type="button"
            onClick={handleReset}
            className="flex-1 border border-slate-200 text-slate-600 hover:border-slate-300 px-6 py-3.5 text-sm font-semibold rounded-xl transition-all"
          >
            Start Over
          </button>
        </div>
      </div>
    );
  }

  return null;
}
