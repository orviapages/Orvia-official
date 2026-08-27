import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

export function Testimonials() {
  return (
    <section className="bg-mist/30 py-24 md:py-32">
      <Container className="text-center">
        <Reveal>
          <p className="kicker">Opiniones</p>
          <p className="mx-auto mt-6 max-w-xl text-xl font-display font-medium text-ink md:text-2xl">
            Ya tenemos proyectos reales online — las opiniones de esos negocios llegan pronto.
          </p>
          <p className="mx-auto mt-4 max-w-md text-sm text-graphite">
            Podés ver el trabajo terminado en la sección de proyectos. En
            cuanto tengamos testimonios de esos negocios, los vas a poder leer acá.
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
