"use client";

import { cn } from "@/lib/cn";
import { trackEvent, type TrackEvent } from "@/lib/track";

type Variant = "primary" | "secondary";
type Size = "lg" | "md" | "sm";

const base =
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-semibold " +
  "transition-[transform,background-color,border-color,color] duration-200 ease-out active:scale-[0.98]";

const variants: Record<Variant, string> = {
  primary: "bg-accent text-bg hover:bg-fg",
  // borde muted/60 = ~3.4:1 sobre bg (mínimo 3:1 para límites interactivos)
  secondary: "border border-muted/60 text-fg hover:border-accent hover:text-accent",
};

const sizes: Record<Size, string> = {
  lg: "min-h-14 px-8 text-lg",
  md: "min-h-12 px-6 text-base",
  sm: "min-h-11 px-5 text-sm",
};

type Props = {
  href: string;
  variant?: Variant;
  size?: Size;
  track?: TrackEvent;
  className?: string;
  children: React.ReactNode;
};

export function ButtonLink({ href, variant = "primary", size = "md", track, className, children }: Props) {
  const external = /^https?:\/\//.test(href);
  return (
    <a
      href={href}
      rel={external ? "noopener noreferrer" : undefined}
      onClick={track ? () => trackEvent(track, { href }) : undefined}
      className={cn(base, variants[variant], sizes[size], className)}
    >
      {children}
    </a>
  );
}
