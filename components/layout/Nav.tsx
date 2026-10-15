"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRightIcon, Bars3Icon, ChevronRightIcon, XMarkIcon } from "@heroicons/react/20/solid";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { cn } from "@/lib/cn";

// Nav de escritorio (con scroll-spy) + menú mobile (hamburguesa). Vive en un solo componente
// cliente porque ambos comparten el estado de "sección activa" y el listener de scroll.
type Props = {
  nav: { href: string; label: string }[];
  cta: string;
  contactHref: string;
  ui: { mainNav: string; openMenu: string; closeMenu: string };
  /** Selector de idioma (server component): va entre los links y el CTA. */
  langSwitch: React.ReactNode;
};

export function Nav({ nav, cta, contactHref, ui, langSwitch }: Props) {
  const [active, setActive] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const listRef = useRef<HTMLUListElement>(null);
  const [indicator, setIndicator] = useState<{ left: number; width: number; visible: boolean }>({
    left: 0,
    width: 0,
    visible: false,
  });

  // Resalta el link de la sección visible (desktop). Sin JS de scroll manual: un solo
  // IntersectionObserver con una franja angosta en el centro de la pantalla.
  useEffect(() => {
    const sections = nav
      .map((item) => document.querySelector(item.href))
      .filter((el): el is Element => el !== null);
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`);
        }
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [nav]);

  // Bloquea el scroll del body mientras el menú mobile está abierto.
  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Indicador que se desliza al link activo (en vez de aparecer/desaparecer de golpe).
  // Se mide con getBoundingClientRect (no offsetLeft) para no depender de que <ul>/<li>
  // tengan position: relative.
  useEffect(() => {
    const list = listRef.current;
    if (!list || !active) {
      setIndicator((prev) => ({ ...prev, visible: false }));
      return;
    }

    const measure = () => {
      const link = list.querySelector<HTMLElement>(`[data-nav-link="${active}"]`);
      if (!link) return;
      const listRect = list.getBoundingClientRect();
      const linkRect = link.getBoundingClientRect();
      const width = linkRect.width * 0.6;
      setIndicator({ left: linkRect.left - listRect.left + (linkRect.width - width) / 2, width, visible: true });
    };

    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [active]);

  return (
    <>
      <nav aria-label={ui.mainNav} className="hidden items-center md:flex">
        <ul ref={listRef} className="relative flex items-center gap-8 text-sm">
          {nav.map((item) => {
            const isActive = active === item.href;
            return (
              <li key={item.href}>
                <a
                  href={item.href}
                  data-nav-link={item.href}
                  className={cn("relative inline-block min-w-11 py-3 text-center transition-colors duration-300", isActive ? "font-semibold text-fg" : "text-muted hover:text-fg")}
                >
                  {item.label}
                </a>
              </li>
            );
          })}
          {/* Indicador único que se desliza entre links (en vez de un ::after por link). */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute bottom-1 h-0.5 rounded-full bg-accent transition-[transform,width,opacity] duration-300 ease-out"
            style={{ width: `${indicator.width}px`, transform: `translateX(${indicator.left}px)`, opacity: indicator.visible ? 1 : 0 }}
          />
        </ul>
      </nav>

      {langSwitch}

      <ButtonLink href={contactHref} size="sm" track="click_cta_contacto" className="hidden md:inline-flex">
        {cta}
      </ButtonLink>

      <button
        type="button"
        aria-label={open ? ui.closeMenu : ui.openMenu}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="flex size-11 items-center justify-center rounded-full border border-line text-fg md:hidden"
      >
        {open ? <XMarkIcon aria-hidden="true" className="size-5" /> : <Bars3Icon aria-hidden="true" className="size-5" />}
      </button>

      {open && (
        <div
          id="menu-mobile"
          className="absolute inset-x-0 top-full border-t border-line bg-navy px-5 pb-6 pt-2 shadow-lg md:hidden"
          onClick={() => setOpen(false)}
        >
          <ul className="flex flex-col">
            {nav.map((item) => (
              <li key={item.href} className="border-b border-line/60 last:border-none">
                <a href={item.href} className="flex items-center justify-between py-3.5 text-fg">
                  {item.label}
                  <ChevronRightIcon aria-hidden="true" className="size-4 text-muted" />
                </a>
              </li>
            ))}
          </ul>
          <ButtonLink href={contactHref} track="click_cta_contacto" className="mt-4 w-full">
            {cta}
            <ArrowRightIcon aria-hidden="true" className="size-[18px]" />
          </ButtonLink>
        </div>
      )}
    </>
  );
}
