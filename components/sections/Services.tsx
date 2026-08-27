import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";
import { getServices } from "@/lib/content";

export async function Services() {
  const services = await getServices();

  return (
    <section id="servicios" className="border-t border-mist py-24 md:py-32">
      <Container>
        <Reveal>
          <SectionHeading title="Una presencia digital a la altura de tu negocio." />
        </Reveal>

        <div className="mt-16 grid gap-6 lg:grid-cols-4">
          {services.map((plan, i) => (
            <Reveal key={plan.id} delay={i * 80}>
              <div
                className={cn(
                  "flex h-full flex-col border p-7 transition-transform duration-300 ease-editorial",
                  plan.featured
                    ? "border-ink bg-ink text-paper shadow-stack hover:-translate-x-1 hover:-translate-y-1 hover:shadow-stack-sm"
                    : "border-mist bg-paper text-ink"
                )}
              >
                {plan.featured && (
                  <span className="mb-5 inline-block w-fit border border-paper/40 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.15em]">
                    Más elegido
                  </span>
                )}

                <h3 className="font-display text-xl font-medium">{plan.name}</h3>
                <p
                  className={cn(
                    "mt-2 text-sm",
                    plan.featured ? "text-paper/70" : "text-graphite"
                  )}
                >
                  {plan.tagline}
                </p>

                <ul className="mt-6 flex-1 space-y-3">
                  {plan.features.map((f) => (
                    <li
                      key={f}
                      className={cn(
                        "flex items-start gap-2 text-sm",
                        plan.featured ? "text-paper/85" : "text-charcoal"
                      )}
                    >
                      <span aria-hidden="true">—</span>
                      {f}
                    </li>
                  ))}
                </ul>

                <div
                  className={cn(
                    "mt-8 border-t pt-6",
                    plan.featured ? "border-paper/20" : "border-mist"
                  )}
                >
                  <p className="text-lg font-display font-medium">{plan.price}</p>
                  {plan.priceNote && (
                    <p
                      className={cn(
                        "mt-1 text-xs",
                        plan.featured ? "text-paper/60" : "text-graphite"
                      )}
                    >
                      {plan.priceNote}
                    </p>
                  )}
                  <Button
                    href={`#contacto`}
                    variant={plan.featured ? "secondary" : "primary"}
                    className={cn(
                      "mt-5 w-full",
                      plan.featured && "border-paper text-paper hover:bg-paper hover:text-ink"
                    )}
                  >
                    {plan.cta} →
                  </Button>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={150}>
          <p className="mt-8 text-sm text-graphite">
            Los precios son orientativos y pueden variar según el alcance real de cada proyecto.
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
