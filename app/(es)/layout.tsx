import { RootDocument } from "@/components/layout/RootDocument";
import { buildMetadata, viewport as viewportConfig } from "@/lib/seo";

export const metadata = buildMetadata("es");
export const viewport = viewportConfig;

export default function SpanishLayout({ children }: { children: React.ReactNode }) {
  return <RootDocument lang="es">{children}</RootDocument>;
}
