import type { MetadataRoute } from "next";
import { siteConfig } from "@/content/site";

export default function robots(): MetadataRoute.Robots {
  // Solo se indexa cuando ALLOW_INDEXING=true (producción final en www.builderz.ar).
  // Vercel (previews, revisión del equipo), local y cualquier otro entorno quedan bloqueados.
  // Es una variable de build: tiene que estar definida ANTES de `npm run build`.
  const allowIndexing = process.env.ALLOW_INDEXING === "true";
  return {
    rules: allowIndexing ? { userAgent: "*", allow: "/" } : { userAgent: "*", disallow: "/" },
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: siteConfig.url,
  };
}
