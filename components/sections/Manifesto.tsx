import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { OwlWatermark } from "@/components/ui/OwlWatermark";

export function Manifesto() {
  return (
    <section className="relative overflow-hidden border-t border-mist bg-paper py-28 md:py-40">
      <OwlWatermark tone="dark" position="left" className="opacity-60" />
      <Container className="relative">
        <Reveal>
          <p className="kicker mb-8">Nuestra postura</p>
          <div className="corner-ticks max-w-4xl p-8 text-graphite/40">
            <p className="font-serif text-editorial-xl italic leading-[1.15] text-ink">
              No creemos en webs genéricas armadas en una tarde, ni en diseños
              cargados de efectos que no dicen nada.
              <span className="text-graphite"> Creemos en la precisión.</span> En
              que cada pixel tenga una razón de estar donde está.
            </p>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
