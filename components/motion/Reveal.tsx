"use client";

import { useEffect, useRef } from "react";

type Props = {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "li";
} & { [key: `data-${string}`]: string | boolean | undefined };

// Entrada suave al hacer scroll (CSS + IntersectionObserver, ~0.5 KB, sin librería).
// Respeta prefers-reduced-motion vía CSS (ver .reveal en globals.css). Acepta data-* (efectos).
export function Reveal({ children, delay = 0, className, as = "div", ...data }: Props) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          el.dataset.visible = "";
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -10% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  const Tag = as;
  return (
    <Tag
      ref={ref as React.Ref<never>}
      className={["reveal", className].filter(Boolean).join(" ")}
      style={delay ? { transitionDelay: `${delay}s` } : undefined}
      {...data}
    >
      {children}
    </Tag>
  );
}
