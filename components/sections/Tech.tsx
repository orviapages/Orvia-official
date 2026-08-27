import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

const STACK = ["Next.js", "React", "TypeScript", "Supabase", "Vercel"];

export function Tech() {
  return (
    <section className="bg-mist/30 py-24 md:py-32">
      <Container className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-20">
        <Reveal>
          <SectionHeading
            title="Tecnología que no se nota."
            description="Detrás de una experiencia simple existe una arquitectura pensada para que todo funcione rápido, correctamente y pueda crecer con tu negocio."
          />
        </Reveal>

        <Reveal delay={100}>
          <ul className="flex flex-wrap gap-x-8 gap-y-4 lg:justify-end">
            {STACK.map((tech) => (
              <li
                key={tech}
                className="text-sm font-medium uppercase tracking-[0.1em] text-graphite"
              >
                {tech}
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </section>
  );
}
