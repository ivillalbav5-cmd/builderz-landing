// Forma del contenido. Español (content/es.ts) e inglés (content/en.ts) cumplen el mismo tipo,
// así que si falta una traducción el typecheck (`npm run typecheck`) lo avisa.

export type Lang = "es" | "en";

export type PortfolioItem = {
  id: string;
  name: string;
  category: string;
  description: string;
  /** Ruta en /public/images/portfolio. null = placeholder. */
  image: string | null;
  alt: string;
  /** Opcional: link al sitio o caso. Si está, la tarjeta completa es clickeable. */
  href?: string;
  /** Opcional: object-position del recorte de la imagen (ej. "50% 15%"). */
  focus?: string;
};

type Link = { href: string; label: string };

export type Content = {
  lang: Lang;
  /** Valor de <html lang>. */
  htmlLang: string;
  /** Open Graph. */
  ogLocale: string;
  ogAlternateLocales: string[];
  /** Ruta de esta versión: "/" (español) o "/en". */
  path: string;
  /** ids de las anclas (cada idioma tiene las suyas, legibles en la URL). */
  anchors: { main: string; home: string; services: string; portfolio: string; process: string; contact: string };
  nav: Link[];
  ui: {
    skip: string;
    mainNav: string;
    openMenu: string;
    closeMenu: string;
    newTab: string;
    /** Nombre accesible del selector de idioma. */
    langGroup: string;
  };
  countryNames: Record<string, string>;
  hero: { titleLines: [string, string]; countriesLabel: string; copy: string; cta: string };
  stack: { title: string; items: string[] };
  services: {
    titleBefore: string;
    titleAccent: string;
    titleAfter: string;
    lead: string;
    cta: string;
    partnerCta: string;
    items: { id: string; title: string; description: string }[];
  };
  portfolio: {
    titleAccent: string;
    titleAfter: string;
    lead: string;
    cta: string;
    items: PortfolioItem[];
  };
  process: { title: string; cta: string; steps: { title: string; description: string }[] };
  contact: {
    title: string;
    copy: string;
    whatsappLabel: string;
    calendlyLabel: string;
    barWhatsappLabel: string;
    barCalendlyLabel: string;
    /** Mensaje con el que abre WhatsApp. */
    waMessage: string;
  };
  footer: { tagline: string; navTitle: string; servicesTitle: string; whereTitle: string; whereAria: string; rights: string };
  seo: { title: string; description: string; ogAlt: string; catalogName: string };
};
