import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { ContactForm } from "@/components/sections/ContactForm";

export function Contact() {
  return (
    <section id="contacto" className="border-t border-mist py-24 md:py-32">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <Reveal>
            <SectionHeading
              kicker="Contacto"
              title="Contanos sobre tu proyecto."
              description="Completá el formulario y te respondemos a la brevedad para conversar sobre tu negocio y qué necesitás."
            />
          </Reveal>
          <Reveal delay={100}>
            <ContactForm />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
