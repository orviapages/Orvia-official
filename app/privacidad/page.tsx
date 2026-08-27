import { Container } from "@/components/ui/Container";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacidad",
  description: "Política de privacidad de ORVIA.",
};

export default function PrivacyPage() {
  return (
    <section className="py-32">
      <Container className="max-w-2xl">
        <h1 className="text-display-md font-display font-medium text-ink">Privacidad</h1>
        <div className="mt-8 space-y-6 text-graphite">
          <p>
            En ORVIA respetamos tu privacidad. Los datos que nos compartís a
            través del formulario de contacto (nombre, email, WhatsApp y
            demás información del proyecto) se utilizan exclusivamente para
            responder tu consulta y, si avanzamos juntos, para gestionar tu
            proyecto.
          </p>
          <p>
            No compartimos tu información con terceros salvo los servicios
            estrictamente necesarios para operar este sitio (por ejemplo, el
            proveedor de email que utilizamos para recibir los mensajes del
            formulario).
          </p>
          <p>
            Si querés que eliminemos tus datos de contacto, escribinos y lo
            resolvemos a la brevedad.
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
