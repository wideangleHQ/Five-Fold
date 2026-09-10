import { describe, it, expect } from "vitest";
import { getMaxPermissibleSystemKWp } from "@/data/solar/regulatory";
import { resolveDISCOM } from "@/data/solar/discom";

describe("getMaxPermissibleSystemKWp", () => {
  it("residential with 5kW sanctioned load → max 5 kWp", () => {
    const { maxKWp } = getMaxPermissibleSystemKWp("residential", 5);
    expect(maxKWp).toBe(5);
  });

  it("residential with 15kW sanctioned load → capped at 10 kWp (regulatory)", () => {
    const { maxKWp, bindingConstraint } = getMaxPermissibleSystemKWp("residential", 15);
    expect(maxKWp).toBe(10);
    expect(bindingConstraint).toMatch(/OERC regulatory cap/);
  });

  it("commercial with 40kW sanctioned load → max 40 kWp (not regulatory 50)", () => {
    const { maxKWp } = getMaxPermissibleSystemKWp("commercial", 40);
    expect(maxKWp).toBe(40);
  });

  it("commercial with 80kW sanctioned load → capped at 50 kWp", () => {
    const { maxKWp } = getMaxPermissibleSystemKWp("commercial", 80);
    expect(maxKWp).toBe(50);
  });

  it("returns warning when sanctioned load is null", () => {
    const { warnings } = getMaxPermissibleSystemKWp("residential", null);
    expect(warnings.length).toBeGreaterThan(0);
  });
});

describe("resolveDISCOM", () => {
  it("resolves Bhubaneswar to TPCODL", () => {
    const { discom, matched } = resolveDISCOM("Bhubaneswar");
    expect(discom).toBe("TPCODL");
    expect(matched).toBe(true);
  });

  it("resolves Sambalpur to TPWODL", () => {
    const { discom } = resolveDISCOM("Sambalpur");
    expect(discom).toBe("TPWODL");
  });

  it("resolves Balasore to TPNODL", () => {
    const { discom } = resolveDISCOM("Balasore");
    expect(discom).toBe("TPNODL");
  });

  it("resolves Berhampur (alias) to TPSODL via Ganjam", () => {
    const { discom } = resolveDISCOM("Berhampur");
    expect(discom).toBe("TPSODL");
  });

  it("returns unknown for unrecognized location", () => {
    const { discom, matched } = resolveDISCOM("Random City XYZ");
    expect(discom).toBe("unknown");
    expect(matched).toBe(false);
  });
});
