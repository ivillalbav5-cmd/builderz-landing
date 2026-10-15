// Medición de conversiones. Envía eventos a GA4 y Meta Pixel SOLO si sus scripts están cargados
// (ver components/seo/Analytics.tsx: se activan con NEXT_PUBLIC_GA_ID / NEXT_PUBLIC_META_PIXEL_ID).
// Sin IDs no hace nada (en desarrollo lo deja en consola).
export type TrackEvent = "click_whatsapp" | "click_calendly" | "click_cta_contacto";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
  }
}

export function trackEvent(event: TrackEvent, data?: Record<string, string>) {
  if (typeof window === "undefined") return;
  if (process.env.NODE_ENV === "development") {
    console.debug("[track]", event, data ?? {});
  }
  window.gtag?.("event", event, data ?? {});
  if (window.fbq) {
    // WhatsApp = Contact, Calendly = Schedule (eventos estándar de Meta); el CTA interno es solo un clic.
    if (event === "click_whatsapp") window.fbq("track", "Contact");
    else if (event === "click_calendly") window.fbq("track", "Schedule");
    else window.fbq("trackCustom", "CTAContacto");
  }
}
