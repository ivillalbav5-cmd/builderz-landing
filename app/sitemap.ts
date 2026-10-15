import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/content/site";

// Una entrada por idioma, enlazadas entre sí (hreflang).
export default function sitemap(): MetadataRoute.Sitemap {
  const languages = { es: absoluteUrl("/"), en: absoluteUrl("/en") };
  const lastModified = new Date();
  return [
    { url: absoluteUrl("/"), lastModified, changeFrequency: "monthly", priority: 1, alternates: { languages } },
    { url: absoluteUrl("/en"), lastModified, changeFrequency: "monthly", priority: 0.9, alternates: { languages } },
  ];
}
