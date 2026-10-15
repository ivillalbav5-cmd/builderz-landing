import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Nav } from "@/components/layout/Nav";
import { LangSwitch } from "@/components/layout/LangSwitch";
import { siteConfig, type Content } from "@/content/site";

export function Header({ c }: { c: Content }) {
  return (
    <header className="sticky top-0 z-40 border-b border-line/70 bg-bg/80 backdrop-blur-md">
      <Container className="relative flex h-16 items-center justify-between">
        <a href={`#${c.anchors.home}`} className="-m-2 flex min-h-11 items-center p-2">
          <Image src={siteConfig.logo} alt="BUILDERZ" width={120} height={25} priority />
        </a>
        <div className="flex items-center gap-2 md:gap-6">
          <Nav
            nav={c.nav}
            cta={c.hero.cta}
            contactHref={`#${c.anchors.contact}`}
            ui={{ mainNav: c.ui.mainNav, openMenu: c.ui.openMenu, closeMenu: c.ui.closeMenu }}
            langSwitch={<LangSwitch current={c.lang} label={c.ui.langGroup} />}
          />
        </div>
      </Container>
    </header>
  );
}
