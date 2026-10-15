import { RootDocument } from "@/components/layout/RootDocument";
import { buildMetadata, viewport as viewportConfig } from "@/lib/seo";

export const metadata = buildMetadata("en");
export const viewport = viewportConfig;

export default function EnglishLayout({ children }: { children: React.ReactNode }) {
  return <RootDocument lang="en">{children}</RootDocument>;
}
