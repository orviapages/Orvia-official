import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { comparisonRows } from "@/data/comparison";

export function Comparison() {
  return (
    <section className="border-t border-mist py-24 md:py-32">
      <Container>
        <Reveal>
          <SectionHeading
            index="—"
            kicker="Por qué ORVIA"
            title="No es lo mismo armarla sola, contratar a alguien suelto, o trabajar con ORVIA."
          />
        </Reveal>

        <Reveal delay={100}>
          <div className="mt-16 overflow-x-auto">
            <table className="w-full min-w-[720px] border-collapse text-left">
              <thead>
                <tr className="border-b border-ink">
                  <th className="py-4 pr-6 text-sm font-medium text-graphite">&nbsp;</th>
                  <th className="py-4 pr-6 font-serif text-lg italic text-graphite">
                    Armarla vos mismo
                  </th>
                  <th className="py-4 pr-6 font-serif text-lg italic text-graphite">
                    Freelancer suelto
                  </th>
                  <th className="py-4 pr-6 font-display text-lg font-medium text-ink">
                    ORVIA
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row) => (
                  <tr key={row.label} className="border-b border-mist">
                    <td className="py-5 pr-6 text-sm font-medium text-ink">{row.label}</td>
                    <td className="py-5 pr-6 text-sm text-graphite">{row.diy}</td>
                    <td className="py-5 pr-6 text-sm text-graphite">{row.freelance}</td>
                    <td className="py-5 pr-6 text-sm font-medium text-ink">{row.orvia}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
