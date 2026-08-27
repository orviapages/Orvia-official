import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { OwlMark } from "@/components/ui/Logo";
import { HeroVisual } from "@/components/sections/HeroVisual";
import { Parallax } from "@/components/ui/Parallax";
import { Marquee } from "@/components/ui/Marquee";
import { businessCategories } from "@/data/businesses";

const CHECKS = ["Diseño personalizado", "Optimizado para móvil", "WhatsApp integrado"];

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-paper pb-0 pt-40 md:pt-48">
      <Container>
        <div className="grid items-center gap-16 lg:grid-cols-[1.1fr_0.9fr] lg:gap-10">
          <div className="animate-fade-up">
            <div className="mb-8 flex items-center gap-3">
              <OwlMark size={30} />
              <span className="kicker">Diseño digital para negocios</span>
            </div>

            <h1 className="text-display-xl font-display font-medium text-ink">
              Tu negocio.
              <br />
              <span className="font-serif italic font-normal">Mejor online.</span>
            </h1>

            <p className="mt-8 max-w-lg text-lg leading-relaxed text-graphite">
              Construimos sitios web modernos, rápidos y profesionales para
              negocios que quieren destacar, generar confianza y conseguir
              más clientes.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <Button href="#contacto" variant="primary">
                Crear mi web →
              </Button>
              <Button href="#proyectos" variant="secondary">
                Ver proyectos
              </Button>
            </div>

            <ul className="mt-12 flex flex-wrap gap-x-8 gap-y-3">
              {CHECKS.map((item) => (
                <li key={item} className="flex items-center gap-2 text-sm text-charcoal">
                  <span aria-hidden="true" className="text-ink">
                    ✓
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="animate-fade-up [animation-delay:150ms]">
            <Parallax factor={0.06}>
              <HeroVisual />
            </Parallax>
          </div>
        </div>
      </Container>

      <div className="mt-24 md:mt-28">
        <Marquee items={businessCategories.map((c) => c.name)} tone="dark" />
      </div>
    </section>
  );
}
