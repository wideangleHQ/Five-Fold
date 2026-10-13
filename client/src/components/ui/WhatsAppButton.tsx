import { MessageCircle } from "lucide-react";
import { whatsappUrl } from "@/lib/company";

export function WhatsAppButton() {
  return (
    <a
      href={whatsappUrl()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Enquire on WhatsApp"
      className="fixed z-30 right-4 sm:right-6 bottom-[max(1rem,env(safe-area-inset-bottom))] sm:bottom-6 flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#173B53] focus-visible:ring-offset-2"
    >
      <MessageCircle className="h-6 w-6 sm:h-7 sm:w-7" aria-hidden="true" />
    </a>
  );
}
