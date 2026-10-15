import type { Lang } from "@/content/types";

// Selector de idioma ES | EN. Muestra las dos opciones: la activa va rellena (y con aria-current)
// y la otra es un link a esa versión (/ o /en). Es un link, no un botón con estado: cada idioma es
// su propia página. Zona táctil de 44px aunque el selector se vea chico (el ::after la extiende).
const options = [
  { lang: "es", short: "ES", href: "/", name: "Español" },
  { lang: "en", short: "EN", href: "/en", name: "English" },
] as const;

const segment = "relative inline-flex h-8 min-w-11 items-center justify-center rounded-full px-2 text-xs font-bold tracking-wide";

export function LangSwitch({ current, label }: { current: Lang; label: string }) {
  return (
    <div role="group" aria-label={label} className="inline-flex items-center rounded-full border border-muted/60 p-0.5">
      {options.map((o) =>
        o.lang === current ? (
          <span key={o.lang} lang={o.lang} aria-current="true" aria-label={o.name} className={`${segment} bg-fg/15 text-fg`}>
            {o.short}
          </span>
        ) : (
          <a
            key={o.lang}
            href={o.href}
            hrefLang={o.lang}
            lang={o.lang}
            aria-label={o.name}
            className={`${segment} text-muted transition-colors duration-200 after:absolute after:inset-x-0 after:-inset-y-2 after:content-[''] hover:text-fg`}
          >
            {o.short}
          </a>
        ),
      )}
    </div>
  );
}
