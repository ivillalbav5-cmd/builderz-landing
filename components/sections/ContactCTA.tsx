import { WhatsappLogoIcon } from "@phosphor-icons/react/dist/ssr";
import { CalendarDaysIcon } from "@heroicons/react/20/solid";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/ButtonLink";
import type { Content } from "@/content/site";
import { CALENDLY_URL, whatsappUrl } from "@/lib/contact";

// Cierre: pantalla limpia sobre el azul de marca. WhatsApp primario, Calendly secundario.
export function ContactCTA({ c }: { c: Content }) {
  const contact = c.contact;
  return (
    <section
      id={c.anchors.contact}
      aria-labelledby="contact-title"
      className="relative isolate flex min-h-[85svh] items-center overflow-hidden bg-navy py-24"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        {/* Foto de fondo (pantalla de código/diseño), oscurecida y desaturada de antemano
            (ver public/images/cta-bg.jpg). Blur leve, no global, para que se distinga.
            Se desvanece hacia los bordes para fundirse con el navy. */}
        <div
          className="absolute inset-0 bg-[url('/images/cta-bg.jpg')] bg-cover bg-center opacity-60 blur-[2px] [mask-image:radial-gradient(ellipse_85%_75%_at_50%_45%,black,transparent_92%)]"
        />
        {/* Aurora verde builderz: resplandor difuso con movimiento lento, tipo "thinking glow".
            Dos capas con distinta duración/fase para que la deriva no se sienta mecánica. */}
        <div className="absolute inset-x-[-15%] bottom-[-10%] h-2/3 animate-aurora bg-[radial-gradient(ellipse_65%_100%_at_50%_100%,color-mix(in_oklab,var(--color-accent)_38%,transparent),transparent_72%)] blur-2xl" />
        <div className="absolute inset-[-15%] animate-aurora-slow bg-[radial-gradient(ellipse_70%_60%_at_50%_100%,color-mix(in_oklab,var(--color-accent)_16%,transparent),transparent_70%)]" />
        {/* Textura punteada oscura sobre toda la foto (no solo cerca del aurora). */}
        <div className="absolute inset-0 bg-[radial-gradient(circle,color-mix(in_oklab,black_65%,var(--color-bg))_1px,transparent_1.6px)] bg-[length:14px_14px] opacity-70" />
      </div>
      <Container className="flex flex-col items-center text-center">
        <h2 id="contact-title" className="text-display font-extrabold">
          {contact.title}
        </h2>
        <p className="mt-6 max-w-[42ch] text-lg leading-relaxed md:text-xl">{contact.copy}</p>
        <div className="mt-10 grid w-full max-w-xl grid-cols-1 gap-3 sm:grid-cols-2">
          <ButtonLink href={whatsappUrl(contact.waMessage)} size="lg" track="click_whatsapp" className="btn-shine">
            <WhatsappLogoIcon aria-hidden="true" size={22} weight="bold" />
            {contact.whatsappLabel}
          </ButtonLink>
          <ButtonLink href={CALENDLY_URL} size="lg" variant="secondary" track="click_calendly">
            <CalendarDaysIcon aria-hidden="true" className="size-[22px]" />
            {contact.calendlyLabel}
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
