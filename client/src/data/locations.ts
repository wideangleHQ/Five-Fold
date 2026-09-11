export interface ServiceArea {
  name: string;
  district: string;
  isPrimaryHub: boolean;
}

export const PRIMARY_SERVICE_AREAS: ServiceArea[] = [
  { name: "Bhubaneswar", district: "Khordha", isPrimaryHub: true },
  { name: "Cuttack", district: "Cuttack", isPrimaryHub: true },
  { name: "Bhadrak", district: "Bhadrak", isPrimaryHub: false },
  { name: "Balasore", district: "Balasore", isPrimaryHub: false },
  { name: "Jajpur", district: "Jajpur", isPrimaryHub: false },
  { name: "Nayagarh", district: "Nayagarh", isPrimaryHub: false },
];

export const MULTI_REGION_EXPERIENCE_SUMMARY = "10+ States of multi-regional solar execution and engineering consultation experience across India.";
