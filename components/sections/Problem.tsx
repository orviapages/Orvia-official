import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

const CONCEPTS = [
  {
    index: "01",
    title: "Primera impresión",
    text: "Tu presencia online debe representar el nivel real de tu negocio.",
  },
  {
    index: "02",
    title: "Claridad",
    text: "Todo lo que tu cliente necesita debe estar donde espera encontrarlo.",
  },
  {
    index: "03",
    title: "Confianza",
    text: "Un diseño profesional puede transformar la percepción de una marca.",
  },
];

export function Problem() {
  return (
    <section className="border-t border-mist py-24 md:py-32">
      <Container>
        <Reveal>
          <SectionHeading
            kicker="Tu negocio ya está online."
            title="Pero tu presencia digital podría decir mucho más."
            description="Tu web es muchas veces el primer contacto entre una persona y tu negocio. ORVIA convierte esa primera impresión en una experiencia clara, profesional y pensada para generar confianza."
          />
        </Reveal>

        <div className="mt-20 grid gap-x-10 gap-y-14 border-t border-mist pt-14 md:grid-cols-3">
          {CONCEPTS.map((c, i) => (
            <Reveal key={c.index} delay={i * 100}>
              <p className="font-display text-sm text-graphite">{c.index}</p>
              <h3 className="mt-4 text-xl font-display font-medium text-ink">{c.title}</h3>
              <p className="mt-3 text-graphite">{c.text}</p>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
