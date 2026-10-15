import { absoluteUrl, getContent, siteConfig, type Lang } from "@/content/site";
import { WHATSAPP_NUMBER } from "@/lib/contact";

// Datos estructurados para Google (Organization + ProfessionalService), en el idioma de cada página.
export function JsonLd({ lang }: { lang: Lang }) {
  const c = getContent(lang);
  const areaServed = siteConfig.countries.map((country) => ({ "@type": "Country", name: c.countryNames[country.code] }));
  const contactPoint = {
    "@type": "ContactPoint",
    contactType: "sales",
    telephone: `+${WHATSAPP_NUMBER}`,
    email: siteConfig.email,
    availableLanguage: ["Spanish", "English"],
    areaServed: siteConfig.countries.map((country) => country.code),
  };
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${siteConfig.url}/#organization`,
        name: siteConfig.name,
        url: siteConfig.url,
        description: c.seo.description,
        logo: `${siteConfig.url}${siteConfig.logo}`,
        contactPoint,
        sameAs: [siteConfig.instagram],
      },
      {
        "@type": "ProfessionalService",
        "@id": `${siteConfig.url}/#service`,
        name: siteConfig.name,
        url: absoluteUrl(c.path),
        description: c.seo.description,
        inLanguage: c.htmlLang,
        image: `${siteConfig.url}${siteConfig.logo}`,
        parentOrganization: { "@id": `${siteConfig.url}/#organization` },
        telephone: `+${WHATSAPP_NUMBER}`,
        email: siteConfig.email,
        sameAs: [siteConfig.instagram],
        areaServed,
        knowsLanguage: ["es", "en"],
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: c.seo.catalogName,
          itemListElement: c.services.items.map((s) => ({
            "@type": "Offer",
            itemOffered: { "@type": "Service", name: s.title, description: s.description, areaServed },
          })),
        },
      },
    ],
  };
  return (
    <script
      type="application/ld+json"
      // JSON serializado del contenido propio: seguro. Se escapa "<" por las dudas.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
