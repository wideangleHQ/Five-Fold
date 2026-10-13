export const COMPANY_CONTACT = {
  phoneDisplay: "+91 70081 33793",
  phoneHref: "tel:7008133793",
  whatsappNumber: "917008133793",
  email: "info@fivefoldsolar.com",
  contactPath: "/contact",
} as const;

export const TAGLINE = "Invest in Green. Benefit for Life.";

export const WHATSAPP_DEFAULT_MESSAGE =
  "Hello Fivefold, I would like to enquire about your solar solutions.";

export function whatsappUrl(message: string = WHATSAPP_DEFAULT_MESSAGE): string {
  return `https://wa.me/${COMPANY_CONTACT.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
