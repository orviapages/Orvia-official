import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Accordion } from "@/components/ui/Accordion";
import { getFaq } from "@/lib/content";

export async function Faq() {
  const faq = await getFaq();

  return (
    <section id="faq" className="border-t border-mist py-24 md:py-32">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <Reveal>
            <SectionHeading title="Preguntas frecuentes." />
          </Reveal>
          <Reveal delay={100}>
            <Accordion items={faq} />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
