import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { businessCategories } from "@/data/businesses";

export function Businesses() {
  return (
    <section className="border-t border-mist py-24 md:py-32">
      <Container>
        <Reveal>
          <SectionHeading
            title="Para negocios que quieren dar el siguiente paso."
            description="Cada rubro tiene sus propios códigos visuales. Así pensamos el diseño para cada uno."
          />
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-px border border-mist bg-mist sm:grid-cols-2">
          {businessCategories.map((cat, i) => (
            <Reveal key={cat.name} delay={i * 50}>
              <div className="group relative aspect-video overflow-hidden bg-ink">
                <Image
                  src={cat.image}
                  alt={`Ejemplo de estilo web para ${cat.name.toLowerCase()}`}
                  fill
                  sizes="(min-width: 640px) 50vw, 100vw"
                  className="object-cover object-top opacity-80 transition-transform duration-500 ease-editorial group-hover:scale-105 group-hover:opacity-100"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-transparent"
                />
                <div className="absolute inset-0 flex flex-col items-start justify-end p-6">
                  <span className="font-display text-lg font-medium text-paper">
                    {cat.name}
                  </span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
