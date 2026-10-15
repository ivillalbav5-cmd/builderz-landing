"use client";

import { useEffect, useRef } from "react";

// Inclinación 3D al pasar el mouse (inspirado en Aceternity 3D Card).
// Solo mouse/trackpad y sin prefers-reduced-motion. Un listener por grupo.
export function TiltGroup({ className, children }: { className?: string; children: React.ReactNode }) {
  const ref = useRef<HTMLUListElement>(null);
  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const ok = window.matchMedia("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)");
    if (!ok.matches) return;
    let active: HTMLElement | null = null;
    const reset = (el: HTMLElement) => {
      el.style.transition = "transform 400ms cubic-bezier(0.16, 1, 0.3, 1)";
      el.style.transform = "";
    };
    const onMove = (e: PointerEvent) => {
      const el = (e.target as HTMLElement).closest<HTMLElement>("[data-tilt]");
      if (active && active !== el) reset(active);
      active = el;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      el.style.transition = "transform 120ms ease-out";
      el.style.transform = `perspective(1000px) rotateX(${(-y * 6).toFixed(2)}deg) rotateY(${(x * 6).toFixed(2)}deg) translateZ(0)`;
    };
    const onLeave = () => {
      if (active) reset(active);
      active = null;
    };
    root.addEventListener("pointermove", onMove);
    root.addEventListener("pointerleave", onLeave);
    return () => {
      root.removeEventListener("pointermove", onMove);
      root.removeEventListener("pointerleave", onLeave);
    };
  }, []);
  return (
    <ul ref={ref} className={className}>
      {children}
    </ul>
  );
}
