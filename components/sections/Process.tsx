import {
  CalendarDaysIcon,
  ClipboardDocumentCheckIcon,
  CodeBracketSquareIcon,
  RocketLaunchIcon,
} from "@heroicons/react/24/outline";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Reveal } from "@/components/motion/Reveal";
import type { Content } from "@/content/site";

// Un ícono por paso (en el mismo orden que process.steps), para reforzar de un vistazo
// de qué se trata cada etapa sin tener que leer el título.
const icons = [CalendarDaysIcon, ClipboardDocumentCheckIcon, CodeBracketSquareIcon, RocketLaunchIcon];

// Pasos numerados de gran formato. Mobile: línea de tiempo vertical. Desktop: fila horizontal.
export function Process({ c }: { c: Content }) {
  const process = c.process;
  return (
    <section id={c.anchors.process} aria-labelledby="process-title" className="scroll-mt-16 bg-bg-2 py-20 md:py-28">
      <Container>
        <h2 id="process-title" className="mx-auto max-w-[20ch] text-center text-h2 font-extrabold">
          {process.title}
        </h2>

        <ol className="relative mx-auto mt-12 grid max-w-3xl gap-10 md:mt-16 md:max-w-none md:grid-cols-4 md:gap-6">
          {/* Línea conectora (decorativa) + relleno que avanza con el scroll */}
          {/* Ancho md: con 4 columnas iguales, gap-6 y los círculos centrados en su columna
              (items-center), el CENTRO del círculo 1 cae en 12.5% - 0.5625rem y el del círculo 4
              en 87.5% + 0.5625rem del ancho del <ol>. La línea va de centro a centro: si arranca
              en el borde izquierdo (left-0) sobra a la izquierda del 1 y falta a la derecha del 4. */}
          <span
            aria-hidden="true"
            className="absolute hidden bg-line md:left-[calc(12.5%-0.5625rem)] md:top-[2.1rem] md:block md:h-px md:w-[calc(75%+1.125rem)]"
          >
            <span className="timeline-fill absolute inset-0 bg-gradient-to-b from-accent to-accent-2 md:bg-gradient-to-r" />
          </span>
          {process.steps.map((step, i) => {
            const Icon = icons[i];
            return (
              <Reveal
                as="li"
                key={step.title}
                delay={i * 0.08}
                className="relative flex items-start gap-5 text-left md:flex-col md:items-center md:gap-6 md:text-center"
              >
                {/* El ícono reemplaza al número dentro del círculo: el orden ya lo da la posición
                    en la línea de tiempo, y así el círculo queda con un solo protagonista. */}
                <span
                  aria-hidden="true"
                  className="relative flex size-14 shrink-0 items-center justify-center rounded-full border border-accent/60 bg-bg-2 md:size-[4.25rem]"
                >
                  {Icon && <Icon aria-hidden="true" className="size-6 text-accent md:size-7" />}
                </span>
                {/* Mobile: tramo de línea vertical desde este círculo hasta el siguiente (a la izquierda del texto). */}
                {i < process.steps.length - 1 && (
                  <span aria-hidden="true" className="absolute left-7 top-14 h-[calc(100%-1rem)] w-px -translate-x-1/2 bg-line md:hidden">
                    <span className="timeline-fill absolute inset-0 bg-gradient-to-b from-accent to-accent-2" />
                  </span>
                )}
                <div className="pt-1 md:pt-0">
                  <h3 className="whitespace-pre-line text-xl font-bold md:text-lg lg:text-2xl">{step.title}</h3>
                  <p className="mt-2 leading-relaxed">{step.description}</p>
                </div>
              </Reveal>
            );
          })}
        </ol>

        <div className="mt-12 flex justify-center md:mt-16">
          <ButtonLink href={`#${c.anchors.contact}`} size="lg" track="click_cta_contacto" className="w-full md:w-auto">
            {process.cta}
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
