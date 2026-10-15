import iso9001 from "@/assets/Images/Certifications/iso-9001-2015.jpg";
import iso45001 from "@/assets/Images/Certifications/iso-45001-2018.jpg";

/** Transcribed from the original certificates supplied by Fivefold Renewable Private Limited. */
export const CERTIFYING_BODY = "Assurance Quality Certification LLC";

export const CERTIFICATIONS = [
  {
    standard: "ISO 9001:2015",
    system: "Quality Management System",
    certificateNo: "26EQRP12",
    issued: "17 June 2026",
    expiry: "17 May 2027",
    recertification: "16 June 2029",
    accreditation: "EGAC accredited (QMS), CAB # 012226",
    image: iso9001,
    imageAlt: "ISO 9001:2015 Certificate of Registration issued to Fivefold Renewable Private Limited",
  },
  {
    standard: "ISO 45001:2018",
    system: "Occupational Health & Safety Management System",
    certificateNo: "26EORN15",
    issued: "17 June 2026",
    expiry: "17 May 2027",
    recertification: "16 June 2029",
    accreditation: "EGAC accredited (OHSMS), CAB # 012226",
    image: iso45001,
    imageAlt: "ISO 45001:2018 Certificate of Registration issued to Fivefold Renewable Private Limited",
  },
] as const;

export const CERTIFIED_ENTITY = "Fivefold Renewable Private Limited";

export const CERTIFICATION_SCOPE =
  "Design, engineering, manufacturing, procurement, supply, installation, testing, commissioning & maintenance of solar photovoltaic power systems, solar mounting structures, electrical balance of system components, renewable energy products and related EPC services for residential, commercial, industrial and government projects.";
