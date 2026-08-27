import { whatsappLink } from "@/lib/constants";

export function WhatsAppButton() {
  const link = whatsappLink();

  // Si no se configuró NEXT_PUBLIC_WHATSAPP_NUMBER, no mostramos el botón
  // en lugar de inventar un número.
  if (!link) return null;

  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Hablar por WhatsApp"
      className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-ink text-paper shadow-[0_10px_30px_-8px_rgba(5,5,5,0.5)] transition-transform duration-300 ease-editorial hover:scale-105"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="h-6 w-6"
        aria-hidden="true"
      >
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.472-.148-.67.15-.198.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
        <path d="M12.001 2C6.478 2 2 6.478 2 12c0 1.986.578 3.836 1.573 5.394L2 22l4.735-1.545A9.953 9.953 0 0 0 12 22c5.523 0 10-4.477 10-10S17.523 2 12.001 2zm0 18.222a8.19 8.19 0 0 1-4.19-1.147l-.3-.178-3.115 1.017 1.03-3.03-.196-.312a8.194 8.194 0 0 1-1.263-4.361c0-4.532 3.687-8.222 8.223-8.222 2.197 0 4.263.856 5.818 2.411a8.166 8.166 0 0 1 2.407 5.816c0 4.533-3.688 8.221-8.224 8.221z" />
      </svg>
    </a>
  );
}
