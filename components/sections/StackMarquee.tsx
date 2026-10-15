import { Container } from "@/components/ui/Container";
import { Marquee } from "@/components/motion/Marquee";
import { SpotlightArea } from "@/components/effects/Spotlight";
import type { Content } from "@/content/site";
import { techLogos } from "@/lib/tech-logos";

// Adobe no está en simple-icons (pidió su baja de la librería): Photoshop e Illustrator se
// muestran con el monograma de su ícono real, en el mismo estilo monocromo que el resto.
const techBadges: Record<string, string> = {
  Photoshop: "Ps",
  Illustrator: "Ai",
};

function TechChip({ name }: { name: string }) {
  const path = techLogos[name];
  const badge = techBadges[name];
  return (
    <span
      translate="no"
      data-spotlight
      className="relative isolate inline-flex min-h-16 items-center gap-3 rounded-full border border-line bg-surface px-6 text-lg font-medium text-fg"
    >
      {path && (
        <svg aria-hidden="true" viewBox="0 0 24 24" className="size-10 fill-muted">
          <path d={path} />
        </svg>
      )}
      {badge && (
        <span aria-hidden="true" className="flex size-10 shrink-0 items-center justify-center rounded-lg border border-muted/50 text-sm font-bold text-muted">
          {badge}
        </span>
      )}
      {name}
    </span>
  );
}

export function StackMarquee({ c }: { c: Content }) {
  const stack = c.stack;
  const half = Math.ceil(stack.items.length / 2);
  const rows = [stack.items.slice(0, half), stack.items.slice(half)].map((row) =>
    row.map((name) => <TechChip key={name} name={name} />),
  );
  return (
    <section aria-labelledby="stack-title" className="pb-20 pt-10 md:pb-24 md:pt-8">
      <Container>
        <h2 id="stack-title" className="mx-auto max-w-[32ch] text-center text-xl font-bold md:text-2xl">
          {stack.title}
        </h2>
      </Container>
      {/* Full-bleed: el marquee corre de punta a punta de la pantalla, no del Container centrado.
          SpotlightArea (no ul) porque el marquee ya tiene su propio <ul> por fila. */}
      <SpotlightArea className="mt-12 w-full md:mt-10">
        <Marquee rows={rows} />
      </SpotlightArea>
    </section>
  );
}
