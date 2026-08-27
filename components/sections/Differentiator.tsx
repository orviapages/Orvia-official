import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { OwlMark } from "@/components/ui/Logo";
import { OwlWatermark } from "@/components/ui/OwlWatermark";

export function Differentiator() {
  return (
    <section className="relative overflow-hidden bg-ink py-28 md:py-36">
      <OwlWatermark tone="light" position="right" />
      <Container className="relative flex flex-col items-start">
        <Reveal>
          <OwlMark tone="light" size={40} className="mb-8 opacity-90" />
          <p className="kicker text-mist/60">ORVIA</p>
          <h2 className="mt-4 max-w-2xl text-display-md font-display font-medium text-paper">
            No hacemos webs <span className="font-serif italic font-normal">por hacer.</span>
          </h2>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-mist/70">
            Cada decisión de diseño tiene un propósito: hacer que tu negocio
            se vea, se entienda y se recuerde.
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
