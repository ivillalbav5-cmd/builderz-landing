import Image from "next/image";
import { ArrowUpRightIcon } from "@heroicons/react/20/solid";
import { Container } from "@/components/ui/Container";
import { SectionCTA, SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/motion/Reveal";
import { TiltGroup } from "@/components/effects/Tilt";
import type { Content } from "@/content/site";
import { cn } from "@/lib/cn";

// Bento de 5 celdas (una por proyecto).
// lg: Nivis 4x2 · Alkilar 2x1 · El Padrino 2x1 · We Print 3 · Farmacias 3
// md: Nivis ancho completo + 2x2 · mobile: 1 columna
const layout = [
  "md:col-span-2 lg:col-span-4 lg:row-span-2",
  "lg:col-span-2",
  "lg:col-span-2",
  "lg:col-span-3",
  "lg:col-span-3",
];

// Placeholders con la paleta de marca hasta tener las capturas reales.
const placeholders = [
  "bg-[radial-gradient(ellipse_at_20%_20%,color-mix(in_oklab,var(--color-accent-2)_35%,transparent),transparent_60%),linear-gradient(135deg,var(--color-navy),var(--color-bg))]",
  "bg-[radial-gradient(ellipse_at_80%_30%,color-mix(in_oklab,var(--color-accent)_22%,transparent),transparent_60%),linear-gradient(160deg,var(--color-surface),var(--color-bg))]",
  "bg-[radial-gradient(ellipse_at_30%_80%,color-mix(in_oklab,var(--color-accent-2)_25%,transparent),transparent_55%),linear-gradient(200deg,var(--color-navy),var(--color-bg-2))]",
  "bg-[radial-gradient(ellipse_at_70%_70%,color-mix(in_oklab,var(--color-accent)_18%,transparent),transparent_60%),linear-gradient(120deg,var(--color-bg-2),var(--color-navy))]",
  "bg-[radial-gradient(ellipse_at_50%_0%,color-mix(in_oklab,var(--color-accent-2)_30%,transparent),transparent_60%),linear-gradient(180deg,var(--color-surface),var(--color-bg))]",
];

export function Portfolio({ c }: { c: Content }) {
  const portfolio = c.portfolio;
  const contactHref = `#${c.anchors.contact}`;
  return (
    <section id={c.anchors.portfolio} aria-labelledby="portfolio-title" className="scroll-mt-16 py-20 md:py-28">
      <Container>
        <SectionHeader
          id="portfolio-title"
          title={
            <>
              <span className="text-accent">{portfolio.titleAccent}</span>{portfolio.titleAfter}
            </>
          }
          cta={portfolio.cta}
          contactHref={contactHref}
        />

        <TiltGroup className="mt-10 grid grid-cols-1 gap-4 md:mt-14 md:grid-cols-2 lg:grid-cols-6">
          {portfolio.items.map((item, i) => {
            const big = i === 0;
            return (
              <Reveal
                as="li"
                key={item.id}
                delay={Math.min(i, 3) * 0.06}
                data-tilt
                className={cn("relative flex flex-col overflow-hidden rounded-2xl border border-line bg-surface", layout[i])}
              >
                <div
                  className={cn(
                    "relative aspect-[4/3] overflow-hidden",
                    // La grande no fija altura: toma la de las 2 tarjetas de la derecha.
                    big ? "md:aspect-[16/9] lg:aspect-auto lg:min-h-0 lg:flex-1" : "lg:aspect-[16/10]",
                    !item.image && placeholders[i],
                  )}
                >
                  {item.image ? (
                    <Image
                      src={item.image}
                      alt={item.alt}
                      fill
                      sizes={big ? "(min-width: 1024px) 66vw, 100vw" : "(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"}
                      className="object-cover"
                      style={item.focus ? { objectPosition: item.focus } : undefined}
                    />
                  ) : (
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 bg-[radial-gradient(circle,color-mix(in_oklab,var(--color-fg)_10%,transparent)_1px,transparent_1.6px)] bg-[length:12px_12px] [mask-image:linear-gradient(to_bottom,black,transparent)]"
                    />
                  )}
                  <span className="absolute left-3 top-3 z-10 inline-block rounded-full bg-accent px-3 py-1 text-xs font-bold uppercase tracking-[0.04em] text-bg">
                    {item.category}
                  </span>
                </div>
                <div className="p-5 md:p-6">
                  <h3 className={cn("font-bold", big ? "text-2xl" : "text-xl")}>
                    {item.href ? (
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 after:absolute after:inset-0 after:rounded-2xl after:content-[''] focus-visible:after:outline-2 focus-visible:after:outline-offset-2 focus-visible:after:outline-accent"
                      >
                        {item.name}
                        <ArrowUpRightIcon aria-hidden="true" className="size-5 text-accent" />
                        <span className="sr-only"> {c.ui.newTab}</span>
                      </a>
                    ) : (
                      item.name
                    )}
                  </h3>
                  <p className="mt-1 leading-relaxed">{item.description}</p>
                </div>
              </Reveal>
            );
          })}
        </TiltGroup>

        <SectionCTA lead={portfolio.lead} cta={portfolio.cta} contactHref={contactHref} />
      </Container>
    </section>
  );
}
