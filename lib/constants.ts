export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "https://orvia.com.ar";

export const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "";

export const WHATSAPP_DEFAULT_MESSAGE =
  "Hola ORVIA \uD83D\uDC4B Me interesa crear una web para mi negocio.";

export function whatsappLink(message: string = WHATSAPP_DEFAULT_MESSAGE): string | null {
  if (!WHATSAPP_NUMBER) return null;
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`;
}

export const SITE_NAME = "ORVIA";
export const SITE_TAGLINE = "Tu negocio. Mejor online.";
export const SITE_DESCRIPTION =
  "ORVIA crea sitios web profesionales y soluciones digitales para negocios que quieren crecer online.";
