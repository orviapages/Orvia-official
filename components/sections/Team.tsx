import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

const FACES = [
  {
    name: "Alex",
    role: "Tecnología",
    image: "/team/alex.jpg",
  },
  {
    name: "Sofía",
    role: "Estrategia",
    image: "/team/sofia.jpg",
  },
];

export function Team() {
  return (
    <section className="border-t border-mist py-24 md:py-32">
      <Container>
        <Reveal>
          <SectionHeading
            kicker="ORVIA"
            title="Las caras detrás del contenido."
            description="Alex y Sofía son quienes vas a ver explicando tecnología y estrategia en el contenido de ORVIA."
          />
        </Reveal>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 sm:max-w-xl">
          {FACES.map((person, i) => (
            <Reveal key={person.name} delay={i * 100}>
              <div className="group relative aspect-[800/1421] overflow-hidden bg-charcoal">
                <Image
                  src={person.image}
                  alt={`${person.name}, ${person.role} de ORVIA`}
                  fill
                  sizes="(min-width: 640px) 320px, 50vw"
                  className="object-cover object-center transition-transform duration-500 ease-editorial group-hover:scale-105"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent"
                />
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <p className="font-display text-lg font-medium text-paper">{person.name}</p>
                  <p className="text-xs uppercase tracking-[0.15em] text-paper/60">
                    {person.role}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
