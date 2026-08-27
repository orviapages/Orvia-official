import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { OwlMark } from "@/components/ui/Logo";
import { OwlWatermark } from "@/components/ui/OwlWatermark";
import { WHATSAPP_NUMBER, whatsappLink } from "@/lib/constants";

export function CtaFinal() {
  const link = whatsappLink("Hola ORVIA, quiero hablar sobre mi proyecto.");

  return (
    <section className="relative overflow-hidden border-t border-mist bg-paper py-28 md:py-36">
      <OwlWatermark tone="dark" position="center" className="opacity-40" />
      <Container className="relative text-center">
        <Reveal>
          <OwlMark size={32} className="mx-auto mb-8" />
          <h2 className="mx-auto max-w-3xl text-display-md font-display font-medium text-ink">
            Hagamos que tu negocio se vea{" "}
            <span className="font-serif italic font-normal">como merece.</span>
          </h2>
          <p className="mx-auto mt-6 max-w-lg text-lg text-graphite">
            Contanos qué necesitás y creemos juntos una presencia digital
            profesional.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Button href="#contacto" variant="primary">
              Crear mi web →
            </Button>
            {WHATSAPP_NUMBER && link ? (
              <Button href={link} variant="secondary">
                Hablar con ORVIA
              </Button>
            ) : (
              <Button href="#contacto" variant="secondary">
                Hablar con ORVIA
              </Button>
            )}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
