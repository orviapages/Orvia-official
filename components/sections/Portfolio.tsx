import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { getProjects } from "@/lib/content";
import { Project } from "@/types/content";

function ProjectCardContent({ project }: { project: Project }) {
  return (
    <>
      <div className="absolute inset-0 flex flex-col justify-between p-7 text-paper">
        <div className="flex items-start justify-between">
          {project.isConcept ? (
            <span className="border border-paper/30 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.15em] text-paper/70">
              Concepto
            </span>
          ) : (
            <span className="border border-emerald-400/30 bg-emerald-400/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.15em] text-emerald-300">
              En producción
            </span>
          )}
          <span className="text-xs uppercase tracking-[0.15em] text-paper/50">
            {project.category}
          </span>
        </div>

        <div>
          <h3 className="text-3xl font-display font-medium">{project.name}</h3>
          <p className="mt-2 max-w-sm text-sm text-paper/60">{project.description}</p>
          <span className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-paper opacity-0 transition-opacity duration-300 ease-editorial group-hover:opacity-100">
            {project.url ? "Ver sitio en vivo →" : "Ver proyecto →"}
          </span>
        </div>
      </div>

      {/* abstract geometric background mark */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-10 -top-10 h-56 w-56 rotate-12 border border-paper/10 transition-transform duration-500 ease-editorial group-hover:rotate-[24deg]"
      />
    </>
  );
}

const cardClasses =
  "group relative block aspect-[4/3] overflow-hidden border border-ink bg-charcoal shadow-stack transition-transform duration-300 ease-editorial hover:-translate-x-1 hover:-translate-y-1 hover:shadow-stack-sm";

export async function Portfolio() {
  const projects = await getProjects();

  return (
    <section id="proyectos" className="border-t border-mist py-24 md:py-32">
      <Container>
        <Reveal>
          <SectionHeading
            kicker="Portfolio"
            title="Proyectos reales, en producción."
            description="Estos son sitios que ya construimos y que están online hoy."
          />
        </Reveal>

        <div
          className={
            projects.length === 1
              ? "mt-16 grid max-w-xl gap-6"
              : projects.length === 2
                ? "mt-16 grid max-w-3xl gap-6 sm:grid-cols-2"
                : "mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          }
        >
          {projects.map((project, i) => (
            <Reveal key={project.slug} delay={i * 80}>
              {project.url ? (
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Ver el sitio de ${project.name} (se abre en una pestaña nueva)`}
                  className={cardClasses}
                >
                  <ProjectCardContent project={project} />
                </a>
              ) : (
                <div className={cardClasses}>
                  <ProjectCardContent project={project} />
                </div>
              )}
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
