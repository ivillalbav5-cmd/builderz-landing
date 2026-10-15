import {
  BuildingStorefrontIcon, GlobeAltIcon, MagnifyingGlassIcon, PaintBrushIcon, ShareIcon, Squares2X2Icon, UserGroupIcon,
} from "@heroicons/react/24/outline";
import { ArrowRightIcon } from "@heroicons/react/20/solid";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Reveal } from "@/components/motion/Reveal";
import { SpotlightGroup } from "@/components/effects/Spotlight";
import { GlyphMatrix } from "@/components/effects/GlyphMatrix";
import type { Content } from "@/content/site";
import { cn } from "@/lib/cn";

const icons: Record<string, React.ComponentType<React.SVGProps<SVGSVGElement>>> = {
  apps: Squares2X2Icon,
  web: GlobeAltIcon,
  ecommerce: BuildingStorefrontIcon,
  seo: MagnifyingGlassIcon,
  branding: PaintBrushIcon,
  social: ShareIcon,
  "white-label": UserGroupIcon,
};

export function Services({ c }: { c: Content }) {
  const services = c.services;
  return (
    <section id={c.anchors.services} aria-labelledby="services-title" className="relative isolate scroll-mt-16 overflow-hidden bg-bg-2 py-20 md:py-28">
      {/* Textura de fondo: grilla de glifos que mutan sutilmente, en verde builderz a baja opacidad. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 opacity-25 [mask-image:linear-gradient(to_bottom,transparent,black_15%,black_85%,transparent)]">
        <GlyphMatrix color="#dbf227" cellSize={16} mutationRate={0.025} interval={140} fadeBottom={0.5} className="size-full" />
      </div>
      <Container>
        <div className="text-center">
          <h2 id="services-title" className="mx-auto max-w-[26ch] text-h2 font-extrabold">
            {services.titleBefore}<span className="text-accent">{services.titleAccent}</span>{services.titleAfter}
          </h2>
        </div>

        <SpotlightGroup className="mt-10 grid grid-cols-1 gap-3 md:mt-14 md:grid-cols-2 md:gap-4">
          {services.items.map((item, i) => {
            const Icon = icons[item.id];
            const featured = item.id === "white-label";
            // Variación de fondo en 2 tarjetas (además de la destacada) para romper la repetición plana del grid.
            const tint = item.id === "apps" ? "accent-2" : item.id === "seo" ? "accent" : null;
            return (
              <Reveal
                as="li"
                key={item.id}
                delay={Math.min(i, 4) * 0.05}
                data-spotlight
                className={cn(
                  "relative flex gap-4 rounded-2xl border p-5 md:p-6",
                  !featured && "min-h-[9.5rem] items-center md:min-h-[10rem]",
                  featured
                    ? "flex-col border-accent/40 bg-navy md:col-span-2 md:flex-row md:items-center md:justify-between md:gap-6"
                    : tint === "accent-2"
                      ? "border-line bg-[linear-gradient(155deg,color-mix(in_oklab,var(--color-accent-2)_10%,var(--color-surface)),var(--color-surface))]"
                      : tint === "accent"
                        ? "border-line bg-[linear-gradient(155deg,color-mix(in_oklab,var(--color-accent)_9%,var(--color-surface)),var(--color-surface))]"
                        : "border-line bg-surface",
                )}
              >
                <div className={cn("flex gap-4", featured && "md:items-center")}>
                  <span
                    className={cn(
                      "flex size-14 shrink-0 items-center justify-center rounded-xl",
                      featured ? "bg-accent text-bg" : "bg-bg-2 text-accent",
                    )}
                  >
                    {Icon && <Icon aria-hidden="true" className="size-7" strokeWidth={1.75} />}
                  </span>
                  <div>
                    <h3 className="text-lg font-bold">{item.title}</h3>
                    <p className="mt-1 leading-relaxed">{item.description}</p>
                  </div>
                </div>
                {featured && (
                  <ButtonLink
                    href={`#${c.anchors.contact}`}
                    track="click_cta_contacto"
                    className="w-full shrink-0 justify-center md:w-auto"
                  >
                    {services.partnerCta}
                    <ArrowRightIcon aria-hidden="true" className="size-[18px]" />
                  </ButtonLink>
                )}
                {featured && <span aria-hidden="true" className="border-beam" />}
              </Reveal>
            );
          })}
        </SpotlightGroup>

      </Container>
    </section>
  );
}
