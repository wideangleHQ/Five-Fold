/**
 * Fivefold Solar Calculator — Odisha DISCOM Mapping
 *
 * Odisha has 4 Tata Power distribution companies following GRIDCO unbundling:
 * - TPCODL: Tata Power Central Odisha Distribution Ltd
 * - TPNODL: Tata Power Northern Odisha Distribution Ltd
 * - TPWODL: Tata Power Western Odisha Distribution Ltd
 * - TPSODL: Tata Power Southern Odisha Distribution Ltd
 *
 * Source: Odisha government DISCOM allocation map
 * Last verified: 2024-09
 */

export type OdishaDISCOM = "TPCODL" | "TPNODL" | "TPWODL" | "TPSODL" | "unknown";

export interface DISCOMInfo {
  id: OdishaDISCOM;
  name: string;
  fullName: string;
  website: string;
  serviceArea: string;
  netMeteringPortal: string;
}

export const ODISHA_DISCOMS: Record<OdishaDISCOM, DISCOMInfo> = {
  TPCODL: {
    id: "TPCODL",
    name: "TPCODL",
    fullName: "Tata Power Central Odisha Distribution Ltd",
    website: "https://www.tpcodl.in",
    serviceArea: "Bhubaneswar, Cuttack, Khordha, Nayagarh, Puri, Angul, Dhenkanal, Kendrapara, Jagatsinghpur",
    netMeteringPortal: "https://www.tpcodl.in",
  },
  TPNODL: {
    id: "TPNODL",
    name: "TPNODL",
    fullName: "Tata Power Northern Odisha Distribution Ltd",
    website: "https://www.tpnodl.in",
    serviceArea: "Balasore, Bhadrak, Jajpur, Keonjhar, Mayurbhanj, Sundergarh, Jharsuguda",
    netMeteringPortal: "https://www.tpnodl.in",
  },
  TPWODL: {
    id: "TPWODL",
    name: "TPWODL",
    fullName: "Tata Power Western Odisha Distribution Ltd",
    website: "https://www.tpwodl.in",
    serviceArea: "Sambalpur, Bargarh, Bolangir, Nuapada, Kalahandi, Kandhamal",
    netMeteringPortal: "https://www.tpwodl.in",
  },
  TPSODL: {
    id: "TPSODL",
    name: "TPSODL",
    fullName: "Tata Power Southern Odisha Distribution Ltd",
    website: "https://www.tpsodl.in",
    serviceArea: "Ganjam, Berhampur, Gajapati, Koraput, Rayagada, Malkangiri, Nabarangpur",
    netMeteringPortal: "https://www.tpsodl.in",
  },
  unknown: {
    id: "unknown",
    name: "Unknown DISCOM",
    fullName: "DISCOM not identified",
    website: "",
    serviceArea: "",
    netMeteringPortal: "",
  },
};

/**
 * District to DISCOM mapping.
 * Source: Odisha government DISCOM area allocation
 * Last verified: 2024-09
 */
const DISTRICT_TO_DISCOM: Record<string, OdishaDISCOM> = {
  // TPCODL (Central)
  bhubaneswar: "TPCODL",
  khordha: "TPCODL",
  cuttack: "TPCODL",
  nayagarh: "TPCODL",
  puri: "TPCODL",
  angul: "TPCODL",
  dhenkanal: "TPCODL",
  kendrapara: "TPCODL",
  jagatsinghpur: "TPCODL",

  // TPNODL (Northern)
  balasore: "TPNODL",
  bhadrak: "TPNODL",
  jajpur: "TPNODL",
  keonjhar: "TPNODL",
  mayurbhanj: "TPNODL",
  sundargarh: "TPNODL",
  jharsuguda: "TPNODL",

  // TPWODL (Western)
  sambalpur: "TPWODL",
  bargarh: "TPWODL",
  bolangir: "TPWODL",
  nuapada: "TPWODL",
  kalahandi: "TPWODL",
  kandhamal: "TPWODL",

  // TPSODL (Southern)
  ganjam: "TPSODL",
  gajapati: "TPSODL",
  koraput: "TPSODL",
  rayagada: "TPSODL",
  malkangiri: "TPSODL",
  nabarangpur: "TPSODL",
};

/**
 * Resolve DISCOM from location string via keyword matching.
 * Returns "unknown" if location cannot be reliably matched.
 */
export function resolveDISCOM(location: string): {
  discom: OdishaDISCOM;
  matched: boolean;
} {
  const normalized = location.toLowerCase().trim();

  // Common city aliases
  const aliases: Record<string, string> = {
    bbsr: "bhubaneswar",
    rourkela: "sundargarh",
    berhampur: "ganjam",
    brahmapur: "ganjam",
    baripada: "mayurbhanj",
    paralakhemundi: "gajapati",
    phulbani: "kandhamal",
    bhawanipatna: "kalahandi",
    kendujhar: "keonjhar",
    baleshwar: "balasore",
    konark: "puri",
  };

  // Resolve alias first
  let locationKey = normalized;
  for (const [alias, canonical] of Object.entries(aliases)) {
    if (normalized.includes(alias)) {
      locationKey = canonical;
      break;
    }
  }

  // Match district
  for (const [district, discom] of Object.entries(DISTRICT_TO_DISCOM)) {
    if (locationKey.includes(district)) {
      return { discom, matched: true };
    }
  }

  return { discom: "unknown", matched: false };
}
