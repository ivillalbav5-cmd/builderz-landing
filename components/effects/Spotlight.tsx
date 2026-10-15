"use client";

// Un solo listener para todos los elementos con [data-spotlight] del grupo.
// Solo actualiza 2 variables CSS; el efecto lo pinta el CSS (ver globals.css, sección [data-spotlight]).
function handleSpotlightMove(e: React.PointerEvent) {
  const card = (e.target as HTMLElement).closest<HTMLElement>("[data-spotlight]");
  if (!card) return;
  const r = card.getBoundingClientRect();
  card.style.setProperty("--mx", `${e.clientX - r.left}px`);
  card.style.setProperty("--my", `${e.clientY - r.top}px`);
}

// Para grids de tarjetas (ej. Servicios): el propio grupo es un <ul>.
export function SpotlightGroup({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <ul className={className} onPointerMove={handleSpotlightMove}>
      {children}
    </ul>
  );
}

// Misma mecánica que SpotlightGroup pero como <div>: para envolver estructuras que ya
// tienen su propio <ul> interno (ej. el marquee de logos, que no puede anidar ul > div > ul).
export function SpotlightArea({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <div className={className} onPointerMove={handleSpotlightMove}>
      {children}
    </div>
  );
}
