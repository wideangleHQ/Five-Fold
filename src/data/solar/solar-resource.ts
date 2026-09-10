/**
 * Fivefold Solar Calculator — Odisha Solar Resource Data
 *
 * PVOUT values (kWh/kWp/year) for Odisha districts.
 * Source: Global Solar Atlas (https://globalsolaratlas.info) +
 *         ISRO VEDAS solar irradiance data for India
 * Methodology: Long-term GHI → POA conversion at optimal fixed tilt (≈15° for Odisha)
 * Last verified: 2024-06
 *
 * HOW TO UPDATE:
 * 1. Visit https://globalsolaratlas.info → enter district HQ location
 * 2. Read PVOUT value from the site summary
 * 3. Update the district entry below with new value and date
 * 4. Increment CALCULATOR_ENGINE_VERSION in system-assumptions.ts
 */

export interface DistrictSolarResource {
  /** District name */
  district: string;
  /** Annual PVOUT — kWh produced per kWp installed per year (at optimal tilt, no losses) */
  pvoutKWhPerKWpPerYear: number;
  /** GHI — Global Horizontal Irradiance (kWh/m²/year) */
  ghiKWhPerM2PerYear: number;
  /** Monthly PVOUT fractions — fraction of annual yield per month (must sum to 1.0) */
  monthlyFractions: readonly [
    number, // Jan
    number, // Feb
    number, // Mar
    number, // Apr
    number, // May
    number, // Jun
    number, // Jul
    number, // Aug
    number, // Sep
    number, // Oct
    number, // Nov
    number, // Dec
  ];
  /** Source data reference */
  source: string;
  lastVerified: string;
}

/**
 * Monthly solar profile for Odisha (approximate fractions).
 * Based on long-term monthly irradiance patterns for Eastern India.
 * Jan–Mar: rising irradiance; Jun–Aug: monsoon suppression; Oct–Dec: clear skies.
 * Sum = 1.0000
 */
/**
 * Fractions derived from monthly GHI data for Bhubaneswar (Global Solar Atlas).
 * Each value = monthly GHI energy / annual GHI energy. Sum = 1.0000.
 * Monsoon months (Jun–Aug) are lower; Mar–May and Oct–Nov are highest.
 */
const ODISHA_BASE_MONTHLY_FRACTIONS = [
  0.0714, // Jan — clear, moderate sun
  0.0757, // Feb — improving
  0.0993, // Mar — peak pre-summer
  0.1036, // Apr — high irradiance
  0.1040, // May — slight dust/haze reduction
  0.0766, // Jun — pre-monsoon cloud cover
  0.0683, // Jul — monsoon peak (lowest)
  0.0698, // Aug — monsoon
  0.0781, // Sep — post-monsoon
  0.0916, // Oct — clear, excellent
  0.0856, // Nov — clear, good
  0.0760, // Dec — clear, moderate
] as const; // sum = 1.0000

// Western Odisha: drier climate, slightly longer insolation in non-monsoon months
const WESTERN_ODISHA_MONTHLY_FRACTIONS = [
  0.0722, // Jan
  0.0771, // Feb
  0.0995, // Mar
  0.1045, // Apr
  0.1055, // May
  0.0737, // Jun
  0.0657, // Jul
  0.0667, // Aug
  0.0777, // Sep
  0.0936, // Oct
  0.0866, // Nov
  0.0771, // Dec
] as const; // sum ≈ 1.0000

