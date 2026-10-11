/**
 * Household Electrical Load & Consumption List — single source of truth.
 *
 * Formula (1 kWh = 1 Unit):
 *   Units/day   = Quantity × Wattage × Usage hours / 1000
 *   Units/month = Units/day × 30
 *
 * Wattage is a range (min–max); fixed-rating appliances have min === max.
 * Appliances flagged `cycling` (compressor / inverter loads) do not draw rated
 * power for their listed hours, so the table's own approximate Units/day is used
 * instead of Wattage × Hours. All values are indicative, for preliminary estimation.
 */

export type ApplianceGroup =
  | "Lighting & Fans"
  | "TV, Internet & IT"
  | "Kitchen"
  | "Cooling & Heating"
  | "Water & Utility"
  | "Other";

export interface ApplianceSpec {
  id: string;
  name: string;
  group: ApplianceGroup;
  wattsMin: number;
  wattsMax: number;
  /** Typical use per day, in hours (15 min = 0.25). */
  hoursPerDay: number;
  /** Table-stated Units/day range; only used when `cycling` is true. */
  unitsPerDay?: { min: number; max: number };
  cycling?: boolean;
}

export const APPLIANCES: readonly ApplianceSpec[] = [
  { id: "led_bulb", name: "LED Bulb", group: "Lighting & Fans", wattsMin: 9, wattsMax: 9, hoursPerDay: 6 },
  { id: "led_tube", name: "LED Tube Light", group: "Lighting & Fans", wattsMin: 20, wattsMax: 20, hoursPerDay: 6 },
  { id: "ceiling_fan", name: "Ceiling Fan", group: "Lighting & Fans", wattsMin: 60, wattsMax: 75, hoursPerDay: 10 },
  { id: "bldc_fan", name: "BLDC Fan", group: "Lighting & Fans", wattsMin: 28, wattsMax: 35, hoursPerDay: 10 },
  { id: "exhaust_fan", name: "Exhaust Fan", group: "Lighting & Fans", wattsMin: 30, wattsMax: 50, hoursPerDay: 2 },

  { id: "tv_32", name: 'LED TV 32"', group: "TV, Internet & IT", wattsMin: 40, wattsMax: 60, hoursPerDay: 5 },
  { id: "tv_43", name: 'LED TV 43"', group: "TV, Internet & IT", wattsMin: 70, wattsMax: 100, hoursPerDay: 5 },
  { id: "tv_55", name: 'LED TV 55"', group: "TV, Internet & IT", wattsMin: 100, wattsMax: 150, hoursPerDay: 5 },
  { id: "set_top_box", name: "Set-top Box", group: "TV, Internet & IT", wattsMin: 10, wattsMax: 20, hoursPerDay: 6 },
  { id: "wifi_router", name: "Wi-Fi Router", group: "TV, Internet & IT", wattsMin: 8, wattsMax: 15, hoursPerDay: 24 },
  { id: "desktop", name: "Desktop Computer", group: "TV, Internet & IT", wattsMin: 150, wattsMax: 300, hoursPerDay: 5 },
  { id: "laptop", name: "Laptop", group: "TV, Internet & IT", wattsMin: 45, wattsMax: 90, hoursPerDay: 6 },
  { id: "mobile_charger", name: "Mobile Charger", group: "TV, Internet & IT", wattsMin: 5, wattsMax: 25, hoursPerDay: 3 },
  { id: "cctv", name: "CCTV Camera", group: "TV, Internet & IT", wattsMin: 5, wattsMax: 15, hoursPerDay: 24 },

  {
    id: "refrigerator", name: "Refrigerator", group: "Kitchen", wattsMin: 150, wattsMax: 300, hoursPerDay: 24,
    cycling: true, unitsPerDay: { min: 1, max: 2 },
  },
  { id: "mixer_grinder", name: "Mixer/Grinder", group: "Kitchen", wattsMin: 500, wattsMax: 750, hoursPerDay: 0.25 },
  { id: "microwave", name: "Microwave Oven", group: "Kitchen", wattsMin: 1000, wattsMax: 1500, hoursPerDay: 0.3 },
  { id: "induction", name: "Induction Cooktop", group: "Kitchen", wattsMin: 1500, wattsMax: 2000, hoursPerDay: 1 },
  { id: "kettle", name: "Electric Kettle", group: "Kitchen", wattsMin: 1200, wattsMax: 2000, hoursPerDay: 0.25 },
  { id: "rice_cooker", name: "Rice Cooker", group: "Kitchen", wattsMin: 500, wattsMax: 1000, hoursPerDay: 1 },
  { id: "chimney", name: "Chimney", group: "Kitchen", wattsMin: 150, wattsMax: 250, hoursPerDay: 1 },
  { id: "water_purifier", name: "Water Purifier", group: "Kitchen", wattsMin: 25, wattsMax: 80, hoursPerDay: 3 },
  { id: "dishwasher", name: "Dishwasher", group: "Kitchen", wattsMin: 1200, wattsMax: 2000, hoursPerDay: 1 },

  { id: "air_cooler", name: "Air Cooler", group: "Cooling & Heating", wattsMin: 120, wattsMax: 250, hoursPerDay: 8 },
  {
    id: "ac_1t", name: "1 Ton Inverter AC", group: "Cooling & Heating", wattsMin: 700, wattsMax: 1200, hoursPerDay: 8,
    cycling: true, unitsPerDay: { min: 5, max: 8 },
  },
  {
    id: "ac_1_5t", name: "1.5 Ton Inverter AC", group: "Cooling & Heating", wattsMin: 900, wattsMax: 1600, hoursPerDay: 8,
    cycling: true, unitsPerDay: { min: 6, max: 10 },
  },
  {
    id: "ac_2t", name: "2 Ton Inverter AC", group: "Cooling & Heating", wattsMin: 1300, wattsMax: 2200, hoursPerDay: 8,
    cycling: true, unitsPerDay: { min: 9, max: 14 },
  },
  { id: "geyser", name: "Geyser", group: "Cooling & Heating", wattsMin: 2000, wattsMax: 3000, hoursPerDay: 0.5 },
  { id: "room_heater", name: "Room Heater", group: "Cooling & Heating", wattsMin: 1000, wattsMax: 2000, hoursPerDay: 4 },

  { id: "pump_half_hp", name: "Water Pump 0.5 HP", group: "Water & Utility", wattsMin: 370, wattsMax: 500, hoursPerDay: 1 },
  { id: "pump_1_hp", name: "Water Pump 1 HP", group: "Water & Utility", wattsMin: 750, wattsMax: 1100, hoursPerDay: 1 },
  { id: "washing_machine", name: "Washing Machine", group: "Water & Utility", wattsMin: 400, wattsMax: 800, hoursPerDay: 1 },
  { id: "iron", name: "Iron", group: "Water & Utility", wattsMin: 750, wattsMax: 1500, hoursPerDay: 0.5 },
  { id: "vacuum", name: "Vacuum Cleaner", group: "Water & Utility", wattsMin: 800, wattsMax: 1500, hoursPerDay: 0.5 },

  { id: "ev_charger", name: "EV Charger – 3.3 kW", group: "Other", wattsMin: 3300, wattsMax: 3300, hoursPerDay: 4 },
];

export const APPLIANCE_GROUPS: readonly ApplianceGroup[] = [
  "Lighting & Fans",
  "TV, Internet & IT",
  "Kitchen",
  "Cooling & Heating",
  "Water & Utility",
  "Other",
];

export const DAYS_PER_MONTH = 30;
