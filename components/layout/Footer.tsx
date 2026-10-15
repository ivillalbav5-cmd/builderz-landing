import Image from "next/image";
import { InstagramLogoIcon, WhatsappLogoIcon } from "@phosphor-icons/react/dist/ssr";
import { CalendarDaysIcon, EnvelopeIcon } from "@heroicons/react/20/solid";
import { Container } from "@/components/ui/Container";
import { siteConfig, type Content } from "@/content/site";
import { CALENDLY_URL, whatsappUrl } from "@/lib/contact";

// Mismo estilo de link que el de Instagram (ícono + texto, sin pastilla) para que
// WhatsApp/Agendar no compitan visualmente como si fueran otro CTA distinto.
const linkClass = "-m-2 flex min-h-11 items-center gap-2 p-2 text-sm text-muted transition-colors hover:text-accent";

// Footer adaptado de https://ui.aceternity.com/blocks/footers (Simple Footer with Four Grids)
// a la identidad BUILDERZ: 4 columnas parejas (marca / Navegación / Servicios / Dónde
// trabajamos), con el CTA de WhatsApp + Agendar debajo de "Dónde trabajamos" junto al
// Instagram (misma jerarquía que esos links, no un bloque aparte compitiendo con la marca).
export function Footer({ c }: { c: Content }) {
  const columns = [
    { title: c.footer.navTitle, links: c.nav },
    {
      title: c.footer.servicesTitle,
      links: c.services.items.slice(0, 4).map((item) => ({ href: `#${c.anchors.services}`, label: item.title })),
    },
  ];
  return (
    <footer className="relative overflow-hidden border-t border-line bg-bg">
      <Container className="relative z-10 pt-16 pb-8 md:pt-20 md:pb-10">
        {/* Marca con más aire (2fr) que las 3 columnas de links, que comparten el mismo ancho entre sí. */}
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-[2fr_1fr_1fr_1fr]">
          <div className="col-span-2 md:col-span-1">
            <Image src={siteConfig.logo} alt="BUILDERZ" width={112} height={24} />
            <p className="mt-4 max-w-[34ch] text-sm leading-relaxed text-muted">
              {c.footer.tagline}
            </p>
          </div>

          {columns.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <h3 className="text-sm font-bold text-fg">{col.title}</h3>
              <ul className="mt-4 flex flex-col gap-3">
                {col.links.map((link) => (
                  <li key={link.href + link.label}>
                    <a
                      href={link.href}
                      className="-m-2 inline-flex min-h-11 items-center p-2 text-sm text-muted transition-colors hover:text-accent"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <nav aria-label={c.footer.whereAria} className="col-span-2 md:col-span-1">
            <h3 className="text-sm font-bold text-fg">{c.footer.whereTitle}</h3>
            {/* Chips al ancho de su propio texto (no grid parejo), en fila y con wrap. */}
            <ul className="mt-4 flex flex-wrap gap-2">
              {siteConfig.countries.map((country) => (
                <li
                  key={country.code}
                  className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border border-line bg-surface/70 px-3 py-1.5 text-xs text-muted"
                >
                  <span aria-hidden="true" className="text-sm leading-none">{country.flag}</span>
                  {c.countryNames[country.code]}
                </li>
              ))}
            </ul>
            <div className="mt-3 flex flex-col gap-0.5">
              <a href={siteConfig.instagram} rel="noopener noreferrer" className={linkClass}>
                <InstagramLogoIcon aria-hidden="true" size={18} />
                {siteConfig.instagramHandle}
              </a>
              <a href={whatsappUrl(c.contact.waMessage)} rel="noopener noreferrer" className={linkClass}>
                <WhatsappLogoIcon aria-hidden="true" size={18} weight="bold" />
                WhatsApp
              </a>
              <a href={`mailto:${siteConfig.email}`} className={linkClass}>
                <EnvelopeIcon aria-hidden="true" className="size-[18px]" />
                {siteConfig.email}
              </a>
              <a href={CALENDLY_URL} rel="noopener noreferrer" className={linkClass}>
                <CalendarDaysIcon aria-hidden="true" className="size-[18px]" />
                {c.contact.calendlyLabel}
              </a>
            </div>
          </nav>
        </div>

        <p className="mt-10 border-t border-line/60 pt-6 text-center text-xs text-muted">
          {siteConfig.name} © {new Date().getFullYear()} &nbsp;|&nbsp; {c.footer.rights}
        </p>
      </Container>

      {/* Wordmark gigante de fondo, en minúscula (como el isotipo real) y con degradé oscuro
          de verde builderz en vez de blanco/gris, recortado por el borde inferior del footer.
          Bien pegado al bloque de arriba (poco padding-bottom en el Container + margen negativo acá). */}
      <div aria-hidden="true" className="pointer-events-none relative -mt-6 select-none overflow-hidden md:-mt-24">
        <p
          className="translate-y-[28%] bg-[linear-gradient(180deg,color-mix(in_oklab,var(--color-accent)_45%,transparent)_0%,color-mix(in_oklab,var(--color-accent)_10%,transparent)_45%,transparent_85%)] bg-clip-text text-center font-heading text-[22vw] leading-none font-extrabold whitespace-nowrap text-transparent sm:text-[18vw] md:text-[15vw]"
        >
          builderz
        </p>
      </div>
    </footer>
  );
}