export const ODISHA_SOLAR_RESOURCE: Record<string, DistrictSolarResource> = {
  // --- CENTRAL ODISHA (TPCODL territory) ---
  bhubaneswar: {
    district: "Bhubaneswar / Khordha",
    pvoutKWhPerKWpPerYear: 1490,
    ghiKWhPerM2PerYear: 1820,
    monthlyFractions: ODISHA_BASE_MONTHLY_FRACTIONS,
    source: "Global Solar Atlas; ISRO VEDAS Bhubaneswar station",
    lastVerified: "2024-06",
  },
  cuttack: {
    district: "Cuttack",
    pvoutKWhPerKWpPerYear: 1470,
    ghiKWhPerM2PerYear: 1800,
    monthlyFractions: ODISHA_BASE_MONTHLY_FRACTIONS,
    source: "Global Solar Atlas",
    lastVerified: "2024-06",
  },
  nayagarh: {
    district: "Nayagarh",
    pvoutKWhPerKWpPerYear: 1490,
    ghiKWhPerM2PerYear: 1820,
    monthlyFractions: ODISHA_BASE_MONTHLY_FRACTIONS,
    source: "Global Solar Atlas",
    lastVerified: "2024-06",
  },
  puri: {
    district: "Puri",
    pvoutKWhPerKWpPerYear: 1480,
    ghiKWhPerM2PerYear: 1810,
    monthlyFractions: ODISHA_BASE_MONTHLY_FRACTIONS,
    source: "Global Solar Atlas",
    lastVerified: "2024-06",
  },

  // --- NORTHERN ODISHA (TPNODL territory) ---
  balasore: {
    district: "Balasore",
    pvoutKWhPerKWpPerYear: 1450,
    ghiKWhPerM2PerYear: 1780,
    monthlyFractions: ODISHA_BASE_MONTHLY_FRACTIONS,
    source: "Global Solar Atlas",
    lastVerified: "2024-06",
  },
  bhadrak: {
    district: "Bhadrak",
    pvoutKWhPerKWpPerYear: 1460,
    ghiKWhPerM2PerYear: 1790,
    monthlyFractions: ODISHA_BASE_MONTHLY_FRACTIONS,
    source: "Global Solar Atlas",
    lastVerified: "2024-06",
  },
  jajpur: {
    district: "Jajpur",
    pvoutKWhPerKWpPerYear: 1465,
    ghiKWhPerM2PerYear: 1795,
    monthlyFractions: ODISHA_BASE_MONTHLY_FRACTIONS,
    source: "Global Solar Atlas",
    lastVerified: "2024-06",
  },
  keonjhar: {
    district: "Keonjhar",
    pvoutKWhPerKWpPerYear: 1480,
    ghiKWhPerM2PerYear: 1810,
    monthlyFractions: ODISHA_BASE_MONTHLY_FRACTIONS,
    source: "Global Solar Atlas",
    lastVerified: "2024-06",
  },
  mayurbhanj: {
    district: "Mayurbhanj / Baripada",
    pvoutKWhPerKWpPerYear: 1455,
    ghiKWhPerM2PerYear: 1785,
    monthlyFractions: ODISHA_BASE_MONTHLY_FRACTIONS,
    source: "Global Solar Atlas",
    lastVerified: "2024-06",
  },
  dhenkanal: {
    district: "Dhenkanal",
    pvoutKWhPerKWpPerYear: 1475,
    ghiKWhPerM2PerYear: 1805,
    monthlyFractions: ODISHA_BASE_MONTHLY_FRACTIONS,
    source: "Global Solar Atlas",
    lastVerified: "2024-06",
  },
  angul: {
    district: "Angul",
    pvoutKWhPerKWpPerYear: 1490,
    ghiKWhPerM2PerYear: 1825,
    monthlyFractions: ODISHA_BASE_MONTHLY_FRACTIONS,
    source: "Global Solar Atlas",
    lastVerified: "2024-06",
  },

  // --- WESTERN ODISHA (TPWODL territory) ---
  sambalpur: {
    district: "Sambalpur",
    pvoutKWhPerKWpPerYear: 1540,
    ghiKWhPerM2PerYear: 1880,
    monthlyFractions: WESTERN_ODISHA_MONTHLY_FRACTIONS,
    source: "Global Solar Atlas; higher irradiance in western Odisha plateau",
    lastVerified: "2024-06",
  },
  bargarh: {
    district: "Bargarh",
    pvoutKWhPerKWpPerYear: 1530,
    ghiKWhPerM2PerYear: 1870,
    monthlyFractions: WESTERN_ODISHA_MONTHLY_FRACTIONS,
    source: "Global Solar Atlas",
    lastVerified: "2024-06",
  },
  sundargarh: {
    district: "Sundargarh / Rourkela",
    pvoutKWhPerKWpPerYear: 1510,
    ghiKWhPerM2PerYear: 1850,
    monthlyFractions: WESTERN_ODISHA_MONTHLY_FRACTIONS,
    source: "Global Solar Atlas",
    lastVerified: "2024-06",
  },
  jharsuguda: {
    district: "Jharsuguda",
    pvoutKWhPerKWpPerYear: 1540,
    ghiKWhPerM2PerYear: 1880,
    monthlyFractions: WESTERN_ODISHA_MONTHLY_FRACTIONS,
    source: "Global Solar Atlas",
    lastVerified: "2024-06",
  },
  bolangir: {
    district: "Bolangir",
    pvoutKWhPerKWpPerYear: 1530,
    ghiKWhPerM2PerYear: 1870,
    monthlyFractions: WESTERN_ODISHA_MONTHLY_FRACTIONS,
    source: "Global Solar Atlas",
    lastVerified: "2024-06",
  },
  nuapada: {
    district: "Nuapada",
    pvoutKWhPerKWpPerYear: 1560,
    ghiKWhPerM2PerYear: 1900,
    monthlyFractions: WESTERN_ODISHA_MONTHLY_FRACTIONS,
    source: "Global Solar Atlas — highest irradiance in Odisha",
    lastVerified: "2024-06",
  },
  kalahandi: {
    district: "Kalahandi",
    pvoutKWhPerKWpPerYear: 1545,
    ghiKWhPerM2PerYear: 1885,
    monthlyFractions: WESTERN_ODISHA_MONTHLY_FRACTIONS,
    source: "Global Solar Atlas",
    lastVerified: "2024-06",
  },
  kandhamal: {
    district: "Kandhamal / Phulbani",
    pvoutKWhPerKWpPerYear: 1520,
    ghiKWhPerM2PerYear: 1860,
    monthlyFractions: ODISHA_BASE_MONTHLY_FRACTIONS,
    source: "Global Solar Atlas",
    lastVerified: "2024-06",
  },

  // --- SOUTHERN ODISHA (TPSODL territory) ---
  ganjam: {
    district: "Ganjam / Berhampur",
    pvoutKWhPerKWpPerYear: 1490,
    ghiKWhPerM2PerYear: 1820,
    monthlyFractions: ODISHA_BASE_MONTHLY_FRACTIONS,
    source: "Global Solar Atlas",
    lastVerified: "2024-06",
  },
  koraput: {
    district: "Koraput",
    pvoutKWhPerKWpPerYear: 1510,
    ghiKWhPerM2PerYear: 1845,
    monthlyFractions: ODISHA_BASE_MONTHLY_FRACTIONS,
    source: "Global Solar Atlas",
    lastVerified: "2024-06",
  },
  rayagada: {
    district: "Rayagada",
    pvoutKWhPerKWpPerYear: 1520,
    ghiKWhPerM2PerYear: 1860,
    monthlyFractions: ODISHA_BASE_MONTHLY_FRACTIONS,
    source: "Global Solar Atlas",
    lastVerified: "2024-06",
  },
  malkangiri: {
    district: "Malkangiri",
    pvoutKWhPerKWpPerYear: 1510,
    ghiKWhPerM2PerYear: 1845,
    monthlyFractions: ODISHA_BASE_MONTHLY_FRACTIONS,
    source: "Global Solar Atlas",
    lastVerified: "2024-06",
  },
  gajapati: {
    district: "Gajapati / Paralakhemundi",
    pvoutKWhPerKWpPerYear: 1495,
    ghiKWhPerM2PerYear: 1825,
    monthlyFractions: ODISHA_BASE_MONTHLY_FRACTIONS,
    source: "Global Solar Atlas",
    lastVerified: "2024-06",
  },
};

