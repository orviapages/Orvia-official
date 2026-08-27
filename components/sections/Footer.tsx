import { Container } from "@/components/ui/Container";
import { Wordmark } from "@/components/ui/Logo";
import { SITE_TAGLINE } from "@/lib/constants";

const COLUMNS = [
  {
    title: "Empresa",
    links: [
      { label: "Inicio", href: "#" },
      { label: "Proyectos", href: "#proyectos" },
      { label: "Servicios", href: "#servicios" },
      { label: "Proceso", href: "#proceso" },
      { label: "Contacto", href: "#contacto" },
    ],
  },
  {
    title: "Servicios",
    links: [
      { label: "START", href: "#servicios" },
      { label: "BUSINESS", href: "#servicios" },
      { label: "STORE", href: "#servicios" },
      { label: "CARE", href: "#servicios" },
    ],
  },
  {
    title: "Social",
    links: [
      { label: "Instagram", href: "https://instagram.com" },
      { label: "TikTok", href: "https://tiktok.com" },
      { label: "WhatsApp", href: "#contacto" },
      { label: "LinkedIn", href: "https://linkedin.com" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-mist bg-paper">
      <Container className="py-16">
        <div className="grid gap-12 md:grid-cols-[1.2fr_2fr]">
          <div>
            <Wordmark />
            <p className="mt-4 max-w-xs text-sm text-graphite">{SITE_TAGLINE}</p>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            {COLUMNS.map((col) => (
              <div key={col.title}>
                <p className="kicker mb-4">{col.title}</p>
                <ul className="space-y-3">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="text-sm text-charcoal transition-colors hover:text-ink"
                        target={link.href.startsWith("http") ? "_blank" : undefined}
                        rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-mist pt-8 text-sm text-graphite sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} ORVIA</p>
          <div className="flex gap-6">
            <a href="/privacidad" className="hover:text-ink">
              Privacidad
            </a>
            <a href="/terminos" className="hover:text-ink">
              Términos
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}
