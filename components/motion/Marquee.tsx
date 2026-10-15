import { cn } from "@/lib/cn";

type Props = {
  rows: React.ReactNode[][];
};

// Marquee 100% CSS (server component, 0 JS). Se pausa con hover (desktop) o manteniendo
// presionado (mobile). Con prefers-reduced-motion queda estático y en varias líneas.
//
// Cada fila solo tiene ~5 logos: duplicarlos una sola vez (10 chips, ~1900px) no alcanza para
// pantallas muy anchas (>1900px de ancho lógico), así que antes de completar la vuelta se ve un
// hueco de fondo vacío. Se repite la lista base 3 veces (un "bloque") y ese bloque se duplica para
// el loop infinito (6x en total), asegurando que la pista siempre sea más ancha que el viewport.
const BLOCK_REPEATS = 3;

export function Marquee({ rows }: Props) {
  return (
    <div className="group flex flex-col gap-4">
      {rows.map((items, i) => {
        const block = Array.from({ length: BLOCK_REPEATS }, () => items).flat();
        return (
          <div key={i} className="flex overflow-hidden motion-reduce:overflow-visible">
            <ul
              className={cn(
                "flex w-max shrink-0 gap-4 pr-4 motion-reduce:w-full motion-reduce:shrink motion-reduce:flex-wrap motion-reduce:justify-center",
                i % 2 === 0 ? "animate-marquee" : "animate-marquee-reverse",
                "motion-reduce:animate-none",
                "group-hover:[animation-play-state:paused] group-active:[animation-play-state:paused]",
              )}
            >
              {block.map((item, j) => (
                // En reduced-motion no hay scroll infinito que llenar: mostrar cada logo una sola vez.
                <li key={j} className={j >= items.length ? "motion-reduce:hidden" : undefined}>
                  {item}
                </li>
              ))}
              {/* Copia para el loop infinito: invisible para lectores de pantalla */}
              {block.map((item, j) => (
                <li key={`d${j}`} aria-hidden="true" className="motion-reduce:hidden">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
}
