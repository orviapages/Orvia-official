import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

const BLOCKS = [
  {
    index: "01",
    title: "Estrategia",
    text: "Antes de diseñar, entendemos tu negocio.",
  },
  {
    index: "02",
    title: "Diseño",
    text: "Construimos una experiencia digital coherente y memorable.",
  },
  {
    index: "03",
    title: "Desarrollo",
    text: "Convertimos el diseño en una experiencia rápida y funcional.",
  },
];

export function Solution() {
  return (
    <section className="bg-mist/30 py-24 md:py-32">
      <Container>
        <Reveal>
          <SectionHeading
            title="Diseñamos con intención."
            description="No diseñamos páginas simplemente para que se vean bien. Cada decisión tiene un propósito."
          />
        </Reveal>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {BLOCKS.map((b, i) => (
            <Reveal key={b.index} delay={i * 100}>
              <div className="h-full border border-mist bg-paper p-8">
                <p className="font-display text-sm text-graphite">{b.index}</p>
                <h3 className="mt-4 text-xl font-display font-medium text-ink">{b.title}</h3>
                <p className="mt-3 text-graphite">{b.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
