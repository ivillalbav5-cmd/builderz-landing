import "@/app/globals.css";
import { Analytics } from "@/components/seo/Analytics";
import { JsonLd } from "@/components/seo/JsonLd";
import { getContent, type Lang } from "@/content/site";
import { inter, jakarta } from "@/lib/fonts";

// <html> compartido por las dos versiones de idioma (cada una tiene su propio root layout).
export function RootDocument({ lang, children }: { lang: Lang; children: React.ReactNode }) {
  const c = getContent(lang);
  return (
    <html lang={c.htmlLang} className={`${jakarta.variable} ${inter.variable}`}>
      <body>
        <a
          href={`#${c.anchors.main}`}
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-accent focus:px-5 focus:py-3 focus:text-bg"
        >
          {c.ui.skip}
        </a>
        {children}
        <JsonLd lang={lang} />
        <Analytics />
      </body>
    </html>
  );
}