/**
 * Default fallback resource for unknown/unmatched locations.
 * Uses Odisha state average.
 */
export const ODISHA_DEFAULT_SOLAR_RESOURCE: DistrictSolarResource = {
  district: "Odisha (state average)",
  pvoutKWhPerKWpPerYear: 1480,
  ghiKWhPerM2PerYear: 1810,
  monthlyFractions: ODISHA_BASE_MONTHLY_FRACTIONS,
  source: "Odisha state average — Global Solar Atlas + ISRO VEDAS",
  lastVerified: "2024-06",
};

/**
 * Keyword map for fuzzy-matching user location strings to district keys.
 * Keys are lowercase substrings to match in the user's location input.
 */
export const LOCATION_KEYWORD_MAP: Record<string, string> = {
  bhubaneswar: "bhubaneswar",
  bbsr: "bhubaneswar",
  khordha: "bhubaneswar",
  khurda: "bhubaneswar",
  cuttack: "cuttack",
  nayagarh: "nayagarh",
  puri: "puri",
  konark: "puri",
  balasore: "balasore",
  baleshwar: "balasore",
  bhadrak: "bhadrak",
  jajpur: "jajpur",
  keonjhar: "keonjhar",
  kendujhar: "keonjhar",
  mayurbhanj: "mayurbhanj",
  baripada: "mayurbhanj",
  dhenkanal: "dhenkanal",
  angul: "angul",
  sambalpur: "sambalpur",
  bargarh: "bargarh",
  sundargarh: "sundargarh",
  rourkela: "sundargarh",
  jharsuguda: "jharsuguda",
  bolangir: "bolangir",
  nuapada: "nuapada",
  kalahandi: "kalahandi",
  bhawanipatna: "kalahandi",
  kandhamal: "kandhamal",
  phulbani: "kandhamal",
  ganjam: "ganjam",
  berhampur: "ganjam",
  brahmapur: "ganjam",
  koraput: "koraput",
  rayagada: "rayagada",
  malkangiri: "malkangiri",
  gajapati: "gajapati",
  paralakhemundi: "gajapati",
};

/** Resolve a user location string to a solar resource entry. */
export function resolveSolarResource(location: string): {
  resource: DistrictSolarResource;
  matched: boolean;
  matchedKey: string | null;
} {
  const normalized = location.toLowerCase().trim();
  for (const [keyword, districtKey] of Object.entries(LOCATION_KEYWORD_MAP)) {
    if (normalized.includes(keyword)) {
      const resource = ODISHA_SOLAR_RESOURCE[districtKey];
      if (resource) {
        return { resource, matched: true, matchedKey: districtKey };
      }
    }
  }
  return {
    resource: ODISHA_DEFAULT_SOLAR_RESOURCE,
    matched: false,
    matchedKey: null,
  };
}
