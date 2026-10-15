import { getImageProps } from "next/image";
import { ArrowRightIcon } from "@heroicons/react/20/solid";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { BlurWords } from "@/components/effects/BlurWords";
import { siteConfig, type Content } from "@/content/site";

export function Hero({ c }: { c: Content }) {
  const hero = c.hero;
  const [lead, main] = hero.titleLines;
  return (
    <section id={c.anchors.home} aria-labelledby="hero-title" className="relative isolate overflow-hidden">
      <HeroBackdrop />
      <Container className="relative z-10 flex flex-col pb-12 pt-2 md:min-h-[calc(100svh-4rem)] md:py-16">
        {/* Mobile: la foto va arriba, en el flujo y con degradé hacia el fondo; el título queda debajo. */}
        <HeroMobileImage />

        <div className="flex flex-col items-center text-center md:flex-1 md:items-start md:justify-center md:text-left">
          <h1 id="hero-title" className="max-w-[16ch] text-display font-extrabold">
            <span className="block text-accent">
              <BlurWords text={lead} />
            </span>
            <span className="block">
              <BlurWords text={main} start={0.24} />
            </span>
          </h1>

          <p className="mt-6 max-w-[46ch] animate-rise text-lg leading-relaxed [animation-delay:120ms]">
            {hero.copy}
          </p>

          <ButtonLink href={`#${c.anchors.contact}`} track="click_cta_contacto" className="mt-10 animate-rise [animation-delay:200ms]">
            {hero.cta}
            <ArrowRightIcon aria-hidden="true" className="size-[18px]" />
          </ButtonLink>
        </div>

        {/* Franja de países: debajo del hero, no compite con el título (máx. 3 elementos en el hero). */}
        <div className="mt-14 flex animate-rise flex-col items-center gap-4 border-t border-line/60 pt-8 md:mt-10 md:gap-3 md:pt-6 [animation-delay:280ms] sm:flex-row sm:justify-center md:justify-start">
          <span className="shrink-0 text-xs font-semibold uppercase tracking-[0.08em] text-muted">
            {hero.countriesLabel}
          </span>
          <ul className="flex flex-wrap justify-center gap-2 md:justify-start">
            {siteConfig.countries.map((country) => (
              <li
                key={country.code}
                className="inline-flex items-center justify-center gap-1.5 rounded-full border border-line bg-surface/70 px-3 py-1.5 text-sm text-muted"
              >
                <span aria-hidden="true" className="text-base leading-none">{country.flag}</span>
                {c.countryNames[country.code]}
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}

// Pixel transparente: en cada breakpoint la imagen que no corresponde no se descarga.
const BLANK = "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==";

// Mobile (< md): foto en el flujo, recortada en óvalo suave. Decorativa (alt=""): el mensaje está en el H1.
function HeroMobileImage() {
  const { props: { srcSet, ...rest } } = getImageProps({
    alt: "", priority: true, quality: 85, src: "/images/hero/hero-mobile.jpeg", width: 1515, height: 1882, sizes: "100vw",
  });
  const mask = "[mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,black_35%,transparent_100%)] [-webkit-mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,black_35%,transparent_100%)]";
  return (
    <div aria-hidden="true" className={`pointer-events-none relative mx-auto -mb-3 aspect-[4/5] w-[84%] max-w-[460px] md:hidden ${mask}`}>
      <picture>
        <source media="(min-width: 768px)" srcSet={BLANK} />
        <source srcSet={srcSet} />
        <img {...rest} alt="" fetchPriority="high" loading="eager" decoding="async" className="size-full object-cover object-center" />
      </picture>
    </div>
  );
}

// Fondo desktop/tablet (>= md): foto de 16:9 corrida a la derecha, recortada en óvalo con degradado
// para no competir con el texto. Decorativa (alt=""): el mensaje está en el H1.
function HeroBackdrop() {
  // Fuente al doble de resolución (3344×1882): a 2x de densidad de píxeles no se nota el escalado.
  const { props } = getImageProps({ alt: "", priority: true, quality: 90, src: "/images/hero/hero-desktop.jpeg", width: 3344, height: 1882, sizes: "60vw" });
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 hidden md:block">
      <div
        className="absolute inset-y-[10%] left-[50%] right-[-4%] lg:left-[42%]
                   [mask-image:linear-gradient(to_right,transparent,black_30%),radial-gradient(ellipse_58%_62%_at_45%_50%,black_35%,transparent_88%)]
                   [-webkit-mask-image:linear-gradient(to_right,transparent,black_30%),radial-gradient(ellipse_58%_62%_at_45%_50%,black_35%,transparent_88%)]
                   [mask-composite:intersect] [-webkit-mask-composite:source-in]"
      >
        <picture>
          <source media="(max-width: 767px)" srcSet={BLANK} />
          <img {...props} alt="" fetchPriority="high" loading="eager" decoding="async" className="size-full object-cover object-right" />
        </picture>
      </div>
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-bg" />
    </div>
  );
}
