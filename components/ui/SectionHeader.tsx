import { ArrowRightIcon } from "@heroicons/react/20/solid";
import { ButtonLink } from "@/components/ui/ButtonLink";

type Props = { id: string; eyebrow?: string; title: React.ReactNode; cta?: string; contactHref: string };

// Eyebrow (opcional) + título de sección + CTA (opcional) en la misma línea (solo desktop). En mobile el CTA va al final (SectionCTA).
export function SectionHeader({ id, eyebrow, title, cta, contactHref }: Props) {
  return (
    <div className="flex items-end justify-between gap-8">
      <div>
        {eyebrow && <p className="mb-3 text-sm font-semibold uppercase tracking-[0.08em] text-accent-2">{eyebrow}</p>}
        <h2 id={id} className="max-w-[20ch] text-h2 font-extrabold">
          {title}
        </h2>
      </div>
      {cta && (
        <ButtonLink href={contactHref} size="lg" track="click_cta_contacto" className="mb-1 hidden shrink-0 md:inline-flex">
          {cta}
          <ArrowRightIcon aria-hidden="true" className="size-5" />
        </ButtonLink>
      )}
    </div>
  );
}

// CTA de cierre en mobile: frase de contexto + botón a todo el ancho.
export function SectionCTA({ lead, cta, contactHref }: { lead: string; cta: string; contactHref: string }) {
  return (
    <div className="mt-10 flex flex-col items-center gap-4 text-center md:hidden">
      <p className="text-xl font-bold text-fg">{lead}</p>
      <ButtonLink href={contactHref} size="lg" track="click_cta_contacto" className="w-full">
        {cta}
        <ArrowRightIcon aria-hidden="true" className="size-5" />
      </ButtonLink>
    </div>
  );
}
