import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { StackMarquee } from "@/components/sections/StackMarquee";
import { Services } from "@/components/sections/Services";
import { Portfolio } from "@/components/sections/Portfolio";
import { Process } from "@/components/sections/Process";
import { ContactCTA } from "@/components/sections/ContactCTA";
import { getContent, type Lang } from "@/content/site";

// La landing completa en un idioma. La usan app/(es)/page.tsx ("/") y app/en/page.tsx ("/en").
export function HomePage({ lang }: { lang: Lang }) {
  const c = getContent(lang);
  return (
    <>
      <Header c={c} />
      <main id={c.anchors.main}>
        <Hero c={c} />
        <StackMarquee c={c} />
        <Services c={c} />
        <Portfolio c={c} />
        <Process c={c} />
        <ContactCTA c={c} />
      </main>
      <Footer c={c} />
    </>
  );
}
