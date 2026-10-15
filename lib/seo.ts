import type { Metadata, Viewport } from "next";
import { absoluteUrl, getContent, siteConfig } from "@/content/site";
import type { Lang } from "@/content/types";

// Solo se indexa cuando ALLOW_INDEXING=true (producción final en www.builderz.ar).
// Vercel (previews, revisión del equipo), local y cualquier otro entorno quedan en noindex.
// Es una variable de build: tiene que estar definida ANTES de `npm run build`.
export const allowIndexing = process.env.ALLOW_INDEXING === "true";

export const viewport: Viewport = {
  themeColor: "#03121e",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export function buildMetadata(lang: Lang): Metadata {
  const c = getContent(lang);
  const url = absoluteUrl(c.path);
  return {
    metadataBase: new URL(siteConfig.url),
    title: c.seo.title,
    description: c.seo.description,
    // Cada idioma es su propia URL (indexable) y se enlazan entre sí con hreflang.
    alternates: {
      canonical: url,
      languages: { es: absoluteUrl("/"), en: absoluteUrl("/en"), "x-default": absoluteUrl("/") },
    },
    openGraph: {
      title: c.seo.title,
      description: c.seo.description,
      url,
      siteName: siteConfig.name,
      locale: c.ogLocale,
      alternateLocale: c.ogAlternateLocales,
      type: "website",
    },
    twitter: { card: "summary_large_image", title: c.seo.title, description: c.seo.description },
    robots: allowIndexing ? { index: true, follow: true } : { index: false, follow: false },
  };
}
