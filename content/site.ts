// Datos que no cambian con el idioma + acceso al contenido de cada idioma.
// Los textos viven en content/es.ts y content/en.ts.
import { en } from "./en";
import { es } from "./es";
import type { Content, Lang } from "./types";

export type { Content, Lang } from "./types";

export const siteConfig = {
  name: "BUILDERZ",
  url: "https://www.builderz.ar",
  instagram: "https://www.instagram.com/builderz.ar",
  instagramHandle: "@builderz.ar",
  email: "hola.builderz@gmail.com",
  logo: "/images/brand/logo.svg",
  // Dónde trabajamos (los nombres están en cada idioma: countryNames). direct = clientes directos,
  // white-label = proveedor marca blanca.
  countries: [
    { code: "AR", flag: "🇦🇷", type: "direct" },
    { code: "ES", flag: "🇪🇸", type: "direct" },
    { code: "MX", flag: "🇲🇽", type: "white-label" },
    { code: "UY", flag: "🇺🇾", type: "white-label" },
  ],
} as const;

const dictionaries: Record<Lang, Content> = { es, en };

export function getContent(lang: Lang): Content {
  return dictionaries[lang];
}

/** URL absoluta de una ruta del sitio ("/" = la home, sin barra final). */
export function absoluteUrl(path: string): string {
  return path === "/" ? siteConfig.url : `${siteConfig.url}${path}`;
}
