// Datos de contacto públicos (se ven en el navegador de todos modos).
// Se definen SOLO por variables de entorno (.env.local, Vercel o el hosting) y son de build:
// deben existir antes de `npm run build`. Sin valores de respaldo a propósito, para que
// nunca salga a producción un número o un Calendly de prueba sin que nadie se dé cuenta.
const WHATSAPP = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;
const CALENDLY = process.env.NEXT_PUBLIC_CALENDLY_URL;

if (!WHATSAPP || !CALENDLY) {
  throw new Error(
    "Faltan NEXT_PUBLIC_WHATSAPP_NUMBER y/o NEXT_PUBLIC_CALENDLY_URL. Revisá el archivo .env (o cargalas en Vercel / el hosting) y volvé a compilar.",
  );
}

export const WHATSAPP_NUMBER: string = WHATSAPP;
export const CALENDLY_URL: string = CALENDLY;

export const DEFAULT_WA_MESSAGE = "Hola BUILDERZ, quiero hablar sobre un proyecto.";

export function whatsappUrl(message: string = DEFAULT_WA_MESSAGE) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
