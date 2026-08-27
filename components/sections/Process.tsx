import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { processSteps } from "@/data/process";

export function Process() {
  return (
    <section id="proceso" className="border-t border-mist py-24 md:py-32">
      <Container>
        <Reveal>
          <SectionHeading title="De la idea a Internet." />
        </Reveal>

        <div className="mt-16 grid gap-0 md:grid-cols-5">
          {processSteps.map((step, i) => (
            <Reveal key={step.index} delay={i * 80}>
              <div className="relative border-t border-mist py-8 pr-6 md:border-t-0 md:border-l md:py-0 md:pl-6 md:pt-2">
                <span
                  aria-hidden="true"
                  className="absolute -left-[5px] top-8 hidden h-[9px] w-[9px] rounded-full bg-ink md:block md:top-2"
                />
                <p className="font-serif text-3xl italic text-graphite/50">{step.index}</p>
                <h3 className="mt-3 text-lg font-display font-medium text-ink">{step.title}</h3>
                <p className="mt-2 text-sm text-graphite">{step.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
