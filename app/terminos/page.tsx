import { Container } from "@/components/ui/Container";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Términos",
  description: "Términos y condiciones de ORVIA.",
};

export default function TermsPage() {
  return (
    <section className="py-32">
      <Container className="max-w-2xl">
        <h1 className="text-display-md font-display font-medium text-ink">Términos y condiciones</h1>
        <div className="mt-8 space-y-6 text-graphite">
          <p>
            El uso de este sitio implica la aceptación de estos términos. El
            contenido, diseño y marca ORVIA son propiedad de ORVIA y no
            pueden reproducirse sin autorización.
          </p>
          <p>
            Los precios publicados para nuestros servicios (START, BUSINESS,
            STORE y CARE) son orientativos y pueden variar según el alcance
            real de cada proyecto, que se define en una propuesta específica
            antes de comenzar cualquier trabajo.
          </p>
          <p>
            Los proyectos mostrados en la sección de portfolio marcados como
            &quot;Concepto&quot; son ejercicios de diseño propios de ORVIA y no
            representan trabajos realizados para clientes reales.
          </p>
          <p className="text-sm">
            Este texto es un punto de partida general y no reemplaza el
            asesoramiento legal. Se recomienda revisarlo con un profesional
            antes de la puesta en producción definitiva.
          </p>
        </div>
      </Container>
    </section>
  );
}
