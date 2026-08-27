"use client";

import { useEffect, useState } from "react";
import { Container } from "@/components/ui/Container";
import { Wordmark } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

const LINKS = [
  { label: "Servicios", href: "#servicios" },
  { label: "Proyectos", href: "#proyectos" },
  { label: "Proceso", href: "#proceso" },
  { label: "Precios", href: "#servicios" },
  { label: "FAQ", href: "#faq" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b transition-all duration-300 ease-editorial",
        scrolled
          ? "border-mist bg-paper/90 backdrop-blur-md"
          : "border-transparent bg-paper/0"
      )}
    >
      <Container className="flex h-20 items-center justify-between">
        <Wordmark />

        <nav className="hidden items-center gap-9 lg:flex" aria-label="Navegación principal">
          {LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm font-medium text-charcoal transition-colors hover:text-ink"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <Button href="#contacto" variant="ghost">
            Contactar
          </Button>
          <Button href="#contacto" variant="primary">
            Crear mi web →
          </Button>
        </div>

        <button
          className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 lg:hidden"
          aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
        >
          <span
            className={cn(
              "block h-px w-6 bg-ink transition-transform duration-300 ease-editorial",
              menuOpen && "translate-y-[3.5px] rotate-45"
            )}
          />
          <span
            className={cn(
              "block h-px w-6 bg-ink transition-transform duration-300 ease-editorial",
              menuOpen && "-translate-y-[3.5px] -rotate-45"
            )}
          />
        </button>
      </Container>

      <div
        className={cn(
          "fixed inset-x-0 top-20 z-40 h-[calc(100dvh-5rem)] bg-paper transition-transform duration-300 ease-editorial lg:hidden",
          menuOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <Container className="flex h-full flex-col justify-between py-10">
          <nav className="flex flex-col gap-1" aria-label="Navegación móvil">
            {LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="border-b border-mist py-5 text-2xl font-display text-ink"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="flex flex-col gap-3">
            <Button href="#contacto" variant="secondary" onClick={() => setMenuOpen(false)}>
              Contactar
            </Button>
            <Button href="#contacto" variant="primary" onClick={() => setMenuOpen(false)}>
              Crear mi web →
            </Button>
          </div>
        </Container>
      </div>
    </header>
  );
}
